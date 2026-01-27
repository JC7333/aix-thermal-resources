// ============================================
// PDF 4 PAGES — GUIDE COMPLET EVIDENCE-BASED
// ============================================
// Génère un PDF 4 pages A4 à partir des données evidence-pack.json
// Structure :
// - Page 1 : Introduction + Recommandations principales
// - Page 2 : Toutes les recommandations + Visuels
// - Page 3 : Red flags + Conseils pratiques
// - Page 4 : Sources détaillées
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

// Métadonnées enrichies par slug
const pathologyMeta: Record<string, { 
  title: string; 
  subtitle: string;
  intro: string;
  keyMessage: string;
  tips: string[];
}> = {
  'arthrose': { 
    title: 'Arthrose', 
    subtitle: 'Guide complet basé sur les preuves scientifiques',
    intro: "L'arthrose touche des millions de personnes. La bonne nouvelle ? Des gestes simples peuvent vraiment améliorer votre quotidien. Ce guide résume les recommandations les plus solides de la littérature scientifique.",
    keyMessage: "Le mouvement régulier nourrit votre cartilage. Même 5-10 minutes par jour font la différence.",
    tips: [
      "Commencez doucement : 5 minutes d'exercice valent mieux que rien",
      "La chaleur (bouillotte) soulage les raideurs matinales",
      "Chaque kilo perdu = 4 kg de pression en moins sur les genoux",
      "Changez de position toutes les heures",
    ],
  },
  'lombalgie-chronique': { 
    title: 'Lombalgie chronique', 
    subtitle: 'Reprendre le contrôle de votre dos',
    intro: "Dans plus de 90% des cas, le mal de dos chronique n'est pas grave. Mais il peut être très handicapant. Ce guide vous donne les clés validées par la science pour retrouver une vie active.",
    keyMessage: "Le repos prolongé aggrave le mal de dos. Restez actif, même si ça fait un peu mal au début.",
    tips: [
      "Marche, natation, vélo : reprenez progressivement",
      "Le gainage renforce les muscles protecteurs",
      "Le stress contracte les muscles du dos — gérez-le",
      "Une bonne posture de travail fait la différence",
    ],
  },
  'insuffisance-veineuse-chronique': { 
    title: 'Insuffisance veineuse chronique', 
    subtitle: 'Soulager vos jambes au quotidien',
    intro: "Jambes lourdes, varices, œdèmes... L'insuffisance veineuse est fréquente et gênante. Voici les solutions qui ont fait leurs preuves selon les dernières recommandations européennes.",
    keyMessage: "La compression + le mouvement = le duo gagnant pour vos jambes.",
    tips: [
      "Portez vos bas de compression dès le matin",
      "Marchez 30 minutes par jour minimum",
      "Surélevez vos jambes le soir, 15-20 minutes",
      "Évitez les stations debout ou assises prolongées",
    ],
  },
  'bpco': { 
    title: 'BPCO', 
    subtitle: 'Reprendre souffle et qualité de vie',
    intro: "La BPCO peut être stabilisée et améliorée. Ce guide rassemble les actions les plus efficaces selon les recommandations internationales GOLD.",
    keyMessage: "Arrêter le tabac + réhabilitation respiratoire = les deux piliers essentiels.",
    tips: [
      "Arrêter le tabac : action n°1, même tardivement",
      "La réhabilitation respiratoire améliore vraiment l'essoufflement",
      "Marche fractionnée : 5 min + pause + 5 min",
      "Technique des lèvres pincées pour mieux expirer",
    ],
  },
  'otites-a-repetition-enfant': { 
    title: 'Otites à répétition (enfant)', 
    subtitle: 'Prévenir les infections de l\'oreille',
    intro: "Les otites récidivantes sont fréquentes chez l'enfant. Ce guide résume les mesures préventives validées et les situations nécessitant un avis spécialisé.",
    keyMessage: "Éviter la fumée passive + bonne hygiène = moins d'otites.",
    tips: [
      "Pas de tabagisme passif : priorité absolue",
      "Lavage des mains fréquent pour toute la famille",
      "Le xylitol (chewing-gum) peut aider certains enfants",
      "Aérateurs transtympaniques si critères remplis",
    ],
  },
};

interface PdfEvidence4PagesProps {
  evidence: EvidenceData;
}

