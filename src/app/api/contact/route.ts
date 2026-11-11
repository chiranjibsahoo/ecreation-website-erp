import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, serviceRequired, budgetRange, message, honeypot, source } = body;

    // 1. Spam honeypot trap
    if (honeypot) {
      return NextResponse.json({ success: true, leadId: 'discarded' });
    }

    // 2. Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address format.' },
        { status: 400 }
      );
    }

    const leadRecord = {
      name: String(name).slice(0, 100),
      email: String(email).slice(0, 150),
      phone: phone ? String(phone).slice(0, 30) : null,
      company: company ? String(company).slice(0, 120) : null,
      service_required: String(serviceRequired || 'General Inquiry').slice(0, 150),
      budget_range: budgetRange ? String(budgetRange).slice(0, 50) : null,
      message: String(message).slice(0, 3000),
      source: source ? String(source).slice(0, 100) : 'direct',
      status: 'new',
      created_at: new Date().toISOString()
    };

    let generatedId = `EC-${Math.floor(100000 + Math.random() * 900000)}`;

    // 3. Supabase persistence if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase.from('leads').insert([leadRecord]).select('id').single();

        if (error) {
          console.error('[Supabase Insert Error]', error);
        } else if (data?.id) {
          generatedId = data.id;
        }
      } catch (dbErr) {
        console.error('[Database Connection Warning]', dbErr);
      }
    } else {
      console.log('[Inquiry Received - In-Memory Mode]:', leadRecord);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
      leadId: generatedId
    });
  } catch (err: unknown) {
    console.error('[Contact API Error]', err);
    return NextResponse.json(
      { error: 'Internal server error while processing inquiry.' },
      { status: 500 }
    );
  }
}
