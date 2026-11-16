'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Phone,
  Mail,
  UserCheck,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  bullets?: string[];
  time: string;
  quickReplies?: string[];
  ctaLink?: { text: string; href: string };
  showInlineForm?: boolean;
  leadConfirmId?: string;
}

type TopicCategory = 'services' | 'pricing' | 'industries' | 'support';

const TOPIC_CATEGORIES: {
  id: TopicCategory;
  label: string;
  options: string[];
}[] = [
  {
    id: 'services',
    label: 'Services',
    options: [
      'Website Design & E-Commerce',
      'Office Automation & ERP',
      'SEO & Social Media Growth',
      'AI Chatbots & Automation',
      'Mobile App (iOS & Android)',
      'Cloud Hosting & Security',
      'Redesign Existing Website'
    ]
  },
  {
    id: 'pricing',
    label: 'Pricing & Offer',
    options: [
      '25% Special Offer & Pricing',
      'Website & ERP Cost Estimate',
      'Delivery Timeline & Sprints',
      'Payment Milestones & GST',
      'Free 1-Year Hosting & Domain'
    ]
  },
  {
    id: 'industries',
    label: 'Industries & Work',
    options: [
      'Portfolio & Case Studies',
      'ERP for Logistics & Manufacturing',
      'Healthcare & Clinic Software',
      'School / EdTech & Coaching ERP',
      'Retail, POS & E-Commerce',
      'Our Tech Stack (Next.js, AI, Cloud)'
    ]
  },
  {
    id: 'support',
    label: 'Demo & Help',
    options: [
      'Book Free Live Demo',
      'Claim Free SEO & Site Audit',
      '1-Year Free Support & SLA',
      'Source Code & NDA Privacy',
      'Talk to Solutions Architect',
      'Company Location & Contact'
    ]
  }
];

