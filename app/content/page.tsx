import { Sparkles } from "lucide-react";
import { ContentGenerator } from "@/components/content/content-generator";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="内容生成中心"
        description="支持标题、提纲、一页纸、正式方案、脚本、brief、邮件、日报、周报等内容模板。"
        actions={<Button><Sparkles className="mr-2 h-4 w-4" />开始生成</Button>}
      />
      <ContentGenerator />
    </div>
  );
}
