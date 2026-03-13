import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Heart } from 'lucide-react';
import { saveCheckin } from '@/services/parcoursService';
import { askGemini } from '@/lib/geminiService';

interface BilanHebdoProps {
  parcoursId: string;
  weekNumber: number;
}

export const BilanHebdo = ({ parcoursId, weekNumber }: BilanHebdoProps) => {
  const [painScore, setPainScore] = useState<number | null>(null);
  const [exerciseDays, setExerciseDays] = useState<number | null>(null);
  const [moralScore, setMoralScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [advice, setAdvice] = useState('');

  const canSubmit = painScore !== null && exerciseDays !== null && moralScore !== null;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSaving(true);
    try {
      // day_number > 100 = post-cure (pas de conflit avec J1-J21)
      await saveCheckin(parcoursId, 100 + weekNumber, painScore!, exerciseDays! >= 3);

      const fallback = painScore! <= 3
        ? 'Vos scores sont encourageants. Continuez comme ça !'
        : 'Merci pour votre bilan. Chaque semaine de suivi compte.';

      const prompt = `Tu es un médecin thermaliste bienveillant. Bilan hebdomadaire post-cure, semaine ${weekNumber}.
Douleur : ${painScore}/10. Jours d'exercice : ${exerciseDays}/7. Moral : ${moralScore}/10.
Écris un conseil en 2 phrases. Chaleureux, pas infantilisant. Français. Pas de backticks.`;

      const text = await askGemini(prompt, fallback);
      setAdvice(text);
      setSubmitted(true);
    } catch (_e) {
      console.error('[BilanHebdo]', _e);
    } finally {
      setSaving(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
        <p className="text-xl font-semibold text-green-800">Bilan enregistré !</p>
        {advice && (
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-left">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Votre conseil de la semaine</span>
            </div>
            <p className="text-foreground text-base leading-relaxed">{advice}</p>
          </div>
        )}
        <p className="text-sm text-muted-foreground">Rendez-vous la semaine prochaine !</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-serif font-bold">Votre bilan — Semaine {weekNumber}</h2>
        <p className="text-muted-foreground">3 questions, 2 minutes. Anonyme.</p>
      </div>

      {/* Douleur */}
      <div>
        <p className="text-lg font-semibold mb-3">Comment est votre douleur cette semaine ?</p>
        <div className="flex justify-between mb-1 text-sm text-muted-foreground">
          <span>0 = Aucune</span><span>10 = Maximale</span>
        </div>
        <div className="grid grid-cols-11 gap-1.5">
          {Array.from({ length: 11 }, (_, i) => (
            <button key={i} onClick={() => setPainScore(i)}
              className={`aspect-square rounded-xl text-lg font-bold transition-all flex items-center justify-center min-h-[44px]
                ${painScore === i ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-muted hover:bg-muted/80 text-foreground'}`}>
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* Exercice */}
      <div>
        <p className="text-lg font-semibold mb-3">Combien de jours avez-vous fait vos exercices ?</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { value: 0, label: '0 jour' },
            { value: 2, label: '1-2 jours' },
            { value: 4, label: '3-4 jours' },
            { value: 6, label: '5+ jours' },
          ].map((opt) => (
            <button key={opt.value} onClick={() => setExerciseDays(opt.value)}
              className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all
                ${exerciseDays === opt.value ? 'border-primary bg-primary/10 text-primary shadow-md' : 'border-muted bg-muted/20 text-muted-foreground hover:border-primary/30'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Moral */}
      <div>
        <p className="text-lg font-semibold mb-3">Comment est votre moral cette semaine ?</p>
        <div className="flex justify-between mb-1 text-sm text-muted-foreground">
          <span>0 = Très bas</span><span>10 = Excellent</span>
        </div>
        <div className="grid grid-cols-11 gap-1.5">
          {Array.from({ length: 11 }, (_, i) => (
            <button key={i} onClick={() => setMoralScore(i)}
              className={`aspect-square rounded-xl text-lg font-bold transition-all flex items-center justify-center min-h-[44px]
                ${moralScore === i ? 'bg-primary text-white scale-110 shadow-lg' : 'bg-muted hover:bg-muted/80 text-foreground'}`}>
              {i}
            </button>
          ))}
        </div>
      </div>

      <Button size="lg" onClick={handleSubmit} disabled={!canSubmit || saving} className="w-full text-lg py-6">
        {saving ? 'Enregistrement...' : 'Valider mon bilan'}
      </Button>
      <p className="text-xs text-muted-foreground text-center">Anonyme — aucune donnée personnelle.</p>
    </div>
  );
};
