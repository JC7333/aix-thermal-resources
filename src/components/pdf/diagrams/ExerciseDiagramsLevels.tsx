// ============================================
// DIAGRAMMES EXERCICES PAR NIVEAU (0-2)
// ============================================
// Niveau 0 : Très facile (assis, mobilité limitée)
// Niveau 1 : Facile (debout simple)
// Niveau 2 : Normal (exercices complets)
// ============================================

import React from 'react';
import { Svg, Path, Circle, Rect, Line, Text, G } from '@react-pdf/renderer';

// Couleurs
const STROKE = '#333333';
const STROKE_LIGHT = '#666666';
const FILL_LIGHT = '#f0f0f0';
const PRIMARY = '#1a7a8c';
const SECONDARY = '#2d9d5c';
const ACCENT = '#d97706';

interface DiagramProps {
  width?: number;
  height?: number;
}

// ============================================
// ARTHROSE — NIVEAU 0 : Flexions assis
// ============================================
export const ArthrosLevel0: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    {/* Titre niveau */}
    <Rect x="0" y="0" width="180" height="12" fill={SECONDARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 0 — Très facile (assis)
    </Text>
    
    {/* Étape 1: Assis jambes tendues */}
    <G>
      <Rect x="8" y="28" width="25" height="4" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Circle cx="20" cy="22" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="20" y1="26" x2="20" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="20" y1="32" x2="12" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="20" y1="32" x2="35" y2="35" stroke={STROKE} strokeWidth="1.5" />
      <Text x="20" y="48" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Jambe tendue</Text>
    </G>

    {/* Flèche */}
    <Path d="M42 35 L52 35" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M50 33 L52 35 L50 37" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Étape 2: Lever la jambe */}
    <G>
      <Rect x="58" y="28" width="25" height="4" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Circle cx="70" cy="22" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="70" y1="26" x2="70" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="70" y1="32" x2="62" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="70" y1="32" x2="88" y2="28" stroke={STROKE} strokeWidth="1.5" />
      <Path d="M85 24 L85 20" stroke={SECONDARY} strokeWidth="0.8" fill="none" />
      <Path d="M83 22 L85 20 L87 22" stroke={SECONDARY} strokeWidth="0.5" fill="none" />
      <Text x="72" y="48" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Lever</Text>
    </G>

    {/* Flèche */}
    <Path d="M95 35 L105 35" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M103 33 L105 35 L103 37" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Étape 3: Tenir */}
    <G>
      <Rect x="110" y="28" width="25" height="4" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Circle cx="122" cy="22" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="122" y1="26" x2="122" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="122" y1="32" x2="114" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="122" y1="32" x2="140" y2="28" stroke={STROKE} strokeWidth="1.5" />
      {/* Chrono */}
      <Circle cx="148" cy="30" r="6" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="0.8" />
      <Text x="148" y="32" textAnchor="middle" style={{ fontSize: 5, fill: SECONDARY }}>5s</Text>
      <Text x="128" y="48" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>3. Tenir 5s</Text>
    </G>

    {/* Conseil */}
    <Text x="90" y="62" textAnchor="middle" style={{ fontSize: 5, fill: SECONDARY }}>
      5 répétitions par jambe • Respirer normalement
    </Text>
  </Svg>
);

// ============================================
// ARTHROSE — NIVEAU 1 : Demi-squat appui
// ============================================
export const ArthrosLevel1: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    {/* Titre niveau */}
    <Rect x="0" y="0" width="180" height="12" fill={PRIMARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 1 — Facile (avec appui)
    </Text>
    
    {/* Étape 1: Debout avec chaise */}
    <G>
      <Rect x="15" y="45" width="20" height="3" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Line x1="18" y1="48" x2="18" y2="55" stroke={STROKE_LIGHT} strokeWidth="0.8" />
      <Circle cx="30" cy="20" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="30" y1="24" x2="30" y2="38" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="30" y1="38" x2="25" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="30" y1="38" x2="35" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="30" y1="28" x2="22" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Text x="28" y="62" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Debout</Text>
    </G>

    {/* Flèche */}
    <Path d="M48 38 L58 38" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M56 36 L58 38 L56 40" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Étape 2: Demi-squat */}
    <G>
      <Rect x="65" y="38" width="20" height="3" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Circle cx="82" cy="22" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M82 26 Q86 32 82 40" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <Line x1="82" y1="40" x2="77" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="82" y1="40" x2="87" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="83" y1="30" x2="72" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Path d="M82 34 L82 42" stroke={PRIMARY} strokeWidth="0.8" fill="none" />
      <Path d="M80 40 L82 42 L84 40" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="80" y="62" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Descendre</Text>
    </G>

    {/* Flèche */}
    <Path d="M100 38 L110 38" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M108 36 L110 38 L108 40" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Étape 3: Remonter */}
    <G>
      <Rect x="118" y="45" width="20" height="3" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Circle cx="135" cy="20" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="135" y1="24" x2="135" y2="38" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="135" y1="38" x2="130" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="135" y1="38" x2="140" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="135" y1="28" x2="125" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Path d="M145 32 L145 24" stroke={PRIMARY} strokeWidth="0.8" fill="none" />
      <Path d="M143 26 L145 24 L147 26" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="135" y="62" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>3. Remonter</Text>
    </G>

    {/* Conseil */}
    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      8 répétitions • Tenir la chaise pour l'équilibre
    </Text>
  </Svg>
);

