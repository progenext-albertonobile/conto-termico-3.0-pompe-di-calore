import { Zap, Mail, Phone, MapPin, Linkedin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-foreground text-background">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-hero rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-background leading-tight">
                  Conto Termico
                </span>
                <span className="text-xs text-primary font-semibold">3.0</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Consulenza specializzata per l'accesso agli incentivi del Conto Termico 3.0. 
              Ti accompagniamo in ogni fase del processo.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Link Utili</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Calcolatore Incentivi', id: 'calculator' },
                { label: 'Chi Siamo', id: 'about' },
                { label: 'FAQ', id: 'faq' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-muted-foreground hover:text-background transition-colors text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Servizi</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Consulenza Conto Termico</li>
              <li>Pratiche GSE</li>
              <li>Diagnosi Energetiche</li>
              <li>Progettazione Impianti</li>
              <li>Assistenza Tecnica</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contatti</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Email</p>
                  <a
                    href="mailto:info@contotermico30.it"
                    className="text-background hover:text-primary transition-colors"
                  >
                    info@contotermico30.it
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Telefono</p>
                  <a
                    href="tel:+390123456789"
                    className="text-background hover:text-primary transition-colors"
                  >
                    +39 012 345 6789
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-muted-foreground">Sede</p>
                  <p className="text-background">
                    Via Roma 123, 00100 Roma (RM)
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-muted/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Conto Termico 3.0. Tutti i diritti riservati.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-background transition-colors">
                Termini e Condizioni
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
