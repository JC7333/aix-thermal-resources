import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getStoredToken } from '@/lib/parcoursToken';
import { getCheckins } from '@/services/parcoursService';
import { DailyCheckin } from '@/components/parcours/DailyCheckin';
import { ParcoursTimeline } from '@/components/parcours/ParcoursTimeline';
import { ProgressBar21 } from '@/components/parcours/ProgressBar21';
import { SocialProof } from '@/components/parcours/SocialProof';
import { ParcoursQuiz } from '@/components/parcours/ParcoursQuiz';
import { MarkdownContent } from '@/components/parcours/MarkdownContent';
import { FadeIn } from '@/components/shared/FadeIn';
import { ArrowLeft, ArrowRight, BookOpen, Dumbbell, Target } from 'lucide-react';
import { isPushSupported, getPushPermission, requestPushPermission, scheduleDaily } from '@/services/pushService';
import type { ParcoursContent, ParcoursDay } from '@/content/parcours/types';

// Import dynamique par slug — ajouter les futurs parcours ici
async function loadParcours(slug: string): Promise<ParcoursContent | null> {
  try {
    switch (slug) {
      case 'gonarthrose': {
        const mod = await import('@/content/parcours/gonarthrose');
        return mod.gonarthroseParcours;
      }
      case 'lombalgie-chronique': {
        const mod = await import('@/content/parcours/lombalgie-chronique');
        return mod.lombalgieParcours;
      }
      case 'coxarthrose': {
        const mod = await import('@/content/parcours/coxarthrose');
        return mod.coxarthroseParcours;
      }
      case 'fibromyalgie': {
        const mod = await import('@/content/parcours/fibromyalgie');
        return mod.fibromyalgieParcours;
      }
      case 'tendinopathie-coiffe': {
        const mod = await import('@/content/parcours/tendinopathie-coiffe');
        return mod.tendinopathieCoiffeParcours;
      }
      case 'arthrose-digitale': {
        const mod = await import('@/content/parcours/arthrose-digitale');
        return mod.arthroseDigitaleParcours;
      }
      case 'bpco': {
        const mod = await import('@/content/parcours/bpco');
        return mod.bpcoParcours;
      }
      case 'asthme': {
        const mod = await import('@/content/parcours/asthme');
        return mod.asthmeParcours;
      }
      case 'insuffisance-veineuse': {
        const mod = await import('@/content/parcours/insuffisance-veineuse');
        return mod.insuffisanceVeineuseParcours;
      }
      case 'rhinosinusite-chronique': {
        const mod = await import('@/content/parcours/rhinosinusite-chronique');
        return mod.rhinosinusiteParcours;
      }
      case 'otites-repetition-enfant': {
        const mod = await import('@/content/parcours/otites-repetition-enfant');
        return mod.otitesEnfantParcours;
      }
      default:
        return null;
    }
  } catch {
    return null;
  }
}

