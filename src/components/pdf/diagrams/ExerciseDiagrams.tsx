// ============================================
// DIAGRAMMES EXERCICES SIMPLES
// ============================================
// Style : stick figures, trait fin, gris foncé
// Ultra-simple, compréhensible niveau collège
// ============================================

import React from 'react';
import { Svg, Path, Circle, Rect, Line, Text, G } from '@react-pdf/renderer';

// Couleurs du style
const STROKE = '#333333';
const STROKE_LIGHT = '#666666';
const FILL_LIGHT = '#f0f0f0';
const FILL_ACCENT = '#e8e8e8';
const PRIMARY = '#1a7a8c';

interface DiagramProps {
  width?: number;
  height?: number;
}

// ============================================
// ARTHROSE — Assis-debout (Sit to Stand)
// ============================================
export const SitToStand: React.FC<DiagramProps> = ({ width = 200, height = 80 }) => (
  <Svg width={width} height={height} viewBox="0 0 200 80">
    {/* Position 1: Assis */}
    <G>
      {/* Chaise */}
      <Rect x="10" y="35" width="30" height="5" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Line x1="12" y1="40" x2="12" y2="55" stroke={STROKE_LIGHT} strokeWidth="1" />
      <Line x1="38" y1="40" x2="38" y2="55" stroke={STROKE_LIGHT} strokeWidth="1" />
      {/* Personnage assis */}
      <Circle cx="25" cy="22" r="6" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      <Line x1="25" y1="28" x2="25" y2="38" stroke={STROKE} strokeWidth="2" />
      <Line x1="25" y1="38" x2="18" y2="52" stroke={STROKE} strokeWidth="2" />
      <Line x1="25" y1="38" x2="32" y2="52" stroke={STROKE} strokeWidth="2" />
      <Line x1="25" y1="32" x2="18" y2="36" stroke={STROKE} strokeWidth="2" />
      <Line x1="25" y1="32" x2="32" y2="36" stroke={STROKE} strokeWidth="2" />
      <Text x="25" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>1. Assis</Text>
    </G>

    {/* Flèche */}
    <Path d="M50 40 L65 40" stroke={PRIMARY} strokeWidth="1.5" fill="none" />
    <Path d="M62 37 L65 40 L62 43" stroke={PRIMARY} strokeWidth="1.5" fill="none" />

    {/* Position 2: En train de se lever */}
    <G>
      {/* Chaise */}
      <Rect x="75" y="45" width="30" height="5" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      {/* Personnage penché */}
      <Circle cx="95" cy="20" r="6" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      <Path d="M95 26 Q100 35 98 42" stroke={STROKE} strokeWidth="2" fill="none" />
      <Line x1="98" y1="42" x2="88" y2="55" stroke={STROKE} strokeWidth="2" />
      <Line x1="98" y1="42" x2="105" y2="55" stroke={STROKE} strokeWidth="2" />
      <Line x1="97" y1="32" x2="108" y2="38" stroke={STROKE} strokeWidth="2" />
      <Line x1="97" y1="32" x2="88" y2="35" stroke={STROKE} strokeWidth="2" />
      <Text x="95" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>2. Se lever</Text>
    </G>

    {/* Flèche */}
    <Path d="M118 40 L133 40" stroke={PRIMARY} strokeWidth="1.5" fill="none" />
    <Path d="M130 37 L133 40 L130 43" stroke={PRIMARY} strokeWidth="1.5" fill="none" />

    {/* Position 3: Debout */}
    <G>
      {/* Personnage debout */}
      <Circle cx="160" cy="12" r="6" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      <Line x1="160" y1="18" x2="160" y2="40" stroke={STROKE} strokeWidth="2" />
      <Line x1="160" y1="40" x2="152" y2="58" stroke={STROKE} strokeWidth="2" />
      <Line x1="160" y1="40" x2="168" y2="58" stroke={STROKE} strokeWidth="2" />
      <Line x1="160" y1="26" x2="150" y2="32" stroke={STROKE} strokeWidth="2" />
      <Line x1="160" y1="26" x2="170" y2="32" stroke={STROKE} strokeWidth="2" />
      <Text x="160" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>3. Debout</Text>
    </G>

    {/* Conseil */}
    <Text x="100" y="78" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      10 répétitions • 2-3x par jour
    </Text>
  </Svg>
);

