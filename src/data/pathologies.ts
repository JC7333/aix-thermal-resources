export type PathologyCategory = 'rhumatologie' | 'veino-lymphatique' | 'orl-respiratoire' | 'muqueuses-buccales';
export type ResourceType = 'comprendre' | 'bouger' | 'nutrition' | 'hygiene' | 'auto-soins' | 'consulter' | 'exercices';
export type AudienceType = 'senior' | 'enfant' | 'adulte';

export interface Exercise {
  id: string;
  title: string;
  description: string;
  duration: string;
  frequency: string;
  icon: string;
  steps: string[];
}

export interface Pathology {
  id: string;
  slug: string;
  name: string;
  category: PathologyCategory;
  shortDescription: string;
  definition: string;
  physiopathology: string;
  symptoms: string[];
  aggravatingFactors: string[];
  helpfulFactors: string[];
  nonMedicinalTreatments: {
    physicalActivity: string;
    posturalAdvice: string;
    lifestyle: string;
    sleep: string;
    stressManagement: string;
    thermalism: string;
  };
  exercises: Exercise[];
  nutritionAdvice: string[];
  alertSigns: string[];
  audience: AudienceType;
  readingTime: number;
  pdfUrl?: string;
}

export interface Resource {
  id: string;
  pathologyId: string;
  title: string;
  summary: string;
  type: ResourceType;
  audience: AudienceType;
  readingTime: number;
  pdfUrl?: string;
}

export const categoryLabels: Record<PathologyCategory, string> = {
  'rhumatologie': 'Rhumatologie',
  'veino-lymphatique': 'Veino-lymphatique',
  'orl-respiratoire': 'ORL & Respiratoire',
  'muqueuses-buccales': 'Muqueuses buccales',
};

export const categoryColors: Record<PathologyCategory, string> = {
  'rhumatologie': 'category-rhuma',
  'veino-lymphatique': 'category-veino',
  'orl-respiratoire': 'category-orl',
  'muqueuses-buccales': 'category-buccal',
};

export const categoryIcons: Record<PathologyCategory, string> = {
  'rhumatologie': '🦴',
  'veino-lymphatique': '🩸',
  'orl-respiratoire': '🫁',
  'muqueuses-buccales': '👄',
};

export const resourceTypeLabels: Record<ResourceType, string> = {
  'comprendre': 'Comprendre',
  'bouger': 'Bouger',
  'nutrition': 'Nutrition',
  'hygiene': 'Hygiène de vie',
  'auto-soins': 'Auto-soins',
  'consulter': 'Quand consulter',
  'exercices': 'Exercices illustrés',
};

export const audienceLabels: Record<AudienceType, string> = {
  'senior': 'Seniors',
  'enfant': 'Enfants',
  'adulte': 'Adultes',
};

