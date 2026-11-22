import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { isSupabaseConfigured, createAdminSupabaseClient } from '@/lib/supabase/server';

export interface EmailSettingsConfig {
  id: string;
  enabled: boolean;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  smtp_user: string;
  smtp_pass: string;
  from_name: string;
  from_email: string;
  admin_notify_emails: string;
  subject_template: string;
  header_title: string;
  header_subtitle: string;
  intro_text: string;
  footer_text: string;
  accent_color: string;
  show_quick_actions: boolean;
  last_test_status: string;
  last_tested_at?: string;
  updated_at: string;
}

export interface EnquiryEmailLead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service_required: string;
  budget_range?: string | null;
  message: string;
  source: string;
  created_at: string;
}

export const DEFAULT_EMAIL_SETTINGS: EmailSettingsConfig = {
  id: 'default',
  enabled: false,
  smtp_host: 'smtp.gmail.com',
  smtp_port: 465,
  smtp_secure: true,
  smtp_user: '',
  smtp_pass: '',
  from_name: 'Ecreation IT Solution Alerts',
  from_email: '',
  admin_notify_emails: 'contact@ecreation.in',
  subject_template: 'New Enquiry [{{ref_id}}] - {{service}} from {{name}}',
  header_title: 'New Client Enquiry Received',
  header_subtitle: 'Ecreation IT Solution • Instant Lead Alert',
  intro_text:
    'A new business enquiry has been submitted on your website. Complete client details are listed below for fast follow-up:',
  footer_text:
    'This is an automated transactional notification from Ecreation IT Solution Admin ERP. Click Reply in your inbox to respond directly to the client.',
  accent_color: '#d97706',
  show_quick_actions: true,
  last_test_status: 'Not tested yet',
  updated_at: new Date().toISOString()
};

const DATA_DIR = path.join(process.cwd(), '.data');
const EMAIL_FILE = path.join(DATA_DIR, 'ecreation_email_settings.json');

function readLocalEmailSettings(): EmailSettingsConfig {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(EMAIL_FILE)) {
      fs.writeFileSync(EMAIL_FILE, JSON.stringify(DEFAULT_EMAIL_SETTINGS, null, 2), 'utf-8');
      return DEFAULT_EMAIL_SETTINGS;
    }
    const raw = fs.readFileSync(EMAIL_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<EmailSettingsConfig>;
    return { ...DEFAULT_EMAIL_SETTINGS, ...parsed, id: 'default' };
  } catch {
    return DEFAULT_EMAIL_SETTINGS;
  }
}

function writeLocalEmailSettings(cfg: EmailSettingsConfig) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(EMAIL_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
  } catch (err) {
    console.error('[EmailSettings Local Write Error]', err);
  }
}

export async function loadEmailSettings(): Promise<EmailSettingsConfig> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      const { data, error } = await supabase
        .from('email_settings')
        .select('*')
        .eq('id', 'default')
        .single();
      if (!error && data) {
        return { ...DEFAULT_EMAIL_SETTINGS, ...(data as Partial<EmailSettingsConfig>), id: 'default' };
      }
    } catch {
      // fallback to local
    }
  }
  return readLocalEmailSettings();
}

export async function saveEmailSettings(cfg: EmailSettingsConfig): Promise<EmailSettingsConfig> {
  const record: EmailSettingsConfig = {
    ...DEFAULT_EMAIL_SETTINGS,
    ...cfg,
    id: 'default',
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured()) {
    try {
      const supabase = createAdminSupabaseClient();
      await supabase.from('email_settings').upsert([record], { onConflict: 'id' });
    } catch (err) {
      console.error('[Supabase UPSERT email_settings fallback]', err);
    }
  }

  writeLocalEmailSettings(record);
  return record;
}

function escapeHtml(val: string): string {
  return val
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applyPlaceholders(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? '');
}

/**
 * Generates an inbox-safe, 100% inline-CSS, table-based responsive HTML email
 * + matching plain-text MIME fallback so spam filters (Gmail, Outlook, Yahoo) pass cleanly.
 */
