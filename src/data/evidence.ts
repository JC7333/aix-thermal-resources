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
  // Champs premium S30A (optionnels — backward compatible)
  essentiels?: { title: string; text: string }[];   // 3 bullets "L'essentiel" pour fiche 1-page
  actionDuJour?: string;                             // "Votre action du jour" pour fiche 1-page
  didYouKnow?: string[];                             // "Le saviez-vous ?" pages 1 et 3 du guide
  bodyExplanation?: string;                          // "Ce qui se passe" texte page 1 du guide
}

const evidenceData: EvidenceData[] = evidencePack as EvidenceData[];

// Alias de slugs : V2 slug → V1 slug (evidence-pack.json)
// Permet aux pages V2 d'accéder aux données V1
const SLUG_ALIASES: Record<string, string> = {
  'gonarthrose': 'arthrose',
  'insuffisance-veineuse': 'insuffisance-veineuse-chronique',
  'otites-repetition-enfant': 'otites-a-repetition-enfant',
};

// Noms d'affichage corrigés pour les alias
// Quand un slug V2 est résolu via alias, on veut le nom V2 (plus précis)
const DISPLAY_NAME_OVERRIDES: Record<string, string> = {
  'arthrose': 'Gonarthrose (arthrose du genou)',
};

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
  // Chercher d'abord avec le slug exact
  let evidence = evidenceData.find((item) => item.slug === slug);
  
  // Si introuvable, essayer avec l'alias
  if (!evidence && SLUG_ALIASES[slug]) {
    evidence = evidenceData.find((item) => item.slug === SLUG_ALIASES[slug]);
    // Appliquer le nom d'affichage override si disponible
    if (evidence && DISPLAY_NAME_OVERRIDES[evidence.slug]) {
      evidence = { ...evidence, name: DISPLAY_NAME_OVERRIDES[evidence.slug] };
    }
  }
  
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