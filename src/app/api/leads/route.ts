import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, createServerSupabaseClient } from '@/lib/supabase/server';

// GET /api/leads - Retrieve all leads (or filter by status)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    if (isSupabaseConfigured()) {
      const supabase = await createServerSupabaseClient();
      let query = supabase.from('leads').select('*').order('created_at', { ascending: false });

      if (status && status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error } = await query;
      if (error) throw error;
      return NextResponse.json({ success: true, leads: data });
    }

    // Default mock response when Supabase is not yet connected
    return NextResponse.json({
      success: true,
      leads: [
        {
          id: 'EC-849102',
          name: 'Sarah Jenkins',
          email: 's.jenkins@acme-enterprises.com',
          company: 'Acme Enterprises',
          phone: '+1 (415) 890-1234',
          service_required: 'Enterprise ERP & Client Portals',
          budget_range: '$25k - $50k',
          message: 'Looking to replace an internal spreadsheet logistics tracker with a bespoke web portal with role permissions.',
          source: 'google_organic',
          status: 'new',
          created_at: '2026-11-10T14:32:00Z'
        },
        {
          id: 'EC-712903',
          name: 'David O’Connor',
          email: 'doconnor@apexpayments.io',
          company: 'Apex Payments',
          phone: '+44 20 7946 0912',
          service_required: 'Custom Software & Web Engineering',
          budget_range: '$50,000+',
          message: 'Need a high-throughput financial transactions dashboard built on Next.js and Supabase.',
          source: 'linkedin_campaign',
          status: 'qualified',
          created_at: '2026-11-09T09:15:00Z'
        },
        {
          id: 'EC-632198',
          name: 'Ananya Deshmukh',
          email: 'ananya@healthpulse.org',
          company: 'HealthPulse Labs',
          phone: '+91 98201 54321',
          service_required: 'Mobile App Engineering (iOS & Android)',
          budget_range: '$10k - $25k',
          message: 'Patient-facing mobile application with appointment booking and secure document retrieval.',
          source: 'direct',
          status: 'contacted',
          created_at: '2026-11-08T16:45:00Z'
        }
      ]
    });
  } catch (err: unknown) {
    console.error('[Get Leads API Error]', err);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// PATCH /api/leads - Update lead status
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: 'Lead ID and status are required' }, { status: 400 });
    }

    if (isSupabaseConfigured()) {
      const supabase = await createServerSupabaseClient();
      const { data, error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return NextResponse.json({ success: true, lead: data });
    }

    return NextResponse.json({ success: true, message: 'Status updated (mock mode)' });
  } catch (err: unknown) {
    console.error('[Update Lead Status API Error]', err);
    return NextResponse.json({ error: 'Failed to update lead status' }, { status: 500 });
  }
}

