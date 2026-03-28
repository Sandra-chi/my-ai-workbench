import { NextRequest, NextResponse } from "next/server";
import { generateText } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { system, prompt, template } = body as { system?: string; prompt?: string; template?: string };

    // 如果使用了模板，根据模板生成 prompt
    let finalPrompt = prompt;
    if (template) {
      switch (template) {
        case "标题":
          finalPrompt = `请为以下主题生成一个吸引人的标题：${prompt}`;
          break;
        case "提纲":
          finalPrompt = `请将以下主题整理成清晰的提纲：${prompt}`;
          break;
        case "一页纸":
          finalPrompt = `请把以下内容整理成一页纸方案：背景、问题、目标、建议、步骤、风险。\n\n主题：${prompt}`;
          break;
        case "正式方案":
          finalPrompt = `请为以下项目生成正式方案：${prompt}`;
          break;
        case "短视频脚本":
          finalPrompt = `请根据以下主题、受众和目标平台生成短视频脚本：${prompt}`;
          break;
        case "brief":
          finalPrompt = `请为以下内容生成简洁的 brief：${prompt}`;
          break;
        case "邮件":
          finalPrompt = `请生成专业的邮件：${prompt}`;
          break;
        case "日报":
          finalPrompt = `请生成工作日报：${prompt}`;
          break;
        case "周报":
          finalPrompt = `请生成工作周报：${prompt}`;
          break;
      }
    }

    if (!finalPrompt) {
      return NextResponse.json({ error: "缺少 prompt 或 template" }, { status: 400 });
    }

    const text = await generateText({ system, prompt: finalPrompt });
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AI 生成失败", error);
    return NextResponse.json({ error: "AI 生成失败" }, { status: 500 });
  }
}
