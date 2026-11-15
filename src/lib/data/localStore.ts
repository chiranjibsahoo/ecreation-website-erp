import fs from 'fs';
import path from 'path';

export interface StoredLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_required: string;
  budget_range: string | null;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
  created_at: string;
}

export interface StoredChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export interface StoredChatSession {
  sessionId: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  serviceInterested: string;
  leadCaptured: boolean;
  leadId?: string;
  messages: StoredChatMessage[];
  startedAt: string;
  updatedAt: string;
}

interface LocalDatabase {
  leads: StoredLead[];
  chatSessions: StoredChatSession[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DATA_DIR, 'ecreation_store.json');

const INITIAL_DATA: LocalDatabase = {
  leads: [
    {
      id: 'EC-904215',
      name: 'Vikramaditya Mehta',
      email: 'vikram@mehtalogistics.in',
      company: 'Mehta Global Logistics',
      phone: '+91 98112 45678',
      service_required: 'Office Automation & Custom ERP Software',
      budget_range: 'Standard Business Package (25% OFF)',
      message:
        'Captured via Ecreation AI Assistant Chatbot. Visitor requested a Free Demo for multi-branch GST billing and warehouse inventory ERP automation.',
      source: 'Ecreation AI Assistant Chatbot',
      status: 'new',
      created_at: '2026-11-15T10:15:00Z'
    },
    {
      id: 'EC-849102',
      name: 'Sarah Jenkins',
      email: 's.jenkins@acme-enterprises.com',
      company: 'Acme Enterprises',
      phone: '+1 (415) 890-1234',
      service_required: 'Enterprise ERP & Client Portals',
      budget_range: '$25k - $50k',
      message:
        'Looking to replace an internal spreadsheet logistics tracker with a bespoke web portal with role permissions.',
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
      message:
        'Need a high-throughput financial transactions dashboard built on Next.js and Supabase.',
      source: 'linkedin_campaign',
      status: 'qualified',
      created_at: '2026-11-09T09:15:00Z'
    }
  ],
  chatSessions: [
    {
      sessionId: 'CHAT-782341',
      visitorName: 'Vikramaditya Mehta',
      visitorEmail: 'vikram@mehtalogistics.in',
      visitorPhone: '+91 98112 45678',
      serviceInterested: 'Office Automation & Custom ERP Software',
      leadCaptured: true,
      leadId: 'EC-904215',
      startedAt: '2026-11-15T10:12:10Z',
      updatedAt: '2026-11-15T10:15:05Z',
      messages: [
        {
          id: 'm-1',
          sender: 'bot',
          text: 'Hello! Welcome to Ecreation IT Solution. I am your AI Consultant. How can I help you with Website Design, Office Automation ERP, SEO, or Social Media today?',
          time: '10:12 AM'
        },
        {
          id: 'm-2',
          sender: 'user',
          text: 'Office Automation & ERP',
          time: '10:13 AM'
        },
        {
          id: 'm-3',
          sender: 'bot',
          text: 'Our custom Office Automation & ERP software handles automated GST billing, multi-warehouse inventory sync, HR attendance, payroll, and client CRM—cutting manual paperwork by 84%.',
          time: '10:13 AM'
        },
        {
          id: 'm-4',
          sender: 'user',
          text: 'Book Free Demo',
          time: '10:14 AM'
        },
        {
          id: 'm-5',
          sender: 'user',
          text: 'Name: Vikramaditya Mehta | Phone: +91 98112 45678 | Email: vikram@mehtalogistics.in | Service: Office Automation & Custom ERP Software',
          time: '10:15 AM'
        },
        {
          id: 'm-6',
          sender: 'bot',
          text: 'Thank you, Vikramaditya Mehta! Your enquiry (Ref: EC-904215) has been registered via Ecreation AI Assistant. Our Senior Solutions Architect will contact you shortly.',
          time: '10:15 AM'
        }
      ]
    },
    {
      sessionId: 'CHAT-651092',
      visitorName: 'Browsing Visitor',
      visitorEmail: '',
      visitorPhone: '',
      serviceInterested: 'Website Design & Dev',
      leadCaptured: false,
      startedAt: '2026-11-15T09:40:00Z',
      updatedAt: '2026-11-15T09:42:15Z',
      messages: [
        {
          id: 'm-1',
          sender: 'bot',
          text: 'Hello! Welcome to Ecreation IT Solution. I am your AI Consultant. How can I help you with Website Design, Office Automation ERP, SEO, or Social Media today?',
          time: '09:40 AM'
        },
        {
          id: 'm-2',
          sender: 'user',
          text: 'Website Design & Dev',
          time: '09:41 AM'
        },
        {
          id: 'm-3',
          sender: 'bot',
          text: 'We design and develop luxury corporate websites, E-commerce stores, and ultra-fast Next.js portals with a full Admin CMS. Right now, you get Flat 25% OFF + Free 1-Year Cloud Hosting & Domain!',
          time: '09:41 AM'
        }
      ]
    }
  ]
};

function readDb(): LocalDatabase {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf-8');
      return INITIAL_DATA;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as LocalDatabase;
    return {
      leads: Array.isArray(parsed.leads) ? parsed.leads : INITIAL_DATA.leads,
      chatSessions: Array.isArray(parsed.chatSessions) ? parsed.chatSessions : INITIAL_DATA.chatSessions
    };
  } catch (err) {
    console.error('[LocalStore Read Error]', err);
    return INITIAL_DATA;
  }
}

function writeDb(db: LocalDatabase) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('[LocalStore Write Error]', err);
  }
}

export function getStoredLeads(statusFilter?: string | null): StoredLead[] {
  const db = readDb();
  if (statusFilter && statusFilter !== 'all') {
    return db.leads.filter((l) => l.status === statusFilter);
  }
  return db.leads;
}

export function addStoredLead(lead: StoredLead): StoredLead {
  const db = readDb();
  db.leads = [lead, ...db.leads];
  writeDb(db);
  return lead;
}

export function updateStoredLeadStatus(id: string, status: StoredLead['status']): StoredLead | null {
  const db = readDb();
  let updated: StoredLead | null = null;
  db.leads = db.leads.map((l) => {
    if (l.id === id) {
      updated = { ...l, status };
      return updated;
    }
    return l;
  });
  writeDb(db);
  return updated;
}

export function getStoredChatSessions(): StoredChatSession[] {
  const db = readDb();
  return db.chatSessions.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function upsertStoredChatSession(session: StoredChatSession): StoredChatSession {
  const db = readDb();
  const idx = db.chatSessions.findIndex((s) => s.sessionId === session.sessionId);
  if (idx >= 0) {
    db.chatSessions[idx] = {
      ...db.chatSessions[idx],
      ...session,
      updatedAt: new Date().toISOString()
    };
  } else {
    db.chatSessions = [
      {
        ...session,
        startedAt: session.startedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      ...db.chatSessions
    ];
  }
  writeDb(db);
  return session;
}
