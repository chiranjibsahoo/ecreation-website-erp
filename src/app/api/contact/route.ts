import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, createServerSupabaseClient } from '@/lib/supabase/server';
import { addStoredLead } from '@/lib/data/localStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, serviceRequired, budgetRange, message, honeypot, source } = body;

    // 1. Spam honeypot trap
    if (honeypot) {
      return NextResponse.json({ success: true, leadId: 'discarded' });
    }

    // 2. Server-side validation for Email & Phone
    if (!email || !String(email).trim()) {
      return NextResponse.json(
        { error: 'Please enter your email ID.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(String(email).trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address (e.g. name@company.com).' },
        { status: 400 }
      );
    }

    if (phone !== undefined && phone !== null && String(phone).trim() !== '') {
      const digitsOnly = String(phone).replace(/\D/g, '');
      if (digitsOnly.length < 10 || digitsOnly.length > 15 || /^(\d)\1+$/.test(digitsOnly)) {
        return NextResponse.json(
          { error: 'Please enter a valid 10-digit mobile / phone number.' },
          { status: 400 }
        );
      }
    }

    const safeName = name && String(name).trim()
      ? String(name).trim()
      : phone
      ? `Offer Lead (${String(phone).trim()})`
      : `Website Visitor (${String(email).split('@')[0]})`;

    const safeMessage = message && String(message).trim()
      ? String(message).trim()
      : `Claimed 25% Special Offer via Conversion Popup. Phone: ${phone || 'Not provided'}, Email: ${email}`;

    const leadRecord = {
      name: safeName.slice(0, 100),
      email: String(email).trim().slice(0, 150),
      phone: phone ? String(phone).trim().slice(0, 30) : null,
      company: company ? String(company).slice(0, 120) : null,
      service_required: String(serviceRequired || '25% Special Business Offer').slice(0, 150),
      budget_range: budgetRange ? String(budgetRange).slice(0, 50) : null,
      message: safeMessage.slice(0, 3000),
      source: source ? String(source).slice(0, 100) : 'direct',
      status: 'new' as const,
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
    }

    // 4. Always persist to local store so Admin Panel sees real-time enquiries immediately
    addStoredLead({
      id: generatedId,
      ...leadRecord
    });

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

