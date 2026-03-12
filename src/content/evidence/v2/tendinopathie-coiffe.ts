import { EvidencePackV2 } from './types';

export const tendinopathieCoiffe: EvidencePackV2 = {
  slug: 'tendinopathie-coiffe',
  title: 'Tendinopathie de la coiffe des rotateurs',
  category: 'rhumatologie',
  icon: '💪',
  updated_at: '2026-03-12',
  version: '2.0.0',
  status: 'complete',

  definition: {
    summary: `La coiffe des rotateurs est un ensemble de quatre tendons qui entourent l'articulation de l'epaule et permettent les mouvements de rotation et d'elevation du bras. La tendinopathie de la coiffe correspond a une souffrance de ces tendons, le plus souvent le supra-epineux.

C'est la cause la plus frequente de douleur d'epaule chez l'adulte. La douleur est typiquement ressentie sur le cote de l'epaule et peut irradier vers le bras. Elle est souvent declenchee par les mouvements au-dessus de la tete ou en portant des charges.

Contrairement aux idees recues, la plupart des tendinopathies de coiffe se traitent sans chirurgie. L'exercice de reeducation est le traitement de premiere intention recommande par toutes les guidelines internationales.`,
    key_points: [
      'Cause n1 de douleur d\'epaule chez l\'adulte de plus de 40 ans',
      'L\'exercice de reeducation est plus efficace que la chirurgie dans la majorite des cas',
      'Les images IRM montrent souvent des anomalies normales pour l\'age — ne pas paniquer',
      'La recuperation prend 3 a 6 mois avec un programme adapte',
    ],
    prevalence: '30% des adultes de plus de 60 ans ont une lesion de coiffe a l\'imagerie, la plupart asymptomatiques',
    risk_factors: [
      'Age superieur a 40 ans',
      'Gestes repetitifs au-dessus de la tete (travail, sport)',
      'Travail avec les bras en elevation prolongee',
      'Sport de lancer ou de raquette',
      'Tabagisme',
      'Diabete',
    ],
  },

  recommendations: [
    {
      text: 'L\'exercice de reeducation est le traitement de premiere intention. Commencer par des exercices pendulaires puis progresser vers le renforcement.',
      level: 'Élevé',
      tags: ['exercice', 'premiere-intention'],
      source_ref: 'HAS 2023',
    },
    {
      text: 'Eviter l\'immobilisation prolongee. Le repos complet du bras aggrave la raideur et retarde la guerison.',
      level: 'Élevé',
      tags: ['repos', 'immobilisation'],
      source_ref: 'NICE 2022',
    },
    {
      text: 'Les anti-inflammatoires oraux peuvent soulager a court terme mais ne sont pas un traitement de fond.',
      level: 'Modéré',
      tags: ['medicament'],
      source_ref: 'Cochrane 2021',
    },
    {
      text: 'Les infiltrations de corticoides soulagent la douleur a court terme mais n\'ameliorent pas le pronostic a long terme.',
      level: 'Modéré',
      tags: ['infiltration'],
      source_ref: 'Cochrane 2020',
    },
    {
      text: 'La chirurgie arthroscopique n\'est pas superieure a la reeducation pour les tendinopathies sans rupture complete.',
      level: 'Élevé',
      tags: ['chirurgie'],
      source_ref: 'Lancet 2018',
    },
    {
      text: 'Adapter le poste de travail : eviter les positions bras au-dessus de la tete prolongees.',
      level: 'Consensus',
      tags: ['prevention', 'travail'],
    },
  ],

  red_flags: [
    {
      text: 'Perte de force brutale apres un traumatisme (chute, choc) — possible rupture aigue necessitant un avis chirurgical urgent',
      urgency: 'rapid',
      source_ref: 'HAS 2023',
    },
    {
      text: 'Epaule completement bloquee, impossible de lever le bras lateralement — capsulite ou rupture massive',
      urgency: 'rapid',
    },
    {
      text: 'Douleur d\'epaule avec essoufflement ou douleur thoracique — eliminer une cause cardiaque',
      urgency: 'immediate',
    },
    {
      text: 'Fievre avec douleur d\'epaule et gonflement — possible infection articulaire',
      urgency: 'immediate',
    },
  ],

  exercises: [
    {
      id: 'pendulaire',
      name: 'Exercice pendulaire de Codman',
      description: 'Penche en avant, le bras douloureux pend librement. Faire de petits cercles avec la main, dans les deux sens.',
      levels: [
        {
          level: 0,
          instructions: 'Penche en avant, appuye sur une table avec le bras sain. Laisser le bras douloureux pendre. Balancer doucement d\'avant en arriere, 10 fois.',
          duration: '2 minutes',
          repetitions: '10 balancements x 2 series',
        },
        {
          level: 1,
          instructions: 'Meme position. Faire des petits cercles avec la main, 10 dans chaque sens. Ajouter des balancements lateraux.',
          duration: '3 minutes',
          repetitions: '10 cercles chaque sens x 2 series',
        },
        {
          level: 2,
          instructions: 'Meme position avec un petit poids (bouteille de 500ml). Cercles plus amples, 15 dans chaque sens.',
          duration: '5 minutes',
          repetitions: '15 cercles chaque sens x 2 series',
        },
      ],
      common_errors: ['Forcer le mouvement — laisser la gravite faire le travail', 'Ne pas se pencher assez en avant'],
      stop_rules: ['Douleur aigue pendant l\'exercice', 'Douleur qui augmente dans les 2 heures apres l\'exercice'],
    },
    {
      id: 'rotation-externe',
      name: 'Renforcement rotation externe',
      description: 'Renforce les rotateurs externes de l\'epaule, essentiels pour la stabilite de la coiffe.',
      levels: [
        {
          level: 0,
          instructions: 'Coude colle au corps, plie a 90 degres. Sans resistance, tourner doucement l\'avant-bras vers l\'exterieur. 10 repetitions.',
          repetitions: '10 x 3 series',
        },
        {
          level: 1,
          instructions: 'Meme position avec un elastique leger fixe a une poignee de porte. Tourner l\'avant-bras vers l\'exterieur contre la resistance. 12 repetitions.',
          repetitions: '12 x 3 series',
        },
        {
          level: 2,
          instructions: 'Elastique de resistance moyenne. 15 repetitions. Ajouter un maintien de 3 secondes en position externe.',
          repetitions: '15 x 3 series, maintien 3s',
        },
      ],
      common_errors: ['Decoller le coude du corps', 'Compenser avec le tronc'],
    },
    {
      id: 'elevation-assistee',
      name: 'Elevation assistee du bras',
      description: 'Recuperer progressivement l\'amplitude d\'elevation du bras.',
      levels: [
        {
          level: 0,
          instructions: 'Allonge sur le dos. Le bras sain aide le bras douloureux a monter vers le plafond. Monter autant que possible sans douleur. 8 repetitions.',
          repetitions: '8 x 2 series',
        },
        {
          level: 1,
          instructions: 'Debout face a un mur. Faire grimper les doigts sur le mur en levant le bras progressivement. Marquer la hauteur atteinte. 10 repetitions.',
          repetitions: '10 x 2 series',
        },
        {
          level: 2,
          instructions: 'Debout, lever le bras seul vers le plafond, pouce vers le haut. 12 repetitions avec maintien 5 secondes en haut.',
          repetitions: '12 x 3 series, maintien 5s',
        },
      ],
    },
    {
      id: 'retraction-scapulaire',
      name: 'Retraction scapulaire',
      description: 'Renforce les muscles entre les omoplates, essentiels pour une bonne posture d\'epaule.',
      levels: [
        {
          level: 0,
          instructions: 'Assis droit. Serrer les omoplates l\'une contre l\'autre en arriere, comme pour coincer un crayon entre elles. Tenir 5 secondes, relacher. 10 fois.',
          repetitions: '10 x 3 series, maintien 5s',
        },
        {
          level: 1,
          instructions: 'Debout, elastique tenu devant soi a deux mains, bras tendus. Ecarter les mains en serrant les omoplates. 12 repetitions.',
          repetitions: '12 x 3 series',
        },
        {
          level: 2,
          instructions: 'Meme exercice avec elastique de resistance moyenne. 15 repetitions avec maintien 3 secondes.',
          repetitions: '15 x 3 series, maintien 3s',
        },
      ],
    },
  ],

  seven_day_plan: [
    { day: 1, title: 'Evaluation', actions: ['Exercice pendulaire 2 min', 'Glace 15 min si douloureux', 'Noter votre douleur sur 10'] },
    { day: 2, title: 'Mobilite', actions: ['Pendulaire 2 min', 'Elevation assistee 8 rep', 'Retraction scapulaire 10 rep'] },
    { day: 3, title: 'Progression', actions: ['Pendulaire 3 min', 'Elevation assistee 10 rep', 'Rotation externe sans resistance 10 rep'] },
    { day: 4, title: 'Consolidation', actions: ['Pendulaire + elevation + rotation', 'Ajouter retraction scapulaire', 'Glace si besoin apres les exercices'] },
    { day: 5, title: 'Autonomie', actions: ['Enchainer les 4 exercices niveau 0', 'Durée totale : 15 minutes', 'Adapter la poste de travail'] },
    { day: 6, title: 'Progression', actions: ['Tenter le niveau 1 sur 1 exercice', 'Garder les autres en niveau 0', 'Marche 20 minutes (bras detendus)'] },
    { day: 7, title: 'Bilan', actions: ['Comparer la douleur jour 1 vs jour 7', 'Si amelioration : continuer niveau 1', 'Si stagnation : consulter kine'] },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Soulagement et mobilite',
      goals: ['Reduire la douleur', 'Recuperer la mobilite de base'],
      exercises: ['pendulaire', 'elevation-assistee'],
    },
    {
      week: 2,
      focus: 'Debut du renforcement',
      goals: ['Ajouter la rotation externe', 'Maintenir la mobilite acquise'],
      exercises: ['pendulaire', 'elevation-assistee', 'rotation-externe', 'retraction-scapulaire'],
    },
    {
      week: 3,
      focus: 'Progression',
      goals: ['Passer au niveau 1', 'Augmenter les repetitions'],
      exercises: ['pendulaire', 'elevation-assistee', 'rotation-externe', 'retraction-scapulaire'],
    },
    {
      week: 4,
      focus: 'Autonomie',
      goals: ['Niveau 1 sur tous les exercices', 'Reprendre les activites quotidiennes'],
      exercises: ['rotation-externe', 'elevation-assistee', 'retraction-scapulaire'],
    },
  ],

  medical_procedures: [
    {
      id: 'infiltration-sous-acromiale',
      name: 'Infiltration sous-acromiale de corticoides',
      type: 'infiltration',
      purpose: 'Reduire l\'inflammation et la douleur a court terme',
      indications: ['Douleur intense ne repondant pas aux exercices apres 6 semaines', 'Douleur nocturne invalidante'],
      benefits: ['Soulagement rapide en 1-2 semaines', 'Permet de reprendre la reeducation'],
      limitations: ['Effet temporaire de 4 a 12 semaines', 'Maximum 3 infiltrations par an'],
      risks: ['Douleur temporaire post-injection', 'Rare: fragilisation tendineuse'],
      guideline_position: 'conditional',
      guideline_summary: 'Recommande en deuxieme intention si la reeducation seule est insuffisante apres 6 semaines.',
      sources: [{ title: 'Corticosteroid injections for rotator cuff disease', org: 'Cochrane', year: 2020, type: 'cochrane' }],
    },
    {
      id: 'chirurgie-acromioplastie',
      name: 'Acromioplastie arthroscopique',
      type: 'surgery',
      purpose: 'Elargir l\'espace sous-acromial en resequant une partie de l\'os',
      indications: ['Echec de la reeducation apres 6 mois minimum', 'Conflit sous-acromial avere'],
      benefits: ['Peut soulager le conflit mecanique'],
      limitations: ['Pas superieure a la reeducation dans les etudes de haute qualite', 'Risques chirurgicaux'],
      risks: ['Infection', 'Raideur post-operatoire', 'Echec'],
      guideline_position: 'controversial',
      guideline_summary: 'Les essais CSAW et FIMPACT ont montre que l\'acromioplastie n\'est pas superieure a la reeducation seule. Debat en cours.',
      sources: [{ title: 'Arthroscopic subacromial decompression vs diagnostic arthroscopy (CSAW)', org: 'Lancet', year: 2018, type: 'rct' }],
    },
  ],

  thermal_evidence: {
    summary: 'Les cures thermales a orientation rhumatologique montrent un benefice sur la douleur et la mobilite de l\'epaule, comparable aux autres pathologies articulaires.',
    key_results: [
      'Reduction de la douleur de 20-30% a 3 mois post-cure',
      'Amelioration de la mobilite active',
      'La balneokinesietherapie en eau chaude facilite les mouvements',
    ],
    duration_recommended: '3 semaines (cure conventionnee)',
    limitations: ['Peu d\'essais specifiques a la coiffe', 'Benefice probablement multifactoriel'],
    sources: [{ title: 'Balneotherapy for musculoskeletal diseases', org: 'Cochrane', year: 2023, type: 'cochrane' }],
  },

  sources: [
    { title: 'Prise en charge des tendinopathies de la coiffe des rotateurs', org: 'HAS', year: 2023, type: 'guideline', url: 'https://www.has-sante.fr' },
    { title: 'Arthroscopic subacromial decompression for subacromial shoulder pain (CSAW)', org: 'Lancet', year: 2018, type: 'rct', url: 'https://doi.org/10.1016/S0140-6736(17)32457-1' },
    { title: 'Exercise therapy for rotator cuff tendinopathy', org: 'Cochrane', year: 2021, type: 'cochrane', url: 'https://doi.org/10.1002/14651858.CD012224.pub2' },
    { title: 'Corticosteroid injections for rotator cuff disease', org: 'Cochrane', year: 2020, type: 'cochrane' },
    { title: 'Shoulder disorders (CKS)', org: 'NICE', year: 2022, type: 'guideline', url: 'https://cks.nice.org.uk/topics/shoulder-pain/' },
    { title: 'Subacromial decompression surgery vs placebo (FIMPACT)', org: 'BMJ', year: 2018, type: 'rct', url: 'https://doi.org/10.1136/bmj.k2860' },
    { title: 'Balneotherapy for musculoskeletal diseases', org: 'Cochrane', year: 2023, type: 'cochrane' },
  ],
};
