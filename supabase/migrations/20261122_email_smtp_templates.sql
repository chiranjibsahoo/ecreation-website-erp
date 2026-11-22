-- Ecreation IT Solution: Admin Email SMTP & Enquiry Notification Template Settings
-- Run in Supabase SQL Editor

create table if not exists public.email_settings (
  id text primary key default 'default',
  enabled boolean default false,
  smtp_host text default 'smtp.gmail.com',
  smtp_port integer default 465,
  smtp_secure boolean default true,
  smtp_user text default '',
  smtp_pass text default '',
  from_name text default 'Ecreation IT Solution Alerts',
  from_email text default '',
  admin_notify_emails text default 'admin@ecreation.in',
  subject_template text default 'New Enquiry [{{ref_id}}] - {{service}} from {{name}}',
  header_title text default 'New Client Enquiry Received',
  header_subtitle text default 'Ecreation IT Solution - Instant Admin Alert',
  intro_text text default 'A new business enquiry has been submitted on your website. Complete details are listed below for immediate follow-up:',
  footer_text text default 'This is an automated transactional alert from Ecreation IT Solution Admin ERP. Reply directly to this email to respond to the client.',
  accent_color text default '#d97706',
  show_quick_actions boolean default true,
  last_test_status text default 'Not tested yet',
  last_tested_at timestamptz,
  updated_at timestamptz default now()
);

alter table public.email_settings enable row level security;

drop policy if exists "Admin full access email_settings" on public.email_settings;
create policy "Admin full access email_settings" on public.email_settings
  for all to authenticated using (true) with check (true);
