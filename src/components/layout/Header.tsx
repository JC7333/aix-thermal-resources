import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ZoomIn, Eye, Compass, Zap, BookOpen, Layers, Map, Baby, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const navigation = [
  { name: 'Parcours guidé', href: '/parcours', icon: Compass, highlight: true },
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

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // En mode Senior, on force le menu hamburger même sur desktop
  const useHamburgerMenu = seniorMode;

  return (
    <header 
      className={`
        sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft
        ${seniorMode ? 'min-h-[72px]' : ''}
      `}
    >
      <nav className="container mx-auto px-4" aria-label="Navigation principale">
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>

        <div className={`
          flex items-center justify-between gap-3
          ${seniorMode ? 'h-[72px] py-3' : 'h-18 lg:h-20'}
        `}>
          {/* Logo - Brand COOLANCE */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex flex-col">
              <span className={`
                font-serif font-bold text-primary tracking-tight
                ${seniorMode ? 'text-2xl' : 'text-2xl lg:text-3xl'}
              `}>
                COOLANCE
              </span>
              <span className={`
                text-muted-foreground -mt-1
                ${seniorMode ? 'text-xs' : 'text-[10px] lg:text-xs'}
              `}>
                Dr Audric Bugnard
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden in Senior Mode */}
          {!useHamburgerMenu && (
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
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Senior Mode Toggle - Always visible */}
            <Button
              variant={seniorMode ? 'default' : 'outline'}
              size={seniorMode ? 'lg' : 'sm'}
              onClick={toggleSeniorMode}
              className={`
                flex items-center gap-2 font-semibold shrink-0
                ${seniorMode 
                  ? 'h-12 px-4 bg-primary text-primary-foreground text-base' 
                  : 'h-10 lg:h-11 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                }
              `}
              aria-label={seniorMode ? 'Désactiver le mode Senior' : 'Activer le mode Senior'}
            >
              {seniorMode ? <Eye className="h-5 w-5" /> : <ZoomIn className="h-4 w-4" />}
              <span className={seniorMode ? 'inline' : 'hidden sm:inline'}>
                {seniorMode ? 'Mode Senior ✓' : 'Mode Senior'}
              </span>
            </Button>

            {/* Menu Button - Always visible in Senior Mode, mobile only otherwise */}
            <Button
              variant="ghost"
              size={seniorMode ? 'lg' : 'icon'}
              className={`
                ${useHamburgerMenu ? 'flex' : 'lg:hidden flex'}
                ${seniorMode ? 'h-12 w-12' : 'h-10 w-10'}
              `}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? (
                <X className={seniorMode ? 'h-7 w-7' : 'h-6 w-6'} />
              ) : (
                <Menu className={seniorMode ? 'h-7 w-7' : 'h-6 w-6'} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile / Senior Menu Drawer */}
        {mobileMenuOpen && (
          <div 
            className={`
              py-4 border-t border-border animate-fade-in
              ${useHamburgerMenu ? 'block' : 'lg:hidden'}
            `}
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href || 
                  (item.href !== '/' && location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 rounded-lg font-medium transition-colors
                      ${seniorMode ? 'py-4 text-xl' : 'py-3 text-lg'}
                      ${isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-muted'
                      }
                      ${item.highlight && !isActive ? 'bg-primary/5 border-l-4 border-primary' : ''}
                    `}
                  >
                    <item.icon className={seniorMode ? 'w-6 h-6' : 'w-5 h-5'} />
                    {item.name}
                    {item.highlight && (
                      <span className={`
                        ml-auto text-xs font-bold text-white bg-primary px-2 py-1 rounded-full
                        ${seniorMode ? 'text-sm px-3' : ''}
                      `}>
                        Recommandé
                      </span>
                    )}
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
