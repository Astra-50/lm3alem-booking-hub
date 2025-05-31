
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import PopularServicesSection from '@/components/home/PopularServicesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTASection from '@/components/home/FinalCTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <PopularServicesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FinalCTASection />
    </Layout>
  );
};

export default Index;
