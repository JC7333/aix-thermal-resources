import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
}

const MESSAGES: Record<number, string> = {
  3: 'Beau début !',
  5: 'Bravo, vous êtes régulier !',
  7: 'Une semaine complète !',
  10: 'Impressionnant !',
  14: 'Deux semaines, chapeau !',
  21: 'Parcours terminé, félicitations !',
};

export const StreakBadge = ({ streak }: StreakBadgeProps) => {
  if (streak < 2) return null;

  const message = MESSAGES[streak] || (streak >= 5 ? `${streak} jours consécutifs !` : `${streak} jours de suite !`);

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 w-fit mx-auto">
      <Flame className="w-4 h-4 text-orange-500" />
      <span className="text-sm font-semibold text-orange-700">{message}</span>
    </div>
  );
};
