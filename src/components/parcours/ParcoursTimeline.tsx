import { Link } from 'react-router-dom';

interface ParcoursTimelineProps {
  slug: string;
  totalDays: number;
  currentDay: number;
  completedDays?: number[];
}

export const ParcoursTimeline = ({ slug, totalDays, currentDay, completedDays = [] }: ParcoursTimelineProps) => {
  const weeks = [
    { label: 'S1 — Comprendre', days: Array.from({ length: 7 }, (_, i) => i + 1), color: 'bg-blue-500' },
    { label: 'S2 — Agir', days: Array.from({ length: 7 }, (_, i) => i + 8), color: 'bg-amber-500' },
    { label: 'S3 — Consolider', days: Array.from({ length: 7 }, (_, i) => i + 15), color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-4">
      {weeks.map((week) => (
        <div key={week.label}>
          <p className="text-sm font-semibold text-muted-foreground mb-2">{week.label}</p>
          <div className="flex gap-1.5">
            {week.days.filter((d) => d <= totalDays).map((day) => {
              const isCompleted = completedDays.includes(day);
              const isCurrent = day === currentDay;

              return (
                <Link
                  key={day}
                  to={`/parcours/${slug}/jour/${day}`}
                  className={`flex-1 aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all min-w-[36px] min-h-[36px]
                    ${isCurrent
                      ? 'bg-primary text-white ring-2 ring-primary ring-offset-2 scale-110'
                      : isCompleted
                        ? `${week.color} text-white`
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                  {day}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
