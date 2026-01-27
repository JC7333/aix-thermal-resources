// ============================================
// HOOK COLLECTIONS — COOLANCE
// ============================================
// Gestion des collections de favoris personnalisées
// Stockage localStorage, conforme RGPD
// ============================================

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'coolance_collections';

export interface Collection {
  id: string;
  name: string;
  emoji: string;
  pathologies: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Génère un ID unique pour une collection
 */
const generateId = (): string => {
  return `col_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Emojis suggérés pour les collections
 */
export const suggestedEmojis = [
  '📁', '❤️', '⭐', '🏠', '👨‍👩‍👧', '👴', '👵', '🏃', '💪', '🧘',
  '☀️', '🌙', '📋', '🎯', '💡', '🔥', '🌿', '💊', '🩺', '📖',
];

/**
 * Hook pour gérer les collections de favoris
 */
export const useCollections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les collections au montage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCollections(parsed);
        }
      }
    } catch (error) {
      console.warn('[useCollections] Erreur lecture localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder les collections
  const saveCollections = useCallback((newCollections: Collection[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCollections));
      setCollections(newCollections);
    } catch (error) {
      console.warn('[useCollections] Erreur sauvegarde localStorage:', error);
    }
  }, []);

  // Créer une collection
  const createCollection = useCallback((name: string, emoji: string = '📁'): Collection => {
    const now = new Date().toISOString();
    const newCollection: Collection = {
      id: generateId(),
      name: name.trim(),
      emoji,
      pathologies: [],
      createdAt: now,
      updatedAt: now,
    };
    
    const updated = [...collections, newCollection];
    saveCollections(updated);
    console.log('[useCollections] Created:', newCollection.name);
    return newCollection;
  }, [collections, saveCollections]);

  // Mettre à jour une collection
  const updateCollection = useCallback((id: string, updates: Partial<Pick<Collection, 'name' | 'emoji'>>) => {
    const updated = collections.map(col => {
      if (col.id === id) {
        return {
          ...col,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return col;
    });
    saveCollections(updated);
    console.log('[useCollections] Updated:', id);
  }, [collections, saveCollections]);

  // Supprimer une collection
  const deleteCollection = useCallback((id: string) => {
    const updated = collections.filter(col => col.id !== id);
    saveCollections(updated);
    console.log('[useCollections] Deleted:', id);
  }, [collections, saveCollections]);

  // Ajouter une pathologie à une collection
  const addToCollection = useCallback((collectionId: string, pathologySlug: string) => {
    const updated = collections.map(col => {
      if (col.id === collectionId && !col.pathologies.includes(pathologySlug)) {
        return {
          ...col,
          pathologies: [...col.pathologies, pathologySlug],
          updatedAt: new Date().toISOString(),
        };
      }
      return col;
    });
    saveCollections(updated);
    console.log('[useCollections] Added pathology to collection:', pathologySlug, '->', collectionId);
  }, [collections, saveCollections]);

  // Retirer une pathologie d'une collection
  const removeFromCollection = useCallback((collectionId: string, pathologySlug: string) => {
    const updated = collections.map(col => {
      if (col.id === collectionId) {
        return {
          ...col,
          pathologies: col.pathologies.filter(p => p !== pathologySlug),
          updatedAt: new Date().toISOString(),
        };
      }
      return col;
    });
    saveCollections(updated);
    console.log('[useCollections] Removed pathology from collection:', pathologySlug, '<-', collectionId);
  }, [collections, saveCollections]);

  // Vérifier si une pathologie est dans une collection
  const isInCollection = useCallback((collectionId: string, pathologySlug: string): boolean => {
    const col = collections.find(c => c.id === collectionId);
    return col ? col.pathologies.includes(pathologySlug) : false;
  }, [collections]);

  // Obtenir les collections contenant une pathologie
  const getCollectionsForPathology = useCallback((pathologySlug: string): Collection[] => {
    return collections.filter(col => col.pathologies.includes(pathologySlug));
  }, [collections]);

  // Obtenir une collection par ID
  const getCollection = useCallback((id: string): Collection | undefined => {
    return collections.find(col => col.id === id);
  }, [collections]);

  // Réordonner les collections
  const reorderCollections = useCallback((newOrder: Collection[]) => {
    saveCollections(newOrder);
    console.log('[useCollections] Reordered');
  }, [saveCollections]);

  // Réordonner les pathologies dans une collection
  const reorderInCollection = useCallback((collectionId: string, newOrder: string[]) => {
    const updated = collections.map(col => {
      if (col.id === collectionId) {
        return {
          ...col,
          pathologies: newOrder,
          updatedAt: new Date().toISOString(),
        };
      }
      return col;
    });
    saveCollections(updated);
    console.log('[useCollections] Reordered pathologies in:', collectionId);
  }, [collections, saveCollections]);

  return {
    collections,
    isLoaded,
    createCollection,
    updateCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    isInCollection,
    getCollectionsForPathology,
    getCollection,
    reorderCollections,
    reorderInCollection,
    count: collections.length,
  };
};

export default useCollections;
