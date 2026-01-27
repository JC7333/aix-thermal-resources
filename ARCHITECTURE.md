# Architecture du projet COOLANCE

> Site patient du Dr Audric Bugnard — Médecin généraliste & thermaliste à Aix-les-Bains

## 🎯 Vue d'ensemble

COOLANCE est un site éducatif médical conçu pour être **ultra-accessible** aux seniors (~70 ans), aux patients à mobilité réduite et aux parents d'enfants. Le site propose des plans d'action simples et imprimables pour les pathologies chroniques.

---

## ♿ Mode Senior — Accessibilité globale

### Fonctionnement

Le **Mode Senior** est un système d'accessibilité centralisé qui adapte automatiquement l'affichage de toutes les pages du site :

- **Police +30%** : Titres, textes et boutons agrandis
- **Contrastes renforcés** : Bordures plus épaisses, espacements augmentés
- **Layout simplifié** : Grilles réduites (3 colonnes → 2 colonnes)
- **Boutons XXL** : Zones de clic agrandies pour les utilisateurs seniors

### Activation

Le Mode Senior est activable depuis le **header** via le bouton "Senior" (visible sur toutes les pages). L'état est persisté en `localStorage` et synchronisé globalement.

### Architecture technique

```
src/
├── contexts/
│   └── AccessibilityContext.tsx    # Provider global (seniorMode state)
├── hooks/
│   └── useSeniorMode.ts            # Hook centralisé pour les classes CSS
└── components/layout/
    └── Header.tsx                  # Bouton toggle avec indicateur visuel
```

### Hook `useSeniorMode`

Le hook `useSeniorMode` (`src/hooks/useSeniorMode.ts`) fournit des classes CSS adaptatives :

```typescript
const {
  seniorMode,      // boolean - état actuel
  titleClass,      // Titres H1 (text-4xl en senior, text-3xl sinon)
  subtitleClass,   // Titres H2/H3
  textClass,       // Texte principal (text-xl en senior)
  smallTextClass,  // Texte secondaire
  buttonSize,      // 'lg' | 'default' | 'sm'
  cardPadding,     // Padding des cartes
  gridCols,        // Grille responsive (2 cols en senior, 3 sinon)
  gridCols2,       // Grille 2 colonnes
  iconSize,        // Taille des icônes
  iconSizeLg,      // Grandes icônes
  badgeClass,      // Badges
  inputClass,      // Champs de formulaire
  cardClass,       // Cartes avec bordure renforcée
} = useSeniorMode();
```

### Pages couvertes

| Page | Route | Status |
|------|-------|--------|
| Accueil | `/` | ✅ |
| Ressources | `/ressources` | ✅ |
| Pathologies | `/pathologies` | ✅ |
| Pathologie détail | `/pathologies/:slug` | ✅ |
| Guides | `/guides` | ✅ |
| Parents | `/parents` | ✅ |
| FAQ | `/faq` | ✅ |
| Qui suis-je | `/qui-suis-je` | ✅ |
| Contact | `/contact` | ✅ |
| Téléchargements | `/telechargements` | ✅ |
| Parcours guidé | `/parcours` | ✅ |
| Réponses rapides | `/reponses-rapides` | ✅ |

**Couverture : 100%** — Toutes les pages principales et pages de détail sont synchronisées avec le Mode Senior.

---

## 📄 Système de PDF

### Types de PDF

1. **PDF 1 page** ("Fiche Frigo") : Résumé ultra-concis, imprimable
2. **PDF 4 pages** ("Fiche Détaillée") : Programme complet avec exercices

### Architecture

```
src/
├── components/pdf/
│   ├── Pdf1Page.tsx              # Template 1 page
│   ├── Pdf4Pages.tsx             # Template 4 pages
│   ├── PdfEvidence1Page.tsx      # Version evidence-based 1 page
│   ├── PdfEvidence4Pages.tsx     # Version evidence-based 4 pages
│   ├── PdfComponents.tsx         # Composants réutilisables
│   ├── PdfStyles.ts              # Styles partagés
│   └── diagrams/
│       ├── AnatomyDiagrams.tsx   # Schémas anatomiques
│       ├── ExerciseDiagrams.tsx  # Schémas d'exercices (niveaux 0-2)
│       └── ExerciseDiagramsLevels.tsx  # Niveau 3 (avancé)
├── services/
│   ├── pdfService.tsx            # Génération et cache
│   └── zipService.ts             # Téléchargement groupé
└── data/
    └── evidence.ts               # Données scientifiques par pathologie
```

### Cache intelligent

Les PDF sont mis en cache 30 minutes côté client. La 2ème génération est quasi-instantanée.

---

## 🗂️ Structure des données

### Pathologies (`src/data/evidence.ts`)

Chaque pathologie contient :
- Métadonnées (nom, catégorie, icône, temps de lecture)
- Résumé scientifique
- Recommandations (avec niveau de preuve)
- Actions quotidiennes (niveaux 0-3)
- Plan 7 jours
- Signaux d'alerte (red flags)
- Sources bibliographiques

### Catégories

- `rhumatologie` : Arthrose, Lombalgie, Sciatique
- `veino-lymphatique` : Insuffisance veineuse, Lymphœdème
- `orl-respiratoire` : BPCO, Otites enfant

---

## 🧭 Navigation

### Principes UX

- **Maximum 2 clics** pour obtenir un plan d'action
- **Skip link** pour accessibilité clavier
- **Scroll to top** automatique à chaque changement de route
- **Bouton flottant** "Haut de page" (adaptatif Mode Senior)

### Header responsive

En **Mode Senior**, le header bascule automatiquement en mode "hamburger" même sur desktop pour libérer de l'espace.

---

## 🎨 Design System

### Couleurs sémantiques

Définies dans `src/index.css` et `tailwind.config.ts` :

```css
--primary          /* Bleu médical */
--secondary        /* Vert guérison */
--destructive      /* Rouge alerte */
--muted            /* Gris neutre */
--accent           /* Accent chaud */
```

### Couleurs par catégorie

```css
--rhuma-color      /* Rhumatologie */
--veino-color      /* Veino-lymphatique */
--orl-color        /* ORL/Respiratoire */
--buccal-color     /* Muqueuses buccales */
```

---

## 📋 Règles déontologiques

Implémentées sur toutes les pages :

1. **Disclaimer médical** : Bandeau "ne remplace pas une consultation"
2. **Numéros d'urgence** : 15 / 112 affichés
3. **Red flags** : Signaux d'alerte sur chaque pathologie
4. **Sources datées** : Guidelines internationales référencées
5. **Pas de promesse** : "peut aider", jamais "va guérir"

---

## 🔧 Technologies

- **React 18** + TypeScript
- **Vite** (build)
- **Tailwind CSS** (styling)
- **shadcn/ui** (composants)
- **@react-pdf/renderer** (génération PDF)
- **Framer Motion** (animations)
- **React Router** (navigation)

---

## 📝 Conventions de code

### Plume Dr Audric

- Première personne : "Je vous propose..."
- Phrases courtes, vocabulaire simple
- Ton rassurant, jamais culpabilisant
- Toujours proposer une option "Très facile"

### Composants

- Composants atomiques dans `src/components/ui/`
- Composants partagés dans `src/components/shared/`
- Pages dans `src/pages/`
- Hooks dans `src/hooks/`

---

*Dernière mise à jour : Janvier 2026*
