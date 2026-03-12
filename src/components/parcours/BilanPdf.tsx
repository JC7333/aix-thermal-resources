import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    color: '#1a1a2e',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#1a7a8c',
    borderBottomStyle: 'solid',
    paddingBottom: 15,
  },
  logo: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#1a7a8c',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#1a1a2e',
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#1a7a8c',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },
  scoreRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 2,
    borderBottomColor: '#d1d5db',
    borderBottomStyle: 'solid',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  scoreLabelBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    flex: 1,
  },
  scoreValue: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    width: 60,
    textAlign: 'center',
  },
  scoreValueHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    width: 60,
    textAlign: 'center',
  },
  scoreDiff: {
    fontSize: 11,
    width: 80,
    textAlign: 'right',
  },
  scoreDiffHeader: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    width: 80,
    textAlign: 'right',
  },
  improved: { color: '#059669' },
  worsened: { color: '#dc2626' },
  neutral: { color: '#6b7280' },
  messageBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    borderLeftStyle: 'solid',
  },
  messageText: {
    fontSize: 12,
    color: '#166534',
    lineHeight: 1.5,
  },
  recItem: {
    fontSize: 11,
    color: '#374151',
    marginBottom: 6,
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#9ca3af',
    textAlign: 'center',
  },
  tokenBox: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f0f9ff',
    textAlign: 'center',
  },
  tokenLabel: {
    fontSize: 10,
    color: '#1a7a8c',
    marginBottom: 4,
  },
  tokenValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#1a7a8c',
    letterSpacing: 2,
  },
});

interface BilanPdfProps {
  pathologie: string;
  token: string;
  date: string;
  painT0: number | null;
  painT1: number;
  functionT0: number | null;
  functionT1: number | null;
  confidenceT0: number | null;
  confidenceT1: number;
}

function getDiffInfo(
  t0: number | null,
  t1: number,
  lowerIsBetter: boolean,
): { text: string; isImproved: boolean; isWorsened: boolean } {
  if (t0 === null) return { text: '—', isImproved: false, isWorsened: false };
  const diff = t1 - t0;
  if (diff === 0) return { text: '=', isImproved: false, isWorsened: false };
  const isImproved = lowerIsBetter ? diff < 0 : diff > 0;
  return {
    text: `${diff > 0 ? '+' : ''}${diff}`,
    isImproved,
    isWorsened: !isImproved,
  };
}

export const BilanPdf = ({
  pathologie,
  token,
  date,
  painT0,
  painT1,
  functionT0,
  functionT1,
  confidenceT0,
  confidenceT1,
}: BilanPdfProps) => {
  const painDiff = getDiffInfo(painT0, painT1, true);
  const funcDiff =
    functionT0 !== null && functionT1 !== null
      ? getDiffInfo(functionT0, functionT1, true)
      : null;
  const confDiff = getDiffInfo(confidenceT0, confidenceT1, false);

  const diffStyle = (info: { isImproved: boolean; isWorsened: boolean }) =>
    info.isImproved ? styles.improved : info.isWorsened ? styles.worsened : styles.neutral;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.logo}>ÉTUVE</Text>
          <Text style={styles.subtitle}>Programme ETP — Cure thermale Aix-les-Bains</Text>
        </View>

        <Text style={styles.title}>Bilan de fin de cure — {pathologie}</Text>
        <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 5 }}>Date : {date}</Text>

        <View style={styles.tokenBox}>
          <Text style={styles.tokenLabel}>Votre code personnel</Text>
          <Text style={styles.tokenValue}>{token}</Text>
        </View>

        <Text style={styles.sectionTitle}>Vos résultats</Text>

        <View style={styles.scoreRowHeader}>
          <Text style={styles.scoreLabelBold}>Mesure</Text>
          <Text style={styles.scoreValueHeader}>Début</Text>
          <Text style={styles.scoreValueHeader}>Fin</Text>
          <Text style={styles.scoreDiffHeader}>Évolution</Text>
        </View>

        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Douleur (EVA 0-10)</Text>
          <Text style={styles.scoreValue}>{painT0 !== null ? `${painT0}/10` : '—'}</Text>
          <Text style={styles.scoreValue}>{painT1}/10</Text>
          <Text style={[styles.scoreDiff, diffStyle(painDiff)]}>{painDiff.text}</Text>
        </View>

        {functionT1 !== null && (
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Difficulté fonctionnelle (0-100)</Text>
            <Text style={styles.scoreValue}>{functionT0 !== null ? `${functionT0}/100` : '—'}</Text>
            <Text style={styles.scoreValue}>{functionT1}/100</Text>
            <Text
              style={[
                styles.scoreDiff,
                diffStyle(funcDiff || { isImproved: false, isWorsened: false }),
              ]}
            >
              {funcDiff?.text || '—'}
            </Text>
          </View>
        )}

        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Confiance (0-10)</Text>
          <Text style={styles.scoreValue}>{confidenceT0 !== null ? `${confidenceT0}/10` : '—'}</Text>
          <Text style={styles.scoreValue}>{confidenceT1}/10</Text>
          <Text style={[styles.scoreDiff, diffStyle(confDiff)]}>{confDiff.text}</Text>
        </View>

        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            {painT0 !== null && painT1 < painT0
              ? 'Votre douleur a diminué pendant la cure. Continuez vos exercices pour maintenir ces progrès.'
              : confidenceT0 !== null && confidenceT1 > confidenceT0
                ? "Votre confiance a augmenté. C'est un signe très positif pour la suite."
                : "Chaque parcours est unique. L'important est de continuer vos exercices après la cure."}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Pour maintenir vos bénéfices</Text>
        <Text style={styles.recItem}>• Continuez vos exercices 3 fois par semaine minimum</Text>
        <Text style={styles.recItem}>• Marchez 30 minutes par jour (fractionnée si besoin)</Text>
        <Text style={styles.recItem}>• Étirements après chaque séance d'exercice</Text>
        <Text style={styles.recItem}>• Utilisez votre plan d'action en cas de poussée</Text>

        <Text style={styles.sectionTitle}>Suivi post-cure</Text>
        <Text style={styles.recItem}>
          Dans 1 mois, puis 3 mois, retournez sur etuve.fr/parcours/suivi
        </Text>
        <Text style={styles.recItem}>
          Entrez votre code {token} pour refaire le questionnaire et suivre votre évolution.
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>ÉTUVE — Programme ETP numérique — etuve.fr</Text>
          <Text style={styles.footerText}>
            Information éducative — ne remplace pas un avis médical. Urgence : 15 / 112
          </Text>
          <Text style={styles.footerText}>
            Données anonymes. Aucune information personnelle n'est collectée.
          </Text>
        </View>
      </Page>
    </Document>
  );
};
