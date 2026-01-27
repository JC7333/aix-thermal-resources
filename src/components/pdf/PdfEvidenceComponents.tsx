// ============================================
// COMPOSANTS PDF EVIDENCE-BASED — COOLANCE
// ============================================
// Composants réutilisables pour générer les PDFs
// à partir des données evidence-pack.json
// ============================================

import React from 'react';
import { View, Text, Svg, Path, Circle, Rect, Line } from '@react-pdf/renderer';
import { pdfStyles, PDF_COLORS } from './PdfStyles';
import type { EvidenceSource, EvidenceRecommendation } from '@/data/evidence';

// ============================================
// HEADER
// ============================================

interface PdfHeaderProps {
  title: string;
  subtitle?: string;
  date?: string;
  compact?: boolean;
}

export const PdfHeader: React.FC<PdfHeaderProps> = ({ title, subtitle, date, compact }) => (
  <View style={pdfStyles.header}>
    <View>
      <Text style={compact ? pdfStyles.titleSmall : pdfStyles.title}>{title}</Text>
      {subtitle && <Text style={pdfStyles.subtitle}>{subtitle}</Text>}
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={pdfStyles.brandName}>COOLANCE</Text>
      <Text style={pdfStyles.brandSub}>par le Dr Audric Bugnard</Text>
      {date && <Text style={[pdfStyles.dateTag, { marginTop: 4 }]}>{date}</Text>}
    </View>
  </View>
);

// ============================================
// SECTION TITLE
// ============================================

interface PdfSectionTitleProps {
  children: React.ReactNode;
  icon?: string;
  small?: boolean;
}

export const PdfSectionTitle: React.FC<PdfSectionTitleProps> = ({ children, icon, small }) => (
  <Text style={small ? pdfStyles.sectionTitleSmall : pdfStyles.sectionTitle}>
    {icon && `${icon} `}{children}
  </Text>
);

// ============================================
// RECOMMANDATIONS EVIDENCE-BASED
// ============================================

interface PdfRecommendationsProps {
  recommendations: EvidenceRecommendation[];
  compact?: boolean;
}

const getEvidenceBadgeColor = (level: string) => {
  if (level.toLowerCase().includes('élevé')) return PDF_COLORS.secondary;
  if (level.toLowerCase().includes('modéré')) return PDF_COLORS.accent;
  return PDF_COLORS.textMuted;
};

export const PdfRecommendations: React.FC<PdfRecommendationsProps> = ({ recommendations, compact }) => (
  <View>
    {recommendations.slice(0, compact ? 5 : 7).map((rec, idx) => (
      <View key={idx} style={compact ? pdfStyles.listItem : pdfStyles.card}>
        <View style={{ 
          width: compact ? 16 : 24, 
          height: compact ? 16 : 24, 
          borderRadius: 12, 
          backgroundColor: PDF_COLORS.secondaryLight,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
        }}>
          <Text style={{ fontSize: compact ? 8 : 10, fontWeight: 700, color: PDF_COLORS.secondary }}>
            {idx + 1}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={compact ? pdfStyles.listTextSmall : pdfStyles.listText}>
            {rec.text}
          </Text>
          <Text style={{ 
            fontSize: 7, 
            color: getEvidenceBadgeColor(rec.evidence),
            marginTop: 2,
            fontWeight: 600,
          }}>
            ✓ {rec.evidence}
          </Text>
        </View>
      </View>
    ))}
  </View>
);

// ============================================
// RED FLAGS
// ============================================

interface PdfRedFlagsProps {
  alerts: string[];
  compact?: boolean;
}

export const PdfRedFlags: React.FC<PdfRedFlagsProps> = ({ alerts, compact }) => (
  <View style={pdfStyles.boxDanger}>
    <Text style={pdfStyles.alertTitle}>🚨 CONSULTEZ RAPIDEMENT SI :</Text>
    {alerts.slice(0, compact ? 4 : 6).map((alert, idx) => (
      <View key={idx} style={pdfStyles.listItemSmall}>
        <Text style={{ ...pdfStyles.bulletSmall, color: PDF_COLORS.danger }}>•</Text>
        <Text style={{ ...pdfStyles.listTextSmall, color: PDF_COLORS.danger }}>{alert}</Text>
      </View>
    ))}
    <Text style={{ fontSize: 7, color: PDF_COLORS.danger, marginTop: 6, fontWeight: 600 }}>
      Urgence : 15 ou 112
    </Text>
  </View>
);