// Pathologies complètes
export const pathologies: Pathology[] = [
  {
    id: 'arthrose',
    slug: 'arthrose',
    name: 'Arthrose',
    category: 'rhumatologie',
    shortDescription: 'Usure progressive du cartilage articulaire, source de douleurs et de raideur.',
    definition: "L'arthrose est une maladie articulaire caractérisée par la dégradation progressive du cartilage. Elle touche principalement les genoux, hanches, mains et colonne vertébrale. C'est la maladie articulaire la plus fréquente.",
    physiopathology: "Le cartilage, normalement lisse et élastique, s'amincit progressivement. L'os sous-jacent réagit en formant des excroissances (ostéophytes). L'articulation devient douloureuse et raide, surtout après l'immobilité.",
    symptoms: [
      'Douleur mécanique (à l\'effort, diminuée au repos)',
      'Raideur matinale de moins de 30 minutes',
      'Craquements articulaires',
      'Gonflement occasionnel',
      'Perte progressive de mobilité',
    ],
    aggravatingFactors: [
      'Surpoids',
      'Sédentarité prolongée',
      'Traumatismes articulaires répétés',
      'Efforts excessifs',
      'Temps froid et humide (ressenti)',
    ],
    helpfulFactors: [
      'Activité physique régulière et adaptée',
      'Maintien d\'un poids santé',
      'Chaleur locale',
      'Mouvements doux réguliers',
      'Cure thermale',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'Marche quotidienne 30 minutes, natation, vélo d\'appartement. Éviter les sports à impact. L\'activité entretient le cartilage et renforce les muscles protecteurs.',
      posturalAdvice: 'Éviter les positions prolongées (assis ou debout). Alterner les positions. Utiliser une canne côté opposé si besoin.',
      lifestyle: 'Adapter son domicile (rehausseur WC, poignées). Porter des chaussures confortables à semelles souples.',
      sleep: 'Matelas ferme mais confortable. Coussin entre les genoux en position latérale. Éviter le décubitus ventral.',
      stressManagement: 'Le stress augmente la perception de la douleur. Relaxation, respiration abdominale, activités plaisantes.',
      thermalism: 'Les cures thermales à orientation rhumatologique (3 semaines) peuvent améliorer les douleurs et la mobilité pendant plusieurs mois. Les soins (bains, boue, douches) combinent chaleur, apesanteur et massages.',
    },
    exercises: [
      {
        id: 'ex-arthrose-1',
        title: 'Flexion-extension du genou',
        description: 'Renforce le quadriceps et améliore la mobilité',
        duration: '5 minutes',
        frequency: '2 fois par jour',
        icon: '🦵',
        steps: [
          'Assis sur une chaise, dos droit',
          'Tendez lentement la jambe devant vous',
          'Maintenez 5 secondes',
          'Redescendez doucement',
          '10 répétitions par jambe',
        ],
      },
      {
        id: 'ex-arthrose-2',
        title: 'Renforcement des fessiers',
        description: 'Stabilise la hanche et soulage le genou',
        duration: '5 minutes',
        frequency: '1 fois par jour',
        icon: '🏃',
        steps: [
          'Debout, tenez-vous au dossier d\'une chaise',
          'Levez la jambe en arrière, genou tendu',
          'Ne cambrez pas le dos',
          'Maintenez 3 secondes',
          '10 répétitions par côté',
        ],
      },
      {
        id: 'ex-arthrose-3',
        title: 'Mobilisation douce de la hanche',
        description: 'Entretient la souplesse articulaire',
        duration: '3 minutes',
        frequency: '2 fois par jour',
        icon: '🔄',
        steps: [
          'Couché sur le dos',
          'Ramenez un genou vers la poitrine',
          'Faites de petits cercles avec le genou',
          'Changez de sens',
          '30 secondes par jambe',
        ],
      },
    ],
    nutritionAdvice: [
      'Privilégier les aliments anti-inflammatoires : poissons gras (saumon, sardines), huile d\'olive, noix',
      'Consommer fruits et légumes colorés (antioxydants)',
      'Maintenir un apport protéique suffisant (1g/kg/jour) pour préserver la masse musculaire',
      'Hydratation : 1,5L d\'eau par jour minimum',
      'Limiter sucres rapides et aliments ultra-transformés',
      'Éviter les régimes restrictifs sans avis médical',
    ],
    alertSigns: [
      'Douleur brutale et intense inhabituelle',
      'Articulation très gonflée, rouge et chaude',
      'Fièvre associée',
      'Blocage articulaire complet',
      'Perte de force brutale d\'un membre',
    ],
    audience: 'senior',
    readingTime: 8,
  },
  {
    id: 'lombalgie-chronique',
    slug: 'lombalgie-chronique',
    name: 'Lombalgie chronique',
    category: 'rhumatologie',
    shortDescription: 'Douleur du bas du dos persistant plus de 3 mois, souvent liée au mode de vie.',
    definition: "La lombalgie chronique est une douleur du bas du dos (lombaires) qui persiste plus de 3 mois. Dans la grande majorité des cas, elle est dite 'commune' (sans cause grave identifiée) et répond bien aux mesures non médicamenteuses.",
    physiopathology: "Les muscles, ligaments et disques de la région lombaire sont sollicités en permanence. Une sédentarité excessive, des contraintes répétées ou le stress peuvent créer des tensions et contractures. Le repos prolongé aggrave souvent la situation en affaiblissant les muscles stabilisateurs.",
    symptoms: [
      'Douleur lombaire (bas du dos)',
      'Raideur au réveil',
      'Difficulté à rester longtemps assis ou debout',
      'Irradiation possible vers les fesses ou cuisses',
      'Aggravation par certains mouvements',
    ],
    aggravatingFactors: [
      'Position assise prolongée',
      'Port de charges lourdes mal réalisé',
      'Stress et tensions psychologiques',
      'Inactivité physique',
      'Surpoids',
    ],
    helpfulFactors: [
      'Activité physique régulière',
      'Renforcement musculaire du tronc (gainage)',
      'Gestion du stress',
      'Mobilité régulière',
      'Cure thermale',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'La reprise d\'activité est le traitement principal. Marche, natation, yoga doux, vélo. Le mouvement nourrit les disques et renforce les muscles.',
      posturalAdvice: 'Lever les charges jambes fléchies. Éviter de rester assis plus d\'1h sans bouger. Bureau : écran à hauteur des yeux, pieds à plat.',
      lifestyle: 'Alterner les positions. Se lever régulièrement. Matelas ni trop dur ni trop mou. Éviter le port de talons hauts.',
      sleep: 'Position sur le côté avec coussin entre les genoux. Ou sur le dos avec coussin sous les genoux. Éviter le ventre.',
      stressManagement: 'Le stress contracte les muscles du dos. Techniques de relaxation, cohérence cardiaque, activités plaisantes essentielles.',
      thermalism: 'Les cures thermales permettent une prise en charge globale : soins locaux (boue, bains), rééducation en piscine, éducation thérapeutique. Efficacité démontrée sur la douleur et la qualité de vie.',
    },
    exercises: [
      {
        id: 'ex-lombalgie-1',
        title: 'Chat-vache (mobilisation)',
        description: 'Assouplit la colonne vertébrale en douceur',
        duration: '3 minutes',
        frequency: '2 fois par jour',
        icon: '🐱',
        steps: [
          'À quatre pattes, dos plat',
          'Inspirez en creusant le dos (tête vers le haut)',
          'Expirez en arrondissant le dos (tête vers le bas)',
          'Mouvements lents et fluides',
          '10 répétitions',
        ],
      },
      {
        id: 'ex-lombalgie-2',
        title: 'Gainage ventral adapté',
        description: 'Renforce les muscles profonds du tronc',
        duration: '5 minutes',
        frequency: '1 fois par jour',
        icon: '💪',
        steps: [
          'Sur les avant-bras et les genoux (débutant) ou pieds (confirmé)',
          'Corps aligné, nombril rentré',
          'Ne creusez pas le dos',
          'Maintenez 20-30 secondes',
          'Repos, puis 3 répétitions',
        ],
      },
      {
        id: 'ex-lombalgie-3',
        title: 'Étirement du psoas',
        description: 'Relâche les tensions de la hanche',
        duration: '3 minutes',
        frequency: '1 fois par jour',
        icon: '🧘',
        steps: [
          'Un genou au sol, l\'autre pied devant',
          'Avancez doucement le bassin',
          'Gardez le dos droit',
          'Maintenez 30 secondes',
          'Changez de côté',
        ],
      },
      {
        id: 'ex-lombalgie-4',
        title: 'Pont fessier',
        description: 'Renforce fessiers et stabilise le bassin',
        duration: '5 minutes',
        frequency: '1 fois par jour',
        icon: '🌉',
        steps: [
          'Couché sur le dos, genoux fléchis',
          'Soulevez les fesses du sol',
          'Alignez genoux-bassin-épaules',
          'Maintenez 5 secondes',
          '10 répétitions',
        ],
      },
    ],
    nutritionAdvice: [
      'Alimentation anti-inflammatoire : légumes verts, fruits rouges, poissons gras',
      'Protéines suffisantes pour la masse musculaire',
      'Calcium et vitamine D pour la santé osseuse',
      'Hydratation importante (disques intervertébraux)',
      'Éviter l\'excès de poids qui surcharge les lombaires',
    ],
    alertSigns: [
      'Douleur brutale après un effort violent',
      'Perte de contrôle des urines ou selles',
      'Perte de sensibilité de la zone périnéale',
      'Faiblesse progressive des jambes',
      'Douleur nocturne intense qui réveille',
      'Fièvre associée',
    ],
    audience: 'adulte',
    readingTime: 8,
  },
  {
    id: 'insuffisance-veineuse',
    slug: 'insuffisance-veineuse',
    name: 'Insuffisance veineuse',
    category: 'veino-lymphatique',
    shortDescription: 'Mauvais retour veineux des jambes, source de lourdeur et gonflement.',
    definition: "L'insuffisance veineuse chronique désigne un mauvais fonctionnement des veines des jambes qui peinent à ramener le sang vers le cœur. Elle se manifeste par une sensation de jambes lourdes, des gonflements et parfois des varices.",
    physiopathology: "Les veines des jambes contiennent des valvules qui empêchent le sang de redescendre. Quand ces valvules fonctionnent mal, le sang stagne dans les veines, les dilate, et provoque les symptômes. La position debout prolongée et le manque d'activité aggravent le phénomène.",
    symptoms: [
      'Jambes lourdes, surtout en fin de journée',
      'Gonflements des chevilles',
      'Varices visibles',
      'Impatiences, picotements',
      'Crampes nocturnes',
      'Peau sèche, eczéma veineux (stades avancés)',
    ],
    aggravatingFactors: [
      'Station debout ou assise prolongée',
      'Chaleur (été, bains chauds)',
      'Surpoids',
      'Sédentarité',
      'Vêtements trop serrés',
      'Grossesse',
    ],
    helpfulFactors: [
      'Marche régulière',
      'Surélévation des jambes',
      'Bas de contention',
      'Eau fraîche sur les jambes',
      'Cure thermale',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'La marche est le meilleur traitement. À chaque pas, les muscles du mollet propulsent le sang vers le haut. 30 minutes de marche quotidienne minimum. Natation et vélo également bénéfiques.',
      posturalAdvice: 'Éviter de croiser les jambes. Se lever et marcher toutes les heures si assis. Surélever les pieds du lit de 10-15 cm.',
      lifestyle: 'Éviter les vêtements serrés à la taille ou aux cuisses. Préférer les chaussures à petits talons (3-4 cm). Terminer la douche par un jet d\'eau fraîche sur les jambes.',
      sleep: 'Surélever les pieds du lit (cales de 10-15 cm). Éviter les couettes trop chaudes.',
      stressManagement: 'Le stress peut aggraver les symptômes par tension musculaire. Relaxation bénéfique.',
      thermalism: 'Les cures à orientation phlébologique proposent des soins spécifiques : bains frais, massages sous l\'eau, parcours de marche. Amélioration durable de la circulation veineuse.',
    },
    exercises: [
      {
        id: 'ex-veines-1',
        title: 'Flexion-extension des pieds',
        description: 'Active la pompe musculaire du mollet',
        duration: '2 minutes',
        frequency: '5 fois par jour',
        icon: '🦶',
        steps: [
          'Assis ou couché',
          'Pointes de pieds vers vous, puis vers le sol',
          'Mouvements amples et lents',
          '20 répétitions',
        ],
      },
      {
        id: 'ex-veines-2',
        title: 'Montées sur pointes',
        description: 'Renforce les mollets et stimule le retour veineux',
        duration: '3 minutes',
        frequency: '2 fois par jour',
        icon: '⬆️',
        steps: [
          'Debout, tenez-vous au mur',
          'Montez sur la pointe des pieds',
          'Maintenez 3 secondes',
          'Redescendez doucement',
          '15 répétitions',
        ],
      },
      {
        id: 'ex-veines-3',
        title: 'Pédalage en l\'air',
        description: 'Draine les jambes et active la circulation',
        duration: '3 minutes',
        frequency: '1 fois par jour (le soir)',
        icon: '🚴',
        steps: [
          'Couché sur le dos',
          'Jambes en l\'air',
          'Pédalez comme à vélo',
          '30 secondes, repos, répéter 3 fois',
        ],
      },
    ],
    nutritionAdvice: [
      'Fruits rouges (myrtilles, cassis) : renforcent les parois veineuses',
      'Vitamine C (agrumes, kiwi) : synthèse du collagène',
      'Limiter le sel : réduit la rétention d\'eau',
      'Hydratation suffisante : 1,5L d\'eau par jour',
      'Fibres : évitent la constipation qui gêne le retour veineux',
    ],
    alertSigns: [
      'Mollet rouge, chaud, douloureux et gonflé (phlébite)',
      'Douleur thoracique ou essoufflement brutal',
      'Ulcère de jambe qui ne cicatrise pas',
      'Saignement d\'une varice',
      'Durcissement douloureux sur le trajet d\'une veine',
    ],
    audience: 'senior',
    readingTime: 7,
  },
  {
    id: 'angines-repetition-enfant',
    slug: 'angines-repetition-enfant',
    name: 'Angines à répétition (enfant)',
    category: 'orl-respiratoire',
    shortDescription: 'Infections répétées de la gorge chez l\'enfant, souvent virales.',
    definition: "Les angines à répétition désignent la survenue fréquente (plus de 3 à 5 par an) d'infections de la gorge (pharynx et amygdales) chez l'enfant. La plupart sont d'origine virale, mais certaines sont bactériennes et nécessitent un traitement adapté.",
    physiopathology: "Les amygdales sont des organes de défense immunitaire très sollicités chez l'enfant. Leur inflammation répétée traduit souvent un système immunitaire en maturation. La collectivité (crèche, école) favorise la transmission des virus.",
    symptoms: [
      'Mal de gorge, difficulté à avaler',
      'Fièvre',
      'Fatigue',
      'Ganglions du cou gonflés',
      'Parfois : maux de tête, douleurs abdominales',
    ],
    aggravatingFactors: [
      'Collectivité (crèche, école)',
      'Tabagisme passif',
      'Pollution intérieure',
      'Reflux gastro-œsophagien',
      'Déficit en fer ou vitamines',
    ],
    helpfulFactors: [
      'Aération régulière des pièces',
      'Lavage des mains fréquent',
      'Humidification de l\'air en hiver',
      'Alimentation équilibrée',
      'Cure thermale ORL',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'L\'activité physique modérée renforce l\'immunité. Éviter le sport en phase aiguë de l\'angine. Reprendre progressivement après guérison.',
      posturalAdvice: 'Surélever légèrement la tête du lit si reflux. Éviter de forcer sur la voix en phase d\'angine.',
      lifestyle: 'Aérer la chambre 10 min/jour. Éviter la surchauffe (19°C). Ne pas exposer l\'enfant au tabagisme passif. Lavage de nez au sérum physiologique régulier.',
      sleep: 'Repos important pendant l\'épisode aigu. Veiller à une bonne qualité de sommeil habituelle (10-12h selon l\'âge).',
      stressManagement: 'Rythme de vie régulier. Temps de jeu et de détente. Éviter la surcharge d\'activités.',
      thermalism: 'Les cures thermales ORL peuvent réduire la fréquence des épisodes infectieux. Soins locaux (gargarismes, aérosols) et eau thermale ont un effet apaisant et anti-infectieux modéré.',
    },
    exercises: [
      {
        id: 'ex-angine-1',
        title: 'Lavage de nez au sérum physiologique',
        description: 'Nettoie les voies respiratoires supérieures',
        duration: '2 minutes',
        frequency: '1 à 2 fois par jour',
        icon: '💧',
        steps: [
          'Incliner la tête de l\'enfant sur le côté',
          'Injecter doucement le sérum dans la narine supérieure',
          'Le liquide ressort par l\'autre narine',
          'Moucher doucement',
          'Répéter de l\'autre côté',
        ],
      },
      {
        id: 'ex-angine-2',
        title: 'Gargarismes à l\'eau salée (enfants > 6 ans)',
        description: 'Apaise la gorge et limite l\'infection',
        duration: '1 minute',
        frequency: '2 à 3 fois par jour en épisode',
        icon: '🧂',
        steps: [
          'Mélanger 1/2 cuillère à café de sel dans un verre d\'eau tiède',
          'L\'enfant prend une gorgée',
          'Tête en arrière, gargariser 10-15 secondes',
          'Cracher (ne pas avaler)',
          'Répéter 2-3 fois',
        ],
      },
    ],
    nutritionAdvice: [
      'Alimentation équilibrée et variée',
      'Fruits et légumes riches en vitamine C (agrumes, kiwi)',
      'Aliments mous et tièdes en cas d\'angine (compotes, soupes)',
      'Hydratation importante',
      'Miel (> 1 an) peut apaiser la gorge',
      'Éviter les boissons acides irritantes',
    ],
    alertSigns: [
      'Fièvre très élevée (> 39°C) persistante',
      'Difficulté importante à avaler (bave)',
      'Difficultés respiratoires',
      'Abcès visible près de l\'amygdale',
      'Raideur de nuque',
      'Éruption cutanée associée',
    ],
    audience: 'enfant',
    readingTime: 6,
  },
  {
    id: 'sciatique-chronique',
    slug: 'sciatique-chronique',
    name: 'Sciatique chronique',
    category: 'rhumatologie',
    shortDescription: 'Douleur irradiant dans la jambe, souvent liée à une irritation du nerf sciatique.',
    definition: "La sciatique chronique est une douleur qui suit le trajet du nerf sciatique, partant du bas du dos et irradiant dans la fesse et la jambe. On parle de chronicité au-delà de 3 mois. Elle est souvent liée à une hernie discale ou une arthrose lombaire.",
    physiopathology: "Le nerf sciatique peut être comprimé ou irrité au niveau lombaire (hernie discale, arthrose, sténose du canal). L'inflammation locale provoque la douleur qui suit le trajet du nerf. Les tensions musculaires peuvent aggraver la compression.",
    symptoms: [
      'Douleur lombaire irradiant dans la fesse et la jambe',
      'Trajet précis (arrière ou côté de la cuisse/mollet)',
      'Sensations de fourmillements ou engourdissements',
      'Douleur aggravée par la toux, l\'effort',
      'Parfois faiblesse musculaire du pied ou de la jambe',
    ],
    aggravatingFactors: [
      'Position assise prolongée',
      'Port de charges lourdes',
      'Mouvements de torsion du dos',
      'Sédentarité',
      'Surpoids',
    ],
    helpfulFactors: [
      'Activité physique adaptée',
      'Étirements doux',
      'Maintien de la mobilité',
      'Éviter le repos strict au lit',
      'Cure thermale',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'Marche quotidienne (commencer par 10 min, augmenter progressivement). Natation sur le dos. Éviter les sports à impact.',
      posturalAdvice: 'Éviter de soulever des charges. Si nécessaire : fléchir les genoux, garder la charge près du corps. Varier les positions.',
      lifestyle: 'Éviter les longues périodes assises. Se lever régulièrement. Siège adapté avec soutien lombaire.',
      sleep: 'Position fœtale (sur le côté, genoux fléchis) souvent la plus confortable. Matelas ferme mais pas dur.',
      stressManagement: 'Le stress contracte les muscles et augmente la douleur. Relaxation et activités plaisantes importantes.',
      thermalism: 'Cures à orientation rhumatologique. Soins en piscine (mobilisation sans gravité), boue chaude, massages. Amélioration de la douleur et de la fonction.',
    },
    exercises: [
      {
        id: 'ex-sciatique-1',
        title: 'Étirement du piriforme',
        description: 'Relâche un muscle souvent impliqué dans la sciatique',
        duration: '3 minutes',
        frequency: '2 fois par jour',
        icon: '🧘',
        steps: [
          'Couché sur le dos',
          'Croisez la cheville droite sur le genou gauche',
          'Tirez le genou gauche vers la poitrine',
          'Maintenez 30 secondes, respirez',
          'Changez de côté',
        ],
      },
      {
        id: 'ex-sciatique-2',
        title: 'Genoux-poitrine',
        description: 'Étire doucement la région lombaire',
        duration: '2 minutes',
        frequency: '2 fois par jour',
        icon: '🔄',
        steps: [
          'Couché sur le dos',
          'Ramenez les deux genoux vers la poitrine',
          'Entourez-les de vos bras',
          'Balancez doucement de droite à gauche',
          'Maintenez 30 secondes',
        ],
      },
      {
        id: 'ex-sciatique-3',
        title: 'Extension lombaire (McKenzie)',
        description: 'Peut soulager certaines sciatiques discales',
        duration: '5 minutes',
        frequency: '3-4 fois par jour',
        icon: '⬆️',
        steps: [
          'Couché sur le ventre',
          'Placez les mains sous les épaules',
          'Relevez lentement le buste en gardant le bassin au sol',
          'Maintenez 10 secondes',
          'Redescendez. 10 répétitions',
        ],
      },
    ],
    nutritionAdvice: [
      'Alimentation anti-inflammatoire',
      'Oméga-3 (poissons gras, noix)',
      'Curcuma et gingembre (anti-inflammatoires naturels modérés)',
      'Éviter le surpoids',
      'Hydratation importante',
    ],
    alertSigns: [
      'Paralysie du pied ("pied qui tombe")',
      'Perte de sensibilité importante',
      'Troubles urinaires ou du contrôle des selles',
      'Perte de sensibilité de la région périnéale',
      'Douleur nocturne insomniante intense',
    ],
    audience: 'adulte',
    readingTime: 7,
  },
  {
    id: 'insuffisance-lymphatique',
    slug: 'insuffisance-lymphatique',
    name: 'Insuffisance lymphatique',
    category: 'veino-lymphatique',
    shortDescription: 'Gonflement par accumulation de lymphe, souvent aux membres inférieurs.',
    definition: "L'insuffisance lymphatique (ou lymphœdème) se caractérise par une accumulation de lymphe dans les tissus, provoquant un gonflement persistant. Elle touche souvent les jambes, parfois les bras (notamment après chirurgie du cancer du sein).",
    physiopathology: "Le système lymphatique draine les liquides des tissus vers le sang. Lorsqu'il fonctionne mal (malformation, obstruction, séquelles chirurgicales), la lymphe stagne et provoque un œdème particulier, ferme et peu douloureux.",
    symptoms: [
      'Gonflement persistant d\'un membre',
      'Sensation de lourdeur et tension',
      'Peau épaissie, moins souple',
      'Plis cutanés moins marqués',
      'Signe du godet (marque persistante après pression)',
    ],
    aggravatingFactors: [
      'Chaleur',
      'Position debout ou assise prolongée',
      'Infections cutanées (érysipèle)',
      'Voyages en avion prolongés',
      'Traumatismes',
    ],
    helpfulFactors: [
      'Drainage lymphatique manuel',
      'Compression (bandages, bas)',
      'Surélévation du membre',
      'Activité physique adaptée',
      'Cure thermale',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'Marche, natation, vélo (muscles propulsent la lymphe). Éviter les efforts violents et les traumatismes du membre atteint.',
      posturalAdvice: 'Surélévation du membre atteint au repos. Éviter les positions immobiles prolongées.',
      lifestyle: 'Soins cutanés rigoureux pour éviter les infections. Éviter les prises de sang et la tension sur le membre atteint.',
      sleep: 'Surélever le membre pendant la nuit (coussin, cale).',
      stressManagement: 'Le stress peut aggraver l\'inflammation. Relaxation bénéfique.',
      thermalism: 'Cures spécialisées en lymphologie. Soins d\'eau (bains, douches), drainage, éducation. Amélioration du volume et de la qualité de vie.',
    },
    exercises: [
      {
        id: 'ex-lymph-1',
        title: 'Respiration abdominale',
        description: 'Active le pompage lymphatique central',
        duration: '5 minutes',
        frequency: '2 fois par jour',
        icon: '🌬️',
        steps: [
          'Couché sur le dos, genoux fléchis',
          'Main sur le ventre',
          'Inspirez en gonflant le ventre',
          'Expirez en rentrant le ventre',
          'Lentement, 10 cycles',
        ],
      },
      {
        id: 'ex-lymph-2',
        title: 'Auto-drainage simplifié',
        description: 'Stimule la circulation lymphatique',
        duration: '5 minutes',
        frequency: '1 fois par jour',
        icon: '✋',
        steps: [
          'Effleurages légers du membre gonflé',
          'Toujours vers la racine du membre (cuisse vers aine)',
          'Mouvements doux et lents',
          'Pas de pression forte',
          'Terminer par respiration abdominale',
        ],
      },
    ],
    nutritionAdvice: [
      'Limiter le sel (réduit la rétention d\'eau)',
      'Protéines suffisantes (réparation tissulaire)',
      'Éviter les régimes trop restrictifs',
      'Hydratation normale (ne pas restreindre)',
      'Fruits et légumes pour les antioxydants',
    ],
    alertSigns: [
      'Rougeur, chaleur, fièvre (érysipèle)',
      'Douleur intense inhabituelle',
      'Modification brutale du volume',
      'Plaie qui ne cicatrise pas',
      'Écoulement de lymphe par la peau',
    ],
    audience: 'senior',
    readingTime: 6,
  },
  {
    id: 'asthme',
    slug: 'asthme',
    name: 'Asthme',
    category: 'orl-respiratoire',
    shortDescription: 'Maladie respiratoire chronique avec crises d\'essoufflement.',
    definition: "L'asthme est une maladie inflammatoire chronique des bronches. Elle se manifeste par des crises d'essoufflement, de toux et de sifflements. Entre les crises, les poumons fonctionnent normalement. L'asthme est une maladie contrôlable.",
    physiopathology: "Les bronches des asthmatiques sont hypersensibles. Sous l'effet de divers stimuli (allergènes, effort, froid), elles se contractent, s'enflamment et produisent du mucus, réduisant le passage de l'air.",
    symptoms: [
      'Essoufflement par crises',
      'Sifflements respiratoires',
      'Toux, surtout la nuit',
      'Oppression thoracique',
      'Symptômes soulagés par le bronchodilatateur',
    ],
    aggravatingFactors: [
      'Allergènes (acariens, pollens, animaux)',
      'Infections respiratoires',
      'Tabac (actif ou passif)',
      'Pollution',
      'Effort physique intense non préparé',
      'Émotions fortes',
    ],
    helpfulFactors: [
      'Traitement de fond bien suivi',
      'Éviction des allergènes identifiés',
      'Activité physique régulière adaptée',
      'Cure thermale respiratoire',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'L\'activité physique régulière améliore le contrôle de l\'asthme. Échauffement progressif. Natation particulièrement recommandée (air chaud et humide). Avoir son bronchodilatateur à portée.',
      posturalAdvice: 'Position assise légèrement penchée en avant en cas de gêne. Éviter les pièces enfumées ou poussiéreuses.',
      lifestyle: 'Aérer le logement. Literie anti-acariens. Éviter les moquettes. Pas de tabac ni de fumée.',
      sleep: 'Chambre à 18-19°C, aérée. Literie anti-acariens. Traitement de fond pris régulièrement.',
      stressManagement: 'Le stress peut déclencher des crises. Techniques de relaxation, respiration contrôlée.',
      thermalism: 'Cures à orientation respiratoire. Aérosols, inhalations, exercices respiratoires. Amélioration de la qualité de vie et réduction des crises.',
    },
    exercises: [
      {
        id: 'ex-asthme-1',
        title: 'Respiration à lèvres pincées',
        description: 'Ralentit l\'expiration et réduit l\'essoufflement',
        duration: '3 minutes',
        frequency: 'En cas de gêne',
        icon: '💨',
        steps: [
          'Inspirez calmement par le nez',
          'Pincez les lèvres comme pour siffler',
          'Expirez lentement (2x plus long que l\'inspiration)',
          'Répétez jusqu\'à soulagement',
        ],
      },
      {
        id: 'ex-asthme-2',
        title: 'Respiration abdominale',
        description: 'Renforce le diaphragme et améliore la ventilation',
        duration: '5 minutes',
        frequency: '2 fois par jour',
        icon: '🫁',
        steps: [
          'Assis ou couché, main sur le ventre',
          'Inspirez par le nez en gonflant le ventre',
          'Expirez lentement en rentrant le ventre',
          '10 cycles, lentement',
        ],
      },
    ],
    nutritionAdvice: [
      'Alimentation équilibrée, riche en fruits et légumes',
      'Oméga-3 (poissons gras) : effet anti-inflammatoire modéré',
      'Éviter les aliments auxquels vous êtes allergique',
      'Vitamine D (poissons, œufs, soleil modéré)',
      'Maintenir un poids santé',
    ],
    alertSigns: [
      'Crise intense ne cédant pas au bronchodilatateur',
      'Essoufflement majeur empêchant de parler',
      'Lèvres ou ongles bleutés',
      'Aggravation malgré le traitement de fond',
      'Appeler le 15 (SAMU) en cas de crise grave',
    ],
    audience: 'adulte',
    readingTime: 7,
  },
  {
    id: 'bpco',
    slug: 'bpco',
    name: 'BPCO',
    category: 'orl-respiratoire',
    shortDescription: 'Maladie pulmonaire chronique obstructive, souvent liée au tabac.',
    definition: "La Bronchopneumopathie Chronique Obstructive (BPCO) est une maladie respiratoire chronique caractérisée par un rétrécissement progressif et irréversible des bronches. Elle est principalement causée par le tabagisme. L'arrêt du tabac est le traitement essentiel.",
    physiopathology: "L'inhalation chronique de fumée de tabac provoque une inflammation et une destruction progressive des bronches et des alvéoles pulmonaires. L'air a du mal à sortir des poumons (obstruction), provoquant essoufflement et limitation à l'effort.",
    symptoms: [
      'Essoufflement progressif, d\'abord à l\'effort',
      'Toux chronique avec crachats',
      'Fatigue',
      'Infections bronchiques fréquentes',
      'Sifflements respiratoires',
    ],
    aggravatingFactors: [
      'Tabagisme (même passif)',
      'Pollution atmosphérique',
      'Infections respiratoires',
      'Inactivité physique',
      'Air froid et sec',
    ],
    helpfulFactors: [
      'Arrêt du tabac (essentiel)',
      'Réhabilitation respiratoire',
      'Activité physique adaptée',
      'Vaccinations (grippe, pneumocoque)',
      'Cure thermale',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'Essentielle malgré l\'essoufflement. Programme adapté : marche progressive, vélo, exercices respiratoires. La réhabilitation respiratoire est le traitement le plus efficace après l\'arrêt du tabac.',
      posturalAdvice: 'Position légèrement penchée en avant en cas d\'essoufflement (appui sur les cuisses ou une table).',
      lifestyle: 'Arrêt du tabac impératif. Éviter la fumée et la pollution. Se protéger du froid (masque, écharpe).',
      sleep: 'Tête légèrement surélevée. Éviter les somnifères qui dépriment la respiration.',
      stressManagement: 'Techniques de relaxation. Gestion de l\'anxiété liée à l\'essoufflement.',
      thermalism: 'Cures à orientation respiratoire. Aérosols, drainage bronchique, exercices. Amélioration de la tolérance à l\'effort et de la qualité de vie.',
    },
    exercises: [
      {
        id: 'ex-bpco-1',
        title: 'Respiration à lèvres pincées',
        description: 'Vide mieux les poumons et réduit l\'essoufflement',
        duration: '5 minutes',
        frequency: 'Plusieurs fois par jour',
        icon: '💨',
        steps: [
          'Inspirez par le nez (2 secondes)',
          'Pincez les lèvres',
          'Expirez lentement (4-6 secondes)',
          'À utiliser pendant l\'effort aussi',
        ],
      },
      {
        id: 'ex-bpco-2',
        title: 'Marche adaptée',
        description: 'Améliore l\'endurance et l\'essoufflement',
        duration: '20-30 minutes',
        frequency: 'Tous les jours',
        icon: '🚶',
        steps: [
          'Commencez par 5-10 minutes',
          'Augmentez progressivement',
          'Marchez à un rythme où vous pouvez parler',
          'Utilisez la respiration à lèvres pincées si besoin',
          'Faites des pauses si nécessaire',
        ],
      },
    ],
    nutritionAdvice: [
      'Protéines suffisantes (les muscles respiratoires en ont besoin)',
      'Fractionnez les repas si l\'estomac plein gêne la respiration',
      'Éviter le surpoids (gêne la respiration)',
      'Éviter la dénutrition (fréquente dans la BPCO avancée)',
      'Hydratation suffisante (fluidifie les sécrétions)',
    ],
    alertSigns: [
      'Essoufflement brutal aggravé',
      'Crachats purulents (verdâtres)',
      'Fièvre',
      'Confusion',
      'Œdèmes des chevilles',
      'Lèvres ou ongles bleutés',
    ],
    audience: 'senior',
    readingTime: 8,
  },
  {
    id: 'rhinite-chronique',
    slug: 'rhinite-chronique',
    name: 'Rhinite chronique',
    category: 'orl-respiratoire',
    shortDescription: 'Inflammation persistante du nez, allergique ou non.',
    definition: "La rhinite chronique est une inflammation durable de la muqueuse nasale. Elle peut être allergique (rhume des foins, acariens) ou non allergique (irritative, vasomotrice). Elle altère la qualité de vie par ses symptômes gênants.",
    physiopathology: "La muqueuse nasale est en permanence enflammée et hypersensible. Elle réagit excessivement à des stimuli (allergènes, changements de température, polluants), produisant mucus, congestion et éternuements.",
    symptoms: [
      'Nez bouché (obstruction nasale)',
      'Écoulement nasal (clair ou épais)',
      'Éternuements',
      'Démangeaisons du nez et du palais',
      'Perte d\'odorat',
    ],
    aggravatingFactors: [
      'Allergènes (pollens, acariens, moisissures)',
      'Pollution, tabac',
      'Air sec (chauffage)',
      'Certains médicaments',
      'Changements de température',
    ],
    helpfulFactors: [
      'Éviction des allergènes',
      'Lavages de nez réguliers',
      'Air humidifié',
      'Cure thermale ORL',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'L\'exercice peut temporairement décongestionner le nez. Préférer l\'intérieur lors des pics polliniques.',
      posturalAdvice: 'Dormir tête légèrement surélevée si nez bouché la nuit.',
      lifestyle: 'Lavages de nez au sérum physiologique quotidiens. Aérer mais éviter les périodes de forte pollinisation. Housses anti-acariens.',
      sleep: 'Chambre bien aérée mais protégée des pollens. Humidificateur si air trop sec.',
      stressManagement: 'Le stress peut aggraver les symptômes. Relaxation utile.',
      thermalism: 'Cures ORL : irrigations nasales, aérosols, eaux thermales. Amélioration des symptômes et réduction du recours aux médicaments.',
    },
    exercises: [
      {
        id: 'ex-rhinite-1',
        title: 'Lavage de nez complet',
        description: 'Nettoie et apaise la muqueuse nasale',
        duration: '3 minutes',
        frequency: '1 à 2 fois par jour',
        icon: '💧',
        steps: [
          'Utilisez du sérum physiologique ou une solution saline',
          'Penchez-vous au-dessus du lavabo',
          'Inclinez la tête sur le côté',
          'Injectez la solution dans la narine supérieure',
          'Laissez couler par l\'autre narine',
          'Mouchez doucement, changez de côté',
        ],
      },
    ],
    nutritionAdvice: [
      'Alimentation anti-inflammatoire',
      'Oméga-3 (poissons gras)',
      'Éviter les aliments auxquels vous êtes allergique',
      'Probiotiques (yaourts) : effet possible sur l\'immunité',
      'Hydratation suffisante',
    ],
    alertSigns: [
      'Douleur faciale importante (sinusite)',
      'Écoulement nasal unilatéral sanglant',
      'Perte complète de l\'odorat persistante',
      'Obstruction nasale totale ne cédant pas',
      'Saignements de nez fréquents',
    ],
    audience: 'adulte',
    readingTime: 6,
  },
  {
    id: 'otites-repetition-enfant',
    slug: 'otites-repetition-enfant',
    name: 'Otites à répétition (enfant)',
    category: 'orl-respiratoire',
    shortDescription: 'Infections répétées de l\'oreille moyenne chez le jeune enfant.',
    definition: "Les otites moyennes à répétition (plus de 3 à 4 par an) sont fréquentes chez le jeune enfant. Elles sont liées à l'immaturité de la trompe d'Eustache et à l'exposition aux virus en collectivité. La grande majorité guérissent sans complication.",
    physiopathology: "La trompe d'Eustache relie l'oreille moyenne au fond du nez. Chez le jeune enfant, elle est courte et horizontale, favorisant le passage des germes. Le rhume précède souvent l'otite.",
    symptoms: [
      'Douleur d\'oreille (l\'enfant se touche l\'oreille)',
      'Fièvre',
      'Irritabilité, pleurs',
      'Difficultés à dormir',
      'Parfois écoulement par l\'oreille',
    ],
    aggravatingFactors: [
      'Collectivité (crèche, nourrice)',
      'Tabagisme passif',
      'Usage prolongé de la tétine ou du biberon couché',
      'Reflux gastro-œsophagien',
      'Allergies respiratoires',
    ],
    helpfulFactors: [
      'Lavages de nez réguliers',
      'Éviction du tabac',
      'Allaitement maternel (effet protecteur)',
      'Cure thermale ORL',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'Activité normale entre les épisodes. Éviter la piscine en phase aiguë.',
      posturalAdvice: 'Ne pas donner le biberon couché. Surélever légèrement la tête du lit si reflux.',
      lifestyle: 'Lavages de nez au sérum physiologique réguliers. Aérer la maison. Pas de tabagisme passif.',
      sleep: 'Tête légèrement surélevée peut aider en cas de congestion.',
      stressManagement: 'Rythme de vie régulier. Éviter la fatigue excessive.',
      thermalism: 'Cures ORL pédiatriques : soins locaux, aérosols, eau thermale. Réduction de la fréquence des otites démontrée.',
    },
    exercises: [
      {
        id: 'ex-otite-1',
        title: 'Lavage de nez quotidien',
        description: 'Prévient l\'accumulation de sécrétions',
        duration: '2 minutes',
        frequency: '1 à 2 fois par jour',
        icon: '💧',
        steps: [
          'Allonger l\'enfant sur le côté',
          'Injecter doucement le sérum dans la narine supérieure',
          'Laisser couler par l\'autre narine',
          'Moucher ou aspirer doucement',
          'Répéter de l\'autre côté',
        ],
      },
      {
        id: 'ex-otite-2',
        title: 'Manœuvre de Valsalva douce (enfant > 4 ans)',
        description: 'Aide à équilibrer la pression dans l\'oreille',
        duration: '30 secondes',
        frequency: 'En cas de sensation d\'oreille bouchée',
        icon: '👂',
        steps: [
          'Se pincer le nez',
          'Bouche fermée, souffler doucement par le nez',
          'Comme pour se déboucher les oreilles en avion',
          'Ne pas forcer si douleur',
        ],
      },
    ],
    nutritionAdvice: [
      'Allaitement maternel si possible (effet protecteur)',
      'Alimentation équilibrée et variée',
      'Vitamine D selon les recommandations',
      'Éviter les biberons couchés',
      'Hydratation suffisante',
    ],
    alertSigns: [
      'Fièvre très élevée ou persistante',
      'Gonflement derrière l\'oreille',
      'Raideur de nuque',
      'Troubles de l\'équilibre',
      'Écoulement persistant',
      'Baisse d\'audition durable',
    ],
    audience: 'enfant',
    readingTime: 6,
  },
  {
    id: 'lichen-plan-buccal',
    slug: 'lichen-plan-buccal',
    name: 'Lichen plan buccal',
    category: 'muqueuses-buccales',
    shortDescription: 'Maladie inflammatoire chronique de la muqueuse de la bouche.',
    definition: "Le lichen plan buccal est une maladie inflammatoire chronique qui touche la muqueuse de la bouche. Il se manifeste par des lésions blanchâtres en réseau ou des zones rouges et érosives. Ce n'est pas une maladie contagieuse.",
    physiopathology: "C'est une réaction auto-immune : le système immunitaire attaque par erreur les cellules de la muqueuse buccale. Les facteurs déclenchants exacts sont mal connus, mais le stress et certains médicaments peuvent jouer un rôle.",
    symptoms: [
      'Lésions blanches en réseau (stries de Wickham)',
      'Zones rouges ou érosives douloureuses',
      'Brûlures, picotements',
      'Gêne à l\'alimentation (épices, acides)',
      'Localisation fréquente : joues, gencives, langue',
    ],
    aggravatingFactors: [
      'Stress',
      'Aliments acides ou épicés',
      'Certains médicaments',
      'Amalgames dentaires (débattu)',
      'Traumatismes locaux',
    ],
    helpfulFactors: [
      'Hygiène buccale douce',
      'Éviction des irritants alimentaires',
      'Gestion du stress',
      'Cure thermale',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'Pas de contre-indication. L\'exercice peut aider à réduire le stress.',
      posturalAdvice: 'Non applicable.',
      lifestyle: 'Hygiène buccale rigoureuse mais douce. Brosse à dents souple. Dentifrice sans sodium lauryl sulfate.',
      sleep: 'Sommeil réparateur important pour le système immunitaire.',
      stressManagement: 'Le stress est un facteur déclenchant majeur. Relaxation, sophrologie, activités plaisantes essentielles.',
      thermalism: 'Cures à orientation dermatologique ou affections des muqueuses. Soins locaux à l\'eau thermale, gargarismes. Amélioration des symptômes.',
    },
    exercises: [
      {
        id: 'ex-lichen-1',
        title: 'Bains de bouche apaisants',
        description: 'Calme l\'inflammation et nettoie en douceur',
        duration: '2 minutes',
        frequency: '2 à 3 fois par jour',
        icon: '💧',
        steps: [
          'Utilisez de l\'eau bicarbonatée tiède',
          '(1/2 cuillère à café de bicarbonate dans un verre d\'eau)',
          'Faites circuler en bouche 30 secondes',
          'Crachez (ne pas avaler)',
          'Ne pas rincer après',
        ],
      },
    ],
    nutritionAdvice: [
      'Éviter les aliments acides (agrumes, tomates) en phase douloureuse',
      'Éviter les épices et l\'alcool',
      'Aliments tièdes plutôt que chauds',
      'Alimentation molle si lésions douloureuses',
      'Hydratation suffisante',
    ],
    alertSigns: [
      'Lésion qui change d\'aspect ou grossit',
      'Ulcération persistante qui ne guérit pas',
      'Difficultés croissantes à s\'alimenter',
      'Saignements spontanés',
      'Un suivi régulier est recommandé (risque rare de transformation)',
    ],
    audience: 'adulte',
    readingTime: 6,
  },
  {
    id: 'glossodynie',
    slug: 'glossodynie',
    name: 'Glossodynie',
    category: 'muqueuses-buccales',
    shortDescription: 'Sensations de brûlure de la langue sans lésion visible.',
    definition: "La glossodynie (ou syndrome de la bouche brûlante) est caractérisée par des sensations de brûlure, picotements ou sécheresse de la langue et parfois des lèvres, sans lésion visible. C'est un trouble fréquent, souvent lié au stress et à l'anxiété.",
    physiopathology: "Les causes exactes sont mal comprises. Il s'agit probablement d'un dysfonctionnement des fibres nerveuses sensorielles. Les facteurs psychologiques (anxiété, dépression) jouent un rôle important.",
    symptoms: [
      'Brûlure de la langue (pointe, bords)',
      'Sensation de sécheresse',
      'Goût métallique ou altéré',
      'Symptômes s\'aggravant dans la journée',
      'Amélioration pendant les repas',
    ],
    aggravatingFactors: [
      'Stress et anxiété',
      'Bouche sèche (médicaments)',
      'Carences (fer, B12, acide folique)',
      'Reflux gastro-œsophagien',
      'Prothèses dentaires mal ajustées',
    ],
    helpfulFactors: [
      'Gestion du stress',
      'Correction des carences',
      'Hydratation régulière',
      'Cure thermale',
    ],
    nonMedicinalTreatments: {
      physicalActivity: 'Activité physique régulière : aide à réduire le stress et l\'anxiété.',
      posturalAdvice: 'Non applicable.',
      lifestyle: 'Éviter les bains de bouche alcoolisés. Hygiène buccale douce. Boire régulièrement.',
      sleep: 'Sommeil suffisant essentiel. La fatigue aggrave les symptômes.',
      stressManagement: 'Pilier du traitement. Relaxation, thérapie cognitive-comportementale, activités plaisantes.',
      thermalism: 'Cures à orientation affections des muqueuses. Soins apaisants, prise en charge globale du stress. Amélioration de la qualité de vie.',
    },
    exercises: [
      {
        id: 'ex-glosso-1',
        title: 'Gorgées d\'eau régulières',
        description: 'Hydrate la bouche et calme la sensation de brûlure',
        duration: 'Toute la journée',
        frequency: 'Toutes les 30-60 minutes',
        icon: '💧',
        steps: [
          'Gardez une bouteille d\'eau à portée',
          'Buvez de petites gorgées régulièrement',
          'Laissez l\'eau en bouche quelques secondes',
          'Évitez les boissons acides ou chaudes',
        ],
      },
      {
        id: 'ex-glosso-2',
        title: 'Relaxation et respiration',
        description: 'Réduit le stress qui aggrave les symptômes',
        duration: '10 minutes',
        frequency: '2 fois par jour',
        icon: '🧘',
        steps: [
          'Installez-vous confortablement',
          'Fermez les yeux',
          'Inspirez lentement par le nez (4 secondes)',
          'Expirez lentement par la bouche (6 secondes)',
          'Répétez 10 cycles',
        ],
      },
    ],
    nutritionAdvice: [
      'Vérifier les carences (fer, vitamine B12, acide folique)',
      'Alimentation variée et équilibrée',
      'Éviter les aliments acides ou épicés',
      'Hydratation régulière',
      'Limiter le café',
    ],
    alertSigns: [
      'Apparition de lésions visibles',
      'Symptômes unilatéraux',
      'Perte de sensibilité',
      'Difficultés à avaler',
      'Perte de poids inexpliquée',
    ],
    audience: 'senior',
    readingTime: 5,
  },
];

