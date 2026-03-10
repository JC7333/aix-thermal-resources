import jsPDF from 'jspdf';
import { PathologyContent } from '@/content/content';

// ============================================
// CONFIGURATION PDF — OPTIMISÉ A4 LISIBLE
// ============================================

const MARGIN = 12;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;

// Couleurs RGB
const PRIMARY: [number, number, number] = [42, 106, 115];
const TEXT: [number, number, number] = [30, 40, 50];
const MUTED: [number, number, number] = [100, 110, 120];
const DANGER: [number, number, number] = [180, 50, 50];
const SUCCESS: [number, number, number] = [40, 120, 80];
const BOX_BG: [number, number, number] = [245, 248, 250];
const LEVEL0_BG: [number, number, number] = [230, 245, 230];

// ============================================
// HELPERS
// ============================================

const addBrandHeader = (doc: jsPDF, title: string, pageNum?: number, totalPages?: number) => {
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'normal');
  doc.text('COOLANCE — par le Dr Audric Bugnard', MARGIN, 8);
  
  if (pageNum && totalPages) {
    doc.text(`${pageNum}/${totalPages}`, PAGE_WIDTH - MARGIN - 5, 8);
  }
  
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, 10, PAGE_WIDTH - MARGIN, 10);
};

const addFooter = (doc: jsPDF) => {
  const y = PAGE_HEIGHT - 8;
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'italic');
  doc.text('Informations générales — ne remplace pas un avis médical. Urgence : 15 / 112.', MARGIN, y);
  doc.text('coolance.fr', PAGE_WIDTH - MARGIN - 15, y);
};

const addCheckbox = (doc: jsPDF, x: number, y: number, size: number = 3.5) => {
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.4);
  doc.rect(x, y - size + 0.5, size, size);
};

const addSection = (doc: jsPDF, title: string, y: number, icon?: string): number => {
  doc.setFontSize(11);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'bold');
  const displayTitle = icon ? `${icon} ${title}` : title;
  doc.text(displayTitle, MARGIN, y);
  return y + 5;
};

const addBox = (doc: jsPDF, x: number, y: number, width: number, height: number, bgColor: [number, number, number] = BOX_BG) => {
  doc.setFillColor(...bgColor);
  doc.setDrawColor(200, 210, 220);
  doc.setLineWidth(0.3);
  doc.roundedRect(x, y, width, height, 2, 2, 'FD');
};

// ============================================
// PDF 1 PAGE — CHECKLIST COMPACTE
// ============================================

