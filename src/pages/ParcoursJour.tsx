import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getStoredToken } from '@/lib/parcoursToken';
import { getCheckins } from '@/services/parcoursService';
import { DailyCheckin } from '@/components/parcours/DailyCheckin';
import { ParcoursTimeline } from '@/components/parcours/ParcoursTimeline';
import { ParcoursQuiz } from '@/components/parcours/ParcoursQuiz';
import { MarkdownContent } from '@/components/parcours/MarkdownContent';
import { ArrowLeft, ArrowRight, BookOpen, Dumbbell, Target } from 'lucide-react';
import type { ParcoursContent, ParcoursDay } from '@/content/parcours/types';

// Import dynamique par slug — ajouter les futurs parcours ici
async function loadParcours(slug: string): Promise<ParcoursContent | null> {
  try {
    switch (slug) {
      case 'gonarthrose': {
        const mod = await import('@/content/parcours/gonarthrose');
        return mod.gonarthroseParcours;
      }
      // Sprint 4+ : ajouter les autres pathologies ici
      // case 'lombalgie-chronique': { const mod = await import('@/content/parcours/lombalgie-chronique'); return mod.lombalgieParcours; }
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
  const [showCheckin, setShowCheckin] = useState(false);

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
    setShowCheckin(false);
  }, [dayNumber]);

  const dayContent: ParcoursDay | undefined = parcours?.days.find((d) => d.day === dayNumber);
  const totalDays = parcours?.days.length || 21;
  const isCheckedIn = completedDays.includes(dayNumber);

  usePageTitle(dayContent ? `Jour ${dayNumber} — ${dayContent.theme}` : 'Parcours');

  // Loading
  if (loading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-lg text-muted-foreground">Chargement du parcours...</p>
        </div>
      </Layout>
    );
  }

  // Parcours ou jour non trouvé
  if (!slug || !parcours || !dayContent) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
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
    <Layout>
      <div className="max-w-2xl mx-auto px-4 py-8">

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

          {/* Action du jour */}
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

          {/* Quiz (J7, J14) */}
          {dayContent.quiz && dayContent.quiz.length > 0 && (
            <ParcoursQuiz questions={dayContent.quiz} />
          )}

          {/* Check-in quotidien */}
          {isCheckedIn ? (
            <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 text-center">
              <p className="text-green-800 font-medium">Check-in du jour {dayNumber} déjà enregistré ✓</p>
            </div>
          ) : !showCheckin ? (
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowCheckin(true)}
              className="w-full text-lg py-6 gap-2 border-2"
            >
              Faire mon check-in du jour
            </Button>
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
              className="w-full text-xl py-7 gap-3 mt-4"
              onClick={() => navigate(`/parcours/${slug}/bilan`)}
            >
              Remplir mon bilan final <ArrowRight className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Timeline */}
        <div className="mt-10 pt-8 border-t">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Votre progression</h3>
          <ParcoursTimeline
            slug={slug}
            totalDays={totalDays}
            currentDay={dayNumber}
            completedDays={completedDays}
          />
        </div>

        {/* Navigation jour */}
        <div className="flex gap-3 mt-8">
          {dayNumber > 1 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate(`/parcours/${slug}/jour/${dayNumber - 1}`)}
              className="flex-1 text-lg py-6 gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> Jour {dayNumber - 1}
            </Button>
          )}
          {dayNumber < totalDays && (
            <Button
              size="lg"
              onClick={() => navigate(`/parcours/${slug}/jour/${dayNumber + 1}`)}
              className="flex-1 text-lg py-6 gap-2"
            >
              Jour {dayNumber + 1} <ArrowRight className="w-5 h-5" />
            </Button>
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
