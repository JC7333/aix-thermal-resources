// ============================================
// SERVICE PDF — COOLANCE
// ============================================
// Génération et téléchargement des PDFs premium
// Utilise @react-pdf/renderer pour un rendu de qualité
// Génère les PDFs à partir des données evidence-pack.json
// Inclut un cache en mémoire pour éviter les régénérations
// ============================================

import { getEvidenceBySlug, type EvidenceData } from '@/data/evidence';
import { logEvent } from './analytics';

// ============================================
// ERREURS (INSTRUMENTATION)
// ============================================

export type PdfVariant = '1page' | '4pages';

export type PdfGenSerializableError = {
  name?: string;
  message: string;
  stack?: string;
};

const serializeError = (error: unknown): PdfGenSerializableError => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message || String(error),
      stack: error.stack,
    };
  }

  return {
    message: typeof error === 'string' ? error : JSON.stringify(error),
  };
};

export class PdfGenerationError extends Error {
  slug: string;
  variant: PdfVariant;
  original: PdfGenSerializableError;

  constructor(params: { slug: string; variant: PdfVariant; error: PdfGenSerializableError }) {
    super(`PDF generation failed (${params.slug}, ${params.variant}): ${params.error.message}`);
    this.name = 'PdfGenerationError';
    this.slug = params.slug;
    this.variant = params.variant;
    this.original = params.error;
  }
}

// ============================================
// CACHE EN MÉMOIRE
// ============================================

interface CacheEntry {
  blob: Blob;
  timestamp: number;
}

// Cache avec durée de vie de 30 minutes
const PDF_CACHE_TTL = 30 * 60 * 1000; // 30 minutes en ms
const pdfCache = new Map<string, CacheEntry>();

/**
 * Génère une clé de cache unique
 */
const getCacheKey = (slug: string, type: '1page' | '4pages'): string => {
  return `${slug}-${type}`;
};

/**
 * Récupère un PDF du cache s'il existe et n'est pas expiré
 */
const getFromCache = (slug: string, type: '1page' | '4pages'): Blob | null => {
  const key = getCacheKey(slug, type);
  const entry = pdfCache.get(key);
  
  if (entry) {
    const isExpired = Date.now() - entry.timestamp > PDF_CACHE_TTL;
    if (!isExpired) {
      console.log(`[pdfService] Cache hit: ${key}`);
      return entry.blob;
    } else {
      // Nettoyer l'entrée expirée
      pdfCache.delete(key);
      console.log(`[pdfService] Cache expired: ${key}`);
    }
  }
  
  return null;
};

/**
 * Ajoute un PDF au cache
 */
const addToCache = (slug: string, type: '1page' | '4pages', blob: Blob): void => {
  const key = getCacheKey(slug, type);
  pdfCache.set(key, { blob, timestamp: Date.now() });
  console.log(`[pdfService] Cache set: ${key}`);
};

/**
 * Vide le cache complet (utile pour forcer une régénération globale)
 */
export const clearPdfCache = (): void => {
  pdfCache.clear();
  console.log('[pdfService] Cache cleared');
};

/**
 * Supprime une entrée spécifique du cache
 */
export const clearPdfCacheEntry = (slug: string, type: '1page' | '4pages'): void => {
  const key = getCacheKey(slug, type);
  pdfCache.delete(key);
  console.log(`[pdfService] Cache entry deleted: ${key}`);
};

/**
 * Retourne les statistiques du cache
 */
export const getCacheStats = (): { size: number; entries: string[] } => {
  return {
    size: pdfCache.size,
    entries: Array.from(pdfCache.keys()),
  };
};

/**
 * Vérifie si un PDF est en cache (non expiré)
 */
export const isPdfInCache = (slug: string, type: '1page' | '4pages'): boolean => {
  const key = getCacheKey(slug, type);
  const entry = pdfCache.get(key);
  
  if (entry) {
    const isExpired = Date.now() - entry.timestamp > PDF_CACHE_TTL;
    return !isExpired;
  }
  
  return false;
};

// ============================================
// TYPE RÉSULTAT AVEC STATUT CACHE
// ============================================

export interface PdfGenerationResult {
  blob: Blob;
  fromCache: boolean;
}

// ============================================
// GÉNÉRATION PDF À PARTIR DE EVIDENCE DATA
// ============================================

/**
 * Génère un PDF 1 page pour une pathologie (evidence-based)
 */
export const generatePdf1Page = async (evidence: EvidenceData): Promise<Blob> => {
  // Import dynamique : évite tout exécution/chargement inattendu hors navigateur
  const [{ pdf }, { PdfEvidence1Page }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('@/components/pdf/PdfEvidence1Page'),
  ]);

  const doc = <PdfEvidence1Page evidence={evidence} />;
  const blob = await pdf(doc).toBlob();

  if (!blob || blob.size === 0) {
    throw new Error('PDF blob vide (1 page)');
  }

  return blob;
};

/**
 * Génère un PDF 4 pages pour une pathologie (evidence-based)
 */
