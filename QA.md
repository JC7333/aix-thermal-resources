# QA — Checklist Pathologies V2

**Date :** 2026-01-28  
**Objectif :** V2 = source de vérité unique, zéro doublon, zéro "bientôt disponible"

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
| rhinosinusite-chronique | `/pathologies/rhinosinusite-chronique` | ✅ `/pathologies/v2/rhinosinusite-chronique` | ⚠️ (mapping manquant) | ✅ | ⚠️ |
| lombalgie (alias) | `/pathologies/lombalgie` | ✅ `/pathologies/v2/lombalgie-chronique` | ✅ | ✅ | ✅ |
| mal-de-dos (alias) | `/pathologies/mal-de-dos` | ✅ `/pathologies/v2/lombalgie-chronique` | ✅ | ✅ | ✅ |
| otites (alias) | `/pathologies/otites` | ✅ `/pathologies/v2/otites-repetition-enfant` | ✅ | ✅ | ✅ |

---

## B) Vidéos (embed YouTube)

| Thème | Vidéos dans JSON | Affichage page | Clic embed | Fallback YouTube |
|-------|------------------|----------------|------------|------------------|
| arthrose_genou | 2 | ✅ | ✅ | ✅ |
| arthrose_hanche | 2 | ✅ | ✅ | ✅ |
| lombalgie_chronique | 2 | ✅ | ✅ | ✅ |
| bpco | 2 | ✅ | ✅ | ✅ |
| lavage_nez | 2 | ✅ | ✅ | ✅ |

**Diagnostic vidéos :** `/diagnostic/videos` — ✅ 5 thèmes détectés

---

## C) Sources scientifiques

| Pathologie | Sources affichées | Format correct (Org — Année — Titre) |
|------------|-------------------|--------------------------------------|
| gonarthrose | ✅ 4 sources | ✅ |
| coxarthrose | ✅ 4 sources | ✅ |
| lombalgie-chronique | ✅ 5 sources | ✅ |
| insuffisance-veineuse | ✅ 4 sources | ✅ |
| bpco | ✅ 5 sources | ✅ |

---

## D) Liens internes (V2 partout)

| Page / Composant | Liens utilisent getPathologyUrl() | Status |
|------------------|-----------------------------------|--------|
| Index.tsx | ✅ | ✅ |
| Pathologies.tsx | ✅ | ✅ |
| Parents.tsx | ✅ | ✅ |
| Programs.tsx | ✅ | ✅ |
| Telechargements.tsx | ✅ | ✅ |
| Resources.tsx | ✅ | ✅ |
| ResourceCard.tsx | ✅ | ✅ |
| CollectionCard.tsx | ✅ | ✅ |
| DraggableFavoriteCard.tsx | ✅ | ✅ |

---

## E) Messages "bientôt disponible" → supprimés

| Fichier | Ancien message | Nouveau message | Status |
|---------|---------------|-----------------|--------|
| Resources.tsx | "sera bientôt disponible" | "Aucune donnée disponible" | ✅ |
| ResourceCard.tsx | "sera bientôt disponible" | "Aucune donnée disponible" | ✅ |
| Programs.tsx | "sera bientôt disponible" | "Aucune donnée disponible" | ✅ |
| Parents.tsx | "Guide bientôt disponible" | "Guide non disponible" | ✅ |
| PdfDownloadButtons.tsx | "PDF bientôt disponible" | "Données non disponibles" | ✅ |
| Telechargements.tsx | "PDFs bientôt disponibles" | "Aucun PDF disponible" | ✅ |

---

## F) PDF/Print

| Test | Status | Notes |
|------|--------|-------|
| PDF 1 page A4 (pas de page 2 vide) | ✅ | Helvetica, marges compactes |
| PDF 4 pages complet | ✅ | Programme 8 semaines inclus |
| Aperçu PDF modal | ✅ | Fallback HTML si échec |
| Fallback impression navigateur | ✅ | openPrintableFallback() |
| Font externe non supportée | ✅ | Helvetica uniquement |

---

## G) UX Mobile + Mode Senior

| Test | Desktop | Mobile | Mode Senior |
|------|---------|--------|-------------|
| Header stable (pas de chevauchement) | ✅ | ✅ | ⚠️ (à vérifier) |
| Menu hamburger accessible | ✅ | ✅ | ✅ |
| Boutons XXL lisibles | n/a | n/a | ✅ |
| Scroll-to-top après navigation | ✅ | ✅ | ✅ |

---

## H) Performance

| Test | Status | Notes |
|------|--------|-------|
| Cache JSON vidéos (pas de refetch) | ✅ | Memoization dans videoLibrary.ts |
| Cache PDF (30 min) | ✅ | Badge "Prêt" affiché |

---

## Résumé

- ✅ **Redirections V1→V2** : Fonctionnelles pour tous les slugs
- ✅ **Vidéos** : 5 thèmes, embed lazy-load, fallback YouTube
- ✅ **Sources** : Affichées sur toutes les pathologies V2
- ✅ **Liens internes** : Tous migrés vers getPathologyUrl()
- ✅ **"Bientôt disponible"** : Remplacés par messages explicites
- ✅ **PDF** : Génération fonctionnelle + fallback HTML
- ⚠️ **rhinosinusite-chronique** : Mapping vidéo manquant (pas de vidéos dans JSON)
- ⚠️ **Mode Senior header** : À tester manuellement

---

*Dernière mise à jour : 2026-01-28*