// ============================================
// ARTHROSE — NIVEAU 2 : Assis-debout complet
// ============================================
export const ArthrosLevel2: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    {/* Titre niveau */}
    <Rect x="0" y="0" width="180" height="12" fill={ACCENT} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 2 — Normal (sans appui)
    </Text>
    
    {/* Étape 1: Assis */}
    <G>
      <Rect x="10" y="32" width="22" height="4" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Line x1="12" y1="36" x2="12" y2="48" stroke={STROKE_LIGHT} strokeWidth="0.8" />
      <Line x1="30" y1="36" x2="30" y2="48" stroke={STROKE_LIGHT} strokeWidth="0.8" />
      <Circle cx="21" cy="20" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="21" y1="24" x2="21" y2="35" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="21" y1="35" x2="14" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="21" y1="35" x2="28" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="21" y1="28" x2="14" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="21" y1="28" x2="28" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Text x="21" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Assis</Text>
    </G>

    {/* Flèche */}
    <Path d="M38 38 L48 38" stroke={ACCENT} strokeWidth="1" fill="none" />
    <Path d="M46 36 L48 38 L46 40" stroke={ACCENT} strokeWidth="0.8" fill="none" />

    {/* Étape 2: Se lever */}
    <G>
      <Rect x="55" y="40" width="22" height="4" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Circle cx="75" cy="18" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M75 22 Q78 30 76 38" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <Line x1="76" y1="38" x2="68" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="76" y1="38" x2="82" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="76" y1="28" x2="85" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="76" y1="28" x2="68" y2="30" stroke={STROKE} strokeWidth="1.5" />
      <Text x="72" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Se lever</Text>
    </G>

    {/* Flèche */}
    <Path d="M92 38 L102 38" stroke={ACCENT} strokeWidth="1" fill="none" />
    <Path d="M100 36 L102 38 L100 40" stroke={ACCENT} strokeWidth="0.8" fill="none" />

    {/* Étape 3: Debout bras tendus */}
    <G>
      <Circle cx="125" cy="14" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="125" y1="18" x2="125" y2="35" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="125" y1="35" x2="118" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="125" y1="35" x2="132" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="125" y1="23" x2="115" y2="15" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="125" y1="23" x2="135" y2="15" stroke={STROKE} strokeWidth="1.5" />
      <Text x="125" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>3. Debout</Text>
    </G>

    {/* Flèche */}
    <Path d="M145 38 L155 38" stroke={ACCENT} strokeWidth="1" fill="none" />
    <Path d="M153 36 L155 38 L153 40" stroke={ACCENT} strokeWidth="0.8" fill="none" />

    {/* Étape 4: Rasseoir */}
    <G>
      <Rect x="158" y="40" width="18" height="3" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Circle cx="167" cy="28" r="3" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M167 31 Q170 38 167 43" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <Line x1="167" y1="43" x2="162" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="167" y1="43" x2="172" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Text x="167" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>4. Rasseoir</Text>
    </G>

    {/* Conseil */}
    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: ACCENT }}>
      10 répétitions • Sans utiliser les mains
    </Text>
  </Svg>
);

// ============================================
// LOMBALGIE — NIVEAU 0 : Respiration ventrale
// ============================================
export const LombalgieLevel0: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={SECONDARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 0 — Très facile (allongé)
    </Text>
    
    {/* Personne allongée */}
    <G>
      {/* Sol */}
      <Line x1="15" y1="48" x2="165" y2="48" stroke={STROKE_LIGHT} strokeWidth="0.5" />
      
      {/* Position 1: Ventre plat */}
      <Circle cx="35" cy="35" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="40" y1="37" x2="75" y2="42" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="75" y1="42" x2="85" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="75" y1="42" x2="78" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Rect x="50" y="38" width="12" height="5" rx="2" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="0.8" />
      <Text x="56" y="42" textAnchor="middle" style={{ fontSize: 4, fill: SECONDARY }}>↓</Text>
      <Text x="55" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Inspirer, ventre gonfle</Text>
    </G>

    <Path d="M95 40 L105 40" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M103 38 L105 40 L103 42" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Position 2: Ventre rentré */}
    <G>
      <Circle cx="125" cy="35" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="130" y1="37" x2="158" y2="42" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="158" y1="42" x2="165" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="158" y1="42" x2="160" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Rect x="138" y="40" width="10" height="3" rx="1" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="0.8" />
      <Text x="143" y="43" textAnchor="middle" style={{ fontSize: 4, fill: SECONDARY }}>↑</Text>
      <Text x="145" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Expirer, ventre rentre</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: SECONDARY }}>
      10 respirations lentes • Matin au réveil
    </Text>
  </Svg>
);

// ============================================
// LOMBALGIE — NIVEAU 1 : Cat-cow doux
// ============================================
export const LombalgieLevel1: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={PRIMARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 1 — Facile (à 4 pattes)
    </Text>
    
    {/* Sol */}
    <Line x1="10" y1="52" x2="170" y2="52" stroke={STROKE_LIGHT} strokeWidth="0.5" />

    {/* Position 1: Dos plat */}
    <G>
      <Circle cx="42" cy="26" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="38" y1="28" x2="18" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="18" y1="32" x2="18" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="38" y1="32" x2="38" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Text x="30" y="62" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Dos plat</Text>
    </G>

    <Path d="M52 35 L62 35" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M60 33 L62 35 L60 37" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Position 2: Dos rond (chat) */}
    <G>
      <Circle cx="92" cy="22" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M88 24 Q75 18 68 28" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <Line x1="68" y1="28" x2="68" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="88" y1="30" x2="88" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Path d="M78 20 L78 14" stroke={PRIMARY} strokeWidth="0.8" fill="none" />
      <Path d="M76 16 L78 14 L80 16" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="78" y="62" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Dos rond</Text>
    </G>

    <Path d="M102 35 L112 35" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M110 33 L112 35 L110 37" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Position 3: Dos creux (vache) */}
    <G>
      <Circle cx="142" cy="28" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M138 30 Q125 38 118 30" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <Line x1="118" y1="30" x2="118" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="138" y1="34" x2="138" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Path d="M128 38 L128 44" stroke={PRIMARY} strokeWidth="0.8" fill="none" />
      <Path d="M126 42 L128 44 L130 42" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="128" y="62" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>3. Dos creux</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      8 répétitions lentes • Synchroniser avec la respiration
    </Text>
  </Svg>
);

