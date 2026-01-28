// ============================================
// PATHOLOGY ROUTES — Fonctions centralisées pour les URLs de pathologies
// ============================================

/**
 * Génère l'URL canonique pour une page pathologie.
 * Toutes les pathologies utilisent désormais la version V2.
 */
export function getPathologyUrl(slug: string, anchor?: string): string {
  const base = `/pathologies/v2/${slug}`;
  return anchor ? `${base}#${anchor}` : base;
}

/**
 * Génère l'URL de la liste des pathologies
 */
export function getPathologiesListUrl(): string {
  return '/pathologies';
}

/**
 * Vérifie si un slug de pathologie existe dans le système V2
 */
export function isValidPathologySlug(slug: string): boolean {
  // Liste des slugs V2 valides
  const validSlugs = [
    'gonarthrose',
    'coxarthrose',
    'lombalgie-chronique',
    'insuffisance-veineuse',
    'bpco',
    'otites-repetition-enfant',
    'rhinosinusite-chronique',
    // Stubs (en cours de rédaction)
    'arthrose-cheville-pied',
    'arthrose-lombaire',
    'arthrose-cervicale',
    'arthrose-digitale',
    'omarthrose',
    'tendinopathie-coiffe',
    'lymphoedeme',
    'asthme',
    'rhinite-chronique',
    'lichen-plan-buccal',
    'glossodynie',
    'gingivites',
    'sequelles-post-radiques',
  ];
  return validSlugs.includes(slug);
}

/**
 * Mapping des anciens slugs V1 vers les nouveaux slugs V2
 * Si un slug V1 existe dans ce mapping, il sera redirigé vers le slug V2 correspondant
 */
export const SLUG_MIGRATION_MAP: Record<string, string> = {
  // Les slugs V1 qui doivent être redirigés vers des slugs V2 différents
  // Format: 'ancien-slug': 'nouveau-slug'
  'arthrose': 'gonarthrose', // Si l'ancien slug était générique
  'lombalgie': 'lombalgie-chronique',
  'mal-de-dos': 'lombalgie-chronique',
  'veines': 'insuffisance-veineuse',
  'jambes-lourdes': 'insuffisance-veineuse',
  'otites': 'otites-repetition-enfant',
  'otites-enfant': 'otites-repetition-enfant',
  'rhinite': 'rhinosinusite-chronique',
  'sinusite': 'rhinosinusite-chronique',
};

/**
 * Obtient le slug V2 à partir d'un slug (gère les migrations)
 */
export function getV2Slug(slug: string): string {
  return SLUG_MIGRATION_MAP[slug] || slug;
}