// Ressources
export const resources: Resource[] = [
  // Arthrose
  { id: 'res-arthrose-comprendre', pathologyId: 'arthrose', title: 'Comprendre l\'arthrose', summary: 'Définition, mécanismes et évolution de la maladie arthrosique.', type: 'comprendre', audience: 'senior', readingTime: 5 },
  { id: 'res-arthrose-exercices', pathologyId: 'arthrose', title: 'Exercices pour l\'arthrose', summary: 'Programme d\'exercices doux pour préserver la mobilité articulaire.', type: 'exercices', audience: 'senior', readingTime: 8 },
  { id: 'res-arthrose-nutrition', pathologyId: 'arthrose', title: 'Alimentation anti-inflammatoire', summary: 'Conseils nutritionnels pour limiter l\'inflammation articulaire.', type: 'nutrition', audience: 'senior', readingTime: 6 },
  
  // Lombalgie
  { id: 'res-lombalgie-comprendre', pathologyId: 'lombalgie-chronique', title: 'Comprendre la lombalgie', summary: 'Pourquoi le dos fait mal et comment y remédier.', type: 'comprendre', audience: 'adulte', readingTime: 5 },
  { id: 'res-lombalgie-bouger', pathologyId: 'lombalgie-chronique', title: 'Bouger malgré le mal de dos', summary: 'Le mouvement comme traitement de la lombalgie chronique.', type: 'bouger', audience: 'adulte', readingTime: 6 },
  { id: 'res-lombalgie-exercices', pathologyId: 'lombalgie-chronique', title: 'Exercices de gainage doux', summary: 'Renforcer les muscles du dos sans se faire mal.', type: 'exercices', audience: 'adulte', readingTime: 7 },

  // Sciatique
  { id: 'res-sciatique-comprendre', pathologyId: 'sciatique-chronique', title: 'Comprendre la sciatique', summary: 'Mécanismes de la douleur sciatique et solutions.', type: 'comprendre', audience: 'adulte', readingTime: 5 },
  { id: 'res-sciatique-exercices', pathologyId: 'sciatique-chronique', title: 'Étirements pour la sciatique', summary: 'Programme d\'étirements pour soulager le nerf sciatique.', type: 'exercices', audience: 'adulte', readingTime: 6 },
  
  // Insuffisance veineuse
  { id: 'res-veines-comprendre', pathologyId: 'insuffisance-veineuse', title: 'Comprendre l\'insuffisance veineuse', summary: 'Fonctionnement des veines et problèmes de retour veineux.', type: 'comprendre', audience: 'senior', readingTime: 5 },
  { id: 'res-veines-hygiene', pathologyId: 'insuffisance-veineuse', title: 'Hygiène de vie veineuse', summary: 'Conseils pratiques quotidiens pour soulager les jambes lourdes.', type: 'hygiene', audience: 'senior', readingTime: 5 },
  { id: 'res-veines-exercices', pathologyId: 'insuffisance-veineuse', title: 'Exercices pour les jambes', summary: 'Mouvements simples pour activer la circulation veineuse.', type: 'exercices', audience: 'senior', readingTime: 5 },
  
  // Insuffisance lymphatique
  { id: 'res-lymph-comprendre', pathologyId: 'insuffisance-lymphatique', title: 'Comprendre le lymphœdème', summary: 'Le système lymphatique et ses dysfonctionnements.', type: 'comprendre', audience: 'senior', readingTime: 6 },
  { id: 'res-lymph-autosoins', pathologyId: 'insuffisance-lymphatique', title: 'Auto-soins du lymphœdème', summary: 'Techniques de drainage et précautions au quotidien.', type: 'auto-soins', audience: 'senior', readingTime: 7 },
  
  // Asthme
  { id: 'res-asthme-comprendre', pathologyId: 'asthme', title: 'Comprendre l\'asthme', summary: 'Mécanismes de l\'asthme et facteurs déclenchants.', type: 'comprendre', audience: 'adulte', readingTime: 5 },
  { id: 'res-asthme-bouger', pathologyId: 'asthme', title: 'Sport et asthme', summary: 'Comment pratiquer une activité physique avec un asthme.', type: 'bouger', audience: 'adulte', readingTime: 5 },
  
  // BPCO
  { id: 'res-bpco-comprendre', pathologyId: 'bpco', title: 'Comprendre la BPCO', summary: 'Maladie, évolution et importance de l\'arrêt du tabac.', type: 'comprendre', audience: 'senior', readingTime: 6 },
  { id: 'res-bpco-bouger', pathologyId: 'bpco', title: 'Activité physique et BPCO', summary: 'Comment reprendre l\'activité malgré l\'essoufflement.', type: 'bouger', audience: 'senior', readingTime: 6 },
  
  // Rhinite
  { id: 'res-rhinite-comprendre', pathologyId: 'rhinite-chronique', title: 'Comprendre la rhinite chronique', summary: 'Allergique ou non : causes et solutions.', type: 'comprendre', audience: 'adulte', readingTime: 5 },
  { id: 'res-rhinite-hygiene', pathologyId: 'rhinite-chronique', title: 'Hygiène nasale quotidienne', summary: 'Lavages de nez et prévention des symptômes.', type: 'hygiene', audience: 'adulte', readingTime: 4 },
  
  // Angines enfant
  { id: 'res-angine-comprendre', pathologyId: 'angines-repetition-enfant', title: 'Comprendre les angines de l\'enfant', summary: 'Pourquoi les enfants font des angines à répétition.', type: 'comprendre', audience: 'enfant', readingTime: 4 },
  { id: 'res-angine-consulter', pathologyId: 'angines-repetition-enfant', title: 'Quand consulter pour une angine', summary: 'Signaux d\'alerte et conduite à tenir.', type: 'consulter', audience: 'enfant', readingTime: 4 },
  
  // Otites enfant
  { id: 'res-otite-comprendre', pathologyId: 'otites-repetition-enfant', title: 'Comprendre les otites de l\'enfant', summary: 'Mécanismes et prévention des otites répétées.', type: 'comprendre', audience: 'enfant', readingTime: 4 },
  { id: 'res-otite-hygiene', pathologyId: 'otites-repetition-enfant', title: 'Prévenir les otites', summary: 'Mesures d\'hygiène pour réduire les infections.', type: 'hygiene', audience: 'enfant', readingTime: 4 },
  
  // Lichen plan
  { id: 'res-lichen-comprendre', pathologyId: 'lichen-plan-buccal', title: 'Comprendre le lichen plan buccal', summary: 'Maladie auto-immune de la bouche et prise en charge.', type: 'comprendre', audience: 'adulte', readingTime: 5 },
  { id: 'res-lichen-autosoins', pathologyId: 'lichen-plan-buccal', title: 'Vivre avec le lichen buccal', summary: 'Conseils d\'hygiène buccale et gestion des poussées.', type: 'auto-soins', audience: 'adulte', readingTime: 5 },
  
  // Glossodynie
  { id: 'res-glosso-comprendre', pathologyId: 'glossodynie', title: 'Comprendre la glossodynie', summary: 'Syndrome de la bouche brûlante : causes et solutions.', type: 'comprendre', audience: 'senior', readingTime: 5 },
  { id: 'res-glosso-hygiene', pathologyId: 'glossodynie', title: 'Gestion quotidienne de la glossodynie', summary: 'Conseils pratiques pour réduire les symptômes.', type: 'hygiene', audience: 'senior', readingTime: 4 },
];

