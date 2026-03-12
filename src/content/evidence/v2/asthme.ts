import { EvidencePackV2 } from './types';

export const asthmeComplete: EvidencePackV2 = {
  slug: 'asthme',
  title: 'Asthme',
  category: 'respiratoire-orl',
  icon: '🫁',
  updated_at: '2026-03-12',
  version: '2.0.0',
  status: 'complete',

  definition: {
    summary: `L'asthme est une maladie inflammatoire chronique des bronches qui provoque des episodes de gene respiratoire, de sifflements, de toux et d'oppression thoracique. Les bronches se retrecissent de facon reversible, contrairement a la BPCO ou l'obstruction est permanente.

L'asthme touche tous les ages. Chez l'adulte, il est souvent declenche par des allergenes (acariens, pollens, moisissures), l'effort physique, le froid, le stress, ou des irritants (tabac, pollution). Un bon controle est possible dans la grande majorite des cas.

Le traitement repose sur les corticoides inhales quotidiens pour reduire l'inflammation, et les bronchodilatateurs de secours pour les crises. L'activite physique adaptee est recommandee — elle ameliore le controle de l'asthme.`,
    key_points: [
      'Maladie tres frequente : 4 millions de personnes en France',
      'Un asthme bien traite permet une vie normale, y compris le sport',
      'Le traitement de fond (corticoide inhale) doit etre pris TOUS les jours, meme quand on va bien',
      'L\'activite physique ameliore l\'asthme — elle ne l\'aggrave pas',
    ],
    prevalence: '6-8% de la population adulte en France, 10% des enfants',
    risk_factors: [
      'Antecedents familiaux d\'asthme ou d\'allergie',
      'Allergie connue (rhinite allergique, eczema)',
      'Exposition au tabac (actif ou passif)',
      'Pollution atmospherique',
      'Obesite',
      'Exposition professionnelle (poussiere, produits chimiques)',
    ],
  },

  recommendations: [
    {
      text: 'Le traitement de fond par corticoide inhale est la pierre angulaire du traitement. Il doit etre pris quotidiennement, meme en l\'absence de symptomes.',
      level: 'Élevé',
      tags: ['traitement-fond', 'corticoide'],
      source_ref: 'GINA 2024',
    },
    {
      text: 'L\'activite physique reguliere est recommandee chez l\'asthmatique. Elle ameliore la capacite respiratoire et reduit les symptomes.',
      level: 'Élevé',
      tags: ['exercice', 'activite-physique'],
      source_ref: 'Cochrane 2023',
    },
    {
      text: 'Avoir un plan d\'action ecrit personnalise pour savoir quoi faire en cas d\'aggravation. Vert (stable), orange (aggravation), rouge (urgence).',
      level: 'Élevé',
      tags: ['plan-action', 'autogestion'],
      source_ref: 'GINA 2024',
    },
    {
      text: 'Controler l\'environnement : housse anti-acariens, aerer quotidiennement, pas de tabac a l\'interieur, limiter les moisissures.',
      level: 'Modéré',
      tags: ['environnement', 'allergenes'],
      source_ref: 'HAS 2021',
    },
    {
      text: 'Verifier la technique d\'inhalation a chaque consultation. Plus de 70% des patients utilisent mal leur inhalateur.',
      level: 'Élevé',
      tags: ['technique-inhalation'],
      source_ref: 'GINA 2024',
    },
    {
      text: 'La perte de poids chez l\'asthmatique obese ameliore significativement le controle de l\'asthme.',
      level: 'Modéré',
      tags: ['poids'],
      source_ref: 'GINA 2024',
    },
    {
      text: 'Les echauffements progressifs reduisent le risque de bronchospasme a l\'effort. Ne pas demarrer un exercice a froid.',
      level: 'Modéré',
      tags: ['exercice', 'echauffement'],
      source_ref: 'Cochrane 2023',
    },
  ],

  red_flags: [
    {
      text: 'Crise d\'asthme severe : difficulte a parler, levres bleues, essoufflement au repos, ventoline inefficace apres 10 bouffees — appelez le 15 immediatement',
      urgency: 'immediate',
      source_ref: 'GINA 2024',
    },
    {
      text: 'Utilisation du bronchodilatateur de secours plus de 2 fois par semaine — asthme non controle, consultez votre medecin',
      urgency: 'routine',
      source_ref: 'GINA 2024',
    },
    {
      text: 'Reveils nocturnes par la toux ou l\'essoufflement plus d\'une fois par semaine — asthme non controle',
      urgency: 'routine',
    },
    {
      text: 'Aggravation rapide sur plusieurs jours malgre le traitement de fond — risque d\'exacerbation severe',
      urgency: 'rapid',
    },
  ],

  exercises: [
    {
      id: 'respiration-diaphragmatique',
      name: 'Respiration diaphragmatique',
      description: 'Respiration lente et profonde par le ventre pour calmer le systeme nerveux et optimiser la ventilation.',
      levels: [
        {
          level: 0,
          instructions: 'Allonge, une main sur le ventre, une sur la poitrine. Inspirer par le nez 3 secondes (le ventre se gonfle). Expirer par la bouche 4 secondes (le ventre rentre). 10 cycles.',
          repetitions: '10 cycles x 2 series',
          duration: '3 minutes',
        },
        {
          level: 1,
          instructions: 'Assis, meme exercice. Inspirer 4 secondes, expirer 6 secondes. 12 cycles. L\'expiration est toujours plus longue que l\'inspiration.',
          repetitions: '12 cycles x 2 series',
        },
        {
          level: 2,
          instructions: 'Debout, inspirer 4 secondes, pause 2 secondes, expirer levres pincees 6 secondes. 15 cycles. A integrer avant l\'effort physique.',
          repetitions: '15 cycles x 2 series',
        },
      ],
      common_errors: ['Respirer par la poitrine au lieu du ventre', 'Inspirer trop vite'],
    },
    {
      id: 'marche-echauffee',
      name: 'Marche avec echauffement progressif',
      description: 'Activite aerobie adaptee avec echauffement obligatoire pour prevenir le bronchospasme.',
      levels: [
        {
          level: 0,
          instructions: 'Echauffement 5 min (marche tres lente). Marche 10 min a rythme confortable. Retour au calme 5 min. Bronchodilatateur accessible en permanence.',
          duration: '20 minutes',
        },
        {
          level: 1,
          instructions: 'Echauffement 5 min. Marche 20 min a rythme modere (on peut parler). Retour au calme 5 min.',
          duration: '30 minutes',
        },
        {
          level: 2,
          instructions: 'Echauffement 10 min. Marche rapide ou marche nordique 30 min. Retour au calme 5 min. Alterner periodes rapides et lentes.',
          duration: '45 minutes',
        },
      ],
      stop_rules: ['Sifflement ou oppression thoracique — ralentir ou arreter', 'Utiliser le bronchodilatateur si gene respiratoire'],
    },
    {
      id: 'renforcement-thoracique',
      name: 'Renforcement des muscles respiratoires',
      description: 'Exercices qui renforcent les muscles du thorax et ameliorent la capacite respiratoire.',
      levels: [
        {
          level: 0,
          instructions: 'Assis, mains sur les cotes. Inspirer en ouvrant les cotes lateralement. Expirer en les rapprochant. 10 repetitions.',
          repetitions: '10 x 2 series',
        },
        {
          level: 1,
          instructions: 'Debout, bras en chandelier. Inspirer en ouvrant les bras, expirer en les ramenant devant. 12 repetitions.',
          repetitions: '12 x 3 series',
        },
        {
          level: 2,
          instructions: 'Avec un elastique autour du thorax. Inspirer contre la resistance de l\'elastique. 15 repetitions.',
          repetitions: '15 x 3 series',
        },
      ],
    },
    {
      id: 'technique-crise',
      name: 'Position et respiration de crise',
      description: 'Que faire quand une crise commence. Technique de secours en attendant que le bronchodilatateur agisse.',
      levels: [
        {
          level: 0,
          instructions: 'S\'asseoir penche en avant, mains sur les genoux. Respirer levres pincees : inspirer 2s par le nez, expirer 4s par la bouche. Prendre 2 bouffees de bronchodilatateur. Attendre 5 minutes.',
          duration: '5 minutes',
        },
        {
          level: 1,
          instructions: 'Si pas d\'amelioration apres 5 min : 2 bouffees supplementaires. Continuer la respiration levres pincees. Si toujours pas d\'amelioration apres 10 min : appeler le 15.',
        },
        {
          level: 2,
          instructions: 'Prevention : avant un effort, 2 bouffees de bronchodilatateur 15 min avant. Echauffement progressif obligatoire. En cas de froid : respirer a travers un foulard.',
        },
      ],
    },
  ],

  seven_day_plan: [
    { day: 1, title: 'Evaluation', actions: ['Respiration diaphragmatique 10 cycles', 'Verifier technique inhalateur', 'Noter la frequence d\'utilisation du bronchodilatateur de secours'] },
    { day: 2, title: 'Respiration', actions: ['Respiration diaphragmatique 12 cycles', 'Renforcement thoracique 10 rep', 'Aerer la chambre 15 min'] },
    { day: 3, title: 'Premiere marche', actions: ['Echauffement 5 min + marche 10 min + retour au calme', 'Bronchodilatateur accessible', 'Respiration diaphragmatique apres'] },
    { day: 4, title: 'Environnement', actions: ['Exercices respiratoires', 'Verifier : housse anti-acariens, pas de moisissures, aeration', 'Marche 10 min'] },
    { day: 5, title: 'Progression', actions: ['Marche 15 min', 'Respiration + renforcement thoracique', 'Pratiquer la technique de crise (sans crise, juste pour memoriser)'] },
    { day: 6, title: 'Consolidation', actions: ['Enchainer respiration + renforcement + marche', 'Verifier le plan d\'action ecrit'] },
    { day: 7, title: 'Bilan', actions: ['Comparer utilisation bronchodilatateur jour 1 vs jour 7', 'Planifier l\'activite de la semaine suivante', 'Objectif : marche 20 min 3 fois par semaine'] },
  ],

  four_week_plan: [
    {
      week: 1,
      focus: 'Respiration et controle',
      goals: ['Maitriser la respiration diaphragmatique', 'Verifier technique d\'inhalation'],
      exercises: ['respiration-diaphragmatique', 'technique-crise'],
    },
    {
      week: 2,
      focus: 'Activite physique',
      goals: ['Marche 15 min 3 fois par semaine', 'Ajouter le renforcement thoracique'],
      exercises: ['respiration-diaphragmatique', 'marche-echauffee', 'renforcement-thoracique'],
    },
    {
      week: 3,
      focus: 'Progression',
      goals: ['Marche 20 min 3 fois par semaine', 'Niveau 1 sur les exercices'],
      exercises: ['respiration-diaphragmatique', 'marche-echauffee', 'renforcement-thoracique'],
    },
    {
      week: 4,
      focus: 'Autonomie',
      goals: ['Marche 20-30 min reguliere', 'Controle environnemental en place', 'Plan d\'action ecrit compris et accessible'],
      exercises: ['respiration-diaphragmatique', 'marche-echauffee', 'renforcement-thoracique'],
    },
  ],

  medical_procedures: [
    {
      id: 'corticoide-inhale',
      name: 'Corticoides inhales (traitement de fond)',
      type: 'other',
      purpose: 'Reduire l\'inflammation bronchique chronique et prevenir les crises',
      indications: ['Tout asthme persistant (symptomes plus de 2 fois par semaine)'],
      benefits: ['Reduction de 50-70% des exacerbations', 'Amelioration de la fonction pulmonaire', 'Prevention du remodelage bronchique'],
      limitations: ['Doit etre pris tous les jours', 'Effet apres 1-2 semaines de traitement regulier'],
      risks: ['Candidose buccale (rincer la bouche apres)', 'Enrouement de la voix'],
      guideline_position: 'recommended',
      guideline_summary: 'Traitement de premiere intention pour tout asthme persistant selon GINA 2024.',
      sources: [{ title: 'GINA 2024 Report', org: 'GINA', year: 2024, type: 'guideline' }],
    },
    {
      id: 'immunotherapie',
      name: 'Desensibilisation (immunotherapie allergique)',
      type: 'other',
      purpose: 'Modifier la reponse immunitaire pour reduire la sensibilite aux allergenes',
      indications: ['Asthme allergique avec allergene identifie (acariens, pollens)', 'Rhinite allergique associee'],
      benefits: ['Reduction des symptomes et des medicaments', 'Effet qui persiste apres l\'arret du traitement'],
      limitations: ['Traitement de 3 a 5 ans', 'Efficace surtout pour acariens et pollens de graminees'],
      risks: ['Reactions allergiques au site d\'injection', 'Rare: anaphylaxie'],
      guideline_position: 'conditional',
      guideline_summary: 'Recommande pour l\'asthme allergique controle avec allergene identifie, en complement du traitement de fond.',
      sources: [{ title: 'Allergen immunotherapy for asthma', org: 'Cochrane', year: 2022, type: 'cochrane' }],
    },
  ],

  thermal_evidence: {
    summary: 'Les cures thermales a orientation ORL/respiratoire montrent des benefices sur l\'asthme, principalement par l\'amelioration du terrain allergique et de la fonction respiratoire.',
    key_results: [
      'Reduction de la frequence des crises dans les 6 mois post-cure',
      'Amelioration de la rhinite allergique associee',
      'Les eaux sulfurees ont un effet mucolytique et anti-inflammatoire sur les voies respiratoires',
      'La kinesitherapie respiratoire en cure est benefique',
    ],
    duration_recommended: '3 semaines (cure conventionnee, orientation voies respiratoires)',
    limitations: ['Etudes de qualite variable', 'Pas de substitut au traitement de fond'],
    contraindications: ['Asthme severe non controle', 'Asthme corticodependant instable'],
    sources: [{ title: 'Balneotherapy and respiratory diseases', org: 'European Respiratory Review', year: 2022, type: 'meta-analysis' }],
  },

  sources: [
    { title: 'Global Strategy for Asthma Management and Prevention (GINA)', org: 'GINA', year: 2024, type: 'guideline', url: 'https://ginasthma.org/gina-reports/' },
    { title: 'Recommandation de bonne pratique — Asthme de l\'adulte', org: 'HAS', year: 2021, type: 'guideline', url: 'https://www.has-sante.fr' },
    { title: 'Physical training for asthma', org: 'Cochrane', year: 2023, type: 'cochrane', url: 'https://doi.org/10.1002/14651858.CD001116.pub6' },
    { title: 'Allergen immunotherapy for asthma', org: 'Cochrane', year: 2022, type: 'cochrane' },
    { title: 'Inhaled corticosteroids for asthma', org: 'Cochrane', year: 2022, type: 'cochrane' },
    { title: 'Guide pratique SPLF — Education therapeutique asthme', org: 'SPLF', year: 2022, type: 'guideline' },
    { title: 'Balneotherapy and respiratory diseases', org: 'European Respiratory Review', year: 2022, type: 'meta-analysis' },
  ],
};