export const generatePdf4Pages = async (evidence: EvidenceData): Promise<Blob> => {
  const [{ pdf }, { PdfEvidence4Pages }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('@/components/pdf/PdfEvidence4Pages'),
  ]);

  const doc = <PdfEvidence4Pages evidence={evidence} />;
  const blob = await pdf(doc).toBlob();

  if (!blob || blob.size === 0) {
    throw new Error('PDF blob vide (4 pages)');
  }

  return blob;
};

/**
 * Génère un PDF 1 page à partir d'un slug (avec cache)
 * Retourne le blob ET le statut cache
 */
export const generatePdf1PageBySlug = async (slug: string): Promise<PdfGenerationResult | null> => {
  // Vérifier le cache d'abord
  const cached = getFromCache(slug, '1page');
  if (cached) {
    return { blob: cached, fromCache: true };
  }

  const evidence = getEvidenceBySlug(slug);
  if (!evidence) {
    console.error(`[pdfService] Slug introuvable: ${slug}`);
    return null;
  }

  let blob: Blob;
  try {
    blob = await generatePdf1Page(evidence);
  } catch (error) {
    const serialized = serializeError(error);
    console.error('[PDF_GEN_ERROR]', { slug, variant: '1page', error: serialized });
    throw new PdfGenerationError({ slug, variant: '1page', error: serialized });
  }
  
  // Mettre en cache
  addToCache(slug, '1page', blob);
  
  return { blob, fromCache: false };
};

/**
 * Génère un PDF 4 pages à partir d'un slug (avec cache)
 * Retourne le blob ET le statut cache
 */
export const generatePdf4PagesBySlug = async (slug: string): Promise<PdfGenerationResult | null> => {
  // Vérifier le cache d'abord
  const cached = getFromCache(slug, '4pages');
  if (cached) {
    return { blob: cached, fromCache: true };
  }

  const evidence = getEvidenceBySlug(slug);
  if (!evidence) {
    console.error(`[pdfService] Slug introuvable: ${slug}`);
    return null;
  }

  let blob: Blob;
  try {
    blob = await generatePdf4Pages(evidence);
  } catch (error) {
    const serialized = serializeError(error);
    console.error('[PDF_GEN_ERROR]', { slug, variant: '4pages', error: serialized });
    throw new PdfGenerationError({ slug, variant: '4pages', error: serialized });
  }
  
  // Mettre en cache
  addToCache(slug, '4pages', blob);
  
  return { blob, fromCache: false };
};

// ============================================
// TÉLÉCHARGEMENT
// ============================================

/**
 * Télécharge un PDF avec nom de fichier formaté
 */
export const downloadPdf = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Génère le nom de fichier standardisé
 * Format: coolance-[slug]-[type].pdf
 */
export const getPdfFilename = (slug: string, type: '1page' | '4pages'): string => {
  return `coolance-${slug}-${type}.pdf`;
};

// ============================================
// FONCTIONS COMBINÉES (génération + téléchargement)
// ============================================

/**
 * Génère et télécharge le PDF 1 page pour un slug donné
 */
export const downloadPdf1PageBySlug = async (slug: string): Promise<void> => {
  try {
    const result = await generatePdf1PageBySlug(slug);
    if (!result) {
      throw new Error(`Impossible de générer le PDF pour ${slug}`);
    }
    const filename = getPdfFilename(slug, '1page');
    downloadPdf(result.blob, filename);
    
    // Tracking
    logEvent('pdf_download_1page', `/pathologies/${slug}`, {
      slug,
      source: 'direct-download',
    });
  } catch (error) {
    console.error('Erreur génération PDF 1 page:', error);
    throw error;
  }
};

/**
 * Génère et télécharge le PDF 4 pages pour un slug donné
 */
export const downloadPdf4PagesBySlug = async (slug: string): Promise<void> => {
  try {
    const result = await generatePdf4PagesBySlug(slug);
    if (!result) {
      throw new Error(`Impossible de générer le PDF pour ${slug}`);
    }
    const filename = getPdfFilename(slug, '4pages');
    downloadPdf(result.blob, filename);
    
    // Tracking
    logEvent('pdf_download_4pages', `/pathologies/${slug}`, {
      slug,
      source: 'direct-download',
    });
  } catch (error) {
    console.error('Erreur génération PDF 4 pages:', error);
    throw error;
  }
};

// ============================================
// HELPERS
// ============================================

/**
 * Vérifie si le navigateur supporte la génération PDF
 */
export const isPdfSupported = (): boolean => {
  return typeof Blob !== 'undefined' && typeof URL.createObjectURL !== 'undefined';
};

/**
 * Vérifie si un slug a des données evidence disponibles
 */
export const hasEvidenceData = (slug: string): boolean => {
  return getEvidenceBySlug(slug) !== undefined;
};

export default {
  generatePdf1Page,
  generatePdf4Pages,
  generatePdf1PageBySlug,
  generatePdf4PagesBySlug,
  downloadPdf,
  downloadPdf1PageBySlug,
  downloadPdf4PagesBySlug,
  getPdfFilename,
  isPdfSupported,
  hasEvidenceData,
};
