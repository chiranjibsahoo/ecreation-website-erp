'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bot, X, Send, Sparkles, User, ArrowRight } from 'lucide-react';
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
      text: 'Hello! Welcome to Ecreation IT Solution. I am your AI Consultant. How can I help you with Website Design, Office Automation ERP, SEO, or Social Media today?',
      time: 'Just now',
      quickReplies: [
        'Website Design & Dev',
        'Office Automation & ERP',
        'SEO & Social Media',
        '25% Special Offer & Pricing'
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

    setTimeout(() => {
      const botResponse: Message = {
        id: `b-${Date.now()}`,
        sender: 'bot',
        text: '',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const lower = query.toLowerCase();

      if (lower.includes('website') || lower.includes('web') || lower.includes('design')) {
        botResponse.text =
          'We design and develop luxury corporate websites, E-commerce stores, and ultra-fast Next.js portals with a full Admin CMS. Right now, you get Flat 25% OFF + Free 1-Year Cloud Hosting & Domain!';
        botResponse.quickReplies = ['Office Automation & ERP', '25% Special Offer & Pricing', 'Book Free Demo'];
        botResponse.ctaLink = { text: 'Explore Website Engineering', href: '/services/custom-software-engineering' };
      } else if (lower.includes('erp') || lower.includes('automation') || lower.includes('office') || lower.includes('billing')) {
        botResponse.text =
          'Our custom Office Automation & ERP software handles automated GST billing, multi-warehouse inventory sync, HR attendance, payroll, and client CRM—cutting manual paperwork by 84%.';
        botResponse.quickReplies = ['View ERP Case Study', 'Book Free Demo'];
        botResponse.ctaLink = { text: 'Explore ERP & Office Automation', href: '/services/enterprise-erp-crm' };
      } else if (lower.includes('seo') || lower.includes('social') || lower.includes('marketing')) {
        botResponse.text =
          'We rank businesses #1 on Google Search (Technical SEO) and manage complete Instagram, LinkedIn, and Facebook growth along with high-ROI Google & Meta lead ads.';
        botResponse.quickReplies = ['Claim Free ₹25,000 SEO Audit', '25% Special Offer & Pricing'];
        botResponse.ctaLink = { text: 'Claim Free SEO & Growth Audit', href: '/contact#enquiry' };
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('offer') || lower.includes('25%')) {
        botResponse.text =
          'Our Special Business Package Offer gives you Flat 25% OFF (Promo Code: ECREATION25) on Website Design, Custom ERP, or Digital Marketing packages—plus Free 1-Year Cloud Hosting, SSL & Domain!';
        botResponse.quickReplies = ['Book Free Demo', 'Calculate Project Cost'];
        botResponse.ctaLink = { text: 'Claim 25% Special Discount', href: '/#offers' };
      } else {
        botResponse.text =
          'Our senior architects are ready to prepare a free custom demo and quotation for your business within 4 hours (or email us at contact@ecreation.in). Would you like to submit a quick enquiry?';
        botResponse.quickReplies = ['Website Design & Dev', 'Office Automation & ERP', '25% Special Offer & Pricing'];
        botResponse.ctaLink = { text: 'Open Project Enquiry', href: '/contact#enquiry' };
      }

      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 550);
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

      {/* Chat Window Dialog — Uses dvh for iOS Safari / Android Chrome address bar compatibility */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-22 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[400px] h-[500px] max-h-[75dvh] bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in-50 slide-in-from-bottom-5 duration-200">
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
                    Online
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-stone-400">Website · ERP · SEO · Automation Expert</p>
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
                <div className="max-w-[84%] space-y-2">
                  <div
                    className={`p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-stone-950 text-white border border-amber-500/40 rounded-tr-xs'
                        : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 border border-stone-200/90 dark:border-stone-800 shadow-2xs rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

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
                          className="text-[11px] font-semibold bg-white dark:bg-stone-900 hover:bg-stone-950 hover:text-white text-stone-700 dark:text-stone-300 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-700 transition-colors text-left"
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
              placeholder="Ask about Website, ERP, SEO, or 25% Offer..."
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
