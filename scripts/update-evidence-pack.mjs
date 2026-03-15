// Script S30A — mise à jour evidence-pack.json
// Exécuter : node scripts/update-evidence-pack.mjs

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = join(__dirname, '../src/data/evidence-pack.json');
const data = JSON.parse(readFileSync(jsonPath, 'utf8'));

// ======================================================
// 1. TOUTES LES DATES → "Mars 2026"
// ======================================================
data.forEach(e => { e.lastUpdated = 'Mars 2026'; });
console.log('✓ Dates mises à jour → Mars 2026');

// ======================================================
// 2. FIX HAS — insuffisance veineuse (source #4 cardiaque → veineuse)
// ======================================================
const veineuse = data.find(e => e.slug === 'insuffisance-veineuse-chronique');
if (veineuse) {
  const srcHas = veineuse.sources.find(s => s.url && s.url.includes('c_1092016'));
  if (srcHas) {
    srcHas.url = 'https://www.has-sante.fr/jcms/c_1092016';
    srcHas.title = 'Guide du parcours de soins - Maladie veineuse chronique';
    console.log('✓ HAS veineuse URL corrigée');
  }
}

// ======================================================
// 3. ARTHROSE — nouveau contenu S30A
// ======================================================
const arthrose = data.find(e => e.slug === 'arthrose');
if (arthrose) {
  // Summary (4 bullets "En 2 minutes" pour guide 4-pages)
  arthrose.summary = [
    "L'arthrose n'est pas une simple usure — c'est un déséquilibre entre la destruction et la réparation du cartilage. Votre corps répare en permanence, mais pas assez vite si les conditions sont mauvaises.",
    "L'exercice est le traitement n°1 de l'arthrose du genou — devant TOUS les médicaments. C'est la recommandation unanime de NICE (Royaume-Uni), OARSI (international) et HAS (France).",
    "La douleur ne signifie pas que vous détruisez votre genou. La douleur arthrosique est en grande partie liée à l'inflammation et à la sensibilisation nerveuse — pas à l'os qui frotte sur l'os.",
    "Les radiographies mentent : une arthrose sévère à la radio peut être peu douloureuse, et inversement. La corrélation entre l'image et la douleur est faible. (Bedson et Croft, Pain 2008)"
  ].join('\n');

  // Essentiels (3 bullets surprenants pour fiche 1-page)
  arthrose.essentiels = [
    {
      title: "Votre cartilage n'a aucun vaisseau sanguin.",
      text: "Il se nourrit uniquement quand vous bougez : la pression-décompression agit comme une éponge qui aspire les nutriments. Sans mouvement, le cartilage meurt de faim. C'est pourquoi le repos prolongé aggrave l'arthrose."
    },
    {
      title: "Chaque kilo perdu enlève 4 kg de pression sur votre genou à chaque pas.",
      text: "Perdre 5 kg, c'est 20 kg de charge en moins sur votre genou à chaque pas. (Messier et al., Arthritis & Rheumatism 2005)"
    },
    {
      title: "L'exercice réduit la douleur arthrosique d'environ 12 points sur 100",
      text: "c'est plus efficace que le paracétamol et sans effets secondaires. (Cochrane CD004376, 2024)"
    }
  ];

  // Action du jour
  arthrose.actionDuJour = "Lever de chaise — assis, levez-vous sans les mains, 3 séries de 5. Reposez-vous 30 secondes entre chaque série. (5 min)";

  // Ce qui se passe dans votre corps
  arthrose.bodyExplanation = [
    "Le cartilage recouvre les extrémités osseuses de votre genou. Il agit comme un coussin amortisseur. Dans l'arthrose, ce coussin s'amincit progressivement. L'os sous-jacent réagit en formant des excroissances (ostéophytes). L'articulation s'enflamme par épisodes. Le liquide synovial — le lubrifiant du genou — change de composition et perd son efficacité.",
    "Mais le cartilage n'est pas passif : il contient des cellules (chondrocytes) qui fabriquent en permanence de la nouvelle matrice. Le problème dans l'arthrose, c'est que la destruction va plus vite que la construction. L'exercice, en stimulant ces cellules par la pression mécanique, rééquilibre la balance."
  ].join('\n');

  // Le saviez-vous (pages 1 et 3 du guide)
  arthrose.didYouKnow = [
    "Après seulement 4 mois d'exercice régulier, le cartilage du genou montre des signes d'adaptation mesurables à l'IRM (augmentation des glycosaminoglycanes, les \"briques\" du cartilage). Les bénéfices sur la douleur et la force apparaissent encore plus tôt. C'est pourquoi la régularité bat l'intensité. (Roos et Dahlberg, Arthritis & Rheumatism 2005)",
    "L'arthrose du genou est environ 1,5 fois plus fréquente chez les femmes après 50 ans que chez les hommes. Plusieurs facteurs expliquent cette différence : des articulations plus petites, des différences d'alignement du genou, et l'influence de la ménopause sur le métabolisme articulaire. (Prieto-Alhambra et al., Ann Rheum Dis 2014)"
  ];

  // Alertes (3 max, phrases complètes)
  arthrose.red_flags = [
    "Genou chaud et rouge avec fièvre (possible infection).",
    "Blocage brutal impossible à débloquer.",
    "Douleur nocturne permanente avec amaigrissement inexpliqué."
  ];

  // Sources (6, URLs vérifiées)
  arthrose.sources = [
    { title: "Osteoarthritis: diagnosis and management (NG226)", org: "NICE", year: 2022, url: "https://www.nice.org.uk/guidance/ng226" },
    { title: "Exercise for osteoarthritis of the knee (CD004376)", org: "Cochrane", year: 2024, url: "https://www.cochrane.org/CD004376" },
    { title: "2019 Guidelines for the management of osteoarthritis", org: "OARSI", year: 2019, url: "https://doi.org/10.1016/j.joca.2019.06.011" },
    { title: "Weight loss reduces knee-joint loads", org: "Messier et al., Arthritis & Rheumatism", year: 2005, url: "https://pubmed.ncbi.nlm.nih.gov/15986358/" },
    { title: "Exercise for osteoarthritis: a network meta-analysis", org: "Uthman et al., BMJ", year: 2013, url: "https://pubmed.ncbi.nlm.nih.gov/24055922/" },
    { title: "Positive effects of moderate exercise on GAG content in knee cartilage", org: "Roos et Dahlberg, Arthritis & Rheumatism", year: 2005, url: "https://onlinelibrary.wiley.com/doi/10.1002/art.21415" }
  ];

  // Plan 7 jours — niveau 0
  if (arthrose.sevenDayPlans && arthrose.sevenDayPlans[0]) {
    arthrose.sevenDayPlans[0].days = [
      { day: "Jour 1", actions: ["Marche 5 min + 10 extensions genou assis"] },
      { day: "Jour 2", actions: ["Marche 7 min + 10 extensions genou assis"] },
      { day: "Jour 3", actions: ["Marche 7 min + 5 levers de chaise"] },
      { day: "Jour 4", actions: ["Repos actif : marche libre 10 min sans exercice formel"] },
      { day: "Jour 5", actions: ["Marche 10 min + 10 extensions + 5 levers de chaise"] },
      { day: "Jour 6", actions: ["Marche 10 min + 8 levers de chaise"] },
      { day: "Jour 7", actions: ["Marche 12 min. Bilan : notez votre douleur de 0 à 10"] }
    ];
  }

  // Programme 8 semaines — niveau 0
  if (arthrose.eightWeekPrograms && arthrose.eightWeekPrograms[0]) {
    arthrose.eightWeekPrograms[0].weeks = [
      { week: "Sem 1-2", focus: "Découverte", exercises: ["Marche 5-10 min/jour + 10 extensions assis"] },
      { week: "Sem 3-4", focus: "Renforcement", exercises: ["Marche 10-15 min/jour + 3×5 levers de chaise"] },
      { week: "Sem 5-6", focus: "Progression", exercises: ["Marche 15-20 min/jour + 3×8 levers de chaise"] },
      { week: "Sem 7-8", focus: "Consolidation", exercises: ["Marche 20 min/jour + circuit 2 tours 15 min"] }
    ];
  }

  console.log('✓ Arthrose mis à jour (essentiels:', arthrose.essentiels.length, 'sources:', arthrose.sources.length, ')');
}

