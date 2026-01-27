// ============================================
// BIBLIOTHÈQUE DE RESSOURCES — DONNÉES ENRICHIES
// ============================================

export type LibraryCategory = 
  | 'rhumatologie' 
  | 'veino-lymphatique' 
  | 'respiratoire-orl' 
  | 'parents-enfants' 
  | 'muqueuses-buccales' 
  | 'guides-transversaux';

export type LibraryTag = 
  | 'comprendre' 
  | 'plan-simple' 
  | 'bouger' 
  | 'nutrition' 
  | 'habitudes' 
  | 'consulter';

export type LibraryAudience = 'senior' | 'parent' | 'adulte';

export interface LibraryResource {
  id: string;
  title: string;
  summary: string;
  category: LibraryCategory;
  tags: LibraryTag[];
  audience: LibraryAudience;
  readingTime: number; // in minutes
  pathologySlug?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  popularity: number; // 1-100, for sorting
  createdAt: string; // ISO date
  slug: string;
}

export interface QuickAnswer {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent';
  pathologySlug?: string;
  link?: string;
}

export const categoryLabelsLibrary: Record<LibraryCategory, string> = {
  'rhumatologie': 'Rhumatologie',
  'veino-lymphatique': 'Veino-lymphatique',
  'respiratoire-orl': 'Respiratoire / ORL',
  'parents-enfants': 'Parents / Enfants',
  'muqueuses-buccales': 'Muqueuses buccales',
  'guides-transversaux': 'Guides transversaux',
};

export const categoryIconsLibrary: Record<LibraryCategory, string> = {
  'rhumatologie': '🦴',
  'veino-lymphatique': '🩸',
  'respiratoire-orl': '🫁',
  'parents-enfants': '👶',
  'muqueuses-buccales': '👄',
  'guides-transversaux': '📚',
};

export const tagLabels: Record<LibraryTag, string> = {
  'comprendre': 'Comprendre',
  'plan-simple': 'Plan simple',
  'bouger': 'Bouger',
  'nutrition': 'Nutrition',
  'habitudes': 'Habitudes',
  'consulter': 'Quand consulter',
};

export const tagColors: Record<LibraryTag, string> = {
  'comprendre': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'plan-simple': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  'bouger': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'nutrition': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  'habitudes': 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  'consulter': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
};

export const audienceLabelsLibrary: Record<LibraryAudience, string> = {
  'senior': 'Seniors',
  'parent': 'Parents',
  'adulte': 'Adultes',
};

export const audienceIconsLibrary: Record<LibraryAudience, string> = {
  'senior': '👴',
  'parent': '👨‍👩‍👧',
  'adulte': '👤',
};

// ============================================
// RÉPONSES RAPIDES
// ============================================

export const quickAnswers: QuickAnswer[] = [
  {
    id: 'perdre-poids',
    title: 'Perdre du poids sans se décourager',
    subtitle: 'Un plan simple et réaliste',
    icon: '⚖️',
    color: 'primary',
    link: '/guides',
  },
  {
    id: 'arreter-fumer',
    title: 'Arrêter de fumer',
    subtitle: 'Plan étape par étape',
    icon: '🚭',
    color: 'secondary',
    link: '/guides',
  },
  {
    id: 'arthrose-dos',
    title: 'Arthrose / dos : que faire ?',
    subtitle: 'Actions immédiates',
    icon: '🦴',
    color: 'accent',
    pathologySlug: 'arthrose',
  },
];

// ============================================
// RESSOURCES DE LA BIBLIOTHÈQUE
// ============================================

