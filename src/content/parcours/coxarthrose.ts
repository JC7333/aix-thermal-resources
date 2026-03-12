import type { ParcoursContent } from './types';

export const coxarthroseParcours: ParcoursContent = {
  slug: 'coxarthrose',
  title: 'Arthrose de la hanche',
  subtitle: 'Protéger, mobiliser, retrouver',
  description: '21 jours pour protéger votre hanche et retrouver votre mobilité.',
  icon: '🦴',
  proInstrument: 'koos-ps',
  proIntro: "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre hanche ?",
  days: [
    // ========== SEMAINE 1 : COMPRENDRE (J1-J7) ==========
    {
      day: 1,
      theme: "Votre hanche, comment ça marche ?",
      phase: 'comprendre',
      content: {
        title: "L'arthrose de la hanche expliquée simplement",
        body: "La coxarthrose, c'est l'usure du cartilage de votre articulation de la hanche. La hanche est une articulation en forme de boule (la tête du fémur) dans un creux (le cotyle du bassin). Le cartilage qui recouvre ces deux surfaces s'amincit avec le temps.\n\nLa douleur se ressent le plus souvent **dans le pli de l'aine**. Parfois elle irradie vers la cuisse, voire jusqu'au genou — ce qui peut prêter à confusion.\n\n**Bonne nouvelle :** l'arthrose de la hanche n'est pas une condamnation. L'exercice adapté protège votre hanche en maintenant la mobilité et en renforçant les muscles qui la stabilisent.\n\nEt si l'arthrose progresse malgré tout ? La prothèse totale de hanche est l'une des opérations les plus réussies de la médecine : **taux de satisfaction supérieur à 95%.** Mais on n'en est pas là — commençons par ce que VOUS pouvez faire.",
        keyMessage: "L'arthrose de la hanche se gère. L'exercice protège, la prothèse est un excellent plan B.",
        source: "NICE NG226, OARSI 2019",
      },
      action: {
        title: "Marche douce — 5 minutes",
        description: "Marchez 5 minutes sur terrain plat. Concentrez-vous sur le balancement naturel de vos hanches. Si la marche est douloureuse, ralentissez mais ne vous arrêtez pas. Utilisez une canne du côté opposé à la hanche douloureuse si besoin.",
        duration: "5 min",
      },
    },
    {
      day: 2,
      theme: "Bouger protège votre hanche",
      phase: 'comprendre',
      content: {
        title: "Le mouvement nourrit votre cartilage",
        body: "Comme pour le genou, le cartilage de la hanche se nourrit par le mouvement. Il fonctionne comme une éponge : la pression et la décharge alternées font circuler le liquide articulaire qui le nourrit.\n\n**Si vous ne bougez pas :**\n• Le cartilage « s'assèche » et se fragilise\n• Les muscles fessiers et de la cuisse s'atrophient\n• La hanche devient instable\n• La douleur augmente → vous bougez encore moins\n\n**Si vous bougez régulièrement :**\n• Le cartilage est mieux nourri\n• Les muscles protègent l'articulation\n• La hanche reste mobile\n• La douleur diminue progressivement\n\nLes études montrent que l'exercice adapté réduit la douleur de l'arthrose de la hanche autant que les anti-inflammatoires — sans les effets secondaires.",
        keyMessage: "Le mouvement nourrit votre cartilage. L'immobilité le détruit.",
        source: "Cochrane Hip OA 2014, NICE NG226",
      },
      action: {
        title: "Pendulaire de hanche — 2 minutes",
        description: "Debout, tenez-vous à une table ou un dossier de chaise. Soulevez légèrement le pied du côté douloureux et balancez doucement la jambe d'avant en arrière, comme un pendule. 20 balancements. Puis de gauche à droite, 20 balancements. La hanche doit être relâchée.",
        duration: "2 min",
      },
    },
    {
      day: 3,
      theme: "La douleur de hanche expliquée",
      phase: 'comprendre',
      content: {
        title: "Pourquoi ça fait mal dans l'aine (et parfois au genou)",
        body: "La douleur de l'arthrose de hanche est particulière :\n\n**Où ça fait mal :**\n• Le plus souvent dans le **pli de l'aine** (et non sur le côté de la hanche)\n• Parfois dans la **cuisse** (face avant ou intérieure)\n• Parfois au **genou** — oui, une hanche arthrosique peut donner mal au genou !\n• Rarement dans la fesse (plutôt le dos dans ce cas)\n\n**Quand ça fait mal :**\n• Au démarrage (premiers pas le matin, se lever d'une chaise)\n• Après une marche prolongée\n• En montant ou descendant des escaliers\n• En mettant ses chaussettes ou en se coupant les ongles de pied\n\n**La règle des 24h** fonctionne aussi pour la hanche : si la douleur augmente pendant un exercice mais revient à la normale en 24h, l'exercice est adapté. Si elle persiste plus de 24h, réduisez l'intensité.",
        keyMessage: "La douleur de hanche se ressent dans l'aine, pas sur le côté. La règle des 24h vous guide.",
        source: "NICE NG226, Clinical consensus",
      },
      action: {
        title: "Rotation douce de hanche — assis",
        description: "Assis sur une chaise, pied à plat au sol. Écartez le genou vers l'extérieur (rotation externe) puis ramenez-le (rotation interne). Mouvements très lents, sans forcer. 10 fois chaque côté. Cela mobilise la hanche en douceur.",
        duration: "3 min",
      },
    },
    {
      day: 4,
      theme: "Le poids et votre hanche",
      phase: 'comprendre',
      content: {
        title: "Chaque kilo compte — 3 à 4 fois plus",
        body: "Comme pour le genou, votre hanche supporte 3 à 4 fois votre poids à chaque pas. En montant les escaliers, c'est jusqu'à 6 fois votre poids.\n\nPerdre 1 kg = soulager votre hanche de 3 à 4 kg à la marche et de 6 kg dans les escaliers.\n\nUne perte de 5 à 10% du poids corporel réduit significativement la douleur et améliore la fonction. Pour une personne de 80 kg, c'est 4 à 8 kg.\n\nLa bonne nouvelle : vous êtes en cure thermale, vous bougez chaque jour, et vous apprenez à manger mieux. C'est le moment idéal pour amorcer un changement durable.\n\nSi le poids n'est pas un problème pour vous, concentrez-vous sur le renforcement musculaire — c'est tout aussi important.",
        keyMessage: "Perdre 1 kg = soulager votre hanche de 3-4 kg par pas, 6 kg dans les escaliers.",
        source: "OARSI 2019, Messier et al.",
      },
      action: {
        title: "Marche — 8 minutes",
        description: "Marche de 8 minutes sur terrain plat. Si la hanche tire, utilisez une canne du côté opposé. Concentrez-vous sur des pas réguliers et une posture droite (ne pas se pencher du côté douloureux).",
        duration: "8 min",
      },
    },
    {
      day: 5,
      theme: "Les traitements qui marchent",
      phase: 'comprendre',
      content: {
        title: "Ce que dit la science pour la hanche",
        body: "**Ce qui marche vraiment :**\n• Exercice régulier (renforcement fessiers + mobilité) — preuve très forte\n• Perte de poids si surpoids — preuve forte\n• Éducation (comprendre sa maladie) — preuve forte\n• Kinésithérapie supervisée au début — preuve forte\n\n**Ce qui aide :**\n• Vélo et natation (déchargent la hanche) — preuve modérée\n• Canne du côté opposé — preuve modérée\n• Chaleur locale avant les exercices — preuve faible\n\n**Ce qui n'a pas de preuve :**\n• Compléments alimentaires (glucosamine, chondroïtine)\n• Semelles spéciales\n• Injections d'acide hyaluronique dans la hanche — résultats contradictoires\n\n**Quand envisager la prothèse :**\n• Douleur persistante malgré 3-6 mois d'exercices bien conduits\n• Impact majeur sur la qualité de vie (ne dort plus, ne marche plus)\n• Décision partagée avec le chirurgien — jamais une urgence",
        keyMessage: "L'exercice d'abord. La prothèse si échec après 3-6 mois — et elle marche très bien.",
        source: "NICE NG226, OARSI 2019, ACR 2019",
      },
      action: {
        title: "Ponts fessiers — 8 répétitions",
        description: "Allongé sur le dos, genoux pliés, pieds à plat. Soulevez les fesses jusqu'à former une ligne droite genoux-hanches-épaules. Maintenez 5 secondes, redescendez doucement. 8 répétitions. Les fessiers sont les protecteurs n°1 de votre hanche.",
        duration: "4 min",
      },
    },
    {
      day: 6,
      theme: "La cure thermale et votre hanche",
      phase: 'comprendre',
      content: {
        title: "L'eau chaude : votre alliée mobilité",
        body: "La cure thermale est particulièrement bénéfique pour la coxarthrose. L'eau chaude a un triple effet :\n\n**Effet antalgique :** la chaleur réduit la douleur et détend les muscles contractés autour de la hanche (psoas, fessiers, adducteurs).\n\n**Effet de décharge :** dans l'eau, vous pesez 80% de moins. Les exercices qui sont douloureux « à sec » deviennent possibles dans l'eau.\n\n**Effet confiance :** l'environnement sécurisant de la piscine thermale vous permet d'explorer des mouvements que vous n'oseriez pas faire ailleurs.\n\nLes études montrent une amélioration de 20-30% de la douleur et de la mobilité. Mais le bénéfice durable vient de ce que vous continuez APRÈS la cure.\n\nProfitez de ces 3 semaines pour tester des mouvements dans l'eau, les apprendre, puis les refaire à sec chez vous.",
        keyMessage: "L'eau chaude soulage et libère le mouvement. Apprenez les exercices ici, continuez chez vous.",
        source: "Spa therapy for hip OA (Rheumatology 2019), Consensus",
      },
      action: {
        title: "Exercices en piscine thermale",
        description: "En piscine : 1) Marche dans l'eau 3 min. 2) Lever latéral de jambe (10 fois chaque côté). 3) Flexion de hanche (monter le genou, 10 fois). La résistance de l'eau renforce sans douleur. Si pas de piscine, faites les pendulaires (J2).",
        duration: "10 min",
      },
    },
    {
      day: 7,
      theme: "Bilan semaine 1",
      phase: 'comprendre',
      content: {
        title: "Ce que vous avez appris cette semaine",
        body: "Bravo, première semaine terminée !\n\n• Votre hanche est une articulation robuste — l'arthrose se gère\n• Le mouvement nourrit le cartilage, l'immobilité le détruit\n• La douleur est souvent dans l'aine (pas sur le côté)\n• Chaque kg perdu soulage la hanche de 3-4 kg\n• L'exercice est le traitement n°1 (la prothèse est un plan B qui marche très bien)\n• La cure est un tremplin pour reprendre le mouvement\n\nLa semaine prochaine : les exercices clés pour renforcer votre hanche et gérer les mauvais jours.",
        keyMessage: "Semaine 1 terminée. Vous savez maintenant que votre hanche a besoin de mouvement.",
        source: "Synthèse NICE/OARSI/Cochrane",
      },
      action: { title: "Marche bilan — 10 minutes", description: "Marche de 10 minutes. Comparez avec le jour 1 : est-ce plus facile ? Moins douloureux ?", duration: "10 min" },
      hasMiniPro: true,
      quiz: [
        { question: "Où se ressent le plus souvent la douleur d'arthrose de hanche ?", options: ["Sur le côté de la hanche", "Dans le pli de l'aine", "Dans le bas du dos"], correctIndex: 1, explanation: "La douleur de coxarthrose est typiquement ressentie dans le pli de l'aine, parfois irradiant vers la cuisse ou le genou." },
        { question: "L'exercice use-t-il le cartilage de la hanche ?", options: ["Oui, il faut se reposer", "Non, il le nourrit", "Seulement après 70 ans"], correctIndex: 1, explanation: "Le cartilage se nourrit par le mouvement. L'immobilité l'appauvrit." },
        { question: "Quel est le taux de satisfaction de la prothèse de hanche ?", options: ["50%", "75%", "Plus de 95%"], correctIndex: 2, explanation: "La prothèse totale de hanche est l'une des opérations les plus réussies, avec plus de 95% de satisfaction." },
      ],
    },

    // ========== SEMAINE 2 : AGIR (J8-J14) ==========
    {
      day: 8, theme: "Vos exercices essentiels", phase: 'agir',
      content: { title: "Les 5 exercices clés pour la hanche", body: "Cette semaine, vous apprenez un circuit de 5 exercices ciblés pour la hanche.\n\n**Les 5 exercices :**\n• Pont fessier — renforce les fessiers (protecteur n°1)\n• Abduction couchée — renforce le moyen fessier (stabilité latérale)\n• Flexion de hanche debout — mobilité et renforcement\n• Extension de hanche debout — renforce l'arrière de la hanche\n• Étirement du psoas — relâche le muscle qui « tire » devant\n\nChaque exercice a 3 niveaux. Commencez par le plus facile. Si la douleur persiste plus de 24h, réduisez l'intensité.", keyMessage: "5 exercices ciblés, 10 minutes, votre prescription quotidienne.", source: "NICE NG226, Cochrane Hip OA 2014" },
      action: { title: "Circuit découverte — 10 min", description: "Chaque exercice 5-8 fois : ponts fessiers (8×), abductions couchées (8× chaque côté), flexions debout (8× chaque jambe, avec appui), extensions debout (8× chaque jambe), étirement psoas (30s chaque côté).", duration: "10 min" },
    },
    {
      day: 9, theme: "Les fessiers : vos protecteurs", phase: 'agir',
      content: { title: "Des fessiers forts = une hanche protégée", body: "Les muscles fessiers (grand, moyen et petit fessier) sont les stabilisateurs de votre hanche. Quand ils sont faibles, la hanche « vacille » à chaque pas, ce qui accélère l'usure et augmente la douleur.\n\nLe signe classique de fessiers faibles : la **boiterie de Trendelenburg** — le bassin penche du côté opposé à chaque pas. Les gens compensent en se penchant sur la hanche douloureuse.\n\n**Exercice du jour : Abduction couchée**\nCouché sur le côté sain, jambe du dessus tendue. Soulevez la jambe de 20-30 cm, maintenez 3 secondes, redescendez doucement.\n\nPoints clés :\n• Ne tournez pas le pied vers le haut (gardez-le parallèle au sol)\n• Ne basculez pas le bassin en arrière\n• Mouvement lent et contrôlé", keyMessage: "Des fessiers forts empêchent votre hanche de vaciller. C'est votre meilleur investissement.", source: "NICE NG226, Physiotherapy guidelines" },
      action: { title: "Abductions couchées — 3 × 10 chaque côté", description: "Couché sur le côté, jambe tendue. Soulevez 20 cm, maintenez 3s, redescendez. 10 fois, repos 30s, 3 séries. Changez de côté.", duration: "8 min" },
    },
    {
      day: 10, theme: "Mobilité et étirements", phase: 'agir',
      content: { title: "Assouplir votre hanche pour mieux bouger", body: "L'arthrose raidit progressivement la hanche. Certains muscles se contractent pour « protéger » l'articulation, mais cette protection devient contre-productive.\n\n**Les 3 muscles à étirer :**\n• **Psoas** (devant la hanche) — contracté par la position assise, tire la hanche vers l'avant\n• **Piriforme** (fessier profond) — peut comprimer le nerf sciatique\n• **Adducteurs** (intérieur de la cuisse) — limitent l'écartement\n\n**Étirements :**\n• Psoas : fente avant, genou arrière au sol, avancez le bassin (30s par côté)\n• Piriforme : allongé, cheville sur genou opposé, tirez vers vous (30s)\n• Adducteurs : assis, plantes des pieds jointes (papillon), penchez doucement (30s)\n\nÉtirez-vous après les exercices, quand les muscles sont chauds.", keyMessage: "Étirer le psoas, le piriforme et les adducteurs libère votre hanche.", source: "OARSI 2019, Physiotherapy consensus" },
      action: { title: "Routine étirements hanche — 5 min", description: "Les 3 étirements : psoas (30s × 2), piriforme (30s × 2), adducteurs papillon (30s × 2). Respiration calme pendant chaque étirement.", duration: "5 min" },
    },
    {
      day: 11, theme: "Marcher avec une hanche arthrosique", phase: 'agir',
      content: { title: "Marcher mieux, pas forcément plus loin", body: "La marche est essentielle pour la hanche, mais quelques adaptations améliorent tout :\n\n**Conseils spécifiques hanche :**\n• Canne du côté OPPOSÉ à la hanche douloureuse (pas du même côté !)\n• Pas réguliers et de même longueur (ne pas raccourcir le pas du côté douloureux)\n• Terrain plat au début, éviter les descentes longues\n• Chaussures avec bon amorti — pas de talons hauts\n\n**Progression :**\n• Semaine 1 : 10 min/jour\n• Semaine 2 : 15-20 min/jour\n• Objectif post-cure : 30 min/jour\n\n**Alternatives si la marche est trop douloureuse :**\n• Vélo (stationnaire ou extérieur) — excellent car pas de charge\n• Natation / aquagym — la hanche adore l'eau\n• Marche dans l'eau — combine décharge et renforcement", keyMessage: "Canne du côté OPPOSÉ. Vélo et piscine si la marche est trop douloureuse.", source: "NICE NG226, OARSI 2019" },
      action: { title: "Marche — 15 minutes", description: "Marche 15 min sur terrain plat. Si besoin, utilisez une canne du côté opposé. Si trop : 2 × 7 min avec pause. Notez votre ressenti.", duration: "15 min" },
    },
    {
      day: 12, theme: "Gérer les poussées", phase: 'agir',
      content: { title: "Que faire quand la hanche crie plus fort ?", body: "Les poussées sont normales et ne signifient pas que l'arthrose s'aggrave.\n\n**Votre plan d'action poussée :**\n• Ne paniquez pas — c'est temporaire (3 à 7 jours)\n• Réduisez l'intensité mais continuez à bouger (pendulaires, marche courte)\n• Froid sur le pli de l'aine (pas sur le côté) — 15 min avec un linge\n• Paracétamol si besoin (max 3g/jour)\n• Évitez les positions qui compriment la hanche (jambes croisées, siège très bas)\n• Reprenez progressivement quand ça se calme\n\n**Ce qu'il ne faut PAS faire :**\n• Rester au lit toute la journée\n• Arrêter complètement les exercices\n• Forcer « pour passer à travers la douleur »", keyMessage: "Poussée = temporaire. Réduisez, mettez du froid dans l'aine, bougez doucement.", source: "NICE NG226, Self-management consensus" },
      action: { title: "Écrire votre plan poussée", description: "Notez les 6 étapes du plan d'action sur papier ou téléphone. C'est votre trousse de secours pour les mauvais jours.", duration: "5 min" },
    },
    {
      day: 13, theme: "Sommeil et hanche", phase: 'agir',
      content: { title: "Bien dormir avec une hanche arthrosique", body: "La hanche est l'articulation qui gêne le plus le sommeil, surtout quand on dort sur le côté.\n\n**Positions de sommeil recommandées :**\n• Sur le dos : coussin sous les genoux pour détendre le psoas\n• Sur le côté sain : coussin épais entre les genoux pour aligner le bassin\n• Sur le côté douloureux : possible si matelas assez souple + coussin entre les genoux\n• Sur le ventre : déconseillé (force la rotation de la hanche)\n\n**Autres conseils :**\n• Matelas de fermeté moyenne (ni trop mou, ni trop dur)\n• Se lever : rouler sur le côté, pousser avec les bras (ne pas se tordre)\n• Chaleur locale (bouillotte sur la hanche) 15 min avant le coucher\n• Routine de mobilisation douce : 3 min de pendulaires avant de se coucher\n\nSi les douleurs nocturnes sont régulières et intenses, parlez-en à votre médecin.", keyMessage: "Coussin entre les genoux + mobilisation douce avant le coucher = nuit plus calme.", source: "NICE NG226, Sleep hygiene" },
      action: { title: "Routine du soir — 5 min", description: "Ce soir : 1) 2 min de pendulaires debout (appui sur la table de nuit). 2) 1 min d'étirement psoas doux. 3) Coussin entre les genoux au coucher. Observez la différence.", duration: "5 min" },
    },
    {
      day: 14, theme: "Bilan semaine 2", phase: 'agir',
      content: { title: "Vos progrès à mi-parcours", body: "Deux semaines ! Vous avez maintenant :\n\n• Un circuit de 5 exercices spécifiques hanche\n• 3 étirements essentiels (psoas, piriforme, adducteurs)\n• Un plan de marche adaptée (canne côté opposé)\n• Un plan d'action pour les poussées\n• Des techniques pour mieux dormir\n\nComparez avec le début : bougez-vous plus facilement ? La marche est-elle moins douloureuse ? Dormez-vous mieux ?\n\nLa semaine 3 consolide ces acquis pour qu'ils durent après la cure.", keyMessage: "Mi-parcours. Vous avez les outils pour protéger votre hanche.", source: "Synthèse" },
      action: { title: "Circuit complet — 12 min", description: "Circuit des 5 exercices (10 reps chacun) + 3 étirements (30s). Chronométrez : c'est votre routine post-cure.", duration: "12 min" },
      hasMiniPro: true,
      quiz: [
        { question: "De quel côté utilise-t-on la canne ?", options: ["Du côté douloureux", "Du côté opposé à la hanche douloureuse", "Peu importe"], correctIndex: 1, explanation: "La canne se tient du côté OPPOSÉ à la hanche douloureuse pour rééquilibrer les forces." },
        { question: "Quel muscle est le protecteur n°1 de la hanche ?", options: ["Le quadriceps", "Les fessiers", "Les abdominaux"], correctIndex: 1, explanation: "Les fessiers stabilisent la hanche à chaque pas. Des fessiers faibles = une hanche qui vacille." },
      ],
    },

    // ========== SEMAINE 3 : CONSOLIDER (J15-J21) ==========
    {
      day: 15, theme: "Mon plan post-cure", phase: 'consolider',
      content: { title: "Préparer la suite dès maintenant", body: "Les bénéfices de la cure durent 3 à 6 mois si vous continuez.\n\n**Votre plan post-cure :**\n• Exercices hanche : circuit de 5, 3×/semaine\n• Marche : 30 min/jour (ou vélo, natation)\n• Étirements : après chaque séance, 5 min\n• Pendulaires : chaque matin au lever, 2 min\n\nLa régularité bat l'intensité. 10 min 5 fois > 1h une fois.", keyMessage: "La régularité est votre arme. Planifiez vos créneaux maintenant.", source: "OARSI 2019" },
      action: { title: "Écrire 3 objectifs personnels", description: "3 objectifs pour 3 mois. Ex : « Vélo 20 min 3×/semaine », « Exercices hanche 3×/semaine », « Reprendre la randonnée douce ». Affichez-les chez vous.", duration: "5 min" },
    },
    {
      day: 16, theme: "Adapter son quotidien", phase: 'consolider',
      content: { title: "Vivre confortablement avec une hanche arthrosique", body: "**Chez vous :**\n• Rehausseur de toilettes si WC très bas (la hanche déteste les flexions profondes)\n• Siège de douche — plus sûr et moins douloureux\n• Tabouret haut pour la cuisine (ne pas rester debout immobile longtemps)\n• Enfile-chaussettes et chausse-pied long (éviter de se plier)\n\n**Au quotidien :**\n• Éviter les sièges très bas (canapé profond, voiture sportive)\n• Monter les escaliers : bonne jambe d'abord ; descendre : jambe douloureuse d'abord\n• Alterner position assise et debout toutes les 30 min\n• Pas de jambes croisées (comprime l'aine)\n\n**En voiture :**\n• Siège suffisamment haut (coussin si besoin)\n• Entrer : s'asseoir d'abord, puis pivoter les jambes ensemble\n• Pauses toutes les heures", keyMessage: "Des adaptations simples protègent votre hanche sans changer votre vie.", source: "NICE NG226, OT consensus" },
      action: { title: "1 adaptation concrète", description: "Identifiez 1 chose à changer chez vous (rehausseur WC, enfile-chaussettes, éviter le canapé bas). Commandez ou préparez-la avant votre retour.", duration: "5 min" },
    },
    {
      day: 17, theme: "Activité physique adaptée", phase: 'consolider',
      content: { title: "Les meilleurs sports pour votre hanche", body: "**Excellentes (peu d'impact) :**\n• Vélo (stationnaire ou extérieur) — l'idéal pour la hanche\n• Natation / aquagym — décharge totale\n• Marche nordique (bâtons réduisent la charge)\n• Yoga / tai-chi (mobilité + équilibre)\n\n**Bonnes avec adaptation :**\n• Randonnée douce (bâtons, terrain modéré)\n• Danse de salon (mouvements fluides)\n• Jardinage (genouillère, pauses, outils adaptés)\n\n**À éviter ou adapter fortement :**\n• Course à pied (impact répété)\n• Sports de pivot (tennis, football)\n• Ski alpin (risque de chute + flexion forcée)\n\n**L'idéal :** vélo 2-3×/semaine + marche quotidienne + exercices de renforcement 3×/semaine.", keyMessage: "Le vélo est le meilleur ami de la hanche arthrosique. Zéro impact, 100% bénéfice.", source: "OARSI 2019" },
      action: { title: "Tester une activité", description: "Essayez le vélo (même stationnaire), l'aquagym, ou le yoga. Notez votre ressenti : est-ce une activité que vous pouvez continuer chez vous ?", duration: "15-30 min" },
    },
    {
      day: 18, theme: "Nutrition et arthrose", phase: 'consolider',
      content: { title: "Manger pour votre hanche", body: "**Ce qui aide :**\n• Alimentation méditerranéenne — anti-inflammatoire naturel\n• Oméga-3 (poisson gras 2×/semaine)\n• Poids raisonnable — l'impact le plus prouvé\n• Hydratation 1,5L/jour — le cartilage est à 70% d'eau\n\n**Pas de preuve solide :**\n• Curcuma, glucosamine, collagène en compléments\n• Régimes d'exclusion\n\nLe conseil le plus impactant : maintenir un poids stable à travers une alimentation variée et une activité régulière. Pas de régime miracle.", keyMessage: "Pas de régime miracle. Méditerranéen + poids stable = les seules preuves.", source: "OARSI 2019" },
      action: { title: "1 changement alimentaire", description: "Identifiez un changement durable : huile d'olive, poisson 2×/semaine, plus de légumes, moins d'ultra-transformés.", duration: "5 min" },
    },
    {
      day: 19, theme: "Gestion du stress", phase: 'consolider',
      content: { title: "Le stress amplifie la douleur articulaire", body: "Le stress chronique contracte les muscles autour de la hanche (psoas, piriforme) et amplifie la perception de la douleur.\n\n**Techniques éprouvées :**\n• **Cohérence cardiaque** — 5 min, inspirez 5s, expirez 5s. Réduit le cortisol.\n• **Exercice physique** — votre programme quotidien est déjà un anti-stress.\n• **Contact social** — la cure est un moment privilégié pour échanger avec d'autres patients.\n• **Activités plaisir** — lecture, musique, jardinage, ce qui vous détend.\n\nChoisissez une technique et intégrez-la à votre quotidien.", keyMessage: "Le stress contracte les muscles de la hanche. La cohérence cardiaque les relâche.", source: "NICE NG226" },
      action: { title: "Cohérence cardiaque — 5 min", description: "Assis confortablement. Inspirez nez 5s, expirez bouche 5s. 5 minutes. App gratuite RespiRelax si besoin.", duration: "5 min" },
    },
    {
      day: 20, theme: "Prévention et signaux d'alerte", phase: 'consolider',
      content: { title: "Quand consulter ? Les vrais signaux d'alerte", body: "**Normal (pas d'inquiétude) :**\n• Douleur après une activité inhabituelle → règle des 24h\n• Raideur matinale < 30 min → pendulaires au lever\n• Poussée → plan d'action (J12)\n\n**Consultez votre médecin :**\n• Douleur brutale après une chute + impossibilité de marcher (fracture ?)\n• Douleur de hanche avec fièvre (infection ?)\n• Douleur nocturne intense, perte de poids inexpliquée (éliminer autre cause)\n• Boiterie importante d'apparition récente\n\n**Quand reparler de la prothèse :**\n• Douleur quotidienne invalidante malgré 3-6 mois d'exercices\n• Impact majeur sur la qualité de vie et le sommeil\n• C'est une décision partagée, jamais une urgence\n\n**Votre trousse anti-crise :**\n• Ce programme (votre code ÉTUVE)\n• Plan poussée (J12) + 3 objectifs (J15)\n• Numéro médecin traitant", keyMessage: "Urgence = chute + impossibilité de marcher, ou fièvre + douleur de hanche.", source: "NICE NG226" },
      action: { title: "Préparer sa trousse", description: "Rassemblez plan poussée + objectifs + numéro médecin. Au même endroit.", duration: "5 min" },
    },
    {
      day: 21, theme: "Votre bilan final", phase: 'consolider',
      content: {
        title: "Bravo — 21 jours accomplis !",
        body: "Vous avez terminé votre parcours de 3 semaines.\n\n**Ce que vous emportez :**\n• La compréhension de votre hanche et de son arthrose\n• Un programme de renforcement ciblé (fessiers, mobilité)\n• L'habitude du mouvement quotidien\n• Un plan pour les mauvais jours\n• 3 objectifs personnels\n\n**Maintenant :**\n• Remplissez le questionnaire final pour mesurer vos progrès\n• Vous verrez la comparaison de vos scores avant/après la cure\n• Dans 1 mois et 3 mois, vous pourrez refaire le questionnaire\n\nVotre hanche vous porte depuis des décennies. Elle peut encore vous porter longtemps — surtout si vous prenez soin d'elle.",
        keyMessage: "21 jours accomplis. Continuez vos exercices 3×/semaine. Votre hanche vous remerciera.",
        source: "NICE NG226, OARSI 2019",
      },
      action: { title: "Remplir le bilan final", description: "Cliquez ci-dessous pour remplir votre questionnaire de fin de cure et voir vos progrès.", duration: "3 min" },
    },
  ],
};
