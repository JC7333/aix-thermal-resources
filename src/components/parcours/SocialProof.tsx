import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { fetchParcoursCount } from '@/services/parcoursService';

interface SocialProofProps {
  slug: string;
}

export const SocialProof = ({ slug }: SocialProofProps) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetchParcoursCount(slug).then((n) => setCount(n));
  }, [slug]);

  if (count === null || count < 5) return null;

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-2">
      <Users className="w-4 h-4" />
      <span>{count} curistes ont commencé ce programme</span>
    </div>
  );
};
