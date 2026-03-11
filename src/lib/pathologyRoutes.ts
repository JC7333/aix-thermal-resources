/**
 * pathologyRoutes.ts
 * Source de vérité pour les URLs et slugs des pathologies V2.
 */

// ─── URL builder ─────────────────────────────────────────────────────────────

/**
 * Builds the URL for a V2 pathology page.
 * Route pattern: /pathologies/v2/:slug
 */
export const getPathologyUrl = (slug: string): string => {
  return `/pathologies/v2/${slug}`;
};

// ─── Valid V2 slugs ───────────────────────────────────────────────────────────

/**
 * Exhaustive list of slugs that have a published V2 page.
 * Keep in sync with ALL_EVIDENCE_PACKS_V2 (status: 'complete').
 */
export const VALID_V2_SLUGS: readonly string[] = [
  'gonarthrose',
  'coxarthrose',
  'lombalgie-chronique',
  'insuffisance-veineuse',
  'bpco',
  'otites-repetition-enfant',
  'rhinosinusite-chronique',
] as const;

/**
 * Returns true if the slug has a published V2 page.
 */
export const isValidPathologySlug = (slug: string): boolean => {
  return (VALID_V2_SLUGS as readonly string[]).includes(slug);
};

// ─── V1 → V2 migration ───────────────────────────────────────────────────────

/**
 * Map of old V1 slugs to their canonical V2 counterparts.
 * Add an entry whenever a slug is renamed between versions.
 */
export const SLUG_MIGRATION_MAP: Record<string, string> = {
  // Exemples — décommenter si un renommage a eu lieu :
  // 'arthrose-genou': 'gonarthrose',
  // 'mal-de-dos': 'lombalgie-chronique',
};

/**
 * Returns the canonical V2 slug for a given input slug.
 * Falls back to the original slug if no migration entry exists.
 */
export const getV2Slug = (slug: string): string => {
  return SLUG_MIGRATION_MAP[slug] ?? slug;
};
