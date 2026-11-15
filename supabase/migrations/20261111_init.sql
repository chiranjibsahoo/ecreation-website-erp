-- Supabase Schema Migration: Ecreation IT Solution
-- Tables: leads, services, projects, blog_posts
-- Includes strict Row Level Security (RLS) policies

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. LEADS TABLE
create table if not exists public.leads (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text not null,
    phone text,
    company text,
    service_required text not null,
    budget_range text,
    message text not null,
    source text default 'direct',
    status text default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'archived')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for lead sorting and filtering
create index if not exists idx_leads_created_at on public.leads(created_at desc);
create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_source on public.leads(source);

-- Enable RLS on leads
alter table public.leads enable row level security;

-- Policies for leads:
-- Anyone can submit a lead (Public INSERT)
create policy "Public can submit leads"
    on public.leads
    for insert
    to anon, authenticated
    with check (true);

-- Only authenticated users (Admins) can view, update, or delete leads
create policy "Admins can view leads"
    on public.leads
    for select
    to authenticated
    using (true);

create policy "Admins can update leads"
    on public.leads
    for update
    to authenticated
    using (true)
    with check (true);

create policy "Admins can delete leads"
    on public.leads
    for delete
    to authenticated
    using (true);


-- 2. SERVICES TABLE
create table if not exists public.services (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    title text not null,
    short_description text not null,
    full_description text not null,
    icon_name text not null,
    category text not null,
    features text[] default '{}'::text[],
    deliverables text[] default '{}'::text[],
    tech_stack text[] default '{}'::text[],
    featured boolean default false,
    display_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.services enable row level security;

-- Anyone can read services
create policy "Public can view services"
    on public.services
    for select
    to anon, authenticated
    using (true);

-- Only admins can mutate services
create policy "Admins can manage services"
    on public.services
    for all
    to authenticated
    using (true)
    with check (true);


-- 3. PROJECTS TABLE
create table if not exists public.projects (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    title text not null,
    client text not null,
    category text not null,
    summary text not null,
    challenge text not null,
    solution text not null,
    results jsonb default '[]'::jsonb,
    tags text[] default '{}'::text[],
    featured boolean default false,
    published_at date default current_date,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;

create policy "Public can view projects"
    on public.projects
    for select
    to anon, authenticated
    using (true);

create policy "Admins can manage projects"
    on public.projects
    for all
    to authenticated
    using (true)
    with check (true);


-- 4. BLOG POSTS TABLE
create table if not exists public.blog_posts (
    id uuid primary key default uuid_generate_v4(),
    slug text unique not null,
    title text not null,
    excerpt text not null,
    content text not null,
    category text not null,
    author jsonb not null default '{"name": "Ecreation Editorial", "role": "Solutions Architect"}'::jsonb,
    tags text[] default '{}'::text[],
    read_time text default '5 min read',
    published_at timestamp with time zone default timezone('utc'::text, now()) not null,
    is_published boolean default true,
    seo_description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.blog_posts enable row level security;

create policy "Public can view published blog posts"
    on public.blog_posts
    for select
    to anon, authenticated
    using (is_published = true);

create policy "Admins can manage all blog posts"
    on public.blog_posts
    for all
    to authenticated
    using (true)
    with check (true);


-- 5. AI ASSISTANT CHAT SESSIONS TABLE
create table if not exists public.chat_sessions (
    id uuid primary key default uuid_generate_v4(),
    session_id text unique not null,
    visitor_name text default 'Website Visitor',
    visitor_email text default '',
    visitor_phone text default '',
    service_interested text default 'General IT Consultation',
    lead_captured boolean default false,
    lead_id text,
    messages jsonb not null default '[]'::jsonb,
    started_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_chat_sessions_updated_at on public.chat_sessions(updated_at desc);
create index if not exists idx_chat_sessions_lead_captured on public.chat_sessions(lead_captured);

alter table public.chat_sessions enable row level security;

create policy "Public can insert and update chat sessions"
    on public.chat_sessions
    for all
    to anon, authenticated
    using (true)
    with check (true);


