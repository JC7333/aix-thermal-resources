// ============================================
// FALLBACK IMPRESSION PARCOURS — COOLANCE
// ============================================
// Génère une page HTML imprimable strictement 1 page A4
// pour le plan personnalisé du parcours guidé
// ============================================

const DISCLAIMER = 'Information éducative — ne remplace pas un avis médical. Urgence : 15/112.';

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

interface ParcoursPlan {
  objective: string;
  level: number;
  objectiveLabel: string;
  today: string[];
  weekPlan: string[];
  savedAt: string;
}

const PLAN_STORAGE_KEY = 'coolance_parcours_plan';

export function getSavedPlan(): ParcoursPlan | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const saved = localStorage.getItem(PLAN_STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as ParcoursPlan;
  } catch {
    return null;
  }
}

const buildPlanHtml = (plan: ParcoursPlan): string => {
  // Limiter le contenu pour tenir sur 1 page
  const todayActions = plan.today.slice(0, 3); // Max 3 actions
  const weekPlan = plan.weekPlan.slice(0, 4); // Max 4 jours

  const savedDate = new Date(plan.savedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mon plan personnalisé — Coolance</title>
    <style>
      @page { 
        size: A4; 
        margin: 12mm; 
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      html, body {
        height: auto;
        font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
        font-size: 10pt;
        line-height: 1.3;
        color: #111;
        background: white;
      }
      .container {
        max-width: 190mm;
        max-height: 273mm;
        overflow: hidden;
        margin: 0 auto;
        padding: 4mm;
      }
      header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 3px solid #0b5;
      }
      h1 {
        font-size: 18pt;
        color: #0b5;
        margin-bottom: 4px;
      }
      .subtitle {
        font-size: 10pt;
        color: #555;
      }
      .brand {
        text-align: right;
        font-size: 12pt;
        font-weight: bold;
        color: #0b5;
      }
      .brand-sub {
        font-size: 8pt;
        color: #888;
      }
      .date-badge {
        font-size: 8pt;
        background: #f5f5f5;
        padding: 2px 6px;
        border-radius: 3px;
        margin-top: 4px;
        display: inline-block;
      }
      
      .two-columns {
        display: flex;
        gap: 12px;
        margin-top: 10px;
      }
      .column {
        flex: 1;
      }
      
      h2 {
        font-size: 11pt;
        color: #0b5;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      h2 .icon {
        font-size: 14pt;
      }
      
      .box {
        border-radius: 6px;
        padding: 10px;
        margin-bottom: 10px;
      }
      .box-primary {
        background: #e8f5ef;
        border-left: 4px solid #0b5;
      }
      .box-neutral {
        background: #f5f5f5;
      }
      .box-warning {
        background: #fef3c7;
        border-left: 4px solid #f59e0b;
      }
      
      .action-item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 6px;
      }
      .checkbox {
        width: 14px;
        height: 14px;
        border: 2px solid #0b5;
        border-radius: 2px;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .action-text {
        font-size: 9pt;
        line-height: 1.3;
      }
      
      .day-row {
        display: flex;
        margin-bottom: 4px;
      }
      .day-label {
        width: 60px;
        font-weight: bold;
        color: #0b5;
        font-size: 9pt;
      }
      .day-content {
        flex: 1;
        font-size: 9pt;
      }
      
      .red-flags {
        background: #fef2f2;
        border-left: 4px solid #dc2626;
        padding: 8px 10px;
        border-radius: 6px;
        margin-top: 10px;
      }
      .red-flags h3 {
        font-size: 10pt;
        color: #dc2626;
        margin-bottom: 6px;
      }
      .red-flags ul {
        padding-left: 16px;
        margin: 0;
      }
      .red-flags li {
        font-size: 8pt;
        color: #dc2626;
        margin-bottom: 2px;
      }
      
      footer {
        margin-top: 10px;
        padding-top: 8px;
        border-top: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        font-size: 8pt;
        color: #666;
      }
      
      .print-note {
        font-size: 9pt;
        color: #888;
        margin-top: 6px;
      }
      
      @media print {
        .print-note { display: none; }
        body { padding: 0; }
        .container { padding: 0; max-height: none; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <div>
          <h1>🎯 Mon plan personnalisé</h1>
          <p class="subtitle">${escapeHtml(plan.objectiveLabel)} — Niveau ${plan.level}</p>
        </div>
        <div class="brand">
          COOLANCE
          <div class="brand-sub">Dr Audric Bugnard</div>
          <div class="date-badge">Créé le ${escapeHtml(savedDate)}</div>
        </div>
      </header>
      
      <p class="print-note">Astuce : pour enregistrer, utilisez <strong>Imprimer → Enregistrer en PDF</strong>.</p>
      
      <div class="two-columns">
        <div class="column">
          <h2><span class="icon">✅</span> Aujourd'hui</h2>
          <div class="box box-primary">
            ${todayActions.map((action) => `
              <div class="action-item">
                <div class="checkbox"></div>
                <span class="action-text">${escapeHtml(action)}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="red-flags">
            <h3>🚨 Consultez si...</h3>
            <ul>
              <li>Douleur intense non soulagée</li>
              <li>Fièvre persistante > 38,5°C</li>
              <li>Symptômes qui s'aggravent rapidement</li>
            </ul>
            <p style="font-size: 8pt; font-weight: bold; color: #dc2626; margin-top: 4px;">
              → Urgence : 15 ou 112
            </p>
          </div>
        </div>
        
        <div class="column">
          <h2><span class="icon">📅</span> Plan 7 jours</h2>
          <div class="box box-neutral">
            ${weekPlan.map((day) => {
              const parts = day.split(':');
              const label = parts[0]?.trim() || '';
              const content = parts.slice(1).join(':').trim() || day;
              return `
                <div class="day-row">
                  <span class="day-label">${escapeHtml(label)}</span>
                  <span class="day-content">${escapeHtml(content)}</span>
                </div>
              `;
            }).join('')}
          </div>
          
          <h2><span class="icon">💡</span> Conseil</h2>
          <div class="box box-warning">
            <p style="font-size: 9pt; text-align: center;">
              ✨ Même 5 minutes par jour, c'est un grand pas !
            </p>
          </div>
        </div>
      </div>
      
      <footer>
        <span>${escapeHtml(DISCLAIMER)}</span>
        <span>coolance.fr</span>
      </footer>
    </div>
  </body>
</html>`;
};

const buildNoPlanHtml = (): string => {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Plan non disponible — Coolance</title>
    <style>
      body { 
        font-family: system-ui, sans-serif; 
        max-width: 600px; 
        margin: 40px auto; 
        padding: 20px;
        text-align: center;
      }
      h1 { color: #0b5; }
      p { color: #555; margin: 16px 0; }
      a { 
        display: inline-block;
        background: #0b5;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        margin-top: 16px;
      }
      a:hover { background: #0a4; }
    </style>
  </head>
  <body>
    <h1>📋 Plan non disponible</h1>
    <p>Aucun plan personnalisé n'a été généré.</p>
    <p>Complétez le parcours guidé pour créer votre plan d'action.</p>
    <a href="/parcours">Démarrer le parcours</a>
  </body>
</html>`;
};

export function openParcoursPrintFallback(params: {
  autoPrint?: boolean;
}): boolean {
  if (typeof window === 'undefined') return false;

  const { autoPrint = false } = params;

  const plan = getSavedPlan();
  const html = plan ? buildPlanHtml(plan) : buildNoPlanHtml();
  
  const w = window.open('', '_blank', 'noopener,noreferrer');
  if (!w) return false;

  w.document.open();
  w.document.write(html);
  w.document.close();

  if (autoPrint && plan) {
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

export function hasSavedPlan(): boolean {
  return getSavedPlan() !== null;
}
