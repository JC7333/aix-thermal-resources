import type { ParcoursContent } from './types';

export const tendinopathieCoiffeParcours: ParcoursContent = {
  slug: 'tendinopathie-coiffe',
  title: "Tendinopathie de l'épaule",
  subtitle: 'Comprendre, rééduquer, retrouver',
  description: "21 jours pour rééduquer votre épaule en douceur.",
  icon: '💪',
  proInstrument: 'koos-ps',
  proIntro: "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de votre épaule ?",
  days: [
    // ========== SEMAINE 1 : COMPRENDRE ==========
    {
      day: 1, theme: "Votre épaule expliquée", phase: 'comprendre',
      content: { title: "La coiffe des rotateurs : 4 tendons essentiels", body: "La tendinopathie de la coiffe des rotateurs est la cause n°1 de douleur d'épaule. La « coiffe » est un groupe de 4 tendons qui entourent l'articulation et permettent de lever, tourner et stabiliser votre bras.\n\nCes tendons peuvent s'irriter, s'épaissir, ou se fragiliser avec l'âge et la surutilisation. La douleur est souvent ressentie sur le côté ou le devant de l'épaule, surtout quand vous levez le bras.\n\n**Bonne nouvelle :** dans la majorité des cas, **la rééducation est aussi efficace que la chirurgie** (étude CSAW, Lancet 2018). L'amélioration est progressive sur 3 à 6 mois.\n\nPendant ces 3 semaines, vous apprendrez les exercices qui ont fait leurs preuves pour soulager et renforcer votre épaule.", keyMessage: "La rééducation est aussi efficace que la chirurgie. Patience : 3 à 6 mois d'amélioration progressive.", source: "Lancet CSAW 2018, HAS 2023" },
      action: { title: "Pendulaire de Codman — 1 min", description: "Penché en avant, bras relâché, laissez-le pendre. Faites de petits cercles lents (10 dans chaque sens). Le bras est comme un pendule — NE LE SOULEVEZ PAS ACTIVEMENT. Cet exercice soulage par la traction douce.", duration: "1 min" },
    },
    {
      day: 2, theme: "Bouger ne détruit pas votre épaule", phase: 'comprendre',
      content: { title: "L'immobilisation est l'ennemie", body: "Le premier réflexe quand l'épaule fait mal est d'arrêter de l'utiliser. C'est une erreur. L'immobilisation prolongée provoque :\n• Raideur de la capsule articulaire (épaule gelée)\n• Fonte des muscles de la coiffe\n• Amplification de la douleur\n\n**La bonne approche :**\n• Éviter les gestes QUI FONT MAL (au-dessus de la tête, porter lourd bras tendu)\n• Continuer les gestes QUI NE FONT PAS MAL\n• Faire les exercices de rééducation quotidiennement\n\nVotre épaule a besoin de mouvement contrôlé, pas de repos total.", keyMessage: "Évitez les gestes douloureux mais ne cessez pas d'utiliser votre épaule.", source: "NICE NG234, HAS 2023" },
      action: { title: "Rotation externe coude au corps — 5×", description: "Debout, coude plié à 90°, collé au corps. Tournez l'avant-bras vers l'extérieur (comme pour ouvrir une porte). Tenez 3s, revenez. 5 répétitions. Utilisez un élastique léger si disponible.", duration: "2 min" },
    },
    {
      day: 3, theme: "Comprendre votre douleur d'épaule", phase: 'comprendre',
      content: { title: "L'arc douloureux et la règle des 24h", body: "La douleur de la coiffe a un pattern typique :\n• **L'arc douloureux** : la douleur apparaît entre 60° et 120° d'élévation du bras, puis disparaît au-delà\n• Douleur en portant, en se coiffant, en attrapant un objet en hauteur\n• Douleur la nuit quand on dort sur l'épaule\n\n**La règle des 24h :**\nSi un exercice augmente la douleur mais qu'elle revient à la normale en 24h → l'exercice est adapté.\nSi la douleur persiste > 24h → réduisez l'intensité ou l'amplitude.\n\n**Douleur acceptable pendant les exercices :** jusqu'à 3-4/10. Au-delà, réduisez.", keyMessage: "Douleur 3-4/10 pendant les exercices = acceptable. Au-delà, réduisez l'amplitude.", source: "NICE NG234, Pain monitoring" },
      action: { title: "Respiration + relâchement épaule", description: "Assis, bras relâchés. Inspirez 4s en haussant les épaules, expirez 6s en les laissant tomber lourdement. 10 cycles. Cela relâche le trapèze qui se contracte pour protéger l'épaule.", duration: "3 min" },
    },
    {
      day: 4, theme: "Posture et épaule", phase: 'comprendre',
      content: { title: "Les épaules en avant : le piège moderne", body: "La posture « épaules en avant » (écran, téléphone, conduite) réduit l'espace sous l'acromion et comprime les tendons de la coiffe.\n\n**Exercice de correction posturale :**\n• Rétraction scapulaire : serrez les omoplates l'une contre l'autre, maintenez 5s, relâchez. 10×.\n• Menton rentré (double menton) : reculez la tête sans regarder en haut ni en bas. 10×.\n\nCes 2 exercices, faits 3×/jour, ouvrent l'espace sous-acromial et réduisent la compression des tendons.\n\nAu bureau : faites-les toutes les heures. C'est invisible et ça prend 30 secondes.", keyMessage: "Serrez les omoplates + rentrez le menton : 30 secondes pour soulager votre épaule.", source: "HAS 2023, Posture evidence" },
      action: { title: "Rétractions scapulaires — 10×", description: "Debout ou assis, serrez les omoplates l'une contre l'autre (comme si vous vouliez coincer un crayon entre elles). Maintenez 5s, relâchez. 10 fois. Puis double menton : reculez la tête 5s, 10 fois.", duration: "3 min" },
    },
    {
      day: 5, theme: "Traitements evidence-based", phase: 'comprendre',
      content: { title: "Ce qui marche pour l'épaule", body: "**Ce qui marche (preuves fortes) :**\n• Exercices de rééducation progressifs — traitement n°1 (Cochrane 2021)\n• Kinésithérapie supervisée — plus efficace que les exercices seuls au début\n\n**Ce qui aide temporairement :**\n• Infiltration de corticoïdes — soulagement 4-6 semaines, max 2-3 injections (NICE 2022)\n• Chaleur avant / froid après les exercices\n\n**Ce qui n'a PAS de preuve :**\n• Échographie thérapeutique\n• Électrostimulation\n• Ondes de choc (résultats contradictoires)\n\n**Chirurgie :** l'étude CSAW (Lancet 2018) a montré que la chirurgie d'acromioplastie n'est PAS supérieure à un placebo. La rééducation est le premier choix. La chirurgie est réservée aux échecs après 3-6 mois.", keyMessage: "La rééducation bat la chirurgie dans la majorité des cas. Patience : 3-6 mois.", source: "Lancet CSAW 2018, Cochrane 2021, NICE NG234" },
      action: { title: "Élévation latérale partielle — 5×", description: "Debout, bras le long du corps. Levez le bras sur le côté jusqu'à 45° seulement (pas au-dessus de l'épaule). Maintenez 3s, redescendez. 5 fois. Si douleur > 3/10, réduisez l'amplitude.", duration: "2 min" },
    },
    {
      day: 6, theme: "Cure thermale et épaule", phase: 'comprendre',
      content: { title: "L'eau chaude pour votre épaule", body: "La cure thermale aide l'épaule de 3 façons :\n• La chaleur relâche les muscles contractés (trapèze, deltoïde)\n• La flottaison facilite les mouvements (lever le bras dans l'eau = plus facile)\n• L'environnement sécurisant encourage à bouger\n\n**En piscine thermale :**\n• Immergez l'épaule et faites des pendulaires\n• Faites des mouvements de bras sous l'eau (la résistance renforce en douceur)\n• Essayez de lever le bras plus haut qu'à sec — l'eau aide\n\nApprenez ces mouvements pendant la cure, puis faites-les sous la douche chaude chez vous.", keyMessage: "L'eau chaude facilite le mouvement de l'épaule. Profitez de la cure pour progresser.", source: "Thermal therapy consensus" },
      action: { title: "Exercice en piscine thermale", description: "En piscine : pendulaires 1 min + rotation externe sous l'eau 10× + élévation latérale sous l'eau 10×. Si pas de piscine, faites les pendulaires après une douche chaude.", duration: "5 min" },
    },
    {
      day: 7, theme: "Bilan semaine 1", phase: 'comprendre',
      content: { title: "Ce que vous avez appris", body: "Première semaine !\n\n• La coiffe des rotateurs = 4 tendons qui stabilisent l'épaule\n• La rééducation est aussi efficace que la chirurgie\n• Ne pas immobiliser — éviter les gestes douloureux mais bouger\n• Douleur 3-4/10 pendant les exercices = acceptable\n• Posture (rétractions scapulaires) = soulagement rapide\n\nSemaine 2 : les exercices progressifs de renforcement.", keyMessage: "Semaine 1 terminée. Vous comprenez maintenant comment aider votre épaule.", source: "Synthèse HAS/NICE/Lancet" },
      action: { title: "Tous les exercices appris — 5 min", description: "Pendulaires 1 min + rotations externes 5× + rétractions 10× + élévation 45° 5×. Notez votre ressenti.", duration: "5 min" },
      hasMiniPro: true,
      quiz: [
        { question: "La chirurgie est-elle plus efficace que la rééducation ?", options: ["Oui, toujours", "Non, la rééducation est aussi efficace dans la majorité des cas", "Seulement après 1 mois"], correctIndex: 1, explanation: "L'étude CSAW (Lancet 2018) a montré que la chirurgie n'est pas supérieure à la rééducation." },
        { question: "Quelle douleur est acceptable pendant les exercices ?", options: ["0/10, aucune douleur", "3-4/10 maximum", "Autant que possible"], correctIndex: 1, explanation: "Jusqu'à 3-4/10 est acceptable. Au-delà, réduisez l'amplitude." },
      ],
    },

    // ========== SEMAINE 2 : AGIR ==========
    {
      day: 8, theme: "Votre programme épaule", phase: 'agir',
      content: { title: "Les 5 exercices essentiels", body: "**Les 5 exercices épaule :**\n• Pendulaire de Codman — mobilité sans effort\n• Rotation externe coude au corps — renforce les rotateurs\n• Rétraction scapulaire — stabilise l'omoplate\n• Élévation latérale progressive — renforce le deltoïde\n• Étirement capsule postérieure — assouplit\n\nCommencez TOUJOURS par les pendulaires (échauffement). Puis les rotations et rétractions (stabilisation). Puis les élévations (renforcement). Finissez par les étirements.", keyMessage: "5 exercices dans l'ordre : échauffement → stabilisation → renforcement → étirement.", source: "HAS 2023, Cochrane 2021" },
      action: { title: "Circuit complet — 10 min", description: "Pendulaires 1 min → rotations externes 8× → rétractions 10× → élévation 45-60° 8× → étirement capsule postérieure 30s chaque côté.", duration: "10 min" },
    },
    {
      day: 9, theme: "Renforcement des rotateurs", phase: 'agir',
      content: { title: "Rotation externe : l'exercice roi", body: "La rotation externe est l'exercice le plus important pour la coiffe. Il renforce le sous-épineux et le petit rond — les deux muscles qui sont le plus souvent atteints.\n\n**Technique :**\n• Debout ou assis, coude plié 90°, serré contre le corps\n• Tournez l'avant-bras vers l'extérieur contre une résistance (élastique, serviette roulée)\n• Mouvement lent (3s aller, 3s retour)\n• 3 séries de 8-10 répétitions\n\n**Progression :**\n• Semaine 1 : sans résistance\n• Semaine 2 : élastique léger\n• Semaine 3 : élastique moyen\n• Post-cure : élastique fort", keyMessage: "La rotation externe renforce les 2 tendons les plus fragiles. C'est VOTRE exercice.", source: "HAS 2023, NICE NG234" },
      action: { title: "Rotations externes — 3×10", description: "Coude au corps, 90°. Tournez l'avant-bras vers l'extérieur (3s), revenez (3s). 10 reps × 3 séries, repos 30s. Avec élastique léger si disponible.", duration: "8 min" },
    },
    {
      day: 10, theme: "Assouplir l'épaule", phase: 'agir',
      content: { title: "Les étirements qui libèrent", body: "L'épaule se raidit quand on la protège. 3 étirements essentiels :\n\n**Capsule postérieure :** bras en croix devant vous, tirez le coude vers l'épaule opposée. 30s.\n**Porte (pectoraux + avant épaule) :** avant-bras sur le montant d'une porte, avancez le buste. 30s.\n**Sleeper stretch :** allongé sur le côté douloureux, bras devant à 90°, poussez l'avant-bras vers le sol avec l'autre main. 30s.\n\nÉtirez après les exercices de renforcement, quand les muscles sont chauds.", keyMessage: "3 étirements après chaque séance : capsule, pectoraux, sleeper stretch.", source: "Physiotherapy guidelines" },
      action: { title: "Routine étirements épaule — 5 min", description: "Capsule postérieure 30s × 2 + porte 30s × 2 + sleeper stretch 30s × 2. Respiration calme.", duration: "5 min" },
    },
    {
      day: 11, theme: "Gestes quotidiens", phase: 'agir',
      content: { title: "Protéger votre épaule au quotidien", body: "**Gestes à adapter :**\n• Attraper un objet en hauteur : utilisez un tabouret/escabeau\n• Porter des courses : sacs près du corps, pas bras tendus\n• S'habiller : commencer par le bras douloureux\n• Conduire : volant en position basse\n• Dormir : PAS sur le côté douloureux, ou avec un coussin sous le bras\n\n**Gestes à éviter :**\n• Bras au-dessus de la tête en charge (peindre un plafond, changer une ampoule)\n• Porter loin du corps (bras tendu)\n• Mouvements répétitifs bras levés", keyMessage: "Adaptez vos gestes plutôt que d'arrêter de vivre. Près du corps = moins de douleur.", source: "HAS 2023, OT consensus" },
      action: { title: "Identifier 2 gestes à adapter", description: "Quels gestes quotidiens vous font mal ? Notez-en 2 et trouvez une adaptation pour chacun.", duration: "5 min" },
    },
    {
      day: 12, theme: "Gérer les poussées", phase: 'agir',
      content: { title: "Quand l'épaule crie plus fort", body: "**Plan d'action poussée épaule :**\n• Froid (pas chaud) : 15 min de glace dans un linge sur l'épaule\n• Réduisez les exercices mais faites les pendulaires (ils soulagent)\n• Paracétamol si besoin\n• Évitez les gestes déclencheurs pendant 2-3 jours\n• Reprise progressive des exercices\n\n**Quand consulter en urgence :**\n• Impossibilité COMPLÈTE de lever le bras (rupture aiguë ?)\n• Douleur thoracique irradiant dans le bras gauche (cause cardiaque ?)\n• Épaule déformée après un choc (luxation ?)", keyMessage: "Poussée = froid + pendulaires + repos relatif. Urgence = impossibilité totale de lever le bras.", source: "NICE NG234" },
      action: { title: "Écrire votre plan poussée", description: "Notez les étapes : froid 15 min, pendulaires, réduction temporaire, reprise progressive.", duration: "5 min" },
    },
    {
      day: 13, theme: "Sommeil et épaule", phase: 'agir',
      content: { title: "Bien dormir avec une épaule douloureuse", body: "L'épaule est l'articulation qui perturbe le plus le sommeil. La douleur nocturne est caractéristique de la tendinopathie de coiffe.\n\n**Positions :**\n• Sur le dos : bras le long du corps ou sur un coussin\n• Sur le côté sain : coussin devant vous pour poser le bras douloureux\n• Sur le côté douloureux : généralement impossible — évitez\n\n**Astuces :**\n• Coussin sous le bras (léger angle d'élévation réduit la pression)\n• Chaleur locale 15 min avant le coucher (bouillotte sur l'épaule)\n• Pendulaires doux 1 min avant de se coucher", keyMessage: "Coussin sous le bras + chaleur avant le coucher = nuit plus calme.", source: "NICE NG234, Sleep consensus" },
      action: { title: "Routine du soir épaule", description: "1) Pendulaires doux 1 min. 2) Chaleur sur l'épaule 10 min. 3) Coussin sous le bras au coucher.", duration: "12 min" },
    },
    {
      day: 14, theme: "Bilan semaine 2", phase: 'agir',
      content: { title: "Mi-parcours", body: "Deux semaines !\n\n• 5 exercices épaule maîtrisés\n• 3 étirements essentiels\n• Gestes quotidiens adaptés\n• Plan poussée prêt\n• Techniques sommeil\n\nComparez avec le début : levez-vous le bras un peu plus haut ? La douleur nocturne a-t-elle diminué ?", keyMessage: "Mi-parcours. L'épaule s'améliore lentement mais sûrement.", source: "Synthèse" },
      action: { title: "Circuit complet — 12 min", description: "Pendulaires + rotations 10× + rétractions 10× + élévation 8× + 3 étirements 30s. Chronométrez.", duration: "12 min" },
      hasMiniPro: true,
      quiz: [
        {
          question: "Quel exercice est le plus important pour la coiffe des rotateurs ?",
          options: ["Les pompes", "La rotation externe avec élastique", "Les développés épaules"],
          correctIndex: 1,
          explanation: "La rotation externe cible spécifiquement les muscles de la coiffe des rotateurs.",
        },
        {
          question: "Que faire en cas de poussée douloureuse ?",
          options: ["Arrêter tous les exercices", "Réduire l'amplitude mais continuer les pendulaires", "Prendre des anti-inflammatoires"],
          correctIndex: 1,
          explanation: "Adapter la charge plutôt qu'arrêter. Les pendulaires restent toujours possibles.",
        },
        {
          question: "Quelle posture protège la coiffe des rotateurs ?",
          options: ["Épaules en arrière, menton rentré", "Épaules enroulées en avant", "Bras croisés"],
          correctIndex: 0,
          explanation: "Les épaules en arrière ouvrent l'espace sous l'acromion et réduisent la compression des tendons.",
        },
      ],
    },

    // ========== SEMAINE 3 : CONSOLIDER ==========
    {
      day: 15, theme: "Plan post-cure", phase: 'consolider',
      content: { title: "Votre programme pour les 3 prochains mois", body: "**L'épaule a besoin de 3-6 mois de rééducation.** La cure est le début, pas la fin.\n\n**Votre routine post-cure :**\n• Exercices épaule : 5 exercices, TOUS LES JOURS (10 min)\n• Progression : augmenter la résistance de l'élastique toutes les 2 semaines\n• Kiné : 1-2 séances/semaine pendant 2-3 mois si possible\n• Rétractions scapulaires : 3×/jour au bureau/maison\n\n**Timeline réaliste :**\n• 3 semaines (cure) : moins de douleur, début de mobilité\n• 6 semaines : amplitude améliorée\n• 3 mois : force récupérée à 70%\n• 6 mois : retour à la normale pour la majorité", keyMessage: "La cure est le début. Exercices quotidiens + kiné 2-3 mois = guérison.", source: "HAS 2023, NICE NG234" },
      action: { title: "Écrire 3 objectifs", description: "3 objectifs : « Exercices épaule quotidiens », « Kiné 1×/semaine pendant 3 mois », « Reprendre [activité] dans 2 mois ».", duration: "5 min" },
    },
    {
      day: 16, theme: "Ergonomie épaule", phase: 'consolider',
      content: { title: "Adapter son poste et ses gestes", body: "**Bureau :** écran à hauteur des yeux, accoudoirs réglables, souris près du corps.\n**Cuisine :** ranger les objets fréquents à hauteur d'épaule (pas en haut).\n**Voiture :** volant en bas, pas de bras tendu.\n**Ménage :** aspirateur léger, pas de gestes au-dessus de la tête.\n**Sport :** éviter les lancers et les gestes overhead pendant la rééducation.", keyMessage: "Rangez à hauteur d'épaule. Tout ce qui est en haut devrait être rapproché.", source: "HAS 2023" },
      action: { title: "1 adaptation", description: "Identifiez 1 geste quotidien à adapter et mettez-le en place.", duration: "5 min" },
    },
    {
      day: 17, theme: "Activité physique", phase: 'consolider',
      content: { title: "Quels sports avec une épaule douloureuse ?", body: "**Excellentes :**\n• Marche, vélo (n'impliquent pas l'épaule)\n• Natation (crawl SANS douleur, brasse, dos crawlé)\n• Vélo elliptique (amplitude contrôlée)\n\n**À adapter :**\n• Natation : éviter le papillon, adapter le crawl\n• Yoga : éviter les postures en appui bras tendus (chien tête en bas)\n• Jardinage : outils légers, pas de gestes overhead\n\n**À éviter pendant la rééducation :**\n• Tennis, badminton, volleyball\n• Musculation overhead (développé militaire)\n• Escalade", keyMessage: "Marche et vélo n'impliquent pas l'épaule. Natation : oui mais sans douleur.", source: "NICE NG234" },
      action: { title: "Tester une activité", description: "Essayez une activité qui n'implique pas l'épaule (marche, vélo) ou adaptée (natation dos).", duration: "15-20 min" },
    },
    {
      day: 18, theme: "Nutrition et tendons", phase: 'consolider',
      content: { title: "Nourrir vos tendons", body: "Les tendons ont besoin de nutriments pour se réparer :\n\n**Ce qui aide :**\n• Protéines suffisantes (viande, poisson, œufs, légumineuses)\n• Vitamine C (fruits, légumes) — nécessaire à la synthèse du collagène\n• Hydratation (1,5L/jour) — les tendons contiennent beaucoup d'eau\n\n**Facteurs qui nuisent aux tendons :**\n• Tabac (réduit la vascularisation)\n• Alcool excessif\n• Certains antibiotiques (fluoroquinolones) — signalez votre tendinopathie\n\nPas de complément miracle (collagène oral = preuve insuffisante).", keyMessage: "Protéines + vitamine C + hydratation. Le tabac est l'ennemi des tendons.", source: "Tendon nutrition evidence" },
      action: { title: "1 changement alimentaire", description: "Protéines à chaque repas, un fruit par jour pour la vitamine C, 1,5L d'eau.", duration: "5 min" },
    },
    {
      day: 19, theme: "Gestion du stress", phase: 'consolider',
      content: { title: "Le stress contracte le trapèze", body: "Le stress provoque une contraction réflexe du trapèze supérieur (le muscle entre le cou et l'épaule). Ce muscle contracté comprime l'espace sous-acromial et aggrave la tendinopathie.\n\n**La cohérence cardiaque** relâche ce muscle : 5 min, inspirez 5s, expirez 5s.\n**Les rétractions scapulaires** étirent le trapèze.\n**Les haussements d'épaules** (monter, maintenir 5s, laisser tomber) décontractent.", keyMessage: "Le stress contracte le trapèze → comprime les tendons. Relâchez 3×/jour.", source: "NICE NG234" },
      action: { title: "Cohérence cardiaque + relâchement", description: "3 min cohérence cardiaque + 10 haussements d'épaules (monter 5s, laisser tomber lourdement).", duration: "5 min" },
    },
    {
      day: 20, theme: "Signaux d'alerte", phase: 'consolider',
      content: { title: "Quand consulter ?", body: "**Normal :**\n• Douleur qui fluctue au fil des semaines\n• Douleur nocturne qui diminue progressivement\n• Craquements non douloureux\n\n**Consultez :**\n• Impossibilité complète et brutale de lever le bras (rupture ?)\n• Douleur thoracique + bras gauche (cause cardiaque ?)\n• Déformation après un choc (luxation ?)\n• Aucune amélioration après 3 mois de rééducation bien conduite\n\nAprès 3-6 mois de rééducation sans résultat, discuter infiltration ou chirurgie avec votre médecin.", keyMessage: "Urgence = impossibilité totale de lever le bras, ou douleur thoracique + bras gauche.", source: "NICE NG234" },
      action: { title: "Préparer sa trousse", description: "Plan poussée + 3 objectifs + numéro médecin. Au même endroit.", duration: "5 min" },
    },
    {
      day: 21, theme: "Bilan final", phase: 'consolider',
      content: { title: "21 jours — bravo !", body: "Vous avez terminé votre parcours.\n\n**Ce que vous emportez :**\n• 5 exercices de rééducation épaule\n• La certitude que la rééducation bat la chirurgie\n• Des gestes quotidiens adaptés\n• Un plan pour les 3-6 prochains mois\n\n**Continuez vos exercices TOUS LES JOURS pendant 3-6 mois. L'épaule guérit lentement mais sûrement.**\n\nRemplissez le questionnaire final pour mesurer vos progrès.", keyMessage: "Continuez quotidiennement. 3-6 mois de rééducation = résultat durable.", source: "HAS 2023, Lancet CSAW 2018" },
      action: { title: "Remplir le bilan final", description: "Questionnaire de fin de cure.", duration: "3 min" },
    },
  ],
};
