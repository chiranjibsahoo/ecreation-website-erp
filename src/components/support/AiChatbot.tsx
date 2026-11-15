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
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickReplies?: string[];
  ctaLink?: { text: string; href: string };
  showInlineForm?: boolean;
  leadConfirmId?: string;
}

export const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      text: 'Hello! Welcome to Ecreation IT Solution. I am your AI Consultant. How can I help you with Website Design, Office Automation ERP, SEO, or Social Media today?',
      time: 'Just now',
      quickReplies: [
        'Book Free Demo',
        'Website Design & Dev',
        'Office Automation & ERP',
        'SEO & Social Media',
        '25% Special Offer & Pricing'
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
              text: m.text,
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
        quickReplies: ['Website Design & Dev', 'Office Automation & ERP', '25% Special Offer & Pricing']
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
    if (lower.includes('erp') || lower.includes('automation') || lower.includes('billing') || lower.includes('office')) {
      detectedService = 'Office Automation & Custom ERP Software';
      setServiceInterested(detectedService);
    } else if (lower.includes('seo') || lower.includes('social') || lower.includes('marketing')) {
      detectedService = 'SEO, Social Media & Digital Marketing';
      setServiceInterested(detectedService);
    } else if (lower.includes('website') || lower.includes('web')) {
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
        botResponse.quickReplies = ['Website Design & Dev', 'Office Automation & ERP', '25% Special Offer & Pricing'];

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
        botResponse.text = `Thank you! I have noted your ${emailMatch ? `Email (${detectedEmail})` : `Phone Number (${detectedPhone})`}. Please also share your ${missing} and Name below so I can register your enquiry immediately:`;
        botResponse.showInlineForm = true;
      }
      // CASE C: User clicked "Book Free Demo", "Claim Free ₹25,000 SEO Audit", or asked for demo / quote / contact
      else if (
        lower.includes('demo') ||
        lower.includes('book') ||
        lower.includes('audit') ||
        lower.includes('quote') ||
        lower.includes('enquiry') ||
        lower.includes('contact') ||
        lower.includes('call')
      ) {
        botResponse.text =
          'I would love to arrange a Free Live Demo & Custom Quote for you right here! Please enter your Name, Phone Number, and Email ID in the box below (or type them directly in chat):';
        botResponse.showInlineForm = true;
      } else if (lower.includes('website') || lower.includes('web') || lower.includes('design')) {
        botResponse.text =
          'We design and develop luxury corporate websites, E-commerce stores, and ultra-fast Next.js portals with a full Admin CMS. Right now, you get Flat 25% OFF + Free 1-Year Cloud Hosting & Domain! Share your Phone & Email or click Book Free Demo below:';
        botResponse.quickReplies = ['Book Free Demo', 'Office Automation & ERP', '25% Special Offer & Pricing'];
      } else if (lower.includes('erp') || lower.includes('automation') || lower.includes('office') || lower.includes('billing')) {
        botResponse.text =
          'Our custom Office Automation & ERP software handles automated GST billing, multi-warehouse inventory sync, HR attendance, payroll, and client CRM—cutting manual paperwork by 84%. Would you like to book a Free Live ERP Demo?';
        botResponse.quickReplies = ['Book Free Demo', 'Website Design & Dev', '25% Special Offer & Pricing'];
      } else if (lower.includes('seo') || lower.includes('social') || lower.includes('marketing')) {
        botResponse.text =
          'We rank businesses #1 on Google Search (Technical SEO) and manage complete Instagram, LinkedIn, and Facebook growth along with high-ROI Google & Meta lead ads. Click below to claim your Free SEO Audit or Demo:';
        botResponse.quickReplies = ['Book Free Demo', 'Claim Free ₹25,000 SEO Audit', '25% Special Offer & Pricing'];
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('offer') || lower.includes('25%')) {
        botResponse.text =
          'Our Special Business Package Offer gives you Flat 25% OFF (Promo Code: ECREATION25) on Website Design, Custom ERP, or Digital Marketing packages—plus Free 1-Year Cloud Hosting, SSL & Domain! Would you like to lock in this offer with a Free Demo?';
        botResponse.quickReplies = ['Book Free Demo', 'Website Design & Dev', 'Office Automation & ERP'];
      } else {
        botResponse.text =
          'Our senior architects can prepare a free custom demo and quotation for your business within 4 hours. Please share your Name, Phone Number, and Email ID below so we can connect with you:';
        botResponse.showInlineForm = true;
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
    }, 450);
  };

  return (
    <>
      {/* Floating AI Chatbot Trigger Button — Responsive on Mobile & Desktop */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 sm:h-14 px-3.5 sm:px-5 rounded-full bg-stone-950 text-white hover:bg-stone-900 shadow-2xl shadow-stone-950/30 border border-amber-500/60 flex items-center gap-2 sm:gap-2.5 transition-all duration-200 hover:scale-105 group cursor-pointer"
          aria-label="Toggle AI Consultation Assistant"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-500 flex items-center justify-center text-stone-950 shadow-sm shrink-0">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-stone-950 animate-pulse" />
          </div>
          <div className="text-left">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-amber-400 block leading-none">
              24/7 AI Chat
            </span>
            <span className="font-bold text-[11px] sm:text-xs text-white leading-tight block mt-0.5">
              Ask Consultant
            </span>
          </div>
          {isOpen ? (
            <X className="w-4 h-4 text-stone-400 ml-0.5" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 ml-0.5 group-hover:rotate-12 transition-transform" />
          )}
        </Button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-22 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[410px] h-[560px] max-h-[80dvh] bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in-50 slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-stone-950 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500 flex items-center justify-center text-stone-950 font-bold shadow-xs shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-white">Ecreation AI Assistant</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-400">
                  Instant Demo Booking &amp; Technical Consultant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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
                <div className="max-w-[86%] space-y-2">
                  <div
                    className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-stone-950 text-white border border-amber-500/40 rounded-tr-xs'
                        : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 border border-stone-200/90 dark:border-stone-800 shadow-2xs rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Lead Captured Confirmation Badge inside Chat */}
                  {msg.leadConfirmId && (
                    <div className="p-3 rounded-2xl bg-stone-950 text-white border border-amber-500/50 space-y-1.5 shadow-md">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Enquiry Saved to Priority Database</span>
                      </div>
                      <div className="text-[11px] font-mono text-stone-300">
                        Ref ID: <strong className="text-white">{msg.leadConfirmId}</strong> · Source: <span className="text-amber-300">Ecreation AI Assistant</span>
                      </div>
                    </div>
                  )}

                  {/* IN-CHAT INLINE ENQUIRY / FREE DEMO FORM */}
                  {msg.showInlineForm && !leadCaptured && (
                    <form
                      onSubmit={handleInlineFormSubmit}
                      className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border-2 border-amber-500/50 shadow-lg space-y-2.5"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-black text-stone-950 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-2">
                        <UserCheck className="w-4 h-4 text-amber-600" />
                        <span>Book Free Demo / Quick Enquiry</span>
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
                          <option value="Website Design & Web Development">Website Design &amp; Development</option>
                          <option value="Office Automation & Custom ERP Software">Office Automation &amp; Custom ERP</option>
                          <option value="SEO, Social Media & Digital Marketing">SEO, Social Media &amp; Marketing</option>
                          <option value="AI Chatbots & Workflow Automation">AI Chatbots &amp; Automation</option>
                          <option value="Mobile App Development (iOS & Android)">Mobile App (iOS &amp; Android)</option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        disabled={submittingLead}
                        className="w-full h-9 bg-stone-950 hover:bg-stone-900 text-white border border-amber-500/50 rounded-xl text-xs font-bold"
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
                          className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-colors text-left ${
                            reply.toLowerCase().includes('demo')
                              ? 'bg-amber-500 text-stone-950 border-amber-600 font-bold hover:bg-amber-400'
                              : 'bg-white dark:bg-stone-900 hover:bg-stone-950 hover:text-white text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
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
                <span>Ecreation AI is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 shrink-0">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a question or share Phone & Email..."
              className="text-xs h-10 bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 rounded-xl"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              size="icon"
              className="h-10 w-10 bg-stone-950 hover:bg-stone-900 text-amber-400 border border-amber-500/40 rounded-xl shrink-0"
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
