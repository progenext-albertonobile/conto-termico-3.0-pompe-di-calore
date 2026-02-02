import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CalculatorSection } from '@/components/Calculator/CalculatorSection';
import { FAQSection } from '@/components/FAQSection';
import { AboutSection } from '@/components/AboutSection';
import { Footer } from '@/components/Footer';
import { LeadModal } from '@/components/LeadModal';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Index = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onOpenLeadModal={() => setIsLeadModalOpen(true)} />
        <CalculatorSection onOpenLeadModal={() => setIsLeadModalOpen(true)} />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
    </div>
  );
};

export default Index;