// ======================================================
// 4. LOMBALGIE CHRONIQUE — nouveau contenu S30A
// ======================================================
const lombalgie = data.find(e => e.slug === 'lombalgie-chronique');
if (lombalgie) {
  // Summary (4 bullets "En 2 minutes")
  lombalgie.summary = [
    "Le mal de dos chronique (> 3 mois) n'est PAS le signe d'un dos abîmé. Dans 90% des cas, c'est une lombalgie commune — le système nerveux est devenu hypersensible à la douleur, pas parce que les tissus sont endommagés.",
    "Les mots sur votre IRM font plus peur que la réalité. Protrusion discale, dégénérescence, pincement — ce sont des descriptions normales du vieillissement. Chez les personnes SANS aucune douleur, 10 à 43% ont des protrusions discales visibles à l'IRM. (Brinjikji et al., AJNR 2015)",
    "La kinésiophobie (peur de bouger) est l'un des facteurs majeurs qui transforment une douleur aiguë en douleur chronique. Plus vous avez peur de bouger, plus la douleur persiste — cercle vicieux bien documenté.",
    "L'exercice est le traitement le plus efficace — devant les médicaments, les infiltrations et la chirurgie. C'est le consensus mondial OMS + NICE + HAS + ACP."
  ].join('\n');

  // Essentiels (3 bullets surprenants pour fiche 1-page)
  lombalgie.essentiels = [
    {
      title: "Votre dos est solide.",
      text: "La douleur chronique vient rarement d'un dommage structurel — dans 90% des cas, c'est une lombalgie commune. Les IRM de personnes SANS douleur montrent des protrusions discales dans 10 à 43% des cas. Les images ne sont pas la cause de votre douleur."
    },
    {
      title: "Le repos au lit aggrave le mal de dos.",
      text: "Plus de 2 jours de repos augmentent la durée de l'épisode, la raideur et le déconditionnement musculaire. Toutes les recommandations internationales convergent : restez actif."
    },
    {
      title: "La marche est aussi efficace que les séances de kiné.",
      text: "Marcher 5×/semaine pendant 30 min réduit les récidives de lombalgie de 28% — autant qu'un programme supervisé de 6 séances. (Pocovi et al., Lancet 2024)"
    }
  ];

  // Action du jour
  lombalgie.actionDuJour = "Chat-chameau — à 4 pattes, alternez dos rond (expirer) et dos creux (inspirer). 8 répétitions lentes. (3 min)";

  // Ce qui se passe
  lombalgie.bodyExplanation = [
    "Le disque intervertébral est le plus gros tissu avasculaire du corps humain. Comme le cartilage du genou, il se nourrit par imbibition : la pression cyclique de la marche aspire les nutriments à l'intérieur. Le meilleur aliment pour vos disques, c'est la marche.",
    "Dans 90% des cas de lombalgie chronique, il n'y a PAS de lésion grave. La douleur est entretenue par un système nerveux hypersensible et des muscles déconditionnés — pas par des os ou des disques abîmés."
  ].join('\n');

  // Le saviez-vous
  lombalgie.didYouKnow = [
    "Le disque intervertébral est le plus gros tissu avasculaire du corps humain. Comme le cartilage du genou, il se nourrit par imbibition : la pression cyclique de la marche aspire les nutriments à l'intérieur. Le meilleur aliment pour vos disques, c'est la marche. (Adams et Roughley, Spine 2006)",
    "Il n'existe pas de mauvaise posture qui cause la lombalgie chronique. Ce qui compte, c'est le changement de position fréquent. La meilleure posture est la prochaine — bougez toutes les 30 minutes. (Slater et al., JOSPT 2019)"
  ];

  // Alertes
  lombalgie.red_flags = [
    "Perte de contrôle des urines ou des selles.",
    "Perte de sensibilité entre les jambes (anesthésie en selle).",
    "Faiblesse progressive dans une jambe."
  ];

  // Sources
  lombalgie.sources = [
    { title: "WHO Guideline for non-surgical management of chronic low back pain", org: "OMS", year: 2023, url: "https://www.who.int/publications/i/item/9789240081789" },
    { title: "Low back pain and sciatica (NG59)", org: "NICE", year: 2016, url: "https://www.nice.org.uk/guidance/ng59" },
    { title: "Prise en charge du patient présentant une lombalgie commune", org: "HAS", year: 2019, url: "https://www.has-sante.fr/jcms/c_2961499" },
    { title: "Walking versus exercise therapy for chronic low back pain (RCT n=701)", org: "Pocovi et al., Lancet", year: 2024, url: "https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)00755-4" },
    { title: "Systematic literature review of imaging features of spinal degeneration in asymptomatic populations", org: "Brinjikji et al., AJNR", year: 2015, url: "https://pubmed.ncbi.nlm.nih.gov/25430861/" },
    { title: "Patient education for low back pain (Review)", org: "Cochrane", year: 2023, url: "https://doi.org/10.1002/14651858.CD004057.pub5" }
  ];

  // Plan 7 jours — niveau 0
  if (lombalgie.sevenDayPlans && lombalgie.sevenDayPlans[0]) {
    lombalgie.sevenDayPlans[0].days = [
      { day: "Jour 1", actions: ["10 respirations abdominales + marche 5 min"] },
      { day: "Jour 2", actions: ["10 respirations abdominales + 5 bascules de bassin allongé"] },
      { day: "Jour 3", actions: ["8 chat-chameau + marche 7 min"] },
      { day: "Jour 4", actions: ["Repos actif : marche libre"] },
      { day: "Jour 5", actions: ["10 respirations + 8 chat-chameau + marche 8 min"] },
      { day: "Jour 6", actions: ["10 respirations + 8 chat-chameau + 4 bird-dog par côté"] },
      { day: "Jour 7", actions: ["Marche 10 min. Bilan douleur 0-10"] }
    ];
  }

  // Programme 8 semaines — niveau 0
  if (lombalgie.eightWeekPrograms && lombalgie.eightWeekPrograms[0]) {
    lombalgie.eightWeekPrograms[0].weeks = [
      { week: "Sem 1-2", focus: "Activation", exercises: ["10 respirations abdominales + marche 5-10 min/jour"] },
      { week: "Sem 3-4", focus: "Stabilisation", exercises: ["Chat-chameau 8 rép + marche 10-15 min/jour"] },
      { week: "Sem 5-6", focus: "Renforcement", exercises: ["Bird-dog 6/côté + marche 15-20 min/jour"] },
      { week: "Sem 7-8", focus: "Autonomie", exercises: ["Circuit McGill 2 tours + marche 20-30 min/jour"] }
    ];
  }

  console.log('✓ Lombalgie mise à jour (essentiels:', lombalgie.essentiels.length, 'sources:', lombalgie.sources.length, ')');
}

// ======================================================
// ÉCRITURE
// ======================================================
writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('\n✅ evidence-pack.json sauvegardé avec succès');
console.log('Vérification finale :');
console.log('  arthrose.lastUpdated =', data.find(e=>e.slug==='arthrose')?.lastUpdated);
console.log('  lombalgie.lastUpdated =', data.find(e=>e.slug==='lombalgie-chronique')?.lastUpdated);
console.log('  veineuse HAS url =', data.find(e=>e.slug==='insuffisance-veineuse-chronique')?.sources?.find(s=>s.url?.includes('1092016'))?.url);
console.log('  coxarthrose.lastUpdated =', data.find(e=>e.slug==='coxarthrose')?.lastUpdated);
