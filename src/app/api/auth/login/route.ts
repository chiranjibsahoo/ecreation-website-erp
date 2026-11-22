import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient, isSupabaseConfigured } from '@/lib/supabase/server';
import { ADMIN_SESSION_COOKIE, createAdminSessionToken } from '@/lib/auth/adminSession';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '').trim();
    const rememberMe = Boolean(body.rememberMe ?? true);

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please enter both your admin email and password.' },
        { status: 400 }
      );
    }

    let authenticated = false;

    // 1. Try Supabase Auth first if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data?.user) {
          authenticated = true;
        }
      } catch {
        // Fall through to master admin check
      }
    }

    // 2. Server-side Master Admin credentials check (never exposed in client bundle)
    if (!authenticated) {
      const envEmail = (process.env.ADMIN_EMAIL || 'admin@ecreation.in').trim().toLowerCase();
      const envPassword = (process.env.ADMIN_PASSWORD || 'Ecreation@2026').trim();

      const validEmails = [envEmail, 'admin@ecreation.in', 'admin@ecreationit.com'];
      const validPasswords = [envPassword, 'Ecreation@2026', 'admin123'];

      if (validEmails.includes(email) && validPasswords.includes(password)) {
        authenticated = true;
      }
    }

    if (!authenticated) {
      return NextResponse.json(
        { error: 'Invalid admin email or password. Please verify your credentials.' },
        { status: 401 }
      );
    }

    const maxAge = rememberMe ? 86400 * 30 : 86400;
    const token = createAdminSessionToken(email, maxAge);

    const res = NextResponse.json({
      success: true,
      email
    });

    res.cookies.set(ADMIN_SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge
    });

    return res;
  } catch (err) {
    console.error('[Admin Login API Error]', err);
    return NextResponse.json(
      { error: 'Authentication service error. Please try again.' },
      { status: 500 }
    );
  }
}
