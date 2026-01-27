// ============================================
// SERVICE PDF — COOLANCE
// ============================================
// Génération et téléchargement des PDFs premium
// Utilise @react-pdf/renderer pour un rendu de qualité
// Génère les PDFs à partir des données evidence-pack.json
// Inclut un cache en mémoire pour éviter les régénérations
// ============================================

import { pdf } from '@react-pdf/renderer';
import { PdfEvidence1Page } from '@/components/pdf/PdfEvidence1Page';
import { PdfEvidence4Pages } from '@/components/pdf/PdfEvidence4Pages';
import { getEvidenceBySlug, type EvidenceData } from '@/data/evidence';
import { logEvent } from './analytics';

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
 * Vide le cache (utile pour forcer une régénération)
 */
export const clearPdfCache = (): void => {
  pdfCache.clear();
  console.log('[pdfService] Cache cleared');
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
  const doc = <PdfEvidence1Page evidence={evidence} />;
  const blob = await pdf(doc).toBlob();
  return blob;
};

/**
 * Génère un PDF 4 pages pour une pathologie (evidence-based)
 */
export const generatePdf4Pages = async (evidence: EvidenceData): Promise<Blob> => {
  const doc = <PdfEvidence4Pages evidence={evidence} />;
  const blob = await pdf(doc).toBlob();
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
  
  const blob = await generatePdf1Page(evidence);
  
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
  
  const blob = await generatePdf4Pages(evidence);
  
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
    logEvent('pdf_download', `/pathologies/${slug}`, {
      type: '1page',
      slug,
      source: 'evidence-pack',
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
    logEvent('pdf_download', `/pathologies/${slug}`, {
      type: '4pages',
      slug,
      source: 'evidence-pack',
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
