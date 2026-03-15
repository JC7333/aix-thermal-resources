// ============================================
// PDF 4 PAGES — GUIDE COMPLET PREMIUM ÉTUVE S30A
// ============================================
// Page 1 : Comprendre (résumé + ce qui se passe + saviez-vous)
// Page 2 : Agir (exercices + plan 7 jours)
// Page 3 : Habitudes + programme 8 semaines + saviez-vous
// Page 4 : Alertes + Sources + QR code
// STRICTEMENT 4 pages — pas de page 5
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
import { PDF_COLORS, PDF_FONT_FAMILY } from "./PdfStyles";
import { PdfBodySchema } from "./PdfEvidenceComponents";
import { ExerciseDiagramsByLevel } from "./diagrams/ExerciseDiagramsLevels";
import { getDiagramsBySlug } from "./diagrams/DiagramsMapping";
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
// STYLES PARTAGÉS (indépendants de l'accent)
// ============================================
const s = StyleSheet.create({
  page: {
    fontFamily: PDF_FONT_FAMILY,
    fontSize: 10,
    color: PDF_COLORS.text,
    backgroundColor: "#ffffff",
    padding: 0,
  },
  accentBar: {
    height: 5,
    width: "100%",
  },
  content: {
    padding: 28,
    paddingBottom: 52,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: PDF_COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: PDF_COLORS.text,
  },
  headerSub: {
    fontSize: 9,
    color: PDF_COLORS.textMuted,
    marginTop: 2,
  },
  brand: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 1,
  },
  // Section titles
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    marginTop: 14,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 6,
  },
  // Boxes
  boxPrimary: {
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  boxNeutral: {
    backgroundColor: PDF_COLORS.muted,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  boxGreen: {
    backgroundColor: "#e8f5ef",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: PDF_COLORS.secondary,
  },
  boxDanger: {
    backgroundColor: "#fce8ea",
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: PDF_COLORS.danger,
  },
  boxAccentYellow: {
    backgroundColor: "#fdf6e9",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#d4a24c",
  },
  // Two columns
  twoCol: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col48: {
    width: "48%",
  },
  // Bullets
  bulletRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bulletDot: {
    width: 14,
    fontSize: 10,
    color: PDF_COLORS.primary,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
    color: PDF_COLORS.text,
  },
  // Day plan
  dayCard: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    padding: 7,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: PDF_COLORS.border,
  },
  dayLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    marginBottom: 2,
  },
  dayAction: {
    fontSize: 8,
    color: PDF_COLORS.text,
    lineHeight: 1.3,
  },
  // Week program
  weekRow: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  weekLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: PDF_COLORS.primary,
  },
  weekFocus: {
    fontSize: 8,
    fontWeight: 600,
    color: "#d4a24c",
  },
  weekExercise: {
    fontSize: 8,
    color: PDF_COLORS.text,
    paddingLeft: 8,
    marginBottom: 1,
  },
  // Habits
  checkRow: {
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderColor: PDF_COLORS.primary,
    borderRadius: 2,
    marginRight: 8,
    marginTop: 1,
  },
  checkText: {
    flex: 1,
    fontSize: 9,
    color: PDF_COLORS.text,
    lineHeight: 1.35,
  },
  // Red flags
  alertRow: {
    flexDirection: "row",
    marginBottom: 7,
  },
  alertBullet: {
    width: 16,
    fontSize: 11,
    color: PDF_COLORS.danger,
    fontWeight: 700,
  },
  alertText: {
    flex: 1,
    fontSize: 10,
    color: PDF_COLORS.danger,
    lineHeight: 1.4,
  },
  // Sources
  sourceItem: {
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.border,
  },
  sourceTitle: {
    fontSize: 9,
    fontWeight: 600,
    color: PDF_COLORS.text,
    marginBottom: 2,
  },
  sourceOrg: {
    fontSize: 8,
    color: PDF_COLORS.textMuted,
  },
  sourceUrl: {
    fontSize: 7,
    color: PDF_COLORS.primary,
    marginTop: 1,
  },
  // Footer absolute
  footer: {
    position: "absolute",
    bottom: 16,
    left: 28,
    right: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: PDF_COLORS.border,
  },
  footerText: {
    fontSize: 7,
    color: PDF_COLORS.textMuted,
  },
  footerPage: {
    fontSize: 8,
    fontWeight: 700,
    color: PDF_COLORS.primary,
  },
  // Paragraph text
  para: {
    fontSize: 10,
    lineHeight: 1.5,
    color: PDF_COLORS.text,
    marginBottom: 6,
  },
  paraSmall: {
    fontSize: 9,
    lineHeight: 1.4,
    color: PDF_COLORS.text,
    marginBottom: 4,
  },
  // QR code
  qrRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    padding: 10,
    backgroundColor: PDF_COLORS.muted,
    borderRadius: 6,
  },
  qrImage: {
    width: 55,
    height: 55,
    marginRight: 12,
  },
  qrInfo: {
    flex: 1,
  },
  qrTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: PDF_COLORS.text,
    marginBottom: 3,
  },
  qrUrl: {
    fontSize: 8,
    color: PDF_COLORS.primary,
    marginBottom: 3,
  },
  qrDisclaimer: {
    fontSize: 7,
    color: PDF_COLORS.textMuted,
    lineHeight: 1.3,
  },
});

