import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { generateToken, saveToken } from '@/lib/parcoursToken';
import { createParcours, saveProAssessment } from '@/services/parcoursService';
import { KOOS_PS_ITEMS, KOOS_PS_LEVELS, KOOS_PS_INTROS, KOOS_PS_INTRO_DEFAULT, calculateKoosPsScore, KOOS_PS_SLUGS } from '@/content/parcours/koosPs';
import type { BepData, ProAssessment } from '@/content/parcours/types';
import { ArrowRight, ArrowLeft, Copy, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Step =
  | 'age' | 'duration' | 'previous-cure' | 'goal' | 'free-text'
  | 'pro-douleur' | 'pro-koos-1' | 'pro-koos-2' | 'pro-confiance'
  | 'result';

const ParcoursBep = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  usePageTitle('Bilan éducatif');

  // Navigation
  const [step, setStep] = useState<Step>('age');

  // BEP state — 1 variable par écran
  const [ageRange, setAgeRange] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [previousCure, setPreviousCure] = useState<boolean | null>(null);
  const [mainGoal, setMainGoal] = useState<string>('');
  const [freeText, setFreeText] = useState<string>('');

  // PRO state
  const [painScore, setPainScore] = useState<number | null>(null);
  const [koosItems, setKoosItems] = useState<(number | null)[]>(Array(7).fill(null));
  const [confidenceScore, setConfidenceScore] = useState<number | null>(null);

  // Result state
  const [token, setToken] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!slug) return null;

  const useKoosPs = KOOS_PS_SLUGS.includes(slug);

  // ============================================
  // NAVIGATION — 10 étapes, 1 question par écran
  // ============================================

  const allSteps: Step[] = [
    'age', 'duration', 'previous-cure', 'goal', 'free-text',
    'pro-douleur', 'pro-koos-1', 'pro-koos-2', 'pro-confiance',
    'result',
  ];
  const steps = useKoosPs ? allSteps : allSteps.filter(s => !s.startsWith('pro-koos'));
  const currentIndex = steps.indexOf(step);
  const progress = Math.round((currentIndex / (steps.length - 1)) * 100);

  const canNext = (): boolean => {
    switch (step) {
      case 'age': return !!ageRange;
      case 'duration': return !!duration;
      case 'previous-cure': return previousCure !== null;
      case 'goal': return !!mainGoal;
      case 'free-text': return true; // Optionnel
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

  // ============================================
  // SAVE
  // ============================================

  const handleSave = async () => {
    setSaving(true);
    try {
      const newToken = generateToken(slug);
      const bepData: BepData = {
        ageRange,
        duration,
        previousCure: previousCure!,
        mainGoal,
        freeText: freeText || undefined,
      };

      const parcoursId = await createParcours(newToken, slug, bepData);

      if (parcoursId) {
        const pro: ProAssessment = {
          painScore: painScore!,
          koosPsItems: useKoosPs ? (koosItems as number[]) : [],
          koosPsTotal: useKoosPs ? calculateKoosPsScore(koosItems as number[]) : 0,
          confidenceScore: confidenceScore!,
        };
        await saveProAssessment(parcoursId, 'T0', pro);
        saveToken(newToken, slug, parcoursId);
      } else {
        // Fallback : sauvegarder le token même sans parcoursId Supabase
        saveToken(newToken, slug, 'local');
      }

      setToken(newToken);
      setStep('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('[BEP] Save failed:', e);
      toast({ title: 'Erreur', description: 'Impossible de sauvegarder. Veuillez réessayer.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const copyToken = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    toast({ title: 'Code copié !' });
    setTimeout(() => setCopied(false), 2000);
  };

  // ============================================
  // COMPOSANTS PARTAGÉS (UX SENIORS)
  // ============================================

  /** Gros boutons pleine largeur — 1 choix par bouton */
  const BigChoice = ({ options, value, onChange }: {
    options: { value: string; label: string; desc?: string }[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="grid gap-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`w-full text-left p-5 rounded-xl border-2 transition-all text-lg
            ${value === opt.value
              ? 'border-primary bg-primary/5 shadow-md'
              : 'border-muted hover:border-primary/50'
            }`}
        >
          <span className="font-semibold">{opt.label}</span>
          {opt.desc && <span className="block text-base text-muted-foreground mt-1">{opt.desc}</span>}
        </button>
      ))}
    </div>
  );

  /** Échelle NRS 0-10 avec gros boutons */
  const NrsScale = ({ value, onChange, lowLabel, highLabel }: {
    value: number | null;
    onChange: (v: number) => void;
    lowLabel: string;
    highLabel: string;
  }) => (
    <div>
      <div className="flex justify-between mb-2 text-sm text-muted-foreground">
        <span>{lowLabel}</span>
        <span>{highLabel}</span>
      </div>
      <div className="grid grid-cols-11 gap-1.5">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`aspect-square rounded-xl text-xl font-bold transition-all flex items-center justify-center min-h-[48px]
              ${value === i
                ? 'bg-primary text-white scale-110 shadow-lg'
                : 'bg-muted hover:bg-muted/80 text-foreground'
              }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );

  /**
   * Item KOOS-PS — boutons VERTICAUX pleine largeur.
   * Pas de grille horizontale (trop petit pour des seniors avec arthrose des doigts).
   */
  const KoosItem = ({ index, question }: { index: number; question: string }) => (
    <div className="space-y-2 pb-4 border-b border-muted last:border-0">
      <p className="text-lg font-semibold">{question}</p>
      <div className="grid gap-2">
        {KOOS_PS_LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => {
              const newItems = [...koosItems];
              newItems[index] = level.value;
              setKoosItems(newItems);
            }}
            className={`w-full py-4 px-5 rounded-xl text-base font-semibold transition-all border-2 text-left
              ${koosItems[index] === level.value
                ? `${level.color} border-current shadow-md`
                : 'bg-muted/20 border-muted text-muted-foreground hover:border-primary/30'
              }`}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );

  // ============================================
  // RENDER PAR ÉTAPE (1 question par écran)
  // ============================================

  const koosIntro = KOOS_PS_INTROS[slug] || KOOS_PS_INTRO_DEFAULT;

  const renderStep = () => {
    switch (step) {
      case 'age':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Votre tranche d'âge</h2>
              <p className="text-lg text-muted-foreground">Cette information aide à personnaliser votre programme.</p>
            </div>
            <BigChoice
              options={[
                { value: '<50', label: 'Moins de 50 ans' },
                { value: '50-60', label: '50 à 60 ans' },
                { value: '60-70', label: '60 à 70 ans' },
                { value: '70-80', label: '70 à 80 ans' },
                { value: '>80', label: 'Plus de 80 ans' },
              ]}
              value={ageRange}
              onChange={setAgeRange}
            />
          </div>
        );

      case 'duration':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Depuis combien de temps ?</h2>
              <p className="text-lg text-muted-foreground">Depuis combien de temps avez-vous ce problème ?</p>
            </div>
            <BigChoice
              options={[
                { value: '<1', label: "Moins d'un an" },
                { value: '1-5', label: '1 à 5 ans' },
                { value: '>5', label: 'Plus de 5 ans' },
              ]}
              value={duration}
              onChange={setDuration}
            />
          </div>
        );

      case 'previous-cure':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Cure thermale</h2>
              <p className="text-lg text-muted-foreground">Avez-vous déjà fait une cure thermale pour ce problème ?</p>
            </div>
            <BigChoice
              options={[
                { value: 'oui', label: 'Oui, déjà une ou plusieurs cures' },
                { value: 'non', label: "Non, c'est ma première" },
              ]}
              value={previousCure === null ? '' : previousCure ? 'oui' : 'non'}
              onChange={(v) => setPreviousCure(v === 'oui')}
            />
          </div>
        );

      case 'goal':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Votre objectif principal</h2>
              <p className="text-lg text-muted-foreground">Qu'est-ce qui compte le plus pour vous ?</p>
            </div>
            <BigChoice
              options={[
                { value: 'moins-douleur', label: 'Moins de douleur', desc: 'Réduire mes douleurs au quotidien' },
                { value: 'mieux-bouger', label: 'Mieux bouger', desc: 'Retrouver de la mobilité et de la souplesse' },
                { value: 'reprendre-activite', label: 'Reprendre une activité', desc: 'Marche, sport, jardinage...' },
                { value: 'comprendre', label: 'Mieux comprendre ma maladie', desc: 'Savoir ce qui aide vraiment' },
                { value: 'mieux-dormir', label: 'Mieux dormir', desc: 'Réduire les douleurs nocturnes' },
              ]}
              value={mainGoal}
              onChange={setMainGoal}
            />
          </div>
        );

      case 'free-text':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">En quelques mots...</h2>
              <p className="text-lg text-muted-foreground">
                Qu'est-ce qui vous gêne le plus au quotidien ?
                <span className="block text-base mt-1">(Facultatif — vous pouvez passer cette étape)</span>
              </p>
            </div>
            <textarea
              value={freeText}
              onChange={(e) => setFreeText(e.target.value)}
              placeholder="Par exemple : monter les escaliers, jardiner, dormir..."
              className="w-full p-4 rounded-xl border-2 border-muted text-lg min-h-[120px] resize-none focus:border-primary focus:outline-none"
              maxLength={500}
            />
          </div>
        );

      case 'pro-douleur':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Votre douleur</h2>
              <p className="text-lg text-muted-foreground">En moyenne cette semaine, comment évaluez-vous votre douleur ?</p>
            </div>
            <NrsScale
              value={painScore}
              onChange={setPainScore}
              lowLabel="0 = Aucune douleur"
              highLabel="10 = Douleur maximale"
            />
            {painScore !== null && (
              <div className="text-center p-4 rounded-xl bg-muted/30">
                <span className="text-4xl font-bold text-primary">{painScore}</span>
                <span className="text-lg text-muted-foreground ml-2">/ 10</span>
              </div>
            )}
          </div>
        );

      case 'pro-koos-1':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Vos capacités (1/2)</h2>
              <p className="text-lg text-muted-foreground">{koosIntro}</p>
            </div>
            {KOOS_PS_ITEMS.slice(0, 4).map((item, idx) => (
              <KoosItem key={item.id} index={idx} question={`${idx + 1}. ${item.question}`} />
            ))}
          </div>
        );

      case 'pro-koos-2':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Vos capacités (2/2)</h2>
              <p className="text-lg text-muted-foreground">Continuez à évaluer vos difficultés.</p>
            </div>
            {KOOS_PS_ITEMS.slice(4, 7).map((item, idx) => (
              <KoosItem key={item.id} index={idx + 4} question={`${idx + 5}. ${item.question}`} />
            ))}
          </div>
        );

      case 'pro-confiance':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Votre confiance</h2>
              <p className="text-lg text-muted-foreground">
                À quel point vous sentez-vous capable de gérer votre problème au quotidien ?
              </p>
            </div>
            <NrsScale
              value={confidenceScore}
              onChange={setConfidenceScore}
              lowLabel="0 = Pas du tout capable"
              highLabel="10 = Tout à fait capable"
            />
            {confidenceScore !== null && (
              <div className="text-center p-4 rounded-xl bg-muted/30">
                <span className="text-4xl font-bold text-primary">{confidenceScore}</span>
                <span className="text-lg text-muted-foreground ml-2">/ 10</span>
              </div>
            )}
          </div>
        );

      case 'result':
        return (
          <div className="space-y-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
            <div>
              <h2 className="text-2xl font-serif font-bold mb-2">Votre profil de départ</h2>
              <p className="text-lg text-muted-foreground">Voici vos scores initiaux. Vous les comparerez en fin de cure.</p>
            </div>

            {/* Scores */}
            <div className={`grid ${useKoosPs ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-medium">Douleur</p>
                <p className="text-3xl font-bold text-red-700">{painScore}<span className="text-lg">/10</span></p>
              </div>
              {useKoosPs && (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-sm text-blue-600 font-medium">Fonction</p>
                  <p className="text-3xl font-bold text-blue-700">{calculateKoosPsScore(koosItems as number[])}<span className="text-lg">/100</span></p>
                </div>
              )}
              <div className="p-4 rounded-xl bg-green-50 border border-green-200">
                <p className="text-sm text-green-600 font-medium">Confiance</p>
                <p className="text-3xl font-bold text-green-700">{confidenceScore}<span className="text-lg">/10</span></p>
              </div>
            </div>

            {/* Token */}
            <div className="p-6 rounded-xl bg-primary/5 border-2 border-primary/20">
              <p className="text-lg font-semibold text-foreground mb-2">Votre code personnel</p>
              <p className="text-3xl font-mono font-bold text-primary mb-3">{token}</p>
              <p className="text-base text-muted-foreground mb-4">
                Notez ce code ! Il vous permettra de retrouver votre parcours et vos résultats.
              </p>
              <Button variant="outline" size="lg" onClick={copyToken} className="gap-2 text-lg">
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                {copied ? 'Copié !' : 'Copier le code'}
              </Button>
            </div>

            {/* CTA */}
            <Button size="lg" className="w-full text-xl py-7 gap-3" onClick={() => navigate(`/parcours/${slug}/jour/1`)}>
              Commencer mon programme <ArrowRight className="w-6 h-6" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  // ============================================
  // LAYOUT
  // ============================================

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress bar */}
        {step !== 'result' && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Bilan éducatif</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        {renderStep()}

        {/* Navigation */}
        {step !== 'result' && (
          <div className="flex gap-3 mt-10">
            {currentIndex > 0 && (
              <Button variant="outline" size="lg" onClick={handleBack} className="text-lg py-6 px-6 gap-2">
                <ArrowLeft className="w-5 h-5" /> Retour
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

export default ParcoursBep;
