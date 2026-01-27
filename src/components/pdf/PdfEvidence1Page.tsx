// ============================================
// PDF 1 PAGE — FICHE EVIDENCE-BASED
// ============================================
// Génère un PDF 1 page A4 à partir des données evidence-pack.json
// Contient : recommandations, red flags, visuels, sources
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
} from './PdfEvidenceComponents';
import type { EvidenceData } from '@/data/evidence';

// Métadonnées par slug
const pathologyMeta: Record<string, { title: string; subtitle: string }> = {
  'arthrose': { 
    title: 'Arthrose', 
    subtitle: 'Conseils pratiques basés sur les preuves scientifiques' 
  },
  'lombalgie-chronique': { 
    title: 'Lombalgie chronique', 
    subtitle: 'Reprendre le contrôle de votre dos' 
  },
  'insuffisance-veineuse-chronique': { 
    title: 'Insuffisance veineuse', 
    subtitle: 'Soulager vos jambes au quotidien' 
  },
  'bpco': { 
    title: 'BPCO', 
    subtitle: 'Reprendre souffle et qualité de vie' 
  },
  'otites-a-repetition-enfant': { 
    title: 'Otites à répétition', 
    subtitle: 'Prévenir les infections de l\'oreille chez l\'enfant' 
  },
};

interface PdfEvidence1PageProps {
  evidence: EvidenceData;
}

export const PdfEvidence1Page: React.FC<PdfEvidence1PageProps> = ({ evidence }) => {
  const meta = pathologyMeta[evidence.slug] || { 
    title: evidence.slug, 
    subtitle: 'Recommandations basées sur les preuves' 
  };
  
  const currentDate = new Date().toLocaleDateString('fr-FR', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page1col}>
        {/* Header */}
        <PdfHeader 
          title={meta.title}
          subtitle={meta.subtitle}
          date={currentDate}
          compact
        />

        {/* Layout 2 colonnes */}
        <View style={pdfStyles.row}>
          {/* Colonne gauche */}
          <View style={pdfStyles.col2}>
            {/* Recommandations principales */}
            <PdfSectionTitle icon="✅" small>Recommandations clés</PdfSectionTitle>
            <PdfRecommendations recommendations={evidence.recommendations} compact />
            
            {/* Schéma anatomique */}
            <View style={{ marginTop: 10 }}>
              <PdfBodySchema slug={evidence.slug} width={160} height={100} />
            </View>
          </View>

          {/* Colonne droite */}
          <View style={pdfStyles.col2Last}>
            {/* Schéma exercices */}
            <PdfExerciseSchema slug={evidence.slug} width={180} height={70} />
            
            {/* Red Flags */}
            <View style={{ marginTop: 8 }}>
              <PdfRedFlags alerts={evidence.red_flags} compact />
            </View>
            
            {/* Message clé */}
            <View style={[pdfStyles.boxLevel0, { marginTop: 8, padding: 8 }]}>
              <Text style={{ fontSize: 8, fontWeight: 600, color: PDF_COLORS.secondary }}>
                ✨ L'essentiel à retenir
              </Text>
              <Text style={{ fontSize: 7, color: PDF_COLORS.text, marginTop: 4 }}>
                {evidence.slug === 'arthrose' && "Le mouvement nourrit le cartilage. Bougez un peu chaque jour."}
                {evidence.slug === 'lombalgie-chronique' && "Restez actif. Le repos prolongé aggrave le mal de dos."}
                {evidence.slug === 'insuffisance-veineuse-chronique' && "Compression + marche = jambes plus légères."}
                {evidence.slug === 'bpco' && "Arrêter le tabac + réhabilitation = meilleure qualité de vie."}
                {evidence.slug === 'otites-a-repetition-enfant' && "Éviter la fumée + hygiène = moins d'otites."}
              </Text>
            </View>
          </View>
        </View>

        {/* Sources */}
        <PdfSources sources={evidence.sources} lastUpdated={currentDate} />

        {/* Footer */}
        <PdfFooter compact />
      </Page>
    </Document>
  );
};

export default PdfEvidence1Page;
