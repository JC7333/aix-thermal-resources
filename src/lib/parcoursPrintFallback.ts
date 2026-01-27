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
  // Limiter pour 1 page A4
  const todayActions = plan.today.slice(0, 3).map(a => 
    a.length > 55 ? a.substring(0, 52) + '...' : a
  );
  const weekPlan = plan.weekPlan.slice(0, 4).map(d => 
    d.length > 60 ? d.substring(0, 57) + '...' : d
  );

  const savedDate = new Date(plan.savedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
  });

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Mon plan — Coolance</title>
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
      .date-badge { font-size: 7pt; background: #f5f5f5; padding: 1px 4px; border-radius: 2px; margin-top: 2px; }
      
      .two-cols { display: flex; gap: 8px; margin-top: 5px; }
      .col { flex: 1; }
      
      h2 { font-size: 9pt; color: #0b5; margin: 5px 0 3px; }
      
      .card { border: 1px solid #e5e5e5; border-radius: 5px; padding: 5px 7px; margin-bottom: 5px; }
      .card-action { background: #f0fdf4; border-color: #bbf7d0; }
      .card-warn { background: #fff7f7; border-color: #f3c6c6; }
      .card-neutral { background: #f5f5f5; }
      .card-tip { background: #fef3c7; border-color: #fcd34d; }
      
      .action-item { display: flex; align-items: flex-start; margin: 3px 0; }
      .checkbox { width: 10px; height: 10px; border: 1.5px solid #0b5; border-radius: 2px; margin-right: 6px; margin-top: 1px; flex-shrink: 0; }
      .action-text { font-size: 8pt; line-height: 1.2; }
      
      .day-row { margin: 2px 0; font-size: 8pt; }
      .day-row strong { color: #0b5; }
      
      ul { margin: 0; padding-left: 12px; }
      li { margin: 1px 0; font-size: 7pt; color: #dc2626; }
      
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
        <h1>🎯 Mon plan personnalisé</h1>
        <p class="subtitle">${escapeHtml(plan.objectiveLabel)} — Niveau ${plan.level}</p>
      </div>
      <div class="brand">
        COOLANCE
        <div class="brand-sub">Dr Audric Bugnard</div>
        <div class="date-badge">${escapeHtml(savedDate)}</div>
      </div>
    </header>
    
    <p class="print-note">Imprimer → Enregistrer en PDF</p>
    
    <div class="two-cols">
      <div class="col">
        <h2>✅ Aujourd'hui</h2>
        <div class="card card-action">
          ${todayActions.map((action) => `
            <div class="action-item">
              <div class="checkbox"></div>
              <span class="action-text">${escapeHtml(action)}</span>
            </div>
          `).join('')}
        </div>
        
        <h2>🚨 Consultez si...</h2>
        <div class="card card-warn">
          <ul>
            <li>Douleur intense non soulagée</li>
            <li>Fièvre > 38,5°C</li>
            <li>Symptômes qui s'aggravent</li>
          </ul>
          <p style="font-size: 7pt; font-weight: bold; color: #dc2626; margin-top: 2px;">→ Urgence : 15 / 112</p>
        </div>
      </div>
      
      <div class="col">
        <h2>📅 Plan 7 jours</h2>
        <div class="card card-neutral">
          ${weekPlan.map((day) => {
            const parts = day.split(':');
            const label = parts[0]?.trim() || '';
            const content = parts.slice(1).join(':').trim() || day;
            return `<div class="day-row"><strong>${escapeHtml(label)}</strong> ${escapeHtml(content)}</div>`;
          }).join('')}
        </div>
        
        <h2>💡 Conseil</h2>
        <div class="card card-tip">
          <p style="font-size: 8pt; text-align: center;">✨ Même 5 min/jour, c'est un grand pas !</p>
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

const buildNoPlanHtml = (): string => {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Plan non disponible</title>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 500px; margin: 40px auto; padding: 20px; text-align: center; }
      h1 { color: #0b5; }
      p { color: #555; margin: 12px 0; }
      a { display: inline-block; background: #0b5; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 12px; }
    </style>
  </head>
  <body>
    <h1>📋 Plan non disponible</h1>
    <p>Complétez le parcours guidé pour créer votre plan.</p>
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
    }, 250);
  }

  return true;
}

export function hasSavedPlan(): boolean {
  return getSavedPlan() !== null;
}
