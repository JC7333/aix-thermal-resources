// ============================================
// EVIDENCE PACK V2 — RHINOSINUSITE CHRONIQUE
// Sources: EPOS 2020 (European Position Paper on Rhinosinusitis and Nasal Polyps)
// ============================================

import { EvidencePackV2 } from './types';

export const rhinosinusiteChronique: EvidencePackV2 = {
  slug: 'rhinosinusite-chronique',
  title: 'Rhinosinusite chronique',
  category: 'respiratoire-orl',
  icon: '🤧',
  updated_at: '2026-01-27',
  version: '2.0.0',
  status: 'complete',

  // Section 1: Comprendre
  definition: {
    summary: `La rhinosinusite chronique (RSC) est une inflammation des sinus et de la muqueuse nasale persistant plus de 12 semaines. Elle se manifeste par une obstruction nasale, un écoulement (antérieur ou postérieur), des douleurs faciales et une diminution de l'odorat.

On distingue deux formes principales : avec polypes nasaux (RSCaPN) et sans polypes (RSCsPN). La forme avec polypes est souvent associée à l'asthme et à l'intolérance à l'aspirine. Le traitement repose sur les lavages nasaux, les corticoïdes locaux, et parfois la chirurgie. L'objectif est de contrôler les symptômes et d'améliorer la qualité de vie.`,
    key_points: [
      'Définition : symptômes > 12 semaines (obstruction + écoulement ± douleur faciale ± anosmie)',
      'Deux formes : avec polypes (RSCaPN) ou sans polypes (RSCsPN)',
      'Souvent associée à l\'asthme, aux allergies, ou à l\'intolérance à l\'aspirine',
      'Traitement de fond : lavages + corticoïdes nasaux au long cours',
    ],
    prevalence: 'Environ 5-12% de la population générale',
    risk_factors: [
      'Allergies respiratoires',
      'Asthme',
      'Tabagisme',
      'Pollution atmosphérique',
      'Reflux gastro-œsophagien',
      'Déficits immunitaires',
      'Anomalies anatomiques (déviation septale)',
    ],
  },

  // Section 2: Recommandations
  recommendations: [
    {
      text: 'Lavages nasaux quotidiens au sérum physiologique ou solution saline isotonique (grand volume recommandé)',
      level: 'Élevé',
      tags: ['traitement de fond', 'quotidien'],
      source_ref: 'EPOS 2020',
    },
    {
      text: 'Corticoïdes nasaux en spray : traitement de première intention, à utiliser quotidiennement',
      level: 'Élevé',
      tags: ['traitement de fond', 'médicament'],
      source_ref: 'EPOS 2020',
    },
    {
      text: 'Arrêt du tabac : amélioration significative des symptômes et de la réponse au traitement',
      level: 'Élevé',
      tags: ['prévention', 'mode de vie'],
      source_ref: 'EPOS 2020',
    },
    {
      text: 'Traitement de l\'asthme associé : la RSC et l\'asthme s\'influencent mutuellement',
      level: 'Élevé',
      tags: ['traitement associé'],
      source_ref: 'EPOS 2020',
    },
    {
      text: 'Éviction des allergènes identifiés (acariens, pollens, animaux) si allergie confirmée',
      level: 'Modéré',
      tags: ['prévention', 'environnement'],
    },
    {
      text: 'Humidifier l\'air intérieur en hiver (hygrométrie 40-60%)',
      level: 'Faible',
      tags: ['confort', 'environnement'],
    },
    {
      text: 'Éviter les irritants : sprays ménagers, parfums d\'ambiance, produits volatils',
      level: 'Modéré',
      tags: ['prévention', 'environnement'],
    },
    {
      text: 'Surélever la tête du lit si reflux gastro-œsophagien associé',
      level: 'Modéré',
      tags: ['traitement associé'],
    },
    {
      text: 'Activité physique régulière : améliore le drainage mucociliaire et la qualité de vie',
      level: 'Modéré',
      tags: ['mode de vie'],
    },
  ],

  // Section 3: Red Flags
  red_flags: [
    {
      text: 'Douleur intense unilatérale avec gonflement de la joue ou de l\'œil',
      urgency: 'immediate',
    },
    {
      text: 'Troubles visuels (vision double, baisse de l\'acuité)',
      urgency: 'immediate',
    },
    {
      text: 'Fièvre élevée avec altération de l\'état général',
      urgency: 'rapid',
    },
    {
      text: 'Saignements de nez répétés et abondants d\'un seul côté',
      urgency: 'rapid',
    },
    {
      text: 'Céphalées violentes inhabituelles',
      urgency: 'immediate',
    },
    {
      text: 'Écoulement nasal unilatéral fétide ou purulent persistant',
      urgency: 'routine',
    },
  ],

  // Section 4: Exercices / Soins pratiques
  exercises: [
    {
      id: 'lavage-nasal-grand-volume',
      name: 'Lavage nasal grand volume',
      description: 'Technique de référence pour la RSC : irrigation à grand volume (200-250 mL par narine)',
      levels: [
        {
          level: 0,
          instructions: 'Utiliser un flacon d\'irrigation (type Rhinohorn ou poire) avec solution saline tiède. Se pencher au-dessus du lavabo, tête inclinée à 45°. Insérer l\'embout dans la narine supérieure et laisser le liquide s\'écouler par l\'autre narine. Respirer par la bouche. Moucher doucement après.',
          duration: '3-5 min, 1-2x/jour',
        },
        {
          level: 1,
          instructions: 'Augmenter à 2 lavages par jour si symptômes importants. Utiliser une solution légèrement hypertonique si mucus épais.',
          duration: '3-5 min, 2x/jour',
        },
      ],
      common_errors: [
        'Eau trop froide ou trop chaude',
        'Tête en arrière (risque d\'avaler)',
        'Se moucher trop fort après le lavage',
        'Utiliser de l\'eau du robinet non bouillie (risque infectieux rare)',
      ],
      stop_rules: [
        'Douleur vive lors du lavage',
        'Saignement important',
        'Vertiges',
      ],
    },
    {
      id: 'technique-spray-corticoide',
      name: 'Technique d\'application du spray nasal',
      description: 'Optimiser l\'efficacité des corticoïdes nasaux',
      levels: [
        {
          level: 0,
          instructions: 'Moucher doucement avant. Tête légèrement penchée en avant. Diriger le spray vers l\'extérieur du nez (vers l\'œil), pas vers la cloison. Inspirer doucement pendant la pulvérisation. Ne pas renifler fort après.',
          duration: '30 sec par narine',
        },
      ],
      common_errors: [
        'Pulvériser vers la cloison (saignements)',
        'Renifler trop fort (produit va dans la gorge)',
        'Oublier de moucher avant',
      ],
    },
    {
      id: 'respiration-nasale',
      name: 'Rééducation à la respiration nasale',
      description: 'Favoriser la respiration par le nez plutôt que par la bouche',
      levels: [
        {
          level: 0,
          instructions: 'Plusieurs fois par jour, prendre conscience de sa respiration. Fermer la bouche et respirer lentement par le nez pendant 2-3 minutes. Si obstruction, faire un lavage nasal avant.',
          duration: '2-3 min, 3-4x/jour',
        },
        {
          level: 1,
          instructions: 'Intégrer la respiration nasale pendant la marche (inspirer sur 4 pas, expirer sur 4 pas).',
          duration: '10 min de marche',
        },
      ],
    },
    {
      id: 'auto-massage-sinus',
      name: 'Auto-massage des sinus',
      description: 'Favoriser le drainage des sinus par des pressions douces',
      levels: [
        {
          level: 0,
          instructions: 'Avec les pouces, exercer des pressions circulaires douces : (1) sous les sourcils (sinus frontaux), (2) de chaque côté du nez (sinus maxillaires), (3) à la racine du nez. 10-15 cercles par zone.',
          duration: '2-3 min',
        },
      ],
      common_errors: [
        'Appuyer trop fort',
        'Faire le massage en phase aiguë douloureuse',
      ],
    },
    {
      id: 'inhalation-vapeur',
      name: 'Inhalation de vapeur',
      description: 'Humidifier et fluidifier les sécrétions',
      levels: [
        {
          level: 0,
          instructions: 'Faire bouillir de l\'eau, laisser tiédir 2-3 min. Se pencher au-dessus du bol avec une serviette sur la tête. Respirer la vapeur par le nez pendant 5-10 min. Optionnel : ajouter quelques gouttes d\'huile essentielle d\'eucalyptus (adultes uniquement).',
          duration: '5-10 min, 1-2x/jour',
        },
      ],
      common_errors: [
        'Eau trop chaude (brûlure)',
        'Huiles essentielles chez l\'enfant < 6 ans',
      ],
      stop_rules: ['Sensation de brûlure', 'Malaise'],
    },
  ],

  // Section 5: Parcours guidé
  seven_day_plan: [
    {
      day: 1,
      title: 'Installation du traitement de fond',
      actions: [
        'Se procurer : sérum physiologique grand volume + spray corticoïde prescrit',
        'Premier lavage nasal (matin)',
        'Application du spray corticoïde après le lavage',
      ],
      tips: 'Le lavage AVANT le spray améliore son efficacité',
    },
    {
      day: 2,
      title: 'Routine matin et soir',
      actions: [
        'Lavage nasal matin + soir',
        'Spray corticoïde après chaque lavage',
        'Noter les symptômes (obstruction, écoulement, odorat)',
      ],
    },
    {
      day: 3,
      title: 'Environnement',
      actions: [
        'Évaluer le tabagisme actif/passif → plan d\'arrêt si concerné',
        'Vérifier l\'hygrométrie du logement',
        'Aérer 10 min matin et soir',
      ],
    },
    {
      day: 4,
      title: 'Technique de lavage',
      actions: [
        'Vérifier la technique de lavage (position, température, volume)',
        'Essayer le lavage grand volume si pas encore fait',
      ],
    },
    {
      day: 5,
      title: 'Respiration et activité',
      actions: [
        'Pratiquer 3x la respiration nasale consciente (2-3 min)',
        '20 min de marche en respirant par le nez',
      ],
    },
    {
      day: 6,
      title: 'Auto-massage et détente',
      actions: [
        'Auto-massage des sinus (2-3 min)',
        'Inhalation de vapeur le soir',
      ],
    },
    {
      day: 7,
      title: 'Bilan de la semaine',
      actions: [
        'Comparer les symptômes jour 1 vs jour 7',
        'Continuer le traitement de fond (lavage + spray) quotidiennement',
        'Planifier RDV ORL si pas d\'amélioration après 4-6 semaines',
      ],
    },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Installation de la routine quotidienne',
      goals: ['Lavages biquotidiens systématiques', 'Spray corticoïde quotidien', 'Arrêt du tabac si concerné'],
      exercises: ['lavage-nasal-grand-volume', 'technique-spray-corticoide'],
    },
    {
      week: 2,
      focus: 'Optimisation de l\'environnement',
      goals: ['Réduction des irritants', 'Aération quotidienne', 'Hygrométrie contrôlée'],
      exercises: ['respiration-nasale'],
    },
    {
      week: 3,
      focus: 'Ajout des soins complémentaires',
      goals: ['Auto-massage quotidien', 'Inhalations si mucus épais'],
      exercises: ['auto-massage-sinus', 'inhalation-vapeur'],
    },
    {
      week: 4,
      focus: 'Évaluation et ajustement',
      goals: ['Bilan des symptômes', 'RDV médecin si pas d\'amélioration', 'Maintien du traitement de fond'],
      exercises: ['lavage-nasal-grand-volume', 'technique-spray-corticoide'],
    },
  ],

  // Section 6: Actes médicaux
  medical_procedures: [
    {
      id: 'chirurgie-endoscopique-sinus',
      name: 'Chirurgie endoscopique des sinus (FESS)',
      type: 'surgery',
      purpose: 'Élargir les orifices des sinus pour améliorer le drainage et permettre aux traitements locaux d\'atteindre la muqueuse',
      indications: [
        'Échec du traitement médical bien conduit (≥3 mois)',
        'Polypes nasaux obstructifs récidivants',
        'Complications (mucocèle, sinusite fongique)',
      ],
      benefits: [
        'Amélioration du drainage sinusien',
        'Meilleure efficacité des traitements locaux post-opératoires',
        'Réduction des symptômes dans 80-90% des cas',
      ],
      limitations: [
        'Ne guérit pas la maladie : traitement de fond à poursuivre',
        'Récidive possible des polypes (30-40% à 5 ans)',
        'Résultats variables selon le type de RSC',
      ],
      risks: [
        'Saignement post-opératoire',
        'Croûtes nasales transitoires',
        'Très rares : brèche de la base du crâne, atteinte orbitaire',
      ],
      guideline_position: 'recommended',
      guideline_summary: 'EPOS 2020 recommande la chirurgie après échec d\'un traitement médical approprié de 3 mois minimum (lavages + corticoïdes locaux ± cure courte de corticoïdes oraux pour les polypes).',
      sources: [
        {
          title: 'European Position Paper on Rhinosinusitis and Nasal Polyps 2020',
          org: 'EPOS / Rhinology',
          year: 2020,
          url: 'https://www.rhinologyjournal.com/Abstract.php?id=2530',
          type: 'guideline',
        },
      ],
    },
    {
      id: 'biotherapies-polypes',
      name: 'Biothérapies (anticorps monoclonaux)',
      type: 'other',
      purpose: 'Traitement ciblé de l\'inflammation type 2 dans les formes sévères de RSC avec polypes',
      indications: [
        'RSC avec polypes sévère, récidivante malgré chirurgie',
        'Asthme sévère associé',
        'Contre-indication ou échec des corticoïdes',
      ],
      benefits: [
        'Réduction significative de la taille des polypes',
        'Amélioration de l\'odorat',
        'Réduction du recours à la chirurgie',
      ],
      limitations: [
        'Traitement au long cours (injections régulières)',
        'Coût élevé (prise en charge selon critères)',
        'Réservé aux formes sévères',
      ],
      risks: [
        'Réactions au point d\'injection',
        'Rares réactions allergiques',
      ],
      guideline_position: 'conditional',
      guideline_summary: 'EPOS 2020 recommande les biothérapies pour les RSC avec polypes sévères ne répondant pas au traitement conventionnel. Dupilumab, omalizumab et mépolizumab sont approuvés selon les phénotypes.',
      sources: [
        {
          title: 'EPOS 2020',
          org: 'European Rhinologic Society',
          year: 2020,
          type: 'guideline',
        },
      ],
    },
  ],

  // Section 7: Cure thermale
  thermal_evidence: {
    summary: 'Les cures thermales ORL (eaux sulfurées notamment) sont traditionnellement proposées pour la rhinosinusite chronique. Elles associent irrigations nasales thermales, aérosols, et humage. Les études montrent une amélioration symptomatique et une réduction de la consommation médicamenteuse, mais les preuves de haute qualité restent limitées.',
    key_results: [
      'Amélioration des symptômes nasaux et de la qualité de vie (études observationnelles)',
      'Réduction de la consommation d\'antibiotiques et de corticoïdes dans les 6-12 mois suivants',
      'Effet potentiel sur la clairance mucociliaire',
    ],
    duration_recommended: '18 jours (cure conventionnée)',
    limitations: [
      'Peu d\'essais randomisés de bonne qualité méthodologique',
      'Effet placebo et changement d\'environnement difficiles à distinguer',
      'Maintien des bénéfices incertain à long terme',
    ],
    contraindications: [
      'Infection ORL aiguë',
      'Cancer ORL évolutif',
      'Tuberculose active',
    ],
    sources: [
      {
        title: 'EPOS 2020 - Section on complementary treatments',
        org: 'European Rhinologic Society',
        year: 2020,
        type: 'guideline',
      },
      {
        title: 'Efficacy of thermal water nasal irrigations in chronic rhinosinusitis',
        org: 'Rhinology',
        year: 2019,
        type: 'rct',
      },
    ],
  },

  // Section 8: Sources
  sources: [
    {
      title: 'European Position Paper on Rhinosinusitis and Nasal Polyps 2020 (EPOS 2020)',
      org: 'European Rhinologic Society / Rhinology',
      year: 2020,
      url: 'https://www.rhinologyjournal.com/Abstract.php?id=2530',
      type: 'guideline',
    },
    {
      title: 'International Consensus Statement on Allergy and Rhinology: Rhinosinusitis',
      org: 'ICAR-RS',
      year: 2021,
      url: 'https://pubmed.ncbi.nlm.nih.gov/33236525/',
      type: 'consensus',
    },
    {
      title: 'Saline irrigation for chronic rhinosinusitis',
      org: 'Cochrane Database of Systematic Reviews',
      year: 2016,
      url: 'https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011995.pub2/full',
      type: 'cochrane',
    },
    {
      title: 'Intranasal corticosteroids for chronic rhinosinusitis',
      org: 'Cochrane Database of Systematic Reviews',
      year: 2023,
      type: 'cochrane',
    },
  ],
};
