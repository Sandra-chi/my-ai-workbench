-- 我的 AI 工作台 1.0
-- 单用户版本 Supabase 初始化脚本

create extension if not exists vector;

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  name text not null,
  email text not null unique,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  name text not null,
  description text default '',
  goal text default '',
  status text not null default 'planning' check (status in ('planning', 'active', 'paused', 'completed')),
  current_stage text default '',
  start_date date,
  due_date date,
  tags text[] default '{}',
  color text,
  pinned boolean not null default false,
  archived boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  description text default '',
  status text not null default 'todo' check (status in ('todo', 'doing', 'done')),
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  due_date timestamptz,
  completed_at timestamptz,
  source_type text,
  source_id uuid,
  ai_generated boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  file_name text not null,
  file_url text,
  file_type text not null check (file_type in ('pdf', 'docx', 'txt', 'md', 'audio')),
  file_size bigint,
  tags text[] default '{}',
  summary text default '',
  extracted_text text default '',
  ai_keywords text[] default '{}',
  pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  chunk_index integer not null,
  content text not null,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

create index if not exists idx_document_chunks_document_id on public.document_chunks(document_id);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  participants text[] default '{}',
  meeting_date timestamptz,
  raw_text text default '',
  audio_url text,
  transcript text default '',
  summary text default '',
  decisions text[] default '{}',
  action_items text[] default '{}',
  risks text[] default '{}',
  follow_ups text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  content_type text not null,
  template_name text,
  input_prompt text default '',
  input_context text default '',
  output_text text default '',
  output_format text default 'markdown',
  tags text[] default '{}',
  favorited boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  report_type text not null check (report_type in ('daily', 'weekly', 'monthly')),
  period_start date,
  period_end date,
  related_project_id uuid references public.projects(id) on delete set null,
  source_summary text default '',
  output_text text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  name text not null,
  category text not null,
  prompt_text text not null,
  variables_schema jsonb default '{}'::jsonb,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  name text not null,
  category text not null,
  description text default '',
  input_schema jsonb default '{}'::jsonb,
  output_schema jsonb default '{}'::jsonb,
  system_instruction text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quick_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  content text not null,
  source_type text,
  related_project_id uuid references public.projects(id) on delete set null,
  converted_to_task boolean not null default false,
  converted_to_content boolean not null default false,
  tags text[] default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_users_updated_at on public.users;
create trigger trg_users_updated_at before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists trg_tasks_updated_at on public.tasks;
create trigger trg_tasks_updated_at before update on public.tasks
for each row execute function public.set_updated_at();

drop trigger if exists trg_documents_updated_at on public.documents;
create trigger trg_documents_updated_at before update on public.documents
for each row execute function public.set_updated_at();

drop trigger if exists trg_meetings_updated_at on public.meetings;
create trigger trg_meetings_updated_at before update on public.meetings
for each row execute function public.set_updated_at();

drop trigger if exists trg_contents_updated_at on public.contents;
create trigger trg_contents_updated_at before update on public.contents
for each row execute function public.set_updated_at();

drop trigger if exists trg_reports_updated_at on public.reports;
create trigger trg_reports_updated_at before update on public.reports
for each row execute function public.set_updated_at();

drop trigger if exists trg_prompts_updated_at on public.prompts;
create trigger trg_prompts_updated_at before update on public.prompts
for each row execute function public.set_updated_at();

drop trigger if exists trg_templates_updated_at on public.templates;
create trigger trg_templates_updated_at before update on public.templates
for each row execute function public.set_updated_at();

drop trigger if exists trg_quick_notes_updated_at on public.quick_notes;
create trigger trg_quick_notes_updated_at before update on public.quick_notes
for each row execute function public.set_updated_at();

-- 单用户开发阶段可先关闭严格 RLS，等接真实登录后再补。
alter table public.users enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.documents enable row level security;
alter table public.document_chunks enable row level security;
alter table public.meetings enable row level security;
alter table public.contents enable row level security;
alter table public.reports enable row level security;
alter table public.prompts enable row level security;
alter table public.templates enable row level security;
alter table public.quick_notes enable row level security;

-- 示例策略：仅允许 authenticated 用户访问自己的数据
create policy "users_select_own" on public.users
for select using (auth.uid() = auth_user_id);

create policy "projects_own_all" on public.projects
for all using (
  exists (
    select 1 from public.users u
    where u.id = projects.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = projects.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "tasks_own_all" on public.tasks
for all using (
  exists (
    select 1 from public.users u
    where u.id = tasks.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = tasks.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "documents_own_all" on public.documents
for all using (
  exists (
    select 1 from public.users u
    where u.id = documents.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = documents.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "meetings_own_all" on public.meetings
for all using (
  exists (
    select 1 from public.users u
    where u.id = meetings.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = meetings.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "contents_own_all" on public.contents
for all using (
  exists (
    select 1 from public.users u
    where u.id = contents.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = contents.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "reports_own_all" on public.reports
for all using (
  exists (
    select 1 from public.users u
    where u.id = reports.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = reports.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "prompts_own_all" on public.prompts
for all using (
  exists (
    select 1 from public.users u
    where u.id = prompts.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = prompts.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "templates_own_all" on public.templates
for all using (
  exists (
    select 1 from public.users u
    where u.id = templates.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = templates.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "quick_notes_own_all" on public.quick_notes
for all using (
  exists (
    select 1 from public.users u
    where u.id = quick_notes.user_id and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.users u
    where u.id = quick_notes.user_id and u.auth_user_id = auth.uid()
  )
);

create policy "document_chunks_via_document" on public.document_chunks
for all using (
  exists (
    select 1
    from public.documents d
    join public.users u on u.id = d.user_id
    where d.id = document_chunks.document_id
      and u.auth_user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.documents d
    join public.users u on u.id = d.user_id
    where d.id = document_chunks.document_id
      and u.auth_user_id = auth.uid()
  )
);