// ============================================
// LOMBALGIE — NIVEAU 2 : Gainage complet
// ============================================
export const LombalgieLevel2: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={ACCENT} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 2 — Normal (planche)
    </Text>
    
    {/* Sol */}
    <Line x1="10" y1="48" x2="170" y2="48" stroke={STROKE_LIGHT} strokeWidth="0.5" />

    {/* Planche sur coudes */}
    <G>
      <Circle cx="45" cy="32" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="50" y1="34" x2="115" y2="34" stroke={STROKE} strokeWidth="2" />
      <Line x1="50" y1="36" x2="35" y2="45" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="115" y1="34" x2="125" y2="45" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="115" y1="34" x2="105" y2="45" stroke={STROKE} strokeWidth="1.5" />
      
      {/* Ligne du dos droite */}
      <Line x1="50" y1="30" x2="115" y2="30" stroke={ACCENT} strokeWidth="0.5" strokeDasharray="2,1" />
      
      {/* Chrono */}
      <Circle cx="145" cy="35" r="10" fill={FILL_LIGHT} stroke={ACCENT} strokeWidth="1" />
      <Text x="145" y="38" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: ACCENT }}>30s</Text>
    </G>

    <Text x="70" y="58" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>Planche sur coudes</Text>
    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: ACCENT }}>
      3 séries de 30 secondes • Dos bien droit
    </Text>
  </Svg>
);

// ============================================
// VEINEUX — NIVEAU 0 : Flexions pieds assis
// ============================================
export const VeineuxLevel0: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={SECONDARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 0 — Très facile (assis)
    </Text>

    {/* Étape 1: Pieds à plat */}
    <G>
      <Rect x="10" y="25" width="8" height="20" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="22" y="25" width="8" height="20" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="8" y="45" width="12" height="5" rx="1" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="20" y="45" width="12" height="5" rx="1" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Text x="20" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Plat</Text>
    </G>

    <Path d="M40 38 L50 38" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M48 36 L50 38 L48 40" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Étape 2: Pointes */}
    <G>
      <Rect x="55" y="20" width="8" height="20" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="67" y="20" width="8" height="20" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M57 40 L57 48 Q59 50 61 48 L61 44" stroke={STROKE} strokeWidth="1" fill={FILL_LIGHT} />
      <Path d="M69 40 L69 48 Q71 50 73 48 L73 44" stroke={STROKE} strokeWidth="1" fill={FILL_LIGHT} />
      <Text x="65" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Pointes</Text>
    </G>

    <Path d="M85 38 L95 38" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M93 36 L95 38 L93 40" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Étape 3: Talons */}
    <G>
      <Rect x="100" y="25" width="8" height="20" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="112" y="25" width="8" height="20" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M102 45 Q100 50 104 50 L108 45" stroke={STROKE} strokeWidth="1" fill={FILL_LIGHT} />
      <Path d="M114 45 Q112 50 116 50 L120 45" stroke={STROKE} strokeWidth="1" fill={FILL_LIGHT} />
      <Text x="110" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>3. Talons</Text>
    </G>

    <Path d="M130 38 L140 38" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M138 36 L140 38 L138 40" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Étape 4: Retour */}
    <G>
      <Rect x="145" y="25" width="8" height="20" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="157" y="25" width="8" height="20" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="143" y="45" width="12" height="5" rx="1" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="155" y="45" width="12" height="5" rx="1" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Text x="155" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>4. Plat</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: SECONDARY }}>
      20 répétitions • Au bureau ou devant la TV
    </Text>
  </Svg>
);

// ============================================
// VEINEUX — NIVEAU 1 : Pompes mollets debout avec appui
// ============================================
export const VeineuxLevel1: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={PRIMARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 1 — Facile (debout avec mur)
    </Text>

    {/* Mur */}
    <Rect x="10" y="15" width="5" height="38" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />

    {/* Position 1: Pieds plats */}
    <G>
      <Circle cx="40" cy="22" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="40" y1="27" x2="40" y2="40" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="40" y1="40" x2="35" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="40" y1="40" x2="45" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="40" y1="30" x2="15" y2="28" stroke={STROKE} strokeWidth="1.5" />
      <Text x="40" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Plat</Text>
    </G>

    <Path d="M58 38 L70 38" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M68 36 L70 38 L68 40" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Position 2: Sur pointes */}
    <G>
      <Circle cx="95" cy="18" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="95" y1="23" x2="95" y2="36" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="95" y1="36" x2="90" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="95" y1="36" x2="100" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="95" y1="26" x2="15" y2="24" stroke={STROKE} strokeWidth="1.5" />
      <Path d="M92 48 L92 52 Q93 54 94 52 L94 50" stroke={STROKE} strokeWidth="0.8" fill={FILL_LIGHT} />
      <Path d="M98 48 L98 52 Q99 54 100 52 L100 50" stroke={STROKE} strokeWidth="0.8" fill={FILL_LIGHT} />
      <Path d="M95 32 L95 26" stroke={PRIMARY} strokeWidth="0.8" fill="none" />
      <Path d="M93 28 L95 26 L97 28" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="95" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Monter</Text>
    </G>

    <Path d="M115 38 L127 38" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M125 36 L127 38 L125 40" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Position 3: Redescendre */}
    <G>
      <Circle cx="150" cy="22" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="150" y1="27" x2="150" y2="40" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="150" y1="40" x2="145" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="150" y1="40" x2="155" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="150" y1="30" x2="15" y2="28" stroke={STROKE} strokeWidth="1.5" />
      <Path d="M150 32 L150 38" stroke={PRIMARY} strokeWidth="0.8" fill="none" />
      <Path d="M148 36 L150 38 L152 36" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="150" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>3. Descendre</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      15 répétitions • Main sur le mur pour l'équilibre
    </Text>
  </Svg>
);

