"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardList, FileText, FolderKanban, Home, Sparkles, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/projects", label: "项目", icon: FolderKanban },
  { href: "/library", label: "资料库", icon: BookOpen },
  { href: "/meetings", label: "会议", icon: ClipboardList },
  { href: "/content", label: "内容", icon: Sparkles },
  { href: "/reports", label: "复盘", icon: FileText }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-white p-4 lg:block">
      <div className="mb-6 flex items-center gap-3 px-2 py-3">
        <div className="rounded-2xl bg-slate-900 p-2 text-white">
          <Wand2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">我的 AI 工作台</p>
          <p className="text-xs text-slate-500">1.0 单用户版</p>
        </div>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-border bg-slate-50 p-4">
        <p className="text-sm font-medium">下一步建议</p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          先用 mock data 跑通页面，再接 Supabase 和 AI API。
        </p>
      </div>
    </aside>
  );
}
