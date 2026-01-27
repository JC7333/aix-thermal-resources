// ============================================
// DIAGRAMMES ANATOMIQUES SIMPLES
// ============================================
// Style : trait fin (1-1.5px), gris foncé #333, fond transparent
// Ultra-simple, compréhensible niveau collège
// ============================================

import React from 'react';
import { Svg, Path, Circle, Rect, Line, Text, G } from '@react-pdf/renderer';

// Couleurs du style
const STROKE = '#333333';
const STROKE_LIGHT = '#666666';
const FILL_LIGHT = '#f0f0f0';
const FILL_ACCENT = '#e8e8e8';
const DANGER = '#cc4444';
const SUCCESS = '#448844';

interface DiagramProps {
  width?: number;
  height?: number;
}

// ============================================
// ARTHROSE — Articulation simple
// ============================================
export const ArticulationSimple: React.FC<DiagramProps> = ({ width = 160, height = 120 }) => (
  <Svg width={width} height={height} viewBox="0 0 160 120">
    {/* Titre */}
    <Text x="80" y="10" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: STROKE }}>
      Articulation du genou
    </Text>
    
    {/* Os supérieur (fémur) */}
    <Rect x="50" y="18" width="60" height="22" rx="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
    <Text x="80" y="32" textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>OS</Text>
    
    {/* Cartilage sain (gauche) */}
    <Rect x="50" y="42" width="28" height="6" rx="2" fill={SUCCESS} stroke={STROKE} strokeWidth="0.5" />
    <Line x1="52" y1="52" x2="52" y2="58" stroke={STROKE_LIGHT} strokeWidth="0.5" />
    <Text x="55" y="64" style={{ fontSize: 5, fill: SUCCESS }}>Sain</Text>
    
    {/* Cartilage usé (droite) */}
    <Rect x="82" y="42" width="28" height="3" rx="1" fill={DANGER} stroke={STROKE} strokeWidth="0.5" />
    <Path d="M85 45 L88 44 L91 45 L94 44 L97 45" stroke={DANGER} strokeWidth="0.5" fill="none" />
    <Line x1="108" y1="52" x2="108" y2="58" stroke={STROKE_LIGHT} strokeWidth="0.5" />
    <Text x="100" y="64" style={{ fontSize: 5, fill: DANGER }}>Usé</Text>
    
    {/* Espace articulaire */}
    <Rect x="50" y="50" width="60" height="3" rx="1" fill="#ffffff" stroke={STROKE_LIGHT} strokeWidth="0.5" strokeDasharray="2,1" />
    
    {/* Os inférieur (tibia) */}
    <Rect x="50" y="55" width="60" height="22" rx="4" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
    <Text x="80" y="69" textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>OS</Text>
    
    {/* Légende */}
    <Rect x="30" y="85" width="100" height="28" rx="3" fill={FILL_ACCENT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
    <Text x="80" y="97" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: STROKE }}>
      Le mouvement nourrit le cartilage
    </Text>
    <Text x="80" y="107" textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>
      Bouger = moins de douleur
    </Text>
  </Svg>
);

// ============================================
// LOMBALGIE — Colonne simple
// ============================================
export const ColonneSimple: React.FC<DiagramProps> = ({ width = 160, height = 120 }) => (
  <Svg width={width} height={height} viewBox="0 0 160 120">
    {/* Titre */}
    <Text x="80" y="10" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: STROKE }}>
      Colonne lombaire
    </Text>
    
    {/* Vertèbres L1-L5 */}
    {[18, 34, 50, 66, 82].map((y, i) => (
      <G key={i}>
        {/* Corps vertébral */}
        <Rect x="60" y={y} width="40" height="12" rx="3" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
        <Text x="80" y={y + 8} textAnchor="middle" style={{ fontSize: 5, fill: STROKE_LIGHT }}>L{i + 1}</Text>
        {/* Disque */}
        {i < 4 && (
          <Rect 
            x="62" 
            y={y + 13} 
            width="36" 
            height="4" 
            rx="1" 
            fill={i === 3 ? DANGER : SUCCESS} 
            stroke={STROKE_LIGHT} 
            strokeWidth="0.5" 
          />
        )}
      </G>
    ))}
    
    {/* Zone tension */}
    <Circle cx="115" cy="72" r="12" fill="none" stroke={DANGER} strokeWidth="1" strokeDasharray="3,2" />
    <Text x="115" y="75" textAnchor="middle" style={{ fontSize: 5, fill: DANGER }}>Tension</Text>
    
    {/* Muscles (ligne) */}
    <Path d="M55 25 Q45 50 50 80" stroke={SUCCESS} strokeWidth="2" fill="none" opacity="0.5" />
    <Text x="38" y="55" style={{ fontSize: 5, fill: SUCCESS }}>Muscles</Text>
    
    {/* Légende */}
    <Text x="80" y="112" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: STROKE }}>
      Bouger détend les muscles
    </Text>
  </Svg>
);

