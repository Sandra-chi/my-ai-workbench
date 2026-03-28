import { createServerSupabaseClient } from "./server";
import type { Project, Task, DocumentItem, Meeting, ContentItem, ReportItem, QuickNote } from "@/lib/types";

// 获取当前用户ID（单用户版本，从数据库获取第一个用户）
async function getCurrentUserId(): Promise<string> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .limit(1)
    .single();

  if (error || !data) {
    throw new Error("请先在数据库中创建用户");
  }
  return data.id;
}

// 获取所有项目
export async function getProjects(): Promise<Project[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 获取单个项目
export async function getProject(id: string): Promise<Project | null> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

// 创建项目
export async function createProject(project: Partial<Project>): Promise<Project> {
  const supabase = createServerSupabaseClient();
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: project.name,
      description: project.description,
      goal: project.goal,
      status: project.status || "planning",
      current_stage: project.current_stage,
      start_date: project.start_date,
      due_date: project.due_date,
      tags: project.tags || [],
      color: project.color,
      pinned: project.pinned || false,
      archived: false,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data!;
}

// 获取所有任务
export async function getTasks(): Promise<Task[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 获取项目的任务
export async function getProjectTasks(projectId: string): Promise<Task[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 创建任务
export async function createTask(task: Partial<Task>): Promise<Task> {
  const supabase = createServerSupabaseClient();
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: task.title,
      description: task.description,
      status: task.status || "todo",
      priority: task.priority || "medium",
      due_date: task.due_date,
      project_id: task.project_id,
      ai_generated: task.ai_generated || false,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data!;
}

// 更新任务状态
export async function updateTaskStatus(taskId: string, status: string): Promise<void> {
  const supabase = createServerSupabaseClient();
  const { error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", taskId);

  if (error) throw error;
}

// 获取所有文档
export async function getDocuments(): Promise<DocumentItem[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 创建文档
export async function createDocument(document: Partial<DocumentItem>): Promise<DocumentItem> {
  const supabase = createServerSupabaseClient();
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("documents")
    .insert({
      title: document.title,
      file_name: document.file_name,
      file_type: document.file_type,
      file_url: document.file_url,
      file_size: document.file_size,
      tags: document.tags || [],
      summary: document.summary,
      user_id: userId,
      project_id: document.project_id,
    })
    .select()
    .single();

  if (error) throw error;
  return data!;
}

// 获取所有会议
export async function getMeetings(): Promise<Meeting[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 创建会议
export async function createMeeting(meeting: Partial<Meeting>): Promise<Meeting> {
  const supabase = createServerSupabaseClient();
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("meetings")
    .insert({
      title: meeting.title,
      participants: meeting.participants || [],
      meeting_date: meeting.meeting_date,
      raw_text: meeting.raw_text,
      summary: meeting.summary,
      decisions: meeting.decisions || [],
      action_items: meeting.action_items || [],
      risks: meeting.risks || [],
      follow_ups: meeting.follow_ups || [],
      user_id: userId,
      project_id: meeting.project_id,
    })
    .select()
    .single();

  if (error) throw error;
  return data!;
}

// 获取所有内容
export async function getContents(): Promise<ContentItem[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("contents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 创建内容
export async function createContent(content: Partial<ContentItem>): Promise<ContentItem> {
  const supabase = createServerSupabaseClient();
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("contents")
    .insert({
      title: content.title,
      content_type: content.content_type,
      template_name: content.template_name,
      input_prompt: content.input_prompt,
      input_context: content.input_context,
      output_text: content.output_text,
      output_format: content.output_format || "markdown",
      tags: content.tags || [],
      favorited: false,
      user_id: userId,
      project_id: content.project_id,
    })
    .select()
    .single();

  if (error) throw error;
  return data!;
}

// 获取所有快速笔记
export async function getQuickNotes(): Promise<QuickNote[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("quick_notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 获取所有报告
export async function getReports(): Promise<ReportItem[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 获取所有 Prompt 模板
export async function getPromptTemplates(): Promise<any[]> {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("prompts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []);
}

// 创建 Prompt 模板
export async function createPromptTemplate(template: Partial<any>): Promise<any> {
  const supabase = createServerSupabaseClient();
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("prompts")
    .insert({
      name: template.name,
      category: template.category || "template",
      prompt_text: template.prompt_text,
      user_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data!;
}
