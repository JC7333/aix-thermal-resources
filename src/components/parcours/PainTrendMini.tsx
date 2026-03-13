interface PainTrendMiniProps {
  scores: { day: number; score: number }[];
}

export const PainTrendMini = ({ scores }: PainTrendMiniProps) => {
  if (scores.length < 2) return null;

  const maxScore = 10;
  const width = 280;
  const height = 80;
  const padding = { top: 8, bottom: 16, left: 24, right: 8 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const points = scores.map((s, i) => ({
    x: padding.left + (i / (scores.length - 1)) * chartW,
    y: padding.top + ((maxScore - s.score) / maxScore) * chartH,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const first = scores[0].score;
  const last = scores[scores.length - 1].score;
  const diff = first - last;
  const trendText = diff > 0
    ? `Douleur en baisse de ${diff} point${diff > 1 ? 's' : ''}`
    : diff === 0
      ? 'Douleur stable'
      : `Douleur en hausse de ${Math.abs(diff)} point${Math.abs(diff) > 1 ? 's' : ''}`;
  const trendColor = diff > 0 ? 'text-green-600' : diff === 0 ? 'text-muted-foreground' : 'text-orange-600';

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={width} height={height} className="overflow-visible">
        <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="hsl(var(--primary))" />
        ))}
        {scores.map((s, i) => (
          <text key={i} x={points[i].x} y={height - 2} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))" className="select-none">
            J{s.day}
          </text>
        ))}
        <text x={2} y={padding.top + 4} fontSize={9} fill="hsl(var(--muted-foreground))">10</text>
        <text x={2} y={height - padding.bottom} fontSize={9} fill="hsl(var(--muted-foreground))">0</text>
      </svg>
      <p className={`text-xs font-medium ${trendColor}`}>{trendText}</p>
    </div>
  );
};
