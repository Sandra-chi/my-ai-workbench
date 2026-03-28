import Link from "next/link";
import { ArrowRight, CheckCircle2, FolderKanban, Library, Mic } from "lucide-react";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecentSection } from "@/components/dashboard/recent-section";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContents, getDocuments, getMeetings, getProjects, getTasks } from "@/lib/supabase/queries";

export default async function HomePage() {
  const [projects, tasks, documents, meetings, contents] = await Promise.all([
    getProjects(),
    getTasks(),
    getDocuments(),
    getMeetings(),
    getContents(),
  ]);

  const todoTasks = tasks.filter((task) => task.status !== "done").length;
  const activeProjects = projects.filter((project) => project.status === "active").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="首页工作台"
        description="把待办、项目、文件、会议与内容输出串成一个每天都会打开的工作入口。"
        actions={
          <div className="flex gap-2">
            <Badge>单用户版</Badge>
            <Badge>Supabase 已连接</Badge>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "待处理任务", value: `${todoTasks} 项`, icon: CheckCircle2, hint: "聚焦今天该做什么" },
          { label: "活跃项目", value: `${activeProjects} 个`, icon: FolderKanban, hint: "长期上下文在这里沉淀" },
          { label: "文件资料", value: `${documents.length} 份`, icon: Library, hint: "为搜索与问答做准备" },
          { label: "会议纪要", value: `${meetings.length} 条`, icon: Mic, hint: "自动提取行动项与风险" }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="flex items-start justify-between p-5">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                  <p className="mt-2 text-xs text-slate-500">{item.hint}</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-3">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <QuickActions />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr_1fr]">
        <RecentSection
          title="最近项目"
          items={projects.map((project) => ({
            id: project.id,
            title: project.name,
            subtitle: `${project.currentStage} · ${project.goal}`,
            href: `/projects/${project.id}`
          }))}
        />
        <RecentSection
          title="最近文件"
          items={documents.map((document) => ({
            id: document.id,
            title: document.title,
            subtitle: document.summary,
            href: "/library"
          }))}
        />
        <RecentSection
          title="最近会议"
          items={meetings.map((meeting) => ({
            id: meeting.id,
            title: meeting.title,
            subtitle: meeting.summary,
            href: "/meetings"
          }))}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>今日摘要</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-700">
            <p>1. 优先完成 AI 工作台的首页、项目页和内容页骨架。</p>
            <p>2. 北京铁血科技项目需尽快收敛成一版内部可汇报的一页纸方案。</p>
            <p>3. 已接入 Supabase 数据库，现在可以真实存取数据了！</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>最近产出</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contents.map((content) => (
              <div key={content.id} className="rounded-xl border border-border p-4">
                <p className="text-sm font-medium">{content.title}</p>
                <p className="mt-1 text-xs text-slate-500">{content.outputText}</p>
              </div>
            ))}
            <Link href="/content" className="inline-flex items-center text-sm font-medium text-slate-700">
              去内容中心继续生成
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
