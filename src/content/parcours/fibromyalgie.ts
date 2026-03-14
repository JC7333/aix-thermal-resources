import type { ParcoursContent } from './types';

export const fibromyalgieParcours: ParcoursContent = {
  slug: 'fibromyalgie',
  title: 'Fibromyalgie',
  subtitle: 'Apprivoiser, bouger, reprendre',
  description: '21 jours pour mieux vivre avec la fibromyalgie.',
  icon: '🧠',
  proInstrument: 'koos-ps',
  proIntro: "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de vos douleurs ?",
  days: [
    // ========== SEMAINE 1 : COMPRENDRE ==========
    {
      day: 1, theme: "La fibromyalgie, c'est réel", phase: 'comprendre',
      content: { title: "Une maladie reconnue par l'OMS", body: "La fibromyalgie est un syndrome douloureux chronique reconnu par l'OMS depuis 1992. Elle touche 2 à 4% de la population, majoritairement des femmes.\n\n**Ce que c'est :**\n• Des douleurs diffuses dans tout le corps (muscles, tendons, articulations)\n• Une fatigue intense, souvent dès le réveil\n• Des troubles du sommeil\n• Un « brouillard cognitif » (difficulté de concentration, mémoire)\n\n**Ce que ce n'est PAS :**\n• « Dans votre tête » — c'est un dérèglement réel du système nerveux\n• Une maladie inflammatoire — les analyses de sang sont normales\n• Une maladie qui détruit les articulations — pas de lésion visible\n\nVotre système nerveux est devenu **hypersensible** : il amplifie tous les signaux, y compris ceux qui ne devraient pas faire mal. C'est comme un volume sonore bloqué au maximum.\n\nPendant ces 3 semaines, vous apprendrez à baisser ce volume — doucement, progressivement.", keyMessage: "La fibromyalgie est réelle. C'est votre système nerveux qui est en hyperalerte.", source: "EULAR 2017, HAS 2010" },
      action: { title: "Marche très douce — 3 minutes", description: "Seulement 3 minutes, à votre rythme. Pas plus. L'objectif n'est pas de performer mais de commencer. Si 3 minutes c'est trop, faites 2 minutes. L'important est de bouger, même un tout petit peu.", duration: "3 min" },
    },
    {
      day: 2, theme: "L'exercice : votre meilleur allié", phase: 'comprendre',
      content: { title: "Bouger malgré la douleur — pourquoi et comment", body: "Cela semble paradoxal : vous avez mal partout, et on vous demande de bouger. Pourtant, l'exercice physique adapté est **le traitement le plus efficace** de la fibromyalgie, selon toutes les recommandations internationales (EULAR 2017).\n\n**Pourquoi ça marche :**\n• L'exercice libère des endorphines (antidouleur naturel)\n• Il améliore le sommeil profond\n• Il recalibre le système nerveux (baisse la sensibilisation)\n• Il combat le déconditionnement musculaire\n\n**La règle d'or : JAMAIS TROP, JAMAIS RIEN**\n• Commencer très bas (5 min si c'est tout ce que vous pouvez)\n• Augmenter de 10% par semaine maximum\n• Arrêter AVANT l'épuisement (pas après)\n• Les « bons jours », ne pas en profiter pour tout faire\n\nC'est le **pacing** : doser son effort pour ne pas déclencher de poussée.", keyMessage: "L'exercice adapté est le traitement n°1. La clé : jamais trop, jamais rien.", source: "EULAR 2017, Cochrane 2017" },
      action: { title: "Étirements doux assis — 5 minutes", description: "Assis sur une chaise : 1) Rotation lente de la tête (5× chaque sens). 2) Haussez les épaules, maintenez 5s, relâchez (5×). 3) Bras croisés, tournez le buste doucement (5× chaque côté). Ne forcez jamais. Si une zone est trop sensible, passez-la.", duration: "5 min" },
    },
    {
      day: 3, theme: "Le pacing : doser son effort", phase: 'comprendre',
      content: { title: "Le cycle boom-bust et comment en sortir", body: "La plupart des patients fibromyalgiques vivent un cycle destructeur :\n\n**Le cycle boom-bust :**\n• « Bon jour » → vous faites TOUT ce qui est en retard (ménage, courses, jardinage)\n• Le lendemain (ou 2 jours après) → vous êtes cloué(e) au lit\n• Repos forcé 2-3 jours → frustration\n• Dès que ça va mieux → vous recommencez tout\n\n**Le pacing brise ce cycle :**\n• Planifiez vos activités à l'avance (pas selon la douleur du moment)\n• Fractionnez : 15 min d'activité → 10 min de pause → 15 min d'activité\n• Mettez un minuteur ! Arrêtez-vous AVANT l'épuisement\n• Les bons jours : faites la MÊME quantité que les mauvais jours\n• Les mauvais jours : faites un minimum (même 5 min de marche)\n\nC'est contre-intuitif, mais cette régularité est la clé. En 2-3 semaines, vos capacités augmentent sans déclencher de poussée.", keyMessage: "Les bons jours : ne pas tout faire. Les mauvais jours : faire un minimum. Régularité = progrès.", source: "EULAR 2017, Pacing evidence" },
      action: { title: "Marche fractionnée — 3 + 2 + 3 min", description: "Marchez 3 minutes. Asseyez-vous 2 minutes. Marchez 3 minutes. Total : 8 minutes dont 6 de marche. Ce fractionnement est plus efficace que forcer 6 minutes d'affilée.", duration: "8 min" },
    },
    {
      day: 4, theme: "Sommeil et fibromyalgie", phase: 'comprendre',
      content: { title: "Le sommeil non réparateur : comprendre et agir", body: "80% des patients fibromyalgiques ont un sommeil de mauvaise qualité. Vous pouvez dormir 8-10h et vous réveiller épuisé(e). Le sommeil profond (celui qui répare) est perturbé.\n\n**Hygiène du sommeil (ce qui a des preuves) :**\n• Heures fixes de coucher ET de lever (même le week-end)\n• Pas d'écran (téléphone, tablette) 1h avant le coucher\n• Chambre fraîche (18-20°C), sombre, silencieuse\n• Pas de sieste > 20 min (sinon elle perturbe la nuit)\n• Pas de caféine après 14h\n\n**Routine du soir :**\n• 30 min avant le coucher : activité calme (lecture, musique douce)\n• Étirements très doux 5 min\n• Respiration abdominale 3 min\n• Chaleur locale si besoin (bouillotte sur les zones douloureuses)\n\nLe sommeil ne s'améliore pas en 2 jours. Il faut 2-3 semaines de régularité pour voir un changement.", keyMessage: "Le sommeil réparateur revient avec la régularité. Heures fixes + routine du soir.", source: "EULAR 2017, Sleep hygiene evidence" },
      action: { title: "Routine du soir — ce soir", description: "Ce soir, essayez : 1) Pas d'écran 30 min avant le coucher. 2) Étirements doux 3 min. 3) Respiration abdominale 3 min (inspirez 4s, expirez 6s). Observez votre endormissement.", duration: "6 min" },
    },
    {
      day: 5, theme: "Ce qui marche vraiment", phase: 'comprendre',
      content: { title: "Les traitements passés au crible", body: "**Ce qui marche (preuves solides) :**\n• Exercice aérobie adapté (marche, piscine, vélo) — EULAR : recommandation forte\n• Éducation thérapeutique (comprendre la maladie) — preuve forte\n• Thérapies corps-esprit (yoga, tai-chi, qigong) — Cochrane 2019\n• Exercice aquatique (piscine chaude) — Cochrane 2014\n• TCC (thérapie cognitivo-comportementale) — preuve forte\n\n**Ce qui aide :**\n• Cure thermale — bénéfice sur douleur et qualité de vie\n• Relaxation, méditation pleine conscience\n• Pacing (gestion de l'activité)\n\n**Ce qui n'a pas de preuve solide :**\n• Compléments alimentaires (magnésium, Q10, etc.)\n• Régimes d'exclusion\n• Médecines « alternatives » (homéopathie, magnétisme)\n\n**Médicaments :** les antidouleurs classiques (paracétamol, anti-inflammatoires) sont peu efficaces dans la fibromyalgie. Si un médicament est nécessaire, c'est votre médecin qui en discutera avec vous.", keyMessage: "L'exercice et les thérapies corps-esprit sont plus efficaces que les médicaments.", source: "EULAR 2017, Cochrane Reviews" },
      action: { title: "Marche — 5 minutes", description: "5 minutes de marche à votre rythme. Concentrez-vous sur votre respiration pendant la marche. Si vous vous sentez bien, ne faites PAS plus (pacing).", duration: "5 min" },
    },
    {
      day: 6, theme: "La cure thermale et la fibromyalgie", phase: 'comprendre',
      content: { title: "L'eau chaude : un soulagement prouvé", body: "La balnéothérapie (exercices en eau chaude) est l'une des approches les mieux étudiées pour la fibromyalgie.\n\nLa revue Cochrane 2014 montre que l'exercice aquatique en eau chaude améliore la douleur, la fonction physique et la qualité de vie.\n\n**Pourquoi l'eau chaude aide :**\n• La chaleur relâche les muscles contractés\n• La flottaison réduit la pression sur les points douloureux\n• L'eau chaude favorise la libération d'endorphines\n• L'environnement est apaisant (moins de stimulation sensorielle)\n\n**Ce que vous pouvez faire en piscine thermale :**\n• Marcher dans l'eau (la résistance renforce sans forcer)\n• Mobiliser doucement toutes les articulations\n• Simplement flotter et respirer\n\nProfitez de ces 3 semaines pour apprivoiser l'eau chaude. C'est un outil que vous pourrez retrouver en piscine municipale chauffée chez vous.", keyMessage: "L'eau chaude est un allié prouvé. Apprenez à l'utiliser pendant la cure, continuez après.", source: "Cochrane Aquatic 2014, Spa therapy 2018" },
      action: { title: "Séance en piscine thermale", description: "En piscine chaude : flottez 2 min (laissez-vous porter), puis marchez lentement 3 min, puis mobilisez doucement bras et jambes 2 min. Si pas de piscine, faites 5 min d'étirements doux au chaud (après une douche chaude).", duration: "7 min" },
    },
    {
      day: 7, theme: "Bilan semaine 1", phase: 'comprendre',
      content: { title: "Ce que vous avez appris", body: "Première semaine terminée !\n\n• La fibromyalgie est réelle — votre système nerveux est en hyperalerte\n• L'exercice adapté est le meilleur traitement\n• Le pacing (doser son effort) est la clé : jamais trop, jamais rien\n• Le sommeil réparateur revient avec la régularité\n• L'eau chaude est un allié prouvé\n\nLa semaine prochaine : vos exercices au quotidien, la gestion des poussées et du stress.", keyMessage: "Semaine 1 terminée. La régularité est votre arme n°1.", source: "Synthèse EULAR/Cochrane" },
      action: { title: "Marche bilan — 7 minutes", description: "Marche de 7 minutes. Notez comment vous vous sentez par rapport au jour 1.", duration: "7 min" },
      hasMiniPro: true,
      quiz: [
        { question: "Les analyses de sang sont-elles anormales dans la fibromyalgie ?", options: ["Oui, elles montrent l'inflammation", "Non, elles sont normales", "Ça dépend de la gravité"], correctIndex: 1, explanation: "Les analyses sont normales. La fibromyalgie est un dérèglement du système nerveux, pas une inflammation." },
        { question: "Que faire un « bon jour » ?", options: ["En profiter pour tout faire", "Faire la même quantité que d'habitude", "Se reposer pour stocker de l'énergie"], correctIndex: 1, explanation: "Le pacing : même quantité les bons et mauvais jours. Les excès déclenchent des poussées." },
      ],
    },

    // ========== SEMAINE 2 : AGIR ==========
    {
      day: 8, theme: "Votre programme d'exercices", phase: 'agir',
      content: { title: "5 exercices adaptés fibromyalgie", body: "Les exercices pour la fibromyalgie sont DIFFÉRENTS de ceux pour l'arthrose. L'objectif n'est pas de renforcer une articulation mais de **reconditionner le corps en douceur.**\n\n**Les 5 exercices :**\n• Marche adaptée — votre base quotidienne\n• Étirements doux — relâcher les tensions\n• Mobilisation articulaire — entretenir la souplesse\n• Renforcement très léger — prévenir le déconditionnement\n• Respiration/relaxation — calmer le système nerveux\n\n**Règle absolue :** commencer au niveau le plus facile. Augmenter de 10% par semaine MAXIMUM. Jamais au-delà de 5/10 sur l'échelle d'effort.", keyMessage: "Fibromyalgie = exercice ultra-progressif. 10% d'augmentation par semaine max.", source: "EULAR 2017, Cochrane 2017" },
      action: { title: "Circuit découverte — 10 min", description: "1) Marche 3 min. 2) Étirements assis (cou, épaules, dos) 2 min. 3) Mobilisation debout (cercles bras, rotation bassin) 2 min. 4) Lever de chaise 5× très lent. 5) Respiration abdominale 3 min. Arrêtez si effort > 5/10.", duration: "10 min" },
    },
    {
      day: 9, theme: "Yoga et tai-chi", phase: 'agir',
      content: { title: "Les thérapies corps-esprit qui ont des preuves", body: "La Cochrane 2019 montre que le yoga, le tai-chi et le qigong améliorent la douleur, le sommeil et la qualité de vie dans la fibromyalgie.\n\n**Pourquoi c'est efficace :**\n• Mouvements lents et contrôlés (pas de choc)\n• Combinaison mouvement + respiration + pleine conscience\n• Rééduque le système nerveux (baisse l'hypervigilance)\n• Améliore l'équilibre et la proprioception\n\n**Par quoi commencer :**\n• Yoga doux (Hatha, Yin, Nidra — PAS Bikram ni Ashtanga)\n• Tai-chi style Yang (le plus doux)\n• Qigong (encore plus lent que le tai-chi)\n\nVous pouvez trouver des vidéos gratuites en ligne pour débutants. L'important est de ne jamais forcer une posture.", keyMessage: "Yoga doux et tai-chi : preuves solides pour la fibromyalgie. Lenteur = efficacité.", source: "Cochrane Mind-body 2019" },
      action: { title: "Mini-séance corps-esprit — 5 min", description: "Debout, pieds écartés : 1) Levez lentement les bras en inspirant (5s), baissez en expirant (5s), 5×. 2) Rotation lente du buste, bras relâchés (10×). 3) Posture de l'arbre : un pied légèrement décollé, 15s chaque côté. 4) Respiration les yeux fermés 1 min.", duration: "5 min" },
    },
    {
      day: 10, theme: "Gérer les poussées", phase: 'agir',
      content: { title: "Quand la douleur explose : votre plan B", body: "Les poussées (flares) font partie de la fibromyalgie. Elles ne signifient pas que vous avez « tout cassé ». Elles sont souvent déclenchées par : suractivité (boom-bust), stress, mauvais sommeil, changement de météo, infection.\n\n**Plan d'action poussée :**\n• Réduisez votre activité à 50% (pas 0%)\n• Faites le minimum : 3 min de marche + 3 min d'étirements\n• Chaleur : bain chaud, bouillotte, couverture chauffante\n• Respiration abdominale 5 min (3× dans la journée)\n• Pas de culpabilité — la poussée n'est pas votre faute\n• Reprise progressive sur 3-5 jours\n\n**Ce qu'il ne faut PAS faire :**\n• Rester au lit toute la journée\n• Arrêter totalement les exercices\n• « Rattraper » quand ça va mieux", keyMessage: "Poussée = réduire à 50%, pas à 0%. Toujours un minimum de mouvement.", source: "EULAR 2017, Flare management consensus" },
      action: { title: "Écrire votre plan poussée", description: "Notez votre plan sur papier : minimum à faire (3 min marche + 3 min étirements), techniques de soulagement (chaleur, respiration), et le rappel « ce n'est pas ma faute, ça va passer ».", duration: "5 min" },
    },
    {
      day: 11, theme: "Stress et fibromyalgie", phase: 'agir',
      content: { title: "Le stress nourrit la douleur", body: "Le stress est l'un des plus grands amplificateurs de la fibromyalgie. Il augmente la sensibilisation centrale — votre système nerveux déjà en alerte devient encore plus réactif.\n\n**Techniques qui ont des preuves :**\n• **Cohérence cardiaque** — 5 min, 3×/jour (inspir 5s, expir 5s)\n• **Pleine conscience (mindfulness)** — même 5 min/jour réduisent la douleur\n• **Relaxation musculaire progressive** — contracter puis relâcher chaque groupe musculaire\n• **TCC** (avec un psychologue) — restructurer les pensées liées à la douleur\n\n**La cohérence cardiaque** est la plus simple à mettre en place : 5 minutes, 3 fois par jour, les effets sont mesurables en 1-2 semaines sur le cortisol, la variabilité cardiaque et la perception de la douleur.", keyMessage: "Le stress amplifie la douleur. La cohérence cardiaque 3×/jour est votre outil le plus rapide.", source: "EULAR 2017, TCC evidence" },
      action: { title: "Cohérence cardiaque — 5 min", description: "Assis ou allongé, yeux fermés. Inspirez nez 5s, expirez bouche 5s. 5 minutes (30 cycles). App « RespiRelax » gratuite si besoin.", duration: "5 min" },
    },
    {
      day: 12, theme: "Exercice aquatique", phase: 'agir',
      content: { title: "La piscine chaude : votre salle de sport idéale", body: "L'exercice en piscine chaude (30-34°C) est le mode d'exercice le plus étudié et le mieux toléré dans la fibromyalgie.\n\n**Programme aquatique simple :**\n• Marche dans l'eau — 5 min (la résistance renforce tout le corps)\n• Mouvements de bras sous l'eau — 2 min (bras tendus, poussez l'eau)\n• Pédalage sur place — 2 min (levez les genoux alternativement)\n• Étirements dans l'eau — 3 min (la chaleur facilite l'assouplissement)\n• Flottaison libre — 3 min (laissez-vous porter, respirez)\n\nL'eau chaude réduit la douleur, la raideur, et améliore l'humeur. Après la cure, cherchez une piscine chauffée (> 28°C) près de chez vous.", keyMessage: "La piscine chaude est la salle de sport idéale pour la fibromyalgie.", source: "Cochrane Aquatic 2014" },
      action: { title: "Programme aquatique — 15 min", description: "En piscine thermale : marche 5 min + bras 2 min + pédalage 2 min + étirements 3 min + flottaison 3 min. Si pas de piscine, faites vos étirements après une douche chaude.", duration: "15 min" },
    },
    {
      day: 13, theme: "Brouillard cognitif", phase: 'agir',
      content: { title: "Fibro-fog : quand la tête ne suit pas", body: "Le « brouillard fibromyalgique » (fibro-fog) touche la majorité des patients : difficultés de concentration, trous de mémoire, recherche de mots, confusion.\n\n**Ce qui aide :**\n• L'exercice physique (le plus prouvé — améliore l'oxygénation cérébrale)\n• Un bon sommeil (la mémoire se consolide pendant le sommeil profond)\n• La réduction du stress (le cortisol perturbe la mémoire)\n• Des aides pratiques : listes, alarmes, post-its, routine fixe\n• La stimulation cognitive douce (mots croisés, lecture, conversation)\n\n**Ce qui aggrave :**\n• Le multitâche (faire une chose à la fois)\n• La surcharge sensorielle (bruit, lumière, foule)\n• La fatigue accumulée (le brouillard augmente avec l'épuisement)\n\nLe brouillard cognitif n'est pas un signe de maladie neurologique. Il s'améliore quand le sommeil, l'exercice et le stress sont mieux gérés.", keyMessage: "Le brouillard cognitif s'améliore avec l'exercice, le sommeil et la réduction du stress.", source: "EULAR 2017, Fibromyalgia cognitive review" },
      action: { title: "Marche + respiration — 7 min", description: "Marchez 7 minutes en pratiquant la respiration consciente : inspirez sur 3 pas, expirez sur 4 pas. Cela combine exercice et pleine conscience — double bénéfice pour le cerveau.", duration: "7 min" },
    },
    {
      day: 14, theme: "Bilan semaine 2", phase: 'agir',
      content: { title: "Vos progrès à mi-parcours", body: "Deux semaines !\n\n• Vous avez un circuit d'exercices adaptés\n• Vous connaissez le yoga/tai-chi comme outils thérapeutiques\n• Vous avez un plan de gestion des poussées\n• Vous utilisez la cohérence cardiaque\n• Vous savez utiliser la piscine chaude\n\nComparez avec le début : dormez-vous un peu mieux ? Marchez-vous un peu plus longtemps ? Le brouillard est-il moins épais certains jours ?\n\nLa semaine 3 : préparer la suite et construire votre routine autonome.", keyMessage: "Mi-parcours. Chaque petit progrès compte — même les jours où vous ne le sentez pas.", source: "Synthèse" },
      action: { title: "Circuit complet — 12 min", description: "Marche 4 min + étirements 3 min + mobilisations 2 min + respiration 3 min. Chronométrez : c'est votre routine post-cure.", duration: "12 min" },
      hasMiniPro: true,
      quiz: [
        {
          question: "Quel est le seul traitement avec preuve forte dans la fibromyalgie ?",
          options: ["Les médicaments antidouleur", "L'exercice physique adapté", "Les massages"],
          correctIndex: 1,
          explanation: "L'exercice est la seule recommandation 'forte' selon EULAR 2017.",
        },
        {
          question: "Que signifie le 'pacing' ?",
          options: ["Alterner activité et repos pour gérer son énergie", "Faire le plus possible les jours de forme", "Ne rien faire les jours de douleur"],
          correctIndex: 0,
          explanation: "Le pacing consiste à répartir ses activités pour éviter le cycle boom-bust.",
        },
        {
          question: "Quel type d'exercice est le mieux toléré dans la fibromyalgie ?",
          options: ["La musculation intense", "La course à pied", "L'exercice en eau chaude"],
          correctIndex: 2,
          explanation: "L'eau chaude réduit la douleur et permet de bouger avec moins de contraintes.",
        },
      ],
    },

    // ========== SEMAINE 3 : CONSOLIDER ==========
    {
      day: 15, theme: "Mon plan post-cure", phase: 'consolider',
      content: { title: "Construire votre routine durable", body: "**Votre plan post-cure fibromyalgie :**\n• Exercice : marche 10-15 min/jour + étirements 5 min (progresser très lentement)\n• Corps-esprit : yoga doux ou tai-chi 1-2×/semaine\n• Piscine chaude : 1×/semaine si possible\n• Cohérence cardiaque : 3×/jour, 5 min\n• Pacing : planifier, fractionner, jamais de boom-bust\n• Sommeil : heures fixes + routine du soir\n\nLa fibromyalgie se gère sur le long terme. Ce n'est pas une course, c'est un marathon au ralenti.", keyMessage: "Routine régulière + pacing + patience = la formule qui marche.", source: "EULAR 2017" },
      action: { title: "Écrire 3 objectifs", description: "3 objectifs réalistes pour 3 mois. Ex : « Marcher 10 min/jour », « Yoga 1×/semaine », « Cohérence cardiaque quotidienne ». Affichez-les.", duration: "5 min" },
    },
    {
      day: 16, theme: "Acceptation et qualité de vie", phase: 'consolider',
      content: { title: "Vivre avec, pas contre", body: "L'acceptation n'est pas la résignation. C'est **arrêter de lutter contre la maladie pour mieux vivre AVEC.**\n\nL'acceptation, c'est :\n• Reconnaître que la fibromyalgie fait partie de votre vie (pour l'instant)\n• Adapter vos activités plutôt que de les abandonner\n• Fixer des objectifs réalistes (pas ceux d'avant la maladie)\n• Célébrer les petits progrès\n• Demander de l'aide quand c'est nécessaire\n\nLes études montrent que les patients qui développent l'acceptation ont moins de douleur, moins de dépression, et une meilleure qualité de vie — même si la maladie est la même.\n\nCe n'est pas facile. Un psychologue formé en TCC peut beaucoup aider.", keyMessage: "L'acceptation n'est pas la résignation. C'est le point de départ du mieux-vivre.", source: "EULAR 2017, ACT evidence" },
      action: { title: "1 chose positive", description: "Notez 1 chose que vous avez réussi à faire cette semaine malgré la fibromyalgie. Aussi petite soit-elle. C'est votre preuve que vous pouvez.", duration: "3 min" },
    },
    {
      day: 17, theme: "Activité physique adaptée", phase: 'consolider',
      content: { title: "Trouver votre activité plaisir", body: "**Excellentes pour la fibromyalgie :**\n• Marche (la base, la plus accessible)\n• Piscine chaude / aquagym douce\n• Yoga doux (Hatha, Yin)\n• Tai-chi / Qigong\n• Vélo doux (stationnaire au début)\n\n**À adapter :**\n• Danse (mouvements doux, pas de sauts)\n• Jardinage (fractionné, outils légers)\n• Pilates (version douce)\n\n**À éviter :**\n• Sports de contact ou à impacts\n• HIIT ou crossfit\n• Tout exercice qui provoque des poussées systématiques\n\n**Règle d'or :** si une activité provoque une poussée dans les 24-48h, réduisez la durée ou l'intensité de 50%.", keyMessage: "Choisissez le plaisir. Un exercice agréable est un exercice que vous ferez.", source: "EULAR 2017" },
      action: { title: "Tester une activité", description: "Essayez une activité nouvelle : aquagym douce, tai-chi, yoga. Évaluez : plaisir ? Douleur après ? Accessible chez vous ?", duration: "15-20 min" },
    },
    {
      day: 18, theme: "Alimentation et fibromyalgie", phase: 'consolider',
      content: { title: "Ce que dit la science", body: "**Preuves modérées :**\n• Alimentation méditerranéenne (anti-inflammatoire naturel)\n• Oméga-3 (poisson gras 2×/semaine)\n• Hydratation suffisante (1,5L/jour)\n• Vitamine D (à vérifier avec votre médecin si carence)\n\n**Pas de preuve solide :**\n• Régime sans gluten (sauf maladie coeliaque diagnostiquée)\n• Régime sans lactose (sauf intolérance confirmée)\n• Compléments (magnésium, Q10, 5-HTP)\n\nIl n'existe pas de « régime anti-fibromyalgie ». Mangez varié, équilibré, sans excès. Le conseil le plus impactant : réduire les aliments ultra-transformés.", keyMessage: "Pas de régime miracle. Méditerranéen + hydratation + pas d'ultra-transformés.", source: "EULAR 2017, Nutrition reviews" },
      action: { title: "1 changement alimentaire", description: "1 changement durable : plus de légumes, poisson 2×/semaine, réduire les ultra-transformés, boire plus d'eau.", duration: "5 min" },
    },
    {
      day: 19, theme: "L'entourage et la fibromyalgie", phase: 'consolider',
      content: { title: "Expliquer l'invisible", body: "La fibromyalgie est une maladie « invisible ». Vous avez l'air normal(e), mais vous souffrez. Cela crée des incompréhensions.\n\n**Comment expliquer :**\n• « Mon système nerveux est en hyperalerte — il amplifie tous les signaux »\n• « Je peux avoir l'air bien mais être épuisé(e) intérieurement »\n• « Les bons et les mauvais jours sont imprévisibles »\n• « L'exercice m'aide, mais je dois doser (pas trop, pas rien) »\n\n**Ce que l'entourage peut faire :**\n• Ne pas dire « c'est dans ta tête » ou « fais un effort »\n• Respecter les limites sans infantiliser\n• Accompagner dans les activités (marcher ensemble)\n• Accepter les annulations sans culpabiliser\n\nLes associations de patients (fibromyalgie-france.org) offrent du soutien et de l'information.", keyMessage: "La fibromyalgie est invisible mais réelle. Expliquer aide l'entourage à comprendre.", source: "Patient education consensus" },
      action: { title: "Expliquer à un proche", description: "Choisissez 1 proche et expliquez-lui en 2 phrases ce qu'est la fibromyalgie et ce dont vous avez besoin. Exemple : « Mon système nerveux amplifie la douleur. J'ai besoin de doser mes efforts, même les bons jours. »", duration: "5 min" },
    },
    {
      day: 20, theme: "Signaux d'alerte", phase: 'consolider',
      content: { title: "Quand consulter ?", body: "**Normal dans la fibromyalgie :**\n• Douleurs qui varient d'un jour à l'autre\n• Fatigue même après une nuit de sommeil\n• Poussées déclenchées par le stress ou la suractivité\n\n**Consultez votre médecin :**\n• Perte de poids inexpliquée, fièvre, sueurs nocturnes\n• Gonflement articulaire visible, rouge, chaud (pas typique de la fibromyalgie)\n• Faiblesse musculaire progressive (pas que de la fatigue)\n• Idées suicidaires ou dépression sévère — appelez le 3114 (numéro national de prévention du suicide)\n• Symptômes neurologiques nouveaux (engourdissement, paralysie)\n\nLa fibromyalgie ne cause pas de lésions articulaires ni de paralysie. Si ces symptômes apparaissent, c'est autre chose.", keyMessage: "La fibromyalgie ne cause ni gonflement, ni paralysie, ni fièvre. Si ces symptômes apparaissent, consultez.", source: "EULAR 2017, Clinical consensus" },
      action: { title: "Préparer sa trousse anti-crise", description: "Rassemblez : plan poussée (J10), 3 objectifs (J15), numéro médecin, numéro 3114 si besoin.", duration: "5 min" },
    },
    {
      day: 21, theme: "Votre bilan final", phase: 'consolider',
      content: { title: "21 jours — bravo !", body: "Vous avez terminé votre parcours.\n\n**Ce que vous emportez :**\n• La compréhension de votre maladie (système nerveux en hyperalerte)\n• Le pacing comme mode de vie (régularité, fractionnement)\n• Des exercices adaptés (marche, étirements, corps-esprit)\n• Des outils anti-stress (cohérence cardiaque, relaxation)\n• Un plan pour les poussées\n\n**Maintenant :**\n• Remplissez le questionnaire final pour mesurer vos progrès\n• Vous verrez la comparaison avant/après cure\n• Dans 1 et 3 mois, refaites le questionnaire\n\nLa fibromyalgie est un marathon. Vous avez appris à courir au bon rythme.", keyMessage: "La fibromyalgie se gère avec patience et régularité. Vous avez les outils.", source: "EULAR 2017" },
      action: { title: "Remplir le bilan final", description: "Questionnaire de fin de cure pour voir vos progrès.", duration: "3 min" },
    },
  ],
};
