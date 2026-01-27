import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/contexts/AccessibilityContext';

/**
 * FloatingBackToTop - Bouton flottant "Haut de page"
 * Visible après 500px de scroll, adapté au mode Senior
 */
export const FloatingBackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { seniorMode } = useAccessibility();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

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
    <Button
      onClick={scrollToTop}
      className={`
        fixed z-50 shadow-elevated hover:shadow-lg transition-all duration-300
        ${seniorMode 
          ? 'bottom-6 right-6 h-16 w-16 rounded-2xl text-lg' 
          : 'bottom-4 right-4 h-12 w-12 rounded-xl'
        }
        bg-primary text-primary-foreground hover:bg-primary/90
        animate-fade-in
      `}
      aria-label="Remonter en haut de la page"
      title="Haut de page"
    >
      <ArrowUp className={seniorMode ? 'h-7 w-7' : 'h-5 w-5'} />
      <span className="sr-only">Haut de page</span>
    </Button>
  );
};
