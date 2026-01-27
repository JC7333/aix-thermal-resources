import { getEvidenceBySlug } from '@/data/evidence';

type Variant = '1page' | '4pages';

const DISCLAIMER = 'Information éducative — ne remplace pas un avis médical. Urgence : 15/112.';

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

const buildHtml = (slug: string, variant: Variant): string => {
  const evidence = getEvidenceBySlug(slug);

  if (!evidence) {
    return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Impression — Données indisponibles</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; margin: 24px; }
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

  const sources = (evidence.sources ?? []).slice(0, 6);
  const recos = (evidence.recommendations ?? []).map(r => r.text);
  const redFlags = (evidence.red_flags ?? []).slice(0, 8);

  const maxRecos = variant === '1page' ? 6 : recos.length;
  const recosToShow = recos.slice(0, maxRecos);

  const programsHtml = variant === '4pages'
    ? `
      ${(evidence.sevenDayPlans?.length ?? 0) > 0 ? `
        <section>
          <h2>Plan 7 jours (extrait)</h2>
          ${evidence.sevenDayPlans!
            .slice(0, 1)
            .map((plan) => `
              <div class="card">
                <h3>${escapeHtml(plan.levelName)}</h3>
                <ul>
                  ${plan.days
                    .slice(0, 3)
                    .map((d) => `<li><strong>${escapeHtml(d.day)} :</strong> ${escapeHtml(d.actions.join(' • '))}</li>`)
                    .join('')}
                </ul>
              </div>
            `)
            .join('')}
        </section>
      ` : ''}

      ${(evidence.eightWeekPrograms?.length ?? 0) > 0 ? `
        <section>
          <h2>Programme 8 semaines (extrait)</h2>
          ${evidence.eightWeekPrograms!
            .slice(0, 1)
            .map((program) => `
              <div class="card">
                <h3>${escapeHtml(program.levelName)}</h3>
                <ul>
                  ${program.weeks
                    .slice(0, 2)
                    .map((w) => `<li><strong>${escapeHtml(w.week)} :</strong> ${escapeHtml(w.focus)}</li>`)
                    .join('')}
                </ul>
              </div>
            `)
            .join('')}
        </section>
      ` : ''}
    `
    : '';

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Impression — ${escapeHtml(evidence.name)} (${variant === '1page' ? '1 page' : '4 pages'})</title>
    <style>
      @page { size: A4; margin: 16mm; }
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: #111; }
      header { margin-bottom: 14px; }
      h1 { font-size: 20pt; margin: 0 0 6px; }
      .meta { font-size: 10.5pt; color: #444; }
      .grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
      section { break-inside: avoid; }
      h2 { font-size: 13pt; margin: 14px 0 6px; }
      ul { margin: 0; padding-left: 18px; }
      li { margin: 4px 0; line-height: 1.25; }
      .card { border: 1px solid #e5e5e5; border-radius: 10px; padding: 10px 12px; }
      .warn { border-color: #f3c6c6; background: #fff7f7; }
      .footer { margin-top: 14px; padding-top: 10px; border-top: 1px solid #eee; font-size: 10pt; color: #444; }
      a { color: #0b5; }
      .small { font-size: 10pt; color: #555; }
      .print-note { font-size: 10pt; color: #444; margin-top: 6px; }
    </style>
  </head>
  <body>
    <header>
      <h1>${escapeHtml(evidence.name)} — ${variant === '1page' ? 'Fiche 1 page' : 'Guide 4 pages (version imprimable)'}</h1>
      <div class="meta">
        Contenu éducatif basé sur recommandations et revues systématiques.
        <br />
        Dernière mise à jour : <strong>${escapeHtml(evidence.lastUpdated)}</strong>
      </div>
      <p class="print-note">Astuce : pour “Télécharger”, utilisez <strong>Imprimer → Enregistrer en PDF</strong>.</p>
    </header>

    <div class="grid">
      <section class="card">
        <h2>En bref</h2>
        <p class="small">${escapeHtml(evidence.summary)}</p>
      </section>

      <section class="card">
        <h2>Plan d’action</h2>
        <ul>
          ${recosToShow.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
      </section>

      <section class="card warn">
        <h2>Quand consulter rapidement</h2>
        <ul>
          ${redFlags.map((t) => `<li>${escapeHtml(t)}</li>`).join('')}
        </ul>
      </section>

      ${programsHtml}

      <section class="card">
        <h2>Sources (sélection)</h2>
        <ul>
          ${sources
            .map(
              (s) =>
                `<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noreferrer">${escapeHtml(s.title)}</a> — ${escapeHtml(s.org)} (${s.year})</li>`
            )
            .join('')}
        </ul>
      </section>
    </div>

    <div class="footer">
      ${escapeHtml(DISCLAIMER)}
    </div>
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
    // Laisser le temps au navigateur de rendre le document
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
