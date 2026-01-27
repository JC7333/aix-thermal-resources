// ============================================
// PDF 4 PAGES — GUIDE COMPLET PREMIUM SENIOR-FRIENDLY
// ============================================
// Structure stricte :
// Page 1 : Résumé + schéma "ce qui se passe"
// Page 2 : Exercices niveaux 0-2 + schémas
// Page 3 : Habitudes + plan simple
// Page 4 : Red flags + sources + date MAJ
// ============================================

import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { PDF_COLORS } from './PdfStyles';
import { PdfBodySchema } from './PdfEvidenceComponents';
import { ExerciseDiagramsByLevel } from './diagrams/ExerciseDiagramsLevels';
import { getDiagramsBySlug } from './diagrams/DiagramsMapping';
import type { EvidenceData } from '@/data/evidence';

// Styles premium 4 pages - optimisés senior
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: PDF_COLORS.text,
    backgroundColor: '#ffffff',
    padding: 32,
    paddingBottom: 50,
  },
  
  // Header avec numéro de page
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 3,
    borderBottomColor: PDF_COLORS.primary,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: PDF_COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 10,
    color: PDF_COLORS.textMuted,
    marginTop: 2,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  brand: {
    fontSize: 16,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 8,
    color: PDF_COLORS.textMuted,
  },

  // Section avec picto
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 10,
    gap: 8,
  },
  sectionIcon: {
    fontSize: 16,
    width: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: PDF_COLORS.primary,
  },

  // Sous-section
  subSection: {
    marginTop: 12,
    marginBottom: 8,
  },
  subSectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: PDF_COLORS.secondary,
    marginBottom: 6,
  },

  // Layout
  twoColumns: {
    flexDirection: 'row',
    gap: 20,
  },
  column: {
    flex: 1,
  },

  // Box styles
  boxPrimary: {
    backgroundColor: PDF_COLORS.primaryLight,
    borderRadius: 8,
    padding: 14,
    borderLeftWidth: 5,
    borderLeftColor: PDF_COLORS.primary,
  },
  boxNeutral: {
    backgroundColor: PDF_COLORS.muted,
    borderRadius: 8,
    padding: 12,
  },
  boxGreen: {
    backgroundColor: '#e8f5ef',
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: PDF_COLORS.secondary,
  },
  boxDanger: {
    backgroundColor: '#fce8ea',
    borderRadius: 8,
    padding: 14,
    borderLeftWidth: 5,
    borderLeftColor: PDF_COLORS.danger,
  },
  boxAccent: {
    backgroundColor: '#fdf6e9',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: PDF_COLORS.accent,
  },

  // Listes
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  bulletIcon: {
    width: 16,
    fontSize: 11,
    color: PDF_COLORS.primary,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
    color: PDF_COLORS.text,
  },
  numberedItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  numberBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: PDF_COLORS.secondaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  numberText: {
    fontSize: 10,
    fontWeight: 700,
    color: PDF_COLORS.secondary,
  },

  // Plan 7 jours
  dayCard: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: PDF_COLORS.border,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    width: 55,
  },
  dayAction: {
    fontSize: 9,
    color: PDF_COLORS.text,
    lineHeight: 1.3,
    paddingLeft: 4,
  },

  // Programme 8 semaines
  weekCard: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  weekLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: PDF_COLORS.primary,
  },
  weekFocus: {
    fontSize: 9,
    fontWeight: 600,
    color: PDF_COLORS.accent,
  },
  weekExercise: {
    fontSize: 9,
    color: PDF_COLORS.text,
    paddingLeft: 8,
    marginBottom: 2,
  },

  // Checklist
  checklistRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
    gap: 10,
  },
  checkbox: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    borderColor: PDF_COLORS.primary,
    borderRadius: 3,
  },
  checklistText: {
    flex: 1,
    fontSize: 10,
    color: PDF_COLORS.text,
    lineHeight: 1.4,
  },

  // Tableau jours
  weekTable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: 10,
    backgroundColor: PDF_COLORS.muted,
    borderRadius: 6,
  },
  weekDay: {
    alignItems: 'center',
  },
  weekDayLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: PDF_COLORS.textMuted,
    marginBottom: 4,
  },
  weekDayBox: {
    width: 28,
    height: 28,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: PDF_COLORS.border,
    backgroundColor: '#ffffff',
  },

  // Red flags
  alertItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  alertBullet: {
    width: 18,
    fontSize: 12,
    color: PDF_COLORS.danger,
    fontWeight: 700,
  },
  alertText: {
    flex: 1,
    fontSize: 10,
    color: PDF_COLORS.danger,
    lineHeight: 1.4,
  },

  // Sources
  sourceItem: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
  },
  sourceTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: PDF_COLORS.text,
    marginBottom: 2,
  },
  sourceOrg: {
    fontSize: 9,
    color: PDF_COLORS.textMuted,
  },
  sourceUrl: {
    fontSize: 8,
    color: PDF_COLORS.primary,
    marginTop: 2,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: PDF_COLORS.border,
  },
  footerText: {
    fontSize: 8,
    color: PDF_COLORS.textMuted,
  },
  footerPage: {
    fontSize: 9,
    fontWeight: 600,
    color: PDF_COLORS.primary,
  },

  // Message final
  finalBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: PDF_COLORS.primaryLight,
    borderRadius: 10,
    alignItems: 'center',
  },
  finalText: {
    fontSize: 13,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    textAlign: 'center',
    marginBottom: 6,
  },
  finalSubtext: {
    fontSize: 9,
    color: PDF_COLORS.textMuted,
    textAlign: 'center',
  },
});

