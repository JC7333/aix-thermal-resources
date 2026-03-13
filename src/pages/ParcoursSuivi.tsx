import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { findParcoursByToken, saveProAssessment } from '@/services/parcoursService';
import { KOOS_PS_ITEMS, KOOS_PS_INTROS, KOOS_PS_INTRO_DEFAULT, calculateKoosPsScore, KOOS_PS_SLUGS } from '@/content/parcours/koosPs';
import { NrsScale } from '@/components/parcours/NrsScale';
import { KoosItem } from '@/components/parcours/KoosItem';
import type { ProAssessment } from '@/content/parcours/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { ArrowRight, Search, TrendingDown, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SLUG_LABELS: Record<string, string> = {
  'gonarthrose': 'Arthrose du genou',
  'lombalgie-chronique': 'Lombalgie chronique',
  'coxarthrose': 'Arthrose de la hanche',
  'fibromyalgie': 'Fibromyalgie',
  'tendinopathie-coiffe': "Tendinopathie de l'épaule",
  'arthrose-digitale': 'Arthrose des mains',
  'bpco': 'BPCO',
  'asthme': 'Asthme',
  'insuffisance-veineuse': 'Insuffisance veineuse',
  'rhinosinusite-chronique': 'Rhinosinusite chronique',
  'otites-repetition-enfant': 'Otites enfant',
};

interface ProHistory {
  timepoint: string;
  pain_score: number;
  function_total: number | null;
  confidence_score: number;
  created_at: string;
}

type Step = 'token' | 'loading' | 'pro-douleur' | 'pro-koos-1' | 'pro-koos-2' | 'pro-confiance' | 'result' | 'error';

