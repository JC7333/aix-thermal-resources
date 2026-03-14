import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/shared/FadeIn';
import { usePageTitle } from '@/hooks/usePageTitle';
import { ArrowRight, ArrowLeft, Play, BarChart3, FileText, CheckCircle2 } from 'lucide-react';

// Import direct du parcours gonarthrose (contenu réel)
import { gonarthroseParcours } from '@/content/parcours/gonarthrose';

type DemoStep = 'intro' | 'bep' | 'parcours' | 'bilan' | 'dashboard';

// Données fictives pour le dashboard
const FAKE_DASHBOARD = {
  totalParcours: 47,
  completionRate: 82,
  avgPainReduction: -2.3,
  avgConfidenceGain: +1.8,
  pathologies: [
    { name: 'Gonarthrose', count: 18, painDelta: -2.5 },
    { name: 'Lombalgie', count: 12, painDelta: -2.1 },
    { name: 'BPCO', count: 8, painDelta: -1.8 },
    { name: 'Autres', count: 9, painDelta: -2.4 },
  ],
  longitudinal: [
    { timepoint: 'T0', pain: 6.4, confidence: 4.2 },
    { timepoint: 'T1', pain: 4.1, confidence: 6.0 },
    { timepoint: 'T2', pain: 4.3, confidence: 5.8 },
    { timepoint: 'T3', pain: 3.9, confidence: 6.2 },
  ],
};

// Jours à montrer dans la démo (pas les 21)
const DEMO_DAYS = [1, 7, 14, 21];

