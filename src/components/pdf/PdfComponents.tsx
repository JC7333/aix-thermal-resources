// ============================================
// COMPOSANTS PDF RÉUTILISABLES — COOLANCE
// ============================================

import React from 'react';
import { View, Text, Page, Document } from '@react-pdf/renderer';
import { pdfStyles, PDF_COLORS } from './PdfStyles';
import type { ContentSource, DayPlan, Tip, LevelPlan, WeekProgram, NutritionPlan, FlareProtocol } from '@/content/content';

// ============================================
// HEADER
// ============================================

interface PdfHeaderProps {
  title: string;
  subtitle?: string;
  date: string;
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
      <Text style={[pdfStyles.dateTag, { marginTop: 4 }]}>{date}</Text>
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
// ENCADRÉ NIVEAU 0
// ============================================

interface PdfLevel0BoxProps {
  title?: string;
  items: string[];
}

export const PdfLevel0Box: React.FC<PdfLevel0BoxProps> = ({ title = "Version très facile (Niveau 0)", items }) => (
  <View style={pdfStyles.boxLevel0}>
    <Text style={pdfStyles.level0Title}>✨ {title}</Text>
    {items.map((item, idx) => (
      <View key={idx} style={pdfStyles.listItemSmall}>
        <Text style={pdfStyles.bulletSmall}>•</Text>
        <Text style={pdfStyles.listTextSmall}>{item}</Text>
      </View>
    ))}
  </View>
);

// ============================================
// CHECKLIST
// ============================================

interface PdfChecklistProps {
  title?: string;
  items: string[];
  compact?: boolean;
}

export const PdfChecklist: React.FC<PdfChecklistProps> = ({ title, items, compact }) => (
  <View style={compact ? pdfStyles.box : pdfStyles.boxPrimary}>
    {title && <Text style={compact ? pdfStyles.sectionTitleSmall : pdfStyles.sectionTitle}>{title}</Text>}
    {items.map((item, idx) => (
      <View key={idx} style={compact ? pdfStyles.listItemSmall : pdfStyles.listItem}>
        <View style={pdfStyles.checkbox} />
        <Text style={compact ? pdfStyles.listTextSmall : pdfStyles.listText}>{item}</Text>
      </View>
    ))}
  </View>
);

// ============================================
// TOP 5 CONSEILS
// ============================================

interface PdfTop5Props {
  tips: Tip[];
  compact?: boolean;
}

export const PdfTop5: React.FC<PdfTop5Props> = ({ tips, compact }) => (
  <View>
    {tips.slice(0, 5).map((tip, idx) => (
      <View key={idx} style={compact ? pdfStyles.listItem : pdfStyles.card}>
        <Text style={{ fontSize: compact ? 10 : 14, marginRight: 8 }}>{tip.icon}</Text>
        <View style={{ flex: 1 }}>
          <Text style={compact ? { fontSize: 9, fontWeight: 600, color: PDF_COLORS.primary } : pdfStyles.cardTitle}>
            {idx + 1}. {tip.title}
          </Text>
          {!compact && <Text style={pdfStyles.cardText}>{tip.description}</Text>}
        </View>
      </View>
    ))}
  </View>
);

// ============================================
// PLAN 7 JOURS
// ============================================

interface PdfPlan7JoursProps {
  plans: LevelPlan[];
  showAllLevels?: boolean;
  compact?: boolean;
}

export const PdfPlan7Jours: React.FC<PdfPlan7JoursProps> = ({ plans, showAllLevels, compact }) => {
  // En mode compact, on n'affiche que le niveau 0
  const plansToShow = compact ? plans.filter(p => p.level === 0) : showAllLevels ? plans : plans.slice(0, 2);
  
  return (
    <View>
      {plansToShow.map((plan) => (
        <View key={plan.level} style={{ marginBottom: compact ? 8 : 12 }}>
          <Text style={compact ? pdfStyles.sectionTitleSmall : { fontSize: 11, fontWeight: 700, color: PDF_COLORS.secondary, marginBottom: 6 }}>
            {plan.levelName}
          </Text>
          
          {compact ? (
            // Mode compact : 2 colonnes
            <View style={pdfStyles.row}>
              <View style={pdfStyles.col2}>
                {plan.days?.slice(0, 4).map((day, idx) => (
                  <View key={idx} style={pdfStyles.dayCard}>
                    <Text style={pdfStyles.dayTitle}>{day.day}</Text>
                    {day.actions.slice(0, 2).map((action, aIdx) => (
                      <Text key={aIdx} style={pdfStyles.dayAction}>• {action}</Text>
                    ))}
                  </View>
                ))}
              </View>
              <View style={pdfStyles.col2Last}>
                {plan.days?.slice(4, 7).map((day, idx) => (
                  <View key={idx} style={pdfStyles.dayCard}>
                    <Text style={pdfStyles.dayTitle}>{day.day}</Text>
                    {day.actions.slice(0, 2).map((action, aIdx) => (
                      <Text key={aIdx} style={pdfStyles.dayAction}>• {action}</Text>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          ) : (
            // Mode détaillé
            <View>
              {plan.days?.map((day, idx) => (
                <View key={idx} style={pdfStyles.dayCard}>
                  <Text style={pdfStyles.dayTitle}>{day.day}</Text>
                  {day.actions.map((action, aIdx) => (
                    <Text key={aIdx} style={pdfStyles.dayAction}>• {action}</Text>
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

// ============================================
// PROGRAMME 8 SEMAINES
// ============================================

interface PdfProgramme8SemainesProps {
  programs: WeekProgram[];
  compact?: boolean;
}

export const PdfProgramme8Semaines: React.FC<PdfProgramme8SemainesProps> = ({ programs, compact }) => {
  // En mode compact, seulement niveau 0-1
  const programsToShow = compact ? programs.filter(p => p.level <= 1) : programs;
  
  return (
    <View>
      {programsToShow.map((program) => (
        <View key={program.level} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 10, fontWeight: 700, color: PDF_COLORS.secondary, marginBottom: 6 }}>
            {program.levelName}
          </Text>
          
          <View style={pdfStyles.row}>
            {program.weeks.slice(0, compact ? 4 : 8).map((week, idx) => (
              <View key={idx} style={compact ? pdfStyles.col2 : pdfStyles.col3}>
                <View style={pdfStyles.dayCard}>
                  <Text style={pdfStyles.dayTitle}>{week.week}</Text>
                  <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted, marginBottom: 3 }}>{week.focus}</Text>
                  {week.exercises.slice(0, 2).map((ex, eIdx) => (
                    <Text key={eIdx} style={pdfStyles.dayAction}>• {ex}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

// ============================================
// NUTRITION
// ============================================

interface PdfNutritionProps {
  nutrition: NutritionPlan;
  compact?: boolean;
}

export const PdfNutrition: React.FC<PdfNutritionProps> = ({ nutrition, compact }) => (
  <View style={pdfStyles.boxSecondary}>
    <Text style={compact ? pdfStyles.sectionTitleSmall : pdfStyles.sectionTitle}>🥗 Nutrition facile</Text>
    
    <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.secondary, marginBottom: 4 }}>
      Assiette idéale :
    </Text>
    {nutrition.idealPlate.slice(0, compact ? 3 : 5).map((item, idx) => (
      <View key={idx} style={pdfStyles.listItemSmall}>
        <Text style={pdfStyles.bulletSmall}>•</Text>
        <Text style={pdfStyles.listTextSmall}>{item}</Text>
      </View>
    ))}
    
    {!compact && (
      <>
        <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.secondary, marginTop: 8, marginBottom: 4 }}>
          Conseils :
        </Text>
        {nutrition.tips.slice(0, 3).map((tip, idx) => (
          <View key={idx} style={pdfStyles.listItemSmall}>
            <Text style={pdfStyles.bulletSmall}>•</Text>
            <Text style={pdfStyles.listTextSmall}>{tip}</Text>
          </View>
        ))}
      </>
    )}
  </View>
);

// ============================================
// PLAN POUSSÉE 48H
// ============================================

interface PdfFlareProtocolProps {
  protocol: FlareProtocol;
  compact?: boolean;
}

export const PdfFlareProtocol: React.FC<PdfFlareProtocolProps> = ({ protocol, compact }) => (
  <View style={pdfStyles.boxPrimary}>
    <Text style={compact ? pdfStyles.sectionTitleSmall : pdfStyles.sectionTitle}>⚡ {protocol.title}</Text>
    
    <View style={pdfStyles.row}>
      <View style={pdfStyles.col2}>
        <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 4 }}>
          0-24h :
        </Text>
        {protocol.hours0to24.slice(0, 3).map((action, idx) => (
          <Text key={idx} style={pdfStyles.dayAction}>• {action}</Text>
        ))}
      </View>
      <View style={pdfStyles.col2Last}>
        <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 4 }}>
          24-48h :
        </Text>
        {protocol.hours24to48.slice(0, 3).map((action, idx) => (
          <Text key={idx} style={pdfStyles.dayAction}>• {action}</Text>
        ))}
      </View>
    </View>
    
    {!compact && (
      <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted, marginTop: 6 }}>
        Reprise : {protocol.resumeActivity}
      </Text>
    )}
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
  </View>
);

// ============================================
// SOURCES
// ============================================

interface PdfSourcesProps {
  sources: ContentSource[];
  lastUpdated: string;
}

export const PdfSources: React.FC<PdfSourcesProps> = ({ sources, lastUpdated }) => (
  <View style={pdfStyles.sourcesContainer}>
    <Text style={{ fontSize: 8, fontWeight: 600, color: PDF_COLORS.textMuted, marginBottom: 4 }}>
      Sources (sélection) — Mise à jour : {lastUpdated}
    </Text>
    {sources.slice(0, 6).map((source, idx) => (
      <Text key={idx} style={pdfStyles.sourceItem}>
        • {source.name} ({source.year})
      </Text>
    ))}
  </View>
);

// ============================================
// IMAGE PLACEHOLDER
// ============================================

interface PdfImagePlaceholderProps {
  label: string;
  width?: number;
  height?: number;
}

export const PdfImagePlaceholder: React.FC<PdfImagePlaceholderProps> = ({ label, width = 200, height = 100 }) => (
  <View style={[pdfStyles.imagePlaceholder, { width, height }]}>
    <Text style={pdfStyles.imagePlaceholderText}>{label}</Text>
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
  PdfLevel0Box,
  PdfChecklist,
  PdfTop5,
  PdfPlan7Jours,
  PdfProgramme8Semaines,
  PdfNutrition,
  PdfFlareProtocol,
  PdfRedFlags,
  PdfSources,
  PdfImagePlaceholder,
  PdfFooter,
};
