import { NextRequest, NextResponse } from 'next/server';
import {
  isSupabaseConfigured,
  createAdminSupabaseClient,
  isAdminRequest
} from '@/lib/supabase/server';
import {
  getStoredLeads,
  updateStoredLeadStatus,
  getStoredLeadReplies,
  addStoredLeadReply,
  StoredLead,
  StoredLeadReply
} from '@/lib/data/localStore';

// GET /api/leads - Retrieve all leads + reply history (admin only when Supabase is connected)
export async function GET(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminSupabaseClient();
        let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

        if (status && status !== 'all') {
          query = query.eq('status', status);
        }

        const { data, error } = await query;
        if (!error && data) {
          let replies: StoredLeadReply[] = [];
          try {
            const { data: replyRows } = await supabase
              .from('lead_replies')
              .select('*')
              .order('created_at', { ascending: false });
            if (Array.isArray(replyRows)) {
              replies = replyRows as StoredLeadReply[];
            }
          } catch {
            replies = getStoredLeadReplies();
          }
          return NextResponse.json({ success: true, leads: data, replies });
        }
        console.error('[Supabase GET Leads Error]', error);
      } catch (err) {
        console.error('[Supabase GET Leads Fallback]', err);
      }
    }

    // Local development store fallback
    const leads = getStoredLeads(status);
    const replies = getStoredLeadReplies();
    return NextResponse.json({
      success: true,
      leads,
      replies
    });
  } catch (err: unknown) {
    console.error('[Get Leads API Error]', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// PATCH /api/leads - Update lead status and/or record an admin reply
export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, replyMessage, replyChannel, sentBy } = body;

    if (!id) {
      return NextResponse.json({ error: 'Lead id is required' }, { status: 400 });
    }

    let savedReply: StoredLeadReply | null = null;
    if (replyMessage && typeof replyMessage === 'string' && replyMessage.trim()) {
      const replyObj: StoredLeadReply = {
        id: `REP-${Date.now().toString().slice(-6)}`,
        lead_id: String(id),
        channel: (['whatsapp', 'email', 'call', 'note'].includes(replyChannel)
          ? replyChannel
          : 'note') as StoredLeadReply['channel'],
        message: replyMessage.trim(),
        sent_by: typeof sentBy === 'string' && sentBy ? sentBy : 'admin@ecreation.in',
        created_at: new Date().toISOString()
      };

      if (isSupabaseConfigured()) {
        try {
          const supabase = createAdminSupabaseClient();
          await supabase.from('lead_replies').insert([replyObj]);
        } catch (err) {
          console.error('[Supabase Insert Reply Fallback]', err);
        }
      }
      savedReply = addStoredLeadReply(replyObj);
    }

    const nextStatus = status as StoredLead['status'] | undefined;
    if (nextStatus) {
      if (isSupabaseConfigured()) {
        try {
          const supabase = createAdminSupabaseClient();
          await supabase.from('leads').update({ status: nextStatus }).eq('id', id);
        } catch (err) {
          console.error('[Supabase Update Lead Fallback]', err);
        }
      }
      updateStoredLeadStatus(id, nextStatus);
    }

    return NextResponse.json({
      success: true,
      id,
      status: nextStatus,
      reply: savedReply
    });
  } catch (err: unknown) {
    console.error('[Update Lead API Error]', err);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}
