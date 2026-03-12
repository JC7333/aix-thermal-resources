import React, { useState } from 'react';
import { logEvent } from '@/services/analytics';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface ProQuestionnaireProps {
  slug: string;
  pathologyName: string;
}

const PRO_STORAGE_KEY = 'coolance_pro_responses';

interface ProResponse {
  slug: string;
  timestamp: number;
  painScore: number;
  functionScore: number;
  helpfulness: 'yes' | 'somewhat' | 'no';
}

const storeProResponse = async (response: ProResponse) => {
  // 1. Toujours stocker en localStorage (fallback)
  try {
    const stored = localStorage.getItem(PRO_STORAGE_KEY);
    const responses: ProResponse[] = stored ? JSON.parse(stored) : [];
    responses.push(response);
    const trimmed = responses.slice(-500);
    localStorage.setItem(PRO_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.warn('PRO localStorage failed:', e);
  }

  // 2. Envoyer à Supabase si configuré
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('pro_responses').insert({
        slug: response.slug,
        pain_score: response.painScore,
        function_score: response.functionScore,
        helpfulness: response.helpfulness,
        source: 'web',
      });
    } catch (e) {
      console.warn('PRO Supabase insert failed:', e);
      // Pas grave — on a le localStorage en backup
    }
  }
};

const ProQuestionnaire: React.FC<ProQuestionnaireProps> = ({ slug, pathologyName: _pathologyName }) => {
  const [painScore, setPainScore] = useState<number | null>(null);
  const [functionScore, setFunctionScore] = useState<number | null>(null);
  const [helpfulness, setHelpfulness] = useState<'yes' | 'somewhat' | 'no' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = painScore !== null && functionScore !== null && helpfulness !== null;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    const response: ProResponse = {
      slug,
      timestamp: Date.now(),
      painScore: painScore!,
      functionScore: functionScore!,
      helpfulness: helpfulness!,
    };
    await storeProResponse(response);
    logEvent('pro_submitted' as Parameters<typeof logEvent>[0], undefined, {
      slug,
      painScore: String(painScore),
      functionScore: String(functionScore),
      helpfulness: helpfulness!,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
        <p className="text-lg font-bold text-green-800 mb-2">Merci pour votre retour !</p>
        <p className="text-sm text-green-600">
          Vos réponses sont anonymes et nous aident à améliorer Étuve.
        </p>
      </div>
    );
  }

  const ScoreSelector = ({
    label, value, onChange, lowLabel, highLabel
  }: {
    label: string; value: number | null; onChange: (v: number) => void; lowLabel: string; highLabel: string;
  }) => (
    <div className="mb-6">
      <p className="text-base font-semibold text-gray-800 mb-3">{label}</p>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500">{lowLabel}</span>
        <span className="text-xs text-gray-500">{highLabel}</span>
      </div>
      <div className="flex gap-1 sm:gap-2">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`flex-1 h-10 sm:h-12 rounded-lg text-sm font-bold transition-all
              ${value === n
                ? 'bg-primary text-white scale-110 shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-white p-4 sm:p-6">
      <p className="text-lg font-bold text-primary mb-1">Votre avis compte</p>
      <p className="text-sm text-gray-500 mb-6">
        3 questions rapides, anonymes, pour améliorer Étuve.
      </p>

      <ScoreSelector
        label="1. Comment évaluez-vous votre douleur aujourd'hui ?"
        value={painScore}
        onChange={setPainScore}
        lowLabel="0 = Aucune douleur"
        highLabel="10 = Douleur maximale"
      />

      <ScoreSelector
        label="2. Comment évaluez-vous votre capacité à faire vos activités ?"
        value={functionScore}
        onChange={setFunctionScore}
        lowLabel="0 = Très difficile"
        highLabel="10 = Aucune difficulté"
      />

      <div className="mb-6">
        <p className="text-base font-semibold text-gray-800 mb-3">
          3. Ce contenu vous a-t-il aidé ?
        </p>
        <div className="flex gap-3">
          {([
            { value: 'yes' as const, label: 'Oui, beaucoup' },
            { value: 'somewhat' as const, label: 'Un peu' },
            { value: 'no' as const, label: 'Pas vraiment' },
          ]).map((option) => (
            <button
              key={option.value}
              onClick={() => setHelpfulness(option.value)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all border-2
                ${helpfulness === option.value
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`w-full py-4 rounded-xl text-lg font-bold transition-all
          ${canSubmit
            ? 'bg-primary text-white hover:bg-primary/90 shadow-lg'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
      >
        Envoyer mes réponses
      </button>

      <p className="text-xs text-gray-400 mt-3 text-center">
        Aucune donnée personnelle n'est collectée. Vos réponses sont anonymes.
      </p>
    </div>
  );
};

export default ProQuestionnaire;
