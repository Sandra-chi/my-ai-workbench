"use client";

import { useMemo, useEffect, useState } from "react";
import { Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getDocuments, createDocument } from "@/lib/supabase/queries";
import type { DocumentItem } from "@/lib/types";

export function DocumentList() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadDocuments = async () => {
    setIsLoading(true);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error("加载文档失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const filteredDocuments = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return documents;
    return documents.filter((doc) => {
      const searchable = [doc.title, doc.summary, ...(doc.tags || [])].join(" ").toLowerCase();
      return searchable.includes(keyword);
    });
  }, [documents, query]);

  const handleUpload = async () => {
    const title = prompt("请输入文档标题:");
    if (!title) return;

    const summary = prompt("请输入文档摘要（可选）:") || "";
    const fileType = prompt("文件类型 (pdf/docx/txt/md/audio):") || "txt";
    const tagsInput = prompt("标签（用逗号分隔）:") || "";
    const tags = tagsInput.split(",").map((t: string) => t.trim()).filter((t: string) => Boolean);

    try {
      await createDocument({
        title,
        file_name: title,
        file_type: fileType as "pdf" | "docx" | "txt" | "md" | "audio",
        summary,
        tags,
      });
      await loadDocuments();
      alert("文档创建成功！");
    } catch (error) {
      alert("创建失败: " + error);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>文件知识库</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
              <Input
                className="pl-9"
                placeholder="按标题、摘要、标签搜索"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button variant="secondary" onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              新增文档
            </Button>
          </div>
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-center text-slate-500">加载中...</p>
            ) : documents.length === 0 ? (
              <p className="text-center text-slate-500 py-8">暂无文档</p>
            ) : (
              filteredDocuments.map((doc: DocumentItem) => (
                <div key={doc.id} className="rounded-2xl border border-border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{doc.title}</p>
                      {doc.summary && (
                        <p className="mt-1 text-xs text-slate-500">{doc.summary}</p>
                      )}
                    </div>
                    <Badge>{doc.file_type}</Badge>
                  </div>
                  {doc.tags && doc.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {doc.tags.map((tag: string) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>后续能力预留</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-6 text-slate-600">
          <p>• 文件上传后自动解析文本并生成摘要</p>
          <p>• 写入 document_chunks 表并生成 embeddings</p>
          <p>• 项目聊天自动引用相关文件片段</p>
          <p>• 支持关键词搜索 + 语义搜索</p>
          <p>• 未来可接 OCR、网页摘录与外部知识源</p>
        </CardContent>
      </Card>
    </div>
  );
}
