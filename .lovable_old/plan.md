
# Piano di Integrazione - Conto Termico 3.0

## Panoramica del Progetto
Il progetto "Conto Termico 3.0" e un sito web completo per consulenza energetica che include:
- Landing page con sezioni Hero, About, FAQ, Footer
- Calcolatore incentivi Conto Termico 3.0 (D.M. 7 agosto 2025)
- Integrazione Supabase per raccolta lead
- Bottone WhatsApp flottante
- Modal per download guida PDF
- Animazioni scroll-triggered

## Struttura File da Creare

### 1. Componenti Principali (src/components/)
| File | Descrizione |
|------|-------------|
| Header.tsx | Navbar responsive con menu mobile, scroll effect glass |
| HeroSection.tsx | Sezione hero con statistiche animate, CTAs |
| AboutSection.tsx | Team, valori, statistiche aziendali |
| FAQSection.tsx | Accordion FAQ sul Conto Termico |
| Footer.tsx | Footer con contatti, social, link utili |
| LeadModal.tsx | Modal per raccolta email e download guida |
| WhatsAppButton.tsx | Bottone flottante WhatsApp |

### 2. Componenti Calculator (src/components/Calculator/)
| File | Descrizione |
|------|-------------|
| CalculatorSection.tsx | UI del calcolatore con form e risultati |
| calculatorData.ts | Dati: tipi pompe calore, zone climatiche, province, formule calcolo |

### 3. Hooks Custom (src/hooks/)
| File | Descrizione |
|------|-------------|
| useScrollAnimation.ts | Hook per animazioni scroll-triggered + useCountUp |

### 4. Integrazione Supabase (src/integrations/supabase/)
| File | Descrizione |
|------|-------------|
| client.ts | Client Supabase configurato |
| types.ts | Tipi TypeScript per tabella "leads" |

### 5. Pagine (src/pages/)
| File | Descrizione |
|------|-------------|
| Index.tsx | Pagina principale che compone tutte le sezioni |

### 6. Stili e Configurazione
| File | Descrizione |
|------|-------------|
| src/index.css | Design system completo con variabili CSS, gradienti, animazioni |
| tailwind.config.ts | Configurazione Tailwind estesa con animazioni custom |

## Ordine di Implementazione

### Fase 1: Design System
1. Aggiornare `src/index.css` con il design system completo (colori bold, gradienti, glass effects, animazioni)
2. Aggiornare `tailwind.config.ts` con colori success, animazioni custom, font Inter

### Fase 2: Hooks e Utilities
3. Creare `src/hooks/useScrollAnimation.ts` (animazioni scroll + contatori)

### Fase 3: Integrazione Supabase
4. Creare `src/integrations/supabase/client.ts`
5. Creare `src/integrations/supabase/types.ts`
6. Nota: sara necessario connettere Supabase e creare la tabella "leads"

### Fase 4: Componenti Base
7. Creare `src/components/Header.tsx`
8. Creare `src/components/Footer.tsx`
9. Creare `src/components/WhatsAppButton.tsx`

### Fase 5: Sezioni Landing
10. Creare `src/components/HeroSection.tsx`
11. Creare `src/components/AboutSection.tsx`
12. Creare `src/components/FAQSection.tsx`
13. Creare `src/components/LeadModal.tsx`

### Fase 6: Calcolatore
14. Creare `src/components/Calculator/calculatorData.ts` (dati e logica)
15. Creare `src/components/Calculator/CalculatorSection.tsx` (UI)

### Fase 7: Pagina Principale
16. Aggiornare `src/pages/Index.tsx` per assemblare tutti i componenti

## Dettagli Tecnici

### Design System (index.css)
- Palette: Electric Blue (#0078D4) + Teal (#00A79D) + Orange accent (#F59E0B)
- Variabili CSS HSL per light/dark mode
- Classi utility: `gradient-hero`, `gradient-accent`, `gradient-text`, `glass`, `shadow-bold`, `hover-lift`
- Animazioni: `animate-on-scroll`, `pulse-glow`, `float`, `animate-count-up`

### Calcolatore Incentivi
Formula basata su D.M. 7 agosto 2025:
- Qu = Prated x Quf (calore totale)
- Ei = Qu x (1 - 1/SCOP) x kp (energia incentivata)
- Ia,tot = Ei x Ci (incentivo annuo)
- I,tot = Ia,tot x Annualita (incentivo totale)

Include:
- 10 tipi di pompe di calore con coefficienti Ci
- 6 zone climatiche (A-F) con Quf
- 107 province italiane mappate a zone
- Calcolo automatico kp (premialita)

### Integrazione Supabase
- Tabella `leads` con campi: id, email, source, created_at
- Usata nel LeadModal per salvare email utenti

## Note Importanti
1. **Supabase**: Dopo l'implementazione, sara necessario attivare Supabase e creare la tabella "leads"
2. **WhatsApp**: Il numero di telefono nel WhatsAppButton e un placeholder da aggiornare
3. **Immagini Team**: Usano immagini Unsplash (placeholder)
4. **Font Inter**: Gia disponibile via system fonts

## File Totali da Creare/Modificare
- **Nuovi file**: 12
- **File da modificare**: 3 (index.css, tailwind.config.ts, Index.tsx)