// ============================================
// VEINEUX — NIVEAU 2 : Pompes mollets sans appui
// ============================================
export const VeineuxLevel2: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={ACCENT} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 2 — Normal (sur une jambe)
    </Text>

    {/* Position 1: Jambe levée */}
    <G>
      <Circle cx="45" cy="20" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="45" y1="25" x2="45" y2="38" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="45" y1="38" x2="40" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="45" y1="38" x2="55" y2="42" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="45" y1="28" x2="38" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="45" y1="28" x2="52" y2="32" stroke={STROKE} strokeWidth="1.5" />
      <Text x="45" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Sur 1 jambe</Text>
    </G>

    <Path d="M70 38 L85 38" stroke={ACCENT} strokeWidth="1" fill="none" />
    <Path d="M83 36 L85 38 L83 40" stroke={ACCENT} strokeWidth="0.8" fill="none" />

    {/* Position 2: Sur pointe */}
    <G>
      <Circle cx="110" cy="16" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="110" y1="21" x2="110" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="110" y1="34" x2="105" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="110" y1="34" x2="120" y2="38" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="110" y1="24" x2="103" y2="28" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="110" y1="24" x2="117" y2="28" stroke={STROKE} strokeWidth="1.5" />
      <Path d="M107 48 L107 52 Q108 54 109 52 L109 50" stroke={STROKE} strokeWidth="0.8" fill={FILL_LIGHT} />
      <Path d="M110 28 L110 22" stroke={ACCENT} strokeWidth="0.8" fill="none" />
      <Path d="M108 24 L110 22 L112 24" stroke={ACCENT} strokeWidth="0.5" fill="none" />
      <Text x="110" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Monter haut</Text>
    </G>

    {/* Compteur */}
    <G>
      <Circle cx="155" cy="35" r="12" fill={FILL_LIGHT} stroke={ACCENT} strokeWidth="1" />
      <Text x="155" y="33" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>x10</Text>
      <Text x="155" y="41" textAnchor="middle" style={{ fontSize: 5, fill: ACCENT }}>par jambe</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: ACCENT }}>
      10 répétitions par jambe • Garder l'équilibre seul
    </Text>
  </Svg>
);

// ============================================
// BPCO — NIVEAU 0 : Respiration simple
// ============================================
export const BpcoLevel0: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={SECONDARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 0 — Très facile (assis)
    </Text>

    {/* Visage 1: Inspirer */}
    <G>
      <Circle cx="40" cy="32" r="14" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="34" cy="28" r="2" fill={STROKE} />
      <Circle cx="46" cy="28" r="2" fill={STROKE} />
      <Line x1="40" y1="32" x2="40" y2="36" stroke={STROKE} strokeWidth="1" />
      <Line x1="34" y1="40" x2="46" y2="40" stroke={STROKE} strokeWidth="1" />
      <Path d="M40 20 L40 14" stroke={SECONDARY} strokeWidth="1" fill="none" />
      <Path d="M38 16 L40 14 L42 16" stroke={SECONDARY} strokeWidth="0.8" fill="none" />
      <Text x="40" y="54" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>1. Inspirer nez</Text>
      <Text x="40" y="62" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: SECONDARY }}>2 sec</Text>
    </G>

    <Path d="M62 35 L78 35" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M76 33 L78 35 L76 37" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Visage 2: Pause */}
    <G>
      <Circle cx="100" cy="32" r="14" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="94" cy="28" r="2" fill={STROKE} />
      <Circle cx="106" cy="28" r="2" fill={STROKE} />
      <Line x1="100" y1="32" x2="100" y2="36" stroke={STROKE} strokeWidth="1" />
      <Line x1="94" y1="40" x2="106" y2="40" stroke={STROKE} strokeWidth="1" />
      <Text x="100" y="54" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>2. Pause</Text>
      <Text x="100" y="62" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: SECONDARY }}>1 sec</Text>
    </G>

    <Path d="M122 35 L138 35" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M136 33 L138 35 L136 37" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Visage 3: Expirer */}
    <G>
      <Circle cx="160" cy="32" r="14" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="154" cy="28" r="2" fill={STROKE} />
      <Circle cx="166" cy="28" r="2" fill={STROKE} />
      <Line x1="160" y1="32" x2="160" y2="36" stroke={STROKE} strokeWidth="1" />
      <Circle cx="160" cy="40" r="3" fill="#ffcccc" stroke={STROKE} strokeWidth="0.5" />
      <Path d="M165 38 Q172 36 178 38" stroke={SECONDARY} strokeWidth="0.8" strokeDasharray="2,1" fill="none" />
      <Path d="M165 42 Q172 44 178 42" stroke={SECONDARY} strokeWidth="0.8" strokeDasharray="2,1" fill="none" />
      <Text x="160" y="54" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>3. Expirer bouche</Text>
      <Text x="160" y="62" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: SECONDARY }}>4 sec</Text>
    </G>
  </Svg>
);

