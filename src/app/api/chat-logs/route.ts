import { NextRequest, NextResponse } from 'next/server';
import { isSupabaseConfigured, createServerSupabaseClient } from '@/lib/supabase/server';
import {
  getStoredChatSessions,
  upsertStoredChatSession,
  StoredChatSession
} from '@/lib/data/localStore';

// GET /api/chat-logs - Retrieve all Ecreation AI Assistant chat sessions for Admin Analytics
export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createServerSupabaseClient();
        const { data, error } = await supabase
          .from('chat_sessions')
          .select('*')
          .order('updated_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped: StoredChatSession[] = data.map((row: Record<string, unknown>) => ({
            sessionId: String(row.session_id || row.id),
            visitorName: String(row.visitor_name || 'Visitor'),
            visitorEmail: String(row.visitor_email || ''),
            visitorPhone: String(row.visitor_phone || ''),
            serviceInterested: String(row.service_interested || 'General Inquiry'),
            leadCaptured: Boolean(row.lead_captured),
            leadId: row.lead_id ? String(row.lead_id) : undefined,
            messages: Array.isArray(row.messages) ? row.messages : [],
            startedAt: String(row.started_at || row.created_at || new Date().toISOString()),
            updatedAt: String(row.updated_at || new Date().toISOString())
          }));
          return NextResponse.json({ success: true, sessions: mapped });
        }
      } catch (dbErr) {
        console.error('[Supabase Chat Sessions GET Fallback]', dbErr);
      }
    }

    const sessions = getStoredChatSessions();
    return NextResponse.json({ success: true, sessions });
  } catch (err: unknown) {
    console.error('[Get Chat Logs API Error]', err);
    return NextResponse.json({ error: 'Failed to load chat logs' }, { status: 500 });
  }
}

// POST /api/chat-logs - Save or update an Ecreation AI Assistant chat session
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      sessionId,
      visitorName,
      visitorEmail,
      visitorPhone,
      serviceInterested,
      leadCaptured,
      leadId,
      messages,
      startedAt
    } = body;

    if (!sessionId || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'sessionId and messages array are required.' },
        { status: 400 }
      );
    }

    const sessionRecord: StoredChatSession = {
      sessionId: String(sessionId),
      visitorName: String(visitorName || 'Website Visitor'),
      visitorEmail: String(visitorEmail || ''),
      visitorPhone: String(visitorPhone || ''),
      serviceInterested: String(serviceInterested || 'General IT Consultation'),
      leadCaptured: Boolean(leadCaptured),
      leadId: leadId ? String(leadId) : undefined,
      messages,
      startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Always persist to local store
    upsertStoredChatSession(sessionRecord);

    // Also persist to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createServerSupabaseClient();
        await supabase.from('chat_sessions').upsert(
          {
            session_id: sessionRecord.sessionId,
            visitor_name: sessionRecord.visitorName,
            visitor_email: sessionRecord.visitorEmail,
            visitor_phone: sessionRecord.visitorPhone,
            service_interested: sessionRecord.serviceInterested,
            lead_captured: sessionRecord.leadCaptured,
            lead_id: sessionRecord.leadId || null,
            messages: sessionRecord.messages,
            started_at: sessionRecord.startedAt,
            updated_at: sessionRecord.updatedAt
          },
          { onConflict: 'session_id' }
        );
      } catch (dbErr) {
        console.error('[Supabase Chat Session Upsert Warning]', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      session: sessionRecord
    });
  } catch (err: unknown) {
    console.error('[Save Chat Logs API Error]', err);
    return NextResponse.json({ error: 'Failed to save chat session' }, { status: 500 });
  }
}

