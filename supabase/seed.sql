-- 插入测试用户
INSERT INTO public.users (id, name, email)
VALUES (gen_random_uuid(), 'Sandra', 'sandra@example.com')
ON CONFLICT (email) DO NOTHING;

-- 获取用户ID（用于关联）
DO $$
DECLARE user_id UUID;
BEGIN
  SELECT id INTO user_id FROM public.users WHERE email = 'sandra@example.com' LIMIT 1;

  -- 插入项目
  INSERT INTO public.projects (user_id, name, description, goal, status, current_stage, start_date, due_date, tags, pinned) VALUES
  (user_id, '北京铁血科技 AI 视觉内容生产方案', '围绕龙牙的图像/视频/数字人内容生产方案。', '输出一版可汇报、可试点的 0-1 项目方案。', 'active', '方案收敛与 MVP 定义', '2026-03-10', '2026-03-31', ARRAY['AI 内容生产', '方案', '客户'], true),
  (user_id, '我的 AI 工作台 1.0', '个人日常工作 AI 网站开发。', '做出可每天使用的项目+内容+会议+复盘四件套。', 'active', '页面与数据层骨架搭建', '2026-03-20', '2026-04-15', ARRAY['产品', '开发', 'vibe coding'], true),
  (user_id, 'Q2 内容策略研究', '整理下一阶段的内容方向与选题。', '建立季度研究资料库与执行节奏。', 'planning', '收集资料', '2026-03-18', NULL, ARRAY['研究', '策略'], false)
  ON CONFLICT DO NOTHING;
END $$;

-- 获取项目ID并插入任务
DO $$
DECLARE user_id UUID;
DECLARE proj1_id UUID;
DECLARE proj2_id UUID;
DECLARE proj3_id UUID;
BEGIN
  SELECT id INTO user_id FROM public.users WHERE email = 'sandra@example.com' LIMIT 1;
  SELECT id INTO proj1_id FROM public.projects WHERE name = '北京铁血科技 AI 视觉内容生产方案' LIMIT 1;
  SELECT id INTO proj2_id FROM public.projects WHERE name = '我的 AI 工作台 1.0' LIMIT 1;
  SELECT id INTO proj3_id FROM public.projects WHERE name = 'Q2 内容策略研究' LIMIT 1;

  -- 插入任务
  INSERT INTO public.tasks (user_id, project_id, title, description, status, priority, due_date, ai_generated) VALUES
  (user_id, proj2_id, '完成首页与项目页骨架', '搭建首页和项目页面的基础结构', 'doing', 'high', '2026-03-25', false),
  (user_id, proj1_id, '整理 AI 视觉内容生产模块优先级', '确定各模块的开发优先级', 'todo', 'high', '2026-03-26', false),
  (user_id, proj2_id, '写 Supabase schema.sql', '设计并创建数据库表结构', 'done', 'medium', '2026-03-26', true),
  (user_id, proj3_id, '收集 10 份行业研究资料', '收集行业相关的研究报告和资料', 'done', 'medium', '2026-03-22', false)
  ON CONFLICT DO NOTHING;
END $$;

-- 插入文档
DO $$
DECLARE user_id UUID;
DECLARE proj1_id UUID;
DECLARE proj2_id UUID;
DECLARE proj3_id UUID;
BEGIN
  SELECT id INTO user_id FROM public.users WHERE email = 'sandra@example.com' LIMIT 1;
  SELECT id INTO proj1_id FROM public.projects WHERE name = '北京铁血科技 AI 视觉内容生产方案' LIMIT 1;
  SELECT id INTO proj2_id FROM public.projects WHERE name = '我的 AI 工作台 1.0' LIMIT 1;
  SELECT id INTO proj3_id FROM public.projects WHERE name = 'Q2 内容策略研究' LIMIT 1;

  INSERT INTO public.documents (user_id, project_id, title, file_name, file_type, tags, summary) VALUES
  (user_id, proj1_id, '铁血科技 2024 年报摘录.pdf', '铁血科技 2024 年报摘录.pdf', 'pdf', ARRAY['年报', '客户研究'], '主营收入以商品销售为主，短视频/直播内容与销售链路高度相关。'),
  (user_id, proj2_id, 'AI 工作台 PRD v0.1.docx', 'AI 工作台 PRD v0.1.docx', 'docx', ARRAY['PRD', '产品'], '定义首页、项目空间、资料库、会议纪要、内容中心、复盘页六大模块。'),
  (user_id, proj3_id, 'Q2 研究笔记.txt', 'Q2 研究笔记.txt', 'txt', ARRAY['研究', '内容策略'], '归纳了短视频选题、AI 工具趋势和内容制作效率问题。')
  ON CONFLICT DO NOTHING;
