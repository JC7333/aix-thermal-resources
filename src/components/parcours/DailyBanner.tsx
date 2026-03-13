import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flame, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { getStoredToken } from "@/lib/parcoursToken";
import { fetchLastCheckinDay } from "@/services/parcoursService";
import { supabase } from "@/lib/supabase";

interface DailyBannerProps {
  slug: string;
}

export const DailyBanner = ({ slug }: DailyBannerProps) => {
  const [currentDay, setCurrentDay] = useState<number | null>(null);
  const [lastCheckinDay, setLastCheckinDay] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const stored = getStoredToken(slug);
      if (!stored?.parcoursId) {
        setLoading(false);
        return;
      }

      let createdAt: string | null = null;

      if ("createdAt" in stored && stored.createdAt) {
        createdAt = stored.createdAt as string;
      }

      if (!createdAt) {
        try {
          const { data } = await supabase
            .from("parcours")
            .select("created_at")
            .eq("id", stored.parcoursId)
            .single();
          createdAt = data?.created_at || null;
        } catch (_e) {
          /* ignore */
        }
      }

      if (!createdAt) {
        setLoading(false);
        return;
      }

      const created = new Date(createdAt);
      const now = new Date();
      const daysSinceStart =
        Math.floor(
          (now.getTime() - created.getTime()) / (24 * 60 * 60 * 1000),
        ) + 1;
      setCurrentDay(Math.min(Math.max(daysSinceStart, 1), 21));

      const lastDay = await fetchLastCheckinDay(stored.parcoursId);
      setLastCheckinDay(lastDay);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading || currentDay === null || currentDay > 21) return null;

  const todayDone = lastCheckinDay === currentDay;
  const streakInDanger =
    lastCheckinDay !== null && lastCheckinDay < currentDay - 1 && !todayDone;

  if (todayDone) {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 flex items-center gap-3 mb-6">
        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-green-800">
            Jour {currentDay}/21 — Check-in fait !
          </p>
          <p className="text-sm text-green-700">
            Revenez demain pour continuer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/parcours/${slug}/jour/${currentDay}`} className="block mb-6">
      <div
        className={`rounded-xl border-2 p-4 flex items-center gap-3 transition-all hover:shadow-md ${
          streakInDanger
            ? "border-orange-300 bg-orange-50"
            : "border-primary/30 bg-primary/5"
        }`}
      >
        {streakInDanger ? (
          <AlertTriangle className="w-6 h-6 text-orange-500 flex-shrink-0" />
        ) : (
          <Flame className="w-6 h-6 text-primary flex-shrink-0" />
        )}
        <div className="flex-1">
          <p
            className={`font-semibold ${streakInDanger ? "text-orange-800" : "text-foreground"}`}
          >
            {streakInDanger
              ? `Jour ${currentDay}/21 — Votre série est en danger !`
              : `Jour ${currentDay}/21 — Votre programme vous attend`}
          </p>
          <p className="text-sm text-muted-foreground">
            Prenez 2 minutes pour votre check-in.
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </div>
    </Link>
  );
};
