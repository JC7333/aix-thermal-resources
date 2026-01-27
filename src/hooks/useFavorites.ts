// ============================================
// HOOK FAVORIS — COOLANCE
// ============================================
// Gestion des pathologies favorites en localStorage
// Conforme RGPD : aucune donnée de santé, juste des slugs
// ============================================

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'coolance_favorites';

/**
 * Hook pour gérer les pathologies favorites
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Charger les favoris au montage
  useEffect(() => {
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
    } catch (error) {
      console.warn('[useFavorites] Erreur sauvegarde localStorage:', error);
    }
  }, []);

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

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
    count: favorites.length,
  };
};

export default useFavorites;