// ============================================
// SOURCES EVIDENCE-BASED
// ============================================

interface PdfSourcesProps {
  sources: EvidenceSource[];
  lastUpdated?: string;
}

export const PdfSources: React.FC<PdfSourcesProps> = ({ sources, lastUpdated }) => (
  <View style={pdfStyles.sourcesContainer}>
    <Text style={{ fontSize: 9, fontWeight: 700, color: PDF_COLORS.primary, marginBottom: 6 }}>
      📚 Sources scientifiques
    </Text>
    {sources.slice(0, 6).map((source, idx) => (
      <View key={idx} style={{ marginBottom: 4 }}>
        <Text style={{ fontSize: 8, color: PDF_COLORS.text }}>
          • {source.title}
        </Text>
        <Text style={{ fontSize: 7, color: PDF_COLORS.textMuted, paddingLeft: 8 }}>
          {source.org}, {source.year}
        </Text>
      </View>
    ))}
    {lastUpdated && (
      <Text style={{ fontSize: 7, color: PDF_COLORS.textMuted, marginTop: 6, fontWeight: 600 }}>
        Dernière mise à jour : {lastUpdated}
      </Text>
    )}
  </View>
);

// ============================================
// VISUELS SVG — SCHÉMA "CE QUI SE PASSE"
// ============================================
// Utilise les diagrammes du pack src/components/pdf/diagrams/

import { AnatomyDiagrams } from './diagrams/AnatomyDiagrams';
import { ExerciseDiagrams } from './diagrams/ExerciseDiagrams';
import { getDiagramsBySlug } from './diagrams/DiagramsMapping';

interface PdfBodySchemaProps {
  slug: string;
  width?: number;
  height?: number;
}

export const PdfBodySchema: React.FC<PdfBodySchemaProps> = ({ slug, width = 160, height = 120 }) => {
  const diagramInfo = getDiagramsBySlug(slug);
  
  // Mapping des composants anatomiques
  const AnatomyComponent = diagramInfo 
    ? AnatomyDiagrams[diagramInfo.anatomy.id as keyof typeof AnatomyDiagrams]
    : null;

  return (
    <View style={{ alignItems: 'center', padding: 6, backgroundColor: PDF_COLORS.muted, borderRadius: 6, marginBottom: 8 }}>
      <Text style={{ fontSize: 7, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 4 }}>
        🔬 Ce qui se passe dans votre corps
      </Text>
      {AnatomyComponent ? (
        <AnatomyComponent width={width} height={height} />
      ) : (
        <View style={{ width, height, justifyContent: 'center', alignItems: 'center', backgroundColor: PDF_COLORS.primaryLight, borderRadius: 4 }}>
          <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted }}>Schéma anatomique</Text>
        </View>
      )}
    </View>
  );
};

// ============================================
// VISUELS SVG — EXERCICES / GESTES
// ============================================
// Utilise les diagrammes du pack src/components/pdf/diagrams/

interface PdfExerciseSchemaProps {
  slug: string;
  width?: number;
  height?: number;
}

export const PdfExerciseSchema: React.FC<PdfExerciseSchemaProps> = ({ slug, width = 200, height = 80 }) => {
  const diagramInfo = getDiagramsBySlug(slug);
  
  // Mapping des composants exercices
  const ExerciseComponent = diagramInfo 
    ? ExerciseDiagrams[diagramInfo.exercise.id as keyof typeof ExerciseDiagrams]
    : null;

  return (
    <View style={{ alignItems: 'center', padding: 6, backgroundColor: PDF_COLORS.secondaryLight, borderRadius: 6, marginBottom: 8 }}>
      <Text style={{ fontSize: 7, fontWeight: 600, color: PDF_COLORS.secondary, marginBottom: 4 }}>
        💪 Exercices recommandés
      </Text>
      {ExerciseComponent ? (
        <ExerciseComponent width={width} height={height} />
      ) : (
        <View style={{ width, height, justifyContent: 'center', alignItems: 'center', backgroundColor: PDF_COLORS.muted, borderRadius: 4 }}>
          <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted }}>Exercices illustrés</Text>
        </View>
      )}
    </View>
  );
};

