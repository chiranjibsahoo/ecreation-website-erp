import React from 'react';
import { FullscreenVideoHero } from '@/components/home/FullscreenVideoHero';
import { StatsSection } from '@/components/home/StatsSection';
import { TechEngineSection } from '@/components/home/TechEngineSection';
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
      <FullscreenVideoHero />
      <StatsSection />
      <TechEngineSection />
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