// ============================================
// HABITUDES PAR PATHOLOGIE (contenu S30A)
// ============================================
type HabitCategory = { title: string; items: string[] };
const habitsByPathology: Record<string, HabitCategory[]> = {
  arthrose: [
    {
      title: "Mouvement",
      items: [
        "Se lever toutes les 30-45 min est plus important que 1h de sport puis 8h assis.",
        "Alterner assis, debout et marche tout au long de la journée.",
        "La marche quotidienne, même 10 min, nourrit le cartilage.",
      ],
    },
    {
      title: "Poids",
      items: [
        "Chaque kilo perdu enlève 4 kg de contrainte sur le genou à chaque pas.",
        "Objectif réaliste : -5% du poids en 6 mois (-250 kcal/jour suffit).",
      ],
    },
    {
      title: "Chaleur & Froid",
      items: [
        "Chaleur le matin (douche chaude, bouillotte 10 min) pour déverrouiller les raideurs.",
        "Froid après effort (poche de glace enveloppée 15 min) pour réduire l'inflammation.",
      ],
    },
  ],
  "lombalgie-chronique": [
    {
      title: "Activité",
      items: [
        "Le repos est le PIRE traitement du mal de dos chronique. Restez actif.",
        "La douleur n'est PAS le signe d'un dommage — c'est un signal d'alarme déréglé.",
        "Objectif : plus d'activité malgré la douleur, pas zéro douleur.",
      ],
    },
    {
      title: "Posture",
      items: [
        "Il n'existe pas de « mauvaise posture » qui cause la lombalgie chronique.",
        "La meilleure posture est la prochaine — bougez toutes les 30 min.",
      ],
    },
    {
      title: "Sommeil",
      items: [
        "Oreiller entre les genoux en position latérale.",
        "Matelas ferme mais pas dur, heure de coucher régulière.",
        "Améliorer le sommeil contribue significativement à réduire la douleur.",
      ],
    },
  ],
  "insuffisance-veineuse-chronique": [
    {
      title: "Compression",
      items: [
        "Bas de compression dès le matin, retirer le soir au coucher.",
        "Renouveler tous les 6 mois.",
      ],
    },
    {
      title: "Mouvement",
      items: [
        "Marche 30 min/jour minimum.",
        "Évitez de rester debout immobile.",
        "Exercices mollets au bureau.",
      ],
    },
    {
      title: "Élévation",
      items: [
        "Jambes surélevées 15 min le soir.",
        "Coussin sous les pieds au lit.",
        "Douche fraîche sur les jambes.",
      ],
    },
  ],
  bpco: [
    {
      title: "Tabac",
      items: [
        "Arrêt du tabac = action n°1.",
        "Aide disponible (patch, suivi médical).",
        "Gain immédiat sur les symptômes dès les premiers jours.",
      ],
    },
    {
      title: "Respiration",
      items: [
        "Lèvres pincées pour mieux expirer (inspirer par le nez, expirer lentement par la bouche).",
        "Prendre son temps, ne pas se presser.",
      ],
    },
    {
      title: "Activité",
      items: [
        "Marche fractionnée : 2 min + 1 min de repos × 5.",
        "Réhabilitation respiratoire recommandée.",
        "Renforcement doux des bras.",
      ],
    },
  ],
  "otites-a-repetition-enfant": [
    {
      title: "Hygiène",
      items: [
        "Lavage de nez au sérum physiologique matin et soir.",
        "Lavage des mains 4x/jour.",
        "Jouets nettoyés régulièrement.",
      ],
    },
    {
      title: "Environnement",
      items: [
        "Zéro tabagisme passif.",
        "Aérer la maison 2x/jour.",
        "Éviter les lieux enfumés.",
      ],
    },
    {
      title: "Alimentation",
      items: [
        "Allaitement protecteur si possible.",
        "Biberon en position semi-assise.",
        "Éviter la crèche si possible avant 1 an.",
      ],
    },
  ],
};