export function buildEnquiryEmailContent(
  settings: EmailSettingsConfig,
  lead: EnquiryEmailLead
): { subject: string; html: string; text: string } {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ecreation.vercel.app').replace(/\/$/, '');
  const adminUrl = `${siteUrl}/admin/leads`;
  const formattedDate = new Date(lead.created_at || Date.now()).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata'
  });

  const vars: Record<string, string> = {
    ref_id: lead.id || 'EC-NEW',
    name: lead.name || 'Website Visitor',
    email: lead.email || 'Not provided',
    phone: lead.phone || 'Not provided',
    company: lead.company || 'Not specified',
    service: lead.service_required || 'General Enquiry',
    budget: lead.budget_range || 'Not specified',
    source: lead.source || 'Website',
    message: lead.message || 'No additional message.',
    date: formattedDate,
    admin_url: adminUrl
  };

  const subject = applyPlaceholders(
    settings.subject_template || DEFAULT_EMAIL_SETTINGS.subject_template,
    vars
  )
    .replace(/[\r\n]+/g, ' ')
    .trim();

  const accent = /^#[0-9a-fA-F]{6}$/.test(settings.accent_color || '')
    ? settings.accent_color
    : '#d97706';

  const cleanPhone = (lead.phone || '').replace(/[^\d+]/g, '');
  const waLink = cleanPhone
    ? `https://wa.me/${cleanPhone.replace(/^\+/, '')}?text=${encodeURIComponent(
        `Hello ${vars.name}, thank you for contacting Ecreation IT Solution regarding ${vars.service}. How can we assist you today?`
      )}`
    : '';

  const headerTitle = escapeHtml(applyPlaceholders(settings.header_title || DEFAULT_EMAIL_SETTINGS.header_title, vars));
  const headerSubtitle = escapeHtml(applyPlaceholders(settings.header_subtitle || DEFAULT_EMAIL_SETTINGS.header_subtitle, vars));
  const introText = escapeHtml(applyPlaceholders(settings.intro_text || DEFAULT_EMAIL_SETTINGS.intro_text, vars));
  const footerText = escapeHtml(applyPlaceholders(settings.footer_text || DEFAULT_EMAIL_SETTINGS.footer_text, vars));

  const detailRows: [string, string][] = [
    ['Reference ID', vars.ref_id],
    ['Client Name', vars.name],
    ['Email Address', vars.email],
    ['Phone / WhatsApp', vars.phone],
    ['Company / Org', vars.company],
    ['Service Requested', vars.service],
    ['Budget / Offer', vars.budget],
    ['Enquiry Source', vars.source],
    ['Received At (IST)', vars.date]
  ];

  const tableRowsHtml = detailRows
    .map(
      ([label, value], idx) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e7e5e4;background-color:${
          idx % 2 === 0 ? '#faf8f5' : '#ffffff'
        };font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;color:#57534e;width:36%;vertical-align:top;">
          ${escapeHtml(label)}
        </td>
        <td style="padding:10px 14px;border-bottom:1px solid #e7e5e4;background-color:${
          idx % 2 === 0 ? '#faf8f5' : '#ffffff'
        };font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#1c1917;vertical-align:top;word-break:break-word;">
          ${
            label === 'Email Address' && lead.email
              ? `<a href="mailto:${escapeHtml(lead.email)}" style="color:#b45309;text-decoration:none;">${escapeHtml(value)}</a>`
              : label === 'Phone / WhatsApp' && cleanPhone
              ? `<a href="tel:${escapeHtml(cleanPhone)}" style="color:#047857;text-decoration:none;">${escapeHtml(value)}</a>`
              : escapeHtml(value)
          }
        </td>
      </tr>`
    )
    .join('');

  const quickActionsHtml = settings.show_quick_actions
    ? `
      <tr>
        <td style="padding:20px 24px 8px 24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td align="center" style="padding:0;">
                ${
                  waLink
                    ? `<a href="${escapeHtml(waLink)}" style="display:inline-block;margin:4px 6px;padding:11px 18px;background-color:#059669;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;border-radius:8px;">Reply on WhatsApp</a>`
                    : ''
                }
                <a href="mailto:${escapeHtml(lead.email)}?subject=${encodeURIComponent(
                  `Re: ${vars.service} - Ecreation IT Solution (${vars.ref_id})`
                )}" style="display:inline-block;margin:4px 6px;padding:11px 18px;background-color:${accent};color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;border-radius:8px;">Reply via Email</a>
                <a href="${escapeHtml(adminUrl)}" style="display:inline-block;margin:4px 6px;padding:11px 18px;background-color:#1c1917;color:#fbbf24;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;text-decoration:none;border-radius:8px;">Open Admin ERP</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    : '';

  // 100% Inline-CSS Responsive Email (Zero <style>, Zero JS, Clean Text-to-HTML Ratio)
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f3ef;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f5f3ef;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background-color:#ffffff;border-radius:14px;border:1px solid #e7e5e4;overflow:hidden;">
          <!-- Top Accent Bar -->
          <tr>
            <td style="height:5px;background-color:${accent};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <!-- Header -->
          <tr>
            <td style="padding:24px 24px 18px 24px;background-color:#1c1917;">
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#fbbf24;margin-bottom:6px;">
                ${headerSubtitle}
              </div>
              <div style="font-family:Arial,Helvetica,sans-serif;font-size:21px;font-weight:700;color:#ffffff;line-height:1.3;">
                ${headerTitle}
              </div>
            </td>
          </tr>
          <!-- Intro -->
          <tr>
            <td style="padding:20px 24px 12px 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#44403c;">
              ${introText}
            </td>
          </tr>
          <!-- Details Table -->
          <tr>
            <td style="padding:8px 24px 14px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid #e7e5e4;border-radius:10px;border-collapse:collapse;">
                ${tableRowsHtml}
              </table>
            </td>
          </tr>
          <!-- Client Message Box -->
          <tr>
            <td style="padding:4px 24px 8px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#faf8f5;border-left:4px solid ${accent};border-radius:6px;">
                <tr>
                  <td style="padding:14px 16px;">
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:#78716c;margin-bottom:6px;">
                      Client Message / Requirements
                    </div>
                    <div style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#1c1917;white-space:pre-wrap;word-break:break-word;">
                      ${escapeHtml(vars.message)}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${quickActionsHtml}
          <!-- Footer -->
          <tr>
            <td style="padding:20px 24px 24px 24px;border-top:1px solid #f0ece4;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.5;color:#78716c;text-align:center;">
              ${footerText}<br />
              <span style="color:#a8a29e;">Ecreation IT Solution • Sector 62, Noida, UP, India</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `${applyPlaceholders(settings.header_title || DEFAULT_EMAIL_SETTINGS.header_title, vars)}`,
    '========================================',
    applyPlaceholders(settings.intro_text || DEFAULT_EMAIL_SETTINGS.intro_text, vars),
    '',
    ...detailRows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Client Message:',
    vars.message,
    '',
    `Open Admin CRM: ${adminUrl}`,
    '',
    applyPlaceholders(settings.footer_text || DEFAULT_EMAIL_SETTINGS.footer_text, vars)
  ].join('\n');

  return { subject, html, text };
}

