import { NextRequest, NextResponse } from 'next/server';
import {
  isSupabaseConfigured,
  createAdminSupabaseClient,
  isAdminRequest
} from '@/lib/supabase/server';
import { getStoredLeads, updateStoredLeadStatus, StoredLead } from '@/lib/data/localStore';

// GET /api/leads - Retrieve all leads (admin only when Supabase is connected)
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
          // Supabase is the source of truth once connected (even when empty).
          return NextResponse.json({ success: true, leads: data });
        }
        console.error('[Supabase GET Leads Error]', error);
      } catch (err) {
        console.error('[Supabase GET Leads Fallback]', err);
      }
    }

    // Local development store fallback
    const leads = getStoredLeads(status);
    return NextResponse.json({
      success: true,
      leads
    });
  } catch (err: unknown) {
    console.error('[Get Leads API Error]', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// PATCH /api/leads - Update lead status (admin only when Supabase is connected)
export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Lead ID and status are required' }, { status: 400 });
    }

    const allowed = ['new', 'contacted', 'qualified', 'converted', 'archived'];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    updateStoredLeadStatus(id, status as StoredLead['status']);

    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminSupabaseClient();
        const { data, error } = await supabase
          .from('leads')
          .update({ status })
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          return NextResponse.json({ success: true, lead: data });
        }
      } catch (err) {
        console.error('[Supabase PATCH Lead Fallback]', err);
      }
    }

    return NextResponse.json({ success: true, message: 'Status updated' });
  } catch (err: unknown) {
    console.error('[Update Lead Status API Error]', err);
    return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
  }
}
