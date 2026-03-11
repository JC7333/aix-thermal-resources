// ============================================
// SOCIAL FACTORY — ÉTUVE
// ============================================
// Contenus IG/FB générés à partir de l'Evidence Pack
// 30 posts + 8 reels + 12 carrousels
// ============================================

export interface SocialPost {
  id: string;
  slug: string;
  title: string;
  bullets: string[];
  actionDuJour: string;
  cta: string;
  hashtags: string[];
  type: 'normal' | 'anti-decouragement';
}

export interface ReelScript {
  id: string;
  slug: string;
  hook: string;
  points: string[];
  cta: string;
  hashtags: string[];
  type: 'normal' | 'anti-decouragement';
}

export interface CarouselSlide {
  title: string;
  content: string;
}

export interface Carousel {
  id: string;
  slug: string;
  slides: CarouselSlide[];
  hashtags: string[];
  type: 'normal' | 'anti-decouragement';
}

// ============================================
// 30 POSTS COURTS
// ============================================
export const posts30: SocialPost[] = [
  // ARTHROSE (6 posts)
  {
    id: 'post-arthrose-1',
    slug: 'arthrose',
    title: 'Arthrose : bouger, c\'est le meilleur traitement',
    bullets: [
      'L\'exercice adapté est plus efficace que les médicaments',
      'Même 5 minutes par jour, ça compte',
      'Le repos prolongé aggrave les douleurs'
    ],
    actionDuJour: 'Faites 5 flexions douces du genou, assis sur une chaise',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/arthrose',
    hashtags: ['arthrose', 'sante', 'exercice', 'bienetre', 'senior'],
    type: 'normal'
  },
  {
    id: 'post-arthrose-2',
    slug: 'arthrose',
    title: 'Vous avez mal ? C\'est normal d\'avoir peur de bouger',
    bullets: [
      'La douleur ne veut pas dire que vous abîmez vos articulations',
      'Commencez très doucement, sans forcer',
      'Chaque petit mouvement compte'
    ],
    actionDuJour: 'Levez-vous et faites 3 pas, c\'est tout pour aujourd\'hui',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/arthrose',
    hashtags: ['arthrose', 'motivation', 'petitspas', 'sante', 'courage'],
    type: 'anti-decouragement'
  },
  {
    id: 'post-arthrose-3',
    slug: 'arthrose',
    title: 'Perdre du poids aide vos articulations',
    bullets: [
      'Même 5 kg en moins, ça soulage',
      'Pas besoin de régime strict',
      'Marcher + manger équilibré suffit souvent'
    ],
    actionDuJour: 'Buvez un verre d\'eau avant chaque repas',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/arthrose',
    hashtags: ['arthrose', 'poids', 'nutrition', 'sante', 'articulations'],
    type: 'normal'
  },
  {
    id: 'post-arthrose-4',
    slug: 'arthrose',
    title: 'Arthrose du genou : 3 exercices simples',
    bullets: [
      'Flexions douces assis',
      'Extensions jambe tendue',
      'Marche lente 10 minutes'
    ],
    actionDuJour: 'Faites 10 flexions assis, doucement, sans forcer',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/arthrose',
    hashtags: ['arthrose', 'genou', 'exercices', 'kine', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-arthrose-5',
    slug: 'arthrose',
    title: 'Vous n\'arrivez pas à faire 10 minutes ? C\'est OK',
    bullets: [
      'Commencez par 2 minutes, c\'est déjà bien',
      'Augmentez d\'une minute par semaine',
      'L\'important c\'est la régularité, pas la durée'
    ],
    actionDuJour: 'Marchez 2 minutes, même sur place. C\'est suffisant',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/arthrose',
    hashtags: ['arthrose', 'petitspas', 'motivation', 'facile', 'senior'],
    type: 'anti-decouragement'
  },
  {
    id: 'post-arthrose-6',
    slug: 'arthrose',
    title: 'La canne, c\'est pas la honte',
    bullets: [
      'Elle soulage vraiment l\'articulation',
      'Elle permet de marcher plus longtemps',
      'Utilisez-la du côté opposé à la douleur'
    ],
    actionDuJour: 'Essayez de marcher avec un bâton de randonnée',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/arthrose',
    hashtags: ['arthrose', 'canne', 'marche', 'autonomie', 'sante'],
    type: 'normal'
  },

  // LOMBALGIE (6 posts)
  {
    id: 'post-lombalgie-1',
    slug: 'lombalgie-chronique',
    title: 'Mal de dos : le repos prolongé est votre ennemi',
    bullets: [
      'Rester au lit aggrave la douleur',
      'Le mouvement lubrifie la colonne',
      'Même 5 min de marche aide'
    ],
    actionDuJour: 'Marchez 5 minutes, doucement',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/lombalgie-chronique',
    hashtags: ['maldedos', 'lombalgie', 'bouger', 'sante', 'dos'],
    type: 'normal'
  },
  {
    id: 'post-lombalgie-2',
    slug: 'lombalgie-chronique',
    title: 'Vous avez peur de vous faire mal ? C\'est normal',
    bullets: [
      'La peur du mouvement est fréquente',
      'Votre dos est solide, même s\'il fait mal',
      'Commencez par des mouvements très doux'
    ],
    actionDuJour: 'Basculez doucement le bassin, allongé, 5 fois',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/lombalgie-chronique',
    hashtags: ['maldedos', 'peur', 'confiance', 'petitspas', 'courage'],
    type: 'anti-decouragement'
  },
  {
    id: 'post-lombalgie-3',
    slug: 'lombalgie-chronique',
    title: 'Le gainage : 15 secondes suffisent au début',
    bullets: [
      'Pas besoin de tenir 1 minute',
      'La qualité compte plus que la durée',
      'Augmentez de 5 sec par semaine'
    ],
    actionDuJour: 'Gainage ventral 15 sec, puis repos',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/lombalgie-chronique',
    hashtags: ['gainage', 'dos', 'renforcement', 'exercice', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-lombalgie-4',
    slug: 'lombalgie-chronique',
    title: 'Mal de dos : la respiration aide vraiment',
    bullets: [
      'Respiration abdominale = détente musculaire',
      '3 min par jour suffisent',
      'À faire quand la douleur monte'
    ],
    actionDuJour: 'Respirez lentement par le ventre pendant 2 min',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/lombalgie-chronique',
    hashtags: ['respiration', 'maldedos', 'relaxation', 'sante', 'zen'],
    type: 'normal'
  },
  {
    id: 'post-lombalgie-5',
    slug: 'lombalgie-chronique',
    title: 'Vous n\'avez pas la force de faire les exercices ?',
    bullets: [
      'Faites-en un seul, c\'est déjà ça',
      'Demain vous en ferez peut-être deux',
      'La régularité bat l\'intensité'
    ],
    actionDuJour: 'Un seul pont fessier. C\'est suffisant pour aujourd\'hui',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/lombalgie-chronique',
    hashtags: ['maldedos', 'fatigue', 'petitspas', 'courage', 'motivation'],
    type: 'anti-decouragement'
  },
  {
    id: 'post-lombalgie-6',
    slug: 'lombalgie-chronique',
    title: 'Changez de position toutes les 30 min',
    bullets: [
      'Le corps n\'aime pas l\'immobilité',
      'Debout, assis, marche : alternez',
      'Mettez un rappel sur votre téléphone'
    ],
    actionDuJour: 'Levez-vous et étirez-vous 30 secondes',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/lombalgie-chronique',
    hashtags: ['posture', 'bureau', 'maldedos', 'prevention', 'sante'],
    type: 'normal'
  },

  // INSUFFISANCE VEINEUSE (6 posts)
  {
    id: 'post-veines-1',
    slug: 'insuffisance-veineuse-chronique',
    title: 'Jambes lourdes : la marche est votre meilleur allié',
    bullets: [
      'La pompe du mollet active le retour veineux',
      '10 min de marche par jour minimum',
      'Évitez de rester immobile longtemps'
    ],
    actionDuJour: 'Marchez 10 min, même doucement',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/insuffisance-veineuse-chronique',
    hashtags: ['jambes', 'circulation', 'marche', 'veines', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-veines-2',
    slug: 'insuffisance-veineuse-chronique',
    title: 'La pompe du mollet : exercice ultra simple',
    bullets: [
      'Montez sur la pointe des pieds',
      'Redescendez doucement',
      'Répétez 15 fois, 2x par jour'
    ],
    actionDuJour: '15 montées sur pointes, assis ou debout',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/insuffisance-veineuse-chronique',
    hashtags: ['jambes', 'exercice', 'mollets', 'circulation', 'facile'],
    type: 'normal'
  },
  {
    id: 'post-veines-3',
    slug: 'insuffisance-veineuse-chronique',
    title: 'Trop fatigué(e) pour marcher ? C\'est OK',
    bullets: [
      'Faites les exercices assis',
      'Surélevez vos jambes 10 min',
      'C\'est déjà efficace'
    ],
    actionDuJour: 'Jambes surélevées 10 min devant la télé',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/insuffisance-veineuse-chronique',
    hashtags: ['jambes', 'repos', 'petitspas', 'fatigue', 'sante'],
    type: 'anti-decouragement'
  },
  {
    id: 'post-veines-4',
    slug: 'insuffisance-veineuse-chronique',
    title: 'Les bas de contention : pas glamour mais efficaces',
    bullets: [
      'Ils compriment et aident le retour veineux',
      'Portez-les dès le matin',
      'Demandez conseil pour la bonne taille'
    ],
    actionDuJour: 'Mettez vos bas avant de vous lever',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/insuffisance-veineuse-chronique',
    hashtags: ['contention', 'jambes', 'veines', 'conseil', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-veines-5',
    slug: 'insuffisance-veineuse-chronique',
    title: 'Douche fraîche sur les jambes : petit geste, grand effet',
    bullets: [
      'Eau fraîche (pas glacée) en fin de douche',
      'De bas en haut, 1 minute',
      'Effet décongestionnant immédiat'
    ],
    actionDuJour: 'Finissez votre douche par 30 sec d\'eau fraîche sur les jambes',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/insuffisance-veineuse-chronique',
    hashtags: ['jambes', 'douche', 'circulation', 'astuce', 'ete'],
    type: 'normal'
  },
  {
    id: 'post-veines-6',
    slug: 'insuffisance-veineuse-chronique',
    title: 'Hydratez votre peau des jambes',
    bullets: [
      'Peau sèche = risque de plaies',
      'Crème hydratante chaque soir',
      'Surveillez les petites blessures'
    ],
    actionDuJour: 'Appliquez une crème sur vos jambes ce soir',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/insuffisance-veineuse-chronique',
    hashtags: ['peau', 'jambes', 'soin', 'hydratation', 'sante'],
    type: 'normal'
  },

  // BPCO (6 posts)
  {
    id: 'post-bpco-1',
    slug: 'bpco',
    title: 'BPCO : l\'arrêt du tabac, c\'est le geste n°1',
    bullets: [
      'Les bénéfices commencent dès le 1er jour',
      'Votre souffle s\'améliore en quelques semaines',
      'Demandez de l\'aide, c\'est normal'
    ],
    actionDuJour: 'Parlez à votre médecin de l\'arrêt du tabac',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/bpco',
    hashtags: ['bpco', 'tabac', 'arreter', 'souffle', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-bpco-2',
    slug: 'bpco',
    title: 'Essoufflé(e) ? La respiration lèvres pincées aide',
    bullets: [
      'Inspirez par le nez',
      'Expirez lentement par la bouche, lèvres pincées',
      'Ça ralentit la respiration et calme l\'essoufflement'
    ],
    actionDuJour: '5 respirations lèvres pincées, maintenant',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/bpco',
    hashtags: ['bpco', 'respiration', 'souffle', 'technique', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-bpco-3',
    slug: 'bpco',
    title: 'Vous avez peur de marcher à cause de l\'essoufflement ?',
    bullets: [
      'L\'essoufflement n\'est pas dangereux',
      'Marchez à votre rythme, avec des pauses',
      'Chaque pas compte pour vos poumons'
    ],
    actionDuJour: 'Marchez 3 min, avec une pause si besoin',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/bpco',
    hashtags: ['bpco', 'marche', 'peur', 'petitspas', 'courage'],
    type: 'anti-decouragement'
  },
  {
    id: 'post-bpco-4',
    slug: 'bpco',
    title: 'Fractionnez vos efforts',
    bullets: [
      'Plutôt 3x5 min que 15 min d\'affilée',
      'Reposez-vous entre les tâches',
      'Planifiez les efforts dans la journée'
    ],
    actionDuJour: 'Faites 5 min d\'activité, puis reposez-vous',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/bpco',
    hashtags: ['bpco', 'effort', 'pacing', 'energie', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-bpco-5',
    slug: 'bpco',
    title: 'BPCO : les vaccins protègent vos poumons',
    bullets: [
      'Grippe, COVID, pneumocoque : à jour ?',
      'Ils réduisent les crises',
      'Parlez-en à votre médecin'
    ],
    actionDuJour: 'Vérifiez vos vaccinations',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/bpco',
    hashtags: ['bpco', 'vaccin', 'prevention', 'poumons', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-bpco-6',
    slug: 'bpco',
    title: 'Vous n\'arrivez pas à faire les exercices ?',
    bullets: [
      'Faites ce que vous pouvez, même assis',
      'L\'important c\'est de bouger un peu',
      'Demain sera peut-être plus facile'
    ],
    actionDuJour: 'Bougez les bras 1 min, assis',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/bpco',
    hashtags: ['bpco', 'fatigue', 'petitspas', 'motivation', 'courage'],
    type: 'anti-decouragement'
  },

  // OTITES ENFANTS (6 posts)
  {
    id: 'post-otites-1',
    slug: 'otites-enfants',
    title: 'Otites à répétition : le lavage de nez aide vraiment',
    bullets: [
      'Nez propre = moins d\'infections',
      'Sérum physiologique, 2x/jour',
      'Simple et efficace'
    ],
    actionDuJour: 'Lavez le nez de votre enfant ce soir',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/otites-enfants',
    hashtags: ['otite', 'enfant', 'nez', 'parent', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-otites-2',
    slug: 'otites-enfants',
    title: 'Otite : quand s\'inquiéter ?',
    bullets: [
      'Fièvre élevée qui dure',
      'Enfant très abattu ou irritable',
      'Gonflement derrière l\'oreille'
    ],
    actionDuJour: 'En cas de doute, consultez rapidement',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/otites-enfants',
    hashtags: ['otite', 'urgence', 'enfant', 'parent', 'medecin'],
    type: 'normal'
  },
  {
    id: 'post-otites-3',
    slug: 'otites-enfants',
    title: 'Votre enfant a encore une otite ? Vous n\'y êtes pour rien',
    bullets: [
      'Les otites à répétition sont fréquentes',
      'Ce n\'est pas un manque d\'hygiène',
      'Ça s\'améliore souvent avec l\'âge'
    ],
    actionDuJour: 'Respirez. Vous faites de votre mieux',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/otites-enfants',
    hashtags: ['otite', 'parent', 'culpabilite', 'courage', 'soutien'],
    type: 'anti-decouragement'
  },
  {
    id: 'post-otites-4',
    slug: 'otites-enfants',
    title: 'Tabac passif : un facteur de risque majeur',
    bullets: [
      'La fumée irrite les voies respiratoires',
      'Même dehors, les particules restent',
      'Objectif : zéro fumée autour de l\'enfant'
    ],
    actionDuJour: 'Fumez uniquement à l\'extérieur, loin de l\'enfant',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/otites-enfants',
    hashtags: ['tabac', 'enfant', 'otite', 'prevention', 'sante'],
    type: 'normal'
  },
  {
    id: 'post-otites-5',
    slug: 'otites-enfants',
    title: 'Crèche et otites : c\'est normal',
    bullets: [
      'Les enfants en collectivité sont plus exposés',
      'Leur système immunitaire apprend',
      'Ça diminue généralement vers 3-4 ans'
    ],
    actionDuJour: 'Continuez le lavage de nez régulier',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/otites-enfants',
    hashtags: ['creche', 'otite', 'enfant', 'immunite', 'parent'],
    type: 'normal'
  },
  {
    id: 'post-otites-6',
    slug: 'otites-enfants',
    title: 'Vous êtes épuisé(e) par les otites de votre enfant ?',
    bullets: [
      'C\'est normal d\'être fatigué',
      'Les nuits blanches, c\'est dur',
      'Demandez de l\'aide autour de vous'
    ],
    actionDuJour: 'Reposez-vous quand l\'enfant dort',
    cta: '📄 PDF frigo gratuit sur etuve.fr/pathologies/otites-enfants',
    hashtags: ['parent', 'fatigue', 'soutien', 'courage', 'otite'],
    type: 'anti-decouragement'
  }
];

// ============================================
// 8 SCRIPTS REELS (20 sec)
// ============================================
export const reels8: ReelScript[] = [
  {
    id: 'reel-arthrose-1',
    slug: 'arthrose',
    hook: 'Vous avez de l\'arthrose ? Arrêtez de rester immobile !',
    points: [
      'Le repos prolongé aggrave la douleur',
      'L\'exercice adapté est le traitement n°1',
      'Même 5 min par jour, ça fonctionne'
    ],
    cta: 'Lien en bio : PDF frigo gratuit',
    hashtags: ['arthrose', 'exercice', 'sante', 'conseil', 'medecin'],
    type: 'normal'
  },
  {
    id: 'reel-arthrose-2',
    slug: 'arthrose',
    hook: 'Vous n\'arrivez pas à faire 10 min d\'exercice ? C\'est normal',
    points: [
      'Commencez par 2 min, c\'est déjà bien',
      'Ajoutez 1 min par semaine',
      'L\'important c\'est la régularité'
    ],
    cta: 'PDF frigo gratuit en bio',
    hashtags: ['arthrose', 'petitspas', 'motivation', 'senior', 'courage'],
    type: 'anti-decouragement'
  },
  {
    id: 'reel-lombalgie-1',
    slug: 'lombalgie-chronique',
    hook: 'Mal de dos depuis des mois ? Voici ce qui aide vraiment',
    points: [
      'Le repos au lit, c\'est fini',
      'Marchez 10 min par jour minimum',
      'Le gainage renforce votre dos'
    ],
    cta: 'PDF frigo gratuit en bio',
    hashtags: ['maldedos', 'lombalgie', 'gainage', 'marche', 'sante'],
    type: 'normal'
  },
  {
    id: 'reel-lombalgie-2',
    slug: 'lombalgie-chronique',
    hook: 'Vous avez peur de bouger à cause du dos ?',
    points: [
      'Votre dos est solide, même s\'il fait mal',
      'La douleur ne veut pas dire que vous vous abîmez',
      'Bougez doucement, progressivement'
    ],
    cta: 'PDF frigo gratuit en bio',
    hashtags: ['maldedos', 'peur', 'confiance', 'petitspas', 'courage'],
    type: 'anti-decouragement'
  },
  {
    id: 'reel-veines-1',
    slug: 'insuffisance-veineuse-chronique',
    hook: 'Jambes lourdes ? Faites cet exercice chaque jour',
    points: [
      'Montez sur la pointe des pieds',
      'Redescendez lentement',
      '15 fois, 2x par jour'
    ],
    cta: 'PDF frigo gratuit en bio',
    hashtags: ['jambes', 'circulation', 'exercice', 'mollets', 'sante'],
    type: 'normal'
  },
  {
    id: 'reel-bpco-1',
    slug: 'bpco',
    hook: 'Essoufflé(e) ? Cette technique vous calme en 30 sec',
    points: [
      'Inspirez par le nez',
      'Expirez lentement, lèvres pincées',
      'Comme si vous souffliez dans une paille'
    ],
    cta: 'PDF frigo gratuit en bio',
    hashtags: ['bpco', 'respiration', 'souffle', 'technique', 'calme'],
    type: 'normal'
  },
  {
    id: 'reel-bpco-2',
    slug: 'bpco',
    hook: 'Vous n\'osez plus marcher à cause de l\'essoufflement ?',
    points: [
      'L\'essoufflement n\'est pas dangereux',
      'Marchez à votre rythme avec des pauses',
      'Chaque pas renforce vos poumons'
    ],
    cta: 'PDF frigo gratuit en bio',
    hashtags: ['bpco', 'marche', 'courage', 'petitspas', 'poumons'],
    type: 'anti-decouragement'
  },
  {
    id: 'reel-otites-1',
    slug: 'otites-enfants',
    hook: 'Votre enfant a tout le temps des otites ?',
    points: [
      'Lavez le nez 2x par jour',
      'Évitez le tabac passif',
      'Ça s\'améliore souvent vers 3-4 ans'
    ],
    cta: 'PDF frigo gratuit en bio',
    hashtags: ['otite', 'enfant', 'parent', 'conseil', 'prevention'],
    type: 'normal'
  }
];

// ============================================
// 12 CARROUSELS (6 slides chacun)
// ============================================
export const carrousels12: Carousel[] = [
  {
    id: 'carousel-arthrose-1',
    slug: 'arthrose',
    slides: [
      { title: 'Arthrose : ce qui aide vraiment', content: '5 actions simples validées par la science' },
      { title: '1. Bougez chaque jour', content: 'Même 10 min de marche. L\'exercice est le traitement n°1.' },
      { title: '2. Renforcez en douceur', content: 'Flexions, extensions, squats légers. Adaptez à votre niveau.' },
      { title: '3. Gérez votre poids', content: 'Chaque kilo en moins soulage vos articulations.' },
      { title: '4. N\'ayez pas peur', content: 'La douleur ne veut pas dire que vous vous abîmez.' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/arthrose' }
    ],
    hashtags: ['arthrose', 'exercice', 'sante', 'conseil', 'senior'],
    type: 'normal'
  },
  {
    id: 'carousel-arthrose-2',
    slug: 'arthrose',
    slides: [
      { title: 'Arthrose : plan 7 jours niveau facile', content: 'Pour reprendre en douceur' },
      { title: 'Jour 1-2', content: '5 min de marche + 5 flexions douces assis' },
      { title: 'Jour 3-4', content: '7 min de marche + 10 répétitions + étirements' },
      { title: 'Jour 5-6', content: '10 min de marche + 15 répétitions + auto-massage' },
      { title: 'Jour 7', content: 'Bilan : notez douleur et fatigue. Planifiez la suite.' },
      { title: '📄 Téléchargez le plan complet', content: 'PDF frigo gratuit sur etuve.fr/pathologies/arthrose' }
    ],
    hashtags: ['arthrose', 'programme', 'exercice', '7jours', 'senior'],
    type: 'normal'
  },
  {
    id: 'carousel-arthrose-3',
    slug: 'arthrose',
    slides: [
      { title: 'Vous n\'y arrivez pas ? C\'est normal', content: 'L\'important c\'est de commencer, pas d\'être parfait' },
      { title: 'Commencez petit', content: '2 min de marche, c\'est déjà un succès' },
      { title: 'Pas de culpabilité', content: 'Les mauvais jours font partie du parcours' },
      { title: 'Chaque geste compte', content: 'Même 3 flexions, c\'est mieux que rien' },
      { title: 'Soyez patient(e)', content: 'Les progrès prennent des semaines, pas des jours' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/arthrose' }
    ],
    hashtags: ['arthrose', 'motivation', 'petitspas', 'courage', 'senior'],
    type: 'anti-decouragement'
  },
  {
    id: 'carousel-lombalgie-1',
    slug: 'lombalgie-chronique',
    slides: [
      { title: 'Mal de dos : les 5 erreurs à éviter', content: 'Ce qui aggrave souvent la douleur' },
      { title: '❌ Rester au lit', content: 'Le repos prolongé raidit les muscles et aggrave la douleur' },
      { title: '❌ Avoir peur de bouger', content: 'Votre dos est solide, bougez progressivement' },
      { title: '❌ Attendre que ça passe', content: 'L\'exercice actif aide plus que l\'attente' },
      { title: '❌ Forcer trop vite', content: 'Progression lente = résultats durables' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/lombalgie-chronique' }
    ],
    hashtags: ['maldedos', 'lombalgie', 'erreurs', 'conseil', 'sante'],
    type: 'normal'
  },
  {
    id: 'carousel-lombalgie-2',
    slug: 'lombalgie-chronique',
    slides: [
      { title: 'Gainage pour débutants', content: 'Renforcez votre dos sans vous faire mal' },
      { title: 'Position de départ', content: 'Sur les coudes et les genoux (pas les pieds)' },
      { title: 'Commencez par 10 sec', content: 'C\'est suffisant pour débuter' },
      { title: 'Respirez normalement', content: 'Ne bloquez pas votre respiration' },
      { title: 'Ajoutez 5 sec/semaine', content: 'Progression lente = progression sûre' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/lombalgie-chronique' }
    ],
    hashtags: ['gainage', 'dos', 'exercice', 'debutant', 'renforcement'],
    type: 'normal'
  },
  {
    id: 'carousel-lombalgie-3',
    slug: 'lombalgie-chronique',
    slides: [
      { title: 'Trop mal pour bouger ? Voici quoi faire', content: 'Des solutions pour les jours difficiles' },
      { title: 'Position antalgique', content: 'Allongé, genoux pliés, coussin sous les genoux' },
      { title: 'Respiration abdominale', content: '3 min de respiration lente par le ventre' },
      { title: 'Micro-mouvements', content: 'Bascule douce du bassin, allongé, sans forcer' },
      { title: 'Patience', content: 'Les mauvais jours passent. Demain sera peut-être mieux.' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/lombalgie-chronique' }
    ],
    hashtags: ['maldedos', 'douleur', 'soulagement', 'petitspas', 'courage'],
    type: 'anti-decouragement'
  },
  {
    id: 'carousel-veines-1',
    slug: 'insuffisance-veineuse-chronique',
    slides: [
      { title: 'Jambes lourdes : routine quotidienne', content: '5 gestes simples pour soulager' },
      { title: '1. Marchez 15 min', content: 'La pompe du mollet active la circulation' },
      { title: '2. Exercice mollets', content: '15 montées sur pointes, 2x/jour' },
      { title: '3. Surélevez les jambes', content: '10 min le soir, jambes au-dessus du cœur' },
      { title: '4. Douche fraîche', content: 'Eau fraîche de bas en haut, 1 min' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/insuffisance-veineuse-chronique' }
    ],
    hashtags: ['jambes', 'circulation', 'routine', 'exercice', 'sante'],
    type: 'normal'
  },
  {
    id: 'carousel-veines-2',
    slug: 'insuffisance-veineuse-chronique',
    slides: [
      { title: 'Trop fatigué(e) pour marcher ?', content: 'Des alternatives qui fonctionnent' },
      { title: 'Exercices assis', content: 'Faites la pompe du mollet sur votre chaise' },
      { title: 'Jambes surélevées', content: '10 min devant la télé, c\'est efficace' },
      { title: 'Auto-massage', content: 'De la cheville vers le genou, doucement' },
      { title: 'C\'est déjà bien', content: 'Faites ce que vous pouvez, c\'est suffisant' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/insuffisance-veineuse-chronique' }
    ],
    hashtags: ['jambes', 'fatigue', 'petitspas', 'repos', 'sante'],
    type: 'anti-decouragement'
  },
  {
    id: 'carousel-bpco-1',
    slug: 'bpco',
    slides: [
      { title: 'BPCO : les 4 piliers du traitement', content: 'Ce qui aide vraiment au quotidien' },
      { title: '1. Arrêt du tabac', content: 'C\'est l\'action n°1. Les bénéfices sont immédiats.' },
      { title: '2. Activité physique', content: 'Marche fractionnée, à votre rythme, avec pauses' },
      { title: '3. Respiration lèvres pincées', content: 'Technique simple pour calmer l\'essoufflement' },
      { title: '4. Vaccinations à jour', content: 'Grippe, COVID, pneumocoque : ça protège' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/bpco' }
    ],
    hashtags: ['bpco', 'poumons', 'respiration', 'tabac', 'sante'],
    type: 'normal'
  },
  {
    id: 'carousel-bpco-2',
    slug: 'bpco',
    slides: [
      { title: 'Essoufflé(e) ? Voici comment gérer', content: 'Techniques pour les moments difficiles' },
      { title: 'Arrêtez-vous', content: 'Faites une pause, c\'est normal' },
      { title: 'Lèvres pincées', content: 'Expirez lentement comme dans une paille' },
      { title: 'Position penchée', content: 'Mains sur les cuisses, ça aide à récupérer' },
      { title: 'N\'ayez pas peur', content: 'L\'essoufflement n\'est pas dangereux' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/bpco' }
    ],
    hashtags: ['bpco', 'essoufflement', 'respiration', 'calme', 'technique'],
    type: 'anti-decouragement'
  },
  {
    id: 'carousel-otites-1',
    slug: 'otites-enfants',
    slides: [
      { title: 'Otites à répétition : prévention', content: 'Les gestes qui réduisent les risques' },
      { title: '1. Lavage de nez', content: 'Sérum physiologique 2x/jour, c\'est le geste clé' },
      { title: '2. Zéro tabac passif', content: 'La fumée irrite les voies respiratoires' },
      { title: '3. Allaitement si possible', content: 'Protège le système immunitaire' },
      { title: '4. Patience', content: 'Ça s\'améliore souvent vers 3-4 ans' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/otites-enfants' }
    ],
    hashtags: ['otite', 'enfant', 'prevention', 'parent', 'conseil'],
    type: 'normal'
  },
  {
    id: 'carousel-otites-2',
    slug: 'otites-enfants',
    slides: [
      { title: 'Votre enfant a encore une otite ?', content: 'Vous n\'y êtes pour rien' },
      { title: 'C\'est fréquent', content: 'Les otites à répétition touchent beaucoup d\'enfants' },
      { title: 'Pas de culpabilité', content: 'Ce n\'est pas un manque d\'hygiène' },
      { title: 'La crèche, c\'est normal', content: 'Les enfants en collectivité sont plus exposés' },
      { title: 'Ça va s\'améliorer', content: 'Le système immunitaire se renforce avec l\'âge' },
      { title: '📄 PDF frigo gratuit', content: 'etuve.fr/pathologies/otites-enfants' }
    ],
    hashtags: ['otite', 'parent', 'culpabilite', 'soutien', 'courage'],
    type: 'anti-decouragement'
  }
];

// ============================================
// HELPERS
// ============================================

export const getPostsBySlug = (slug: string): SocialPost[] => {
  return posts30.filter(post => post.slug === slug);
};

export const getReelsBySlug = (slug: string): ReelScript[] => {
  return reels8.filter(reel => reel.slug === slug);
};

export const getCarouselsBySlug = (slug: string): Carousel[] => {
  return carrousels12.filter(carousel => carousel.slug === slug);
};

export const getAllSlugsWithContent = (): string[] => {
  const slugs = new Set<string>();
  posts30.forEach(p => slugs.add(p.slug));
  reels8.forEach(r => slugs.add(r.slug));
  carrousels12.forEach(c => slugs.add(c.slug));
  return Array.from(slugs);
};