END $$;

-- 插入会议
DO $$
DECLARE user_id UUID;
DECLARE proj1_id UUID;
DECLARE proj2_id UUID;
BEGIN
  SELECT id INTO user_id FROM public.users WHERE email = 'sandra@example.com' LIMIT 1;
  SELECT id INTO proj1_id FROM public.projects WHERE name = '北京铁血科技 AI 视觉内容生产方案' LIMIT 1;
  SELECT id INTO proj2_id FROM public.projects WHERE name = '我的 AI 工作台 1.0' LIMIT 1;

  INSERT INTO public.meetings (user_id, project_id, title, participants, meeting_date, summary, decisions, action_items, risks, follow_ups) VALUES
  (user_id, proj1_id, '铁血科技需求整理会', ARRAY['你', '业务同事', '内容负责人'], '2026-03-23 14:30:00', '初步确认视觉内容生产是更高优先级，换脸应降级为受控编辑能力。', ARRAY['优先做视觉内容生产', '换脸功能降级'], ARRAY['补充项目模块优先级', '定义 MVP 范围', '单独补一页合规边界'], ARRAY['业务目标容易被写成功能堆砌', '换脸方向合规敏感'], ARRAY['形成 1 页内部汇报版本', '确定 P0/P1/P2 优先级']),
  (user_id, proj2_id, 'AI 工作台产品梳理', ARRAY['你'], '2026-03-24 10:00:00', '决定先做项目、内容、会议、复盘四件套，文件知识库同步搭底。', ARRAY['先做四件套核心功能'], ARRAY['输出目录结构', '设计数据库', '搭首页框架'], ARRAY['功能过多容易拖慢开发', '不要一开始做多人协作'], ARRAY['先出代码骨架', '用 mock data 跑起来'])
  ON CONFLICT DO NOTHING;
END $$;

-- 插入内容
DO $$
DECLARE user_id UUID;
DECLARE proj1_id UUID;
DECLARE proj2_id UUID;
BEGIN
  SELECT id INTO user_id FROM public.users WHERE email = 'sandra@example.com' LIMIT 1;
  SELECT id INTO proj1_id FROM public.projects WHERE name = '北京铁血科技 AI 视觉内容生产方案' LIMIT 1;
  SELECT id INTO proj2_id FROM public.projects WHERE name = '我的 AI 工作台 1.0' LIMIT 1;

  INSERT INTO public.contents (user_id, project_id, title, content_type, output_text) VALUES
  (user_id, proj1_id, 'AI 视觉内容生产一页纸', 'one-pager', '目标：建设面向商品销售的 AI 视觉内容生产线，先做换场景、图生图、图生视频。'),
  (user_id, proj2_id, '首页 PRD 摘要', 'outline', '首页包含待办、项目、文件、会议、快捷入口、全局搜索和快速命令。')
  ON CONFLICT DO NOTHING;
END $$;

-- 插入快速笔记
DO $$
DECLARE user_id UUID;
DECLARE proj1_id UUID;
DECLARE proj2_id UUID;
BEGIN
  SELECT id INTO user_id FROM public.users WHERE email = 'sandra@example.com' LIMIT 1;
  SELECT id INTO proj1_id FROM public.projects WHERE name = '北京铁血科技 AI 视觉内容生产方案' LIMIT 1;
  SELECT id INTO proj2_id FROM public.projects WHERE name = '我的 AI 工作台 1.0' LIMIT 1;

  INSERT INTO public.quick_notes (user_id, content, related_project_id, tags) VALUES
  (user_id, '把视觉 brief 也做成内容模板之一。', proj2_id, ARRAY['想法']),
  (user_id, '客户项目里要把"换脸"改成"受控模特编辑"。', proj1_id, ARRAY['注意事项'])
  ON CONFLICT DO NOTHING;
END $$;

-- 插入报告
DO $$
DECLARE user_id UUID;
BEGIN
  SELECT id INTO user_id FROM public.users WHERE email = 'sandra@example.com' LIMIT 1;

  INSERT INTO public.reports (user_id, report_type, period_start, period_end, related_project_id, source_summary, output_text) VALUES
  (user_id, 'weekly', '2026-03-18', '2026-03-24', NULL, '本周工作汇总', '本周完成了 AI 工作台功能收敛、铁血科技项目方案方向判断，并开始搭建 Web App 骨架。')
  ON CONFLICT DO NOTHING;
END $$;
