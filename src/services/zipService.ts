// ============================================
// SERVICE ZIP — COOLANCE
// ============================================
// Génération d'archives ZIP pour le téléchargement groupé
// Utilise JSZip pour créer les archives côté client
// ============================================

import JSZip from 'jszip';
import { 
  generatePdf1PageBySlug, 
  generatePdf4PagesBySlug,
  getPdfFilename,
  hasEvidenceData,
} from './pdfService';
import { pathologies, type ContentCategory, categoryLabels } from '@/content/content';
import { logEvent } from './analytics';

// ============================================
// TYPES
// ============================================

export interface ZipProgress {
  current: number;
  total: number;
  currentSlug: string;
  currentType: '1page' | '4pages';
  phase: 'generating' | 'zipping' | 'complete';
}

export interface ZipResult {
  blob: Blob;
  filename: string;
  pdfCount: number;
  duration: number;
}

// ============================================
// GÉNÉRATION ZIP PAR CATÉGORIE
// ============================================

/**
 * Génère une archive ZIP contenant tous les PDFs d'une catégorie
 * @param category - La catégorie de pathologies
 * @param onProgress - Callback pour le suivi de progression
 * @returns Le blob ZIP et les métadonnées
 */
export const generateCategoryZip = async (
  category: ContentCategory,
  onProgress?: (progress: ZipProgress) => void
): Promise<ZipResult | null> => {
  const startTime = performance.now();
  const zip = new JSZip();
  
  // Filtrer les pathologies de la catégorie avec données evidence
  const categoryPathologies = pathologies.filter(
    p => p.category === category && p.isPublished && hasEvidenceData(p.slug)
  );

  if (categoryPathologies.length === 0) {
    console.warn(`[zipService] Aucune pathologie avec evidence pour: ${category}`);
    return null;
  }

  const totalOperations = categoryPathologies.length * 2; // 2 PDFs par pathologie
  let current = 0;

  // Générer tous les PDFs
  for (const pathology of categoryPathologies) {
    // PDF 1 page
    onProgress?.({
      current: ++current,
      total: totalOperations,
      currentSlug: pathology.slug,
      currentType: '1page',
      phase: 'generating',
    });

    try {
      const result1Page = await generatePdf1PageBySlug(pathology.slug);
      if (result1Page) {
        const filename = getPdfFilename(pathology.slug, '1page');
        zip.file(filename, result1Page.blob);
        console.log(`[zipService] Added: ${filename}`);
      }
    } catch (error) {
      console.error(`[zipService] Erreur ${pathology.slug} 1page:`, error);
    }

    // PDF 4 pages
    onProgress?.({
      current: ++current,
      total: totalOperations,
      currentSlug: pathology.slug,
      currentType: '4pages',
      phase: 'generating',
    });

    try {
      const result4Pages = await generatePdf4PagesBySlug(pathology.slug);
      if (result4Pages) {
        const filename = getPdfFilename(pathology.slug, '4pages');
        zip.file(filename, result4Pages.blob);
        console.log(`[zipService] Added: ${filename}`);
      }
    } catch (error) {
      console.error(`[zipService] Erreur ${pathology.slug} 4pages:`, error);
    }
  }

  // Créer le ZIP
  onProgress?.({
    current: totalOperations,
    total: totalOperations,
    currentSlug: '',
    currentType: '1page',
    phase: 'zipping',
  });

  const blob = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const duration = Math.round(performance.now() - startTime);
  const pdfCount = Object.keys(zip.files).length;
  
  // Nom du fichier ZIP
  const categorySlug = category.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const date = new Date().toISOString().split('T')[0];
  const filename = `coolance-${categorySlug}-${date}.zip`;

  onProgress?.({
    current: totalOperations,
    total: totalOperations,
    currentSlug: '',
    currentType: '1page',
    phase: 'complete',
  });

  // Tracking
  logEvent('zip_download', '/telechargements', {
    category,
    pdfCount: String(pdfCount),
    duration: String(duration),
  });

  console.log(`[zipService] ZIP créé: ${filename} (${pdfCount} PDFs, ${duration}ms)`);

  return {
    blob,
    filename,
    pdfCount,
    duration,
  };
};

