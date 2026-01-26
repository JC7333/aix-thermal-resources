import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ZoomIn, Eye, Compass, Zap, BookOpen, Layers, Map, Baby, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const navigation = [
  { name: 'Parcours guidé', href: '/parcours', icon: Compass },
  { name: 'Réponses rapides', href: '/reponses-rapides', icon: Zap },
  { name: 'Ressources', href: '/ressources', icon: BookOpen },
  { name: 'Pathologies', href: '/pathologies', icon: Layers },
  { name: 'Guides', href: '/guides', icon: Map },
  { name: 'Parents', href: '/parents', icon: Baby },
  { name: 'Qui suis-je', href: '/qui-suis-je', icon: User },
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
          {/* Logo - Brand COOLANCE */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-primary tracking-tight">
                COOLANCE
              </span>
              <span className="text-[10px] lg:text-xs text-muted-foreground -mt-1">
                par le Dr Audric Bugnard
              </span>
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
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
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
            {/* Senior Mode Toggle - Prominent */}
            <Button
              variant={seniorMode ? 'default' : 'outline'}
              size="sm"
              onClick={toggleSeniorMode}
              className={`flex items-center gap-2 h-10 lg:h-11 font-semibold ${seniorMode ? 'bg-primary text-primary-foreground' : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}
              aria-label={seniorMode ? 'Désactiver le mode Senior' : 'Activer le mode Senior'}
            >
              {seniorMode ? <Eye className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              <span className="hidden sm:inline">{seniorMode ? 'Mode Senior ✓' : 'Mode Senior'}</span>
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
