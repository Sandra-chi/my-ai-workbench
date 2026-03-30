import { notFound } from "next/navigation";
import { CalendarDays, Flag, Plus } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProject, getProjectTasks } from "@/lib/supabase/queries";
import type { Project, Task } from "@/lib/types";

type ProjectDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const tasks = await getProjectTasks(id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={project.name}
        description={project.description}
        actions={
          <>
            <Button variant="outline"><Plus className="mr-2 h-4 w-4" />新增资料</Button>
            <Button>生成项目摘要</Button>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-xl bg-slate-100 p-2">
              <Flag className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500">状态</p>
              <p className="text-sm font-medium">{project.status}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-xl bg-slate-100 p-2">
              <CalendarDays className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-slate-500">开始日期</p>
              <p className="text-sm font-medium">{project.start_date || '-'}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-slate-500">目标</p>
            <p className="mt-1 text-sm font-medium">{project.goal}</p>
          </CardContent>
        </Card>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">任务列表 ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-slate-500">
              暂无任务
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {tasks.map((task: Task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-sm text-slate-500 mt-1">{task.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.status === 'done' ? 'bg-green-100 text-green-700' :
                        task.status === 'doing' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {task.status === 'done' ? '已完成' :
                         task.status === 'doing' ? '进行中' : '待办'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {task.priority === 'high' ? '高' :
                         task.priority === 'medium' ? '中' : '低'}
                      </span>
                    </div>
                  </div>
                  {task.due_date && (
                    <p className="text-xs text-slate-500 mt-2">
                      截止：{new Date(task.due_date).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