export const generateOnePage = (pathology: PathologyContent): jsPDF => {
  const doc = new jsPDF('p', 'mm', 'a4');
  let y = 16;

  addBrandHeader(doc, pathology.title);

  // === TITRE ===
  doc.setFontSize(16);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'bold');
  doc.text(pathology.title.toUpperCase(), MARGIN, y);
  y += 5;
  
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fiche pratique — ${pathology.lastUpdated}`, MARGIN, y);
  y += 7;

  // === ENCADRÉ NIVEAU 0 ===
  const level0Box = pathology.dailyPlans?.find(p => p.level === 0);
  if (level0Box && level0Box.actions) {
    addBox(doc, MARGIN, y, CONTENT_WIDTH, 24, LEVEL0_BG);
    
    doc.setFontSize(10);
    doc.setTextColor(...SUCCESS);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ VERSION TRÈS FACILE (Niveau 0)', MARGIN + 3, y + 5);
    
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');
    
    let boxY = y + 10;
    level0Box.actions.slice(0, 3).forEach((action) => {
      addCheckbox(doc, MARGIN + 3, boxY);
      const lines = doc.splitTextToSize(action, CONTENT_WIDTH - 14);
      doc.text(lines[0], MARGIN + 9, boxY);
      boxY += 4.5;
    });
    y += 28;
  }

  // === 3 ACTIONS AUJOURD'HUI (Version normale) ===
  const normalPlan = pathology.dailyPlans?.find(p => p.level === 1) || pathology.dailyPlans?.[0];
  if (normalPlan && normalPlan.level !== 0 && normalPlan.actions) {
    y = addSection(doc, "3 actions aujourd'hui", y, '📋');
    
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');
    
    normalPlan.actions.slice(0, 3).forEach((action) => {
      addCheckbox(doc, MARGIN, y);
      const lines = doc.splitTextToSize(action, CONTENT_WIDTH - 10);
      doc.text(lines[0], MARGIN + 6, y);
      y += 5;
    });
    y += 3;
  }

  // === PLAN 7 JOURS COMPACT ===
  const weekPlan = pathology.sevenDayPlans?.[0];
  if (weekPlan && weekPlan.days) {
    y = addSection(doc, 'Plan 7 jours — ' + weekPlan.levelName.split('—')[0].trim(), y, '📅');
    
    doc.setFontSize(8);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');

    const colWidth = (CONTENT_WIDTH - 4) / 2;
    let col1Y = y;
    let col2Y = y;

    weekPlan.days.forEach((day, index) => {
      const isCol1 = index < 4;
      const currentY = isCol1 ? col1Y : col2Y;
      const xOffset = isCol1 ? 0 : colWidth + 4;
      
      addCheckbox(doc, MARGIN + xOffset, currentY, 2.5);
      const dayText = `${day.day}: ${day.actions[0]}`;
      const lines = doc.splitTextToSize(dayText, colWidth - 6);
      doc.text(lines[0], MARGIN + xOffset + 4, currentY);
      
      if (isCol1) col1Y += 5;
      else col2Y += 5;
    });
    
    y = Math.max(col1Y, col2Y) + 3;
  }

  // === TOP 5 CONSEILS ===
  y = addSection(doc, 'Mes 5 conseils', y, '💡');
  
  doc.setFontSize(8);
  doc.setTextColor(...TEXT);
  doc.setFont('helvetica', 'normal');

  pathology.top5Tips.slice(0, 5).forEach((tip) => {
    doc.text(`${tip.icon} ${tip.title}`, MARGIN, y);
    y += 4;
  });
  y += 3;

  // === RED FLAGS ===
  addBox(doc, MARGIN, y, CONTENT_WIDTH, 28, [255, 245, 245]);
  
  doc.setFontSize(10);
  doc.setTextColor(...DANGER);
  doc.setFont('helvetica', 'bold');
  doc.text('⚠️ CONSULTEZ RAPIDEMENT SI :', MARGIN + 3, y + 5);
  
  doc.setFontSize(8);
  doc.setTextColor(...TEXT);
  doc.setFont('helvetica', 'normal');
  
  let alertY = y + 10;
  pathology.alertSigns.slice(0, 4).forEach((sign) => {
    const lines = doc.splitTextToSize(`• ${sign}`, CONTENT_WIDTH - 8);
    doc.text(lines[0], MARGIN + 3, alertY);
    alertY += 4;
  });

  addFooter(doc);

  return doc;
};

// ============================================
// PDF 4 PAGES — GUIDE COMPLET (Standard guide-tabac)
// ============================================
// 1 colonne, police lisible (11-12pt), cartes, aéré
// ============================================

export const generateFourPages = (pathology: PathologyContent): jsPDF => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const SAFE_BOTTOM = PAGE_HEIGHT - 20; // Zone sûre avant pied de page

  // Helpers locaux pour le nouveau style
  const newPage = (pageNum: number): number => {
    doc.addPage();
    addBrandHeader(doc, pathology.title, pageNum, 4);
    addFooter(doc);
    return 16;
  };

  const sectionTitle = (title: string, yPos: number): number => {
    doc.setFontSize(14);
    doc.setTextColor(...PRIMARY);
    doc.setFont('helvetica', 'bold');
    doc.text(title, MARGIN, yPos);
    // Ligne de séparation sous le titre
    doc.setDrawColor(220, 225, 230);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, yPos + 2, PAGE_WIDTH - MARGIN, yPos + 2);
    return yPos + 8;
  };

  const cardStart = (yPos: number, height: number, bgColor: [number, number, number] = BOX_BG): number => {
    doc.setFillColor(...bgColor);
    doc.setDrawColor(210, 215, 220);
    doc.setLineWidth(0.3);
    doc.roundedRect(MARGIN, yPos, CONTENT_WIDTH, height, 3, 3, 'FD');
    return yPos;
  };

  const bodyText = (text: string, x: number, yPos: number, maxWidth?: number): number => {
    doc.setFontSize(11);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, maxWidth || CONTENT_WIDTH - 8);
    doc.text(lines, x, yPos);
    return yPos + lines.length * 5;
  };

  const bulletItem = (text: string, yPos: number, indent: number = 4): number => {
    doc.setFontSize(11);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent - 8);
    doc.text('•', MARGIN + indent, yPos);
    doc.text(lines, MARGIN + indent + 5, yPos);
    return yPos + lines.length * 5 + 1;
  };

  const checkItem = (text: string, yPos: number, indent: number = 4): number => {
    addCheckbox(doc, MARGIN + indent, yPos, 4);
    doc.setFontSize(11);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent - 14);
    doc.text(lines, MARGIN + indent + 7, yPos);
    return yPos + lines.length * 5 + 1.5;
  };

  // ========== PAGE 1 — Comprendre + Conseils ==========
  let y = 16;
  addBrandHeader(doc, pathology.title, 1, 4);

  // Titre principal
  doc.setFontSize(20);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(pathology.title, CONTENT_WIDTH);
  doc.text(titleLines, MARGIN, y);
  y += titleLines.length * 8 + 2;

  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'normal');
  doc.text(`Guide complet — Mis à jour : ${pathology.lastUpdated}`, MARGIN, y);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...PRIMARY);
  doc.text('COOLANCE — Dr Audric Bugnard', PAGE_WIDTH - MARGIN - 65, y);
  y += 10;

  // Séparateur vert
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(1);
  doc.line(MARGIN, y - 4, PAGE_WIDTH - MARGIN, y - 4);

  // En résumé
  y = sectionTitle('📖 En résumé', y);
  const summaryClean = pathology.quickSummary.replace(/\n\n/g, ' ').replace(/\n/g, ' ');
  const summaryLines = doc.splitTextToSize(summaryClean, CONTENT_WIDTH - 8);
  const summaryHeight = Math.min(summaryLines.length, 6) * 5 + 6;
  cardStart(y, summaryHeight);
  doc.setFontSize(11);
  doc.setTextColor(...TEXT);
  doc.setFont('helvetica', 'normal');
  doc.text(summaryLines.slice(0, 6), MARGIN + 4, y + 5);
  y += summaryHeight + 6;

  // Messages clés (top 5 tips)
  if (y < SAFE_BOTTOM - 40) {
    y = sectionTitle('💡 Messages clés', y);
    const tipsToShow = pathology.top5Tips.slice(0, 4);
    const tipHeight = tipsToShow.length * 12 + 4;
    cardStart(y, tipHeight, [254, 252, 232]); // Fond jaune pâle comme card-warning
    let tipY = y + 5;
    tipsToShow.forEach((tip) => {
      doc.setFontSize(11);
      doc.setTextColor(...TEXT);
      doc.setFont('helvetica', 'normal');
      const tipText = `${tip.icon} ${tip.title}`;
      const tipLines = doc.splitTextToSize(tipText, CONTENT_WIDTH - 10);
      doc.text(tipLines[0], MARGIN + 4, tipY);
      tipY += 5;
      if (tip.description) {
        doc.setFontSize(10);
        doc.setTextColor(...MUTED);
        const descLines = doc.splitTextToSize(tip.description, CONTENT_WIDTH - 14);
        doc.text(descLines[0], MARGIN + 8, tipY);
        tipY += 5.5;
      }
    });
    y += tipHeight + 6;
  }

  // Plan d'action aujourd'hui
  if (y < SAFE_BOTTOM - 30) {
    y = sectionTitle("✅ Plan d'action", y);
    const normalPlan = pathology.dailyPlans?.find(p => p.level === 1) || pathology.dailyPlans?.[0];
    if (normalPlan?.actions) {
      const actionsToShow = normalPlan.actions.slice(0, 5);
      const actionHeight = actionsToShow.length * 7 + 4;
      cardStart(y, actionHeight, [240, 253, 244]); // Fond vert pâle comme card-action
      let actionY = y + 5;
      actionsToShow.forEach((action) => {
        actionY = checkItem(action, actionY, 4);
      });
      y += actionHeight + 4;
    }
  }

  addFooter(doc);

  // ========== PAGE 2 — Plan 7 jours ==========
  y = newPage(2);

  y = sectionTitle('📅 Plan 7 jours', y);

  // Encadré Niveau 0 (très facile)
  const week0 = pathology.sevenDayPlans?.find(p => p.level === 0);
  if (week0?.days) {
    const dayHeight = week0.days.length * 7 + 12;
    cardStart(y, dayHeight, LEVEL0_BG);

    doc.setFontSize(12);
    doc.setTextColor(...SUCCESS);
    doc.setFont('helvetica', 'bold');
    doc.text('Niveau 0 — Très facile', MARGIN + 4, y + 6);

    doc.setFontSize(10);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'italic');
    doc.text('Pour commencer en douceur, même si vous avez mal.', MARGIN + 4, y + 12);

    let dayY = y + 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    week0.days.forEach((day) => {
      addCheckbox(doc, MARGIN + 4, dayY, 3.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...SUCCESS);
      doc.text(`${day.day}`, MARGIN + 10, dayY);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXT);
      const actionText = day.actions.slice(0, 2).join(' • ');
      const lines = doc.splitTextToSize(actionText, CONTENT_WIDTH - 40);
      doc.text(lines[0], MARGIN + 28, dayY);
      dayY += 7;
    });
    y += dayHeight + 6;
  }

  // Niveau 1 (facile)
  const week1 = pathology.sevenDayPlans?.find(p => p.level === 1);
  if (week1?.days && y < SAFE_BOTTOM - 50) {
    y = sectionTitle('Niveau 1 — ' + (week1.levelName.split('—')[1]?.trim() || 'Progression'), y);

    week1.days.forEach((day) => {
      if (y > SAFE_BOTTOM - 10) return;
      addCheckbox(doc, MARGIN, y, 3.5);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...PRIMARY);
      doc.text(`${day.day}`, MARGIN + 6, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...TEXT);
      const actionText = day.actions.slice(0, 2).join(' • ');
      const lines = doc.splitTextToSize(actionText, CONTENT_WIDTH - 36);
      doc.text(lines[0], MARGIN + 24, y);
      y += 7;
    });
    y += 4;
  }

  // Note niveaux supérieurs
  const week2 = pathology.sevenDayPlans?.find(p => p.level === 2);
  const week3 = pathology.sevenDayPlans?.find(p => p.level === 3);
  if ((week2 || week3) && y < SAFE_BOTTOM - 15) {
    doc.setFontSize(10);
    doc.setTextColor(...MUTED);
    doc.setFont('helvetica', 'italic');
    let noteText = 'Niveaux supérieurs disponibles sur coolance.fr';
    if (week2) noteText = `Niveau 2 : ${week2.levelName.split('—')[1]?.trim() || 'Normal'} • ${noteText}`;
    doc.text(noteText, MARGIN, y);
    y += 8;
  }

  // ========== PAGE 3 — Programme + Nutrition ==========
  y = newPage(3);

  y = sectionTitle('📈 Programme de progression', y);

  pathology.eightWeekPrograms.slice(0, 2).forEach((program) => {
    if (y > SAFE_BOTTOM - 30) return;

    const isLevel0 = program.level === 0;
    const bgColor: [number, number, number] = isLevel0 ? LEVEL0_BG : BOX_BG;

    doc.setFontSize(12);
    doc.setTextColor(isLevel0 ? SUCCESS[0] : PRIMARY[0], isLevel0 ? SUCCESS[1] : PRIMARY[1], isLevel0 ? SUCCESS[2] : PRIMARY[2]);
    doc.setFont('helvetica', 'bold');
    const levelTitle = `Niveau ${program.level} — ${program.levelName.split('—')[1]?.trim() || ''}`;
    doc.text(levelTitle, MARGIN, y);
    y += 7;

    program.weeks.forEach((week) => {
      if (y > SAFE_BOTTOM - 12) return;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...TEXT);
      doc.text(week.week, MARGIN + 2, y);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...MUTED);
      doc.text(`— ${week.focus}`, MARGIN + 30, y);
      y += 5;

      doc.setTextColor(...TEXT);
      doc.setFontSize(10);
      week.exercises.slice(0, 2).forEach((ex) => {
        if (y > SAFE_BOTTOM - 6) return;
        addCheckbox(doc, MARGIN + 4, y, 3);
        const exLines = doc.splitTextToSize(ex, CONTENT_WIDTH - 16);
        doc.text(exLines[0], MARGIN + 10, y);
        y += 5;
      });
      y += 2;
    });
    y += 6;
  });

  // Nutrition
  if (y < SAFE_BOTTOM - 40) {
    y = sectionTitle('🍽️ Nutrition', y);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...TEXT);
    doc.text("L'assiette idéale :", MARGIN, y);
    y += 6;

    pathology.nutrition.idealPlate.slice(0, 4).forEach((item) => {
      if (y > SAFE_BOTTOM - 6) return;
      y = bulletItem(item, y);
    });
    y += 3;

    if (y < SAFE_BOTTOM - 20 && pathology.nutrition.tips.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('Conseils pratiques :', MARGIN, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      pathology.nutrition.tips.slice(0, 3).forEach((tip) => {
        if (y > SAFE_BOTTOM - 6) return;
        y = bulletItem(tip, y);
      });
    }
  }

  // ========== PAGE 4 — Crise + Red flags + Sources ==========
  y = newPage(4);

  // Protocole de crise
  if (pathology.flareProtocol) {
    y = sectionTitle('🔥 En cas de crise', y);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...TEXT);
    doc.text('Premières 24h :', MARGIN, y);
    y += 6;

    pathology.flareProtocol.hours0to24.slice(0, 4).forEach((action) => {
      y = bulletItem(action, y);
    });
    y += 3;

    if (pathology.flareProtocol.hours24to48.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('24-48h :', MARGIN, y);
      y += 6;
      doc.setFont('helvetica', 'normal');
      pathology.flareProtocol.hours24to48.slice(0, 3).forEach((action) => {
        y = bulletItem(action, y);
      });
      y += 3;
    }

    if (pathology.flareProtocol.resumeActivity) {
      doc.setFontSize(10);
      doc.setTextColor(...SUCCESS);
      doc.setFont('helvetica', 'italic');
      doc.text(`→ ${pathology.flareProtocol.resumeActivity}`, MARGIN, y);
      y += 8;
    }
  }

  // Red flags
  y = sectionTitle('⚠️ Consultez rapidement si', y);
  const alertHeight = pathology.alertSigns.length * 7 + 6;
  cardStart(y, Math.min(alertHeight, 50), [255, 243, 243]); // Fond rouge pâle

  doc.setFontSize(11);
  doc.setTextColor(...DANGER);
  doc.setFont('helvetica', 'normal');
  let alertY2 = y + 5;
  pathology.alertSigns.slice(0, 6).forEach((sign) => {
    const lines = doc.splitTextToSize(`⚠ ${sign}`, CONTENT_WIDTH - 10);
    doc.text(lines[0], MARGIN + 4, alertY2);
    alertY2 += 6;
  });
  y += Math.min(alertHeight, 50) + 4;

  // Urgence
  doc.setFontSize(11);
  doc.setTextColor(...DANGER);
  doc.setFont('helvetica', 'bold');
  doc.text('En cas de doute ou d\'urgence : appelez le 15 ou le 112.', MARGIN, y);
  y += 10;

  // Citation / message
  if (y < SAFE_BOTTOM - 30) {
    cardStart(y, 16, [254, 249, 195]); // Fond jaune chaleureux
    doc.setFontSize(10);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'italic');
    doc.text('« Même 5 minutes par jour, c\'est un grand pas. Votre corps vous remerciera. »', MARGIN + 4, y + 6);
    doc.setFont('helvetica', 'bold');
    doc.text('— Dr Audric Bugnard', MARGIN + 4, y + 12);
    y += 22;
  }

  // Sources
  y = sectionTitle('📚 Sources et références', y);
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'normal');
  doc.text('Ces fiches s\'appuient sur des recommandations de sociétés savantes et guidelines internationales.', MARGIN, y);
  y += 5;
  pathology.sources.slice(0, 8).forEach((source) => {
    if (y > SAFE_BOTTOM - 4) return;
    doc.text(`• ${source.name} (${source.year})`, MARGIN + 2, y);
    y += 4;
  });

  y += 4;
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'italic');
  doc.text(`Dernière mise à jour : ${pathology.lastUpdated}`, MARGIN, y);

  addFooter(doc);

  return doc;
};

// ============================================
// HELPERS EXPORT
// ============================================

export const downloadPdf = (doc: jsPDF, filename: string) => {
  doc.save(filename);
};
