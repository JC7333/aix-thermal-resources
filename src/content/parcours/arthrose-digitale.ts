import type { ParcoursContent } from './types';

export const arthroseDigitaleParcours: ParcoursContent = {
  slug: 'arthrose-digitale',
  title: 'Arthrose des mains',
  subtitle: 'Mobiliser, soulager, adapter',
  description: '21 jours pour garder vos mains actives.',
  icon: '✋',
  proInstrument: 'koos-ps',
  proIntro: "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de vos mains ?",
  days: [
    // ========== SEMAINE 1 : COMPRENDRE ==========
    {
      day: 1, theme: "L'arthrose des mains expliquée", phase: 'comprendre',
      content: { title: "Vos doigts, vos pouces, votre quotidien", body: "L'arthrose digitale touche les articulations des doigts et du pouce (rhizarthrose = base du pouce). Elle provoque douleur, raideur, gonflements et parfois des déformations (nodosités).\n\n**Ce qui est important :**\n• Les nodosités (bosses sur les doigts) ne signifient PAS plus de douleur\n• Les exercices de la main sont le pilier du traitement\n• La chaleur soulage, les orthèses de repos aident la nuit\n• Vos mains peuvent rester fonctionnelles très longtemps avec les bons gestes\n\nPendant ces 3 semaines, vous apprendrez à mobiliser, renforcer et protéger vos mains.", keyMessage: "Les nodosités ne signifient pas plus de douleur. Vos mains ont besoin de mouvement.", source: "EULAR 2018, ACR 2019" },
      action: { title: "Bain chaud + mobilisation — 5 min", description: "Trempez vos mains dans l'eau chaude (38-40°C) pendant 3 minutes. Puis ouvrez et fermez les doigts lentement 10 fois. La chaleur assouplit, le mouvement nourrit le cartilage.", duration: "5 min" },
    },
    {
      day: 2, theme: "Bouger ses doigts les protège", phase: 'comprendre',
      content: { title: "L'exercice : le meilleur traitement", body: "Comme pour les autres articulations, le cartilage des doigts se nourrit par le mouvement.\n\n**Pourquoi exercer vos mains :**\n• Maintient la mobilité (évite la raideur progressive)\n• Renforce les muscles intrinsèques de la main\n• Améliore la prise (force de serrage)\n• Réduit la douleur à moyen terme\n\nLa Cochrane 2021 confirme que les exercices de la main améliorent la douleur et la fonction dans l'arthrose digitale.\n\n**La règle :** des exercices courts et fréquents sont mieux que de longues sessions. 5 minutes 2-3×/jour > 20 minutes 1×/jour.", keyMessage: "5 minutes d'exercices 2-3×/jour. Court et fréquent > long et rare.", source: "Cochrane 2021, EULAR 2018" },
      action: { title: "Exercice de prise — 10 fois", description: "Serrez une balle molle (ou une éponge) doucement, maintenez 3 secondes, relâchez. 10 fois chaque main. Ne serrez PAS fort — juste une contraction douce.", duration: "3 min" },
    },
    {
      day: 3, theme: "Le pouce : la clé de la main", phase: 'comprendre',
      content: { title: "Rhizarthrose : quand le pouce fait mal", body: "La rhizarthrose (arthrose de la base du pouce) est la forme la plus gênante car le pouce intervient dans 80% des gestes de la main.\n\n**Signes typiques :**\n• Douleur à la base du pouce (entre pouce et poignet)\n• Difficulté à ouvrir un bocal, tourner une clé, boutonner\n• Perte de force de pince pouce-index\n\n**Ce qui aide :**\n• Orthèse de repos la nuit (stabilise la base du pouce)\n• Exercices de mobilisation du pouce\n• Adaptations (ouvre-bocaux, gros manches)\n• Chaleur locale avant les exercices\n\nL'orthèse nocturne est l'un des rares dispositifs avec une preuve solide (Cochrane 2022).", keyMessage: "Orthèse de nuit + exercices quotidiens = le duo gagnant pour le pouce.", source: "EULAR 2018, Cochrane Splints 2022" },
      action: { title: "Rotation du pouce — 5× chaque sens", description: "Faites tourner votre pouce en cercle, doucement, 5 fois dans chaque sens. Puis touchez chaque doigt avec le pouce (pince), 3 allers-retours. Cela maintient la mobilité de la base.", duration: "2 min" },
    },
    {
      day: 4, theme: "Chaleur : votre alliée", phase: 'comprendre',
      content: { title: "La chaleur avant, le froid si besoin après", body: "**La chaleur assouplit les mains avant les exercices :**\n• Bain d'eau chaude (38-40°C) — 3 à 5 min\n• Bains de paraffine (en cure thermale — excellent pour les mains)\n• Bouillotte ou chaufferette\n\nLa chaleur détend les muscles, assouplit les tendons, et réduit la raideur.\n\n**Le froid après, si inflammation :**\n• Si une articulation est rouge, chaude, gonflée → froid 10 min (glaçons dans un linge)\n• En dehors des poussées inflammatoires, la chaleur est préférable\n\n**La cure thermale** est particulièrement bénéfique pour les mains : l'eau chaude + la boue thermale + les exercices dans l'eau = triple bénéfice.", keyMessage: "Chaleur avant les exercices = mains plus souples. Paraffine en cure = excellent.", source: "EULAR 2018, Thermal consensus" },
      action: { title: "Bain chaud + exercices — 7 min", description: "Bain chaud 3 min. Dans l'eau : ouvrir/fermer 10×, écarter les doigts 10×, toucher pouce-doigts 3×. Sécher. Frotter les mains entre elles 30s pour prolonger la chaleur.", duration: "7 min" },
    },
    {
      day: 5, theme: "Ce qui marche vraiment", phase: 'comprendre',
      content: { title: "Traitements evidence-based", body: "**Ce qui marche (preuves solides) :**\n• Exercices quotidiens de la main — EULAR : recommandation forte\n• Orthèse de repos nocturne (rhizarthrose) — Cochrane 2022\n• Chaleur (bains, paraffine) avant les exercices — EULAR 2018\n• Anti-inflammatoires topiques (gel) en première intention — ACR 2019\n\n**Ce qui aide :**\n• Adaptations ergonomiques (gros manches, ouvre-bocaux)\n• Cure thermale (eau chaude + boue)\n\n**Pas de preuve solide :**\n• Compléments alimentaires\n• Compresses magnétiques\n• Injections d'acide hyaluronique dans les doigts", keyMessage: "Exercices + chaleur + orthèse nocturne + gel anti-inflammatoire si besoin.", source: "EULAR 2018, ACR 2019, Cochrane Reviews" },
      action: { title: "Balle molle — 2 séries de 10", description: "Serrez une balle molle 10×, repos 30s, recommencez. Puis pincez la balle entre pouce et chaque doigt, 5× par doigt.", duration: "5 min" },
    },
    {
      day: 6, theme: "Cure thermale et mains", phase: 'comprendre',
      content: { title: "L'eau chaude et la boue pour vos mains", body: "La cure thermale offre des traitements spécifiques pour les mains :\n\n• **Bains locaux** d'eau thermale chaude (mobilisation dans l'eau)\n• **Applications de boue** (cataplasmes chauds — détente profonde)\n• **Douche filiforme** (jet d'eau précis sur les articulations)\n• **Bains de paraffine** (enveloppe de chaleur prolongée)\n\nProfitez de chaque séance pour mobiliser vos doigts dans la chaleur. C'est le moment où les articulations sont les plus souples.\n\nChez vous après la cure : le bain d'eau chaude du matin remplace la boue thermale.", keyMessage: "La cure est le moment idéal pour mobiliser vos mains. Bain chaud quotidien chez vous.", source: "Thermal evidence, EULAR 2018" },
      action: { title: "Exercices en bain thermal", description: "Pendant votre soin de mains : ouvrir/fermer 15×, écarter 15×, pouce-doigts 5×, serrer une éponge 10×. Profitez de la chaleur pour aller plus loin dans les mouvements.", duration: "5 min" },
    },
    {
      day: 7, theme: "Bilan semaine 1", phase: 'comprendre',
      content: { title: "Ce que vous avez appris", body: "Première semaine !\n\n• L'arthrose des mains se gère par l'exercice quotidien\n• Le pouce (rhizarthrose) bénéficie de l'orthèse de nuit\n• La chaleur avant les exercices = mains plus souples\n• La cure thermale est particulièrement efficace pour les mains\n\nSemaine 2 : exercices progressifs et adaptations du quotidien.", keyMessage: "Chaleur + exercices + orthèse = le trio gagnant pour vos mains.", source: "Synthèse EULAR/Cochrane" },
      action: { title: "Exercices bilan — 5 min", description: "Bain chaud 2 min + ouvrir/fermer 10× + balle molle 10× + rotation pouce 5× + pouce-doigts 3×.", duration: "5 min" },
      hasMiniPro: true,
      quiz: [
        { question: "Les nodosités (bosses) signifient-elles plus de douleur ?", options: ["Oui, c'est grave", "Non, pas nécessairement", "Il faut opérer"], correctIndex: 1, explanation: "Les nodosités sont des déformations liées à l'arthrose mais ne sont pas proportionnelles à la douleur." },
        { question: "Quel est le duo gagnant pour le pouce ?", options: ["Médicaments + repos", "Orthèse de nuit + exercices", "Chirurgie + infiltrations"], correctIndex: 1, explanation: "L'orthèse nocturne + les exercices quotidiens sont recommandés par EULAR et validés par Cochrane." },
      ],
    },

    // ========== SEMAINE 2 : AGIR ==========
    {
      day: 8, theme: "Vos exercices essentiels", phase: 'agir',
      content: { title: "5 exercices pour vos mains", body: "**Les 5 exercices quotidiens :**\n• Ouvrir/fermer les doigts — mobilité globale\n• Balle molle — force de serrage\n• Pouce-doigts (pince) — dextérité\n• Écarter les doigts — force d'ouverture\n• Rotation du pouce — mobilité rhizarthrose\n\nFaites-les APRÈS un bain chaud de 3 min. 2-3×/jour, 5 min à chaque fois.", keyMessage: "5 exercices, 5 minutes, 2-3×/jour. Toujours après la chaleur.", source: "EULAR 2018, Cochrane 2021" },
      action: { title: "Circuit complet — 5 min", description: "Bain chaud 3 min puis : ouvrir/fermer 10× + balle molle 10× + pouce-doigts 3 allers-retours + écarter doigts 10× + rotation pouce 5× chaque sens.", duration: "8 min" },
    },
    {
      day: 9, theme: "Renforcer la prise", phase: 'agir',
      content: { title: "Force de serrage et pince fine", body: "La force de prise diminue avec l'arthrose. Deux types à travailler :\n\n**Prise globale (serrage) :** balle molle, éponge, pâte à modeler. Serrez doucement, maintenez 5s. 10×.\n**Prise fine (pince) :** pouce-index sur un petit objet (pièce de monnaie, bouton). Pincez, maintenez 3s. 5× par doigt.\n\nNe forcez JAMAIS. Si c'est douloureux, utilisez un objet plus gros et plus mou.", keyMessage: "Serrage doux + pince fine = les 2 forces essentielles de la main.", source: "Cochrane 2021, EULAR 2018" },
      action: { title: "Renforcement — 5 min", description: "Balle molle : serrage 10× + pince pouce/chaque doigt 5×. Puis pâte à modeler : pétrissez 2 min (renforce tous les muscles de la main simultanément).", duration: "5 min" },
    },
    {
      day: 10, theme: "Assouplir les doigts", phase: 'agir',
      content: { title: "Étirements et mobilisations", body: "**Exercices d'assouplissement :**\n• Main à plat sur la table : appuyez doucement pour étendre les doigts (30s)\n• Pouce étiré vers l'extérieur avec l'autre main (30s)\n• Doigts croisés : retournez les paumes vers l'extérieur et étirez (30s)\n\nFaites ces étirements après les exercices de renforcement.", keyMessage: "Étirer après renforcer. La souplesse des doigts se maintient par la régularité.", source: "EULAR 2018" },
      action: { title: "Routine étirements mains — 3 min", description: "Main à plat 30s × 2 + pouce étiré 30s × 2 + doigts croisés 30s × 2.", duration: "3 min" },
    },
    {
      day: 11, theme: "Adaptations quotidiennes", phase: 'agir',
      content: { title: "Les aides techniques qui changent la vie", body: "**Adaptations essentielles :**\n• Ouvre-bocaux électrique ou à ventouse\n• Ustensiles à gros manches (couverts, stylos, couteaux)\n• Robinets à levier (pas à tourner)\n• Clavier ergonomique (toucher léger)\n• Ciseaux à ressort\n• Fermetures à scratch au lieu de boutons\n\n**Principe de protection articulaire :**\n• Utiliser les plus grandes articulations possibles (ouvrir avec la paume, pas les doigts)\n• Répartir la charge (2 mains plutôt qu'une)\n• Éviter la pince pouce-index prolongée (utiliser toute la main)", keyMessage: "Les aides techniques ne sont pas un signe de faiblesse. C'est de l'intelligence articulaire.", source: "EULAR 2018, OT consensus" },
      action: { title: "Identifier 2 aides utiles", description: "Quels gestes quotidiens vous posent problème ? Identifiez 2 aides techniques à vous procurer (ouvre-bocaux, gros manches).", duration: "5 min" },
    },
    {
      day: 12, theme: "Gérer les poussées", phase: 'agir',
      content: { title: "Quand les doigts gonflent", body: "**Plan d'action poussée :**\n• FROID sur l'articulation gonflée (10 min, linge entre peau et glace)\n• Gel anti-inflammatoire (diclofénac gel — en vente libre)\n• Réduisez les exercices mais faites les mobilisations douces\n• Repos relatif de l'articulation touchée (pas de serrage fort)\n• Reprise progressive en 3-5 jours\n\n**Si une seule articulation est très gonflée, rouge et chaude → consultez** (possible goutte ou arthrite septique, surtout si fièvre).", keyMessage: "Poussée = froid + gel + mobilisation douce. Rouge+chaud+fièvre = consulter.", source: "EULAR 2018, ACR 2019" },
      action: { title: "Écrire votre plan poussée", description: "Notez les étapes sur papier. Gardez un tube de gel anti-inflammatoire accessible.", duration: "5 min" },
    },
    {
      day: 13, theme: "Activités manuelles thérapeutiques", phase: 'agir',
      content: { title: "Le plaisir comme exercice", body: "Certaines activités manuelles sont thérapeutiques :\n\n**Excellentes :**\n• Pâte à modeler / argile (renforce + assouplit)\n• Jardinage léger (mobilise, renforce la prise)\n• Tricot / crochet (dextérité, à adapter si douleur)\n• Cuisine (pétrissage, épluchage = exercice)\n\n**À adapter :**\n• Bricolage (outils à gros manches, pauses fréquentes)\n• Piano / guitare (sessions courtes)\n\nL'activité manuelle plaisante est l'exercice que vous ferez le plus régulièrement.", keyMessage: "Jardinage, cuisine, loisirs manuels = exercice thérapeutique déguisé.", source: "OT evidence" },
      action: { title: "Activité manuelle — 15 min", description: "Choisissez une activité manuelle plaisante : jardinage, cuisine, pâte à modeler, tricot. Faites-la 15 min avec des pauses toutes les 5 min.", duration: "15 min" },
    },
    {
      day: 14, theme: "Bilan semaine 2", phase: 'agir',
      content: { title: "Mi-parcours", body: "Deux semaines !\n\n• 5 exercices de la main maîtrisés\n• Technique de renforcement (serrage + pince)\n• Étirements après les exercices\n• Aides techniques identifiées\n• Plan poussée prêt\n\nComparez : vos mains sont-elles moins raides le matin ? La prise est-elle un peu plus forte ?", keyMessage: "Mi-parcours. Chaque petit gain de mobilité compte.", source: "Synthèse" },
      action: { title: "Circuit complet — 8 min", description: "Bain chaud 3 min + 5 exercices + 3 étirements. Chronométrez.", duration: "8 min" },
      hasMiniPro: true,
      quiz: [
        { question: "Combien de fois par jour faire les exercices de la main ?", options: ["1 fois, 20 minutes", "2-3 fois, 5 minutes chaque", "1 fois par semaine"], correctIndex: 1, explanation: "Court et fréquent : 5 min × 2-3 par jour est plus efficace que 20 min × 1 fois." },
      ],
    },

    // ========== SEMAINE 3 : CONSOLIDER ==========
    {
      day: 15, theme: "Plan post-cure", phase: 'consolider',
      content: { title: "Votre routine mains quotidienne", body: "**Post-cure :**\n• Bain chaud + exercices : 2-3×/jour, 5 min\n• Orthèse de nuit si rhizarthrose\n• Gel anti-inflammatoire si poussée\n• Aides techniques en place\n• Activité manuelle plaisante 1×/jour", keyMessage: "5 min × 2-3/jour après un bain chaud. L'orthèse de nuit si le pouce est touché.", source: "EULAR 2018" },
      action: { title: "3 objectifs", description: "Ex : « Exercices mains 2×/jour », « Orthèse de nuit », « Ouvre-bocaux acheté ».", duration: "5 min" },
    },
    {
      day: 16, theme: "Ergonomie", phase: 'consolider',
      content: { title: "Protéger vos mains au quotidien", body: "**Principes :**\n• Ouvrir avec la paume (pas les doigts)\n• 2 mains plutôt qu'une\n• Gros manches partout (stylos, couverts, outils)\n• Pauses toutes les 15 min pour les tâches répétitives\n• Pas de serrage prolongé (alterner prise et relâchement)", keyMessage: "Grandes surfaces, 2 mains, gros manches, pauses fréquentes.", source: "EULAR 2018, OT" },
      action: { title: "1 adaptation", description: "Mettez en place 1 changement ergonomique chez vous.", duration: "5 min" },
    },
    {
      day: 17, theme: "Activité physique globale", phase: 'consolider',
      content: { title: "Bouger tout le corps aide vos mains", body: "L'exercice général (marche, natation, vélo) réduit l'inflammation systémique et améliore la circulation dans les mains.\n\n**Recommandations :**\n• Marche 30 min/jour\n• Natation / aquagym (excellent — les mains travaillent dans l'eau chaude)\n• Yoga (mobilise les poignets et les doigts)\n\nL'arthrose digitale est souvent associée à d'autres arthroses. Bouger tout le corps protège toutes les articulations.", keyMessage: "L'exercice général réduit l'inflammation et aide toutes vos articulations.", source: "EULAR 2018" },
      action: { title: "Marche + exercices mains", description: "Marche 15 min puis bain chaud + exercices mains. Doublez les bénéfices.", duration: "25 min" },
    },
    {
      day: 18, theme: "Nutrition", phase: 'consolider',
      content: { title: "Manger pour vos articulations", body: "**Ce qui aide :** méditerranéen, oméga-3, hydratation.\n**Pas de preuve :** glucosamine, collagène, curcuma.\n**Gel topique :** le diclofénac gel est plus efficace que les comprimés pour les petites articulations (moins d'effets secondaires).", keyMessage: "Gel anti-inflammatoire topique > comprimés pour les mains.", source: "ACR 2019" },
      action: { title: "1 changement", description: "Poisson 2×/semaine, légumes à chaque repas, huile d'olive.", duration: "5 min" },
    },
    {
      day: 19, theme: "Gestion du stress", phase: 'consolider',
      content: { title: "Le stress raidit les mains", body: "Le stress provoque une contraction des muscles de l'avant-bras qui tire sur les doigts. Résultat : plus de raideur et de douleur.\n\nCohérence cardiaque 5 min, 3×/jour. Auto-massage des mains : frottez chaque doigt entre le pouce et l'index de l'autre main, 30s par doigt.", keyMessage: "Le stress raidit vos mains. Auto-massage + cohérence cardiaque = détente.", source: "Stress-pain consensus" },
      action: { title: "Auto-massage des mains — 5 min", description: "Frottez chaque doigt 30s. Pétrissez la paume avec le pouce de l'autre main 1 min par main. Terminez par 2 min de cohérence cardiaque.", duration: "5 min" },
    },
    {
      day: 20, theme: "Signaux d'alerte", phase: 'consolider',
      content: { title: "Quand consulter ?", body: "**Normal :**\n• Nodosités indolores\n• Raideur matinale < 30 min\n• Craquements sans douleur\n\n**Consultez :**\n• Articulation rouge, chaude, très gonflée (goutte ? arthrite septique ?)\n• Raideur matinale > 1h avec atteinte symétrique (polyarthrite rhumatoïde ?)\n• Perte de force brutale\n• Déformation rapide inhabituelle", keyMessage: "Rouge+chaud+gonflé = consulter. Raideur > 1h symétrique = consulter.", source: "EULAR 2018" },
      action: { title: "Préparer sa trousse", description: "Plan poussée + 3 objectifs + numéro médecin.", duration: "5 min" },
    },
    {
      day: 21, theme: "Bilan final", phase: 'consolider',
      content: { title: "21 jours — bravo !", body: "Vous avez terminé votre parcours.\n\n**Ce que vous emportez :**\n• 5 exercices quotidiens pour vos mains\n• La chaleur comme alliée (bain chaud avant chaque séance)\n• Des aides techniques pour protéger vos articulations\n• L'orthèse de nuit si rhizarthrose\n\nVos mains vous ont servi toute votre vie. Elles peuvent continuer longtemps avec les bons gestes.\n\nRemplissez le questionnaire final.", keyMessage: "Bain chaud + exercices 2-3×/jour = des mains qui restent actives longtemps.", source: "EULAR 2018, ACR 2019" },
      action: { title: "Remplir le bilan final", description: "Questionnaire de fin de cure.", duration: "3 min" },
    },
  ],
};