const ParcoursJour = () => {
  const { slug, day: dayParam } = useParams<{ slug: string; day: string }>();
  const navigate = useNavigate();
  const dayNumber = parseInt(dayParam || '1', 10);

  const [parcours, setParcours] = useState<ParcoursContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Charger le parcours
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    loadParcours(slug).then((p) => {
      setParcours(p);
      setLoading(false);
    });
  }, [slug]);

  // Charger les check-ins existants
  useEffect(() => {
    const load = async () => {
      const stored = slug ? getStoredToken(slug) : null;
      if (stored?.parcoursId) {
        const checkins = await getCheckins(stored.parcoursId);
        setCompletedDays(checkins.map((c) => c.day_number));
      }
    };
    load();
  }, [slug]);

  // Scroll to top à chaque changement de jour
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dayNumber]);

  // Push notification scheduling
  useEffect(() => {
    if (!slug || !parcours) return;

    // Demander la permission au J2 (pas au J1 — le patient vient d'arriver)
    if (dayNumber === 2 && isPushSupported() && getPushPermission() === 'default') {
      const timer = setTimeout(() => {
        requestPushPermission();
      }, 30000);
      return () => clearTimeout(timer);
    }

    // Planifier le rappel quotidien si permission accordée — cleanup on unmount
    if (getPushPermission() === 'granted') {
      const cleanup = scheduleDaily(slug);
      return cleanup;
    }
  }, [slug, parcours, dayNumber]);

  const dayContent: ParcoursDay | undefined = parcours?.days.find((d) => d.day === dayNumber);
  const totalDays = parcours?.days.length || 21;
  const isCheckedIn = completedDays.includes(dayNumber);

  usePageTitle(dayContent ? `Jour ${dayNumber} — ${dayContent.theme}` : 'Parcours');

  // Loading
  if (loading) {
    return (
      <Layout noPadding>
        <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-20 lg:pt-24 pb-16 text-center">
          <p className="text-lg text-muted-foreground">Chargement du parcours...</p>
        </div>
      </Layout>
    );
  }

  // Parcours ou jour non trouvé
  if (!slug || !parcours || !dayContent) {
    return (
      <Layout noPadding>
        <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-20 lg:pt-24 pb-16 text-center">
          <p className="text-xl text-muted-foreground">
            {!parcours ? "Ce parcours n'est pas encore disponible." : `Le jour ${dayNumber} n'existe pas.`}
          </p>
          <Link to={slug ? `/parcours/${slug}` : '/parcours'} className="text-primary hover:underline mt-4 inline-block">
            ← Retour
          </Link>
        </div>
      </Layout>
    );
  }

  const phaseLabels = { comprendre: 'Comprendre', agir: 'Agir', consolider: 'Consolider' };
  const phaseColors = {
    comprendre: 'text-blue-600 bg-blue-50',
    agir: 'text-amber-600 bg-amber-50',
    consolider: 'text-green-600 bg-green-50',
  };

  return (
    <Layout noPadding>
      <div className="max-w-2xl mx-auto px-5 sm:px-6 pb-8">

        {/* Timeline + Progress bar + Social proof — EN HAUT */}
        <div className="pt-20 lg:pt-24 pb-2">
          <ParcoursTimeline
            slug={slug}
            totalDays={totalDays}
            currentDay={dayNumber}
            completedDays={completedDays}
          />
          <ProgressBar21 currentDay={dayNumber} totalDays={totalDays} completedDays={completedDays} />
          <SocialProof slug={slug} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/parcours/${slug}`} className="text-muted-foreground hover:text-primary text-sm">
            ← Mon parcours
          </Link>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${phaseColors[dayContent.phase]}`}>
            {phaseLabels[dayContent.phase]}
          </span>
        </div>

        {/* Day title */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground font-medium">Jour {dayNumber} sur {totalDays}</p>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-1">{dayContent.theme}</h1>
        </div>

        <div className="space-y-8">

          {/* Contenu éducatif */}
          <FadeIn>
            <section>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">{dayContent.content.title}</h2>
              </div>
              <MarkdownContent text={dayContent.content.body} />
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-base font-medium text-primary flex items-start gap-2">
                  <Target className="w-5 h-5 shrink-0 mt-0.5" />
                  {dayContent.content.keyMessage}
                </p>
              </div>
              {dayContent.content.source && (
                <p className="text-xs text-muted-foreground mt-2">Source : {dayContent.content.source}</p>
              )}
            </section>
          </FadeIn>

          {/* Action du jour */}
          <FadeIn delay={0.1}>
            <section className="p-5 rounded-xl bg-amber-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <Dumbbell className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-semibold text-amber-900">Action du jour</h2>
                {dayContent.action.duration && (
                  <span className="ml-auto text-sm font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                    {dayContent.action.duration}
                  </span>
                )}
              </div>
              <p className="text-xl font-bold text-amber-900 mb-2">{dayContent.action.title}</p>
              <p className="text-base text-amber-800 leading-relaxed">{dayContent.action.description}</p>
            </section>
          </FadeIn>

          {/* Quiz (J7, J14) */}
          {dayContent.quiz && dayContent.quiz.length > 0 && (
            <ParcoursQuiz questions={dayContent.quiz} />
          )}

          {/* Check-in quotidien */}
          {isCheckedIn ? (
            <FadeIn>
              <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-6 text-center space-y-2">
                <p className="text-2xl">🎉</p>
                <p className="text-green-800 font-semibold text-lg">Jour {dayNumber} complété !</p>
                <p className="text-green-700 text-sm">
                  {dayNumber < totalDays
                    ? 'Revenez demain pour la suite de votre programme.'
                    : 'Bravo pour ces 21 jours ! Passez maintenant à votre bilan final.'}
                </p>
              </div>
            </FadeIn>
          ) : (
            <DailyCheckin
              slug={slug}
              dayNumber={dayNumber}
              onComplete={() => setCompletedDays((prev) => [...prev, dayNumber])}
            />
          )}

          {/* Lien PRO T1 pour J21 */}
          {dayNumber === 21 && (
            <Button
              size="lg"
              className="w-full text-xl py-7 gap-3 mt-4 rounded-xl"
              onClick={() => navigate(`/parcours/${slug}/bilan`)}
            >
              Remplir mon bilan final <ArrowRight className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Navigation jour */}
        <div className="flex gap-3 mt-10">
          {dayNumber > 1 ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(`/parcours/${slug}/jour/${dayNumber - 1}`)}
              className="flex-1 text-lg py-7 gap-2 rounded-xl"
            >
              <ArrowLeft className="w-5 h-5" /> Précédent
            </Button>
          ) : (
            <div className="flex-1" />
          )}
          {dayNumber < totalDays ? (
            <Button
              size="lg"
              onClick={() => navigate(`/parcours/${slug}/jour/${dayNumber + 1}`)}
              className="flex-1 text-lg py-7 gap-2 rounded-xl"
            >
              Suivant <ArrowRight className="w-5 h-5" />
            </Button>
          ) : (
            <div className="flex-1" />
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Information éducative — ne remplace pas un avis médical. Urgence : 15 / 112
        </p>
      </div>
    </Layout>
  );
};

export default ParcoursJour;