// ============================================
// LOMBALGIE — Gainage doux
// ============================================
export const GainageDoux: React.FC<DiagramProps> = ({ width = 200, height = 80 }) => (
  <Svg width={width} height={height} viewBox="0 0 200 80">
    {/* Position 1: À 4 pattes */}
    <G>
      {/* Sol */}
      <Line x1="8" y1="55" x2="55" y2="55" stroke={STROKE_LIGHT} strokeWidth="0.5" />
      {/* Personnage */}
      <Circle cx="45" cy="28" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      <Line x1="40" y1="30" x2="18" y2="35" stroke={STROKE} strokeWidth="2" />
      <Line x1="18" y1="35" x2="18" y2="50" stroke={STROKE} strokeWidth="2" />
      <Line x1="40" y1="35" x2="40" y2="50" stroke={STROKE} strokeWidth="2" />
      <Text x="32" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>1. À 4 pattes</Text>
    </G>

    {/* Flèche */}
    <Path d="M62 38 L75 38" stroke={PRIMARY} strokeWidth="1.5" fill="none" />
    <Path d="M72 35 L75 38 L72 41" stroke={PRIMARY} strokeWidth="1.5" fill="none" />

    {/* Position 2: Rentrer le ventre */}
    <G>
      {/* Sol */}
      <Line x1="78" y1="55" x2="128" y2="55" stroke={STROKE_LIGHT} strokeWidth="0.5" />
      {/* Personnage avec dos rond */}
      <Circle cx="115" cy="26" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      <Path d="M110 28 Q95 22 88 30" stroke={STROKE} strokeWidth="2" fill="none" />
      <Line x1="88" y1="30" x2="88" y2="50" stroke={STROKE} strokeWidth="2" />
      <Line x1="110" y1="32" x2="110" y2="50" stroke={STROKE} strokeWidth="2" />
      {/* Flèche ventre rentré */}
      <Path d="M100 35 L100 28" stroke={PRIMARY} strokeWidth="1" fill="none" />
      <Path d="M98 30 L100 28 L102 30" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="103" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>2. Ventre rentré</Text>
    </G>

    {/* Position 3: Tenir */}
    <G>
      {/* Sol */}
      <Line x1="138" y1="55" x2="195" y2="55" stroke={STROKE_LIGHT} strokeWidth="0.5" />
      {/* Personnage stable */}
      <Circle cx="178" cy="26" r="5" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      <Line x1="173" y1="28" x2="150" y2="32" stroke={STROKE} strokeWidth="2" />
      <Line x1="150" y1="32" x2="150" y2="50" stroke={STROKE} strokeWidth="2" />
      <Line x1="173" y1="32" x2="173" y2="50" stroke={STROKE} strokeWidth="2" />
      {/* Chrono */}
      <Circle cx="185" cy="42" r="8" fill={FILL_LIGHT} stroke={PRIMARY} strokeWidth="1" />
      <Text x="185" y="45" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>15s</Text>
      <Text x="166" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>3. Tenir 15s</Text>
    </G>

    {/* Conseil */}
    <Text x="100" y="78" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      5 répétitions • respirer normalement
    </Text>
  </Svg>
);

// ============================================
// INSUFFISANCE VEINEUSE — Pompe mollet
// ============================================
export const PompeMollet: React.FC<DiagramProps> = ({ width = 200, height = 80 }) => (
  <Svg width={width} height={height} viewBox="0 0 200 80">
    {/* Position 1: Pieds à plat */}
    <G>
      {/* Sol */}
      <Line x1="10" y1="58" x2="55" y2="58" stroke={STROKE_LIGHT} strokeWidth="0.5" />
      {/* Jambes */}
      <Rect x="20" y="15" width="8" height="35" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="38" y="15" width="8" height="35" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      {/* Pieds plats */}
      <Rect x="18" y="50" width="12" height="6" rx="1" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="36" y="50" width="12" height="6" rx="1" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Text x="33" y="70" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>1. Pieds à plat</Text>
    </G>

    {/* Flèche */}
    <Path d="M60 38 L78 38" stroke={PRIMARY} strokeWidth="1.5" fill="none" />
    <Path d="M75 35 L78 38 L75 41" stroke={PRIMARY} strokeWidth="1.5" fill="none" />

    {/* Position 2: Sur les pointes */}
    <G>
      {/* Sol */}
      <Line x1="82" y1="58" x2="128" y2="58" stroke={STROKE_LIGHT} strokeWidth="0.5" />
      {/* Jambes surélevées */}
      <Rect x="92" y="8" width="8" height="35" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="110" y="8" width="8" height="35" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      {/* Pieds sur pointes */}
      <Path d="M94 43 L94 52 Q96 56 98 52 L98 48" stroke={STROKE} strokeWidth="1" fill={FILL_LIGHT} />
      <Path d="M112 43 L112 52 Q114 56 116 52 L116 48" stroke={STROKE} strokeWidth="1" fill={FILL_LIGHT} />
      {/* Flèche montée */}
      <Path d="M105 20 L105 8" stroke={PRIMARY} strokeWidth="1" fill="none" />
      <Path d="M103 11 L105 8 L107 11" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="105" y="70" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>2. Sur pointes</Text>
    </G>

    {/* Flèche */}
    <Path d="M132 38 L150 38" stroke={PRIMARY} strokeWidth="1.5" fill="none" />
    <Path d="M147 35 L150 38 L147 41" stroke={PRIMARY} strokeWidth="1.5" fill="none" />

    {/* Position 3: Redescendre */}
    <G>
      {/* Sol */}
      <Line x1="152" y1="58" x2="198" y2="58" stroke={STROKE_LIGHT} strokeWidth="0.5" />
      {/* Jambes */}
      <Rect x="162" y="15" width="8" height="35" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="180" y="15" width="8" height="35" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      {/* Pieds */}
      <Rect x="160" y="50" width="12" height="6" rx="1" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Rect x="178" y="50" width="12" height="6" rx="1" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      {/* Flèche descente */}
      <Path d="M175 8 L175 18" stroke={PRIMARY} strokeWidth="1" fill="none" />
      <Path d="M173 15 L175 18 L177 15" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="175" y="70" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>3. Redescendre</Text>
    </G>

    {/* Conseil */}
    <Text x="100" y="78" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      20 répétitions • 3x par jour
    </Text>
  </Svg>
);

