import { FileText } from "lucide-react";
import { ReportBuilder } from "@/components/reports/report-builder";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="复盘页"
        description="按时间范围汇总项目、任务、会议、内容，生成日报、周报和月报。"
        actions={<Button><FileText className="mr-2 h-4 w-4" />生成复盘</Button>}
      />
      <ReportBuilder />
    </div>
  );
}
