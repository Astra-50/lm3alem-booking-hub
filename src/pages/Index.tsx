
import React from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import PopularServicesSection from '@/components/home/PopularServicesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCTASection from '@/components/home/FinalCTASection';

const Index = () => {
  return (
    <Layout>
      <Header />
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