export const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<TopicCategory>('services');
  const [showTopicDrawer, setShowTopicDrawer] = useState(true);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Session & Lead Capture State
  const [sessionId, setSessionId] = useState<string>('');
  const [startedAt, setStartedAt] = useState<string>('');
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitorPhone, setVisitorPhone] = useState<string>('');
  const [visitorEmail, setVisitorEmail] = useState<string>('');
  const [serviceInterested, setServiceInterested] = useState<string>('Website Design & Web Development');
  const [leadCaptured, setLeadCaptured] = useState<boolean>(false);
  const [capturedLeadId, setCapturedLeadId] = useState<string>('');
  const [submittingLead, setSubmittingLead] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Hello! Welcome to Ecreation IT Solution. I am your 24/7 AI Solutions Consultant. Explore any topic from the quick menu below, click a question, or type your query directly!',
      bullets: [
        'Flat 25% Special Offer (Code: ECREATION25)',
        'Free 1-Year Cloud Hosting, SSL & Support',
        'Instant Demo Booking & Custom Cost Estimates'
      ],
      time: 'Just now',
      quickReplies: [
        'Book Free Live Demo',
        'Website Design & E-Commerce',
        'Office Automation & ERP',
        '25% Special Offer & Pricing',
        'SEO & Social Media Growth',
        'Delivery Timeline & Sprints'
      ]
    }
  ]);

  // Initialize unique chat session ID
  useEffect(() => {
    const existing = sessionStorage.getItem('ecreation_chat_session_id');
    const existingStart = sessionStorage.getItem('ecreation_chat_started_at');
    if (existing && existingStart) {
      setSessionId(existing);
      setStartedAt(existingStart);
    } else {
      const newId = `CHAT-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date().toISOString();
      sessionStorage.setItem('ecreation_chat_session_id', newId);
      sessionStorage.setItem('ecreation_chat_started_at', now);
      setSessionId(newId);
      setStartedAt(now);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Sync chat log to /api/chat-logs whenever messages or visitor details change
  const syncChatSession = useCallback(
    async (
      updatedMessages: Message[],
      overrides?: {
        name?: string;
        email?: string;
        phone?: string;
        service?: string;
        captured?: boolean;
        leadId?: string;
      }
    ) => {
      if (!sessionId || updatedMessages.length <= 1) return;
      try {
        await fetch('/api/chat-logs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            visitorName: overrides?.name ?? (visitorName || 'Website Visitor'),
            visitorEmail: overrides?.email ?? visitorEmail,
            visitorPhone: overrides?.phone ?? visitorPhone,
            serviceInterested: overrides?.service ?? serviceInterested,
            leadCaptured: overrides?.captured ?? leadCaptured,
            leadId: overrides?.leadId ?? (capturedLeadId || undefined),
            messages: updatedMessages.map((m) => ({
              id: m.id,
              sender: m.sender,
              text: m.bullets ? `${m.text} (${m.bullets.join('; ')})` : m.text,
              time: m.time
            })),
            startedAt
          })
        });
      } catch (err) {
        console.error('[Chat Log Sync Error]', err);
      }
    },
    [sessionId, visitorName, visitorEmail, visitorPhone, serviceInterested, leadCaptured, capturedLeadId, startedAt]
  );

  // Create enquiry in database (/api/contact) with source = 'Ecreation AI Assistant Chatbot'
  const createChatbotEnquiry = async (
    nameVal: string,
    phoneVal: string,
    emailVal: string,
    serviceVal: string,
    currentMessages: Message[]
  ) => {
    const cleanName = nameVal.trim() || emailVal.split('@')[0] || 'AI Chat Visitor';
    const transcriptSummary = currentMessages
      .slice(-6)
      .map((m) => `${m.sender === 'user' ? 'Visitor' : 'AI Bot'}: ${m.text}`)
      .join(' | ');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: cleanName,
        email: emailVal.trim(),
        phone: phoneVal.trim(),
        company: 'Via Ecreation AI Assistant',
        serviceRequired: serviceVal,
        budgetRange: 'AI Chatbot Enquiry (25% OFF Eligible)',
        message: `[Captured via Ecreation AI Assistant Chatbot] Interested in: ${serviceVal}. Phone: ${phoneVal.trim()}, Email: ${emailVal.trim()}. Recent Chat Context: ${transcriptSummary}`,
        source: 'Ecreation AI Assistant Chatbot'
      })
    });

    const data = await res.json();
    const newLeadId = data.leadId || `EC-${Math.floor(100000 + Math.random() * 900000)}`;
    setLeadCaptured(true);
    setCapturedLeadId(newLeadId);
    window.dispatchEvent(new CustomEvent('ecreation-enquiry-submitted'));
    return newLeadId;
  };

  // Handle Inline Chat Enquiry Form Submission
  const handleInlineFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!visitorName.trim() || !visitorPhone.trim() || !visitorEmail.trim()) {
      setFormError('Please enter your Name, Phone Number, and Email ID.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(visitorEmail.trim())) {
      setFormError('Please enter a valid Email ID.');
      return;
    }

    setSubmittingLead(true);
    try {
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const userSummaryMsg: Message = {
        id: `u-form-${Date.now()}`,
        sender: 'user',
        text: `Name: ${visitorName.trim()} | Phone: ${visitorPhone.trim()} | Email: ${visitorEmail.trim()} | Service: ${serviceInterested}`,
        time: nowTime
      };

      const updatedWithUser = [...messages, userSummaryMsg];
      const generatedLeadId = await createChatbotEnquiry(
        visitorName,
        visitorPhone,
        visitorEmail,
        serviceInterested,
        updatedWithUser
      );

      const botConfirmMsg: Message = {
        id: `b-confirm-${Date.now()}`,
        sender: 'bot',
        text: `Thank you, ${visitorName.trim()}! Your Free Demo & Project Enquiry (Ref: ${generatedLeadId}) has been saved to our priority queue. Our Senior Architect will reach out to you at ${visitorEmail.trim()} / ${visitorPhone.trim()} within 4 business hours.`,
        time: nowTime,
        leadConfirmId: generatedLeadId,
        quickReplies: [
          'Delivery Timeline & Sprints',
          'Portfolio & Case Studies',
          '1-Year Free Support & SLA',
          '25% Special Offer & Pricing'
        ]
      };

      const finalMessages = [...updatedWithUser, botConfirmMsg];
      setMessages(finalMessages);

      await syncChatSession(finalMessages, {
        name: visitorName.trim(),
        email: visitorEmail.trim(),
        phone: visitorPhone.trim(),
        service: serviceInterested,
        captured: true,
        leadId: generatedLeadId
      });
    } catch (err) {
      console.error('[Inline Chatbot Lead Error]', err);
      setFormError('Could not save enquiry. Please try again.');
    } finally {
      setSubmittingLead(false);
    }
  };

  // Comprehensive Knowledge Base Responder covering all user queries & help needs
  const buildKnowledgeResponse = (lower: string): Partial<Message> => {
    // 1. Demo / Quote / Call / Architect Booking
    if (
      lower.includes('demo') ||
      lower.includes('book') ||
      lower.includes('architect') ||
      lower.includes('callback') ||
      lower.includes('talk to') ||
      lower.includes('schedule') ||
      lower.includes('enquiry')
    ) {
      return {
        text: 'I can schedule your Free Live Demo & Architecture Consultation right here! Please fill in your Name, Phone Number, and Email ID below (or type them directly in chat):',
        bullets: [
          '1-on-1 screen-share demo of our Website, ERP, or AI modules',
          'Custom architecture blueprint & exact cost breakdown within 4 hours',
          'Flat 25% Special Offer voucher (ECREATION25) locked in'
        ],
        showInlineForm: true,
        quickReplies: [
          '25% Special Offer & Pricing',
          'Delivery Timeline & Sprints',
          'Portfolio & Case Studies'
        ]
      };
    }

    // 2. Free SEO & Website Audit
    if (lower.includes('audit') || lower.includes('check my site') || lower.includes('review my website')) {
      return {
        text: 'Claim your Complimentary Technical SEO, Speed & Conversion Audit! Share your Name, Phone Number, and Email ID below and our growth engineers will send you a full diagnostic report:',
        bullets: [
          'Core Web Vitals, mobile responsiveness & page speed analysis',
          'Google keyword ranking gaps & competitor backlink comparison',
          'UI/UX conversion bottlenecks & actionable fix roadmap'
        ],
        showInlineForm: true,
        quickReplies: [
          'SEO & Social Media Growth',
          'Redesign Existing Website',
          '25% Special Offer & Pricing'
        ]
      };
    }

    // 3. Website Redesign / Legacy Migration
    if (lower.includes('redesign') || lower.includes('migrate') || lower.includes('upgrade') || lower.includes('existing website') || lower.includes('slow')) {
      return {
        text: 'We specialize in modernizing outdated or slow WordPress/PHP websites and legacy software into ultra-fast Next.js 16 & Cloud platforms without losing your existing SEO rankings:',
        bullets: [
          'Zero-downtime migration with full 301 SEO URL preservation',
          '3x to 5x faster page load speed (99+ Google PageSpeed score)',
          'Modern luxury UI/UX with built-in lead capture & Admin CMS',
          'Includes 1-Year Free Cloud Hosting, SSL & Maintenance'
        ],
        ctaLink: { text: 'Explore Web Engineering', href: '/services/custom-software-engineering' },
        quickReplies: [
          'Book Free Live Demo',
          'Website & ERP Cost Estimate',
          'Delivery Timeline & Sprints',
          'Claim Free SEO & Site Audit'
        ]
      };
    }

    // 4. Website Design & E-Commerce
    if (lower.includes('website') || lower.includes('e-commerce') || lower.includes('ecommerce') || lower.includes('web design') || lower.includes('portal')) {
      return {
        text: 'We engineer custom corporate websites, high-converting E-Commerce stores, and multi-tenant web portals built on Next.js, React, and Tailwind CSS:',
        bullets: [
          '100% bespoke luxury design (mobile, tablet & 4K desktop responsive)',
          'Full Admin Dashboard / CMS to edit pages, products, leads & blogs',
          'Payment gateways (Razorpay, Stripe), WhatsApp & CRM integrations',
          'Flat 25% OFF + Free 1-Year Cloud Hosting, Domain & SSL included'
        ],
        ctaLink: { text: 'View Web Development Scope', href: '/services/custom-software-engineering' },
        quickReplies: [
          'Book Free Live Demo',
          'Website & ERP Cost Estimate',
          'Delivery Timeline & Sprints',
          'Redesign Existing Website',
          'Portfolio & Case Studies'
        ]
      };
    }

    // 5. Industry-Specific ERP: Logistics / Manufacturing
    if (lower.includes('logistics') || lower.includes('manufacturing') || lower.includes('warehouse') || lower.includes('supply chain') || lower.includes('fleet')) {
      return {
        text: 'Our Logistics, Fleet & Manufacturing ERP automates your entire supply chain—proven to cut manual dispatch paperwork by up to 94%:',
        bullets: [
          'Multi-warehouse barcode inventory, BOM & production batch tracking',
          'Live vehicle/fleet dispatch tracking, e-Way bills & GST invoicing',
          'Vendor procurement, purchase orders & dealer/distributor portals',
          'Real-time P&L, stock-alert & branch performance dashboards'
        ],
        ctaLink: { text: 'See OmniLogistics Case Study', href: '/projects' },
        quickReplies: [
          'Book Free Live Demo',
          'Office Automation & ERP',
          'Website & ERP Cost Estimate',
          'Delivery Timeline & Sprints'
        ]
      };
    }

    // 6. Industry-Specific: Healthcare / Clinic / Hospital
    if (lower.includes('health') || lower.includes('clinic') || lower.includes('hospital') || lower.includes('doctor') || lower.includes('medical') || lower.includes('patient')) {
      return {
        text: 'We build HIPAA-grade Healthcare, Clinic & Hospital Management Systems (HMS) tailored for doctors, diagnostic labs, and multi-specialty clinics:',
        bullets: [
          'Online patient appointment booking, token queue & doctor schedules',
          'Digital prescriptions (EMR/EHR), lab test reports & pharmacy billing',
          'Automated SMS/email reminders & patient history portal',
          'Role-based access for reception, doctors, lab staff & admin'
        ],
        ctaLink: { text: 'Explore Custom ERP Solutions', href: '/services/enterprise-erp-crm' },
        quickReplies: [
          'Book Free Live Demo',
          'Website & ERP Cost Estimate',
          '1-Year Free Support & SLA',
          'Source Code & NDA Privacy'
        ]
      };
    }

    // 7. Industry-Specific: School / EdTech / Coaching
    if (lower.includes('school') || lower.includes('college') || lower.includes('edtech') || lower.includes('coaching') || lower.includes('student') || lower.includes('lms')) {
      return {
        text: 'We deliver complete School/College ERP, Coaching Institute Portals, and Online Test/LMS Platforms:',
        bullets: [
          'Online admissions, automated fee collection & receipt generation',
          'Student attendance, timetable, exam report cards & parent portal',
          'Live classes, recorded video courses & CBT online mock test engine',
          'Custom mobile app + admin dashboard for institute owners'
        ],
        ctaLink: { text: 'Explore ERP & Portals', href: '/services/enterprise-erp-crm' },
        quickReplies: [
          'Book Free Live Demo',
          'Mobile App (iOS & Android)',
          'Website & ERP Cost Estimate',
          '25% Special Offer & Pricing'
        ]
      };
    }

    // 8. Industry-Specific: Retail / POS / E-Commerce
    if (lower.includes('retail') || lower.includes('pos') || lower.includes('shop') || lower.includes('store') || lower.includes('catalog')) {
      return {
        text: 'Our Retail POS, Inventory & Omnichannel E-Commerce Suite connects your physical stores with your online storefront in real time:',
        bullets: [
          'Fast barcode POS billing, GST invoicing & thermal receipt printing',
          'Unified stock sync across storefront, warehouse & online orders',
          'Customer loyalty points, coupon codes & automated WhatsApp/email offers',
          'Complete sales analytics, low-stock alerts & supplier management'
        ],
        ctaLink: { text: 'View E-Commerce & ERP Scope', href: '/services/enterprise-erp-crm' },
        quickReplies: [
          'Book Free Live Demo',
          'Website Design & E-Commerce',
          'Website & ERP Cost Estimate',
          '25% Special Offer & Pricing'
        ]
      };
    }

    // 9. Office Automation & Custom ERP / CRM
    if (lower.includes('erp') || lower.includes('office') || lower.includes('billing') || lower.includes('crm') || lower.includes('hr') || lower.includes('payroll') || lower.includes('inventory')) {
      return {
        text: 'Our Custom Office Automation & Enterprise ERP replaces scattered Excel sheets with one centralized, secure cloud platform:',
        bullets: [
          'Automated GST invoicing, quotations, ledgers & payment tracking',
          'Multi-branch inventory, purchase orders & vendor management',
          'Sales CRM pipeline, lead assignment & follow-up reminders',
          'HR attendance, leave tracking, expense claims & 1-click payroll'
        ],
        ctaLink: { text: 'Explore Enterprise ERP & CRM', href: '/services/enterprise-erp-crm' },
        quickReplies: [
          'Book Free Live Demo',
          'ERP for Logistics & Manufacturing',
          'Website & ERP Cost Estimate',
          'Delivery Timeline & Sprints',
          'Source Code & NDA Privacy'
        ]
      };
    }

    // 10. SEO, Google #1 & Social Media Marketing
    if (lower.includes('seo') || lower.includes('social') || lower.includes('marketing') || lower.includes('google') || lower.includes('instagram') || lower.includes('ads')) {
      return {
        text: 'Our Digital Growth & Technical SEO team ranks your brand #1 on Google and drives qualified inbound leads across social channels:',
        bullets: [
          'Technical & Local SEO: Core Web Vitals, schema markup & high-DA backlinks',
          'Social Media Management: Instagram, LinkedIn, Facebook & YouTube reels/creatives',
          'Performance Ads: High-ROI Google Search Ads & Meta Lead Generation campaigns',
          'Transparent monthly ranking, traffic & cost-per-lead ROI dashboards'
        ],
        ctaLink: { text: 'Explore UI/UX & Digital Growth', href: '/services/ui-ux-design-modernization' },
        quickReplies: [
          'Claim Free SEO & Site Audit',
          'Book Free Live Demo',
          '25% Special Offer & Pricing',
          'Website Design & E-Commerce'
        ]
      };
    }

    // 11. AI Chatbots & Workflow Automation
    if (lower.includes('ai') || lower.includes('chatbot') || lower.includes('bot') || lower.includes('workflow') || lower.includes('gpt') || lower.includes('llm')) {
      return {
        text: 'We build Custom AI Sales Chatbots, RAG Knowledge Assistants, and Automated Business Workflows that capture leads and cut repetitive work 24/7:',
        bullets: [
          '24/7 AI Sales & Support Chatbots trained on your products, PDFs & FAQs',
          'Automatic Phone & Email lead capture synced directly to your CRM/Admin panel',
          'Automated invoice/document extraction, email routing & report generation',
          'Seamless integration with your website, ERP, Supabase & internal tools'
        ],
        ctaLink: { text: 'Explore AI Automation Services', href: '/services/ai-automation-workflows' },
        quickReplies: [
          'Book Free Live Demo',
          'Office Automation & ERP',
          'Website & ERP Cost Estimate',
          '25% Special Offer & Pricing'
        ]
      };
    }

    // 12. Mobile App Development (iOS & Android)
    if (lower.includes('mobile') || lower.includes('app') || lower.includes('android') || lower.includes('ios') || lower.includes('flutter') || lower.includes('react native')) {
      return {
        text: 'We engineer high-performance iOS & Android Mobile Applications with native speed, offline sync, and real-time cloud backends:',
        bullets: [
          'Cross-platform (React Native / Flutter) & Native iOS/Android engineering',
          'Customer apps, delivery/field-staff tracking apps & B2B ordering portals',
          'Biometric login, push notifications, live GPS tracking & UPI/card payments',
          'End-to-end Apple App Store & Google Play Store publishing + 1-Year support'
        ],
        ctaLink: { text: 'Explore Mobile App Engineering', href: '/services/mobile-app-development' },
        quickReplies: [
          'Book Free Live Demo',
          'Website & ERP Cost Estimate',
          'Delivery Timeline & Sprints',
          'Portfolio & Case Studies'
        ]
      };
    }

    // 13. Cloud Hosting, DevOps & Cyber Security
    if (lower.includes('cloud') || lower.includes('hosting') || lower.includes('devops') || lower.includes('security') || lower.includes('aws') || lower.includes('server') || lower.includes('ssl') || lower.includes('domain')) {
      return {
        text: 'We provide enterprise-grade Cloud Infrastructure, DevOps CI/CD, and Cyber Security with a 99.99% uptime SLA—plus 1-Year Free Hosting on new projects:',
        bullets: [
          'Free 1-Year Cloud Hosting, Business Domain & SSL Certificate with our 25% Offer',
          'AWS, Google Cloud, Vercel & Supabase multi-region edge deployments',
          'Row-Level Security (RLS), OWASP Top-10 hardening, DDoS protection & daily backups',
          '24/7 automated uptime monitoring & zero-downtime CI/CD pipelines'
        ],
        ctaLink: { text: 'Explore Cloud & Security Scope', href: '/services/cloud-devops-infrastructure' },
        quickReplies: [
          'Book Free Live Demo',
          '1-Year Free Support & SLA',
          '25% Special Offer & Pricing',
          'Source Code & NDA Privacy'
        ]
      };
    }

    // 14. Cost Estimate / Package Pricing / Calculator
    if (lower.includes('estimate') || lower.includes('calculator') || lower.includes('package') || lower.includes('budget') || lower.includes('how much') || lower.includes('cost') || lower.includes('price') || lower.includes('pricing') || lower.includes('25%') || lower.includes('offer') || lower.includes('discount')) {
      return {
        text: 'With our Active Special Offer (Code: ECREATION25), you get a Flat 25% Discount across all packages, plus Free 1-Year Cloud Hosting, SSL & Support:',
        bullets: [
          'Corporate & Business Websites: Custom luxury UI + Admin CMS + SEO + 1-Yr Free Hosting (25% OFF)',
          'E-Commerce & Web Portals: Product/User management + Payment Gateway + Analytics (25% OFF)',
          'Custom Office ERP & AI Automation: Modular pricing tailored to your exact workflow & team size',
          'Use our interactive Cost Estimator on the homepage or share your Phone & Email for an exact quote in 4 hours!'
        ],
        ctaLink: { text: 'Open Interactive Cost Estimator', href: '/#estimator' },
        quickReplies: [
          'Book Free Live Demo',
          'Payment Milestones & GST',
          'Delivery Timeline & Sprints',
          'Free 1-Year Hosting & Domain'
        ]
      };
    }

    // 15. Delivery Timeline & Agile Sprints
    if (lower.includes('timeline') || lower.includes('how long') || lower.includes('time') || lower.includes('sprint') || lower.includes('process') || lower.includes('fast') || lower.includes('weeks')) {
      return {
        text: 'We follow an Agile Sprint Delivery model with weekly live preview links so you see real progress from Week 1:',
        bullets: [
          'Corporate & Brand Websites: 7 to 14 days (1–2 weeks)',
          'Custom E-Commerce & Web Portals: 3 to 5 weeks',
          'Enterprise ERP, CRM & Mobile Apps: 4 to 8 weeks (phased module rollout)',
          '4-Step Process: 1) Architecture Blueprint → 2) UI/UX Prototype → 3) Agile Engineering → 4) QA & Cloud Launch'
        ],
        ctaLink: { text: 'View Our Engineering Process', href: '/#process' },
        quickReplies: [
          'Book Free Live Demo',
          'Payment Milestones & GST',
          'Website & ERP Cost Estimate',
          '1-Year Free Support & SLA'
        ]
      };
    }

    // 16. Payment Milestones & GST Billing
    if (lower.includes('payment') || lower.includes('milestone') || lower.includes('installment') || lower.includes('emi') || lower.includes('gst') || lower.includes('invoice')) {
      return {
        text: 'We use 100% transparent, milestone-based billing—you only pay as verified project stages are completed:',
        bullets: [
          'Milestone 1 (Kickoff): Architecture blueprint, wireframes & UI/UX design sign-off',
          'Milestone 2 (Core Build): Staging server demo of frontend, backend & database modules',
          'Milestone 3 (Launch): Final QA testing, production deployment & staff training',
          '100% GST-compliant tax invoices with zero hidden maintenance or licensing fees'
        ],
        quickReplies: [
          'Book Free Live Demo',
          '25% Special Offer & Pricing',
          'Source Code & NDA Privacy',
          '1-Year Free Support & SLA'
        ]
      };
    }

    // 17. 1-Year Free Support, Maintenance & SLA
    if (lower.includes('support') || lower.includes('maintenance') || lower.includes('sla') || lower.includes('warranty') || lower.includes('after launch')) {
      return {
        text: 'Every website, ERP, and mobile app we deliver includes 1 Full Year of Complimentary Technical Support & Maintenance:',
        bullets: [
          '99.99% Uptime SLA with 24/7 automated health & security monitoring',
          'Free bug fixes, security patches, SSL renewals & automated cloud backups',
          'Dedicated support engineer + full admin training for your internal team',
          'Optional annual AMC available after Year 1 at transparent, fixed rates'
        ],
        quickReplies: [
          'Book Free Live Demo',
          'Source Code & NDA Privacy',
          'Cloud Hosting & Security',
          '25% Special Offer & Pricing'
        ]
      };
    }

    // 18. Source Code Ownership, IP & NDA Privacy
    if (lower.includes('nda') || lower.includes('privacy') || lower.includes('source code') || lower.includes('ownership') || lower.includes('security') || lower.includes('confidential')) {
      return {
        text: 'Your intellectual property and business data are 100% protected under strict enterprise security standards:',
        bullets: [
          'Signed Mutual Non-Disclosure Agreement (NDA) before project discovery',
          '100% Source Code, GitHub Repository & Database ownership transferred to you',
          'No vendor lock-in: clean, documented TypeScript/Next.js/PostgreSQL codebase',
          'Role-Based Access Control (RBAC) & encrypted cloud storage'
        ],
        ctaLink: { text: 'Read Privacy & Security Policy', href: '/privacy-policy' },
        quickReplies: [
          'Book Free Live Demo',
          'Payment Milestones & GST',
          'Our Tech Stack (Next.js, AI, Cloud)',
          'Talk to Solutions Architect'
        ]
      };
    }

    // 19. Portfolio, Case Studies & Client Results
    if (lower.includes('portfolio') || lower.includes('case stud') || lower.includes('project') || lower.includes('work') || lower.includes('client') || lower.includes('example')) {
      return {
        text: 'We have delivered high-impact enterprise systems across Logistics, FinTech, Healthcare, E-Commerce, and Manufacturing:',
        bullets: [
          'OmniLogistics Freight ERP: 94% reduction in manual paperwork & 3.4x faster billing',
          'FinEdge Digital Banking Suite: 68ms API latency & 180,000+ active monthly users',
          'MedCore Healthcare Portal & Retail Omnichannel E-Commerce platforms'
        ],
        ctaLink: { text: 'Explore Full Portfolio & Case Studies', href: '/projects' },
        quickReplies: [
          'Book Free Live Demo',
          'Website Design & E-Commerce',
          'Office Automation & ERP',
          '25% Special Offer & Pricing'
        ]
      };
    }

    // 20. Tech Stack
    if (lower.includes('tech') || lower.includes('stack') || lower.includes('next.js') || lower.includes('react') || lower.includes('supabase') || lower.includes('database') || lower.includes('language')) {
      return {
        text: 'We build with modern, battle-tested enterprise technologies for speed, scalability, and long-term reliability:',
        bullets: [
          'Frontend & Web: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS',
          'Backend & Database: Node.js, PostgreSQL, Supabase (RLS & Realtime), GraphQL/REST',
          'AI & Automation: OpenAI / Gemini LLMs, Python, RAG Vector Pipelines & Webhooks',
          'Mobile & Cloud: React Native, Flutter, AWS, Google Cloud, Docker & Vercel Edge'
        ],
        ctaLink: { text: 'Explore All Engineering Services', href: '/services' },
        quickReplies: [
          'Book Free Live Demo',
          'Source Code & NDA Privacy',
          'Portfolio & Case Studies',
          'Website & ERP Cost Estimate'
        ]
      };
    }

    // 21. Location, Contact & Company Info
    if (lower.includes('location') || lower.includes('address') || lower.includes('where') || lower.includes('email') || lower.includes('office') || lower.includes('headquarters') || lower.includes('noida')) {
      return {
        text: 'Here are our official corporate contact and headquarters details:',
        bullets: [
          'Headquarters: Tech Hub, Sector 62, Noida, Uttar Pradesh, India (Serving clients across India, USA, UK & UAE)',
          'Official Email & RFPs: contact@ecreation.in',
          'Response SLA: Dedicated Senior Solutions Architect responds within 4 business hours'
        ],
        ctaLink: { text: 'Open Contact & Discovery Page', href: '/contact#enquiry' },
        quickReplies: [
          'Book Free Live Demo',
          '25% Special Offer & Pricing',
          'Portfolio & Case Studies'
        ]
      };
    }

    // 22. Greetings / Help Menu
    if (
      lower === 'hi' ||
      lower === 'hello' ||
      lower === 'hey' ||
      lower.includes('help') ||
      lower.includes('menu') ||
      lower.includes('option')
    ) {
      return {
        text: 'Hello! Here is everything I can help you with right now—pick any option below or use the category tabs above:',
        bullets: [
          'Services: Website Design, Custom ERP, AI Chatbots, Mobile Apps, SEO & Cloud',
          'Pricing & Offers: Flat 25% Special Offer (ECREATION25) + Cost Estimates + Timelines',
          'Instant Action: Book a Free Live Demo or Free Website/SEO Audit right in chat'
        ],
        quickReplies: [
          'Book Free Live Demo',
          'Website Design & E-Commerce',
          'Office Automation & ERP',
          '25% Special Offer & Pricing',
          'Delivery Timeline & Sprints',
          'Portfolio & Case Studies'
        ]
      };
    }

    // 23. Default Smart Fallback: Answer + Offer Inline Demo Form + Helpful Quick Replies
    return {
      text: 'I would love to help you with your exact requirement! Our Senior Solutions Architects can prepare a tailored architecture roadmap, live demo, and quotation (with Flat 25% OFF) within 4 hours. Share your Name, Phone Number, and Email ID below—or pick a topic:',
      showInlineForm: true,
      quickReplies: [
        'Website Design & E-Commerce',
        'Office Automation & ERP',
        '25% Special Offer & Pricing',
        'Delivery Timeline & Sprints',
        'Portfolio & Case Studies'
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: nowTime
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // 1. Detect Email, Phone, and Name in the user's message
    const emailMatch = query.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const textWithoutEmail = emailMatch ? query.replace(emailMatch[0], ' ') : query;
    const phoneMatch = textWithoutEmail.match(/(?:\+?\d{1,3}[\s-]?)?[6-9]\d{9}\b|(?:\+?\d{1,3}[\s-]?)?\d{3,5}[\s-]?\d{3,5}[\s-]?\d{2,5}/);

    const detectedEmail = emailMatch ? emailMatch[0].trim() : visitorEmail;
    const detectedPhone = phoneMatch ? phoneMatch[0].trim() : visitorPhone;

    // Extract name if user wrote "name is X" or "I am X"
    let detectedName = visitorName;
    const nameMatch = query.match(/(?:my name is|i am|i'm|name[:\s-]+)\s*([a-zA-Z\s]{2,35})/i);
    if (nameMatch && nameMatch[1]) {
      detectedName = nameMatch[1].trim();
    }

    if (detectedEmail !== visitorEmail) setVisitorEmail(detectedEmail);
    if (detectedPhone !== visitorPhone) setVisitorPhone(detectedPhone);
    if (detectedName !== visitorName) setVisitorName(detectedName);

    const lower = query.toLowerCase();
    let detectedService = serviceInterested;
    if (lower.includes('erp') || lower.includes('automation') || lower.includes('billing') || lower.includes('office') || lower.includes('logistics') || lower.includes('clinic') || lower.includes('school')) {
      detectedService = 'Office Automation & Custom ERP Software';
      setServiceInterested(detectedService);
    } else if (lower.includes('seo') || lower.includes('social') || lower.includes('marketing') || lower.includes('audit')) {
      detectedService = 'SEO, Social Media & Digital Marketing';
      setServiceInterested(detectedService);
    } else if (lower.includes('ai') || lower.includes('chatbot') || lower.includes('bot')) {
      detectedService = 'AI Chatbots & Workflow Automation';
      setServiceInterested(detectedService);
    } else if (lower.includes('mobile') || lower.includes('app') || lower.includes('android') || lower.includes('ios')) {
      detectedService = 'Mobile App Development (iOS & Android)';
      setServiceInterested(detectedService);
    } else if (lower.includes('cloud') || lower.includes('hosting') || lower.includes('security')) {
      detectedService = 'Cloud Infrastructure & Cyber Security';
      setServiceInterested(detectedService);
    } else if (lower.includes('website') || lower.includes('web') || lower.includes('e-commerce') || lower.includes('redesign')) {
      detectedService = 'Website Design & Web Development';
      setServiceInterested(detectedService);
    }

    setTimeout(async () => {
      const botResponse: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // CASE A: Both Phone and Email have now been captured in chat! Auto-create Enquiry in Database
      if (detectedEmail && detectedPhone && !leadCaptured) {
        const finalName = detectedName || detectedEmail.split('@')[0];
        if (!visitorName) setVisitorName(finalName);

        const newLeadId = await createChatbotEnquiry(
          finalName,
          detectedPhone,
          detectedEmail,
          detectedService,
          nextMessages
        );

        botResponse.text = `Thank you, ${finalName}! I have automatically captured your contact details (${detectedPhone} · ${detectedEmail}) and registered your priority enquiry (Ref: ${newLeadId}). Our Senior Solutions Architect will contact you shortly!`;
        botResponse.leadConfirmId = newLeadId;
        botResponse.quickReplies = [
          'Delivery Timeline & Sprints',
          'Portfolio & Case Studies',
          '25% Special Offer & Pricing',
          '1-Year Free Support & SLA'
        ];

        const updatedAll = [...nextMessages, botResponse];
        setIsTyping(false);
        setMessages(updatedAll);
        await syncChatSession(updatedAll, {
          name: finalName,
          email: detectedEmail,
          phone: detectedPhone,
          service: detectedService,
          captured: true,
          leadId: newLeadId
        });
        return;
      }

      // CASE B: User shared ONLY Phone or ONLY Email during chat -> Prompt for the rest + show inline form
      if ((emailMatch || phoneMatch) && (!detectedEmail || !detectedPhone)) {
        const missing = !detectedEmail ? 'Email ID' : 'Phone / Mobile Number';
        botResponse.text = `Thank you! I have noted your ${emailMatch ? `Email (${detectedEmail})` : `Phone Number (${detectedPhone})`}. Please also share your ${missing} and Name below so I can register your priority enquiry immediately:`;
        botResponse.showInlineForm = true;
      } else {
        // CASE C: Comprehensive Knowledge Base Response
        const matched = buildKnowledgeResponse(lower);
        Object.assign(botResponse, matched);
      }

      const updatedAll = [...nextMessages, botResponse];
      setIsTyping(false);
      setMessages(updatedAll);
      await syncChatSession(updatedAll, {
        name: detectedName,
        email: detectedEmail,
        phone: detectedPhone,
        service: detectedService
      });
    }, 380);
  };

  const currentCategoryObj =
    TOPIC_CATEGORIES.find((c) => c.id === activeCategory) || TOPIC_CATEGORIES[0];

  return (
    <>
      {/* Floating AI Chatbot Trigger Button — Distinct Royal Emerald & 24K Gold Accent */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 sm:h-14 px-3.5 sm:px-5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-600 text-white shadow-[0_10px_30px_rgba(5,150,105,0.45)] border-2 border-amber-400/90 flex items-center gap-2.5 sm:gap-3 transition-all duration-200 hover:scale-105 group cursor-pointer"
          aria-label="Toggle AI Consultation Assistant"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-400 flex items-center justify-center text-stone-950 shadow-md shrink-0">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-white ring-2 ring-emerald-700 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-300 ring-2 ring-emerald-700" />
          </div>
          <div className="text-left">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-amber-200 block leading-none">
              24/7 AI Chat
            </span>
            <span className="font-black text-[11px] sm:text-xs text-white leading-tight block mt-0.5">
              Ask Consultant
            </span>
          </div>
          {isOpen ? (
            <X className="w-4 h-4 text-amber-200 ml-0.5" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 ml-0.5 group-hover:rotate-12 transition-transform" />
          )}
        </Button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-22 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[430px] h-[610px] max-h-[84dvh] bg-white dark:bg-stone-950 border-2 border-amber-500/45 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in-50 slide-in-from-bottom-5 duration-200">
          {/* Header — Option 3 Soft Warm Sage-Cream & Emerald-Gold Gradient */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-[#E3F1EB] via-[#EFF4EC] to-[#F5EFE0] text-stone-950 flex items-center justify-between border-b border-amber-500/35 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-bold shadow-xs shrink-0 border border-amber-600/40">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-stone-950">Ecreation AI Consultant</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-white/90 text-emerald-800 border border-emerald-500/40 px-2 py-0.5 rounded-full font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    24/7 Live
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-700 font-medium">
                  Services · Pricing · Timelines · Instant Demo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowTopicDrawer((prev) => !prev)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 border transition-colors cursor-pointer ${
                  showTopicDrawer
                    ? 'bg-amber-500 text-stone-950 border-amber-600/50'
                    : 'bg-white/90 text-stone-800 border-amber-500/40 hover:bg-white'
                }`}
                title="Toggle Quick Help Topics Menu"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Topics</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-700 hover:text-stone-950 p-1.5 rounded-lg hover:bg-white/70 transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Categorized Interactive Help & Query Explorer Bar */}
          {showTopicDrawer && (
            <div className="bg-gradient-to-b from-[#FFFDF9] to-[#F9F1DF] border-b border-amber-500/35 px-3 py-2.5 space-y-2 shrink-0">
              {/* 4 Category Tabs */}
              <div className="grid grid-cols-4 gap-1 bg-stone-900/5 p-1 rounded-xl border border-amber-500/25">
                {TOPIC_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`py-1 px-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer truncate ${
                      activeCategory === cat.id
                        ? 'bg-stone-950 text-amber-400 shadow-2xs'
                        : 'text-stone-700 hover:text-stone-950 hover:bg-white/70'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Horizontal Scrollable Chips for Selected Category */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
                {currentCategoryObj.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSend(opt)}
                    className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                      opt.toLowerCase().includes('demo') || opt.toLowerCase().includes('25%')
                        ? 'bg-amber-500 text-stone-950 border-amber-600 hover:bg-amber-400 shadow-2xs'
                        : 'bg-white text-stone-800 border-amber-500/40 hover:border-amber-600 hover:bg-amber-50/70'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-[#FAF8F5] dark:bg-stone-900/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-stone-950 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className="max-w-[88%] space-y-2">
                  <div
                    className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-stone-950 text-white border border-amber-500/40 rounded-tr-xs'
                        : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 border border-amber-500/35 shadow-2xs rounded-tl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.bullets && msg.bullets.length > 0 && (
                      <ul className="space-y-1.5 pt-1 border-t border-amber-500/20 text-[11px] sm:text-xs text-stone-700 dark:text-stone-300 font-medium">
                        {msg.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Lead Captured Confirmation Badge inside Chat */}
                  {msg.leadConfirmId && (
                    <div className="p-3 rounded-2xl bg-stone-950 text-white border border-amber-500/50 space-y-1.5 shadow-md">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Enquiry Saved to Priority Database</span>
                      </div>
                      <div className="text-[11px] font-mono text-stone-300">
                        Ref ID: <strong className="text-white">{msg.leadConfirmId}</strong> · Source:{' '}
                        <span className="text-amber-300">Ecreation AI Assistant</span>
                      </div>
                    </div>
                  )}

                  {/* IN-CHAT INLINE ENQUIRY / FREE DEMO FORM */}
                  {msg.showInlineForm && !leadCaptured && (
                    <form
                      onSubmit={handleInlineFormSubmit}
                      className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-amber-500/55 shadow-lg space-y-2.5"
                    >
                      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-black text-stone-950 dark:text-white">
                          <UserCheck className="w-4 h-4 text-amber-600" />
                          <span>Book Free Demo / Quick Enquiry</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                          25% OFF
                        </span>
                      </div>

                      {formError && (
                        <p className="text-[11px] text-red-600 font-semibold">{formError}</p>
                      )}

                      <div className="space-y-2">
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <Input
                            value={visitorName}
                            onChange={(e) => setVisitorName(e.target.value)}
                            placeholder="Your Full Name *"
                            required
                            className="pl-8 h-9 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700"
                          />
                        </div>

                        <div className="relative">
                          <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <Input
                            type="tel"
                            value={visitorPhone}
                            onChange={(e) => setVisitorPhone(e.target.value)}
                            placeholder="Phone / Mobile Number *"
                            required
                            className="pl-8 h-9 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700"
                          />
                        </div>

                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <Input
                            type="email"
                            value={visitorEmail}
                            onChange={(e) => setVisitorEmail(e.target.value)}
                            placeholder="Your Email ID *"
                            required
                            className="pl-8 h-9 text-xs rounded-xl bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700"
                          />
                        </div>

                        <select
                          value={serviceInterested}
                          onChange={(e) => setServiceInterested(e.target.value)}
                          className="w-full h-9 px-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs font-medium"
                        >
                          <option value="Website Design & Web Development">Website Design &amp; E-Commerce</option>
                          <option value="Office Automation & Custom ERP Software">Office Automation &amp; Custom ERP</option>
                          <option value="SEO, Social Media & Digital Marketing">SEO, Social Media &amp; Marketing</option>
                          <option value="AI Chatbots & Workflow Automation">AI Chatbots &amp; Automation</option>
                          <option value="Mobile App Development (iOS & Android)">Mobile App (iOS &amp; Android)</option>
                          <option value="Cloud Infrastructure & Cyber Security">Cloud Hosting &amp; Cyber Security</option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        disabled={submittingLead}
                        className="w-full h-9 bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        {submittingLead ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin text-amber-400" />
                            Saving Enquiry...
                          </>
                        ) : (
                          <>
                            <span>Submit &amp; Book Free Demo</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-amber-400" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}

                  {msg.ctaLink && (
                    <Link
                      href={msg.ctaLink.href}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
                    >
                      {msg.ctaLink.text}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}

                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleSend(reply)}
                          className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-full border transition-all text-left cursor-pointer ${
                            reply.toLowerCase().includes('demo')
                              ? 'bg-amber-500 text-stone-950 border-amber-600 font-bold hover:bg-amber-400'
                              : 'bg-white dark:bg-stone-900 hover:bg-stone-950 hover:text-white text-stone-700 dark:text-stone-300 border-amber-500/35'
                          }`}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-stone-400 block px-1">{msg.time}</span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-stone-500 text-xs p-2">
                <Bot className="w-4 h-4 text-amber-600 animate-spin" />
                <span>Ecreation AI is preparing your answer...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-2.5 sm:p-3 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => handleSend('Show All Help Options')}
              className="h-9 px-2.5 rounded-xl border border-amber-500/40 bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-[10px] font-extrabold flex items-center gap-1 shrink-0 cursor-pointer"
              title="Show all help options"
            >
              <RotateCcw className="w-3 h-3 text-amber-700" />
              <span className="hidden xs:inline">Menu</span>
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything (services, price, ERP, timeline) or share Phone & Email..."
              className="text-xs h-9 bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 rounded-xl"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              size="icon"
              className="h-9 w-9 bg-stone-950 hover:bg-stone-900 text-amber-400 border border-amber-500/40 rounded-xl shrink-0 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
