import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ZoomIn, Eye, FileText, Home, BookOpen, HelpCircle, Building2, Baby, Compass, Map, Layers, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const navigation = [
  { name: 'Accueil', href: '/', icon: Home },
  { name: 'Réponses rapides', href: '/reponses-rapides', icon: Zap },
  { name: 'Parcours guidé', href: '/parcours', icon: Compass },
  { name: 'Ressources', href: '/ressources', icon: BookOpen },
  { name: 'Pathologies', href: '/pathologies', icon: Layers },
  { name: 'Programmes', href: '/programmes', icon: FileText },
  { name: 'Guides', href: '/guides', icon: Map },
  { name: 'Parents', href: '/parents', icon: Baby },
  { name: 'FAQ', href: '/faq', icon: HelpCircle },
  { name: 'Cabinet', href: '/cabinet', icon: Building2 },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { seniorMode, toggleSeniorMode } = useAccessibility();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <nav className="container mx-auto px-4" aria-label="Navigation principale">
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>

        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-serif text-lg lg:text-xl font-bold shadow-sm group-hover:shadow-md transition-shadow">
              AB
            </div>
            <div className="hidden sm:block">
              <p className="font-serif text-lg lg:text-xl font-bold text-foreground">
                Dr Audric Bugnard
              </p>
              <p className="text-xs lg:text-sm text-muted-foreground -mt-0.5">
                Médecin Thermaliste — Aix-les-Bains
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Senior Mode Toggle */}
            <Button
              variant={seniorMode ? 'default' : 'ghost'}
              size="sm"
              onClick={toggleSeniorMode}
              className={`hidden md:flex items-center gap-2 h-10 lg:h-11 ${seniorMode ? 'bg-primary text-primary-foreground' : ''}`}
              aria-label={seniorMode ? 'Désactiver le mode Senior' : 'Activer le mode Senior'}
            >
              {seniorMode ? <Eye className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              <span className="hidden lg:inline">{seniorMode ? 'Mode Senior ✓' : 'Mode Senior'}</span>
            </Button>

            {/* Phone Button - Desktop */}
            <Button
              asChild
              variant="outline"
              className="hidden lg:flex items-center gap-2 h-11"
            >
              <a href="tel:+33479000000">
                <Phone className="h-4 w-4" />
                04 79 00 00 00
              </a>
            </Button>

            {/* RDV Button */}
            <Button
              asChild
              className="hidden sm:flex h-10 lg:h-11 px-4 lg:px-6"
            >
              <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer">
                Prendre RDV
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
                <Button asChild variant="outline" className="w-full h-12 text-lg">
                  <a href="tel:+33479000000" className="flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" />
                    04 79 00 00 00
                  </a>
                </Button>
                <Button asChild className="w-full h-12 text-lg">
                  <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer">
                    Prendre RDV
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
