import { Users, Target, Award, CheckCircle } from 'lucide-react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const AboutSection = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const { count: yearsCount, ref: yearsRef } = useCountUp(15);
  const { count: expertsCount, ref: expertsRef } = useCountUp(20);

  const values = [
    {
      icon: Target,
      title: 'Precisione',
      description: 'Calcoli accurati basati sulla normativa vigente e aggiornamenti continui.',
    },
    {
      icon: Users,
      title: 'Supporto Dedicato',
      description: 'Un team di esperti sempre disponibile per guidarti nel processo.',
    },
    {
      icon: Award,
      title: 'Esperienza',
      description: 'Oltre 15 anni nel settore degli incentivi energetici.',
    },
  ];

  const team = [
    {
      name: 'Marco Rossi',
      role: 'Energy Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=faces',
    },
    {
      name: 'Laura Bianchi',
      role: 'Consulente Tecnico',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces',
    },
    {
      name: 'Giuseppe Verdi',
      role: 'Responsabile Pratiche',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces',
    },
  ];

  const benefits = [
    'Consulenza gratuita iniziale',
    'Nessun anticipo richiesto',
    'Pagamento a risultato ottenuto',
    'Assistenza completa GSE',
    'Aggiornamenti normativi continui',
    'Report dettagliati di calcolo',
  ];

  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Chi Siamo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Il Tuo Partner per gli{' '}
              <span className="text-gradient">Incentivi Energetici</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Da oltre 15 anni aiutiamo privati e aziende ad accedere agli incentivi 
              del Conto Termico con competenza e trasparenza.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="glass p-6 rounded-2xl text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <span ref={yearsRef}>{yearsCount}</span>+
              </div>
              <p className="text-sm text-muted-foreground mt-2">Anni di Esperienza</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <span ref={expertsRef}>{expertsCount}</span>+
              </div>
              <p className="text-sm text-muted-foreground mt-2">Esperti del Settore</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
              <p className="text-sm text-muted-foreground mt-2">Pratiche Approvate</p>
            </div>
            <div className="glass p-6 rounded-2xl text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-primary">24h</div>
              <p className="text-sm text-muted-foreground mt-2">Tempo di Risposta</p>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass p-8 rounded-2xl hover-lift text-center"
              >
                <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Team & Benefits Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Team */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Il Nostro Team</h3>
              <div className="grid grid-cols-3 gap-4">
                {team.map((member, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-3 overflow-hidden rounded-2xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0078D4&color=fff&size=300`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h4 className="font-semibold text-sm">{member.name}</h4>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Perché Sceglierci</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
