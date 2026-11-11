'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Application Error Boundary caught error]:', error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex p-4 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 shadow-xs">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-destructive">
            Application Error
          </span>
          <h1 className="text-3xl font-extrabold text-foreground">
            Something Went Wrong
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An unexpected runtime error occurred while processing this request. Our technical team has been notified.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
          >
            <RefreshCcw className="w-3.5 h-3.5 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full sm:w-auto rounded-xl text-xs">
              <Home className="w-3.5 h-3.5 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

