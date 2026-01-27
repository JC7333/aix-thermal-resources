// ============================================
// PDF 1 PAGE — FICHE CONDENSÉE A4
// ============================================
// Tout tient sur une page : checklist, plan 7 jours compact, red flags
// Police senior-friendly, marges confort
// ============================================

import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, PDF_COLORS, PDF_FONT_FAMILY } from './PdfStyles';
import {
  PdfHeader,
  PdfSectionTitle,
  PdfLevel0Box,
  PdfTop5,
  PdfPlan7Jours,
  PdfRedFlags,
  PdfSources,
  PdfFooter,
  PdfImagePlaceholder,
} from './PdfComponents';
import type { PathologyContent } from '@/content/content';

interface Pdf1PageProps {
  pathology: PathologyContent;
}

export const Pdf1Page: React.FC<Pdf1PageProps> = ({ pathology }) => {
  // Extraire le plan niveau 0 s'il existe
  const level0DailyPlan = pathology.dailyPlans.find(p => p.level === 0);
  const level0SevenDayPlan = pathology.sevenDayPlans.find(p => p.level === 0);

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page1col}>
        {/* Header */}
        <PdfHeader 
          title={pathology.title}
          subtitle={pathology.shortDescription}
          date={pathology.lastUpdated}
          compact
        />

        {/* Version très facile (Niveau 0) */}
        {level0DailyPlan && level0DailyPlan.actions && (
          <PdfLevel0Box 
            items={level0DailyPlan.actions.slice(0, 3)}
          />
        )}

        {/* Layout 2 colonnes */}
        <View style={pdfStyles.row}>
          {/* Colonne gauche */}
          <View style={pdfStyles.col2}>
            {/* 3 actions aujourd'hui */}
            <PdfSectionTitle icon="✅" small>3 actions aujourd'hui</PdfSectionTitle>
            {level0DailyPlan?.actions ? (
              <View style={pdfStyles.box}>
                {level0DailyPlan.actions.slice(0, 3).map((action, idx) => (
                  <View key={idx} style={pdfStyles.listItemSmall}>
                    <View style={pdfStyles.checkbox} />
                    <Text style={pdfStyles.listTextSmall}>{action}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View style={pdfStyles.box}>
                {pathology.top5Tips.slice(0, 3).map((tip, idx) => (
                  <View key={idx} style={pdfStyles.listItemSmall}>
                    <View style={pdfStyles.checkbox} />
                    <Text style={pdfStyles.listTextSmall}>{tip.title}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Mes 5 conseils essentiels */}
            <PdfSectionTitle icon="💡" small>Mes 5 conseils</PdfSectionTitle>
            <PdfTop5 tips={pathology.top5Tips} compact />

            {/* Schéma placeholder */}
            <View style={{ alignItems: 'center', marginTop: 8 }}>
              <PdfImagePlaceholder 
                label={`Schéma : ${pathology.title}`}
                width={160}
                height={80}
              />
            </View>
          </View>

          {/* Colonne droite */}
          <View style={pdfStyles.col2Last}>
            {/* Plan 7 jours compact */}
            <PdfSectionTitle icon="📅" small>Plan 7 jours</PdfSectionTitle>
            {level0SevenDayPlan ? (
              <View>
                {level0SevenDayPlan.days?.slice(0, 7).map((day, idx) => (
                  <View key={idx} style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: 8, fontWeight: 700, color: PDF_COLORS.primary }}>
                      {day.day}
                    </Text>
                    <Text style={{ fontSize: 7, color: PDF_COLORS.text, paddingLeft: 8 }}>
                      {day.actions.slice(0, 2).join(' • ')}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={pdfStyles.textMuted}>Plan détaillé dans le PDF 4 pages</Text>
            )}

            {/* Red Flags */}
            <View style={{ marginTop: 10 }}>
              <PdfRedFlags alerts={pathology.alertSigns} compact />
            </View>
          </View>
        </View>

        {/* Sources */}
        <PdfSources sources={pathology.sources} lastUpdated={pathology.lastUpdated} />

        {/* Footer */}
        <PdfFooter compact />
      </Page>
    </Document>
  );
};

export default Pdf1Page;
