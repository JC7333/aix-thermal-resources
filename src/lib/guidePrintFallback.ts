// ============================================
// FALLBACK IMPRESSION GUIDES — ÉTUVE
// ============================================
// Génère une page HTML imprimable pour les guides transversaux
// Template 1 colonne, police lisible, format portrait
// ============================================

import { printViaIframe, downloadHtmlFallback } from "@/lib/printViaIframe";

type GuideId = "poids" | "tabac" | "sommeil" | "bouger";

const DISCLAIMER =
  "Information éducative — ne remplace pas un avis médical. Urgence : 15/112.";

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

interface GuideContent {
  title: string;
  description: string;
  topics: string[];
  keyMessages: string[];
  actionPlan: string[];
  sources: string[];
}

const guidesContent: Record<GuideId, GuideContent> = {
  poids: {
    title: "Gérer son poids durablement",
    description:
      "Des conseils pratiques et progressifs pour atteindre un poids santé, sans régime restrictif.",
    topics: [
      "Pourquoi les régimes restrictifs échouent",
      "L'assiette équilibrée au quotidien",
      "Bouger sans se faire mal",
      "Gérer les fringales",
      "Dormir pour maigrir",
    ],
    keyMessages: [
      "Perdre 5% de son poids apporte déjà des bénéfices mesurables sur la santé",
      "Les régimes très restrictifs provoquent l'effet yoyo dans 80% des cas",
      "Manger lentement (20 min) favorise la satiété",
      "Marcher 30 min/jour équivaut à ~150 kcal dépensées",
    ],
    actionPlan: [
      "Aujourd'hui : noter ce que je mange (sans jugement)",
      "Cette semaine : ajouter un légume à chaque repas",
      "Marcher 10 min après le déjeuner",
      "Éviter les boissons sucrées",
      "Dormir suffisamment (7-8h)",
    ],
    sources: [
      "OMS – Obésité et surpoids (2024)",
      "HAS – Surpoids et obésité de l'adulte (2022)",
      "Santé Publique France – Manger Bouger",
    ],
  },
  tabac: {
    title: "Arrêter le tabac",
    description:
      "Une approche progressive et bienveillante pour se libérer du tabac.",
    topics: [
      "Comprendre sa dépendance",
      "Préparer son arrêt",
      "Les substituts nicotiniques",
      "Gérer les envies",
      "Éviter la rechute",
    ],
    keyMessages: [
      "Après 20 min sans fumer, la tension et le pouls reviennent à la normale",
      "Après 1 an, le risque cardiovasculaire est divisé par 2",
      "Les substituts nicotiniques doublent les chances de succès",
      "La rechute fait partie du parcours (5-7 tentatives en moyenne)",
    ],
    actionPlan: [
      "Fixer une date d'arrêt dans les 2 semaines",
      "Identifier mes déclencheurs (café, stress, ennui)",
      "Consulter pour des substituts nicotiniques adaptés",
      "Préparer des alternatives (eau, chewing-gum, marche)",
      "Prévenir mon entourage",
    ],
    sources: [
      "Tabac Info Service (France)",
      "Cochrane – Nicotine replacement therapy (2018)",
      "HAS – Arrêt de la consommation de tabac (2014)",
    ],
  },
  sommeil: {
    title: "Améliorer son sommeil",
    description:
      "Retrouver un sommeil réparateur avec des habitudes simples et efficaces.",
    topics: [
      "L'hygiène du sommeil",
      "Préparer sa nuit",
      "Gérer les réveils nocturnes",
      "Alimentation et sommeil",
      "Quand consulter",
    ],
    keyMessages: [
      "La régularité des horaires est plus importante que la durée",
      "Les écrans avant le coucher retardent l'endormissement de 30-60 min",
      "La température idéale de la chambre est 18-19°C",
      "L'insomnie chronique (>3 mois) nécessite une prise en charge",
    ],
    actionPlan: [
      "Se coucher et se lever à heures fixes",
      "Arrêter les écrans 1h avant le coucher",
      "Éviter café/thé après 14h",
      "Sortir à la lumière le matin (20 min)",
      "Si réveil nocturne > 20 min : se lever et lire",
    ],
    sources: [
      "SFRMS – Recommandations insomnie (2022)",
      "Sleep Foundation – Sleep Hygiene",
      "HAS – Prise en charge de l'insomnie (2006)",
    ],
  },
  bouger: {
    title: "Reprendre une activité physique",
    description:
      "Bouger en douceur quand on a mal, qu'on est essoufflé ou qu'on n'a plus l'habitude.",
    topics: [
      "Pourquoi bouger quand on a mal",
      "Commencer très progressivement",
      "Exercices niveau 0 (très facile)",
      "Exercices niveau 1 à 3",
      "Intégrer le mouvement au quotidien",
    ],
    keyMessages: [
      "Bouger réduit les douleurs chroniques (dos, arthrose)",
      "10 min d'activité x 3/jour = 30 min quotidiennes",
      "L'essoufflement léger est normal et bénéfique",
      "Progresser de 10% par semaine maximum",
    ],
    actionPlan: [
      "Aujourd'hui : marcher 5 min autour de chez moi",
      "Demain : monter un étage à pied",
      "Cette semaine : 10 min de marche 3 fois",
      "Noter mes progrès dans un carnet",
      "Célébrer chaque petite victoire",
    ],
    sources: [
      "OMS – Recommandations activité physique (2020)",
      "HAS – Prescription d'activité physique (2022)",
      "Cochrane – Exercise for chronic pain (2017)",
    ],
  },
};

