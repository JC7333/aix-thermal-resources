// ============================================
// RÉPONSES RAPIDES — CONTENU COMPLET
// ============================================

export interface QuickAnswerTruth {
  myth: string;
  truth: string;
}

export interface QuickAnswerAction {
  time?: string;
  action: string;
  detail?: string;
}

export interface QuickAnswerDay {
  day: string;
  actions: string[];
}

export interface FullQuickAnswer {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  color: 'primary' | 'secondary' | 'accent' | 'destructive';
  // Contenu
  intro: string;
  truths: QuickAnswerTruth[];
  dailyPlan: QuickAnswerAction[];
  sevenDayPlan: QuickAnswerDay[];
  alertSigns: string[];
  closingMessage: string;
}

// ============================================
// LES 6 RÉPONSES RAPIDES
// ============================================

export const fullQuickAnswers: FullQuickAnswer[] = [
  // 1. PERDRE DU POIDS
  {
    id: 'perdre-poids',
    slug: 'perdre-poids',
    title: 'Perdre du poids sans recette miracle',
    subtitle: 'La vérité simple et un plan réaliste',
    icon: '⚖️',
    color: 'primary',
    intro: `Je sais que vous avez probablement déjà tout essayé. Régimes, privations, promesses... Et vous êtes toujours là, à chercher une solution. Je vais être honnête avec vous : il n'existe pas de recette miracle. Mais il existe une méthode simple qui fonctionne. Elle demande du temps et de la patience, mais elle marche vraiment.`,
    truths: [
      {
        myth: '« Je dois faire un régime restrictif pour maigrir. »',
        truth: 'Les régimes restrictifs font perdre du poids rapidement... puis le reprendre avec des kilos en plus. Ce qui marche : manger un peu moins, un peu mieux, durablement. Pas de privation, pas d\'interdits absolus.'
      },
      {
        myth: '« Je dois faire du sport intensif. »',
        truth: 'Marcher 30 minutes par jour est plus efficace pour la perte de poids que 2h de sport le week-end. L\'activité régulière et modérée est la clé.'
      },
      {
        myth: '« C\'est une question de volonté. »',
        truth: 'C\'est une question d\'environnement et d\'habitudes. Changez vos automatismes, pas votre volonté. Un pas après l\'autre, sans vous juger.'
      }
    ],
    dailyPlan: [
      {
        time: 'Ce matin',
        action: 'Buvez un grand verre d\'eau au réveil',
        detail: 'Avant le café, avant tout. Ça réveille votre corps et réduit la sensation de faim.'
      },
      {
        time: 'À midi',
        action: 'Remplissez la moitié de votre assiette de légumes',
        detail: 'N\'importe lesquels. Crus, cuits, surgelés — peu importe. La moitié de l\'assiette.'
      },
      {
        time: 'Ce soir',
        action: 'Marchez 15 minutes après le dîner',
        detail: 'Pas besoin de plus. 15 minutes autour du pâté de maisons. C\'est votre nouveau rituel.'
      }
    ],
    sevenDayPlan: [
      {
        day: 'Jour 1',
        actions: ['Légumes à chaque repas', '15 min de marche', 'Pas de grignotage après 20h']
      },
      {
        day: 'Jour 2',
        actions: ['Petit-déjeuner avec des protéines (œuf, fromage blanc)', 'Marche 20 min', 'Boire 1,5L d\'eau']
      },
      {
        day: 'Jour 3',
        actions: ['Pas de boisson sucrée aujourd\'hui', 'Monter les escaliers au lieu de l\'ascenseur', 'Dîner léger']
      },
      {
        day: 'Jour 4',
        actions: ['Cuisiner un repas simple à la maison', 'Marche 25 min', 'Se peser (une seule fois cette semaine)']
      },
      {
        day: 'Jour 5',
        actions: ['Manger lentement, poser la fourchette entre chaque bouchée', 'Marche 20 min', 'Fruits en dessert']
      },
      {
        day: 'Jour 6',
        actions: ['Se faire plaisir avec un petit écart raisonnable', 'Marche 30 min', 'Pas de culpabilité']
      },
      {
        day: 'Jour 7',
        actions: ['Bilan de la semaine : qu\'est-ce qui a marché ?', 'Préparer les menus de la semaine prochaine', 'Se féliciter']
      }
    ],
    alertSigns: [
      'Fatigue intense et inhabituelle',
      'Perte de poids très rapide (plus de 2 kg/semaine) sans raison',
      'Douleurs abdominales persistantes',
      'Troubles du comportement alimentaire (obsession, culpabilité excessive)',
      'Envie de vomir après les repas'
    ],
    closingMessage: 'Perdre du poids prend du temps. Un kilo par mois, c\'est déjà très bien. Si vous avez besoin d\'accompagnement, on en parle en consultation.'
  },

  // 2. ARRÊTER DE FUMER
  {
    id: 'arreter-fumer',
    slug: 'arreter-fumer',
    title: 'Arrêter de fumer',
    subtitle: 'C\'est possible, à votre rythme',
    icon: '🚭',
    color: 'secondary',
    intro: `Je ne vais pas vous faire la morale. Vous savez que le tabac est mauvais pour vous. Ce que je veux, c'est vous aider concrètement si vous avez décidé d'essayer. Et si vous n'êtes pas encore prêt, ce n'est pas grave : gardez cette fiche pour plus tard.`,
    truths: [
      {
        myth: '« Fumer quelques cigarettes par jour, ce n\'est pas grave. »',
        truth: 'Il n\'existe pas de seuil sans risque. Même 1 à 4 cigarettes par jour augmentent significativement le risque cardiovasculaire. Mais réduire est déjà un progrès.'
      },
      {
        myth: '« J\'arrête d\'un coup ou pas du tout. »',
        truth: 'Les deux approches fonctionnent. Certains préfèrent réduire progressivement. L\'important, c\'est de trouver ce qui marche pour vous, avec ou sans aide médicamenteuse.'
      },
      {
        myth: '« Je vais grossir si j\'arrête. »',
        truth: 'En moyenne 2-4 kg, pas 10. Et ce poids peut être géré. Les bénéfices de l\'arrêt du tabac sont infiniment supérieurs aux quelques kilos temporaires.'
      }
    ],
    dailyPlan: [
      {
        time: 'Maintenant',
        action: 'Retardez votre prochaine cigarette de 30 minutes',
        detail: 'L\'envie passe en 3-5 minutes. Buvez de l\'eau, faites autre chose. Juste 30 minutes.'
      },
      {
        time: 'Aujourd\'hui',
        action: 'Notez chaque cigarette que vous fumez',
        detail: 'Sur un papier ou votre téléphone. L\'heure et la raison (stress, habitude, plaisir). Sans vous juger.'
      },
      {
        time: 'Ce soir',
        action: 'Identifiez votre « cigarette la plus facile à supprimer »',
        detail: 'Celle que vous fumez par automatisme, pas par envie. C\'est celle-là qu\'on supprimera demain.'
      }
    ],
    sevenDayPlan: [
      {
        day: 'Jour 1',
        actions: ['Noter toutes les cigarettes fumées', 'Identifier les moments à risque', 'Retarder de 30 min la première cigarette du matin']
      },
      {
        day: 'Jour 2',
        actions: ['Supprimer 1 cigarette automatique', 'Boire plus d\'eau', 'Préparer des occupations pour les mains']
      },
      {
        day: 'Jour 3',
        actions: ['Supprimer 2 cigarettes automatiques', 'Marcher 10 min quand l\'envie est forte', 'Ranger les cendriers']
      },
      {
        day: 'Jour 4',
        actions: ['Ne plus fumer en intérieur', 'Appeler Tabac Info Service (3989)', 'Envisager les substituts nicotiniques']
      },
      {
        day: 'Jour 5',
        actions: ['Réduire encore de 2 cigarettes', 'Identifier un « parrain » (quelqu\'un qui vous soutient)', 'Calculer l\'argent économisé']
      },
      {
        day: 'Jour 6',
        actions: ['Fixer une date d\'arrêt dans les 2 semaines', 'Prendre RDV médecin pour accompagnement', 'Préparer des en-cas sains']
      },
      {
        day: 'Jour 7',
        actions: ['Bilan : combien de cigarettes en moins ?', 'Se féliciter', 'Visualiser les bénéfices déjà ressentis']
      }
    ],
    alertSigns: [
      'Douleur thoracique ou essoufflement inhabituel',
      'Toux avec sang',
      'Perte de poids inexpliquée',
      'Anxiété ou dépression sévère pendant le sevrage',
      'Envies irrépressibles malgré les substituts'
    ],
    closingMessage: 'L\'arrêt du tabac est souvent plus facile avec un accompagnement. Les substituts nicotiniques sont remboursés. Je peux vous prescrire ce dont vous avez besoin.'
  },

  // 3. ARTHROSE / DOS
  {
    id: 'arthrose-dos',
    slug: 'arthrose-dos',
    title: 'Arthrose / Mal de dos : que faire maintenant ?',
    subtitle: 'Des actions concrètes pour aujourd\'hui',
    icon: '🦴',
    color: 'accent',
    intro: `Vous avez mal. C'est réel, je ne minimise pas. Mais je vais vous dire quelque chose d'important : bouger fait moins mal que rester immobile. Pas n'importe comment, pas n'importe combien. Mais bouger, oui. Voici ce que vous pouvez faire dès maintenant.`,
    truths: [
      {
        myth: '« L\'arthrose, c\'est l\'usure : plus je bouge, plus ça s\'use. »',
        truth: 'C\'est l\'inverse. L\'articulation a besoin de mouvement pour se nourrir. Le cartilage n\'a pas de vaisseaux sanguins : il se nourrit par le mouvement. Bouger l\'entretient.'
      },
      {
        myth: '« Je dois me reposer quand j\'ai mal au dos. »',
        truth: 'Le repos prolongé aggrave le mal de dos. Les études le montrent clairement : reprendre une activité légère rapidement accélère la guérison.'
      },
      {
        myth: '« Mon dos est fragile, je dois le protéger. »',
        truth: 'Votre dos est solide. La colonne vertébrale est une structure incroyablement résistante. Vous pouvez la faire travailler, progressivement.'
      }
    ],
    dailyPlan: [
      {
        time: 'Maintenant',
        action: 'Levez-vous et marchez 2 minutes',
        detail: 'Même si vous avez mal. Doucement, sans forcer. Le mouvement va « huiler » vos articulations.'
      },
      {
        time: 'Toutes les heures',
        action: 'Changez de position',
        detail: 'Debout si vous étiez assis, assis si vous étiez debout. 30 secondes de mouvement suffisent.'
      },
      {
        time: 'Ce soir',
        action: 'Appliquez du chaud 15 minutes',
        detail: 'Une bouillotte sur la zone douloureuse. Le chaud détend les muscles contractés par la douleur.'
      }
    ],
    sevenDayPlan: [
      {
        day: 'Jour 1',
        actions: ['Se lever et bouger 2 min toutes les heures', 'Marche 10 min', 'Chaleur le soir']
      },
      {
        day: 'Jour 2',
        actions: ['Marche 15 min', 'Étirements doux 5 min', 'Noter le niveau de douleur (1-10)']
      },
      {
        day: 'Jour 3',
        actions: ['Marche 15 min', 'Exercices de mobilité douce', 'Respiration abdominale 5 min']
      },
      {
        day: 'Jour 4',
        actions: ['Marche 20 min', 'Exercices de gainage doux (10 sec)', 'Chaud/froid selon soulagement']
      },
      {
        day: 'Jour 5',
        actions: ['Marche 20 min', 'Étirements 10 min', 'Évaluer : la douleur a-t-elle diminué ?']
      },
      {
        day: 'Jour 6',
        actions: ['Activité au choix 30 min (marche, vélo doux, piscine)', 'Gainage 2x10 sec', 'Repos actif']
      },
      {
        day: 'Jour 7',
        actions: ['Bilan de la semaine', 'Planifier la suite', 'Se féliciter des progrès']
      }
    ],
    alertSigns: [
      'Douleur qui descend dans la jambe jusqu\'au pied',
      'Perte de force dans une jambe ou un pied',
      'Troubles urinaires ou intestinaux',
      'Fièvre associée au mal de dos',
      'Douleur nocturne qui vous réveille et ne passe pas',
      'Perte de poids inexpliquée'
    ],
    closingMessage: 'Dans 90% des cas, le mal de dos s\'améliore en quelques semaines avec du mouvement adapté. Si ça ne va pas mieux ou si vous avez un signal d\'alerte, on en parle en consultation.'
  },

  // 4. JAMBES LOURDES
  {
    id: 'jambes-lourdes',
    slug: 'jambes-lourdes',
    title: 'J\'ai les jambes lourdes',
    subtitle: 'Soulager rapidement et durablement',
    icon: '🦵',
    color: 'primary',
    intro: `Les jambes lourdes, les chevilles gonflées le soir, cette sensation de lourdeur en fin de journée... C'est souvent lié à une mauvaise circulation veineuse. Bonne nouvelle : beaucoup de choses simples peuvent vous soulager.`,
    truths: [
      {
        myth: '« Les varices, c\'est juste esthétique. »',
        truth: 'Les varices sont le signe d\'une insuffisance veineuse. Sans prise en charge, ça peut évoluer vers des complications (ulcères, phlébites). Consulter n\'est pas du luxe.'
      },
      {
        myth: '« Je suis debout toute la journée, c\'est normal d\'avoir mal. »',
        truth: 'C\'est fréquent, mais pas une fatalité. Des gestes simples (marcher, surélever les jambes, porter des bas de contention) changent vraiment la donne.'
      },
      {
        myth: '« Les bas de contention, c\'est pour les vieux. »',
        truth: 'C\'est le traitement le plus efficace, à tout âge. Aujourd\'hui, ils sont fins, discrets, et remboursés sur prescription.'
      }
    ],
    dailyPlan: [
      {
        time: 'Maintenant',
        action: 'Surélevez vos jambes',
        detail: 'Allongez-vous, jambes plus hautes que le cœur. 10 minutes. Le sang va refluer vers le cœur.'
      },
      {
        time: 'Toutes les heures',
        action: 'Activez vos mollets',
        detail: 'Debout, montez sur la pointe des pieds 10 fois. Les mollets sont la « pompe » du retour veineux.'
      },
      {
        time: 'Ce soir',
        action: 'Douche froide sur les jambes',
        detail: 'Terminez votre douche par un jet d\'eau fraîche des chevilles aux genoux. 30 secondes suffisent.'
      }
    ],
    sevenDayPlan: [
      {
        day: 'Jour 1',
        actions: ['Surélever les jambes 10 min matin et soir', 'Exercices de mollets 3x10', 'Jet d\'eau froide']
      },
      {
        day: 'Jour 2',
        actions: ['Marche 20 min', 'Éviter de croiser les jambes', 'Boire 1,5L d\'eau']
      },
      {
        day: 'Jour 3',
        actions: ['Marche 25 min', 'Surélever les pieds du lit (5 cm)', 'Exercices de cheville']
      },
      {
        day: 'Jour 4',
        actions: ['Porter des bas de contention (si vous en avez)', 'Marche 30 min', 'Éviter le chauffage par le sol']
      },
      {
        day: 'Jour 5',
        actions: ['Marche ou vélo 30 min', 'Massage des jambes du bas vers le haut', 'Pas de vêtements serrés']
      },
      {
        day: 'Jour 6',
        actions: ['Natation ou aquagym si possible', 'Continuer les exercices quotidiens', 'Noter l\'amélioration']
      },
      {
        day: 'Jour 7',
        actions: ['Bilan de la semaine', 'Prendre RDV médecin si besoin de bas de contention', 'Maintenir les bonnes habitudes']
      }
    ],
    alertSigns: [
      'Mollet rouge, chaud et douloureux (risque de phlébite)',
      'Douleur soudaine et intense dans une jambe',
      'Plaie qui ne cicatrise pas sur la jambe',
      'Gonflement d\'une seule jambe brutalement',
      'Fièvre associée à une jambe gonflée'
    ],
    closingMessage: 'Les jambes lourdes se soulagent bien avec des mesures simples. Mais si vous avez des varices visibles ou des symptômes qui persistent, consultez pour évaluer l\'insuffisance veineuse.'
  },

  // 5. ESSOUFFLEMENT (BPCO/ASTHME)
  {
    id: 'essoufflement',
    slug: 'essoufflement',
    title: 'Je suis essoufflé',
    subtitle: 'Mieux respirer au quotidien',
    icon: '🫁',
    color: 'secondary',
    intro: `L'essoufflement, c'est difficile à vivre. On a peur de bouger, peur de ne plus pouvoir respirer. Mais voilà le paradoxe : moins on bouge, plus on s'essouffle. Je vais vous expliquer comment reprendre le contrôle, à votre rythme.`,
    truths: [
      {
        myth: '« Je suis essoufflé, je dois éviter les efforts. »',
        truth: 'C\'est l\'inverse. L\'activité physique régulière améliore la capacité respiratoire. Les muscles se fatiguent moins, le cœur travaille mieux. Commencez doucement.'
      },
      {
        myth: '« L\'essoufflement, c\'est normal en vieillissant. »',
        truth: 'Un essoufflement qui s\'aggrave n\'est jamais « normal ». Ça peut être l\'asthme, la BPCO, le cœur. Ça mérite d\'être exploré et pris en charge.'
      },
      {
        myth: '« Avec une BPCO, on ne peut plus rien faire. »',
        truth: 'On peut très bien vivre avec une BPCO si elle est bien prise en charge. L\'arrêt du tabac, la réhabilitation respiratoire et l\'activité physique font des miracles.'
      }
    ],
    dailyPlan: [
      {
        time: 'Maintenant',
        action: 'Pratiquez la respiration lèvres pincées',
        detail: 'Inspirez par le nez (2 secondes), expirez lentement par les lèvres presque fermées (4 secondes). 5 cycles.'
      },
      {
        time: 'Aujourd\'hui',
        action: 'Marchez 5 minutes, même très lentement',
        detail: 'À votre rythme. Si vous êtes essoufflé, ralentissez mais ne vous arrêtez pas. C\'est normal d\'être essoufflé à l\'effort.'
      },
      {
        time: 'Ce soir',
        action: 'Dormez légèrement surélevé',
        detail: 'Un oreiller supplémentaire sous la tête et le dos. Ça facilite la respiration nocturne.'
      }
    ],
    sevenDayPlan: [
      {
        day: 'Jour 1',
        actions: ['Respiration lèvres pincées 3x/jour', 'Marche 5 min', 'Noter le niveau d\'essoufflement']
      },
      {
        day: 'Jour 2',
        actions: ['Respiration abdominale 5 min', 'Marche 7 min', 'Éviter les irritants (fumée, parfums)']
      },
      {
        day: 'Jour 3',
        actions: ['Marche 10 min (même lentement)', 'Exercices de bras assis', 'Aérer la maison']
      },
      {
        day: 'Jour 4',
        actions: ['Marche 10 min', 'Montée de quelques marches', 'Continuer la respiration lèvres pincées']
      },
      {
        day: 'Jour 5',
        actions: ['Marche 12 min', 'Exercices d\'équilibre', 'Vérifier la technique d\'inhalateur si concerné']
      },
      {
        day: 'Jour 6',
        actions: ['Marche 15 min', 'Activité douce au choix', 'Évaluer les progrès']
      },
      {
        day: 'Jour 7',
        actions: ['Bilan de la semaine', 'Planifier RDV pneumologue si pas de suivi', 'Continuer l\'effort régulier']
      }
    ],
    alertSigns: [
      'Essoufflement brutal et intense',
      'Lèvres ou ongles bleutés',
      'Douleur thoracique avec l\'essoufflement',
      'Incapacité de parler à cause de l\'essoufflement',
      'Fièvre avec difficultés respiratoires',
      'Crachats de sang'
    ],
    closingMessage: 'L\'essoufflement chronique mérite toujours une évaluation médicale. Avec un bon traitement et de l\'activité physique adaptée, on peut vraiment améliorer sa qualité de vie.'
  },

  // 6. OTITES/ANGINES ENFANT
  {
    id: 'orl-enfant',
    slug: 'orl-enfant',
    title: 'Mon enfant fait encore une otite/angine',
    subtitle: 'Comprendre et prévenir les récidives',
    icon: '👶',
    color: 'destructive',
    intro: `Votre enfant enchaîne les otites ou les angines ? Vous vous demandez si c'est normal, si vous faites quelque chose de mal ? Non, vous ne faites rien de mal. C'est très fréquent chez les petits. Voici ce que vous pouvez faire pour l'aider.`,
    truths: [
      {
        myth: '« Mon enfant est tout le temps malade, il a un problème immunitaire. »',
        truth: 'Un enfant de moins de 6 ans fait 6 à 10 infections par an, c\'est normal. Son système immunitaire apprend. Ce n\'est pas un déficit immunitaire.'
      },
      {
        myth: '« Il faut des antibiotiques à chaque otite. »',
        truth: 'Pas forcément. Beaucoup d\'otites guérissent seules. Le médecin évalue au cas par cas. Les antibiotiques ne sont pas toujours nécessaires, surtout après 2 ans.'
      },
      {
        myth: '« La crèche, c\'est la source de tous les problèmes. »',
        truth: 'La crèche expose à plus de virus, c\'est vrai. Mais c\'est aussi là que l\'immunité se construit. Ces enfants sont souvent moins malades à l\'école primaire.'
      }
    ],
    dailyPlan: [
      {
        time: 'Matin et soir',
        action: 'Lavez le nez de votre enfant',
        detail: 'Sérum physiologique ou spray d\'eau de mer. Même s\'il proteste ! Un nez propre = moins d\'otites.'
      },
      {
        time: 'Toute la journée',
        action: 'Aérez les pièces',
        detail: '10 minutes matin et soir, même en hiver. L\'air renouvelé réduit la charge virale dans la maison.'
      },
      {
        time: 'Le soir',
        action: 'Couchez-le légèrement surélevé',
        detail: 'Un coussin sous le matelas (pas sous la tête). Ça aide au drainage des sinus.'
      }
    ],
    sevenDayPlan: [
      {
        day: 'Jour 1',
        actions: ['Lavage de nez matin et soir', 'Aérer 10 min', 'Vérifier l\'humidité de la chambre (40-60%)']
      },
      {
        day: 'Jour 2',
        actions: ['Lavage de nez x2', 'Pas de tabagisme passif', 'Laver les doudous à 60°C']
      },
      {
        day: 'Jour 3',
        actions: ['Lavage de nez x2', 'Moucher correctement (une narine à la fois)', 'Éviter les biberons couchés']
      },
      {
        day: 'Jour 4',
        actions: ['Lavage de nez x2', 'Limiter la tétine si > 1 an', 'Vérifier vaccinations à jour']
      },
      {
        day: 'Jour 5',
        actions: ['Lavage de nez x2', 'Sortir à l\'air libre 30 min', 'Surveiller les signes d\'otite']
      },
      {
        day: 'Jour 6',
        actions: ['Lavage de nez x2', 'Hydrater (eau, pas de jus)', 'Éviter la surchauffe (19°C chambre)']
      },
      {
        day: 'Jour 7',
        actions: ['Bilan de la semaine', 'Intégrer le lavage de nez comme routine', 'Consulter si symptômes persistants']
      }
    ],
    alertSigns: [
      'Fièvre > 39°C qui ne baisse pas avec le paracétamol',
      'Enfant très abattu, qui ne joue plus',
      'Écoulement de l\'oreille (liquide, pus)',
      'Difficultés à respirer ou avaler',
      'Rougeur et gonflement derrière l\'oreille',
      'Raideur de la nuque',
      'Bébé de moins de 3 mois avec fièvre'
    ],
    closingMessage: 'Les infections ORL répétées s\'améliorent avec l\'âge et les bons gestes de prévention. Si votre enfant fait plus de 3-4 otites par hiver, on peut envisager des solutions avec l\'ORL.'
  }
];

// Helper function to get a quick answer by slug
export const getQuickAnswerBySlug = (slug: string): FullQuickAnswer | undefined => {
  return fullQuickAnswers.find(qa => qa.slug === slug);
};
