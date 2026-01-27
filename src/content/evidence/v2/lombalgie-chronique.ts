import { EvidencePackV2 } from './types';

export const lombalgieChronique: EvidencePackV2 = {
  slug: 'lombalgie-chronique',
  title: 'Lombalgie chronique / Sciatique chronique',
  category: 'rhumatologie',
  icon: '🔙',
  updated_at: '2026-01-27',
  version: '2.0.0',
  status: 'complete',

  definition: {
    summary: `La lombalgie chronique est une douleur du bas du dos qui persiste plus de 3 mois. Elle peut être associée ou non à une sciatique (douleur irradiant dans la jambe).

Dans l'immense majorité des cas, il n'y a pas de lésion grave. Le dos est solide, mais peut devenir douloureux et sensible, créant un cercle vicieux peur-évitement-déconditionnement.

Le traitement repose sur le mouvement progressif, l'éducation (comprendre sa douleur), et parfois un accompagnement psychologique. Les examens d'imagerie sont rarement utiles et peuvent même être contre-productifs.`,
    key_points: [
      'La douleur chronique ne signifie pas lésion grave',
      'Le repos prolongé aggrave la situation',
      'L\'exercice progressif est le traitement le plus efficace',
      'Les facteurs psychologiques (stress, peur) jouent un rôle majeur',
    ],
    prevalence: '20% des adultes souffrent de lombalgie chronique',
    risk_factors: [
      'Sédentarité',
      'Travail physique ou postural répétitif',
      'Stress, anxiété, dépression',
      'Surpoids',
      'Tabagisme',
      'Antécédent de lombalgie aiguë mal gérée',
    ],
  },

  recommendations: [
    {
      text: 'Rester actif : le mouvement est le traitement principal. Le repos au lit est déconseillé.',
      level: 'Élevé',
      tags: ['essentiel', 'mouvement'],
      source_ref: 'WHO 2023',
    },
    {
      text: 'Exercice physique régulier : marche, natation, vélo, yoga, Pilates. L\'important est de bouger régulièrement.',
      level: 'Élevé',
      tags: ['exercice', 'essentiel'],
      source_ref: 'WHO 2023',
    },
    {
      text: 'Éducation thérapeutique : comprendre que la douleur n\'égale pas lésion. Le dos est solide.',
      level: 'Élevé',
      tags: ['éducation', 'essentiel'],
      source_ref: 'WHO 2023',
    },
    {
      text: 'Renforcement musculaire progressif : muscles du tronc, lombaires, abdominaux.',
      level: 'Élevé',
      tags: ['exercice', 'renforcement'],
      source_ref: 'NICE NG59',
    },
    {
      text: 'Thérapies manuelles (kinésithérapie, ostéopathie) EN COMPLÉMENT de l\'exercice, pas en remplacement.',
      level: 'Modéré',
      tags: ['accompagnement'],
      source_ref: 'WHO 2023',
    },
    {
      text: 'Gestion du stress et soutien psychologique si besoin : TCC, relaxation, pleine conscience.',
      level: 'Modéré',
      tags: ['psy', 'gestion-douleur'],
      source_ref: 'WHO 2023',
    },
    {
      text: 'Éviter les longues périodes assises : se lever et bouger toutes les 30-45 minutes.',
      level: 'Modéré',
      tags: ['quotidien'],
      source_ref: 'Consensus',
    },
    {
      text: 'Améliorer le sommeil : position confortable, matelas ferme, gestion de l\'anxiété.',
      level: 'Modéré',
      tags: ['sommeil'],
      source_ref: 'WHO 2023',
    },
    {
      text: 'Perte de poids si surpoids : réduit la charge sur le rachis.',
      level: 'Modéré',
      tags: ['poids'],
      source_ref: 'WHO 2023',
    },
    {
      text: 'Arrêt du tabac : le tabagisme aggrave la douleur et ralentit la guérison.',
      level: 'Modéré',
      tags: ['tabac'],
      source_ref: 'WHO 2023',
    },
  ],

  red_flags: [
    {
      text: 'Perte de contrôle de la vessie ou des selles → syndrome de la queue de cheval (urgence)',
      urgency: 'immediate',
      source_ref: 'WHO 2023',
    },
    {
      text: 'Perte de force importante et progressive dans les jambes',
      urgency: 'immediate',
      source_ref: 'WHO 2023',
    },
    {
      text: 'Douleur nocturne intense, fièvre, perte de poids inexpliquée',
      urgency: 'rapid',
      source_ref: 'WHO 2023',
    },
    {
      text: 'Traumatisme récent (chute, accident)',
      urgency: 'rapid',
      source_ref: 'Clinical consensus',
    },
    {
      text: 'Antécédent de cancer avec douleur dorsale nouvelle',
      urgency: 'rapid',
      source_ref: 'WHO 2023',
    },
  ],

  exercises: [
    {
      id: 'cat-cow',
      name: 'Chat-vache (Cat-Cow)',
      description: 'Mobilise la colonne en douceur, réduit la raideur matinale.',
      levels: [
        {
          level: 0,
          instructions: 'À quatre pattes, alternez dos rond (chat) et dos creux (vache). Mouvements lents et fluides.',
          repetitions: '10 cycles, 2x/jour',
        },
        {
          level: 1,
          instructions: 'Augmentez l\'amplitude et la durée de chaque position (3 sec).',
          repetitions: '15 cycles, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Ajoutez une rotation : regardez par-dessus l\'épaule en creusant.',
          repetitions: '15-20 cycles, 2x/jour',
        },
      ],
      common_errors: [
        'Mouvements trop rapides',
        'Respiration bloquée',
        'Amplitude excessive qui génère de la douleur',
      ],
      stop_rules: [
        'Douleur aiguë dans le dos',
        'Irradiation dans la jambe',
      ],
      illustration: '/illustrations/exercises/cat-cow.svg',
    },
    {
      id: 'bird-dog',
      name: 'Bird-Dog (Chien-oiseau)',
      description: 'Renforce les muscles profonds du dos et les fessiers.',
      levels: [
        {
          level: 0,
          instructions: 'À quatre pattes, tendez un bras devant vous. Maintenez 3 sec. Alternez.',
          repetitions: '10 par bras, 1x/jour',
        },
        {
          level: 1,
          instructions: 'Tendez simultanément le bras et la jambe opposée. Maintenez 5 sec.',
          repetitions: '10 par côté, 2x/jour',
        },
        {
          level: 2,
          instructions: 'Maintenez 10 sec. Ajoutez de légers mouvements d\'oscillation.',
          repetitions: '15 par côté, 2x/jour',
        },
      ],
      common_errors: [
        'Cambrer excessivement le dos',
        'Pencher le bassin sur le côté',
        'Retenir sa respiration',
      ],
      stop_rules: [
        'Douleur dans le bas du dos',
        'Perte d\'équilibre récurrente',
      ],
      illustration: '/illustrations/exercises/bird-dog.svg',
    },
    {
      id: 'planche-ventrale',
      name: 'Gainage ventral (Planche)',
      description: 'Renforce la sangle abdominale et stabilise le rachis.',
      levels: [
        {
          level: 0,
          instructions: 'Sur les genoux et les avant-bras. Gardez le dos plat 10-15 sec.',
          duration: '10-15 sec',
          repetitions: '3-5 répétitions',
        },
        {
          level: 1,
          instructions: 'Sur les orteils et les avant-bras (position classique). Maintenez 20-30 sec.',
          duration: '20-30 sec',
          repetitions: '3-5 répétitions',
        },
        {
          level: 2,
          instructions: 'Maintenez 45-60 sec. Variante : lever alternativement un pied.',
          duration: '45-60 sec',
          repetitions: '3-5 répétitions',
        },
      ],
      common_errors: [
        'Dos qui creuse (garder le corps aligné)',
        'Fesses trop hautes',
        'Respiration bloquée',
      ],
      stop_rules: [
        'Douleur lombaire pendant l\'exercice',
        'Douleur dans les épaules',
      ],
      illustration: '/illustrations/exercises/plank.svg',
    },
    {
      id: 'etirement-piriforme',
      name: 'Étirement du piriforme',
      description: 'Soulage la tension du muscle piriforme, souvent impliqué dans la sciatique.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé sur le dos, croisez une cheville sur le genou opposé. Tirez doucement le genou vers vous.',
          duration: '20-30 sec',
          repetitions: '2-3 fois par côté',
        },
        {
          level: 1,
          instructions: 'Même position, tirez plus fort. Cherchez une sensation d\'étirement dans la fesse.',
          duration: '30 sec',
          repetitions: '2-3 fois par côté',
        },
        {
          level: 2,
          instructions: 'Position assise, croisez la jambe et penchez-vous en avant.',
          duration: '30-45 sec',
          repetitions: '2-3 fois par côté',
        },
      ],
      common_errors: [
        'Tirer trop fort',
        'Cambrer le bas du dos',
      ],
      stop_rules: [
        'Douleur irradiant dans la jambe',
        'Picotements ou engourdissements',
      ],
      illustration: '/illustrations/exercises/piriformis.svg',
    },
    {
      id: 'extension-lombaire',
      name: 'Extension lombaire (McKenzie)',
      description: 'Mobilise le rachis en extension. Particulièrement utile si la douleur centralise.',
      levels: [
        {
          level: 0,
          instructions: 'Allongé sur le ventre, appuyez-vous sur les avant-bras pour soulever le buste. Maintenez 5 sec.',
          repetitions: '10 répétitions, 2-3x/jour',
        },
        {
          level: 1,
          instructions: 'Même exercice en s\'appuyant sur les mains (extension plus importante).',
          repetitions: '10 répétitions, 2-3x/jour',
        },
        {
          level: 2,
          instructions: 'Extension complète avec bras tendus. Maintenir quelques secondes.',
          repetitions: '10-15 répétitions, 2-3x/jour',
        },
      ],
      common_errors: [
        'Lever les hanches du sol',
        'Contracter les fessiers',
        'Forcer si la douleur augmente ou irradie',
      ],
      stop_rules: [
        'Douleur qui augmente dans la jambe (périphérisation)',
        'Douleur intense dans le dos',
      ],
      illustration: '/illustrations/exercises/mckenzie.svg',
    },
  ],

  seven_day_plan: [
    {
      day: 1,
      title: 'Mobilité douce',
      actions: [
        'Chat-vache : 10 cycles',
        'Marcher 10-15 minutes',
        'Éviter de rester assis plus de 30 min d\'affilée',
      ],
    },
    {
      day: 2,
      title: 'Renforcement léger',
      actions: [
        'Chat-vache : 10 cycles',
        'Bird-dog : 10 par côté (bras seul si niveau 0)',
        'Marcher 15 minutes',
      ],
    },
    {
      day: 3,
      title: 'Ajout des étirements',
      actions: [
        'Chat-vache',
        'Étirement piriforme : 2x20 sec par côté',
        'Extension lombaire si tolérée : 5-10 rep',
        'Marche 15-20 min',
      ],
    },
    {
      day: 4,
      title: 'Récupération active',
      actions: [
        'Marche ou vélo léger 20 min',
        'Étirements doux',
        'Relaxation ou respiration abdominale 5 min',
      ],
    },
    {
      day: 5,
      title: 'Gainage',
      actions: [
        'Chat-vache',
        'Bird-dog',
        'Planche ventrale : niveau adapté, 3 séries',
        'Marche 15-20 min',
      ],
    },
    {
      day: 6,
      title: 'Programme complet',
      actions: [
        'Enchaîner tous les exercices appris',
        'Activité cardio au choix 20-30 min',
      ],
    },
    {
      day: 7,
      title: 'Bilan et repos actif',
      actions: [
        'Activité légère au choix',
        'Noter vos progrès : douleur, mobilité, moral',
        'Identifier ce qui a le mieux fonctionné',
      ],
    },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Reprise du mouvement',
      goals: [
        'Bouger tous les jours, même peu',
        'Marche quotidienne 10-15 min',
        'Cat-cow matin et soir',
      ],
      exercises: ['cat-cow'],
    },
    {
      week: 2,
      focus: 'Renforcement progressif',
      goals: [
        'Ajouter bird-dog et étirements',
        'Augmenter la marche à 20 min',
        'Réduire les périodes assises prolongées',
      ],
      exercises: ['cat-cow', 'bird-dog', 'etirement-piriforme'],
    },
    {
      week: 3,
      focus: 'Gainage et cardio',
      goals: [
        'Intégrer la planche ventrale',
        'Ajouter une activité cardio (vélo, piscine)',
        'Travailler sur les pensées liées à la douleur',
      ],
      exercises: ['cat-cow', 'bird-dog', 'planche-ventrale', 'etirement-piriforme'],
    },
    {
      week: 4,
      focus: 'Autonomie et confiance',
      goals: [
        'Programme complet 5x/semaine',
        'Cardio 25-30 min, 3-4x/semaine',
        'Retour progressif aux activités évitées',
      ],
      exercises: ['cat-cow', 'bird-dog', 'planche-ventrale', 'extension-lombaire', 'etirement-piriforme'],
    },
  ],

  medical_procedures: [
    {
      id: 'infiltration-epidurale',
      name: 'Infiltration épidurale de corticoïdes',
      type: 'infiltration',
      purpose: 'Réduire l\'inflammation autour des racines nerveuses en cas de sciatique.',
      indications: [
        'Sciatique avec composante radiculaire importante',
        'Échec du traitement conservateur à 6 semaines',
        'Douleur sévère limitant la rééducation',
      ],
      benefits: [
        'Soulagement à court terme (quelques semaines)',
        'Permet de reprendre la rééducation',
        'Alternative à la chirurgie dans certains cas',
      ],
      limitations: [
        'Effet temporaire',
        'Ne modifie pas l\'évolution naturelle',
        'Efficacité modeste dans les études',
      ],
      risks: [
        'Céphalées post-ponction',
        'Infection (rare)',
        'Douleur transitoire',
      ],
      guideline_position: 'conditional',
      guideline_summary: 'L\'OMS 2023 ne recommande pas les infiltrations en routine. Elles peuvent être considérées en cas de sciatique sévère résistant au traitement conservateur.',
      sources: [
        { title: 'WHO Guideline Low Back Pain', org: 'WHO', year: 2023 },
      ],
    },
    {
      id: 'arthrodese-lombaire',
      name: 'Arthrodèse lombaire',
      type: 'surgery',
      purpose: 'Fusionner des vertèbres pour stabiliser un segment douloureux et instable.',
      indications: [
        'Spondylolisthésis avec instabilité',
        'Échec du traitement conservateur pendant > 1 an',
        'Douleur discogénique confirmée par discographie',
      ],
      benefits: [
        'Stabilisation du segment',
        'Amélioration possible de la douleur',
      ],
      limitations: [
        'Résultats variables et imprévisibles',
        'Perte de mobilité du segment fusionné',
        'Risque de surcharge des segments adjacents',
      ],
      risks: [
        'Pseudarthrose (non-fusion)',
        'Infection',
        'Lésion neurologique',
        'Échec de la chirurgie (douleur persistante)',
      ],
      guideline_position: 'conditional',
      guideline_summary: 'L\'OMS 2023 recommande de réserver la chirurgie aux cas très sélectionnés après échec prolongé du traitement conservateur. Les résultats ne sont pas supérieurs à un programme de rééducation intensive.',
      sources: [
        { title: 'WHO Guideline Low Back Pain', org: 'WHO', year: 2023 },
      ],
    },
  ],

  thermal_evidence: {
    summary: 'Les cures thermales montrent un bénéfice modeste sur la lombalgie chronique, principalement via l\'effet combiné de l\'eau chaude, des exercices, et de la prise en charge globale.',
    key_results: [
      'Réduction de la douleur de 20-30% à 3 mois',
      'Amélioration de la fonction et de la qualité de vie',
      'Réduction de la consommation d\'antalgiques',
    ],
    duration_recommended: '3 semaines',
    limitations: [
      'Effet placebo important',
      'Difficile de séparer l\'effet thermique de l\'effet rééducation',
      'Études de qualité variable',
    ],
    sources: [
      { title: 'Spa therapy for chronic low back pain', org: 'Cochrane', year: 2015, type: 'cochrane' },
    ],
  },

  sources: [
    {
      title: 'WHO guideline for non-surgical management of chronic primary low back pain',
      org: 'WHO',
      year: 2023,
      url: 'https://www.who.int/publications/i/item/9789240081789',
      type: 'guideline',
    },
    {
      title: 'Low back pain and sciatica (NG59)',
      org: 'NICE',
      year: 2016,
      url: 'https://www.nice.org.uk/guidance/ng59',
      type: 'guideline',
    },
    {
      title: 'Exercise therapy for chronic low back pain',
      org: 'Cochrane',
      year: 2021,
      type: 'cochrane',
    },
    {
      title: 'Cognitive behavioural therapy for chronic pain',
      org: 'Cochrane',
      year: 2020,
      type: 'cochrane',
    },
  ],
};
