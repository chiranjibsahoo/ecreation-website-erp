import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest } from '@/lib/supabase/server';
import {
  DEFAULT_EMAIL_SETTINGS,
  loadEmailSettings,
  saveEmailSettings,
  sendEnquiryNotificationEmail,
  EmailSettingsConfig
} from '@/lib/email/enquiryEmail';

function maskPass(pass: string): string {
  if (!pass) return '';
  if (pass.length <= 4) return '••••';
  return `${pass.slice(0, 2)}••••••••${pass.slice(-2)}`;
}

// GET /api/settings/email - Load saved SMTP & Enquiry Email Template settings
export async function GET() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await loadEmailSettings();
    return NextResponse.json({
      success: true,
      settings: {
        ...settings,
        has_smtp_pass: Boolean(settings.smtp_pass),
        smtp_pass_masked: maskPass(settings.smtp_pass),
        smtp_pass: '' // Never leak raw password to browser
      }
    });
  } catch (err) {
    console.error('[GET Email Settings Error]', err);
    return NextResponse.json({ error: 'Failed to load email settings' }, { status: 500 });
  }
}

// POST /api/settings/email - Save SMTP & Template configuration
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const existing = await loadEmailSettings();

    const nextPass =
      typeof body.smtp_pass === 'string' && body.smtp_pass.trim().length > 0
        ? body.smtp_pass.trim()
        : existing.smtp_pass;

    const updated: EmailSettingsConfig = {
      ...existing,
      enabled: typeof body.enabled === 'boolean' ? body.enabled : existing.enabled,
      smtp_host: typeof body.smtp_host === 'string' ? body.smtp_host.trim() : existing.smtp_host,
      smtp_port: Number(body.smtp_port) || existing.smtp_port || 465,
      smtp_secure: typeof body.smtp_secure === 'boolean' ? body.smtp_secure : existing.smtp_secure,
      smtp_user: typeof body.smtp_user === 'string' ? body.smtp_user.trim() : existing.smtp_user,
      smtp_pass: nextPass,
      from_name: typeof body.from_name === 'string' ? body.from_name.trim() : existing.from_name,
      from_email: typeof body.from_email === 'string' ? body.from_email.trim() : existing.from_email,
      admin_notify_emails:
        typeof body.admin_notify_emails === 'string'
          ? body.admin_notify_emails.trim()
          : existing.admin_notify_emails,
      subject_template:
        typeof body.subject_template === 'string' && body.subject_template.trim()
          ? body.subject_template.trim()
          : DEFAULT_EMAIL_SETTINGS.subject_template,
      header_title:
        typeof body.header_title === 'string' && body.header_title.trim()
          ? body.header_title.trim()
          : DEFAULT_EMAIL_SETTINGS.header_title,
      header_subtitle:
        typeof body.header_subtitle === 'string'
          ? body.header_subtitle.trim()
          : DEFAULT_EMAIL_SETTINGS.header_subtitle,
      intro_text:
        typeof body.intro_text === 'string'
          ? body.intro_text.trim()
          : DEFAULT_EMAIL_SETTINGS.intro_text,
      footer_text:
        typeof body.footer_text === 'string'
          ? body.footer_text.trim()
          : DEFAULT_EMAIL_SETTINGS.footer_text,
      accent_color:
        typeof body.accent_color === 'string' && /^#[0-9a-fA-F]{6}$/.test(body.accent_color)
          ? body.accent_color
          : existing.accent_color || '#d97706',
      show_quick_actions:
        typeof body.show_quick_actions === 'boolean'
          ? body.show_quick_actions
          : existing.show_quick_actions,
      updated_at: new Date().toISOString()
    };

    const saved = await saveEmailSettings(updated);
    return NextResponse.json({
      success: true,
      settings: {
        ...saved,
        has_smtp_pass: Boolean(saved.smtp_pass),
        smtp_pass_masked: maskPass(saved.smtp_pass),
        smtp_pass: ''
      }
    });
  } catch (err) {
    console.error('[POST Email Settings Error]', err);
    return NextResponse.json({ error: 'Failed to save email settings' }, { status: 500 });
  }
}

// PUT /api/settings/email - Send a real Test Notification Email using saved SMTP + Template
export async function PUT() {
  try {
    if (!(await isAdminRequest())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await loadEmailSettings();
    const sampleLead = {
      id: `EC-TEST-${Date.now().toString().slice(-4)}`,
      name: 'Rajesh Verma (Test Client)',
      email: settings.smtp_user || 'client@example.com',
      phone: '+91 98112 45678',
      company: 'Verma Enterprises Pvt. Ltd.',
      service_required: 'Custom ERP & Office Automation Software',
      budget_range: 'Standard Business Package (25% OFF)',
      message:
        'This is a live test enquiry notification from your Ecreation Admin ERP SMTP & Template Engine to verify Inbox delivery and responsive inline-CSS formatting.',
      source: 'Admin SMTP Test Alert',
      created_at: new Date().toISOString()
    };

    try {
      const result = await sendEnquiryNotificationEmail(sampleLead, { ...settings, enabled: true });
      const statusMsg = result.sent
        ? `Test email delivered successfully! (Message ID: ${result.messageId || 'OK'})`
        : result.reason || 'Test email was not sent.';

      await saveEmailSettings({
        ...settings,
        last_test_status: statusMsg,
        last_tested_at: new Date().toISOString()
      });

      return NextResponse.json({
        success: result.sent,
        status: statusMsg,
        messageId: result.messageId
      });
    } catch (smtpErr: unknown) {
      const errMsg = smtpErr instanceof Error ? smtpErr.message : 'SMTP connection failed';
      const friendly = `SMTP Error: ${errMsg}. (If using Gmail, make sure 2-Step Verification is ON and you use a 16-character Gmail App Password.)`;
      await saveEmailSettings({
        ...settings,
        last_test_status: friendly,
        last_tested_at: new Date().toISOString()
      });
      return NextResponse.json({ success: false, status: friendly }, { status: 400 });
    }
  } catch (err) {
    console.error('[PUT Test Email Error]', err);
    return NextResponse.json({ error: 'Failed to run email test' }, { status: 500 });
  }
}
