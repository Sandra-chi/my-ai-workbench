import type {
  ContentItem,
  DocumentItem,
  Meeting,
  Project,
  PromptTemplate,
  QuickNote,
  ReportItem,
  Task,
  UserProfile
} from "@/lib/types";

export const currentUser: UserProfile = {
  id: "user-1",
  name: "你自己",
  email: "me@example.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

export const projects: Project[] = [
  {
    id: "project-1",
    user_id: "user-1",
    name: "北京铁血科技 AI 视觉内容生产方案",
    description: "围绕龙牙的图像/视频/数字人内容生产方案。",
    goal: "输出一版可汇报、可试点的 0-1 项目方案。",
    status: "active",
    current_stage: "方案收敛与 MVP 定义",
    start_date: "2026-03-10",
    due_date: "2026-03-31",
    tags: ["AI 内容生产", "方案", "客户"],
    pinned: true,
    archived: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-2",
    user_id: "user-1",
    name: "我的 AI 工作台 1.0",
    description: "个人日常工作 AI 网站开发。",
    goal: "做出可每天使用的项目+内容+会议+复盘四件套。",
    status: "active",
    current_stage: "页面与数据层骨架搭建",
    start_date: "2026-03-20",
    due_date: "2026-04-15",
    tags: ["产品", "开发", "vibe coding"],
    pinned: true,
    archived: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "project-3",
    user_id: "user-1",
    name: "Q2 内容策略研究",
    description: "整理下一阶段的内容方向与选题。",
    goal: "建立季度研究资料库与执行节奏。",
    status: "planning",
    current_stage: "收集资料",
    start_date: "2026-03-18",
    tags: ["研究", "策略"],
    pinned: false,
    archived: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const tasks: Task[] = [
  {
    id: "task-1",
    user_id: "user-1",
    project_id: "project-2",
    title: "完成首页与项目页骨架",
    status: "doing",
    priority: "high",
    due_date: "2026-03-25",
    ai_generated: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "task-2",
    user_id: "user-1",
    project_id: "project-1",
    title: "整理 AI 视觉内容生产模块优先级",
    status: "todo",
    priority: "high",
    due_date: "2026-03-26",
    ai_generated: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "task-3",
    user_id: "user-1",
    project_id: "project-2",
    title: "写 Supabase schema.sql",
    status: "todo",
    priority: "medium",
    due_date: "2026-03-26",
    ai_generated: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "task-4",
    user_id: "user-1",
    project_id: "project-3",
    title: "收集 10 份行业研究资料",
    status: "done",
    priority: "medium",
    due_date: "2026-03-22",
    ai_generated: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const documents: DocumentItem[] = [
  {
    id: "doc-1",
    user_id: "user-1",
    project_id: "project-1",
    title: "铁血科技 2024 年报摘录.pdf",
    file_name: "铁血科技 2024 年报摘录.pdf",
    file_type: "pdf",
    tags: ["年报", "客户研究"],
    summary: "主营收入以商品销售为主，短视频/直播内容与销售链路高度相关。",
    pinned: false,
    created_at: "2026-03-22T00:00:00Z",
    updated_at: "2026-03-22T00:00:00Z"
  },
  {
    id: "doc-2",
    user_id: "user-1",
    project_id: "project-2",
    title: "AI 工作台 PRD v0.1.docx",
    file_name: "AI 工作台 PRD v0.1.docx",
    file_type: "docx",
    tags: ["PRD", "产品"],
    summary: "定义首页、项目空间、资料库、会议纪要、内容中心、复盘页六大模块。",
    pinned: false,
    created_at: "2026-03-24T00:00:00Z",
    updated_at: "2026-03-24T00:00:00Z"
  },
  {
    id: "doc-3",
    user_id: "user-1",
    project_id: "project-3",
    title: "Q2 研究笔记.txt",
    file_name: "Q2 研究笔记.txt",
    file_type: "txt",
    tags: ["研究", "内容策略"],
    summary: "归纳了短视频选题、AI 工具趋势和内容制作效率问题。",
    pinned: false,
    created_at: "2026-03-21T00:00:00Z",
    updated_at: "2026-03-21T00:00:00Z"
  }
];

export const meetings: Meeting[] = [
  {
    id: "meeting-1",
    user_id: "user-1",
    project_id: "project-1",
    title: "铁血科技需求整理会",
    participants: ["你", "业务同事", "内容负责人"],
    meeting_date: "2026-03-23T14:30:00Z",
    summary: "初步确认视觉内容生产是更高优先级，换脸应降级为受控编辑能力。",
    action_items: ["补充项目模块优先级", "定义 MVP 范围", "单独补一页合规边界"],
    risks: ["业务目标容易被写成功能堆砌", "换脸方向合规敏感"],
    follow_ups: ["形成 1 页内部汇报版本", "确定 P0/P1/P2 优先级"],
    created_at: "2026-03-23T00:00:00Z",
    updated_at: "2026-03-23T00:00:00Z"
  },
  {
    id: "meeting-2",
    user_id: "user-1",
    project_id: "project-2",
    title: "AI 工作台产品梳理",
    participants: ["你"],
    meeting_date: "2026-03-24T10:00:00Z",
    summary: "决定先做项目、内容、会议、复盘四件套，文件知识库同步搭底。",
    action_items: ["输出目录结构", "设计数据库", "搭首页框架"],
    risks: ["功能过多容易拖慢开发", "不要一开始做多人协作"],
    follow_ups: ["先出代码骨架", "用 mock data 跑起来"],
    created_at: "2026-03-24T00:00:00Z",
    updated_at: "2026-03-24T00:00:00Z"
  }
];

export const contents: ContentItem[] = [
  {
    id: "content-1",
    user_id: "user-1",
    project_id: "project-1",
    title: "AI 视觉内容生产一页纸",
    content_type: "one-pager",
    template_name: "一页纸",
    output_text: "目标：建设面向商品销售的 AI 视觉内容生产线，先做换场景、图生图、图生视频。",
    input_prompt: "生成北京铁血科技 AI 视觉内容生产方案",
    output_format: "text",
    favorited: false,
    created_at: "2026-03-24T00:00:00Z",
    updated_at: "2026-03-24T00:00:00Z"
  },
  {
    id: "content-2",
    user_id: "user-1",
    project_id: "project-2",
    title: "首页 PRD 摘要",
    content_type: "outline",
    template_name: "提纲",
    output_text: "首页包含待办、项目、文件、会议、快捷入口、全局搜索和快速命令。",
    input_prompt: "AI 工作台首页功能模块",
    output_format: "text",
    favorited: false,
    created_at: "2026-03-24T00:00:00Z",
    updated_at: "2026-03-24T00:00:00Z"
  }
];

export const reports: ReportItem[] = [
  {
    id: "report-1",
    user_id: "user-1",
    report_type: "weekly",
    period_start: "2026-03-18",
    period_end: "2026-03-24",
    output_text: "本周完成了 AI 工作台功能收敛、铁血科技项目方案方向判断，并开始搭建 Web App 骨架。",
    created_at: "2026-03-24T00:00:00Z",
    updated_at: "2026-03-24T00:00:00Z"
  }
];

export const promptTemplates: PromptTemplate[] = [
  {
    id: "prompt-1",
    user_id: "user-1",
    name: "会议纪要整理",
    category: "meeting",
    prompt_text: "请将以下会议内容整理为摘要、结论、行动项、风险点和下一步建议。",
    is_favorite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "prompt-2",
    user_id: "user-1",
    name: "一页纸方案",
    category: "proposal",
    prompt_text: "请把以下内容整理成一页纸方案：背景、问题、目标、建议、步骤、风险。",
    is_favorite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "prompt-3",
    user_id: "user-1",
    name: "短视频脚本",
    category: "content",
    prompt_text: "请根据主题、受众和目标平台生成短视频脚本。",
    is_favorite: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const quickNotes: QuickNote[] = [
  {
    id: "note-1",
    user_id: "user-1",
    content: "把视觉 brief 也做成内容模板之一。",
    related_project_id: "project-2",
    converted_to_task: false,
    converted_to_content: false,
    tags: ["产品"],
    created_at: "2026-03-24T09:10:00Z",
    updated_at: "2026-03-24T09:10:00Z"
  },
  {
    id: "note-2",
    user_id: "user-1",
    content: "客户项目里要把'换脸'改成'受控模特编辑'。",
    related_project_id: "project-1",
    converted_to_task: false,
    converted_to_content: false,
    tags: ["客户"],
    created_at: "2026-03-24T11:40:00Z",
    updated_at: "2026-03-24T11:40:00Z"
  }
];
