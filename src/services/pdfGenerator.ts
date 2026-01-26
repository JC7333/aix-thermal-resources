import jsPDF from 'jspdf';
import { Pathology, categoryLabels, levelLabels } from '@/data/pathologies';

// Configurable margins and fonts for readability
const MARGIN_LEFT = 15;
const MARGIN_TOP = 20;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN_LEFT;

// Font sizes (large for senior accessibility)
const TITLE_SIZE = 18;
const SECTION_SIZE = 13;
const TEXT_SIZE = 11;
const SMALL_SIZE = 9;

// Colors (HSL converted to RGB)
const PRIMARY_COLOR: [number, number, number] = [42, 106, 115]; // Thermal blue
const TEXT_COLOR: [number, number, number] = [30, 40, 50];
const MUTED_COLOR: [number, number, number] = [100, 110, 120];
const DANGER_COLOR: [number, number, number] = [180, 50, 50];

// Helper to add page header
const addHeader = (doc: jsPDF, title: string, pageNum: number, totalPages?: number) => {
  doc.setFontSize(8);
  doc.setTextColor(...MUTED_COLOR);
  doc.text('COOLANCE — par le Dr Audric Bugnard', MARGIN_LEFT, 10);
  if (totalPages) {
    doc.text(`Page ${pageNum}/${totalPages}`, PAGE_WIDTH - MARGIN_LEFT - 20, 10);
  }
};

// Helper to add footer
const addFooter = (doc: jsPDF) => {
  const footerY = PAGE_HEIGHT - 10;
  doc.setFontSize(7);
  doc.setTextColor(...MUTED_COLOR);
  doc.text('Informations générales — ne remplace pas une consultation. Urgence : 15 / 112.', MARGIN_LEFT, footerY);
  doc.text('coolance.fr', PAGE_WIDTH - MARGIN_LEFT - 20, footerY);
};

// Helper to add checkbox
const addCheckbox = (doc: jsPDF, x: number, y: number, size: number = 3) => {
  doc.setDrawColor(100, 100, 100);
  doc.setLineWidth(0.3);
  doc.rect(x, y - size, size, size);
};

