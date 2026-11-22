import { NextRequest, NextResponse } from 'next/server';
import {
  isSupabaseConfigured,
  createAdminSupabaseClient,
  isAdminRequest
} from '@/lib/supabase/server';
import {
  getStoredSocialAccounts,
  getStoredSocialPosts,
  addStoredSocialPost,
  StoredSocialAccount,
  StoredSocialPost,
  SocialPlatform,
  SocialPublishResult
} from '@/lib/data/localStore';

async function loadAccounts(): Promise<StoredSocialAccount[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      const { data, error } = await supabase.from('social_accounts').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        return data as StoredSocialAccount[];
      }
    } catch {
      // fallback
    }
  }
  return getStoredSocialAccounts();
}

// GET /api/social/publish - List all promotion creatives/videos & publish logs
export async function GET() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminSupabaseClient();
        const { data, error } = await supabase
          .from('social_posts')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
          return NextResponse.json({ success: true, posts: data });
        }
      } catch (err) {
        console.error('[Supabase GET social_posts fallback]', err);
      }
    }

    return NextResponse.json({ success: true, posts: getStoredSocialPosts() });
  } catch (err) {
    console.error('[GET Social Posts Error]', err);
    return NextResponse.json({ error: 'Failed to fetch social posts' }, { status: 500 });
  }
}

