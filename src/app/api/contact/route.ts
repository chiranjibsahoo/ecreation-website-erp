import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, createAdminSupabaseClient } from '@/lib/supabase/server';
import { addStoredLead } from '@/lib/data/localStore';
import { sendEnquiryNotificationEmail } from '@/lib/email/enquiryEmail';

// In-memory rate limit & duplicate guard (per serverless instance)
const ipRateMap = new Map<string, number[]>();
const recentSubmissionMap = new Map<string, number>();

const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'guerrillamailblock.com',
  '10minutemail.com',
  'yopmail.com',
  'trashmail.com',
  'throwawaymail.com',
  'fakeinbox.com',
  'sharklasers.com',
  'dispostable.com',
  'getnada.com',
  'maildrop.cc',
  'mohmal.com',
  'emailondeck.com',
  'mintemail.com',
  'burnermail.io',
  'tempail.com',
  'nada.email',
  'example.com',
  'test.com',
  'fake.com'
]);

const FAKE_SEQUENTIAL_PHONES = new Set([
  '1234567890',
  '0123456789',
  '9876543210',
  '9999999999',
  '8888888888',
  '7777777777',
  '6666666666',
  '0000000000'
]);

const SPAM_CONTENT_PATTERNS = [
  /<script\b/i,
  /javascript:/i,
  /\b(viagra|cialis|casino|porn|xxx|sex\s+cam|crypto\s+airdrop|bitcoin\s+doubler|buy\s+backlinks|adult\s+dating)\b/i
];

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      serviceRequired,
      budgetRange,
      message,
      honeypot,
      source,
      formStartedAt
    } = body;

    // 1. Spam honeypot trap (silent discard)
    if (honeypot && String(honeypot).trim() !== '') {
      return NextResponse.json({ success: true, leadId: 'discarded' });
    }

    // 2. Bot speed trap (human visitors take > 1.2s to fill an enquiry form)
    if (typeof formStartedAt === 'number' && formStartedAt > 0) {
      const elapsedMs = Date.now() - formStartedAt;
      if (elapsedMs >= 0 && elapsedMs < 1200) {
        return NextResponse.json({ success: true, leadId: 'discarded' });
      }
    }

    // 3. IP Sliding-Window Rate Limiting (max 5 enquiries per 15 mins per IP)
    const clientIp = getClientIp(req);
    const now = Date.now();
    const prevHits = (ipRateMap.get(clientIp) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
    if (prevHits.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: 'Too many enquiries submitted recently. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    // 4. Server-side validation for Email (format + disposable domain block)
    const trimmedEmail = String(email || '').trim().toLowerCase();
    if (!trimmedEmail) {
      return NextResponse.json({ error: 'Please enter your email address.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address (e.g. name@company.com).' },
        { status: 400 }
      );
    }

    const emailDomain = trimmedEmail.split('@')[1] || '';
    if (DISPOSABLE_EMAIL_DOMAINS.has(emailDomain)) {
      return NextResponse.json(
        { error: 'Disposable or temporary email addresses are not accepted. Please use a valid business or personal email.' },
        { status: 400 }
      );
    }

    // 5. Server-side validation for Phone (format + fake/sequential block)
    if (phone !== undefined && phone !== null && String(phone).trim() !== '') {
      const digitsOnly = String(phone).replace(/\D/g, '');
      const lastTen = digitsOnly.slice(-10);
      if (
        digitsOnly.length < 10 ||
        digitsOnly.length > 15 ||
        /^(\d)\1+$/.test(digitsOnly) ||
        FAKE_SEQUENTIAL_PHONES.has(lastTen)
      ) {
        return NextResponse.json(
          { error: 'Please enter a real, active 10-digit mobile or phone number.' },
          { status: 400 }
        );
      }
    }

    // 6. Spam keyword, script injection, and link-flood check
    const rawMsg = String(message || '').trim();
    const rawName = String(name || '').trim();
    const combinedText = `${rawName} ${rawMsg}`;

    if (SPAM_CONTENT_PATTERNS.some((rx) => rx.test(combinedText))) {
      return NextResponse.json(
        { error: 'Your submission was flagged by our automated anti-spam filter. Please provide genuine project details.' },
        { status: 400 }
      );
    }

    const urlMatches = rawMsg.match(/https?:\/\/[^\s]+/gi) || [];
    if (urlMatches.length > 2) {
      return NextResponse.json(
        { error: 'Please avoid including multiple links in your enquiry message.' },
        { status: 400 }
      );
    }

    // 7. Duplicate submission guard (same email + message within 10 minutes)
    const dedupeKey = `${trimmedEmail}::${rawMsg.slice(0, 120).toLowerCase()}`;
    const lastSubmitted = recentSubmissionMap.get(dedupeKey);
    if (lastSubmitted && now - lastSubmitted < DUPLICATE_WINDOW_MS) {
      return NextResponse.json({
        success: true,
        message: 'Your inquiry has already been received. Our team will contact you shortly.',
        leadId: 'EC-RECEIVED'
      });
    }

    ipRateMap.set(clientIp, [...prevHits, now]);
    recentSubmissionMap.set(dedupeKey, now);

    const safeName = rawName
      ? rawName
      : phone
      ? `Offer Lead (${String(phone).trim()})`
      : `Website Visitor (${trimmedEmail.split('@')[0]})`;

    const safeMessage = rawMsg
      ? rawMsg
      : `Claimed 25% Special Offer via Conversion Popup. Phone: ${phone || 'Not provided'}, Email: ${trimmedEmail}`;

    const leadRecord = {
      name: safeName.slice(0, 100),
      email: trimmedEmail.slice(0, 150),
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

    // 8. Supabase persistence if configured (service-role client so RLS never blocks public enquiries)
    if (isSupabaseConfigured()) {
      try {
        const supabase = createAdminSupabaseClient();
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

    // 9. Always persist to local store so Admin Panel sees real-time enquiries immediately
    const savedLead = {
      id: generatedId,
      ...leadRecord
    };
    addStoredLead(savedLead);

    // 10. Instant Admin Email Notification (uses saved SMTP & anti-spam inline-CSS template)
    try {
      await sendEnquiryNotificationEmail(savedLead);
    } catch (mailErr) {
      console.error('[Enquiry Notification Email Warning]', mailErr);
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
