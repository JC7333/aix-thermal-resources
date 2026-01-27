// ============================================
// CONTENT FACTORY — CONTENU CENTRALISÉ COOLANCE
// ============================================
// Ce fichier centralise TOUT le contenu du site.
// Ajouter une pathologie = ajouter une entrée ici.
// Les pages se génèrent automatiquement.
// ============================================

// ============================================
// TYPES PRINCIPAUX
// ============================================

export type ContentCategory = 
  | 'rhumatologie' 
  | 'veino-lymphatique' 
  | 'orl-respiratoire' 
  | 'muqueuses-buccales'
  | 'guides-transversaux';

export type ContentAudience = 'senior' | 'parent' | 'adulte';

export type ContentTag = 
  | 'comprendre' 
  | 'plan-simple' 
  | 'bouger' 
  | 'nutrition' 
  | 'habitudes' 
  | 'consulter'
  | 'exercices'
  | 'pdf';

export type MobilityLevel = 0 | 1 | 2 | 3;

// ============================================
// INTERFACES COMMUNES
// ============================================

export interface DailyAction {
  time?: string;
  action: string;
  detail?: string;
}

export interface DayPlan {
  day: string;
  actions: string[];
}

export interface LevelPlan {
  level: MobilityLevel;
  levelName: string;
  actions?: string[];
  days?: DayPlan[];
}

export interface WeekProgram {
  level: MobilityLevel;
  levelName: string;
  weeks: {
    week: string;
    focus: string;
    exercises: string[];
  }[];
}

export interface NutritionPlan {
  idealPlate: string[];
  commonMistakes: string[];
  tips: string[];
}

export interface FlareProtocol {
  title: string;
  hours0to24: string[];
  hours24to48: string[];
  resumeActivity: string;
}

export interface ContentSource {
  name: string;
  year: number;
  url?: string;
}

export interface MythTruth {
  myth: string;
  truth: string;
}

export interface Tip {
  title: string;
  description: string;
  icon: string;
}

// ============================================
// INTERFACE PATHOLOGIE COMPLÈTE
// ============================================

export interface PathologyContent {
  // Identifiants
  id: string;
  slug: string;
  type: 'pathology';
  
  // Métadonnées
  title: string;
  shortDescription: string;
  category: ContentCategory;
  audience: ContentAudience;
  tags: ContentTag[];
  readingTime: number;
  lastUpdated: string;
  isPublished: boolean;
  isFeatured?: boolean;
  
  // Contenu principal
  quickSummary: string;           // En 2 minutes
  physiopathology: string;        // Ce qui se passe
  
  // Top 5 conseils
  top5Tips: Tip[];
  
  // Plans d'action
  dailyPlans: LevelPlan[];        // Plan du jour par niveau
  sevenDayPlans: LevelPlan[];     // Plan 7 jours par niveau
  eightWeekPrograms: WeekProgram[]; // Programme 8 semaines
  
  // Suppléments
  nutrition: NutritionPlan;
  flareProtocol?: FlareProtocol;  // Plan poussée 48h
  alertSigns: string[];           // Red flags
  
  // Sources
  sources: ContentSource[];
}

// ============================================
// INTERFACE RÉPONSE RAPIDE
// ============================================

export interface QuickAnswerContent {
  // Identifiants
  id: string;
  slug: string;
  type: 'quick-answer';
  
  // Métadonnées
  title: string;
  subtitle: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'destructive';
  category: ContentCategory;
  audience: ContentAudience;
  tags: ContentTag[];
  isPublished: boolean;
  
  // Contenu
  intro: string;
  truths: MythTruth[];            // 3 vérités (myth-busting)
  dailyPlan: DailyAction[];       // 3 actions aujourd'hui
  sevenDayPlan: DayPlan[];        // Plan 7 jours
  alertSigns: string[];           // Red flags
  closingMessage: string;
  
  // Lien vers pathologie (optionnel)
  relatedPathologySlug?: string;
}

// ============================================
// INTERFACE RESSOURCE BIBLIOTHÈQUE
// ============================================

export interface LibraryResourceContent {
  id: string;
  slug: string;
  type: 'resource';
  
  title: string;
  summary: string;
  category: ContentCategory;
  tags: ContentTag[];
  audience: ContentAudience;
  readingTime: number;
  
  relatedPathologySlug?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  popularity: number;
  createdAt: string;
  isPublished: boolean;
}

// ============================================
// LABELS ET MAPPINGS
// ============================================

export const categoryLabels: Record<ContentCategory, string> = {
  'rhumatologie': 'Rhumatologie',
  'veino-lymphatique': 'Veino-lymphatique',
  'orl-respiratoire': 'ORL & Respiratoire',
  'muqueuses-buccales': 'Muqueuses buccales',
  'guides-transversaux': 'Guides transversaux',
};

export const categoryIcons: Record<ContentCategory, string> = {
  'rhumatologie': '🦴',
  'veino-lymphatique': '🩸',
  'orl-respiratoire': '🫁',
  'muqueuses-buccales': '👄',
  'guides-transversaux': '📚',
};

export const categoryColors: Record<ContentCategory, string> = {
  'rhumatologie': 'category-rhuma',
  'veino-lymphatique': 'category-veino',
  'orl-respiratoire': 'category-orl',
  'muqueuses-buccales': 'category-buccal',
  'guides-transversaux': 'bg-muted text-muted-foreground',
};

export const audienceLabels: Record<ContentAudience, string> = {
  'senior': 'Seniors',
  'parent': 'Parents',
  'adulte': 'Adultes',
};

export const audienceIcons: Record<ContentAudience, string> = {
  'senior': '👴',
  'parent': '👨‍👩‍👧',
  'adulte': '👤',
};

export const tagLabels: Record<ContentTag, string> = {
  'comprendre': 'Comprendre',
  'plan-simple': 'Plan simple',
  'bouger': 'Bouger',
  'nutrition': 'Nutrition',
  'habitudes': 'Habitudes',
  'consulter': 'Quand consulter',
  'exercices': 'Exercices',
  'pdf': 'PDF disponible',
};

export const tagColors: Record<ContentTag, string> = {
  'comprendre': 'bg-blue-100 text-blue-700',
  'plan-simple': 'bg-green-100 text-green-700',
  'bouger': 'bg-orange-100 text-orange-700',
  'nutrition': 'bg-purple-100 text-purple-700',
  'habitudes': 'bg-teal-100 text-teal-700',
  'consulter': 'bg-red-100 text-red-700',
  'exercices': 'bg-amber-100 text-amber-700',
  'pdf': 'bg-pink-100 text-pink-700',
};

export const levelLabels: Record<MobilityLevel, string> = {
  0: 'Niveau 0 — Très facile',
  1: 'Niveau 1 — Facile',
  2: 'Niveau 2 — Normal',
  3: 'Niveau 3 — Actif',
};

// ============================================
// DONNÉES: PATHOLOGIES
// ============================================

