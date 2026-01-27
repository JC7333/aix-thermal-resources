import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ZoomIn, Eye, Compass, Zap, BookOpen, Layers, Map, Baby, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useFavorites } from '@/hooks/useFavorites';

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
  const { count: favoritesCount } = useFavorites();
  const location = useLocation();

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // En mode Senior, on force le menu hamburger même sur desktop
  const useHamburgerMenu = seniorMode;

  // Fermer le menu mobile et scroll vers l'ancre
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

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
          flex items-center gap-3
          ${seniorMode ? 'py-3 min-h-[72px]' : 'h-18 lg:h-20'}
        `}>
          {/* Logo - Brand COOLANCE */}
          <Link to="/" className="flex items-center gap-3 group shrink-0 mr-auto">
            <div className="flex flex-col">
              <span className={`
                font-serif font-bold text-primary tracking-tight
                ${seniorMode ? 'text-xl sm:text-2xl' : 'text-2xl lg:text-3xl'}
              `}>
                COOLANCE
              </span>
              <span className={`
                text-muted-foreground -mt-1
                ${seniorMode ? 'text-[10px] sm:text-xs' : 'text-[10px] lg:text-xs'}
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

          {/* Actions - fixed to right side */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Favoris - visible quand il y en a */}
            {favoritesCount > 0 && (
              <Link
                to="/favoris"
                className={`
                  relative flex items-center justify-center rounded-lg transition-colors
                  hover:bg-destructive/10
                  ${seniorMode ? 'h-10 w-10 sm:h-12 sm:w-12' : 'h-9 w-9 sm:h-10 sm:w-10'}
                  ${location.pathname === '/favoris' ? 'bg-destructive/10 text-destructive' : 'text-muted-foreground hover:text-destructive'}
                `}
                aria-label={`Mes favoris (${favoritesCount})`}
                title={`Mes favoris (${favoritesCount})`}
              >
                <Heart className={`${seniorMode ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-5 h-5'} fill-current`} />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {favoritesCount > 9 ? '9+' : favoritesCount}
                </span>
              </Link>
            )}

            {/* Senior Mode Toggle - Always visible */}
            <Button
              variant={seniorMode ? 'default' : 'outline'}
              size={seniorMode ? 'default' : 'sm'}
              onClick={toggleSeniorMode}
              className={`
                flex items-center gap-1 sm:gap-2 font-semibold shrink-0 relative
                ${seniorMode 
                  ? 'h-10 sm:h-12 px-2 sm:px-4 bg-primary text-primary-foreground text-sm sm:text-base ring-2 ring-primary/30 ring-offset-2 ring-offset-background' 
                  : 'h-9 sm:h-10 lg:h-11 px-2 sm:px-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm'
                }
              `}
              aria-label={seniorMode ? 'Désactiver le mode Senior' : 'Activer le mode Senior'}
            >
              {seniorMode ? <Eye className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" /> : <ZoomIn className="h-4 w-4 shrink-0" />}
              <span className={seniorMode ? 'hidden xs:inline' : 'hidden sm:inline'}>
                {seniorMode ? 'Senior ✓' : 'Senior'}
              </span>
              {/* Indicateur visuel pulsant quand actif */}
              {seniorMode && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-foreground"></span>
                </span>
              )}
            </Button>

            {/* Menu Button - Always visible in Senior Mode, mobile only otherwise */}
            <Button
              variant="ghost"
              size={seniorMode ? 'default' : 'icon'}
              className={`
                ${useHamburgerMenu ? 'flex' : 'lg:hidden flex'}
                ${seniorMode ? 'h-10 w-10 sm:h-12 sm:w-12' : 'h-9 w-9 sm:h-10 sm:w-10'}
              `}
              data-icon-button="true"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? (
                <X className={seniorMode ? 'h-5 w-5 sm:h-7 sm:w-7' : 'h-5 w-5 sm:h-6 sm:w-6'} />
              ) : (
                <Menu className={seniorMode ? 'h-5 w-5 sm:h-7 sm:w-7' : 'h-5 w-5 sm:h-6 sm:w-6'} />
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
                    onClick={handleNavClick}
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
