// ============================================
// MAPPING DIAGRAMMES PAR PATHOLOGIE
// ============================================

export interface DiagramInfo {
  anatomy: {
    id: string;
    title: string;
  };
  exercise: {
    id: string;
    title: string;
  };
  // Nouveaux diagrammes par niveau (0-2)
  exerciseLevels: {
    level0: string;
    level1: string;
    level2: string;
  };
}

export const diagramsMapping: Record<string, DiagramInfo> = {
  'arthrose': {
    anatomy: { id: 'articulation_simple', title: 'Articulation (cartilage)' },
    exercise: { id: 'sit_to_stand', title: 'Assis-debout' },
    exerciseLevels: {
      level0: 'arthrose_level0',
      level1: 'arthrose_level1',
      level2: 'arthrose_level2',
    },
  },
  'lombalgie-chronique': {
    anatomy: { id: 'colonne_simple', title: 'Colonne vertébrale' },
    exercise: { id: 'gainage_doux', title: 'Gainage doux' },
    exerciseLevels: {
      level0: 'lombalgie_level0',
      level1: 'lombalgie_level1',
      level2: 'lombalgie_level2',
    },
  },
  'insuffisance-veineuse-chronique': {
    anatomy: { id: 'retour_veineux', title: 'Retour veineux' },
    exercise: { id: 'pompe_mollet', title: 'Pompe du mollet' },
    exerciseLevels: {
      level0: 'veineux_level0',
      level1: 'veineux_level1',
      level2: 'veineux_level2',
    },
  },
  'bpco': {
    anatomy: { id: 'airways', title: 'Voies respiratoires' },
    exercise: { id: 'levres_pincees', title: 'Lèvres pincées' },
    exerciseLevels: {
      level0: 'bpco_level0',
      level1: 'bpco_level1',
      level2: 'bpco_level2',
    },
  },
  'otites-a-repetition-enfant': {
    anatomy: { id: 'trompe_eustache', title: 'Trompe d\'Eustache' },
    exercise: { id: 'prevention_hygiene', title: 'Prévention' },
    exerciseLevels: {
      level0: 'otites_level0',
      level1: 'otites_level1',
      level2: 'otites_level2',
    },
  },
};

export const getDiagramsBySlug = (slug: string): DiagramInfo | null => {
  return diagramsMapping[slug] || null;
};

// Helper pour obtenir le composant d'exercice par niveau
export const getExerciseLevelId = (slug: string, level: 0 | 1 | 2): string | null => {
  const info = diagramsMapping[slug];
  if (!info) return null;
  
  switch (level) {
    case 0: return info.exerciseLevels.level0;
    case 1: return info.exerciseLevels.level1;
    case 2: return info.exerciseLevels.level2;
    default: return null;
  }
};
