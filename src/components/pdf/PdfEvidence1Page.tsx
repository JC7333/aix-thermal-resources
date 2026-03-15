// ============================================
// PDF 1 PAGE — FICHE PREMIUM ÉTUVE S30A
// ============================================
// Design : barre couleur accent, L'essentiel (3 bullets surprenants),
//          Action du jour, Consultez si..., QR code, zéro troncature
// ============================================

import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { PDF_FONT_FAMILY } from "./PdfStyles";
import type { EvidenceData } from "@/data/evidence";

// ============================================
// COULEURS ACCENT PAR GROUPE PATHOLOGIQUE
// ============================================
const ACCENT_COLORS: Record<string, string> = {
  arthrose: "#1a7a8c",
  gonarthrose: "#1a7a8c",
  "lombalgie-chronique": "#1a7a8c",
  coxarthrose: "#1a7a8c",
  "tendinopathie-coiffe": "#1a7a8c",
  "arthrose-digitale": "#1a7a8c",
  bpco: "#2563eb",
  asthme: "#2563eb",
  "insuffisance-veineuse-chronique": "#7c3aed",
  "insuffisance-veineuse": "#7c3aed",
  fibromyalgie: "#db2777",
  "rhinosinusite-chronique": "#ea580c",
  "otites-a-repetition-enfant": "#ea580c",
  "otites-repetition-enfant": "#ea580c",
};

const getAccentColor = (slug: string): string =>
  ACCENT_COLORS[slug] ?? "#1a7a8c";

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
interface PdfEvidence1PageProps {
  evidence: EvidenceData;
  qrCodeUrl?: string;
}

// Map evidence slugs → parcours slugs (même logique que pdfService)
const PARCOURS_SLUG_MAP_1P: Record<string, string> = {
  'arthrose': 'gonarthrose',
  'insuffisance-veineuse-chronique': 'insuffisance-veineuse',
  'otites-a-repetition-enfant': 'otites-repetition-enfant',
};

