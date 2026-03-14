import type { ParcoursContent } from './types';

export const gonarthroseParcours: ParcoursContent = {
  slug: 'gonarthrose',
  title: 'Arthrose du genou',
  subtitle: 'Comprendre, agir, consolider',
  description: '21 jours pour apprendre à vivre mieux avec votre genou.',
  icon: '🦵',
  proInstrument: 'koos-ps',
  proIntro: "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre genou ?",
  days: [
    // ========== SEMAINE 1 : COMPRENDRE (J1-J7) ==========
    {
      day: 1,
      theme: "Qu'est-ce que l'arthrose ?",
      phase: 'comprendre',
      content: {
        title: "Votre genou, comment ça marche ?",
        body: "L'arthrose du genou, c'est l'usure progressive du cartilage qui recouvre les os de votre articulation. Ce cartilage, normalement lisse et souple, s'amincit avec le temps.\n\nMais voici ce qui est important : **l'arthrose n'est pas une condamnation.** La douleur que vous ressentez ne reflète pas toujours l'état réel de votre genou. Beaucoup de personnes avec une arthrose visible à la radio n'ont aucune douleur, et inversement.\n\nCe qui compte vraiment, c'est ce que vous faites au quotidien. L'exercice adapté, le maintien d'un poids raisonnable, et la compréhension de votre maladie sont les trois piliers du traitement.\n\nPendant ces 3 semaines, vous allez apprendre à prendre soin de votre genou — pas en le ménageant, mais en le faisant bouger intelligemment.",
        keyMessage: "L'arthrose n'est pas une fatalité. Votre genou a besoin de mouvement, pas de repos.",
        source: "NICE NG226 (2022), OARSI 2019",
      },
      action: {
        title: "Marche douce — 5 minutes",
        description: "Faites une marche de 5 minutes à votre rythme, sur terrain plat. Pas besoin d'aller vite. L'objectif est simplement de bouger votre genou en douceur. Si vous avez mal, ralentissez, mais ne vous arrêtez pas.",
        duration: "5 min",
      },
    },
    {
      day: 2,
      theme: "Bouger ne détruit pas votre genou",
      phase: 'comprendre',
      content: {
        title: "L'exercice protège votre cartilage",
        body: "Beaucoup de patients pensent que bouger va « user » leur genou encore plus vite. C'est faux. Les études scientifiques sont unanimes : **l'exercice adapté est le traitement n°1 de l'arthrose du genou.** Plus efficace que les médicaments seuls.\n\nPourquoi ? Parce que le cartilage n'a pas de vaisseaux sanguins. Il se nourrit comme une éponge : quand vous bougez, le liquide articulaire entre et sort du cartilage, lui apportant les nutriments dont il a besoin.\n\nSi vous restez immobile, votre cartilage « s'assèche ». Les muscles autour du genou s'affaiblissent, et l'articulation devient instable. C'est un cercle vicieux : moins on bouge → plus on a mal → moins on bouge.\n\nL'exercice brise ce cercle. Pas en forçant, mais en bougeant régulièrement et progressivement.",
        keyMessage: "Le mouvement nourrit votre cartilage. L'immobilité l'appauvrit.",
        source: "Cochrane 2015, NICE NG226",
      },
      action: {
        title: "Flexions douces assis — 3 séries de 5",
        description: "Assis sur une chaise, glissez lentement votre pied en arrière (genou plié) puis en avant (genou tendu). Faites 5 mouvements lents, repos 30 secondes, puis recommencez 2 fois. Respirez normalement.",
        duration: "3 min",
      },
    },
    {
      day: 3,
      theme: "Comprendre votre douleur",
      phase: 'comprendre',
      content: {
        title: "La douleur n'est pas toujours un signal de danger",
        body: "Quand votre genou fait mal, votre premier réflexe est de penser : « quelque chose se casse ». Dans l'arthrose chronique, ce n'est généralement pas le cas.\n\nLa douleur chronique est un signal d'alarme qui s'est « déréglé ». Votre système nerveux est devenu hypersensible : il envoie des signaux de douleur pour des mouvements qui ne sont pas dangereux.\n\nCela ne veut pas dire que la douleur n'est pas réelle — elle l'est absolument. Mais comprendre qu'elle n'est pas proportionnelle aux dégâts vous permet de **bouger avec plus de confiance**.\n\nLa règle des 24h : si votre douleur augmente pendant un exercice mais revient à la normale en 24h, c'est que l'exercice était adapté. Si la douleur persiste plus de 24h, réduisez l'intensité la prochaine fois.",
        keyMessage: "Douleur pendant l'exercice ≠ danger. Utilisez la règle des 24h pour vous guider.",
        source: "NICE NG226, Pain Education literature",
      },
      action: {
        title: "Respiration de relaxation — 3 minutes",
        description: "Assis confortablement, inspirez par le nez sur 4 secondes, puis expirez par la bouche sur 6 secondes. Répétez pendant 3 minutes. Cela aide à réduire la tension musculaire autour du genou.",
        duration: "3 min",
      },
    },
    {
      day: 4,
      theme: "Le poids et votre genou",
      phase: 'comprendre',
      content: {
        title: "Chaque kilo compte — littéralement",
        body: "Saviez-vous que quand vous marchez, votre genou supporte 3 à 4 fois votre poids ? Cela signifie que perdre 1 kg, c'est soulager votre genou de 3 à 4 kg à chaque pas.\n\nLes études montrent qu'une perte de seulement 5 à 10% du poids corporel réduit significativement la douleur et améliore la fonction du genou. Pour une personne de 80 kg, cela représente 4 à 8 kg.\n\nPas besoin de régime drastique. De petits changements durables sont plus efficaces : réduire les portions, manger plus de légumes, limiter les aliments ultra-transformés, et surtout **bouger régulièrement** (ce que vous êtes en train de faire !).\n\nSi le poids n'est pas un problème pour vous, ce message ne vous concerne pas. Concentrez-vous sur les exercices.",
        keyMessage: "Perdre 1 kg = soulager votre genou de 3 à 4 kg à chaque pas.",
        source: "Messier et al. 2005, OARSI 2019",
      },
      action: {
        title: "Marche — 7 minutes",
        description: "Même principe que le jour 1, mais 2 minutes de plus. Terrain plat, à votre rythme. Si vous vous sentez bien, essayez un léger terrain vallonné.",
        duration: "7 min",
      },
    },
    {
      day: 5,
      theme: "Ce qui marche vraiment",
      phase: 'comprendre',
      content: {
        title: "Les traitements passés au crible de la science",
        body: "**Ce qui marche vraiment :**\n• Exercice régulier (renforcement + marche) — preuve très forte\n• Perte de poids si surpoids — preuve forte\n• Éducation (comprendre sa maladie) — preuve forte\n• Kinésithérapie supervisée — preuve forte\n\n**Ce qui aide un peu :**\n• Chaleur locale avant l'exercice — preuve modérée\n• Chaussures adaptées — preuve modérée\n• Canne (côté opposé au genou) — preuve modérée\n\n**Ce qui n'a pas de preuve solide :**\n• Compléments alimentaires (glucosamine, chondroïtine)\n• Genouillères magnétiques\n• Remèdes « miracles »\n\nLe message clé : l'exercice bat les médicaments. C'est vous le meilleur traitement de votre arthrose.",
        keyMessage: "L'exercice est plus efficace que les médicaments. Vous êtes votre meilleur traitement.",
        source: "NICE NG226, OARSI 2019, Cochrane Reviews",
      },
      action: {
        title: "Ponts fessiers — 5 répétitions",
        description: "Allongé sur le dos, genoux pliés, pieds à plat au sol. Soulevez les fesses lentement, maintenez 5 secondes en haut, redescendez doucement. 5 répétitions. Renforce les muscles qui soutiennent votre genou.",
        duration: "3 min",
      },
    },
    {
      day: 6,
      theme: "La cure thermale et votre genou",
      phase: 'comprendre',
      content: {
        title: "Comment l'eau chaude aide votre arthrose",
        body: "La cure thermale n'est pas un remède miracle, mais la science montre des bénéfices réels et mesurables.\n\nL'étude Thermarthrose a montré que la cure thermale, combinée aux soins habituels, apporte une amélioration supérieure à celle des soins seuls. Les patients améliorent leur douleur de 20 à 30% en moyenne, et ces effets persistent 3 à 6 mois.\n\nComment ça marche ?\n• La chaleur de l'eau détend les muscles et réduit la raideur\n• La flottaison réduit la charge sur le genou\n• L'environnement thermal favorise le mouvement et la confiance\n• Le programme d'exercices en piscine renforce sans douleur\n\nMais attention : les patients qui tirent le plus de bénéfice sont ceux qui **continuent à bouger après la cure**. La cure est un tremplin, pas une fin en soi.",
        keyMessage: "La cure est un tremplin. Les bénéfices durent si vous continuez les exercices après.",
        source: "Thermarthrose (Forestier 2009), Académie Nationale de Médecine 2019",
      },
      action: {
        title: "Exercice en piscine thermale",
        description: "Pendant votre séance en piscine aujourd'hui, essayez 10 flexions-extensions du genou dans l'eau. L'eau chaude réduit la douleur et la flottaison facilite le mouvement. Si pas de piscine aujourd'hui, faites 5 min de marche.",
        duration: "5 min",
      },
    },
    {
      day: 7,
      theme: "Bilan semaine 1",
      phase: 'comprendre',
      content: {
        title: "Ce que vous avez appris cette semaine",
        body: "Bravo, vous avez terminé la première semaine ! Récapitulons :\n\n• L'arthrose n'est pas une condamnation — vous pouvez agir\n• Bouger protège votre cartilage (ne l'use pas)\n• La douleur chronique n'est pas proportionnelle aux dégâts\n• Chaque kilo perdu soulage votre genou de 3-4 kg\n• L'exercice est le traitement n°1\n• La cure est un tremplin vers une vie plus active\n\nLa semaine prochaine, on passe à l'action : les exercices clés pour renforcer votre genou et gérer les mauvais jours.",
        keyMessage: "Semaine 1 terminée. Vous comprenez maintenant pourquoi le mouvement est votre allié.",
        source: "Synthèse NICE/OARSI/Cochrane",
      },
      action: {
        title: "Marche bilan — 10 minutes",
        description: "Marche de 10 minutes. Comparez vos sensations avec le jour 1.",
        duration: "10 min",
      },
      hasMiniPro: true,
      quiz: [
        {
          question: "L'exercice use-t-il le cartilage ?",
          options: ["Oui, il faut se reposer", "Non, il nourrit le cartilage", "Ça dépend"],
          correctIndex: 1,
          explanation: "Le cartilage se nourrit par le mouvement, comme une éponge.",
        },
        {
          question: "Perdre 1 kg soulage votre genou de combien ?",
          options: ["1 kg", "2 kg", "3 à 4 kg"],
          correctIndex: 2,
          explanation: "À la marche, votre genou supporte 3 à 4 fois votre poids.",
        },
        {
          question: "Quel est le traitement n°1 de l'arthrose ?",
          options: ["Les médicaments", "L'exercice adapté", "Les infiltrations"],
          correctIndex: 1,
          explanation: "L'exercice est plus efficace que les médicaments seuls.",
        },
      ],
    },

    // ========== SEMAINE 2 : AGIR (J8-J14) ==========
    {
      day: 8,
      theme: "Votre programme d'exercices",
      phase: 'agir',
      content: {
        title: "Les 5 exercices essentiels",
        body: "Cette semaine, vous apprenez un circuit de 5 exercices simples pour renforcer les muscles qui protègent votre genou.\n\n**Les 5 exercices :**\n• Contraction du quadriceps — renforce l'avant de la cuisse\n• Flexion-extension sur chaise — améliore la mobilité\n• Lever de jambe tendue — renforce sans plier le genou\n• Mini-squats — renforce tout en douceur\n• Étirement du quadriceps — assouplit et détend\n\nChaque exercice a 3 niveaux. Commencez par le plus facile. Règle d'or : si la douleur persiste plus de 24h, réduisez.",
        keyMessage: "5 exercices simples, 10 minutes par jour.",
        source: "NICE NG226, Cochrane 2015",
      },
      action: {
        title: "Circuit découverte — 10 min",
        description: "Chaque exercice 5 fois (niveau facile) : contraction quadriceps (5s), flexions chaise, levers de jambe, mini-squats (mains sur dossier), étirement quadriceps (30s). Prenez votre temps.",
        duration: "10 min",
      },
    },
    {
      day: 9,
      theme: "Renforcement du quadriceps",
      phase: 'agir',
      content: {
        title: "Le muscle clé de votre genou",
        body: "Le quadriceps est le protecteur n°1 de votre genou. Quand il est fort, il absorbe les chocs et stabilise l'articulation. Renforcer le quadriceps réduit la douleur autant qu'un anti-inflammatoire — sans les effets secondaires.\n\n**Exercice du jour : Extension assis**\nAssis sur une chaise, tendez lentement la jambe devant vous. Maintenez 5 secondes, redescendez doucement. Mouvement lent et contrôlé.\n\nErreurs à éviter :\n• Aller trop vite\n• Retenir sa respiration\n• Forcer en fin d'extension",
        keyMessage: "Un quadriceps fort = un genou protégé.",
        source: "Cochrane 2015, NICE NG226",
      },
      action: {
        title: "Extensions assis — 3×8",
        description: "Assis, tendez la jambe, maintenez 5s, redescendez. 8 répétitions × 3 séries. Repos 30s entre séries. Les deux jambes.",
        duration: "8 min",
      },
    },
    {
      day: 10,
      theme: "Étirements qui soulagent",
      phase: 'agir',
      content: {
        title: "Assouplir pour moins souffrir",
        body: "Les muscles autour du genou se raidissent quand on a mal. Les étirements réguliers réduisent la raideur matinale, améliorent l'amplitude de mouvement, et facilitent la marche.\n\n**3 zones à étirer :**\n• Quadriceps (avant de la cuisse)\n• Ischio-jambiers (arrière de la cuisse)\n• Mollets\n\nTenez chaque étirement 30 secondes, sans à-coups. Tension douce, jamais de douleur vive. Étirez-vous après les exercices, quand les muscles sont chauds.",
        keyMessage: "Étirez-vous 5 minutes après chaque séance.",
        source: "OARSI 2019",
      },
      action: {
        title: "Routine étirements — 5 min",
        description: "Debout (appui chaise) : 1) Quadriceps : pliez le genou, attrapez la cheville derrière, 30s/jambe. 2) Ischio-jambiers : pied sur marche basse, penchez-vous, 30s. 3) Mollets : mains au mur, jambe tendue derrière, 30s.",
        duration: "5 min",
      },
    },
    {
      day: 11,
      theme: "La marche thérapeutique",
      phase: 'agir',
      content: {
        title: "Marcher mieux, pas forcément plus",
        body: "La qualité compte plus que la quantité.\n\n**Conseils :**\n• Commencez par 10-15 min, +2 min par semaine\n• Terrain plat de préférence\n• Chaussures à semelles souples avec amorti\n• Si douleur, ralentissez mais ne vous arrêtez pas\n• Alternez marche et pauses si nécessaire\n\n**Objectif :** 30 min/jour, en une ou plusieurs fois. 3 marches de 10 min donnent le même bénéfice que 30 min d'affilée.",
        keyMessage: "30 min/jour (même fractionnées) est l'objectif.",
        source: "OARSI 2019, Thermarthrose",
      },
      action: {
        title: "Marche continue — 15 min",
        description: "Parcours plat, 15 min sans arrêt. Si trop : 2×7 min avec pause 2 min. Notez votre ressenti.",
        duration: "15 min",
      },
    },
    {
      day: 12,
      theme: "Gérer les poussées",
      phase: 'agir',
      content: {
        title: "Que faire quand ça fait plus mal ?",
        body: "Les poussées sont normales. Elles ne signifient pas que votre genou empire.\n\n**Plan d'action poussée :**\n• Ne paniquez pas — c'est temporaire (2 à 5 jours)\n• Réduisez l'intensité, mais continuez à bouger doucement\n• Froid : 15 min avec linge entre peau et glace\n• Paracétamol si besoin (max 3g/jour)\n• Mobilisez doucement : flexions-extensions assis\n• Reprenez progressivement\n\n**Ce qu'il ne faut PAS faire :**\n• S'arrêter complètement\n• Rester au lit\n• Prendre des anti-inflammatoires sans avis médical",
        keyMessage: "Poussée = temporaire. Réduisez l'intensité mais continuez à bouger.",
        source: "NICE NG226",
      },
      action: {
        title: "Plan d'action poussée",
        description: "Notez les 6 étapes du plan d'action sur papier ou téléphone. Gardez-le accessible. C'est votre trousse de secours.",
        duration: "5 min",
      },
    },
    {
      day: 13,
      theme: "Sommeil et douleur",
      phase: 'agir',
      content: {
        title: "Mieux dormir pour moins souffrir",
        body: "La douleur empêche de dormir, et le manque de sommeil augmente la douleur. Cercle vicieux.\n\n**Conseils :**\n• Dormez sur le dos avec coussin sous les genoux, ou sur le côté avec coussin entre les genoux\n• Chambre à 18-20°C\n• Heures régulières\n• Pas d'écran 1h avant le coucher\n• Bouillotte sur le genou 15 min avant le coucher\n• 5 min de mobilisation douce du genou au coucher\n\nSi les douleurs nocturnes vous réveillent régulièrement, parlez-en à votre médecin.",
        keyMessage: "Coussin entre les genoux + routine régulière = mieux dormir.",
        source: "NICE NG226",
      },
      action: {
        title: "Routine du soir — 5 min",
        description: "Ce soir : 1) 3 min de flexions-extensions douces au lit. 2) Coussin entre/sous les genoux. 3) 2 min de respiration lente (4s inspir, 6s expir).",
        duration: "5 min",
      },
    },
    {
      day: 14,
      theme: "Bilan semaine 2",
      phase: 'agir',
      content: {
        title: "Vos progrès à mi-parcours",
        body: "Deux semaines ! Vous avez maintenant :\n\n• Un circuit de 5 exercices\n• Une routine d'étirements\n• Un plan de marche progressif\n• Un plan d'action pour les poussées\n• Des techniques pour mieux dormir\n\nComparez vos sensations avec le début : la douleur a-t-elle changé ? Faites-vous des choses que vous ne faisiez pas avant ? La semaine 3 consolidera ces acquis pour qu'ils durent après la cure.",
        keyMessage: "Mi-parcours. Vous avez les outils.",
        source: "Synthèse",
      },
      action: {
        title: "Circuit complet — 12 min",
        description: "Circuit des 5 exercices (8 reps chacun) + 3 étirements (30s). Chronométrez : c'est le temps de votre routine post-cure.",
        duration: "12 min",
      },
      hasMiniPro: true,
      quiz: [
        {
          question: "Que faire en cas de poussée ?",
          options: ["Arrêter tout mouvement", "Réduire l'intensité mais bouger", "Anti-inflammatoires immédiatement"],
          correctIndex: 1,
          explanation: "Réduisez l'intensité, froid, mais continuez des mouvements doux.",
        },
        {
          question: "Marche recommandée par jour ?",
          options: ["5 minutes", "30 minutes (fractionnables)", "1 heure minimum"],
          correctIndex: 1,
          explanation: "30 min/jour, en une ou plusieurs fois.",
        },
        {
          question: "Combien de temps durent les bénéfices de la cure si vous continuez les exercices ?",
          options: ["6 à 9 mois", "2 semaines seulement", "Pas de bénéfice prouvé"],
          correctIndex: 0,
          explanation: "Les patients qui maintiennent leurs exercices après la cure gardent les bénéfices 6 à 9 mois.",
        },
      ],
    },

    // ========== SEMAINE 3 : CONSOLIDER (J15-J21) ==========
    {
      day: 15,
      theme: "Mon plan post-cure",
      phase: 'consolider',
      content: {
        title: "Préparer la suite dès maintenant",
        body: "Les bénéfices de la cure peuvent durer 3 à 6 mois — si vous continuez à bouger.\n\n**Votre plan post-cure :**\n• Exercices : circuit de 5, 3x/semaine minimum\n• Marche : 30 min/jour\n• Étirements : après chaque séance, 5 min\n• Activité plaisir : natation, vélo, aquagym, jardinage...\n\nLe secret n'est pas la perfection, c'est la régularité. Mieux vaut 10 min 5 fois par semaine que 1h une fois.",
        keyMessage: "La régularité bat l'intensité.",
        source: "OARSI 2019",
      },
      action: {
        title: "Écrire 3 objectifs personnels",
        description: "Sur papier, écrivez 3 objectifs réalistes pour 3 mois. Ex : « Marcher 20 min/jour », « Exercices 3x/semaine », « Reprendre le jardinage ». Gardez-les visibles chez vous.",
        duration: "5 min",
      },
    },
    {
      day: 16,
      theme: "Adapter son quotidien",
      phase: 'consolider',
      content: {
        title: "Petits changements, grands résultats",
        body: "**Chez vous :**\n• Mains courantes dans les escaliers\n• Rehausseur de toilettes si WC très bas\n• Siège de douche\n• Éviter les canapés très profonds et bas\n\n**Au quotidien :**\n• Alterner les positions (pas > 30 min assis/debout)\n• Caddie ou sac à dos plutôt que cabas lourd\n• Escaliers : bonne jambe d'abord en montant\n• Chaussures avec bon amorti",
        keyMessage: "De petites adaptations protègent votre genou sans changer votre vie.",
        source: "NICE NG226",
      },
      action: {
        title: "1 changement concret",
        description: "Identifiez 1 adaptation pour votre domicile. Notez-la. Ce soir, montez un escalier « bonne jambe d'abord ».",
        duration: "5 min",
      },
    },
    {
      day: 17,
      theme: "Activité physique adaptée",
      phase: 'consolider',
      content: {
        title: "Trouver votre activité plaisir",
        body: "L'exercice le plus efficace est celui que vous ferez réellement.\n\n**Recommandées :**\n• Marche (le plus simple)\n• Natation / aquagym (très doux)\n• Vélo (peu d'impact)\n• Yoga / tai-chi (mobilité, équilibre)\n• Jardinage adapté\n\n**L'idéal :** combiner 2-3 activités. Marche quotidienne + natation 1x/semaine + renforcement 3x/semaine.",
        keyMessage: "Le meilleur exercice est celui que vous ferez.",
        source: "OARSI 2019",
      },
      action: {
        title: "Tester une activité",
        description: "Essayez une activité inhabituelle : aquagym aux thermes, vélo, yoga. Notez votre ressenti. Pourriez-vous continuer chez vous ?",
        duration: "15-30 min",
      },
    },
    {
      day: 18,
      theme: "Nutrition et arthrose",
      phase: 'consolider',
      content: {
        title: "Ce que dit la science sur l'alimentation",
        body: "**Ce qui aide :**\n• Alimentation méditerranéenne (fruits, légumes, poisson, huile d'olive)\n• Oméga-3 (poisson gras 2x/semaine)\n• Poids raisonnable — l'effet le plus prouvé\n• Hydratation 1,5L/jour\n\n**Pas de preuve solide :**\n• Curcuma en complément\n• Glucosamine / chondroïtine\n• Régimes d'exclusion (sans gluten, sans lait)\n\nMangez varié, en quantité raisonnable, avec beaucoup de légumes.",
        keyMessage: "Pas de régime miracle. Méditerranéen + poids raisonnable.",
        source: "OARSI 2019",
      },
      action: {
        title: "1 changement alimentaire",
        description: "Identifiez un petit changement : huile d'olive au lieu du beurre, un légume à chaque repas, poisson 2x cette semaine.",
        duration: "5 min",
      },
    },
    {
      day: 19,
      theme: "Gestion du stress",
      phase: 'consolider',
      content: {
        title: "Le stress amplifie votre douleur",
        body: "Le stress chronique augmente la sensibilité à la douleur, contracte les muscles, et détériore le sommeil.\n\n**Techniques :**\n• **Cohérence cardiaque** — 5 min, 3x/jour : inspirez 5s, expirez 5s\n• **Activité physique** — votre programme quotidien fait double emploi\n• **Contact social** — parler, rire, partager\n• **Pleine conscience** — 5 min de méditation simple\n\nChoisissez une technique et essayez-la quotidiennement pendant 1 semaine.",
        keyMessage: "Le stress augmente la douleur. La cohérence cardiaque est l'outil le plus simple.",
        source: "NICE NG226",
      },
      action: {
        title: "Cohérence cardiaque — 5 min",
        description: "Assis, yeux fermés. Inspirez nez 5s, expirez bouche 5s. 5 minutes (30 cycles). App gratuite « RespiRelax » pour vous guider.",
        duration: "5 min",
      },
    },
    {
      day: 20,
      theme: "Prévention des rechutes",
      phase: 'consolider',
      content: {
        title: "Signaux d'alerte et quand consulter",
        body: "**Normal (pas d'inquiétude) :**\n• Douleur après activité inhabituelle → règle des 24h\n• Raideur matinale < 30 min → mouvements doux au lever\n• Petite poussée → plan d'action (J12)\n\n**Consultez votre médecin :**\n• Douleur nocturne intense et persistante\n• Gonflement soudain et important\n• Blocage complet du genou\n• Genou rouge et chaud avec fièvre\n• Perte de poids inexpliquée\n\n**Votre trousse anti-crise :**\n• Ce programme (votre code ÉTUVE)\n• Plan d'action poussée (J12)\n• Vos 3 objectifs (J15)\n• Numéro du médecin traitant",
        keyMessage: "Préparez votre trousse anti-crise AVANT d'en avoir besoin.",
        source: "NICE NG226",
      },
      action: {
        title: "Préparer sa trousse",
        description: "Rassemblez : plan poussée (J12), 3 objectifs (J15), numéro médecin. Mettez tout au même endroit.",
        duration: "5 min",
      },
    },
    {
      day: 21,
      theme: "Votre bilan final",
      phase: 'consolider',
      content: {
        title: "Bravo — 21 jours accomplis !",
        body: "Vous avez terminé votre parcours de 3 semaines.\n\n**Ce que vous emportez :**\n• La compréhension de votre arthrose\n• Un programme d'exercices personnalisé\n• L'habitude de marcher quotidiennement\n• Un plan d'action pour les mauvais jours\n• 3 objectifs personnels pour la suite\n\n**Maintenant :**\n• Remplissez le questionnaire final pour mesurer vos progrès\n• Vous verrez la comparaison de vos scores avant/après la cure\n• Dans 1 mois et 3 mois, vous pourrez refaire le questionnaire\n\nLes patients qui maintiennent leurs exercices gardent les bénéfices 6 à 9 mois. Ceux qui arrêtent reviennent au point de départ en 3 mois.\n\n**Votre genou compte sur vous. Et vous avez prouvé que vous êtes capable.**",
        keyMessage: "21 jours accomplis. Continuez 3x/semaine pour garder les bénéfices.",
        source: "Thermarthrose, OARSI 2019",
      },
      action: {
        title: "Remplir le bilan final",
        description: "Cliquez ci-dessous pour remplir votre questionnaire de fin de cure et voir vos progrès.",
        duration: "3 min",
      },
    },
  ],
};
