-- Ecreation IT Solution: Social Media Accounts, Promotion Studio Posts & Lead Replies
-- Run in Supabase SQL Editor after 20261111_init.sql and 20261116_secure_chat_sessions.sql

-- 1. Social Media Account Connections
create table if not exists public.social_accounts (
  platform text primary key check (platform in ('instagram', 'youtube', 'facebook', 'linkedin', 'x', 'google_flow')),
  display_name text not null,
  account_handle text default '',
  account_id text default '',
  page_or_channel_id text default '',
  credential_secret text default '',
  webhook_url text default '',
  is_connected boolean default false,
  auto_share_enabled boolean default true,
  last_status text default 'Not configured',
  last_tested_at timestamptz,
  updated_at timestamptz default now()
);

-- 2. Social Promotion Studio Posts & Auto-Share Logs
create table if not exists public.social_posts (
  id text primary key,
  title text not null,
  caption text not null,
  hashtags text default '',
  media_url text default '',
  media_type text default 'video' check (media_type in ('video', 'image')),
  source_tool text default 'google_flow',
  flow_prompt text default '',
  platforms jsonb not null default '[]'::jsonb,
  status text default 'published' check (status in ('draft', 'scheduled', 'published', 'partial', 'failed')),
  publish_results jsonb not null default '[]'::jsonb,
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz default now()
);

-- 3. Lead Reply History
create table if not exists public.lead_replies (
  id text primary key,
  lead_id text not null,
  channel text not null check (channel in ('whatsapp', 'email', 'call', 'note')),
  message text not null,
  sent_by text default 'admin@ecreation.in',
  created_at timestamptz default now()
);

-- Enable RLS (Admin authenticated users only)
alter table public.social_accounts enable row level security;
alter table public.social_posts enable row level security;
alter table public.lead_replies enable row level security;

drop policy if exists "Admin full access social_accounts" on public.social_accounts;
create policy "Admin full access social_accounts" on public.social_accounts
  for all to authenticated using (true) with check (true);

drop policy if exists "Admin full access social_posts" on public.social_posts;
create policy "Admin full access social_posts" on public.social_posts
  for all to authenticated using (true) with check (true);

drop policy if exists "Admin full access lead_replies" on public.lead_replies;
create policy "Admin full access lead_replies" on public.lead_replies
  for all to authenticated using (true) with check (true);
