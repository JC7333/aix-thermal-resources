# QA — Checklist Fonctionnalités COOLANCE

**Date :** 2026-01-28  
**Objectif :** V2 = source de vérité unique, UX pro, zéro lien cassé

---

## A) Redirections V1 → V2

| Slug testé | Route V1 | Redirige vers V2 | Vidéos visibles | Sources affichées | Status |
|------------|----------|------------------|-----------------|-------------------|--------|
| gonarthrose | `/pathologies/gonarthrose` | ✅ `/pathologies/v2/gonarthrose` | ✅ | ✅ | ✅ |
| coxarthrose | `/pathologies/coxarthrose` | ✅ `/pathologies/v2/coxarthrose` | ✅ | ✅ | ✅ |
| lombalgie-chronique | `/pathologies/lombalgie-chronique` | ✅ `/pathologies/v2/lombalgie-chronique` | ✅ | ✅ | ✅ |
| insuffisance-veineuse | `/pathologies/insuffisance-veineuse` | ✅ `/pathologies/v2/insuffisance-veineuse` | ⚠️ (message "en cours") | ✅ | ✅ |
| bpco | `/pathologies/bpco` | ✅ `/pathologies/v2/bpco` | ✅ | ✅ | ✅ |
| otites-repetition-enfant | `/pathologies/otites-repetition-enfant` | ✅ `/pathologies/v2/otites-repetition-enfant` | ✅ | ✅ | ✅ |
| rhinosinusite-chronique | `/pathologies/rhinosinusite-chronique` | ✅ `/pathologies/v2/rhinosinusite-chronique` | ✅ (lavage_nez) | ✅ | ✅ |
| lombalgie (alias) | `/pathologies/lombalgie` | ✅ `/pathologies/v2/lombalgie-chronique` | ✅ | ✅ | ✅ |
| mal-de-dos (alias) | `/pathologies/mal-de-dos` | ✅ `/pathologies/v2/lombalgie-chronique` | ✅ | ✅ | ✅ |
| otites (alias) | `/pathologies/otites` | ✅ `/pathologies/v2/otites-repetition-enfant` | ✅ | ✅ | ✅ |

---

## B) Vidéos (embed YouTube) — BUG #1 CORRIGÉ

| Test | Status | Notes |
|------|--------|-------|
| Clic "Voir la vidéo" ne navigue pas | ✅ | stopPropagation() ajouté |
| Embed YouTube lazy-load au clic | ✅ | youtube-nocookie.com |
| Fallback "Ouvrir sur YouTube" | ✅ | Nouvel onglet |
| 5 thèmes détectés dans JSON | ✅ | /diagnostic/videos |

| Thème | Vidéos dans JSON | Affichage page | Clic embed | Fallback YouTube |
|-------|------------------|----------------|------------|------------------|
| arthrose_genou | 2 | ✅ | ✅ | ✅ |
| arthrose_hanche | 2 | ✅ | ✅ | ✅ |
| lombalgie_chronique | 2 | ✅ | ✅ | ✅ |
| bpco | 2 | ✅ | ✅ | ✅ |
| lavage_nez | 2 | ✅ | ✅ | ✅ |
| insuffisance-veineuse | N/A | ✅ (message pro) | — | — |
| rhinosinusite-chronique | N/A | ✅ (message pro) | — | — |

---

## C) Liens "Lire" (Ressources) — BUG #2 CORRIGÉ

| Test | Status | Notes |
|------|--------|-------|
| pathologySlug corrigés (arthrose → gonarthrose) | ✅ | library-resources.ts |
| Liens vers V2 (via getPathologyUrl) | ✅ | Tous les slugs mappés |
| Bouton désactivé si pas de donnée | ✅ | "Non disponible" affiché |
| Diagnostic liens disponible | ✅ | /diagnostic/links |

