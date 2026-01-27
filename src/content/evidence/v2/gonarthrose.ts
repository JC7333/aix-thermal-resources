import { EvidencePackV2 } from './types';

export const gonarthrose: EvidencePackV2 = {
  slug: 'gonarthrose',
  title: 'Gonarthrose (arthrose du genou)',
  category: 'rhumatologie',
  subcategory: 'arthrose',
  parent_slug: 'arthrose',
  icon: '🦵',
  updated_at: '2026-01-27',
  version: '2.0.0',
  status: 'complete',

  // Section 1: Comprendre
  definition: {
    summary: `La gonarthrose est l'usure progressive du cartilage du genou. C'est l'articulation la plus fréquemment touchée par l'arthrose.

Le cartilage s'amincit, l'os sous-jacent se modifie, et l'articulation peut devenir douloureuse et raide. Ce n'est pas une fatalité : la plupart des personnes peuvent améliorer significativement leurs symptômes sans chirurgie.

L'exercice adapté est le traitement de première intention. Contrairement aux idées reçues, bouger protège le cartilage en le nourrissant et en renforçant les muscles qui soutiennent le genou.`,
    key_points: [
      'Touche 1 personne sur 4 après 60 ans',
      'La douleur n\'est pas proportionnelle aux dégâts visibles à la radio',
      'L\'exercice adapté est plus efficace que les médicaments seuls',
      'La perte de poids (même modeste) réduit significativement la douleur',
    ],
    prevalence: '10-15% des adultes > 60 ans, avec une prévalence croissante avec l\'âge',
    risk_factors: [
      'Âge > 50 ans',
      'Surpoids/obésité (facteur modifiable majeur)',
      'Antécédents de traumatisme du genou',
      'Travail physique répétitif (accroupissement)',
      'Sexe féminin après 50 ans',
      'Antécédents familiaux',
    ],
  },

  // Section 2: Agir
  recommendations: [
    {
      text: 'Exercice thérapeutique régulier : renforcement musculaire + mobilité + cardio léger. C\'est LE traitement de première intention.',
      level: 'Élevé',
      tags: ['exercice', 'essentiel'],
      source_ref: 'NICE NG226',
    },
    {
      text: 'Perte de poids si surpoids : même 5% de perte réduit significativement la douleur et améliore la fonction.',
      level: 'Élevé',
      tags: ['poids', 'essentiel'],
      source_ref: 'OARSI 2019',
    },
    {
      text: 'Séances supervisées au début si douleur forte, peur de bouger, ou mauvaise technique. Un kinésithérapeute peut guider les premiers pas.',
      level: 'Modéré',
      tags: ['kiné', 'accompagnement'],
      source_ref: 'NICE NG226',
    },
    {
      text: 'Marche quotidienne adaptée : commencer par 10-15 min, augmenter progressivement. Éviter les longues pauses immobiles.',
      level: 'Élevé',
      tags: ['marche', 'quotidien'],
      source_ref: 'OARSI 2019',
    },
    {
      text: 'Renforcement du quadriceps et des muscles de la cuisse : exercices simples à faire chez soi, 3x/semaine minimum.',
      level: 'Élevé',
      tags: ['renforcement', 'essentiel'],
      source_ref: 'Cochrane 2015',
    },
    {
      text: 'Chaussures adaptées : semelles souples, bon maintien. Éviter les talons hauts et les chaussures plates sans amorti.',
      level: 'Modéré',
      tags: ['équipement'],
      source_ref: 'OARSI 2019',
    },
    {
      text: 'Aides à la marche si besoin (canne côté opposé au genou douloureux) pour réduire la charge articulaire.',
      level: 'Modéré',
      tags: ['équipement', 'soulagement'],
      source_ref: 'NICE NG226',
    },
    {
      text: 'Chaleur locale (bouillotte, coussin chauffant) avant l\'exercice pour assouplir. Froid après en cas de gonflement.',
      level: 'Faible',
      tags: ['soulagement'],
      source_ref: 'Consensus',
    },
    {
      text: 'Éviter les positions prolongées (assis ou debout) : alterner, faire des pauses mouvement toutes les 30-45 min.',
      level: 'Modéré',
      tags: ['quotidien'],
      source_ref: 'OARSI 2019',
    },
    {
      text: 'Éducation thérapeutique : comprendre sa maladie, ses options, gérer ses poussées. Réduit l\'anxiété et améliore l\'adhésion.',
      level: 'Modéré',
      tags: ['éducation'],
      source_ref: 'NICE NG226',
    },
    {
      text: 'Activités aquatiques (piscine, aquagym) : réduisent la charge tout en permettant un exercice complet.',
      level: 'Modéré',
      tags: ['exercice', 'alternative'],
      source_ref: 'Cochrane 2016',
    },
    {
      text: 'Vélo (stationnaire ou extérieur) : excellente alternative à la marche si douleur debout.',
      level: 'Modéré',
      tags: ['exercice', 'alternative'],
      source_ref: 'OARSI 2019',
    },
  ],

  red_flags: [
    {
      text: 'Genou très gonflé, chaud, rouge avec fièvre → possible infection articulaire (arthrite septique)',
      urgency: 'immediate',
      source_ref: 'NICE NG226',
    },
    {
      text: 'Blocage complet du genou (impossible de plier ou étendre)',
      urgency: 'rapid',
      source_ref: 'NICE NG226',
    },
    {
      text: 'Douleur brutale après un traumatisme (chute, torsion)',
      urgency: 'rapid',
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Genou qui "lâche" de façon répétée (instabilité)',
      urgency: 'routine',
      source_ref: 'OARSI 2019',
    },
    {
      text: 'Douleur nocturne intense non soulagée par le repos, perte de poids inexpliquée',
      urgency: 'rapid',
      source_ref: 'NICE NG226',
    },
  ],

  // Section 3: Exercices
  exercises: [
    {
      id: 'quad-iso',
      name: 'Contraction isométrique du quadriceps',
      description: 'Renforce le muscle de la cuisse sans bouger le genou. Idéal pour commencer ou en cas de douleur.',
      levels: [
        {
          level: 0,
          instructions: 'Assis ou allongé, jambe tendue. Contractez le muscle de la cuisse (comme si vous vouliez "écraser" le genou contre le sol). Maintenez 5 secondes, relâchez.',
          duration: '5 sec',
          repetitions: '10 répétitions, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Même exercice, mais maintenez 8 secondes. Ajoutez une serviette roulée sous le genou pour plus de résistance.',
          duration: '8 sec',
          repetitions: '15 répétitions, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Maintenez 10 secondes. Ajoutez un poids léger sur la cheville (500g-1kg).',
          duration: '10 sec',
          repetitions: '20 répétitions, 2x/jour',
        },
      ],
      common_errors: [
        'Retenir sa respiration (respirez normalement)',
        'Contracter tout le corps (seule la cuisse travaille)',
        'Aller trop vite (la contraction doit être lente et contrôlée)',
      ],
      stop_rules: [
        'Douleur aiguë dans le genou',
        'Sensation de craquement inhabituel',
        'Gonflement qui apparaît après l\'exercice',
      ],
      illustration: '/illustrations/exercises/quad-iso.svg',
    },
    {
      id: 'flexion-extension-chaise',
      name: 'Flexion-extension sur chaise',
      description: 'Améliore la mobilité du genou en douceur, en position assise.',
      levels: [
        {
          level: 0,
          instructions: 'Assis sur une chaise stable, pieds à plat. Glissez lentement le pied en arrière (flexion) puis en avant (extension). Ne forcez pas.',
          repetitions: '10 mouvements par jambe, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Même exercice avec amplitude complète. En extension, soulevez légèrement le pied du sol.',
          repetitions: '15 mouvements par jambe, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Ajoutez une légère résistance (élastique autour de la cheville ou poids léger).',
          repetitions: '20 mouvements par jambe, 2x/jour',
        },
      ],
      common_errors: [
        'Mouvements trop rapides',
        'Forcer l\'amplitude au-delà de la douleur',
        'Se pencher en avant (gardez le dos droit)',
      ],
      stop_rules: [
        'Douleur qui augmente pendant l\'exercice',
        'Blocage articulaire',
      ],
      illustration: '/illustrations/exercises/flexion-chaise.svg',
    },
    {
      id: 'lever-jambe-tendue',
      name: 'Lever de jambe tendue (SLR)',
      description: 'Renforce le quadriceps sans charge sur le genou.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé sur le dos, une jambe pliée, l\'autre tendue. Soulevez la jambe tendue de 15-20 cm, maintenez 3 sec, reposez.',
          repetitions: '10 répétitions par jambe, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Soulevez plus haut (30 cm), maintenez 5 sec.',
          repetitions: '15 répétitions par jambe, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Ajoutez un poids léger à la cheville (500g-1kg). Maintenez 5-8 sec.',
          repetitions: '15-20 répétitions par jambe, 2x/jour',
        },
      ],
      common_errors: [
        'Cambrer le dos (le bas du dos doit rester au sol)',
        'Plier le genou de la jambe qui travaille',
        'Mouvements saccadés',
      ],
      stop_rules: [
        'Douleur dans le bas du dos',
        'Douleur aiguë dans le genou',
      ],
      illustration: '/illustrations/exercises/slr.svg',
    },
    {
      id: 'mini-squats',
      name: 'Mini-squats contre le mur',
      description: 'Renforce les cuisses et les fessiers avec un support stable.',
      levels: [
        {
          level: 0,
          instructions: 'Dos contre le mur, pieds à 30 cm du mur. Glissez vers le bas de 10-15 cm, maintenez 5 sec, remontez.',
          repetitions: '5 répétitions, 1x/jour',
        },
        {
          level: 1,
          instructions: 'Descendez jusqu\'à ce que les cuisses fassent un angle de 45°. Maintenez 10 sec.',
          repetitions: '10 répétitions, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Descendez jusqu\'à 90° (cuisses parallèles au sol). Maintenez 15 sec ou faites des répétitions dynamiques.',
          repetitions: '15 répétitions, 2x/jour',
        },
      ],
      common_errors: [
        'Genoux qui dépassent les orteils',
        'Genoux qui rentrent vers l\'intérieur',
        'Descendre trop vite',
      ],
      stop_rules: [
        'Douleur vive dans le genou',
        'Sensation d\'instabilité',
      ],
      illustration: '/illustrations/exercises/wall-squat.svg',
    },
    {
      id: 'step-up',
      name: 'Montée de marche (step-up)',
      description: 'Travaille la force fonctionnelle pour les escaliers.',
      levels: [
        {
          level: 1,
          instructions: 'Utilisez une marche basse (10-15 cm). Montez avec la jambe à travailler, redescendez. Tenez-vous à une rampe si besoin.',
          repetitions: '10 par jambe, 1x/jour',
        },
        {
          level: 2,
          instructions: 'Marche normale (15-20 cm). Sans appui si possible. Contrôlez bien la descente.',
          repetitions: '15 par jambe, 2x/jour',
        },
      ],
      common_errors: [
        'Se pousser avec la jambe arrière',
        'Descendre trop vite (la descente travaille aussi)',
        'Genou qui part vers l\'intérieur',
      ],
      stop_rules: [
        'Douleur à la montée ou à la descente',
        'Sensation de faiblesse/lâchage',
      ],
      illustration: '/illustrations/exercises/step-up.svg',
    },
    {
      id: 'etirement-quadriceps',
      name: 'Étirement du quadriceps',
      description: 'Assouplit l\'avant de la cuisse, souvent raide en cas d\'arthrose.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé sur le côté, attrapez votre pied arrière et tirez doucement vers les fesses. Si vous ne pouvez pas attraper le pied, utilisez une serviette.',
          duration: '20-30 sec',
          repetitions: '2 fois par jambe',
        },
        {
          level: 1,
          instructions: 'Debout, tenez-vous à un support. Même mouvement, cherchez à sentir l\'étirement sans douleur.',
          duration: '30 sec',
          repetitions: '2-3 fois par jambe',
        },
        {
          level: 2,
          instructions: 'Debout sans appui, ou en fente arrière pour plus d\'intensité.',
          duration: '30-45 sec',
          repetitions: '2-3 fois par jambe',
        },
      ],
      common_errors: [
        'Cambrer le dos',
        'Tirer trop fort (douleur = trop loin)',
        'Bloquer la respiration',
      ],
      stop_rules: [
        'Douleur dans le genou (devant ou derrière)',
        'Crampe intense',
      ],
      illustration: '/illustrations/exercises/quad-stretch.svg',
    },
  ],

  // Section 4: Parcours guidé
  seven_day_plan: [
    {
      day: 1,
      title: 'Démarrage en douceur',
      actions: [
        'Faire 10 contractions isométriques du quadriceps (exercice 1)',
        'Marcher 10 minutes à votre rythme',
        'Appliquer de la chaleur sur le genou 15 min',
      ],
      tips: 'Aujourd\'hui, l\'objectif est simplement de commencer. Ne forcez pas.',
    },
    {
      day: 2,
      title: 'Mobilité',
      actions: [
        'Répéter les contractions isométriques (10 rep)',
        'Ajouter les flexions-extensions sur chaise (10 rep par jambe)',
        'Marcher 10-15 minutes',
      ],
    },
    {
      day: 3,
      title: 'Renforcement léger',
      actions: [
        'Contractions isométriques (15 rep)',
        'Flexions-extensions (15 rep)',
        'Essayer le lever de jambe tendue (5-10 rep)',
      ],
    },
    {
      day: 4,
      title: 'Récupération active',
      actions: [
        'Marche légère 10 min',
        'Étirements doux du quadriceps',
        'Si disponible : vélo stationnaire 10 min (résistance faible)',
      ],
      tips: 'Jour plus léger pour permettre aux muscles de récupérer.',
    },
    {
      day: 5,
      title: 'Progression',
      actions: [
        'Contractions isométriques (15 rep)',
        'Lever de jambe tendue (10-15 rep)',
        'Mini-squats contre le mur (5 rep) - seulement si pas de douleur',
        'Marche 15 minutes',
      ],
    },
    {
      day: 6,
      title: 'Renforcement fonctionnel',
      actions: [
        'Enchaîner : contractions iso + lever jambe + mini-squats',
        'Marche 15-20 minutes',
        'Étirements en fin de journée',
      ],
    },
    {
      day: 7,
      title: 'Bilan et repos actif',
      actions: [
        'Activité douce au choix (marche, vélo, piscine)',
        'Étirements complets',
        'Noter vos progrès : douleur, mobilité, distance de marche',
      ],
      tips: 'Bravo ! Notez ce qui a fonctionné et ce qui était difficile.',
    },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Installation des habitudes',
      goals: [
        'Faire les exercices de base 5 jours sur 7',
        'Marcher 10-15 min quotidiennement',
        'Identifier les moments de la journée où c\'est plus facile',
      ],
      exercises: ['quad-iso', 'flexion-extension-chaise'],
    },
    {
      week: 2,
      focus: 'Progression du renforcement',
      goals: [
        'Ajouter le lever de jambe tendue',
        'Augmenter le temps de marche à 20 min',
        'Tenir un mini-carnet de suivi',
      ],
      exercises: ['quad-iso', 'flexion-extension-chaise', 'lever-jambe-tendue'],
    },
    {
      week: 3,
      focus: 'Renforcement fonctionnel',
      goals: [
        'Intégrer les mini-squats',
        'Essayer le vélo ou la piscine 1-2 fois',
        'Augmenter les répétitions de 20-30%',
      ],
      exercises: ['quad-iso', 'lever-jambe-tendue', 'mini-squats'],
    },
    {
      week: 4,
      focus: 'Consolidation et autonomie',
      goals: [
        'Programme complet 4-5 jours/semaine',
        'Marche 25-30 min ou équivalent',
        'Planifier la suite : maintenir 3x/semaine minimum',
      ],
      exercises: ['quad-iso', 'lever-jambe-tendue', 'mini-squats', 'step-up'],
    },
  ],

  // Section 5: Actes/Traitements
  medical_procedures: [
    {
      id: 'infiltration-corticoides',
      name: 'Infiltration de corticoïdes',
      type: 'infiltration',
      purpose: 'Réduire l\'inflammation et la douleur localement par injection intra-articulaire.',
      indications: [
        'Poussée inflammatoire avec épanchement',
        'Douleur non contrôlée par les traitements de première intention',
        'Gonarthrose modérée à sévère',
      ],
      benefits: [
        'Soulagement rapide (quelques jours)',
        'Permet de reprendre les exercices',
        'Efficace sur l\'inflammation aiguë',
      ],
      limitations: [
        'Effet temporaire (1-3 mois en moyenne)',
        'Ne modifie pas l\'évolution de l\'arthrose',
        'Nombre d\'injections limité (3-4/an max recommandé)',
      ],
      risks: [
        'Infection (rare, < 1/10 000)',
        'Douleur transitoire post-injection',
        'Effet délétère potentiel sur le cartilage si répétitions fréquentes',
      ],
      guideline_position: 'conditional',
      guideline_summary: 'Les guidelines OARSI et NICE recommandent les infiltrations de corticoïdes en cas de poussée inflammatoire, mais déconseillent leur utilisation répétée à long terme. L\'effet est modeste et temporaire.',
      sources: [
        { title: 'NICE NG226 - Osteoarthritis', org: 'NICE', year: 2022, url: 'https://www.nice.org.uk/guidance/ng226' },
        { title: 'OARSI Guidelines', org: 'OARSI', year: 2019 },
      ],
    },
    {
      id: 'viscosupplementation',
      name: 'Viscosupplémentation (acide hyaluronique)',
      type: 'viscosupplementation',
      purpose: 'Injecter un gel d\'acide hyaluronique dans l\'articulation pour améliorer la lubrification.',
      indications: [
        'Gonarthrose légère à modérée',
        'Échec ou intolérance aux autres traitements',
        'Patient non candidat à la chirurgie',
      ],
      benefits: [
        'Peut soulager la douleur pendant 3-6 mois',
        'Généralement bien toléré',
        'Alternative aux anti-inflammatoires',
      ],
      limitations: [
        'Efficacité modeste et controversée',
        'Coût élevé, non remboursé dans certains pays',
        'Résultats variables selon les patients',
      ],
      risks: [
        'Réaction locale (gonflement, douleur)',
        'Infection (très rare)',
        'Pseudo-goutte (rare)',
      ],
      guideline_position: 'controversial',
      guideline_summary: 'L\'OARSI donne une recommandation "uncertain" (incertaine). NICE ne recommande pas la viscosupplémentation. L\'ACR la juge "conditionnellement non recommandée". Les études montrent une efficacité modeste, souvent comparable au placebo.',
      sources: [
        { title: 'OARSI 2019 Guidelines', org: 'OARSI', year: 2019 },
        { title: 'ACR/AF Guidelines', org: 'ACR', year: 2019 },
      ],
    },
    {
      id: 'prp',
      name: 'Injections de PRP (Plasma Riche en Plaquettes)',
      type: 'prp',
      purpose: 'Injecter des facteurs de croissance issus du sang du patient pour stimuler la réparation tissulaire.',
      indications: [
        'Gonarthrose légère à modérée',
        'Patients jeunes avec arthrose débutante',
        'Recherche d\'alternative aux corticoïdes',
      ],
      benefits: [
        'Produit autologue (issu du patient)',
        'Effet anti-inflammatoire potentiel',
        'Études préliminaires encourageantes',
      ],
      limitations: [
        'Preuves scientifiques encore insuffisantes',
        'Non remboursé',
        'Protocoles très variables (pas de standardisation)',
        'Coût élevé',
      ],
      risks: [
        'Douleur au site d\'injection',
        'Infection (rare)',
        'Résultats imprévisibles',
      ],
      guideline_position: 'not_recommended',
      guideline_summary: 'Le PRP n\'est pas recommandé par les guidelines actuelles (OARSI, ACR) en raison du manque de preuves solides. Des études de meilleure qualité sont nécessaires avant de pouvoir le recommander.',
      sources: [
        { title: 'ACR/AF 2019 Guideline', org: 'ACR', year: 2019 },
        { title: 'OARSI 2019 Guidelines', org: 'OARSI', year: 2019 },
      ],
    },
    {
      id: 'pth-genou',
      name: 'Prothèse totale de genou (PTG)',
      type: 'surgery',
      purpose: 'Remplacer les surfaces articulaires usées par des implants artificiels.',
      indications: [
        'Gonarthrose sévère avec douleur importante',
        'Échec du traitement conservateur bien conduit',
        'Impact majeur sur la qualité de vie',
        'Déformation articulaire significative',
      ],
      benefits: [
        'Amélioration majeure de la douleur (> 90% des patients)',
        'Récupération de la mobilité fonctionnelle',
        'Durée de vie des implants : 15-25 ans',
        'Retour à une vie active (marche, vélo, natation)',
      ],
      limitations: [
        'Chirurgie lourde avec rééducation de 3-6 mois',
        'Ne permet pas tous les sports (course, sports de pivot déconseillés)',
        'Sensation de genou "différent" possible',
        'Révision parfois nécessaire après 15-20 ans',
      ],
      risks: [
        'Infection (1-2%)',
        'Thrombose veineuse (prévention systématique)',
        'Raideur persistante',
        'Descellement ou usure à long terme',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'La PTG est recommandée en dernier recours après échec du traitement conservateur bien conduit. Les résultats sont excellents chez les patients bien sélectionnés. L\'âge n\'est pas une contre-indication en soi, mais l\'état général et les attentes doivent être discutés.',
      sources: [
        { title: 'NICE NG226 - Surgical interventions', org: 'NICE', year: 2022, url: 'https://www.nice.org.uk/guidance/ng226' },
        { title: 'HAS - Prothèse de genou', org: 'HAS', year: 2020 },
      ],
    },
  ],

  // Section 6: Cure thermale
  thermal_evidence: {
    summary: 'Les cures thermales montrent un bénéfice modeste mais réel sur la douleur et la fonction dans la gonarthrose, avec des effets qui persistent 3-6 mois après la cure.',
    key_results: [
      'Réduction de la douleur de 20-30% en moyenne',
      'Amélioration de la fonction et de la qualité de vie',
      'Réduction de la consommation d\'antalgiques',
      'Effets qui persistent 3-6 mois après la cure',
      'Bénéfice supérieur chez les patients qui s\'engagent dans l\'exercice pendant la cure',
    ],
    duration_recommended: '3 semaines (18 jours de soins)',
    limitations: [
      'Effet placebo important (environnement, prise en charge globale)',
      'Difficile de séparer l\'effet des eaux de celui de l\'exercice/éducation',
      'Études de qualité méthodologique variable',
      'Bénéfice modeste comparé à l\'exercice seul bien conduit',
    ],
    contraindications: [
      'Poussée inflammatoire aiguë (épanchement, chaleur)',
      'Infection active',
      'Insuffisance cardiaque décompensée',
      'Cancer évolutif',
    ],
    sources: [
      {
        title: 'Thermal therapy for knee osteoarthritis: systematic review',
        org: 'Cochrane',
        year: 2020,
        type: 'cochrane',
      },
      {
        title: 'Effectiveness of spa therapy for knee OA',
        org: 'Rheumatology',
        year: 2018,
        type: 'rct',
      },
      {
        title: 'Avis thermalisme et gonarthrose',
        org: 'Académie Nationale de Médecine',
        year: 2019,
        type: 'consensus',
      },
    ],
  },

  // Section 7: Sources principales
  sources: [
    {
      title: 'Osteoarthritis: care and management (NG226)',
      org: 'NICE',
      year: 2022,
      url: 'https://www.nice.org.uk/guidance/ng226',
      type: 'guideline',
    },
    {
      title: 'OARSI Guidelines for the Non-Surgical Management of Knee, Hip, and Polyarticular OA',
      org: 'OARSI',
      year: 2019,
      url: 'https://www.oarsi.org/education/oarsi-guidelines',
      type: 'guideline',
    },
    {
      title: '2019 ACR/AF Guideline for the Management of Osteoarthritis',
      org: 'American College of Rheumatology',
      year: 2019,
      url: 'https://www.rheumatology.org/Practice-Quality/Clinical-Support/Clinical-Practice-Guidelines',
      type: 'guideline',
    },
    {
      title: 'Exercise for osteoarthritis of the knee',
      org: 'Cochrane Database of Systematic Reviews',
      year: 2015,
      type: 'cochrane',
    },
    {
      title: 'EULAR recommendations for the non-pharmacological management of OA',
      org: 'EULAR',
      year: 2018,
      type: 'guideline',
    },
  ],
};
