import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

/**
 * FloatingBackToTop - Bouton flottant "Haut de page"
 * Visible après 400px de scroll, style discret + adapté Senior
 */
export const FloatingBackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { seniorMode } = useAccessibility();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility(); // Check initial state

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed z-40 transition-all duration-300 ease-out
        flex items-center justify-center
        bg-foreground/80 hover:bg-foreground text-background
        shadow-lg hover:shadow-xl backdrop-blur-sm
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        ${seniorMode 
          ? 'bottom-6 right-6 h-14 w-14 rounded-2xl' 
          : 'bottom-5 right-5 h-11 w-11 rounded-xl'
        }
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="Remonter en haut de la page"
      title="Haut de page"
    >
      <ArrowUp className={seniorMode ? 'h-6 w-6' : 'h-5 w-5'} strokeWidth={2.5} />
    </button>
  );
};
