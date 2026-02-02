import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#calculator", label: "Calcola Incentivo" },
  { href: "#about", label: "Chi Siamo" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contatti" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const logoSrc = isScrolled
    ? "/brand/progenext-mark.png"
    : "/brand/Progenext_logo_simbolo_white.png";

  const textColor = isScrolled ? "text-progenext-dark" : "text-white";
  const linkClass = isScrolled
    ? "text-progenext-dark/80 hover:text-progenext-dark"
    : "text-white/85 hover:text-white";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo (NO box) */}
          <a href="#" className="flex items-center gap-2">
            <img
              src={logoSrc}
              alt="Progenext"
              className="h-10 w-10 object-contain"
            />
            <span className={`font-bold text-xl hidden sm:block ${textColor}`}>
              Progenext
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`${linkClass} font-medium transition-colors`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavClick("#calculator")}
              className="bg-progenext-teal text-white hover:opacity-90 transition-opacity"
            >
              Calcola Ora
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-progenext-dark" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-progenext-dark/80 hover:text-progenext-dark font-medium py-3 px-4 text-left rounded-lg hover:bg-black/5 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => handleNavClick("#calculator")}
                className="bg-progenext-teal text-white mt-2 hover:opacity-90"
              >
                Calcola Ora
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
