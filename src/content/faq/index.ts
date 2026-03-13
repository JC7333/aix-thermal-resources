export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_BY_PATHOLOGY: Record<string, FaqItem[]> = {
  'gonarthrose': [
    { question: "L'exercice peut-il aggraver mon arthrose du genou ?", answer: "Non, l'exercice adapté protège le cartilage. L'OARSI 2019 et NICE NG226 placent l'exercice comme traitement de première intention, avant les médicaments." },
    { question: "La cure thermale est-elle efficace pour l'arthrose du genou ?", answer: "Oui, plusieurs essais cliniques montrent une réduction de la douleur et une amélioration de la mobilité, persistant 3 à 6 mois (Cochrane, Françon & Forestier 2009)." },
    { question: "Combien de temps dure une cure thermale pour l'arthrose ?", answer: "Une cure conventionnée dure 21 jours (18 jours de soins). Prescrite par votre médecin, elle est remboursée à 65% par l'Assurance Maladie." },
    { question: "Faut-il perdre du poids pour soulager ses genoux ?", answer: "Chaque kilo perdu réduit la charge sur le genou de 4 kg. Une perte de 5 kg améliore significativement la douleur (OARSI 2019)." },
    { question: "Quels exercices faire pour l'arthrose du genou ?", answer: "Renforcement du quadriceps, pont fessier, marche quotidienne, vélo stationnaire et étirements. 3 à 5 séances de 20-30 min/semaine (NICE NG226)." },
  ],
  'lombalgie-chronique': [
    { question: "Le repos est-il bon pour le mal de dos ?", answer: "Non, le repos prolongé aggrave la lombalgie chronique. L'OMS 2023 recommande de maintenir les activités normales et d'éviter le repos au lit." },
    { question: "La cure thermale aide-t-elle contre le mal de dos ?", answer: "Oui, les essais contrôlés montrent que la balnéothérapie réduit la douleur avec des effets persistant 3 à 6 mois (Cochrane)." },
    { question: "Faut-il faire une IRM pour le mal de dos ?", answer: "Dans la majorité des cas, non. L'imagerie n'est recommandée que si le médecin suspecte une cause spécifique (HAS 2019)." },
    { question: "Quel sport pratiquer avec une lombalgie chronique ?", answer: "Marche, natation et vélo sont recommandés. Régularité : 30 min/jour, 5 jours/semaine (NICE NG59)." },
    { question: "Le stress peut-il provoquer des douleurs de dos ?", answer: "Oui, le stress augmente la tension musculaire et amplifie la douleur. La relaxation et la cohérence cardiaque sont des compléments utiles (OMS 2023)." },
  ],
  'coxarthrose': [
    { question: "Peut-on retarder une prothèse de hanche avec l'exercice ?", answer: "Oui, l'exercice adapté améliore la douleur et la fonction, et peut retarder la nécessité d'une prothèse (NICE NG226, OARSI 2019)." },
    { question: "La cure thermale est-elle efficace pour la hanche ?", answer: "Oui, les essais cliniques montrent que la balnéothérapie réduit la douleur et améliore la mobilité (Cochrane, Françon & Forestier 2009)." },
    { question: "Quand envisager une prothèse de hanche ?", answer: "Quand la douleur impacte significativement la qualité de vie malgré les traitements conservateurs. La décision se prend avec votre chirurgien (NICE NG226)." },
    { question: "Quels exercices pour l'arthrose de la hanche ?", answer: "Renforcement des fessiers, étirements de hanche, marche, vélo et piscine. Progression douce (NICE NG226)." },
    { question: "L'arthrose de la hanche est-elle héréditaire ?", answer: "Il existe une composante génétique, mais le poids, l'activité et les traumatismes jouent un rôle majeur. L'exercice régulier est protecteur (OARSI 2019)." },
  ],
  'fibromyalgie': [
    { question: "La fibromyalgie est-elle une vraie maladie ?", answer: "Oui, c'est un dérèglement du système nerveux central reconnu par l'OMS. Les analyses normales ne signifient pas que la douleur n'existe pas (EULAR 2017)." },
    { question: "La cure thermale aide-t-elle contre la fibromyalgie ?", answer: "Oui, l'étude Thermalgi (2021) montre une amélioration durable de la qualité de vie jusqu'à 12 mois." },
    { question: "Quel exercice faire avec une fibromyalgie ?", answer: "Exercice aérobie doux (marche, piscine, vélo). Commencer à 50% de sa capacité, augmenter de 10%/semaine maximum (EULAR 2017)." },
    { question: "Qu'est-ce que le pacing ?", answer: "Faire la même quantité d'activité les bons et les mauvais jours. Cela évite le cycle excès/crash qui aggrave les symptômes." },
    { question: "Le sommeil influence-t-il la fibromyalgie ?", answer: "Oui, le sommeil non réparateur est un symptôme central. Améliorer l'hygiène du sommeil est un pilier du traitement (EULAR 2017)." },
  ],
  'bpco': [
    { question: "Peut-on faire du sport avec une BPCO ?", answer: "Oui, l'activité physique est le traitement non médicamenteux le plus efficace. La réhabilitation respiratoire améliore la qualité de vie (GOLD 2024)." },
    { question: "La cure thermale est-elle utile pour la BPCO ?", answer: "Oui, la cure voies respiratoires offre soins respiratoires et activité physique encadrée dans un environnement contrôlé (HAS 2019)." },
    { question: "Comment mieux respirer avec une BPCO ?", answer: "La respiration à lèvres pincées réduit l'essoufflement. Inspirer par le nez, expirer lentement bouche serrée, 5 min 3 fois/jour (GOLD 2024)." },
    { question: "L'essoufflement à l'effort est-il dangereux ?", answer: "Un essoufflement modéré pendant l'exercice est attendu. Arrêtez si vous ne pouvez plus parler. Consultez si ça s'aggrave au repos." },
    { question: "La BPCO peut-elle s'améliorer ?", answer: "La BPCO est chronique mais les symptômes s'améliorent significativement avec l'arrêt du tabac, l'exercice et le traitement adapté (GOLD 2024)." },
  ],
  'insuffisance-veineuse': [
    { question: "Les bas de compression sont-ils vraiment utiles ?", answer: "Oui, la compression est le traitement de base de l'insuffisance veineuse. Elle réduit l'œdème, la lourdeur et prévient les complications (ESVS 2022)." },
    { question: "Quel sport pratiquer avec des jambes lourdes ?", answer: "Marche, natation, vélo et aquagym sont idéaux. Éviter les sports avec piétinement prolongé. La surélévation des jambes après l'effort aide (ESVS 2022)." },
    { question: "La chaleur aggrave-t-elle les problèmes veineux ?", answer: "Oui, la chaleur dilate les veines et aggrave les symptômes. Éviter les bains chauds prolongés, le chauffage par le sol et l'exposition solaire des jambes." },
    { question: "La cure thermale aide-t-elle les problèmes veineux ?", answer: "Oui, les soins de crénothérapie (bains, douches, marche en piscine) améliorent le retour veineux et réduisent les symptômes (Cochrane)." },
    { question: "Faut-il opérer les varices ?", answer: "Pas toujours. Les mesures conservatrices (compression, exercice, surélévation) suffisent souvent. La chirurgie est réservée aux cas symptomatiques résistants (ESVS 2022)." },
  ],
  'asthme': [
    { question: "Un asthmatique peut-il faire du sport ?", answer: "Oui, l'activité physique régulière améliore le contrôle de l'asthme. Un traitement adapté avant l'effort prévient le bronchospasme (GINA 2024)." },
    { question: "La cure thermale aide-t-elle l'asthme ?", answer: "Oui, la cure voies respiratoires réduit l'inflammation bronchique et peut diminuer la fréquence des crises. Elle complète le traitement de fond (HAS)." },
    { question: "Comment bien utiliser un inhalateur ?", answer: "Une mauvaise technique réduit l'efficacité du traitement. Demandez une démonstration à votre médecin ou pharmacien. Une chambre d'inhalation améliore le dépôt (GINA 2024)." },
    { question: "L'asthme peut-il disparaître ?", answer: "L'asthme est chronique mais les symptômes peuvent être bien contrôlés avec un traitement adapté. Certains enfants voient leur asthme s'atténuer à l'âge adulte." },
    { question: "Le stress aggrave-t-il l'asthme ?", answer: "Oui, le stress peut déclencher ou aggraver les crises. Les techniques de relaxation et la cohérence cardiaque sont des compléments utiles (GINA 2024)." },
  ],
  'rhinosinusite-chronique': [
    { question: "Le lavage de nez est-il efficace ?", answer: "Oui, l'irrigation nasale au sérum physiologique est le traitement de base recommandé. Elle réduit les symptômes et améliore la qualité de vie (EPOS 2020)." },
    { question: "La cure thermale aide-t-elle contre la sinusite ?", answer: "Oui, les soins d'eaux thermales soufrées réduisent l'inflammation des sinus et améliorent le drainage. Études françaises de crénothérapie ORL." },
    { question: "Comment différencier sinusite et allergie ?", answer: "La sinusite provoque une douleur faciale et un écoulement épais. L'allergie cause des éternuements, des démangeaisons et un écoulement clair. Le diagnostic est médical (EPOS 2020)." },
    { question: "Les corticoïdes nasaux sont-ils dangereux ?", answer: "Non, les sprays nasaux corticoïdes utilisés aux doses recommandées sont sûrs à long terme. Ils sont le traitement de référence de la rhinosinusite (EPOS 2020)." },
    { question: "Faut-il opérer une sinusite chronique ?", answer: "La chirurgie est réservée aux cas résistants au traitement médical bien conduit (lavages + corticoïdes nasaux pendant au moins 3 mois). Elle est efficace dans 80% des cas (EPOS 2020)." },
  ],
  'otites-repetition-enfant': [
    { question: "Les lavages de nez préviennent-ils les otites ?", answer: "Oui, le lavage nasal régulier au sérum physiologique réduit la fréquence des otites chez l'enfant en améliorant le drainage de la trompe d'Eustache (NICE 2022)." },
    { question: "La cure thermale est-elle efficace pour les otites à répétition ?", answer: "Oui, les soins ORL thermaux (douches nasales, aérosols) réduisent la fréquence des épisodes infectieux chez l'enfant (études françaises de crénothérapie)." },
    { question: "Faut-il poser des drains (yoyos) ?", answer: "Les drains sont réservés aux otites séromuqueuses persistantes (plus de 3 mois) avec retentissement auditif. La décision est prise par l'ORL." },
    { question: "Mon enfant peut-il aller à la piscine avec des otites ?", answer: "Pendant une otite aiguë, non. En dehors des épisodes, la piscine est possible avec des bouchons d'oreilles si drains posés. Demandez à votre ORL." },
    { question: "Les otites à répétition sont-elles graves ?", answer: "Non, elles sont fréquentes chez l'enfant (pic entre 6 mois et 3 ans) et diminuent généralement avec la croissance. Un suivi ORL est recommandé si plus de 3 épisodes par hiver." },
  ],
  'tendinopathie-coiffe': [
    { question: "Faut-il opérer une tendinite de l'épaule ?", answer: "Dans la majorité des cas, non. La rééducation est aussi efficace que la chirurgie pour la tendinopathie de la coiffe (Lancet CSAW 2018)." },
    { question: "Quels exercices faire pour l'épaule ?", answer: "Rotation externe avec élastique, élévation progressive, renforcement du sous-épineux. La rééducation doit être progressive et supervisée (HAS)." },
    { question: "La cure thermale aide-t-elle pour l'épaule ?", answer: "Oui, la balnéothérapie en eau chaude réduit la douleur et facilite la mobilisation articulaire (Cochrane, études de balnéothérapie)." },
    { question: "Pourquoi ai-je mal la nuit ?", answer: "La position couchée comprime les tendons de la coiffe. Dormir sur le dos ou du côté sain, avec un oreiller sous le bras atteint, soulage (HAS)." },
    { question: "Combien de temps dure une tendinite de l'épaule ?", answer: "Avec une rééducation adaptée, la majorité des patients s'améliorent en 3 à 6 mois. La régularité des exercices est essentielle (Lancet CSAW 2018, HAS)." },
  ],
  'arthrose-digitale': [
    { question: "L'arthrose des mains peut-elle se soigner ?", answer: "L'arthrose est chronique mais les symptômes se gèrent bien avec l'exercice, les orthèses et la protection articulaire (EULAR 2018)." },
    { question: "Une orthèse de pouce est-elle utile ?", answer: "Oui, l'orthèse de repos portée la nuit stabilise l'articulation du pouce et réduit la douleur de la rhizarthrose (EULAR 2018)." },
    { question: "Quels exercices pour les mains ?", answer: "Ouverture/fermeture de la main, opposition du pouce, pétrissage de pâte à modeler. 5-10 minutes par jour suffisent (EULAR 2018)." },
    { question: "La cure thermale aide-t-elle l'arthrose des mains ?", answer: "Oui, les bains de boue et l'eau chaude réduisent la douleur et la raideur des mains. L'effet dure plusieurs mois après la cure (Cochrane)." },
    { question: "Faut-il arrêter de travailler avec ses mains ?", answer: "Non, mais il faut adapter les gestes : utiliser des outils ergonomiques, répartir les efforts, éviter les mouvements répétitifs et les prises de force prolongées." },
  ],
};

export const FAQ_GENERAL: FaqItem[] = [
  { question: "Qu'est-ce qu'un programme d'éducation thérapeutique (ETP) ?", answer: "C'est un programme structuré qui aide les patients à mieux comprendre leur maladie et à acquérir les compétences pour la gérer au quotidien. Recommandé par la HAS et déclaré auprès de l'ARS." },
  { question: "Le programme Étuve est-il remboursé ?", answer: "Le programme numérique Étuve est inclus dans votre cure thermale. La cure est remboursée à 65% par l'Assurance Maladie sur prescription médicale." },
  { question: "Mes données sont-elles protégées ?", answer: "Oui, vous êtes identifié par un code anonyme uniquement. Aucune donnée personnelle (nom, date de naissance) n'est collectée. Vos données de suivi et votre email sont stockés séparément." },
  { question: "Faut-il créer un compte ?", answer: "Non, aucun compte n'est nécessaire. Vous recevez un code personnel au début du programme. Il suffit de le noter pour retrouver votre parcours." },
  { question: "Combien de temps dure le programme ?", answer: "21 jours pendant la cure (5 minutes par jour), puis un suivi hebdomadaire de 2 minutes pendant 12 semaines." },
];
