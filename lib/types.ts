export type ProjectStatus = "planning" | "active" | "paused" | "completed";
export type TaskStatus = "todo" | "doing" | "done";
export type Priority = "low" | "medium" | "high";
export type ContentType =
  | "title"
  | "outline"
  | "one-pager"
  | "proposal"
  | "script"
  | "brief"
  | "email"
  | "daily-report"
  | "weekly-report";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string;
  goal: string;
  status: ProjectStatus;
  current_stage: string;
  start_date: string;
  due_date?: string;
  tags: string[];
  color?: string;
  pinned: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  project_id?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  due_date?: string;
  completed_at?: string;
  source_type?: string;
  source_id?: string;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
}

export interface DocumentItem {
  id: string;
  user_id: string;
  project_id?: string;
  title: string;
  file_name: string;
  file_url?: string;
  file_type: "pdf" | "docx" | "txt" | "md" | "audio";
  file_size?: number;
  tags: string[];
  summary: string;
  extracted_text?: string;
  ai_keywords?: string[];
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

export interface Meeting {
  id: string;
  user_id: string;
  project_id?: string;
  title: string;
  participants: string[];
  meeting_date?: string;
  raw_text?: string;
  audio_url?: string;
  transcript?: string;
  summary: string;
  decisions?: string[];
  action_items: string[];
  risks?: string[];
  follow_ups?: string[];
  created_at: string;
  updated_at: string;
}

export interface ContentItem {
  id: string;
  user_id: string;
  project_id?: string;
  title: string;
  content_type: ContentType;
  template_name?: string;
  input_prompt?: string;
  input_context?: string;
  output_text: string;
  output_format: string;
  tags?: string[];
  favorited: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReportItem {
  id: string;
  user_id: string;
  report_type: "daily" | "weekly" | "monthly";
  period_start?: string;
  period_end?: string;
  related_project_id?: string;
  source_summary?: string;
  output_text: string;
  created_at: string;
  updated_at: string;
}

export interface PromptTemplate {
  id: string;
  user_id: string;
  name: string;
  category: string;
  prompt_text: string;
  variables_schema?: any;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuickNote {
  id: string;
  user_id: string;
  content: string;
  source_type?: string;
  related_project_id?: string;
  converted_to_task: boolean;
  converted_to_content: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

// 前端展示用的简化类型（从数据库数据转换）
export interface ProjectDisplay {
  id: string;
  name: string;
  description: string;
  goal: string;
  status: ProjectStatus;
  currentStage: string;
  startDate: string;
  dueDate?: string;
  tags: string[];
  pinned: boolean;
}

export interface TaskDisplay {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  completedAt?: string;
  aiGenerated?: boolean;
}

export interface DocumentDisplay {
  id: string;
  projectId?: string;
  title: string;
  fileType: "pdf" | "docx" | "txt" | "md" | "audio";
  tags: string[];
  summary: string;
  createdAt: string;
}

export interface MeetingDisplay {
  id: string;
  projectId?: string;
  title: string;
  meetingDate: string;
  participants: string[];
  summary: string;
  actionItems: string[];
  risks: string[];
  nextSteps: string[];
}

export interface ContentDisplay {
  id: string;
  projectId?: string;
  title: string;
  contentType: ContentType;
  outputText: string;
  createdAt: string;
}

export interface ReportDisplay {
  id: string;
  reportType: "daily" | "weekly" | "monthly";
  periodLabel: string;
  outputText: string;
  createdAt: string;
}
