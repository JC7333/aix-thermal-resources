import { useState, useEffect } from 'react';
import { getCheckinAdvice } from '@/lib/geminiService';
import { Heart } from 'lucide-react';

interface AiAdviceProps {
  pathology: string;
  day: number;
  painScore: number;
  actionDone: boolean;
  painHistory: string;
  streak: number;
  visible: boolean;
}

export const AiAdvice = ({ pathology, day, painScore, actionDone, painHistory, streak, visible }: AiAdviceProps) => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    setLoading(true);
    getCheckinAdvice({ pathology, day, painScore, actionDone, painHistory, streak })
      .then((text) => { if (!cancelled) setAdvice(text); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [visible, pathology, day, painScore, actionDone, painHistory, streak]);

  if (!visible) return null;

  return (
    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
      <div className="flex items-center gap-2 mb-2">
        <Heart className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-primary">Votre conseil du jour</span>
      </div>
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
          <p className="text-muted-foreground text-sm">Un instant...</p>
        </div>
      ) : (
        <p className="text-foreground text-base leading-relaxed">{advice}</p>
      )}
    </div>
  );
};
