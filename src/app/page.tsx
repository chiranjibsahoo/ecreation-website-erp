import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ServicesVideoSlider } from '@/components/home/ServicesVideoSlider';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { ProjectCostEstimator } from '@/components/home/ProjectCostEstimator';
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
      <ServicesVideoSlider />
      <ServicesGrid />
      <ProjectCostEstimator />
      <TechStackBento />
      <CaseStudiesSection />
      <ProcessWorkflow />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
