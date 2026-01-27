// ============================================
// EVIDENCE PACK V2 - Types & Interfaces
// Structure standardisée pour toutes les pathologies
// ============================================

export type EvidenceLevel = 'Élevé' | 'Modéré' | 'Faible' | 'Consensus' | 'Avis expert';
export type ExerciseLevel = 0 | 1 | 2; // 0=très facile, 1=facile, 2=normal

export interface Source {
  title: string;
  org: string;
  year: number;
  url?: string;
  type?: 'guideline' | 'cochrane' | 'rct' | 'meta-analysis' | 'consensus';
}

export interface Recommendation {
  text: string;
  level: EvidenceLevel;
  tags?: string[];
  source_ref?: string;
}

export interface RedFlag {
  text: string;
  urgency: 'immediate' | 'rapid' | 'routine';
  source_ref?: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  levels: {
    level: ExerciseLevel;
    instructions: string;
    duration?: string;
    repetitions?: string;
  }[];
  common_errors?: string[];
  stop_rules?: string[];
  illustration?: string; // path to SVG
  video_url?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  actions: string[];
  tips?: string;
}

export interface WeekPlan {
  week: number;
  focus: string;
  goals: string[];
  exercises: string[]; // exercise IDs
}

export interface MedicalProcedure {
  id: string;
  name: string;
  type: 'infiltration' | 'viscosupplementation' | 'prp' | 'surgery' | 'other';
  purpose: string;
  indications: string[];
  benefits: string[];
  limitations: string[];
  risks: string[];
  guideline_position: 'recommended' | 'conditional' | 'controversial' | 'not_recommended';
  guideline_summary: string;
  sources: Source[];
}

export interface ThermalEvidence {
  summary: string;
  key_results: string[];
  duration_recommended?: string;
  limitations: string[];
  contraindications?: string[];
  sources: Source[];
}

export interface EvidencePackV2 {
  // Metadata
  slug: string;
  title: string;
  category: 'rhumatologie' | 'veino-lymphatique' | 'respiratoire-orl' | 'muqueuses-buccales';
  subcategory?: string;
  parent_slug?: string; // e.g., 'arthrose' for 'gonarthrose'
  icon: string;
  updated_at: string;
  version: string;
  status: 'complete' | 'draft' | 'stub';

  // Section 1: Comprendre
  definition: {
    summary: string; // 6-10 lines
    key_points?: string[];
    prevalence?: string;
    risk_factors?: string[];
  };

  // Section 2: Agir (recommandations)
  recommendations: Recommendation[];
  red_flags: RedFlag[];

  // Section 3: Exercices
  exercises: Exercise[];

  // Section 4: Parcours guidé
  seven_day_plan: DayPlan[];
  four_week_plan: WeekPlan[];

  // Section 5: Actes/Traitements
  medical_procedures: MedicalProcedure[];

  // Section 6: Cure thermale
  thermal_evidence?: ThermalEvidence;

  // Section 7: Sources
  sources: Source[];
}

// Categories structure for navigation
export interface PathologyCategory {
  id: string;
  label: string;
  icon: string;
  pathologies: {
    slug: string;
    label: string;
    children?: { slug: string; label: string }[];
  }[];
}

export const CATEGORIES: PathologyCategory[] = [
  {
    id: 'rhumatologie',
    label: 'Rhumatologie',
    icon: '🦴',
    pathologies: [
      {
        slug: 'arthrose',
        label: 'Arthrose',
        children: [
          { slug: 'coxarthrose', label: 'Coxarthrose (hanche)' },
          { slug: 'gonarthrose', label: 'Gonarthrose (genou)' },
          { slug: 'arthrose-cheville-pied', label: 'Arthrose cheville/pied' },
          { slug: 'arthrose-lombaire', label: 'Arthrose lombaire (rachis)' },
          { slug: 'arthrose-cervicale', label: 'Arthrose cervicale (rachis)' },
          { slug: 'arthrose-digitale', label: 'Arthrose digitale / main' },
          { slug: 'omarthrose', label: 'Omarthrose (épaule)' },
        ],
      },
      {
        slug: 'epaule',
        label: 'Épaule (hors arthrose)',
        children: [
          { slug: 'tendinopathie-coiffe', label: 'Tendinopathies de coiffe' },
        ],
      },
      { slug: 'lombalgie-chronique', label: 'Lombalgie chronique / sciatique' },
    ],
  },
  {
    id: 'veino-lymphatique',
    label: 'Veino-lymphatique',
    icon: '🩸',
    pathologies: [
      { slug: 'insuffisance-veineuse', label: 'Insuffisance veineuse / jambes lourdes' },
      { slug: 'lymphoedeme', label: 'Lymphœdème / séquelles érysipèle' },
    ],
  },
  {
    id: 'respiratoire-orl',
    label: 'Respiratoire / ORL',
    icon: '🌬️',
    pathologies: [
      { slug: 'bpco', label: 'BPCO' },
      { slug: 'asthme', label: 'Asthme' },
      { slug: 'rhinite-chronique', label: 'Rhinite chronique / allergique' },
      { slug: 'rhinosinusite-chronique', label: 'Rhinosinusite chronique' },
      { slug: 'otites-repetition-enfant', label: 'Otites à répétition (enfant)' },
    ],
  },
  {
    id: 'muqueuses-buccales',
    label: 'Muqueuses buccales',
    icon: '👄',
    pathologies: [
      { slug: 'lichen-plan-buccal', label: 'Lichen plan buccal' },
      { slug: 'glossodynie', label: 'Glossodynie' },
      { slug: 'gingivites', label: 'Gingivites' },
      { slug: 'sequelles-post-radiques', label: 'Séquelles post-radiques ORL' },
    ],
  },
];

// Helper to create a stub evidence pack
export const createStubPack = (
  slug: string,
  title: string,
  category: EvidencePackV2['category'],
  parentSlug?: string
): EvidencePackV2 => ({
  slug,
  title,
  category,
  parent_slug: parentSlug,
  icon: '📋',
  updated_at: new Date().toISOString().split('T')[0],
  version: '0.1.0',
  status: 'stub',
  definition: {
    summary: 'Contenu en cours de rédaction. Cette fiche sera complétée prochainement avec des informations validées par des sources médicales de référence.',
  },
  recommendations: [],
  red_flags: [],
  exercises: [],
  seven_day_plan: [],
  four_week_plan: [],
  medical_procedures: [],
  sources: [],
});