// ============================================
// BPCO — NIVEAU 1 : Marche avec respiration
// ============================================
export const BpcoLevel1: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={PRIMARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 1 — Facile (marche fractionnée)
    </Text>

    {/* Marche 1 */}
    <G>
      <Circle cx="30" cy="22" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="30" y1="27" x2="30" y2="38" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="30" y1="38" x2="24" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="30" y1="38" x2="36" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="30" y1="30" x2="24" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="30" y1="30" x2="36" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Text x="30" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Marcher</Text>
    </G>

    <Path d="M45 35 L55 35" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M53 33 L55 35 L53 37" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Chrono marche */}
    <G>
      <Circle cx="75" cy="32" r="12" fill={FILL_LIGHT} stroke={PRIMARY} strokeWidth="1" />
      <Text x="75" y="30" textAnchor="middle" style={{ fontSize: 8, fontWeight: 600, fill: PRIMARY }}>2</Text>
      <Text x="75" y="38" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>min</Text>
      <Text x="75" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>marche</Text>
    </G>

    <Path d="M92 35 L102 35" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M100 33 L102 35 L100 37" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Pause repos */}
    <G>
      <Rect x="108" y="25" width="20" height="20" rx="3" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="118" cy="30" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="0.8" />
      <Line x1="118" y1="34" x2="118" y2="40" stroke={STROKE} strokeWidth="1" />
      <Text x="118" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Pause</Text>
    </G>

    <Path d="M135 35 L145 35" stroke={PRIMARY} strokeWidth="1" fill="none" />
    <Path d="M143 33 L145 35 L143 37" stroke={PRIMARY} strokeWidth="0.8" fill="none" />

    {/* Chrono pause */}
    <G>
      <Circle cx="162" cy="32" r="12" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="1" />
      <Text x="162" y="30" textAnchor="middle" style={{ fontSize: 8, fontWeight: 600, fill: SECONDARY }}>1</Text>
      <Text x="162" y="38" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>min</Text>
      <Text x="162" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>repos</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      Alterner : 2 min marche → 1 min repos • 10 min total
    </Text>
  </Svg>
);

// ============================================
// BPCO — NIVEAU 2 : Marche continue + bras
// ============================================
export const BpcoLevel2: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={ACCENT} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 2 — Normal (marche + bras)
    </Text>

    {/* Marche active */}
    <G>
      <Circle cx="45" cy="20" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="45" y1="25" x2="45" y2="36" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="45" y1="36" x2="38" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="45" y1="36" x2="52" y2="50" stroke={STROKE} strokeWidth="1.5" />
      {/* Bras en mouvement */}
      <Line x1="45" y1="28" x2="35" y2="35" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="45" y1="28" x2="55" y2="22" stroke={STROKE} strokeWidth="1.5" />
      {/* Flèches mouvement bras */}
      <Path d="M35 32 L38 28" stroke={ACCENT} strokeWidth="0.5" fill="none" />
      <Path d="M55 25 L52 28" stroke={ACCENT} strokeWidth="0.5" fill="none" />
      <Text x="45" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Marche active</Text>
    </G>

    {/* Plus */}
    <Text x="75" y="38" textAnchor="middle" style={{ fontSize: 14, fontWeight: 700, fill: ACCENT }}>+</Text>

    {/* Respiration */}
    <G>
      <Circle cx="105" cy="30" r="10" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="101" cy="28" r="1.5" fill={STROKE} />
      <Circle cx="109" cy="28" r="1.5" fill={STROKE} />
      <Circle cx="105" cy="35" r="2" fill="#ffcccc" stroke={STROKE} strokeWidth="0.5" />
      <Path d="M110 33 Q116 31 120 33" stroke={ACCENT} strokeWidth="0.5" strokeDasharray="1,1" fill="none" />
      <Text x="105" y="50" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Lèvres pincées</Text>
    </G>

    {/* Durée totale */}
    <G>
      <Circle cx="150" cy="32" r="15" fill={FILL_LIGHT} stroke={ACCENT} strokeWidth="1.5" />
      <Text x="150" y="30" textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: ACCENT }}>20</Text>
      <Text x="150" y="40" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>min</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: ACCENT }}>
      20 min continues • Bras actifs • Respirer lèvres pincées
    </Text>
  </Svg>
);

// ============================================
// OTITES — NIVEAU 0-2 (Prévention parents)
// ============================================
export const OtitesLevel0: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={SECONDARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 0 — Lavage nasal doux
    </Text>

    {/* Étape 1: Sérum */}
    <G>
      <Rect x="15" y="22" width="12" height="25" rx="3" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="21" cy="28" r="3" fill="#ddeeff" stroke={PRIMARY} strokeWidth="0.5" />
      <Text x="21" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>1. Sérum</Text>
    </G>

    <Path d="M35 38 L48 38" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M46 36 L48 38 L46 40" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Étape 2: Tête penchée */}
    <G>
      <Circle cx="75" cy="28" r="10" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="72" cy="26" r="1.5" fill={STROKE} />
      <Circle cx="78" cy="26" r="1.5" fill={STROKE} />
      <Path d="M72 32 Q75 34 78 32" stroke={STROKE} strokeWidth="0.8" fill="none" />
      <Line x1="75" y1="28" x2="75" y2="31" stroke={STROKE} strokeWidth="0.5" />
      {/* Gouttes */}
      <Circle cx="68" cy="24" r="2" fill="#ddeeff" stroke={PRIMARY} strokeWidth="0.3" />
      <Path d="M66 22 L64 18" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="75" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>2. Instiller</Text>
    </G>

    <Path d="M95 38 L108 38" stroke={SECONDARY} strokeWidth="1" fill="none" />
    <Path d="M106 36 L108 38 L106 40" stroke={SECONDARY} strokeWidth="0.8" fill="none" />

    {/* Étape 3: Moucher */}
    <G>
      <Circle cx="135" cy="28" r="10" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="132" cy="26" r="1.5" fill={STROKE} />
      <Circle cx="138" cy="26" r="1.5" fill={STROKE} />
      <Path d="M132 32 Q135 34 138 32" stroke={STROKE} strokeWidth="0.8" fill="none" />
      <Rect x="140" y="28" width="10" height="6" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Text x="135" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>3. Moucher</Text>
    </G>

    <Text x="90" y="64" textAnchor="middle" style={{ fontSize: 5, fill: SECONDARY }}>
      Matin et soir • Sérum physiologique • Douceur
    </Text>
  </Svg>
);