// ============================================
// INSUFFISANCE VEINEUSE — Retour veineux
// ============================================
export const RetourVeineux: React.FC<DiagramProps> = ({ width = 160, height = 120 }) => (
  <Svg width={width} height={height} viewBox="0 0 160 120">
    {/* Titre */}
    <Text x="80" y="10" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: STROKE }}>
      Circulation veineuse
    </Text>
    
    {/* Jambe gauche - SAINE */}
    <Text x="45" y="22" textAnchor="middle" style={{ fontSize: 5, fontWeight: 600, fill: SUCCESS }}>SAINE</Text>
    <Rect x="30" y="26" width="30" height="70" rx="6" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
    {/* Veine */}
    <Path d="M45 30 Q42 50 48 70 Q50 85 45 92" stroke="#6666aa" strokeWidth="2" fill="none" />
    {/* Valvules OK */}
    <Circle cx="44" cy="40" r="3" fill={SUCCESS} />
    <Circle cx="47" cy="60" r="3" fill={SUCCESS} />
    <Circle cx="45" cy="80" r="3" fill={SUCCESS} />
    {/* Flèche montante */}
    <Path d="M52 85 L52 35" stroke={SUCCESS} strokeWidth="0.5" fill="none" />
    <Path d="M50 38 L52 35 L54 38" stroke={SUCCESS} strokeWidth="0.5" fill="none" />
    
    {/* Jambe droite - MALADE */}
    <Text x="115" y="22" textAnchor="middle" style={{ fontSize: 5, fontWeight: 600, fill: DANGER }}>MALADE</Text>
    <Rect x="100" y="26" width="30" height="70" rx="6" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
    {/* Veine dilatée */}
    <Path d="M115 30 Q108 45 122 55 Q130 70 112 85 Q108 92 118 95" stroke="#8888cc" strokeWidth="3" fill="none" />
    {/* Valvules KO */}
    <Circle cx="112" cy="42" r="3" fill={DANGER} />
    <Circle cx="124" cy="62" r="3" fill={DANGER} />
    {/* Reflux */}
    <Path d="M122 45 L122 55" stroke={DANGER} strokeWidth="0.5" fill="none" />
    <Path d="M120 52 L122 55 L124 52" stroke={DANGER} strokeWidth="0.5" fill="none" />
    
    {/* Légende */}
    <Rect x="25" y="100" width="110" height="16" rx="2" fill={FILL_ACCENT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
    <Text x="80" y="110" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: STROKE }}>
      Compression + mouvement = solution
    </Text>
  </Svg>
);

// ============================================
// BPCO — Airways (voies respiratoires)
// ============================================
export const Airways: React.FC<DiagramProps> = ({ width = 160, height = 120 }) => (
  <Svg width={width} height={height} viewBox="0 0 160 120">
    {/* Titre */}
    <Text x="80" y="10" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: STROKE }}>
      Voies respiratoires
    </Text>
    
    {/* Trachée */}
    <Rect x="72" y="16" width="16" height="18" rx="3" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
    <Text x="80" y="28" textAnchor="middle" style={{ fontSize: 4, fill: STROKE_LIGHT }}>Trachée</Text>
    
    {/* Poumon gauche - SAIN */}
    <Text x="40" y="28" textAnchor="middle" style={{ fontSize: 5, fill: SUCCESS }}>SAIN</Text>
    <Path d="M35 35 Q20 50 25 75 Q32 90 50 85 Q68 80 70 55 Q70 40 55 35 Z" 
          fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
    {/* Bronches saines */}
    <Path d="M70 38 Q60 48 45 55" stroke={SUCCESS} strokeWidth="2" fill="none" />
    <Path d="M45 55 Q35 62 30 72" stroke={SUCCESS} strokeWidth="1.5" fill="none" />
    <Path d="M45 55 Q50 65 45 78" stroke={SUCCESS} strokeWidth="1.5" fill="none" />
    {/* Alvéoles */}
    <Circle cx="32" cy="72" r="4" fill="#ddffdd" stroke={SUCCESS} strokeWidth="0.5" />
    <Circle cx="45" cy="78" r="4" fill="#ddffdd" stroke={SUCCESS} strokeWidth="0.5" />
    
    {/* Poumon droit - BPCO */}
    <Text x="120" y="28" textAnchor="middle" style={{ fontSize: 5, fill: DANGER }}>BPCO</Text>
    <Path d="M90 55 Q90 40 105 35 Q125 30 140 50 Q145 75 128 85 Q110 92 90 80 Q85 65 90 55 Z" 
          fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
    {/* Bronches obstruées */}
    <Path d="M90 38 Q100 48 115 52" stroke={DANGER} strokeWidth="2.5" fill="none" />
    <Path d="M115 52 Q125 60 130 70" stroke={DANGER} strokeWidth="2" fill="none" />
    {/* Mucus */}
    <Circle cx="122" cy="56" r="4" fill="#ddaa66" stroke={DANGER} strokeWidth="0.5" />
    <Circle cx="128" cy="68" r="3" fill="#ddaa66" stroke={DANGER} strokeWidth="0.5" />
    
    {/* Légende */}
    <Rect x="25" y="98" width="110" height="18" rx="2" fill={FILL_ACCENT} stroke={STROKE_LIGHT} strokeWidth="0.5" />
    <Text x="80" y="108" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: STROKE }}>
      Arrêt tabac + réhabilitation
    </Text>
  </Svg>
);

