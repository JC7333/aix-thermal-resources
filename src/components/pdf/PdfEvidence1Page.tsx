// ============================================
// PDF 1 PAGE "FRIGO" — FICHE PREMIUM SENIOR-FRIENDLY
// ============================================
// Génère un PDF 1 page A4 strict
// Layout 2 colonnes, contenu limité, gros contrastes
// ============================================

import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { PDF_COLORS, PDF_FONT_FAMILY } from './PdfStyles';
import type { EvidenceData } from '@/data/evidence';

// Styles spécifiques 1 page - optimisés senior
const styles = StyleSheet.create({
  page: {
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 9,
    color: PDF_COLORS.text,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 28, // Réduit pour éviter page 2 vide
  },
  
  // Header compact
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: PDF_COLORS.primary,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 8,
    color: PDF_COLORS.textMuted,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  brand: {
    fontSize: 12,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 7,
    color: PDF_COLORS.textMuted,
  },
  dateBadge: {
    fontSize: 6,
    color: PDF_COLORS.textMuted,
    backgroundColor: PDF_COLORS.muted,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    marginTop: 3,
  },

  // Layout 2 colonnes
  twoColumns: {
    flexDirection: 'row',
    gap: 16,
  },
  columnLeft: {
    width: '48%',
  },
  columnRight: {
    width: '48%',
  },

  // Section avec picto
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
    gap: 6,
  },
  sectionIcon: {
    fontSize: 12,
    width: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: PDF_COLORS.primary,
  },

  // Box styles
  boxPrimary: {
    backgroundColor: PDF_COLORS.primaryLight,
    borderRadius: 6,
    padding: 10,
    borderLeftWidth: 4,
    borderLeftColor: PDF_COLORS.primary,
  },
  boxNeutral: {
    backgroundColor: PDF_COLORS.muted,
    borderRadius: 6,
    padding: 8,
  },
  boxGreen: {
    backgroundColor: '#e8f5ef',
    borderRadius: 6,
    padding: 8,
    borderWidth: 2,
    borderColor: PDF_COLORS.secondary,
  },
  boxDanger: {
    backgroundColor: '#fce8ea',
    borderRadius: 6,
    padding: 8,
    borderLeftWidth: 4,
    borderLeftColor: PDF_COLORS.danger,
  },

  // Listes
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 2,
  },
  bulletIcon: {
    width: 14,
    fontSize: 9,
    color: PDF_COLORS.primary,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.35,
    color: PDF_COLORS.text,
  },
  bulletTextSmall: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.3,
    color: PDF_COLORS.text,
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
    gap: 8,
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: PDF_COLORS.primary,
    borderRadius: 2,
    marginTop: 1,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 9,
    fontWeight: 600,
    color: PDF_COLORS.text,
    lineHeight: 1.35,
  },

  // Plan 7 jours compact
  dayRow: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  dayLabel: {
    width: 40,
    fontSize: 8,
    fontWeight: 700,
    color: PDF_COLORS.primary,
  },
  dayContent: {
    flex: 1,
    fontSize: 8,
    color: PDF_COLORS.text,
    lineHeight: 1.3,
  },

  // Red flags
  alertItem: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  alertBullet: {
    width: 12,
    fontSize: 8,
    color: PDF_COLORS.danger,
    fontWeight: 700,
  },
  alertText: {
    flex: 1,
    fontSize: 8,
    color: PDF_COLORS.danger,
    lineHeight: 1.3,
  },

  // Sources - inline, pas de box séparée
  sourcesText: {
    fontSize: 7,
    color: PDF_COLORS.textMuted,
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: PDF_COLORS.border,
  },

  // Footer inline (pas de position absolute)
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7,
    color: PDF_COLORS.textMuted,
  },
  footerEmergency: {
    fontSize: 7,
    color: PDF_COLORS.danger,
    fontWeight: 600,
  },
});

interface PdfEvidence1PageProps {
  evidence: EvidenceData;
}

