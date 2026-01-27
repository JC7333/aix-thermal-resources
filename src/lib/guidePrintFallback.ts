// ============================================
// FALLBACK IMPRESSION GUIDES — COOLANCE
// ============================================
// Génère une page HTML imprimable pour les guides transversaux
// Utilisé quand le PDF n'est pas généré dynamiquement
// ============================================

type GuideId = 'poids' | 'tabac' | 'sommeil' | 'bouger';

const DISCLAIMER = 'Information éducative — ne remplace pas un avis médical. Urgence : 15/112.';

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

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
    title: 'Gérer son poids durablement',
    description: 'Des conseils pratiques et progressifs pour atteindre un poids santé, sans régime restrictif.',
    topics: [
      'Pourquoi les régimes restrictifs échouent',
      'L\'assiette équilibrée au quotidien',
      'Bouger sans se faire mal',
      'Gérer les fringales',
      'Dormir pour maigrir',
    ],
    keyMessages: [
      'Perdre 5% de son poids apporte déjà des bénéfices mesurables sur la santé',
      'Les régimes très restrictifs provoquent l\'effet yoyo dans 80% des cas',
      'Manger lentement (20 min) favorise la satiété',
      'Marcher 30 min/jour équivaut à ~150 kcal dépensées',
    ],
    actionPlan: [
      'Aujourd\'hui : noter ce que je mange (sans jugement)',
      'Cette semaine : ajouter un légume à chaque repas',
      'Marcher 10 min après le déjeuner',
      'Éviter les boissons sucrées',
      'Dormir suffisamment (7-8h)',
    ],
    sources: [
      'OMS – Obésité et surpoids (2024)',
      'HAS – Surpoids et obésité de l\'adulte (2022)',
      'Santé Publique France – Manger Bouger',
    ],
  },
  tabac: {
    title: 'Arrêter le tabac',
    description: 'Une approche progressive et bienveillante pour se libérer du tabac.',
    topics: [
      'Comprendre sa dépendance',
      'Préparer son arrêt',
      'Les substituts nicotiniques',
      'Gérer les envies',
      'Éviter la rechute',
    ],
    keyMessages: [
      'Après 20 min sans fumer, la tension et le pouls reviennent à la normale',
      'Après 1 an, le risque cardiovasculaire est divisé par 2',
      'Les substituts nicotiniques doublent les chances de succès',
      'La rechute fait partie du parcours (5-7 tentatives en moyenne)',
    ],
    actionPlan: [
      'Fixer une date d\'arrêt dans les 2 semaines',
      'Identifier mes déclencheurs (café, stress, ennui)',
      'Consulter pour des substituts nicotiniques adaptés',
      'Préparer des alternatives (eau, chewing-gum, marche)',
      'Prévenir mon entourage',
    ],
    sources: [
      'Tabac Info Service (France)',
      'Cochrane – Nicotine replacement therapy (2018)',
      'HAS – Arrêt de la consommation de tabac (2014)',
    ],
  },
  sommeil: {
    title: 'Améliorer son sommeil',
    description: 'Retrouver un sommeil réparateur avec des habitudes simples et efficaces.',
    topics: [
      'L\'hygiène du sommeil',
      'Préparer sa nuit',
      'Gérer les réveils nocturnes',
      'Alimentation et sommeil',
      'Quand consulter',
    ],
    keyMessages: [
      'La régularité des horaires est plus importante que la durée',
      'Les écrans avant le coucher retardent l\'endormissement de 30-60 min',
      'La température idéale de la chambre est 18-19°C',
      'L\'insomnie chronique (>3 mois) nécessite une prise en charge',
    ],
    actionPlan: [
      'Se coucher et se lever à heures fixes',
      'Arrêter les écrans 1h avant le coucher',
      'Éviter café/thé après 14h',
      'Sortir à la lumière le matin (20 min)',
      'Si réveil nocturne > 20 min : se lever et lire',
    ],
    sources: [
      'SFRMS – Recommandations insomnie (2022)',
      'Sleep Foundation – Sleep Hygiene',
      'HAS – Prise en charge de l\'insomnie (2006)',
    ],
  },
  bouger: {
    title: 'Reprendre une activité physique',
    description: 'Bouger en douceur quand on a mal, qu\'on est essoufflé ou qu\'on n\'a plus l\'habitude.',
    topics: [
      'Pourquoi bouger quand on a mal',
      'Commencer très progressivement',
      'Exercices niveau 0 (très facile)',
      'Exercices niveau 1 à 3',
      'Intégrer le mouvement au quotidien',
    ],
    keyMessages: [
      'Bouger réduit les douleurs chroniques (dos, arthrose)',
      '10 min d\'activité x 3/jour = 30 min quotidiennes',
      'L\'essoufflement léger est normal et bénéfique',
      'Progresser de 10% par semaine maximum',
    ],
    actionPlan: [
      'Aujourd\'hui : marcher 5 min autour de chez moi',
      'Demain : monter un étage à pied',
      'Cette semaine : 10 min de marche 3 fois',
      'Noter mes progrès dans un carnet',
      'Célébrer chaque petite victoire',
    ],
    sources: [
      'OMS – Recommandations activité physique (2020)',
      'HAS – Prescription d\'activité physique (2022)',
      'Cochrane – Exercise for chronic pain (2017)',
    ],
  },
};

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

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(guide.title)} — Coolance</title>
    <style>
      @page { size: A4; margin: 10mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: system-ui, sans-serif; 
        font-size: 9pt; 
        line-height: 1.25; 
        color: #111; 
        max-width: 190mm; 
        margin: 0 auto; 
      }
      header { 
        display: flex; 
        justify-content: space-between; 
        align-items: flex-start;
        margin-bottom: 6px; 
        padding-bottom: 5px; 
        border-bottom: 2px solid #0b5; 
      }
      h1 { font-size: 15pt; color: #0b5; margin-bottom: 2px; }
      .subtitle { font-size: 8pt; color: #555; }
      .brand { text-align: right; font-size: 10pt; font-weight: bold; color: #0b5; }
      .brand-sub { font-size: 7pt; color: #888; }
      
      .two-cols { display: flex; gap: 8px; margin-top: 5px; }
      .col { flex: 1; }
      
      h2 { font-size: 9pt; color: #0b5; margin: 5px 0 3px; }
      
      .card { border: 1px solid #e5e5e5; border-radius: 5px; padding: 5px 7px; margin-bottom: 5px; }
      .card-action { background: #f0fdf4; border-color: #bbf7d0; }
      .card-warning { background: #fef3c7; border-color: #fcd34d; }
      
      ul { margin: 0; padding-left: 12px; }
      li { margin: 1px 0; font-size: 8pt; line-height: 1.2; }
      
      .sources { font-size: 7pt; color: #555; margin-top: 4px; }
      
      footer { 
        margin-top: 5px; 
        padding-top: 4px; 
        border-top: 1px solid #ddd; 
        font-size: 7pt; 
        color: #666; 
        display: flex; 
        justify-content: space-between; 
      }
      
      .print-note { font-size: 7pt; color: #888; margin: 3px 0; }
      @media print { .print-note { display: none; } }
    </style>
  </head>
  <body>
    <header>
      <div>
        <h1>📘 ${escapeHtml(guide.title)}</h1>
        <p class="subtitle">${escapeHtml(guide.description)}</p>
      </div>
      <div class="brand">
        COOLANCE
        <div class="brand-sub">Dr Audric Bugnard</div>
      </div>
    </header>
    
    <p class="print-note">Imprimer → Enregistrer en PDF</p>
    
    <div class="two-cols">
      <div class="col">
        <h2>📋 Dans ce guide</h2>
        <div class="card">
          <ul>
            ${guide.topics.slice(0, 4).map((t) => `<li>${escapeHtml(t)}</li>`).join('')}
          </ul>
        </div>
        
        <h2>💡 Messages clés</h2>
        <div class="card card-warning">
          <ul>
            ${guide.keyMessages.slice(0, 3).map((m) => `<li>${escapeHtml(m)}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="col">
        <h2>✅ Plan d'action</h2>
        <div class="card card-action">
          <ul>
            ${guide.actionPlan.slice(0, 4).map((a) => `<li>${escapeHtml(a)}</li>`).join('')}
          </ul>
        </div>
        
        <div class="sources">
          📚 ${guide.sources.slice(0, 2).map((s) => escapeHtml(s)).join(' • ')}
        </div>
      </div>
    </div>
    
    <footer>
      <span>${escapeHtml(DISCLAIMER)}</span>
      <span>coolance.fr</span>
    </footer>
  </body>
</html>`;
};

export function openGuidePrintFallback(params: {
  guideId: string;
  autoPrint?: boolean;
}): boolean {
  if (typeof window === 'undefined') return false;

  const { guideId, autoPrint = false } = params;

  const validIds = ['poids', 'tabac', 'sommeil', 'bouger'];
  if (!validIds.includes(guideId)) return false;

  const html = buildGuideHtml(guideId as GuideId);
  const w = window.open('', '_blank', 'noopener,noreferrer');
  if (!w) return false;

  w.document.open();
  w.document.write(html);
  w.document.close();

  if (autoPrint) {
    setTimeout(() => {
      try {
        w.focus();
        w.print();
      } catch {
        // no-op
      }
    }, 300);
  }

  return true;
}

export function isGuideAvailable(guideId: string): boolean {
  return ['poids', 'tabac', 'sommeil', 'bouger'].includes(guideId);
}
