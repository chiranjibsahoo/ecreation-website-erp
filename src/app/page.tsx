import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { TechStackBento } from '@/components/home/TechStackBento';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { ProcessWorkflow } from '@/components/home/ProcessWorkflow';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CtaSection } from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesGrid />
      <TechStackBento />
      <CaseStudiesSection />
      <ProcessWorkflow />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
