// ============================================
// PARCOURS PATIENT INTERACTIF — Types
// Programme ETP numérique 21 jours
// ============================================

/** Contenu d'un jour du parcours */
export interface ParcoursDay {
  day: number; // 1-21
  theme: string; // ex: "Qu'est-ce que l'arthrose ?"
  phase: 'comprendre' | 'agir' | 'consolider';
  content: {
    title: string;
    body: string; // Markdown-like, 3-5 min de lecture
    keyMessage: string; // Message clé en 1 phrase
    source?: string; // Référence source (ex: "NICE NG226")
  };
  action: {
    title: string; // ex: "Marche 5 minutes"
    description: string;
    duration?: string; // ex: "5 min"
  };
  /** Quiz optionnel pour les jours bilan (J7, J14) */
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  /** Mini-PRO intermédiaire pour J7, J14 */
  hasMiniPro?: boolean;
}

/** Pack complet d'un parcours pour une pathologie */
export interface ParcoursContent {
  slug: string;
  title: string; // ex: "Gonarthrose — Votre programme 21 jours"
  subtitle: string; // ex: "Comprendre, agir, consolider"
  description: string; // Description courte pour l'écran d'accueil
  icon: string;
  proInstrument: 'koos-ps' | 'womac' | 'custom'; // PRO utilisé
  /** Intro du questionnaire PRO adaptée à la pathologie */
  proIntro: string;
  days: ParcoursDay[];
}

/** Données BEP (Bilan Éducatif Partagé) */
export interface BepData {
  ageRange: string; // ex: "60-70"
  duration: string; // ex: "1-5"
  previousCure: boolean;
  mainGoal: string; // ex: "moins-douleur"
  freeText?: string; // "Qu'est-ce qui vous empêche le plus..."
}

/** PRO T0/T1/T2/T3 assessment */
export interface ProAssessment {
  painScore: number; // EVA NRS 0-10
  koosPsItems: number[]; // 7 items, chacun 0-4
  koosPsTotal: number; // Score calculé 0-100
  confidenceScore: number; // EVA confiance 0-10
}

/** Token anonyme patient */
export type ParcoursToken = `ETUVE-${string}-${string}`;
