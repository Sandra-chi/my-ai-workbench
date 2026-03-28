import { Mic } from "lucide-react";
import { MeetingProcessor } from "@/components/meetings/meeting-processor";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export default function MeetingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="会议纪要"
        description="支持粘贴会议文本、上传录音，并自动提取摘要、行动项、风险和下一步建议。"
        actions={<Button><Mic className="mr-2 h-4 w-4" />新建纪要</Button>}
      />
      <MeetingProcessor />
    </div>
  );
}
