"use client";

import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { projects, reports, tasks } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ReportBuilder() {
  const [range, setRange] = useState("本周");
  const [output, setOutput] = useState("");

  const buildDemoReport = () => {
    const activeProjects = projects.filter((item) => item.status === "active").length;
    const doneTasks = tasks.filter((item) => item.status === "done").length;

    setOutput(
      `【${range}复盘】\n\n1. 本阶段完成事项\n- 当前活跃项目 ${activeProjects} 个\n- 已完成任务 ${doneTasks} 项\n- 会议纪要、内容模板和项目空间已形成可运行骨架\n\n2. 当前推进中事项\n- 正在补齐数据库 schema\n- 正在推进 AI 工作台页面搭建\n\n3. 风险与问题\n- 功能范围仍需控制\n- RAG 与音频转写建议放到下一阶段\n\n4. 下一步计划\n- 接 Supabase\n- 接 AI 生成 API\n- 用真实项目数据替换 mock data`
    );
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>复盘生成器</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">时间范围</p>
            <div className="grid gap-2">
              {["今天", "本周", "本月"].map((item) => (
                <button
                  key={item}
                  onClick={() => setRange(item)}
                  className={`rounded-xl border px-3 py-2 text-sm ${range === item ? "border-slate-900 bg-slate-900 text-white" : "border-border bg-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-medium">数据源</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>✓ 项目</p>
              <p>✓ 任务</p>
              <p>✓ 会议</p>
              <p>✓ 内容输出</p>
            </div>
          </div>

          <Button className="w-full" onClick={buildDemoReport}>
            <Sparkles className="mr-2 h-4 w-4" />
            生成复盘
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>输出结果</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="min-h-[360px] rounded-2xl border border-border bg-slate-50 p-4">
              {output ? <pre className="text-sm leading-7">{output}</pre> : <p className="text-sm text-slate-500">点击左侧按钮生成日报 / 周报 / 月报。</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>历史复盘</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-start gap-3 rounded-xl border border-border p-4">
                <div className="rounded-xl bg-slate-100 p-2">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{report.periodLabel}</p>
                  <p className="mt-1 text-xs text-slate-500">{report.outputText}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
