// ============================================
// PDF 4 PAGES — FICHE COMPLÈTE
// ============================================
// Structure : 
// Page 1 : Résumé + Top 5
// Page 2 : Plan 7 jours (tous niveaux)
// Page 3 : Programme 8 semaines
// Page 4 : Nutrition + Plan poussée + Red flags + Sources
// ============================================

import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import { pdfStyles, PDF_COLORS } from './PdfStyles';
import {
  PdfHeader,
  PdfSectionTitle,
  PdfLevel0Box,
  PdfTop5,
  PdfPlan7Jours,
  PdfProgramme8Semaines,
  PdfNutrition,
  PdfFlareProtocol,
  PdfRedFlags,
  PdfSources,
  PdfFooter,
  PdfImagePlaceholder,
} from './PdfComponents';
import type { PathologyContent } from '@/content/content';

interface Pdf4PagesProps {
  pathology: PathologyContent;
}

export const Pdf4Pages: React.FC<Pdf4PagesProps> = ({ pathology }) => {
  const level0DailyPlan = pathology.dailyPlans.find(p => p.level === 0);

  return (
    <Document>
      {/* ============================================ */}
      {/* PAGE 1 : Résumé + Top 5 */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <PdfHeader 
          title={pathology.title}
          subtitle={pathology.shortDescription}
          date={pathology.lastUpdated}
        />

        {/* Version très facile (Niveau 0) */}
        {level0DailyPlan && level0DailyPlan.actions && (
          <PdfLevel0Box items={level0DailyPlan.actions.slice(0, 4)} />
        )}

        {/* En résumé */}
        <PdfSectionTitle icon="📖">En résumé (2 minutes)</PdfSectionTitle>
        <View style={pdfStyles.boxPrimary}>
          <Text style={pdfStyles.paragraph}>
            {pathology.quickSummary.split('\n\n')[0]}
          </Text>
        </View>

        {/* Ce qui se passe dans votre corps */}
        <PdfSectionTitle icon="🔬">Ce qui se passe dans votre corps</PdfSectionTitle>
        <View style={pdfStyles.row}>
          <View style={{ flex: 1 }}>
            <Text style={pdfStyles.paragraphSmall}>
              {pathology.physiopathology.split('\n\n').slice(0, 2).join(' ')}
            </Text>
          </View>
          <View style={{ width: 150, alignItems: 'center', marginLeft: 16 }}>
            <PdfImagePlaceholder 
              label="Schéma anatomique"
              width={140}
              height={100}
            />
          </View>
        </View>

        {/* Mes 5 conseils essentiels */}
        <PdfSectionTitle icon="💡">Mes 5 conseils essentiels</PdfSectionTitle>
        <PdfTop5 tips={pathology.top5Tips} />

        <PdfFooter pageNumber={1} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 2 : Plan 7 jours */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{pathology.title} — Plan 7 jours</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={pdfStyles.brandName}>COOLANCE</Text>
          </View>
        </View>

        {/* Plan 7 jours par niveau */}
        <PdfSectionTitle icon="📅">Plan 7 jours adapté à votre niveau</PdfSectionTitle>
        
        {/* Niveau 0 */}
        <View style={{ marginBottom: 16 }}>
          <PdfLevel0Box 
            title="Niveau 0 — Mobilité très limitée"
            items={pathology.sevenDayPlans.find(p => p.level === 0)?.days?.slice(0, 3).map(d => `${d.day}: ${d.actions[0]}`) || ['Repos actif conseillé']}
          />
        </View>

        {/* Autres niveaux */}
        <PdfPlan7Jours plans={pathology.sevenDayPlans} showAllLevels />

        {/* Image exercices placeholder */}
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <PdfImagePlaceholder 
            label="Exercices illustrés"
            width={300}
            height={100}
          />
        </View>

        <PdfFooter pageNumber={2} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 3 : Programme 8 semaines */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{pathology.title} — Programme 8 semaines</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={pdfStyles.brandName}>COOLANCE</Text>
          </View>
        </View>

        <PdfSectionTitle icon="🏃">Programme progressif 8 semaines</PdfSectionTitle>
        
        {/* Encadré niveau 0 */}
        <View style={pdfStyles.boxLevel0}>
          <Text style={pdfStyles.level0Title}>✨ Pour commencer (Niveau 0)</Text>
          <Text style={pdfStyles.paragraphSmall}>
            Pas de pression. Faites ce que vous pouvez. 5 minutes, c'est déjà bien. 
            L'important, c'est de faire quelque chose chaque jour.
          </Text>
        </View>

        <PdfProgramme8Semaines programs={pathology.eightWeekPrograms} />

        {/* Image mouvements */}
        <View style={{ alignItems: 'center', marginTop: 12 }}>
          <PdfImagePlaceholder 
            label="Mouvements recommandés (stick figures)"
            width={350}
            height={80}
          />
        </View>

        <PdfFooter pageNumber={3} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 4 : Nutrition + Poussée + Red flags + Sources */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{pathology.title} — Conseils complémentaires</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={pdfStyles.brandName}>COOLANCE</Text>
          </View>
        </View>

        {/* Layout 2 colonnes */}
        <View style={pdfStyles.row}>
          <View style={pdfStyles.col2}>
            {/* Nutrition */}
            <PdfNutrition nutrition={pathology.nutrition} />

            {/* Plan poussée si existe */}
            {pathology.flareProtocol && (
              <PdfFlareProtocol protocol={pathology.flareProtocol} />
            )}
          </View>

          <View style={pdfStyles.col2Last}>
            {/* Red flags */}
            <PdfRedFlags alerts={pathology.alertSigns} />

            {/* Message de clôture */}
            <View style={[pdfStyles.box, { marginTop: 12 }]}>
              <Text style={{ fontSize: 9, color: PDF_COLORS.textMuted, textAlign: 'center' }}>
                En cas de doute ou de symptômes inhabituels, consultez un professionnel de santé.
              </Text>
            </View>
          </View>
        </View>

        {/* Sources */}
        <PdfSources sources={pathology.sources} lastUpdated={pathology.lastUpdated} />

        {/* Message final */}
        <View style={{ marginTop: 16, padding: 12, backgroundColor: PDF_COLORS.primaryLight, borderRadius: 8, alignItems: 'center' }}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: PDF_COLORS.primary, textAlign: 'center' }}>
            Des plans simples, pour reprendre la main sur votre santé.
          </Text>
          <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted, marginTop: 4 }}>
            coolance.fr — par le Dr Audric Bugnard
          </Text>
        </View>

        <PdfFooter pageNumber={4} totalPages={4} />
      </Page>
    </Document>
  );
};

export default Pdf4Pages;
