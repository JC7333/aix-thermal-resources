// ============================================
// SERVICE PDF — COOLANCE
// ============================================
// Génération et téléchargement des PDFs premium
// Utilise @react-pdf/renderer pour un rendu de qualité
// ============================================

import { pdf } from '@react-pdf/renderer';
import { Pdf1Page } from '@/components/pdf/Pdf1Page';
import { Pdf4Pages } from '@/components/pdf/Pdf4Pages';
import type { PathologyContent } from '@/content/content';
import { logEvent } from './analytics';

// ============================================
// GÉNÉRATION PDF
// ============================================

/**
 * Génère un PDF 1 page pour une pathologie
 */
export const generatePdf1Page = async (pathology: PathologyContent): Promise<Blob> => {
  const doc = <Pdf1Page pathology={pathology} />;
  const blob = await pdf(doc).toBlob();
  return blob;
};

/**
 * Génère un PDF 4 pages pour une pathologie
 */
export const generatePdf4Pages = async (pathology: PathologyContent): Promise<Blob> => {
  const doc = <Pdf4Pages pathology={pathology} />;
  const blob = await pdf(doc).toBlob();
  return blob;
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
 * Génère et télécharge le PDF 1 page
 */
export const downloadPdf1Page = async (pathology: PathologyContent): Promise<void> => {
  try {
    const blob = await generatePdf1Page(pathology);
    const filename = getPdfFilename(pathology.slug, '1page');
    downloadPdf(blob, filename);
    
    // Tracking
    logEvent('pdf_download', `/pathologies/${pathology.slug}`, {
      type: '1page',
      pathology: pathology.title,
    });
  } catch (error) {
    console.error('Erreur génération PDF 1 page:', error);
    throw error;
  }
};

/**
 * Génère et télécharge le PDF 4 pages
 */
export const downloadPdf4Pages = async (pathology: PathologyContent): Promise<void> => {
  try {
    const blob = await generatePdf4Pages(pathology);
    const filename = getPdfFilename(pathology.slug, '4pages');
    downloadPdf(blob, filename);
    
    // Tracking
    logEvent('pdf_download', `/pathologies/${pathology.slug}`, {
      type: '4pages',
      pathology: pathology.title,
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

export default {
  generatePdf1Page,
  generatePdf4Pages,
  downloadPdf,
  downloadPdf1Page,
  downloadPdf4Pages,
  getPdfFilename,
  isPdfSupported,
};
