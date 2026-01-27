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

interface PdfBodySchemaProps {
  slug: string;
  width?: number;
  height?: number;
}

export const PdfBodySchema: React.FC<PdfBodySchemaProps> = ({ slug, width = 180, height = 120 }) => {
  // Schémas simplifiés par pathologie
  const schemas: Record<string, React.ReactNode> = {
    'arthrose': (
      <Svg width={width} height={height} viewBox="0 0 180 120">
        {/* Articulation stylisée */}
        <Rect x="40" y="20" width="100" height="80" rx="10" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="2" />
        {/* Os supérieur */}
        <Rect x="55" y="25" width="70" height="25" rx="5" fill="#ffffff" stroke="#5a6a7a" strokeWidth="1" />
        {/* Cartilage (sain) */}
        <Rect x="55" y="48" width="35" height="6" rx="2" fill="#3d9970" />
        <Text x="55" y="65" style={{ fontSize: 6, fill: PDF_COLORS.secondary }}>Cartilage sain</Text>
        {/* Cartilage (usé) */}
        <Rect x="90" y="48" width="35" height="3" rx="1" fill="#d4a24c" />
        <Text x="90" y="65" style={{ fontSize: 6, fill: PDF_COLORS.accent }}>Cartilage usé</Text>
        {/* Os inférieur */}
        <Rect x="55" y="70" width="70" height="25" rx="5" fill="#ffffff" stroke="#5a6a7a" strokeWidth="1" />
        {/* Légende */}
        <Text x="60" y="110" style={{ fontSize: 7, fill: PDF_COLORS.textMuted }}>Mouvement = nutrition du cartilage</Text>
      </Svg>
    ),
    'lombalgie-chronique': (
      <Svg width={width} height={height} viewBox="0 0 180 120">
        {/* Colonne stylisée */}
        <Rect x="75" y="10" width="30" height="100" rx="5" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="2" />
        {/* Vertèbres */}
        {[15, 35, 55, 75].map((y, i) => (
          <React.Fragment key={i}>
            <Rect x="80" y={y} width="20" height="12" rx="3" fill="#ffffff" stroke="#5a6a7a" strokeWidth="1" />
            {i < 3 && <Rect x="82" y={y + 13} width="16" height="4" rx="1" fill="#3d9970" />}
          </React.Fragment>
        ))}
        {/* Zone de tension */}
        <Circle cx="120" cy="60" r="15" fill="#fce8ea" stroke="#dc3545" strokeWidth="1" strokeDasharray="3,2" />
        <Text x="115" y="85" style={{ fontSize: 6, fill: PDF_COLORS.danger }}>Tension</Text>
        {/* Légende */}
        <Text x="40" y="115" style={{ fontSize: 7, fill: PDF_COLORS.textMuted }}>Bouger détend les muscles</Text>
      </Svg>
    ),
    'insuffisance-veineuse-chronique': (
      <Svg width={width} height={height} viewBox="0 0 180 120">
        {/* Jambe stylisée */}
        <Rect x="70" y="10" width="40" height="90" rx="8" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="2" />
        {/* Veines */}
        <Path d="M85 15 Q80 40 90 60 Q95 80 85 95" stroke="#6b46c1" strokeWidth="2" fill="none" />
        {/* Valvules saines */}
        <Circle cx="85" cy="30" r="4" fill="#3d9970" />
        <Text x="95" y="32" style={{ fontSize: 6, fill: PDF_COLORS.secondary }}>Valvule OK</Text>
        {/* Valvule défaillante */}
        <Circle cx="90" cy="70" r="4" fill="#dc3545" />
        <Text x="100" y="72" style={{ fontSize: 6, fill: PDF_COLORS.danger }}>Reflux</Text>
        {/* Légende */}
        <Text x="35" y="115" style={{ fontSize: 7, fill: PDF_COLORS.textMuted }}>Compression + mouvement</Text>
      </Svg>
    ),
    'bpco': (
      <Svg width={width} height={height} viewBox="0 0 180 120">
        {/* Poumons stylisés */}
        <Path d="M50 30 Q30 50 40 80 Q50 100 70 95 Q90 90 90 60 Q90 40 70 30 Z" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="2" />
        <Path d="M130 30 Q150 50 140 80 Q130 100 110 95 Q90 90 90 60 Q90 40 110 30 Z" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="2" />
        {/* Trachée */}
        <Rect x="85" y="10" width="10" height="25" rx="3" fill="#ffffff" stroke="#5a6a7a" strokeWidth="1" />
        {/* Bronches obstruées */}
        <Circle cx="60" cy="60" r="6" fill="#d4a24c" />
        <Circle cx="120" cy="60" r="6" fill="#d4a24c" />
        {/* Légende */}
        <Text x="45" y="115" style={{ fontSize: 7, fill: PDF_COLORS.textMuted }}>Réhabilitation respiratoire</Text>
      </Svg>
    ),
    'otites-a-repetition-enfant': (
      <Svg width={width} height={height} viewBox="0 0 180 120">
        {/* Oreille stylisée */}
        <Circle cx="90" cy="50" r="35" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="2" />
        {/* Conduit auditif */}
        <Rect x="85" y="35" width="10" height="30" rx="3" fill="#ffffff" stroke="#5a6a7a" strokeWidth="1" />
        {/* Tympan */}
        <Circle cx="90" cy="70" r="8" fill="#ffffff" stroke="#1a7a8c" strokeWidth="2" />
        {/* Inflammation */}
        <Circle cx="90" cy="70" r="4" fill="#dc3545" opacity="0.6" />
        {/* Légende */}
        <Text x="50" y="100" style={{ fontSize: 7, fill: PDF_COLORS.textMuted }}>Prévention des infections</Text>
      </Svg>
    ),
  };

  return (
    <View style={{ alignItems: 'center', padding: 8, backgroundColor: PDF_COLORS.muted, borderRadius: 6, marginBottom: 8 }}>
      <Text style={{ fontSize: 8, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 6 }}>
        🔬 Ce qui se passe dans votre corps
      </Text>
      {schemas[slug] || (
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

interface PdfExerciseSchemaProps {
  slug: string;
  width?: number;
  height?: number;
}

export const PdfExerciseSchema: React.FC<PdfExerciseSchemaProps> = ({ slug, width = 220, height = 80 }) => {
  // Stick figures pour les exercices
  const exercises: Record<string, React.ReactNode> = {
    'arthrose': (
      <Svg width={width} height={height} viewBox="0 0 220 80">
        {/* Exercice 1: Marche */}
        <Circle cx="30" cy="15" r="6" fill="#1a7a8c" />
        <Line x1="30" y1="21" x2="30" y2="40" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="30" y1="40" x2="22" y2="55" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="30" y1="40" x2="38" y2="55" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="30" y1="28" x2="20" y2="35" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="30" y1="28" x2="40" y2="35" stroke="#1a7a8c" strokeWidth="2" />
        <Text x="15" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Marche</Text>
        
        {/* Exercice 2: Renforcement */}
        <Circle cx="90" cy="15" r="6" fill="#1a7a8c" />
        <Line x1="90" y1="21" x2="90" y2="40" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="90" y1="40" x2="85" y2="55" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="90" y1="40" x2="95" y2="55" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="90" y1="28" x2="75" y2="20" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="90" y1="28" x2="105" y2="20" stroke="#1a7a8c" strokeWidth="2" />
        <Circle cx="72" cy="18" r="4" fill="#d4a24c" />
        <Circle cx="108" cy="18" r="4" fill="#d4a24c" />
        <Text x="65" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Renforcement</Text>
        
        {/* Exercice 3: Étirement */}
        <Circle cx="160" cy="30" r="6" fill="#1a7a8c" />
        <Line x1="160" y1="36" x2="160" y2="50" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="160" y1="50" x2="150" y2="55" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="160" y1="50" x2="170" y2="45" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="160" y1="40" x2="145" y2="35" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="160" y1="40" x2="180" y2="30" stroke="#1a7a8c" strokeWidth="2" />
        <Text x="145" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Étirement</Text>
      </Svg>
    ),
    'lombalgie-chronique': (
      <Svg width={width} height={height} viewBox="0 0 220 80">
        {/* Exercice 1: Gainage */}
        <Line x1="20" y1="45" x2="60" y2="45" stroke="#1a7a8c" strokeWidth="2" />
        <Circle cx="55" cy="40" r="5" fill="#1a7a8c" />
        <Line x1="25" y1="45" x2="25" y2="55" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="55" y1="45" x2="55" y2="55" stroke="#1a7a8c" strokeWidth="2" />
        <Text x="25" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Gainage</Text>
        
        {/* Exercice 2: Chat/Vache */}
        <Line x1="90" y1="35" x2="130" y2="35" stroke="#1a7a8c" strokeWidth="2" />
        <Path d="M90 35 Q110 20 130 35" stroke="#3d9970" strokeWidth="1" fill="none" strokeDasharray="3,2" />
        <Circle cx="125" cy="30" r="5" fill="#1a7a8c" />
        <Line x1="95" y1="35" x2="95" y2="50" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="125" y1="35" x2="125" y2="50" stroke="#1a7a8c" strokeWidth="2" />
        <Text x="95" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Chat/Vache</Text>
        
        {/* Exercice 3: Marche */}
        <Circle cx="180" cy="15" r="5" fill="#1a7a8c" />
        <Line x1="180" y1="20" x2="180" y2="38" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="180" y1="38" x2="172" y2="52" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="180" y1="38" x2="188" y2="52" stroke="#1a7a8c" strokeWidth="2" />
        <Text x="165" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Marche</Text>
      </Svg>
    ),
    'insuffisance-veineuse-chronique': (
      <Svg width={width} height={height} viewBox="0 0 220 80">
        {/* Exercice 1: Pointes de pieds */}
        <Rect x="20" y="30" width="30" height="8" rx="2" fill="#1a7a8c" />
        <Path d="M25 38 L25 55 L35 55" stroke="#1a7a8c" strokeWidth="2" fill="none" />
        <Path d="M45 38 L45 55 L55 55" stroke="#1a7a8c" strokeWidth="2" fill="none" />
        <Text x="15" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Pointes</Text>
        
        {/* Exercice 2: Élévation jambes */}
        <Line x1="90" y1="50" x2="130" y2="50" stroke="#5a6a7a" strokeWidth="1" />
        <Circle cx="95" cy="40" r="5" fill="#1a7a8c" />
        <Line x1="100" y1="40" x2="115" y2="40" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="115" y1="40" x2="135" y2="25" stroke="#1a7a8c" strokeWidth="2" />
        <Text x="90" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Élévation</Text>
        
        {/* Exercice 3: Marche */}
        <Circle cx="180" cy="15" r="5" fill="#1a7a8c" />
        <Line x1="180" y1="20" x2="180" y2="38" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="180" y1="38" x2="172" y2="52" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="180" y1="38" x2="188" y2="52" stroke="#1a7a8c" strokeWidth="2" />
        <Text x="165" y="70" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Marche</Text>
      </Svg>
    ),
    'bpco': (
      <Svg width={width} height={height} viewBox="0 0 220 80">
        {/* Exercice 1: Respiration lèvres pincées */}
        <Circle cx="35" cy="20" r="10" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="2" />
        <Circle cx="35" cy="22" r="2" fill="#1a7a8c" />
        <Path d="M25 35 Q35 45 45 35" stroke="#3d9970" strokeWidth="2" fill="none" />
        <Text x="10" y="65" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Lèvres pincées</Text>
        
        {/* Exercice 2: Marche fractionnée */}
        <Circle cx="110" cy="15" r="5" fill="#1a7a8c" />
        <Line x1="110" y1="20" x2="110" y2="38" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="110" y1="38" x2="102" y2="52" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="110" y1="38" x2="118" y2="52" stroke="#1a7a8c" strokeWidth="2" />
        <Text x="90" y="65" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Marche</Text>
        
        {/* Exercice 3: Renforcement doux */}
        <Circle cx="180" cy="20" r="5" fill="#1a7a8c" />
        <Line x1="180" y1="25" x2="180" y2="42" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="180" y1="32" x2="168" y2="28" stroke="#1a7a8c" strokeWidth="2" />
        <Line x1="180" y1="32" x2="192" y2="28" stroke="#1a7a8c" strokeWidth="2" />
        <Circle cx="166" cy="26" r="3" fill="#d4a24c" />
        <Circle cx="194" cy="26" r="3" fill="#d4a24c" />
        <Text x="158" y="65" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Renforcement</Text>
      </Svg>
    ),
    'otites-a-repetition-enfant': (
      <Svg width={width} height={height} viewBox="0 0 220 80">
        {/* Geste 1: Lavage mains */}
        <Circle cx="35" cy="30" r="12" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="2" />
        <Path d="M30 25 Q35 35 40 25" stroke="#1a7a8c" strokeWidth="1" fill="none" />
        <Circle cx="30" cy="35" r="3" fill="#3d9970" />
        <Circle cx="40" cy="35" r="3" fill="#3d9970" />
        <Text x="10" y="60" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Lavage mains</Text>
        
        {/* Geste 2: Éviter fumée */}
        <Circle cx="110" cy="25" r="15" fill="#fce8ea" stroke="#dc3545" strokeWidth="1" strokeDasharray="3,2" />
        <Path d="M105 35 Q110 20 115 35" stroke="#5a6a7a" strokeWidth="1" fill="none" />
        <Line x1="95" y1="15" x2="125" y2="35" stroke="#dc3545" strokeWidth="2" />
        <Text x="90" y="60" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Pas de fumée</Text>
        
        {/* Geste 3: Aération */}
        <Rect x="160" y="15" width="35" height="30" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="1" />
        <Path d="M170 25 L180 20 L180 35 L170 30" stroke="#3d9970" strokeWidth="2" fill="none" />
        <Text x="160" y="60" style={{ fontSize: 7, fill: PDF_COLORS.text }}>Aération</Text>
      </Svg>
    ),
  };

  return (
    <View style={{ alignItems: 'center', padding: 8, backgroundColor: PDF_COLORS.secondaryLight, borderRadius: 6, marginBottom: 8 }}>
      <Text style={{ fontSize: 8, fontWeight: 600, color: PDF_COLORS.secondary, marginBottom: 6 }}>
        💪 Exercices & gestes recommandés
      </Text>
      {exercises[slug] || (
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
