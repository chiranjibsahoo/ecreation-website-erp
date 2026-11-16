import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const isSupabaseConfigured = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co'
  );
};

export const hasServiceRoleKey = () => {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(key && key !== 'your-service-role-key-here');
};

/**
 * Cookie-aware client (uses the logged-in admin's Supabase Auth session, subject to RLS).
 * Use it to identify the signed-in user.
 */
export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Handled for server components
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options });
        } catch {
          // Handled for server components
        }
      },
    },
  });
};

/**
 * Server-only data client for API routes. Uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS) so that
 * public enquiries can be written and the admin portal can read them reliably on Vercel.
 * NEVER import this into a client component and NEVER expose the key with a NEXT_PUBLIC_ prefix.
 * Falls back to the anon key when the service-role key is not set.
 */
export const createAdminSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const key = hasServiceRoleKey()
    ? (process.env.SUPABASE_SERVICE_ROLE_KEY as string)
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

  return createSupabaseJsClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};

/**
 * Returns true when the request may access admin data:
 * - Supabase configured  → a valid Supabase Auth session cookie is required.
 * - Supabase NOT configured (local development) → allowed, so the demo admin keeps working.
 */
export const isAdminRequest = async (): Promise<boolean> => {
  if (!isSupabaseConfigured()) return true;
  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return Boolean(user);
  } catch {
    return false;
  }
};
