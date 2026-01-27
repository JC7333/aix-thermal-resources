import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Composant global qui remonte automatiquement en haut de page
 * à chaque changement de route (navigation SPA)
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si on a une ancre (#section), on scroll vers elle avec offset
    if (hash) {
      // Petit délai pour laisser le DOM se charger
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const headerOffset = 100; // Hauteur du header sticky + marge
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      // Sinon, on remonte en haut de page
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname, hash]);

  return null;
};
