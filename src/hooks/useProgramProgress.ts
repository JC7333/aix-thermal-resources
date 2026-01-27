import { useState, useEffect, useCallback } from 'react';

interface ProgressState {
  [slug: string]: {
    [level: number]: {
      // Pour 7 jours: dayIndex -> actionIndex -> boolean
      // Pour 8 semaines: "week_X" -> exerciseIndex -> boolean
      [key: string | number]: {
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

  // Vérifier si une action est complétée (plan 7 jours)
  const isCompleted = useCallback((dayIndex: number, actionIndex: number): boolean => {
    return progress[slug]?.[level]?.[dayIndex]?.[actionIndex] ?? false;
  }, [progress, slug, level]);

  // Vérifier si un exercice de semaine est complété (programme 8 semaines)
  const isWeekExerciseCompleted = useCallback((weekIndex: number, exerciseIndex: number): boolean => {
    const weekKey = `week_${weekIndex}`;
    return progress[slug]?.[level]?.[weekKey]?.[exerciseIndex] ?? false;
  }, [progress, slug, level]);

  // Basculer l'état d'une action (plan 7 jours)
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

  // Basculer l'état d'un exercice de semaine (programme 8 semaines)
  const toggleWeekExercise = useCallback((weekIndex: number, exerciseIndex: number) => {
    const weekKey = `week_${weekIndex}`;
    setProgress((prev) => {
      const newProgress = { ...prev };
      
      if (!newProgress[slug]) {
        newProgress[slug] = {};
      }
      if (!newProgress[slug][level]) {
        newProgress[slug][level] = {};
      }
      if (!newProgress[slug][level][weekKey]) {
        newProgress[slug][level][weekKey] = {};
      }
      
      newProgress[slug][level][weekKey][exerciseIndex] = !newProgress[slug][level][weekKey][exerciseIndex];
      
      saveProgress(newProgress);
      return newProgress;
    });
  }, [slug, level, saveProgress]);

  // Calculer le pourcentage de progression pour le plan 7 jours
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

  // Calculer le pourcentage de progression pour le programme 8 semaines
  const getWeeklyProgressPercent = useCallback((exercisesPerWeek: number[]): number => {
    const slugProgress = progress[slug]?.[level];
    if (!slugProgress) return 0;

    let completed = 0;
    let total = 0;

    exercisesPerWeek.forEach((exerciseCount, weekIndex) => {
      const weekKey = `week_${weekIndex}`;
      total += exerciseCount;
      for (let exerciseIndex = 0; exerciseIndex < exerciseCount; exerciseIndex++) {
        if (slugProgress[weekKey]?.[exerciseIndex]) {
          completed++;
        }
      }
    });

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }, [progress, slug, level]);

  // Réinitialiser la progression pour ce niveau (7 jours uniquement)
  const resetProgress = useCallback(() => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      if (newProgress[slug]?.[level]) {
        // Supprimer uniquement les entrées numériques (jours)
        Object.keys(newProgress[slug][level]).forEach(key => {
          if (!key.startsWith('week_')) {
            delete newProgress[slug][level][key];
          }
        });
        if (Object.keys(newProgress[slug][level]).length === 0) {
          delete newProgress[slug][level];
        }
        if (Object.keys(newProgress[slug]).length === 0) {
          delete newProgress[slug];
        }
      }
      saveProgress(newProgress);
      return newProgress;
    });
  }, [slug, level, saveProgress]);

  // Réinitialiser la progression 8 semaines pour ce niveau
  const resetWeeklyProgress = useCallback(() => {
    setProgress((prev) => {
      const newProgress = { ...prev };
      if (newProgress[slug]?.[level]) {
        // Supprimer uniquement les entrées week_X
        Object.keys(newProgress[slug][level]).forEach(key => {
          if (key.startsWith('week_')) {
            delete newProgress[slug][level][key];
          }
        });
        if (Object.keys(newProgress[slug][level]).length === 0) {
          delete newProgress[slug][level];
        }
        if (Object.keys(newProgress[slug]).length === 0) {
          delete newProgress[slug];
        }
      }
      saveProgress(newProgress);
      return newProgress;
    });
  }, [slug, level, saveProgress]);

  // Compter les actions complétées pour un jour (plan 7 jours)
  const getDayCompletedCount = useCallback((dayIndex: number, totalActions: number): number => {
    const dayProgress = progress[slug]?.[level]?.[dayIndex];
    if (!dayProgress) return 0;

    let count = 0;
    for (let i = 0; i < totalActions; i++) {
      if (dayProgress[i]) count++;
    }
    return count;
  }, [progress, slug, level]);

  // Compter les exercices complétés pour une semaine (programme 8 semaines)
  const getWeekCompletedCount = useCallback((weekIndex: number, totalExercises: number): number => {
    const weekKey = `week_${weekIndex}`;
    const weekProgress = progress[slug]?.[level]?.[weekKey];
    if (!weekProgress) return 0;

    let count = 0;
    for (let i = 0; i < totalExercises; i++) {
      if (weekProgress[i]) count++;
    }
    return count;
  }, [progress, slug, level]);

  return {
    // Plan 7 jours
    isCompleted,
    toggleAction,
    getProgressPercent,
    resetProgress,
    getDayCompletedCount,
    // Programme 8 semaines
    isWeekExerciseCompleted,
    toggleWeekExercise,
    getWeeklyProgressPercent,
    resetWeeklyProgress,
    getWeekCompletedCount,
  };
};
