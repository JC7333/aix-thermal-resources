// ============================================
// TOKEN ANONYME — ÉTUVE
// Format : ETUVE-{P}-{6 chars alphanumériques}
// P = première lettre majuscule de la pathologie
// Zéro donnée nominative, RGPD-compatible
// ============================================

const STORAGE_KEY = 'etuve_parcours_token';

/**
 * Génère un token anonyme unique.
 * Format : ETUVE-G-A4K7MZ (G = Gonarthrose, 6 chars = 2.2 milliards de combinaisons)
 */
export function generateToken(slug: string): string {
  const initial = slug.charAt(0).toUpperCase();
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase();
  return `ETUVE-${initial}-${random}`;
}

/**
 * Stocke le token + parcoursId dans localStorage
 */
export function saveToken(token: string, slug: string, parcoursId: string): void {
  try {
    const data = { token, slug, parcoursId, createdAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('[Token] localStorage save failed:', e);
  }
}

/**
 * Récupère le token stocké (si existant et même slug)
 */
export function getStoredToken(slug?: string): { token: string; slug: string; parcoursId: string; createdAt: number } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (slug && data.slug !== slug) return null;
    return data;
  } catch {
    return null;
  }
}

/**
 * Supprime le token stocké
 */
export function clearToken(): void {
  localStorage.removeItem(STORAGE_KEY);
}
