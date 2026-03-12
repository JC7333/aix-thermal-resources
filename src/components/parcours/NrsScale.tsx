/**
 * Échelle Numérique de Rating (NRS) 0-10.
 * Gros boutons carrés, touch target ≥ 48px.
 * Utilisé pour la douleur et la confiance.
 */
export const NrsScale = ({ value, onChange, lowLabel, highLabel }: {
  value: number | null;
  onChange: (v: number) => void;
  lowLabel: string;
  highLabel: string;
}) => (
  <div>
    <div className="flex justify-between mb-2 text-sm text-muted-foreground">
      <span>{lowLabel}</span>
      <span>{highLabel}</span>
    </div>
    <div className="grid grid-cols-11 gap-1.5">
      {Array.from({ length: 11 }, (_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`aspect-square rounded-xl text-xl font-bold transition-all flex items-center justify-center min-h-[48px]
            ${value === i
              ? 'bg-primary text-white scale-110 shadow-lg'
              : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
        >
          {i}
        </button>
      ))}
    </div>
  </div>
);