const getHabits = (slug: string): HabitCategory[] =>
  habitsByPathology[slug] ?? [
    {
      title: "Activité",
      items: ["Rester actif au quotidien.", "Adapter l'intensité à votre état."],
    },
    {
      title: "Mode de vie",
      items: ["Sommeil régulier.", "Alimentation équilibrée."],
    },
    {
      title: "Suivi",
      items: ["Consulter votre médecin régulièrement.", "Tenir un journal des symptômes."],
    },
  ];

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
interface PdfEvidence4PagesProps {
  evidence: EvidenceData;
  qrCodeUrl?: string;
}

export const PdfEvidence4Pages: React.FC<PdfEvidence4PagesProps> = ({
  evidence,
  qrCodeUrl,
}) => {
  const accent = getAccentColor(evidence.slug);
  const accentLight = accent + "15";

  // Plans
  const plan7J0 = evidence.sevenDayPlans?.find((p) => p.level === 0);
  const plan7J1 = evidence.sevenDayPlans?.find((p) => p.level === 1);
  const prog8S0 = evidence.eightWeekPrograms?.find((p) => p.level === 0);
  const prog8S1 = evidence.eightWeekPrograms?.find((p) => p.level === 1);

  // Habitudes
  const habits = getHabits(evidence.slug);

  // "En 2 minutes" bullets depuis summary
  const summaryBullets = evidence.summary
    .split("\n")
    .filter((l) => l.trim())
    .slice(0, 4);

  // Parcours slug pour QR
  const slugMap: Record<string, string> = {
    arthrose: "gonarthrose",
    "insuffisance-veineuse-chronique": "insuffisance-veineuse",
    "otites-a-repetition-enfant": "otites-repetition-enfant",
  };
  const parcoursSlug = slugMap[evidence.slug] ?? evidence.slug;

  // Shared accent-colored elements style builder
  const accentStyle = (extra?: object) => ({
    backgroundColor: accentLight,
    borderLeftColor: accent,
    ...extra,
  });

  return (
    <Document>
      {/* ================================================ */}
      {/* PAGE 1 — COMPRENDRE */}
      {/* ================================================ */}
      <Page size="A4" style={s.page}>
        <View style={[s.accentBar, { backgroundColor: accent }]} />
        <View style={s.content}>

          {/* Header */}
          <View style={s.header}>
            <View>
              <Text style={s.headerTitle}>{evidence.name}</Text>
              <Text style={s.headerSub}>
                Guide complet • Basé sur les preuves scientifiques
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[s.brand, { color: accent }]}>ÉTUVE</Text>
              <Text style={{ fontSize: 8, color: PDF_COLORS.textMuted }}>
                Dr Audric Bugnard
              </Text>
            </View>
          </View>

          {/* En 2 minutes */}
          <Text style={[s.sectionTitle, { color: accent }]}>En 2 minutes</Text>
          <View style={[s.boxPrimary, accentStyle()]}>
            {summaryBullets.map((bullet, idx) => (
              <View key={idx} style={s.bulletRow}>
                <Text style={[s.bulletDot, { color: accent }]}>•</Text>
                <Text style={s.bulletText}>{bullet.trim()}</Text>
              </View>
            ))}
          </View>

          {/* Ce qui se passe */}
          <Text style={[s.sectionTitle, { color: accent }]}>
            Ce qui se passe dans votre corps
          </Text>
          {evidence.bodyExplanation ? (
            // Texte explicatif (nouveau contenu arthrose/lombalgie)
            <View style={s.boxNeutral}>
              {evidence.bodyExplanation
                .split("\n")
                .filter((l) => l.trim())
                .map((para, idx) => (
                  <Text key={idx} style={s.para}>
                    {para.trim()}
                  </Text>
                ))}
            </View>
          ) : (
            // Fallback : schéma SVG + "Ce qui aide vraiment"
            <View style={s.twoCol}>
              <View style={s.col48}>
                <PdfBodySchema slug={evidence.slug} width={220} height={155} />
              </View>
              <View style={s.col48}>
                <View style={s.boxNeutral}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: PDF_COLORS.primary,
                      marginBottom: 8,
                    }}
                  >
                    Ce qui aide vraiment
                  </Text>
                  {evidence.recommendations.slice(0, 4).map((rec, idx) => (
                    <View key={idx} style={s.bulletRow}>
                      <Text
                        style={{
                          width: 18,
                          fontSize: 9,
                          fontWeight: 700,
                          color: PDF_COLORS.secondary,
                        }}
                      >
                        {idx + 1}.
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: 9,
                          color: PDF_COLORS.text,
                          lineHeight: 1.35,
                        }}
                      >
                        {rec.text}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Le saviez-vous ? (si disponible) */}
          {evidence.didYouKnow?.[0] && (
            <View style={s.boxAccentYellow}>
              <Text
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: "#d4a24c",
                  marginBottom: 4,
                }}
              >
                Le saviez-vous ?
              </Text>
              <Text style={s.paraSmall}>{evidence.didYouKnow[0]}</Text>
            </View>
          )}

        </View>

        {/* Footer absolu */}
        <View style={s.footer}>
          <Text style={s.footerText}>
            Information éducative — ne remplace pas un avis médical
          </Text>
          <Text style={s.footerPage}>1 / 4</Text>
        </View>
      </Page>

      {/* ================================================ */}
      {/* PAGE 2 — AGIR (exercices + plans 7 jours) */}
      {/* ================================================ */}
      <Page size="A4" style={s.page}>
        <View style={[s.accentBar, { backgroundColor: accent }]} />
        <View style={s.content}>

          <View style={s.header}>
            <Text style={[s.headerTitle, { fontSize: 16 }]}>
              Exercices & Progression
            </Text>
            <Text style={[s.brand, { color: accent }]}>ÉTUVE</Text>
          </View>

          {/* Schémas d'exercices */}
          <Text style={[s.sectionTitle, { color: accent }]}>
            Exercices adaptés — 3 niveaux au choix
          </Text>
          {(() => {
            const diagramInfo = getDiagramsBySlug(evidence.slug);
            if (!diagramInfo) return null;
            const L0 =
              ExerciseDiagramsByLevel[
                diagramInfo.exerciseLevels
                  .level0 as keyof typeof ExerciseDiagramsByLevel
              ];
            const L1 =
              ExerciseDiagramsByLevel[
                diagramInfo.exerciseLevels
                  .level1 as keyof typeof ExerciseDiagramsByLevel
              ];
            const L2 =
              ExerciseDiagramsByLevel[
                diagramInfo.exerciseLevels
                  .level2 as keyof typeof ExerciseDiagramsByLevel
              ];
            return (
              <View style={{ marginBottom: 8 }}>
                {L0 && (
                  <View
                    style={{
                      alignItems: "center",
                      padding: 2,
                      backgroundColor: "#e8f5ef",
                      borderRadius: 4,
                      marginBottom: 2,
                    }}
                  >
                    <L0 width={340} height={44} />
                  </View>
                )}
                {L1 && (
                  <View
                    style={{
                      alignItems: "center",
                      padding: 2,
                      backgroundColor: accentLight,
                      borderRadius: 4,
                      marginBottom: 2,
                    }}
                  >
                    <L1 width={340} height={44} />
                  </View>
                )}
                {L2 && (
                  <View
                    style={{
                      alignItems: "center",
                      padding: 2,
                      backgroundColor: "#fdf6e9",
                      borderRadius: 4,
                    }}
                  >
                    <L2 width={340} height={44} />
                  </View>
                )}
              </View>
            );
          })()}

          {/* Plans 7 jours */}
          <Text style={[s.sectionTitle, { color: accent }]}>
            Plan 7 jours
          </Text>
          <View style={s.twoCol}>
            <View style={s.col48}>
              {plan7J0 && (
                <View style={s.boxGreen}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: PDF_COLORS.secondary,
                      marginBottom: 7,
                    }}
                  >
                    {plan7J0.levelName}
                  </Text>
                  {plan7J0.days.slice(0, 5).map((day, idx) => (
                    <View key={idx} style={s.dayCard}>
                      <Text style={s.dayLabel}>{day.day}</Text>
                      {day.actions.slice(0, 2).map((action, aIdx) => (
                        <Text key={aIdx} style={s.dayAction}>
                          • {action}
                        </Text>
                      ))}
                    </View>
                  ))}
                  <Text
                    style={{
                      fontSize: 7,
                      color: PDF_COLORS.textMuted,
                      fontStyle: "italic",
                      marginTop: 3,
                    }}
                  >
                    + Jours 6-7 : progression similaire
                  </Text>
                </View>
              )}
            </View>
            <View style={s.col48}>
              {plan7J1 && (
                <View style={s.boxNeutral}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: accent,
                      marginBottom: 7,
                    }}
                  >
                    {plan7J1.levelName}
                  </Text>
                  {plan7J1.days.slice(0, 5).map((day, idx) => (
                    <View key={idx} style={s.dayCard}>
                      <Text style={s.dayLabel}>{day.day}</Text>
                      {day.actions.slice(0, 2).map((action, aIdx) => (
                        <Text key={aIdx} style={s.dayAction}>
                          • {action}
                        </Text>
                      ))}
                    </View>
                  ))}
                  <Text
                    style={{
                      fontSize: 7,
                      color: PDF_COLORS.textMuted,
                      fontStyle: "italic",
                      marginTop: 3,
                    }}
                  >
                    + Jours 6-7 : progression similaire
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Conseil */}
          <View
            style={{
              marginTop: 6,
              padding: 9,
              backgroundColor: "#fdf6e9",
              borderRadius: 5,
              borderLeftWidth: 3,
              borderLeftColor: "#d4a24c",
            }}
          >
            <Text
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: "#d4a24c",
                textAlign: "center",
              }}
            >
              Commencez par "Très facile". Même 5 minutes par jour, c'est un
              grand pas !
            </Text>
          </View>

        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>
            Information éducative — ne remplace pas un avis médical
          </Text>
          <Text style={s.footerPage}>2 / 4</Text>
        </View>
      </Page>

      {/* ================================================ */}
      {/* PAGE 3 — HABITUDES + PROGRAMME 8 SEMAINES */}
      {/* ================================================ */}
      <Page size="A4" style={s.page}>
        <View style={[s.accentBar, { backgroundColor: accent }]} />
        <View style={s.content}>

          <View style={s.header}>
            <Text style={[s.headerTitle, { fontSize: 16 }]}>
              Habitudes du quotidien
            </Text>
            <Text style={[s.brand, { color: accent }]}>ÉTUVE</Text>
          </View>

          {/* 3 colonnes habitudes */}
          <Text style={[s.sectionTitle, { color: accent }]}>
            3 habitudes clés
          </Text>
          <View style={s.twoCol}>
            <View style={s.col48}>
              {habits.slice(0, 2).map((cat, idx) => (
                <View key={idx} style={[s.boxNeutral, { marginBottom: 10 }]}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: accent,
                      marginBottom: 7,
                    }}
                  >
                    {cat.title}
                  </Text>
                  {cat.items.map((item, iIdx) => (
                    <View key={iIdx} style={s.checkRow}>
                      <View style={[s.checkbox, { borderColor: accent }]} />
                      <Text style={s.checkText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
            <View style={s.col48}>
              {habits.slice(2, 3).map((cat, idx) => (
                <View key={idx} style={[s.boxNeutral, { marginBottom: 10 }]}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: accent,
                      marginBottom: 7,
                    }}
                  >
                    {cat.title}
                  </Text>
                  {cat.items.map((item, iIdx) => (
                    <View key={iIdx} style={s.checkRow}>
                      <View style={[s.checkbox, { borderColor: accent }]} />
                      <Text style={s.checkText}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}

              {/* Le saviez-vous #2 */}
              {evidence.didYouKnow?.[1] && (
                <View style={s.boxAccentYellow}>
                  <Text
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: "#d4a24c",
                      marginBottom: 3,
                    }}
                  >
                    Le saviez-vous ?
                  </Text>
                  <Text style={{ fontSize: 8, lineHeight: 1.35, color: PDF_COLORS.text }}>
                    {evidence.didYouKnow[1]}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Programme 8 semaines */}
          <Text style={[s.sectionTitle, { color: accent }]}>
            Programme 8 semaines
          </Text>
          <View style={s.twoCol}>
            <View style={s.col48}>
              {prog8S0 && (
                <View style={s.boxGreen}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: PDF_COLORS.secondary,
                      marginBottom: 6,
                    }}
                  >
                    {prog8S0.levelName}
                  </Text>
                  {prog8S0.weeks.slice(0, 4).map((week, idx) => (
                    <View key={idx} style={s.weekRow}>
                      <View style={s.weekHeader}>
                        <Text style={s.weekLabel}>{week.week}</Text>
                        <Text style={s.weekFocus}>{week.focus}</Text>
                      </View>
                      {week.exercises.slice(0, 2).map((ex, eIdx) => (
                        <Text key={eIdx} style={s.weekExercise}>
                          • {ex}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View style={s.col48}>
              {prog8S1 && (
                <View style={s.boxNeutral}>
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: accent,
                      marginBottom: 6,
                    }}
                  >
                    {prog8S1.levelName}
                  </Text>
                  {prog8S1.weeks.slice(0, 4).map((week, idx) => (
                    <View key={idx} style={s.weekRow}>
                      <View style={s.weekHeader}>
                        <Text style={s.weekLabel}>{week.week}</Text>
                        <Text style={s.weekFocus}>{week.focus}</Text>
                      </View>
                      {week.exercises.slice(0, 2).map((ex, eIdx) => (
                        <Text key={eIdx} style={s.weekExercise}>
                          • {ex}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Grille de la semaine */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
              padding: 8,
              backgroundColor: PDF_COLORS.muted,
              borderRadius: 5,
            }}
          >
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
              (day, idx) => (
                <View key={idx} style={{ alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 8,
                      color: PDF_COLORS.textMuted,
                      marginBottom: 3,
                    }}
                  >
                    {day}
                  </Text>
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 4,
                      borderWidth: 1.5,
                      borderColor: PDF_COLORS.border,
                      backgroundColor: "#ffffff",
                    }}
                  />
                </View>
              ),
            )}
          </View>

        </View>

        <View style={s.footer}>
          <Text style={s.footerText}>
            Information éducative — ne remplace pas un avis médical
          </Text>
          <Text style={s.footerPage}>3 / 4</Text>
        </View>
      </Page>

      {/* ================================================ */}
      {/* PAGE 4 — ALERTES + SOURCES + QR */}
      {/* STRICTEMENT 1 page — pas de finalBox overflow */}
      {/* ================================================ */}
      <Page size="A4" style={s.page}>
        <View style={[s.accentBar, { backgroundColor: accent }]} />
        <View style={s.content}>

          <View style={s.header}>
            <Text style={[s.headerTitle, { fontSize: 16 }]}>
              Alertes & Sources
            </Text>
            <Text style={[s.brand, { color: accent }]}>ÉTUVE</Text>
          </View>

          {/* Red Flags */}
          <Text
            style={[
              s.sectionTitle,
              { color: PDF_COLORS.danger, marginTop: 6 },
            ]}
          >
            Consultez rapidement si...
          </Text>
          <View style={s.boxDanger}>
            {evidence.red_flags.map((flag, idx) => (
              <View key={idx} style={s.alertRow}>
                <Text style={s.alertBullet}>!</Text>
                <Text style={s.alertText}>{flag}</Text>
              </View>
            ))}
            <View
              style={{
                marginTop: 8,
                paddingTop: 8,
                borderTopWidth: 1,
                borderTopColor: PDF_COLORS.danger + "40",
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: PDF_COLORS.danger,
                  textAlign: "center",
                }}
              >
                En cas d'urgence : 15 ou 112
              </Text>
            </View>
          </View>

          {/* Sources */}
          <Text style={[s.sectionTitle, { color: accent, marginTop: 10 }]}>
            Sources scientifiques
          </Text>
          <View style={s.twoCol}>
            <View style={{ width: "65%" }}>
              <View style={s.boxNeutral}>
                {evidence.sources.slice(0, 6).map((src, idx) => (
                  <View key={idx} style={s.sourceItem}>
                    <Text style={s.sourceTitle}>
                      {idx + 1}. {src.title}
                    </Text>
                    <Text style={s.sourceOrg}>
                      {src.org}, {src.year}
                    </Text>
                    {src.url && (
                      <Text style={s.sourceUrl}>{src.url}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* QR code + info */}
            <View style={{ width: "32%" }}>
              {qrCodeUrl ? (
                <View
                  style={{
                    backgroundColor: PDF_COLORS.muted,
                    borderRadius: 6,
                    padding: 10,
                    alignItems: "center",
                  }}
                >
                  <Image src={qrCodeUrl} style={s.qrImage} />
                  <Text
                    style={{
                      fontSize: 7,
                      fontWeight: 700,
                      color: PDF_COLORS.text,
                      textAlign: "center",
                      marginTop: 6,
                      marginBottom: 4,
                    }}
                  >
                    Continuez en ligne
                  </Text>
                  <Text
                    style={{
                      fontSize: 7,
                      color: accent,
                      textAlign: "center",
                      marginBottom: 6,
                    }}
                  >
                    etuve.fr/parcours/{parcoursSlug}
                  </Text>
                  <Text
                    style={{
                      fontSize: 6,
                      color: PDF_COLORS.textMuted,
                      textAlign: "center",
                      lineHeight: 1.3,
                    }}
                  >
                    Parcours interactif gratuit : exercices guidés, suivi de la
                    douleur, rappels quotidiens.
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: PDF_COLORS.muted,
                    borderRadius: 6,
                    padding: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 8, fontWeight: 700, color: accent, marginBottom: 4 }}
                  >
                    Continuez en ligne
                  </Text>
                  <Text
                    style={{ fontSize: 8, color: accent }}
                  >
                    etuve.fr/parcours/{parcoursSlug}
                  </Text>
                </View>
              )}

              {/* Note méthodologique */}
              <View
                style={{
                  marginTop: 8,
                  padding: 8,
                  backgroundColor: "#fdf6e9",
                  borderRadius: 5,
                  borderLeftWidth: 3,
                  borderLeftColor: "#d4a24c",
                }}
              >
                <Text
                  style={{ fontSize: 7, fontWeight: 700, color: "#d4a24c", marginBottom: 3 }}
                >
                  Niveaux de preuve
                </Text>
                <Text style={{ fontSize: 6.5, color: PDF_COLORS.text, lineHeight: 1.35 }}>
                  "Élevé" = recommandation forte. "Modéré" = bonne pratique.
                  Parlez-en à votre médecin.
                </Text>
              </View>
            </View>
          </View>

        </View>

        {/* Footer avec date et disclaimer */}
        <View style={s.footer}>
          <Text style={s.footerText}>
            etuve.fr • Dr Audric Bugnard • {evidence.lastUpdated} — Information éducative
          </Text>
          <Text style={s.footerPage}>4 / 4</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfEvidence4Pages;
