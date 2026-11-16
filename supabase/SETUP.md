# Supabase + Vercel Setup (Live Enquiry Sync)

This connects the website, the Admin ERP portal and the AI Assistant chat logs to one Supabase
database, so every enquiry made on the live Vercel site shows up in `/admin` immediately.

> The Vercel file system is **read-only / temporary**, so the local `.data/` store used in development
> cannot persist anything in production. Supabase is required for live data.

## 1. Create the Supabase project
1. Sign in at https://supabase.com/dashboard → **New project** (name: `ecreation`, pick the region closest to your customers, e.g. *Mumbai (ap-south-1)*).
2. Save the database password somewhere safe.

## 2. Create the tables
Open **SQL Editor → New query** and run these two files **in order**:
1. `supabase/migrations/20261111_init.sql`
2. `supabase/migrations/20261116_secure_chat_sessions.sql`

## 3. Create your admin login
**Authentication → Users → Add user → Create new user** — enter your admin email + a strong password
and tick **Auto Confirm User**. This is the account you use at `/login`.
(Once Supabase is connected, the demo `admin123` login is disabled automatically.)

## 4. Copy the API keys
**Project Settings → API** (or **Connect**):

| Variable | Where to find it | Exposure |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL | public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `anon` / publishable key | public |
| `SUPABASE_SERVICE_ROLE_KEY` | `service_role` / secret key | **SECRET — server only** |

## 5. Connect to Vercel (pick one)
**A. Vercel integration (easiest, auto-syncs keys):** in the Vercel import screen click **Supabase → Add**
(or Project → *Storage/Integrations* → Supabase) and link the project. Then confirm the three variables above exist
(the integration may name them differently, e.g. `SUPABASE_URL`; if so add the three names listed above manually).

**B. Manual:** Vercel → Project → **Settings → Environment Variables** → add the three variables for
*Production, Preview and Development*, plus `NEXT_PUBLIC_SITE_URL=https://<your-domain>`.

Then **Redeploy** (Deployments → ⋯ → Redeploy) so the new variables take effect.

## 6. Local development
```bash
cp .env.local.example .env.local   # fill in the same three values
npm run dev
```

## 7. Verify the sync
1. Open the live site, submit the Quick Enquiry popup with a test phone + email.
2. Supabase → **Table Editor → leads**: the row appears with `source = Left Quick Enquiry 25% Offer Popup`.
3. Sign in at `/login` with your Supabase admin user → `/admin/leads` shows the same row, highlighted by source.
4. Chat with the AI Assistant → `chat_sessions` fills and `/admin/chats` shows the transcript.

## Security notes
- `SUPABASE_SERVICE_ROLE_KEY` bypasses all security rules. Keep it only in Vercel/`.env.local`; never prefix it with `NEXT_PUBLIC_`.
- `/api/leads` and `/api/chat-logs` (read/update) now require a signed-in Supabase admin session; public visitors can only *submit* enquiries.
- Rotate any key that has ever been pasted in chat, email or a public repo.