/**
 * Génère une archive ZIP contenant TOUS les PDFs disponibles
 */
export const generateAllPdfsZip = async (
  onProgress?: (progress: ZipProgress) => void
): Promise<ZipResult | null> => {
  const startTime = performance.now();
  const zip = new JSZip();
  
  // Toutes les pathologies publiées avec evidence
  const allPathologies = pathologies.filter(
    p => p.isPublished && hasEvidenceData(p.slug)
  );

  if (allPathologies.length === 0) {
    console.warn('[zipService] Aucune pathologie avec evidence');
    return null;
  }

  const totalOperations = allPathologies.length * 2;
  let current = 0;

  // Organiser par dossiers de catégorie
  for (const pathology of allPathologies) {
    const categoryFolder = categoryLabels[pathology.category] || pathology.category;

    // PDF 1 page
    onProgress?.({
      current: ++current,
      total: totalOperations,
      currentSlug: pathology.slug,
      currentType: '1page',
      phase: 'generating',
    });

    try {
      const result1Page = await generatePdf1PageBySlug(pathology.slug);
      if (result1Page) {
        const filename = getPdfFilename(pathology.slug, '1page');
        zip.file(`${categoryFolder}/${filename}`, result1Page.blob);
      }
    } catch (error) {
      console.error(`[zipService] Erreur ${pathology.slug} 1page:`, error);
    }

    // PDF 4 pages
    onProgress?.({
      current: ++current,
      total: totalOperations,
      currentSlug: pathology.slug,
      currentType: '4pages',
      phase: 'generating',
    });

    try {
      const result4Pages = await generatePdf4PagesBySlug(pathology.slug);
      if (result4Pages) {
        const filename = getPdfFilename(pathology.slug, '4pages');
        zip.file(`${categoryFolder}/${filename}`, result4Pages.blob);
      }
    } catch (error) {
      console.error(`[zipService] Erreur ${pathology.slug} 4pages:`, error);
    }
  }

  // Créer le ZIP
  onProgress?.({
    current: totalOperations,
    total: totalOperations,
    currentSlug: '',
    currentType: '1page',
    phase: 'zipping',
  });

  const blob = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  });

  const duration = Math.round(performance.now() - startTime);
  const pdfCount = Object.keys(zip.files).length;
  
  const date = new Date().toISOString().split('T')[0];
  const filename = `coolance-tous-les-pdfs-${date}.zip`;

  onProgress?.({
    current: totalOperations,
    total: totalOperations,
    currentSlug: '',
    currentType: '1page',
    phase: 'complete',
  });

  // Tracking
  logEvent('zip_download', '/telechargements', {
    category: 'all',
    pdfCount: String(pdfCount),
    duration: String(duration),
  });

  console.log(`[zipService] ZIP complet créé: ${filename} (${pdfCount} PDFs, ${duration}ms)`);

  return {
    blob,
    filename,
    pdfCount,
    duration,
  };
};

// ============================================
// TÉLÉCHARGEMENT
// ============================================

/**
 * Télécharge un fichier ZIP
 */
export const downloadZip = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ============================================
// HELPERS
// ============================================

/**
 * Compte le nombre de PDFs disponibles par catégorie
 */
export const getPdfCountByCategory = (category: ContentCategory): number => {
  return pathologies.filter(
    p => p.category === category && p.isPublished && hasEvidenceData(p.slug)
  ).length * 2;
};

/**
 * Compte le nombre total de PDFs disponibles
 */
export const getTotalPdfCount = (): number => {
  return pathologies.filter(
    p => p.isPublished && hasEvidenceData(p.slug)
  ).length * 2;
};

/**
 * Estime le temps de génération d'un ZIP (en secondes)
 * Basé sur ~2.5s par PDF en moyenne
 */
export const estimateZipTime = (pdfCount: number): number => {
  return Math.ceil(pdfCount * 2.5);
};

export default {
  generateCategoryZip,
  generateAllPdfsZip,
  downloadZip,
  getPdfCountByCategory,
  getTotalPdfCount,
  estimateZipTime,
};
