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
}

export const diagramsMapping: Record<string, DiagramInfo> = {
  'arthrose': {
    anatomy: { id: 'articulation_simple', title: 'Articulation (cartilage)' },
    exercise: { id: 'sit_to_stand', title: 'Assis-debout' },
  },
  'lombalgie-chronique': {
    anatomy: { id: 'colonne_simple', title: 'Colonne vertébrale' },
    exercise: { id: 'gainage_doux', title: 'Gainage doux' },
  },
  'insuffisance-veineuse-chronique': {
    anatomy: { id: 'retour_veineux', title: 'Retour veineux' },
    exercise: { id: 'pompe_mollet', title: 'Pompe du mollet' },
  },
  'bpco': {
    anatomy: { id: 'airways', title: 'Voies respiratoires' },
    exercise: { id: 'levres_pincees', title: 'Lèvres pincées' },
  },
  'otites-a-repetition-enfant': {
    anatomy: { id: 'trompe_eustache', title: 'Trompe d\'Eustache' },
    exercise: { id: 'prevention_hygiene', title: 'Prévention' },
  },
};

export const getDiagramsBySlug = (slug: string): DiagramInfo | null => {
  return diagramsMapping[slug] || null;
};
