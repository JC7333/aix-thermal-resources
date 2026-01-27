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

export interface DailyPlan {
  level: MobilityLevel;
  levelName: string;
  actions: string[];
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
  
  // Plan du jour (NOUVEAU)
  dailyPlans?: DailyPlan[];
  
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
  0: 'Niveau 0 — Très facile (mobilité très limitée)',
  1: 'Niveau 1 — Facile (mobilité limitée)',
  2: 'Niveau 2 — Normal (mobilité correcte)',
  3: 'Niveau 3 — Actif (bonne mobilité)',
};

// ============================================
// PATHOLOGIES MVP COMPLÈTES — TON HUMAIN
// ============================================

export const pathologies: Pathology[] = [
  // ========== ARTHROSE ==========
  {
    id: 'arthrose',
    slug: 'arthrose',
    name: 'Arthrose',
    category: 'rhumatologie',
    shortDescription: 'Je vous aide à mieux vivre avec l\'arthrose au quotidien.',
    audience: 'senior',
    readingTime: 8,
    lastUpdated: 'Janvier 2025',

    // En 2 minutes
    quickSummary: `Je sais que l'arthrose peut être vraiment handicapante au quotidien. La bonne nouvelle ? Ce n'est pas une fatalité. Votre cartilage a besoin de mouvement pour rester en bonne santé. 

Je vous propose ici des conseils simples et concrets pour soulager vos douleurs. Pas de recette miracle, mais des gestes qui ont fait leurs preuves. La plupart des personnes voient une vraie amélioration en quelques semaines, simplement en bougeant un peu plus et en appliquant quelques principes de base.

En cas de doute ou de symptômes inhabituels, n'hésitez pas à consulter un professionnel de santé.`,

    // Physiopathologie vulgarisée
    physiopathology: `Pour comprendre simplement : imaginez votre cartilage comme une éponge. 

Quand vous bougez, cette éponge se comprime et absorbe le liquide nutritif de votre articulation. Quand vous vous arrêtez, elle se regonfle. C'est comme ça qu'elle se nourrit.

Si vous restez immobile trop longtemps, l'éponge s'assèche et s'abîme. C'est pour ça que je dis toujours à mes patients : "Le repos prolongé est l'ennemi de l'arthrose." Je sais, ça peut sembler contre-intuitif quand on a mal. Mais c'est vraiment le mouvement régulier et doux qui protège vos articulations.`,

    // Top 5 non médicamenteux
    top5NonMedical: [
      {
        title: 'Bouger un peu chaque jour',
        description: 'Mon conseil n°1 : 30 minutes de marche, vélo ou natation par jour. Si c\'est trop au début, commencez par 5 minutes. L\'important, c\'est la régularité.',
        icon: '🚶',
      },
      {
        title: 'Appliquer de la chaleur',
        description: 'Une bouillotte 15-20 minutes sur l\'articulation douloureuse. Ça détend les muscles et ça soulage vraiment. Faites-le le matin au réveil ou le soir.',
        icon: '🔥',
      },
      {
        title: 'Renforcer les muscles autour',
        description: 'Des muscles forts = moins de pression sur l\'articulation. Je vous montre des exercices simples, adaptés à votre niveau.',
        icon: '💪',
      },
      {
        title: 'Surveiller le poids',
        description: 'Je ne vous demande pas de faire un régime drastique. Mais sachez que chaque kilo perdu enlève 4 kilos de pression sur vos genoux. Même 2-3 kilos font une différence.',
        icon: '⚖️',
      },
      {
        title: 'Changer de position souvent',
        description: 'Ne restez jamais plus d\'une heure dans la même position. Levez-vous, faites quelques pas, étirez-vous. Votre corps vous remerciera.',
        icon: '🔄',
      },
    ],

    // Plan du jour (NOUVEAU)
    dailyPlans: [
      {
        level: 0,
        levelName: 'Version très facile',
        actions: [
          '5 minutes de mouvements doux sur votre chaise (bougez les chevilles, pliez les genoux)',
          'Appliquez une bouillotte 15 minutes sur la zone douloureuse',
          'Marchez dans votre appartement, même juste 3 minutes',
        ],
      },
      {
        level: 1,
        levelName: 'Version normale',
        actions: [
          '15 minutes d\'exercices doux (je vous les détaille plus bas)',
          '20-30 minutes de marche à votre rythme',
          'Bouillotte ou bain chaud le soir si raideur',
        ],
      },
    ],

    // Plan 7 jours par niveau
    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Très facile — Je bouge à peine',
        days: [
          { day: 'Jour 1', actions: ['5 min de mouvements sur chaise', 'Bouillotte 15 min'] },
          { day: 'Jour 2', actions: ['5 min mouvements + 3 min de marche dans la maison', 'Buvez 6 verres d\'eau'] },
          { day: 'Jour 3', actions: ['7 min mouvements variés', 'Marche 5 min', 'Bouillotte le soir'] },
          { day: 'Jour 4', actions: ['7 min mouvements + 1 exercice couché', 'Marche 5-7 min'] },
          { day: 'Jour 5', actions: ['10 min mouvements', 'Marche 10 min (en 2 fois si besoin)'] },
          { day: 'Jour 6', actions: ['10 min mouvements', 'Marche 10-15 min', 'Félicitez-vous !'] },
          { day: 'Jour 7', actions: ['Repos actif : mouvements doux', 'Notez vos progrès de la semaine'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je me fatigue vite',
        days: [
          { day: 'Jour 1', actions: ['10 min exercices doux', 'Marche 10-15 min', 'Chaleur si raideur'] },
          { day: 'Jour 2', actions: ['10 min exercices', 'Marche 15 min', 'Hydratation : 1,5L'] },
          { day: 'Jour 3', actions: ['12 min exercices avec renforcement léger', 'Marche 15-20 min'] },
          { day: 'Jour 4', actions: ['12 min exercices', 'Marche 20 min (pauses ok)'] },
          { day: 'Jour 5', actions: ['15 min exercices', 'Marche 20 min'] },
          { day: 'Jour 6', actions: ['15 min exercices', 'Marche 25 min', 'Étirements le soir'] },
          { day: 'Jour 7', actions: ['Repos actif : marche tranquille', 'Bilan : comment ça va ?'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — Je peux marcher 30 min',
        days: [
          { day: 'Jour 1', actions: ['15 min exercices complets', 'Marche 30 min'] },
          { day: 'Jour 2', actions: ['15 min exercices', 'Marche 30 min ou vélo 20 min'] },
          { day: 'Jour 3', actions: ['20 min exercices', 'Marche 30 min', 'Étirements 10 min'] },
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
          { day: 'Jour 2', actions: ['20 min mobilité + équilibre', 'Marche rapide 40 min'] },
          { day: 'Jour 3', actions: ['25 min renforcement', 'Cardio 40 min', 'Étirements'] },
          { day: 'Jour 4', actions: ['20 min exercices', 'Sport plaisir 45 min'] },
          { day: 'Jour 5', actions: ['25 min renforcement', 'Cardio 45 min'] },
          { day: 'Jour 6', actions: ['20 min exercices', 'Activité longue 1h'] },
          { day: 'Jour 7', actions: ['Repos actif : yoga, natation douce'] },
        ],
      },
    ],

    // Programme 8 semaines
    eightWeekPrograms: [
      {
        level: 0,
        levelName: 'Très facile — Je démarre doucement',
        weeks: [
          { week: 'Semaines 1-2', focus: 'On réveille le corps', exercises: ['Mouvements sur chaise 5-10 min/jour', 'Marche 5 min 2x/jour dans la maison', 'Bouillotte quotidienne'] },
          { week: 'Semaines 3-4', focus: 'On gagne en amplitude', exercises: ['Mouvements 10 min/jour', 'Ajouter 1 exercice couché', 'Marche 10 min/jour'] },
          { week: 'Semaines 5-6', focus: 'Premiers renforcements', exercises: ['Exercices 15 min', 'Marche 15-20 min/jour', 'Montées sur pointes si possible'] },
          { week: 'Semaines 7-8', focus: 'On consolide', exercises: ['Routine 20 min', 'Marche 25-30 min', 'Objectif : passer au niveau 1'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je progresse à mon rythme',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Base solide', exercises: ['Exercices 15 min/jour', 'Marche 20 min/jour'] },
          { week: 'Semaines 3-4', focus: 'On augmente', exercises: ['Exercices 20 min', 'Marche 25-30 min', 'Étirements le soir'] },
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
          { week: 'Semaines 5-6', focus: 'Endurance', exercises: ['Renforcement complet 25 min', 'Cardio 45 min'] },
          { week: 'Semaines 7-8', focus: 'Autonomie', exercises: ['Programme personnel 30 min 5x/sem', 'Cardio 45 min'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je vise le maintien long terme',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Optimiser', exercises: ['Renforcement 30 min 5x/sem', 'Cardio varié 45 min'] },
          { week: 'Semaines 3-4', focus: 'Performance douce', exercises: ['Circuits complets', 'Cardio 50 min'] },
          { week: 'Semaines 5-6', focus: 'Sport plaisir', exercises: ['Intégrer une activité sportive régulière'] },
          { week: 'Semaines 7-8', focus: 'Maintien', exercises: ['Routine personnalisée', 'Réévaluation tous les 3 mois'] },
        ],
      },
    ],

    // Nutrition
    nutrition: {
      idealPlate: [
        '½ assiette de légumes colorés — ils sont anti-inflammatoires naturels',
        '¼ de protéines (poisson 2-3x/semaine, œufs, volaille)',
        '¼ de féculents complets (riz complet, patate douce)',
        'Huile d\'olive pour assaisonner',
        'Fruits en dessert (fruits rouges, agrumes)',
      ],
      commonMistakes: [
        'Faire un régime restrictif → ça affaiblit les muscles qui protègent l\'articulation',
        'Trop de sucres rapides (gâteaux, sodas) → ça augmente l\'inflammation',
        'Pas assez de protéines → les muscles fondent',
      ],
      tips: [
        'Poisson gras 2-3x/semaine (saumon, sardines)',
        'Au moins 1,5L d\'eau par jour — le cartilage a besoin d\'eau',
        'Si surpoids : visez -5% du poids, pas plus, c\'est déjà efficace',
      ],
    },

    // Plan poussée 48h
    flareProtocol: {
      title: 'Crise de douleur — Que faire pendant 48h',
      hours0to24: [
        'Réduisez les activités mais ne restez pas immobile',
        'Bouillotte ou bain chaud 20 min, 3-4 fois dans la journée',
        'Quelques mouvements très doux pour éviter l\'enraidissement',
        'Buvez bien : 1,5 à 2 litres',
        'Position confortable : coussin sous les genoux si couché',
      ],
      hours24to48: [
        'Reprenez progressivement les mouvements',
        'Continuez la chaleur si ça soulage',
        'Marche courte (5-10 min) plusieurs fois',
        'Étirements doux le soir',
      ],
      resumeActivity: 'Si la douleur diminue de moitié, reprenez votre programme au niveau en dessous. Si ça persiste après 48h ou si ça s\'aggrave : consultez-moi.',
    },

    // Red flags
    alertSigns: [
      'Douleur brutale et intense sans raison apparente',
      'Articulation très gonflée, rouge et chaude',
      'Fièvre associée aux douleurs',
      'Blocage complet de l\'articulation',
      'Perte de force brutale',
      'Douleur qui vous réveille chaque nuit',
    ],

    // Sources
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
    name: 'Lombalgie chronique',
    category: 'rhumatologie',
    shortDescription: 'Je vous accompagne pour soulager votre mal de dos chronique.',
    audience: 'adulte',
    readingTime: 8,
    lastUpdated: 'Janvier 2025',

    quickSummary: `Votre dos vous fait mal depuis plus de 3 mois ? Je sais à quel point c'est usant. Dans plus de 90% des cas, il n'y a rien de grave.

Le repos prolongé aggrave les choses. Je sais, ça semble bizarre quand on a mal. Mais vos muscles du dos ont besoin de bouger pour rester forts et protéger votre colonne.

Avec les bons exercices et quelques ajustements simples, la plupart des personnes voient une vraie amélioration. Ça prend un peu de temps, mais ça marche. Si les symptômes persistent ou s'aggravent, consultez un professionnel de santé.`,

    physiopathology: `Votre colonne lombaire porte le poids de tout votre corps. Elle est faite pour bouger, pas pour rester assise 8 heures par jour.

Quand on reste trop statique, les muscles du dos s'affaiblissent, les disques entre les vertèbres se déshydratent. Les tensions s'accumulent.

Contrairement à ce qu'on entend souvent, le problème vient rarement d'une vertèbre "déplacée". C'est plutôt un déséquilibre musculaire, souvent aggravé par le stress (qui contracte les muscles du dos). La bonne nouvelle : tout ça se corrige avec du mouvement et de la patience.`,

    top5NonMedical: [
      {
        title: 'Bouger malgré la douleur',
        description: 'C\'est mon conseil principal. Marche, natation, vélo : reprenez progressivement. La douleur ne veut pas dire que vous vous abîmez.',
        icon: '🚶',
      },
      {
        title: 'Renforcer le gainage',
        description: '10 minutes de gainage par jour suffisent. Des abdos et muscles du dos forts = une colonne stable.',
        icon: '💪',
      },
      {
        title: 'Changer de position régulièrement',
        description: 'Ne restez jamais plus d\'1 heure assis. Levez-vous, étirez-vous. C\'est plus important que d\'avoir la posture "parfaite".',
        icon: '🔄',
      },
      {
        title: 'Gérer le stress',
        description: 'Le stress contracte les muscles du dos. Respiration, relaxation, activités qui vous font plaisir — c\'est du soin.',
        icon: '🧘',
      },
      {
        title: 'Bien dormir',
        description: 'Matelas ni trop mou ni trop dur. Un coussin entre les genoux si vous dormez sur le côté. Le sommeil répare.',
        icon: '😴',
      },
    ],

    dailyPlans: [
      {
        level: 0,
        levelName: 'Version très facile',
        actions: [
          'Marcher 5 minutes dans la maison, même lentement',
          'Position allongée : genoux fléchis, pieds au sol, 10 min pour soulager',
          '3 fois dans la journée : 3 min de respiration calme, mains sur le ventre',
        ],
      },
      {
        level: 1,
        levelName: 'Version normale',
        actions: [
          '15 minutes d\'exercices doux (étirements + gainage léger)',
          'Marche 20-30 minutes à votre rythme',
          'Le soir : 5 minutes d\'étirements avant de dormir',
        ],
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Très facile — J\'ai vraiment mal',
        days: [
          { day: 'Jour 1', actions: ['Marcher 5 min dans la maison', 'Position délordose 10 min', 'Respiration 3x3 min'] },
          { day: 'Jour 2', actions: ['Marche 5-10 min', 'Exercices doux (chat-vache)', 'Chaleur si spasme'] },
          { day: 'Jour 3', actions: ['Marche 10 min', 'Exercices 10 min', 'Respiration le soir'] },
          { day: 'Jour 4', actions: ['Marche 10-15 min', 'Exercices 10 min', 'Éviter assis prolongé'] },
          { day: 'Jour 5', actions: ['Marche 15 min', 'Exercices 15 min avec gainage léger'] },
          { day: 'Jour 6', actions: ['Marche 15-20 min', 'Exercices + gainage', 'Étirements soir'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Notez comment vous vous sentez'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Ça va mieux',
        days: [
          { day: 'Jour 1', actions: ['Marche 15 min', 'Exercices 15 min', 'Étirements soir'] },
          { day: 'Jour 2', actions: ['Marche 20 min', 'Exercices 15 min', 'Pause toutes les 45 min si assis'] },
          { day: 'Jour 3', actions: ['Marche 20-25 min', 'Exercices complets 20 min'] },
          { day: 'Jour 4', actions: ['Marche ou vélo 25 min', 'Exercices 20 min', 'Relaxation 10 min'] },
          { day: 'Jour 5', actions: ['Marche 25-30 min', 'Exercices 20 min'] },
          { day: 'Jour 6', actions: ['Activité plaisir 30 min', 'Exercices', 'Étirements'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Bilan de la semaine'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — Je reprends confiance',
        days: [
          { day: 'Jour 1', actions: ['Cardio 30 min', 'Renforcement dos/abdos 20 min'] },
          { day: 'Jour 2', actions: ['Marche 35 min', 'Exercices 20 min', 'Étirements 10 min'] },
          { day: 'Jour 3', actions: ['Cardio 35 min', 'Renforcement complet 25 min'] },
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
          { day: 'Jour 1', actions: ['Cardio 45 min', 'Renforcement complet 30 min'] },
          { day: 'Jour 2', actions: ['Sport 45-60 min', 'Gainage 15 min'] },
          { day: 'Jour 3', actions: ['Cardio varié 45 min', 'Renforcement + équilibre'] },
          { day: 'Jour 4', actions: ['Sport plaisir 1h', 'Stretching'] },
          { day: 'Jour 5', actions: ['Cardio 50 min', 'Renforcement 30 min'] },
          { day: 'Jour 6', actions: ['Activité longue durée', 'Récupération'] },
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
          { week: 'Semaines 3-4', focus: 'Progresser doucement', exercises: ['Marche 15-20 min/jour', 'Exercices 15 min + gainage débutant'] },
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
        'Trop de sucre et aliments ultra-transformés → inflammatoires',
        'Pas assez de protéines → les muscles du dos s\'affaiblissent',
        'Oublier de boire → les disques sont composés d\'eau',
      ],
      tips: [
        'Hydratez-vous : 1,5 à 2L d\'eau par jour',
        'Poissons gras, légumes verts, fruits rouges = anti-inflammatoire',
        'Si surpoids : même 5% de poids en moins soulage le dos',
      ],
    },

    flareProtocol: {
      title: 'Crise lombaire — Les 48 premières heures',
      hours0to24: [
        'Ne vous allongez pas toute la journée : bougez régulièrement, même 5 min',
        'Position de délordose : couché, genoux fléchis sur un coussin, 15-20 min',
        'Chaleur sur les lombaires si contractures',
        'Respiration abdominale 5 min, 3-4 fois',
        'Marche lente dans la maison',
      ],
      hours24to48: [
        'Augmentez progressivement les périodes de marche',
        'Reprenez les exercices très doux',
        'Alternez debout/assis/couché',
        'Dormez avec coussin entre les genoux',
      ],
      resumeActivity: 'Si la douleur baisse de moitié, reprenez au niveau en dessous. Si ça reste intense, ou si vous avez des fourmillements dans les jambes : consultez.',
    },

    alertSigns: [
      'Perte de contrôle des urines ou des selles',
      'Engourdissement de la zone entre les jambes',
      'Faiblesse progressive des deux jambes',
      'Douleur intense qui vous réveille chaque nuit',
      'Fièvre associée',
      'Perte de poids inexpliquée avec douleur dorsale',
    ],

    sources: [
      { name: 'NICE Guidelines — Low back pain', year: 2020 },
      { name: 'HAS — Lombalgie commune', year: 2019 },
      { name: 'Lancet Series on Low Back Pain', year: 2018 },
    ],
  },

  // ========== INSUFFISANCE VEINEUSE CHRONIQUE ==========
  {
    id: 'insuffisance-veineuse-chronique',
    slug: 'insuffisance-veineuse-chronique',
    name: 'Insuffisance veineuse chronique',
    category: 'veino-lymphatique',
    shortDescription: 'Je vous aide à soulager vos jambes lourdes au quotidien.',
    audience: 'senior',
    readingTime: 7,
    lastUpdated: 'Janvier 2025',

    quickSummary: `Vos jambes sont lourdes, gonflent en fin de journée, vous avez des varices ? C'est l'insuffisance veineuse. Le sang a du mal à remonter vers le cœur et stagne.

La bonne nouvelle : vous avez dans vos mollets une "pompe" naturelle. À chaque pas, vos muscles compriment les veines et propulsent le sang vers le haut. C'est pour ça que la marche est votre meilleur allié.

Porter des bas de contention, surélever les jambes le soir, éviter la chaleur — ces gestes simples font une vraie différence. Si les symptômes persistent, un professionnel de santé pourra évaluer votre situation.`,

    physiopathology: `Vos veines des jambes contiennent de petites valves, comme des portes battantes qui empêchent le sang de redescendre.

Avec le temps, ces valves peuvent s'affaiblir. Le sang stagne, les veines se dilatent (ce sont les varices), et du liquide s'accumule dans les tissus (œdème).

Votre meilleure alliée ? La pompe musculaire du mollet. À chaque pas, vos muscles compriment les veines et propulsent le sang vers le haut. C'est pourquoi rester immobile aggrave le problème, et marcher l'améliore.`,

    top5NonMedical: [
      {
        title: 'Marcher tous les jours',
        description: '30 min de marche active la pompe du mollet. C\'est le traitement n°1. Prenez les escaliers, descendez un arrêt de bus plus tôt.',
        icon: '🚶',
      },
      {
        title: 'Porter des bas de contention',
        description: 'Ils compriment les veines et aident le retour du sang. Je vous les prescris, ils sont remboursés. Mettez-les le matin au réveil.',
        icon: '🧦',
      },
      {
        title: 'Surélever les jambes',
        description: '15-20 min, 2 fois par jour. Vous pouvez aussi surélever les pieds du lit de 10-15 cm. Ça draine passivement le sang vers le cœur.',
        icon: '🦶',
      },
      {
        title: 'Éviter la chaleur',
        description: 'Pas de bains trop chauds, pas de sauna, évitez le soleil sur les jambes. La chaleur dilate les veines et aggrave la stagnation.',
        icon: '❄️',
      },
      {
        title: 'Faire des exercices de mollets',
        description: 'Flexion-extension des pieds, montées sur pointes. Vous pouvez le faire assis, debout, même couché, plusieurs fois par jour.',
        icon: '💪',
      },
    ],

    dailyPlans: [
      {
        level: 0,
        levelName: 'Version très facile',
        actions: [
          'Surélever les jambes 15 min (sur un coussin ou contre le mur)',
          'Flexion-extension des pieds 20 fois, assis — faites-le 3 fois dans la journée',
          'Marcher 5 min dans la maison',
        ],
      },
      {
        level: 1,
        levelName: 'Version normale',
        actions: [
          '20-30 min de marche à votre rythme',
          'Exercices de mollets 10 min (montées sur pointes, flexions)',
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
          { day: 'Jour 2', actions: ['Surélévation', 'Exercices pieds', 'Marche 2x5 min', 'Jet d\'eau fraîche sur jambes'] },
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
          { day: 'Jour 2', actions: ['Surélévation', 'Exercices + montées sur pointes 15x', 'Marche 20 min'] },
          { day: 'Jour 3', actions: ['Surélévation', 'Exercices 15 min', 'Marche 20 min', 'Douche fraîche jambes'] },
          { day: 'Jour 4', actions: ['Surélévation', 'Exercices + marche sur pointes 1 min', 'Marche 25 min'] },
          { day: 'Jour 5', actions: ['Surélévation', 'Exercices complets 15 min', 'Marche 25 min'] },
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
          { day: 'Jour 6', actions: ['Sport plaisir 1h', 'Surélévation récupération'] },
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
          { week: 'Semaines 3-4', focus: 'Augmenter la marche', exercises: ['Surélévation quotidienne', 'Exercices complets 10 min', 'Marche 20 min/jour'] },
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
        'Fruits rouges (myrtilles, cassis, framboises) — ils renforcent les parois veineuses',
        'Légumes verts à chaque repas',
        'Poisson 2-3x/semaine',
        'Eau : au moins 1,5L par jour',
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
    name: 'BPCO',
    category: 'orl-respiratoire',
    shortDescription: 'Je vous accompagne pour mieux respirer au quotidien.',
    audience: 'adulte',
    readingTime: 8,
    lastUpdated: 'Janvier 2025',

    quickSummary: `Vous êtes essoufflé au moindre effort ? Vous toussez souvent ? La BPCO (Broncho-Pneumopathie Chronique Obstructive) touche vos poumons, mais ne vous condamne pas à l'immobilité.

Je sais que c'est frustrant d'être essoufflé. Mais moins on bouge, plus les muscles s'affaiblissent, et plus on s'essouffle vite. C'est un cercle vicieux qu'on peut casser.

L'activité physique adaptée est un vrai traitement. Elle renforce vos muscles respiratoires et améliore votre qualité de vie. Arrêter de fumer reste essentiel. En cas d'essoufflement inhabituel ou de symptômes inquiétants, contactez un professionnel de santé.`,

    physiopathology: `Dans la BPCO, vos bronches sont inflammées et rétrécies. L'air a du mal à sortir des poumons, vous vous sentez "bloqué" en fin d'expiration.

C'est souvent lié au tabac, mais pas toujours. L'inflammation abîme les petites bronches et les alvéoles (petits sacs où se fait l'échange d'oxygène).

La bonne nouvelle : même si les dégâts sont là, on peut améliorer les choses. Les muscles respiratoires peuvent se renforcer, et votre corps peut s'adapter pour mieux utiliser l'oxygène disponible. C'est pour ça que l'activité physique est si importante.`,

    top5NonMedical: [
      {
        title: 'Arrêter de fumer',
        description: 'C\'est le plus important. Même après des années, arrêter ralentit la maladie. Je peux vous accompagner ou vous orienter vers un tabacologue.',
        icon: '🚭',
      },
      {
        title: 'Bouger régulièrement',
        description: 'L\'activité physique est un vrai traitement. Commencez très doucement : même 5 min de marche comptent. On augmente progressivement.',
        icon: '🚶',
      },
      {
        title: 'Apprendre à respirer',
        description: 'La respiration "lèvres pincées" (expirer doucement par la bouche, lèvres presque fermées) vous aide à vider vos poumons et reprendre votre souffle.',
        icon: '🌬️',
      },
      {
        title: 'Éviter les polluants',
        description: 'Aérez chez vous, évitez les parfums d\'intérieur, la poussière, les fumées. Vos bronches sont sensibles.',
        icon: '🏠',
      },
      {
        title: 'Se faire vacciner',
        description: 'Grippe chaque année, pneumocoque selon les recommandations. Les infections aggravent la BPCO.',
        icon: '💉',
      },
    ],

    dailyPlans: [
      {
        level: 0,
        levelName: 'Version très facile',
        actions: [
          'Respiration lèvres pincées : 5 minutes, 3 fois dans la journée',
          'Marcher 5 minutes dans la maison, à votre rythme, avec des pauses si besoin',
          'Quelques exercices assis : lever les bras, faire des cercles',
        ],
      },
      {
        level: 1,
        levelName: 'Version normale',
        actions: [
          'Exercices respiratoires 10 minutes',
          'Marche 20-30 minutes (pauses autorisées !)',
          'Renforcement musculaire léger 10 minutes',
        ],
      },
    ],

    sevenDayPlans: [
      {
        level: 0,
        levelName: 'Très facile — Je suis très essoufflé',
        days: [
          { day: 'Jour 1', actions: ['Respiration lèvres pincées 5 min 3x', 'Marche 5 min dans la maison', 'Exercices assis 5 min'] },
          { day: 'Jour 2', actions: ['Respirations', 'Marche 2x5 min', 'Exercices assis 5 min'] },
          { day: 'Jour 3', actions: ['Respirations', 'Marche 2x5 min', 'Exercices assis + bras 7 min'] },
          { day: 'Jour 4', actions: ['Respirations', 'Marche 10 min total', 'Exercices 7 min'] },
          { day: 'Jour 5', actions: ['Respirations', 'Marche 10-12 min', 'Exercices 10 min'] },
          { day: 'Jour 6', actions: ['Respirations', 'Marche 12-15 min', 'Exercices 10 min'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Notez vos progrès'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je m\'essouffle à l\'effort',
        days: [
          { day: 'Jour 1', actions: ['Respirations 10 min', 'Marche 15-20 min', 'Exercices 10 min'] },
          { day: 'Jour 2', actions: ['Respirations', 'Marche 20 min', 'Renforcement léger 10 min'] },
          { day: 'Jour 3', actions: ['Respirations', 'Marche 20-25 min', 'Exercices 15 min'] },
          { day: 'Jour 4', actions: ['Respirations', 'Marche 25 min', 'Renforcement 15 min'] },
          { day: 'Jour 5', actions: ['Respirations', 'Marche 25-30 min', 'Exercices 15 min'] },
          { day: 'Jour 6', actions: ['Respirations', 'Marche ou vélo 30 min', 'Renforcement 15 min'] },
          { day: 'Jour 7', actions: ['Repos actif', 'Bilan de la semaine'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — Essoufflement modéré',
        days: [
          { day: 'Jour 1', actions: ['Respirations', 'Cardio 30-35 min', 'Renforcement 20 min'] },
          { day: 'Jour 2', actions: ['Respirations', 'Marche ou vélo 35 min', 'Exercices 20 min'] },
          { day: 'Jour 3', actions: ['Respirations', 'Cardio 35-40 min', 'Renforcement 20 min'] },
          { day: 'Jour 4', actions: ['Respirations', 'Activité plaisir 40 min'] },
          { day: 'Jour 5', actions: ['Respirations', 'Cardio 40 min', 'Renforcement 20 min'] },
          { day: 'Jour 6', actions: ['Activité extérieure 45 min', 'Récupération'] },
          { day: 'Jour 7', actions: ['Repos actif'] },
        ],
      },
      {
        level: 3,
        levelName: 'Actif — Je tolère bien l\'effort',
        days: [
          { day: 'Jour 1', actions: ['Respirations', 'Cardio 45 min', 'Renforcement 25 min'] },
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
        levelName: 'Très facile — Je démarre',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Retrouver le souffle', exercises: ['Respirations 3x10 min/jour', 'Marche 5 min 2-3x/jour', 'Exercices assis 10 min'] },
          { week: 'Semaines 3-4', focus: 'Augmenter doucement', exercises: ['Respirations', 'Marche 15 min/jour', 'Exercices 15 min'] },
          { week: 'Semaines 5-6', focus: 'Renforcer', exercises: ['Respirations', 'Marche 20 min', 'Exercices + renforcement'] },
          { week: 'Semaines 7-8', focus: 'Stabiliser', exercises: ['Marche 25-30 min', 'Programme complet'] },
        ],
      },
      {
        level: 1,
        levelName: 'Facile — Je progresse',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Base cardio', exercises: ['Respirations', 'Marche 25 min', 'Renforcement 15 min'] },
          { week: 'Semaines 3-4', focus: 'Progression', exercises: ['Cardio 30 min', 'Renforcement 20 min'] },
          { week: 'Semaines 5-6', focus: 'Diversifier', exercises: ['Alterner marche/vélo 35 min'] },
          { week: 'Semaines 7-8', focus: 'Endurance', exercises: ['Cardio 40 min', 'Programme autonome'] },
        ],
      },
      {
        level: 2,
        levelName: 'Normal — J\'ai une bonne base',
        weeks: [
          { week: 'Semaines 1-2', focus: 'Structurer', exercises: ['Cardio 40 min 5x/sem', 'Renforcement 20 min'] },
          { week: 'Semaines 3-4', focus: 'Intensifier', exercises: ['Cardio 45 min', 'Renforcement + endurance'] },
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
        'Féculents en quantité modérée — éviter le surpoids qui gêne la respiration',
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
        'Hydratez-vous abondamment (ça fluidifie le mucus)',
        'Prenez vos traitements habituels comme prescrits',
        'Surveillez : fièvre, changement de couleur des crachats, essoufflement aggravé',
        'Si aggravation franche : contactez-moi',
      ],
      hours24to48: [
        'Si amélioration : reprenez très doucement',
        'Continuez hydratation et exercices respiratoires',
        'Marche très courte (5 min) si supportée',
        'Si pas d\'amélioration : consultez',
      ],
      resumeActivity: 'Attendez 2-3 jours après la fin des symptômes aigus pour reprendre. Recommencez à un niveau en dessous. Si exacerbations fréquentes : on en parle.',
    },

    alertSigns: [
      'Essoufflement brutal et intense, pire que d\'habitude',
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

  // ========== OTITES À RÉPÉTITION (ENFANT) ==========
  {
    id: 'otites-a-repetition-enfant',
    slug: 'otites-a-repetition-enfant',
    name: 'Otites à répétition (enfant)',
    category: 'orl-respiratoire',
    shortDescription: 'Je vous aide à réduire les otites de votre enfant.',
    audience: 'enfant',
    readingTime: 7,
    lastUpdated: 'Janvier 2025',

    quickSummary: `Votre enfant a souvent mal aux oreilles ? Les otites à répétition (plus de 3-4 par an) sont fréquentes chez les petits. Je sais, c'est épuisant pour vous et douloureux pour lui.

La bonne nouvelle : la plupart des otites guérissent spontanément. Et avec quelques gestes simples — lavage de nez, aération, hygiène — on peut vraiment réduire les récidives.

La trompe d'Eustache (le petit tube qui relie l'oreille au nez) est courte chez l'enfant. Elle grandit avec lui, et en général ça s'améliore vers 5-6 ans. En cas de fièvre élevée ou de symptômes inquiétants, consultez rapidement un professionnel de santé.`,

    physiopathology: `L'oreille moyenne (derrière le tympan) est reliée au nez par un petit tube : la trompe d'Eustache.

Chez l'enfant, ce tube est court, horizontal et immature. Résultat : quand votre enfant a un rhume, les microbes montent facilement vers l'oreille. La trompe se bouche, du liquide s'accumule derrière le tympan et s'infecte.

Ce qui favorise les otites : la collectivité (crèche, école), le tabagisme passif, la tétine après 6 mois, les allergies. L'allaitement maternel, lui, protège. Et avec l'âge, la trompe grandit et ça va mieux.`,

    top5NonMedical: [
      {
        title: 'Laver le nez régulièrement',
        description: 'Sérum physiologique ou spray eau de mer, plusieurs fois par jour surtout quand le nez coule. Ça dégage la trompe d\'Eustache.',
        icon: '💧',
      },
      {
        title: 'Aérer et dépoussiérer',
        description: '10-15 minutes d\'aération par jour. Évitez poussière, acariens, fumée de cigarette. La chambre doit être propre et bien ventilée.',
        icon: '🌬️',
      },
      {
        title: 'Moucher correctement',
        description: 'Une narine après l\'autre, doucement. Apprenez-lui dès que possible. Mouchoirs jetables, poubelle avec couvercle.',
        icon: '🤧',
      },
      {
        title: 'Limiter la tétine',
        description: 'Après 6 mois, la tétine favorise les otites. Essayez de la garder seulement pour l\'endormissement.',
        icon: '👶',
      },
      {
        title: 'Pas de tabac à la maison',
        description: 'Le tabagisme passif irrite les voies respiratoires et favorise les infections. Jamais de cigarette à l\'intérieur.',
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
          'Vérifier que l\'humidité est correcte (40-60%)',
        ],
      },
      {
        level: 1,
        levelName: 'Pendant un rhume',
        actions: [
          'Lavages de nez 4-5 fois par jour',
          'Surélever légèrement la tête du lit',
          'Hydrater ++ : proposer à boire souvent',
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
          { day: 'Jour 7', actions: ['Bilan : les gestes sont-ils devenus des habitudes ?'] },
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
    pathologyId: 'insuffisance-veineuse-chronique',
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
    pathologyId: 'otites-a-repetition-enfant',
    title: 'Prévenir les otites chez l\'enfant',
    summary: 'Les gestes simples pour réduire les otites à répétition.',
    type: 'hygiene',
    audience: 'enfant',
    readingTime: 6,
  },
];
