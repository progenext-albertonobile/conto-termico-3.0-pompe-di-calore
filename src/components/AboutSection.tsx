import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Award, Lightbulb } from 'lucide-react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const teamMembers = [
  {
    name: 'Marco Rossi',
    role: 'Fondatore & CEO',
    description: 'Ingegnere energetico con 20 anni di esperienza nel settore delle rinnovabili.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Laura Bianchi',
    role: 'Responsabile Tecnico',
    description: 'Esperta in progettazione impianti e certificazione energetica.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Giuseppe Verdi',
    role: 'Consulente Senior',
    description: 'Specializzato in pratiche GSE e ottimizzazione incentivi.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Anna Ferrari',
    role: 'Customer Success',
    description: 'Supporto clienti e gestione progetti dall\'inizio alla fine.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
];

const values = [
  {
    icon: Target,
    title: 'Missione',
    description: 'Rendere accessibili a tutti gli incentivi per l\'efficienza energetica, semplificando la burocrazia e massimizzando i benefici.',
  },
  {
    icon: Lightbulb,
    title: 'Innovazione',
    description: 'Utilizziamo le tecnologie più avanzate per analizzare, progettare e gestire ogni progetto in modo efficiente.',
  },
  {
    icon: Award,
    title: 'Eccellenza',
    description: 'Il 98% delle nostre pratiche viene approvato al primo invio. La qualità del nostro lavoro parla per noi.',
  },
];

export function AboutSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();

  const { count: yearsCount } = useCountUp(15, 2000);
  const { count: successRate } = useCountUp(98, 2000);
  const { count: savingsCount } = useCountUp(25, 2500);

  return (
    <section id="about" className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll ${headerVisible ? 'visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Chi Siamo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Esperti in <span className="gradient-text">Energia Sostenibile</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Da oltre 15 anni aiutiamo famiglie e aziende a ridurre i costi energetici e l'impatto ambientale, 
            sfruttando al massimo gli incentivi statali disponibili.
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className={`grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mb-16 animate-on-scroll-scale ${statsVisible ? 'visible' : ''}`}
        >
          <Card className="text-center p-6 shadow-bold border-0 hover-lift">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">{yearsCount}+</p>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Anni di Esperienza</p>
          </Card>
          <Card className="text-center p-6 shadow-bold border-0 hover-lift">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary">{successRate}%</p>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Tasso di Successo</p>
          </Card>
          <Card className="text-center p-6 shadow-bold border-0 hover-lift">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent">{savingsCount}M€</p>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Incentivi Ottenuti</p>
          </Card>
        </div>

        {/* Values */}
        <div
          ref={valuesRef}
          className={`grid md:grid-cols-3 gap-6 mb-20 animate-on-scroll ${valuesVisible ? 'visible' : ''}`}
        >
          {values.map((value, index) => (
            <Card key={index} className="p-6 shadow-bold border-0 hover-lift">
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-4">
                <value.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>

        {/* Team */}
        <div
          ref={teamRef}
          className={`animate-on-scroll ${teamVisible ? 'visible' : ''}`}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-10">
            Il Nostro Team
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card 
                key={index} 
                className="overflow-hidden shadow-bold border-0 hover-lift group"
                style={{ '--stagger-index': index } as React.CSSProperties}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-5">
                  <h4 className="font-bold text-foreground">{member.name}</h4>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
