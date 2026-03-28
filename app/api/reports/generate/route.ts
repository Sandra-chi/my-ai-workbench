import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { periodLabel, sourceSummary } = body as { periodLabel?: string; sourceSummary?: string };

    if (!sourceSummary) {
      return NextResponse.json({ error: "缺少复盘来源内容" }, { status: 400 });
    }

    const text = await generateText({
      system: "你是工作复盘助手，请输出结构清晰的日报、周报或月报。",
      prompt: `请根据以下资料生成一份复盘。\n\n时间范围：${periodLabel || "未指定"}\n\n资料：${sourceSummary}\n\n输出结构：完成事项、进行中事项、问题与风险、下一步计划。`
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error("复盘生成失败", error);
    return NextResponse.json({ error: "复盘生成失败" }, { status: 500 });
  }
}
