interface ProgressBar21Props {
  currentDay: number;
  totalDays: number;
  completedDays: number[];
}

export const ProgressBar21 = ({ currentDay, totalDays, completedDays }: ProgressBar21Props) => {
  const pct = Math.round((completedDays.length / totalDays) * 100);

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-sm font-medium text-foreground whitespace-nowrap">
        J{currentDay}/{totalDays}
      </span>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {pct}%
      </span>
    </div>
  );
};
