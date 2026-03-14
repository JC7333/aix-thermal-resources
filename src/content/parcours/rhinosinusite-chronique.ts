import type { ParcoursContent } from "./types";

export const rhinosinusiteParcours: ParcoursContent = {
  slug: "rhinosinusite-chronique",
  title: "Rhinosinusite chronique",
  subtitle: "Dégager, traiter, prévenir",
  description: "21 jours pour respirer par le nez à nouveau.",
  icon: "👃",
  proInstrument: "koos-ps",
  proIntro:
    "Quel degré de difficulté avez-vous pour les activités suivantes, à cause de vos problèmes de nez/sinus ?",
  days: [
    // ========== SEMAINE 1 : COMPRENDRE ==========
    {
      day: 1,
      theme: "Comprendre vos sinus",
      phase: "comprendre",
      content: {
        title: "La rhinosinusite chronique : plus de 12 semaines",
        body: "La rhinosinusite chronique (RSC) est une inflammation des sinus qui dure plus de 12 semaines. Elle touche 10-15% de la population.\n\n**Symptômes principaux :**\n• Nez bouché (obstruction nasale)\n• Écoulement nasal (devant ou dans la gorge = post-nasal drip)\n• Douleur/pression au niveau du visage\n• Diminution ou perte de l'odorat\n\n**Deux formes :**\n• SANS polypes (la plus fréquente) — souvent liée à l'allergie ou l'infection\n• AVEC polypes (polypose nasosinusienne) — inflammation plus intense, perte d'odorat fréquente\n\nLe traitement repose sur le **lavage nasal quotidien** + les **corticoïdes nasaux en spray**. Ces 2 gestes sont le socle, simples et efficaces.",
        keyMessage:
          "Lavage nasal + corticoïde nasal = le socle du traitement. Chaque jour, sans exception.",
        source: "EPOS 2020, HAS Rhinosinusite",
      },
      action: {
        title: "Lavage nasal — 1 fois",
        description:
          "Avec un spray de sérum physiologique ou un dispositif d'irrigation (Rhinohorn, NeilMed) : penchez la tête sur le côté, injectez dans la narine supérieure, le liquide sort par l'autre narine. Mouchez doucement après.",
        duration: "3 min",
      },
    },
    {
      day: 2,
      theme: "Le lavage nasal : votre geste n°1",
      phase: "comprendre",
      content: {
        title: "Pourquoi laver son nez change tout",
        body: "Le lavage nasal est le traitement le plus efficace et le plus sous-utilisé. La Cochrane confirme son bénéfice.\n\n**Comment ça aide :**\n• Élimine le mucus épais et les croûtes\n• Rince les allergènes et les polluants\n• Réduit l'inflammation de la muqueuse\n• Améliore la pénétration des sprays corticoïdes\n\n**Technique au grand volume (la plus efficace) :**\n• Utilisez une solution saline isotonique (9g sel / litre d'eau, ou sachets tout prêts)\n• 120-240 ml par narine\n• 1-2×/jour\n• TOUJOURS AVANT le spray corticoïde\n\n**L'eau thermale** est un lavage nasal naturel — profitez des soins ORL de la cure.",
        keyMessage:
          "Lavage au grand volume > petit spray. 1-2×/jour, toujours AVANT le corticoïde.",
        source: "Cochrane Nasal Irrigation, EPOS 2020",
      },
      action: {
        title: "Lavage grand volume",
        description:
          "Si vous avez un dispositif d'irrigation (Rhinohorn, NeilMed), utilisez-le : 120 ml par narine. Sinon, utilisez un spray de sérum physiologique (plusieurs pressions). Puis attendez 5 min et appliquez votre spray corticoïde.",
        duration: "5 min",
      },
    },
    {
      day: 3,
      theme: "Le spray corticoïde nasal",
      phase: "comprendre",
      content: {
        title: "Votre anti-inflammatoire local",
        body: "Le corticoïde nasal en spray (fluticasone, mométasone, budésonide) est le traitement de fond de la RSC.\n\n**Règles d'utilisation :**\n• APRÈS le lavage nasal (sinon le mucus bloque le spray)\n• Dirigez le spray vers l'extérieur du nez (pas vers la cloison !)\n• 1-2 sprays par narine, 1-2×/jour (selon prescription)\n• Continuez même quand ça va — c'est un traitement de fond\n• Pas d'effet secondaire significatif aux doses nasales\n\n**Erreurs fréquentes :**\n• Spray sur la cloison → saignement\n• Arrêt quand ça va → rechute en 2-4 semaines\n• Utilisation sans lavage préalable → inefficace",
        keyMessage:
          "Spray vers l'extérieur, après le lavage, sans jamais arrêter sans avis médical.",
        source: "EPOS 2020",
      },
      action: {
        title: "Vérifier votre technique de spray",
        description:
          "Demandez à votre médecin ou pharmacien de vérifier votre technique. 2 erreurs classiques : direction du spray et absence de lavage avant.",
        duration: "3 min",
      },
    },
    {
      day: 4,
      theme: "Allergie et rhinosinusite",
      phase: "comprendre",
      content: {
        title: "L'allergie comme facteur déclenchant",
        body: "L'allergie est un facteur fréquent de RSC, surtout pour la forme sans polypes.\n\n**Actions :**\n• Tests allergiques si pas faits (prick-tests chez l'allergologue)\n• Éviction ciblée (acariens, pollens, moisissures)\n• Antihistaminique si rhinite allergique associée\n• Désensibilisation si allergie documentée et invalidante\n\n**Mesures anti-acariens :** housses anti-acariens, lavage draps 60°C, pas de moquette chambre, aérer 10 min/jour.\n\nTraiter l'allergie améliore la rhinosinusite.",
        keyMessage:
          "Allergie traitée = sinus plus calmes. Faites vos tests si pas encore faits.",
        source: "EPOS 2020, ARIA",
      },
      action: {
        title: "Bilan allergique",
        description:
          "Avez-vous fait des prick-tests ? Si non, notez-le pour votre médecin. Si oui, relisez vos résultats et vérifiez les mesures d'éviction.",
        duration: "5 min",
      },
    },
    {
      day: 5,
      theme: "Traitements complets",
      phase: "comprendre",
      content: {
        title: "Ce qui marche pour vos sinus",
        body: "**Prouvé (EPOS 2020) :**\n• Lavage nasal quotidien au sérum physiologique — recommandation forte\n• Corticoïde nasal en spray — recommandation forte\n• Arrêt du tabac — amélioration significative\n\n**Aide modérée :**\n• Cure thermale ORL (inhalations, aérosols, douche nasale)\n• Antihistaminique si composante allergique\n\n**Pas de preuve / inutile :**\n• Antibiotiques au long cours (sauf cas très spécifiques)\n• Décongestionnants nasaux > 5 jours (risque de rhinite médicamenteuse !)\n• Huiles essentielles dans le nez (irritant)\n\n**Si échec après 3-6 mois :** scanner des sinus + avis ORL. Chirurgie endoscopique si polypes obstructifs.",
        keyMessage:
          "Lavage + spray corticoïde = 80% du traitement. Pas de décongestionnant > 5 jours.",
        source: "EPOS 2020, HAS",
      },
      action: {
        title: "Marche + respiration nasale — 10 min",
        description:
          "Marchez 10 min en respirant par le nez uniquement. Le nez filtre, réchauffe et humidifie l'air. Si impossible, notez le côté bouché.",
        duration: "10 min",
      },
    },
    {
      day: 6,
      theme: "Cure thermale et sinus",
      phase: "comprendre",
      content: {
        title: "Les soins thermaux ORL",
        body: "La cure thermale ORL est particulièrement adaptée à la RSC :\n\n• **Douche nasale thermale** : jet d'eau thermale dans les narines → lavage en profondeur\n• **Aérosol sonique** : microparticules d'eau thermale jusqu'aux sinus\n• **Inhalation humide** : vapeur d'eau thermale → humidifie toute la muqueuse\n• **Humage** : vapeur au plus près des narines\n• **Gargarisme** si post-nasal drip\n\nL'eau thermale a des propriétés anti-inflammatoires et cicatrisantes prouvées pour la muqueuse nasale.\n\nProfitez de la cure pour apprendre le lavage au grand volume — c'est le geste que vous ferez chez vous.",
        keyMessage:
          "La cure thermale ORL = lavage professionnel + apprentissage du geste quotidien.",
        source: "Thermal ORL evidence",
      },
      action: {
        title: "Pendant votre soin ORL",
        description:
          "Concentrez-vous sur la sensation : l'eau thermale pénètre et nettoie les sinus en profondeur. Mouchez-vous doucement après chaque soin. Le soir, refaites un lavage à la maison.",
        duration: "5 min",
      },
    },
    {
      day: 7,
      theme: "Bilan semaine 1",
      phase: "comprendre",
      content: {
        title: "Ce que vous avez appris",
        body: "Semaine 1 !\n\n• RSC = inflammation > 12 semaines\n• Lavage nasal quotidien = geste n°1\n• Spray corticoïde APRÈS lavage, vers l'extérieur\n• Allergie à investiguer et traiter\n• Pas de décongestionnant > 5 jours\n• La cure thermale = lavage professionnel\n\nSemaine 2 : habitudes quotidiennes et gestion.",
        keyMessage:
          "Lavez votre nez chaque jour. C'est simple, gratuit, et plus efficace que la plupart des médicaments.",
        source: "Synthèse EPOS/Cochrane",
      },
      action: {
        title: "Lavage + spray + marche",
        description:
          "Lavage grand volume + spray corticoïde (5 min après) + marche 10 min respiration nasale.",
        duration: "15 min",
      },
      hasMiniPro: true,
      quiz: [
        {
          question: "Quand appliquer le spray corticoïde ?",
          options: [
            "Avant le lavage",
            "Après le lavage (5 min)",
            "Seulement si douleur",
          ],
          correctIndex: 1,
          explanation:
            "Toujours APRÈS le lavage. Le mucus empêche le spray d'atteindre la muqueuse.",
        },
        {
          question: "Peut-on utiliser un décongestionnant nasal longtemps ?",
          options: [
            "Oui, c'est un traitement de fond",
            "Non, max 5 jours",
            "Seulement la nuit",
          ],
          correctIndex: 1,
          explanation:
            "Les décongestionnants > 5 jours provoquent une rhinite médicamenteuse (nez encore plus bouché).",
        },
        {
          question:
            "Quel est le traitement de base recommandé pour la rhinosinusite chronique ?",
          options: [
            "Les antibiotiques au long cours",
            "Les décongestionnants quotidiens",
            "Le lavage nasal quotidien au sérum physiologique",
          ],
          correctIndex: 2,
          explanation:
            "Le lavage nasal quotidien est le traitement de base validé par EPOS 2020 et la Cochrane.",
        },
      ],
    },

    // ========== SEMAINE 2 : AGIR ==========
    {
      day: 8,
      theme: "Routine quotidienne",
      phase: "agir",
      content: {
        title: "Votre rituel nez, matin et soir",
        body: "**Matin :**\n1. Lavage nasal grand volume\n2. Attendre 5 min\n3. Spray corticoïde\n4. Moucher doucement\n\n**Soir :**\n1. Lavage nasal\n2. Moucher\n3. Spray corticoïde si prescrit 2×/jour\n\n**Pendant la journée :**\n• Spray sérum physiologique si nez sec\n• Hydratation ++\n• Respiration nasale consciente",
        keyMessage:
          "Matin et soir : lavage → 5 min → spray. Routine non négociable.",
        source: "EPOS 2020",
      },
      action: {
        title: "Installer la routine",
        description:
          "Posez votre matériel de lavage et votre spray dans la salle de bain, visibles. Ce soir, faites le rituel complet.",
        duration: "5 min",
      },
    },
    {
      day: 9,
      theme: "Environnement",
      phase: "agir",
      content: {
        title: "L'air que vous respirez",
        body: "**Chez vous :**\n• Aérer 10 min/jour (même en hiver)\n• Humidité 40-60% (humidificateur si air trop sec)\n• Pas de tabac (actif ou passif)\n• Pas de bougies, encens, diffuseur d'huiles essentielles\n• Aspirateur HEPA si allergie acariens\n\n**Au travail :**\n• Climatisation = air très sec → spray sérum physiologique régulier\n• Poussière → masque si exposition professionnelle\n\n**Dehors :**\n• Pollution → éviter les efforts intenses en pic de pollution\n• Pollen → lavage nasal au retour de l'extérieur",
        keyMessage:
          "Aérer, humidifier, ne pas fumer, ne pas irriter. Votre nez est une muqueuse fragile.",
        source: "EPOS 2020",
      },
      action: {
        title: "1 changement environnement",
        description:
          "Identifiez 1 irritant à éliminer (bougies, encens, tabac passif) ou 1 amélioration (humidificateur, aération).",
        duration: "5 min",
      },
    },
    {
      day: 10,
      theme: "Odorat et qualité de vie",
      phase: "agir",
      content: {
        title: "Quand on perd l'odorat",
        body: "La perte d'odorat (anosmie) ou sa diminution (hyposmie) touche surtout les formes avec polypes. C'est un symptôme très invalidant.\n\n**Ce qui aide :**\n• Traitement de fond (lavage + corticoïde) — peut récupérer partiellement l'odorat\n• Entraînement olfactif : sentir 4 odeurs différentes 2×/jour pendant 12 semaines (rose, citron, eucalyptus, clou de girofle)\n• Corticoïdes oraux en cure courte (sur prescription) si perte récente\n\nL'entraînement olfactif a des preuves solides : il stimule la régénération des neurones olfactifs.",
        keyMessage:
          "L'entraînement olfactif (4 odeurs, 2×/jour, 12 semaines) peut restaurer l'odorat.",
        source: "EPOS 2020, Olfactory training evidence",
      },
      action: {
        title: "Entraînement olfactif",
        description:
          "Sentez 4 odeurs différentes (café, citron, menthe, épice) pendant 15s chacune. Concentrez-vous sur le souvenir de chaque odeur. 2×/jour.",
        duration: "3 min",
      },
    },
    {
      day: 11,
      theme: "Maux de tête et sinus",
      phase: "agir",
      content: {
        title: "Céphalées sinusiennes vs migraine",
        body: "Beaucoup de « maux de tête des sinus » sont en réalité des migraines. La vraie céphalée sinusienne est accompagnée d'obstruction nasale et d'écoulement purulent.\n\n**Si douleur faciale :**\n• Avec nez bouché + écoulement → probablement sinusien → lavage + traitement de fond\n• Sans symptômes nasaux → probablement migraine → consultez\n\n**Soulagement :**\n• Lavage nasal (désencombre et soulage la pression)\n• Chaleur locale (compresse chaude sur le front/joues)\n• Vapeur (inhalation au-dessus d'un bol d'eau chaude — sans huile essentielle)",
        keyMessage:
          "Douleur faciale + nez bouché = sinus. Douleur faciale seule = probablement migraine.",
        source: "EPOS 2020",
      },
      action: {
        title: "Inhalation vapeur — 5 min",
        description:
          "Bol d'eau chaude, serviette sur la tête, respirez la vapeur 5 min. Cela humidifie et désencombre. PAS d'huile essentielle (irritant pour la muqueuse).",
        duration: "5 min",
      },
    },
    {
      day: 12,
      theme: "Gérer les poussées",
      phase: "agir",
      content: {
        title: "Quand les sinus s'enflamment plus",
        body: "**Plan d'action poussée :**\n• Augmenter les lavages (3-4×/jour)\n• Continuer le spray corticoïde\n• Inhalation vapeur 2×/jour\n• Paracétamol si douleur\n• Hydratation ++\n\n**Consultez si :**\n• Douleur intense unilatérale + fièvre (sinusite bactérienne)\n• Gonflement de la joue ou du contour de l'oeil\n• Écoulement purulent d'un seul côté\n• Symptômes > 10 jours sans amélioration",
        keyMessage:
          "Poussée = plus de lavages + vapeur. Fièvre + douleur unilatérale = consulter.",
        source: "EPOS 2020, HAS",
      },
      action: {
        title: "Plan poussée",
        description: "Notez les étapes + les signaux de consultation.",
        duration: "5 min",
      },
    },
    {
      day: 13,
      theme: "Tabac et sinus",
      phase: "agir",
      content: {
        title: "Le tabac détruit votre muqueuse nasale",
        body: "Le tabac est un des pires agresseurs de la muqueuse nasale :\n• Paralyse les cils (qui nettoient le nez)\n• Augmente l'inflammation\n• Favorise les infections\n• Réduit l'efficacité des traitements\n\nL'arrêt du tabac améliore significativement les symptômes de RSC en quelques semaines.\n\nTabac Info Service : 3989 (gratuit).",
        keyMessage:
          "Le tabac paralyse les cils qui nettoient votre nez. L'arrêt améliore tout.",
        source: "EPOS 2020",
      },
      action: {
        title: "Bilan tabac",
        description:
          "Si fumeur : notez les ressources (3989, substituts, varénicline). Si non-fumeur : vérifiez le tabagisme passif autour de vous.",
        duration: "5 min",
      },
    },
    {
      day: 14,
      theme: "Bilan semaine 2",
      phase: "agir",
      content: {
        title: "Mi-parcours",
        body: "Deux semaines !\n\n• Routine matin/soir installée\n• Environnement optimisé\n• Entraînement olfactif commencé\n• Plan poussée prêt\n\nRespirez-vous mieux par le nez ? L'odorat revient-il un peu ?",
        keyMessage:
          "Mi-parcours. La régularité du lavage est votre meilleure arme.",
        source: "Synthèse",
      },
      action: {
        title: "Routine complète + marche",
        description:
          "Lavage + spray + marche 15 min respiration nasale + entraînement olfactif.",
        duration: "20 min",
      },
      hasMiniPro: true,
      quiz: [
        {
          question: "Combien de temps pour l'entraînement olfactif ?",
          options: [
            "1 semaine",
            "12 semaines, 2×/jour",
            "Inutile, l'odorat ne revient pas",
          ],
          correctIndex: 1,
          explanation:
            "L'entraînement olfactif (4 odeurs, 2×/jour, 12 semaines) stimule la régénération des neurones olfactifs.",
        },
        {
          question:
            "Le tabac a-t-il un impact sur la rhinosinusite chronique ?",
          options: [
            "Oui, il paralyse les cils et aggrave directement la RSC",
            "Non, ce sont deux problèmes indépendants",
            "Seulement chez les gros fumeurs",
          ],
          correctIndex: 0,
          explanation:
            "Le tabac paralyse les cils de la muqueuse nasale qui nettoient et protègent les sinus.",
        },
        {
          question: "Quel signe d'alerte nécessite une consultation urgente ?",
          options: [
            "Une légère douleur faciale",
            "Un écoulement nasal clair",
            "Un gonflement autour de l'oeil",
          ],
          correctIndex: 2,
          explanation:
            "Un gonflement péri-orbitaire est une complication orbitaire urgente nécessitant une consultation immédiate.",
        },
      ],
    },

    // ========== SEMAINE 3 : CONSOLIDER ==========
    {
      day: 15,
      theme: "Plan post-cure",
      phase: "consolider",
      content: {
        title: "Votre routine durable",
        body: "**Quotidien :**\n• Lavage nasal matin + soir\n• Spray corticoïde après chaque lavage\n• Entraînement olfactif 2×/jour (12 semaines)\n• Hydratation 1,5L/jour\n\n**Hebdomadaire :**\n• Vérifier l'humidité (40-60%)\n• Aérer quotidiennement",
        keyMessage:
          "Lavage + spray = votre routine à vie. Comme se brosser les dents.",
        source: "EPOS 2020",
      },
      action: {
        title: "3 objectifs",
        description:
          "Ex : « Lavage 2×/jour », « Entraînement olfactif 12 semaines », « RDV ORL dans 3 mois ».",
        duration: "5 min",
      },
    },
    {
      day: 16,
      theme: "Voyage et sinus",
      phase: "consolider",
      content: {
        title: "L'avion et les sinus",
        body: "Les changements de pression (avion, plongée) sont douloureux si les sinus sont bouchés.\n\n**Avant le vol :**\n• Lavage nasal 30 min avant\n• Spray décongestionnant (exceptionnel, 1 dose) 15 min avant\n• Chewing-gum ou déglutition fréquente\n\n**Plongée sous-marine :** contre-indiquée si obstruction nasale active.",
        keyMessage:
          "Avion = lavage + décongestionnant avant. Plongée = déconseillée si nez bouché.",
        source: "EPOS 2020",
      },
      action: {
        title: "Prévoir un kit voyage",
        description:
          "Préparez : spray sérum physiologique, spray corticoïde, sachets de lavage, mouchoirs.",
        duration: "5 min",
      },
    },
    {
      day: 17,
      theme: "Activité physique",
      phase: "consolider",
      content: {
        title: "Le sport ouvre le nez",
        body: "L'exercice physique provoque une vasoconstriction nasale naturelle — votre nez se dégage pendant et après l'effort.\n\n**Excellents :** marche, vélo, natation (si pas d'allergie au chlore), yoga.\n**Attention :** piscine chlorée peut irriter → lavage nasal après. Sports d'hiver : air très froid et sec → protégez votre nez (buff/écharpe).",
        keyMessage:
          "L'exercice dégage le nez naturellement. Lavage nasal après la piscine.",
        source: "EPOS 2020",
      },
      action: {
        title: "Exercice + observation",
        description:
          "Faites 15 min d'exercice et observez : votre nez se dégage-t-il ?",
        duration: "15 min",
      },
    },
    {
      day: 18,
      theme: "Alimentation",
      phase: "consolider",
      content: {
        title: "Manger pour vos sinus",
        body: "**Preuves limitées mais logiques :**\n• Hydratation ++ (fluidifie le mucus)\n• Alimentation anti-inflammatoire (méditerranéen, oméga-3)\n• Épices (piment, gingembre) → dégagent temporairement le nez\n\n**Attention :** si polypose + asthme → éviter aspirine et AINS (syndrome de Widal = triade aspirine-polypose-asthme). Signalez-le à votre médecin.",
        keyMessage:
          "Hydratation avant tout. Si polypes + asthme, évitez l'aspirine.",
        source: "EPOS 2020",
      },
      action: {
        title: "Boire 1,5L/jour",
        description: "Comptez vos verres aujourd'hui. Objectif : 1,5L minimum.",
        duration: "5 min",
      },
    },
    {
      day: 19,
      theme: "Psychologie et RSC",
      phase: "consolider",
      content: {
        title: "L'impact sur la qualité de vie",
        body: "La RSC a un impact comparable à l'asthme ou le diabète sur la qualité de vie. L'obstruction nasale, la perte d'odorat, les troubles du sommeil et la fatigue affectent l'humeur.\n\nSi vous vous sentez déprimé(e) ou très fatigué(e), parlez-en à votre médecin. Ce n'est pas « juste un nez bouché ».\n\nL'amélioration des symptômes avec le traitement améliore aussi le moral. La régularité du traitement est votre meilleur antidépresseur.",
        keyMessage:
          "La RSC affecte le moral autant qu'une maladie chronique. Traiter le nez aide la tête.",
        source: "EPOS 2020, QoL studies",
      },
      action: {
        title: "Parler à quelqu'un",
        description:
          "Parlez de vos symptômes à un proche ou à votre médecin. Ne minimisez pas l'impact.",
        duration: "5 min",
      },
    },
    {
      day: 20,
      theme: "Signaux d'alerte",
      phase: "consolider",
      content: {
        title: "Quand consulter",
        body: "**Urgence :**\n• Gonflement rapide autour d'un œil (complication orbitaire)\n• Fièvre élevée + douleur intense unilatérale\n• Troubles de la vision\n\n**Consultez ORL si :**\n• Aucune amélioration après 3 mois de traitement bien conduit\n• Perte d'odorat persistante\n• Obstruction nasale unilatérale permanente (exclure polype ou tumeur)\n• Saignements de nez répétés\n\n**Scanner des sinus** recommandé si chirurgie envisagée ou si diagnostic incertain.",
        keyMessage:
          "Gonflement autour de l'œil = urgence. Obstruction unilatérale permanente = ORL.",
        source: "EPOS 2020",
      },
      action: {
        title: "Préparer sa trousse",
        description: "Plan poussée + numéro ORL + numéro médecin.",
        duration: "5 min",
      },
    },
    {
      day: 21,
      theme: "Bilan final",
      phase: "consolider",
      content: {
        title: "21 jours — bravo !",
        body: "Vous avez terminé.\n\n**Ce que vous emportez :**\n• Le lavage nasal comme réflexe quotidien\n• Le spray corticoïde bien utilisé\n• L'entraînement olfactif à continuer 12 semaines\n• Un environnement optimisé\n\nVotre nez est la porte d'entrée de l'air. Prenez-en soin chaque jour.\n\nRemplissez le questionnaire final.",
        keyMessage:
          "Lavage + spray = votre routine à vie. Vos sinus vous remercieront.",
        source: "EPOS 2020",
      },
      action: {
        title: "Remplir le bilan final",
        description: "Questionnaire de fin de cure.",
        duration: "3 min",
      },
    },
  ],
};
