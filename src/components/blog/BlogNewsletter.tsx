import { useState } from 'react';
import { CheckCircle2, Mail } from 'lucide-react';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY || '';

export const BlogNewsletter = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'form' | 'saving' | 'done'>('form');

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValid || !BREVO_API_KEY) return;
    setState('saving');
    try {
      const resp = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          listIds: [4],
          updateEnabled: true,
        }),
      });
      setState(resp.ok ? 'done' : 'form');
    } catch (_e) {
      setState('form');
    }
  };

  if (state === 'done') {
    return (
      <div className="flex items-center gap-2 justify-center py-4 text-green-700">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-medium">Inscription confirmée !</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-muted/20 p-5 mt-12">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-4 h-4 text-primary" />
        <span className="font-semibold text-foreground text-sm">Recevez nos articles santé</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        Un article par semaine, basé sur les recommandations scientifiques. Gratuit, sans spam.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.fr"
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
          autoComplete="email"
        />
        <button
          onClick={handleSubmit}
          disabled={!isValid || state === 'saving'}
          className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition-colors"
        >
          {state === 'saving' ? '...' : "S'inscrire"}
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Pas de données médicales. Désinscription en un clic.</p>
    </div>
  );
};
