// ============================================
// DONNÉES PODCASTS ÉTUVE
// ============================================
// Format hybride (comité IA) :
// - 1 tronc "Essentiel" (18-20 min) : messages clés
// - 3 bonus thématiques (15-25 min) : approfondissements
// Chaque épisode = 1 compétence ETP mesurable
// ============================================

export interface PodcastEpisode {
  id: string;
  type: 'essential' | 'bonus';
  title: string;
  description: string;
  expertName: string;
  expertTitle: string;
  duration: string;
  etpCompetence: string;     // Compétence ETP visée (pour dossier PECAN)
  audioUrl?: string;          // undefined = pas encore disponible
}

export interface PathologyPodcast {
  pathologySlug: string;
  pathologyName: string;
  episodes: PodcastEpisode[];
}

export const podcastLibrary: Record<string, PathologyPodcast> = {
  'arthrose': {
    pathologySlug: 'arthrose',
    pathologyName: 'Gonarthrose',
    episodes: [
      {
        id: 'arthrose-essential',
        type: 'essential',
        title: 'Gonarthrose — Comprendre et agir',
        description: "L'essentiel sur l'arthrose du genou : ce qui se passe, pourquoi bouger aide, et par où commencer.",
        expertName: 'Pr Sophie Laroche',
        expertTitle: 'Rhumatologue, CHU Grenoble',
        duration: '18 min',
        etpCompetence: 'Comprendre sa maladie',
        audioUrl: undefined,
      },
      {
        id: 'arthrose-exercices',
        type: 'bonus',
        title: 'Les exercices adaptés à votre genou',
        description: 'Niveaux 0 à 3, plan 7 jours, comment progresser sans se faire mal.',
        expertName: 'Pr Sophie Laroche',
        expertTitle: 'Rhumatologue, CHU Grenoble',
        duration: '22 min',
        etpCompetence: 'Savoir-faire : exercices adaptés',
        audioUrl: undefined,
      },
      {
        id: 'arthrose-quotidien',
        type: 'bonus',
        title: 'Alimentation, poids et habitudes du quotidien',
        description: "Chaque kilo compte. Alimentation anti-inflammatoire, chaleur, glace, postures.",
        expertName: 'Pr Sophie Laroche',
        expertTitle: 'Rhumatologue, CHU Grenoble',
        duration: '20 min',
        etpCompetence: 'Auto-soins quotidiens',
        audioUrl: undefined,
      },
      {
        id: 'arthrose-alertes',
        type: 'bonus',
        title: 'Quand consulter ? Red flags et chirurgie',
        description: "Les signaux d'alerte, les infiltrations, la prothèse : quand et pourquoi.",
        expertName: 'Pr Sophie Laroche',
        expertTitle: 'Rhumatologue, CHU Grenoble',
        duration: '18 min',
        etpCompetence: 'Sécurité : reconnaître les alertes',
        audioUrl: undefined,
      },
    ],
  },
  'lombalgie-chronique': {
    pathologySlug: 'lombalgie-chronique',
    pathologyName: 'Lombalgie chronique',
    episodes: [
      {
        id: 'lombalgie-essential',
        type: 'essential',
        title: "Lombalgie chronique — Le dos n'est pas fragile",
        description: 'Comprendre la douleur chronique, casser le cercle vicieux, et reprendre le mouvement.',
        expertName: 'Dr Marc Delacroix',
        expertTitle: 'Médecin de la douleur, CHU Lyon-Sud',
        duration: '20 min',
        etpCompetence: 'Comprendre sa maladie',
        audioUrl: undefined,
      },
      {
        id: 'lombalgie-exercices',
        type: 'bonus',
        title: 'Bouger sans peur : exercices et progression',
        description: 'La stratégie des petits pas, renforcement du tronc, yoga et Pilates.',
        expertName: 'Dr Marc Delacroix',
        expertTitle: 'Médecin de la douleur, CHU Lyon-Sud',
        duration: '22 min',
        etpCompetence: 'Savoir-faire : exercices adaptés',
        audioUrl: undefined,
      },
      {
        id: 'lombalgie-quotidien',
        type: 'bonus',
        title: 'Sommeil, stress et posture au bureau',
        description: "Hygiène de vie anti-douleur : sommeil, ergonomie, gestion du stress.",
        expertName: 'Dr Marc Delacroix',
        expertTitle: 'Médecin de la douleur, CHU Lyon-Sud',
        duration: '20 min',
        etpCompetence: 'Auto-soins quotidiens',
        audioUrl: undefined,
      },
      {
        id: 'lombalgie-alertes',
        type: 'bonus',
        title: "Quand s'inquiéter ? IRM, sciatique et urgences",
        description: "Les vrais signaux d'alerte, ce que dit (et ne dit pas) l'IRM.",
        expertName: 'Dr Marc Delacroix',
        expertTitle: 'Médecin de la douleur, CHU Lyon-Sud',
        duration: '18 min',
        etpCompetence: 'Sécurité : reconnaître les alertes',
        audioUrl: undefined,
      },
    ],
  },
  'insuffisance-veineuse-chronique': {
    pathologySlug: 'insuffisance-veineuse-chronique',
    pathologyName: 'Insuffisance veineuse chronique',
    episodes: [
      {
        id: 'veineuse-essential',
        type: 'essential',
        title: 'Insuffisance veineuse — Soulager vos jambes',
        description: 'Comprendre les valvules, la stagnation, et les 3 piliers : compression, marche, élévation.',
        expertName: 'Dr Claire Monteil',
        expertTitle: 'Angiologue, Centre Vasculaire Grenoble',
        duration: '18 min',
        etpCompetence: 'Comprendre sa maladie',
        audioUrl: undefined,
      },
      {
        id: 'veineuse-exercices',
        type: 'bonus',
        title: 'La pompe du mollet et les exercices veineux',
        description: 'Marche, flexions, activité physique adaptée pour le retour veineux.',
        expertName: 'Dr Claire Monteil',
        expertTitle: 'Angiologue, Centre Vasculaire Grenoble',
        duration: '20 min',
        etpCompetence: 'Savoir-faire : exercices adaptés',
        audioUrl: undefined,
      },
      {
        id: 'veineuse-quotidien',
        type: 'bonus',
        title: 'Compression, soins de peau et habitudes',
        description: 'Bien choisir ses bas, hydrater sa peau, surélever ses jambes.',
        expertName: 'Dr Claire Monteil',
        expertTitle: 'Angiologue, Centre Vasculaire Grenoble',
        duration: '20 min',
        etpCompetence: 'Auto-soins quotidiens',
        audioUrl: undefined,
      },
      {
        id: 'veineuse-alertes',
        type: 'bonus',
        title: "Phlébite, ulcère, embolie : les urgences veineuses",
        description: "Les signaux d'alerte, quand appeler le 15, quand consulter rapidement.",
        expertName: 'Dr Claire Monteil',
        expertTitle: 'Angiologue, Centre Vasculaire Grenoble',
        duration: '15 min',
        etpCompetence: 'Sécurité : reconnaître les alertes',
        audioUrl: undefined,
      },
    ],
  },
  'bpco': {
    pathologySlug: 'bpco',
    pathologyName: 'BPCO',
    episodes: [
      {
        id: 'bpco-essential',
        type: 'essential',
        title: 'BPCO — Reprendre son souffle',
        description: 'Comprendre la BPCO, pourquoi arrêter le tabac change tout, et les techniques respiratoires.',
        expertName: 'Pr Jean-Philippe Renaud',
        expertTitle: 'Pneumologue, Hôpital Croix-Rousse Lyon',
        duration: '20 min',
        etpCompetence: 'Comprendre sa maladie',
        audioUrl: undefined,
      },
      {
        id: 'bpco-exercices',
        type: 'bonus',
        title: 'Marche fractionnée et réhabilitation respiratoire',
        description: "Activité physique adaptée, renforcement, pacing à l'effort.",
        expertName: 'Pr Jean-Philippe Renaud',
        expertTitle: 'Pneumologue, Hôpital Croix-Rousse Lyon',
        duration: '22 min',
        etpCompetence: 'Savoir-faire : exercices adaptés',
        audioUrl: undefined,
      },
      {
        id: 'bpco-quotidien',
        type: 'bonus',
        title: 'Tabac, nutrition et vaccinations',
        description: 'Sevrage tabagique, apports protéiques, prévention des exacerbations.',
        expertName: 'Pr Jean-Philippe Renaud',
        expertTitle: 'Pneumologue, Hôpital Croix-Rousse Lyon',
        duration: '20 min',
        etpCompetence: 'Auto-soins quotidiens',
        audioUrl: undefined,
      },
      {
        id: 'bpco-alertes',
        type: 'bonus',
        title: "Exacerbation et plan d'action : quand réagir",
        description: "Reconnaître l'aggravation, le plan d'action écrit, quand appeler le 15.",
        expertName: 'Pr Jean-Philippe Renaud',
        expertTitle: 'Pneumologue, Hôpital Croix-Rousse Lyon',
        duration: '18 min',
        etpCompetence: 'Sécurité : reconnaître les alertes',
        audioUrl: undefined,
      },
    ],
  },
  'otites-a-repetition-enfant': {
    pathologySlug: 'otites-a-repetition-enfant',
    pathologyName: 'Otites à répétition (enfant)',
    episodes: [
      {
        id: 'otites-essential',
        type: 'essential',
        title: 'Otites à répétition — Guide pour les parents',
        description: "Pourquoi mon enfant fait des otites, quand ça passe, et ce qu'on peut faire.",
        expertName: 'Dr Nadia Belkacem',
        expertTitle: 'ORL pédiatrique, HFME Lyon',
        duration: '18 min',
        etpCompetence: 'Comprendre la maladie de son enfant',
        audioUrl: undefined,
      },
      {
        id: 'otites-prevention',
        type: 'bonus',
        title: 'Prévention : tabac, hygiène, xylitol',
        description: 'Les gestes qui réduisent les otites : zéro fumée, nez propre, alimentation.',
        expertName: 'Dr Nadia Belkacem',
        expertTitle: 'ORL pédiatrique, HFME Lyon',
        duration: '20 min',
        etpCompetence: 'Savoir-faire : prévention active',
        audioUrl: undefined,
      },
      {
        id: 'otites-aerateurs',
        type: 'bonus',
        title: 'Aérateurs, audition et langage',
        description: "Quand poser des yoyos, l'impact sur l'audition, le suivi ORL.",
        expertName: 'Dr Nadia Belkacem',
        expertTitle: 'ORL pédiatrique, HFME Lyon',
        duration: '18 min',
        etpCompetence: 'Décisions partagées avec le spécialiste',
        audioUrl: undefined,
      },
      {
        id: 'otites-alertes',
        type: 'bonus',
        title: "Urgences ORL chez l'enfant",
        description: 'Mastoïdite, méningite, fièvre du nourrisson : quand foncer aux urgences.',
        expertName: 'Dr Nadia Belkacem',
        expertTitle: 'ORL pédiatrique, HFME Lyon',
        duration: '15 min',
        etpCompetence: 'Sécurité : reconnaître les alertes',
        audioUrl: undefined,
      },
    ],
  },
};

// Lookup with alias support (V2 slug -> V1 slug)
const PODCAST_SLUG_ALIASES: Record<string, string> = {
  'gonarthrose': 'arthrose',
  'insuffisance-veineuse': 'insuffisance-veineuse-chronique',
  'otites-repetition-enfant': 'otites-a-repetition-enfant',
};

export const getPodcastBySlug = (slug: string): PathologyPodcast | undefined => {
  return podcastLibrary[slug] || podcastLibrary[PODCAST_SLUG_ALIASES[slug]];
};
