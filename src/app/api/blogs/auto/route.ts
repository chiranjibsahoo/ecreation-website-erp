import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/supabase/server';
import {
  loadAutoBlogSettings,
  saveAutoBlogSettings,
  generateAndPublishAutoBlog
} from '@/lib/blog/blogEngine';

// POST /api/blogs/auto - Save Auto-Blog schedule OR generate & publish immediately
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    if (body.generateNow) {
      const result = await generateAndPublishAutoBlog(true);
      const automation = await loadAutoBlogSettings();
      return NextResponse.json({ success: result.published, ...result, automation });
    }

    const current = await loadAutoBlogSettings();
    const intervalDays = Math.max(1, Math.min(30, Number(body.intervalDays) || current.intervalDays || 3));
    const nextScheduledAt = new Date(Date.now() + intervalDays * 86400 * 1000).toISOString();

    const saved = await saveAutoBlogSettings({
      ...current,
      enabled: typeof body.enabled === 'boolean' ? body.enabled : current.enabled,
      intervalDays,
      nextScheduledAt,
      defaultAuthorName:
        typeof body.defaultAuthorName === 'string' && body.defaultAuthorName.trim()
          ? body.defaultAuthorName.trim()
          : current.defaultAuthorName,
      defaultAuthorRole:
        typeof body.defaultAuthorRole === 'string' && body.defaultAuthorRole.trim()
          ? body.defaultAuthorRole.trim()
          : current.defaultAuthorRole
    });

    return NextResponse.json({ success: true, automation: saved });
  } catch (err) {
    console.error('[POST /api/blogs/auto Error]', err);
    return NextResponse.json({ error: 'Failed to update auto-blog settings' }, { status: 500 });
  }
}
