import { useCallback } from 'react';

/**
 * Hook pour gérer le scroll vers les ancres avec offset du header sticky
 */
export const useAnchorScroll = (headerOffset: number = 100) => {
  const scrollToAnchor = useCallback((anchorId: string) => {
    const element = document.getElementById(anchorId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [headerOffset]);

  const handleAnchorClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault();
    scrollToAnchor(anchorId);
    
    // Met à jour l'URL sans recharger
    window.history.pushState(null, '', `#${anchorId}`);
  }, [scrollToAnchor]);

  return { scrollToAnchor, handleAnchorClick };
};
