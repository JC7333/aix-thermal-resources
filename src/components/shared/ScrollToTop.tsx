import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - Composant global qui remonte automatiquement en haut de page
 * à chaque changement de route (navigation SPA)
 * Gère aussi les ancres (#section) avec offset pour header sticky
 */
export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const prevPathname = useRef(pathname);
  const prevSearch = useRef(search);

  useEffect(() => {
    // Vérifie si on a changé de page (pathname ou search params)
    const hasNavigated = prevPathname.current !== pathname || prevSearch.current !== search;
    
    // Met à jour les refs
    prevPathname.current = pathname;
    prevSearch.current = search;

    // Hauteur du header sticky + marge de sécurité
    const headerOffset = 120;

    if (hash) {
      // Si on a une ancre (#section), on scroll vers elle avec offset
      // Délai pour laisser le DOM se charger complètement
      const scrollToHash = () => {
        const element = document.querySelector(hash);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };

      // Si navigation inter-page, attendre plus longtemps
      if (hasNavigated) {
        setTimeout(scrollToHash, 150);
      } else {
        // Même page, scroll immédiat
        setTimeout(scrollToHash, 50);
      }
    } else if (hasNavigated) {
      // Pas d'ancre et nouvelle page → remonter en haut
      // Double appel pour garantir le scroll (certains navigateurs ignorent le premier)
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      });
    }
  }, [pathname, search, hash]);

  return null;
};