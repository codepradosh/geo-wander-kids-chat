
import React from 'react';
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import PageHeader from '@/components/PageHeader';
import ChatSection from '@/components/ChatSection';
import InfoSection from '@/components/InfoSection';
import PageFooter from '@/components/PageFooter';
import NatureBackground from '@/components/NatureBackground';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <NatureBackground />
      <Container className="py-6 relative z-10">
        <PageHeader />
        
        <div className="grid md:grid-cols-3 gap-6">
          <ChatSection />
          <InfoSection />
        </div>
        
        <PageFooter />
      </Container>
    </div>
  );
};

export default Index;