export async function sendEnquiryNotificationEmail(
  lead: EnquiryEmailLead,
  overrideSettings?: EmailSettingsConfig
): Promise<{ sent: boolean; messageId?: string; reason?: string }> {
  const settings = overrideSettings || (await loadEmailSettings());

  if (!overrideSettings && !settings.enabled) {
    return { sent: false, reason: 'Email notifications are disabled in Admin Settings.' };
  }

  if (!settings.smtp_host || !settings.smtp_user || !settings.smtp_pass) {
    return { sent: false, reason: 'SMTP Host, Sender Email, or SMTP Password is not configured.' };
  }

  const recipients = (settings.admin_notify_emails || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);

  if (recipients.length === 0) {
    return { sent: false, reason: 'No Admin receiver email address configured.' };
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtp_host.trim(),
    port: Number(settings.smtp_port) || 465,
    secure: Boolean(settings.smtp_secure),
    auth: {
      user: settings.smtp_user.trim(),
      pass: settings.smtp_pass
    },
    tls: {
      minVersion: 'TLSv1.2'
    }
  });

  const { subject, html, text } = buildEnquiryEmailContent(settings, lead);
  // Anti-spam rule: Use authenticated SMTP user as envelope sender so SPF/DKIM/DMARC pass
  const senderAddress = settings.from_email?.trim() || settings.smtp_user.trim();
  const fromHeader = `"${(settings.from_name || 'Ecreation IT Solution Alerts').replace(/"/g, '')}" <${senderAddress}>`;

  const info = await transporter.sendMail({
    from: fromHeader,
    to: recipients.join(', '),
    replyTo: lead.email && lead.email.includes('@') ? lead.email : senderAddress,
    subject,
    text,
    html,
    headers: {
      'X-Entity-Ref-ID': lead.id || `EC-${Date.now()}`,
      'Auto-Submitted': 'auto-generated',
      'X-Priority': '3 (Normal)'
    }
  });

  return { sent: true, messageId: info.messageId };
}
