import { EvidencePackV2 } from './types';

export const coxarthrose: EvidencePackV2 = {
  slug: 'coxarthrose',
  title: 'Coxarthrose (arthrose de la hanche)',
  category: 'rhumatologie',
  subcategory: 'arthrose',
  parent_slug: 'arthrose',
  icon: '🦴',
  updated_at: '2026-01-27',
  version: '2.0.0',
  status: 'complete',

  definition: {
    summary: `La coxarthrose est l'usure du cartilage de l'articulation de la hanche. Elle touche principalement les personnes de plus de 50 ans et peut limiter significativement la marche et les activités quotidiennes.

Contrairement aux idées reçues, l'exercice adapté ne détruit pas la hanche : il la protège en maintenant la mobilité et en renforçant les muscles qui la stabilisent.

Le traitement repose sur l'exercice, la gestion du poids, et l'adaptation des activités. La prothèse de hanche reste un excellent recours en cas d'échec, avec d'excellents résultats.`,
    key_points: [
      'La douleur est souvent ressentie dans le pli de l\'aine, parfois irradiant vers la cuisse ou le genou',
      'L\'exercice régulier est le traitement de première intention',
      'La perte de poids soulage significativement l\'articulation',
      'La prothèse de hanche a un taux de satisfaction > 95%',
    ],
    prevalence: '5-10% des adultes > 60 ans',
    risk_factors: [
      'Âge > 50 ans',
      'Surpoids/obésité',
      'Dysplasie de hanche (malformation)',
      'Traumatismes anciens',
      'Travail physique lourd',
      'Sports avec impacts répétés',
    ],
  },

  recommendations: [
    {
      text: 'Exercice thérapeutique régulier : renforcement des fessiers, quadriceps et muscles stabilisateurs de la hanche.',
      level: 'Élevé',
      tags: ['exercice', 'essentiel'],
      source_ref: 'NICE NG226',
    },
    {
      text: 'Perte de poids si surpoids : chaque kg perdu réduit la charge sur la hanche de 3-4 kg.',
      level: 'Élevé',
      tags: ['poids', 'essentiel'],
      source_ref: 'OARSI 2019',
    },
    {
      text: 'Marche quotidienne adaptée avec canne du côté opposé si besoin pour soulager l\'articulation.',
      level: 'Élevé',
      tags: ['marche', 'quotidien'],
      source_ref: 'NICE NG226',
    },
    {
      text: 'Vélo et natation : excellentes alternatives si la marche est douloureuse.',
      level: 'Modéré',
      tags: ['exercice', 'alternative'],
      source_ref: 'OARSI 2019',
    },
    {
      text: 'Éviter les positions assises basses (canapé profond) et les rotations forcées de la hanche.',
      level: 'Modéré',
      tags: ['quotidien'],
      source_ref: 'Consensus',
    },
    {
      text: 'Kinésithérapie supervisée au début pour apprendre les bons exercices et corriger les compensations.',
      level: 'Modéré',
      tags: ['kiné', 'accompagnement'],
      source_ref: 'NICE NG226',
    },
    {
      text: 'Chaleur locale avant les exercices, froid après si sensation d\'inflammation.',
      level: 'Faible',
      tags: ['soulagement'],
      source_ref: 'Consensus',
    },
    {
      text: 'Aménagement du domicile : rehausseur de toilettes, siège de douche, éviter les escaliers inutiles.',
      level: 'Modéré',
      tags: ['quotidien', 'équipement'],
      source_ref: 'NICE NG226',
    },
  ],

  red_flags: [
    {
      text: 'Douleur brutale après une chute, impossibilité de marcher → possible fracture',
      urgency: 'immediate',
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Douleur de hanche avec fièvre, altération de l\'état général → possible infection',
      urgency: 'immediate',
      source_ref: 'NICE NG226',
    },
    {
      text: 'Douleur nocturne intense, perte de poids inexpliquée → éliminer une cause tumorale',
      urgency: 'rapid',
      source_ref: 'NICE NG226',
    },
    {
      text: 'Boiterie importante d\'apparition récente',
      urgency: 'routine',
      source_ref: 'Clinical consensus',
    },
  ],

  exercises: [
    {
      id: 'pont-fessier',
      name: 'Pont fessier (bridge)',
      description: 'Renforce les fessiers et stabilise la hanche.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé sur le dos, genoux pliés, pieds à plat. Soulevez les fesses de 5-10 cm, maintenez 3 sec, reposez.',
          repetitions: '10 répétitions, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Soulevez plus haut jusqu\'à avoir une ligne droite genoux-hanches-épaules. Maintenez 5 sec.',
          repetitions: '15 répétitions, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Même exercice sur une jambe : l\'autre jambe tendue en l\'air.',
          repetitions: '10 répétitions par jambe, 2x/jour',
        },
      ],
      common_errors: [
        'Cambrer le bas du dos',
        'Monter avec les lombaires au lieu des fessiers',
        'Mouvements trop rapides',
      ],
      stop_rules: [
        'Douleur dans la hanche pendant l\'exercice',
        'Douleur dans le bas du dos',
      ],
      illustration: '/illustrations/exercises/bridge.svg',
    },
    {
      id: 'abduction-couchee',
      name: 'Abduction de hanche couchée',
      description: 'Renforce les muscles latéraux de la hanche (moyen fessier).',
      levels: [
        {
          level: 0,
          instructions: 'Couché sur le côté, jambes tendues. Soulevez la jambe du dessus de 20 cm, maintenez 3 sec.',
          repetitions: '10 par côté, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Soulevez plus haut (30-40 cm), maintenez 5 sec.',
          repetitions: '15 par côté, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Ajoutez un élastique autour des chevilles pour plus de résistance.',
          repetitions: '15-20 par côté, 2x/jour',
        },
      ],
      common_errors: [
        'Basculer le bassin vers l\'arrière',
        'Tourner le pied vers le haut',
        'Aller trop vite',
      ],
      stop_rules: [
        'Douleur dans la hanche',
        'Craquement douloureux',
      ],
      illustration: '/illustrations/exercises/hip-abduction.svg',
    },
    {
      id: 'flexion-hanche-debout',
      name: 'Flexion de hanche debout',
      description: 'Travaille la mobilité et le renforcement des fléchisseurs de hanche.',
      levels: [
        {
          level: 0,
          instructions: 'Debout, tenez-vous à un support. Levez le genou vers la poitrine, maintenez 3 sec.',
          repetitions: '10 par jambe, 1x/jour',
        },
        {
          level: 1,
          instructions: 'Sans appui, montez le genou plus haut, maintenez 5 sec.',
          repetitions: '15 par jambe, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Ajoutez un poids à la cheville ou un élastique de résistance.',
          repetitions: '15-20 par jambe, 2x/jour',
        },
      ],
      common_errors: [
        'Se pencher en arrière',
        'Compenser avec le dos',
      ],
      stop_rules: [
        'Douleur dans le pli de l\'aine',
        'Perte d\'équilibre récurrente',
      ],
      illustration: '/illustrations/exercises/hip-flexion.svg',
    },
    {
      id: 'etirement-psoas',
      name: 'Étirement du psoas-iliaque',
      description: 'Assouplit le fléchisseur de hanche, souvent rétracté.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé sur le dos au bord du lit, laissez pendre la jambe du côté à étirer. Maintenez l\'autre genou fléchi contre vous.',
          duration: '20-30 sec',
          repetitions: '2-3 fois par côté',
        },
        {
          level: 1,
          instructions: 'Fente avant : genou arrière au sol, avancez le bassin. Gardez le dos droit.',
          duration: '30 sec',
          repetitions: '2-3 fois par côté',
        },
        {
          level: 2,
          instructions: 'Fente avec le pied arrière surélevé (sur une chaise basse).',
          duration: '30-45 sec',
          repetitions: '2-3 fois par côté',
        },
      ],
      common_errors: [
        'Cambrer le bas du dos',
        'Rotation du bassin',
      ],
      stop_rules: [
        'Douleur dans l\'aine',
        'Picotement ou engourdissement',
      ],
      illustration: '/illustrations/exercises/psoas-stretch.svg',
    },
  ],

  seven_day_plan: [
    {
      day: 1,
      title: 'Démarrage en douceur',
      actions: [
        'Faire le pont fessier (10 rep)',
        'Marcher 10 minutes à plat',
        'Appliquer de la chaleur sur la hanche 15 min',
      ],
    },
    {
      day: 2,
      title: 'Ajout de mobilité',
      actions: [
        'Pont fessier (10 rep)',
        'Flexion de hanche debout (10 rep par jambe)',
        'Marcher 10-15 minutes',
      ],
    },
    {
      day: 3,
      title: 'Renforcement latéral',
      actions: [
        'Pont fessier (15 rep)',
        'Abduction couchée (10 rep par côté)',
        'Marcher 15 minutes ou vélo 10 min',
      ],
    },
    {
      day: 4,
      title: 'Récupération active',
      actions: [
        'Étirements du psoas (2x30 sec par côté)',
        'Marche légère 10 min',
        'Piscine ou vélo si disponible',
      ],
    },
    {
      day: 5,
      title: 'Programme complet',
      actions: [
        'Enchaîner : pont + abduction + flexion',
        'Marcher 15-20 minutes',
        'Étirements en fin de journée',
      ],
    },
    {
      day: 6,
      title: 'Consolidation',
      actions: [
        'Programme complet avec répétitions augmentées',
        'Activité cardio au choix (marche, vélo, piscine)',
      ],
    },
    {
      day: 7,
      title: 'Bilan',
      actions: [
        'Repos actif (mouvements doux)',
        'Noter vos progrès',
        'Planifier la semaine suivante',
      ],
    },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Installation des habitudes',
      goals: [
        'Exercices de base 5 jours sur 7',
        'Marche quotidienne 10-15 min',
        'Identifier les activités qui aggravent',
      ],
      exercises: ['pont-fessier', 'flexion-hanche-debout'],
    },
    {
      week: 2,
      focus: 'Renforcement latéral',
      goals: [
        'Ajouter l\'abduction couchée',
        'Augmenter la marche à 20 min',
        'Intégrer 1-2 séances de vélo/piscine',
      ],
      exercises: ['pont-fessier', 'abduction-couchee', 'flexion-hanche-debout'],
    },
    {
      week: 3,
      focus: 'Souplesse et progression',
      goals: [
        'Ajouter les étirements quotidiens',
        'Augmenter les répétitions de 20%',
        'Tester les niveaux supérieurs des exercices',
      ],
      exercises: ['pont-fessier', 'abduction-couchee', 'etirement-psoas'],
    },
    {
      week: 4,
      focus: 'Autonomie',
      goals: [
        'Programme complet autonome',
        'Cardio 25-30 min',
        'Évaluer : douleur, périmètre de marche, qualité de vie',
      ],
      exercises: ['pont-fessier', 'abduction-couchee', 'flexion-hanche-debout', 'etirement-psoas'],
    },
  ],

  medical_procedures: [
    {
      id: 'infiltration-hanche',
      name: 'Infiltration de corticoïdes (hanche)',
      type: 'infiltration',
      purpose: 'Réduire l\'inflammation et la douleur par injection intra-articulaire sous guidage échographique ou radiologique.',
      indications: [
        'Coxarthrose avec poussée inflammatoire',
        'Douleur non soulagée par le traitement conservateur',
        'En attente de chirurgie',
      ],
      benefits: [
        'Soulagement rapide (quelques jours)',
        'Permet la rééducation',
        'Peut confirmer l\'origine articulaire de la douleur',
      ],
      limitations: [
        'Effet temporaire (1-3 mois)',
        'Nécessite un guidage (écho ou radio)',
        'Nombre limité d\'injections',
      ],
      risks: [
        'Infection (rare)',
        'Douleur post-injection',
        'Nécrose de hanche (exceptionnel)',
      ],
      guideline_position: 'conditional',
      guideline_summary: 'Recommandée en cas de poussée inflammatoire ou d\'échec du traitement conservateur. Efficacité modeste et temporaire.',
      sources: [
        { title: 'NICE NG226', org: 'NICE', year: 2022 },
      ],
    },
    {
      id: 'pth',
      name: 'Prothèse totale de hanche (PTH)',
      type: 'surgery',
      purpose: 'Remplacer l\'articulation usée par des implants artificiels.',
      indications: [
        'Coxarthrose sévère',
        'Échec du traitement conservateur',
        'Impact majeur sur la qualité de vie',
        'Douleur quotidienne importante',
      ],
      benefits: [
        'Taux de satisfaction > 95%',
        'Disparition quasi-complète de la douleur',
        'Récupération de la mobilité',
        'Durée de vie des implants : 20-30 ans',
      ],
      limitations: [
        'Chirurgie avec rééducation de 2-3 mois',
        'Certaines activités déconseillées (course, sports de combat)',
        'Risque de luxation les premiers mois',
      ],
      risks: [
        'Infection (< 1%)',
        'Thrombose veineuse',
        'Luxation',
        'Inégalité de longueur des membres',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'Excellente intervention avec des résultats très satisfaisants. Recommandée après échec du traitement conservateur bien conduit.',
      sources: [
        { title: 'NICE NG226', org: 'NICE', year: 2022 },
        { title: 'HAS - Prothèse de hanche', org: 'HAS', year: 2020 },
      ],
    },
  ],

  thermal_evidence: {
    summary: 'La cure thermale apporte un bénéfice modeste mais significatif sur la douleur et la fonction dans la coxarthrose, avec persistance des effets pendant 3-6 mois.',
    key_results: [
      'Réduction de la douleur de 20-30%',
      'Amélioration de la mobilité',
      'Diminution de la consommation d\'antalgiques',
      'Bénéfice sur la qualité de vie',
    ],
    duration_recommended: '3 semaines',
    limitations: [
      'Effet placebo non négligeable',
      'Études de qualité méthodologique variable',
      'Bénéfice modeste comparé à l\'exercice seul',
    ],
    sources: [
      { title: 'Spa therapy for hip OA', org: 'Rheumatology', year: 2019, type: 'rct' },
    ],
  },

  sources: [
    {
      title: 'Osteoarthritis: care and management (NG226)',
      org: 'NICE',
      year: 2022,
      url: 'https://www.nice.org.uk/guidance/ng226',
      type: 'guideline',
    },
    {
      title: 'OARSI Guidelines for Hip OA',
      org: 'OARSI',
      year: 2019,
      type: 'guideline',
    },
    {
      title: '2019 ACR/AF Guideline for OA',
      org: 'ACR',
      year: 2019,
      type: 'guideline',
    },
    {
      title: 'Exercise therapy for hip OA',
      org: 'Cochrane',
      year: 2014,
      type: 'cochrane',
    },
  ],
};
