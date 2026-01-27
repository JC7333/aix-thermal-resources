// ============================================
// HOOK FAVORIS — COOLANCE
// ============================================
// Gestion des pathologies favorites en localStorage
// Conforme RGPD : aucune donnée de santé, juste des slugs
// Inclut export JSON et partage via lien
// ============================================

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'coolance_favorites';
const URL_PARAM = 'favoris';

/**
 * Encode les favoris pour l'URL (base64)
 */
export const encodeFavoritesForUrl = (favorites: string[]): string => {
  try {
    const json = JSON.stringify(favorites);
    return btoa(encodeURIComponent(json));
  } catch (error) {
    console.error('[useFavorites] Erreur encodage:', error);
    return '';
  }
};

/**
 * Décode les favoris depuis l'URL (base64)
 */
export const decodeFavoritesFromUrl = (encoded: string): string[] => {
  try {
    const json = decodeURIComponent(atob(encoded));
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed) && parsed.every(s => typeof s === 'string')) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('[useFavorites] Erreur décodage:', error);
    return [];
  }
};

/**
 * Génère le lien de partage complet
 */
export const generateShareLink = (favorites: string[]): string => {
  if (favorites.length === 0) return '';
  const encoded = encodeFavoritesForUrl(favorites);
  const baseUrl = window.location.origin;
  return `${baseUrl}/pathologies?${URL_PARAM}=${encoded}`;
};

/**
 * Exporte les favoris en JSON
 */
export const exportFavoritesAsJson = (favorites: string[]): string => {
  const exportData = {
    favorites,
    exportedAt: new Date().toISOString(),
    source: 'COOLANCE - Dr Audric Bugnard',
  };
  return JSON.stringify(exportData, null, 2);
};

/**
 * Télécharge les favoris en fichier JSON
 */
export const downloadFavoritesJson = (favorites: string[]): void => {
  const json = exportFavoritesAsJson(favorites);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `coolance-favoris-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Hook pour gérer les pathologies favorites
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [importedFromUrl, setImportedFromUrl] = useState(false);

  // Charger les favoris au montage (localStorage ou URL)
  useEffect(() => {
    // D'abord vérifier l'URL pour un partage
    const urlParams = new URLSearchParams(window.location.search);
    const sharedFavorites = urlParams.get(URL_PARAM);
    
    if (sharedFavorites) {
      const decoded = decodeFavoritesFromUrl(sharedFavorites);
      if (decoded.length > 0) {
        setFavorites(decoded);
        setImportedFromUrl(true);
        console.log('[useFavorites] Imported from URL:', decoded);
        return;
      }
    }

    // Sinon charger depuis localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.warn('[useFavorites] Erreur lecture localStorage:', error);
    }
  }, []);

  // Sauvegarder les favoris
  const saveFavorites = useCallback((newFavorites: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      setImportedFromUrl(false);
    } catch (error) {
      console.warn('[useFavorites] Erreur sauvegarde localStorage:', error);
    }
  }, []);

  // Sauvegarder les favoris importés depuis l'URL
  const saveImportedFavorites = useCallback(() => {
    if (importedFromUrl && favorites.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        setImportedFromUrl(false);
        // Nettoyer l'URL
        const url = new URL(window.location.href);
        url.searchParams.delete(URL_PARAM);
        window.history.replaceState({}, '', url.toString());
        console.log('[useFavorites] Saved imported favorites to localStorage');
      } catch (error) {
        console.warn('[useFavorites] Erreur sauvegarde:', error);
      }
    }
  }, [favorites, importedFromUrl]);

  // Vérifier si un slug est favori
  const isFavorite = useCallback((slug: string): boolean => {
    return favorites.includes(slug);
  }, [favorites]);

  // Ajouter aux favoris
  const addFavorite = useCallback((slug: string) => {
    if (!favorites.includes(slug)) {
      const newFavorites = [...favorites, slug];
      saveFavorites(newFavorites);
      console.log(`[useFavorites] Added: ${slug}`);
    }
  }, [favorites, saveFavorites]);

  // Retirer des favoris
  const removeFavorite = useCallback((slug: string) => {
    const newFavorites = favorites.filter(f => f !== slug);
    saveFavorites(newFavorites);
    console.log(`[useFavorites] Removed: ${slug}`);
  }, [favorites, saveFavorites]);

  // Toggle favori
  const toggleFavorite = useCallback((slug: string) => {
    if (favorites.includes(slug)) {
      removeFavorite(slug);
    } else {
      addFavorite(slug);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Vider tous les favoris
  const clearFavorites = useCallback(() => {
    saveFavorites([]);
    console.log('[useFavorites] Cleared all');
  }, [saveFavorites]);

  // Importer des favoris (merge avec existants)
  const importFavorites = useCallback((newFavorites: string[], replace = false) => {
    if (replace) {
      saveFavorites(newFavorites);
    } else {
      const merged = [...new Set([...favorites, ...newFavorites])];
      saveFavorites(merged);
    }
    console.log('[useFavorites] Imported:', newFavorites.length, 'items');
  }, [favorites, saveFavorites]);

  // Générer le lien de partage
  const getShareLink = useCallback((): string => {
    return generateShareLink(favorites);
  }, [favorites]);

  // Exporter en JSON
  const exportJson = useCallback((): string => {
    return exportFavoritesAsJson(favorites);
  }, [favorites]);

  // Télécharger en JSON
  const downloadJson = useCallback(() => {
    downloadFavoritesJson(favorites);
  }, [favorites]);

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    importFavorites,
    saveImportedFavorites,
    getShareLink,
    exportJson,
    downloadJson,
    count: favorites.length,
    importedFromUrl,
  };
};

export default useFavorites;