// ============================================
// BPCO — Respiration lèvres pincées
// ============================================
export const LevresPincees: React.FC<DiagramProps> = ({ width = 200, height = 80 }) => (
  <Svg width={width} height={height} viewBox="0 0 200 80">
    {/* Phase 1: Inspirer par le nez */}
    <G>
      {/* Visage */}
      <Circle cx="35" cy="30" r="18" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      {/* Yeux */}
      <Circle cx="28" cy="26" r="2" fill={STROKE} />
      <Circle cx="42" cy="26" r="2" fill={STROKE} />
      {/* Nez */}
      <Path d="M35 28 L35 35" stroke={STROKE} strokeWidth="1" />
      {/* Bouche fermée */}
      <Line x1="28" y1="40" x2="42" y2="40" stroke={STROKE} strokeWidth="1" />
      {/* Flèches air entrant (nez) */}
      <Path d="M35 18 L35 24" stroke={PRIMARY} strokeWidth="1" fill="none" />
      <Path d="M33 21 L35 18 L37 21" stroke={PRIMARY} strokeWidth="0.5" fill="none" />
      <Text x="35" y="58" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>1. Inspirer</Text>
      <Text x="35" y="66" textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>par le nez</Text>
      <Text x="35" y="74" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PRIMARY }}>2 sec</Text>
    </G>

    {/* Flèche */}
    <Path d="M62 35 L78 35" stroke={PRIMARY} strokeWidth="1.5" fill="none" />
    <Path d="M75 32 L78 35 L75 38" stroke={PRIMARY} strokeWidth="1.5" fill="none" />

    {/* Phase 2: Lèvres pincées */}
    <G>
      {/* Visage */}
      <Circle cx="105" cy="30" r="18" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      {/* Yeux */}
      <Circle cx="98" cy="26" r="2" fill={STROKE} />
      <Circle cx="112" cy="26" r="2" fill={STROKE} />
      {/* Nez */}
      <Path d="M105 28 L105 35" stroke={STROKE} strokeWidth="1" />
      {/* Lèvres pincées (petit O) */}
      <Circle cx="105" cy="40" r="3" fill="#ffcccc" stroke={STROKE} strokeWidth="1" />
      <Text x="105" y="58" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>2. Pincer</Text>
      <Text x="105" y="66" textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>les lèvres</Text>
    </G>

    {/* Flèche */}
    <Path d="M132 35 L148 35" stroke={PRIMARY} strokeWidth="1.5" fill="none" />
    <Path d="M145 32 L148 35 L145 38" stroke={PRIMARY} strokeWidth="1.5" fill="none" />

    {/* Phase 3: Expirer lentement */}
    <G>
      {/* Visage */}
      <Circle cx="175" cy="30" r="18" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
      {/* Yeux */}
      <Circle cx="168" cy="26" r="2" fill={STROKE} />
      <Circle cx="182" cy="26" r="2" fill={STROKE} />
      {/* Nez */}
      <Path d="M175 28 L175 35" stroke={STROKE} strokeWidth="1" />
      {/* Lèvres pincées + air sortant */}
      <Circle cx="175" cy="40" r="3" fill="#ffcccc" stroke={STROKE} strokeWidth="1" />
      {/* Air sortant */}
      <Path d="M180 40 Q188 38 195 40" stroke={PRIMARY} strokeWidth="1" strokeDasharray="2,1" fill="none" />
      <Path d="M180 42 Q188 44 195 42" stroke={PRIMARY} strokeWidth="1" strokeDasharray="2,1" fill="none" />
      <Text x="175" y="58" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>3. Expirer</Text>
      <Text x="175" y="66" textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>lentement</Text>
      <Text x="175" y="74" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: PRIMARY }}>4 sec</Text>
    </G>
  </Svg>
);

