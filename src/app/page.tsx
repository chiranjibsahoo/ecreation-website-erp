import React from 'react';
import { FullscreenVideoHero } from '@/components/home/FullscreenVideoHero';
import { StatsSection } from '@/components/home/StatsSection';
import { VisualPortfolioSlider } from '@/components/home/VisualPortfolioSlider';
import { PrimaryLaunchOfferBanner, SecondaryComboOffersBanner } from '@/components/home/OfferBanners';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { ServicesVideoSlider } from '@/components/home/ServicesVideoSlider';
import { TechEngineSection } from '@/components/home/TechEngineSection';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { ProjectCostEstimator } from '@/components/home/ProjectCostEstimator';
import { TechStackBento } from '@/components/home/TechStackBento';
import { ProcessWorkflow } from '@/components/home/ProcessWorkflow';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CtaSection } from '@/components/home/CtaSection';

export default function HomePage() {
  return (
    <>
      <FullscreenVideoHero />
      <StatsSection />
      <VisualPortfolioSlider />
      <PrimaryLaunchOfferBanner />
      <ServicesGrid />
      <ServicesVideoSlider />
      <TechEngineSection />
      <CaseStudiesSection />
      <SecondaryComboOffersBanner />
      <ProjectCostEstimator />
      <TechStackBento />
      <ProcessWorkflow />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
