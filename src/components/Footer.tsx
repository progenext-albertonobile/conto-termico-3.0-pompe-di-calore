import { MapPin, Phone, Mail, ExternalLink, MessageCircle } from "lucide-react";

const footerLinks = [
  { label: "Calcola Incentivo", href: "#calculator" },
  { label: "Chi Siamo", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contatti", href: "#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-progenext-dark text-white footer-spacing">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 footer-grid-spacing">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {/* NO box */}
              <img
                src="/brand/Progenext_logo_simbolo_white_color.png"
                alt="Progenext"
                className="h-10 w-10 object-contain"
              />
              <span className="font-bold text-xl">Progenext</span>
            </div>

            <p className="text-white/90 max-w-md mb-6">
              Consulenza energetica specializzata per massimizzare gli incentivi
              Conto Termico 3.0. Dalla progettazione all&apos;ottenimento del
              contributo, ti accompagniamo in ogni fase.
            </p>

            {/* Social (LinkedIn vero) */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/progenext-it/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Link Utili</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-white/90 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://www.gse.it/servizi-per-te/efficienza-energetica/conto-termico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Sito GSE <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contatti</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/90">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-white" />
                <span>Via S. Quasimodo 36<br />Castel Maggiore (BO)</span>
              </li>

              <li>
                <a
                  href="tel:+390514984199"
                  className="group flex items-center gap-3 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-progenext-teal"
                >
                  <Phone className="w-5 h-5 shrink-0 text-white" />
                  <span className="whitespace-nowrap text-white/90 group-hover:text-white">
                    +39 051 498 4199
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="https://wa.me/393518134091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-progenext-teal"
                >
                  <MessageCircle className="w-5 h-5 shrink-0 text-white" />
                  <span className="whitespace-nowrap text-white/90 group-hover:text-white">
                    WhatsApp: +39 351 813 4091
                  </span>
                </a>
              </li>

              <li>
                <a
                  href="mailto:contotermico@progenext.it"
                  className="group flex items-center gap-3 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-progenext-teal"
                >
                  <Mail className="w-5 h-5 shrink-0 text-white" />
                  <span className="text-white/90 group-hover:text-white">
                    contotermico@progenext.it
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/25 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/85">
          <p>© {currentYear} Progenext SRL. Tutti i diritti riservati.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/cookie" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