/**
 * Génère le HTML pour un guide avec template 1 colonne, police lisible
 * Format portrait, optimisé pour l'impression PDF
 */
const buildGuideHtml = (guideId: GuideId): string => {
  const guide = guidesContent[guideId];

  if (!guide) {
    return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Guide indisponible</title>
    <style>body { font-family: system-ui, sans-serif; margin: 24px; }</style>
  </head>
  <body>
    <h1>Guide indisponible</h1>
    <p>Ce guide n'existe pas encore.</p>
    <p>${escapeHtml(DISCLAIMER)}</p>
  </body>
</html>`;
  }

  // Template 1 colonne, police lisible (>=12pt), format portrait
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(guide.title)} — Étuve</title>
    <style>
      @page { size: A4 portrait; margin: 15mm 12mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; 
        font-size: 13pt; 
        line-height: 1.5; 
        color: #222; 
        max-width: 180mm;
        margin: 0 auto;
        padding: 16px;
      }
      
      header { 
        margin-bottom: 20px; 
        padding-bottom: 12px; 
        border-bottom: 3px solid #16a34a; 
      }
      h1 { 
        font-size: 22pt; 
        color: #16a34a; 
        margin-bottom: 6px; 
        font-weight: 700;
      }
      .subtitle { 
        font-size: 12pt; 
        color: #666; 
        line-height: 1.4;
      }
      .brand { 
        font-size: 11pt; 
        font-weight: bold; 
        color: #16a34a; 
        margin-top: 8px;
      }
      
      section {
        margin-bottom: 18px;
      }
      
      h2 { 
        font-size: 14pt; 
        color: #16a34a; 
        margin-bottom: 10px;
        padding-bottom: 4px;
        border-bottom: 1px solid #e5e5e5;
        font-weight: 600;
      }
      
      .card { 
        border: 1px solid #e5e5e5; 
        border-radius: 8px; 
        padding: 12px 16px; 
        margin-bottom: 12px;
        background: #fafafa;
      }
      .card-action { 
        background: #f0fdf4; 
        border-color: #86efac; 
      }
      .card-warning { 
        background: #fefce8; 
        border-color: #fde047; 
      }
      
      ul { 
        margin: 0; 
        padding-left: 20px; 
      }
      li { 
        margin: 6px 0; 
        font-size: 12pt; 
        line-height: 1.45; 
      }
      li::marker {
        color: #16a34a;
      }
      
      .sources { 
        font-size: 10pt; 
        color: #666; 
        margin-top: 16px;
        padding-top: 12px;
        border-top: 1px solid #ddd;
      }
      .sources strong {
        color: #444;
      }
      
      footer { 
        margin-top: 20px; 
        padding-top: 12px; 
        border-top: 2px solid #16a34a; 
        font-size: 10pt; 
        color: #666; 
        display: flex; 
        justify-content: space-between;
        align-items: center;
      }
      
      .print-note { 
        font-size: 11pt; 
        color: #888; 
        margin: 10px 0;
        padding: 8px 12px;
        background: #f5f5f5;
        border-radius: 6px;
        text-align: center;
      }
      @media print { 
        .print-note { display: none; } 
        body { padding: 0; }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>📘 ${escapeHtml(guide.title)}</h1>
      <p class="subtitle">${escapeHtml(guide.description)}</p>
      <div class="brand">ÉTUVE — Dr Audric Bugnard</div>
    </header>
    
    <p class="print-note">💡 Pour enregistrer en PDF : Imprimer → "Enregistrer en PDF"</p>
    
    <section>
      <h2>📋 Dans ce guide</h2>
      <div class="card">
        <ul>
          ${guide.topics.map((t) => `<li>${escapeHtml(t)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    
    <section>
      <h2>💡 Messages clés</h2>
      <div class="card card-warning">
        <ul>
          ${guide.keyMessages.map((m) => `<li>${escapeHtml(m)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    
    <section>
      <h2>✅ Plan d'action</h2>
      <div class="card card-action">
        <ul>
          ${guide.actionPlan.map((a) => `<li>${escapeHtml(a)}</li>`).join("\n          ")}
        </ul>
      </div>
    </section>
    
    <div class="sources">
      <strong>📚 Sources :</strong> ${guide.sources.map((s) => escapeHtml(s)).join(" • ")}
    </div>
    
    <footer>
      <span>${escapeHtml(DISCLAIMER)}</span>
      <span>etuve.fr</span>
    </footer>
  </body>
</html>`;
};

export function openGuidePrintFallback(params: {
  guideId: string;
  autoPrint?: boolean;
}): boolean {
  if (typeof window === "undefined") return false;

  const { guideId, autoPrint = false } = params;

  const validIds = ["poids", "tabac", "sommeil", "bouger"];
  if (!validIds.includes(guideId)) return false;

  const html = buildGuideHtml(guideId as GuideId);

  if (autoPrint) {
    // Impression via iframe cachée — pas de window.open, pas de blocage Chrome
    printViaIframe(html, {
      onError: () => downloadHtmlFallback(html, `guide-${guideId}.html`),
    });
  } else {
    // Téléchargement direct du fichier HTML (pas de popup)
    downloadHtmlFallback(html, `guide-${guideId}.html`);
  }

  return true;
}

export function isGuideAvailable(guideId: string): boolean {
  return ["poids", "tabac", "sommeil", "bouger"].includes(guideId);
}