export const OtitesLevel1: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={PRIMARY} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 1 — Hygiène environnement
    </Text>

    {/* Aérer */}
    <G>
      <Rect x="15" y="20" width="25" height="25" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="27" y1="20" x2="27" y2="45" stroke={STROKE} strokeWidth="0.5" />
      <Line x1="15" y1="32" x2="40" y2="32" stroke={STROKE} strokeWidth="0.5" />
      <Path d="M8 28 L15 30" stroke={PRIMARY} strokeWidth="0.8" fill="none" />
      <Path d="M8 35 L15 35" stroke={PRIMARY} strokeWidth="0.8" fill="none" />
      <Text x="27" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Aérer 2x/jour</Text>
    </G>

    {/* Pas de fumée */}
    <G>
      <Circle cx="90" cy="32" r="14" fill="none" stroke="#cc4444" strokeWidth="1.5" />
      <Line x1="80" y1="22" x2="100" y2="42" stroke="#cc4444" strokeWidth="1.5" />
      <Rect x="83" y="30" width="12" height="4" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Rect x="95" y="31" width="4" height="2" rx="0.5" fill="#ddaa66" />
      <Text x="90" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Zéro tabac</Text>
    </G>

    {/* Lavage mains */}
    <G>
      <Path d="M135 25 Q128 30 132 40 Q135 48 142 46 Q148 44 146 36 Q144 28 135 25" 
            fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M150 25 Q158 30 154 40 Q151 48 144 46" 
            fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="140" cy="36" r="2" fill="#ddeeff" stroke={PRIMARY} strokeWidth="0.3" />
      <Circle cx="146" cy="34" r="1.5" fill="#ddeeff" stroke={PRIMARY} strokeWidth="0.3" />
      <Text x="142" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Lavage mains</Text>
    </G>

    <Text x="90" y="64" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      3 gestes simples au quotidien = moins d'infections
    </Text>
  </Svg>
);

export const OtitesLevel2: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill={ACCENT} rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 2 — Prévention complète
    </Text>

    {/* Allaitement */}
    <G>
      <Circle cx="30" cy="28" r="8" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Circle cx="30" cy="40" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="0.8" />
      <Text x="30" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Allaitement</Text>
    </G>

    {/* Biberon position */}
    <G>
      <Circle cx="75" cy="25" r="6" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M75 31 Q78 38 75 42" stroke={STROKE} strokeWidth="1" fill="none" />
      <Rect x="80" y="30" width="15" height="6" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="0.8" />
      <Path d="M82 36 L82 42" stroke={STROKE} strokeWidth="0.5" />
      <Text x="80" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Semi-assis</Text>
    </G>

    {/* Vaccins */}
    <G>
      <Rect x="115" y="22" width="20" height="22" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Text x="125" y="30" textAnchor="middle" style={{ fontSize: 6, fill: PRIMARY }}>✓</Text>
      <Text x="125" y="40" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Vaccins</Text>
      <Text x="125" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>à jour</Text>
    </G>

    {/* Éviter crèche */}
    <G>
      <Rect x="145" y="22" width="25" height="22" rx="2" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" strokeDasharray="2,1" />
      <Text x="157" y="32" textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>Crèche</Text>
      <Text x="157" y="40" textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>{'< 1 an'}</Text>
      <Line x1="148" y1="25" x2="168" y2="42" stroke={ACCENT} strokeWidth="0.8" />
      <Text x="157" y="54" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Éviter si possible</Text>
    </G>

    <Text x="90" y="64" textAnchor="middle" style={{ fontSize: 5, fill: ACCENT }}>
      Ensemble de mesures préventives adaptées à l'âge
    </Text>
  </Svg>
);

// ============================================
// NIVEAU 3 — AVANCÉ
// ============================================

// ARTHROSE — NIVEAU 3 : Squats + fentes
export const ArthrosLevel3: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill="#7c3aed" rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 3 — Avancé (renforcement)
    </Text>
    
    {/* Squat profond */}
    <G>
      <Circle cx="35" cy="18" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M35 22 Q40 32 35 40" stroke={STROKE} strokeWidth="1.5" fill="none" />
      <Line x1="35" y1="40" x2="28" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="35" y1="40" x2="42" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="36" y1="28" x2="45" y2="24" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="36" y1="28" x2="26" y2="24" stroke={STROKE} strokeWidth="1.5" />
      <Text x="35" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Squat profond</Text>
    </G>

    {/* Fente */}
    <G>
      <Circle cx="90" cy="16" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="90" y1="20" x2="90" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="90" y1="34" x2="78" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="90" y1="34" x2="105" y2="42" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="105" y1="42" x2="105" y2="52" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="90" y1="24" x2="82" y2="28" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="90" y1="24" x2="98" y2="28" stroke={STROKE} strokeWidth="1.5" />
      <Text x="90" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Fentes alternées</Text>
    </G>

    {/* Compteur */}
    <G>
      <Circle cx="145" cy="35" r="14" fill={FILL_LIGHT} stroke="#7c3aed" strokeWidth="1.5" />
      <Text x="145" y="32" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: '#7c3aed' }}>3x12</Text>
      <Text x="145" y="42" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>séries</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: '#7c3aed' }}>
      3 séries de 12 reps • Ajouter du poids progressivement
    </Text>
  </Svg>
);

