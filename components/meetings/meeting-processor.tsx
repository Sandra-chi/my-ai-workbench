"use client";

import { useState } from "react";
import { Mic, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getMeetings, createMeeting } from "@/lib/supabase/queries";
import type { Meeting } from "@/lib/types";

export function MeetingProcessor() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("新会议纪要");
  const [rawText, setRawText] = useState("");
  const [result, setResult] = useState<any>(null);

  const loadMeetings = async () => {
    setIsLoading(true);
    try {
      const data = await getMeetings();
      setMeetings(data);
    } catch (error) {
      console.error("加载会议失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    loadMeetings();
  });

  const handleProcess = async () => {
    setResult(null);

    const summary = prompt("会议摘要（由 AI 生成）:") || "";
    const actionItemsStr = prompt("行动项（用逗号分隔）:") || "";
    const risksStr = prompt("风险点（用逗号分隔）:") || "";
    const followUpsStr = prompt("下一步建议（用逗号分隔）:") || "";

    const actionItems = actionItemsStr.split(",").map(s => s.trim()).filter(Boolean);
    const risks = risksStr.split(",").map(s => s.trim()).filter(Boolean);
    const followUps = followUpsStr.split(",").map(s => s.trim()).filter(Boolean);

    try {
      const newMeeting = await createMeeting({
        title,
        raw_text: rawText,
        summary,
        decisions: [],
        action_items: actionItems,
        risks,
        follow_ups: followUps,
      });
      await loadMeetings();
      setResult({
        summary,
        actionItems,
        risks,
        nextSteps: followUps,
      });
      alert("会议创建成功！");
    } catch (error) {
      alert("创建失败: " + error);
    }
  };

  const demoOutput = {
    summary: "会议重点确认了 AI 工作台的 MVP 范围，应优先完成项目、内容、会议、复盘四件套。",
    actionItems: ["搭建首页与项目页", "补充 Supabase schema", "准备真实样本数据"],
    risks: ["功能范围过宽会影响交付速度", "不要在 1.0 上多人协作"],
    nextSteps: ["先完成页面骨架", "再接入 AI 生成功能", "最后替换为真实数据库"]
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>新建会议纪要</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="会议标题"
          />
          <Textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="粘贴会议文本，或在后续版本里上传录音文件"
            className="min-h-[220px]"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => setResult(demoOutput)}>
              <Sparkles className="mr-2 h-4 w-4" />
              示例输出
            </Button>
            <Button variant="secondary">
              <Mic className="mr-2 h-4 w-4" />
              上传录音
            </Button>
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              保存到项目
            </Button>
          </div>
          <Button className="w-full" onClick={handleProcess}>
            AI 处理
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>AI 解析结果</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-6">
          {result ? (
            <>
              <section>
                <p className="text-xs text-slate-500">摘要</p>
                <p className="mt-1">{result.summary}</p>
              </section>
              <section>
                <p className="text-xs text-slate-500">行动项</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {(result.actionItems || []).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <p className="text-xs text-slate-500">风险点</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {(result.risks || []).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
              <section>
                <p className="text-xs text-slate-500">下一步建议</p>
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  {(result.nextSteps || []).map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <p className="text-slate-500">点击"AI 处理"后显示摘要、行动项、风险点和下一步建议。</p>
          )}
        </CardContent>
      </Card>
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>最近会议</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {isLoading ? (
            <p className="text-slate-500">加载中...</p>
          ) : meetings.length === 0 ? (
            <p className="text-slate-500 py-8">暂无会议</p>
          ) : (
            meetings.slice(0, 6).map((meeting: Meeting) => (
              <div key={meeting.id} className="rounded-xl border border-border p-4">
                <p className="text-sm font-medium">{meeting.title}</p>
                <p className="mt-1 text-xs text-slate-500">{meeting.summary}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
