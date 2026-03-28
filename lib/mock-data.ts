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
  email: "me@example.com"
};

export const projects: Project[] = [
  {
    id: "project-1",
    name: "北京铁血科技 AI 视觉内容生产方案",
    description: "围绕龙牙的图像/视频/数字人内容生产方案。",
    goal: "输出一版可汇报、可试点的 0-1 项目方案。",
    status: "active",
    currentStage: "方案收敛与 MVP 定义",
    startDate: "2026-03-10",
    dueDate: "2026-03-31",
    tags: ["AI 内容生产", "方案", "客户"],
    pinned: true
  },
  {
    id: "project-2",
    name: "我的 AI 工作台 1.0",
    description: "个人日常工作 AI 网站开发。",
    goal: "做出可每天使用的项目+内容+会议+复盘四件套。",
    status: "active",
    currentStage: "页面与数据层骨架搭建",
    startDate: "2026-03-20",
    dueDate: "2026-04-15",
    tags: ["产品", "开发", "vibe coding"],
    pinned: true
  },
  {
    id: "project-3",
    name: "Q2 内容策略研究",
    description: "整理下一阶段的内容方向与选题。",
    goal: "建立季度研究资料库与执行节奏。",
    status: "planning",
    currentStage: "收集资料",
    startDate: "2026-03-18",
    tags: ["研究", "策略"]
  }
];

export const tasks: Task[] = [
  {
    id: "task-1",
    projectId: "project-2",
    title: "完成首页与项目页骨架",
    status: "doing",
    priority: "high",
    dueDate: "2026-03-25"
  },
  {
    id: "task-2",
    projectId: "project-1",
    title: "整理 AI 视觉内容生产模块优先级",
    status: "todo",
    priority: "high",
    dueDate: "2026-03-26"
  },
  {
    id: "task-3",
    projectId: "project-2",
    title: "写 Supabase schema.sql",
    status: "todo",
    priority: "medium",
    dueDate: "2026-03-26",
    aiGenerated: true
  },
  {
    id: "task-4",
    projectId: "project-3",
    title: "收集 10 份行业研究资料",
    status: "done",
    priority: "medium",
    dueDate: "2026-03-22"
  }
];

export const documents: DocumentItem[] = [
  {
    id: "doc-1",
    projectId: "project-1",
    title: "铁血科技 2024 年报摘录.pdf",
    fileType: "pdf",
    tags: ["年报", "客户研究"],
    summary: "主营收入以商品销售为主，短视频/直播内容与销售链路高度相关。",
    createdAt: "2026-03-22"
  },
  {
    id: "doc-2",
    projectId: "project-2",
    title: "AI 工作台 PRD v0.1.docx",
    fileType: "docx",
    tags: ["PRD", "产品"],
    summary: "定义首页、项目空间、资料库、会议纪要、内容中心、复盘页六大模块。",
    createdAt: "2026-03-24"
  },
  {
    id: "doc-3",
    projectId: "project-3",
    title: "Q2 研究笔记.txt",
    fileType: "txt",
    tags: ["研究", "内容策略"],
    summary: "归纳了短视频选题、AI 工具趋势和内容制作效率问题。",
    createdAt: "2026-03-21"
  }
];

export const meetings: Meeting[] = [
  {
    id: "meeting-1",
    projectId: "project-1",
    title: "铁血科技需求整理会",
    meetingDate: "2026-03-23 14:30",
    participants: ["你", "业务同事", "内容负责人"],
    summary: "初步确认视觉内容生产是更高优先级，换脸应降级为受控编辑能力。",
    actionItems: ["补充项目模块优先级", "定义 MVP 范围", "单独补一页合规边界"],
    risks: ["业务目标容易被写成功能堆砌", "换脸方向合规敏感"],
    nextSteps: ["形成 1 页内部汇报版本", "确定 P0/P1/P2 优先级"]
  },
  {
    id: "meeting-2",
    projectId: "project-2",
    title: "AI 工作台产品梳理",
    meetingDate: "2026-03-24 10:00",
    participants: ["你"],
    summary: "决定先做项目、内容、会议、复盘四件套，文件知识库同步搭底。",
    actionItems: ["输出目录结构", "设计数据库", "搭首页框架"],
    risks: ["功能过多容易拖慢开发", "不要一开始做多人协作"],
    nextSteps: ["先出代码骨架", "用 mock data 跑起来"]
  }
];

export const contents: ContentItem[] = [
  {
    id: "content-1",
    projectId: "project-1",
    title: "AI 视觉内容生产一页纸",
    contentType: "one-pager",
    outputText: "目标：建设面向商品销售的 AI 视觉内容生产线，先做换场景、图生图、图生视频。",
    createdAt: "2026-03-24"
  },
  {
    id: "content-2",
    projectId: "project-2",
    title: "首页 PRD 摘要",
    contentType: "outline",
    outputText: "首页包含待办、项目、文件、会议、快捷入口、全局搜索和快速命令。",
    createdAt: "2026-03-24"
  }
];

export const reports: ReportItem[] = [
  {
    id: "report-1",
    reportType: "weekly",
    periodLabel: "2026-03-18 ~ 2026-03-24",
    outputText: "本周完成了 AI 工作台功能收敛、铁血科技项目方案方向判断，并开始搭建 Web App 骨架。",
    createdAt: "2026-03-24"
  }
];

export const promptTemplates: PromptTemplate[] = [
  {
    id: "prompt-1",
    name: "会议纪要整理",
    category: "meeting",
    promptText: "请将以下会议内容整理为摘要、结论、行动项、风险点和下一步建议。"
  },
  {
    id: "prompt-2",
    name: "一页纸方案",
    category: "proposal",
    promptText: "请把以下内容整理成一页纸方案：背景、问题、目标、建议、步骤、风险。"
  },
  {
    id: "prompt-3",
    name: "短视频脚本",
    category: "content",
    promptText: "请根据主题、受众和目标平台生成短视频脚本。"
  }
];

export const quickNotes: QuickNote[] = [
  {
    id: "note-1",
    content: "把视觉 brief 也做成内容模板之一。",
    relatedProjectId: "project-2",
    createdAt: "2026-03-24 09:10"
  },
  {
    id: "note-2",
    content: "客户项目里要把‘换脸’改成‘受控模特编辑’。",
    relatedProjectId: "project-1",
    createdAt: "2026-03-24 11:40"
  }
];
