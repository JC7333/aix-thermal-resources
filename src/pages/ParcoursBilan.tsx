import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getStoredToken } from '@/lib/parcoursToken';
import { saveProAssessment } from '@/services/parcoursService';
import {
  KOOS_PS_ITEMS,
  KOOS_PS_INTROS,
  KOOS_PS_INTRO_DEFAULT,
  calculateKoosPsScore,
} from '@/content/parcours/koosPs';
import { NrsScale } from '@/components/parcours/NrsScale';
import { KoosItem } from '@/components/parcours/KoosItem';
import type { ProAssessment } from '@/content/parcours/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Step = 'intro' | 'pro-douleur' | 'pro-koos-1' | 'pro-koos-2' | 'pro-confiance' | 'result';

const ParcoursBilan = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  usePageTitle('Bilan de fin de cure');

  const [step, setStep] = useState<Step>('intro');
  const [painScore, setPainScore] = useState<number | null>(null);
  const [koosItems, setKoosItems] = useState<(number | null)[]>(Array(7).fill(null));
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [t0Scores, setT0Scores] = useState<{ pain: number; function: number; confidence: number } | null>(null);

  // Récupérer le token AVANT tout early return mais APRÈS tous les hooks
  const stored = useMemo(() => (slug ? getStoredToken(slug) : null), [slug]);

  // Charger les scores T0 depuis Supabase (ou localStorage fallback)
  useEffect(() => {
    const loadT0 = async () => {
      if (!stored?.parcoursId) return;

      // Essayer Supabase d'abord
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data } = await supabase
            .from('parcours_pro')
            .select('pain_score, function_total, confidence_score')
            .eq('parcours_id', stored.parcoursId)
            .eq('timepoint', 'T0')
            .single();
          if (data) {
            setT0Scores({
              pain: data.pain_score,
              function: data.function_total,
              confidence: data.confidence_score,
            });
            return;
          }
        } catch (e) {
          console.warn('[Bilan] Supabase T0 load failed, trying localStorage:', e);
        }
      }

      // Fallback localStorage
      try {
        const raw = localStorage.getItem('etuve_parcours_pro');
        if (raw) {
          const all = JSON.parse(raw) as Array<{
            parcours_id: string;
            timepoint: string;
            pain_score: number;
            function_total: number;
            confidence_score: number;
          }>;
          const t0 = all.find(
            (p) => p.parcours_id === stored.parcoursId && p.timepoint === 'T0',
          );
          if (t0) {
            setT0Scores({
              pain: t0.pain_score,
              function: t0.function_total,
              confidence: t0.confidence_score,
            });
          }
        }
      } catch (e) {
        console.warn('[Bilan] localStorage T0 load failed:', e);
      }
    };
    loadT0();
  }, [stored?.parcoursId]);

  // Early return APRÈS tous les hooks
  if (!slug) return null;

  const koosIntro = KOOS_PS_INTROS[slug] || KOOS_PS_INTRO_DEFAULT;
  const t1Function = calculateKoosPsScore(koosItems as number[]);

  const handleKoosChange = (index: number, value: number) => {
    const newItems = [...koosItems];
    newItems[index] = value;
    setKoosItems(newItems);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (stored?.parcoursId) {
        const koosScores = koosItems as number[];
        const pro: ProAssessment = {
          painScore: painScore!,
          koosPsItems: koosScores,
          koosPsTotal: calculateKoosPsScore(koosScores),
          confidenceScore: confidenceScore!,
        };
        await saveProAssessment(stored.parcoursId, 'T1', pro);
      }
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('[Bilan] Save failed:', e);
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  // Comparaison score T0 vs T1 — texte explicite
  const ScoreCompare = ({
    label,
    t0,
    t1,
    unit,
    lowerIsBetter = false,
  }: {
    label: string;
    t0: number | null;
    t1: number;
    unit: string;
    lowerIsBetter?: boolean;
  }) => {
    const diff = t0 !== null ? t1 - t0 : null;
    const improved = diff !== null && (lowerIsBetter ? diff < 0 : diff > 0);
    const worsened = diff !== null && (lowerIsBetter ? diff > 0 : diff < 0);

    return (
      <div className="p-4 rounded-xl border bg-muted/10 space-y-2">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-foreground">
            {t1}
            <span className="text-lg text-muted-foreground">{unit}</span>
          </span>
          {diff !== null && diff !== 0 && (
            <span
              className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                improved
                  ? 'bg-green-100 text-green-700'
                  : worsened
                    ? 'bg-red-100 text-red-700'
                    : 'text-muted-foreground'
              }`}
            >
              {improved ? '✓ ' : ''}
              {diff > 0 ? '+' : ''}
              {diff} vs début de cure
            </span>
          )}
        </div>
        {t0 !== null && (
          <p className="text-xs text-muted-foreground">
            Début de cure : {t0}
            {unit}
          </p>
        )}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 'intro':
        return (
          <div className="space-y-6 text-center">
            <span className="text-5xl block">🎉</span>
            <h1 className="text-2xl font-serif font-bold">Félicitations !</h1>
            <p className="text-lg text-muted-foreground">
              Vous avez terminé vos 21 jours. Remplissez ce questionnaire pour mesurer vos progrès depuis le début de
              la cure.
            </p>
            <p className="text-base text-muted-foreground">
              C'est exactement le même qu'au jour 1 — pour pouvoir comparer.
            </p>
            <Button
              size="lg"
              className="text-xl py-7 gap-3"
              onClick={() => {
                setStep('pro-douleur');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Commencer le bilan <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        );

      case 'pro-douleur':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-serif font-bold">Votre douleur maintenant</h2>
            <p className="text-lg text-muted-foreground">
              En moyenne cette semaine, comment évaluez-vous votre douleur ?
            </p>
            <NrsScale
              value={painScore}
              onChange={setPainScore}
              lowLabel="0 = Aucune"
              highLabel="10 = Maximale"
            />
            {painScore !== null && (
              <div className="text-center p-4 rounded-xl bg-muted/30">
                <span className="text-4xl font-bold text-primary">{painScore}</span>
                <span className="text-lg text-muted-foreground"> / 10</span>
              </div>
            )}
          </div>
        );

      case 'pro-koos-1':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">Vos capacités (1/2)</h2>
            <p className="text-lg text-muted-foreground">{koosIntro}</p>
            {KOOS_PS_ITEMS.slice(0, 4).map((item, idx) => (
              <KoosItem
                key={item.id}
                index={idx}
                question={`${idx + 1}. ${item.question}`}
                value={koosItems[idx]}
                onChange={handleKoosChange}
              />
            ))}
          </div>
        );

      case 'pro-koos-2':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">Vos capacités (2/2)</h2>
            {KOOS_PS_ITEMS.slice(4, 7).map((item, idx) => (
              <KoosItem
                key={item.id}
                index={idx + 4}
                question={`${idx + 5}. ${item.question}`}
                value={koosItems[idx + 4]}
                onChange={handleKoosChange}
              />
            ))}
          </div>
        );

      case 'pro-confiance':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-serif font-bold">Votre confiance</h2>
            <p className="text-lg text-muted-foreground">
              À quel point vous sentez-vous capable de gérer votre problème ?
            </p>
            <NrsScale
              value={confidenceScore}
              onChange={setConfidenceScore}
              lowLabel="0 = Pas du tout"
              highLabel="10 = Tout à fait"
            />
          </div>
        );

      case 'result':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-serif font-bold mb-2">Votre bilan de fin de cure</h1>
              <p className="text-lg text-muted-foreground">Voici l'évolution de vos scores en 21 jours.</p>
            </div>

            <div className="grid gap-4">
              <ScoreCompare
                label="Douleur"
                t0={t0Scores?.pain ?? null}
                t1={painScore!}
                unit="/10"
                lowerIsBetter
              />
              <ScoreCompare
                label="Difficulté fonctionnelle"
                t0={t0Scores?.function ?? null}
                t1={t1Function}
                unit="/100"
                lowerIsBetter
              />
              <ScoreCompare
                label="Confiance"
                t0={t0Scores?.confidence ?? null}
                t1={confidenceScore!}
                unit="/10"
              />
            </div>

            {/* Message personnalisé */}
            <div className="p-5 rounded-xl bg-green-50 border border-green-200">
              <p className="text-lg text-green-800 font-medium">
                {t0Scores && painScore !== null && painScore < t0Scores.pain
                  ? 'Votre douleur a diminué ! Continuez vos exercices pour maintenir ces progrès.'
                  : t0Scores && confidenceScore !== null && confidenceScore > t0Scores.confidence
                    ? "Votre confiance a augmenté ! C'est un signe très positif pour la suite."
                    : "Chaque parcours est unique. L'important est de continuer vos exercices après la cure."}
              </p>
            </div>

            {/* Code et suivi */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
              <p className="text-base text-muted-foreground mb-1">Votre code pour le suivi post-cure :</p>
              <p className="text-2xl font-mono font-bold text-primary">{stored?.token}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Dans 1 mois, retournez sur etuve.fr/parcours/suivi pour refaire le questionnaire.
              </p>
            </div>

            {/* Rappels */}
            <div className="p-4 rounded-xl bg-muted/30 space-y-2">
              <p className="font-semibold">Pour maintenir vos bénéfices :</p>
              <p className="text-muted-foreground">• Circuit de 5 exercices, 3x/semaine</p>
              <p className="text-muted-foreground">• Marche 30 min/jour</p>
              <p className="text-muted-foreground">• Étirements après chaque séance</p>
            </div>

            <Link to={`/parcours/${slug}`}>
              <Button variant="outline" size="lg" className="w-full text-lg py-6">
                Retour à mon parcours
              </Button>
            </Link>
          </div>
        );
    }
  };

  // Navigation
  const steps: Step[] = ['intro', 'pro-douleur', 'pro-koos-1', 'pro-koos-2', 'pro-confiance', 'result'];
  const currentIndex = steps.indexOf(step);

  const canNext = (): boolean => {
    switch (step) {
      case 'pro-douleur':
        return painScore !== null;
      case 'pro-koos-1':
        return koosItems.slice(0, 4).every((v) => v !== null);
      case 'pro-koos-2':
        return koosItems.slice(4, 7).every((v) => v !== null);
      case 'pro-confiance':
        return confidenceScore !== null;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (step === 'pro-confiance') {
      await handleSave();
      return;
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {step !== 'intro' && step !== 'result' && (
          <div className="mb-8">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${Math.round((currentIndex / (steps.length - 1)) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {renderStep()}

        {step !== 'intro' && step !== 'result' && (
          <div className="flex gap-3 mt-10">
            {currentIndex > 1 && (
              <Button variant="outline" size="lg" onClick={handleBack} className="text-lg py-6 px-6 gap-2">
                Retour
              </Button>
            )}
            <Button
              size="lg"
              onClick={handleNext}
              disabled={!canNext() || saving}
              className="flex-1 text-lg py-6 gap-2"
            >
              {saving ? 'Enregistrement...' : step === 'pro-confiance' ? 'Voir mes résultats' : 'Suivant'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ParcoursBilan;