// POST /api/social/publish - Publish creative/video to all selected connected social accounts
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      caption,
      hashtags = '',
      mediaUrl = '',
      mediaType = 'video',
      sourceTool = 'google_flow',
      flowPrompt = '',
      platforms = [],
      scheduledAt
    } = body as {
      title: string;
      caption: string;
      hashtags?: string;
      mediaUrl?: string;
      mediaType?: 'video' | 'image';
      sourceTool?: string;
      flowPrompt?: string;
      platforms: SocialPlatform[];
      scheduledAt?: string;
    };

    if (!title?.trim() || !caption?.trim()) {
      return NextResponse.json({ error: 'Title and caption are required' }, { status: 400 });
    }

    const accounts = await loadAccounts();
    const accountMap = new Map(accounts.map((a) => [a.platform, a]));
    const fullText = `${caption.trim()}${hashtags?.trim() ? `\n\n${hashtags.trim()}` : ''}`;

    const targetPlatforms: SocialPlatform[] =
      Array.isArray(platforms) && platforms.length > 0
        ? platforms
        : accounts.filter((a) => a.is_connected && a.auto_share_enabled && a.platform !== 'google_flow').map((a) => a.platform);

    const results: SocialPublishResult[] = [];

    for (const platform of targetPlatforms) {
      const acc = accountMap.get(platform);
      if (!acc || !acc.is_connected) {
        results.push({
          platform,
          status: 'failed',
          detail: 'Account not connected in Social Settings.'
        });
        continue;
      }

      // 1. If a Make.com / Zapier / n8n Automation Webhook is configured, dispatch directly!
      if (acc.webhook_url && acc.webhook_url.startsWith('http')) {
        try {
          const whRes = await fetch(acc.webhook_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              platform,
              accountHandle: acc.account_handle,
              pageOrChannelId: acc.page_or_channel_id,
              title,
              caption: fullText,
              mediaUrl,
              mediaType,
              sourceTool,
              scheduledAt: scheduledAt || null
            })
          });
          if (whRes.ok) {
            results.push({
              platform,
              status: 'webhook_sent',
              detail: `Auto-upload dispatched via Automation Webhook to ${acc.account_handle || acc.display_name}`
            });
            continue;
          }
        } catch {
          // continue to API / native share fallback
        }
      }

      // 2. Real Facebook Graph API publish when Page Access Token + Page ID exist
      if (platform === 'facebook' && acc.credential_secret.startsWith('EAA') && acc.page_or_channel_id) {
        try {
          const endpoint =
            mediaUrl && mediaType === 'image'
              ? `https://graph.facebook.com/v21.0/${acc.page_or_channel_id}/photos`
              : mediaUrl && mediaType === 'video'
              ? `https://graph.facebook.com/v21.0/${acc.page_or_channel_id}/videos`
              : `https://graph.facebook.com/v21.0/${acc.page_or_channel_id}/feed`;

          const payload: Record<string, string> = {
            access_token: acc.credential_secret
          };
          if (mediaUrl && mediaType === 'image') {
            payload.url = mediaUrl;
            payload.caption = fullText;
          } else if (mediaUrl && mediaType === 'video') {
            payload.file_url = mediaUrl;
            payload.description = fullText;
            payload.title = title;
          } else {
            payload.message = fullText;
          }

          const fbRes = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const fbJson = await fbRes.json();
          if (fbRes.ok && (fbJson.id || fbJson.post_id)) {
            results.push({
              platform,
              status: 'published',
              detail: `Published live to Facebook Page (${acc.account_handle || acc.page_or_channel_id})`,
              postUrl: `https://facebook.com/${fbJson.post_id || fbJson.id}`
            });
            continue;
          }
          results.push({
            platform,
            status: 'queued_mobile_share',
            detail: `Meta API: ${fbJson.error?.message || 'Check Page Token'} — Ready for 1-Tap Mobile Share`
          });
          continue;
        } catch {
          // fallback below
        }
      }

      // 3. Real Instagram Business Graph API publish (2-step container + publish)
      if (
        platform === 'instagram' &&
        acc.credential_secret.startsWith('EAA') &&
        acc.page_or_channel_id &&
        mediaUrl.startsWith('http')
      ) {
        try {
          const createPayload: Record<string, string> = {
            caption: fullText,
            access_token: acc.credential_secret
          };
          if (mediaType === 'video') {
            createPayload.media_type = 'REELS';
            createPayload.video_url = mediaUrl;
          } else {
            createPayload.image_url = mediaUrl;
          }

          const cRes = await fetch(`https://graph.facebook.com/v21.0/${acc.page_or_channel_id}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createPayload)
          });
          const cJson = await cRes.json();
          if (cRes.ok && cJson.id) {
            const pubRes = await fetch(`https://graph.facebook.com/v21.0/${acc.page_or_channel_id}/media_publish`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                creation_id: cJson.id,
                access_token: acc.credential_secret
              })
            });
            const pubJson = await pubRes.json();
            if (pubRes.ok && pubJson.id) {
              results.push({
                platform,
                status: 'published',
                detail: `Published live to Instagram (${acc.account_handle || acc.page_or_channel_id})`
              });
              continue;
            }
          }
          results.push({
            platform,
            status: 'queued_mobile_share',
            detail: `Instagram Graph: ${cJson.error?.message || 'Needs public HTTPS media URL'} — Ready for 1-Tap Mobile Share`
          });
          continue;
        } catch {
          // fallback below
        }
      }

      // 4. Connected account ready for Instant Mobile App Share / Scheduled Auto-Publish
      results.push({
        platform,
        status: 'queued_mobile_share',
        detail: `Synced to ${acc.account_handle || acc.account_id || acc.display_name} — Ready for instant 1-Tap Mobile App Share (add Graph/OAuth token or Webhook in Settings for unattended server upload).`
      });
    }

    const publishedCount = results.filter((r) => r.status === 'published' || r.status === 'webhook_sent').length;
    const queuedCount = results.filter((r) => r.status === 'queued_mobile_share').length;

    const postRecord: StoredSocialPost = {
      id: `PROMO-${Date.now().toString().slice(-6)}`,
      title: title.trim(),
      caption: caption.trim(),
      hashtags: hashtags.trim(),
      media_url: mediaUrl.trim(),
      media_type: mediaType,
      source_tool: sourceTool,
      flow_prompt: flowPrompt.trim(),
      platforms: targetPlatforms,
      status: scheduledAt
        ? 'scheduled'
        : publishedCount === targetPlatforms.length && targetPlatforms.length > 0
        ? 'published'
        : publishedCount + queuedCount > 0
        ? 'partial'
        : 'failed',
      publish_results: results,
      scheduled_at: scheduledAt || undefined,
      published_at: scheduledAt ? undefined : new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminSupabaseClient();
        await supabase.from('social_posts').insert([postRecord]);
      } catch (err) {
        console.error('[Supabase INSERT social_posts fallback]', err);
      }
    }
    addStoredSocialPost(postRecord);

    return NextResponse.json({ success: true, post: postRecord, results });
  } catch (err) {
    console.error('[POST Social Publish Error]', err);
    return NextResponse.json({ error: 'Failed to publish social creative' }, { status: 500 });
  }
}
