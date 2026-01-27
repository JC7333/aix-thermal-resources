// ============================================
// EVIDENCE PACK V2 — OTITES À RÉPÉTITION (ENFANT)
// Sources: AAO-HNSF Clinical Practice Guideline: Tympanostomy Tubes in Children (2022)
// ============================================

import { EvidencePackV2 } from './types';

export const otitesRepetitionEnfant: EvidencePackV2 = {
  slug: 'otites-repetition-enfant',
  title: 'Otites à répétition (enfant)',
  category: 'respiratoire-orl',
  icon: '👂',
  updated_at: '2026-01-27',
  version: '2.0.0',
  status: 'complete',

  // Section 1: Comprendre
  definition: {
    summary: `Les otites moyennes aiguës à répétition concernent les enfants présentant 3 épisodes ou plus sur 6 mois, ou 4 épisodes ou plus sur 12 mois. Cette situation fréquente entre 6 mois et 3 ans est favorisée par l'immaturité du système immunitaire, la forme de la trompe d'Eustache (plus courte et horizontale chez l'enfant), et les infections respiratoires répétées en collectivité.

La plupart des enfants "sortent" de cette période vers 3-4 ans avec la maturation anatomique et immunitaire. L'objectif est de limiter le nombre d'épisodes, prévenir les complications (perforation, surdité), et éviter les antibiothérapies répétées quand c'est possible.`,
    key_points: [
      'Définition : ≥3 OMA en 6 mois ou ≥4 en 12 mois avec ≥1 épisode récent',
      'Pic de fréquence : 6-24 mois (immaturité immunitaire + trompe d\'Eustache courte)',
      'Facteurs favorisants : crèche, tabagisme passif, reflux, allergie, fratrie',
      'Évolution naturelle favorable vers 3-4 ans dans la majorité des cas',
    ],
    prevalence: 'Environ 10-20% des enfants présentent des OMA à répétition',
    risk_factors: [
      'Garde en collectivité (crèche)',
      'Tabagisme passif au domicile',
      'Reflux gastro-œsophagien',
      'Terrain allergique',
      'Fratrie avec antécédents d\'otites',
      'Absence d\'allaitement maternel',
      'Utilisation prolongée de la tétine',
    ],
  },

  // Section 2: Recommandations
  recommendations: [
    {
      text: 'Éviction du tabagisme passif : réduction significative du risque d\'OMA',
      level: 'Élevé',
      tags: ['prévention', 'environnement'],
      source_ref: 'AAO-HNSF 2022',
    },
    {
      text: 'Allaitement maternel prolongé (≥3-6 mois) : effet protecteur démontré',
      level: 'Élevé',
      tags: ['prévention', 'nourrisson'],
      source_ref: 'AAO-HNSF 2022',
    },
    {
      text: 'Vaccination à jour (pneumocoque, grippe) : réduit l\'incidence des OMA',
      level: 'Élevé',
      tags: ['prévention', 'vaccination'],
      source_ref: 'AAO-HNSF 2022',
    },
    {
      text: 'Lavages de nez réguliers au sérum physiologique (matin et soir + si rhinite)',
      level: 'Modéré',
      tags: ['hygiène', 'quotidien'],
    },
    {
      text: 'Position semi-assise pour les biberons : évite le reflux vers la trompe d\'Eustache',
      level: 'Modéré',
      tags: ['prévention', 'nourrisson'],
    },
    {
      text: 'Limiter l\'utilisation de la tétine après 6 mois si possible',
      level: 'Modéré',
      tags: ['prévention'],
      source_ref: 'AAO-HNSF 2022',
    },
    {
      text: 'Considérer un mode de garde alternatif (assistante maternelle) si OMA très fréquentes',
      level: 'Modéré',
      tags: ['prévention', 'organisation'],
    },
    {
      text: 'Traitement du reflux gastro-œsophagien s\'il est associé',
      level: 'Modéré',
      tags: ['traitement associé'],
    },
  ],

  // Section 3: Red Flags
  red_flags: [
    {
      text: 'Fièvre élevée persistante (>39°C) malgré traitement antipyrétique',
      urgency: 'rapid',
    },
    {
      text: 'Rougeur/gonflement derrière l\'oreille (mastoïdite)',
      urgency: 'immediate',
    },
    {
      text: 'Torticolis associé à une otite',
      urgency: 'immediate',
    },
    {
      text: 'Troubles de l\'équilibre, vertiges, vomissements répétés',
      urgency: 'rapid',
    },
    {
      text: 'Doute sur l\'audition : enfant qui ne réagit plus aux sons',
      urgency: 'routine',
    },
    {
      text: 'Écoulement purulent persistant >2 semaines',
      urgency: 'routine',
    },
  ],

  // Section 4: Exercices / Soins pratiques
  exercises: [
    {
      id: 'lavage-nez-nourrisson',
      name: 'Lavage de nez (nourrisson)',
      description: 'Technique de lavage nasal pour les bébés de moins de 1 an',
      levels: [
        {
          level: 0,
          instructions: 'Coucher bébé sur le côté, tête légèrement inclinée. Insérer doucement l\'embout du sérum dans la narine supérieure. Presser pour faire couler le liquide (ressort par l\'autre narine). Redresser bébé pour qu\'il évacue. Répéter de l\'autre côté.',
          duration: '2-3 min par côté',
        },
      ],
      common_errors: [
        'Injecter trop fort (risque de douleur)',
        'Oublier de changer de côté',
        'Faire le lavage juste avant le repas (risque de vomissement)',
      ],
      stop_rules: ['Saignement de nez', 'Enfant qui s\'étouffe'],
    },
    {
      id: 'lavage-nez-enfant',
      name: 'Lavage de nez (enfant > 2 ans)',
      description: 'Technique adaptée pour les enfants qui tiennent debout',
      levels: [
        {
          level: 0,
          instructions: 'Enfant penché en avant au-dessus du lavabo, bouche ouverte. Insérer l\'embout dans une narine, presser pour que le liquide ressorte par l\'autre narine ou la bouche. Faire moucher ensuite. Répéter de l\'autre côté.',
          duration: '1-2 min par côté',
        },
      ],
      common_errors: [
        'Tête en arrière (risque d\'avaler)',
        'Ne pas faire moucher après',
      ],
    },
    {
      id: 'mouchage-efficace',
      name: 'Apprendre à moucher correctement',
      description: 'Technique pour les enfants de 2-3 ans et plus',
      levels: [
        {
          level: 0,
          instructions: 'Boucher une narine avec le doigt, souffler doucement par l\'autre (comme pour éteindre une bougie). Répéter de l\'autre côté. Ne jamais souffler les deux narines en même temps.',
          duration: 'À répéter plusieurs fois par jour',
        },
      ],
      common_errors: [
        'Souffler trop fort (risque de reflux vers l\'oreille)',
        'Souffler les deux narines ensemble',
      ],
    },
    {
      id: 'position-biberon',
      name: 'Position correcte pour le biberon',
      description: 'Prévention du reflux vers la trompe d\'Eustache',
      levels: [
        {
          level: 0,
          instructions: 'Toujours donner le biberon avec bébé en position semi-assise (incliné à 45°). Ne jamais laisser bébé boire couché. Après le biberon, maintenir en position verticale 15-20 min.',
        },
      ],
    },
  ],

  // Section 5: Parcours guidé (adapté parents)
  seven_day_plan: [
    {
      day: 1,
      title: 'Évaluation de l\'environnement',
      actions: [
        'Vérifier : y a-t-il un fumeur au domicile ? Si oui, fumer uniquement dehors',
        'Acheter du sérum physiologique en dosettes ou spray adapté à l\'âge',
        'Programmer un rendez-vous vaccins si retard',
      ],
      tips: 'Le tabagisme passif double le risque d\'otites',
    },
    {
      day: 2,
      title: 'Mise en place des lavages de nez',
      actions: [
        'Faire un lavage de nez matin et soir',
        'Noter la technique qui fonctionne le mieux pour votre enfant',
      ],
    },
    {
      day: 3,
      title: 'Révision de l\'alimentation',
      actions: [
        'Vérifier la position du biberon (semi-assise)',
        'Si tétine utilisée après 6 mois, commencer le sevrage progressif',
      ],
    },
    {
      day: 4,
      title: 'Hygiène des mains',
      actions: [
        'Mettre en place le lavage des mains systématique (retour de crèche, avant repas)',
        'Prévoir du gel hydroalcoolique dans le sac pour les sorties',
      ],
    },
    {
      day: 5,
      title: 'Réflexion sur le mode de garde',
      actions: [
        'Si otites très fréquentes : discuter avec le médecin d\'une alternative temporaire',
        'Rappel : la situation s\'améliore naturellement vers 3-4 ans',
      ],
    },
    {
      day: 6,
      title: 'Suivi médical',
      actions: [
        'Prendre RDV ORL si >4-6 OMA/an ou doute sur l\'audition',
        'Préparer les questions pour le médecin',
      ],
    },
    {
      day: 7,
      title: 'Bilan et routine',
      actions: [
        'Les lavages de nez sont-ils bien tolérés ?',
        'Continuer les mesures préventives au quotidien',
      ],
    },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Installation des habitudes',
      goals: ['Lavages de nez biquotidiens', 'Suppression du tabagisme passif'],
      exercises: ['lavage-nez-nourrisson', 'lavage-nez-enfant'],
    },
    {
      week: 2,
      focus: 'Optimisation de l\'alimentation et de la position',
      goals: ['Position correcte du biberon', 'Début du sevrage tétine si applicable'],
      exercises: ['position-biberon'],
    },
    {
      week: 3,
      focus: 'Hygiène et prévention des infections',
      goals: ['Lavage des mains systématique', 'Éviter les contacts avec enfants malades si possible'],
      exercises: ['mouchage-efficace'],
    },
    {
      week: 4,
      focus: 'Bilan et suivi médical',
      goals: ['RDV ORL si nécessaire', 'Maintien des mesures préventives'],
      exercises: [],
    },
  ],

  // Section 6: Actes médicaux (éducatif)
  medical_procedures: [
    {
      id: 'aerateurs-transtympaniques',
      name: 'Aérateurs transtympaniques (yoyos/drains)',
      type: 'other',
      purpose: 'Permettre l\'aération de l\'oreille moyenne et évacuer le liquide qui stagne derrière le tympan',
      indications: [
        'OMA récidivantes (≥3 en 6 mois malgré les mesures préventives)',
        'Otite séromuqueuse persistante >3 mois avec retentissement auditif',
        'Retard de langage lié à une hypoacousie',
      ],
      benefits: [
        'Réduction significative du nombre d\'épisodes d\'OMA',
        'Amélioration de l\'audition',
        'Moins d\'antibiothérapies',
        'Intervention courte sous anesthésie générale légère',
      ],
      limitations: [
        'Ne traite pas la cause (maturation immunitaire à attendre)',
        'Les aérateurs tombent seuls en 6-18 mois',
        'Parfois plusieurs poses nécessaires',
      ],
      risks: [
        'Perforation tympanique résiduelle (rare)',
        'Otorrhée (écoulement) temporaire',
        'Précautions pour la baignade',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'Recommandés par l\'AAO-HNSF en cas d\'OMA récidivantes (≥3 en 6 mois) ou d\'otite séromuqueuse persistante avec retentissement auditif.',
      sources: [
        {
          title: 'Clinical Practice Guideline: Tympanostomy Tubes in Children',
          org: 'AAO-HNSF',
          year: 2022,
          url: 'https://pubmed.ncbi.nlm.nih.gov/35138954/',
          type: 'guideline',
        },
      ],
    },
    {
      id: 'adenoidectomie',
      name: 'Adénoïdectomie (ablation des végétations)',
      type: 'surgery',
      purpose: 'Retirer les végétations adénoïdes qui peuvent obstruer la trompe d\'Eustache',
      indications: [
        'OMA récidivantes associées à une obstruction nasale chronique',
        'Échec des aérateurs seuls',
        'Syndrome d\'apnées du sommeil associé',
      ],
      benefits: [
        'Améliore le drainage de l\'oreille moyenne',
        'Réduit l\'obstruction nasale',
        'Peut être combinée à la pose d\'aérateurs',
      ],
      limitations: [
        'Bénéfice moins net si pas d\'obstruction nasale associée',
        'Les végétations peuvent repousser (rare)',
      ],
      risks: [
        'Saignement post-opératoire',
        'Douleur transitoire',
        'Anesthésie générale',
      ],
      guideline_position: 'conditional',
      guideline_summary: 'L\'AAO-HNSF recommande de considérer l\'adénoïdectomie lors d\'une nouvelle pose d\'aérateurs si échec de la première pose, ou si obstruction nasale significative.',
      sources: [
        {
          title: 'Clinical Practice Guideline: Tympanostomy Tubes in Children',
          org: 'AAO-HNSF',
          year: 2022,
          url: 'https://pubmed.ncbi.nlm.nih.gov/35138954/',
          type: 'guideline',
        },
      ],
    },
  ],

  // Section 7: Cure thermale
  thermal_evidence: {
    summary: 'Les cures thermales à orientation ORL peuvent être proposées aux enfants souffrant d\'otites à répétition. Les eaux sulfurées ont des propriétés anti-inflammatoires et mucolytiques. Les études montrent une réduction du nombre d\'épisodes infectieux et de la consommation d\'antibiotiques dans les mois suivant la cure.',
    key_results: [
      'Réduction de 40-50% des épisodes d\'OMA dans l\'année suivant la cure (études observationnelles)',
      'Amélioration de la perméabilité de la trompe d\'Eustache',
      'Diminution de la consommation d\'antibiotiques',
    ],
    duration_recommended: '18 jours (cure conventionnée)',
    limitations: [
      'Études de qualité méthodologique variable',
      'Effet potentiellement lié aussi au changement d\'environnement',
      'Pas d\'essai randomisé de grande envergure',
    ],
    contraindications: [
      'Infection ORL aiguë en cours',
      'Perforation tympanique non cicatrisée',
    ],
    sources: [
      {
        title: 'Efficacy of spa therapy in children with chronic rhinosinusitis',
        org: 'European Archives of Oto-Rhino-Laryngology',
        year: 2018,
        type: 'rct',
      },
    ],
  },

  // Section 8: Sources principales
  sources: [
    {
      title: 'Clinical Practice Guideline: Tympanostomy Tubes in Children (Update)',
      org: 'AAO-HNSF (American Academy of Otolaryngology)',
      year: 2022,
      url: 'https://pubmed.ncbi.nlm.nih.gov/35138954/',
      type: 'guideline',
    },
    {
      title: 'The Diagnosis and Management of Acute Otitis Media',
      org: 'AAP (American Academy of Pediatrics)',
      year: 2013,
      url: 'https://publications.aap.org/pediatrics/article/131/3/e964/30912/',
      type: 'guideline',
    },
    {
      title: 'Clinical practice guideline: Otitis media with effusion',
      org: 'AAO-HNSF',
      year: 2016,
      url: 'https://pubmed.ncbi.nlm.nih.gov/26832942/',
      type: 'guideline',
    },
    {
      title: 'Vaccins et prévention des otites moyennes aiguës',
      org: 'Haut Conseil de la Santé Publique',
      year: 2023,
      type: 'consensus',
    },
  ],
};
