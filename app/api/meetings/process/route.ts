import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, transcript } = body as { title?: string; transcript?: string };

    if (!transcript) {
      return NextResponse.json({ error: "缺少会议文本" }, { status: 400 });
    }

    const text = await generateText({
      system: "你是会议纪要助手，输出要结构化、准确、简洁。",
      prompt: `请将以下会议内容整理为：摘要、关键结论、行动项、风险点、下一步建议。\n\n会议标题：${title || "未命名会议"}\n\n内容：${transcript}`
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error("会议处理失败", error);
    return NextResponse.json({ error: "会议处理失败" }, { status: 500 });
  }
}