// LOMBALGIE — NIVEAU 3 : Planche latérale + bird-dog
export const LombalgieLevel3: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill="#7c3aed" rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 3 — Avancé (gainage dynamique)
    </Text>
    
    {/* Sol */}
    <Line x1="10" y1="52" x2="170" y2="52" stroke={STROKE_LIGHT} strokeWidth="0.5" />

    {/* Bird-dog */}
    <G>
      <Circle cx="45" cy="28" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="41" y1="30" x2="25" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="25" y1="34" x2="25" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="41" y1="34" x2="41" y2="48" stroke={STROKE} strokeWidth="1.5" />
      {/* Bras tendu */}
      <Line x1="45" y1="30" x2="60" y2="25" stroke={STROKE} strokeWidth="1.5" />
      {/* Jambe tendue */}
      <Line x1="25" y1="36" x2="10" y2="40" stroke={STROKE} strokeWidth="1.5" />
      <Text x="35" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Bird-dog</Text>
    </G>

    {/* Planche latérale */}
    <G>
      <Circle cx="105" cy="28" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="105" y1="32" x2="105" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="105" y1="48" x2="130" y2="48" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="105" y1="36" x2="105" y2="22" stroke={STROKE} strokeWidth="1.5" />
      <Text x="115" y="60" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Planche latérale</Text>
    </G>

    {/* Chrono */}
    <G>
      <Circle cx="155" cy="35" r="12" fill={FILL_LIGHT} stroke="#7c3aed" strokeWidth="1" />
      <Text x="155" y="33" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: '#7c3aed' }}>45s</Text>
      <Text x="155" y="42" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>côté</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: '#7c3aed' }}>
      Bird-dog 10 reps/côté + Planche latérale 45s/côté
    </Text>
  </Svg>
);

// VEINEUX — NIVEAU 3 : Montées de marches + sauts
export const VeineuxLevel3: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill="#7c3aed" rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 3 — Avancé (cardio + mollets)
    </Text>

    {/* Montée de marches */}
    <G>
      {/* Escalier */}
      <Rect x="15" y="42" width="15" height="8" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="0.5" />
      <Rect x="30" y="34" width="15" height="16" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="0.5" />
      <Rect x="45" y="26" width="15" height="24" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="0.5" />
      {/* Personnage */}
      <Circle cx="38" cy="22" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="38" y1="26" x2="38" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="38" y1="34" x2="32" y2="42" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="38" y1="34" x2="44" y2="34" stroke={STROKE} strokeWidth="1.5" />
      <Text x="35" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Escaliers rapides</Text>
    </G>

    {/* Sauts mollets */}
    <G>
      <Circle cx="100" cy="18" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="100" y1="22" x2="100" y2="35" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="100" y1="35" x2="94" y2="45" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="100" y1="35" x2="106" y2="45" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="100" y1="26" x2="92" y2="30" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="100" y1="26" x2="108" y2="30" stroke={STROKE} strokeWidth="1.5" />
      {/* Flèche saut */}
      <Path d="M100 48 L100 52" stroke="#7c3aed" strokeWidth="0.8" strokeDasharray="2,1" fill="none" />
      <Path d="M100 16 L100 10" stroke="#7c3aed" strokeWidth="0.8" fill="none" />
      <Path d="M98 12 L100 10 L102 12" stroke="#7c3aed" strokeWidth="0.5" fill="none" />
      <Text x="100" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Sauts verticaux</Text>
    </G>

    {/* Durée */}
    <G>
      <Circle cx="150" cy="35" r="14" fill={FILL_LIGHT} stroke="#7c3aed" strokeWidth="1.5" />
      <Text x="150" y="33" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: '#7c3aed' }}>20</Text>
      <Text x="150" y="42" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>min</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: '#7c3aed' }}>
      Escaliers 10 min + 30 sauts mollets • Récupération active
    </Text>
  </Svg>
);

// BPCO — NIVEAU 3 : Marche rapide + vélo
export const BpcoLevel3: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill="#7c3aed" rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 3 — Avancé (endurance)
    </Text>

    {/* Marche rapide */}
    <G>
      <Circle cx="35" cy="20" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="35" y1="25" x2="35" y2="38" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="35" y1="38" x2="28" y2="50" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="35" y1="38" x2="42" y2="50" stroke={STROKE} strokeWidth="1.5" />
      {/* Bras actifs */}
      <Line x1="35" y1="28" x2="26" y2="35" stroke={STROKE} strokeWidth="1.5" />
      <Line x1="35" y1="28" x2="44" y2="22" stroke={STROKE} strokeWidth="1.5" />
      {/* Vitesse */}
      <Line x1="20" y1="30" x2="15" y2="30" stroke="#7c3aed" strokeWidth="0.5" />
      <Line x1="20" y1="35" x2="12" y2="35" stroke="#7c3aed" strokeWidth="0.5" />
      <Line x1="20" y1="40" x2="15" y2="40" stroke="#7c3aed" strokeWidth="0.5" />
      <Text x="35" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Marche rapide</Text>
    </G>

    {/* Plus */}
    <Text x="70" y="38" textAnchor="middle" style={{ fontSize: 12, fontWeight: 700, fill: '#7c3aed' }}>+</Text>

    {/* Vélo */}
    <G>
      {/* Roues */}
      <Circle cx="100" cy="42" r="8" fill="none" stroke={STROKE} strokeWidth="1" />
      <Circle cx="125" cy="42" r="8" fill="none" stroke={STROKE} strokeWidth="1" />
      {/* Cadre */}
      <Line x1="100" y1="42" x2="112" y2="30" stroke={STROKE} strokeWidth="1" />
      <Line x1="112" y1="30" x2="125" y2="42" stroke={STROKE} strokeWidth="1" />
      <Line x1="100" y1="42" x2="118" y2="42" stroke={STROKE} strokeWidth="1" />
      {/* Cycliste */}
      <Circle cx="108" cy="22" r="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="108" y1="26" x2="112" y2="34" stroke={STROKE} strokeWidth="1" />
      <Text x="112" y="58" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>Vélo</Text>
    </G>

    {/* Durée */}
    <G>
      <Circle cx="155" cy="35" r="14" fill={FILL_LIGHT} stroke="#7c3aed" strokeWidth="1.5" />
      <Text x="155" y="33" textAnchor="middle" style={{ fontSize: 8, fontWeight: 700, fill: '#7c3aed' }}>30</Text>
      <Text x="155" y="42" textAnchor="middle" style={{ fontSize: 5, fill: STROKE }}>min</Text>
    </G>

    <Text x="90" y="68" textAnchor="middle" style={{ fontSize: 5, fill: '#7c3aed' }}>
      30 min continues • Essoufflement modéré • Lèvres pincées si besoin
    </Text>
  </Svg>
);