// Programmes
export interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  pathologyId: string;
  level: 'debutant' | 'confirme';
  duration: string;
  sessions: {
    day: string;
    activities: string[];
  }[];
  pdfUrl?: string;
}

export const programs: Program[] = [
  {
    id: 'prog-arthrose-genou-deb',
    slug: 'arthrose-genou-debutant',
    title: 'Programme arthrose genou/hanche - Débutant',
    description: 'Reprise progressive de la marche et renforcement musculaire adapté.',
    pathologyId: 'arthrose',
    level: 'debutant',
    duration: '4 semaines',
    sessions: [
      { day: 'Semaine 1-2', activities: ['Marche 10 min/jour', 'Flexion-extension genou assis (2x10)', 'Étirements doux'] },
      { day: 'Semaine 3-4', activities: ['Marche 15-20 min/jour', 'Renforcement quadriceps (2x15)', 'Pont fessier (2x10)'] },
    ],
  },
  {
    id: 'prog-lombalgie-deb',
    slug: 'lombalgie-debutant',
    title: 'Programme lombalgie - Débutant',
    description: 'Mobilisation douce et gainage progressif pour le dos.',
    pathologyId: 'lombalgie-chronique',
    level: 'debutant',
    duration: '4 semaines',
    sessions: [
      { day: 'Semaine 1-2', activities: ['Chat-vache (10 répétitions)', 'Genoux-poitrine (30 sec)', 'Marche 10 min'] },
      { day: 'Semaine 3-4', activities: ['Gainage ventral 3x20 sec', 'Pont fessier (2x10)', 'Marche 20 min'] },
    ],
  },
  {
    id: 'prog-veines-deb',
    slug: 'insuffisance-veineuse-debutant',
    title: 'Programme veines - Débutant',
    description: 'Activation de la circulation veineuse par le mouvement.',
    pathologyId: 'insuffisance-veineuse',
    level: 'debutant',
    duration: '4 semaines',
    sessions: [
      { day: 'Quotidien', activities: ['Marche 15-20 min', 'Flexion-extension pieds (5x20)', 'Surélévation jambes 15 min'] },
      { day: 'Soir', activities: ['Pédalage en l\'air (3x30 sec)', 'Montées sur pointes (2x15)', 'Jet d\'eau fraîche'] },
    ],
  },
  {
    id: 'prog-asthme-deb',
    slug: 'asthme-debutant',
    title: 'Programme asthme/BPCO - Débutant',
    description: 'Reprise d\'activité aérobie et exercices respiratoires.',
    pathologyId: 'asthme',
    level: 'debutant',
    duration: '6 semaines',
    sessions: [
      { day: 'Semaine 1-2', activities: ['Marche 10 min', 'Respiration abdominale (5 min)', 'Lèvres pincées si essoufflement'] },
      { day: 'Semaine 3-6', activities: ['Marche 15-30 min progressive', 'Exercices respiratoires quotidiens', 'Activité au rythme de la parole'] },
    ],
  },
];

