import { useState, useEffect, useCallback } from 'react';

interface ProgressState {
  [slug: string]: {
    [level: number]: {
      [dayIndex: number]: {
        [actionIndex: number]: boolean;
      };
    };
  };
}

const STORAGE_KEY = 'program-progress';

export const useProgramProgress = (slug: string, level: number) => {
  const [progress, setProgress] = useState<ProgressState>({});

  // Charger depuis localStorage au montage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Erreur de lecture de la progression:', error);
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  const saveProgress = useCallback((newProgress: ProgressState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Erreur de sauvegarde de la progression:', error);
    }
  }, []);

  // Vérifier si une action est complétée
  const isCompleted = useCallback((dayIndex: number, actionIndex: number): boolean => {
    return progress[slug]?.[level]?.[dayIndex]?.[actionIndex] ?? false;
  }, [progress, slug, level]);

  // Basculer l'état d'une action
  const toggleAction = useCallback((dayIndex: number, actionIndex: number) => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      
      if (!newProgress[slug]) {
        newProgress[slug] = {};
      }
      if (!newProgress[slug][level]) {
        newProgress[slug][level] = {};
      }
      if (!newProgress[slug][level][dayIndex]) {
        newProgress[slug][level][dayIndex] = {};
      }
      
      newProgress[slug][level][dayIndex][actionIndex] = !newProgress[slug][level][dayIndex][actionIndex];
      
      saveProgress(newProgress);
      return newProgress;
    });
  }, [slug, level, saveProgress]);

  // Calculer le pourcentage de progression pour ce plan
  const getProgressPercent = useCallback((totalDays: number, actionsPerDay: number[]): number => {
    const slugProgress = progress[slug]?.[level];
    if (!slugProgress) return 0;

    let completed = 0;
    let total = 0;

    actionsPerDay.forEach((actionCount, dayIndex) => {
      total += actionCount;
      for (let actionIndex = 0; actionIndex < actionCount; actionIndex++) {
        if (slugProgress[dayIndex]?.[actionIndex]) {
          completed++;
        }
      }
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [progress, slug, level]);

  // Réinitialiser la progression pour ce plan
  const resetProgress = useCallback(() => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      if (newProgress[slug]) {
        delete newProgress[slug][level];
        if (Object.keys(newProgress[slug]).length === 0) {
          delete newProgress[slug];
        }
      }
      saveProgress(newProgress);
      return newProgress;
    });
  }, [slug, level, saveProgress]);

  // Compter les actions complétées pour un jour
  const getDayCompletedCount = useCallback((dayIndex: number, totalActions: number): number => {
    const dayProgress = progress[slug]?.[level]?.[dayIndex];
    if (!dayProgress) return 0;

    let count = 0;
    for (let i = 0; i < totalActions; i++) {
      if (dayProgress[i]) count++;
    }
    return count;
  }, [progress, slug, level]);

  return {
    isCompleted,
    toggleAction,
    getProgressPercent,
    resetProgress,
    getDayCompletedCount,
  };
};
