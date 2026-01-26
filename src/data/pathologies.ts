export type PathologyCategory = 'rhumatologie' | 'veino-lymphatique' | 'orl-respiratoire' | 'muqueuses-buccales';
export type ResourceType = 'comprendre' | 'bouger' | 'nutrition' | 'hygiene' | 'auto-soins' | 'consulter' | 'exercices';
export type AudienceType = 'senior' | 'enfant' | 'adulte';
export type MobilityLevel = 0 | 1 | 2 | 3;

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  frequency: string;
  icon: string;
  steps: string[];
  level: MobilityLevel;
}

export interface DayPlan {
  day: string;
  actions: string[];
}

export interface WeeklyProgram {
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

export interface Source {
  name: string;
  year: number;
  url?: string;
}

export interface Pathology {
  id: string;
  slug: string;
  name: string;
  category: PathologyCategory;
  shortDescription: string;
  
  // En 2 minutes
  quickSummary: string;
  
  // Physiopathologie vulgarisée
  physiopathology: string;
  
  // Top 5 non médicamenteux
  top5NonMedical: {
    title: string;
    description: string;
    icon: string;
  }[];
  
  // Plan 7 jours par niveau
  sevenDayPlans: {
    level: MobilityLevel;
    levelName: string;
    days: DayPlan[];
  }[];
  
  // Programme 8 semaines par niveau
  eightWeekPrograms: WeeklyProgram[];
  
  // Nutrition facile
  nutrition: NutritionPlan;
  
  // Plan poussée 48h (optionnel)
  flareProtocol?: FlareProtocol;
  
  // Red flags
  alertSigns: string[];
  
  // Sources
  sources: Source[];
  lastUpdated: string;
  
  // Métadonnées
  audience: AudienceType;
  readingTime: number;
  
  // Legacy (pour compatibilité)
  definition?: string;
  symptoms?: string[];
  aggravatingFactors?: string[];
  helpfulFactors?: string[];
  nonMedicinalTreatments?: {
    physicalActivity: string;
    posturalAdvice: string;
    lifestyle: string;
    sleep: string;
    stressManagement: string;
    thermalism: string;
  };
  exercises?: Exercise[];
  nutritionAdvice?: string[];
  pdfUrl?: string;
}

export interface Resource {
  id: string;
  pathologyId: string;
  title: string;
  summary: string;
  type: ResourceType;
  audience: AudienceType;
  readingTime: number;
  pdfUrl?: string;
}

export const categoryLabels: Record<PathologyCategory, string> = {
  'rhumatologie': 'Rhumatologie',
  'veino-lymphatique': 'Veino-lymphatique',
  'orl-respiratoire': 'ORL & Respiratoire',
  'muqueuses-buccales': 'Muqueuses buccales',
};

export const categoryColors: Record<PathologyCategory, string> = {
  'rhumatologie': 'category-rhuma',
  'veino-lymphatique': 'category-veino',
  'orl-respiratoire': 'category-orl',
  'muqueuses-buccales': 'category-buccal',
};

export const categoryIcons: Record<PathologyCategory, string> = {
  'rhumatologie': '🦴',
  'veino-lymphatique': '🩸',
  'orl-respiratoire': '🫁',
  'muqueuses-buccales': '👄',
};

export const resourceTypeLabels: Record<ResourceType, string> = {
  'comprendre': 'Comprendre',
  'bouger': 'Bouger',
  'nutrition': 'Nutrition',
  'hygiene': 'Hygiène de vie',
  'auto-soins': 'Auto-soins',
  'consulter': 'Quand consulter',
  'exercices': 'Exercices illustrés',
};

export const audienceLabels: Record<AudienceType, string> = {
  'senior': 'Seniors',
  'enfant': 'Enfants',
  'adulte': 'Adultes',
};

export const levelLabels: Record<MobilityLevel, string> = {
  0: 'Niveau 0 — Mobilité très limitée',
  1: 'Niveau 1 — Mobilité limitée',
  2: 'Niveau 2 — Mobilité correcte',
  3: 'Niveau 3 — Bonne mobilité',
};

// ============================================
// PATHOLOGIES MVP COMPLÈTES
// ============================================

export const pathologies: Pathology[] = [
  // ========== ARTHROSE ==========
  {
    id: 'arthrose',
    slug: 'arthrose',
    name: 'Arthrose',
    category: 'rhumatologie',
    shortDescription: 'Usure progressive du cartilage articulaire, source de douleurs et de raideur.',
    audience: 'senior',
    readingTime: 8,
    lastUpdated: '2024-01',

    // En 2 minutes
    quickSummary: `L'arthrose est une usure du cartilage qui recouvre vos articulations. Ce n'est pas une fatalité liée à l'âge. Le cartilage a besoin de mouvement pour se nourrir. Rester immobile l'abîme davantage. Bouger régulièrement, même doucement, est le meilleur traitement. La douleur peut diminuer significativement avec une activité adaptée et quelques ajustements du quotidien.`,

    // Physiopathologie vulgarisée
    physiopathology: `Imaginez le cartilage comme une éponge. Quand vous bougez, l'éponge se comprime et absorbe le liquide articulaire riche en nutriments. Quand vous vous arrêtez, elle se regonfle. Sans mouvement, l'éponge s'assèche et s'use. L'os sous le cartilage réagit en formant des petites excroissances (ostéophytes). L'articulation devient raide et douloureuse, surtout après l'immobilité prolongée.`,

    // Top 5 non médicamenteux
    top5NonMedical: [
      {
        title: 'Bouger tous les jours',
        description: 'Marche, vélo, natation : 30 min/jour. Le mouvement nourrit le cartilage et renforce les muscles qui protègent l\'articulation.',
        icon: '🚶',
      },
      {
        title: 'Appliquer de la chaleur',
        description: 'Bouillotte, compresse chaude ou bain chaud pendant 15-20 min. La chaleur détend les muscles et diminue la raideur.',
        icon: '🔥',
      },
      {
        title: 'Renforcer les muscles',
        description: 'Quadriceps pour le genou, fessiers pour la hanche. Des muscles forts = moins de pression sur l\'articulation.',
        icon: '💪',
      },
      {
        title: 'Gérer le poids',
        description: 'Chaque kilo en moins = 4 kilos de pression en moins sur les genoux. Même une perte modeste aide.',
        icon: '⚖️',
      },
      {
        title: 'Alterner positions',
        description: 'Ne restez jamais plus d\'1h dans la même position. Levez-vous, faites quelques pas, étirez-vous.',
        icon: '🔄',
      },
    ],

    // Plan 7 jours par niveau
    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Mobilité très limitée',
        days: [
          { day: 'Jour 1', actions: ['5 min de mouvements doux sur chaise (flexion-extension chevilles, genoux)', 'Appliquer chaleur 15 min sur zone douloureuse'] },
          { day: 'Jour 2', actions: ['5 min mouvements sur chaise', 'Marcher dans l\'appartement 2x3 min', 'Chaleur 15 min'] },
          { day: 'Jour 3', actions: ['7 min mouvements sur chaise', 'Marcher 2x5 min', 'S\'hydrater : 6 verres d\'eau'] },
          { day: 'Jour 4', actions: ['7 min mouvements + 1 exercice couché (pont fessier 5x)', 'Marcher 2x5 min'] },
          { day: 'Jour 5', actions: ['10 min mouvements variés', 'Marcher 10 min en 1 ou 2 fois'] },
          { day: 'Jour 6', actions: ['10 min mouvements', 'Marcher 10-15 min', 'Chaleur le soir 15 min'] },
          { day: 'Jour 7', actions: ['Jour de repos actif : quelques mouvements doux uniquement', 'Notez vos progrès'] },
        ],
      },
      {
        level: 1,
        levelName: 'Mobilité limitée',
        days: [
          { day: 'Jour 1', actions: ['10 min exercices doux (chaise + sol)', 'Marcher 10 min à allure lente', 'Chaleur 15 min'] },
          { day: 'Jour 2', actions: ['10 min exercices', 'Marcher 15 min', 'Boire 1,5L d\'eau'] },
          { day: 'Jour 3', actions: ['12 min exercices avec renforcement léger', 'Marcher 15 min', 'Étirer les jambes 5 min le soir'] },
          { day: 'Jour 4', actions: ['12 min exercices', 'Marcher 20 min (pauses si besoin)', 'Chaleur le soir'] },
          { day: 'Jour 5', actions: ['15 min exercices variés', 'Marcher 20 min'] },
          { day: 'Jour 6', actions: ['15 min exercices', 'Marcher 20-25 min', 'Étirements soir'] },
          { day: 'Jour 7', actions: ['Repos actif : marche légère 10 min + mouvements doux', 'Bilan de la semaine'] },
        ],
      },
      {
        level: 2,
        levelName: 'Mobilité correcte',
        days: [
          { day: 'Jour 1', actions: ['15 min exercices (renforcement + mobilité)', 'Marcher 25-30 min', 'Chaleur si raideur'] },
          { day: 'Jour 2', actions: ['15 min exercices', 'Marcher 30 min ou vélo 20 min'] },
          { day: 'Jour 3', actions: ['20 min exercices complets', 'Marcher 30 min', 'Étirements 10 min soir'] },
          { day: 'Jour 4', actions: ['15 min exercices', 'Activité au choix 30 min (marche, vélo, piscine)'] },
          { day: 'Jour 5', actions: ['20 min exercices', 'Marcher 30-40 min'] },
          { day: 'Jour 6', actions: ['20 min exercices', 'Activité plaisir 30-40 min', 'Étirements'] },
          { day: 'Jour 7', actions: ['Repos actif : marche légère 20 min', 'Évaluer les progrès'] },
        ],
      },
      {
        level: 3,
        levelName: 'Bonne mobilité',
        days: [
          { day: 'Jour 1', actions: ['20 min renforcement musculaire', 'Cardio 30-40 min (marche rapide, vélo, natation)'] },
          { day: 'Jour 2', actions: ['20 min exercices mobilité + équilibre', 'Marcher 40 min'] },
          { day: 'Jour 3', actions: ['25 min renforcement', 'Cardio 30-40 min', 'Étirements 10 min'] },
          { day: 'Jour 4', actions: ['20 min exercices', 'Activité plaisir 45 min'] },
          { day: 'Jour 5', actions: ['25 min renforcement complet', 'Cardio 40 min'] },
          { day: 'Jour 6', actions: ['20 min exercices', 'Activité extérieure 45-60 min', 'Étirements'] },
          { day: 'Jour 7', actions: ['Repos actif : marche tranquille, yoga doux'] },
        ],
      },
    ],

