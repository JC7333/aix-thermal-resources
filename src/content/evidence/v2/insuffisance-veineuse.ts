import { EvidencePackV2 } from './types';

export const insuffisanceVeineuse: EvidencePackV2 = {
  slug: 'insuffisance-veineuse',
  title: 'Insuffisance veineuse chronique / Jambes lourdes',
  category: 'veino-lymphatique',
  icon: '🦵',
  updated_at: '2026-01-27',
  version: '2.0.0',
  status: 'complete',

  definition: {
    summary: `L'insuffisance veineuse chronique (IVC) est un mauvais retour du sang veineux des jambes vers le cœur. Le sang stagne, les veines se dilatent, et les symptômes apparaissent : jambes lourdes, gonflées, varices, parfois ulcères.

La bonne nouvelle : les mesures non médicamenteuses sont très efficaces. La compression, l'exercice et l'élévation des jambes constituent le traitement de base, validé par les guidelines internationales.

L'IVC est chronique mais peut être très bien contrôlée avec des habitudes simples maintenues dans le temps.`,
    key_points: [
      'Touche 25-40% des adultes (plus fréquent chez les femmes)',
      'La compression est le traitement de première intention',
      'L\'exercice améliore le retour veineux',
      'Les complications (ulcères) sont évitables avec un traitement précoce',
    ],
    prevalence: '25-40% des adultes, prévalence augmentant avec l\'âge',
    risk_factors: [
      'Station debout ou assise prolongée',
      'Surpoids/obésité',
      'Grossesse(s)',
      'Antécédents familiaux',
      'Sédentarité',
      'Chaleur',
      'Âge',
    ],
  },

  recommendations: [
    {
      text: 'Compression élastique quotidienne (bas ou chaussettes de contention classe II). C\'est LE traitement de base.',
      level: 'Élevé',
      tags: ['essentiel', 'compression'],
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Exercice régulier : marche, natation, vélo. Le muscle du mollet est une "pompe" naturelle.',
      level: 'Élevé',
      tags: ['exercice', 'essentiel'],
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Surélévation des jambes : 15-20 min, 2-3 fois par jour, jambes au-dessus du niveau du cœur.',
      level: 'Élevé',
      tags: ['essentiel', 'quotidien'],
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Éviter la station debout ou assise prolongée. Bouger toutes les 30-45 minutes.',
      level: 'Élevé',
      tags: ['quotidien'],
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Perte de poids si surpoids : réduit la pression sur les veines.',
      level: 'Modéré',
      tags: ['poids'],
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Douche fraîche sur les mollets le soir : effet tonifiant sur les veines.',
      level: 'Faible',
      tags: ['soulagement'],
      source_ref: 'Consensus',
    },
    {
      text: 'Éviter la chaleur prolongée (bains chauds, sauna, exposition solaire directe sur les jambes).',
      level: 'Modéré',
      tags: ['quotidien'],
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Exercices de flexion des pieds (pompe du mollet) : 20 flexions-extensions, plusieurs fois par jour.',
      level: 'Modéré',
      tags: ['exercice'],
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Hydratation de la peau des jambes pour prévenir les complications cutanées.',
      level: 'Modéré',
      tags: ['soin'],
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Chaussures confortables avec un petit talon (3-4 cm) plutôt que des chaussures plates ou très hautes.',
      level: 'Faible',
      tags: ['équipement'],
      source_ref: 'Consensus',
    },
  ],

  red_flags: [
    {
      text: 'Jambe brutalement gonflée, chaude, douloureuse → suspicion de thrombose veineuse profonde',
      urgency: 'immediate',
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Plaie qui ne cicatrise pas depuis > 2 semaines (ulcère veineux)',
      urgency: 'rapid',
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Changement de couleur de la peau (brunâtre) autour de la cheville',
      urgency: 'routine',
      source_ref: 'ESVS 2022',
    },
    {
      text: 'Saignement d\'une varice',
      urgency: 'rapid',
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Douleur intense du mollet avec rougeur',
      urgency: 'immediate',
      source_ref: 'ESVS 2022',
    },
  ],

  exercises: [
    {
      id: 'pompe-mollet',
      name: 'Pompe du mollet',
      description: 'Active le retour veineux en contractant les muscles du mollet.',
      levels: [
        {
          level: 0,
          instructions: 'Assis, pieds à plat. Soulevez les talons en gardant les orteils au sol, puis reposez. Lentement.',
          repetitions: '20 répétitions, 3x/jour',
        },
        {
          level: 1,
          instructions: 'Debout, tenez-vous à un support. Montez sur la pointe des pieds, maintenez 2 sec.',
          repetitions: '20 répétitions, 3x/jour',
        },
        {
          level: 2,
          instructions: 'Debout sans appui, montée lente et contrôlée, descente lente.',
          repetitions: '30 répétitions, 3x/jour',
        },
      ],
      common_errors: [
        'Aller trop vite',
        'Ne pas monter assez haut',
        'Oublier de le faire régulièrement',
      ],
      stop_rules: [
        'Crampe douloureuse',
        'Douleur aiguë dans le mollet',
      ],
      illustration: '/illustrations/exercises/calf-pump.svg',
    },
    {
      id: 'rotation-cheville',
      name: 'Rotation des chevilles',
      description: 'Améliore la circulation et la mobilité de la cheville.',
      levels: [
        {
          level: 0,
          instructions: 'Assis, jambe tendue. Faites des cercles avec le pied dans un sens, puis dans l\'autre.',
          repetitions: '10 cercles par sens, par pied, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Même exercice avec plus d\'amplitude et de contrôle.',
          repetitions: '15 cercles par sens, par pied, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Debout sur un pied (tenez-vous), faites des cercles avec le pied en l\'air.',
          repetitions: '15 cercles par sens, par pied, 2x/jour',
        },
      ],
      common_errors: [
        'Mouvements trop rapides',
        'Amplitude insuffisante',
      ],
      stop_rules: [
        'Douleur dans la cheville',
        'Crampe',
      ],
      illustration: '/illustrations/exercises/ankle-rotation.svg',
    },
    {
      id: 'marche-sur-place',
      name: 'Marche sur place',
      description: 'Active le retour veineux sans avoir à sortir.',
      levels: [
        {
          level: 0,
          instructions: 'Debout, tenez-vous à un support. Levez alternativement les genoux à hauteur confortable.',
          duration: '2-3 minutes',
          repetitions: '3-4x/jour',
        },
        {
          level: 1,
          instructions: 'Sans appui, genoux plus hauts, rythme modéré.',
          duration: '5 minutes',
          repetitions: '3x/jour',
        },
        {
          level: 2,
          instructions: 'Rythme soutenu, genoux hauts, balancement des bras.',
          duration: '5-10 minutes',
          repetitions: '2-3x/jour',
        },
      ],
      common_errors: [
        'Mouvements trop lents',
        'Ne pas lever assez les genoux',
      ],
      stop_rules: [
        'Essoufflement excessif',
        'Douleur',
      ],
      illustration: '/illustrations/exercises/marching.svg',
    },
    {
      id: 'jambes-mur',
      name: 'Jambes au mur',
      description: 'Favorise le retour veineux par la gravité.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé, fesses contre le mur, jambes à la verticale. Restez 5-10 min.',
          duration: '5-10 minutes',
          repetitions: '1-2x/jour',
        },
        {
          level: 1,
          instructions: 'Même position, ajoutez des flexions-extensions des pieds pendant 2 min.',
          duration: '10-15 minutes',
          repetitions: '1-2x/jour',
        },
        {
          level: 2,
          instructions: 'Même position, alternez flexions des pieds et rotations des chevilles.',
          duration: '15-20 minutes',
          repetitions: '1-2x/jour',
        },
      ],
      common_errors: [
        'Fesses trop éloignées du mur',
        'Position inconfortable (ajustez avec un coussin)',
      ],
      stop_rules: [
        'Engourdissement des jambes',
        'Douleur lombaire',
      ],
      illustration: '/illustrations/exercises/legs-wall.svg',
    },
  ],

  seven_day_plan: [
    {
      day: 1,
      title: 'Installation des bases',
      actions: [
        'Mettre vos bas de contention dès le lever',
        'Pompe du mollet : 20 rep, 3 fois dans la journée',
        'Surélever les jambes 15 min le soir',
      ],
    },
    {
      day: 2,
      title: 'Ajout de la marche',
      actions: [
        'Contention dès le lever',
        'Marche 15-20 minutes',
        'Jambes au mur 10 min le soir',
      ],
    },
    {
      day: 3,
      title: 'Exercices complets',
      actions: [
        'Pompe du mollet + rotations des chevilles',
        'Marche 20 minutes',
        'Douche fraîche sur les mollets',
      ],
    },
    {
      day: 4,
      title: 'Consolidation',
      actions: [
        'Tous les exercices appris',
        'Vérifier que vous bougez toutes les 45 min si assis longtemps',
        'Jambes au mur 15 min',
      ],
    },
    {
      day: 5,
      title: 'Activité cardio',
      actions: [
        'Marche 25-30 minutes ou vélo/piscine',
        'Pompes du mollet en fin de journée',
        'Surélévation des jambes',
      ],
    },
    {
      day: 6,
      title: 'Routine complète',
      actions: [
        'Programme complet matin et soir',
        'Activité cardio au choix',
        'Hydratation de la peau des jambes',
      ],
    },
    {
      day: 7,
      title: 'Bilan',
      actions: [
        'Noter : lourdeur, gonflements, confort',
        'Vérifier que les bas sont en bon état',
        'Planifier la semaine suivante',
      ],
    },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Mise en place de la compression',
      goals: [
        'Porter les bas de contention tous les jours',
        'Exercices de base 2-3x/jour',
        'Surélévation des jambes le soir',
      ],
      exercises: ['pompe-mollet', 'jambes-mur'],
    },
    {
      week: 2,
      focus: 'Intégration de la marche',
      goals: [
        'Marche quotidienne 20 min',
        'Ajouter les rotations de chevilles',
        'Éviter de rester assis > 45 min',
      ],
      exercises: ['pompe-mollet', 'rotation-cheville', 'jambes-mur'],
    },
    {
      week: 3,
      focus: 'Progression cardio',
      goals: [
        'Augmenter la marche à 30 min',
        'Essayer vélo ou piscine',
        'Maintenir tous les exercices',
      ],
      exercises: ['pompe-mollet', 'rotation-cheville', 'marche-sur-place', 'jambes-mur'],
    },
    {
      week: 4,
      focus: 'Autonomie',
      goals: [
        'Routine quotidienne automatique',
        'Évaluer les progrès : lourdeur, gonflements',
        'Prévoir le renouvellement des bas si usés',
      ],
      exercises: ['pompe-mollet', 'rotation-cheville', 'marche-sur-place', 'jambes-mur'],
    },
  ],

  medical_procedures: [
    {
      id: 'sclerotherapie',
      name: 'Sclérothérapie',
      type: 'other',
      purpose: 'Injection d\'un produit sclérosant dans les varices pour les faire disparaître.',
      indications: [
        'Varices de petit et moyen calibre',
        'Télangiectasies (varicosités)',
        'Échec ou insuffisance de la compression seule',
      ],
      benefits: [
        'Procédure peu invasive',
        'Pas d\'anesthésie générale',
        'Bons résultats esthétiques et fonctionnels',
      ],
      limitations: [
        'Plusieurs séances parfois nécessaires',
        'Récidives possibles',
        'Contre-indiquée en cas de thrombose',
      ],
      risks: [
        'Pigmentation cutanée (temporaire)',
        'Inflammation locale',
        'Thrombose superficielle (rare)',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'Recommandée par l\'ESVS pour les varices symptomatiques. Efficace et bien tolérée.',
      sources: [
        { title: 'ESVS 2022 Guidelines', org: 'ESVS', year: 2022 },
      ],
    },
    {
      id: 'thermoablation',
      name: 'Thermoablation endoveineuse (laser, radiofréquence)',
      type: 'surgery',
      purpose: 'Détruire la veine malade par la chaleur (laser ou radiofréquence), via un cathéter.',
      indications: [
        'Insuffisance de la grande ou petite veine saphène',
        'Varices symptomatiques',
        'Alternative au stripping chirurgical',
      ],
      benefits: [
        'Moins invasif que la chirurgie classique',
        'Anesthésie locale',
        'Récupération rapide',
        'Excellents résultats à long terme',
      ],
      limitations: [
        'Coût plus élevé que la sclérothérapie',
        'Nécessite un plateau technique',
      ],
      risks: [
        'Thrombose veineuse profonde (rare)',
        'Lésion nerveuse (rare)',
        'Ecchymoses',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'Traitement de référence pour l\'insuffisance saphénienne selon l\'ESVS. Préféré au stripping dans la plupart des cas.',
      sources: [
        { title: 'ESVS 2022 Guidelines', org: 'ESVS', year: 2022 },
      ],
    },
  ],

  thermal_evidence: {
    summary: 'Les cures thermales spécialisées (phlébologie) montrent un bénéfice sur les symptômes de l\'insuffisance veineuse, avec amélioration de la qualité de vie et réduction des symptômes pendant 6-12 mois.',
    key_results: [
      'Amélioration de la lourdeur et des douleurs',
      'Réduction des œdèmes',
      'Amélioration de la qualité de vie',
      'Effet persistant 6-12 mois',
    ],
    duration_recommended: '3 semaines (18 jours de soins)',
    limitations: [
      'Effet principalement symptomatique',
      'Ne traite pas les varices elles-mêmes',
      'Études de qualité variable',
    ],
    contraindications: [
      'Thrombose veineuse récente',
      'Ulcère non contrôlé',
      'Infection cutanée active',
    ],
    sources: [
      { title: 'Spa therapy for chronic venous insufficiency', org: 'Int Angiol', year: 2018, type: 'rct' },
    ],
  },

  sources: [
    {
      title: 'ESVS Clinical Practice Guidelines on the Management of Chronic Venous Disease',
      org: 'European Society for Vascular Surgery',
      year: 2022,
      url: 'https://www.ejves.com/article/S1078-5884(21)00901-4/fulltext',
      type: 'guideline',
    },
    {
      title: 'Compression therapy for venous leg ulcers',
      org: 'Cochrane',
      year: 2021,
      type: 'cochrane',
    },
    {
      title: 'HAS - Insuffisance veineuse chronique',
      org: 'HAS',
      year: 2021,
      type: 'guideline',
    },
  ],
};
