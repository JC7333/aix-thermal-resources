// ============================================
// HOOK PDF PRELOAD — COOLANCE
// ============================================
// Précharge les PDFs en arrière-plan pour améliorer
// la réactivité de l'interface utilisateur
// ============================================

import { useEffect, useRef } from 'react';
import { 
  generatePdf1PageBySlug, 
  generatePdf4PagesBySlug,
  hasEvidenceData,
} from '@/services/pdfService';

interface PreloadOptions {
  /** Délai avant de lancer le préchargement (ms) */
  delay?: number;
  /** Précharger uniquement le PDF 1 page */
  only1Page?: boolean;
  /** Précharger uniquement le PDF 4 pages */
  only4Pages?: boolean;
  /** Callback quand le préchargement est terminé */
  onComplete?: (results: PreloadResult) => void;
}

interface PreloadResult {
  slug: string;
  pdf1Page: { success: boolean; fromCache: boolean; duration: number } | null;
  pdf4Pages: { success: boolean; fromCache: boolean; duration: number } | null;
}

/**
 * Hook pour précharger les PDFs en arrière-plan
 * 
 * @param slug - Le slug de la pathologie
 * @param options - Options de préchargement
 */
export const usePdfPreload = (
  slug: string | undefined,
  options: PreloadOptions = {}
) => {
  const { 
    delay = 2000, // 2 secondes par défaut pour ne pas bloquer le rendu initial
    only1Page = false,
    only4Pages = false,
    onComplete,
  } = options;

  const preloadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!slug || !hasEvidenceData(slug)) {
      return;
    }

    // Ne pas précharger deux fois le même slug
    const cacheKey = `${slug}-${only1Page ? '1' : only4Pages ? '4' : 'both'}`;
    if (preloadedRef.current.has(cacheKey)) {
      console.log(`[usePdfPreload] Already preloaded: ${cacheKey}`);
      return;
    }

    const timeoutId = setTimeout(async () => {
      console.log(`[usePdfPreload] Starting preload for: ${slug}`);
      
      const result: PreloadResult = {
        slug,
        pdf1Page: null,
        pdf4Pages: null,
      };

      // Précharger PDF 1 page
      if (!only4Pages) {
        const start1 = performance.now();
        try {
          const res = await generatePdf1PageBySlug(slug);
          const duration = Math.round(performance.now() - start1);
          result.pdf1Page = {
            success: !!res,
            fromCache: res?.fromCache ?? false,
            duration,
          };
          console.log(`[usePdfPreload] 1page ${res?.fromCache ? 'from cache' : 'generated'} in ${duration}ms`);
        } catch (error) {
          console.error('[usePdfPreload] Error preloading 1page:', error);
          result.pdf1Page = { success: false, fromCache: false, duration: 0 };
        }
      }

      // Précharger PDF 4 pages
      if (!only1Page) {
        const start4 = performance.now();
        try {
          const res = await generatePdf4PagesBySlug(slug);
          const duration = Math.round(performance.now() - start4);
          result.pdf4Pages = {
            success: !!res,
            fromCache: res?.fromCache ?? false,
            duration,
          };
          console.log(`[usePdfPreload] 4pages ${res?.fromCache ? 'from cache' : 'generated'} in ${duration}ms`);
        } catch (error) {
          console.error('[usePdfPreload] Error preloading 4pages:', error);
          result.pdf4Pages = { success: false, fromCache: false, duration: 0 };
        }
      }

      // Marquer comme préchargé
      preloadedRef.current.add(cacheKey);
      
      console.log(`[usePdfPreload] Preload complete for: ${slug}`);
      onComplete?.(result);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [slug, delay, only1Page, only4Pages, onComplete]);
};

export default usePdfPreload;
