import { EvidencePackV2 } from './types';

export const arthroseDigitale: EvidencePackV2 = {
  slug: 'arthrose-digitale',
  title: 'Arthrose des mains (digitale et rhizarthrose)',
  category: 'rhumatologie',
  subcategory: 'arthrose',
  parent_slug: 'arthrose',
  icon: '🤲',
  updated_at: '2026-03-12',
  version: '2.0.0',
  status: 'complete',

  definition: {
    summary: `L'arthrose des mains est une usure du cartilage des articulations des doigts et du pouce. Elle se manifeste par des douleurs, des raideurs matinales, des gonflements et parfois des deformations des doigts (nodosites de Heberden et Bouchard).

La rhizarthrose est l'arthrose de la base du pouce, a la jonction entre le pouce et le poignet. C'est la forme la plus handicapante car elle gene la pince entre le pouce et l'index, essentielle pour la prehension.

Le traitement repose sur les exercices de mobilite et de renforcement, l'adaptation des gestes quotidiens, et les ortheses de repos pour la rhizarthrose. La chirurgie est reservee aux echecs prolonges.`,
    key_points: [
      'Forme d\'arthrose la plus frequente chez la femme apres 50 ans',
      'Les exercices de mobilite et de renforcement reduisent la douleur et ameliorent la fonction',
      'Les ortheses de repos nocturnes soulagent la rhizarthrose',
      'Les deformations sont souvent impressionnantes mais ne correlent pas toujours avec la douleur',
    ],
    prevalence: '25-30% des femmes et 10-15% des hommes de plus de 60 ans',
    risk_factors: [
      'Sexe feminin (3 fois plus frequente)',
      'Age superieur a 50 ans',
      'Menopause',
      'Antecedents familiaux',
      'Travaux manuels repetitifs',
      'Obésité',
    ],
  },

  recommendations: [
    {
      text: 'L\'exercice de mobilite et de renforcement est le traitement de premiere intention. Exercices quotidiens de la main et des doigts.',
      level: 'Élevé',
      tags: ['exercice', 'premiere-intention'],
      source_ref: 'EULAR 2018',
    },
    {
      text: 'Les ortheses de repos nocturnes sont recommandees pour la rhizarthrose (base du pouce). Elles reduisent la douleur et ameliorent la force de prehension.',
      level: 'Élevé',
      tags: ['orthese', 'rhizarthrose'],
      source_ref: 'EULAR 2018',
    },
    {
      text: 'Adapter les objets du quotidien : manches epais pour les couverts, ouvre-bocaux, stylos ergonomiques.',
      level: 'Consensus',
      tags: ['adaptation', 'quotidien'],
    },
    {
      text: 'La chaleur locale (bain de paraffine, bouillotte) soulage la raideur matinale. Le froid soulage les poussees inflammatoires.',
      level: 'Modéré',
      tags: ['chaleur', 'froid'],
      source_ref: 'Cochrane 2021',
    },
    {
      text: 'Les anti-inflammatoires topiques (gel) sont recommandes en premiere intention avant les anti-inflammatoires oraux.',
      level: 'Élevé',
      tags: ['medicament', 'topique'],
      source_ref: 'ACR 2019',
    },
    {
      text: 'La glucosamine et la chondroitine n\'ont pas montre d\'efficacite dans l\'arthrose des mains.',
      level: 'Élevé',
      tags: ['complement'],
      source_ref: 'EULAR 2018',
    },
  ],

  red_flags: [
    {
      text: 'Gonflement chaud et rouge d\'une seule articulation de doigt avec fievre — possible arthrite septique ou crise de goutte',
      urgency: 'rapid',
    },
    {
      text: 'Deformation rapide avec inflammation importante de plusieurs articulations — eliminer une polyarthrite rhumatoide (bilan sanguin necessaire)',
      urgency: 'rapid',
    },
    {
      text: 'Perte de sensibilite des doigts ou doigts blancs au froid — syndrome de Raynaud, consulter',
      urgency: 'routine',
    },
  ],

  exercises: [
    {
      id: 'flexion-extension-doigts',
      name: 'Flexion-extension des doigts',
      description: 'Ouvrir et fermer la main completement pour maintenir la mobilite.',
      levels: [
        {
          level: 0,
          instructions: 'Main posee sur une table. Ouvrir la main a plat, puis fermer le poing doucement. 10 repetitions, lentement.',
          repetitions: '10 x 2 series',
          duration: '2 minutes',
        },
        {
          level: 1,
          instructions: 'Meme exercice dans l\'eau chaude (lavabo ou bassine a 37 degres). L\'eau chaude assouplit les articulations. 15 repetitions.',
          repetitions: '15 x 2 series',
        },
        {
          level: 2,
          instructions: 'Serrer une balle en mousse souple (pas dure). Maintenir 5 secondes, relacher. 15 repetitions.',
          repetitions: '15 x 3 series, maintien 5s',
        },
      ],
      common_errors: ['Forcer dans la douleur', 'Utiliser une balle trop dure'],
    },
    {
      id: 'opposition-pouce',
      name: 'Opposition du pouce',
      description: 'Toucher chaque doigt avec le pouce pour maintenir la mobilite et la prehension fine.',
      levels: [
        {
          level: 0,
          instructions: 'Toucher le bout de chaque doigt avec le bout du pouce, un par un, du plus facile au plus difficile. 5 cycles complets.',
          repetitions: '5 cycles x 2 series',
        },
        {
          level: 1,
          instructions: 'Meme exercice en appuyant plus fermement, maintenir le contact 2 secondes. 8 cycles.',
          repetitions: '8 cycles x 2 series',
        },
        {
          level: 2,
          instructions: 'Avec une feuille de papier pincee entre le pouce et chaque doigt. Essayer de la retenir pendant que quelqu\'un tire doucement. 5 cycles.',
          repetitions: '5 cycles x 2 series',
        },
      ],
    },
    {
      id: 'pate-therapeutique',
      name: 'Travail avec pate therapeutique',
      description: 'Renforce les muscles de la main et des doigts avec une resistance douce.',
      levels: [
        {
          level: 0,
          instructions: 'Pate tres souple (jaune). Aplatir la pate avec la paume, puis la rouler en boule. 2 minutes.',
          duration: '2 minutes',
        },
        {
          level: 1,
          instructions: 'Pate souple (rouge). Pincer la pate entre le pouce et chaque doigt. Enfoncer chaque doigt dans la pate. 3 minutes.',
          duration: '3 minutes',
        },
        {
          level: 2,
          instructions: 'Pate moyenne (verte). Etirer la pate entre les doigts. Tordre la pate. Ecraser avec les doigts tendus. 5 minutes.',
          duration: '5 minutes',
        },
      ],
    },
    {
      id: 'etirement-poignet',
      name: 'Etirements du poignet et des doigts',
      description: 'Etire les tendons et soulage la raideur.',
      levels: [
        {
          level: 0,
          instructions: 'Main a plat sur la table, doigts ecartes. Maintenir 10 secondes. Relacher. 5 fois.',
          repetitions: '5 x 2 series, maintien 10s',
        },
        {
          level: 1,
          instructions: 'Bras tendu devant soi, main vers le bas. Avec l\'autre main, tirer doucement les doigts vers soi. Maintenir 15 secondes. Puis main vers le haut.',
          repetitions: '3 x chaque sens, maintien 15s',
        },
        {
          level: 2,
          instructions: 'Mains jointes en priere devant la poitrine. Baisser les mains en gardant les paumes collees jusqu\'a sentir l\'etirement. Maintenir 20 secondes.',
          repetitions: '5 x maintien 20s',
        },
      ],
    },
  ],

  seven_day_plan: [
    { day: 1, title: 'Evaluation', actions: ['Flexion-extension 10 rep', 'Opposition du pouce 5 cycles', 'Noter la douleur et la raideur matinale'] },
    { day: 2, title: 'Mobilite', actions: ['Flexion-extension dans l\'eau chaude', 'Opposition du pouce', 'Etirement poignet'] },
    { day: 3, title: 'Progression', actions: ['Les 4 exercices niveau 0', 'Chaleur locale 10 min avant les exercices'] },
    { day: 4, title: 'Adaptation', actions: ['Exercices + adapter 1 objet du quotidien (manche epais, ouvre-bocal)', 'Orthese de nuit si rhizarthrose'] },
    { day: 5, title: 'Consolidation', actions: ['4 exercices enchaines', 'Gel anti-inflammatoire si douloureux apres'] },
    { day: 6, title: 'Progression', actions: ['Tenter le niveau 1 sur 1 exercice', 'Garder les autres en niveau 0'] },
    { day: 7, title: 'Bilan', actions: ['Comparer douleur et raideur jour 1 vs jour 7', 'Planifier les exercices pour la semaine suivante'] },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Mobilite et soulagement',
      goals: ['Reduire la raideur matinale', 'Etablir la routine d\'exercices'],
      exercises: ['flexion-extension-doigts', 'opposition-pouce'],
    },
    {
      week: 2,
      focus: 'Ajout du renforcement',
      goals: ['Ajouter la pate therapeutique', 'Adapter les objets du quotidien'],
      exercises: ['flexion-extension-doigts', 'opposition-pouce', 'pate-therapeutique', 'etirement-poignet'],
    },
    {
      week: 3,
      focus: 'Progression niveau 1',
      goals: ['Passer au niveau 1 sur les exercices', 'Exercices dans l\'eau chaude'],
      exercises: ['flexion-extension-doigts', 'opposition-pouce', 'pate-therapeutique', 'etirement-poignet'],
    },
    {
      week: 4,
      focus: 'Autonomie',
      goals: ['Routine quotidienne de 10 minutes', 'Reprise des activites manuelles adaptees'],
      exercises: ['flexion-extension-doigts', 'opposition-pouce', 'pate-therapeutique', 'etirement-poignet'],
    },
  ],

  medical_procedures: [
    {
      id: 'orthese-rhizarthrose',
      name: 'Orthese de repos pour rhizarthrose',
      type: 'other',
      purpose: 'Immobiliser la base du pouce la nuit pour reduire la douleur et l\'inflammation',
      indications: ['Douleur de la base du pouce', 'Rhizarthrose confirmee'],
      benefits: ['Reduction de la douleur de 30-40%', 'Amelioration de la force de prehension'],
      limitations: ['Peu confortable au debut', 'Efficace surtout la nuit'],
      risks: ['Aucun risque significatif'],
      guideline_position: 'recommended',
      guideline_summary: 'Recommande en premiere intention par EULAR 2018 et ACR 2019.',
      sources: [{ title: 'EULAR recommendations for hand OA', org: 'EULAR', year: 2018, type: 'guideline' }],
    },
    {
      id: 'infiltration-digitale',
      name: 'Infiltration intra-articulaire de corticoides',
      type: 'infiltration',
      purpose: 'Reduire l\'inflammation articulaire en cas de poussee',
      indications: ['Poussee inflammatoire d\'une articulation', 'Echec des traitements de premiere ligne'],
      benefits: ['Soulagement rapide de 2 a 8 semaines'],
      limitations: ['Effet temporaire', 'Maximum 2-3 par an par articulation'],
      risks: ['Douleur post-injection', 'Rare: atrophie cutanee'],
      guideline_position: 'conditional',
      guideline_summary: 'Envisageable en cas de poussee, pas en routine.',
      sources: [{ title: 'ACR/AF Guidelines for hand OA', org: 'ACR', year: 2019, type: 'guideline' }],
    },
    {
      id: 'trapeziectomie',
      name: 'Trapeziectomie (chirurgie rhizarthrose)',
      type: 'surgery',
      purpose: 'Retirer l\'os trapeze a la base du pouce pour supprimer l\'arthrose',
      indications: ['Rhizarthrose severe resistante a 6 mois de traitement conservateur', 'Impact fonctionnel majeur'],
      benefits: ['Bons resultats sur la douleur a long terme', 'Taux de satisfaction 80-90%'],
      limitations: ['Recuperation de 3 a 6 mois', 'Perte partielle de force de prehension'],
      risks: ['Raideur post-operatoire', 'Douleur residuelle'],
      guideline_position: 'conditional',
      guideline_summary: 'Dernier recours apres echec prolonge du traitement conservateur.',
      sources: [{ title: 'Surgical treatment for thumb CMC OA', org: 'Cochrane', year: 2022, type: 'cochrane' }],
    },
  ],

  thermal_evidence: {
    summary: 'La balneokinesietherapie en eau chaude a montre des benefices sur la douleur et la mobilite des mains arthrosiques.',
    key_results: [
      'Reduction de la douleur et de la raideur matinale',
      'Amelioration de la force de prehension',
      'Les bains de paraffine sont un complement efficace',
    ],
    duration_recommended: '3 semaines (cure conventionnee)',
    limitations: ['Etudes de petite taille', 'Benefice probablement temporaire sans exercices de maintien'],
    sources: [{ title: 'Balneotherapy and spa therapy for hand OA', org: 'European Journal of Physical and Rehabilitation Medicine', year: 2022, type: 'rct' }],
  },

  sources: [
    { title: 'EULAR recommendations for the management of hand osteoarthritis', org: 'EULAR', year: 2018, type: 'guideline', url: 'https://doi.org/10.1136/annrheumdis-2018-213826' },
    { title: 'ACR/Arthritis Foundation Guideline for hand, hip and knee OA', org: 'ACR', year: 2019, type: 'guideline', url: 'https://doi.org/10.1002/acr.24131' },
    { title: 'Exercise for hand osteoarthritis', org: 'Cochrane', year: 2021, type: 'cochrane' },
    { title: 'Splints for thumb base OA', org: 'Cochrane', year: 2022, type: 'cochrane' },
    { title: 'Surgical treatment for thumb carpometacarpal OA', org: 'Cochrane', year: 2022, type: 'cochrane' },
    { title: 'Topical NSAIDs for chronic musculoskeletal pain', org: 'Cochrane', year: 2022, type: 'cochrane' },
    { title: 'Balneotherapy for hand OA', org: 'European Journal of PM&R', year: 2022, type: 'rct' },
  ],
};