export const PdfEvidence4Pages: React.FC<PdfEvidence4PagesProps> = ({ evidence }) => {
  const meta = pathologyMeta[evidence.slug] || { 
    title: evidence.slug, 
    subtitle: 'Guide complet',
    intro: "Ce guide résume les recommandations basées sur les preuves scientifiques les plus récentes.",
    keyMessage: "Suivez ces conseils pour améliorer votre quotidien.",
    tips: [],
  };
  
  const currentDate = new Date().toLocaleDateString('fr-FR', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <Document>
      {/* ============================================ */}
      {/* PAGE 1 : Introduction + Schémas */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <PdfHeader 
          title={meta.title}
          subtitle={meta.subtitle}
          date={currentDate}
        />

        {/* Introduction */}
        <View style={pdfStyles.boxPrimary}>
          <Text style={pdfStyles.paragraph}>
            {meta.intro}
          </Text>
        </View>

        {/* Message clé */}
        <View style={pdfStyles.boxLevel0}>
          <Text style={pdfStyles.level0Title}>✨ L'essentiel à retenir</Text>
          <Text style={pdfStyles.paragraphSmall}>
            {meta.keyMessage}
          </Text>
        </View>

        {/* Schémas côte à côte */}
        <PdfSectionTitle icon="🔬">Comprendre pour mieux agir</PdfSectionTitle>
        <View style={pdfStyles.row}>
          <View style={pdfStyles.col2}>
            <PdfBodySchema slug={evidence.slug} width={200} height={140} />
          </View>
          <View style={pdfStyles.col2Last}>
            <PdfExerciseSchema slug={evidence.slug} width={200} height={90} />
            
            {/* Conseils pratiques */}
            <View style={[pdfStyles.box, { marginTop: 10 }]}>
              <Text style={{ fontSize: 9, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 6 }}>
                💡 Conseils pratiques
              </Text>
              {meta.tips.slice(0, 4).map((tip, idx) => (
                <View key={idx} style={pdfStyles.listItemSmall}>
                  <Text style={pdfStyles.bulletSmall}>•</Text>
                  <Text style={pdfStyles.listTextSmall}>{tip}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <PdfFooter pageNumber={1} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 2 : Recommandations complètes */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{meta.title} — Recommandations</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={pdfStyles.brandName}>COOLANCE</Text>
          </View>
        </View>

        <PdfSectionTitle icon="✅">Recommandations basées sur les preuves</PdfSectionTitle>
        
        {/* Légende niveaux de preuve */}
        <View style={{ flexDirection: 'row', marginBottom: 12, gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: PDF_COLORS.secondary, marginRight: 4 }} />
            <Text style={{ fontSize: 7, color: PDF_COLORS.textMuted }}>Élevé (preuve forte)</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: PDF_COLORS.accent, marginRight: 4 }} />
            <Text style={{ fontSize: 7, color: PDF_COLORS.textMuted }}>Modéré (bonne pratique)</Text>
          </View>
        </View>

        <PdfRecommendations recommendations={evidence.recommendations} />

        <PdfFooter pageNumber={2} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 3 : Red flags + Mise en pratique */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{meta.title} — Signaux d'alerte</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={pdfStyles.brandName}>COOLANCE</Text>
          </View>
        </View>

        {/* Red Flags */}
        <PdfSectionTitle icon="🚨">Quand consulter rapidement</PdfSectionTitle>
        <PdfRedFlags alerts={evidence.red_flags} />

        {/* Mise en pratique */}
        <PdfSectionTitle icon="📋">Votre plan d'action</PdfSectionTitle>
        <View style={pdfStyles.boxSecondary}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: PDF_COLORS.secondary, marginBottom: 8 }}>
            Cette semaine, je m'engage à :
          </Text>
          
          <View style={pdfStyles.listItem}>
            <View style={pdfStyles.checkbox} />
            <Text style={pdfStyles.listText}>
              {evidence.recommendations[0]?.text.split(':')[0] || "Suivre la première recommandation"}
            </Text>
          </View>
          
          <View style={pdfStyles.listItem}>
            <View style={pdfStyles.checkbox} />
            <Text style={pdfStyles.listText}>
              Bouger au moins 10 minutes chaque jour
            </Text>
          </View>
          
          <View style={pdfStyles.listItem}>
            <View style={pdfStyles.checkbox} />
            <Text style={pdfStyles.listText}>
              Noter mes progrès dans un carnet
            </Text>
          </View>
        </View>

        {/* Progression */}
        <View style={[pdfStyles.box, { marginTop: 12 }]}>
          <Text style={{ fontSize: 10, fontWeight: 600, color: PDF_COLORS.primary, marginBottom: 8 }}>
            📈 Suivi hebdomadaire
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, idx) => (
              <View key={idx} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted, marginBottom: 4 }}>{day}</Text>
                <View style={{ 
                  width: 24, 
                  height: 24, 
                  borderRadius: 12, 
                  borderWidth: 1, 
                  borderColor: PDF_COLORS.border 
                }} />
              </View>
            ))}
          </View>
          <Text style={{ fontSize: 7, color: PDF_COLORS.textMuted, marginTop: 8, textAlign: 'center' }}>
            Cochez chaque jour où vous avez suivi vos recommandations
          </Text>
        </View>

        <PdfFooter pageNumber={3} totalPages={4} />
      </Page>

      {/* ============================================ */}
      {/* PAGE 4 : Sources + Conclusion */}
      {/* ============================================ */}
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.titleSmall}>{meta.title} — Sources & références</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={pdfStyles.brandName}>COOLANCE</Text>
          </View>
        </View>

        {/* Sources détaillées */}
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
            ℹ️ Note méthodologique
          </Text>
          <Text style={{ fontSize: 8, color: PDF_COLORS.text, lineHeight: 1.4 }}>
            Les recommandations de ce document sont extraites de guidelines internationaux et de revues systématiques de haute qualité. Chaque recommandation est accompagnée de son niveau de preuve : "Élevé" indique des preuves solides issues d'essais contrôlés randomisés, "Modéré" correspond à des preuves de bonne qualité ou à un consensus d'experts.
          </Text>
        </View>

        {/* Message final */}
        <View style={{ marginTop: 20, padding: 16, backgroundColor: PDF_COLORS.primaryLight, borderRadius: 8, alignItems: 'center' }}>
          <Text style={{ fontSize: 12, fontWeight: 700, color: PDF_COLORS.primary, textAlign: 'center' }}>
            Des plans simples, pour reprendre la main sur votre santé.
          </Text>
          <Text style={{ fontSize: 9, color: PDF_COLORS.textMuted, marginTop: 6 }}>
            coolance.fr — par le Dr Audric Bugnard, médecin thermaliste
          </Text>
        </View>

        {/* Date de mise à jour */}
        <View style={{ marginTop: 16, alignItems: 'center' }}>
          <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted }}>
            Document mis à jour : {currentDate}
          </Text>
        </View>

        <PdfFooter pageNumber={4} totalPages={4} />
      </Page>
    </Document>
  );
};

export default PdfEvidence4Pages;
