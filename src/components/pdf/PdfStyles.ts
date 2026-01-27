// ============================================
// DESIGN SYSTEM PDF — COOLANCE
// ============================================
// Styles cohérents pour tous les PDFs générés
// Police lisible seniors, marges confort, couleurs harmonieuses
// ============================================

import { StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts for better rendering
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff2', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff2', fontWeight: 700 },
  ],
});

// ============================================
// COULEURS
// ============================================

export const PDF_COLORS = {
  // Primaires
  primary: '#1a7a8c',        // Bleu thérapeutique
  primaryLight: '#e6f4f6',
  primaryDark: '#145a67',
  
  // Secondaires
  secondary: '#3d9970',      // Vert thérapeutique
  secondaryLight: '#e8f5ef',
  
  // Accents
  accent: '#d4a24c',         // Doré/cuivre
  accentLight: '#fdf6e9',
  
  // Alertes
  danger: '#dc3545',
  dangerLight: '#fce8ea',
  
  // Neutres
  text: '#1a2a3a',
  textMuted: '#5a6a7a',
  background: '#ffffff',
  border: '#e0e5ea',
  muted: '#f5f7f9',
};

// ============================================
// DIMENSIONS
// ============================================

export const PDF_DIMENSIONS = {
  pageWidth: 595.28,   // A4 width in points
  pageHeight: 841.89,  // A4 height in points
  margin: 40,
  marginSmall: 24,
  gutter: 16,
};

// ============================================
// STYLES GLOBAUX
// ============================================

export const pdfStyles = StyleSheet.create({
  // Page layouts
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: PDF_COLORS.text,
    backgroundColor: PDF_COLORS.background,
    padding: PDF_DIMENSIONS.margin,
    paddingBottom: 50,
  },
  
  page1col: {
    fontFamily: 'Inter',
    fontSize: 9,
    color: PDF_COLORS.text,
    backgroundColor: PDF_COLORS.background,
    padding: PDF_DIMENSIONS.marginSmall,
    paddingBottom: 40,
  },

  // Header / Brand
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: PDF_COLORS.primary,
  },

  brandName: {
    fontSize: 18,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    letterSpacing: 1,
  },

  brandSub: {
    fontSize: 8,
    color: PDF_COLORS.textMuted,
    marginTop: 2,
  },

  dateTag: {
    fontSize: 8,
    color: PDF_COLORS.textMuted,
    backgroundColor: PDF_COLORS.muted,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  // Titres
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    marginBottom: 6,
  },

  titleSmall: {
    fontSize: 16,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 11,
    color: PDF_COLORS.textMuted,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    marginTop: 14,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: PDF_COLORS.primaryLight,
  },

  sectionTitleSmall: {
    fontSize: 10,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    marginTop: 10,
    marginBottom: 6,
  },

  // Texte
  paragraph: {
    fontSize: 10,
    lineHeight: 1.5,
    color: PDF_COLORS.text,
    marginBottom: 8,
  },

  paragraphSmall: {
    fontSize: 9,
    lineHeight: 1.4,
    color: PDF_COLORS.text,
    marginBottom: 6,
  },

  textMuted: {
    fontSize: 9,
    color: PDF_COLORS.textMuted,
  },

  // Encadrés
  box: {
    backgroundColor: PDF_COLORS.muted,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },

  boxPrimary: {
    backgroundColor: PDF_COLORS.primaryLight,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: PDF_COLORS.primary,
  },

  boxSecondary: {
    backgroundColor: PDF_COLORS.secondaryLight,
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: PDF_COLORS.secondary,
  },

  boxDanger: {
    backgroundColor: PDF_COLORS.dangerLight,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: PDF_COLORS.danger,
  },

  boxLevel0: {
    backgroundColor: '#e8f5ef',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: PDF_COLORS.secondary,
  },

  level0Title: {
    fontSize: 11,
    fontWeight: 700,
    color: PDF_COLORS.secondary,
    marginBottom: 6,
  },

  // Listes
  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 4,
  },

  listItemSmall: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingLeft: 2,
  },

  bullet: {
    width: 14,
    fontSize: 10,
    color: PDF_COLORS.primary,
  },

  bulletSmall: {
    width: 12,
    fontSize: 8,
    color: PDF_COLORS.primary,
  },

  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: PDF_COLORS.textMuted,
    borderRadius: 2,
    marginRight: 8,
    marginTop: 2,
  },

  listText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
    color: PDF_COLORS.text,
  },

  listTextSmall: {
    flex: 1,
    fontSize: 8,
    lineHeight: 1.3,
    color: PDF_COLORS.text,
  },

  // Grille
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  col2: {
    width: '48%',
    marginRight: '4%',
  },

  col2Last: {
    width: '48%',
  },

  col3: {
    width: '31%',
    marginRight: '3.5%',
  },

  col3Last: {
    width: '31%',
  },

  // Cards
  card: {
    backgroundColor: PDF_COLORS.background,
    borderWidth: 1,
    borderColor: PDF_COLORS.border,
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: PDF_COLORS.primary,
    marginBottom: 4,
  },

  cardText: {
    fontSize: 9,
    color: PDF_COLORS.text,
    lineHeight: 1.3,
  },

  // Day Plan
  dayCard: {
    backgroundColor: PDF_COLORS.muted,
    borderRadius: 4,
    padding: 8,
    marginBottom: 6,
  },

  dayTitle: {
    fontSize: 9,
    fontWeight: 700,
    color: PDF_COLORS.primary,
    marginBottom: 4,
  },

  dayAction: {
    fontSize: 8,
    color: PDF_COLORS.text,
    marginBottom: 2,
    paddingLeft: 8,
  },

  // Images
  imageContainer: {
    alignItems: 'center',
    marginVertical: 12,
    padding: 8,
    backgroundColor: PDF_COLORS.muted,
    borderRadius: 8,
  },

  imagePlaceholder: {
    width: 200,
    height: 120,
    backgroundColor: PDF_COLORS.primaryLight,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PDF_COLORS.border,
  },

  imagePlaceholderText: {
    fontSize: 8,
    color: PDF_COLORS.textMuted,
    textAlign: 'center',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: PDF_DIMENSIONS.margin,
    right: PDF_DIMENSIONS.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: PDF_COLORS.border,
  },

  footerSmall: {
    position: 'absolute',
    bottom: 16,
    left: PDF_DIMENSIONS.marginSmall,
    right: PDF_DIMENSIONS.marginSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 7,
    color: PDF_COLORS.textMuted,
  },

  // Sources
  sourcesContainer: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: PDF_COLORS.border,
  },

  sourceItem: {
    fontSize: 7,
    color: PDF_COLORS.textMuted,
    marginBottom: 2,
  },

  // Red Flags
  alertTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: PDF_COLORS.danger,
    marginBottom: 6,
  },

  alertItem: {
    fontSize: 9,
    color: PDF_COLORS.danger,
    marginBottom: 3,
    paddingLeft: 12,
  },

  // Icon placeholders
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
    fontSize: 14,
    textAlign: 'center',
  },

  iconSmall: {
    width: 16,
    height: 16,
    marginRight: 6,
    fontSize: 12,
  },
});

export default pdfStyles;
