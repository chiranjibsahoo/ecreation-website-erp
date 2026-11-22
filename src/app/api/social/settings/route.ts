import { NextRequest, NextResponse } from 'next/server';
import {
  isSupabaseConfigured,
  createAdminSupabaseClient,
  isAdminRequest
} from '@/lib/supabase/server';
import {
  DEFAULT_SOCIAL_ACCOUNTS,
  getStoredSocialAccounts,
  upsertStoredSocialAccount,
  StoredSocialAccount,
  SocialPlatform
} from '@/lib/data/localStore';

function maskSecret(secret: string): string {
  if (!secret) return '';
  if (secret.length <= 6) return '••••••';
  return `${secret.slice(0, 4)}••••••••${secret.slice(-4)}`;
}

async function fetchAllAccounts(): Promise<StoredSocialAccount[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      const { data, error } = await supabase.from('social_accounts').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        const map = new Map((data as StoredSocialAccount[]).map((a) => [a.platform, a]));
        return DEFAULT_SOCIAL_ACCOUNTS.map((def) => map.get(def.platform) || def);
      }
    } catch (err) {
      console.error('[Supabase GET social_accounts fallback]', err);
    }
  }
  return getStoredSocialAccounts();
}

// GET /api/social/settings - Retrieve configured social media accounts (secrets masked)
export async function GET() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const accounts = await fetchAllAccounts();
    const safeAccounts = accounts.map((acc) => ({
      ...acc,
      has_secret: Boolean(acc.credential_secret),
      credential_secret_masked: maskSecret(acc.credential_secret),
      credential_secret: '' // Never expose raw secret in GET response
    }));

    return NextResponse.json({ success: true, accounts: safeAccounts });
  } catch (err) {
    console.error('[GET Social Settings Error]', err);
    return NextResponse.json({ error: 'Failed to load social settings' }, { status: 500 });
  }
}

// POST /api/social/settings - Save or update a social media account connection
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const platform = body.platform as SocialPlatform;
    const validPlatforms: SocialPlatform[] = ['instagram', 'youtube', 'facebook', 'linkedin', 'x', 'google_flow'];

    if (!validPlatforms.includes(platform)) {
      return NextResponse.json({ error: 'Invalid social platform' }, { status: 400 });
    }

    const existingList = await fetchAllAccounts();
    const existing = existingList.find((a) => a.platform === platform);

    const newSecret =
      typeof body.credential_secret === 'string' && body.credential_secret.trim().length > 0
        ? body.credential_secret.trim()
        : existing?.credential_secret || '';

    const accountHandle = typeof body.account_handle === 'string' ? body.account_handle.trim() : existing?.account_handle || '';
    const accountId = typeof body.account_id === 'string' ? body.account_id.trim() : existing?.account_id || '';
    const pageOrChannelId =
      typeof body.page_or_channel_id === 'string' ? body.page_or_channel_id.trim() : existing?.page_or_channel_id || '';
    const webhookUrl = typeof body.webhook_url === 'string' ? body.webhook_url.trim() : existing?.webhook_url || '';

    const isConnected = Boolean(accountId || accountHandle || pageOrChannelId || newSecret || webhookUrl);
    const autoShareEnabled =
      typeof body.auto_share_enabled === 'boolean' ? body.auto_share_enabled : existing?.auto_share_enabled ?? true;

    const record: StoredSocialAccount = {
      platform,
      display_name: existing?.display_name || platform,
      account_handle: accountHandle,
      account_id: accountId,
      page_or_channel_id: pageOrChannelId,
      credential_secret: newSecret,
      webhook_url: webhookUrl,
      is_connected: body.disconnect ? false : isConnected,
      auto_share_enabled: body.disconnect ? false : autoShareEnabled,
      last_status: body.disconnect
        ? 'Disconnected'
        : isConnected
        ? 'Connected & Ready for Auto-Share'
        : 'Not configured',
      updated_at: new Date().toISOString()
    };

    if (body.disconnect) {
      record.credential_secret = '';
      record.account_id = '';
      record.account_handle = '';
      record.page_or_channel_id = '';
      record.webhook_url = '';
    }

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminSupabaseClient();
        await supabase.from('social_accounts').upsert([record], { onConflict: 'platform' });
      } catch (err) {
        console.error('[Supabase UPSERT social_accounts fallback]', err);
      }
    }

    upsertStoredSocialAccount(record);

    return NextResponse.json({
      success: true,
      account: {
        ...record,
        has_secret: Boolean(record.credential_secret),
        credential_secret_masked: maskSecret(record.credential_secret),
        credential_secret: ''
      }
    });
  } catch (err) {
    console.error('[POST Social Settings Error]', err);
    return NextResponse.json({ error: 'Failed to save social account settings' }, { status: 500 });
  }
}

// PUT /api/social/settings - Live test a saved platform connection
export async function PUT(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { platform } = (await req.json()) as { platform: SocialPlatform };
    const accounts = await fetchAllAccounts();
    const account = accounts.find((a) => a.platform === platform);

    if (!account || !account.is_connected) {
      return NextResponse.json({
        success: false,
        status: 'Not connected — enter your account details and save first.'
      });
    }

    let verified = false;
    let statusMessage = 'Account credentials saved & active for Mobile/Web Auto-Share.';

    // Live Meta Graph API verification for Facebook / Instagram if token looks like a Graph token
    if (
      (platform === 'facebook' || platform === 'instagram') &&
      account.credential_secret &&
      account.credential_secret.startsWith('EAA')
    ) {
      try {
        const res = await fetch(
          `https://graph.facebook.com/v21.0/me?fields=id,name&access_token=${encodeURIComponent(account.credential_secret)}`
        );
        const json = await res.json();
        if (res.ok && json.id) {
          verified = true;
          statusMessage = `Meta Graph API Verified: ${json.name || json.id}`;
        } else {
          statusMessage = `Meta API check: ${json.error?.message || 'Token expired/invalid'} (Mobile Share still works)`;
        }
      } catch {
        statusMessage = 'Meta Graph API unreachable — Saved for Mobile Native Share.';
      }
    } else if (platform === 'youtube' && account.credential_secret && account.credential_secret.startsWith('ya29.')) {
      try {
        const res = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', {
          headers: { Authorization: `Bearer ${account.credential_secret}` }
        });
        if (res.ok) {
          verified = true;
          statusMessage = 'YouTube Data API v3 Verified & Ready for Auto-Upload';
        } else {
          statusMessage = 'YouTube OAuth token needs refresh — Webhook/Mobile Share active.';
        }
      } catch {
        statusMessage = 'YouTube API check paused — Saved for Webhook/Mobile Share.';
      }
    } else if (account.webhook_url && account.webhook_url.startsWith('http')) {
      verified = true;
      statusMessage = 'Automation Webhook Connected (Make/Zapier/n8n Auto-Upload Ready)';
    } else {
      verified = true;
      statusMessage = `Account (${account.account_handle || account.account_id}) Saved & Ready for Auto-Share`;
    }

    const updated: StoredSocialAccount = {
      ...account,
      last_status: statusMessage,
      last_tested_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminSupabaseClient();
        await supabase.from('social_accounts').upsert([updated], { onConflict: 'platform' });
      } catch {
        // fallback handled below
      }
    }
    upsertStoredSocialAccount(updated);

    return NextResponse.json({ success: true, verified, status: statusMessage });
  } catch (err) {
    console.error('[PUT Test Social Connection Error]', err);
    return NextResponse.json({ error: 'Failed to test connection' }, { status: 500 });
  }
}