// ============================================
// OTITES — Trompe d'Eustache
// ============================================
export const TrompeEustache: React.FC<DiagramProps> = ({ width = 160, height = 120 }) => (
  <Svg width={width} height={height} viewBox="0 0 160 120">
    {/* Titre */}
    <Text x="80" y="10" textAnchor="middle" style={{ fontSize: 7, fontWeight: 600, fill: STROKE }}>
      Oreille de l'enfant
    </Text>
    
    {/* Pavillon */}
    <Path d="M25 40 Q18 50 20 65 Q22 80 30 85 Q42 82 48 70 Q52 55 45 45 Q38 38 25 40" 
          fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
    
    {/* Conduit auditif */}
    <Path d="M48 58 L75 52" stroke={STROKE} strokeWidth="4" fill="none" />
    <Path d="M48 58 L75 52" stroke={FILL_LIGHT} strokeWidth="2" fill="none" />
    <Text x="62" y="48" style={{ fontSize: 4, fill: STROKE_LIGHT }}>Conduit</Text>
    
    {/* Tympan */}
    <Path d="M78 46 Q85 52 78 58" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1.5" />
    <Text x="78" y="66" textAnchor="middle" style={{ fontSize: 4, fill: STROKE_LIGHT }}>Tympan</Text>
    
    {/* Oreille moyenne */}
    <Rect x="82" y="42" width="28" height="22" rx="3" fill={FILL_LIGHT} stroke={STROKE} strokeWidth="1" />
    <Text x="96" y="52" textAnchor="middle" style={{ fontSize: 4, fill: STROKE_LIGHT }}>Oreille</Text>
    <Text x="96" y="58" textAnchor="middle" style={{ fontSize: 4, fill: STROKE_LIGHT }}>moyenne</Text>
    
    {/* Zone infection */}
    <Circle cx="96" cy="53" r="10" fill="none" stroke={DANGER} strokeWidth="0.5" strokeDasharray="2,1" />
    
    {/* Trompe d'Eustache */}
    <Path d="M95 64 Q85 78 70 88" stroke={STROKE} strokeWidth="2" fill="none" />
    <Text x="82" y="82" style={{ fontSize: 5, fill: STROKE }}>Trompe</Text>
    <Text x="65" y="95" style={{ fontSize: 4, fill: STROKE_LIGHT }}>(vers la gorge)</Text>
    
    {/* Annotation */}
    <Line x1="110" y1="53" x2="130" y2="45" stroke={DANGER} strokeWidth="0.5" />
    <Text x="132" y="42" style={{ fontSize: 5, fill: DANGER }}>Infection</Text>
    <Text x="132" y="48" style={{ fontSize: 5, fill: DANGER }}>fréquente</Text>
    
    {/* Légende */}
    <Text x="80" y="110" textAnchor="middle" style={{ fontSize: 6, fontWeight: 600, fill: STROKE }}>
      Trompe courte chez l'enfant = plus d'otites
    </Text>
  </Svg>
);

// ============================================
// EXPORT GROUPÉ
// ============================================
export const AnatomyDiagrams = {
  articulation_simple: ArticulationSimple,
  colonne_simple: ColonneSimple,
  retour_veineux: RetourVeineux,
  airways: Airways,
  trompe_eustache: TrompeEustache,
};

export default AnatomyDiagrams;
