import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Comment ça marche', href: '/le-programme' },
  { name: 'Pathologies', href: '/pathologies' },
  { name: 'Mon programme', href: '/parcours' },
  { name: 'Blog', href: '/blog' },
  { name: "L'Expertise", href: '/qui-suis-je' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/40'
          : 'bg-transparent'
      }`}
    >
      {/* Skip link accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Aller au contenu principal
      </a>

      <nav className="max-w-6xl mx-auto px-5 sm:px-8" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-1.5">
            <span className="font-serif text-2xl lg:text-3xl font-bold text-primary tracking-tight">
              ÉTUVE
            </span>
            <span className="text-[10px] lg:text-xs text-muted-foreground hidden sm:inline">
              | Dr A. Bugnard
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:text-foreground hover:bg-black/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA desktop */}
          <Link
            to="/pathologies"
            className="hidden lg:inline-flex px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-[#0f5c6b] transition-colors duration-200"
          >
            Commencer
          </Link>

          {/* Mobile burger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-border/30">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted/40'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to="/pathologies"
                onClick={() => setMobileMenuOpen(false)}
                className="mx-4 mt-2 py-3 rounded-xl bg-primary text-white text-center text-base font-semibold"
              >
                Commencer
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
