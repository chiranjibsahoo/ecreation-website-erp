'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bot, X, Send, Sparkles, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickReplies?: string[];
  ctaLink?: { text: string; href: string };
}

export const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Hello! Welcome to Ecreation IT Solution. I am your AI Solutions Consultant. How can I assist you with your project today?',
      time: 'Just now',
      quickReplies: [
        'Explore Services',
        'ERP & Client Portals',
        'Project Timeline & Pricing',
        'Schedule a Consultation'
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI Response Logic based on knowledge base
    setTimeout(() => {
      let botResponse: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const lower = query.toLowerCase();

      if (lower.includes('service') || lower.includes('offer') || lower.includes('stack')) {
        botResponse.text =
          'Ecreation IT Solution specializes in enterprise software engineering, bespoke ERP & client portals, cloud & DevOps modernization (AWS/GCP), AI automation workflows, cross-platform mobile apps (iOS & Android), and high-conversion UI/UX systems.';
        botResponse.quickReplies = ['ERP & Client Portals', 'Cloud & DevOps', 'Request a Proposal'];
        botResponse.ctaLink = { text: 'View All Engineering Services', href: '/services' };
      } else if (lower.includes('erp') || lower.includes('portal') || lower.includes('client')) {
        botResponse.text =
          'Our bespoke ERP systems unify CRM, invoice automation, milestone tracking, and role-based permissions into a unified web application. Unlike rigid off-the-shelf software, our solutions are engineered precisely around your operational workflows.';
        botResponse.quickReplies = ['View Logistics ERP Case Study', 'Start Project Inquiry'];
        botResponse.ctaLink = { text: 'Read OmniLogistics ERP Case Study', href: '/projects/omnilogistics-erp' };
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('budget') || lower.includes('timeline')) {
        botResponse.text =
          'Project investment depends on scope, architecture, and timeline. Typical dedicated development sprints start with transparent milestone contracts. We provide fixed-price deliverables or dedicated engineering pods with clear weekly SLAs.';
        botResponse.quickReplies = ['Schedule a Scope Call', 'Explore Case Studies'];
        botResponse.ctaLink = { text: 'Get a Detailed Estimate', href: '/contact' };
      } else if (lower.includes('consultation') || lower.includes('contact') || lower.includes('call') || lower.includes('hire')) {
        botResponse.text =
          'Our principal architects are available for a 30-minute discovery call to evaluate your requirements and recommend technical architecture.';
        botResponse.ctaLink = { text: 'Fill Discovery Form', href: '/contact' };
      } else {
        botResponse.text =
          'Thank you for reaching out! Ecreation IT Solution engineers scalable digital solutions with guaranteed performance and zero fluff. Would you like to review our case studies or connect with our lead architect?';
        botResponse.quickReplies = ['View Case Studies', 'Contact Lead Architect'];
        botResponse.ctaLink = { text: 'Connect with Us', href: '/contact' };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 px-4 sm:px-5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 shadow-xl shadow-black/20 border border-neutral-700/60 flex items-center gap-2.5 transition-all duration-200 group focus-visible:ring-4 focus-visible:ring-indigo-500/50"
          aria-label="Toggle AI Consultation Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4 fill-white" />
          </div>
          <span className="font-semibold text-sm hidden sm:inline">AI Consultant</span>
          {isOpen ? <X className="w-4 h-4 text-neutral-400" /> : <Bot className="w-4 h-4 text-blue-400" />}
        </Button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 sm:left-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[80vh] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in-50 slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-neutral-950 text-white flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">Ecreation AI</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400">Enterprise Solutions Consultant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-muted/20">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-600/20">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div className="max-w-[80%] space-y-2">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-xs'
                        : 'bg-card text-foreground border border-border shadow-2xs rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Optional CTA Link */}
                  {msg.ctaLink && (
                    <Link
                      href={msg.ctaLink.href}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-900 transition-colors"
                    >
                      {msg.ctaLink.text}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}

                  {/* Quick Replies */}
                  {msg.quickReplies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleSend(reply)}
                          className="text-[11px] font-medium bg-background hover:bg-muted text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-full border border-border transition-colors text-left"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-muted-foreground block px-1">{msg.time}</span>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-muted-foreground text-xs p-2">
                <Bot className="w-4 h-4 text-indigo-500 animate-spin" />
                <span>Ecreation AI is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-card border-t border-border flex items-center gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about our services, ERP, or tech stack..."
              className="text-xs h-9 bg-background"
            />
            <Button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              size="icon"
              className="h-9 w-9 bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
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