    // Programme 8 semaines
    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Niveau 0 — Je peux à peine bouger',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Réveiller le corps', exercises: ['Mouvements sur chaise 5-10 min/jour', 'Marche intérieure 5 min 2x/jour', 'Chaleur quotidienne 15 min'] },
          { week: 'Semaines 3-4', focus: 'Gagner en amplitude', exercises: ['Mouvements sur chaise 10 min', 'Ajouter 1 exercice couché (pont)', 'Marche 10 min 1-2x/jour'] },
          { week: 'Semaines 5-6', focus: 'Premiers renforcements', exercises: ['Exercices assis + couchés 15 min', 'Marche 15-20 min/jour', 'Commencer montées sur pointes debout'] },
          { week: 'Semaines 7-8', focus: 'Consolider', exercises: ['Routine complète 15-20 min', 'Marche 20-30 min/jour', 'Objectif : passer au niveau 1'] },
        ],
      },
      {
        level: 1,
        levelName: 'Niveau 1 — Je me fatigue vite',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Base solide', exercises: ['Exercices 15 min/jour (mobilité + léger renforcement)', 'Marche 15-20 min/jour'] },
          { week: 'Semaines 3-4', focus: 'Augmenter progressivement', exercises: ['Exercices 20 min/jour', 'Marche 25-30 min/jour', 'Ajouter étirements soir'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Exercices 20 min', 'Alterner marche/vélo d\'appartement 30 min', 'Renforcement 3x/semaine'] },
          { week: 'Semaines 7-8', focus: 'Prêt pour niveau 2', exercises: ['Routine complète 25 min', 'Cardio léger 30-35 min/jour', 'Évaluation et ajustement'] },
        ],
      },
      {
        level: 2,
        levelName: 'Niveau 2 — Je peux marcher 30 min',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Renforcement structuré', exercises: ['Renforcement 20 min 4x/semaine', 'Cardio 30-35 min/jour (marche, vélo, piscine)'] },
          { week: 'Semaines 3-4', focus: 'Intensifier doucement', exercises: ['Renforcement 25 min', 'Cardio 35-40 min', 'Ajouter équilibre 5 min'] },
          { week: 'Semaines 5-6', focus: 'Endurance', exercises: ['Renforcement complet 25 min', 'Cardio 40-45 min', 'Exercices proprioception'] },
          { week: 'Semaines 7-8', focus: 'Autonomie', exercises: ['Programme personnel 30 min 5x/semaine', 'Cardio 45 min', 'Objectif maintien long terme'] },
        ],
      },
      {
        level: 3,
        levelName: 'Niveau 3 — Je suis actif',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Renforcement ciblé 30 min 4-5x/semaine', 'Cardio varié 45 min/jour'] },
          { week: 'Semaines 3-4', focus: 'Performance douce', exercises: ['Circuits complets 30-35 min', 'Cardio 45-50 min', 'Stretching quotidien'] },
          { week: 'Semaines 5-6', focus: 'Sport plaisir', exercises: ['Intégrer une activité sportive régulière', 'Maintenir renforcement 3x/semaine'] },
          { week: 'Semaines 7-8', focus: 'Maintien vie active', exercises: ['Routine personnalisée durable', 'Activité physique quotidienne intégrée', 'Réévaluation tous les 3 mois'] },
        ],
      },
    ],

    // Nutrition
    nutrition: {
      idealPlate: [
        '½ assiette de légumes colorés (anti-inflammatoires naturels)',
        '¼ assiette de protéines (poisson 2-3x/semaine, œufs, volaille, légumineuses)',
        '¼ assiette de féculents complets (riz complet, quinoa, patate douce)',
        'Huile d\'olive en assaisonnement (1-2 cuillères à soupe)',
        'Fruits en dessert ou collation (fruits rouges, agrumes)',
      ],
      commonMistakes: [
        'Régimes restrictifs qui affaiblissent les muscles',
        'Trop de sucres rapides (gâteaux, sodas) qui favorisent l\'inflammation',
        'Pas assez de protéines (les muscles fondent)',
        'Oublier l\'hydratation (le cartilage a besoin d\'eau)',
        'Croire aux « aliments miracles » (curcuma seul ne suffit pas)',
      ],
      tips: [
        'Mangez du poisson gras 2-3x/semaine (saumon, sardines, maquereau)',
        'Buvez au moins 1,5L d\'eau par jour',
        'Limitez l\'alcool (inflammatoire)',
        'Si surpoids : visez -5% du poids actuel, pas plus',
      ],
    },

    // Plan poussée 48h
    flareProtocol: {
      title: 'Plan crise arthrosique 48h',
      hours0to24: [
        'Repos relatif : réduisez les activités mais ne restez pas immobile',
        'Appliquez du chaud (bouillotte, bain) 20 min 3-4x/jour',
        'Faites des mouvements très doux pour éviter l\'enraidissement',
        'Hydratez-vous bien (1,5-2L)',
        'Position confortable : coussin sous les genoux si couché',
      ],
      hours24to48: [
        'Reprenez progressivement les mouvements habituels',
        'Continuez la chaleur si ça soulage',
        'Marche courte (5-10 min) plusieurs fois par jour',
        'Étirements doux le soir',
        'Maintenez une alimentation anti-inflammatoire',
      ],
      resumeActivity: 'Si la douleur diminue de moitié, reprenez votre programme au niveau précédent. Si la douleur persiste après 48h ou s\'aggrave : consultez.',
    },

    // Red flags
    alertSigns: [
      'Douleur brutale et intense apparue sans raison',
      'Articulation très gonflée, rouge et chaude (possible infection ou goutte)',
      'Fièvre associée aux douleurs articulaires',
      'Blocage articulaire complet (impossible de bouger)',
      'Perte de force brutale d\'un membre',
      'Douleur qui réveille la nuit systématiquement',
    ],

    // Sources
    sources: [
      { name: 'OARSI Guidelines for the Non-Surgical Management of Knee Osteoarthritis', year: 2019 },
      { name: 'EULAR Recommendations for the Management of OA', year: 2019 },
      { name: 'HAS - Prise en charge de l\'arthrose', year: 2023 },
      { name: 'Cochrane Review: Exercise for osteoarthritis of the knee', year: 2015 },
    ],
  },

  // ========== LOMBALGIE CHRONIQUE ==========
  {
    id: 'lombalgie-chronique',
    slug: 'lombalgie-chronique',
    name: 'Lombalgie chronique',
    category: 'rhumatologie',
    shortDescription: 'Douleur du bas du dos persistant plus de 3 mois, souvent liée au mode de vie.',
    audience: 'adulte',
    readingTime: 8,
    lastUpdated: '2024-01',

    quickSummary: `Votre dos vous fait mal depuis plus de 3 mois ? C'est une lombalgie chronique. Bonne nouvelle : dans plus de 90% des cas, ce n'est pas grave. Le repos prolongé aggrave les choses. Bouger est le meilleur remède. Les muscles du dos ont besoin d'être sollicités pour rester forts et protéger la colonne. Avec les bons exercices et quelques ajustements du quotidien, la plupart des lombalgies s'améliorent nettement.`,

    physiopathology: `Votre colonne lombaire supporte le poids du corps et permet de nombreux mouvements. Quand on reste trop assis ou immobile, les muscles du dos s'affaiblissent. Les disques entre les vertèbres, privés de mouvement, s'hydratent moins bien. Les tensions s'accumulent. Contrairement à ce qu'on croit, le problème vient rarement d'une « vertèbre déplacée ». C'est plutôt un déséquilibre musculaire et postural, souvent aggravé par le stress qui contracte les muscles.`,

    top5NonMedical: [
      {
        title: 'Bouger malgré la douleur',
        description: 'Le mouvement est le meilleur traitement. Marche, natation, vélo : reprenez progressivement. La douleur ne signifie pas forcément lésion.',
        icon: '🚶',
      },
      {
        title: 'Renforcer le gainage',
        description: 'Des abdominaux et muscles du dos forts = une colonne stable et protégée. 10 min/jour de gainage suffit.',
        icon: '💪',
      },
      {
        title: 'Changer de position souvent',
        description: 'Ne restez jamais plus d\'1h assis. Levez-vous, étirez-vous, faites quelques pas. C\'est plus important que d\'avoir la « parfaite » posture.',
        icon: '🔄',
      },
      {
        title: 'Gérer le stress',
        description: 'Le stress contracte les muscles du dos et amplifie la douleur. Respiration, relaxation, activités plaisantes sont essentiels.',
        icon: '🧘',
      },
      {
        title: 'Bien dormir',
        description: 'Matelas ni trop mou ni trop dur. Coussin entre les genoux si couché sur le côté. Le sommeil répare les muscles.',
        icon: '😴',
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Douleur forte, bouge à peine',
        days: [
          { day: 'Jour 1', actions: ['Marcher 5 min dans l\'appartement (même lentement)', 'Position allongée : genoux fléchis, pieds au sol, 10 min', 'Respiration abdominale 3x3 min'] },
          { day: 'Jour 2', actions: ['Marcher 5-10 min', '3 exercices doux au sol (chat-vache, genoux poitrine)', 'Chaleur 15 min si spasme'] },
          { day: 'Jour 3', actions: ['Marcher 10 min', 'Exercices 10 min', 'Détente/respiration le soir'] },
          { day: 'Jour 4', actions: ['Marcher 10-15 min en 2 fois', 'Exercices 10 min', 'Éviter la position assise prolongée'] },
          { day: 'Jour 5', actions: ['Marcher 15 min', 'Exercices 15 min avec 1er gainage (sur genoux)'] },
          { day: 'Jour 6', actions: ['Marcher 15-20 min', 'Exercices + gainage 15 min', 'Étirements soir'] },
          { day: 'Jour 7', actions: ['Repos actif : marche légère + mouvements doux', 'Bilan de la semaine'] },
        ],
      },
      {
        level: 1,
        levelName: 'Douleur modérée, mobilité limitée',
        days: [
          { day: 'Jour 1', actions: ['Marcher 15 min', 'Exercices mobilité + gainage 15 min', 'Étirements soir 5 min'] },
          { day: 'Jour 2', actions: ['Marcher 20 min', 'Exercices 15 min', 'Pause toutes les 45 min si assis'] },
          { day: 'Jour 3', actions: ['Marcher 20-25 min', 'Exercices complets 20 min'] },
          { day: 'Jour 4', actions: ['Marcher ou vélo 25 min', 'Exercices 20 min', 'Gestion stress 10 min'] },
          { day: 'Jour 5', actions: ['Marcher 25-30 min', 'Exercices 20 min'] },
          { day: 'Jour 6', actions: ['Activité au choix 30 min', 'Exercices complets', 'Étirements profonds'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Évaluer les progrès'] },
        ],
      },
      {
        level: 2,
        levelName: 'Douleur légère, mobilité correcte',
        days: [
          { day: 'Jour 1', actions: ['Cardio 30 min (marche rapide, vélo, natation)', 'Renforcement dos/abdos 20 min'] },
          { day: 'Jour 2', actions: ['Marche 30-40 min', 'Exercices 20 min', 'Étirements 10 min'] },
          { day: 'Jour 3', actions: ['Cardio 35 min', 'Renforcement complet 25 min'] },
          { day: 'Jour 4', actions: ['Activité plaisir 40 min', 'Gainage 15 min'] },
          { day: 'Jour 5', actions: ['Cardio 40 min', 'Renforcement 25 min'] },
          { day: 'Jour 6', actions: ['Activité sportive ou longue marche', 'Exercices + étirements'] },
          { day: 'Jour 7', actions: ['Repos actif : yoga doux, marche tranquille'] },
        ],
      },
      {
        level: 3,
        levelName: 'Quasi plus de douleur, actif',
        days: [
          { day: 'Jour 1', actions: ['Cardio 45 min', 'Renforcement complet 30 min'] },
          { day: 'Jour 2', actions: ['Activité sportive 45-60 min', 'Gainage 15 min'] },
          { day: 'Jour 3', actions: ['Cardio varié 45 min', 'Renforcement + équilibre 30 min'] },
          { day: 'Jour 4', actions: ['Sport plaisir 1h', 'Stretching 15 min'] },
          { day: 'Jour 5', actions: ['Cardio 45-50 min', 'Renforcement 30 min'] },
          { day: 'Jour 6', actions: ['Activité longue durée (rando, vélo)', 'Récupération soir'] },
          { day: 'Jour 7', actions: ['Repos actif : yoga, natation douce'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Niveau 0 — Douleur forte',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Reprendre le mouvement', exercises: ['Marche 5-10 min 2x/jour', 'Exercices au sol 10 min (chat-vache, respiration)', 'Éviter position assise > 30 min'] },
          { week: 'Semaines 3-4', focus: 'Progresser doucement', exercises: ['Marche 15-20 min/jour', 'Exercices 15 min avec gainage débutant', 'Ajouter étirements'] },
          { week: 'Semaines 5-6', focus: 'Renforcer', exercises: ['Marche 20-25 min', 'Exercices + gainage 20 min', 'Commencer activité douce (vélo, piscine)'] },
          { week: 'Semaines 7-8', focus: 'Stabiliser', exercises: ['Marche 30 min/jour', 'Routine complète 25 min', 'Objectif niveau 1'] },
        ],
      },
      {
        level: 1,
        levelName: 'Niveau 1 — Douleur modérée',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Renforcer la base', exercises: ['Cardio léger 20-25 min/jour', 'Exercices dos/abdos 20 min'] },
          { week: 'Semaines 3-4', focus: 'Augmenter', exercises: ['Cardio 30 min', 'Renforcement 25 min', 'Étirements quotidiens'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Alterner marche/vélo/natation 30-35 min', 'Renforcement complet', 'Gestion du stress'] },
          { week: 'Semaines 7-8', focus: 'Vers l\'autonomie', exercises: ['Cardio 35-40 min', 'Programme personnalisé', 'Objectif niveau 2'] },
        ],
      },
      {
        level: 2,
        levelName: 'Niveau 2 — Douleur légère',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Structurer l\'entraînement', exercises: ['Cardio 35-40 min 5x/semaine', 'Renforcement 25 min 4x/semaine'] },
          { week: 'Semaines 3-4', focus: 'Intensifier', exercises: ['Cardio 40-45 min', 'Renforcement + proprioception 30 min'] },
          { week: 'Semaines 5-6', focus: 'Performance douce', exercises: ['Cardio varié 45 min', 'Circuits complets', 'Sport plaisir 1x/semaine'] },
          { week: 'Semaines 7-8', focus: 'Maintien', exercises: ['Programme autonome', 'Activité quotidienne', 'Prévention long terme'] },
        ],
      },
      {
        level: 3,
        levelName: 'Niveau 3 — Actif',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Cardio intensité modérée 45-50 min', 'Renforcement avancé 30 min'] },
          { week: 'Semaines 3-4', focus: 'Sport régulier', exercises: ['Intégrer 2-3 séances sport/semaine', 'Maintenir gainage quotidien'] },
          { week: 'Semaines 5-6', focus: 'Équilibre vie active', exercises: ['Sport plaisir régulier', 'Renforcement d\'entretien', 'Étirements quotidiens'] },
          { week: 'Semaines 7-8', focus: 'Maintien long terme', exercises: ['Routine personnelle durable', 'Activité physique comme habitude de vie'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        '½ assiette de légumes (tous types, variez les couleurs)',
        '¼ assiette de protéines (poisson, volaille, œufs, légumineuses)',
        '¼ assiette de féculents complets (pain complet, riz complet)',
        'Huile d\'olive ou colza (oméga-3 anti-inflammatoires)',
        'Fruits frais en dessert',
      ],
      commonMistakes: [
        'Trop de sucre et aliments ultra-transformés (inflammatoires)',
        'Pas assez de protéines (les muscles du dos en ont besoin)',
        'Oublier l\'hydratation (les disques sont composés d\'eau)',
        'Trop de café (peut augmenter les tensions)',
        'Alcool excessif (inflammatoire et mauvais pour le sommeil)',
      ],
      tips: [
        'Hydratez-vous : 1,5 à 2L d\'eau par jour',
        'Mangez anti-inflammatoire : poissons gras, légumes verts, fruits rouges',
        'Si surpoids : perdre 5% réduit la charge sur le dos',
        'Évitez les grignotages sucrés qui favorisent l\'inflammation',
      ],
    },

    flareProtocol: {
      title: 'Plan crise lombaire 48h',
      hours0to24: [
        'Ne vous allongez pas toute la journée : bougez régulièrement, même 5 min',
        'Position de délordose : couché, genoux fléchis sur un coussin, 15-20 min',
        'Chaleur sur les lombaires si contractures (bouillotte 20 min)',
        'Respiration abdominale 5 min 3-4x dans la journée',
        'Marche lente dans la maison régulièrement',
      ],
      hours24to48: [
        'Augmentez progressivement les périodes de marche',
        'Reprenez les exercices très doux (chat-vache, genoux-poitrine)',
        'Alternez debout/assis/couché pour éviter les raideurs',
        'Continuez la chaleur si ça soulage',
        'Dormez avec coussin entre les genoux',
      ],
      resumeActivity: 'Si la douleur baisse de moitié après 48h, reprenez votre programme à un niveau en dessous. Si la douleur reste intense, si vous avez des fourmillements dans les jambes ou des difficultés urinaires : consultez rapidement.',
    },

    alertSigns: [
      'Perte de contrôle des urines ou des selles',
      'Engourdissement de la zone périnéale (selle de cheval)',
      'Faiblesse progressive des deux jambes',
      'Douleur intense qui réveille chaque nuit',
      'Fièvre associée aux douleurs du dos',
      'Perte de poids inexpliquée avec douleur dorsale',
      'Antécédent de cancer et nouvelle douleur dorsale',
    ],

    sources: [
      { name: 'NICE Guidelines: Low back pain and sciatica', year: 2020 },
      { name: 'HAS - Prise en charge du patient présentant une lombalgie commune', year: 2019 },
      { name: 'Lancet Series on Low Back Pain', year: 2018 },
      { name: 'Cochrane: Exercise therapy for chronic low back pain', year: 2021 },
    ],
  },

  // ========== INSUFFISANCE VEINEUSE CHRONIQUE ==========
  {
    id: 'insuffisance-veineuse',
    slug: 'insuffisance-veineuse',
    name: 'Insuffisance veineuse chronique',
    category: 'veino-lymphatique',
    shortDescription: 'Mauvais retour veineux des jambes, source de lourdeur et gonflement.',
    audience: 'senior',
    readingTime: 7,
    lastUpdated: '2024-01',

    quickSummary: `Vos jambes sont lourdes, gonflent en fin de journée, vous avez des varices ? C'est l'insuffisance veineuse. Le sang a du mal à remonter vers le cœur et stagne dans vos jambes. La bonne nouvelle : marcher active la « pompe » musculaire du mollet qui propulse le sang vers le haut. Porter des bas de contention, surélever les jambes et éviter la chaleur font aussi partie des solutions simples et efficaces.`,

    physiopathology: `Les veines de vos jambes contiennent des petites valves qui empêchent le sang de redescendre. Avec le temps, ces valves peuvent s'affaiblir. Le sang stagne, les veines se dilatent (varices), et le liquide s'accumule dans les tissus (œdème). La pompe musculaire du mollet est votre meilleure alliée : à chaque pas, les muscles compriment les veines et propulsent le sang vers le haut. C'est pourquoi la sédentarité aggrave le problème et la marche l'améliore.`,

    top5NonMedical: [
      {
        title: 'Marcher tous les jours',
        description: '30 min de marche active la pompe du mollet. C\'est le traitement n°1. Prenez les escaliers, descendez un arrêt plus tôt.',
        icon: '🚶',
      },
      {
        title: 'Porter des bas de contention',
        description: 'Ils compriment les veines et aident le retour veineux. Prescrit par le médecin, remboursés. Mettez-les le matin.',
        icon: '🧦',
      },
      {
        title: 'Surélever les jambes',
        description: '15-20 min 2x/jour. Surélevez les pieds du lit de 10-15 cm. Ça draine passivement le sang vers le cœur.',
        icon: '🦶',
      },
      {
        title: 'Éviter la chaleur',
        description: 'Pas de bains chauds, sauna, exposition prolongée au soleil. La chaleur dilate les veines et aggrave la stagnation.',
        icon: '❄️',
      },
      {
        title: 'Faire des exercices de mollets',
        description: 'Flexion-extension des pieds, montées sur pointes. À faire assis, debout, ou même couché, plusieurs fois par jour.',
        icon: '💪',
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Mobilité très limitée',
        days: [
          { day: 'Jour 1', actions: ['Surélever les jambes 15 min 2x', 'Flexion-extension des pieds assis 20x 3 fois', 'Marcher 5 min dans la maison'] },
          { day: 'Jour 2', actions: ['Surélévation 15 min 2x', 'Exercices pieds 3x', 'Marcher 2x5 min', 'Jet d\'eau fraîche sur jambes'] },
          { day: 'Jour 3', actions: ['Surélévation', 'Exercices pieds + pédalage couché 2 min', 'Marcher 10 min'] },
          { day: 'Jour 4', actions: ['Surélévation', 'Exercices 3x', 'Marcher 10-15 min'] },
          { day: 'Jour 5', actions: ['Surélévation', 'Tous exercices', 'Marcher 15 min'] },
          { day: 'Jour 6', actions: ['Surélévation', 'Exercices complets', 'Marcher 15-20 min'] },
          { day: 'Jour 7', actions: ['Repos actif : mouvements doux, surélévation', 'Bilan de la semaine'] },
        ],
      },
      {
        level: 1,
        levelName: 'Mobilité limitée',
        days: [
          { day: 'Jour 1', actions: ['Surélévation 15 min 2x', 'Exercices complets 10 min', 'Marcher 15 min'] },
          { day: 'Jour 2', actions: ['Surélévation', 'Exercices 10 min + montées sur pointes 15x', 'Marcher 20 min'] },
          { day: 'Jour 3', actions: ['Surélévation', 'Exercices 15 min', 'Marcher 20 min', 'Douche fraîche jambes'] },
          { day: 'Jour 4', actions: ['Surélévation', 'Exercices + marche sur pointes 1 min', 'Marcher 20-25 min'] },
          { day: 'Jour 5', actions: ['Surélévation', 'Exercices complets 15 min', 'Marcher 25 min'] },
          { day: 'Jour 6', actions: ['Surélévation', 'Exercices', 'Marcher ou vélo 25-30 min'] },
          { day: 'Jour 7', actions: ['Repos actif, surélévation, exercices doux'] },
        ],
      },
      {
        level: 2,
        levelName: 'Mobilité correcte',
        days: [
          { day: 'Jour 1', actions: ['Surélévation soir', 'Marcher 30 min', 'Exercices 15 min'] },
          { day: 'Jour 2', actions: ['Marcher 35 min ou natation 20 min', 'Exercices + escaliers'] },
          { day: 'Jour 3', actions: ['Cardio 30-35 min', 'Renforcement mollets', 'Surélévation soir'] },
          { day: 'Jour 4', actions: ['Marcher ou vélo 35 min', 'Exercices complets'] },
          { day: 'Jour 5', actions: ['Cardio 40 min', 'Exercices 15 min'] },
          { day: 'Jour 6', actions: ['Activité plaisir 40 min (marche, piscine)', 'Étirements et surélévation'] },
          { day: 'Jour 7', actions: ['Repos actif : marche légère, surélévation'] },
        ],
      },
      {
        level: 3,
        levelName: 'Bonne mobilité',
        days: [
          { day: 'Jour 1', actions: ['Cardio 40-45 min (marche rapide, natation)', 'Renforcement 20 min'] },
          { day: 'Jour 2', actions: ['Marche rapide ou vélo 45 min', 'Exercices mollets intensifs'] },
          { day: 'Jour 3', actions: ['Cardio 45 min', 'Renforcement jambes complet'] },
          { day: 'Jour 4', actions: ['Natation ou aquagym 45 min', 'Étirements'] },
          { day: 'Jour 5', actions: ['Cardio 50 min', 'Exercices proprioception'] },
          { day: 'Jour 6', actions: ['Sport plaisir 1h', 'Surélévation récupération'] },
          { day: 'Jour 7', actions: ['Repos actif : natation douce, marche'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Niveau 0 — Très peu mobile',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Activer la pompe', exercises: ['Surélévation 2x15 min/jour', 'Flexion pieds 3x20/jour', 'Marche 5-10 min 2x/jour'] },
          { week: 'Semaines 3-4', focus: 'Augmenter la marche', exercises: ['Surélévation quotidienne', 'Exercices complets 10 min', 'Marche 15-20 min/jour'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Marche 20-25 min', 'Ajouter montées sur pointes', 'Douche fraîche quotidienne'] },
          { week: 'Semaines 7-8', focus: 'Consolider', exercises: ['Marche 30 min/jour', 'Routine d\'exercices établie', 'Port contention si prescrit'] },
        ],
      },
      {
        level: 1,
        levelName: 'Niveau 1 — Mobilité limitée',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Base solide', exercises: ['Marche 20-25 min/jour', 'Exercices 15 min', 'Surélévation 2x/jour'] },
          { week: 'Semaines 3-4', focus: 'Progression', exercises: ['Marche 30 min ou vélo 20 min', 'Exercices + renforcement mollets'] },
          { week: 'Semaines 5-6', focus: 'Endurance', exercises: ['Cardio 30-35 min', 'Exercices complets', 'Escaliers régulièrement'] },
          { week: 'Semaines 7-8', focus: 'Autonomie', exercises: ['Cardio 35-40 min', 'Programme personnel', 'Objectif niveau 2'] },
        ],
      },
      {
        level: 2,
        levelName: 'Niveau 2 — Mobilité correcte',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Structurer', exercises: ['Cardio 35-40 min 5x/semaine', 'Renforcement 20 min'] },
          { week: 'Semaines 3-4', focus: 'Intensifier', exercises: ['Cardio 40-45 min', 'Renforcement + proprioception'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Alterner marche/vélo/natation 45 min', 'Circuits jambes'] },
          { week: 'Semaines 7-8', focus: 'Maintien', exercises: ['Programme autonome', 'Sport 2-3x/semaine', 'Prévention long terme'] },
        ],
      },
      {
        level: 3,
        levelName: 'Niveau 3 — Actif',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Cardio 45-50 min', 'Renforcement avancé'] },
          { week: 'Semaines 3-4', focus: 'Sport régulier', exercises: ['Sport 3-4x/semaine', 'Natation ou aquagym 1x/semaine'] },
          { week: 'Semaines 5-6', focus: 'Performance', exercises: ['Entraînement varié', 'Compétition amicale si souhaité'] },
          { week: 'Semaines 7-8', focus: 'Vie active', exercises: ['Activité quotidienne intégrée', 'Maintien long terme'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        'Fruits rouges (myrtilles, cassis, framboises) : renforcent les parois veineuses',
        'Légumes verts à chaque repas (antioxydants)',
        'Poisson 2-3x/semaine (oméga-3)',
        'Peu de sel (limite la rétention d\'eau)',
        'Beaucoup d\'eau et tisanes (1,5-2L/jour)',
      ],
      commonMistakes: [
        'Trop de sel (plats préparés, charcuterie) : favorise les œdèmes',
        'Pas assez d\'eau : le sang s\'épaissit',
        'Trop d\'alcool : dilate les veines et déshydrate',
        'Pas assez de fibres (constipation gêne le retour veineux)',
        'Repas trop copieux le soir',
      ],
      tips: [
        'Buvez avant d\'avoir soif, surtout quand il fait chaud',
        'Mangez des agrumes (vitamine C pour le collagène des veines)',
        'Limitez les plats industriels (sel caché)',
        'Fibres : légumes, fruits, céréales complètes',
      ],
    },

    alertSigns: [
      'Mollet rouge, chaud, dur et douloureux (suspicion de phlébite)',
      'Gonflement brutal d\'une seule jambe',
      'Douleur thoracique ou essoufflement brutal (embolie possible)',
      'Ulcère de jambe qui ne cicatrise pas',
      'Saignement d\'une varice',
      'Changement de couleur de la peau (brune, rouge) avec durcissement',
    ],

    sources: [
      { name: 'European Society for Vascular Surgery Guidelines', year: 2022 },
      { name: 'HAS - Insuffisance veineuse chronique des membres inférieurs', year: 2021 },
      { name: 'International Union of Phlebology Guidelines', year: 2020 },
      { name: 'Cochrane: Compression stockings for treating venous leg ulcers', year: 2018 },
    ],
  },

  // ========== BPCO ==========
  {
    id: 'bpco',
    slug: 'bpco',
    name: 'BPCO',
    category: 'orl-respiratoire',
    shortDescription: 'Maladie respiratoire chronique avec essoufflement progressif, souvent liée au tabac.',
    audience: 'adulte',
    readingTime: 9,
    lastUpdated: '2024-01',

    quickSummary: `La BPCO (broncho-pneumopathie chronique obstructive) rend la respiration difficile. Les bronches sont rétrécies et inflammées, souvent à cause du tabac. L'essoufflement fait peur et pousse à moins bouger. Mais c'est le contraire qu'il faut faire : l'activité physique adaptée améliore le souffle, la qualité de vie et réduit les exacerbations. Arrêter le tabac est essentiel. La rééducation respiratoire et les exercices quotidiens font partie intégrante du traitement.`,

    physiopathology: `Vos bronches sont comme des tubes qui amènent l'air jusqu'aux poumons. Dans la BPCO, ces tubes sont rétrécis par l'inflammation chronique et encombrés de mucus. Les petits sacs d'air (alvéoles) sont abîmés et perdent leur élasticité. Résultat : l'air entre mal et surtout sort mal. Vous vous essoufflez. Le cercle vicieux s'installe : essoufflement → peur de bouger → muscles qui fondent → essoufflement plus rapide. La solution : réentraîner progressivement votre corps à l'effort.`,

    top5NonMedical: [
      {
        title: 'Arrêter le tabac',
        description: 'C\'est LA priorité absolue. Même après des années, l\'arrêt ralentit l\'évolution de la maladie. Demandez de l\'aide (substituts, suivi).',
        icon: '🚭',
      },
      {
        title: 'Faire de l\'activité physique',
        description: 'Marche, vélo, natation : 30 min/jour améliore le souffle et la qualité de vie. Commencez très progressivement.',
        icon: '🚶',
      },
      {
        title: 'Pratiquer les exercices respiratoires',
        description: 'Respiration à lèvres pincées, respiration abdominale : 5-10 min 2-3x/jour. Ça améliore le contrôle du souffle.',
        icon: '🌬️',
      },
      {
        title: 'Faire la réhabilitation respiratoire',
        description: 'Programme supervisé par des professionnels. Très efficace pour améliorer la capacité d\'effort. Demandez une prescription.',
        icon: '🏥',
      },
      {
        title: 'Éviter les infections',
        description: 'Vaccins (grippe, pneumocoque, COVID), lavage des mains, éviter les personnes malades. Les infections aggravent la BPCO.',
        icon: '💉',
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Essoufflement au moindre effort',
        days: [
          { day: 'Jour 1', actions: ['Respiration lèvres pincées 5 min 3x', 'Marcher dans l\'appartement 2x3 min', 'Respiration abdominale 5 min'] },
          { day: 'Jour 2', actions: ['Exercices respiratoires 3x', 'Marcher 2x5 min', 'Exercices assis (bras) 5 min'] },
          { day: 'Jour 3', actions: ['Respirations 3x', 'Marcher 3x5 min', 'Exercices assis 7 min'] },
          { day: 'Jour 4', actions: ['Respirations', 'Marcher 2x7 min', 'Exercices 10 min'] },
          { day: 'Jour 5', actions: ['Respirations', 'Marcher 15 min (pauses si besoin)', 'Exercices 10 min'] },
          { day: 'Jour 6', actions: ['Respirations', 'Marcher 15-20 min', 'Exercices complets'] },
          { day: 'Jour 7', actions: ['Repos actif : exercices respiratoires + mouvements doux'] },
        ],
      },
      {
        level: 1,
        levelName: 'Essoufflement à l\'effort modéré',
        days: [
          { day: 'Jour 1', actions: ['Exercices respiratoires 10 min', 'Marcher 15 min', 'Renforcement léger 10 min'] },
          { day: 'Jour 2', actions: ['Respirations', 'Marcher 20 min', 'Exercices 15 min'] },
          { day: 'Jour 3', actions: ['Respirations', 'Marcher ou vélo 20 min', 'Renforcement 15 min'] },
          { day: 'Jour 4', actions: ['Respirations', 'Cardio 25 min', 'Exercices'] },
          { day: 'Jour 5', actions: ['Respirations', 'Marcher 25-30 min', 'Renforcement'] },
          { day: 'Jour 6', actions: ['Respirations', 'Activité au choix 30 min', 'Étirements'] },
          { day: 'Jour 7', actions: ['Repos actif, exercices respiratoires'] },
        ],
      },
      {
        level: 2,
        levelName: 'Essoufflement à l\'effort soutenu',
        days: [
          { day: 'Jour 1', actions: ['Exercices respiratoires', 'Cardio 30 min', 'Renforcement 20 min'] },
          { day: 'Jour 2', actions: ['Respirations', 'Marche rapide ou vélo 35 min', 'Exercices'] },
          { day: 'Jour 3', actions: ['Respirations', 'Cardio 35 min', 'Renforcement complet'] },
          { day: 'Jour 4', actions: ['Respirations', 'Activité plaisir 40 min'] },
          { day: 'Jour 5', actions: ['Respirations', 'Cardio 40 min', 'Renforcement'] },
          { day: 'Jour 6', actions: ['Activité longue 45 min', 'Étirements'] },
          { day: 'Jour 7', actions: ['Repos actif'] },
        ],
      },
      {
        level: 3,
        levelName: 'Bonne tolérance à l\'effort',
        days: [
          { day: 'Jour 1', actions: ['Exercices respiratoires', 'Cardio 45 min', 'Renforcement 25 min'] },
          { day: 'Jour 2', actions: ['Respirations', 'Sport 45-60 min'] },
          { day: 'Jour 3', actions: ['Respirations', 'Cardio varié 45 min', 'Renforcement'] },
          { day: 'Jour 4', actions: ['Activité plaisir 1h'] },
          { day: 'Jour 5', actions: ['Cardio 50 min', 'Renforcement'] },
          { day: 'Jour 6', actions: ['Sport ou activité longue', 'Récupération'] },
          { day: 'Jour 7', actions: ['Repos actif'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Niveau 0 — Très essoufflé',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Retrouver le souffle', exercises: ['Exercices respiratoires 3x10 min/jour', 'Marche intérieure 5 min 2-3x/jour', 'Exercices assis 10 min'] },
          { week: 'Semaines 3-4', focus: 'Augmenter doucement', exercises: ['Respirations', 'Marche 10-15 min/jour', 'Exercices 15 min'] },
          { week: 'Semaines 5-6', focus: 'Renforcer', exercises: ['Respirations', 'Marche 20 min', 'Exercices + renforcement léger'] },
          { week: 'Semaines 7-8', focus: 'Stabiliser', exercises: ['Marche 25-30 min', 'Programme complet', 'Objectif niveau 1'] },
        ],
      },
      {
        level: 1,
        levelName: 'Niveau 1 — Essoufflé à l\'effort',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Base cardio', exercises: ['Respirations quotidiennes', 'Marche 20-25 min', 'Renforcement 15 min'] },
          { week: 'Semaines 3-4', focus: 'Progression', exercises: ['Cardio 30 min', 'Renforcement 20 min', 'Étirements'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Alterner marche/vélo 35 min', 'Renforcement complet'] },
          { week: 'Semaines 7-8', focus: 'Endurance', exercises: ['Cardio 40 min', 'Programme autonome'] },
        ],
      },
      {
        level: 2,
        levelName: 'Niveau 2 — Essoufflement modéré',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Structurer', exercises: ['Cardio 35-40 min 5x/semaine', 'Renforcement 20 min'] },
          { week: 'Semaines 3-4', focus: 'Intensifier', exercises: ['Cardio 40-45 min', 'Renforcement + endurance'] },
          { week: 'Semaines 5-6', focus: 'Performance', exercises: ['Cardio varié 45 min', 'Circuits complets'] },
          { week: 'Semaines 7-8', focus: 'Maintien', exercises: ['Programme autonome', 'Sport 2-3x/semaine'] },
        ],
      },
      {
        level: 3,
        levelName: 'Niveau 3 — Actif',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Cardio 45-50 min', 'Renforcement avancé'] },
          { week: 'Semaines 3-4', focus: 'Sport régulier', exercises: ['Sport 3-4x/semaine', 'Maintenir exercices respiratoires'] },
          { week: 'Semaines 5-6', focus: 'Équilibre', exercises: ['Activité physique quotidienne', 'Prévention exacerbations'] },
          { week: 'Semaines 7-8', focus: 'Long terme', exercises: ['Mode de vie actif', 'Surveillance régulière'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        'Protéines à chaque repas (viande, poisson, œufs, légumineuses) : les muscles respiratoires en ont besoin',
        'Légumes variés (antioxydants)',
        'Féculents en quantité modérée (éviter le surpoids qui gêne la respiration)',
        'Produits laitiers (calcium + vitamine D)',
        'Hydratation suffisante (fluidifie le mucus)',
      ],
      commonMistakes: [
        'Manger trop en une fois (l\'estomac plein comprime le diaphragme)',
        'Pas assez de protéines (fonte musculaire)',
        'Sauter des repas (faiblesse, fatigue)',
        'Trop de sel (rétention d\'eau)',
        'Continuer à fumer',
      ],
      tips: [
        'Mangez plus le matin et midi, léger le soir',
        'Fractionnez en 5-6 petits repas si essoufflé en mangeant',
        'Repos 30 min après les repas',
        'Hydratez-vous bien (1,5L eau + tisanes)',
        'Limitez les boissons gazeuses (ballonnements)',
      ],
    },

    flareProtocol: {
      title: 'Plan exacerbation BPCO 48h',
      hours0to24: [
        'Repos relatif mais pas alitement total',
        'Augmentez les exercices respiratoires (lèvres pincées)',
        'Hydratez-vous abondamment (fluidifie le mucus)',
        'Prenez vos traitements habituels comme prescrits',
        'Surveillez : fièvre, changement de couleur des crachats, essoufflement aggravé',
        'Si aggravation franche : contactez votre médecin',
      ],
      hours24to48: [
        'Si amélioration : reprenez très doucement les activités',
        'Continuez hydratation et exercices respiratoires',
        'Marche très courte (5 min) si supportée',
        'Repos supplémentaire la nuit',
        'Si pas d\'amélioration ou aggravation : consultez',
      ],
      resumeActivity: 'Attendez 2-3 jours après la fin des symptômes aigus pour reprendre l\'activité. Recommencez à un niveau en dessous. Si exacerbations fréquentes : parlez-en à votre médecin.',
    },

    alertSigns: [
      'Essoufflement brutal et intense, pire qu\'habitude',
      'Lèvres ou ongles bleutés (cyanose)',
      'Confusion, somnolence anormale',
      'Fièvre élevée avec crachats purulents',
      'Douleur thoracique',
      'Toux sanglante',
      'Impossibilité de parler',
    ],

    sources: [
      { name: 'GOLD Guidelines (Global Initiative for Chronic Obstructive Lung Disease)', year: 2024 },
      { name: 'HAS - Guide parcours de soins BPCO', year: 2022 },
      { name: 'Cochrane: Pulmonary rehabilitation for COPD', year: 2021 },
      { name: 'European Respiratory Society Guidelines', year: 2023 },
    ],
  },

  // ========== OTITES À RÉPÉTITION (ENFANT) ==========
  {
    id: 'otites-repetition-enfant',
    slug: 'otites-repetition-enfant',
    name: 'Otites à répétition (enfant)',
    category: 'orl-respiratoire',
    shortDescription: 'Infections récurrentes de l\'oreille chez l\'enfant, souvent virales.',
    audience: 'enfant',
    readingTime: 7,
    lastUpdated: '2024-01',

    quickSummary: `Votre enfant a souvent mal aux oreilles ? Les otites à répétition (plus de 3-4 par an) sont fréquentes chez les petits. La trompe d'Eustache, qui relie l'oreille au nez, est courte et horizontale chez l'enfant : les microbes y passent facilement. La bonne nouvelle : la plupart des otites guérissent spontanément. Les lavages de nez, l'aération des pièces et quelques gestes simples réduisent les récidives. Avec la croissance, ça s'améliore généralement.`,

    physiopathology: `L'oreille moyenne (derrière le tympan) est reliée au nez par un petit tube appelé trompe d'Eustache. Chez l'enfant, ce tube est court, horizontal et immature : les microbes du nez y montent facilement. Quand l'enfant a un rhume, la trompe se bouche, du liquide s'accumule derrière le tympan et s'infecte. Les facteurs favorisants : collectivité (crèche), tabagisme passif, tétine après 6 mois, reflux, allergies. L'allaitement maternel protège.`,

    top5NonMedical: [
      {
        title: 'Laver le nez régulièrement',
        description: 'Sérum physiologique ou spray eau de mer, plusieurs fois par jour surtout quand le nez coule. Ça dégage la trompe d\'Eustache.',
        icon: '💧',
      },
      {
        title: 'Aérer et dépoussiérer',
        description: '10-15 min d\'aération quotidienne. Évitez la poussière, les acariens, la fumée de cigarette.',
        icon: '🌬️',
      },
      {
        title: 'Moucher correctement',
        description: 'Une narine après l\'autre, doucement. Apprenez à l\'enfant dès que possible. Mouchoirs jetables.',
        icon: '🤧',
      },
      {
        title: 'Limiter la tétine',
        description: 'Après 6 mois, la tétine favorise les otites. Essayez de la limiter à l\'endormissement.',
        icon: '👶',
      },
      {
        title: 'Éviter le tabagisme passif',
        description: 'La fumée irrite les voies respiratoires et favorise les infections. Jamais de tabac à la maison.',
        icon: '🚭',
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Prévention quotidienne',
        days: [
          { day: 'Jour 1', actions: ['Lavage de nez matin et soir', 'Aérer la chambre 10 min', 'Vérifier l\'humidité de l\'air'] },
          { day: 'Jour 2', actions: ['Lavages de nez 2-3x', 'Aérer', 'Nettoyer les jouets et doudous'] },
          { day: 'Jour 3', actions: ['Lavages', 'Aérer', 'Proposer à boire régulièrement'] },
          { day: 'Jour 4', actions: ['Lavages', 'Aérer', 'Vérifier qu\'il n\'y a pas de tabagisme passif'] },
          { day: 'Jour 5', actions: ['Lavages', 'Aérer', 'Limiter la tétine'] },
          { day: 'Jour 6', actions: ['Lavages', 'Aérer', 'Sortie au grand air si possible'] },
          { day: 'Jour 7', actions: ['Bilan de la semaine : les gestes sont-ils devenus une habitude ?'] },
        ],
      },
      {
        level: 1,
        levelName: 'Pendant un rhume (prévenir l\'otite)',
        days: [
          { day: 'Jour 1', actions: ['Lavages de nez 4-5x/jour', 'Surélever légèrement la tête du lit', 'Hydrater++'] },
          { day: 'Jour 2', actions: ['Lavages fréquents', 'Moucher régulièrement', 'Repos calme'] },
          { day: 'Jour 3', actions: ['Lavages', 'Surveiller fièvre et comportement', 'Aérer malgré le rhume'] },
          { day: 'Jour 4', actions: ['Lavages', 'Si fièvre persiste ou douleur oreille : voir médecin'] },
          { day: 'Jour 5', actions: ['Lavages', 'Normalement amélioration du rhume'] },
          { day: 'Jour 6', actions: ['Lavages', 'Reprendre activités normales si mieux'] },
          { day: 'Jour 7', actions: ['Maintenir les lavages encore quelques jours'] },
        ],
      },
      {
        level: 2,
        levelName: 'Après une otite (éviter la récidive)',
        days: [
          { day: 'Jour 1', actions: ['Continuer les lavages de nez', 'Repos', 'Hydratation'] },
          { day: 'Jour 2', actions: ['Lavages', 'Reprise progressive des activités'] },
          { day: 'Jour 3', actions: ['Lavages', 'Aérer la chambre++', 'Laver les doudous à 60°C'] },
          { day: 'Jour 4', actions: ['Lavages', 'Éviter les lieux très fréquentés si possible'] },
          { day: 'Jour 5', actions: ['Lavages', 'Retour en collectivité si plus de fièvre depuis 24h'] },
          { day: 'Jour 6', actions: ['Maintenir les bonnes habitudes'] },
          { day: 'Jour 7', actions: ['Continuer la prévention quotidienne'] },
        ],
      },
    ],

    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Programme prévention long terme',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Installer les routines', exercises: ['Lavages de nez matin/soir', 'Aération quotidienne', 'Vérifier humidité (40-60%)'] },
          { week: 'Semaines 3-4', focus: 'Hygiène environnement', exercises: ['Nettoyage approfondi chambre', 'Lavage doudous/peluches', 'Éliminer sources de poussière'] },
          { week: 'Semaines 5-6', focus: 'Renforcer les défenses', exercises: ['Alimentation variée et équilibrée', 'Sorties quotidiennes au grand air', 'Sommeil suffisant (10-12h)'] },
          { week: 'Semaines 7-8', focus: 'Bilan et ajustements', exercises: ['Moins d\'otites ce mois-ci ?', 'Maintenir les routines', 'Consulter ORL si toujours fréquentes'] },
        ],
      },
    ],

    nutrition: {
      idealPlate: [
        'Légumes et fruits variés (vitamines C et A)',
        'Poisson 2x/semaine (oméga-3)',
        'Produits laitiers (pour l\'immunité)',
        'Céréales complètes',
        'Beaucoup d\'eau et bouillons',
      ],
      commonMistakes: [
        'Trop de sucre (affaiblit les défenses)',
        'Pas assez de légumes',
        'Grignotages (perturbent l\'appétit aux repas)',
        'Lait en excès (peut favoriser le mucus chez certains enfants)',
        'Oublier l\'hydratation',
      ],
      tips: [
        'Vitamine D en supplémentation l\'hiver (demandez au pédiatre)',
        'Évitez le biberon couché (reflux → otites)',
        'Allaitez si possible les premiers mois (protecteur)',
        'Pas de miel avant 1 an',
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
      { name: 'AAP Guidelines: Otitis Media with Effusion', year: 2016 },
      { name: 'HAS - Antibiothérapie par voie générale en pratique courante dans les infections respiratoires hautes', year: 2021 },
      { name: 'Société Française de Pédiatrie - Recommandations', year: 2022 },
      { name: 'Cochrane: Antibiotics for acute otitis media in children', year: 2015 },
    ],
  },
];

// ============================================
// RESOURCES
// ============================================

export const resources: Resource[] = [
  {
    id: 'res-arthrose-comprendre',
    pathologyId: 'arthrose',
    title: 'Comprendre l\'arthrose en 5 minutes',
    summary: 'Qu\'est-ce que l\'arthrose ? Pourquoi ça fait mal ? Les réponses simples.',
    type: 'comprendre',
    audience: 'senior',
    readingTime: 5,
  },
  {
    id: 'res-arthrose-exercices',
    pathologyId: 'arthrose',
    title: 'Exercices pour le genou arthrosique',
    summary: '5 exercices simples à faire chez soi pour soulager l\'arthrose du genou.',
    type: 'exercices',
    audience: 'senior',
    readingTime: 10,
  },
  {
    id: 'res-lombalgie-bouger',
    pathologyId: 'lombalgie-chronique',
    title: 'Mal de dos : bouger plutôt que se reposer',
    summary: 'Pourquoi le repos aggrave le mal de dos et comment reprendre l\'activité.',
    type: 'bouger',
    audience: 'adulte',
    readingTime: 7,
  },
  {
    id: 'res-veines-contention',
    pathologyId: 'insuffisance-veineuse',
    title: 'Bien porter ses bas de contention',
    summary: 'Comment choisir, mettre et entretenir ses bas de contention.',
    type: 'hygiene',
    audience: 'senior',
    readingTime: 5,
  },
  {
    id: 'res-bpco-respiration',
    pathologyId: 'bpco',
    title: 'Exercices respiratoires pour la BPCO',
    summary: 'Techniques de respiration pour mieux gérer l\'essoufflement au quotidien.',
    type: 'exercices',
    audience: 'adulte',
    readingTime: 8,
  },
  {
    id: 'res-otites-prevention',
    pathologyId: 'otites-repetition-enfant',
    title: 'Prévenir les otites chez l\'enfant',
    summary: 'Les gestes simples pour réduire les otites à répétition.',
    type: 'hygiene',
    audience: 'enfant',
    readingTime: 6,
  },
];
