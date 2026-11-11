import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-indigo-600">
            Error 404 · Route Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Page Does Not Exist
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The resource or URL you requested could not be located on the Ecreation IT Solution server. Please verify the URL or return to our homepage.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold">
              <Home className="w-3.5 h-3.5 mr-2" />
              Return to Homepage
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" className="w-full sm:w-auto rounded-xl text-xs">
              Explore Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

