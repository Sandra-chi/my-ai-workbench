import { Upload } from "lucide-react";
import { DocumentList } from "@/components/library/document-list";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="文件知识库"
        description="统一上传、管理、搜索和总结文件，为后续语义检索和 RAG 问答打底。"
        actions={<Button><Upload className="mr-2 h-4 w-4" />上传文件</Button>}
      />
      <DocumentList />
    </div>
  );
}
