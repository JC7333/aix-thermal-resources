// ============================================
// KOOS-PS — Knee injury and Osteoarthritis Outcome Score
// Physical Function Short Form — Version française validée
// 7 items, échelle Likert 5 niveaux
// Source : koos.nu (gratuit, libre d'accès)
// Validation française : Ornetti et al. 2008 (Osteoarthritis & Cartilage)
// ============================================

export interface KoosPsItem {
  id: number;
  question: string;
}

/**
 * Les 7 items KOOS-PS en français.
 * Chaque item est coté de 0 (Aucune difficulté) à 4 (Difficulté extrême).
 */
export const KOOS_PS_ITEMS: KoosPsItem[] = [
  { id: 1, question: "Vous lever du lit" },
  { id: 2, question: "Mettre vos chaussettes ou vos bas" },
  { id: 3, question: "Vous lever d'une position assise" },
  { id: 4, question: "Vous baisser pour ramasser un objet au sol" },
  { id: 5, question: "Pivoter sur votre genou douloureux" },
  { id: 6, question: "Vous agenouiller" },
  { id: 7, question: "Vous accroupir" },
];

/** Labels des niveaux de difficulté (Likert 5 niveaux) */
export const KOOS_PS_LEVELS = [
  { value: 0, label: "Aucune", color: "bg-green-100 text-green-800 border-green-300" },
  { value: 1, label: "Légère", color: "bg-lime-100 text-lime-800 border-lime-300" },
  { value: 2, label: "Modérée", color: "bg-yellow-100 text-yellow-800 border-yellow-300" },
  { value: 3, label: "Sévère", color: "bg-orange-100 text-orange-800 border-orange-300" },
  { value: 4, label: "Extrême", color: "bg-red-100 text-red-800 border-red-300" },
] as const;

/**
 * Calcule le score KOOS-PS sur 0-100.
 * 0 = pas de difficulté, 100 = difficulté maximale.
 *
 * NOTE SCIENTIFIQUE : Le scoring KOOS-PS officiel utilise une conversion
 * Rasch non-linéaire (nomogramme). La formule linéaire ci-dessous est une
 * approximation simplifiée acceptable pour un programme ETP (pas un essai clinique).
 * Pour une publication, utiliser le nomogramme de koos.nu.
 */
export function calculateKoosPsScore(items: number[]): number {
  if (items.length !== 7) return 0;
  const sum = items.reduce((a, b) => a + b, 0);
  const maxScore = 7 * 4; // 28
  return Math.round((sum / maxScore) * 100);
}

/**
 * Intros PRO par pathologie.
 * Le KOOS-PS est spécifique au genou ; pour les autres pathologies,
 * l'intro est adaptée tout en gardant les mêmes 7 items fonctionnels.
 */
export const KOOS_PS_INTROS: Record<string, string> = {
  'gonarthrose': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre genou ?",
  'coxarthrose': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre hanche ?",
  'lombalgie-chronique': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre dos ?",
  'fibromyalgie': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de vos douleurs ?",
  'tendinopathie-coiffe': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre épaule ?",
  'arthrose-digitale': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de vos mains ?",
  'insuffisance-veineuse': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de vos jambes ?",
  'bpco': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre essoufflement ?",
  'asthme': "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre asthme ?",
  'rhinosinusite-chronique': "Quel degré de difficulté avez-vous pour les activités suivantes, en lien avec votre état de santé ?",
  'otites-repetition-enfant': "Quel degré de difficulté votre enfant a-t-il pour les activités suivantes ?",
};

/** Fallback si slug non trouvé */
export const KOOS_PS_INTRO_DEFAULT = "Quel degré de difficulté avez-vous pour les activités suivantes ?";

/**
 * Slugs qui utilisent le KOOS-PS complet.
 * Les autres pathologies utilisent le mode "EVA-only" (douleur + confiance uniquement).
 */
export const KOOS_PS_SLUGS: string[] = [
  'gonarthrose',
  'lombalgie-chronique',
  'coxarthrose',
];