**Slugs corrigés :**
- `arthrose` → `gonarthrose`
- `insuffisance-veineuse-chronique` → `insuffisance-veineuse`
- `otites-a-repetition-enfant` → `otites-repetition-enfant`

---

## D) Scroll-to-top global — CORRIGÉ

| Test | Status | Notes |
|------|--------|-------|
| Navigation SPA (changement de page) | ✅ | ScrollToTop component dans BrowserRouter |
| history.scrollRestoration = manual | ✅ | Configuré dans App.tsx useEffect |
| Bouton "Recommencer" (Parcours) | ✅ | window.scrollTo() explicite |
| Liens footer | ✅ | ScrollTopLink component |
| Ancres avec offset header | ✅ | 120px offset |
| Page /pathologies → /pathologies/v2/* | ✅ | Arrive EN HAUT |

---

## E) Contact (mailto)

| Test | Status | Notes |
|------|--------|-------|
| Formulaire ouvre client mail | ✅ | mailto:docteuraudricbugnard@gmail.com |
| Sujet pré-rempli | ✅ | "Contact depuis COOLANCE" |
| Corps avec email + message | ✅ | Formaté proprement |
| Validation consentement | ✅ | Toast erreur si non coché |

---

## F) UI Fixes

| Test | Status | Notes |
|------|--------|-------|
| Photo "Qui suis-je" centrée (tête visible) | ✅ | object-top |
| Bannière urgence (position) | ✅ | En haut, inline, discret |
| Menu hamburger position gauche | ✅ | Stable en mode Senior |

---

## G) PDF/Print

| Test | Status | Notes |
|------|--------|-------|
| PDF 1 page A4 (pas de page 2 vide) | ✅ | Helvetica, marges compactes |
| PDF 4 pages complet | ✅ | Programme 8 semaines inclus |
| Aperçu PDF modal | ✅ | Fallback HTML si échec |
| Fallback impression navigateur | ✅ | openPrintableFallback() |
| Boutons PDF avec stopPropagation | ✅ | Ne déclenche pas navigation |

---

## H) Guides transversaux — STANDARD TABAC

| Guide | 1 colonne | Police ≥12pt | Aperçu HTML | PDF Download | Status |
|-------|-----------|--------------|-------------|--------------|--------|
| Poids | ✅ | ✅ | ✅ | ✅ | ✅ |
| Tabac | ✅ | ✅ | ✅ | ✅ | ✅ |
| Sommeil | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bouger | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## I) Performance

| Test | Status | Notes |
|------|--------|-------|
| Cache JSON vidéos (pas de refetch) | ✅ | Memoization dans videoLibrary.ts |
| Cache PDF (30 min) | ✅ | Badge "Prêt" affiché |

---

## J) Pages de diagnostic (cachées)

| URL | Description | Status |
|-----|-------------|--------|
| `/diagnostic/videos` | Vérifie chargement JSON vidéos, thèmes, mapping | ✅ |
| `/diagnostic/links` | Vérifie validité liens ressources (28) | ✅ |
| `/diagnostic/routes` | Vérifie slugs V2, URL builder, scroll-to-top | ✅ |

---

## Résumé

- ✅ **BUG #1** : Clics vidéos ne naviguent plus vers la page
- ✅ **BUG #2** : Liens "Lire" pointent vers les bonnes pathologies V2
- ✅ **Scroll-to-top** : Fonctionnel partout (history.scrollRestoration = manual)
- ✅ **Contact** : mailto vers docteuraudricbugnard@gmail.com
- ✅ **UI** : Photo centrée, bannière OK
- ✅ **Diagnostics** : 3 pages disponibles (/diagnostic/videos, /links, /routes)
- ✅ **Guides** : Format 1 colonne, police lisible, preview + download
- ✅ **Vidéos N/A** : rhinosinusite-chronique et insuffisance-veineuse affichent message pro (pas de warning)

---

*Dernière mise à jour : 2026-01-28*