// OTITES — NIVEAU 3 : Programme complet prévention
export const OtitesLevel3: React.FC<DiagramProps> = ({ width = 180, height = 70 }) => (
  <Svg width={width} height={height} viewBox="0 0 180 70">
    <Rect x="0" y="0" width="180" height="12" fill="#7c3aed" rx="2" />
    <Text x="90" y="9" textAnchor="middle" style={{ fontSize: 7, fontWeight: 700, fill: '#ffffff' }}>
      NIVEAU 3 — Prévention maximale
    </Text>

    {/* Checklist complète */}
    <G>
      {/* Item 1 */}
      <Rect x="15" y="18" width="10" height="10" rx="2" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="1" />
      <Path d="M18 23 L20 25 L24 20" stroke={SECONDARY} strokeWidth="1" fill="none" />
      <Text x="30" y="26" style={{ fontSize: 6, fill: STROKE }}>Lavage nasal 2x/jour</Text>
      
      {/* Item 2 */}
      <Rect x="15" y="32" width="10" height="10" rx="2" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="1" />
      <Path d="M18 37 L20 39 L24 34" stroke={SECONDARY} strokeWidth="1" fill="none" />
      <Text x="30" y="40" style={{ fontSize: 6, fill: STROKE }}>Zéro tabac passif</Text>
      
      {/* Item 3 */}
      <Rect x="15" y="46" width="10" height="10" rx="2" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="1" />
      <Path d="M18 51 L20 53 L24 48" stroke={SECONDARY} strokeWidth="1" fill="none" />
      <Text x="30" y="54" style={{ fontSize: 6, fill: STROKE }}>Aération quotidienne</Text>
    </G>

    {/* Colonne 2 */}
    <G>
      {/* Item 4 */}
      <Rect x="100" y="18" width="10" height="10" rx="2" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="1" />
      <Path d="M103 23 L105 25 L109 20" stroke={SECONDARY} strokeWidth="1" fill="none" />
      <Text x="115" y="26" style={{ fontSize: 6, fill: STROKE }}>Vaccins à jour</Text>
      
      {/* Item 5 */}
      <Rect x="100" y="32" width="10" height="10" rx="2" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="1" />
      <Path d="M103 37 L105 39 L109 34" stroke={SECONDARY} strokeWidth="1" fill="none" />
      <Text x="115" y="40" style={{ fontSize: 6, fill: STROKE }}>Allaitement si possible</Text>
      
      {/* Item 6 */}
      <Rect x="100" y="46" width="10" height="10" rx="2" fill={FILL_LIGHT} stroke={SECONDARY} strokeWidth="1" />
      <Path d="M103 51 L105 53 L109 48" stroke={SECONDARY} strokeWidth="1" fill="none" />
      <Text x="115" y="54" style={{ fontSize: 6, fill: STROKE }}>Biberon semi-assis</Text>
    </G>

    <Text x="90" y="66" textAnchor="middle" style={{ fontSize: 5, fill: '#7c3aed' }}>
      Programme complet = réduction maximale du risque d'otites
    </Text>
  </Svg>
);

// ============================================
// EXPORT GROUPÉ PAR NIVEAU
// ============================================
export const ExerciseDiagramsByLevel = {
  // Arthrose
  arthrose_level0: ArthrosLevel0,
  arthrose_level1: ArthrosLevel1,
  arthrose_level2: ArthrosLevel2,
  arthrose_level3: ArthrosLevel3,
  // Lombalgie
  lombalgie_level0: LombalgieLevel0,
  lombalgie_level1: LombalgieLevel1,
  lombalgie_level2: LombalgieLevel2,
  lombalgie_level3: LombalgieLevel3,
  // Veineux
  veineux_level0: VeineuxLevel0,
  veineux_level1: VeineuxLevel1,
  veineux_level2: VeineuxLevel2,
  veineux_level3: VeineuxLevel3,
  // BPCO
  bpco_level0: BpcoLevel0,
  bpco_level1: BpcoLevel1,
  bpco_level2: BpcoLevel2,
  bpco_level3: BpcoLevel3,
  // Otites
  otites_level0: OtitesLevel0,
  otites_level1: OtitesLevel1,
  otites_level2: OtitesLevel2,
  otites_level3: OtitesLevel3,
};

export default ExerciseDiagramsByLevel;
