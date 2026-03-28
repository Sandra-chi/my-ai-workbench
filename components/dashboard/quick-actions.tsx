import Link from "next/link";
import { FilePlus2, FolderPlus, Mic, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const actions = [
  { href: "/projects", label: "新建项目", icon: FolderPlus, description: "开始一个新的工作空间" },
  { href: "/library", label: "上传文件", icon: FilePlus2, description: "导入资料并建立知识索引" },
  { href: "/meetings", label: "新建纪要", icon: Mic, description: "粘贴会议文本或上传录音" },
  { href: "/content", label: "生成内容", icon: Sparkles, description: "输出提纲、脚本、方案或 brief" }
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>快捷操作</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              href={action.href}
              className="rounded-2xl border border-border bg-white p-4 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <div className="mb-3 inline-flex rounded-xl bg-slate-100 p-2">
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-sm font-medium">{action.label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{action.description}</p>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
