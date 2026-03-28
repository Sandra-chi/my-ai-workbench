"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Message = {
  role: "assistant" | "user";
  content: string;
};

type ProjectChatProps = {
  projectName: string;
  projectGoal: string;
};

export function ProjectChat({ projectName, projectGoal }: ProjectChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `这里是“${projectName}”的项目聊天区。默认会带上项目上下文。当前目标：${projectGoal}`
    }
  ]);
  const [input, setInput] = useState("");

  const onSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      {
        role: "assistant",
        content: "这是项目上下文聊天的占位回复。你后续可以把这里接到 /api/ai/generate，并自动注入项目资料、会议结论和历史产出。"
      }
    ]);
    setInput("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>项目聊天</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 rounded-2xl bg-slate-50 p-3 text-xs leading-5 text-slate-600">
          已自动注入项目上下文：项目名称、目标、资料、会议、任务与产出。
        </div>
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={message.role === "assistant" ? "rounded-2xl bg-slate-100 p-3" : "rounded-2xl bg-slate-900 p-3 text-white"}
            >
              <p className="text-xs font-medium opacity-70">{message.role === "assistant" ? "AI" : "你"}</p>
              <p className="mt-1 text-sm leading-6">{message.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="输入项目问题，例如：帮我整理一版一页纸" />
          <Button onClick={onSend}>
            <Send className="mr-2 h-4 w-4" />
            发送
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
