"use client";

import { Search, Command } from "lucide-react";
import { Input } from "@/components/ui/input";
import { currentUser } from "@/lib/mock-data";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 lg:px-8">
        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input className="pl-9" placeholder="全局搜索：项目 / 文件 / 会议 / 内容 / 任务" />
          </div>
          <div className="relative">
            <Command className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
            <Input className="pl-9" placeholder="快速命令：例如“生成今天日报”" />
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="text-right">
            <p className="text-sm font-medium">{currentUser.name}</p>
            <p className="text-xs text-slate-500">{currentUser.email}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            我
          </div>
        </div>
      </div>
    </header>
  );
}
