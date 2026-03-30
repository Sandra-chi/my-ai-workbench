"use client";

import { useState, useEffect } from "react";
import { Copy, Save, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getContents, createContent, getPromptTemplates, createPromptTemplate } from "@/lib/supabase/queries";
import type { ContentItem, PromptTemplate } from "@/lib/types";

export function ContentGenerator() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [template, setTemplate] = useState("一页纸");
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [loadedContents, loadedTemplates] = await Promise.all([
        getContents(),
        getPromptTemplates(),
      ]);
      setContents(loadedContents);
      setTemplates(loadedTemplates);
    } catch (error) {
      console.error("加载失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setOutput("");

    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template,
          topic,
          context,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOutput(result.output || result.text || result);
      } else {
        alert("生成失败");
      }
    } catch (error) {
      alert("生成失败: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!topic || !output) return;

    setIsSaving(true);
    try {
      await createContent({
        title: `${template} - ${topic}`,
        content_type: template as any,
        output_text: output,
        template_name: template,
        input_prompt: context,
      });
      await loadData();
      setTemplate("一页纸");
      setTopic("");
      setContext("");
      setOutput("");
      alert("保存成功！");
    } catch (error) {
      alert("保存失败: " + error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTemplate = async () => {
    const name = prompt("请输入模板名称：");
    if (!name) return;

    const text = prompt("请输入模板内容：");
    if (!text) return;

    try {
      await createPromptTemplate({
        name,
        category: template,
        prompt_text: text,
      });
      alert("模板保存成功！");
      await loadData();
    } catch (error) {
      alert("保存失败: " + error);
    }
  };

  if (isLoading && contents.length === 0) {
    return <p className="text-center text-slate-500">加载中...</p>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>内容生成中心</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">模板</label>
            <div className="grid grid-cols-2 gap-2">
              {["标题", "提纲", "一页纸", "正式方案", "短视频脚本", "brief", "邮件", "日报", "周报"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTemplate(item)}
                  className={`rounded-xl border px-3 py-2 text-sm ${template === item ? "border-slate-900 bg-slate-900 text-white" : "border-border bg-white"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">主题</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：北京铁血科技 AI 视觉内容生产项目"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">背景 / 资料</label>
            <Textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="输入补充背景、目标对象、语气、参考资料"
              className="min-h-[180px]"
            />
          </div>
          <Button className="w-full" onClick={handleGenerate} disabled={isLoading}>
            {isLoading ? "生成中..." : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                生成内容
              </>
            )}
          </Button>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-700">推荐 Prompt 模板</p>
            <div className="mt-3 space-y-2">
              {templates.slice(0, 3).map((prompt: PromptTemplate) => (
                <div key={prompt.id} className="rounded-xl border border-border bg-white p-3">
                  <p className="text-sm font-medium">{prompt.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{prompt.prompt_text}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>输出结果</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-[420px] rounded-2xl border border-border bg-slate-50 p-4">
            {output ? (
              <pre className="text-sm leading-7 whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-sm text-slate-500">生成内容后显示在这里</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={() => navigator.clipboard.writeText(output || "")}>
              复制
            </Button>
            <Button variant="outline" onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "保存中..." : "保存"}
            </Button>
            <Button variant="outline" onClick={handleSaveTemplate}>
              保存为新模板
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>历史内容</CardTitle>
        </CardHeader>
        <CardContent>
          {contents.length === 0 ? (
            <p className="text-slate-500 py-8">暂无历史内容</p>
          ) : (
            <div className="space-y-2">
              {contents.slice(0, 6).map((content: ContentItem) => (
                <div key={content.id} className="rounded-xl border border-border p-3">
                  <p className="text-sm font-medium">{content.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{new Date(content.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
