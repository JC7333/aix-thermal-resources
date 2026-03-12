import type { ParcoursContent } from './types';

export const lombalgieParcours: ParcoursContent = {
  slug: 'lombalgie-chronique',
  title: 'Lombalgie chronique',
  subtitle: 'Comprendre, agir, consolider',
  description: '21 jours pour reprendre confiance en votre dos.',
  icon: '🔙',
  proInstrument: 'koos-ps',
  proIntro: "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre dos ?",
  days: [
    // ========== SEMAINE 1 : COMPRENDRE (J1-J7) ==========
    {
      day: 1,
      theme: "Votre dos est solide",
      phase: 'comprendre',
      content: {
        title: "La colonne vertébrale : un pilier robuste",
        body: "La lombalgie chronique, c'est une douleur du bas du dos qui dure depuis plus de 3 mois. Elle touche 1 adulte sur 5, c'est l'une des douleurs les plus fréquentes au monde.\n\nMais voici la bonne nouvelle : **dans plus de 95% des cas, il n'y a pas de lésion grave.** Votre dos est une structure extrêmement solide — 33 vertèbres, des dizaines de muscles, des ligaments puissants. Il est conçu pour porter, bouger, se plier.\n\nAlors pourquoi avez-vous mal ? Parce que votre système d'alarme (la douleur) s'est déréglé. Il envoie des signaux d'alerte alors qu'il n'y a plus de danger réel. C'est comme une alarme de voiture qui se déclenche au vent.\n\nPendant ces 3 semaines, vous allez apprendre à éteindre cette alarme — pas avec des médicaments, mais avec le mouvement, la compréhension, et la confiance.",
        keyMessage: "Votre dos est solide. La douleur chronique est un signal déréglé, pas un signe de fragilité.",
        source: "WHO 2023, NICE NG59",
      },
      action: {
        title: "Marche douce — 5 minutes",
        description: "Marchez 5 minutes à votre rythme. Concentrez-vous sur votre posture naturelle, sans vous raidir. Laissez les bras se balancer. Le dos bouge naturellement pendant la marche — c'est exactement ce qu'il lui faut.",
        duration: "5 min",
      },
    },
    {
      day: 2,
      theme: "Le repos est l'ennemi",
      phase: 'comprendre',
      content: {
        title: "Pourquoi rester au lit aggrave votre dos",
        body: "Le premier réflexe quand on a mal au dos, c'est de s'allonger et de ne plus bouger. C'est exactement l'inverse de ce qu'il faut faire.\n\nLes études sont catégoriques : **le repos au lit prolongé aggrave la lombalgie chronique.** Après 2 jours d'immobilité, vos muscles commencent à fondre, vos disques se déshydratent, et votre cerveau amplifie les signaux de douleur.\n\nC'est le cercle vicieux du déconditionnement :\n• Douleur → repos → muscles plus faibles → dos moins stable → plus de douleur → plus de repos\n\nL'exercice brise ce cercle. Pas en forçant — en bougeant doucement mais régulièrement. Les recommandations de l'OMS (2023) sont claires : **rester actif est le traitement de première intention de la lombalgie chronique.**\n\nVous n'allez pas casser votre dos en bougeant. Vous allez le renforcer.",
        keyMessage: "Le repos prolongé aggrave votre dos. Le mouvement le renforce.",
        source: "WHO 2023, HAS Lombalgie",
      },
      action: {
        title: "Chat-vache — 10 cycles",
        description: "À quatre pattes (genoux et mains au sol). Alternez dos rond (rentrez le ventre, baissez la tête) et dos creux (relevez la tête, cambrez doucement). Mouvements lents et fluides, respirez normalement. 10 cycles.",
        duration: "3 min",
      },
    },
    {
      day: 3,
      theme: "Comprendre votre douleur",
      phase: 'comprendre',
      content: {
        title: "La douleur chronique : un système d'alarme déréglé",
        body: "Dans la lombalgie aiguë (< 6 semaines), la douleur est un signal utile : elle vous dit qu'il y a une lésion et qu'il faut protéger votre dos.\n\nMais dans la lombalgie chronique, **la lésion initiale a guéri.** Les tissus du dos ont une capacité de guérison remarquable — en 6 à 12 semaines, tout est réparé. Alors pourquoi la douleur persiste ?\n\nParce que votre système nerveux est devenu hypersensible. Il a « appris » la douleur et continue à l'envoyer même sans lésion. C'est ce qu'on appelle la sensibilisation centrale.\n\nLes facteurs qui entretiennent cette sensibilisation :\n• La peur de bouger (kinésiophobie)\n• Le stress et l'anxiété\n• Le manque de sommeil\n• L'évitement des activités\n• Les croyances négatives (« mon dos est foutu »)\n\nComprendre cela change tout : **si la douleur n'est pas un signal de danger, vous pouvez bouger avec confiance.**",
        keyMessage: "Votre dos a guéri. C'est votre système d'alarme qui est encore en alerte.",
        source: "WHO 2023, Pain Neuroscience Education",
      },
      action: {
        title: "Respiration abdominale — 3 minutes",
        description: "Allongé sur le dos, genoux pliés. Posez une main sur le ventre. Inspirez par le nez en gonflant le ventre (4 secondes), expirez par la bouche en le rentrant (6 secondes). La main monte et descend. Cela relâche les muscles du dos profonds.",
        duration: "3 min",
      },
    },
    {
      day: 4,
      theme: "Faut-il faire un IRM ?",
      phase: 'comprendre',
      content: {
        title: "L'imagerie : souvent inutile, parfois nuisible",
        body: "Beaucoup de patients veulent un IRM ou un scanner pour « voir ce qui se passe ». La science dit le contraire : **l'imagerie n'est pas recommandée dans la lombalgie chronique sans signe de gravité.**\n\nPourquoi ?\n• Les IRM trouvent des « anomalies » chez 90% des personnes sans douleur : hernies discales, arthrose, protusions... Ce sont des signes normaux de vieillissement, pas des causes de douleur.\n• Voir ces anomalies augmente l'anxiété et la peur de bouger.\n• Cela mène souvent à des traitements inutiles (chirurgie, infiltrations).\n\nL'OMS et la HAS sont claires : une imagerie est justifiée UNIQUEMENT si votre médecin suspecte une cause grave (tumeur, infection, fracture), ce qui est extrêmement rare.\n\nVotre dos est normal. Les anomalies à l'imagerie sont comme les rides de la peau — elles viennent avec l'âge et ne sont pas dangereuses.",
        keyMessage: "Un IRM « anormal » est normal après 50 ans. L'imagerie n'est pas utile sans signe de gravité.",
        source: "WHO 2023, NICE NG59, HAS Lombalgie",
      },
      action: {
        title: "Marche — 8 minutes",
        description: "Marche de 8 minutes, terrain plat. Essayez de balancer naturellement les bras et de détendre les épaules. Le dos bouge à chaque pas — c'est son travail, et il le fait bien.",
        duration: "8 min",
      },
    },
    {
      day: 5,
      theme: "Ce qui marche (et ce qui ne marche pas)",
      phase: 'comprendre',
      content: {
        title: "Les traitements passés au crible de la science",
        body: "**Ce qui marche vraiment :**\n• Exercice régulier (renforcement, marche, yoga, Pilates) — preuve très forte\n• Éducation (comprendre sa douleur) — preuve forte\n• Rester actif au quotidien — preuve forte\n• Approche psycho-comportementale (TCC) si peur du mouvement — preuve forte\n\n**Ce qui aide un peu :**\n• Kinésithérapie manuelle EN COMPLÉMENT de l'exercice — preuve modérée\n• Chaleur locale (bouillotte) — preuve modérée\n• Yoga, tai-chi, Pilates — preuve modérée\n\n**Ce qui n'a pas de preuve solide :**\n• Ceinture lombaire en continu (affaiblit les muscles)\n• Semelles orthopédiques (sauf problème podologique spécifique)\n• Électrostimulation, ultrasons, laser\n• Compléments alimentaires\n\n**Ce qui est souvent inutile ou dangereux :**\n• Repos au lit prolongé — aggrave\n• Opioïdes au long cours — risque de dépendance, peu d'efficacité chronique\n• Chirurgie (sauf cas très spécifiques) — résultats souvent décevants",
        keyMessage: "L'exercice est le traitement n°1. Le repos prolongé et les médicaments seuls ne sont pas la solution.",
        source: "WHO 2023, NICE NG59, Cochrane Reviews",
      },
      action: {
        title: "Gainage latéral — 3 × 10 secondes par côté",
        description: "Sur le côté, appuyé sur l'avant-bras et les genoux (pas les pieds pour le niveau facile). Soulevez les hanches pour faire une ligne droite. Maintenez 10 secondes, reposez. 3 fois chaque côté. Cet exercice renforce les muscles qui stabilisent votre colonne.",
        duration: "3 min",
      },
    },
    {
      day: 6,
      theme: "La cure thermale et votre dos",
      phase: 'comprendre',
      content: {
        title: "L'eau chaude : un allié contre la douleur",
        body: "La cure thermale apporte des bénéfices réels pour la lombalgie chronique. Les études montrent une réduction de la douleur de 20 à 30% et une amélioration de la fonction à 3 mois.\n\nComment ça aide :\n• La chaleur de l'eau détend les muscles contracturés du dos\n• La flottaison soulage la colonne (vous pesez 80% de moins dans l'eau)\n• Les exercices en piscine sont plus faciles et moins douloureux\n• L'environnement de la cure favorise la détente et la confiance\n\nMais le plus grand bénéfice de la cure, c'est qu'elle vous remet en mouvement dans un cadre sécurisant. Les patients qui profitent de la cure pour reprendre une activité physique régulière sont ceux qui en tirent le plus de bénéfices à long terme.\n\n**La cure est un tremplin, pas une béquille.** Ce que vous apprenez ici doit continuer chez vous.",
        keyMessage: "La cure relâche vos muscles et vous remet en mouvement. Le bénéfice dure si vous continuez.",
        source: "Études thermales lombalgie, Consensus",
      },
      action: {
        title: "Exercice en piscine thermale",
        description: "Pendant votre séance en piscine, essayez de marcher dans l'eau pendant 5 minutes. La résistance de l'eau renforce vos muscles sans charger la colonne. Si pas de piscine aujourd'hui, faites 5 min d'exercice chat-vache.",
        duration: "5 min",
      },
    },
    {
      day: 7,
      theme: "Bilan semaine 1",
      phase: 'comprendre',
      content: {
        title: "Ce que vous avez appris cette semaine",
        body: "Bravo, première semaine terminée ! Récapitulons :\n\n• Votre dos est solide — la douleur chronique n'est pas un signe de fragilité\n• Le repos prolongé aggrave, le mouvement renforce\n• La douleur chronique est un système d'alarme déréglé, pas une lésion active\n• L'IRM « anormal » est normal après 50 ans\n• L'exercice est le traitement n°1 (mieux que les médicaments)\n• La cure est un tremplin vers une vie plus active\n\nLa semaine prochaine, on passe à l'action : les exercices clés pour renforcer votre dos et gérer les mauvais jours.",
        keyMessage: "Semaine 1 terminée. Votre dos est plus solide que vous ne le pensez.",
        source: "Synthèse WHO/NICE/HAS",
      },
      action: {
        title: "Marche bilan — 10 minutes",
        description: "Marche de 10 minutes. Comparez vos sensations avec le jour 1. Êtes-vous plus détendu(e) ? Plus confiant(e) ?",
        duration: "10 min",
      },
      hasMiniPro: true,
      quiz: [
        {
          question: "Le repos au lit est-il bon pour la lombalgie chronique ?",
          options: ["Oui, il faut se reposer", "Non, il aggrave la situation", "Seulement 1 semaine"],
          correctIndex: 1,
          explanation: "Le repos prolongé affaiblit les muscles et amplifie la douleur. Le mouvement est le traitement.",
        },
        {
          question: "Un IRM « anormal » signifie-t-il que votre dos est cassé ?",
          options: ["Oui, c'est inquiétant", "Non, c'est normal avec l'âge", "Il faut opérer"],
          correctIndex: 1,
          explanation: "90% des personnes sans douleur ont des « anomalies » à l'IRM. Ce sont des rides du dos.",
        },
        {
          question: "Quel est le traitement n°1 de la lombalgie chronique ?",
          options: ["Les médicaments", "L'exercice régulier", "La ceinture lombaire"],
          correctIndex: 1,
          explanation: "L'OMS et la HAS recommandent l'exercice comme traitement principal.",
        },
      ],
    },

    // ========== SEMAINE 2 : AGIR (J8-J14) ==========
    {
      day: 8,
      theme: "Vos exercices essentiels",
      phase: 'agir',
      content: {
        title: "Les 5 exercices clés pour votre dos",
        body: "Cette semaine, vous apprenez un circuit de 5 exercices pour renforcer et assouplir votre dos.\n\n**Les 5 exercices :**\n• Chat-vache — mobilise la colonne en douceur\n• Gainage ventral (planche) — renforce le tronc\n• Gainage latéral — stabilise la colonne\n• Pont fessier — renforce les fessiers qui soutiennent le dos\n• Étirement du psoas — relâche un muscle souvent contracté\n\nChaque exercice a 3 niveaux. Commencez par le plus facile. Règle d'or : si la douleur persiste plus de 24h après un exercice, réduisez l'intensité la prochaine fois.",
        keyMessage: "5 exercices, 10 minutes, 3x/semaine. C'est tout ce qu'il faut.",
        source: "NICE NG59, Cochrane 2021",
      },
      action: {
        title: "Circuit découverte — 10 min",
        description: "Chaque exercice 5 fois (niveau facile) : chat-vache (10 cycles), planche genoux (10s × 3), gainage latéral (10s × 3 chaque côté), ponts fessiers (8 reps), étirement psoas (30s chaque côté).",
        duration: "10 min",
      },
    },
    {
      day: 9,
      theme: "Renforcer le tronc",
      phase: 'agir',
      content: {
        title: "Le gainage : votre ceinture musculaire naturelle",
        body: "Les muscles profonds du tronc (transverse, multifides, plancher pelvien) forment une « ceinture naturelle » qui stabilise votre colonne. Quand ils sont forts, votre dos est protégé.\n\nLa planche (gainage ventral) est l'exercice roi pour ces muscles.\n\n**Technique (niveau facile) :**\n• Face au sol, appuyé sur les avant-bras et les genoux\n• Corps droit de la tête aux genoux (pas de creux ni de bosse)\n• Serrez légèrement le ventre comme si vous vouliez rentrer le nombril\n• Respirez normalement\n• Maintenez 10-15 secondes, repos, recommencez\n\nErreurs courantes :\n• Creuser le dos (signe que c'est trop difficile → genoux au sol)\n• Retenir sa respiration\n• Monter les fesses trop haut",
        keyMessage: "Le gainage remplace la ceinture lombaire — en plus efficace et sans effets secondaires.",
        source: "NICE NG59, Core stability evidence",
      },
      action: {
        title: "Planche — 3 × 15 secondes",
        description: "Avant-bras et genoux au sol. Corps droit. Maintenez 15 secondes, repos 30 secondes, 3 séries. Si trop facile, passez sur la pointe des pieds.",
        duration: "5 min",
      },
    },
    {
      day: 10,
      theme: "Souplesse et étirements",
      phase: 'agir',
      content: {
        title: "Détendre les muscles qui tirent sur votre dos",
        body: "Plusieurs muscles peuvent tirer sur votre colonne quand ils sont contractés :\n\n• **Psoas** (à l'avant de la hanche) — contracté par la position assise prolongée\n• **Ischio-jambiers** (arrière des cuisses) — limitent la flexion du bassin\n• **Piriforme** (fessier profond) — peut comprimer le nerf sciatique\n\n**Les 3 étirements essentiels :**\n• Psoas : genou au sol, l'autre pied devant, avancez le bassin doucement (30s)\n• Ischio-jambiers : jambe tendue sur une marche basse, penchez-vous doucement (30s)\n• Piriforme : allongé, croisez la cheville sur le genou opposé, tirez vers vous (30s)\n\nÉtirez-vous après les exercices, quand les muscles sont chauds. Tension douce, jamais de douleur vive.",
        keyMessage: "3 étirements après chaque séance. La souplesse protège votre dos.",
        source: "NICE NG59, Physiotherapy consensus",
      },
      action: {
        title: "Routine étirements — 5 min",
        description: "Les 3 étirements : psoas (30s × 2 côtés), ischio-jambiers (30s × 2), piriforme (30s × 2). Respirez pendant chaque étirement.",
        duration: "5 min",
      },
    },
    {
      day: 11,
      theme: "La marche thérapeutique",
      phase: 'agir',
      content: {
        title: "Marcher : le meilleur ami de votre dos",
        body: "La marche est l'exercice le plus complet et le plus naturel pour le dos. À chaque pas, votre colonne effectue des micro-mouvements de rotation, de flexion et d'extension qui la nourrissent et l'assouplissent.\n\n**Conseils :**\n• Commencez par 10-15 min, augmentez de 2-3 min par semaine\n• Terrain plat ou légèrement vallonné\n• Chaussures confortables avec bon amorti\n• Laissez les bras se balancer naturellement\n• Détendez les épaules (elles montent souvent sans qu'on s'en rende compte)\n\n**Objectif :** 30 min/jour, en une ou plusieurs fois. 3 × 10 min donnent le même bénéfice qu'une marche continue de 30 min.\n\nUne marche rapide 5 jours par semaine réduit le risque de récidive de lombalgie de 25 à 40%.",
        keyMessage: "30 min de marche par jour réduit le risque de récidive de 25 à 40%.",
        source: "WHO 2023, Cochrane walking for LBP",
      },
      action: {
        title: "Marche continue — 15 min",
        description: "Parcours plat, 15 min sans pause. Concentrez-vous sur la détente des épaules et le balancement des bras. Si trop : 2 × 7 min avec pause 2 min.",
        duration: "15 min",
      },
    },
    {
      day: 12,
      theme: "Gérer les mauvais jours",
      phase: 'agir',
      content: {
        title: "Quand la douleur revient plus forte",
        body: "Les poussées sont normales dans la lombalgie chronique. Elles ne signifient pas que votre dos empire. Elles sont souvent déclenchées par un excès d'activité, du stress, un mauvais sommeil, ou un changement de météo.\n\n**Votre plan d'action en cas de poussée :**\n• Ne paniquez pas — c'est temporaire (3 à 7 jours en général)\n• Réduisez l'intensité des exercices mais continuez à bouger\n• Chaleur locale : bouillotte sur le bas du dos, 15-20 min\n• Paracétamol si besoin (max 3g/jour)\n• Mobilisez doucement : chat-vache très lent, marche courte\n• Reprenez progressivement dès que la douleur diminue\n\n**Ce qu'il ne faut PAS faire :**\n• S'allonger toute la journée\n• Arrêter toute activité\n• Mettre une ceinture lombaire en continu\n• Se faire craquer le dos sans raison",
        keyMessage: "Une poussée est un orage — ça passe. Réduisez, bougez doucement, reprenez.",
        source: "WHO 2023, Self-management consensus",
      },
      action: {
        title: "Écrire votre plan poussée",
        description: "Notez les 6 étapes sur papier ou téléphone. C'est votre trousse de secours pour les mauvais jours. Gardez-la accessible.",
        duration: "5 min",
      },
    },
    {
      day: 13,
      theme: "Stress, sommeil et dos",
      phase: 'agir',
      content: {
        title: "Le triangle douleur-stress-sommeil",
        body: "Le stress et le manque de sommeil sont les deux plus grands amplificateurs de la lombalgie chronique. Ils augmentent la sensibilisation centrale — votre système nerveux devient encore plus réactif.\n\n**Sommeil :**\n• Position : sur le côté avec un coussin entre les genoux, ou sur le dos avec un coussin sous les genoux\n• Matelas ferme (pas mou, pas dur comme du bois)\n• Heures régulières, pas d'écran 1h avant\n• Si douleur nocturne : 5 min de mobilisation douce avant le coucher\n\n**Stress :**\n• La cohérence cardiaque (5 min, 3×/jour) réduit la tension musculaire et la douleur\n• L'exercice physique est un anti-stress naturel\n• Parler de ses difficultés (proches, médecin, psychologue) aide réellement\n\nDans la lombalgie chronique, traiter le stress et le sommeil est aussi important que faire des exercices.",
        keyMessage: "Stress + mauvais sommeil = douleur amplifiée. Traitez les trois ensemble.",
        source: "WHO 2023, NICE NG59",
      },
      action: {
        title: "Cohérence cardiaque — 5 min",
        description: "Assis ou allongé, yeux fermés. Inspirez nez 5 secondes, expirez bouche 5 secondes. 5 minutes (30 cycles). App gratuite « RespiRelax » si besoin.",
        duration: "5 min",
      },
    },
    {
      day: 14,
      theme: "Bilan semaine 2",
      phase: 'agir',
      content: {
        title: "Vos progrès à mi-parcours",
        body: "Deux semaines ! Vous avez maintenant :\n\n• Un circuit de 5 exercices pour le dos\n• 3 étirements essentiels\n• Un plan de marche progressif\n• Un plan d'action pour les poussées\n• Des techniques sommeil et stress\n\nComparez avec le début : bougez-vous plus facilement ? Avez-vous moins peur de votre dos ? Dormez-vous mieux ?\n\nLa semaine 3 consolidera ces acquis pour qu'ils durent après la cure.",
        keyMessage: "Mi-parcours. Vous avez les outils pour gérer votre dos.",
        source: "Synthèse",
      },
      action: {
        title: "Circuit complet — 12 min",
        description: "Circuit 5 exercices (8 reps/15s chacun) + 3 étirements (30s). Chronométrez : c'est le temps de votre routine post-cure.",
        duration: "12 min",
      },
      hasMiniPro: true,
      quiz: [
        {
          question: "Que faire en premier en cas de poussée ?",
          options: ["S'allonger et ne plus bouger", "Réduire l'intensité mais continuer à bouger", "Mettre une ceinture lombaire"],
          correctIndex: 1,
          explanation: "Réduisez l'intensité, chaleur locale, mais continuez des mouvements doux. L'immobilité aggrave.",
        },
        {
          question: "Le stress influence-t-il la douleur du dos ?",
          options: ["Non, c'est mécanique", "Oui, il amplifie la douleur", "Seulement chez les anxieux"],
          correctIndex: 1,
          explanation: "Le stress augmente la sensibilisation centrale — votre système nerveux amplifie les signaux de douleur.",
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
        body: "Les bénéfices de la cure peuvent durer 3 à 6 mois si vous continuez à bouger.\n\n**Votre plan post-cure :**\n• Exercices : circuit de 5, 3x/semaine minimum\n• Marche : 30 min/jour (fractionnée si besoin)\n• Étirements : après chaque séance, 5 min\n• Cohérence cardiaque : 5 min/jour\n• Activité plaisir : natation, yoga, Pilates, vélo...\n\nLa régularité bat l'intensité. 10 min 5 fois par semaine > 1h une seule fois.",
        keyMessage: "La régularité est la clé. Planifiez vos créneaux d'exercice maintenant.",
        source: "WHO 2023",
      },
      action: {
        title: "Écrire 3 objectifs personnels",
        description: "Sur papier, 3 objectifs réalistes pour 3 mois. Ex : « Marcher 20 min/jour », « Exercices 3x/semaine », « Reprendre le vélo ». Affichez-les chez vous.",
        duration: "5 min",
      },
    },
    {
      day: 16,
      theme: "Ergonomie au quotidien",
      phase: 'consolider',
      content: {
        title: "Votre dos au travail et à la maison",
        body: "**Position assise :**\n• Changez de position toutes les 30-45 min (réglez une alarme)\n• Pieds à plat, cuisses horizontales, dos soutenu\n• L'écran à hauteur des yeux, bras détendus\n• Le meilleur siège est celui que vous quittez régulièrement\n\n**Porter des charges :**\n• Pliez les genoux, gardez la charge près du corps\n• Pas de rotation en portant (tournez les pieds)\n• Demandez de l'aide pour les charges lourdes\n\n**Dormir :**\n• Sur le côté avec coussin entre les genoux\n• Ou sur le dos avec coussin sous les genoux\n• Évitez de dormir sur le ventre\n\nL'objectif n'est pas d'avoir une posture « parfaite » en permanence — c'est de **varier les positions** et de bouger souvent.",
        keyMessage: "La meilleure posture est la prochaine. Variez les positions et bougez souvent.",
        source: "NICE NG59, Ergonomic consensus",
      },
      action: {
        title: "1 changement concret",
        description: "Identifiez 1 adaptation pour votre quotidien (alarme 30 min pour se lever, coussin entre les genoux, régler la hauteur du siège). Mettez-la en place dès ce soir.",
        duration: "5 min",
      },
    },
    {
      day: 17,
      theme: "Quelle activité physique ?",
      phase: 'consolider',
      content: {
        title: "Trouvez votre activité plaisir",
        body: "L'exercice le plus efficace est celui que vous ferez réellement.\n\n**Excellentes pour le dos :**\n• Marche (le plus simple, le plus accessible)\n• Natation / aquagym (décharge la colonne)\n• Yoga / Pilates (mobilité + renforcement + relaxation)\n• Vélo (peu d'impact sur la colonne)\n• Tai-chi (équilibre, détente, mouvement doux)\n\n**À adapter :**\n• Course à pied → commencer par marche rapide\n• Jardinage → genouillère, outils à manche long, pauses fréquentes\n• Golf → échauffement, pas de forçage en rotation\n\n**L'idéal :** combiner 2-3 activités. Marche quotidienne + yoga 2×/semaine + natation 1×/semaine par exemple.",
        keyMessage: "Le meilleur exercice est celui que vous ferez. Choisissez ce qui vous plaît.",
        source: "WHO 2023",
      },
      action: {
        title: "Tester une activité",
        description: "Essayez une activité inhabituelle : aquagym aux thermes, yoga, Pilates, vélo. Notez votre ressenti. Pourriez-vous continuer chez vous ?",
        duration: "15-30 min",
      },
    },
    {
      day: 18,
      theme: "Alimentation et inflammation",
      phase: 'consolider',
      content: {
        title: "Manger pour moins souffrir",
        body: "**Ce qui aide (preuves modérées) :**\n• Alimentation méditerranéenne (fruits, légumes, poisson, huile d'olive) — anti-inflammatoire\n• Oméga-3 (poisson gras 2×/semaine)\n• Hydratation suffisante (1,5L/jour) — les disques intervertébraux sont constitués à 80% d'eau\n• Poids raisonnable — réduit la charge sur la colonne\n\n**Pas de preuve solide :**\n• Curcuma, glucosamine, collagène en compléments\n• Régimes d'exclusion\n\n**Ce qui aggrave :**\n• Tabac — réduit l'apport sanguin aux disques et ralentit la guérison\n• Alcool excessif — perturbe le sommeil et augmente l'inflammation\n\nMangez varié, en quantité raisonnable. Le conseil le plus impactant : arrêter le tabac si vous fumez.",
        keyMessage: "Pas de régime miracle. Méditerranéen + poids raisonnable + arrêt du tabac si applicable.",
        source: "WHO 2023",
      },
      action: {
        title: "1 changement alimentaire",
        description: "Identifiez un petit changement : poisson 2×/semaine, plus de légumes, réduire les ultra-transformés, boire plus d'eau. Un seul changement, mais durable.",
        duration: "5 min",
      },
    },
    {
      day: 19,
      theme: "La peur du mouvement",
      phase: 'consolider',
      content: {
        title: "Kinésiophobie : quand la peur fait plus mal que le dos",
        body: "La kinésiophobie (peur du mouvement) est l'un des plus grands obstacles à la guérison de la lombalgie chronique. Elle crée un cercle vicieux :\n\nPeur → évitement → déconditionnement → plus de douleur → plus de peur\n\n**Comment la combattre :**\n• Rappeler que votre dos est solide (J1) et que la douleur est un signal déréglé (J3)\n• Exposition progressive : commencer par des mouvements simples et augmenter graduellement\n• Célébrer chaque progrès, même petit\n• Se concentrer sur ce que vous POUVEZ faire, pas sur ce que vous ne pouvez pas\n\n**La technique du « petit pas » :**\nSi vous avez peur de vous baisser, commencez par vous pencher de 10 cm. Puis 20 cm demain. Puis 30 cm. Votre cerveau réapprend que le mouvement est sûr.\n\nLa peur est normale. Le courage, c'est de bouger malgré la peur.",
        keyMessage: "La peur du mouvement fait plus de dégâts que le mouvement lui-même.",
        source: "WHO 2023, Fear-avoidance model",
      },
      action: {
        title: "Identifier 1 mouvement évité",
        description: "Quel mouvement évitez-vous par peur ? Se baisser, porter, se retourner ? Faites-le aujourd'hui, très doucement, en version allégée. Notez que rien de grave ne s'est passé.",
        duration: "5 min",
      },
    },
    {
      day: 20,
      theme: "Prévenir les rechutes",
      phase: 'consolider',
      content: {
        title: "Les signaux d'alerte et quand consulter",
        body: "**Normal (pas d'inquiétude) :**\n• Douleur après une activité inhabituelle → règle des 24h\n• Raideur matinale < 30 min → mouvements doux au lever\n• Petite poussée → plan d'action (J12)\n\n**Consultez votre médecin :**\n• Perte de contrôle de la vessie ou des selles — URGENCE\n• Perte de force progressive dans les jambes — URGENCE\n• Douleur nocturne intense, fièvre, perte de poids inexpliquée\n• Sciatique avec déficit moteur (pied tombant)\n\n**Votre trousse anti-crise :**\n• Ce programme sur votre téléphone (votre code ÉTUVE)\n• Votre plan d'action poussée (J12)\n• Vos 3 objectifs (J15)\n• Numéro du médecin traitant",
        keyMessage: "Préparez votre trousse anti-crise. Urgence = perte de contrôle vessie/selles ou perte de force jambes.",
        source: "WHO 2023, NICE NG59",
      },
      action: {
        title: "Préparer sa trousse",
        description: "Rassemblez : plan poussée (J12), 3 objectifs (J15), numéro médecin. Au même endroit.",
        duration: "5 min",
      },
    },
    {
      day: 21,
      theme: "Votre bilan final",
      phase: 'consolider',
      content: {
        title: "Bravo — 21 jours accomplis !",
        body: "Vous avez terminé votre parcours de 3 semaines.\n\n**Ce que vous emportez :**\n• La certitude que votre dos est solide\n• Un programme d'exercices de renforcement\n• L'habitude de marcher quotidiennement\n• Un plan d'action pour les poussées\n• Des outils anti-stress et sommeil\n• 3 objectifs personnels pour la suite\n\n**Maintenant :**\n• Remplissez le questionnaire final pour mesurer vos progrès\n• Vous verrez la comparaison de vos scores avant/après la cure\n• Dans 1 mois et 3 mois, vous pourrez refaire le questionnaire\n\nLes patients qui continuent leurs exercices après la cure gardent les bénéfices 6 à 9 mois. La rechute n'est pas un échec — c'est une occasion de reprendre votre routine.\n\n**Votre dos vous a porté toute votre vie. Il est temps de le porter à votre tour.**",
        keyMessage: "21 jours accomplis. Continuez 3×/semaine. Votre dos est plus fort que vous ne le croyez.",
        source: "WHO 2023, NICE NG59",
      },
      action: {
        title: "Remplir le bilan final",
        description: "Cliquez ci-dessous pour remplir votre questionnaire de fin de cure et voir vos progrès.",
        duration: "3 min",
      },
    },
  ],
};
