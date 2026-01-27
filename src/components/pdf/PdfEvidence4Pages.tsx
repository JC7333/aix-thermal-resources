// ============================================
// PDF 4 PAGES — GUIDE COMPLET EVIDENCE-BASED
// ============================================
// Structure stricte du cahier des charges :
// Page 1 : Résumé 2 min + ce qui se passe dans le corps
// Page 2 : Exercices (niveaux 0-2) + progression
// Page 3 : Habitudes + plan facile
// Page 4 : Red flags + Sources complètes
// ============================================

import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, PDF_COLORS } from './PdfStyles';
import {
  PdfHeader,
  PdfSectionTitle,
  PdfRecommendations,
  PdfRedFlags,
  PdfSources,
  PdfBodySchema,
  PdfExerciseSchema,
  PdfFooter,
  PdfSevenDayPlan,
  PdfEightWeekProgram,
} from './PdfEvidenceComponents';
import type { EvidenceData } from '@/data/evidence';

interface PdfEvidence4PagesProps {
  evidence: EvidenceData;
}

export const PdfEvidence4Pages: React.FC<PdfEvidence4PagesProps> = ({ evidence }) => {
  // Plans et programmes
  const sevenDayPlanLevel0 = evidence.sevenDayPlans?.find(p => p.level === 0);
  const sevenDayPlanLevel1 = evidence.sevenDayPlans?.find(p => p.level === 1);
  const eightWeekLevel0 = evidence.eightWeekPrograms?.find(p => p.level === 0);
  const eightWeekLevel1 = evidence.eightWeekPrograms?.find(p => p.level === 1);

  // Conseils pratiques par pathologie
  const practicalTips: Record<string, string[]> = {
    'arthrose': [
      "Commencez par 5 minutes — c'est déjà très bien",
      "La chaleur soulage les raideurs matinales",
      "Chaque kilo perdu = 4 kg de moins sur les genoux",
      "Changez de position toutes les heures",
    ],
    'lombalgie-chronique': [
      "Le repos prolongé aggrave le mal de dos",
      "Marche, natation, vélo : reprenez progressivement",
      "Le stress contracte les muscles du dos",
      "Une bonne posture de travail aide beaucoup",
    ],
    'insuffisance-veineuse-chronique': [
      "Bas de compression dès le matin",
      "Marchez 30 minutes par jour minimum",
      "Surélevez vos jambes 15 min le soir",
      "Évitez les stations prolongées",
    ],
    'bpco': [
      "Arrêter le tabac : action n°1",
      "Marche fractionnée : 5 min + pause + 5 min",
      "Technique des lèvres pincées pour mieux expirer",
      "Réhabilitation respiratoire = qualité de vie",
    ],
    'otites-a-repetition-enfant': [
      "Pas de tabagisme passif : priorité absolue",
      "Lavage des mains fréquent",
      "Le xylitol peut aider certains enfants",
      "Consultation ORL si > 3 otites/6 mois",
    ],
  };

  const tips = practicalTips[evidence.slug] || [];

  return (
    <Document>
      {/* ============================================ */}
      {/* PAGE 1 : Résumé 2 min + Ce qui se passe */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <PdfHeader 
          title={evidence.name}
          subtitle="Guide complet basé sur les preuves scientifiques"
          date={evidence.lastUpdated}
        />

        {/* Résumé 2 minutes */}
        <PdfSectionTitle icon="⏱️">En 2 minutes</PdfSectionTitle>
        <View style={pdfStyles.boxPrimary}>
          <Text style={pdfStyles.paragraph}>
            {evidence.summary}
          </Text>
        </View>

        {/* Ce qui se passe dans votre corps */}
        <PdfSectionTitle icon="🔬">Ce qui se passe dans votre corps</PdfSectionTitle>
        <View style={pdfStyles.row}>
          <View style={{ flex: 1 }}>
            {/* Schéma anatomique */}
            <PdfBodySchema slug={evidence.slug} width={220} height={150} />
          </View>
          <View style={{ width: 200, marginLeft: 16 }}>
            {/* Top 5 recommandations condensées */}
            <View style={pdfStyles.box}>
              <Text style={{ fontSize: 10, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 8 }}>
                💡 Ce qui aide vraiment
              </Text>
              {evidence.recommendations.slice(0, 5).map((rec, idx) => (
                <View key={idx} style={{ flexDirection: 'row', marginBottom: 4 }}>
                  <Text style={{ fontSize: 8, color: PDF_COLORS.secondary, width: 14, fontWeight: 700 }}>
                    {idx + 1}.
                  </Text>
                  <Text style={{ fontSize: 8, color: PDF_COLORS.text, flex: 1 }}>
                    {rec.text.split(':')[0].trim()}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <PdfFooter pageNumber={1} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 2 : Exercices + Progression */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{evidence.name} — Exercices & Progression</Text>
          <Text style={pdfStyles.brandName}>COOLANCE</Text>
        </View>

        {/* Schéma exercices */}
        <PdfExerciseSchema slug={evidence.slug} width={300} height={90} />

        {/* Plan 7 jours par niveau */}
        <PdfSectionTitle icon="📅">Plan 7 jours adapté à votre niveau</PdfSectionTitle>
        
        <View style={pdfStyles.row}>
          {/* Niveau 0 - Très facile */}
          <View style={pdfStyles.col2}>
            {sevenDayPlanLevel0 && (
              <PdfSevenDayPlan plan={sevenDayPlanLevel0} compact />
            )}
          </View>
          
          {/* Niveau 1 - Facile */}
          <View style={pdfStyles.col2Last}>
            {sevenDayPlanLevel1 && (
              <PdfSevenDayPlan plan={sevenDayPlanLevel1} compact />
            )}
          </View>
        </View>

        {/* Message encourageant */}
        <View style={[pdfStyles.boxLevel0, { marginTop: 12 }]}>
          <Text style={{ fontSize: 9, color: PDF_COLORS.secondary, fontWeight: 600 }}>
            ✨ Conseil : Commencez par le niveau "Très facile". Même 5 minutes par jour, c'est déjà un grand pas.
          </Text>
        </View>

        <PdfFooter pageNumber={2} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 3 : Programme 8 semaines + Habitudes */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{evidence.name} — Programme progressif</Text>
          <Text style={pdfStyles.brandName}>COOLANCE</Text>
        </View>

        {/* Programme 8 semaines */}
        <PdfSectionTitle icon="🎯">Programme 8 semaines</PdfSectionTitle>
        
        <View style={pdfStyles.row}>
          {/* Niveau 0 */}
          <View style={pdfStyles.col2}>
            {eightWeekLevel0 && (
              <PdfEightWeekProgram program={eightWeekLevel0} />
            )}
          </View>
          
          {/* Niveau 1 */}
          <View style={pdfStyles.col2Last}>
            {eightWeekLevel1 && (
              <PdfEightWeekProgram program={eightWeekLevel1} />
            )}
          </View>
        </View>

        {/* Habitudes & Conseils pratiques */}
        <PdfSectionTitle icon="💡">Habitudes du quotidien</PdfSectionTitle>
        <View style={pdfStyles.boxSecondary}>
          {tips.map((tip, idx) => (
            <View key={idx} style={pdfStyles.listItem}>
              <Text style={pdfStyles.bullet}>•</Text>
              <Text style={pdfStyles.listText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Checklist hebdomadaire */}
        <View style={[pdfStyles.box, { marginTop: 12 }]}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 8 }}>
            📋 Ma checklist de la semaine
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => (
              <View key={idx} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted, marginBottom: 4 }}>{day}</Text>
                <View style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 4, 
                  borderWidth: 1, 
                  borderColor: PDF_COLORS.border 
                }} />
              </View>
            ))}
          </View>
        </View>

        <PdfFooter pageNumber={3} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 4 : Red flags + Sources */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{evidence.name} — Alertes & Sources</Text>
          <Text style={pdfStyles.brandName}>COOLANCE</Text>
        </View>

        {/* Red Flags complets */}
        <PdfSectionTitle icon="🚨">Quand consulter rapidement</PdfSectionTitle>
        <PdfRedFlags alerts={evidence.red_flags} />

        {/* Sources complètes */}
        <PdfSectionTitle icon="📚">Sources scientifiques</PdfSectionTitle>
        <View style={pdfStyles.box}>
          {evidence.sources.map((source, idx) => (
            <View key={idx} style={{ marginBottom: 10, paddingBottom: 8, borderBottomWidth: idx < evidence.sources.length - 1 ? 1 : 0, borderBottomColor: PDF_COLORS.border }}>
              <Text style={{ fontSize: 10, fontWeight: 600, color: PDF_COLORS.text, marginBottom: 2 }}>
                {idx + 1}. {source.title}
              </Text>
              <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted }}>
                {source.org}, {source.year}
              </Text>
              {source.url && (
                <Text style={{ fontSize: 7, color: PDF_COLORS.primary, marginTop: 2 }}>
                  🔗 {source.url}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Note méthodologique */}
        <View style={[pdfStyles.boxPrimary, { marginTop: 12 }]}>
          <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 4 }}>
            ℹ️ Note
          </Text>
          <Text style={{ fontSize: 8, color: PDF_COLORS.text, lineHeight: 1.4 }}>
            Les recommandations sont extraites de guidelines internationaux (NICE, Cochrane, OMS, GOLD). 
            "Élevé" = preuves fortes. "Modéré" = bonne pratique clinique.
          </Text>
        </View>

        {/* Date de mise à jour */}
        <View style={{ marginTop: 16, padding: 12, backgroundColor: PDF_COLORS.primaryLight, borderRadius: 8, alignItems: 'center' }}>
          <Text style={{ fontSize: 11, fontWeight: 700, color: PDF_COLORS.primary, textAlign: 'center' }}>
            Des plans simples, pour reprendre la main sur votre santé.
          </Text>
          <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted, marginTop: 6 }}>
            coolance.fr — par le Dr Audric Bugnard • Mise à jour : {evidence.lastUpdated}
          </Text>
        </View>

        <PdfFooter pageNumber={4} totalPages={4} />
      </Page>
    </Document>
  );
};

export default PdfEvidence4Pages;
