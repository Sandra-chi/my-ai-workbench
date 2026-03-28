import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content } = body as { title?: string; content?: string };

    if (!content) {
      return NextResponse.json({ error: "缺少文档内容" }, { status: 400 });
    }

    const text = await generateText({
      system: "你是一名擅长结构化总结文档的助手。",
      prompt: `请总结这份文档。\n\n标题：${title || "未命名"}\n\n正文：${content}\n\n请输出：一句话摘要、3个核心观点、对当前项目的启发。`
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error("文档总结失败", error);
    return NextResponse.json({ error: "文档总结失败" }, { status: 500 });
  }
}