export const pathologies: PathologyContent[] = [
  // ========== ARTHROSE ==========
  {
    id: 'arthrose',
    slug: 'arthrose',
    type: 'pathology',
    title: 'Arthrose',
    shortDescription: 'Je vous aide à mieux vivre avec l\'arthrose au quotidien.',
    category: 'rhumatologie',
    audience: 'senior',
    tags: ['comprendre', 'bouger', 'plan-simple', 'pdf'],
    readingTime: 8,
    lastUpdated: 'Janvier 2025',
    isPublished: true,
    isFeatured: true,

    quickSummary: `Je sais que l'arthrose peut être vraiment handicapante au quotidien. La bonne nouvelle ? Ce n'est pas une fatalité. Votre cartilage a besoin de mouvement pour rester en bonne santé.

Je vous propose ici des conseils simples et concrets pour soulager vos douleurs. Pas de recette miracle, mais des gestes qui ont fait leurs preuves. La plupart de mes patients voient une vraie amélioration en quelques semaines.

En cas de doute ou de symptômes inhabituels, n'hésitez pas à consulter un professionnel de santé.`,

    physiopathology: `Pour comprendre simplement : imaginez votre cartilage comme une éponge.

Quand vous bougez, cette éponge se comprime et absorbe le liquide nutritif de votre articulation. Quand vous vous arrêtez, elle se regonfle. C'est comme ça qu'elle se nourrit.

Si vous restez immobile trop longtemps, l'éponge s'assèche et s'abîme. Le mouvement régulier et doux protège vos articulations.`,

    top5Tips: [
      {
        title: 'Bouger un peu chaque jour',
        description: '30 min de marche, vélo ou natation par jour. Commencez par 5 min si c\'est trop. L\'important : la régularité.',
        icon: '🚶',
      },
      {
        title: 'Appliquer de la chaleur',
        description: 'Bouillotte 15-20 min sur l\'articulation. Le matin ou le soir. Ça détend et ça soulage.',
        icon: '🔥',
      },
      {
        title: 'Renforcer les muscles',
        description: 'Muscles forts = moins de pression sur l\'articulation. Je vous montre des exercices simples.',
        icon: '💪',
      },
      {
        title: 'Surveiller le poids',
        description: 'Chaque kilo perdu = 4 kilos de pression en moins sur les genoux. Même 2-3 kg font la différence.',
        icon: '⚖️',
      },
      {
        title: 'Changer de position',
        description: 'Ne restez jamais plus d\'1h dans la même position. Levez-vous, bougez, étirez-vous.',
        icon: '🔄',
      },
    ],

    dailyPlans: [
      {
        level: 0,
        levelName: 'Version très facile',
        actions: [
          '5 min de mouvements doux sur votre chaise',
          'Bouillotte 15 min sur la zone douloureuse',
          'Marcher 3 min dans votre appartement',
        ],
      },
      {
        level: 1,
        levelName: 'Version normale',
        actions: [
          '15 min d\'exercices doux',
          '20-30 min de marche à votre rythme',
          'Bouillotte ou bain chaud le soir',
        ],
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Très facile — Je bouge à peine',
        days: [
          { day: 'Jour 1', actions: ['5 min mouvements sur chaise', 'Bouillotte 15 min'] },
          { day: 'Jour 2', actions: ['5 min mouvements + 3 min marche', 'Buvez 6 verres d\'eau'] },
          { day: 'Jour 3', actions: ['7 min mouvements', 'Marche 5 min', 'Bouillotte soir'] },
          { day: 'Jour 4', actions: ['7 min mouvements + 1 exercice couché', 'Marche 5-7 min'] },
          { day: 'Jour 5', actions: ['10 min mouvements', 'Marche 10 min (2 fois si besoin)'] },
          { day: 'Jour 6', actions: ['10 min mouvements', 'Marche 10-15 min', 'Félicitez-vous !'] },
          { day: 'Jour 7', actions: ['Repos actif : mouvements doux', 'Notez vos progrès'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je me fatigue vite',
        days: [
          { day: 'Jour 1', actions: ['10 min exercices', 'Marche 15 min', 'Chaleur si raideur'] },
          { day: 'Jour 2', actions: ['10 min exercices', 'Marche 15 min', 'Hydratation 1,5L'] },
          { day: 'Jour 3', actions: ['12 min exercices', 'Marche 20 min'] },
          { day: 'Jour 4', actions: ['12 min exercices', 'Marche 20 min (pauses ok)'] },
          { day: 'Jour 5', actions: ['15 min exercices', 'Marche 20 min'] },
          { day: 'Jour 6', actions: ['15 min exercices', 'Marche 25 min', 'Étirements soir'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Bilan : comment ça va ?'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — Je peux marcher 30 min',
        days: [
          { day: 'Jour 1', actions: ['15 min exercices', 'Marche 30 min'] },
          { day: 'Jour 2', actions: ['15 min exercices', 'Marche ou vélo 30 min'] },
          { day: 'Jour 3', actions: ['20 min exercices', 'Marche 30 min', 'Étirements'] },
          { day: 'Jour 4', actions: ['15 min exercices', 'Activité plaisir 30 min'] },
          { day: 'Jour 5', actions: ['20 min exercices', 'Marche 35-40 min'] },
          { day: 'Jour 6', actions: ['20 min exercices', 'Sortie 40 min', 'Étirements'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Évaluez vos progrès'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je suis en forme',
        days: [
          { day: 'Jour 1', actions: ['20 min renforcement', 'Cardio 40 min'] },
          { day: 'Jour 2', actions: ['20 min mobilité', 'Marche rapide 40 min'] },
          { day: 'Jour 3', actions: ['25 min renforcement', 'Cardio 40 min', 'Étirements'] },
          { day: 'Jour 4', actions: ['20 min exercices', 'Sport plaisir 45 min'] },
          { day: 'Jour 5', actions: ['25 min renforcement', 'Cardio 45 min'] },
          { day: 'Jour 6', actions: ['20 min exercices', 'Activité longue 1h'] },
          { day: 'Jour 7', actions: ['Repos actif : yoga, natation douce'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Très facile — Je démarre doucement',
        weeks: [
          { week: 'Semaines 1-2', focus: 'On réveille le corps', exercises: ['Mouvements sur chaise 5-10 min/jour', 'Marche 5 min 2x/jour', 'Bouillotte quotidienne'] },
          { week: 'Semaines 3-4', focus: 'On gagne en amplitude', exercises: ['Mouvements 10 min/jour', 'Ajouter 1 exercice couché', 'Marche 10 min/jour'] },
          { week: 'Semaines 5-6', focus: 'Premiers renforcements', exercises: ['Exercices 15 min', 'Marche 15-20 min/jour', 'Montées sur pointes'] },
          { week: 'Semaines 7-8', focus: 'On consolide', exercises: ['Routine 20 min', 'Marche 25-30 min', 'Objectif : passer au niveau 1'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je progresse à mon rythme',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Base solide', exercises: ['Exercices 15 min/jour', 'Marche 20 min/jour'] },
          { week: 'Semaines 3-4', focus: 'On augmente', exercises: ['Exercices 20 min', 'Marche 25-30 min', 'Étirements soir'] },
          { week: 'Semaines 5-6', focus: 'On diversifie', exercises: ['Exercices 20 min', 'Alterner marche/vélo 30 min'] },
          { week: 'Semaines 7-8', focus: 'Prêt pour niveau 2', exercises: ['Routine 25 min', 'Cardio 35 min'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — J\'ai une bonne base',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Renforcement structuré', exercises: ['Renforcement 20 min 4x/sem', 'Cardio 35 min/jour'] },
          { week: 'Semaines 3-4', focus: 'Intensification douce', exercises: ['Renforcement 25 min', 'Cardio 40 min'] },
          { week: 'Semaines 5-6', focus: 'Endurance', exercises: ['Renforcement 25 min', 'Cardio 45 min'] },
          { week: 'Semaines 7-8', focus: 'Autonomie', exercises: ['Programme personnel 30 min', 'Cardio 45 min'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je maintiens long terme',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Renforcement 30 min 5x/sem', 'Cardio varié 45 min'] },
          { week: 'Semaines 3-4', focus: 'Performance douce', exercises: ['Circuits complets', 'Cardio 50 min'] },
          { week: 'Semaines 5-6', focus: 'Sport plaisir', exercises: ['Activité sportive régulière'] },
          { week: 'Semaines 7-8', focus: 'Maintien', exercises: ['Routine personnalisée', 'Réévaluation tous les 3 mois'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        '½ assiette de légumes colorés — anti-inflammatoires naturels',
        '¼ de protéines (poisson 2-3x/semaine, œufs, volaille)',
        '¼ de féculents complets (riz complet, patate douce)',
        'Huile d\'olive pour assaisonner',
        'Fruits en dessert (fruits rouges, agrumes)',
      ],
      commonMistakes: [
        'Régime restrictif → ça affaiblit les muscles',
        'Trop de sucres rapides → ça augmente l\'inflammation',
        'Pas assez de protéines → les muscles fondent',
      ],
      tips: [
        'Poisson gras 2-3x/semaine (saumon, sardines)',
        'Au moins 1,5L d\'eau/jour — le cartilage a besoin d\'eau',
        'Si surpoids : visez -5% du poids, c\'est déjà efficace',
      ],
    },

    flareProtocol: {
      title: 'Crise de douleur — Que faire pendant 48h',
      hours0to24: [
        'Réduisez les activités mais bougez quand même',
        'Bouillotte 20 min, 3-4 fois dans la journée',
        'Quelques mouvements très doux',
        'Buvez bien : 1,5 à 2 litres',
        'Coussin sous les genoux si couché',
      ],
      hours24to48: [
        'Reprenez progressivement les mouvements',
        'Continuez la chaleur si ça soulage',
        'Marche courte 5-10 min plusieurs fois',
        'Étirements doux le soir',
      ],
      resumeActivity: 'Si la douleur diminue de moitié, reprenez au niveau en dessous. Si ça persiste : consultez.',
    },

    alertSigns: [
      'Douleur brutale et intense sans raison',
      'Articulation très gonflée, rouge et chaude',
      'Fièvre associée aux douleurs',
      'Blocage complet de l\'articulation',
      'Perte de force brutale',
      'Douleur qui réveille chaque nuit',
    ],

    sources: [
      { name: 'OARSI Guidelines — Prise en charge de l\'arthrose', year: 2019 },
      { name: 'EULAR Recommendations', year: 2019 },
      { name: 'HAS — Recommandations arthrose', year: 2023 },
    ],
  },

  // ========== LOMBALGIE CHRONIQUE ==========
  {
    id: 'lombalgie-chronique',
    slug: 'lombalgie-chronique',
    type: 'pathology',
    title: 'Lombalgie chronique',
    shortDescription: 'Je vous accompagne pour soulager votre mal de dos chronique.',
    category: 'rhumatologie',
    audience: 'adulte',
    tags: ['comprendre', 'bouger', 'plan-simple', 'pdf'],
    readingTime: 8,
    lastUpdated: 'Janvier 2025',
    isPublished: true,
    isFeatured: true,

    quickSummary: `Votre dos vous fait mal depuis plus de 3 mois ? Je sais à quel point c'est usant. Dans plus de 90% des cas, il n'y a rien de grave.

Le repos prolongé aggrave les choses. Vos muscles du dos ont besoin de bouger pour rester forts et protéger votre colonne.

Avec les bons exercices et quelques ajustements simples, la plupart des personnes voient une vraie amélioration. Si les symptômes persistent ou s'aggravent, consultez un professionnel de santé.`,

    physiopathology: `Votre colonne lombaire porte le poids de tout votre corps. Elle est faite pour bouger, pas pour rester assise 8h par jour.

Quand on reste trop statique, les muscles du dos s'affaiblissent, les disques se déshydratent. Les tensions s'accumulent.

Le problème vient rarement d'une vertèbre "déplacée". C'est plutôt un déséquilibre musculaire, souvent aggravé par le stress. Ça se corrige avec du mouvement et de la patience.`,

    top5Tips: [
      {
        title: 'Bouger malgré la douleur',
        description: 'Marche, natation, vélo : reprenez progressivement. La douleur ne veut pas dire que vous vous abîmez.',
        icon: '🚶',
      },
      {
        title: 'Renforcer le gainage',
        description: 'Des abdos et muscles du dos solides = moins de pression sur les disques. 10 min/jour suffisent.',
        icon: '💪',
      },
      {
        title: 'Alterner les positions',
        description: 'Assis, debout, couché... Ne restez jamais plus de 45 min dans la même position.',
        icon: '🔄',
      },
      {
        title: 'Gérer le stress',
        description: 'Le stress contracte les muscles du dos. Respiration abdominale 5 min/jour.',
        icon: '🧘',
      },
      {
        title: 'Chaleur ou froid',
        description: 'Chaleur pour les contractures. Froid après un effort intense. Testez ce qui vous soulage.',
        icon: '🔥',
      },
    ],

    dailyPlans: [
      {
        level: 0,
        levelName: 'Version très facile',
        actions: [
          'Marcher 5 min, même dans la maison',
          'Position de délordose 10 min (genoux pliés sur coussin)',
          'Respiration abdominale 5 min',
        ],
      },
      {
        level: 1,
        levelName: 'Version normale',
        actions: [
          'Marche 15-20 min à votre rythme',
          'Exercices de gainage 10 min',
          'Étirements doux le soir',
        ],
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Très facile — J\'ai très mal',
        days: [
          { day: 'Jour 1', actions: ['Marche 5 min dans la maison', 'Délordose 10 min'] },
          { day: 'Jour 2', actions: ['Marche 5 min', 'Respiration 5 min', 'Bouger toutes les 30 min'] },
          { day: 'Jour 3', actions: ['Marche 7-10 min', 'Exercices couchés 5 min'] },
          { day: 'Jour 4', actions: ['Marche 10 min', 'Exercices 10 min'] },
          { day: 'Jour 5', actions: ['Marche 15 min', 'Exercices + gainage léger'] },
          { day: 'Jour 6', actions: ['Marche 15-20 min', 'Gainage', 'Étirements soir'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Notez comment vous vous sentez'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Ça va mieux',
        days: [
          { day: 'Jour 1', actions: ['Marche 15 min', 'Exercices 15 min', 'Étirements soir'] },
          { day: 'Jour 2', actions: ['Marche 20 min', 'Exercices 15 min', 'Pause toutes les 45 min'] },
          { day: 'Jour 3', actions: ['Marche 25 min', 'Exercices 20 min'] },
          { day: 'Jour 4', actions: ['Vélo 25 min', 'Exercices 20 min', 'Relaxation'] },
          { day: 'Jour 5', actions: ['Marche 30 min', 'Exercices 20 min'] },
          { day: 'Jour 6', actions: ['Activité plaisir 30 min', 'Exercices', 'Étirements'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Bilan de la semaine'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — Je reprends confiance',
        days: [
          { day: 'Jour 1', actions: ['Cardio 30 min', 'Renforcement dos/abdos 20 min'] },
          { day: 'Jour 2', actions: ['Marche 35 min', 'Exercices 20 min', 'Étirements'] },
          { day: 'Jour 3', actions: ['Cardio 35 min', 'Renforcement 25 min'] },
          { day: 'Jour 4', actions: ['Activité plaisir 40 min', 'Gainage 15 min'] },
          { day: 'Jour 5', actions: ['Cardio 40 min', 'Renforcement 25 min'] },
          { day: 'Jour 6', actions: ['Sport ou longue marche', 'Exercices + étirements'] },
          { day: 'Jour 7', actions: ['Repos actif : yoga doux'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je me sens bien',
        days: [
          { day: 'Jour 1', actions: ['Cardio 45 min', 'Renforcement 30 min'] },
          { day: 'Jour 2', actions: ['Sport 45-60 min', 'Gainage 15 min'] },
          { day: 'Jour 3', actions: ['Cardio varié 45 min', 'Renforcement + équilibre'] },
          { day: 'Jour 4', actions: ['Sport plaisir 1h', 'Stretching'] },
          { day: 'Jour 5', actions: ['Cardio 50 min', 'Renforcement 30 min'] },
          { day: 'Jour 6', actions: ['Activité longue', 'Récupération'] },
          { day: 'Jour 7', actions: ['Repos actif'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Très facile — Je redémarre',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Reprendre le mouvement', exercises: ['Marche 5-10 min 2x/jour', 'Exercices au sol 10 min', 'Éviter assis > 30 min'] },
          { week: 'Semaines 3-4', focus: 'Progresser doucement', exercises: ['Marche 15-20 min/jour', 'Exercices + gainage débutant'] },
          { week: 'Semaines 5-6', focus: 'Renforcer', exercises: ['Marche 25 min', 'Exercices + gainage 20 min'] },
          { week: 'Semaines 7-8', focus: 'Stabiliser', exercises: ['Marche 30 min/jour', 'Routine complète', 'Objectif niveau 1'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je progresse',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Renforcer la base', exercises: ['Cardio léger 25 min/jour', 'Exercices dos/abdos 20 min'] },
          { week: 'Semaines 3-4', focus: 'Augmenter', exercises: ['Cardio 30 min', 'Renforcement 25 min'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Alterner marche/vélo/natation 35 min'] },
          { week: 'Semaines 7-8', focus: 'Vers l\'autonomie', exercises: ['Cardio 40 min', 'Programme personnel'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — J\'ai une bonne base',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Structurer', exercises: ['Cardio 40 min 5x/sem', 'Renforcement 25 min 4x/sem'] },
          { week: 'Semaines 3-4', focus: 'Intensifier', exercises: ['Cardio 45 min', 'Renforcement + proprioception'] },
          { week: 'Semaines 5-6', focus: 'Performance douce', exercises: ['Cardio varié 45 min', 'Sport plaisir 1x/sem'] },
          { week: 'Semaines 7-8', focus: 'Maintien', exercises: ['Programme autonome', 'Prévention long terme'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je maintiens',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Cardio 50 min', 'Renforcement avancé'] },
          { week: 'Semaines 3-4', focus: 'Sport régulier', exercises: ['2-3 séances sport/sem', 'Gainage quotidien'] },
          { week: 'Semaines 5-6', focus: 'Équilibre vie active', exercises: ['Sport plaisir régulier', 'Étirements quotidiens'] },
          { week: 'Semaines 7-8', focus: 'Long terme', exercises: ['Routine personnelle durable'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        '½ assiette de légumes variés',
        '¼ de protéines (poisson, volaille, œufs, légumineuses)',
        '¼ de féculents complets',
        'Huile d\'olive ou colza (oméga-3 anti-inflammatoires)',
      ],
      commonMistakes: [
        'Trop de sucre et ultra-transformés → inflammatoires',
        'Pas assez de protéines → muscles s\'affaiblissent',
        'Oublier de boire → les disques sont composés d\'eau',
      ],
      tips: [
        'Hydratez-vous : 1,5 à 2L/jour',
        'Poissons gras, légumes verts, fruits rouges = anti-inflammatoire',
        'Si surpoids : même 5% de poids en moins soulage le dos',
      ],
    },

    flareProtocol: {
      title: 'Crise lombaire — Les 48 premières heures',
      hours0to24: [
        'Ne vous allongez pas toute la journée : bougez 5 min',
        'Position de délordose : genoux fléchis sur coussin, 15-20 min',
        'Chaleur sur les lombaires si contractures',
        'Respiration abdominale 5 min, 3-4 fois',
        'Marche lente dans la maison',
      ],
      hours24to48: [
        'Augmentez les périodes de marche',
        'Reprenez les exercices très doux',
        'Alternez debout/assis/couché',
        'Dormez avec coussin entre les genoux',
      ],
      resumeActivity: 'Si la douleur baisse de moitié, reprenez au niveau en dessous. Si ça reste intense ou fourmillements dans les jambes : consultez.',
    },

    alertSigns: [
      'Perte de contrôle des urines ou selles',
      'Engourdissement de la zone entre les jambes',
      'Faiblesse progressive des deux jambes',
      'Douleur intense qui réveille chaque nuit',
      'Fièvre associée',
      'Perte de poids inexpliquée avec douleur dorsale',
    ],

    sources: [
      { name: 'NICE Guidelines — Low back pain', year: 2020 },
      { name: 'HAS — Lombalgie commune', year: 2019 },
      { name: 'Lancet Series on Low Back Pain', year: 2018 },
    ],
  },

  // ========== INSUFFISANCE VEINEUSE ==========
  {
    id: 'insuffisance-veineuse-chronique',
    slug: 'insuffisance-veineuse-chronique',
    type: 'pathology',
    title: 'Insuffisance veineuse chronique',
    shortDescription: 'Je vous aide à soulager vos jambes lourdes au quotidien.',
    category: 'veino-lymphatique',
    audience: 'senior',
    tags: ['comprendre', 'bouger', 'plan-simple', 'habitudes', 'pdf'],
    readingTime: 7,
    lastUpdated: 'Janvier 2025',
    isPublished: true,

    quickSummary: `Vos jambes sont lourdes, gonflent en fin de journée, vous avez des varices ? C'est l'insuffisance veineuse. Le sang a du mal à remonter vers le cœur et stagne.

La bonne nouvelle : vous avez dans vos mollets une "pompe" naturelle. À chaque pas, vos muscles compriment les veines et propulsent le sang vers le haut.

Porter des bas de contention, surélever les jambes le soir, éviter la chaleur — ces gestes simples font une vraie différence. Si les symptômes persistent, un professionnel de santé pourra évaluer votre situation.`,

    physiopathology: `Vos veines des jambes contiennent de petites valves, comme des portes battantes qui empêchent le sang de redescendre.

Avec le temps, ces valves peuvent s'affaiblir. Le sang stagne, les veines se dilatent (ce sont les varices), et du liquide s'accumule.

Votre meilleure alliée ? La pompe musculaire du mollet. À chaque pas, vos muscles compriment les veines. C'est pourquoi rester immobile aggrave le problème, et marcher l'améliore.`,

    top5Tips: [
      {
        title: 'Marcher tous les jours',
        description: '30 min de marche active la pompe du mollet. C\'est le traitement n°1.',
        icon: '🚶',
      },
      {
        title: 'Porter des bas de contention',
        description: 'Je vous les prescris, ils sont remboursés. Mettez-les le matin au réveil.',
        icon: '🧦',
      },
      {
        title: 'Surélever les jambes',
        description: '15-20 min, 2 fois/jour. Surélevez aussi les pieds du lit de 10-15 cm.',
        icon: '🦶',
      },
      {
        title: 'Éviter la chaleur',
        description: 'Pas de bains trop chauds, pas de sauna, évitez le soleil sur les jambes.',
        icon: '❄️',
      },
      {
        title: 'Exercices de mollets',
        description: 'Flexion-extension des pieds, montées sur pointes. Plusieurs fois/jour.',
        icon: '💪',
      },
    ],

    dailyPlans: [
      {
        level: 0,
        levelName: 'Version très facile',
        actions: [
          'Surélever les jambes 15 min (sur coussin ou mur)',
          'Flexion-extension des pieds 20 fois, assis, 3x/jour',
          'Marcher 5 min dans la maison',
        ],
      },
      {
        level: 1,
        levelName: 'Version normale',
        actions: [
          '20-30 min de marche à votre rythme',
          'Exercices de mollets 10 min',
          'Surélévation des jambes le soir 15-20 min',
        ],
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Très facile — Je bouge peu',
        days: [
          { day: 'Jour 1', actions: ['Surélever jambes 15 min 2x', 'Flexions pieds 20x 3 fois', 'Marche 5 min'] },
          { day: 'Jour 2', actions: ['Surélévation', 'Exercices pieds', 'Marche 2x5 min', 'Jet d\'eau fraîche'] },
          { day: 'Jour 3', actions: ['Surélévation', 'Exercices + pédalage couché 2 min', 'Marche 10 min'] },
          { day: 'Jour 4', actions: ['Surélévation', 'Exercices complets', 'Marche 10-15 min'] },
          { day: 'Jour 5', actions: ['Surélévation', 'Exercices', 'Marche 15 min'] },
          { day: 'Jour 6', actions: ['Surélévation', 'Exercices complets', 'Marche 15-20 min'] },
          { day: 'Jour 7', actions: ['Repos actif, surélévation', 'Notez vos progrès'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je peux marcher 15 min',
        days: [
          { day: 'Jour 1', actions: ['Surélévation 15 min 2x', 'Exercices 10 min', 'Marche 15 min'] },
          { day: 'Jour 2', actions: ['Surélévation', 'Exercices + montées sur pointes', 'Marche 20 min'] },
          { day: 'Jour 3', actions: ['Surélévation', 'Exercices 15 min', 'Marche 20 min', 'Douche fraîche'] },
          { day: 'Jour 4', actions: ['Surélévation', 'Exercices + marche sur pointes', 'Marche 25 min'] },
          { day: 'Jour 5', actions: ['Surélévation', 'Exercices 15 min', 'Marche 25 min'] },
          { day: 'Jour 6', actions: ['Surélévation', 'Exercices', 'Marche ou vélo 30 min'] },
          { day: 'Jour 7', actions: ['Repos actif, surélévation'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — Je suis assez actif',
        days: [
          { day: 'Jour 1', actions: ['Surélévation soir', 'Marche 30 min', 'Exercices 15 min'] },
          { day: 'Jour 2', actions: ['Marche 35 min ou natation 20 min', 'Exercices + escaliers'] },
          { day: 'Jour 3', actions: ['Cardio 35 min', 'Renforcement mollets', 'Surélévation'] },
          { day: 'Jour 4', actions: ['Marche ou vélo 35 min', 'Exercices complets'] },
          { day: 'Jour 5', actions: ['Cardio 40 min', 'Exercices 15 min'] },
          { day: 'Jour 6', actions: ['Activité plaisir 40 min', 'Étirements et surélévation'] },
          { day: 'Jour 7', actions: ['Repos actif : marche légère'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je fais du sport',
        days: [
          { day: 'Jour 1', actions: ['Cardio 45 min', 'Renforcement 20 min'] },
          { day: 'Jour 2', actions: ['Marche rapide ou vélo 45 min', 'Exercices mollets'] },
          { day: 'Jour 3', actions: ['Cardio 45 min', 'Renforcement jambes'] },
          { day: 'Jour 4', actions: ['Natation ou aquagym 45 min'] },
          { day: 'Jour 5', actions: ['Cardio 50 min', 'Exercices proprioception'] },
          { day: 'Jour 6', actions: ['Sport plaisir 1h', 'Surélévation récup'] },
          { day: 'Jour 7', actions: ['Repos actif : natation douce'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Très facile — Je démarre',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Activer la pompe', exercises: ['Surélévation 2x15 min/jour', 'Flexion pieds 3x20/jour', 'Marche 5-10 min 2x/jour'] },
          { week: 'Semaines 3-4', focus: 'Augmenter la marche', exercises: ['Surélévation quotidienne', 'Exercices 10 min', 'Marche 20 min/jour'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Marche 25 min', 'Montées sur pointes', 'Douche fraîche quotidienne'] },
          { week: 'Semaines 7-8', focus: 'Consolider', exercises: ['Marche 30 min/jour', 'Routine établie'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je progresse',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Base solide', exercises: ['Marche 25 min/jour', 'Exercices 15 min', 'Surélévation 2x/jour'] },
          { week: 'Semaines 3-4', focus: 'Progression', exercises: ['Marche 30 min ou vélo 20 min', 'Exercices + renforcement mollets'] },
          { week: 'Semaines 5-6', focus: 'Endurance', exercises: ['Cardio 35 min', 'Exercices complets', 'Escaliers'] },
          { week: 'Semaines 7-8', focus: 'Autonomie', exercises: ['Cardio 40 min', 'Programme personnel'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — J\'ai une bonne base',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Structurer', exercises: ['Cardio 40 min 5x/sem', 'Renforcement 20 min'] },
          { week: 'Semaines 3-4', focus: 'Intensifier', exercises: ['Cardio 45 min', 'Renforcement + proprioception'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Alterner marche/vélo/natation 45 min'] },
          { week: 'Semaines 7-8', focus: 'Maintien', exercises: ['Programme autonome', 'Sport 2-3x/sem'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je maintiens',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Cardio 50 min', 'Renforcement avancé'] },
          { week: 'Semaines 3-4', focus: 'Sport régulier', exercises: ['Sport 3-4x/sem', 'Natation 1x/sem'] },
          { week: 'Semaines 5-6', focus: 'Performance', exercises: ['Entraînement varié'] },
          { week: 'Semaines 7-8', focus: 'Vie active', exercises: ['Activité quotidienne intégrée'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        'Fruits rouges (myrtilles, cassis, framboises) — renforcent les parois veineuses',
        'Légumes verts à chaque repas',
        'Poisson 2-3x/semaine',
        'Eau : au moins 1,5L/jour',
      ],
      commonMistakes: [
        'Trop de sel → rétention d\'eau, jambes gonflées',
        'Pas assez d\'eau → le sang s\'épaissit',
        'Rester assis jambes croisées → comprime les veines',
      ],
      tips: [
        'Limitez le sel : évitez plats préparés et charcuterie',
        'Mangez des flavonoïdes : agrumes, thé vert, baies',
        'Évitez l\'alcool qui dilate les veines',
      ],
    },

    alertSigns: [
      'Jambe brutalement gonflée, rouge et chaude (risque de phlébite)',
      'Douleur intense dans le mollet',
      'Ulcère de jambe qui ne guérit pas',
      'Fièvre avec jambe inflammatoire',
      'Essoufflement brutal (risque d\'embolie pulmonaire)',
    ],

    sources: [
      { name: 'HAS — Insuffisance veineuse chronique', year: 2014 },
      { name: 'European Society for Vascular Surgery Guidelines', year: 2022 },
      { name: 'International Compression Club Recommendations', year: 2020 },
    ],
  },

  // ========== BPCO ==========
  {
    id: 'bpco',
    slug: 'bpco',
    type: 'pathology',
    title: 'BPCO',
    shortDescription: 'Je vous accompagne pour mieux respirer au quotidien.',
    category: 'orl-respiratoire',
    audience: 'adulte',
    tags: ['comprendre', 'bouger', 'plan-simple', 'pdf'],
    readingTime: 8,
    lastUpdated: 'Janvier 2025',
    isPublished: true,

    quickSummary: `Vous êtes essoufflé au moindre effort ? Vous toussez souvent ? La BPCO touche vos poumons, mais ne vous condamne pas à l'immobilité.

Je sais que c'est frustrant. Mais moins on bouge, plus les muscles s'affaiblissent, et plus on s'essouffle vite. C'est un cercle vicieux qu'on peut casser.

L'activité physique adaptée est un vrai traitement. Arrêter de fumer reste essentiel. En cas d'essoufflement inhabituel ou de symptômes inquiétants, contactez un professionnel de santé.`,

    physiopathology: `Vos bronches sont comme des tuyaux. Avec la BPCO, les parois de ces tuyaux sont irritées (souvent par le tabac) et s'épaississent. L'air passe moins bien.

En même temps, les petits sacs d'air (alvéoles) au bout des bronches s'abîment. L'oxygène passe moins bien dans le sang.

La bonne nouvelle : on peut stabiliser la maladie et améliorer la qualité de vie avec l'arrêt du tabac, les traitements, et l'activité physique adaptée.`,

    top5Tips: [
      {
        title: 'Arrêter de fumer',
        description: 'C\'est le traitement le plus efficace. Chaque journée sans tabac, vos poumons récupèrent un peu.',
        icon: '🚭',
      },
      {
        title: 'Bouger tous les jours',
        description: 'Même 10 min de marche. Les muscles entraînés demandent moins d\'oxygène.',
        icon: '🚶',
      },
      {
        title: 'Respiration lèvres pincées',
        description: 'Inspirez par le nez (2 sec), expirez lentement par les lèvres presque fermées (4 sec). Ça aide vraiment.',
        icon: '💨',
      },
      {
        title: 'Prendre les traitements',
        description: 'Bronchodilatateurs, corticoïdes inhalés... Ils ouvrent les bronches et réduisent l\'inflammation.',
        icon: '💊',
      },
      {
        title: 'Vaccinations à jour',
        description: 'Grippe chaque année, pneumocoque, COVID. Les infections aggravent la BPCO.',
        icon: '💉',
      },
    ],

    dailyPlans: [
      {
        level: 0,
        levelName: 'Version très facile',
        actions: [
          'Respiration lèvres pincées 5 min, 3x/jour',
          'Marche 5 min, même très lentement',
          'Exercices de bras assis 5 min',
        ],
      },
      {
        level: 1,
        levelName: 'Version normale',
        actions: [
          'Exercices respiratoires 10 min',
          'Marche 15-20 min à votre rythme',
          'Exercices d\'entretien musculaire 10 min',
        ],
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Très facile — Je m\'essouffle vite',
        days: [
          { day: 'Jour 1', actions: ['Respiration lèvres pincées 3x', 'Marche 5 min', 'Noter l\'essoufflement'] },
          { day: 'Jour 2', actions: ['Respiration abdominale 5 min', 'Marche 7 min', 'Éviter les irritants'] },
          { day: 'Jour 3', actions: ['Marche 10 min (même lentement)', 'Exercices bras assis', 'Aérer'] },
          { day: 'Jour 4', actions: ['Marche 10 min', 'Montée quelques marches', 'Respiration'] },
          { day: 'Jour 5', actions: ['Marche 12 min', 'Exercices 10 min', 'Hydratation++'] },
          { day: 'Jour 6', actions: ['Marche 15 min', 'Exercices 10 min', 'Noter les progrès'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Bilan de la semaine'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je peux marcher un peu',
        days: [
          { day: 'Jour 1', actions: ['Exercices respiratoires 10 min', 'Marche 15 min', 'Hydratation 1,5L'] },
          { day: 'Jour 2', actions: ['Respiration + exercices bras 15 min', 'Marche 20 min'] },
          { day: 'Jour 3', actions: ['Marche 20 min', 'Exercices complets 15 min'] },
          { day: 'Jour 4', actions: ['Marche + escaliers', 'Exercices 15 min'] },
          { day: 'Jour 5', actions: ['Marche 25 min', 'Exercices 20 min'] },
          { day: 'Jour 6', actions: ['Activité plaisir 30 min', 'Exercices'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Bilan'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — Je progresse bien',
        days: [
          { day: 'Jour 1', actions: ['Exercices 20 min', 'Marche 30 min'] },
          { day: 'Jour 2', actions: ['Marche ou vélo 35 min', 'Exercices 20 min'] },
          { day: 'Jour 3', actions: ['Cardio 35 min', 'Renforcement 20 min'] },
          { day: 'Jour 4', actions: ['Activité plaisir 40 min', 'Exercices respiratoires'] },
          { day: 'Jour 5', actions: ['Cardio 40 min', 'Renforcement 20 min'] },
          { day: 'Jour 6', actions: ['Sport ou longue marche', 'Récupération'] },
          { day: 'Jour 7', actions: ['Repos actif'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je suis stabilisé',
        days: [
          { day: 'Jour 1', actions: ['Cardio 45 min', 'Renforcement 25 min'] },
          { day: 'Jour 2', actions: ['Sport 45 min', 'Exercices respiratoires'] },
          { day: 'Jour 3', actions: ['Cardio varié 45 min', 'Renforcement'] },
          { day: 'Jour 4', actions: ['Sport plaisir 1h'] },
          { day: 'Jour 5', actions: ['Cardio 50 min', 'Renforcement 25 min'] },
          { day: 'Jour 6', actions: ['Activité longue', 'Récupération'] },
          { day: 'Jour 7', actions: ['Repos actif'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Très facile — Je démarre',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Reprendre confiance', exercises: ['Respiration 3x/jour', 'Marche 5-10 min 2x/jour', 'Exercices assis'] },
          { week: 'Semaines 3-4', focus: 'Progresser', exercises: ['Marche 15-20 min/jour', 'Exercices debout'] },
          { week: 'Semaines 5-6', focus: 'Renforcer', exercises: ['Marche 25 min', 'Exercices + quelques escaliers'] },
          { week: 'Semaines 7-8', focus: 'Consolider', exercises: ['Marche 30 min', 'Routine établie', 'Objectif niveau 1'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je progresse',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Base solide', exercises: ['Cardio léger 25 min/jour', 'Exercices 15 min'] },
          { week: 'Semaines 3-4', focus: 'Augmenter', exercises: ['Cardio 30 min', 'Exercices 20 min'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Alterner marche/vélo 35 min'] },
          { week: 'Semaines 7-8', focus: 'Autonomie', exercises: ['Cardio 40 min', 'Programme personnel'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — J\'ai une bonne base',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Structurer', exercises: ['Cardio 40 min 5x/sem', 'Renforcement 20 min'] },
          { week: 'Semaines 3-4', focus: 'Intensifier', exercises: ['Cardio 45 min', 'Renforcement + respiration'] },
          { week: 'Semaines 5-6', focus: 'Performance', exercises: ['Cardio varié 45 min'] },
          { week: 'Semaines 7-8', focus: 'Maintien', exercises: ['Programme autonome', 'Sport 2-3x/sem'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je maintiens',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Cardio 50 min', 'Renforcement avancé'] },
          { week: 'Semaines 3-4', focus: 'Sport régulier', exercises: ['Sport 3-4x/sem', 'Exercices respiratoires maintenus'] },
          { week: 'Semaines 5-6', focus: 'Équilibre', exercises: ['Activité quotidienne'] },
          { week: 'Semaines 7-8', focus: 'Long terme', exercises: ['Mode de vie actif', 'Surveillance régulière'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        'Protéines à chaque repas — vos muscles respiratoires en ont besoin',
        'Légumes variés pour les antioxydants',
        'Féculents en quantité modérée — éviter le surpoids',
        'Eau : au moins 1,5L — ça fluidifie le mucus',
      ],
      commonMistakes: [
        'Manger trop en une fois → l\'estomac plein comprime le diaphragme',
        'Pas assez de protéines → fonte musculaire',
        'Sauter des repas → faiblesse et fatigue',
      ],
      tips: [
        'Mangez plus le matin et midi, léger le soir',
        'Fractionnez en 5-6 petits repas si vous êtes essoufflé en mangeant',
        'Repos 30 min après les repas',
      ],
    },

    flareProtocol: {
      title: 'Exacerbation BPCO — Les 48 premières heures',
      hours0to24: [
        'Repos relatif mais pas alitement total',
        'Augmentez les exercices respiratoires (lèvres pincées)',
        'Hydratez-vous abondamment',
        'Prenez vos traitements comme prescrits',
        'Surveillez : fièvre, changement de couleur des crachats',
        'Si aggravation franche : contactez-moi',
      ],
      hours24to48: [
        'Si amélioration : reprenez très doucement',
        'Continuez hydratation et exercices respiratoires',
        'Marche très courte (5 min) si supportée',
        'Si pas d\'amélioration : consultez',
      ],
      resumeActivity: 'Attendez 2-3 jours après la fin des symptômes. Recommencez au niveau en dessous. Si exacerbations fréquentes : on en parle.',
    },

    alertSigns: [
      'Essoufflement brutal et intense',
      'Lèvres ou ongles bleutés',
      'Confusion, somnolence anormale',
      'Fièvre élevée avec crachats purulents',
      'Douleur thoracique',
      'Toux sanglante',
      'Impossibilité de parler',
    ],

    sources: [
      { name: 'GOLD Guidelines (Global Initiative for COPD)', year: 2024 },
      { name: 'HAS — Guide parcours BPCO', year: 2022 },
      { name: 'European Respiratory Society Guidelines', year: 2023 },
    ],
  },

  // ========== OTITES À RÉPÉTITION ==========
  {
    id: 'otites-a-repetition-enfant',
    slug: 'otites-a-repetition-enfant',
    type: 'pathology',
    title: 'Otites à répétition (enfant)',
    shortDescription: 'Je vous aide à réduire les otites de votre enfant.',
    category: 'orl-respiratoire',
    audience: 'parent',
    tags: ['comprendre', 'habitudes', 'plan-simple', 'consulter', 'pdf'],
    readingTime: 7,
    lastUpdated: 'Janvier 2025',
    isPublished: true,

    quickSummary: `Votre enfant a souvent mal aux oreilles ? Les otites à répétition (plus de 3-4 par an) sont fréquentes chez les petits. Je sais, c'est épuisant pour vous et douloureux pour lui.

La bonne nouvelle : la plupart des otites guérissent spontanément. Et avec quelques gestes simples — lavage de nez, aération, hygiène — on peut vraiment réduire les récidives.

La trompe d'Eustache grandit avec lui, et en général ça s'améliore vers 5-6 ans. En cas de fièvre élevée ou de symptômes inquiétants, consultez rapidement un professionnel de santé.`,

    physiopathology: `L'oreille moyenne (derrière le tympan) est reliée au nez par un petit tube : la trompe d'Eustache.

Chez l'enfant, ce tube est court, horizontal et immature. Quand votre enfant a un rhume, les microbes montent facilement vers l'oreille. La trompe se bouche, du liquide s'accumule et s'infecte.

Ce qui favorise les otites : collectivité (crèche), tabagisme passif, tétine après 6 mois, allergies. L'allaitement maternel protège. Avec l'âge, la trompe grandit et ça va mieux.`,

    top5Tips: [
      {
        title: 'Laver le nez régulièrement',
        description: 'Sérum physiologique ou spray eau de mer, plusieurs fois/jour quand le nez coule. Ça dégage la trompe.',
        icon: '💧',
      },
      {
        title: 'Aérer et dépoussiérer',
        description: '10-15 min d\'aération/jour. Évitez poussière, acariens, fumée. Chambre propre et ventilée.',
        icon: '🌬️',
      },
      {
        title: 'Moucher correctement',
        description: 'Une narine après l\'autre, doucement. Apprenez-lui dès que possible. Mouchoirs jetables.',
        icon: '🤧',
      },
      {
        title: 'Limiter la tétine',
        description: 'Après 6 mois, la tétine favorise les otites. Gardez-la seulement pour l\'endormissement.',
        icon: '👶',
      },
      {
        title: 'Pas de tabac à la maison',
        description: 'Le tabagisme passif irrite les voies respiratoires. Jamais de cigarette à l\'intérieur.',
        icon: '🚭',
      },
    ],

    dailyPlans: [
      {
        level: 0,
        levelName: 'Prévention quotidienne',
        actions: [
          'Lavage de nez matin et soir avec sérum physiologique',
          'Aérer la chambre 10 minutes',
          'Vérifier l\'humidité (40-60%)',
        ],
      },
      {
        level: 1,
        levelName: 'Pendant un rhume',
        actions: [
          'Lavages de nez 4-5 fois/jour',
          'Surélever légèrement la tête du lit',
          'Hydrater++ : proposer à boire souvent',
        ],
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Prévention quotidienne',
        days: [
          { day: 'Jour 1', actions: ['Lavage nez matin et soir', 'Aérer chambre 10 min', 'Vérifier humidité'] },
          { day: 'Jour 2', actions: ['Lavages 2-3x', 'Aérer', 'Nettoyer jouets et doudous'] },
          { day: 'Jour 3', actions: ['Lavages', 'Aérer', 'Proposer à boire régulièrement'] },
          { day: 'Jour 4', actions: ['Lavages', 'Aérer', 'Vérifier pas de tabagisme passif'] },
          { day: 'Jour 5', actions: ['Lavages', 'Aérer', 'Limiter la tétine'] },
          { day: 'Jour 6', actions: ['Lavages', 'Aérer', 'Sortie au grand air'] },
          { day: 'Jour 7', actions: ['Bilan : les gestes sont-ils des habitudes ?'] },
        ],
      },
      {
        level: 1,
        levelName: 'Pendant un rhume (prévenir l\'otite)',
        days: [
          { day: 'Jour 1', actions: ['Lavages 4-5x/jour', 'Surélever tête du lit', 'Hydrater++'] },
          { day: 'Jour 2', actions: ['Lavages fréquents', 'Moucher régulièrement', 'Repos calme'] },
          { day: 'Jour 3', actions: ['Lavages', 'Surveiller fièvre et comportement', 'Aérer'] },
          { day: 'Jour 4', actions: ['Lavages', 'Si fièvre persiste ou douleur oreille : consultez'] },
          { day: 'Jour 5', actions: ['Lavages', 'Normalement amélioration du rhume'] },
          { day: 'Jour 6', actions: ['Lavages', 'Reprendre activités si mieux'] },
          { day: 'Jour 7', actions: ['Maintenir les lavages quelques jours encore'] },
        ],
      },
      {
        level: 2,
        levelName: 'Après une otite (éviter la récidive)',
        days: [
          { day: 'Jour 1', actions: ['Continuer les lavages', 'Repos', 'Hydratation'] },
          { day: 'Jour 2', actions: ['Lavages', 'Reprise progressive'] },
          { day: 'Jour 3', actions: ['Lavages', 'Aérer la chambre++', 'Laver doudous à 60°C'] },
          { day: 'Jour 4', actions: ['Lavages', 'Éviter lieux très fréquentés si possible'] },
          { day: 'Jour 5', actions: ['Lavages', 'Retour collectivité si plus de fièvre depuis 24h'] },
          { day: 'Jour 6', actions: ['Maintenir bonnes habitudes'] },
          { day: 'Jour 7', actions: ['Continuer la prévention'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Programme prévention long terme',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Installer les routines', exercises: ['Lavages matin/soir', 'Aération quotidienne', 'Vérifier humidité (40-60%)'] },
          { week: 'Semaines 3-4', focus: 'Hygiène environnement', exercises: ['Nettoyage chambre', 'Lavage doudous/peluches', 'Éliminer poussière'] },
          { week: 'Semaines 5-6', focus: 'Renforcer les défenses', exercises: ['Alimentation variée', 'Sorties quotidiennes', 'Sommeil suffisant'] },
          { week: 'Semaines 7-8', focus: 'Bilan', exercises: ['Moins d\'otites ?', 'Maintenir les routines', 'Si toujours fréquentes : parlez-en à votre médecin'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        'Légumes et fruits variés (vitamines C et A)',
        'Poisson 2x/semaine',
        'Produits laitiers adaptés à l\'âge',
        'Beaucoup d\'eau et de bouillons',
      ],
      commonMistakes: [
        'Trop de sucre → affaiblit les défenses',
        'Pas assez de légumes',
        'Grignotages qui coupent l\'appétit aux repas',
      ],
      tips: [
        'Vitamine D en hiver (demandez au pédiatre)',
        'Évitez le biberon couché (risque de reflux → otites)',
        'Allaitez si possible les premiers mois (protecteur)',
      ],
    },

    alertSigns: [
      'Fièvre élevée (> 39°C) qui persiste plus de 48h',
      'Écoulement de l\'oreille (liquide ou pus)',
      'Enfant très fatigué, difficile à réveiller',
      'Refus de boire ou de manger',
      'Douleur intense non calmée par le paracétamol',
      'Gonflement ou rougeur derrière l\'oreille',
      'Problèmes d\'équilibre, vertiges',
    ],

    sources: [
      { name: 'AAP Guidelines — Otitis Media', year: 2016 },
      { name: 'HAS — Infections respiratoires hautes', year: 2021 },
      { name: 'Société Française de Pédiatrie', year: 2022 },
    ],
  },
];

// ============================================
// DONNÉES: RÉPONSES RAPIDES
// ============================================

export const quickAnswers: QuickAnswerContent[] = [
  {
    id: 'perdre-poids',
    slug: 'perdre-poids',
    type: 'quick-answer',
    title: 'Perdre du poids sans recette miracle',
    subtitle: 'La vérité simple et un plan réaliste',
    icon: '⚖️',
    color: 'primary',
    category: 'guides-transversaux',
    audience: 'adulte',
    tags: ['plan-simple', 'nutrition', 'habitudes'],
    isPublished: true,

    intro: `Je sais que vous avez probablement déjà tout essayé. Régimes, privations, promesses... Je vais être honnête : il n'existe pas de recette miracle. Mais il existe une méthode simple qui fonctionne. Elle demande du temps et de la patience, mais elle marche vraiment.`,

    truths: [
      {
        myth: '« Je dois faire un régime restrictif pour maigrir. »',
        truth: 'Les régimes restrictifs font perdre du poids rapidement... puis le reprendre avec des kilos en plus. Ce qui marche : manger un peu moins, un peu mieux, durablement.',
      },
      {
        myth: '« Je dois faire du sport intensif. »',
        truth: 'Marcher 30 min/jour est plus efficace que 2h de sport le week-end. L\'activité régulière et modérée est la clé.',
      },
      {
        myth: '« C\'est une question de volonté. »',
        truth: 'C\'est une question d\'environnement et d\'habitudes. Changez vos automatismes, pas votre volonté.',
      },
    ],

    dailyPlan: [
      { time: 'Ce matin', action: 'Buvez un grand verre d\'eau au réveil', detail: 'Avant le café, avant tout. Ça réveille votre corps.' },
      { time: 'À midi', action: 'Remplissez la moitié de votre assiette de légumes', detail: 'N\'importe lesquels. La moitié de l\'assiette.' },
      { time: 'Ce soir', action: 'Marchez 15 min après le dîner', detail: '15 min autour du pâté de maisons. Votre nouveau rituel.' },
    ],

    sevenDayPlan: [
      { day: 'Jour 1', actions: ['Légumes à chaque repas', '15 min de marche', 'Pas de grignotage après 20h'] },
      { day: 'Jour 2', actions: ['Petit-déjeuner avec protéines', 'Marche 20 min', 'Boire 1,5L'] },
      { day: 'Jour 3', actions: ['Pas de boisson sucrée', 'Escaliers plutôt qu\'ascenseur', 'Dîner léger'] },
      { day: 'Jour 4', actions: ['Cuisiner un repas maison', 'Marche 25 min', 'Se peser (1 seule fois/semaine)'] },
      { day: 'Jour 5', actions: ['Manger lentement', 'Marche 20 min', 'Fruits en dessert'] },
      { day: 'Jour 6', actions: ['Un petit écart raisonnable', 'Marche 30 min', 'Pas de culpabilité'] },
      { day: 'Jour 7', actions: ['Bilan de la semaine', 'Préparer les menus', 'Se féliciter'] },
    ],

    alertSigns: [
      'Fatigue intense et inhabituelle',
      'Perte de poids très rapide (plus de 2 kg/semaine)',
      'Douleurs abdominales persistantes',
      'Obsession, culpabilité excessive',
      'Envie de vomir après les repas',
    ],

    closingMessage: 'Perdre du poids prend du temps. Un kilo par mois, c\'est déjà très bien. Si vous ressentez le besoin d\'un accompagnement, un professionnel de santé peut vous aider.',
  },

  {
    id: 'arreter-fumer',
    slug: 'arreter-fumer',
    type: 'quick-answer',
    title: 'Arrêter de fumer',
    subtitle: 'C\'est possible, à votre rythme',
    icon: '🚭',
    color: 'secondary',
    category: 'guides-transversaux',
    audience: 'adulte',
    tags: ['plan-simple', 'habitudes'],
    isPublished: true,

    intro: `Je ne vais pas vous faire la morale. Vous savez que le tabac est mauvais. Ce que je veux, c'est vous aider concrètement si vous avez décidé d'essayer. Et si vous n'êtes pas encore prêt, gardez cette fiche pour plus tard.`,

    truths: [
      {
        myth: '« Fumer quelques cigarettes par jour, ce n\'est pas grave. »',
        truth: 'Il n\'existe pas de seuil sans risque. Même 1 à 4 cigarettes/jour augmentent le risque cardiovasculaire. Mais réduire est déjà un progrès.',
      },
      {
        myth: '« J\'arrête d\'un coup ou pas du tout. »',
        truth: 'Les deux approches fonctionnent. Certains préfèrent réduire progressivement. L\'important : trouver ce qui marche pour vous.',
      },
      {
        myth: '« Je vais grossir si j\'arrête. »',
        truth: 'En moyenne 2-4 kg, pas 10. Ce poids peut être géré. Les bénéfices de l\'arrêt sont infiniment supérieurs.',
      },
    ],

    dailyPlan: [
      { time: 'Maintenant', action: 'Retardez votre prochaine cigarette de 30 min', detail: 'L\'envie passe en 3-5 min. Buvez de l\'eau, faites autre chose.' },
      { time: 'Aujourd\'hui', action: 'Notez chaque cigarette fumée', detail: 'L\'heure et la raison. Sans vous juger.' },
      { time: 'Ce soir', action: 'Identifiez votre "cigarette la plus facile à supprimer"', detail: 'Celle que vous fumez par automatisme. C\'est celle-là qu\'on supprimera demain.' },
    ],

    sevenDayPlan: [
      { day: 'Jour 1', actions: ['Noter toutes les cigarettes', 'Identifier les moments à risque', 'Retarder la première du matin'] },
      { day: 'Jour 2', actions: ['Supprimer 1 cigarette automatique', 'Boire plus d\'eau', 'Préparer des occupations pour les mains'] },
      { day: 'Jour 3', actions: ['Supprimer 2 cigarettes', 'Marcher 10 min quand l\'envie est forte', 'Ranger les cendriers'] },
      { day: 'Jour 4', actions: ['Ne plus fumer en intérieur', 'Appeler Tabac Info Service (3989)', 'Envisager les substituts'] },
      { day: 'Jour 5', actions: ['Réduire encore de 2 cigarettes', 'Trouver un "parrain" de soutien', 'Calculer l\'argent économisé'] },
      { day: 'Jour 6', actions: ['Fixer une date d\'arrêt dans 2 semaines', 'Envisager un accompagnement (tabacologue, médecin)', 'Préparer des en-cas sains'] },
      { day: 'Jour 7', actions: ['Bilan : combien en moins ?', 'Se féliciter', 'Visualiser les bénéfices'] },
    ],

    alertSigns: [
      'Douleur thoracique ou essoufflement inhabituel',
      'Toux avec sang',
      'Perte de poids inexpliquée',
      'Anxiété ou dépression sévère pendant le sevrage',
      'Envies irrépressibles malgré les substituts',
    ],

    closingMessage: 'L\'arrêt du tabac est souvent plus facile avec accompagnement. Les substituts sont remboursés. Je peux vous prescrire ce dont vous avez besoin.',
  },

  {
    id: 'arthrose-dos',
    slug: 'arthrose-dos',
    type: 'quick-answer',
    title: 'Arthrose / Mal de dos : que faire maintenant ?',
    subtitle: 'Des actions concrètes pour aujourd\'hui',
    icon: '🦴',
    color: 'accent',
    category: 'rhumatologie',
    audience: 'senior',
    tags: ['plan-simple', 'bouger'],
    isPublished: true,
    relatedPathologySlug: 'arthrose',

    intro: `Vous avez mal. C'est réel, je ne minimise pas. Mais je vais vous dire quelque chose d'important : bouger fait moins mal que rester immobile. Pas n'importe comment, pas n'importe combien. Mais bouger, oui.`,

    truths: [
      {
        myth: '« L\'arthrose, c\'est l\'usure : plus je bouge, plus ça s\'use. »',
        truth: 'C\'est l\'inverse. L\'articulation a besoin de mouvement pour se nourrir. Bouger l\'entretient.',
      },
      {
        myth: '« Je dois me reposer quand j\'ai mal au dos. »',
        truth: 'Le repos prolongé aggrave le mal de dos. Reprendre une activité légère rapidement accélère la guérison.',
      },
      {
        myth: '« Mon dos est fragile, je dois le protéger. »',
        truth: 'Votre dos est solide. La colonne vertébrale est incroyablement résistante. Vous pouvez la faire travailler.',
      },
    ],

    dailyPlan: [
      { time: 'Maintenant', action: 'Levez-vous et marchez 2 min', detail: 'Même si vous avez mal. Le mouvement va "huiler" vos articulations.' },
      { time: 'Toutes les heures', action: 'Changez de position', detail: 'Debout si assis, assis si debout. 30 secondes de mouvement.' },
      { time: 'Ce soir', action: 'Appliquez du chaud 15 min', detail: 'Une bouillotte sur la zone douloureuse. Le chaud détend les muscles.' },
    ],

    sevenDayPlan: [
      { day: 'Jour 1', actions: ['Se lever et bouger 2 min/heure', 'Marche 10 min', 'Chaleur le soir'] },
      { day: 'Jour 2', actions: ['Marche 15 min', 'Étirements 5 min', 'Noter la douleur (1-10)'] },
      { day: 'Jour 3', actions: ['Marche 15 min', 'Exercices mobilité', 'Respiration 5 min'] },
      { day: 'Jour 4', actions: ['Marche 20 min', 'Gainage doux 10 sec', 'Chaud/froid selon soulagement'] },
      { day: 'Jour 5', actions: ['Marche 20 min', 'Étirements 10 min', 'Évaluer : amélioration ?'] },
      { day: 'Jour 6', actions: ['Activité 30 min (marche, vélo, piscine)', 'Gainage 2x10 sec', 'Repos actif'] },
      { day: 'Jour 7', actions: ['Bilan de la semaine', 'Planifier la suite', 'Se féliciter'] },
    ],

    alertSigns: [
      'Douleur qui descend dans la jambe jusqu\'au pied',
      'Perte de force dans une jambe',
      'Troubles urinaires ou intestinaux',
      'Fièvre associée au mal de dos',
      'Douleur nocturne qui ne passe pas',
      'Perte de poids inexpliquée',
    ],

    closingMessage: 'Dans 90% des cas, le mal de dos s\'améliore en quelques semaines avec du mouvement adapté. Si les symptômes persistent, consultez un professionnel de santé.',
  },

  {
    id: 'jambes-lourdes',
    slug: 'jambes-lourdes',
    type: 'quick-answer',
    title: 'J\'ai les jambes lourdes',
    subtitle: 'Soulager rapidement et durablement',
    icon: '🦵',
    color: 'primary',
    category: 'veino-lymphatique',
    audience: 'senior',
    tags: ['plan-simple', 'habitudes'],
    isPublished: true,
    relatedPathologySlug: 'insuffisance-veineuse-chronique',

    intro: `Les jambes lourdes, les chevilles gonflées le soir, cette sensation de lourdeur... C'est souvent lié à une mauvaise circulation veineuse. Bonne nouvelle : beaucoup de choses simples peuvent vous soulager.`,

    truths: [
      {
        myth: '« Les varices, c\'est juste esthétique. »',
        truth: 'Les varices sont le signe d\'une insuffisance veineuse. Sans prise en charge, ça peut évoluer vers des complications.',
      },
      {
        myth: '« Je suis debout toute la journée, c\'est normal d\'avoir mal. »',
        truth: 'C\'est fréquent, mais pas une fatalité. Marcher, surélever les jambes, porter des bas de contention — ça change vraiment la donne.',
      },
      {
        myth: '« Les bas de contention, c\'est pour les vieux. »',
        truth: 'C\'est le traitement le plus efficace, à tout âge. Aujourd\'hui, ils sont fins, discrets, et remboursés.',
      },
    ],

    dailyPlan: [
      { time: 'Maintenant', action: 'Surélevez vos jambes', detail: 'Allongez-vous, jambes plus hautes que le cœur. 10 minutes.' },
      { time: 'Toutes les heures', action: 'Activez vos mollets', detail: 'Montez sur la pointe des pieds 10 fois. Les mollets sont la "pompe" du retour veineux.' },
      { time: 'Ce soir', action: 'Douche froide sur les jambes', detail: 'Terminez par un jet d\'eau fraîche des chevilles aux genoux. 30 secondes.' },
    ],

    sevenDayPlan: [
      { day: 'Jour 1', actions: ['Surélever les jambes 10 min matin et soir', 'Exercices mollets 3x10', 'Jet d\'eau froide'] },
      { day: 'Jour 2', actions: ['Marche 20 min', 'Éviter de croiser les jambes', 'Boire 1,5L'] },
      { day: 'Jour 3', actions: ['Marche 25 min', 'Surélever les pieds du lit 5 cm', 'Exercices cheville'] },
      { day: 'Jour 4', actions: ['Porter des bas de contention', 'Marche 30 min', 'Éviter le chauffage au sol'] },
      { day: 'Jour 5', actions: ['Marche ou vélo 30 min', 'Massage des jambes', 'Pas de vêtements serrés'] },
      { day: 'Jour 6', actions: ['Natation ou aquagym si possible', 'Exercices quotidiens', 'Noter l\'amélioration'] },
      { day: 'Jour 7', actions: ['Bilan', 'Si besoin de bas de contention, parlez-en à votre médecin', 'Maintenir les habitudes'] },
    ],

    alertSigns: [
      'Mollet rouge, chaud et douloureux (risque de phlébite)',
      'Douleur soudaine et intense dans une jambe',
      'Plaie qui ne cicatrise pas sur la jambe',
      'Gonflement brutal d\'une seule jambe',
      'Fièvre avec jambe gonflée',
    ],

    closingMessage: 'Les jambes lourdes se soulagent bien avec des mesures simples. Mais si les symptômes persistent, consultez pour évaluer l\'insuffisance veineuse.',
  },

  {
    id: 'essoufflement',
    slug: 'essoufflement',
    type: 'quick-answer',
    title: 'Je suis essoufflé',
    subtitle: 'Mieux respirer au quotidien',
    icon: '🫁',
    color: 'secondary',
    category: 'orl-respiratoire',
    audience: 'adulte',
    tags: ['plan-simple', 'bouger'],
    isPublished: true,
    relatedPathologySlug: 'bpco',

    intro: `L'essoufflement, c'est difficile à vivre. On a peur de bouger, peur de ne plus pouvoir respirer. Mais voilà le paradoxe : moins on bouge, plus on s'essouffle. Je vais vous expliquer comment reprendre le contrôle, à votre rythme.`,

    truths: [
      {
        myth: '« Je suis essoufflé, je dois éviter les efforts. »',
        truth: 'C\'est l\'inverse. L\'activité physique régulière améliore la capacité respiratoire. Commencez doucement.',
      },
      {
        myth: '« L\'essoufflement, c\'est normal en vieillissant. »',
        truth: 'Un essoufflement qui s\'aggrave n\'est jamais "normal". Ça mérite d\'être exploré et pris en charge.',
      },
      {
        myth: '« Avec une BPCO, on ne peut plus rien faire. »',
        truth: 'On peut très bien vivre avec une BPCO bien prise en charge. L\'arrêt du tabac et l\'activité font des miracles.',
      },
    ],

    dailyPlan: [
      { time: 'Maintenant', action: 'Respiration lèvres pincées', detail: 'Inspirez par le nez (2 sec), expirez par les lèvres presque fermées (4 sec). 5 cycles.' },
      { time: 'Aujourd\'hui', action: 'Marchez 5 min, même très lentement', detail: 'À votre rythme. C\'est normal d\'être essoufflé à l\'effort.' },
      { time: 'Ce soir', action: 'Dormez légèrement surélevé', detail: 'Un oreiller supplémentaire. Ça facilite la respiration nocturne.' },
    ],

    sevenDayPlan: [
      { day: 'Jour 1', actions: ['Respiration lèvres pincées 3x/jour', 'Marche 5 min', 'Noter l\'essoufflement'] },
      { day: 'Jour 2', actions: ['Respiration abdominale 5 min', 'Marche 7 min', 'Éviter les irritants'] },
      { day: 'Jour 3', actions: ['Marche 10 min (même lentement)', 'Exercices de bras assis', 'Aérer la maison'] },
      { day: 'Jour 4', actions: ['Marche 10 min', 'Montée de quelques marches', 'Continuer la respiration'] },
      { day: 'Jour 5', actions: ['Marche 12 min', 'Exercices 10 min', 'Hydratation++'] },
      { day: 'Jour 6', actions: ['Marche 15 min', 'Exercices 10 min', 'Évaluer les progrès'] },
      { day: 'Jour 7', actions: ['Bilan', 'Si pas d\'amélioration, parlez-en à votre médecin', 'Planifier la suite'] },
    ],

    alertSigns: [
      'Essoufflement brutal au repos',
      'Lèvres ou ongles bleutés',
      'Confusion ou somnolence anormale',
      'Fièvre avec crachats colorés',
      'Douleur thoracique',
      'Impossibilité de parler',
    ],

    closingMessage: 'L\'essoufflement chronique mérite toujours une évaluation. Si ça ne s\'améliore pas avec ces conseils, consultez pour un bilan.',
  },

  {
    id: 'otite-angine-enfant',
    slug: 'otite-angine-enfant',
    type: 'quick-answer',
    title: 'Mon enfant fait encore une otite/angine',
    subtitle: 'Prévention et gestion au quotidien',
    icon: '👶',
    color: 'destructive',
    category: 'orl-respiratoire',
    audience: 'parent',
    tags: ['plan-simple', 'habitudes', 'consulter'],
    isPublished: true,
    relatedPathologySlug: 'otites-a-repetition-enfant',

    intro: `Votre enfant enchaîne les otites et les angines ? Je sais, c'est épuisant pour vous et douloureux pour lui. Mais bonne nouvelle : avec de bonnes habitudes, on peut vraiment réduire les récidives. Et ça s'améliore avec l'âge.`,

    truths: [
      {
        myth: '« Mon enfant est fragile, il attrape tout. »',
        truth: 'C\'est normal qu\'un enfant en collectivité soit souvent malade. Son système immunitaire apprend. Ça s\'améliore vers 5-6 ans.',
      },
      {
        myth: '« Il faut des antibiotiques à chaque otite. »',
        truth: 'Pas toujours. Beaucoup d\'otites guérissent seules. Les antibiotiques sont réservés aux cas qui le nécessitent vraiment.',
      },
      {
        myth: '« Le lavage de nez, c\'est inutile. »',
        truth: 'C\'est le geste le plus efficace pour prévenir les otites. Ça dégage la trompe d\'Eustache et évite la surinfection.',
      },
    ],

    dailyPlan: [
      { time: 'Maintenant', action: 'Lavez le nez de votre enfant', detail: 'Sérum physiologique ou spray eau de mer. Une narine après l\'autre.' },
      { time: 'Aujourd\'hui', action: 'Aérez sa chambre 10 min', detail: 'Même en hiver. Ça renouvelle l\'air et élimine les microbes.' },
      { time: 'Ce soir', action: 'Surélevez légèrement sa tête au coucher', detail: 'Un coussin sous le matelas. Ça facilite le drainage.' },
    ],

    sevenDayPlan: [
      { day: 'Jour 1', actions: ['Lavage nez matin et soir', 'Aérer la chambre', 'Vérifier l\'humidité'] },
      { day: 'Jour 2', actions: ['Lavages 2-3x', 'Nettoyer les jouets', 'Proposer à boire souvent'] },
      { day: 'Jour 3', actions: ['Lavages', 'Sortie au grand air 30 min', 'Pas de tabagisme passif'] },
      { day: 'Jour 4', actions: ['Lavages', 'Limiter la tétine si > 6 mois', 'Alimentation variée'] },
      { day: 'Jour 5', actions: ['Lavages', 'Laver les doudous à 60°C', 'Éviter les lieux confinés'] },
      { day: 'Jour 6', actions: ['Lavages', 'Repos suffisant', 'Hydratation++'] },
      { day: 'Jour 7', actions: ['Bilan : les gestes sont-ils des habitudes ?'] },
    ],

    alertSigns: [
      'Fièvre > 39°C persistant plus de 48h',
      'Écoulement de l\'oreille (liquide ou pus)',
      'Enfant très fatigué ou difficile à réveiller',
      'Refus de boire ou de manger',
      'Douleur intense non calmée par le paracétamol',
      'Gonflement/rougeur derrière l\'oreille',
    ],

    closingMessage: 'Si les otites ou angines sont vraiment très fréquentes (> 5-6/an), consultez pour évaluer s\'il faut des examens ou un avis ORL.',
  },
];

// ============================================
// DONNÉES: RESSOURCES BIBLIOTHÈQUE
// ============================================

export const libraryResources: LibraryResourceContent[] = [
  // Arthrose
  { id: 'arthrose-comprendre', slug: 'arthrose-comprendre', type: 'resource', title: 'Comprendre l\'arthrose en 2 minutes', summary: 'Ce qui se passe dans votre articulation et pourquoi le mouvement aide.', category: 'rhumatologie', tags: ['comprendre'], audience: 'senior', readingTime: 2, relatedPathologySlug: 'arthrose', isFeatured: true, popularity: 95, createdAt: '2025-01-15', isPublished: true },
  { id: 'arthrose-plan-7-jours', slug: 'arthrose-plan-7-jours', type: 'resource', title: 'Arthrose : plan 7 jours', summary: 'Un programme simple pour commencer à bouger sans vous faire mal.', category: 'rhumatologie', tags: ['plan-simple', 'bouger'], audience: 'senior', readingTime: 5, relatedPathologySlug: 'arthrose', popularity: 92, createdAt: '2025-01-10', isPublished: true },
  { id: 'arthrose-exercices', slug: 'arthrose-exercices', type: 'resource', title: '5 exercices pour le genou arthrosique', summary: 'Des exercices simples à faire chez vous, adaptés à votre niveau.', category: 'rhumatologie', tags: ['bouger', 'exercices'], audience: 'senior', readingTime: 8, relatedPathologySlug: 'arthrose', popularity: 88, createdAt: '2025-01-08', isPublished: true },
  { id: 'arthrose-nutrition', slug: 'arthrose-nutrition', type: 'resource', title: 'Manger anti-inflammatoire', summary: 'L\'assiette idéale et les 3 erreurs à éviter. Pas de régime extrême.', category: 'rhumatologie', tags: ['nutrition'], audience: 'senior', readingTime: 5, relatedPathologySlug: 'arthrose', popularity: 78, createdAt: '2025-01-05', isPublished: true },

  // Lombalgie
  { id: 'lombalgie-comprendre', slug: 'lombalgie-comprendre', type: 'resource', title: 'Mal de dos chronique : ce qu\'il faut savoir', summary: 'Pourquoi ça fait mal et pourquoi le repos aggrave.', category: 'rhumatologie', tags: ['comprendre'], audience: 'adulte', readingTime: 3, relatedPathologySlug: 'lombalgie-chronique', popularity: 90, isNew: true, createdAt: '2025-01-20', isPublished: true },
  { id: 'lombalgie-plan-simple', slug: 'lombalgie-plan-simple', type: 'resource', title: 'Lombalgie : plan d\'action immédiat', summary: '3 choses simples à faire aujourd\'hui pour soulager votre dos.', category: 'rhumatologie', tags: ['plan-simple', 'bouger'], audience: 'adulte', readingTime: 4, relatedPathologySlug: 'lombalgie-chronique', isFeatured: true, popularity: 94, createdAt: '2025-01-18', isPublished: true },
  { id: 'lombalgie-gainage', slug: 'lombalgie-gainage', type: 'resource', title: 'Gainage doux pour lombalgiques', summary: 'Renforcer votre dos sans risque. Exercices adaptés.', category: 'rhumatologie', tags: ['bouger', 'exercices'], audience: 'adulte', readingTime: 7, relatedPathologySlug: 'lombalgie-chronique', popularity: 82, createdAt: '2025-01-12', isPublished: true },

  // Veineuse
  { id: 'veines-comprendre', slug: 'veines-comprendre', type: 'resource', title: 'Insuffisance veineuse : comprendre', summary: 'Pourquoi vos jambes sont lourdes et comment la marche peut tout changer.', category: 'veino-lymphatique', tags: ['comprendre'], audience: 'senior', readingTime: 3, relatedPathologySlug: 'insuffisance-veineuse', popularity: 85, createdAt: '2025-01-14', isPublished: true },
  { id: 'veines-plan-quotidien', slug: 'veines-plan-quotidien', type: 'resource', title: 'Jambes lourdes : routine quotidienne', summary: '5 gestes simples à faire chaque jour.', category: 'veino-lymphatique', tags: ['plan-simple', 'habitudes'], audience: 'senior', readingTime: 4, relatedPathologySlug: 'insuffisance-veineuse', isFeatured: true, popularity: 91, createdAt: '2025-01-16', isPublished: true },
  { id: 'veines-contention', slug: 'veines-contention', type: 'resource', title: 'Bien porter ses bas de contention', summary: 'Comment les choisir, les mettre et les entretenir.', category: 'veino-lymphatique', tags: ['habitudes'], audience: 'senior', readingTime: 5, relatedPathologySlug: 'insuffisance-veineuse', popularity: 79, createdAt: '2025-01-09', isPublished: true },

  // BPCO
  { id: 'bpco-comprendre', slug: 'bpco-comprendre', type: 'resource', title: 'BPCO : mieux comprendre', summary: 'Ce qui se passe dans vos poumons et pourquoi l\'activité est un traitement.', category: 'orl-respiratoire', tags: ['comprendre'], audience: 'adulte', readingTime: 4, relatedPathologySlug: 'bpco', popularity: 84, createdAt: '2025-01-13', isPublished: true },
  { id: 'bpco-respiration', slug: 'bpco-respiration', type: 'resource', title: 'Techniques de respiration pour la BPCO', summary: 'Respiration lèvres pincées et autres techniques.', category: 'orl-respiratoire', tags: ['bouger', 'habitudes', 'exercices'], audience: 'adulte', readingTime: 5, relatedPathologySlug: 'bpco', isFeatured: true, popularity: 89, createdAt: '2025-01-17', isPublished: true },
  { id: 'bpco-plan-activite', slug: 'bpco-plan-activite', type: 'resource', title: 'BPCO : reprendre l\'activité physique', summary: 'Un programme progressif. Même 5 minutes comptent.', category: 'orl-respiratoire', tags: ['plan-simple', 'bouger'], audience: 'adulte', readingTime: 6, relatedPathologySlug: 'bpco', popularity: 81, createdAt: '2025-01-11', isPublished: true },

  // Otites enfant
  { id: 'otites-comprendre', slug: 'otites-comprendre', type: 'resource', title: 'Pourquoi mon enfant fait des otites à répétition', summary: 'Ce qui se passe et pourquoi ça s\'améliore avec l\'âge.', category: 'orl-respiratoire', tags: ['comprendre'], audience: 'parent', readingTime: 3, relatedPathologySlug: 'otites-repetition-enfant', popularity: 93, isNew: true, createdAt: '2025-01-22', isPublished: true },
  { id: 'otites-prevention', slug: 'otites-prevention', type: 'resource', title: 'Prévenir les otites : les 5 gestes', summary: 'Lavage de nez, aération, hygiène — les habitudes qui marchent.', category: 'orl-respiratoire', tags: ['plan-simple', 'habitudes'], audience: 'parent', readingTime: 4, relatedPathologySlug: 'otites-repetition-enfant', isFeatured: true, popularity: 96, createdAt: '2025-01-21', isPublished: true },
  { id: 'otites-lavage-nez', slug: 'otites-lavage-nez', type: 'resource', title: 'Comment bien laver le nez de votre enfant', summary: 'Technique pas à pas pour un lavage efficace.', category: 'orl-respiratoire', tags: ['habitudes'], audience: 'parent', readingTime: 5, relatedPathologySlug: 'otites-repetition-enfant', popularity: 87, createdAt: '2025-01-19', isPublished: true },
  { id: 'otites-quand-consulter', slug: 'otites-quand-consulter', type: 'resource', title: 'Otite chez l\'enfant : quand consulter en urgence ?', summary: 'Les signes qui doivent vous alerter.', category: 'orl-respiratoire', tags: ['consulter'], audience: 'parent', readingTime: 3, relatedPathologySlug: 'otites-repetition-enfant', popularity: 80, createdAt: '2025-01-03', isPublished: true },

  // Guides transversaux
  { id: 'perdre-poids', slug: 'perdre-poids', type: 'resource', title: 'Perdre du poids sans se décourager', summary: 'Un plan réaliste et durable. Pas de régime miracle.', category: 'guides-transversaux', tags: ['plan-simple', 'nutrition', 'habitudes'], audience: 'adulte', readingTime: 8, isFeatured: true, popularity: 98, createdAt: '2025-01-25', isPublished: true },
  { id: 'arreter-fumer', slug: 'arreter-fumer', type: 'resource', title: 'Arrêter de fumer : plan par étapes', summary: 'Je vous accompagne semaine après semaine.', category: 'guides-transversaux', tags: ['plan-simple', 'habitudes'], audience: 'adulte', readingTime: 10, isFeatured: true, popularity: 97, createdAt: '2025-01-24', isPublished: true },
  { id: 'mieux-dormir', slug: 'mieux-dormir', type: 'resource', title: 'Mieux dormir sans médicaments', summary: 'Hygiène du sommeil et techniques simples.', category: 'guides-transversaux', tags: ['habitudes'], audience: 'adulte', readingTime: 6, popularity: 86, isNew: true, createdAt: '2025-01-23', isPublished: true },
  { id: 'bouger-plus', slug: 'bouger-plus', type: 'resource', title: 'Bouger plus au quotidien (même sans sport)', summary: 'Des idées simples pour être plus actif.', category: 'guides-transversaux', tags: ['bouger', 'habitudes'], audience: 'adulte', readingTime: 5, popularity: 83, createdAt: '2025-01-15', isPublished: true },
];

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

export const getPathologyBySlug = (slug: string): PathologyContent | undefined => {
  return pathologies.find(p => p.slug === slug && p.isPublished);
};

export const getQuickAnswerBySlug = (slug: string): QuickAnswerContent | undefined => {
  return quickAnswers.find(q => q.slug === slug && q.isPublished);
};

export const getResourceBySlug = (slug: string): LibraryResourceContent | undefined => {
  return libraryResources.find(r => r.slug === slug && r.isPublished);
};

export const getPathologiesByCategory = (category: ContentCategory): PathologyContent[] => {
  return pathologies.filter(p => p.category === category && p.isPublished);
};

export const getResourcesByPathology = (pathologySlug: string): LibraryResourceContent[] => {
  return libraryResources.filter(r => r.relatedPathologySlug === pathologySlug && r.isPublished);
};

export const getFeaturedPathologies = (): PathologyContent[] => {
  return pathologies.filter(p => p.isFeatured && p.isPublished);
};

export const getFeaturedResources = (): LibraryResourceContent[] => {
  return libraryResources.filter(r => r.isFeatured && r.isPublished);
};

export const getAllPublishedContent = () => ({
  pathologies: pathologies.filter(p => p.isPublished),
  quickAnswers: quickAnswers.filter(q => q.isPublished),
  resources: libraryResources.filter(r => r.isPublished),
});

// ============================================
// EXPORT JSON (pour admin)
// ============================================

export const exportContentAsJson = (): string => {
  const content = getAllPublishedContent();
  return JSON.stringify({
    exportDate: new Date().toISOString(),
    version: '1.0.0',
    ...content,
  }, null, 2);
};