export const PdfEvidence1Page: React.FC<PdfEvidence1PageProps> = ({ evidence }) => {
  // Plan 7 jours niveau 0 (très facile)
  const sevenDayPlan = evidence.sevenDayPlans?.find(p => p.level === 0) || evidence.sevenDayPlans?.[0];
  
  // Résumé en puces (max 6 puces, phrases courtes)
  const summaryBullets = evidence.summary
    .split('\n')
    .filter(line => line.trim())
    .slice(0, 3)
    .flatMap(paragraph => {
      // Séparer chaque phrase en puce
      const sentences = paragraph.split(/(?<=[.!?])\s+/).filter(s => s.trim());
      return sentences.slice(0, 2).map(s => s.trim().replace(/\.$/, ''));
    })
    .slice(0, 6);

  // 3 actions du jour (court)
  const todayActions = evidence.recommendations.slice(0, 3).map(r => {
    const text = r.text.split(':')[0].trim();
    return text.length > 55 ? text.substring(0, 52) + '...' : text;
  });

  // Red flags (max 5)
  const redFlags = evidence.red_flags.slice(0, 5).map(flag => {
    return flag.length > 70 ? flag.substring(0, 67) + '...' : flag;
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>📋 {evidence.name}</Text>
            <Text style={styles.subtitle}>Fiche pratique • Basée sur les preuves scientifiques</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.brand}>COOLANCE</Text>
            <Text style={styles.brandSub}>Dr Audric Bugnard</Text>
            <Text style={styles.dateBadge}>MAJ {evidence.lastUpdated}</Text>
          </View>
        </View>

        {/* ===== LAYOUT 2 COLONNES ===== */}
        <View style={styles.twoColumns}>
          
          {/* ===== COLONNE GAUCHE ===== */}
          <View style={styles.columnLeft}>
            
            {/* En 2 minutes (max 6 puces) */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>⏱️</Text>
              <Text style={styles.sectionTitle}>En 2 minutes</Text>
            </View>
            <View style={styles.boxPrimary}>
              {summaryBullets.map((bullet, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <Text style={styles.bulletIcon}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>

            {/* Aujourd'hui : 3 actions */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>✅</Text>
              <Text style={styles.sectionTitle}>Aujourd'hui</Text>
            </View>
            <View style={styles.boxGreen}>
              {todayActions.map((action, idx) => (
                <View key={idx} style={styles.checkboxRow}>
                  <View style={styles.checkbox} />
                  <Text style={styles.checkboxLabel}>{action}</Text>
                </View>
              ))}
            </View>

            {/* Red Flags (max 5) */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🚨</Text>
              <Text style={[styles.sectionTitle, { color: PDF_COLORS.danger }]}>Consultez si...</Text>
            </View>
            <View style={styles.boxDanger}>
              {redFlags.map((flag, idx) => (
                <View key={idx} style={styles.alertItem}>
                  <Text style={styles.alertBullet}>!</Text>
                  <Text style={styles.alertText}>{flag}</Text>
                </View>
              ))}
              <Text style={{ fontSize: 8, fontWeight: 700, color: PDF_COLORS.danger, marginTop: 4 }}>
                → Urgence : 15 ou 112
              </Text>
            </View>
          </View>

          {/* ===== COLONNE DROITE ===== */}
          <View style={styles.columnRight}>
            
            {/* Plan 7 jours (1 ligne par jour) */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>📅</Text>
              <Text style={styles.sectionTitle}>Plan 7 jours</Text>
            </View>
            {sevenDayPlan ? (
              <View style={styles.boxNeutral}>
                <Text style={{ fontSize: 8, fontWeight: 600, color: PDF_COLORS.secondary, marginBottom: 6 }}>
                  Niveau : {sevenDayPlan.levelName}
                </Text>
                {sevenDayPlan.days.slice(0, 7).map((day, idx) => {
                  // Une action principale par jour
                  const mainAction = day.actions[0] || '';
                  const shortAction = mainAction.length > 45 ? mainAction.substring(0, 42) + '...' : mainAction;
                  return (
                    <View key={idx} style={styles.dayRow}>
                      <Text style={styles.dayLabel}>J{idx + 1}</Text>
                      <Text style={styles.dayContent}>{shortAction}</Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View style={styles.boxNeutral}>
                <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted }}>
                  Voir guide 4 pages pour le plan détaillé
                </Text>
              </View>
            )}

            {/* Ce qui aide vraiment (Top 5 condensé) */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>💡</Text>
              <Text style={styles.sectionTitle}>Ce qui aide vraiment</Text>
            </View>
            <View style={styles.boxNeutral}>
              {evidence.recommendations.slice(0, 5).map((rec, idx) => {
                const shortText = rec.text.split(':')[0].trim();
                const displayText = shortText.length > 50 ? shortText.substring(0, 47) + '...' : shortText;
                return (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={{ width: 14, fontSize: 8, fontWeight: 700, color: PDF_COLORS.secondary }}>
                      {idx + 1}.
                    </Text>
                    <Text style={styles.bulletTextSmall}>{displayText}</Text>
                  </View>
                );
              })}
            </View>

            {/* Conseil pratique */}
            <View style={[styles.boxGreen, { marginTop: 10 }]}>
              <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.secondary, textAlign: 'center' }}>
                ✨ Même 5 minutes par jour, c'est un grand pas !
              </Text>
            </View>
          </View>
        </View>

        {/* ===== SOURCES (inline) ===== */}
        <Text style={styles.sourcesText}>
          📚 Sources : {evidence.sources.slice(0, 2).map(s => `${s.org} (${s.year})`).join(' • ')}
        </Text>

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Information éducative — ne remplace pas un avis médical
          </Text>
          <Text style={styles.footerText}>
            coolance.fr
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfEvidence1Page;
