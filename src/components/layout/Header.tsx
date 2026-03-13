import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Compass,
  BookOpen,
  Layers,
  Download,
  User,
  Heart,
} from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useFavorites } from "@/hooks/useFavorites";

const navigation = [
  { name: "Le Programme", href: "/le-programme", icon: BookOpen },
  { name: "Pathologies", href: "/pathologies", icon: Layers },
  { name: "Mon parcours", href: "/parcours", icon: Compass, highlight: true },
  { name: "Téléchargements", href: "/telechargements", icon: Download },
  { name: "Qui suis-je", href: "/qui-suis-je", icon: User },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { seniorMode } = useAccessibility();
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
        sticky top-0 z-50 bg-card/98 backdrop-blur-md border-b border-border/60
        ${seniorMode ? "shadow-md" : "shadow-soft"}
      `}
    >
      <nav
        className="container mx-auto px-3 sm:px-4"
        aria-label="Navigation principale"
      >
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>

        <div
          className={`
          flex items-center justify-between gap-2 sm:gap-3
          ${seniorMode ? "py-3 min-h-[68px]" : "h-16 lg:h-18"}
        `}
        >
          {/* Menu Button - À GAUCHE */}
          <button
            className={`
              flex items-center justify-center rounded-lg transition-colors
              hover:bg-muted text-foreground
              ${useHamburgerMenu ? "flex" : "lg:hidden flex"}
              ${seniorMode ? "h-10 w-10" : "h-9 w-9"}
            `}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Menu de navigation"
          >
            {mobileMenuOpen ? (
              <X className={seniorMode ? "h-6 w-6" : "h-5 w-5"} />
            ) : (
              <Menu className={seniorMode ? "h-6 w-6" : "h-5 w-5"} />
            )}
          </button>

          {/* Logo - Brand ÉTUVE */}
          <Link to="/" className="flex items-center shrink-0">
            <div className="flex flex-col">
              <span
                className={`
                font-serif font-bold text-primary tracking-tight leading-none
                ${seniorMode ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-2xl lg:text-3xl"}
              `}
              >
                ÉTUVE
              </span>
              <span
                className={`
                text-muted-foreground leading-none
                ${seniorMode ? "text-[9px] sm:text-[10px] mt-0.5" : "text-[10px] lg:text-xs mt-0.5"}
              `}
              >
                Dr Audric Bugnard
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden in Senior Mode */}
          {!useHamburgerMenu && (
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== "/" &&
                    location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Actions - compact layout, never overlap */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Favoris - visible quand il y en a */}
            {favoritesCount > 0 && (
              <Link
                to="/favoris"
                className={`
                  relative flex items-center justify-center rounded-lg transition-colors
                  hover:bg-destructive/10
                  ${seniorMode ? "h-10 w-10" : "h-9 w-9"}
                  ${location.pathname === "/favoris" ? "bg-destructive/10 text-destructive" : "text-muted-foreground hover:text-destructive"}
                `}
                aria-label={`Mes favoris (${favoritesCount})`}
                title={`Mes favoris (${favoritesCount})`}
              >
                <Heart className="w-5 h-5 fill-current" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {favoritesCount > 9 ? "9+" : favoritesCount}
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile / Senior Menu Drawer */}
        {mobileMenuOpen && (
          <div
            className={`
              py-4 border-t border-border animate-fade-in
              ${useHamburgerMenu ? "block" : "lg:hidden"}
            `}
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href !== "/" &&
                    location.pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleNavClick}
                    className={`
                      flex items-center gap-3 px-4 rounded-lg font-medium transition-colors
                      ${seniorMode ? "py-4 text-xl" : "py-3 text-lg"}
                      ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }
                      ${item.highlight && !isActive ? "bg-primary/5 border-l-4 border-primary" : ""}
                    `}
                  >
                    <item.icon className={seniorMode ? "w-6 h-6" : "w-5 h-5"} />
                    {item.name}
                    {item.highlight && (
                      <span
                        className={`
                        ml-auto text-xs font-bold text-white bg-primary px-2 py-1 rounded-full
                        ${seniorMode ? "text-sm px-3" : ""}
                      `}
                      >
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
