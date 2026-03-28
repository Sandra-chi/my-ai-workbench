import Link from "next/link";
import { Archive, PencilLine } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "@/lib/supabase/queries";
import { NewProjectButton } from "@/components/projects/new-project-button";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <PageHeader
        title="项目空间"
        description="每个项目一个独立工作区，沉淀资料、任务、会议、聊天和产出。"
        actions={<NewProjectButton />}
      />

      <div className="grid gap-4 xl:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-slate-600">{project.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">状态</p>
                  <p className="mt-1 text-sm">{project.status}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">当前阶段</p>
                  <p className="mt-1 text-sm">{project.current_stage || ''}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Link href={`/projects/${project.id}`}>
                  <Button>进入项目</Button>
                </Link>
                <Button variant="outline">
                  <PencilLine className="mr-2 h-4 w-4" />
                  编辑
                </Button>
                <Button variant="secondary">
                  <Archive className="mr-2 h-4 w-4" />
                  归档
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