interface PdfEvidence4PagesProps {
  evidence: EvidenceData;
}

export const PdfEvidence4Pages: React.FC<PdfEvidence4PagesProps> = ({ evidence }) => {
  // Données
  const sevenDayPlanLevel0 = evidence.sevenDayPlans?.find(p => p.level === 0);
  const sevenDayPlanLevel1 = evidence.sevenDayPlans?.find(p => p.level === 1);
  const eightWeekLevel0 = evidence.eightWeekPrograms?.find(p => p.level === 0);
  const eightWeekLevel1 = evidence.eightWeekPrograms?.find(p => p.level === 1);

  // Conseils pratiques par pathologie
  const habitsByPathology: Record<string, { title: string; items: string[] }[]> = {
    'arthrose': [
      { title: '🚶 Bouger', items: ['Marche quotidienne, même 10 min', 'Changez de position chaque heure', 'Préférez escaliers si possible'] },
      { title: '⚖️ Poids', items: ['Chaque kilo perdu = 4 kg de moins sur les genoux', 'Objectif réaliste : -5% sur 6 mois'] },
      { title: '🛌 Confort', items: ['Chaleur le matin pour les raideurs', 'Glace si gonflement après effort'] },
    ],
    'lombalgie-chronique': [
      { title: '🚶 Activité', items: ['Évitez le repos prolongé', 'Marche, natation ou vélo', 'Reprise progressive'] },
      { title: '💼 Posture', items: ['Écran à hauteur des yeux', 'Pause debout toutes les heures', 'Chaise adaptée au bureau'] },
      { title: '😌 Stress', items: ['Le stress contracte les muscles du dos', 'Respiration lente aide', 'Sommeil régulier'] },
    ],
    'insuffisance-veineuse-chronique': [
      { title: '🧦 Compression', items: ['Bas de compression dès le matin', 'Retirer le soir au coucher', 'Renouveler tous les 6 mois'] },
      { title: '🚶 Mouvement', items: ['Marche 30 min/jour minimum', 'Évitez de rester debout immobile', 'Exercices mollets au bureau'] },
      { title: '🛋️ Élévation', items: ['Jambes surélevées 15 min le soir', 'Coussin sous les pieds au lit', 'Douche fraîche sur les jambes'] },
    ],
    'bpco': [
      { title: '🚭 Tabac', items: ['Arrêt du tabac = action n°1', 'Aide disponible (patch, suivi)', 'Gain immédiat sur les symptômes'] },
      { title: '🌬️ Respiration', items: ['Lèvres pincées pour mieux expirer', 'Inspirer par le nez, expirer par la bouche', 'Prendre son temps'] },
      { title: '🏃 Activité', items: ['Marche fractionnée : 5 min + pause', 'Réhabilitation respiratoire recommandée', 'Renforcement doux des bras'] },
    ],
    'otites-a-repetition-enfant': [
      { title: '🧼 Hygiène', items: ['Lavage des mains régulier', 'Nez propre (sérum physiologique)', 'Jouets nettoyés souvent'] },
      { title: '🚭 Environnement', items: ['Zéro tabagisme passif', 'Aérer la maison 2x/jour', 'Éviter les lieux enfumés'] },
      { title: '👶 Alimentation', items: ['Allaitement protecteur si possible', 'Biberon position semi-assise', 'Éviter la crèche si possible avant 1 an'] },
    ],
  };

  const habits = habitsByPathology[evidence.slug] || [];

  // Résumé en puces courtes
  const summaryBullets = evidence.summary
    .split('\n')
    .filter(line => line.trim())
    .slice(0, 3)
    .flatMap(p => p.split(/(?<=[.!?])\s+/).filter(s => s.trim()).slice(0, 2))
    .slice(0, 5)
    .map(s => s.trim().replace(/\.$/, ''));

  return (
    <Document>
      {/* ============================================ */}
      {/* PAGE 1 : Résumé + Ce qui se passe */}
      {/* ============================================ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>📋 {evidence.name}</Text>
            <Text style={styles.headerSubtitle}>Guide complet • Basé sur les preuves scientifiques</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.brand}>COOLANCE</Text>
            <Text style={styles.brandSub}>Dr Audric Bugnard</Text>
          </View>
        </View>

        {/* En 2 minutes */}
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

        {/* Ce qui se passe dans votre corps */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🔬</Text>
          <Text style={styles.sectionTitle}>Ce qui se passe dans votre corps</Text>
        </View>
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            <PdfBodySchema slug={evidence.slug} width={240} height={165} />
          </View>
          <View style={styles.column}>
            <View style={styles.boxNeutral}>
              <Text style={{ fontSize: 11, fontWeight: 700, color: PDF_COLORS.primary, marginBottom: 10 }}>
                💡 Ce qui aide vraiment
              </Text>
              {evidence.recommendations.slice(0, 5).map((rec, idx) => {
                const shortText = rec.text.split(':')[0].trim();
                const displayText = shortText.length > 45 ? shortText.substring(0, 42) + '...' : shortText;
                return (
                  <View key={idx} style={styles.numberedItem}>
                    <View style={styles.numberBadge}>
                      <Text style={styles.numberText}>{idx + 1}</Text>
                    </View>
                    <Text style={{ flex: 1, fontSize: 9, color: PDF_COLORS.text, lineHeight: 1.4 }}>
                      {displayText}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Information éducative — ne remplace pas un avis médical</Text>
          <Text style={styles.footerPage}>1 / 4</Text>
        </View>
      </Page>

      {/* ============================================ */}
      {/* PAGE 2 : Exercices niveaux + schémas */}
      {/* ============================================ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>💪 Exercices & Progression</Text>
          <Text style={styles.brand}>COOLANCE</Text>
        </View>

        {/* Titre section exercices */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🏃</Text>
          <Text style={styles.sectionTitle}>Exercices adaptés — 3 niveaux au choix</Text>
        </View>

        {/* 3 schémas d'exercices par niveau */}
        <View style={{ marginBottom: 8 }}>
          {(() => {
            const diagramInfo = getDiagramsBySlug(evidence.slug);
            if (!diagramInfo) return null;
            
            const Level0Component = ExerciseDiagramsByLevel[diagramInfo.exerciseLevels.level0 as keyof typeof ExerciseDiagramsByLevel];
            const Level1Component = ExerciseDiagramsByLevel[diagramInfo.exerciseLevels.level1 as keyof typeof ExerciseDiagramsByLevel];
            const Level2Component = ExerciseDiagramsByLevel[diagramInfo.exerciseLevels.level2 as keyof typeof ExerciseDiagramsByLevel];
            const Level3Component = ExerciseDiagramsByLevel[diagramInfo.exerciseLevels.level3 as keyof typeof ExerciseDiagramsByLevel];

            return (
              <View style={{ gap: 4 }}>
                {/* Niveau 0 - Vert */}
                {Level0Component && (
                  <View style={{ alignItems: 'center', padding: 3, backgroundColor: '#e8f5ef', borderRadius: 4 }}>
                    <Level0Component width={350} height={55} />
                  </View>
                )}
                {/* Niveau 1 - Bleu */}
                {Level1Component && (
                  <View style={{ alignItems: 'center', padding: 3, backgroundColor: PDF_COLORS.primaryLight, borderRadius: 4 }}>
                    <Level1Component width={350} height={55} />
                  </View>
                )}
                {/* Niveau 2 - Orange */}
                {Level2Component && (
                  <View style={{ alignItems: 'center', padding: 3, backgroundColor: '#fdf6e9', borderRadius: 4 }}>
                    <Level2Component width={350} height={55} />
                  </View>
                )}
                {/* Niveau 3 - Violet */}
                {Level3Component && (
                  <View style={{ alignItems: 'center', padding: 3, backgroundColor: '#f3e8ff', borderRadius: 4 }}>
                    <Level3Component width={350} height={55} />
                  </View>
                )}
              </View>
            );
          })()}
        </View>

        {/* Plans 7 jours par niveau */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📅</Text>
          <Text style={styles.sectionTitle}>Plan 7 jours — Choisissez votre niveau</Text>
        </View>

        <View style={styles.twoColumns}>
          {/* Niveau 0 */}
          <View style={styles.column}>
            {sevenDayPlanLevel0 && (
              <View style={styles.boxGreen}>
                <Text style={{ fontSize: 11, fontWeight: 700, color: PDF_COLORS.secondary, marginBottom: 8 }}>
                  ✨ {sevenDayPlanLevel0.levelName}
                </Text>
                {sevenDayPlanLevel0.days.slice(0, 7).map((day, idx) => (
                  <View key={idx} style={styles.dayCard}>
                    <Text style={styles.dayLabel}>{day.day}</Text>
                    {day.actions.slice(0, 1).map((action, aIdx) => (
                      <Text key={aIdx} style={styles.dayAction}>• {action}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Niveau 1 */}
          <View style={styles.column}>
            {sevenDayPlanLevel1 && (
              <View style={styles.boxNeutral}>
                <Text style={{ fontSize: 11, fontWeight: 700, color: PDF_COLORS.primary, marginBottom: 8 }}>
                  🚀 {sevenDayPlanLevel1.levelName}
                </Text>
                {sevenDayPlanLevel1.days.slice(0, 7).map((day, idx) => (
                  <View key={idx} style={styles.dayCard}>
                    <Text style={styles.dayLabel}>{day.day}</Text>
                    {day.actions.slice(0, 1).map((action, aIdx) => (
                      <Text key={aIdx} style={styles.dayAction}>• {action}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Conseil */}
        <View style={[styles.boxAccent, { marginTop: 8 }]}>
          <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.accent, textAlign: 'center' }}>
            💬 Commencez par "Très facile". Même 5 minutes par jour, c'est un grand pas !
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Information éducative — ne remplace pas un avis médical</Text>
          <Text style={styles.footerPage}>2 / 4</Text>
        </View>
      </Page>

      {/* ============================================ */}
      {/* PAGE 3 : Habitudes + Plan simple */}
      {/* ============================================ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🏠 Habitudes du quotidien</Text>
          <Text style={styles.brand}>COOLANCE</Text>
        </View>

        {/* Habitudes par catégorie */}
        <View style={styles.twoColumns}>
          <View style={styles.column}>
            {habits.slice(0, 2).map((category, idx) => (
              <View key={idx} style={[styles.boxNeutral, { marginBottom: 12 }]}>
                <Text style={{ fontSize: 11, fontWeight: 700, color: PDF_COLORS.primary, marginBottom: 8 }}>
                  {category.title}
                </Text>
                {category.items.map((item, iIdx) => (
                  <View key={iIdx} style={styles.checklistRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checklistText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.column}>
            {habits.slice(2, 3).map((category, idx) => (
              <View key={idx} style={[styles.boxNeutral, { marginBottom: 12 }]}>
                <Text style={{ fontSize: 11, fontWeight: 700, color: PDF_COLORS.primary, marginBottom: 8 }}>
                  {category.title}
                </Text>
                {category.items.map((item, iIdx) => (
                  <View key={iIdx} style={styles.checklistRow}>
                    <View style={styles.checkbox} />
                    <Text style={styles.checklistText}>{item}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* Programme 8 semaines */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🎯</Text>
          <Text style={styles.sectionTitle}>Programme 8 semaines</Text>
        </View>

        <View style={styles.twoColumns}>
          <View style={styles.column}>
            {eightWeekLevel0 && (
              <View style={styles.boxGreen}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: PDF_COLORS.secondary, marginBottom: 8 }}>
                  ✨ {eightWeekLevel0.levelName}
                </Text>
                {eightWeekLevel0.weeks.slice(0, 4).map((week, idx) => (
                  <View key={idx} style={styles.weekCard}>
                    <View style={styles.weekHeader}>
                      <Text style={styles.weekLabel}>{week.week}</Text>
                      <Text style={styles.weekFocus}>{week.focus}</Text>
                    </View>
                    {week.exercises.slice(0, 2).map((ex, eIdx) => (
                      <Text key={eIdx} style={styles.weekExercise}>• {ex}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.column}>
            {eightWeekLevel1 && (
              <View style={styles.boxNeutral}>
                <Text style={{ fontSize: 10, fontWeight: 700, color: PDF_COLORS.primary, marginBottom: 8 }}>
                  🚀 {eightWeekLevel1.levelName}
                </Text>
                {eightWeekLevel1.weeks.slice(0, 4).map((week, idx) => (
                  <View key={idx} style={styles.weekCard}>
                    <View style={styles.weekHeader}>
                      <Text style={styles.weekLabel}>{week.week}</Text>
                      <Text style={styles.weekFocus}>{week.focus}</Text>
                    </View>
                    {week.exercises.slice(0, 2).map((ex, eIdx) => (
                      <Text key={eIdx} style={styles.weekExercise}>• {ex}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Checklist semaine */}
        <View style={styles.weekTable}>
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, idx) => (
            <View key={idx} style={styles.weekDay}>
              <Text style={styles.weekDayLabel}>{day}</Text>
              <View style={styles.weekDayBox} />
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Information éducative — ne remplace pas un avis médical</Text>
          <Text style={styles.footerPage}>3 / 4</Text>
        </View>
      </Page>

      {/* ============================================ */}
      {/* PAGE 4 : Red flags + Sources */}
      {/* ============================================ */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🚨 Alertes & Sources</Text>
          <Text style={styles.brand}>COOLANCE</Text>
        </View>

        {/* Red Flags */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>⚠️</Text>
          <Text style={[styles.sectionTitle, { color: PDF_COLORS.danger }]}>Consultez rapidement si...</Text>
        </View>
        <View style={styles.boxDanger}>
          {evidence.red_flags.map((flag, idx) => (
            <View key={idx} style={styles.alertItem}>
              <Text style={styles.alertBullet}>!</Text>
              <Text style={styles.alertText}>{flag}</Text>
            </View>
          ))}
          <View style={{ marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: PDF_COLORS.danger + '40' }}>
            <Text style={{ fontSize: 12, fontWeight: 700, color: PDF_COLORS.danger, textAlign: 'center' }}>
              En cas d'urgence : 15 ou 112
            </Text>
          </View>
        </View>

        {/* Sources */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📚</Text>
          <Text style={styles.sectionTitle}>Sources scientifiques</Text>
        </View>
        <View style={styles.boxNeutral}>
          {evidence.sources.map((source, idx) => (
            <View key={idx} style={styles.sourceItem}>
              <Text style={styles.sourceTitle}>{idx + 1}. {source.title}</Text>
              <Text style={styles.sourceOrg}>{source.org}, {source.year}</Text>
              {source.url && <Text style={styles.sourceUrl}>🔗 {source.url}</Text>}
            </View>
          ))}
        </View>

        {/* Note méthodologique */}
        <View style={[styles.boxAccent, { marginTop: 12 }]}>
          <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.accent, marginBottom: 4 }}>
            ℹ️ À propos des niveaux de preuve
          </Text>
          <Text style={{ fontSize: 8, color: PDF_COLORS.text, lineHeight: 1.4 }}>
            "Élevé" = recommandation forte basée sur des études de qualité. "Modéré" = bonne pratique clinique. 
            Si besoin, parlez-en à un professionnel de santé.
          </Text>
        </View>

        {/* Message final */}
        <View style={styles.finalBox}>
          <Text style={styles.finalText}>
            Des plans simples, pour reprendre la main sur votre santé.
          </Text>
          <Text style={styles.finalSubtext}>
            coolance.fr • Dr Audric Bugnard • Mise à jour : {evidence.lastUpdated}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Information éducative — ne remplace pas un avis médical</Text>
          <Text style={styles.footerPage}>4 / 4</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfEvidence4Pages;