const Demo = () => {
  usePageTitle('Démo — Étuve');
  const [step, setStep] = useState<DemoStep>('intro');
  const [parcoursDay, setParcoursDay] = useState(0); // index dans DEMO_DAYS
  const [checkedDays, setCheckedDays] = useState<number[]>([]);
  const parcours = gonarthroseParcours;

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, parcoursDay]);

  const steps: DemoStep[] = ['intro', 'bep', 'parcours', 'bilan', 'dashboard'];
  const stepIndex = steps.indexOf(step);
  const stepLabels: Record<DemoStep, string> = {
    intro: 'Accueil',
    bep: 'Inscription patient',
    parcours: 'Parcours quotidien',
    bilan: 'Bilan de fin de cure',
    dashboard: 'Dashboard ARS',
  };

  const goNext = () => {
    if (step === 'parcours') {
      // Dans le parcours, avancer dans les jours démo
      if (parcoursDay < DEMO_DAYS.length - 1) {
        setParcoursDay(prev => prev + 1);
        return;
      }
    }
    const next = stepIndex + 1;
    if (next < steps.length) {
      setStep(steps[next]);
      setParcoursDay(0);
    }
  };

  const goBack = () => {
    if (step === 'parcours' && parcoursDay > 0) {
      setParcoursDay(prev => prev - 1);
      return;
    }
    const prev = stepIndex - 1;
    if (prev >= 0) {
      setStep(steps[prev]);
    }
  };

  const currentDayNum = DEMO_DAYS[parcoursDay];
  const currentDay = parcours.days.find(d => d.day === currentDayNum);

  return (
    <Layout noPadding>
      <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-20 lg:pt-24 pb-10">

        {/* Progress bar */}
        {step !== 'intro' && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>{stepLabels[step]}</span>
              <span>{stepIndex}/{steps.length - 1}</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════
            ÉTAPE 1 — INTRO
            ═══════════════════════════════════════ */}
        {step === 'intro' && (
          <FadeIn>
            <div className="text-center space-y-8 py-12">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Play className="w-8 h-8 text-primary ml-1" />
              </div>
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                  Découvrir Étuve en 2 minutes
                </h1>
                <p className="text-lg text-muted-foreground mt-3 max-w-md mx-auto">
                  Programme d'éducation thérapeutique numérique pour patients en cure thermale.
                </p>
              </div>
              <div className="space-y-3 text-left max-w-sm mx-auto">
                <div className="flex items-center gap-3 text-base">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Parcours personnalisé de 21 jours</span>
                </div>
                <div className="flex items-center gap-3 text-base">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Exercices guidés + suivi quotidien</span>
                </div>
                <div className="flex items-center gap-3 text-base">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>Bilan avant/après avec données mesurables</span>
                </div>
                <div className="flex items-center gap-3 text-base">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>11 pathologies, 100% anonyme</span>
                </div>
              </div>
              <Button
                size="lg"
                onClick={goNext}
                className="text-lg py-7 px-10 rounded-xl gap-2"
              >
                Lancer la démo <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Aucune donnée patient n'est créée pendant cette démo.
              </p>
            </div>
          </FadeIn>
        )}

        {/* ═══════════════════════════════════════
            ÉTAPE 2 — BEP SIMULÉ
            ═══════════════════════════════════════ */}
        {step === 'bep' && (
          <FadeIn>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-primary uppercase tracking-wider">Étape patient</p>
                <h2 className="font-serif text-2xl font-bold mt-1">Bilan Éducatif Partagé</h2>
                <p className="text-muted-foreground mt-2">Le patient scanne un QR code en cabine et remplit ce formulaire en 5 minutes.</p>
              </div>

              {/* Simulation écran 1 */}
              <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
                <p className="font-semibold">1. Votre situation</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">60-70 ans</span>
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">1-5 ans</span>
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">Déjà curiste</span>
                </div>
              </div>

              {/* Simulation écran 2 */}
              <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
                <p className="font-semibold">2. Objectif principal</p>
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">Moins de douleur</span>
              </div>

              {/* Simulation écran 3 — PRO T0 */}
              <div className="p-5 rounded-2xl border border-border bg-card space-y-4">
                <p className="font-semibold">3. Questionnaire PRO initial (T0)</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-red-50">
                    <p className="text-2xl font-bold text-red-600">7</p>
                    <p className="text-xs text-muted-foreground">Douleur /10</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50">
                    <p className="text-2xl font-bold text-amber-600">58</p>
                    <p className="text-xs text-muted-foreground">Fonction /100</p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50">
                    <p className="text-2xl font-bold text-blue-600">4</p>
                    <p className="text-xs text-muted-foreground">Confiance /10</p>
                  </div>
                </div>
              </div>

              {/* Token */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground">Code anonyme généré</p>
                <p className="text-xl font-mono font-bold text-primary mt-1">ETUVE-G-4K7M</p>
                <p className="text-xs text-muted-foreground mt-1">Zéro données nominatives</p>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ═══════════════════════════════════════
            ÉTAPE 3 — PARCOURS JOURS
            ═══════════════════════════════════════ */}
        {step === 'parcours' && currentDay && (
          <FadeIn key={currentDayNum}>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-primary uppercase tracking-wider">Parcours quotidien</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Le patient voit 1 contenu par jour pendant 21 jours. Voici les jours {DEMO_DAYS.join(', ')}.
                </p>
              </div>

              {/* Day header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Jour {currentDay.day} sur 21</p>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold">{currentDay.theme}</h2>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  currentDay.phase === 'comprendre' ? 'text-blue-600 bg-blue-50' :
                  currentDay.phase === 'agir' ? 'text-amber-600 bg-amber-50' :
                  'text-green-600 bg-green-50'
                }`}>
                  {currentDay.phase === 'comprendre' ? 'Comprendre' :
                   currentDay.phase === 'agir' ? 'Agir' : 'Consolider'}
                </span>
              </div>

              {/* Content preview (truncated) */}
              <div className="p-5 rounded-2xl border border-border bg-card">
                <h3 className="font-semibold mb-2">{currentDay.content.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                  {currentDay.content.body.replace(/\*\*/g, '').replace(/\n/g, ' ').slice(0, 250)}...
                </p>
                {currentDay.content.source && (
                  <p className="text-xs text-muted-foreground mt-3 italic">
                    Source : {currentDay.content.source}
                  </p>
                )}
              </div>

              {/* Key message */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-base font-medium text-primary">
                  💡 {currentDay.content.keyMessage}
                </p>
              </div>

              {/* Action */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                <p className="font-semibold text-amber-900">Action du jour</p>
                <p className="text-lg font-bold text-amber-900 mt-1">{currentDay.action.title}</p>
                {currentDay.action.duration && (
                  <span className="text-sm text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full mt-2 inline-block">
                    {currentDay.action.duration}
                  </span>
                )}
              </div>

              {/* Simulated check-in result */}
              {!checkedDays.includes(currentDayNum) ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full py-6 text-lg rounded-xl border-2"
                  onClick={() => setCheckedDays(prev => [...prev, currentDayNum])}
                >
                  Simuler le check-in du jour
                </Button>
              ) : (
                <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 text-center space-y-2">
                  <p className="text-2xl">🎉</p>
                  <p className="text-green-800 font-semibold text-lg">Jour {currentDayNum} complété !</p>
                  <p className="text-green-700 text-sm">Le patient note sa douleur et confirme l'action en 2 clics.</p>
                </div>
              )}

              {/* Quiz preview for J7/J14 */}
              {currentDay.quiz && currentDay.quiz.length > 0 && (
                <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50">
                  <p className="font-semibold text-blue-900 mb-3">Quiz du jour (3 questions)</p>
                  {currentDay.quiz.slice(0, 1).map((q, i) => (
                    <div key={i}>
                      <p className="text-sm text-blue-900">{q.question}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {q.options.map((opt, oi) => (
                          <span
                            key={oi}
                            className={`px-3 py-1.5 rounded-full text-sm ${
                              oi === q.correctIndex
                                ? 'bg-green-100 text-green-700 font-medium'
                                : 'bg-white text-muted-foreground'
                            }`}
                          >
                            {opt} {oi === q.correctIndex && '✓'}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-blue-600 mt-3">+ 2 autres questions</p>
                </div>
              )}
            </div>
          </FadeIn>
        )}

        {/* ═══════════════════════════════════════
            ÉTAPE 4 — BILAN SIMULÉ
            ═══════════════════════════════════════ */}
        {step === 'bilan' && (
          <FadeIn>
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-3xl">🎉</p>
                <h2 className="font-serif text-2xl font-bold">Bilan de fin de cure</h2>
                <p className="text-muted-foreground">Comparaison T0 (début) vs T1 (fin de cure)</p>
              </div>

              {/* Score comparisons */}
              <div className="space-y-3">
                <div className="p-4 rounded-xl border bg-card">
                  <p className="text-sm text-muted-foreground mb-1">Douleur</p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-foreground">4<span className="text-lg text-muted-foreground">/10</span></span>
                    <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      ✓ -3 vs début de cure
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border bg-card">
                  <p className="text-sm text-muted-foreground mb-1">Difficulté fonctionnelle (KOOS-PS)</p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-foreground">42<span className="text-lg text-muted-foreground">/100</span></span>
                    <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      ✓ -16 vs début de cure
                    </span>
                  </div>
                </div>
                <div className="p-4 rounded-xl border bg-card">
                  <p className="text-sm text-muted-foreground mb-1">Confiance</p>
                  <div className="flex items-end gap-3">
                    <span className="text-3xl font-bold text-foreground">7<span className="text-lg text-muted-foreground">/10</span></span>
                    <span className="text-sm font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      ✓ +3 vs début de cure
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-green-50 border border-green-200">
                <p className="text-lg text-green-800 font-medium">
                  Votre douleur a diminué de 3 points et votre confiance a augmenté de 3 points ! Continuez vos exercices.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground">Code pour le suivi post-cure</p>
                <p className="text-xl font-mono font-bold text-primary mt-1">ETUVE-G-4K7M</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Le patient refait le questionnaire à M+1 (T2) et M+3 (T3) avec ce code.
                </p>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
                <FileText className="w-6 h-6 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">PDF bilan personnalisé</p>
                  <p className="text-sm text-muted-foreground">Téléchargeable par le patient. Scores T0/T1, plan post-cure.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ═══════════════════════════════════════
            ÉTAPE 5 — DASHBOARD ARS
            ═══════════════════════════════════════ */}
        {step === 'dashboard' && (
          <FadeIn>
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm font-medium text-primary uppercase tracking-wider">Pour l'ARS et les thermes</p>
                <h2 className="font-serif text-2xl font-bold mt-1">Dashboard outcomes</h2>
                <p className="text-muted-foreground mt-2">Données agrégées anonymes. Exportable CSV pour le dossier ARS.</p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border bg-card text-center">
                  <p className="text-3xl font-bold text-foreground">{FAKE_DASHBOARD.totalParcours}</p>
                  <p className="text-xs text-muted-foreground mt-1">Parcours démarrés</p>
                </div>
                <div className="p-4 rounded-xl border bg-card text-center">
                  <p className="text-3xl font-bold text-foreground">{FAKE_DASHBOARD.completionRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Taux de complétion</p>
                </div>
                <div className="p-4 rounded-xl border bg-card text-center">
                  <p className="text-3xl font-bold text-green-600">{FAKE_DASHBOARD.avgPainReduction}</p>
                  <p className="text-xs text-muted-foreground mt-1">Douleur moyenne T0→T1</p>
                </div>
                <div className="p-4 rounded-xl border bg-card text-center">
                  <p className="text-3xl font-bold text-primary">+{FAKE_DASHBOARD.avgConfidenceGain}</p>
                  <p className="text-xs text-muted-foreground mt-1">Confiance moyenne</p>
                </div>
              </div>

              {/* By pathology */}
              <div className="p-5 rounded-2xl border bg-card">
                <p className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Par pathologie
                </p>
                <div className="space-y-2">
                  {FAKE_DASHBOARD.pathologies.map(p => (
                    <div key={p.name} className="flex items-center justify-between text-sm py-1">
                      <span className="text-foreground">{p.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{p.count} patients</span>
                        <span className="font-semibold text-green-600">{p.painDelta} pts</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Longitudinal T0-T3 */}
              <div className="p-5 rounded-2xl border bg-card">
                <p className="font-semibold mb-3">Évolution longitudinale (T0 → T3)</p>
                <div className="flex items-end justify-around h-32 px-4">
                  {FAKE_DASHBOARD.longitudinal.map((point) => (
                    <div key={point.timepoint} className="flex flex-col items-center gap-1">
                      <div className="flex items-end gap-1">
                        <div
                          className="w-5 bg-red-300 rounded-t-md"
                          style={{ height: `${point.pain * 12}px` }}
                          title={`Douleur: ${point.pain}`}
                        />
                        <div
                          className="w-5 bg-green-300 rounded-t-md"
                          style={{ height: `${point.confidence * 12}px` }}
                          title={`Confiance: ${point.confidence}`}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{point.timepoint}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-3 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-red-300 inline-block" /> Douleur
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-green-300 inline-block" /> Confiance
                  </span>
                </div>
              </div>

              {/* CTA final */}
              <div className="p-5 rounded-2xl bg-primary/5 border border-primary/20 text-center space-y-3">
                <p className="font-semibold text-foreground">Intéressé pour votre station ?</p>
                <p className="text-sm text-muted-foreground">
                  Zéro coût d'installation. Un QR code en cabine suffit. Les patients s'inscrivent seuls.
                </p>
                <p className="text-sm text-primary font-medium">contact@etuve.fr</p>
              </div>

              <p className="text-center text-xs text-muted-foreground italic">
                Données de démonstration. Les vrais résultats seront disponibles après les premiers tests patients.
              </p>
            </div>
          </FadeIn>
        )}

        {/* ═══════════════════════════════════════
            NAVIGATION
            ═══════════════════════════════════════ */}
        {step !== 'intro' && (
          <div className="flex gap-3 mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={goBack}
              className="text-lg py-7 px-6 gap-2 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" /> Retour
            </Button>
            {step !== 'dashboard' && (
              <Button
                size="lg"
                onClick={goNext}
                className="flex-1 text-lg py-7 gap-2 rounded-xl"
              >
                Suivant <ArrowRight className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Mode démonstration — aucune donnée patient n'est créée ni stockée.
        </p>
      </div>
    </Layout>
  );
};

export default Demo;
