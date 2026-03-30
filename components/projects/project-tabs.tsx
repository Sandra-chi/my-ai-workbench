"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDocuments, getMeetings, getTasks, getContents } from "@/lib/supabase/queries";
import type { Project } from "@/lib/types";
import { ProjectChat } from "@/components/projects/project-chat";

const tabs = ["概览", "资料", "任务", "聊天", "产出"] as const;
type Tab = (typeof tabs)[number];

interface ProjectTabsProps {
  project: Project;
  documents?: any[];
  meetings?: any[];
  tasks?: any[];
  contents?: any[];
}

export function ProjectTabs({ project, documents = [], meetings = [], tasks = [], contents = [] }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("概览");

  const projectDocuments = useMemo(() => documents.filter((item) => item.project_id === project.id), [documents, project.id]);
  const projectMeetings = useMemo(() => meetings.filter((item) => item.project_id === project.id), [meetings, project.id]);
  const projectTasks = useMemo(() => tasks.filter((item) => item.project_id === project.id), [tasks, project.id]);
  const projectContents = useMemo(() => contents.filter((item) => item.project_id === project.id), [contents, project.id]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`rounded-xl px-4 py-2 text-sm ${activeTab === tab ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-border"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "概览" ? (
        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>项目概览</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-slate-500">目标</p>
                <p className="mt-1 text-sm leading-6">{project.goal}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">当前阶段</p>
                <p className="mt-1 text-sm">{project.current_stage}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">标签</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI 建议下一步</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
              <p>1. 先补齐该项目的关键资料与会议结论。</p>
              <p>2. 把高优先级任务拆成更明确的动作。</p>
              <p>3. 产出一版一页纸，方便持续对齐目标。</p>
            </CardContent>
          </Card>
        </div>
      ) : null}

      {activeTab === "资料" ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>项目资料</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {projectDocuments.length === 0 ? (
                <p className="text-slate-500 py-4">暂无资料</p>
              ) : (
                projectDocuments.map((doc) => (
                  <div key={doc.id} className="rounded-xl border border-border p-4">
                    <p className="text-sm font-medium">{doc.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{doc.summary}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>关联会议</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {projectMeetings.length === 0 ? (
                <p className="text-slate-500 py-4">暂无会议</p>
              ) : (
                projectMeetings.map((meeting) => (
                  <div key={meeting.id} className="rounded-xl border border-border p-4">
                    <p className="text-sm font-medium">{meeting.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{meeting.summary}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {activeTab === "任务" ? (
        <Card>
          <CardHeader>
            <CardTitle>项目任务</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {projectTasks.length === 0 ? (
              <p className="text-slate-500 py-4">暂无任务</p>
            ) : (
              projectTasks.map((task) => (
                <div key={task.id} className="rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium">{task.title}</p>
                    <Badge>{task.status}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">优先级：{task.priority}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      ) : null}

      {activeTab === "聊天" ? <ProjectChat projectName={project.name} projectGoal={project.goal} /> : null}

      {activeTab === "产出" ? (
        <Card>
          <CardHeader>
            <CardTitle>项目产出</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {projectContents.length === 0 ? (
              <p className="text-slate-500 py-4">暂无产出</p>
            ) : (
              projectContents.map((content) => (
                <div key={content.id} className="rounded-xl border border-border p-4">
                  <p className="text-sm font-medium">{content.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{content.output_text}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
