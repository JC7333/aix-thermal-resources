// ============================================
// EVIDENCE PACK — Loader & Accessor for V2 JSON Data
// ============================================

export interface EvidencePackRecommendation {
  rank: number;
  recommendation: string;
  evidence_level: string;
  expected_benefit: string;
  dosage?: string;
  specificity?: string;
}

export interface EvidencePackSource {
  org: string;
  year: number;
  title: string;
  url?: string;
}

export interface EvidencePackData {
  slug: string;
  title: string;
  key_messages: string[];
  recommendations: EvidencePackRecommendation[];
  red_flags: string[];
  limitations: string[];
  sources: EvidencePackSource[];
  theme_id: string | null;
}

export interface EvidencePackJSON {
  evidence_pack: {
    metadata: {
      version: string;
      date: string;
      language: string;
      sources_quality: string;
      clinical_validation: string;
      note?: string;
    };
    [key: string]: unknown;
  };
}

// Cache for loaded data
let cachedPack: EvidencePackJSON | null = null;
let loadPromise: Promise<EvidencePackJSON | null> | null = null;

/**
 * Load the evidence pack JSON (with caching)
 */
export async function loadEvidencePack(): Promise<EvidencePackJSON | null> {
  if (cachedPack) {
    return cachedPack;
  }
  
  if (loadPromise) {
    return loadPromise;
  }
  
  loadPromise = (async () => {
    try {
      const response = await fetch('/data/evidence_pack_v2.json');
      if (!response.ok) {
        console.error('[evidencePack] Failed to load JSON:', response.status);
        return null;
      }
      cachedPack = await response.json();
      return cachedPack;
    } catch (error) {
      console.error('[evidencePack] Error loading JSON:', error);
      return null;
    }
  })();
  
  return loadPromise;
}

/**
 * Slug mapping from V2 slugs to JSON keys
 * The JSON uses internal keys like "C_coxarthrose" while V2 uses "coxarthrose"
 */
const SLUG_TO_KEY_MAP: Record<string, string> = {
  'omarthrose': 'A_omarthrose',
  'tendinopathie-coiffe': 'B_tendinopathie_coiffe',
  'coxarthrose': 'C_coxarthrose',
  'gonarthrose': 'D_gonarthrose',
  'lombalgie-chronique': 'E_lombalgie_chronique',
  'fibromyalgie': 'F_fibromyalgie',
  'insuffisance-veineuse': 'G_insuffisance_veineuse',
  'bpco': 'H_bpco',
  'rhinosinusite-chronique': 'I_rhinosinusite_chronique',
  'otites-repetition-enfant': 'J_otites_recidivantes_enfant',
};

/**
 * Get evidence data by slug
 * @param slug - The V2 pathology slug
 * @returns The evidence data or null if not found
 */
export async function getEvidenceBySlug(slug: string): Promise<EvidencePackData | null> {
  const pack = await loadEvidencePack();
  if (!pack) return null;
  
  const key = SLUG_TO_KEY_MAP[slug];
  if (!key) {
    // Try to find by slug match in the data
    const entries = Object.entries(pack.evidence_pack);
    for (const [entryKey, value] of entries) {
      if (entryKey === 'metadata') continue;
      const data = value as { slug?: string };
      if (data?.slug === slug || data?.slug?.includes(slug)) {
        return parseEvidenceEntry(value as Record<string, unknown>);
      }
    }
    return null;
  }
  
  const data = pack.evidence_pack[key];
  if (!data) return null;
  
  return parseEvidenceEntry(data as Record<string, unknown>);
}

/**
 * Parse a raw JSON entry into typed data
 */
function parseEvidenceEntry(raw: Record<string, unknown>): EvidencePackData {
  return {
    slug: (raw.slug as string) || '',
    title: (raw.title as string) || '',
    key_messages: (raw.key_messages as string[]) || [],
    recommendations: ((raw.recommendations as unknown[]) || []).map((r: unknown) => {
      const rec = r as Record<string, unknown>;
      return {
        rank: (rec.rank as number) || 0,
        recommendation: (rec.recommendation as string) || '',
        evidence_level: (rec.evidence_level as string) || '',
        expected_benefit: (rec.expected_benefit as string) || '',
        dosage: rec.dosage as string | undefined,
        specificity: rec.specificity as string | undefined,
      };
    }),
    red_flags: (raw.red_flags as string[]) || [],
    limitations: (raw.limitations as string[]) || [],
    sources: ((raw.sources as unknown[]) || []).map((s: unknown) => {
      const src = s as Record<string, unknown>;
      return {
        org: (src.org as string) || '',
        year: (src.year as number) || 0,
        title: (src.title as string) || '',
        url: src.url as string | undefined,
      };
    }),
    theme_id: (raw.theme_id as string | null) ?? null,
  };
}

/**
 * Get all available slugs from the pack
 */
export async function getAllEvidenceSlugs(): Promise<string[]> {
  const pack = await loadEvidencePack();
  if (!pack) return [];
  
  const slugs: string[] = [];
  const entries = Object.entries(pack.evidence_pack);
  for (const [key, value] of entries) {
    if (key === 'metadata') continue;
    const data = value as { slug?: string };
    if (data?.slug) {
      slugs.push(data.slug);
    }
  }
  return slugs;
}

/**
 * Check if evidence data exists for a slug
 */
export async function hasEvidenceData(slug: string): Promise<boolean> {
  const data = await getEvidenceBySlug(slug);
  return data !== null;
}
