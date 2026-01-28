// ============================================
// VIDEO THEME MAP — Mapping slug pathologie -> theme_id
// ============================================

/**
 * Mapping centralisé entre les slugs de pathologies et les theme_id du JSON vidéos
 * 
 * theme_id disponibles dans video_library_validated.json :
 * - arthrose_genou
 * - arthrose_hanche
 * - lombalgie_chronique
 * - bpco
 * - lavage_nez
 */

export type VideoThemeId = 
  | 'arthrose_genou' 
  | 'arthrose_hanche' 
  | 'lombalgie_chronique' 
  | 'bpco' 
  | 'lavage_nez'
  | null;

interface ThemeMapping {
  themeId: VideoThemeId;
  label: string;
}

/**
 * Mapping slug -> theme_id
 * Un slug peut mapper vers null si aucune vidéo n'est disponible
 */
const SLUG_TO_THEME: Record<string, ThemeMapping> = {
  // Arthrose genou
  'gonarthrose': { themeId: 'arthrose_genou', label: 'Arthrose du genou' },
  'arthrose-genou': { themeId: 'arthrose_genou', label: 'Arthrose du genou' },
  
  // Arthrose hanche
  'coxarthrose': { themeId: 'arthrose_hanche', label: 'Arthrose de la hanche' },
  'arthrose-hanche': { themeId: 'arthrose_hanche', label: 'Arthrose de la hanche' },
  
  // Lombalgie
  'lombalgie-chronique': { themeId: 'lombalgie_chronique', label: 'Lombalgie chronique' },
  'lombalgie': { themeId: 'lombalgie_chronique', label: 'Lombalgie chronique' },
  
  // BPCO
  'bpco': { themeId: 'bpco', label: 'BPCO' },
  
  // ORL enfant / lavage de nez
  'otites-repetition-enfant': { themeId: 'lavage_nez', label: 'Lavage de nez enfant' },
  'otites-enfant': { themeId: 'lavage_nez', label: 'Lavage de nez enfant' },
  'lavage-nez': { themeId: 'lavage_nez', label: 'Lavage de nez' },
  'rhinosinusite-chronique': { themeId: null, label: 'Rhinosinusite chronique' }, // Pas de vidéos validées pour l'instant
  'rhinite-enfant': { themeId: 'lavage_nez', label: 'Lavage de nez enfant' },
  
  // Pathologies sans vidéos disponibles pour l'instant
  'insuffisance-veineuse': { themeId: null, label: 'Insuffisance veineuse' },
  'arthrose-cheville-pied': { themeId: null, label: 'Arthrose cheville/pied' },
  'arthrose-lombaire': { themeId: null, label: 'Arthrose lombaire' },
  'arthrose-cervicale': { themeId: null, label: 'Arthrose cervicale' },
  'arthrose-digitale': { themeId: null, label: 'Arthrose digitale' },
  'omarthrose': { themeId: null, label: 'Omarthrose' },
  'tendinopathie-coiffe': { themeId: null, label: 'Tendinopathie de coiffe' },
  'lymphoedeme': { themeId: null, label: 'Lymphœdème' },
  'asthme': { themeId: null, label: 'Asthme' },
  'rhinite-chronique': { themeId: null, label: 'Rhinite chronique' },
  'lichen-plan-buccal': { themeId: null, label: 'Lichen plan buccal' },
  'glossodynie': { themeId: null, label: 'Glossodynie' },
  'gingivites': { themeId: null, label: 'Gingivites' },
  'sequelles-post-radiques': { themeId: null, label: 'Séquelles post-radiques' },
};

/**
 * Obtenir le theme_id pour un slug de pathologie donné
 */
export function getThemeIdForSlug(slug: string): VideoThemeId {
  const mapping = SLUG_TO_THEME[slug];
  return mapping?.themeId ?? null;
}

/**
 * Obtenir le mapping complet pour un slug
 */
export function getThemeMappingForSlug(slug: string): ThemeMapping | null {
  return SLUG_TO_THEME[slug] ?? null;
}

/**
 * Vérifier si des vidéos sont disponibles pour un slug
 */
export function hasVideosForSlug(slug: string): boolean {
  const themeId = getThemeIdForSlug(slug);
  return themeId !== null;
}

/**
 * Obtenir tous les slugs qui ont des vidéos disponibles
 */
export function getSlugsWithVideos(): string[] {
  return Object.entries(SLUG_TO_THEME)
    .filter(([_, mapping]) => mapping.themeId !== null)
    .map(([slug, _]) => slug);
}

/**
 * Obtenir la liste des theme_id uniques disponibles
 */
export function getAvailableThemeIds(): VideoThemeId[] {
  const themeIds = new Set(
    Object.values(SLUG_TO_THEME)
      .map(mapping => mapping.themeId)
      .filter((id): id is Exclude<VideoThemeId, null> => id !== null)
  );
  return Array.from(themeIds);
}
