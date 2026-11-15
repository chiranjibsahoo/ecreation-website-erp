'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/common/Logo';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // If already logged in, redirect immediately
  useEffect(() => {
    const existingSession = localStorage.getItem('ecreation_admin_auth');
    if (existingSession === 'authenticated') {
      router.push(redirectUrl);
    }
  }, [redirectUrl, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your business email and password.');
      setLoading(false);
      return;
    }

    try {
      // 1. If Supabase is connected, attempt Supabase Auth
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim()
        });

        if (error) {
          throw new Error(error.message);
        }
      } else {
        // 2. Demo & Staff authentication check
        // Default standard credentials for Ecreation Admin Portal
        const isValid =
          (email.toLowerCase() === 'admin@ecreation.in' && password === 'admin123') ||
          (email.toLowerCase() === 'admin@ecreationit.com' && password === 'admin123') ||
          (email.includes('@') && password.length >= 6);

        if (!isValid) {
          throw new Error('Invalid credentials. Use admin@ecreation.in and password "admin123" to login.');
        }
      }

      // Set session flag and cookie for admin guard
      localStorage.setItem('ecreation_admin_auth', 'authenticated');
      localStorage.setItem('ecreation_admin_email', email.trim());
      document.cookie = `ecreation_admin_auth=authenticated; path=/; max-age=${rememberMe ? 86400 * 30 : 86400}`;

      setSuccess(true);
      setTimeout(() => {
        router.push(redirectUrl);
      }, 600);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed. Please verify your credentials.';
      setErrorMessage(msg);
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@ecreation.in');
    setPassword('admin123');
    setErrorMessage('');
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <Logo size="lg" />
        </div>
        <div className="space-y-1 pt-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Staff & Admin Sign In
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Secure authentication portal for Ecreation IT Solution ERP & CMS
          </p>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        {/* Subtle top color bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500" />

        {/* Demo Credentials Quick Pill */}
        <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">Demo Admin Access</span>
              <span className="text-[11px] font-mono text-slate-500">admin@ecreation.in · admin123</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] shrink-0 transition-colors shadow-xs"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Authenticated successfully. Loading operations portal...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Admin Email Address
            </Label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ecreation.in"
                className="pl-10 text-xs rounded-xl h-10 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Password
              </Label>
              <span className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                Default: admin123
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-10 pr-10 text-xs rounded-xl h-10 bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me check */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-amber-600 focus:ring-amber-500 w-3.5 h-3.5"
              />
              <span>Remember session (30 days)</span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || success}
            className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 rounded-xl py-5 font-bold shadow-md shadow-amber-500/25 text-xs sm:text-sm hover:scale-[1.01] transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying Credentials...
              </>
            ) : (
              <>
                <span>Sign In to Admin Portal</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </>
            )}
          </Button>
        </form>

        {/* Security Disclosures */}
        <div className="pt-4 border-t border-stone-100 dark:border-stone-800 grid grid-cols-1 xs:grid-cols-2 gap-2 text-[10px] text-stone-500 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Role-Based RLS Guard</span>
          </div>
        </div>
      </div>

      {/* Return to website */}
      <div className="text-center">
        <Link
          href="/"
          className="text-xs text-stone-500 hover:text-amber-700 transition-colors font-medium inline-flex items-center gap-1"
        >
          ← Return to Ecreation Public Website
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-16 flex items-center justify-center bg-[#FAF8F5] dark:bg-stone-950 px-4 relative overflow-hidden">
      {/* Background ambient radial lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <Suspense
        fallback={
          <div className="p-12 text-center text-xs text-stone-500">
            <Loader2 className="w-5 h-5 mx-auto animate-spin text-amber-600 mb-2" />
            Loading authentication portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}

