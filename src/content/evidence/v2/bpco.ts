import { EvidencePackV2 } from './types';

export const bpco: EvidencePackV2 = {
  slug: 'bpco',
  title: 'BPCO (Bronchopneumopathie chronique obstructive)',
  category: 'respiratoire-orl',
  icon: '🌬️',
  updated_at: '2026-01-27',
  version: '2.0.0',
  status: 'complete',

  definition: {
    summary: `La BPCO est une maladie chronique des poumons caractérisée par une obstruction progressive et peu réversible des voies aériennes. Elle touche principalement les fumeurs ou anciens fumeurs.

Les symptômes principaux sont l'essoufflement (dyspnée), la toux chronique et les expectorations. La maladie évolue lentement mais peut être significativement freinée par l'arrêt du tabac et la réhabilitation respiratoire.

L'exercice physique adapté est aussi efficace que les médicaments pour améliorer la qualité de vie et réduire les exacerbations.`,
    key_points: [
      '90% des cas sont liés au tabac',
      'L\'arrêt du tabac est le seul traitement qui modifie l\'évolution',
      'La réhabilitation respiratoire est très efficace',
      'L\'essoufflement peut être significativement amélioré',
    ],
    prevalence: '5-10% des adultes > 40 ans (souvent sous-diagnostiquée)',
    risk_factors: [
      'Tabagisme (principal)',
      'Exposition professionnelle (poussières, fumées)',
      'Pollution de l\'air',
      'Déficit en alpha-1-antitrypsine (rare)',
      'Asthme chronique sévère',
    ],
  },

  recommendations: [
    {
      text: 'Arrêt du tabac : C\'EST LE SEUL traitement qui ralentit la progression de la maladie. Priorité absolue.',
      level: 'Élevé',
      tags: ['essentiel', 'tabac'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Réhabilitation respiratoire : programme supervisé combinant exercice et éducation. Efficacité prouvée.',
      level: 'Élevé',
      tags: ['essentiel', 'exercice'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Exercice physique régulier : marche, vélo, natation. 30 min/jour minimum, même essoufflé.',
      level: 'Élevé',
      tags: ['exercice', 'essentiel'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Vaccination antigrippale annuelle et antipneumococcique : réduit le risque d\'exacerbations.',
      level: 'Élevé',
      tags: ['prévention'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Techniques de respiration : respiration à lèvres pincées, respiration diaphragmatique.',
      level: 'Modéré',
      tags: ['respiration'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Gestion des exacerbations : reconnaître les signes précoces, plan d\'action personnalisé.',
      level: 'Élevé',
      tags: ['éducation'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Nutrition adaptée : maintenir un poids santé, apports protéiques suffisants.',
      level: 'Modéré',
      tags: ['nutrition'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Éviter les polluants : tabagisme passif, pollution intérieure, irritants respiratoires.',
      level: 'Modéré',
      tags: ['environnement'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Activité physique quotidienne : même de faible intensité, réduire le temps sédentaire.',
      level: 'Modéré',
      tags: ['quotidien'],
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Soutien psychologique si besoin : anxiété et dépression sont fréquentes dans la BPCO.',
      level: 'Modéré',
      tags: ['psy'],
      source_ref: 'GOLD 2024',
    },
  ],

  red_flags: [
    {
      text: 'Essoufflement brutal et intense, lèvres bleutées (cyanose)',
      urgency: 'immediate',
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Confusion, somnolence importante',
      urgency: 'immediate',
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Fièvre avec augmentation des crachats purulents',
      urgency: 'rapid',
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Aggravation rapide malgré le traitement habituel',
      urgency: 'rapid',
      source_ref: 'GOLD 2024',
    },
    {
      text: 'Douleur thoracique',
      urgency: 'rapid',
      source_ref: 'Clinical consensus',
    },
  ],

  exercises: [
    {
      id: 'respiration-levres-pincees',
      name: 'Respiration à lèvres pincées',
      description: 'Technique de base pour réduire l\'essoufflement et vider complètement les poumons.',
      levels: [
        {
          level: 0,
          instructions: 'Inspirez par le nez (2 sec). Expirez lentement par la bouche, lèvres pincées comme pour siffler (4-6 sec).',
          duration: '2-3 minutes',
          repetitions: '5-10 cycles, 3-4x/jour',
        },
        {
          level: 1,
          instructions: 'Même technique, prolongez l\'expiration (6-8 sec). Utilisez pendant la marche ou l\'effort.',
          repetitions: 'À utiliser pendant les efforts',
        },
        {
          level: 2,
          instructions: 'Combinez avec la marche : inspirez sur 2 pas, expirez sur 4-5 pas.',
          repetitions: 'Intégré aux activités quotidiennes',
        },
      ],
      common_errors: [
        'Forcer l\'expiration (doit être naturelle)',
        'Oublier de l\'utiliser pendant les efforts',
        'Respiration trop rapide',
      ],
      stop_rules: [
        'Vertiges',
        'Nausées',
      ],
      illustration: '/illustrations/exercises/pursed-lips.svg',
    },
    {
      id: 'respiration-diaphragmatique',
      name: 'Respiration diaphragmatique',
      description: 'Utilise le diaphragme pour une respiration plus efficace.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé, une main sur le ventre, une sur la poitrine. Inspirez : le ventre se gonfle. Expirez : le ventre s\'abaisse. La poitrine bouge peu.',
          duration: '5 minutes',
          repetitions: '2x/jour',
        },
        {
          level: 1,
          instructions: 'Assis, même technique. Concentrez-vous sur le mouvement du ventre.',
          duration: '5-10 minutes',
          repetitions: '2x/jour',
        },
        {
          level: 2,
          instructions: 'Debout et pendant les activités, utilisez cette respiration naturellement.',
          repetitions: 'Intégré aux activités',
        },
      ],
      common_errors: [
        'Inverser les mouvements (ventre qui rentre à l\'inspiration)',
        'Respirer trop vite',
        'Contracter les épaules',
      ],
      stop_rules: [
        'Vertiges',
        'Essoufflement accru',
      ],
      illustration: '/illustrations/exercises/diaphragmatic.svg',
    },
    {
      id: 'marche-endurance',
      name: 'Marche d\'endurance',
      description: 'L\'exercice de base pour la BPCO, améliore l\'endurance et réduit l\'essoufflement.',
      levels: [
        {
          level: 0,
          instructions: 'Marchez 5-10 minutes à un rythme où vous pouvez parler. Utilisez la respiration à lèvres pincées.',
          duration: '5-10 minutes',
          repetitions: '1-2x/jour',
        },
        {
          level: 1,
          instructions: 'Augmentez progressivement à 15-20 minutes. Rythme modéré (légèrement essoufflé).',
          duration: '15-20 minutes',
          repetitions: '1x/jour',
        },
        {
          level: 2,
          instructions: 'Marchez 30 minutes ou plus. Alternez rythme modéré et légèrement soutenu.',
          duration: '30+ minutes',
          repetitions: '5-7x/semaine',
        },
      ],
      common_errors: [
        'Aller trop vite et s\'épuiser',
        'Arrêter dès le premier essoufflement',
        'Ne pas utiliser les techniques de respiration',
      ],
      stop_rules: [
        'Essoufflement sévère (impossible de parler)',
        'Douleur thoracique',
        'Vertiges',
      ],
      illustration: '/illustrations/exercises/walking.svg',
    },
    {
      id: 'renforcement-bras',
      name: 'Renforcement des bras',
      description: 'Les bras sont sollicités dans les activités quotidiennes. Les renforcer améliore l\'autonomie.',
      levels: [
        {
          level: 0,
          instructions: 'Assis, bras le long du corps. Levez les bras sur les côtés jusqu\'aux épaules, redescendez.',
          repetitions: '10 répétitions, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Même exercice avec des bouteilles d\'eau (500ml) ou poids légers.',
          repetitions: '10-15 répétitions, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Ajoutez des élévations frontales et des mouvements circulaires avec poids.',
          repetitions: '15 répétitions, 2x/jour',
        },
      ],
      common_errors: [
        'Retenir sa respiration (expirez en levant)',
        'Mouvements trop rapides',
      ],
      stop_rules: [
        'Essoufflement excessif',
        'Douleur',
      ],
      illustration: '/illustrations/exercises/arm-raises.svg',
    },
    {
      id: 'lever-chaise',
      name: 'Lever de chaise',
      description: 'Renforce les jambes et améliore l\'autonomie pour se lever et s\'asseoir.',
      levels: [
        {
          level: 0,
          instructions: 'Assis sur une chaise stable, levez-vous en utilisant les accoudoirs si besoin, rasseyez-vous lentement.',
          repetitions: '5-10 répétitions, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Sans utiliser les mains, croisez les bras sur la poitrine.',
          repetitions: '10-15 répétitions, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Enchaînez plus rapidement, ou utilisez une chaise plus basse.',
          repetitions: '15-20 répétitions, 2x/jour',
        },
      ],
      common_errors: [
        'Se jeter en avant',
        'Retenir sa respiration',
      ],
      stop_rules: [
        'Essoufflement important',
        'Douleur aux genoux',
      ],
      illustration: '/illustrations/exercises/chair-stand.svg',
    },
  ],

  seven_day_plan: [
    {
      day: 1,
      title: 'Apprendre les bases',
      actions: [
        'Pratiquer la respiration à lèvres pincées : 10 cycles, 3 fois',
        'Marche légère 5-10 minutes',
        'Si fumeur : noter les moments où vous fumez le plus',
      ],
    },
    {
      day: 2,
      title: 'Respiration diaphragmatique',
      actions: [
        'Respiration à lèvres pincées',
        'Apprendre la respiration diaphragmatique (5 min)',
        'Marche 10 minutes',
      ],
    },
    {
      day: 3,
      title: 'Ajout du renforcement',
      actions: [
        'Techniques de respiration',
        'Lever de chaise : 5-10 répétitions',
        'Marche 10-15 minutes',
      ],
    },
    {
      day: 4,
      title: 'Jour calme',
      actions: [
        'Respiration diaphragmatique 10 min',
        'Marche légère',
        'Repos actif',
      ],
    },
    {
      day: 5,
      title: 'Programme complet',
      actions: [
        'Respiration + lever de chaise + renforcement bras',
        'Marche 15-20 minutes avec lèvres pincées',
      ],
    },
    {
      day: 6,
      title: 'Endurance',
      actions: [
        'Marche plus longue (20+ min)',
        'Exercices de renforcement',
        'Pratiquer la respiration pendant les activités',
      ],
    },
    {
      day: 7,
      title: 'Bilan',
      actions: [
        'Noter vos progrès : essoufflement, distance de marche',
        'Planifier la semaine suivante',
        'Si fumeur : contacter Tabac Info Service (3989)',
      ],
    },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Maîtrise des techniques de respiration',
      goals: [
        'Respiration à lèvres pincées automatique',
        'Respiration diaphragmatique 2x/jour',
        'Marche quotidienne 10 min',
      ],
      exercises: ['respiration-levres-pincees', 'respiration-diaphragmatique', 'marche-endurance'],
    },
    {
      week: 2,
      focus: 'Augmentation de l\'endurance',
      goals: [
        'Marche 15-20 min/jour',
        'Ajouter lever de chaise',
        'Appliquer les techniques pendant les efforts',
      ],
      exercises: ['respiration-levres-pincees', 'marche-endurance', 'lever-chaise'],
    },
    {
      week: 3,
      focus: 'Renforcement global',
      goals: [
        'Ajouter le renforcement des bras',
        'Marche 20-25 min',
        'Intégrer les exercices dans la routine',
      ],
      exercises: ['respiration-levres-pincees', 'marche-endurance', 'lever-chaise', 'renforcement-bras'],
    },
    {
      week: 4,
      focus: 'Consolidation et autonomie',
      goals: [
        'Programme complet 5x/semaine',
        'Marche 30 min ou équivalent',
        'Évaluer les progrès et planifier la suite',
      ],
      exercises: ['respiration-levres-pincees', 'respiration-diaphragmatique', 'marche-endurance', 'lever-chaise', 'renforcement-bras'],
    },
  ],

  medical_procedures: [
    {
      id: 'rehabilitation-respiratoire',
      name: 'Réhabilitation respiratoire',
      type: 'other',
      purpose: 'Programme supervisé combinant exercice, éducation et soutien psychologique.',
      indications: [
        'BPCO symptomatique (essoufflement, limitation des activités)',
        'Tout stade de sévérité',
        'Après une exacerbation',
      ],
      benefits: [
        'Amélioration de la qualité de vie (forte évidence)',
        'Réduction de l\'essoufflement',
        'Amélioration de la tolérance à l\'effort',
        'Réduction des hospitalisations',
      ],
      limitations: [
        'Nécessite un engagement sur 6-8 semaines minimum',
        'Accès parfois limité selon les régions',
      ],
      risks: [
        'Très peu de risques (programme supervisé)',
        'Fatigue temporaire au début',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'Recommandation forte par GOLD et toutes les sociétés savantes. Bénéfice démontré par de nombreux essais contrôlés. Aussi efficace que les médicaments pour améliorer la qualité de vie.',
      sources: [
        { title: 'GOLD 2024 Report', org: 'GOLD', year: 2024, url: 'https://goldcopd.org/' },
      ],
    },
    {
      id: 'oxygénotherapie',
      name: 'Oxygénothérapie de longue durée',
      type: 'other',
      purpose: 'Apporter de l\'oxygène supplémentaire chez les patients avec insuffisance respiratoire chronique.',
      indications: [
        'Hypoxémie sévère chronique (PaO2 < 55 mmHg)',
        'BPCO sévère avec désaturation',
        'Sous contrôle médical strict',
      ],
      benefits: [
        'Amélioration de la survie',
        'Réduction des hospitalisations',
        'Amélioration de la qualité de vie',
      ],
      limitations: [
        'Contraignant (équipement, durée d\'utilisation)',
        'Nécessité d\'arrêt du tabac absolu',
        'Risque d\'incendie si tabagisme',
      ],
      risks: [
        'Sécheresse nasale',
        'Risque d\'incendie (tabac interdit)',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'Recommandée chez les patients avec hypoxémie sévère chronique. Améliore la survie et la qualité de vie.',
      sources: [
        { title: 'GOLD 2024', org: 'GOLD', year: 2024 },
      ],
    },
  ],

  thermal_evidence: {
    summary: 'Les cures thermales à orientation respiratoire peuvent apporter un bénéfice modeste sur les symptômes de la BPCO, principalement via l\'éducation et l\'exercice proposés.',
    key_results: [
      'Amélioration de la qualité de vie',
      'Réduction des symptômes respiratoires',
      'Effet éducatif (sevrage tabagique, techniques de respiration)',
    ],
    duration_recommended: '3 semaines',
    limitations: [
      'Peu d\'études de haute qualité spécifiques à la BPCO',
      'Difficile de séparer l\'effet de l\'eau de celui de l\'éducation/exercice',
    ],
    contraindications: [
      'Exacerbation en cours',
      'Insuffisance respiratoire sévère non stabilisée',
      'Oxygénothérapie continue',
    ],
    sources: [
      { title: 'Balneotherapy for COPD', org: 'Respiratory Medicine', year: 2020, type: 'rct' },
    ],
  },

  sources: [
    {
      title: 'GOLD 2024 Report - Global Strategy for Prevention, Diagnosis and Management of COPD',
      org: 'Global Initiative for Chronic Obstructive Lung Disease',
      year: 2024,
      url: 'https://goldcopd.org/',
      type: 'guideline',
    },
    {
      title: 'Pulmonary rehabilitation for COPD',
      org: 'Cochrane',
      year: 2021,
      type: 'cochrane',
    },
    {
      title: 'HAS - Guide du parcours de soins BPCO',
      org: 'HAS',
      year: 2022,
      type: 'guideline',
    },
    {
      title: 'ERS/ATS Guidelines on Pulmonary Rehabilitation',
      org: 'ERS/ATS',
      year: 2022,
      type: 'guideline',
    },
  ],
};
