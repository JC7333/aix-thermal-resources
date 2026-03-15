import { useState, useEffect } from "react";
import { getDailyTip } from "@/lib/geminiService";
import { FadeIn } from "@/components/shared/FadeIn";

interface DailyTipProps {
  pathologySlug: string;
  pathologyName: string;
}

export const DailyTip = ({ pathologySlug, pathologyName }: DailyTipProps) => {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getDailyTip(pathologySlug, pathologyName).then((result) => {
      if (cancelled) return;
      setTip(result?.tip || null);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [pathologySlug, pathologyName]);

  if (loading) {
    return (
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 animate-pulse">
        <div className="h-4 bg-primary/10 rounded w-3/4" />
        <div className="h-4 bg-primary/10 rounded w-full mt-2" />
        <div className="h-4 bg-primary/10 rounded w-1/2 mt-2" />
      </div>
    );
  }

  if (!tip) return null;

  return (
    <FadeIn>
      <div className="p-5 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-sm font-medium text-primary mb-1">Conseil du jour</p>
        <p className="text-base text-foreground leading-relaxed">{tip}</p>
      </div>
    </FadeIn>
  );
};
