import evidencePack from './evidence-pack.json';

export interface EvidenceSource {
  title: string;
  org: string;
  year: number;
  url: string;
}

export interface EvidenceRecommendation {
  text: string;
  evidence: string;
}

export interface EvidenceData {
  slug: string;
  recommendations: EvidenceRecommendation[];
  red_flags: string[];
  sources: EvidenceSource[];
}

const evidenceData: EvidenceData[] = evidencePack as EvidenceData[];

/**
 * Retourne toutes les données evidence-based
 */
export const getAllEvidence = (): EvidenceData[] => {
  return evidenceData;
};

/**
 * Retourne les données evidence pour un slug donné
 * Affiche un warning si slug introuvable
 */
export const getEvidenceBySlug = (slug: string): EvidenceData | undefined => {
  const evidence = evidenceData.find((item) => item.slug === slug);
  
  if (!evidence) {
    console.warn(`[evidence.ts] Slug introuvable: "${slug}". Slugs disponibles: ${getAllSlugs().join(', ')}`);
  }
  
  return evidence;
};

/**
 * Retourne la liste de tous les slugs disponibles
 */
export const getAllSlugs = (): string[] => {
  return evidenceData.map((item) => item.slug);
};
