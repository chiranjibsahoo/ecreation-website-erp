-- Ecreation IT Solution: Managed Blogs CMS & Auto-Blog Publishing Engine
-- Run in Supabase SQL Editor

create table if not exists public.blog_posts (
  id text primary key,
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null default 'Engineering',
  tags jsonb not null default '[]'::jsonb,
  primary_keyword text default '',
  keyword_density numeric(5,2) default 1.5,
  seo_description text default '',
  cover_theme text default 'emerald-gold',
  author_name text default 'Ecreation Engineering Editorial',
  author_role text default 'Solutions Architecture Team',
  read_time text default '5 min read',
  related_service_slug text default 'custom-software-engineering',
  related_project_slug text default 'nsfs-erp-system',
  status text default 'published' check (status in ('published', 'draft')),
  source_type text default 'manual' check (source_type in ('manual', 'auto')),
  published_at text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.blog_automation_settings (
  id text primary key default 'default',
  enabled boolean default true,
  interval_days integer default 3 check (interval_days >= 1 and interval_days <= 30),
  last_auto_published_at timestamptz,
  next_scheduled_at timestamptz,
  default_author_name text default 'Ecreation Engineering Editorial',
  default_author_role text default 'Principal Solutions Architecture Team',
  updated_at timestamptz default now()
);

alter table public.blog_posts enable row level security;
alter table public.blog_automation_settings enable row level security;

drop policy if exists "Public can read published blog_posts" on public.blog_posts;
create policy "Public can read published blog_posts" on public.blog_posts
  for select to anon, authenticated using (status = 'published');

drop policy if exists "Admin full access blog_posts" on public.blog_posts;
create policy "Admin full access blog_posts" on public.blog_posts
  for all to authenticated using (true) with check (true);

drop policy if exists "Admin full access blog_automation_settings" on public.blog_automation_settings;
create policy "Admin full access blog_automation_settings" on public.blog_automation_settings
  for all to authenticated using (true) with check (true);
