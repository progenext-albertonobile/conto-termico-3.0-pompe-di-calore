import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  const faqs = [
    {
      question: "Cos'è il Conto Termico 3.0?",
      answer: "Il Conto Termico 3.0, regolato dal D.M. 7 agosto 2025, è un meccanismo di incentivazione per interventi di efficientamento energetico e produzione di energia termica da fonti rinnovabili. Prevede rimborsi fino al 65% della spesa sostenuta per l'installazione di pompe di calore, caldaie a biomassa, impianti solari termici e altri interventi.",
    },
    {
      question: 'Chi può accedere agli incentivi?',
      answer: "Possono accedere al Conto Termico 3.0: privati cittadini, condomini, imprese, Pubbliche Amministrazioni, cooperative di abitanti, enti del terzo settore. Gli interventi devono essere realizzati su edifici esistenti o in costruzione, nel rispetto dei requisiti tecnici previsti dal decreto.",
    },
    {
      question: 'Quali interventi sono incentivabili?',
      answer: "Gli interventi incentivabili includono: sostituzione di impianti di climatizzazione con pompe di calore, installazione di caldaie a biomassa, impianti solari termici, sistemi ibridi, scaldacqua a pompa di calore, building automation. Ogni tipologia ha coefficienti di calcolo specifici.",
    },
    {
      question: "Come si calcola l'incentivo?",
      answer: "L'incentivo si calcola con la formula: Ia,tot = Ei × Ci, dove Ei è l'energia incentivata (dipendente dalla potenza dell'impianto, dalla zona climatica e dallo SCOP) e Ci è il coefficiente di valorizzazione specifico per ogni tecnologia. Il nostro calcolatore applica automaticamente tutte le formule del decreto.",
    },
    {
      question: 'Quanto tempo ci vuole per ottenere il rimborso?',
      answer: "I tempi di erogazione dipendono dall'importo dell'incentivo: per importi fino a 5.000€ l'erogazione è in un'unica rata entro 90 giorni dall'approvazione; per importi superiori viene suddiviso in rate annuali (da 2 a 5 anni). Il GSE ha 90 giorni per valutare la pratica dalla data di presentazione.",
    },
    {
      question: 'Posso cumulare il Conto Termico con altre agevolazioni?',
      answer: "Il Conto Termico 3.0 è cumulabile con altri incentivi (es. bonus fiscali) nel limite del 100% della spesa sostenuta. Non è cumulabile con altri incentivi statali per lo stesso intervento sullo stesso impianto. È importante verificare la compatibilità caso per caso.",
    },
    {
      question: 'Quali documenti sono necessari?',
      answer: "I documenti principali includono: scheda tecnica dell'impianto installato, fatture e bonifici, asseverazione del tecnico abilitato, documentazione fotografica, APE pre e post intervento (se richiesto), contratto con l'installatore. Il nostro servizio include la preparazione completa della documentazione.",
    },
    {
      question: 'Come funziona il vostro servizio di consulenza?',
      answer: "Il nostro servizio prevede: 1) Consulenza gratuita iniziale per valutare l'intervento, 2) Calcolo preciso dell'incentivo spettante, 3) Preparazione completa della documentazione, 4) Invio della pratica al GSE, 5) Monitoraggio fino all'erogazione. Lavoriamo a success fee: paghi solo a incentivo ottenuto.",
    },
  ];

  return (
    <section id="faq" className="section-padding">
      <div className="container-custom">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Domande <span className="text-gradient">Frequenti</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Trova le risposte alle domande più comuni sul Conto Termico 3.0 
              e sul nostro servizio di consulenza.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass rounded-2xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HelpCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-semibold text-base pr-4">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-12 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Non hai trovato la risposta che cercavi?
            </p>
            <a
              href="#footer"
              className="text-primary font-semibold hover:underline"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contattaci direttamente →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
