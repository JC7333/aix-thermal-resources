import { useState, useEffect, useMemo } from 'react';
import { getEvidenceBySlug } from '@/data/evidence';

const STORAGE_KEY = 'program-progress';

interface ProgressState {
  [slug: string]: {
    [level: number]: {
      [key: string | number]: {
        [actionIndex: number]: boolean;
      };
    };
  };
}

/**
 * Hook pour obtenir la progression globale d'une pathologie (lecture seule)
 * Utilisé pour l'affichage dans les cartes favoris
 */
export const usePathologyProgress = (slug: string) => {
  const [progress, setProgress] = useState<ProgressState>({});

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

  const evidence = useMemo(() => getEvidenceBySlug(slug), [slug]);

  const progressData = useMemo(() => {
    if (!evidence) {
      return { sevenDayPercent: 0, eightWeekPercent: 0, hasPrograms: false };
    }

    const hasSevenDay = evidence.sevenDayPlans && evidence.sevenDayPlans.length > 0;
    const hasEightWeek = evidence.eightWeekPrograms && evidence.eightWeekPrograms.length > 0;
    
    if (!hasSevenDay && !hasEightWeek) {
      return { sevenDayPercent: 0, eightWeekPercent: 0, hasPrograms: false };
    }

    // Calculer pour le niveau 0 par défaut (le plus courant)
    const level = 0;
    const slugProgress = progress[slug]?.[level];
    
    // Progression 7 jours
    let sevenDayPercent = 0;
    if (hasSevenDay) {
      const plan = evidence.sevenDayPlans?.find(p => p.level === level) || evidence.sevenDayPlans?.[0];
      if (plan && slugProgress) {
        let completed = 0;
        let total = 0;
        plan.days.forEach((day, dayIndex) => {
          total += day.actions.length;
          for (let i = 0; i < day.actions.length; i++) {
            if (slugProgress[dayIndex]?.[i]) {
              completed++;
            }
          }
        });
        sevenDayPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
      }
    }

    // Progression 8 semaines
    let eightWeekPercent = 0;
    if (hasEightWeek) {
      const program = evidence.eightWeekPrograms?.find(p => p.level === level) || evidence.eightWeekPrograms?.[0];
      if (program && slugProgress) {
        let completed = 0;
        let total = 0;
        program.weeks.forEach((week, weekIndex) => {
          const weekKey = `week_${weekIndex}`;
          total += week.exercises.length;
          for (let i = 0; i < week.exercises.length; i++) {
            if (slugProgress[weekKey]?.[i]) {
              completed++;
            }
          }
        });
        eightWeekPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
      }
    }

    return {
      sevenDayPercent,
      eightWeekPercent,
      hasPrograms: hasSevenDay || hasEightWeek,
    };
  }, [progress, slug, evidence]);

  return progressData;
};