// Generate 1-page PDF: Checklist + Plan du jour + Plan 7 jours + Red flags
export const generateOnePage = (pathology: Pathology): jsPDF => {
  const doc = new jsPDF('p', 'mm', 'a4');
  let y = MARGIN_TOP;

  addHeader(doc, pathology.name, 1);

  // Title
  doc.setFontSize(TITLE_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text(pathology.name, MARGIN_LEFT, y);
  y += 6;

  // Subtitle
  doc.setFontSize(TEXT_SIZE);
  doc.setTextColor(...MUTED_COLOR);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fiche pratique — ${pathology.lastUpdated}`, MARGIN_LEFT, y);
  y += 10;

  // Quick Summary (condensed)
  doc.setFontSize(TEXT_SIZE);
  doc.setTextColor(...TEXT_COLOR);
  const summaryLines = doc.splitTextToSize(
    pathology.quickSummary.replace(/\n\n/g, ' ').substring(0, 300) + '...',
    CONTENT_WIDTH
  );
  doc.text(summaryLines.slice(0, 3), MARGIN_LEFT, y);
  y += summaryLines.slice(0, 3).length * 5 + 6;

  // Plan du jour - Version très facile
  if (pathology.dailyPlans && pathology.dailyPlans.length > 0) {
    const easyPlan = pathology.dailyPlans[0];
    
    doc.setFontSize(SECTION_SIZE);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text('✓ Plan du jour — ' + easyPlan.levelName, MARGIN_LEFT, y);
    y += 7;

    doc.setFontSize(TEXT_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    doc.setFont('helvetica', 'normal');
    
    easyPlan.actions.forEach((action, i) => {
      addCheckbox(doc, MARGIN_LEFT, y);
      const actionLines = doc.splitTextToSize(action, CONTENT_WIDTH - 8);
      doc.text(actionLines[0], MARGIN_LEFT + 6, y);
      y += 6;
    });
    y += 4;
  }

  // Plan 7 jours - Version très facile (compact)
  if (pathology.sevenDayPlans && pathology.sevenDayPlans.length > 0) {
    const easyWeek = pathology.sevenDayPlans[0];
    
    doc.setFontSize(SECTION_SIZE);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text('📅 Plan 7 jours — ' + easyWeek.levelName, MARGIN_LEFT, y);
    y += 7;

    doc.setFontSize(SMALL_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    doc.setFont('helvetica', 'normal');

    // Show as compact table-like format
    easyWeek.days.forEach((day) => {
      addCheckbox(doc, MARGIN_LEFT, y);
      const dayText = `${day.day}: ${day.actions.join(' • ')}`;
      const dayLines = doc.splitTextToSize(dayText, CONTENT_WIDTH - 8);
      doc.text(dayLines[0], MARGIN_LEFT + 6, y);
      y += 5;
    });
    y += 6;
  }

  // Top 5 conseils (compact)
  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('💡 Mes 5 conseils essentiels', MARGIN_LEFT, y);
  y += 6;

  doc.setFontSize(SMALL_SIZE);
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'normal');

  pathology.top5NonMedical.slice(0, 5).forEach((tip, i) => {
    const tipText = `${tip.icon} ${tip.title}`;
    doc.text(tipText, MARGIN_LEFT, y);
    y += 4.5;
  });
  y += 4;

  // Red flags
  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...DANGER_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('⚠️ Consultez rapidement si :', MARGIN_LEFT, y);
  y += 6;

  doc.setFontSize(SMALL_SIZE);
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'normal');

  pathology.alertSigns.slice(0, 5).forEach((sign) => {
    const signLines = doc.splitTextToSize(`• ${sign}`, CONTENT_WIDTH - 4);
    doc.text(signLines[0], MARGIN_LEFT + 2, y);
    y += 4.5;
  });

  addFooter(doc);

  return doc;
};

// Generate 4-page PDF: Explication + Programme 8 semaines + Nutrition
export const generateFourPages = (pathology: Pathology): jsPDF => {
  const doc = new jsPDF('p', 'mm', 'a4');
  let y = MARGIN_TOP;

  // ========== PAGE 1: Comprendre ==========
  addHeader(doc, pathology.name, 1, 4);

  // Title
  doc.setFontSize(TITLE_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text(pathology.name, MARGIN_LEFT, y);
  y += 6;

  doc.setFontSize(TEXT_SIZE);
  doc.setTextColor(...MUTED_COLOR);
  doc.setFont('helvetica', 'normal');
  doc.text('Guide complet — ' + pathology.lastUpdated, MARGIN_LEFT, y);
  y += 12;

  // Quick Summary
  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('En résumé', MARGIN_LEFT, y);
  y += 7;

  doc.setFontSize(TEXT_SIZE);
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'normal');
  const summaryLines = doc.splitTextToSize(pathology.quickSummary.replace(/\n\n/g, '\n'), CONTENT_WIDTH);
  doc.text(summaryLines, MARGIN_LEFT, y);
  y += summaryLines.length * 5 + 8;

  // Physiopathology
  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('Comprendre ce qui se passe', MARGIN_LEFT, y);
  y += 7;

  doc.setFontSize(TEXT_SIZE);
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'normal');
  const physioLines = doc.splitTextToSize(pathology.physiopathology.replace(/\n\n/g, '\n'), CONTENT_WIDTH);
  doc.text(physioLines, MARGIN_LEFT, y);
  y += physioLines.length * 5 + 8;

  // Top 5
  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('Mes 5 conseils essentiels', MARGIN_LEFT, y);
  y += 7;

  doc.setFontSize(TEXT_SIZE);
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'normal');

  pathology.top5NonMedical.forEach((tip) => {
    doc.setFont('helvetica', 'bold');
    doc.text(`${tip.icon} ${tip.title}`, MARGIN_LEFT, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const descLines = doc.splitTextToSize(tip.description, CONTENT_WIDTH - 4);
    doc.text(descLines, MARGIN_LEFT + 4, y);
    y += descLines.length * 4.5 + 3;
  });

  addFooter(doc);

  // ========== PAGE 2: Plan 7 jours ==========
  doc.addPage();
  y = MARGIN_TOP;
  addHeader(doc, pathology.name, 2, 4);

  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('📅 Plan 7 jours', MARGIN_LEFT, y);
  y += 10;

  // Show 2 levels
  pathology.sevenDayPlans.slice(0, 2).forEach((plan) => {
    doc.setFontSize(TEXT_SIZE);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text(plan.levelName, MARGIN_LEFT, y);
    y += 6;

    doc.setFontSize(SMALL_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    doc.setFont('helvetica', 'normal');

    plan.days.forEach((day) => {
      addCheckbox(doc, MARGIN_LEFT, y);
      const dayText = `${day.day}: ${day.actions.join(' • ')}`;
      const dayLines = doc.splitTextToSize(dayText, CONTENT_WIDTH - 8);
      doc.text(dayLines[0], MARGIN_LEFT + 6, y);
      if (dayLines[1]) {
        y += 4;
        doc.text(dayLines[1], MARGIN_LEFT + 6, y);
      }
      y += 5;
    });
    y += 8;
  });

  addFooter(doc);

  // ========== PAGE 3: Programme 8 semaines ==========
  doc.addPage();
  y = MARGIN_TOP;
  addHeader(doc, pathology.name, 3, 4);

  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('📈 Programme 8 semaines', MARGIN_LEFT, y);
  y += 10;

  // Show 2 levels
  pathology.eightWeekPrograms.slice(0, 2).forEach((program) => {
    doc.setFontSize(TEXT_SIZE);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text(program.levelName, MARGIN_LEFT, y);
    y += 7;

    doc.setFontSize(SMALL_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    doc.setFont('helvetica', 'normal');

    program.weeks.forEach((week) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${week.week} — ${week.focus}`, MARGIN_LEFT, y);
      y += 5;
      doc.setFont('helvetica', 'normal');
      
      week.exercises.forEach((ex) => {
        addCheckbox(doc, MARGIN_LEFT + 2, y);
        const exLines = doc.splitTextToSize(ex, CONTENT_WIDTH - 12);
        doc.text(exLines[0], MARGIN_LEFT + 8, y);
        y += 4.5;
      });
      y += 3;
    });
    y += 6;
  });

  addFooter(doc);

  // ========== PAGE 4: Nutrition + Red flags ==========
  doc.addPage();
  y = MARGIN_TOP;
  addHeader(doc, pathology.name, 4, 4);

  // Nutrition
  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...PRIMARY_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('🍽️ Nutrition facile', MARGIN_LEFT, y);
  y += 8;

  doc.setFontSize(TEXT_SIZE);
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('L\'assiette idéale :', MARGIN_LEFT, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  pathology.nutrition.idealPlate.forEach((item) => {
    const itemLines = doc.splitTextToSize(`• ${item}`, CONTENT_WIDTH - 4);
    doc.text(itemLines, MARGIN_LEFT + 2, y);
    y += itemLines.length * 4.5;
  });
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.text('Mes conseils :', MARGIN_LEFT, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  pathology.nutrition.tips.forEach((tip) => {
    const tipLines = doc.splitTextToSize(`• ${tip}`, CONTENT_WIDTH - 4);
    doc.text(tipLines, MARGIN_LEFT + 2, y);
    y += tipLines.length * 4.5;
  });
  y += 10;

  // Flare protocol if exists
  if (pathology.flareProtocol) {
    doc.setFontSize(SECTION_SIZE);
    doc.setTextColor(...PRIMARY_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text('🔥 ' + pathology.flareProtocol.title, MARGIN_LEFT, y);
    y += 7;

    doc.setFontSize(SMALL_SIZE);
    doc.setTextColor(...TEXT_COLOR);
    doc.setFont('helvetica', 'bold');
    doc.text('Premières 24h :', MARGIN_LEFT, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    pathology.flareProtocol.hours0to24.slice(0, 3).forEach((action) => {
      const actionLines = doc.splitTextToSize(`• ${action}`, CONTENT_WIDTH - 4);
      doc.text(actionLines[0], MARGIN_LEFT + 2, y);
      y += 4.5;
    });
    y += 6;
  }

  // Red flags
  doc.setFontSize(SECTION_SIZE);
  doc.setTextColor(...DANGER_COLOR);
  doc.setFont('helvetica', 'bold');
  doc.text('⚠️ Consultez rapidement si :', MARGIN_LEFT, y);
  y += 7;

  doc.setFontSize(TEXT_SIZE);
  doc.setTextColor(...TEXT_COLOR);
  doc.setFont('helvetica', 'normal');

  pathology.alertSigns.forEach((sign) => {
    const signLines = doc.splitTextToSize(`• ${sign}`, CONTENT_WIDTH - 4);
    doc.text(signLines, MARGIN_LEFT + 2, y);
    y += signLines.length * 4.5 + 1;
  });
  y += 8;

  // Sources
  doc.setFontSize(SMALL_SIZE);
  doc.setTextColor(...MUTED_COLOR);
  doc.setFont('helvetica', 'italic');
  doc.text('Sources :', MARGIN_LEFT, y);
  y += 4;
  pathology.sources.forEach((source) => {
    doc.text(`• ${source.name} (${source.year})`, MARGIN_LEFT + 2, y);
    y += 4;
  });

  addFooter(doc);

  return doc;
};

// Download helper
export const downloadPdf = (doc: jsPDF, filename: string) => {
  doc.save(filename);
};

// Get pathology by slug
export const getPathologyBySlug = (slug: string, pathologies: Pathology[]): Pathology | undefined => {
  return pathologies.find(p => p.slug === slug);
};