export const libraryResources: LibraryResource[] = [
  // RHUMATOLOGIE
  {
    id: 'arthrose-comprendre',
    title: 'Comprendre l\'arthrose en 2 minutes',
    summary: 'Ce qui se passe dans votre articulation et pourquoi le mouvement aide plutôt qu\'il n\'abîme.',
    category: 'rhumatologie',
    tags: ['comprendre'],
    audience: 'senior',
    readingTime: 2,
    pathologySlug: 'arthrose',
    isFeatured: true,
    popularity: 95,
    createdAt: '2025-01-15',
    slug: 'arthrose-comprendre',
  },
  {
    id: 'arthrose-plan-7-jours',
    title: 'Arthrose : plan 7 jours pour démarrer',
    summary: 'Je vous propose un programme simple pour commencer à bouger sans vous faire mal.',
    category: 'rhumatologie',
    tags: ['plan-simple', 'bouger'],
    audience: 'senior',
    readingTime: 5,
    pathologySlug: 'arthrose',
    popularity: 92,
    createdAt: '2025-01-10',
    slug: 'arthrose-plan-7-jours',
  },
  {
    id: 'arthrose-exercices-genou',
    title: '5 exercices pour le genou arthrosique',
    summary: 'Des exercices simples à faire chez vous, adaptés à votre niveau de mobilité.',
    category: 'rhumatologie',
    tags: ['bouger'],
    audience: 'senior',
    readingTime: 8,
    pathologySlug: 'arthrose',
    popularity: 88,
    createdAt: '2025-01-08',
    slug: 'arthrose-exercices-genou',
  },
  {
    id: 'arthrose-nutrition',
    title: 'Manger anti-inflammatoire quand on a de l\'arthrose',
    summary: 'L\'assiette idéale et les 3 erreurs à éviter. Pas de régime extrême, juste du bon sens.',
    category: 'rhumatologie',
    tags: ['nutrition'],
    audience: 'senior',
    readingTime: 5,
    pathologySlug: 'arthrose',
    popularity: 78,
    createdAt: '2025-01-05',
    slug: 'arthrose-nutrition',
  },
  {
    id: 'lombalgie-comprendre',
    title: 'Mal de dos chronique : ce qu\'il faut savoir',
    summary: 'Pourquoi ça fait mal et pourquoi le repos prolongé aggrave les choses.',
    category: 'rhumatologie',
    tags: ['comprendre'],
    audience: 'adulte',
    readingTime: 3,
    pathologySlug: 'lombalgie-chronique',
    popularity: 90,
    isNew: true,
    createdAt: '2025-01-20',
    slug: 'lombalgie-comprendre',
  },
  {
    id: 'lombalgie-plan-simple',
    title: 'Lombalgie : plan d\'action immédiat',
    summary: '3 choses simples à faire aujourd\'hui pour soulager votre dos.',
    category: 'rhumatologie',
    tags: ['plan-simple', 'bouger'],
    audience: 'adulte',
    readingTime: 4,
    pathologySlug: 'lombalgie-chronique',
    isFeatured: true,
    popularity: 94,
    createdAt: '2025-01-18',
    slug: 'lombalgie-plan-simple',
  },
  {
    id: 'lombalgie-gainage',
    title: 'Gainage doux pour lombalgiques',
    summary: 'Renforcer votre dos sans risque. Exercices adaptés même si vous avez très mal.',
    category: 'rhumatologie',
    tags: ['bouger'],
    audience: 'adulte',
    readingTime: 7,
    pathologySlug: 'lombalgie-chronique',
    popularity: 82,
    createdAt: '2025-01-12',
    slug: 'lombalgie-gainage',
  },
  {
    id: 'lombalgie-quand-consulter',
    title: 'Mal de dos : quand faut-il s\'inquiéter ?',
    summary: 'Les signaux d\'alerte à connaître. Dans 90% des cas, ce n\'est pas grave.',
    category: 'rhumatologie',
    tags: ['consulter'],
    audience: 'adulte',
    readingTime: 3,
    pathologySlug: 'lombalgie-chronique',
    popularity: 75,
    createdAt: '2025-01-06',
    slug: 'lombalgie-quand-consulter',
  },

  // VEINO-LYMPHATIQUE
  {
    id: 'veines-comprendre',
    title: 'Insuffisance veineuse : comprendre le problème',
    summary: 'Pourquoi vos jambes sont lourdes et comment la marche peut tout changer.',
    category: 'veino-lymphatique',
    tags: ['comprendre'],
    audience: 'senior',
    readingTime: 3,
    pathologySlug: 'insuffisance-veineuse-chronique',
    popularity: 85,
    createdAt: '2025-01-14',
    slug: 'veines-comprendre',
  },
  {
    id: 'veines-plan-quotidien',
    title: 'Jambes lourdes : routine quotidienne',
    summary: '5 gestes simples à faire chaque jour pour soulager vos jambes.',
    category: 'veino-lymphatique',
    tags: ['plan-simple', 'habitudes'],
    audience: 'senior',
    readingTime: 4,
    pathologySlug: 'insuffisance-veineuse-chronique',
    isFeatured: true,
    popularity: 91,
    createdAt: '2025-01-16',
    slug: 'veines-plan-quotidien',
  },
  {
    id: 'veines-contention',
    title: 'Bien porter ses bas de contention',
    summary: 'Comment les choisir, les mettre et les entretenir. Prescrit par le médecin, remboursé.',
    category: 'veino-lymphatique',
    tags: ['habitudes'],
    audience: 'senior',
    readingTime: 5,
    pathologySlug: 'insuffisance-veineuse-chronique',
    popularity: 79,
    createdAt: '2025-01-09',
    slug: 'veines-contention',
  },
  {
    id: 'veines-exercices-mollets',
    title: 'Exercices pour activer la pompe veineuse',
    summary: 'Des mouvements simples à faire assis, debout ou couché.',
    category: 'veino-lymphatique',
    tags: ['bouger'],
    audience: 'senior',
    readingTime: 6,
    pathologySlug: 'insuffisance-veineuse-chronique',
    popularity: 76,
    createdAt: '2025-01-07',
    slug: 'veines-exercices-mollets',
  },

  // RESPIRATOIRE / ORL
  {
    id: 'bpco-comprendre',
    title: 'BPCO : mieux comprendre votre essoufflement',
    summary: 'Ce qui se passe dans vos poumons et pourquoi l\'activité physique est un traitement.',
    category: 'respiratoire-orl',
    tags: ['comprendre'],
    audience: 'adulte',
    readingTime: 4,
    pathologySlug: 'bpco',
    popularity: 84,
    createdAt: '2025-01-13',
    slug: 'bpco-comprendre',
  },
  {
    id: 'bpco-respiration',
    title: 'Techniques de respiration pour la BPCO',
    summary: 'La respiration lèvres pincées et autres techniques pour mieux gérer l\'essoufflement.',
    category: 'respiratoire-orl',
    tags: ['bouger', 'habitudes'],
    audience: 'adulte',
    readingTime: 5,
    pathologySlug: 'bpco',
    isFeatured: true,
    popularity: 89,
    createdAt: '2025-01-17',
    slug: 'bpco-respiration',
  },
  {
    id: 'bpco-plan-activite',
    title: 'BPCO : reprendre l\'activité physique',
    summary: 'Un programme progressif pour bouger malgré l\'essoufflement. Même 5 minutes comptent.',
    category: 'respiratoire-orl',
    tags: ['plan-simple', 'bouger'],
    audience: 'adulte',
    readingTime: 6,
    pathologySlug: 'bpco',
    popularity: 81,
    createdAt: '2025-01-11',
    slug: 'bpco-plan-activite',
  },
  {
    id: 'bpco-exacerbation',
    title: 'BPCO : que faire en cas de crise ?',
    summary: 'Plan 48h en cas d\'aggravation. Quand continuer seul, quand appeler le médecin.',
    category: 'respiratoire-orl',
    tags: ['consulter'],
    audience: 'adulte',
    readingTime: 4,
    pathologySlug: 'bpco',
    popularity: 77,
    createdAt: '2025-01-04',
    slug: 'bpco-exacerbation',
  },

  // PARENTS / ENFANTS
  {
    id: 'otites-comprendre',
    title: 'Pourquoi mon enfant fait des otites à répétition',
    summary: 'Ce qui se passe dans son oreille et pourquoi ça s\'améliore avec l\'âge.',
    category: 'parents-enfants',
    tags: ['comprendre'],
    audience: 'parent',
    readingTime: 3,
    pathologySlug: 'otites-a-repetition-enfant',
    popularity: 93,
    isNew: true,
    createdAt: '2025-01-22',
    slug: 'otites-comprendre',
  },
  {
    id: 'otites-prevention',
    title: 'Prévenir les otites : les 5 gestes essentiels',
    summary: 'Lavage de nez, aération, hygiène... Les habitudes qui réduisent les récidives.',
    category: 'parents-enfants',
    tags: ['plan-simple', 'habitudes'],
    audience: 'parent',
    readingTime: 4,
    pathologySlug: 'otites-a-repetition-enfant',
    isFeatured: true,
    popularity: 96,
    createdAt: '2025-01-21',
    slug: 'otites-prevention',
  },
  {
    id: 'otites-lavage-nez',
    title: 'Comment bien laver le nez de votre enfant',
    summary: 'Technique pas à pas pour un lavage efficace et sans stress.',
    category: 'parents-enfants',
    tags: ['habitudes'],
    audience: 'parent',
    readingTime: 5,
    pathologySlug: 'otites-a-repetition-enfant',
    popularity: 87,
    createdAt: '2025-01-19',
    slug: 'otites-lavage-nez',
  },
  {
    id: 'otites-quand-consulter',
    title: 'Otite chez l\'enfant : quand consulter en urgence ?',
    summary: 'Les signes qui doivent vous alerter. Fièvre, écoulement, douleur intense...',
    category: 'parents-enfants',
    tags: ['consulter'],
    audience: 'parent',
    readingTime: 3,
    pathologySlug: 'otites-a-repetition-enfant',
    popularity: 80,
    createdAt: '2025-01-03',
    slug: 'otites-quand-consulter',
  },
  {
    id: 'angines-repetition',
    title: 'Angines à répétition chez l\'enfant',
    summary: 'Pourquoi ça revient et comment réduire les épisodes. Quand envisager les amygdales.',
    category: 'parents-enfants',
    tags: ['comprendre', 'habitudes'],
    audience: 'parent',
    readingTime: 5,
    popularity: 74,
    createdAt: '2025-01-02',
    slug: 'angines-repetition',
  },
  {
    id: 'rhino-pharyngites',
    title: 'Rhino-pharyngites à répétition : guide parents',
    summary: 'C\'est normal que votre enfant soit souvent enrhumé. Voici comment l\'aider.',
    category: 'parents-enfants',
    tags: ['comprendre', 'plan-simple'],
    audience: 'parent',
    readingTime: 4,
    popularity: 71,
    createdAt: '2025-01-01',
    slug: 'rhino-pharyngites',
  },

  // GUIDES TRANSVERSAUX
  {
    id: 'perdre-poids',
    title: 'Perdre du poids sans se décourager',
    summary: 'Un plan réaliste et durable. Pas de régime miracle, juste du bon sens qui marche.',
    category: 'guides-transversaux',
    tags: ['plan-simple', 'nutrition', 'habitudes'],
    audience: 'adulte',
    readingTime: 8,
    isFeatured: true,
    popularity: 98,
    createdAt: '2025-01-25',
    slug: 'perdre-poids',
  },
  {
    id: 'arreter-fumer',
    title: 'Arrêter de fumer : plan par étapes',
    summary: 'Je vous accompagne semaine après semaine. C\'est possible, à votre rythme.',
    category: 'guides-transversaux',
    tags: ['plan-simple', 'habitudes'],
    audience: 'adulte',
    readingTime: 10,
    isFeatured: true,
    popularity: 97,
    createdAt: '2025-01-24',
    slug: 'arreter-fumer',
  },
  {
    id: 'mieux-dormir',
    title: 'Mieux dormir sans médicaments',
    summary: 'Hygiène du sommeil et techniques simples pour retrouver des nuits réparatrices.',
    category: 'guides-transversaux',
    tags: ['habitudes'],
    audience: 'adulte',
    readingTime: 6,
    popularity: 86,
    isNew: true,
    createdAt: '2025-01-23',
    slug: 'mieux-dormir',
  },
  {
    id: 'bouger-plus',
    title: 'Bouger plus au quotidien (même sans sport)',
    summary: 'Des idées simples pour être plus actif, même quand on déteste le sport.',
    category: 'guides-transversaux',
    tags: ['bouger', 'habitudes'],
    audience: 'adulte',
    readingTime: 5,
    popularity: 83,
    createdAt: '2025-01-15',
    slug: 'bouger-plus',
  },
  {
    id: 'gerer-stress',
    title: 'Gérer le stress au quotidien',
    summary: 'Respiration, relaxation, organisation... Des outils pratiques qui fonctionnent.',
    category: 'guides-transversaux',
    tags: ['habitudes'],
    audience: 'adulte',
    readingTime: 7,
    popularity: 79,
    createdAt: '2025-01-10',
    slug: 'gerer-stress',
  },
  {
    id: 'nutrition-anti-inflammatoire',
    title: 'Manger anti-inflammatoire : le guide',
    summary: 'Les aliments à privilégier et à éviter pour réduire l\'inflammation chronique.',
    category: 'guides-transversaux',
    tags: ['nutrition'],
    audience: 'adulte',
    readingTime: 8,
    popularity: 88,
    createdAt: '2025-01-12',
    slug: 'nutrition-anti-inflammatoire',
  },
];

// ============================================
// SORTING OPTIONS
// ============================================

export type SortOption = 'popular' | 'new' | 'seniors' | 'parents';

export const sortLabels: Record<SortOption, string> = {
  'popular': 'Les plus utiles',
  'new': 'Nouveautés',
  'seniors': 'Pour seniors',
  'parents': 'Pour parents',
};

export const sortResources = (resources: LibraryResource[], sortBy: SortOption): LibraryResource[] => {
  switch (sortBy) {
    case 'popular':
      return [...resources].sort((a, b) => b.popularity - a.popularity);
    case 'new':
      return [...resources].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case 'seniors':
      return [...resources].sort((a, b) => {
        if (a.audience === 'senior' && b.audience !== 'senior') return -1;
        if (a.audience !== 'senior' && b.audience === 'senior') return 1;
        return b.popularity - a.popularity;
      });
    case 'parents':
      return [...resources].sort((a, b) => {
        if (a.audience === 'parent' && b.audience !== 'parent') return -1;
        if (a.audience !== 'parent' && b.audience === 'parent') return 1;
        return b.popularity - a.popularity;
      });
    default:
      return resources;
  }
};
