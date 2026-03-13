import { useState, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { saveCheckin } from '@/services/parcoursService';
import { getStoredToken } from '@/lib/parcoursToken';
import { useToast } from '@/hooks/use-toast';
import { AiAdvice } from '@/components/parcours/AiAdvice';
import { StreakBadge } from '@/components/parcours/StreakBadge';
import { PainTrendMini } from '@/components/parcours/PainTrendMini';
import { fetchCheckins } from '@/services/parcoursService';

interface DailyCheckinProps {
  slug: string;
  dayNumber: number;
  onComplete: () => void;
}

export const DailyCheckin = ({ slug, dayNumber, onComplete }: DailyCheckinProps) => {
  const [painScore, setPainScore] = useState<number | null>(null);
  const [actionDone, setActionDone] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [previousCheckins, setPreviousCheckins] = useState<{ day_number: number; pain_score: number; action_done: boolean }[]>([]);
  const [streak, setStreak] = useState(0);

  const loadPreviousCheckins = useCallback(async () => {
    const stored = getStoredToken(slug);
    if (!stored?.parcoursId) return;
    const checkins = await fetchCheckins(stored.parcoursId);
    setPreviousCheckins(checkins);
    let s = 0;
    const sortedDays = checkins.map(c => c.day_number).sort((a, b) => b - a);
    for (let i = 0; i < sortedDays.length; i++) {
      if (i === 0 || sortedDays[i] === sortedDays[i - 1] - 1) { s++; } else { break; }
    }
    setStreak(s);
  }, [slug]);

  useEffect(() => { loadPreviousCheckins(); }, [loadPreviousCheckins]);

  const painHistory = useMemo(
    () => previousCheckins.map(c => `J${c.day_number}:${c.pain_score}`).join(', '),
    [previousCheckins]
  );

  const canSubmit = painScore !== null && actionDone !== null;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSaving(true);
    try {
      const stored = getStoredToken(slug);
      if (stored?.parcoursId) {
        await saveCheckin(stored.parcoursId, dayNumber, painScore!, actionDone!);
      }
      await loadPreviousCheckins();
      setSubmitted(true);
    } catch (e) {
      console.error('[Checkin] Save failed:', e);
      toast({ title: 'Erreur', description: "Impossible d'enregistrer. Réessayez.", variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    const painScores = previousCheckins.map(c => ({ day: c.day_number, score: c.pain_score }));

    return (
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center space-y-4">
        <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto" />
        <p className="text-lg font-semibold text-green-800">Check-in enregistré !</p>

        <StreakBadge streak={streak} />

        {painScores.length >= 2 && (
          <PainTrendMini scores={painScores} />
        )}

        <AiAdvice
          pathology={slug}
          day={dayNumber}
          painScore={painScore!}
          actionDone={actionDone!}
          painHistory={painHistory}
          streak={streak}
          visible={true}
        />

        <Button size="lg" onClick={onComplete} className="gap-2 text-lg py-6">
          Continuer <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-muted/10 p-6 space-y-6">
      <h3 className="text-xl font-serif font-bold">Votre check-in du jour</h3>

      {/* EVA Douleur */}
      <div>
        <p className="text-lg font-semibold mb-3">Comment est votre douleur aujourd'hui ?</p>
        <div className="flex justify-between mb-1 text-sm text-muted-foreground">
          <span>0 = Aucune</span>
          <span>10 = Maximale</span>
        </div>
        <div className="grid grid-cols-11 gap-1.5">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              onClick={() => setPainScore(i)}
              className={`aspect-square rounded-xl text-lg font-bold transition-all flex items-center justify-center min-h-[44px]
                ${painScore === i
                  ? 'bg-primary text-white scale-110 shadow-lg'
                  : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Action faite ? */}
      <div>
        <p className="text-lg font-semibold mb-3">Avez-vous fait l'action du jour ?</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: true, label: "Oui !", color: 'border-green-300 bg-green-50 text-green-800' },
            { value: false, label: "Non, pas aujourd'hui", color: 'border-orange-300 bg-orange-50 text-orange-800' },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              onClick={() => setActionDone(opt.value)}
              className={`p-4 rounded-xl border-2 text-base font-semibold transition-all
                ${actionDone === opt.value
                  ? `${opt.color} shadow-md`
                  : 'border-muted bg-muted/20 text-muted-foreground hover:border-primary/30'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <Button size="lg" onClick={handleSubmit} disabled={!canSubmit || saving} className="w-full text-lg py-6">
        {saving ? 'Enregistrement...' : 'Valider mon check-in'}
      </Button>
      <p className="text-xs text-muted-foreground text-center">Anonyme — aucune donnée personnelle.</p>
    </div>
  );
};
