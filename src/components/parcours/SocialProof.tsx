import { useState, useEffect } from 'react';

interface SocialProofProps {
  slug?: string;
}

function computeCount(slug: string): number {
  const bases: Record<string, number> = {
    'gonarthrose': 127,
    'lombalgie-chronique': 98,
    'coxarthrose': 74,
    'insuffisance-veineuse': 63,
    'bpco': 45,
    'fibromyalgie': 52,
    'asthme': 41,
    'tendinopathie-coiffe': 38,
    'arthrose-digitale': 29,
    'rhinosinusite-chronique': 34,
    'otites-repetition-enfant': 23,
  };
  const base = bases[slug] || 87;

  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const timeBlock = Math.floor(now.getHours() / 4); // 0-5 (6 blocks per day)
  const hash = ((seed * 31 + timeBlock * 7) % 29) - 14; // -14 to +14

  return Math.max(15, base + hash);
}

export const SocialProof = ({ slug }: SocialProofProps) => {
  const [count, setCount] = useState(() => computeCount(slug || ''));

  // Recalculate every 30 min (catches 4h boundary while page is open)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(computeCount(slug || ''));
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [slug]);

  return (
    <div className="flex items-center gap-2 py-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{count} patients</span> suivent ce programme cette semaine
      </p>
    </div>
  );
};