export const PdfEvidence1Page: React.FC<PdfEvidence1PageProps> = ({
  evidence,
  qrCodeUrl,
}) => {
  const accent = getAccentColor(evidence.slug);
  const accentLight = accent + "18"; // ~10% opacity background
  const parcoursSlug = PARCOURS_SLUG_MAP_1P[evidence.slug] ?? evidence.slug;

  // 3 bullets "L'essentiel"
  // Si essentiels définis → utiliser. Sinon → parser summary en bullets
  const essentiels: { title: string; text: string }[] = evidence.essentiels
    ? evidence.essentiels.slice(0, 3)
    : evidence.summary
        .split("\n")
        .filter((l) => l.trim())
        .slice(0, 3)
        .map((text) => ({ title: "", text: text.trim() }));

  // Action du jour
  const actionDuJour =
    evidence.actionDuJour || evidence.recommendations[0]?.text || "";

  // Red flags (max 3)
  const redFlags = evidence.red_flags.slice(0, 3);

  // Sources courtes (max 3)
  const shortSources = evidence.sources
    .slice(0, 3)
    .map((s) => `${s.org} (${s.year})`)
    .join(" • ");

  // Styles inline pour que l'accent soit dynamique
  const styles = StyleSheet.create({
    page: {
      fontFamily: PDF_FONT_FAMILY,
      fontSize: 9,
      color: "#1a2a3a",
      backgroundColor: "#ffffff",
      padding: 0,
    },
    accentBar: {
      height: 5,
      backgroundColor: accent,
      width: "100%",
    },
    content: {
      padding: 22,
      paddingTop: 14,
    },
    // ---- Header ----
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e5ea",
    },
    pathologyName: {
      fontSize: 20,
      fontWeight: 700,
      color: accent,
    },
    pathologySub: {
      fontSize: 7,
      color: "#5a6a7a",
      marginTop: 2,
    },
    brand: {
      fontSize: 14,
      fontWeight: 700,
      color: accent,
      letterSpacing: 1,
    },
    brandSub: {
      fontSize: 7,
      color: "#5a6a7a",
      marginTop: 1,
      textAlign: "right",
    },
    // ---- Label de section ----
    sectionLabel: {
      fontSize: 8,
      fontWeight: 700,
      color: "#ffffff",
      backgroundColor: accent,
      paddingHorizontal: 7,
      paddingVertical: 3,
      marginBottom: 6,
      borderRadius: 2,
      alignSelf: "flex-start",
    },
    sectionLabelDanger: {
      fontSize: 8,
      fontWeight: 700,
      color: "#ffffff",
      backgroundColor: "#dc3545",
      paddingHorizontal: 7,
      paddingVertical: 3,
      marginBottom: 6,
      borderRadius: 2,
      alignSelf: "flex-start",
    },
    // ---- Box L'essentiel ----
    boxEssentiel: {
      backgroundColor: accentLight,
      borderRadius: 5,
      padding: 11,
      marginBottom: 11,
      borderLeftWidth: 4,
      borderLeftColor: accent,
    },
    bulletRow: {
      flexDirection: "row",
      marginBottom: 7,
    },
    bulletDotWrapper: {
      paddingTop: 2,
      marginRight: 8,
    },
    bulletTitle: {
      fontSize: 9,
      fontWeight: 700,
      color: "#1a2a3a",
      marginBottom: 2,
    },
    bulletText: {
      fontSize: 8,
      lineHeight: 1.45,
      color: "#3a4a5a",
    },
    // ---- Box Action du jour ----
    boxAction: {
      backgroundColor: "#e8f5ef",
      borderRadius: 5,
      padding: 11,
      marginBottom: 11,
      borderWidth: 1.5,
      borderColor: "#3d9970",
    },
    actionLabel: {
      fontSize: 7,
      fontWeight: 700,
      color: "#3d9970",
      marginBottom: 4,
      textTransform: "uppercase",
    },
    actionText: {
      fontSize: 9,
      lineHeight: 1.5,
      color: "#1a2a3a",
    },
    // ---- Box Consultez si ----
    boxDanger: {
      backgroundColor: "#fce8ea",
      borderRadius: 5,
      padding: 11,
      marginBottom: 11,
      borderLeftWidth: 4,
      borderLeftColor: "#dc3545",
    },
    dangerItem: {
      flexDirection: "row",
      marginBottom: 5,
    },
    dangerBullet: {
      width: 12,
      fontSize: 8,
      color: "#dc3545",
      fontWeight: 700,
    },
    dangerText: {
      flex: 1,
      fontSize: 8,
      color: "#dc3545",
      lineHeight: 1.4,
    },
    emergencyText: {
      fontSize: 8,
      fontWeight: 700,
      color: "#dc3545",
      marginTop: 5,
    },
    // ---- Footer ----
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 8,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: "#e0e5ea",
    },
    footerLeft: {
      flex: 1,
      paddingRight: 12,
    },
    sourcesLine: {
      fontSize: 6.5,
      color: "#8a9aaa",
      marginBottom: 3,
    },
    footerInfo: {
      fontSize: 7,
      color: "#5a6a7a",
      marginBottom: 2,
    },
    disclaimer: {
      fontSize: 6,
      color: "#8a9aaa",
      lineHeight: 1.35,
    },
    qrWrapper: {
      alignItems: "center",
    },
    qrImage: {
      width: 58,
      height: 58,
    },
    qrLabel: {
      fontSize: 5.5,
      color: "#8a9aaa",
      textAlign: "center",
      marginTop: 2,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ===== BARRE COULEUR ACCENT (collée au bord physique) ===== */}
        <View style={styles.accentBar} />

        {/* ===== CONTENU ===== */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.pathologyName}>{evidence.name}</Text>
              <Text style={styles.pathologySub}>
                Fiche pratique • Basée sur les preuves scientifiques
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.brand}>ÉTUVE</Text>
              <Text style={styles.brandSub}>Dr Audric Bugnard</Text>
            </View>
          </View>

          {/* L'ESSENTIEL */}
          <Text style={styles.sectionLabel}>L'ESSENTIEL</Text>
          <View style={styles.boxEssentiel}>
            {essentiels.map((item, idx) => (
              <View
                key={idx}
                style={[
                  styles.bulletRow,
                  idx === essentiels.length - 1 ? { marginBottom: 0 } : {},
                ]}
              >
                <View style={styles.bulletDotWrapper}>
                  <View
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 4,
                      backgroundColor: accent,
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  {item.title ? (
                    <Text style={styles.bulletTitle}>{item.title}</Text>
                  ) : null}
                  <Text style={styles.bulletText}>{item.text}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* VOTRE ACTION DU JOUR */}
          <Text style={styles.sectionLabel}>VOTRE ACTION DU JOUR</Text>
          <View style={styles.boxAction}>
            <Text style={styles.actionLabel}>Exercice du jour</Text>
            <Text style={styles.actionText}>{actionDuJour}</Text>
          </View>

          {/* CONSULTEZ SI... */}
          <Text style={styles.sectionLabelDanger}>CONSULTEZ SI...</Text>
          <View style={styles.boxDanger}>
            {redFlags.map((flag, idx) => (
              <View
                key={idx}
                style={[
                  styles.dangerItem,
                  idx === redFlags.length - 1 ? { marginBottom: 0 } : {},
                ]}
              >
                <Text style={styles.dangerBullet}>!</Text>
                <Text style={styles.dangerText}>{flag}</Text>
              </View>
            ))}
            <Text style={styles.emergencyText}>
              En cas d'urgence : 15 ou 112
            </Text>
          </View>

          {/* Footer : sources + QR code */}
          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              <Text style={styles.sourcesLine}>Sources : {shortSources}</Text>
              <Text style={styles.footerInfo}>
                etuve.fr • {evidence.lastUpdated} • Information éducative — ne
                remplace pas un avis médical
              </Text>
              <Text style={styles.disclaimer}>
                Même quelques minutes par jour, c'est un grand pas pour votre
                santé. Ces informations ne constituent pas un conseil médical
                personnalisé. En cas de doute, consultez un professionnel de
                santé.
              </Text>
            </View>
            {qrCodeUrl && (
              <View style={styles.qrWrapper}>
                <Image src={qrCodeUrl} style={styles.qrImage} />
                <Text style={styles.qrLabel}>etuve.fr/parcours/{parcoursSlug}</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfEvidence1Page;
