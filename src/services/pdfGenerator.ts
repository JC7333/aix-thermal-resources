import jsPDF from 'jspdf';
import { Pathology } from '@/data/pathologies';

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
  
  // Ligne séparatrice fine
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, 10, PAGE_WIDTH - MARGIN, 10);
};

const addFooter = (doc: jsPDF) => {
  const y = PAGE_HEIGHT - 8;
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'italic');
  doc.text('Informations générales — ne remplace pas une consultation. Urgence : 15 / 112.', MARGIN, y);
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

export const generateOnePage = (pathology: Pathology): jsPDF => {
  const doc = new jsPDF('p', 'mm', 'a4');
  let y = 16;

  addBrandHeader(doc, pathology.name);

  // === TITRE ===
  doc.setFontSize(16);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'bold');
  doc.text(pathology.name.toUpperCase(), MARGIN, y);
  y += 5;
  
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fiche pratique — ${pathology.lastUpdated}`, MARGIN, y);
  y += 7;

  // === ENCADRÉ NIVEAU 0 ===
  const level0Box = pathology.dailyPlans?.find(p => p.level === 0);
  if (level0Box) {
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
  if (normalPlan && normalPlan.level !== 0) {
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
  if (weekPlan) {
    y = addSection(doc, 'Plan 7 jours — ' + weekPlan.levelName.split('—')[0].trim(), y, '📅');
    
    doc.setFontSize(8);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');

    // 2 colonnes pour gagner de la place
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
      
      if (isCol1) {
        col1Y += 5;
      } else {
        col2Y += 5;
      }
    });
    
    y = Math.max(col1Y, col2Y) + 3;
  }

  // === TOP 5 CONSEILS (très compact) ===
  y = addSection(doc, 'Mes 5 conseils', y, '💡');
  
  doc.setFontSize(8);
  doc.setTextColor(...TEXT);
  doc.setFont('helvetica', 'normal');

  pathology.top5NonMedical.slice(0, 5).forEach((tip) => {
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
// PDF 4 PAGES — GUIDE COMPLET STRUCTURÉ
// ============================================

export const generateFourPages = (pathology: Pathology): jsPDF => {
  const doc = new jsPDF('p', 'mm', 'a4');
  let y = 16;

  // ========== PAGE 1: COMPRENDRE + CONSEILS ==========
  addBrandHeader(doc, pathology.name, 1, 4);

  // Titre principal
  doc.setFontSize(18);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'bold');
  doc.text(pathology.name.toUpperCase(), MARGIN, y);
  y += 5;
  
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'normal');
  doc.text(`Guide complet — ${pathology.lastUpdated}`, MARGIN, y);
  y += 10;

  // === ENCADRÉ NIVEAU 0 ===
  const level0Plan = pathology.dailyPlans?.find(p => p.level === 0);
  if (level0Plan) {
    addBox(doc, MARGIN, y, CONTENT_WIDTH, 30, LEVEL0_BG);
    
    doc.setFontSize(11);
    doc.setTextColor(...SUCCESS);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ VERSION TRÈS FACILE (Niveau 0)', MARGIN + 4, y + 6);
    
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'italic');
    doc.text('Pour commencer doucement, en cas de douleur ou fatigue importante.', MARGIN + 4, y + 12);
    
    doc.setFont('helvetica', 'normal');
    let boxY = y + 18;
    level0Plan.actions.forEach((action) => {
      addCheckbox(doc, MARGIN + 4, boxY);
      const lines = doc.splitTextToSize(action, CONTENT_WIDTH - 16);
      doc.text(lines[0], MARGIN + 10, boxY);
      boxY += 5;
    });
    y += 34;
  }

  // === EN RÉSUMÉ ===
  y = addSection(doc, 'En résumé', y, '📖');
  
  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.setFont('helvetica', 'normal');
  
  const summaryClean = pathology.quickSummary.replace(/\n\n/g, ' ').replace(/\n/g, ' ');
  const summaryLines = doc.splitTextToSize(summaryClean, CONTENT_WIDTH);
  doc.text(summaryLines.slice(0, 6), MARGIN, y);
  y += Math.min(summaryLines.length, 6) * 4.5 + 6;

  // === CE QUI SE PASSE ===
  y = addSection(doc, 'Ce qui se passe dans votre corps', y, '🔍');
  
  const physioClean = pathology.physiopathology.replace(/\n\n/g, ' ').replace(/\n/g, ' ');
  const physioLines = doc.splitTextToSize(physioClean, CONTENT_WIDTH);
  doc.text(physioLines.slice(0, 5), MARGIN, y);
  y += Math.min(physioLines.length, 5) * 4.5 + 6;

  // === TOP 5 CONSEILS ===
  y = addSection(doc, 'Mes 5 conseils essentiels', y, '💡');
  
  pathology.top5NonMedical.forEach((tip) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...TEXT);
    doc.text(`${tip.icon} ${tip.title}`, MARGIN, y);
    y += 4;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...MUTED);
    const tipLines = doc.splitTextToSize(tip.description, CONTENT_WIDTH - 4);
    doc.text(tipLines.slice(0, 2), MARGIN + 4, y);
    y += tipLines.slice(0, 2).length * 4 + 3;
  });

  addFooter(doc);

  // ========== PAGE 2: PLAN 7 JOURS (Niveaux 0 & 1) ==========
  doc.addPage();
  y = 16;
  addBrandHeader(doc, pathology.name, 2, 4);

  doc.setFontSize(14);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'bold');
  doc.text('📅 PLAN 7 JOURS', MARGIN, y);
  y += 8;

  // Niveau 0
  const week0 = pathology.sevenDayPlans.find(p => p.level === 0);
  if (week0) {
    addBox(doc, MARGIN, y, CONTENT_WIDTH, 50, LEVEL0_BG);
    
    doc.setFontSize(11);
    doc.setTextColor(...SUCCESS);
    doc.setFont('helvetica', 'bold');
    doc.text('NIVEAU 0 — ' + week0.levelName.split('—')[1]?.trim() || 'Très facile', MARGIN + 4, y + 6);
    
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');
    
    let dayY = y + 12;
    week0.days.forEach((day) => {
      addCheckbox(doc, MARGIN + 4, dayY, 3);
      doc.setFont('helvetica', 'bold');
      doc.text(`${day.day}:`, MARGIN + 9, dayY);
      doc.setFont('helvetica', 'normal');
      const actionText = day.actions.slice(0, 2).join(' • ');
      const lines = doc.splitTextToSize(actionText, CONTENT_WIDTH - 30);
      doc.text(lines[0], MARGIN + 25, dayY);
      dayY += 5;
    });
    y += 54;
  }

  // Niveau 1
  const week1 = pathology.sevenDayPlans.find(p => p.level === 1);
  if (week1) {
    doc.setFontSize(11);
    doc.setTextColor(...PRIMARY);
    doc.setFont('helvetica', 'bold');
    doc.text('NIVEAU 1 — ' + (week1.levelName.split('—')[1]?.trim() || 'Facile'), MARGIN, y);
    y += 6;
    
    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'normal');
    
    week1.days.forEach((day) => {
      addCheckbox(doc, MARGIN, y, 3);
      doc.setFont('helvetica', 'bold');
      doc.text(`${day.day}:`, MARGIN + 5, y);
      doc.setFont('helvetica', 'normal');
      const actionText = day.actions.slice(0, 2).join(' • ');
      const lines = doc.splitTextToSize(actionText, CONTENT_WIDTH - 26);
      doc.text(lines[0], MARGIN + 21, y);
      y += 5;
    });
    y += 6;
  }

  // Niveaux 2 & 3 (résumé)
  const week2 = pathology.sevenDayPlans.find(p => p.level === 2);
  const week3 = pathology.sevenDayPlans.find(p => p.level === 3);
  
  if (week2 || week3) {
    doc.setFontSize(10);
    doc.setTextColor(...PRIMARY);
    doc.setFont('helvetica', 'bold');
    doc.text('NIVEAUX SUPÉRIEURS (quand vous progressez)', MARGIN, y);
    y += 6;
    
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.setFont('helvetica', 'normal');
    
    if (week2) {
      doc.text(`• Niveau 2: ${week2.levelName.split('—')[1]?.trim() || 'Normal'}`, MARGIN, y);
      y += 4;
    }
    if (week3) {
      doc.text(`• Niveau 3: ${week3.levelName.split('—')[1]?.trim() || 'Actif'}`, MARGIN, y);
      y += 4;
    }
  }

  addFooter(doc);

  // ========== PAGE 3: PROGRAMME 8 SEMAINES ==========
  doc.addPage();
  y = 16;
  addBrandHeader(doc, pathology.name, 3, 4);

  doc.setFontSize(14);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'bold');
  doc.text('📈 PROGRAMME 8 SEMAINES', MARGIN, y);
  y += 8;

  // Afficher niveaux 0 et 1
  pathology.eightWeekPrograms.slice(0, 2).forEach((program, progIndex) => {
    const isLevel0 = program.level === 0;
    
    if (isLevel0) {
      addBox(doc, MARGIN, y, CONTENT_WIDTH, 50, LEVEL0_BG);
      doc.setFontSize(11);
      doc.setTextColor(...SUCCESS);
    } else {
      doc.setFontSize(11);
      doc.setTextColor(...PRIMARY);
    }
    
    doc.setFont('helvetica', 'bold');
    const levelTitle = `NIVEAU ${program.level} — ${program.levelName.split('—')[1]?.trim() || ''}`;
    doc.text(levelTitle, isLevel0 ? MARGIN + 4 : MARGIN, y + (isLevel0 ? 6 : 0));
    y += isLevel0 ? 12 : 7;

    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    
    program.weeks.forEach((week) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${week.week}`, isLevel0 ? MARGIN + 4 : MARGIN, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...MUTED);
      doc.text(`— ${week.focus}`, (isLevel0 ? MARGIN + 4 : MARGIN) + 25, y);
      y += 4;
      
      doc.setTextColor(...TEXT);
      week.exercises.slice(0, 2).forEach((ex) => {
        addCheckbox(doc, isLevel0 ? MARGIN + 6 : MARGIN + 2, y, 2.5);
        const exLines = doc.splitTextToSize(ex, CONTENT_WIDTH - 16);
        doc.text(exLines[0], (isLevel0 ? MARGIN + 6 : MARGIN + 2) + 5, y);
        y += 4;
      });
      y += 2;
    });
    
    y += isLevel0 ? 6 : 8;
  });

  // Mention niveaux 2-3
  if (pathology.eightWeekPrograms.length > 2) {
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.setFont('helvetica', 'italic');
    doc.text('→ Niveaux 2-3 disponibles sur coolance.fr pour les patients plus actifs.', MARGIN, y);
  }

  addFooter(doc);

  // ========== PAGE 4: NUTRITION + RED FLAGS ==========
  doc.addPage();
  y = 16;
  addBrandHeader(doc, pathology.name, 4, 4);

  // === NUTRITION ===
  doc.setFontSize(14);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'bold');
  doc.text('🍽️ NUTRITION FACILE', MARGIN, y);
  y += 8;

  doc.setFontSize(10);
  doc.setTextColor(...TEXT);
  doc.setFont('helvetica', 'bold');
  doc.text("L'assiette idéale :", MARGIN, y);
  y += 5;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  pathology.nutrition.idealPlate.forEach((item) => {
    const lines = doc.splitTextToSize(`• ${item}`, CONTENT_WIDTH - 4);
    doc.text(lines, MARGIN + 2, y);
    y += lines.length * 4;
  });
  y += 4;

  doc.setFont('helvetica', 'bold');
  doc.text('Mes conseils :', MARGIN, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  pathology.nutrition.tips.forEach((tip) => {
    const lines = doc.splitTextToSize(`• ${tip}`, CONTENT_WIDTH - 4);
    doc.text(lines, MARGIN + 2, y);
    y += lines.length * 4;
  });
  y += 8;

  // === PLAN POUSSÉE ===
  if (pathology.flareProtocol) {
    doc.setFontSize(12);
    doc.setTextColor(...PRIMARY);
    doc.setFont('helvetica', 'bold');
    doc.text('🔥 EN CAS DE CRISE', MARGIN, y);
    y += 6;

    doc.setFontSize(9);
    doc.setTextColor(...TEXT);
    doc.setFont('helvetica', 'bold');
    doc.text('Premières 24h :', MARGIN, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    pathology.flareProtocol.hours0to24.slice(0, 4).forEach((action) => {
      const lines = doc.splitTextToSize(`• ${action}`, CONTENT_WIDTH - 4);
      doc.text(lines[0], MARGIN + 2, y);
      y += 4;
    });
    y += 4;

    doc.setFont('helvetica', 'bold');
    doc.text('24-48h :', MARGIN, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    pathology.flareProtocol.hours24to48.slice(0, 3).forEach((action) => {
      const lines = doc.splitTextToSize(`• ${action}`, CONTENT_WIDTH - 4);
      doc.text(lines[0], MARGIN + 2, y);
      y += 4;
    });
    y += 6;
  }

  // === RED FLAGS ===
  addBox(doc, MARGIN, y, CONTENT_WIDTH, 36, [255, 245, 245]);
  
  doc.setFontSize(11);
  doc.setTextColor(...DANGER);
  doc.setFont('helvetica', 'bold');
  doc.text('⚠️ CONSULTEZ RAPIDEMENT SI :', MARGIN + 4, y + 6);
  
  doc.setFontSize(9);
  doc.setTextColor(...TEXT);
  doc.setFont('helvetica', 'normal');
  
  let alertY = y + 12;
  pathology.alertSigns.forEach((sign) => {
    const lines = doc.splitTextToSize(`• ${sign}`, CONTENT_WIDTH - 10);
    doc.text(lines[0], MARGIN + 4, alertY);
    alertY += 4;
  });
  y += 40;

  // === SOURCES ===
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.setFont('helvetica', 'italic');
  doc.text('Sources :', MARGIN, y);
  y += 4;
  
  pathology.sources.forEach((source) => {
    doc.text(`• ${source.name} (${source.year})`, MARGIN + 2, y);
    y += 3.5;
  });

  // Message final
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(...PRIMARY);
  doc.setFont('helvetica', 'italic');
  doc.text('Si vous avez un doute, on en parle en consultation. — Dr Audric Bugnard', MARGIN, y);

  addFooter(doc);

  return doc;
};

// ============================================
// HELPERS EXPORT
// ============================================

export const downloadPdf = (doc: jsPDF, filename: string) => {
  doc.save(filename);
};

export const getPathologyBySlug = (slug: string, pathologies: Pathology[]): Pathology | undefined => {
  return pathologies.find(p => p.slug === slug);
};
