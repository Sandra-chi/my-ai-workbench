# 我的 AI 工作台 1.0

一个基于 **Next.js 14 + TypeScript + Tailwind CSS + Supabase + OpenAI** 的个人 AI 工作台骨架项目。

## 包含内容

- 首页工作台
- 项目空间（概览 / 资料 / 任务 / 聊天 / 产出）
- 文件知识库
- 会议纪要页
- 内容生成中心
- 复盘页
- Supabase 数据库 schema
- OpenAI / Ollama 兼容的 API 封装
- 可直接替换成真实数据的 mock data

## 技术栈

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui 风格组件
- Supabase（数据库 / 认证 / 文件存储）
- OpenAI API（后续可切 Ollama）

## 目录结构

```bash
my-ai-workbench/
├── app/
│   ├── api/
│   │   ├── ai/generate/route.ts
│   │   ├── documents/summarize/route.ts
│   │   ├── meetings/process/route.ts
│   │   └── reports/generate/route.ts
│   ├── content/page.tsx
│   ├── library/page.tsx
│   ├── meetings/page.tsx
│   ├── projects/[id]/page.tsx
│   ├── projects/page.tsx
│   ├── reports/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── content/content-generator.tsx
│   ├── dashboard/quick-actions.tsx
│   ├── dashboard/recent-section.tsx
│   ├── layout/app-shell.tsx
│   ├── layout/sidebar.tsx
│   ├── layout/topbar.tsx
│   ├── library/document-list.tsx
│   ├── meetings/meeting-processor.tsx
│   ├── projects/project-chat.tsx
│   ├── projects/project-tabs.tsx
│   ├── reports/report-builder.tsx
│   ├── shared/page-header.tsx
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── lib/
│   ├── ai.ts
│   ├── mock-data.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── types.ts
│   └── utils.ts
├── supabase/schema.sql
├── .env.example
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 环境变量

复制 `.env.example` 为 `.env.local`：

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
AI_PROVIDER=openai
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:7b
```

## 初始化

```bash
npm install
npm run dev
```

## Supabase 初始化

将 `supabase/schema.sql` 执行到你的 Supabase SQL Editor 中。

## 开发建议

1. 先用 `lib/mock-data.ts` 跑通界面
2. 再替换为 Supabase 真实数据
3. 再接向量检索 / embeddings
4. 再加登录权限和文件解析工作流

## 后续适合优先增加

- 文档切片与 embeddings 写入
- 项目上下文聊天
- 会议录音转写
- 每日自动复盘
- Prompt 模板管理
