import { NextRequest, NextResponse } from 'next/server';
import { generateAndPublishAutoBlog } from '@/lib/blog/blogEngine';

// Scheduled Vercel Cron endpoint (runs every 3 days via vercel.json)
export async function GET(req: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret) {
      const auth = req.headers.get('authorization');
      if (auth !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized cron request' }, { status: 401 });
      }
    }

    const result = await generateAndPublishAutoBlog(false);
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[Cron Auto-Blog Error]', err);
    return NextResponse.json({ error: 'Auto-blog cron execution failed' }, { status: 500 });
  }
}
