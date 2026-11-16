-- Security hardening: chat transcripts must NOT be readable with the public anon key.
-- All chat_sessions reads/writes now go through server-side API routes that use the
-- service-role key (which bypasses RLS). Admins signed in via Supabase Auth may read them.

drop policy if exists "Public can insert and update chat sessions" on public.chat_sessions;

create policy "Admins can read chat sessions"
    on public.chat_sessions
    for select
    to authenticated
    using (true);

create policy "Admins can manage chat sessions"
    on public.chat_sessions
    for all
    to authenticated
    using (true)
    with check (true);
