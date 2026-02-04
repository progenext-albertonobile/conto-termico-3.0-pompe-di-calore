import { Button } from '@/components/ui/button';
import { ArrowDown, Download, Calculator, TrendingUp, Shield, Award } from 'lucide-react';
import { useCountUp } from '@/hooks/useScrollAnimation';

interface HeroSectionProps {
  onOpenLeadModal: () => void;
}

export function HeroSection({ onOpenLeadModal }: HeroSectionProps) {
  const { count: savingsCount, ref: savingsRef } = useCountUp(65, 2000);
  const { count: clientsCount, ref: clientsRef } = useCountUp(1500, 2500);
  const { count: projectsCount, ref: projectsRef } = useCountUp(3200, 2500);

  const scrollToCalculator = () => {
    const element = document.querySelector('#calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      <div className="absolute inset-0">
        {/* Animated shapes */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/20 rounded-full blur-2xl float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in">
            <Award className="w-4 h-4" />
            Esperti Certificati Conto Termico 3.0
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Risparmia fino al{' '}
            <span className="relative inline-block">
              <span ref={savingsRef} className="text-accent">{savingsCount}%</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-accent rounded-full" />
            </span>
            <br />
            con il <span className="text-accent">Conto Termico 3.0</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Calcola gratuitamente gli incentivi per la tua pompa di calore. 
            Supporto completo dalla progettazione all'ottenimento del contributo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              onClick={scrollToCalculator}
              className="gradient-accent text-accent-foreground text-lg px-8 py-6 shadow-accent hover:opacity-90 transition-all pulse-glow group"
            >
              <Calculator className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Calcola il Tuo Incentivo
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-sm"
            >
              <a
                href="/downloads/PROGENEXT_Conto_Termico_30_Guida.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5 mr-2" />
                Scarica la Guida Gratuita
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span ref={clientsRef} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {clientsCount.toLocaleString()}+
                </span>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">Clienti Soddisfatti</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span ref={projectsRef} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {projectsCount.toLocaleString()}+
                </span>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">Progetti Completati</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">15+</span>
              </div>
              <p className="text-white/70 text-xs sm:text-sm">Anni di Esperienza</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
          <button
            onClick={scrollToCalculator}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Scroll to calculator"
          >
            <ArrowDown className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
}
