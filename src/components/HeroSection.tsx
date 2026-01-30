import { ArrowRight, Calculator, FileCheck, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const HeroSection = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { count: projectsCount, ref: projectsRef } = useCountUp(500);
  const { count: incentivesCount, ref: incentivesRef } = useCountUp(25);
  const { count: satisfactionCount, ref: satisfactionRef } = useCountUp(98);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { 
      value: projectsCount, 
      suffix: '+', 
      label: 'Progetti Completati',
      ref: projectsRef 
    },
    { 
      value: incentivesCount, 
      suffix: 'M€', 
      label: 'Incentivi Ottenuti',
      ref: incentivesRef 
    },
    { 
      value: satisfactionCount, 
      suffix: '%', 
      label: 'Clienti Soddisfatti',
      ref: satisfactionRef 
    },
  ];

  const features = [
    {
      icon: Calculator,
      title: 'Calcolo Preciso',
      description: 'Stima accurata degli incentivi basata sul D.M. 7 agosto 2025',
    },
    {
      icon: FileCheck,
      title: 'Pratiche Complete',
      description: 'Gestione completa della documentazione per il GSE',
    },
    {
      icon: TrendingUp,
      title: 'Massimo Risparmio',
      description: 'Ottimizzazione degli incentivi fino al 65% della spesa',
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div
          ref={heroRef}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>D.M. 7 Agosto 2025 - Nuove Regole</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Ottieni gli Incentivi del{' '}
              <span className="text-gradient">Conto Termico 3.0</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-xl">
              Calcola subito il tuo incentivo per pompe di calore, caldaie a biomassa 
              e impianti termici. Fino al <strong className="text-foreground">65% di rimborso</strong> garantito dal GSE.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('calculator')}
                size="lg"
                className="gradient-hero text-primary-foreground shadow-bold hover-lift group"
              >
                Calcola il Tuo Incentivo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => scrollToSection('about')}
                variant="outline"
                size="lg"
                className="border-2 hover-lift"
              >
                Scopri di Più
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    <span ref={stat.ref} className="animate-count-up">
                      {stat.value}
                    </span>
                    {stat.suffix}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-4 lg:pl-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glass p-6 rounded-2xl hover-lift transition-all duration-500`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Trust Badge */}
            <div className="glass p-4 rounded-2xl flex items-center gap-4 mt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-muted border-2 border-background overflow-hidden"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=40&h=40&fit=crop&crop=faces`}
                      alt="Cliente"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=User+${i}&background=random`;
                      }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-accent fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Valutazione <strong className="text-foreground">4.9/5</strong> da 200+ recensioni
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
