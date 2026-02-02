import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqItems = [
  {
    question: "Cos'è il Conto Termico 3.0?",
    answer: "Il Conto Termico 3.0 è un meccanismo di incentivazione statale che promuove l'efficienza energetica e la produzione di energia termica da fonti rinnovabili. Permette di ottenere un contributo diretto (non una detrazione fiscale) per l'installazione di pompe di calore, caldaie a biomassa, solare termico e altri interventi di efficientamento energetico.",
  },
  {
    question: "Quali impianti sono ammessi agli incentivi?",
    answer: "Sono ammessi: pompe di calore (aria/aria, aria/acqua, acqua/acqua, geotermiche), caldaie a biomassa, solare termico, scaldacqua a pompa di calore, sistemi ibridi e interventi di isolamento termico dell'edificio. L'impianto deve rispettare requisiti minimi di efficienza stabiliti dal GSE.",
  },
  {
    question: "Come viene calcolato l'incentivo?",
    answer: "L'incentivo viene calcolato in base alla potenza termica dell'impianto (kW), alla zona climatica dell'edificio (da A a F), al tipo di tecnologia installata e ad eventuali bonus (come la sostituzione di un vecchio impianto). Il contributo può coprire fino al 65% della spesa sostenuta.",
  },
  {
    question: "Quali documenti servono per la domanda?",
    answer: "Servono: fatture e bonifici dell'intervento, asseverazione di un tecnico abilitato, schede tecniche dell'impianto, certificazione del produttore, eventuale APE (Attestato di Prestazione Energetica) e documentazione fotografica dell'installazione. Noi ti supportiamo nella raccolta di tutta la documentazione.",
  },
  {
    question: "In quanto tempo ricevo l'incentivo?",
    answer: "Dopo la presentazione della domanda al GSE (Gestore dei Servizi Energetici), i tempi medi di erogazione sono di 60-90 giorni per gli interventi di piccole dimensioni. Per incentivi superiori a €5.000, l'importo può essere erogato in rate annuali (2-5 anni a seconda dell'importo).",
  },
  {
    question: "Posso cumulare il Conto Termico con altre agevolazioni?",
    answer: "Il Conto Termico NON è cumulabile con le detrazioni fiscali (Ecobonus, Bonus Casa) sullo stesso intervento. È però cumulabile con altri incentivi pubblici di natura non fiscale, a condizione che la somma non superi il 100% della spesa sostenuta.",
  },
  {
    question: "Chi può accedere agli incentivi?",
    answer: "Possono accedere: privati cittadini, condomini, imprese, enti pubblici, cooperative di abitanti e società di servizi energetici (ESCo). L'immobile deve essere esistente e dotato di impianto di climatizzazione.",
  },
  {
    question: "Perché affidarsi a un consulente energetico?",
    answer: "Un consulente esperto garantisce: corretta valutazione dell'intervento, massimizzazione dell'incentivo ottenibile, gestione completa della pratica GSE, supporto nella scelta dell'impianto più adatto e assistenza in caso di controlli. La nostra esperienza di 15+ anni ci permette di avere un tasso di successo del 98% sulle pratiche presentate.",
  },
];

export function FAQSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="faq" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 animate-on-scroll ${headerVisible ? 'visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Domande Frequenti
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tutto sul <span className="gradient-text">Conto Termico</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Le risposte alle domande più comuni sui nostri servizi e sugli incentivi per le pompe di calore.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          ref={contentRef}
          className={`max-w-3xl mx-auto animate-on-scroll ${contentVisible ? 'visible' : ''}`}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-0 rounded-xl bg-card shadow-md hover-lift overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-muted/50 transition-colors">
                  <span className="font-semibold text-foreground pr-4">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
