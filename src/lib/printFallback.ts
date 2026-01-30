import { getEvidenceBySlug } from '@/data/evidence';

type Variant = '1page' | '4pages';

const DISCLAIMER = 'Information éducative — ne remplace pas un avis médical. Urgence : 15/112.';

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const buildHtml = (slug: string, variant: Variant): string => {
  const evidence = getEvidenceBySlug(slug);

  if (!evidence) {
    return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Données indisponibles</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 24px; }
      .box { border: 1px solid #ddd; padding: 16px; border-radius: 10px; }
    </style>
  </head>
  <body>
    <div class="box">
      <h1>Données indisponibles</h1>
      <p>Impossible de trouver les données pour <code>${escapeHtml(slug)}</code>.</p>
      <p>${escapeHtml(DISCLAIMER)}</p>
    </div>
  </body>
</html>`;
  }

  const sources = (evidence.sources ?? []).slice(0, 3);
  const recos = (evidence.recommendations ?? []).map(r => r.text);
  const redFlags = (evidence.red_flags ?? []).slice(0, 4);

  // Limiter le contenu pour 1 page A4
  const maxRecos = variant === '1page' ? 4 : 5;
  const recosToShow = recos.slice(0, maxRecos).map(r => {
    const short = r.split(':')[0].trim();
    return short.length > 55 ? short.substring(0, 52) + '...' : short;
  });

  // Résumé court
  const shortSummary = evidence.summary.length > 180 
    ? evidence.summary.substring(0, 177) + '...' 
    : evidence.summary;

  // Plan 7 jours compact
  const sevenDayPlan = evidence.sevenDayPlans?.find(p => p.level === 0) || evidence.sevenDayPlans?.[0];

  const planHtml = sevenDayPlan
    ? `
      <h2><span class="icon">📅</span> Plan 7 jours</h2>
      <div class="card">
        <div class="days">
          ${sevenDayPlan.days
            .slice(0, 7)
            .map((d, i) => {
              const action = d.actions[0] || '';
              const shortAction = action.length > 38 ? action.substring(0, 35) + '...' : action;
              return `<div class="day"><strong>J${i + 1}</strong> ${escapeHtml(shortAction)}</div>`;
            })
            .join('')}
        </div>
      </div>
    `
    : '';

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>${escapeHtml(evidence.name)} — Coolance</title>
    <style>
      @page { size: A4; margin: 10mm; }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { 
        font-family: system-ui, -apple-system, sans-serif; 
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
      .meta { font-size: 7pt; color: #555; }
      .brand { text-align: right; font-size: 10pt; font-weight: bold; color: #0b5; }
      .brand-sub { font-size: 7pt; color: #888; }
      
      .two-cols { display: flex; gap: 8px; margin-top: 5px; }
      .col { flex: 1; }
      
      h2 { font-size: 9pt; color: #0b5; margin: 6px 0 3px; display: flex; align-items: center; }
      h2 .icon { margin-right: 4px; }
      
      .card { border: 1px solid #e5e5e5; border-radius: 5px; padding: 5px 7px; margin-bottom: 5px; }
      .card-warn { border-color: #f3c6c6; background: #fff7f7; }
      .card-action { border-color: #bbf7d0; background: #f0fdf4; }
      
      ul { margin: 0; padding-left: 12px; }
      li { margin: 1px 0; font-size: 8pt; line-height: 1.2; }
      
      .days { font-size: 8pt; }
      .day { margin: 1px 0; }
      .day strong { color: #0b5; display: inline-block; width: 18px; }
      
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
        <h1>📋 ${escapeHtml(evidence.name)}</h1>
        <div class="meta">Fiche pratique • MAJ ${escapeHtml(evidence.lastUpdated)}</div>
      </div>
      <div class="brand">
        COOLANCE
        <div class="brand-sub">Dr Audric Bugnard</div>
      </div>
    </header>
    
    <p class="print-note">Imprimer → Enregistrer en PDF</p>
    
    <div class="two-cols">
      <div class="col">
        <h2><span class="icon">⏱️</span> En bref</h2>
        <div class="card">
          <p style="font-size: 8pt;">${escapeHtml(shortSummary)}</p>
        </div>
        
        <h2><span class="icon">✅</span> Plan d'action</h2>
        <div class="card card-action">
          <ul>
            ${recosToShow.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}
          </ul>
        </div>
        
        ${variant === '4pages' ? planHtml : ''}
      </div>
      
      <div class="col">
        <h2><span class="icon">🚨</span> Consultez si...</h2>
        <div class="card card-warn">
          <ul>
            ${redFlags.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}
          </ul>
          <p style="font-size: 7pt; font-weight: bold; color: #dc2626; margin-top: 3px;">→ Urgence : 15 / 112</p>
        </div>
        
        ${variant === '1page' ? planHtml : ''}
        
        <h2><span class="icon">💡</span> Conseil</h2>
        <div class="card" style="background: #fef3c7; border-color: #fcd34d;">
          <p style="font-size: 8pt; text-align: center;">✨ Même 5 min/jour, c'est un grand pas !</p>
        </div>
        
        <div class="sources">
          📚 ${sources.map(s => `${escapeHtml(s.org)} (${s.year})`).join(' • ')}
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

export function openPrintableFallback(params: {
  slug: string;
  variant: Variant;
  autoPrint?: boolean;
}): boolean {
  if (typeof window === 'undefined') return false;

  const { slug, variant, autoPrint = false } = params;

  const html = buildHtml(slug, variant);
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
    }, 250);
  }

  return true;
}