// ============================================
// PLAN 7 JOURS (depuis evidence-pack)
// ============================================

import type { SevenDayPlan, EightWeekProgram } from '@/data/evidence';

interface PdfSevenDayPlanProps {
  plan: SevenDayPlan;
  compact?: boolean;
}

export const PdfSevenDayPlan: React.FC<PdfSevenDayPlanProps> = ({ plan, compact }) => (
  <View style={[pdfStyles.boxLevel0, { padding: compact ? 8 : 10 }]}>
    <Text style={{ fontSize: 10, fontWeight: 700, color: PDF_COLORS.secondary, marginBottom: 6 }}>
      ✨ {plan.levelName}
    </Text>
    {plan.days.slice(0, 7).map((day, idx) => (
      <View key={idx} style={{ marginBottom: compact ? 3 : 5 }}>
        <Text style={{ fontSize: compact ? 7 : 8, fontWeight: 700, color: PDF_COLORS.primary }}>
          {day.day}
        </Text>
        {day.actions.slice(0, compact ? 2 : 3).map((action, aIdx) => (
          <Text key={aIdx} style={{ fontSize: compact ? 6 : 7, color: PDF_COLORS.text, paddingLeft: 6 }}>
            • {action}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

// ============================================
// PROGRAMME 8 SEMAINES (depuis evidence-pack)
// ============================================

interface PdfEightWeekProgramProps {
  program: EightWeekProgram;
  compact?: boolean;
}

export const PdfEightWeekProgram: React.FC<PdfEightWeekProgramProps> = ({ program, compact }) => (
  <View style={[pdfStyles.box, { padding: compact ? 8 : 10 }]}>
    <Text style={{ fontSize: 10, fontWeight: 700, color: PDF_COLORS.secondary, marginBottom: 8 }}>
      🎯 {program.levelName}
    </Text>
    {program.weeks.slice(0, 4).map((week, idx) => (
      <View key={idx} style={{ marginBottom: 6 }}>
        <Text style={{ fontSize: 8, fontWeight: 700, color: PDF_COLORS.primary }}>
          {week.week}
        </Text>
        <Text style={{ fontSize: 7, color: PDF_COLORS.accent, fontWeight: 600, marginBottom: 2 }}>
          Focus : {week.focus}
        </Text>
        {week.exercises.slice(0, 2).map((ex, eIdx) => (
          <Text key={eIdx} style={{ fontSize: 7, color: PDF_COLORS.text, paddingLeft: 6 }}>
            • {ex}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

// ============================================
// FOOTER
// ============================================

interface PdfFooterProps {
  pageNumber?: number;
  totalPages?: number;
  compact?: boolean;
}

export const PdfFooter: React.FC<PdfFooterProps> = ({ pageNumber, totalPages, compact }) => (
  <View style={compact ? pdfStyles.footerSmall : pdfStyles.footer}>
    <Text style={pdfStyles.footerText}>
      Informations générales — ne remplace pas un avis médical. Urgence : 15 / 112
    </Text>
    <Text style={pdfStyles.footerText}>
      coolance.fr {pageNumber && totalPages ? `• ${pageNumber}/${totalPages}` : ''}
    </Text>
  </View>
);

export default {
  PdfHeader,
  PdfSectionTitle,
  PdfRecommendations,
  PdfRedFlags,
  PdfSources,
  PdfBodySchema,
  PdfExerciseSchema,
  PdfSevenDayPlan,
  PdfEightWeekProgram,
  PdfFooter,
};
