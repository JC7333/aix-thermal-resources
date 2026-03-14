import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
  },
  header: { marginBottom: 20 },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a7a8c",
    marginBottom: 4,
  },
  subtitle: { fontSize: 12, color: "#666", marginBottom: 16 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1a7a8c",
    marginBottom: 8,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingVertical: 4,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#1a7a8c",
    paddingVertical: 4,
    marginBottom: 2,
  },
  cell: { width: "10%", textAlign: "center", fontSize: 8 },
  cellLeft: { width: "20%", textAlign: "left", fontSize: 8 },
  cellHeader: {
    width: "10%",
    textAlign: "center",
    fontSize: 7,
    fontWeight: "bold",
    color: "#666",
  },
  cellHeaderLeft: {
    width: "20%",
    textAlign: "left",
    fontSize: 7,
    fontWeight: "bold",
    color: "#666",
  },
  kpiRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  kpiBox: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 4,
    alignItems: "center",
  },
  kpiValue: { fontSize: 18, fontWeight: "bold", color: "#1a7a8c" },
  kpiLabel: { fontSize: 7, color: "#666", marginTop: 2, textAlign: "center" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 7,
    color: "#999",
    textAlign: "center",
  },
  improvement: { color: "#16a34a", fontWeight: "bold" },
});

interface ArsReportProps {
  totalParcours: number;
  totalCompleted: number;
  totalCompletedT2: number;
  totalCompletedT3: number;
  completionRate: number;
  followUpRateT2: number;
  followUpRateT3: number;
  byPathology: {
    slug: string;
    label: string;
    total: number;
    completed: number;
    completedT2: number;
    completedT3: number;
    avgPainT0: number | null;
    avgPainT1: number | null;
    avgPainT3: number | null;
    avgConfidenceT0: number | null;
    avgConfidenceT1: number | null;
    painImprovement: number | null;
    painImprovementT3: number | null;
  }[];
  exportDate: string;
}

const v = (n: number | null): string => (n !== null ? String(n) : "\u2014");

export const ArsReportPdf = (props: ArsReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>ÉTUVE — Rapport Outcomes ETP</Text>
        <Text style={styles.subtitle}>
          Programme d'éducation thérapeutique numérique — Aix-les-Bains{"\n"}
          Date d'export : {props.exportDate}
        </Text>
      </View>

      <View style={styles.kpiRow}>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiValue}>{props.totalParcours}</Text>
          <Text style={styles.kpiLabel}>Parcours démarrés</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiValue}>{props.totalCompleted}</Text>
          <Text style={styles.kpiLabel}>Bilans T1 (fin cure)</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiValue}>{props.completionRate}%</Text>
          <Text style={styles.kpiLabel}>Taux complétion</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiValue}>{props.followUpRateT2}%</Text>
          <Text style={styles.kpiLabel}>Suivi T2 (M+1)</Text>
        </View>
        <View style={styles.kpiBox}>
          <Text style={styles.kpiValue}>{props.followUpRateT3}%</Text>
          <Text style={styles.kpiLabel}>Suivi T3 (M+3)</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Résultats par pathologie</Text>

      <View style={styles.headerRow}>
        <Text style={styles.cellHeaderLeft}>Pathologie</Text>
        <Text style={styles.cellHeader}>N</Text>
        <Text style={styles.cellHeader}>T1</Text>
        <Text style={styles.cellHeader}>Doul. T0</Text>
        <Text style={styles.cellHeader}>Doul. T1</Text>
        <Text style={styles.cellHeader}>Delta</Text>
        <Text style={styles.cellHeader}>Doul. T3</Text>
        <Text style={styles.cellHeader}>Conf. T0</Text>
        <Text style={styles.cellHeader}>Conf. T1</Text>
      </View>

      {props.byPathology.map((p) => (
        <View key={p.slug} style={styles.row}>
          <Text style={styles.cellLeft}>{p.label}</Text>
          <Text style={styles.cell}>{p.total}</Text>
          <Text style={styles.cell}>{p.completed}</Text>
          <Text style={styles.cell}>{v(p.avgPainT0)}</Text>
          <Text style={styles.cell}>{v(p.avgPainT1)}</Text>
          <Text
            style={[
              styles.cell,
              p.painImprovement && p.painImprovement > 0
                ? styles.improvement
                : {},
            ]}
          >
            {p.painImprovement !== null && p.painImprovement > 0
              ? `-${p.painImprovement}`
              : v(p.painImprovement)}
          </Text>
          <Text style={styles.cell}>{v(p.avgPainT3)}</Text>
          <Text style={styles.cell}>{v(p.avgConfidenceT0)}</Text>
          <Text style={styles.cell}>{v(p.avgConfidenceT1)}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Méthodologie</Text>
      <Text style={{ fontSize: 9, color: "#444", lineHeight: 1.5 }}>
        Données collectées via le programme ÉTUVE (etuve.fr). Parcours de 21
        jours avec bilan éducatif partagé (BEP) initial, check-in quotidien (EVA
        douleur + action), et questionnaires PRO aux temps T0 (début cure), T1
        (fin cure J21), T2 (M+1) et T3 (M+3).{"\n"}
        Instruments : EVA douleur 0-10, score confiance auto-gestion 0-10,
        KOOS-PS 7 items (pathologies rhumatologiques).{"\n"}
        Données anonymisées par token unique. Aucune donnée nominative
        collectée.
      </Text>

      <Text
        style={{
          fontSize: 7,
          color: "#999",
          marginTop: 20,
          textAlign: "center",
        }}
      >
        ÉTUVE — Programme ETP numérique — Dr Audric Bugnard, médecin
        thermaliste, Aix-les-Bains{"\n"}
        Données anonymes — Token pseudonymisé — Rapport généré automatiquement
      </Text>

      <Text style={styles.footer}>etuve.fr — {props.exportDate}</Text>
    </Page>
  </Document>
);
