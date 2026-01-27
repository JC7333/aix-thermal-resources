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

// Programme 7 jours
export interface SevenDayPlan {
  level: 0 | 1 | 2;
  levelName: string;
  days: {
    day: string;
    actions: string[];
  }[];
}

// Programme 8 semaines
export interface EightWeekProgram {
  level: 0 | 1 | 2;
  levelName: string;
  weeks: {
    week: string;
    focus: string;
    exercises: string[];
  }[];
}

export interface EvidenceData {
  slug: string;
  name: string;
  icon: string;
  category: 'rhumatologie' | 'veino-lymphatique' | 'orl-respiratoire';
  summary: string;
  readingTime: number;
  lastUpdated: string;
  recommendations: EvidenceRecommendation[];
  red_flags: string[];
  sources: EvidenceSource[];
  // Programmes (optionnels)
  sevenDayPlans?: SevenDayPlan[];
  eightWeekPrograms?: EightWeekProgram[];
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

/**
 * Vérifie si une pathologie a des programmes disponibles
 */
export const hasPrograms = (slug: string): boolean => {
  const evidence = getEvidenceBySlug(slug);
  if (!evidence) return false;
  return (evidence.sevenDayPlans && evidence.sevenDayPlans.length > 0) ||
         (evidence.eightWeekPrograms && evidence.eightWeekPrograms.length > 0);
};