// ============================================
// OTITES — Prévention (lavage mains + pas fumée)
// ============================================
export const PreventionHygiene: React.FC<DiagramProps> = ({ width = 200, height = 80 }) => (
  <Svg width={width} height={height} viewBox="0 0 200 80">
    {/* Geste 1: Lavage des mains */}
    <G>
      {/* Mains */}
      <Path d="M22 25 Q15 30 18 42 Q20 50 28 48 Q34 46 32 38 Q30 30 22 25" 
            fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Path d="M42 25 Q50 30 47 42 Q45 50 37 48 Q31 46 33 38 Q35 30 42 25" 
            fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      {/* Bulles savon */}
      <Circle cx="26" cy="38" r="3" fill="#ddeeff" stroke={PRIMARY} strokeWidth="0.5" />
      <Circle cx="35" cy="35" r="2" fill="#ddeeff" stroke={PRIMARY} strokeWidth="0.5" />
      <Circle cx="40" cy="42" r="2.5" fill="#ddeeff" stroke={PRIMARY} strokeWidth="0.5" />
      {/* Gouttes eau */}
      <Path d="M25 52 L27 58" stroke={PRIMARY} strokeWidth="0.5" />
      <Path d="M35 52 L35 58" stroke={PRIMARY} strokeWidth="0.5" />
      <Text x="32" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>Lavage mains</Text>
    </G>

    {/* Séparateur */}
    <Line x1="70" y1="15" x2="70" y2="55" stroke={STROKE_LIGHT} strokeWidth="0.5" strokeDasharray="3,2" />

    {/* Geste 2: Pas de fumée */}
    <G>
      {/* Cercle interdit */}
      <Circle cx="105" cy="35" r="20" fill="none" stroke="#cc4444" strokeWidth="2" />
      <Line x1="90" y1="20" x2="120" y2="50" stroke="#cc4444" strokeWidth="2" />
      {/* Cigarette */}
      <Rect x="95" y="32" width="18" height="6" rx="1" fill={FILL_LIGHT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
      <Rect x="113" y="33" width="5" height="4" rx="1" fill="#ddaa66" />
      {/* Fumée barrée */}
      <Path d="M118 30 Q122 25 118 20" stroke={STROKE_LIGHT} strokeWidth="0.5" fill="none" />
      <Text x="105" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>Zéro tabac</Text>
    </G>

    {/* Séparateur */}
    <Line x1="140" y1="15" x2="140" y2="55" stroke={STROKE_LIGHT} strokeWidth="0.5" strokeDasharray="3,2" />

    {/* Geste 3: Aérer */}
    <G>
      {/* Fenêtre */}
      <Rect x="155" y="18" width="35" height="35" rx="2" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
      <Line x1="172" y1="18" x2="172" y2="53" stroke={STROKE} strokeWidth="0.5" />
      <Line x1="155" y1="35" x2="190" y2="35" stroke={STROKE} strokeWidth="0.5" />
      {/* Flèches air frais */}
      <Path d="M148 28 L155 30" stroke={PRIMARY} strokeWidth="1" fill="none" />
      <Path d="M148 35 L155 35" stroke={PRIMARY} strokeWidth="1" fill="none" />
      <Path d="M148 42 L155 40" stroke={PRIMARY} strokeWidth="1" fill="none" />
      <Text x="172" y="68" textAnchor="middle" style={{ fontSize: 6, fill: STROKE }}>Aérer 2x/jour</Text>
    </G>

    {/* Conseil */}
    <Text x="100" y="78" textAnchor="middle" style={{ fontSize: 5, fill: PRIMARY }}>
      3 gestes simples = moins d'otites
    </Text>
  </Svg>
);

// ============================================
// EXPORT GROUPÉ
// ============================================
export const ExerciseDiagrams = {
  sit_to_stand: SitToStand,
  gainage_doux: GainageDoux,
  pompe_mollet: PompeMollet,
  levres_pincees: LevresPincees,
  prevention_hygiene: PreventionHygiene,
};

export default ExerciseDiagrams;
