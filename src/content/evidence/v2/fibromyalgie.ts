import { EvidencePackV2 } from './types';

export const fibromyalgie: EvidencePackV2 = {
  slug: 'fibromyalgie',
  title: 'Fibromyalgie',
  category: 'rhumatologie',
  icon: '🦋',
  updated_at: '2026-01-28',
  version: '2.0.0',
  status: 'complete',

  definition: {
    summary: `La fibromyalgie est un syndrome douloureux chronique caractérisé par des douleurs musculaires diffuses, une fatigue intense et des troubles du sommeil. C'est une maladie réelle, reconnue par l'OMS.

Les douleurs sont souvent accompagnées de troubles cognitifs (« brouillard fibromyalgique »), d'hypersensibilité au toucher, au bruit ou à la lumière. L'origine est mal comprise mais implique une sensibilisation du système nerveux central.

Il n'existe pas de traitement miracle, mais une approche combinant exercice adapté, gestion du stress et éducation permet d'améliorer significativement la qualité de vie.`,
    key_points: [
      'Maladie réelle reconnue par l\'OMS depuis 1992',
      'Touche 2-4% de la population (80% de femmes)',
      'Pas de lésion visible mais hyperexcitabilité du système nerveux',
      'L\'exercice adapté est le traitement le plus efficace',
    ],
    prevalence: '2-4% de la population adulte, 80% de femmes',
    risk_factors: [
      'Antécédents de traumatisme physique ou psychologique',
      'Trouble du sommeil chronique',
      'Stress chronique',
      'Syndrome de l\'intestin irritable',
      'Antécédents familiaux de fibromyalgie',
    ],
  },

  recommendations: [
    {
      text: 'Exercice physique adapté : C\'est le traitement le plus efficace. Commencer très progressivement (même 5 min).',
      level: 'Élevé',
      tags: ['essentiel', 'exercice'],
      source_ref: 'EULAR 2017',
    },
    {
      text: 'Exercice aérobie : marche, natation, vélo. Intensité légère à modérée, régularité > intensité.',
      level: 'Élevé',
      tags: ['exercice', 'essentiel'],
      source_ref: 'Cochrane 2017',
    },
    {
      text: 'Éducation thérapeutique : comprendre la maladie aide à mieux la gérer.',
      level: 'Élevé',
      tags: ['éducation'],
      source_ref: 'EULAR 2017',
    },
    {
      text: 'Gestion du sommeil : hygiène du sommeil stricte, heures régulières, éviter les écrans.',
      level: 'Modéré',
      tags: ['sommeil'],
      source_ref: 'EULAR 2017',
    },
    {
      text: 'Gestion du stress : relaxation, cohérence cardiaque, mindfulness.',
      level: 'Modéré',
      tags: ['stress'],
      source_ref: 'EULAR 2017',
    },
    {
      text: 'Thérapies corps-esprit : yoga, tai-chi, qigong montrent des bénéfices.',
      level: 'Modéré',
      tags: ['exercice', 'stress'],
      source_ref: 'Cochrane 2019',
    },
    {
      text: 'Pacing : alterner activité et repos, éviter le cycle « trop faire puis s\'effondrer ».',
      level: 'Consensus',
      tags: ['gestion'],
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Chaleur locale : bains chauds, bouillottes peuvent soulager temporairement.',
      level: 'Faible',
      tags: ['confort'],
      source_ref: 'Clinical practice',
    },
    {
      text: 'Éviter le déconditionnement : le repos prolongé aggrave les symptômes.',
      level: 'Élevé',
      tags: ['essentiel'],
      source_ref: 'EULAR 2017',
    },
    {
      text: 'Soutien psychologique : la TCC est efficace sur la douleur et la qualité de vie.',
      level: 'Modéré',
      tags: ['psy'],
      source_ref: 'EULAR 2017',
    },
  ],

  red_flags: [
    {
      text: 'Perte de poids inexpliquée, fièvre, sueurs nocturnes',
      urgency: 'rapid',
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Gonflement articulaire visible, rougeur, chaleur locale',
      urgency: 'rapid',
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Faiblesse musculaire progressive (pas que fatigue)',
      urgency: 'rapid',
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Idées suicidaires ou dépression sévère',
      urgency: 'immediate',
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Symptômes neurologiques nouveaux (engourdissement, paralysie)',
      urgency: 'rapid',
      source_ref: 'Clinical consensus',
    },
  ],

  exercises: [
    {
      id: 'marche-adaptee',
      name: 'Marche adaptée',
      description: 'L\'exercice de base : marcher à son rythme, sans forcer, mais régulièrement.',
      levels: [
        {
          level: 0,
          instructions: 'Marchez 5 minutes à vitesse confortable. L\'objectif est de bouger, pas de performer. Arrêtez avant d\'être épuisé(e).',
          duration: '5 minutes',
          repetitions: '1x/jour',
        },
        {
          level: 1,
          instructions: 'Augmentez progressivement à 10-15 minutes. Rythme où vous pouvez parler.',
          duration: '10-15 minutes',
          repetitions: '1x/jour',
        },
        {
          level: 2,
          instructions: 'Marchez 20-30 minutes. Alternez terrain plat et léger dénivelé si possible.',
          duration: '20-30 minutes',
          repetitions: '5x/semaine',
        },
      ],
      common_errors: [
        'En faire trop les « bons jours » et s\'effondrer ensuite',
        'Arrêter complètement les « mauvais jours »',
        'Vouloir progresser trop vite',
      ],
      stop_rules: [
        'Douleur qui augmente pendant l\'effort (pas après)',
        'Malaise, vertiges',
        'Essoufflement excessif',
      ],
    },
    {
      id: 'etirements-doux',
      name: 'Étirements doux',
      description: 'Assouplir les muscles tendus sans forcer, en douceur.',
      levels: [
        {
          level: 0,
          instructions: 'Étirements assis ou allongé. Tenez chaque position 15-20 secondes sans forcer. Respirez profondément.',
          duration: '5 minutes',
          repetitions: '1-2x/jour',
        },
        {
          level: 1,
          instructions: 'Ajoutez des étirements debout (mollets, cuisses, dos). 20-30 secondes par étirement.',
          duration: '8-10 minutes',
          repetitions: '1x/jour',
        },
        {
          level: 2,
          instructions: 'Programme complet incluant nuque, épaules, dos, hanches, jambes.',
          duration: '15 minutes',
          repetitions: '1x/jour',
        },
      ],
      common_errors: [
        'Forcer jusqu\'à la douleur (ne doit pas faire mal)',
        'Retenir sa respiration',
        'Mouvements brusques',
      ],
      stop_rules: [
        'Douleur vive',
        'Engourdissements qui persistent',
      ],
    },
    {
      id: 'relaxation-respiration',
      name: 'Relaxation et respiration',
      description: 'Techniques pour calmer le système nerveux et réduire la sensibilisation.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé, respirez lentement : inspirez 4 sec, expirez 6 sec. Concentrez-vous sur le souffle.',
          duration: '5 minutes',
          repetitions: '2x/jour',
        },
        {
          level: 1,
          instructions: 'Cohérence cardiaque : 6 respirations/minute pendant 5 minutes. Applications disponibles.',
          duration: '5 minutes',
          repetitions: '3x/jour',
        },
        {
          level: 2,
          instructions: 'Body scan : parcourez mentalement chaque partie du corps en relâchant les tensions.',
          duration: '10-15 minutes',
          repetitions: '1x/jour',
        },
      ],
      common_errors: [
        'Vouloir « forcer » la relaxation',
        'S\'énerver si ça ne marche pas tout de suite',
        'Pratiquer seulement en crise',
      ],
      stop_rules: [
        'Anxiété qui augmente (changer de technique)',
      ],
    },
    {
      id: 'renforcement-leger',
      name: 'Renforcement léger',
      description: 'Maintenir la force musculaire sans surcharger les muscles.',
      levels: [
        {
          level: 0,
          instructions: 'Assis sur chaise : lever alternativement les genoux (10x chaque). Serrer une balle molle.',
          repetitions: '10 répétitions, 1x/jour',
        },
        {
          level: 1,
          instructions: 'Lever de chaise (5-10x). Marche sur place avec lever de genoux.',
          repetitions: '10-15 répétitions, 1x/jour',
        },
        {
          level: 2,
          instructions: 'Mini-squats (appui sur chaise), pompes murales, élastiques légers.',
          repetitions: '15 répétitions, 3x/semaine',
        },
      ],
      common_errors: [
        'Utiliser des poids trop lourds',
        'Faire trop de répétitions d\'un coup',
        'Oublier de s\'échauffer',
      ],
      stop_rules: [
        'Douleur qui persiste après l\'exercice',
        'Fatigue excessive le lendemain',
      ],
    },
  ],

  seven_day_plan: [
    {
      day: 1,
      title: 'Découverte en douceur',
      actions: [
        'Marche 5 minutes (pas plus, même si ça va bien)',
        'Relaxation respiratoire 5 minutes',
        'Noter mon niveau de douleur et fatigue (0-10)',
      ],
      tips: 'L\'objectif est de commencer, pas de performer.',
    },
    {
      day: 2,
      title: 'Étirements',
      actions: [
        'Marche 5 minutes',
        'Étirements doux 5 minutes (assis)',
        'Relaxation 5 minutes',
      ],
    },
    {
      day: 3,
      title: 'Jour calme',
      actions: [
        'Relaxation/respiration 10 minutes',
        'Marche légère si envie (5 min max)',
        'Bain chaud ou chaleur locale',
      ],
      tips: 'Le repos actif fait partie du programme.',
    },
    {
      day: 4,
      title: 'Reprise progressive',
      actions: [
        'Marche 5-7 minutes',
        'Étirements 5 minutes',
        'Noter les progrès',
      ],
    },
    {
      day: 5,
      title: 'Ajout renforcement',
      actions: [
        'Marche 5-7 minutes',
        'Renforcement léger (lever de genoux assis)',
        'Relaxation 5 minutes',
      ],
    },
    {
      day: 6,
      title: 'Consolidation',
      actions: [
        'Marche 8-10 minutes',
        'Étirements complets',
        'Cohérence cardiaque 5 min',
      ],
    },
    {
      day: 7,
      title: 'Bilan',
      actions: [
        'Jour au choix (marche légère ou repos)',
        'Noter le bilan de la semaine',
        'Planifier semaine 2 avec objectifs réalistes',
      ],
      tips: 'Si la semaine a été difficile, recommencer au même niveau.',
    },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Installation des habitudes',
      goals: [
        'Marche quotidienne 5 minutes (minimum)',
        'Relaxation 2x/jour 5 min',
        'Apprendre à s\'arrêter AVANT l\'épuisement',
      ],
      exercises: ['marche-adaptee', 'relaxation-respiration'],
    },
    {
      week: 2,
      focus: 'Ajout des étirements',
      goals: [
        'Marche 7-10 minutes',
        'Étirements quotidiens',
        'Maintenir la relaxation',
      ],
      exercises: ['marche-adaptee', 'etirements-doux', 'relaxation-respiration'],
    },
    {
      week: 3,
      focus: 'Introduction du renforcement',
      goals: [
        'Marche 10-15 minutes',
        'Renforcement léger 2x/semaine',
        'Gestion du pacing',
      ],
      exercises: ['marche-adaptee', 'etirements-doux', 'renforcement-leger'],
    },
    {
      week: 4,
      focus: 'Autonomie et adaptation',
      goals: [
        'Programme personnalisé selon tolérance',
        'Identifier ce qui marche pour vous',
        'Planifier la suite',
      ],
      exercises: ['marche-adaptee', 'etirements-doux', 'relaxation-respiration', 'renforcement-leger'],
    },
  ],

  medical_procedures: [
    {
      id: 'tcc',
      name: 'Thérapie Cognitivo-Comportementale (TCC)',
      type: 'other',
      purpose: 'Modifier les pensées et comportements qui maintiennent la douleur chronique.',
      indications: [
        'Fibromyalgie avec retentissement sur la qualité de vie',
        'Anxiété ou dépression associée',
        'Difficultés à gérer la maladie au quotidien',
      ],
      benefits: [
        'Réduction de la douleur perçue',
        'Amélioration de la qualité de vie',
        'Meilleure gestion des symptômes',
        'Effet durable',
      ],
      limitations: [
        'Nécessite un engagement sur plusieurs mois',
        'Accès parfois limité aux thérapeutes formés',
        'Efficacité variable selon les personnes',
      ],
      risks: [
        'Pas de risque physique',
        'Peut temporairement augmenter l\'anxiété en début de traitement',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'Recommandée par EULAR comme traitement de première intention, seule ou en association. Bénéfice modéré mais durable sur la douleur et la qualité de vie.',
      sources: [
        { title: 'EULAR Fibromyalgia Guidelines', org: 'EULAR', year: 2017 },
      ],
    },
    {
      id: 'balneotherapie',
      name: 'Balnéothérapie / Cure thermale',
      type: 'other',
      purpose: 'Traitement par bains et exercices en eau chaude.',
      indications: [
        'Fibromyalgie résistante aux traitements classiques',
        'Besoin de « coupure » thérapeutique',
        'Combinaison éducation + exercice en milieu adapté',
      ],
      benefits: [
        'Réduction temporaire de la douleur',
        'Relaxation musculaire',
        'Apprentissage de l\'exercice en milieu porteur',
        'Éducation thérapeutique',
      ],
      limitations: [
        'Effet temporaire (quelques semaines à mois)',
        'Nécessite une organisation (3 semaines)',
        'Fatigue initiale possible',
      ],
      risks: [
        'Fatigue après les soins',
        'Aggravation transitoire possible',
      ],
      guideline_position: 'conditional',
      guideline_summary: 'EULAR mentionne un bénéfice possible mais preuves de qualité limitée. Peut être considérée comme option complémentaire.',
      sources: [
        { title: 'EULAR Fibromyalgia Guidelines', org: 'EULAR', year: 2017 },
      ],
    },
  ],

  thermal_evidence: {
    summary: 'La balnéothérapie et les cures thermales montrent un bénéfice modeste sur la douleur et la qualité de vie dans la fibromyalgie, probablement lié à la combinaison exercice aquatique + éducation + environnement favorable.',
    key_results: [
      'Réduction de la douleur à court terme',
      'Amélioration de la qualité de vie',
      'Effet sur la fatigue variable',
      'Bénéfice maintenu quelques semaines à mois après',
    ],
    duration_recommended: '3 semaines',
    limitations: [
      'Études souvent de faible qualité méthodologique',
      'Difficile d\'isoler l\'effet de l\'eau de celui de l\'exercice/éducation',
      'Effet non durable sans maintien des exercices ensuite',
    ],
    contraindications: [
      'Poussée inflammatoire aiguë',
      'Infection en cours',
      'Pathologie cardiaque non stabilisée',
    ],
    sources: [
      { title: 'Balneotherapy for Fibromyalgia', org: 'Rheumatology International', year: 2021, type: 'meta-analysis' },
    ],
  },

  sources: [
    {
      title: 'EULAR revised recommendations for the management of fibromyalgia',
      org: 'European League Against Rheumatism',
      year: 2017,
      url: 'https://ard.bmj.com/content/76/2/318',
      type: 'guideline',
    },
    {
      title: 'Exercise for treating fibromyalgia syndrome',
      org: 'Cochrane',
      year: 2017,
      type: 'cochrane',
    },
    {
      title: 'Aquatic exercise training for fibromyalgia',
      org: 'Cochrane',
      year: 2014,
      type: 'cochrane',
    },
    {
      title: 'Mind-body therapies for fibromyalgia',
      org: 'Cochrane',
      year: 2019,
      type: 'cochrane',
    },
    {
      title: 'Fibromyalgie : prise en charge',
      org: 'HAS (Haute Autorité de Santé)',
      year: 2010,
      url: 'https://www.has-sante.fr/',
      type: 'guideline',
    },
  ],
};
