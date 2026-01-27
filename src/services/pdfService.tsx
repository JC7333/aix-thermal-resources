// ============================================
// SERVICE PDF — COOLANCE
// ============================================
// Génération et téléchargement des PDFs premium
// Utilise @react-pdf/renderer pour un rendu de qualité
// Génère les PDFs à partir des données evidence-pack.json
// ============================================

import { pdf } from '@react-pdf/renderer';
import { PdfEvidence1Page } from '@/components/pdf/PdfEvidence1Page';
import { PdfEvidence4Pages } from '@/components/pdf/PdfEvidence4Pages';
import { getEvidenceBySlug, type EvidenceData } from '@/data/evidence';
import { logEvent } from './analytics';

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
 * Génère un PDF 1 page à partir d'un slug
 */
export const generatePdf1PageBySlug = async (slug: string): Promise<Blob | null> => {
  const evidence = getEvidenceBySlug(slug);
  if (!evidence) {
    console.error(`[pdfService] Slug introuvable: ${slug}`);
    return null;
  }
  return generatePdf1Page(evidence);
};

/**
 * Génère un PDF 4 pages à partir d'un slug
 */
export const generatePdf4PagesBySlug = async (slug: string): Promise<Blob | null> => {
  const evidence = getEvidenceBySlug(slug);
  if (!evidence) {
    console.error(`[pdfService] Slug introuvable: ${slug}`);
    return null;
  }
  return generatePdf4Pages(evidence);
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
    const blob = await generatePdf1PageBySlug(slug);
    if (!blob) {
      throw new Error(`Impossible de générer le PDF pour ${slug}`);
    }
    const filename = getPdfFilename(slug, '1page');
    downloadPdf(blob, filename);
    
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
    const blob = await generatePdf4PagesBySlug(slug);
    if (!blob) {
      throw new Error(`Impossible de générer le PDF pour ${slug}`);
    }
    const filename = getPdfFilename(slug, '4pages');
    downloadPdf(blob, filename);
    
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
