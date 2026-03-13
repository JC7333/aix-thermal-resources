import { useState } from 'react';
import { Mail, CheckCircle2, Check, TrendingUp } from 'lucide-react';
import { addBrevoContact } from '@/lib/brevoService';

interface EmailCaptureProps {
  token: string;
}

export const EmailCapture = ({ token }: EmailCaptureProps) => {
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState<'form' | 'saving' | 'done' | 'mini'>('form');
  const [error, setError] = useState('');

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValid) { setError('Adresse email invalide'); return; }
    if (!checked) { setError('Veuillez cocher la case de consentement'); return; }
    setError('');
    setState('saving');
    const ok = await addBrevoContact({ email, token, consentAt: new Date().toISOString() });
    if (ok) {
      setState('done');
    } else {
      setState('form');
      setError("Erreur lors de l'enregistrement. Réessayez.");
    }
  };

  if (state === 'done') {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center space-y-3">
        <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
        <p className="text-lg font-semibold text-green-800">C'est noté !</p>
        <p className="text-sm text-green-700">Vous recevrez votre premier bilan la semaine prochaine.</p>
      </div>
    );
  }

  if (state === 'mini') {
    return (
      <button onClick={() => setState('form')} className="w-full text-center text-sm text-primary hover:underline py-3">
        <Mail className="w-4 h-4 inline mr-1" />
        Recevoir mes bilans hebdomadaires par email
      </button>
    );
  }

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-muted/10 p-6 space-y-4">
      <div className="text-center space-y-2">
        <TrendingUp className="w-8 h-8 text-primary mx-auto" />
        <h3 className="text-xl font-serif font-bold">Ne perdez pas vos progrès</h3>
        <p className="text-muted-foreground">
          La majorité des patients qui continuent un suivi après la cure conservent leurs bénéfices.
          Recevez un bilan de 2 minutes chaque semaine.
        </p>
      </div>

      {state === 'saving' ? (
        <p className="text-center text-muted-foreground animate-pulse">Enregistrement...</p>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="email-capture" className="block text-sm font-medium text-foreground mb-1">
              Votre adresse email
            </label>
            <input
              id="email-capture"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="votre@email.fr"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-lg"
              autoComplete="email"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setChecked(!checked)}
              className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors
                ${checked ? 'bg-primary border-primary' : 'border-muted-foreground'}`}
            >
              {checked && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
            <span className="text-sm text-muted-foreground leading-snug">
              J'accepte de recevoir des bilans hebdomadaires par email dans le cadre de mon programme de suivi.
              Mon email et mes données de suivi sont stockés séparément et jamais croisés.
              Je peux me désinscrire à tout moment.
            </span>
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={!isValid || !checked}
            className="w-full py-3 rounded-lg bg-primary text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            Recevoir mes bilans hebdomadaires
          </button>
        </div>
      )}

      <button onClick={() => setState('mini')} className="w-full text-sm text-muted-foreground hover:text-foreground py-2">
        Peut-être plus tard
      </button>
    </div>
  );
};