// FAQ
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const faqItems: FAQItem[] = [
  {
    id: 'faq-cure-thermale',
    question: 'Cure thermale : à quoi ça sert ?',
    answer: 'La cure thermale est un traitement médical de 3 semaines utilisant les propriétés des eaux thermales. Elle peut être prescrite pour les affections rhumatologiques, respiratoires, veineuses et dermatologiques. Les soins (bains, boue, aérosols, rééducation) apportent un soulagement durable et complémentaire aux traitements habituels. Une cure peut être prise en charge partiellement par l\'Assurance Maladie sur prescription médicale.',
    category: 'thermalisme',
  },
  {
    id: 'faq-exercices-douleur',
    question: 'Quels exercices quand on a mal ?',
    answer: 'Contrairement aux idées reçues, le mouvement est souvent bénéfique même en cas de douleur chronique. Il faut adapter l\'intensité : mouvements doux, sans forcer, en deçà du seuil douloureux. La règle des 2 heures est utile : si la douleur est augmentée plus de 2 heures après l\'exercice, c\'était trop intense. Commencez progressivement et augmentez très lentement.',
    category: 'activite',
  },
  {
    id: 'faq-angine-otite',
    question: 'Que faire en cas d\'angine ou otite à répétition chez l\'enfant ?',
    answer: 'Les infections ORL répétées sont fréquentes chez l\'enfant et généralement bénignes. Mesures préventives : lavages de nez réguliers au sérum physiologique, aération du logement, éviction du tabagisme passif, hydratation suffisante. Consultez si : fièvre élevée persistante, difficultés respiratoires, gonflement du cou ou derrière l\'oreille, troubles de l\'équilibre. Une cure thermale ORL peut être envisagée après 3-4 épisodes annuels.',
    category: 'orl',
  },
  {
    id: 'faq-insuffisance-veineuse',
    question: 'Comment gérer l\'insuffisance veineuse au quotidien ?',
    answer: 'Points clés : marcher au moins 30 minutes par jour (la contraction des mollets propulse le sang), éviter la station debout ou assise prolongée, surélever les jambes le soir, porter des bas de contention adaptés (sur conseil médical), terminer la douche par un jet d\'eau fraîche sur les jambes, éviter la chaleur excessive. En été, les symptômes s\'aggravent : vigilance accrue.',
    category: 'veines',
  },
  {
    id: 'faq-pdf-utilisation',
    question: 'Comment utiliser les fiches PDF ?',
    answer: 'Nos fiches PDF sont des synthèses pédagogiques à imprimer ou conserver sur votre téléphone. Elles ne remplacent pas une consultation médicale mais vous aident à mieux comprendre votre pathologie et à mettre en place les mesures d\'hygiène de vie recommandées. N\'hésitez pas à les montrer à votre médecin pour en discuter.',
    category: 'ressources',
  },
];
