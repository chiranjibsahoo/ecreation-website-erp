import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message text is required' }, { status: 400 });
    }

    const lower = message.toLowerCase();
    let reply = '';
    let quickReplies: string[] = [];
    let ctaLink: { text: string; href: string } | undefined;

    // Domain Knowledge Base
    if (lower.includes('service') || lower.includes('offer') || lower.includes('stack')) {
      reply =
        'Ecreation IT Solution provides six core practices: Custom Software Engineering, Enterprise ERP & Client Portals, Cloud Architecture & DevOps, AI Automation Workflows, Cross-Platform Mobile Apps, and Product UI/UX Design.';
      quickReplies = ['Explore ERPs', 'Cloud & DevOps', 'Request Proposal'];
      ctaLink = { text: 'View All Services', href: '/services' };
    } else if (lower.includes('erp') || lower.includes('portal') || lower.includes('client')) {
      reply =
        'Our bespoke ERP portals unify invoicing, project milestone tracking, role-based access control (RBAC), and customer communication under a fast Next.js web interface.';
      quickReplies = ['View Logistics Case Study', 'Talk to Architect'];
      ctaLink = { text: 'OmniLogistics ERP Study', href: '/projects/omnilogistics-erp' };
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget')) {
      reply =
        'Engagements are scoped on transparent milestone deliverables or dedicated sprint pods. Small sprints start from $10k, with full-scale enterprise systems scoped with fixed milestone SLAs.';
      quickReplies = ['Schedule Discovery Call', 'View Case Studies'];
      ctaLink = { text: 'Get Project Estimate', href: '/contact' };
    } else {
      reply =
        'Thank you for contacting Ecreation IT Solution. We engineer mission-critical software with guaranteed uptime and strict security. Would you like to schedule an architecture discovery session with our technical team?';
      quickReplies = ['Schedule Discovery Call', 'Browse Portfolio'];
      ctaLink = { text: 'Schedule Architecture Call', href: '/contact' };
    }

    return NextResponse.json({
      success: true,
      reply,
      quickReplies,
      ctaLink,
      timestamp: new Date().toISOString()
    });
  } catch (err: unknown) {
    console.error('[Chat API Error]', err);
    return NextResponse.json({ error: 'Chat service error' }, { status: 500 });
  }
}

