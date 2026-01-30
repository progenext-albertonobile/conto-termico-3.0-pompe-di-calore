import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CalculatorSection from '@/components/Calculator/CalculatorSection';
import AboutSection from '@/components/AboutSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LeadModal from '@/components/LeadModal';

const Index = () => {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" />
      <Header />
      <main>
        <HeroSection />
        <CalculatorSection onOpenLeadModal={() => setIsLeadModalOpen(true)} />
        <AboutSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
      />
    </div>
  );
};

export default Index;
