// ============================================
// PDF 1 PAGE "FRIGO" — FICHE EVIDENCE-BASED
// ============================================
// Génère un PDF 1 page A4 senior-friendly
// Structure fixe : Résumé 2 min, 3 actions jour, Plan 7 jours, Red flags, Sources
// ============================================

import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, PDF_COLORS } from './PdfStyles';
import {
  PdfHeader,
  PdfSectionTitle,
  PdfRedFlags,
  PdfSources,
  PdfBodySchema,
  PdfExerciseSchema,
  PdfFooter,
} from './PdfEvidenceComponents';
import type { EvidenceData } from '@/data/evidence';

interface PdfEvidence1PageProps {
  evidence: EvidenceData;
}

export const PdfEvidence1Page: React.FC<PdfEvidence1PageProps> = ({ evidence }) => {
  // Plan 7 jours niveau 0 (très facile) par défaut
  const sevenDayPlan = evidence.sevenDayPlans?.find(p => p.level === 0) || evidence.sevenDayPlans?.[0];
  
  // 3 premières recommandations simplifiées pour "Aujourd'hui"
  const todayActions = evidence.recommendations.slice(0, 3).map(r => {
    // Extraire la partie avant les deux-points si présente
    const text = r.text.split(':')[0].trim();
    // Limiter à 60 caractères
    return text.length > 60 ? text.substring(0, 57) + '...' : text;
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page1col}>
        {/* Header */}
        <PdfHeader 
          title={evidence.name}
          subtitle="Fiche pratique basée sur les preuves scientifiques"
          date={evidence.lastUpdated}
          compact
        />

        {/* Layout 2 colonnes */}
        <View style={pdfStyles.row}>
          {/* ===== COLONNE GAUCHE ===== */}
          <View style={pdfStyles.col2}>
            
            {/* Résumé 2 minutes */}
            <PdfSectionTitle icon="⏱️" small>En 2 minutes</PdfSectionTitle>
            <View style={[pdfStyles.boxPrimary, { padding: 8 }]}>
              <Text style={{ fontSize: 8, lineHeight: 1.4, color: PDF_COLORS.text }}>
                {evidence.summary.split('\n')[0].substring(0, 200)}
                {evidence.summary.split('\n')[0].length > 200 ? '...' : ''}
              </Text>
            </View>

            {/* Aujourd'hui : 3 actions */}
            <PdfSectionTitle icon="✅" small>Aujourd'hui : 3 actions</PdfSectionTitle>
            <View style={[pdfStyles.box, { padding: 8 }]}>
              {todayActions.map((action, idx) => (
                <View key={idx} style={{ flexDirection: 'row', marginBottom: 4, alignItems: 'flex-start' }}>
                  <View style={[pdfStyles.checkbox, { marginTop: 1 }]} />
                  <Text style={{ fontSize: 8, color: PDF_COLORS.text, flex: 1 }}>
                    {action}
                  </Text>
                </View>
              ))}
            </View>

            {/* Schéma "Ce qui se passe" */}
            <PdfBodySchema slug={evidence.slug} width={140} height={85} />
          </View>

          {/* ===== COLONNE DROITE ===== */}
          <View style={pdfStyles.col2Last}>
            
            {/* Plan 7 jours compact */}
            <PdfSectionTitle icon="📅" small>Cette semaine : Plan 7 jours</PdfSectionTitle>
            {sevenDayPlan ? (
              <View style={[pdfStyles.box, { padding: 6 }]}>
                {sevenDayPlan.days.slice(0, 7).map((day, idx) => (
                  <View key={idx} style={{ marginBottom: 3 }}>
                    <Text style={{ fontSize: 7, fontWeight: 700, color: PDF_COLORS.primary }}>
                      {day.day}
                    </Text>
                    <Text style={{ fontSize: 6, color: PDF_COLORS.text, paddingLeft: 6 }}>
                      {day.actions.slice(0, 2).map((a, i) => `• ${a}`).join(' ')}
                    </Text>
                  </View>
                ))}
                <Text style={{ fontSize: 6, color: PDF_COLORS.secondary, marginTop: 4, fontWeight: 600 }}>
                  Niveau : {sevenDayPlan.levelName}
                </Text>
              </View>
            ) : (
              <View style={pdfStyles.box}>
                <Text style={{ fontSize: 7, color: PDF_COLORS.textMuted }}>
                  Plan détaillé dans le PDF 4 pages
                </Text>
              </View>
            )}

            {/* Schéma exercices */}
            <View style={{ marginTop: 6 }}>
              <PdfExerciseSchema slug={evidence.slug} width={160} height={55} />
            </View>

            {/* Red Flags compact */}
            <View style={{ marginTop: 6 }}>
              <PdfRedFlags alerts={evidence.red_flags} compact />
            </View>
          </View>
        </View>

        {/* Sources (sélection) */}
        <View style={{ marginTop: 8 }}>
          <PdfSources sources={evidence.sources.slice(0, 3)} lastUpdated={evidence.lastUpdated} />
        </View>

        {/* Footer */}
        <PdfFooter compact />
      </Page>
    </Document>
  );
};

export default PdfEvidence1Page;
