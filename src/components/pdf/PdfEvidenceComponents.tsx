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
// Schémas anatomiques améliorés avec détails et annotations

interface PdfBodySchemaProps {
  slug: string;
  width?: number;
  height?: number;
}

// Composant flèche réutilisable
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string }> = ({ 
  x1, y1, x2, y2, color = PDF_COLORS.textMuted 
}) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const headLen = 4;
  return (
    <>
      <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" />
      <Line 
        x1={x2} y1={y2} 
        x2={x2 - headLen * Math.cos(angle - Math.PI / 6)} 
        y2={y2 - headLen * Math.sin(angle - Math.PI / 6)} 
        stroke={color} strokeWidth="1" 
      />
      <Line 
        x1={x2} y1={y2} 
        x2={x2 - headLen * Math.cos(angle + Math.PI / 6)} 
        y2={y2 - headLen * Math.sin(angle + Math.PI / 6)} 
        stroke={color} strokeWidth="1" 
      />
    </>
  );
};

export const PdfBodySchema: React.FC<PdfBodySchemaProps> = ({ slug, width = 200, height = 140 }) => {
  const schemas: Record<string, React.ReactNode> = {
    'arthrose': (
      <Svg width={width} height={height} viewBox="0 0 200 140">
        {/* Titre */}
        <Text x="100" y="10" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: PDF_COLORS.primary }}>
          Articulation du genou
        </Text>
        
        {/* Fond articulaire */}
        <Rect x="30" y="20" width="140" height="95" rx="8" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="1" />
        
        {/* === CÔTÉ SAIN (gauche) === */}
        <Text x="60" y="32" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.secondary }}>
          SAIN
        </Text>
        {/* Os fémoral */}
        <Path d="M35 40 Q45 38 55 40 L55 52 Q45 54 35 52 Z" fill="#f5f5f5" stroke="#8a9aaa" strokeWidth="1.5" />
        <Text x="45" y="48" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>Fémur</Text>
        {/* Cartilage épais */}
        <Rect x="35" y="53" width="22" height="7" rx="2" fill="#3d9970" />
        <Line x1="58" y1="56" x2="72" y2="50" stroke={PDF_COLORS.secondary} strokeWidth="0.5" />
        <Text x="73" y="52" style={{ fontSize: 5, fill: PDF_COLORS.secondary }}>Cartilage épais</Text>
        {/* Espace articulaire */}
        <Rect x="35" y="61" width="22" height="4" rx="1" fill="#e6f4f6" />
        <Text x="73" y="64" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>Liquide synovial</Text>
        {/* Cartilage tibial */}
        <Rect x="35" y="66" width="22" height="7" rx="2" fill="#3d9970" />
        {/* Tibia */}
        <Path d="M35 74 Q45 72 55 74 L55 86 Q45 88 35 86 Z" fill="#f5f5f5" stroke="#8a9aaa" strokeWidth="1.5" />
        <Text x="45" y="82" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>Tibia</Text>
        
        {/* === CÔTÉ ARTHROSIQUE (droite) === */}
        <Text x="140" y="32" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.danger }}>
          ARTHROSE
        </Text>
        {/* Os fémoral avec ostéophyte */}
        <Path d="M125 40 Q135 38 148 40 L150 44 L148 52 Q135 54 125 52 Z" fill="#f0f0f0" stroke="#8a9aaa" strokeWidth="1.5" />
        <Circle cx="149" cy="43" r="3" fill="#d4a24c" stroke="#c4942c" strokeWidth="0.5" />
        <Line x1="152" y1="43" x2="168" y2="38" stroke={PDF_COLORS.accent} strokeWidth="0.5" />
        <Text x="170" y="40" style={{ fontSize: 5, fill: PDF_COLORS.accent }}>Ostéophyte</Text>
        {/* Cartilage aminici */}
        <Rect x="125" y="53" width="22" height="3" rx="1" fill="#d4a24c" />
        <Rect x="133" y="53" width="6" height="3" rx="1" fill="#dc3545" opacity="0.6" />
        <Text x="170" y="56" style={{ fontSize: 5, fill: PDF_COLORS.danger }}>Usure</Text>
        {/* Espace réduit */}
        <Rect x="125" y="57" width="22" height="2" rx="1" fill="#e6f4f6" opacity="0.5" />
        {/* Cartilage tibial aminici */}
        <Rect x="125" y="60" width="22" height="3" rx="1" fill="#d4a24c" />
        {/* Tibia */}
        <Path d="M125 64 Q135 62 145 64 L145 86 Q135 88 125 86 Z" fill="#f0f0f0" stroke="#8a9aaa" strokeWidth="1.5" />
        {/* Inflammation */}
        <Circle cx="155" cy="70" r="6" fill="#fce8ea" stroke="#dc3545" strokeWidth="0.5" strokeDasharray="2,1" />
        <Text x="155" y="72" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.danger }}>!</Text>
        
        {/* Flèche comparative */}
        <Line x1="75" y1="60" x2="105" y2="60" stroke={PDF_COLORS.textMuted} strokeWidth="1" strokeDasharray="2,2" />
        <Path d="M103 57 L108 60 L103 63" stroke={PDF_COLORS.textMuted} strokeWidth="1" fill="none" />
        
        {/* Légende action */}
        <Rect x="30" y="100" width="140" height="28" rx="4" fill={PDF_COLORS.secondaryLight} />
        <Text x="100" y="112" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: PDF_COLORS.secondary }}>
          ✓ Le mouvement nourrit le cartilage
        </Text>
        <Text x="100" y="122" textAnchor="middle" style={{ fontSize: 6, fill: PDF_COLORS.text }}>
          L'exercice régulier réduit la douleur et l'inflammation
        </Text>
      </Svg>
    ),
    
    'lombalgie-chronique': (
      <Svg width={width} height={height} viewBox="0 0 200 140">
        {/* Titre */}
        <Text x="100" y="10" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: PDF_COLORS.primary }}>
          Colonne lombaire
        </Text>
        
        {/* Fond */}
        <Rect x="20" y="18" width="160" height="95" rx="6" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="1" />
        
        {/* === COLONNE VERTÉBRALE === */}
        {/* Vertèbres L1-L5 */}
        {[22, 38, 54, 70, 86].map((y, i) => (
          <React.Fragment key={i}>
            {/* Corps vertébral */}
            <Rect x="75" y={y} width="30" height="12" rx="3" fill="#f5f5f5" stroke="#8a9aaa" strokeWidth="1" />
            <Text x="90" y={y + 8} textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>
              L{i + 1}
            </Text>
            {/* Disque intervertébral */}
            {i < 4 && (
              <Rect x="78" y={y + 12} width="24" height="4" rx="1" fill={i === 3 ? "#d4a24c" : "#3d9970"} />
            )}
            {/* Apophyses épineuses */}
            <Rect x="88" y={y - 3} width="4" height="6" rx="1" fill="#e0e5ea" stroke="#8a9aaa" strokeWidth="0.5" />
          </React.Fragment>
        ))}
        
        {/* Zone de tension musculaire */}
        <Path 
          d="M110 35 Q130 50 125 75 Q120 90 115 100" 
          stroke="#dc3545" 
          strokeWidth="8" 
          fill="none" 
          opacity="0.2"
        />
        <Path 
          d="M110 35 Q130 50 125 75 Q120 90 115 100" 
          stroke="#dc3545" 
          strokeWidth="1.5" 
          fill="none"
          strokeDasharray="4,2"
        />
        
        {/* Annotations */}
        <Line x1="128" y1="55" x2="155" y2="45" stroke={PDF_COLORS.danger} strokeWidth="0.5" />
        <Text x="157" y="42" style={{ fontSize: 5, fill: PDF_COLORS.danger }}>Tension</Text>
        <Text x="157" y="48" style={{ fontSize: 5, fill: PDF_COLORS.danger }}>musculaire</Text>
        
        {/* Muscles paravertébraux (gauche, sains) */}
        <Path 
          d="M65 35 Q50 50 55 75 Q60 90 65 100" 
          stroke="#3d9970" 
          strokeWidth="6" 
          fill="none" 
          opacity="0.3"
        />
        <Line x1="52" y1="65" x2="30" y2="55" stroke={PDF_COLORS.secondary} strokeWidth="0.5" />
        <Text x="28" y="52" textAnchor="end" style={{ fontSize: 5, fill: PDF_COLORS.secondary }}>Muscles</Text>
        <Text x="28" y="58" textAnchor="end" style={{ fontSize: 5, fill: PDF_COLORS.secondary }}>détendus</Text>
        
        {/* Disque problématique annoté */}
        <Line x1="102" y1="88" x2="125" y2="95" stroke={PDF_COLORS.accent} strokeWidth="0.5" />
        <Text x="127" y="92" style={{ fontSize: 5, fill: PDF_COLORS.accent }}>Disque</Text>
        <Text x="127" y="98" style={{ fontSize: 5, fill: PDF_COLORS.accent }}>comprimé</Text>
        
        {/* Légende action */}
        <Rect x="20" y="115" width="160" height="20" rx="4" fill={PDF_COLORS.secondaryLight} />
        <Text x="100" y="128" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: PDF_COLORS.secondary }}>
          ✓ Bouger détend les muscles et soulage la pression
        </Text>
      </Svg>
    ),
    
    'insuffisance-veineuse-chronique': (
      <Svg width={width} height={height} viewBox="0 0 200 140">
        {/* Titre */}
        <Text x="100" y="10" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: PDF_COLORS.primary }}>
          Circulation veineuse de la jambe
        </Text>
        
        {/* Fond */}
        <Rect x="20" y="18" width="160" height="95" rx="6" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="1" />
        
        {/* === VEINE SAINE (gauche) === */}
        <Text x="55" y="30" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.secondary }}>
          SAINE
        </Text>
        {/* Contour jambe */}
        <Path d="M40 35 L40 100 Q45 105 50 100 L50 35" stroke={PDF_COLORS.border} strokeWidth="1" fill="#fef9f4" />
        <Path d="M60 35 L60 100 Q65 105 70 100 L70 35" stroke={PDF_COLORS.border} strokeWidth="1" fill="#fef9f4" />
        {/* Veine */}
        <Path d="M52 38 Q48 55 55 75 Q58 90 52 98" stroke="#6b46c1" strokeWidth="3" fill="none" />
        {/* Valvules fonctionnelles */}
        <Circle cx="50" cy="48" r="4" fill="#3d9970" />
        <Path d="M48 46 L50 50 L52 46" stroke="white" strokeWidth="1" fill="none" />
        <Circle cx="54" cy="68" r="4" fill="#3d9970" />
        <Path d="M52 66 L54 70 L56 66" stroke="white" strokeWidth="1" fill="none" />
        <Circle cx="52" cy="88" r="4" fill="#3d9970" />
        <Path d="M50 86 L52 90 L54 86" stroke="white" strokeWidth="1" fill="none" />
        {/* Flèches retour veineux */}
        <Path d="M52 95 L52 42" stroke={PDF_COLORS.secondary} strokeWidth="0.5" fill="none" />
        <Line x1="52" y1="42" x2="50" y2="46" stroke={PDF_COLORS.secondary} strokeWidth="0.5" />
        <Line x1="52" y1="42" x2="54" y2="46" stroke={PDF_COLORS.secondary} strokeWidth="0.5" />
        <Text x="38" y="55" textAnchor="end" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>↑ Sang</Text>
        
        {/* === VEINE INSUFFISANTE (droite) === */}
        <Text x="145" y="30" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.danger }}>
          INSUFFISANTE
        </Text>
        {/* Contour jambe */}
        <Path d="M130 35 L130 100 Q135 108 140 100 L140 35" stroke={PDF_COLORS.border} strokeWidth="1" fill="#fef9f4" />
        <Path d="M150 35 L150 100 Q155 108 160 100 L160 35" stroke={PDF_COLORS.border} strokeWidth="1" fill="#fef9f4" />
        {/* Veine dilatée (variqueuse) */}
        <Path d="M142 38 Q135 50 148 60 Q155 75 140 85 Q135 95 145 98" stroke="#8b5cf6" strokeWidth="5" fill="none" opacity="0.7" />
        <Path d="M142 38 Q135 50 148 60 Q155 75 140 85 Q135 95 145 98" stroke="#6b46c1" strokeWidth="1.5" fill="none" />
        {/* Valvules défaillantes */}
        <Circle cx="140" cy="48" r="4" fill="#dc3545" />
        <Text x="140" y="50" textAnchor="middle" style={{ fontSize: 5, fill: "white" }}>✕</Text>
        <Circle cx="150" cy="72" r="4" fill="#dc3545" />
        <Text x="150" y="74" textAnchor="middle" style={{ fontSize: 5, fill: "white" }}>✕</Text>
        {/* Reflux */}
        <Path d="M145 45 L148 55" stroke={PDF_COLORS.danger} strokeWidth="0.5" />
        <Line x1="148" y1="55" x2="146" y2="52" stroke={PDF_COLORS.danger} strokeWidth="0.5" />
        <Line x1="148" y1="55" x2="150" y2="52" stroke={PDF_COLORS.danger} strokeWidth="0.5" />
        <Text x="162" y="52" style={{ fontSize: 4, fill: PDF_COLORS.danger }}>↓ Reflux</Text>
        {/* Œdème */}
        <Rect x="130" y="92" width="30" height="10" rx="3" fill="#fce8ea" stroke="#dc3545" strokeWidth="0.5" strokeDasharray="2,1" />
        <Text x="145" y="99" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.danger }}>Œdème</Text>
        
        {/* Légende centrale */}
        <Line x1="75" y1="65" x2="115" y2="65" stroke={PDF_COLORS.textMuted} strokeWidth="0.5" strokeDasharray="2,2" />
        
        {/* Légende action */}
        <Rect x="20" y="115" width="160" height="20" rx="4" fill={PDF_COLORS.secondaryLight} />
        <Text x="100" y="128" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: PDF_COLORS.secondary }}>
          ✓ Compression + mouvement = meilleur retour veineux
        </Text>
      </Svg>
    ),
    
    'bpco': (
      <Svg width={width} height={height} viewBox="0 0 200 140">
        {/* Titre */}
        <Text x="100" y="10" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: PDF_COLORS.primary }}>
          Voies respiratoires
        </Text>
        
        {/* Fond */}
        <Rect x="15" y="18" width="170" height="95" rx="6" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="1" />
        
        {/* Trachée */}
        <Rect x="92" y="22" width="16" height="18" rx="4" fill="#f5f5f5" stroke="#8a9aaa" strokeWidth="1" />
        <Text x="100" y="33" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>Trachée</Text>
        
        {/* === POUMON SAIN (gauche) === */}
        <Text x="50" y="30" textAnchor="middle" style={{ fontSize: 5, fontWeight: 600, fill: PDF_COLORS.secondary }}>
          SAIN
        </Text>
        <Path d="M45 40 Q25 55 30 80 Q38 95 55 90 Q75 85 80 60 Q82 45 70 38 L60 40 Z" 
              fill="#e8f5ef" stroke="#3d9970" strokeWidth="1.5" />
        {/* Bronches saines */}
        <Path d="M70 40 Q65 50 55 55" stroke="#3d9970" strokeWidth="2" fill="none" />
        <Path d="M55 55 Q45 60 40 70" stroke="#3d9970" strokeWidth="1.5" fill="none" />
        <Path d="M55 55 Q60 65 55 75" stroke="#3d9970" strokeWidth="1.5" fill="none" />
        {/* Alvéoles saines */}
        <Circle cx="38" cy="72" r="5" fill="#d4edda" stroke="#3d9970" strokeWidth="0.5" />
        <Circle cx="45" cy="78" r="4" fill="#d4edda" stroke="#3d9970" strokeWidth="0.5" />
        <Circle cx="55" cy="80" r="5" fill="#d4edda" stroke="#3d9970" strokeWidth="0.5" />
        <Circle cx="52" cy="72" r="4" fill="#d4edda" stroke="#3d9970" strokeWidth="0.5" />
        {/* Air */}
        <Text x="35" y="62" style={{ fontSize: 5, fill: PDF_COLORS.secondary }}>O₂ ↔</Text>
        
        {/* === POUMON BPCO (droite) === */}
        <Text x="150" y="30" textAnchor="middle" style={{ fontSize: 5, fontWeight: 600, fill: PDF_COLORS.danger }}>
          BPCO
        </Text>
        <Path d="M120 40 Q155 38 160 55 Q165 75 155 90 Q140 98 120 90 Q105 80 105 55 Q105 42 115 40 Z" 
              fill="#fef3e2" stroke="#d4a24c" strokeWidth="1.5" />
        {/* Bronches obstruées */}
        <Path d="M118 40 Q125 48 135 50" stroke="#d4a24c" strokeWidth="2" fill="none" />
        <Path d="M135 50 Q145 55 150 65" stroke="#dc3545" strokeWidth="2.5" fill="none" />
        <Path d="M135 50 Q130 60 135 72" stroke="#dc3545" strokeWidth="2.5" fill="none" />
        {/* Mucus */}
        <Circle cx="148" cy="58" r="4" fill="#d4a24c" opacity="0.8" />
        <Circle cx="132" cy="62" r="3" fill="#d4a24c" opacity="0.8" />
        <Line x1="152" y1="55" x2="175" y2="48" stroke={PDF_COLORS.accent} strokeWidth="0.5" />
        <Text x="177" y="50" style={{ fontSize: 5, fill: PDF_COLORS.accent }}>Mucus</Text>
        {/* Alvéoles détruites */}
        <Path d="M145 70 Q155 72 152 82" stroke="#dc3545" strokeWidth="0.5" strokeDasharray="2,1" fill="none" />
        <Path d="M130 72 Q125 80 132 85" stroke="#dc3545" strokeWidth="0.5" strokeDasharray="2,1" fill="none" />
        <Circle cx="148" cy="78" r="6" fill="#fce8ea" stroke="#dc3545" strokeWidth="0.5" strokeDasharray="2,1" />
        <Circle cx="135" cy="82" r="5" fill="#fce8ea" stroke="#dc3545" strokeWidth="0.5" strokeDasharray="2,1" />
        <Line x1="155" y1="80" x2="175" y2="75" stroke={PDF_COLORS.danger} strokeWidth="0.5" />
        <Text x="177" y="72" style={{ fontSize: 5, fill: PDF_COLORS.danger }}>Alvéoles</Text>
        <Text x="177" y="78" style={{ fontSize: 5, fill: PDF_COLORS.danger }}>détruites</Text>
        
        {/* Légende action */}
        <Rect x="15" y="115" width="170" height="20" rx="4" fill={PDF_COLORS.secondaryLight} />
        <Text x="100" y="128" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: PDF_COLORS.secondary }}>
          ✓ Réhabilitation respiratoire + arrêt tabac = mieux respirer
        </Text>
      </Svg>
    ),
    
    'otites-a-repetition-enfant': (
      <Svg width={width} height={height} viewBox="0 0 200 140">
        {/* Titre */}
        <Text x="100" y="10" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: PDF_COLORS.primary }}>
          Oreille moyenne de l'enfant
        </Text>
        
        {/* Fond */}
        <Rect x="20" y="18" width="160" height="95" rx="6" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="1" />
        
        {/* Profil simplifié */}
        <Path d="M30 50 Q25 55 28 65 Q30 75 35 80" stroke={PDF_COLORS.border} strokeWidth="1" fill="none" />
        
        {/* Pavillon */}
        <Path d="M35 45 Q30 55 32 70 Q34 80 40 85 Q50 82 55 70 Q58 55 50 45 Q42 40 35 45" 
              fill="#fef9f4" stroke="#8a9aaa" strokeWidth="1" />
        
        {/* Conduit auditif externe */}
        <Path d="M55 60 L85 55" stroke="#8a9aaa" strokeWidth="6" fill="none" />
        <Path d="M55 60 L85 55" stroke="#fef9f4" strokeWidth="4" fill="none" />
        <Text x="70" y="50" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>Conduit</Text>
        
        {/* Tympan */}
        <Path d="M90 43 C98 43 98 67 90 67 C82 67 82 43 90 43" fill="#f5f5f5" stroke="#1a7a8c" strokeWidth="1.5" />
        <Text x="90" y="72" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.primary }}>Tympan</Text>
        
        {/* Oreille moyenne - saine vs infectée */}
        <Rect x="100" y="40" width="35" height="35" rx="4" fill="#e6f4f6" stroke="#1a7a8c" strokeWidth="1" />
        <Text x="117" y="50" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>Oreille</Text>
        <Text x="117" y="56" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>moyenne</Text>
        
        {/* Osselets */}
        <Circle cx="105" cy="58" r="2" fill="#8a9aaa" />
        <Circle cx="112" cy="56" r="2" fill="#8a9aaa" />
        <Circle cx="118" cy="58" r="2" fill="#8a9aaa" />
        <Line x1="105" y1="58" x2="118" y2="58" stroke="#8a9aaa" strokeWidth="0.5" />
        <Text x="125" y="62" style={{ fontSize: 4, fill: PDF_COLORS.textMuted }}>Osselets</Text>
        
        {/* Trompe d'Eustache */}
        <Path d="M110 75 Q100 85 85 95" stroke="#8a9aaa" strokeWidth="2" fill="none" />
        <Text x="85" y="102" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.textMuted }}>Trompe d'Eustache</Text>
        <Text x="85" y="108" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.textMuted }}>(vers la gorge)</Text>
        
        {/* Zone d'infection */}
        <Circle cx="117" cy="55" r="12" fill="#fce8ea" stroke="#dc3545" strokeWidth="0.5" strokeDasharray="2,1" opacity="0.5" />
        <Line x1="130" y1="50" x2="155" y2="40" stroke={PDF_COLORS.danger} strokeWidth="0.5" />
        <Text x="157" y="38" style={{ fontSize: 5, fill: PDF_COLORS.danger }}>Infection</Text>
        <Text x="157" y="44" style={{ fontSize: 5, fill: PDF_COLORS.danger }}>fréquente</Text>
        
        {/* Facteurs de risque */}
        <Line x1="95" y1="90" x2="155" y2="85" stroke={PDF_COLORS.accent} strokeWidth="0.5" />
        <Text x="157" y="82" style={{ fontSize: 5, fill: PDF_COLORS.accent }}>Trompe courte</Text>
        <Text x="157" y="88" style={{ fontSize: 5, fill: PDF_COLORS.accent }}>chez l'enfant</Text>
        
        {/* Légende action */}
        <Rect x="20" y="115" width="160" height="20" rx="4" fill={PDF_COLORS.secondaryLight} />
        <Text x="100" y="128" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: PDF_COLORS.secondary }}>
          ✓ Hygiène + éviter fumée = moins d'otites
        </Text>
      </Svg>
    ),
  };

  return (
    <View style={{ alignItems: 'center', padding: 6, backgroundColor: PDF_COLORS.muted, borderRadius: 6, marginBottom: 8 }}>
      <Text style={{ fontSize: 7, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 4 }}>
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
// Stick figures améliorés avec mouvements et annotations

interface PdfExerciseSchemaProps {
  slug: string;
  width?: number;
  height?: number;
}

export const PdfExerciseSchema: React.FC<PdfExerciseSchemaProps> = ({ slug, width = 240, height = 90 }) => {
  const exercises: Record<string, React.ReactNode> = {
    'arthrose': (
      <Svg width={width} height={height} viewBox="0 0 240 90">
        {/* Exercice 1: Marche */}
        <Rect x="5" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="40" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>MARCHE</Text>
        {/* Personnage en marche */}
        <Circle cx="35" cy="28" r="6" fill={PDF_COLORS.primary} />
        <Line x1="35" y1="34" x2="35" y2="50" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="35" y1="50" x2="28" y2="62" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="35" y1="50" x2="42" y2="64" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="35" y1="40" x2="26" y2="48" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="35" y1="40" x2="44" y2="45" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Flèches mouvement */}
        <Path d="M50 55 L55 55 L53 52 M55 55 L53 58" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Text x="40" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>10-20 min/jour</Text>
        <Text x="40" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Rythme confortable</Text>

        {/* Exercice 2: Renforcement */}
        <Rect x="85" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="120" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>RENFORCEMENT</Text>
        {/* Personnage avec poids */}
        <Circle cx="115" cy="30" r="6" fill={PDF_COLORS.primary} />
        <Line x1="115" y1="36" x2="115" y2="52" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="115" y1="52" x2="110" y2="65" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="115" y1="52" x2="120" y2="65" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="115" y1="42" x2="100" y2="35" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="115" y1="42" x2="130" y2="35" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Poids */}
        <Rect x="95" y="32" width="8" height="6" rx="1" fill={PDF_COLORS.accent} />
        <Rect x="127" y="32" width="8" height="6" rx="1" fill={PDF_COLORS.accent} />
        <Text x="120" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>2-3x/semaine</Text>
        <Text x="120" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Progressif</Text>

        {/* Exercice 3: Étirement */}
        <Rect x="165" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="200" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>ÉTIREMENT</Text>
        {/* Personnage en étirement */}
        <Circle cx="195" cy="35" r="6" fill={PDF_COLORS.primary} />
        <Line x1="195" y1="41" x2="195" y2="55" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="55" x2="188" y2="62" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="55" x2="210" y2="50" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="46" x2="180" y2="40" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="46" x2="212" y2="38" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Indication étirement */}
        <Path d="M215 42 Q220 45 218 50" stroke={PDF_COLORS.secondary} strokeWidth="0.5" strokeDasharray="2,1" fill="none" />
        <Text x="200" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>5 min/jour</Text>
        <Text x="200" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Doux, sans douleur</Text>
      </Svg>
    ),
    
    'lombalgie-chronique': (
      <Svg width={width} height={height} viewBox="0 0 240 90">
        {/* Exercice 1: Gainage */}
        <Rect x="5" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="40" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>GAINAGE</Text>
        {/* Position planche */}
        <Line x1="15" y1="50" x2="65" y2="45" stroke={PDF_COLORS.primary} strokeWidth="3" />
        <Circle cx="62" cy="42" r="5" fill={PDF_COLORS.primary} />
        <Line x1="18" y1="50" x2="18" y2="60" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="58" y1="48" x2="55" y2="60" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Zone travaillée */}
        <Rect x="30" y="46" width="20" height="5" rx="2" fill={PDF_COLORS.secondary} opacity="0.3" />
        <Text x="40" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>15-30 sec</Text>
        <Text x="40" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Tenir sans bloquer</Text>

        {/* Exercice 2: Chat-Vache */}
        <Rect x="85" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="120" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>CHAT-VACHE</Text>
        {/* Position 4 pattes avec dos rond */}
        <Path d="M95 45 Q115 30 135 45" stroke={PDF_COLORS.primary} strokeWidth="2.5" fill="none" />
        <Circle cx="135" cy="42" r="5" fill={PDF_COLORS.primary} />
        <Line x1="98" y1="45" x2="98" y2="58" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="132" y1="45" x2="130" y2="58" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Flèche mouvement */}
        <Path d="M115 32 L115 25" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Path d="M113 27 L115 25 L117 27" stroke={PDF_COLORS.secondary} strokeWidth="0.5" fill="none" />
        <Path d="M115 48 L115 55" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Path d="M113 53 L115 55 L117 53" stroke={PDF_COLORS.secondary} strokeWidth="0.5" fill="none" />
        <Text x="120" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>10 répétitions</Text>
        <Text x="120" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Lentement</Text>

        {/* Exercice 3: Pont fessier */}
        <Rect x="165" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="200" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>PONT</Text>
        {/* Position pont */}
        <Line x1="175" y1="58" x2="225" y2="58" stroke={PDF_COLORS.textMuted} strokeWidth="0.5" />
        <Circle cx="180" cy="45" r="5" fill={PDF_COLORS.primary} />
        <Path d="M185 45 Q195 35 210 50" stroke={PDF_COLORS.primary} strokeWidth="2.5" fill="none" />
        <Line x1="210" y1="50" x2="215" y2="58" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="42" x2="190" y2="58" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Flèche lever */}
        <Path d="M200 38 L200 30" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Path d="M198 32 L200 30 L202 32" stroke={PDF_COLORS.secondary} strokeWidth="0.5" fill="none" />
        <Text x="200" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>10-15 répétitions</Text>
        <Text x="200" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Contracter les fessiers</Text>
      </Svg>
    ),
    
    'insuffisance-veineuse-chronique': (
      <Svg width={width} height={height} viewBox="0 0 240 90">
        {/* Exercice 1: Pompe mollet */}
        <Rect x="5" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="40" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>POINTES</Text>
        {/* Pieds montant sur pointes */}
        <Rect x="25" y="48" width="30" height="10" rx="2" fill={PDF_COLORS.border} />
        <Path d="M30 48 L30 38 Q32 35 35 38 L35 48" stroke={PDF_COLORS.primary} strokeWidth="2" fill="#fef9f4" />
        <Path d="M45 48 L45 38 Q47 35 50 38 L50 48" stroke={PDF_COLORS.primary} strokeWidth="2" fill="#fef9f4" />
        {/* Flèches montée */}
        <Path d="M40 35 L40 28" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Path d="M38 30 L40 28 L42 30" stroke={PDF_COLORS.secondary} strokeWidth="0.5" fill="none" />
        <Text x="40" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>20x, 2-3x/jour</Text>
        <Text x="40" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Active la pompe</Text>

        {/* Exercice 2: Élévation */}
        <Rect x="85" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="120" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>ÉLÉVATION</Text>
        {/* Position allongée jambes surélevées */}
        <Line x1="90" y1="55" x2="145" y2="55" stroke={PDF_COLORS.textMuted} strokeWidth="0.5" />
        <Circle cx="95" cy="50" r="5" fill={PDF_COLORS.primary} />
        <Line x1="100" y1="50" x2="120" y2="52" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="120" y1="52" x2="140" y2="35" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Coussin/support */}
        <Rect x="130" y="38" width="15" height="8" rx="3" fill={PDF_COLORS.secondaryLight} stroke={PDF_COLORS.secondary} strokeWidth="0.5" />
        <Text x="120" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>10-15 min/jour</Text>
        <Text x="120" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Jambes au-dessus cœur</Text>

        {/* Exercice 3: Marche */}
        <Rect x="165" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="200" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>MARCHE</Text>
        {/* Personnage marchant */}
        <Circle cx="195" cy="30" r="6" fill={PDF_COLORS.primary} />
        <Line x1="195" y1="36" x2="195" y2="50" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="50" x2="188" y2="62" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="50" x2="205" y2="64" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="42" x2="186" y2="48" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="195" y1="42" x2="204" y2="46" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Flèche mouvement */}
        <Path d="M210 55 L218 55" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Path d="M216 53 L218 55 L216 57" stroke={PDF_COLORS.secondary} strokeWidth="0.5" fill="none" />
        <Text x="200" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>30 min/jour</Text>
        <Text x="200" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Régulière, pas rapide</Text>
      </Svg>
    ),
    
    'bpco': (
      <Svg width={width} height={height} viewBox="0 0 240 90">
        {/* Exercice 1: Respiration lèvres pincées */}
        <Rect x="5" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="40" y="15" textAnchor="middle" style={{ fontSize: 5, fontWeight: 600, fill: PDF_COLORS.primary }}>LÈVRES PINCÉES</Text>
        {/* Visage */}
        <Circle cx="40" cy="40" r="15" fill="#fef9f4" stroke={PDF_COLORS.primary} strokeWidth="1" />
        {/* Yeux */}
        <Circle cx="35" cy="37" r="2" fill={PDF_COLORS.primary} />
        <Circle cx="45" cy="37" r="2" fill={PDF_COLORS.primary} />
        {/* Bouche pincée */}
        <Path d="M36 48 Q36 46 40 46 Q44 46 44 48 Q44 50 40 50 Q36 50 36 48" fill={PDF_COLORS.accent} />
        {/* Air sortant */}
        <Path d="M48 48 Q55 45 62 48" stroke={PDF_COLORS.secondary} strokeWidth="1" strokeDasharray="2,1" fill="none" />
        <Path d="M48 50 Q55 50 62 52" stroke={PDF_COLORS.secondary} strokeWidth="1" strokeDasharray="2,1" fill="none" />
        <Text x="40" y="72" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>Inspir 2s → Expir 4s</Text>
        <Text x="40" y="80" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Souffle lent, contrôlé</Text>

        {/* Exercice 2: Marche fractionnée */}
        <Rect x="85" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="120" y="15" textAnchor="middle" style={{ fontSize: 5, fontWeight: 600, fill: PDF_COLORS.primary }}>MARCHE + PAUSES</Text>
        {/* Personnage marchant */}
        <Circle cx="110" cy="32" r="5" fill={PDF_COLORS.primary} />
        <Line x1="110" y1="37" x2="110" y2="50" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="110" y1="50" x2="105" y2="60" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="110" y1="50" x2="118" y2="62" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Personnage au repos */}
        <Circle cx="135" cy="45" r="4" fill={PDF_COLORS.textMuted} />
        <Line x1="135" y1="49" x2="135" y2="58" stroke={PDF_COLORS.textMuted} strokeWidth="1.5" />
        <Line x1="135" y1="58" x2="133" y2="65" stroke={PDF_COLORS.textMuted} strokeWidth="1.5" />
        <Line x1="135" y1="58" x2="137" y2="65" stroke={PDF_COLORS.textMuted} strokeWidth="1.5" />
        {/* Flèche marche → pause */}
        <Path d="M118 45 L128 45" stroke={PDF_COLORS.secondary} strokeWidth="0.5" fill="none" />
        <Text x="120" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>Marcher → Pause</Text>
        <Text x="120" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Reprendre souffle</Text>

        {/* Exercice 3: Renforcement bras */}
        <Rect x="165" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="200" y="15" textAnchor="middle" style={{ fontSize: 5, fontWeight: 600, fill: PDF_COLORS.primary }}>RENFORCEMENT</Text>
        {/* Personnage avec mouvement bras */}
        <Circle cx="200" cy="32" r="5" fill={PDF_COLORS.primary} />
        <Line x1="200" y1="37" x2="200" y2="52" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="200" y1="52" x2="195" y2="62" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="200" y1="52" x2="205" y2="62" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="200" y1="42" x2="185" y2="35" stroke={PDF_COLORS.primary} strokeWidth="2" />
        <Line x1="200" y1="42" x2="215" y2="35" stroke={PDF_COLORS.primary} strokeWidth="2" />
        {/* Poids légers */}
        <Circle cx="183" cy="33" r="3" fill={PDF_COLORS.accent} />
        <Circle cx="217" cy="33" r="3" fill={PDF_COLORS.accent} />
        <Text x="200" y="75" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>Léger, régulier</Text>
        <Text x="200" y="82" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Éviter essoufflement</Text>
      </Svg>
    ),
    
    'otites-a-repetition-enfant': (
      <Svg width={width} height={height} viewBox="0 0 240 90">
        {/* Geste 1: Lavage mains */}
        <Rect x="5" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="40" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>LAVAGE MAINS</Text>
        {/* Mains avec bulles */}
        <Path d="M30 35 Q25 40 28 50 Q30 55 35 52 Q38 48 35 42 Q32 38 30 35" fill="#fef9f4" stroke={PDF_COLORS.primary} strokeWidth="1" />
        <Path d="M50 35 Q55 40 52 50 Q50 55 45 52 Q42 48 45 42 Q48 38 50 35" fill="#fef9f4" stroke={PDF_COLORS.primary} strokeWidth="1" />
        {/* Eau/bulles */}
        <Circle cx="35" cy="45" r="2" fill={PDF_COLORS.secondary} opacity="0.5" />
        <Circle cx="40" cy="42" r="1.5" fill={PDF_COLORS.secondary} opacity="0.5" />
        <Circle cx="45" cy="48" r="2" fill={PDF_COLORS.secondary} opacity="0.5" />
        <Text x="40" y="72" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>Régulièrement</Text>
        <Text x="40" y="80" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Savon 20 secondes</Text>

        {/* Geste 2: Pas de fumée */}
        <Rect x="85" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="120" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>ÉVITER FUMÉE</Text>
        {/* Cigarette barrée */}
        <Circle cx="120" cy="45" r="18" fill="#fce8ea" stroke={PDF_COLORS.danger} strokeWidth="1.5" />
        <Rect x="108" y="42" width="20" height="6" rx="1" fill="#8a9aaa" />
        <Rect x="128" y="43" width="6" height="4" rx="1" fill={PDF_COLORS.accent} />
        {/* Barre */}
        <Line x1="105" y1="30" x2="135" y2="60" stroke={PDF_COLORS.danger} strokeWidth="2" />
        <Text x="120" y="72" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>Zéro tabagisme</Text>
        <Text x="120" y="80" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Passif inclus</Text>

        {/* Geste 3: Aération */}
        <Rect x="165" y="5" width="70" height="80" rx="4" fill="#f8fafb" stroke={PDF_COLORS.border} strokeWidth="0.5" />
        <Text x="200" y="15" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PDF_COLORS.primary }}>AÉRER</Text>
        {/* Fenêtre ouverte */}
        <Rect x="185" y="28" width="30" height="30" fill="#e6f4f6" stroke={PDF_COLORS.primary} strokeWidth="1" />
        <Line x1="200" y1="28" x2="200" y2="58" stroke={PDF_COLORS.primary} strokeWidth="0.5" />
        <Line x1="185" y1="43" x2="215" y2="43" stroke={PDF_COLORS.primary} strokeWidth="0.5" />
        {/* Flèches air */}
        <Path d="M178 35 L185 38" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Path d="M178 43 L185 43" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Path d="M178 51 L185 48" stroke={PDF_COLORS.secondary} strokeWidth="1" fill="none" />
        <Text x="200" y="72" textAnchor="middle" style={{ fontSize: 5, fill: PDF_COLORS.text }}>10 min, 2x/jour</Text>
        <Text x="200" y="80" textAnchor="middle" style={{ fontSize: 4, fill: PDF_COLORS.secondary }}>Renouveler l'air</Text>
      </Svg>
    ),
  };

  return (
    <View style={{ alignItems: 'center', padding: 6, backgroundColor: PDF_COLORS.secondaryLight, borderRadius: 6, marginBottom: 8 }}>
      <Text style={{ fontSize: 7, fontWeight: 600, color: PDF_COLORS.secondary, marginBottom: 4 }}>
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