const ParcoursSuivi = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  usePageTitle('Suivi post-cure');

  const [step, setStep] = useState<Step>('token');
  const [tokenInput, setTokenInput] = useState(searchParams.get('token') || '');
  const [parcoursId, setParcoursId] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [proHistory, setProHistory] = useState<ProHistory[]>([]);

  // PRO state
  const [painScore, setPainScore] = useState<number | null>(null);
  const [koosItems, setKoosItems] = useState<(number | null)[]>(Array(7).fill(null));
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedTimepoint, setSavedTimepoint] = useState<string>('');

  const useKoosPs = useMemo(() => slug ? KOOS_PS_SLUGS.includes(slug) : false, [slug]);

  // Déterminer le prochain timepoint
  const nextTimepoint = useMemo(() => {
    const existing = proHistory.map((p) => p.timepoint);
    if (!existing.includes('T2')) return 'T2';
    if (!existing.includes('T3')) return 'T3';
    return null;
  }, [proHistory]);

  // Recherche de parcours par token
  const handleSearch = useCallback(async (tokenToSearch?: string) => {
    const token = (tokenToSearch || tokenInput).trim().toUpperCase();
    if (!token) return;

    setStep('loading');

    try {
      const parcours = await findParcoursByToken(token);
      if (!parcours || !parcours.id) {
        setStep('error');
        return;
      }

      setParcoursId(parcours.id as string);
      setSlug(parcours.slug);

      // Charger l'historique PRO
      let history: ProHistory[] = [];
      if (isSupabaseConfigured() && supabase) {
        const { data } = await supabase
          .from('parcours_pro')
          .select('timepoint, pain_score, function_total, confidence_score, created_at')
          .eq('parcours_id', parcours.id)
          .order('created_at', { ascending: true });

        if (data) {
          history = data as ProHistory[];
          setProHistory(history);
        }
      }

      // Vérifier si tous les timepoints sont déjà remplis
      const existingTimepoints = history.map((p) => p.timepoint);
      if (existingTimepoints.includes('T2') && existingTimepoints.includes('T3')) {
        setSavedTimepoint('T3');
        setStep('result');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      setStep('pro-douleur');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('[Suivi] Search failed:', e);
      setStep('error');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenInput]);

  // Auto-search si token dans l'URL
  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (urlToken) {
      setTokenInput(urlToken);
      handleSearch(urlToken);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKoosChange = (index: number, value: number) => {
    const newItems = [...koosItems];
    newItems[index] = value;
    setKoosItems(newItems);
  };

  const handleSave = async () => {
    if (!parcoursId || !nextTimepoint) return;
    setSaving(true);
    try {
      const pro: ProAssessment = {
        painScore: painScore!,
        koosPsItems: useKoosPs ? (koosItems as number[]) : [],
        koosPsTotal: useKoosPs ? calculateKoosPsScore(koosItems as number[]) : 0,
        confidenceScore: confidenceScore!,
      };
      await saveProAssessment(parcoursId, nextTimepoint as 'T2' | 'T3', pro);
      setSavedTimepoint(nextTimepoint);

      setProHistory((prev) => [...prev, {
        timepoint: nextTimepoint,
        pain_score: painScore!,
        function_total: useKoosPs ? calculateKoosPsScore(koosItems as number[]) : null,
        confidence_score: confidenceScore!,
        created_at: new Date().toISOString(),
      }]);

      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('[Suivi] Save failed:', e);
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  // Navigation PRO steps
  const allProSteps: Step[] = ['pro-douleur', 'pro-koos-1', 'pro-koos-2', 'pro-confiance'];
  const proSteps = useKoosPs ? allProSteps : allProSteps.filter((s) => !s.startsWith('pro-koos'));
  const currentProIndex = proSteps.indexOf(step as Step);

  const canNext = (): boolean => {
    switch (step) {
      case 'pro-douleur': return painScore !== null;
      case 'pro-koos-1': return koosItems.slice(0, 4).every((v) => v !== null);
      case 'pro-koos-2': return koosItems.slice(4, 7).every((v) => v !== null);
      case 'pro-confiance': return confidenceScore !== null;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step === 'pro-confiance') {
      await handleSave();
      return;
    }
    const nextIdx = currentProIndex + 1;
    if (nextIdx < proSteps.length) {
      setStep(proSteps[nextIdx]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const prevIdx = currentProIndex - 1;
    if (prevIdx >= 0) {
      setStep(proSteps[prevIdx]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Données pour le graphique de progression
  interface ChartPoint {
    timepoint: string;
    douleur: number;
    confiance: number;
    fonction?: number;
  }

  const chartData: ChartPoint[] = useMemo(() => {
    const timepointOrder = ['T0', 'T1', 'T2', 'T3'];
    const labels: Record<string, string> = { T0: 'Début cure', T1: 'Fin cure', T2: 'M+1', T3: 'M+3' };
    return timepointOrder
      .map((tp) => {
        const record = proHistory.find((p) => p.timepoint === tp);
        if (!record) return null;
        const point: ChartPoint = {
          timepoint: labels[tp] || tp,
          douleur: record.pain_score,
          confiance: record.confidence_score,
        };
        if (useKoosPs && record.function_total !== null) {
          point.fonction = record.function_total;
        }
        return point;
      })
      .filter((d): d is ChartPoint => d !== null);
  }, [proHistory, useKoosPs]);

  const koosIntro = slug ? (KOOS_PS_INTROS[slug] || KOOS_PS_INTRO_DEFAULT) : KOOS_PS_INTRO_DEFAULT;

  const renderStep = () => {
    switch (step) {
      case 'token':
        return (
          <div className="space-y-8 text-center">
            <div>
              <span className="text-5xl block mb-4">📊</span>
              <h1 className="text-2xl font-serif font-bold">Suivi post-cure</h1>
              <p className="text-lg text-muted-foreground mt-2">
                Entrez votre code personnel pour mesurer votre évolution après la cure.
              </p>
            </div>
            <div className="max-w-sm mx-auto space-y-4">
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                placeholder="ETUVE-G-XXXXXX"
                className="w-full text-center text-2xl font-mono p-4 rounded-xl border-2 border-muted focus:border-primary focus:outline-none tracking-widest"
                maxLength={20}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              <Button size="lg" className="w-full text-lg py-6 gap-2" onClick={() => handleSearch()} disabled={!tokenInput.trim()}>
                <Search className="w-5 h-5" />
                Retrouver mon parcours
              </Button>
            </div>
          </div>
        );

      case 'loading':
        return (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">Recherche en cours...</p>
          </div>
        );

      case 'error':
        return (
          <div className="space-y-6 text-center">
            <span className="text-5xl block">🔍</span>
            <h2 className="text-xl font-bold">Code non trouvé</h2>
            <p className="text-muted-foreground">Vérifiez votre code et réessayez. Il est de la forme ETUVE-G-XXXXXX.</p>
            <Button variant="outline" size="lg" onClick={() => setStep('token')} className="text-lg py-6">
              Réessayer
            </Button>
          </div>
        );

      case 'pro-douleur':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold">{nextTimepoint === 'T2' ? 'Suivi à 1 mois' : 'Suivi à 3 mois'}</h2>
              <p className="text-lg text-muted-foreground">
                Pathologie : <span className="font-semibold text-foreground">{SLUG_LABELS[slug!] || slug}</span>
              </p>
              <p className="text-base text-muted-foreground mt-1">
                {nextTimepoint === 'T2'
                  ? "1 mois après votre cure. Comment allez-vous ?"
                  : "3 mois après votre cure. Faisons le point."}
              </p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-4">En moyenne cette semaine, comment évaluez-vous votre douleur ?</p>
              <NrsScale value={painScore} onChange={setPainScore} lowLabel="0 = Aucune" highLabel="10 = Maximale" />
              {painScore !== null && (
                <div className="text-center p-4 rounded-xl bg-muted/30 mt-4">
                  <span className="text-4xl font-bold text-primary">{painScore}</span>
                  <span className="text-lg text-muted-foreground"> / 10</span>
                </div>
              )}
            </div>
          </div>
        );

      case 'pro-koos-1':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">Vos capacités (1/2)</h2>
            <p className="text-lg text-muted-foreground">{koosIntro}</p>
            {KOOS_PS_ITEMS.slice(0, 4).map((item, idx) => (
              <KoosItem key={item.id} index={idx} question={`${idx + 1}. ${item.question}`} value={koosItems[idx]} onChange={handleKoosChange} />
            ))}
          </div>
        );

      case 'pro-koos-2':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold">Vos capacités (2/2)</h2>
            {KOOS_PS_ITEMS.slice(4, 7).map((item, idx) => (
              <KoosItem key={item.id} index={idx + 4} question={`${idx + 5}. ${item.question}`} value={koosItems[idx + 4]} onChange={handleKoosChange} />
            ))}
          </div>
        );

      case 'pro-confiance':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-serif font-bold">Votre confiance</h2>
            <p className="text-lg text-muted-foreground">À quel point vous sentez-vous capable de gérer votre problème ?</p>
            <NrsScale value={confidenceScore} onChange={setConfidenceScore} lowLabel="0 = Pas du tout" highLabel="10 = Tout à fait" />
          </div>
        );

      case 'result': {
        const t0 = proHistory.find((p) => p.timepoint === 'T0');
        const latest = proHistory[proHistory.length - 1];

        return (
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-5xl block mb-2">📈</span>
              <h1 className="text-2xl font-serif font-bold">Votre évolution</h1>
              <p className="text-lg text-muted-foreground">
                {savedTimepoint === 'T2' ? 'Suivi à 1 mois enregistré' : savedTimepoint === 'T3' ? 'Suivi à 3 mois enregistré' : 'Votre progression complète'}
              </p>
            </div>

            {/* Graphique de progression */}
            {chartData.length >= 2 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-3">Votre progression</p>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="timepoint" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="douleur" name="Douleur" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="confiance" name="Confiance" stroke="#059669" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Comparaison T0 → maintenant */}
            {t0 && latest && (
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border">
                  <div>
                    <p className="text-sm text-muted-foreground">Douleur</p>
                    <p className="font-semibold">{t0.pain_score}/10 → {latest.pain_score}/10</p>
                  </div>
                  {latest.pain_score < t0.pain_score ? (
                    <span className="text-green-600 font-bold flex items-center gap-1"><TrendingDown className="w-4 h-4" /> -{t0.pain_score - latest.pain_score}</span>
                  ) : latest.pain_score > t0.pain_score ? (
                    <span className="text-red-600 font-bold flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +{latest.pain_score - t0.pain_score}</span>
                  ) : (
                    <span className="text-muted-foreground">=</span>
                  )}
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border">
                  <div>
                    <p className="text-sm text-muted-foreground">Confiance</p>
                    <p className="font-semibold">{t0.confidence_score}/10 → {latest.confidence_score}/10</p>
                  </div>
                  {latest.confidence_score > t0.confidence_score ? (
                    <span className="text-green-600 font-bold flex items-center gap-1"><TrendingUp className="w-4 h-4" /> +{latest.confidence_score - t0.confidence_score}</span>
                  ) : latest.confidence_score < t0.confidence_score ? (
                    <span className="text-red-600 font-bold flex items-center gap-1"><TrendingDown className="w-4 h-4" /> {latest.confidence_score - t0.confidence_score}</span>
                  ) : (
                    <span className="text-muted-foreground">=</span>
                  )}
                </div>
              </div>
            )}

            {/* Message */}
            <div className="p-5 rounded-xl bg-green-50 border border-green-200">
              <p className="text-lg text-green-800 font-medium">
                {t0 && latest && latest.pain_score < t0.pain_score
                  ? "Vos bénéfices se maintiennent ! Continuez vos exercices."
                  : t0 && latest && latest.confidence_score > t0.confidence_score
                    ? "Votre confiance reste élevée. C'est excellent."
                    : "Continuez vos exercices et votre routine post-cure."}
              </p>
            </div>

            {/* Prochain suivi */}
            {savedTimepoint === 'T2' && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-base text-muted-foreground">Prochain suivi dans 2 mois :</p>
                <p className="text-lg font-semibold text-primary mt-1">etuve.fr/parcours/suivi</p>
                <p className="text-sm text-muted-foreground mt-1">Avec le même code.</p>
              </div>
            )}

            {savedTimepoint === 'T3' && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-lg font-semibold text-primary">Suivi complet terminé !</p>
                <p className="text-base text-muted-foreground mt-1">Merci pour votre participation. Ces données aident à améliorer le programme.</p>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground mt-8">
              Information éducative — ne remplace pas un avis médical. Urgence : 15 / 112
            </p>
          </div>
        );
      }

      default:
        return null;
    }
  };

  const isProStep = ['pro-douleur', 'pro-koos-1', 'pro-koos-2', 'pro-confiance'].includes(step);
  const proProgress = isProStep ? Math.round(((currentProIndex + 1) / proSteps.length) * 100) : 0;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {isProStep && (
          <div className="mb-8">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${proProgress}%` }} />
            </div>
          </div>
        )}

        {renderStep()}

        {isProStep && (
          <div className="flex gap-3 mt-10">
            {currentProIndex > 0 && (
              <Button variant="outline" size="lg" onClick={handleBack} className="text-lg py-6 px-6">
                Retour
              </Button>
            )}
            <Button size="lg" onClick={handleNext} disabled={!canNext() || saving} className="flex-1 text-lg py-6 gap-2">
              {saving ? 'Enregistrement...' : step === 'pro-confiance' ? 'Voir mes résultats' : 'Suivant'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ParcoursSuivi;
