import { KOOS_PS_LEVELS } from '@/content/parcours/koosPs';

interface KoosItemProps {
  index: number;
  question: string;
  value: number | null;
  onChange: (index: number, value: number) => void;
}

/**
 * Un item du KOOS-PS avec boutons verticaux pleine largeur.
 * Touch target large pour patients 60-80 ans.
 */
export const KoosItem = ({ index, question, value, onChange }: KoosItemProps) => (
  <div className="space-y-2 pb-4 border-b border-muted last:border-0">
    <p className="text-lg font-semibold">{question}</p>
    <div className="grid gap-2">
      {KOOS_PS_LEVELS.map((level) => (
        <button
          key={level.value}
          onClick={() => onChange(index, level.value)}
          className={`w-full py-4 px-5 rounded-xl text-base font-semibold transition-all border-2 text-left
            ${value === level.value
              ? `${level.color} border-current shadow-md`
              : 'bg-muted/20 border-muted text-muted-foreground hover:border-primary/30'
            }`}
        >
          {level.label}
        </button>
      ))}
    </div>
  </div>
);
