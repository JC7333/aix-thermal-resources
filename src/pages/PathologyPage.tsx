import { useState, useCallback } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Clock, AlertTriangle, Printer, BookOpen, Shield, ExternalLink, Award, Calendar, ChevronRight, Target, RotateCcw, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';
import { FavoriteButton } from '@/components/shared/FavoriteButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { getEvidenceBySlug, getAllEvidence, hasPrograms } from '@/data/evidence';
import { usePdfPreload } from '@/hooks/usePdfPreload';
import { useProgramProgress } from '@/hooks/useProgramProgress';
import { useToast } from '@/hooks/use-toast';
import { useSeniorMode } from '@/hooks/useSeniorMode';

// Niveau de preuve → badge couleur
const evidenceBadge = (level: string) => {
  if (level.toLowerCase().includes('élevé')) {
    return 'bg-green-100 text-green-700 border-green-200';
  }
  if (level.toLowerCase().includes('modéré')) {
    return 'bg-amber-100 text-amber-700 border-amber-200';
  }
  return 'bg-muted text-muted-foreground border-border';
};

const categoryLabels: Record<string, string> = {
  'rhumatologie': 'Rhumatologie',
  'veino-lymphatique': 'Veino-lymphatique',
  'orl-respiratoire': 'ORL & Respiratoire',
};

const PathologyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedLevel, setSelectedLevel] = useState<0 | 1 | 2>(0);
  const { toast } = useToast();
  const { seniorMode, titleClass, subtitleClass, textClass, smallTextClass, buttonSize, iconSize, iconSizeLg, cardClass, cardPadding, badgeClass } = useSeniorMode();
  
  // Données evidence-based (source unique)
  const evidence = slug ? getEvidenceBySlug(slug) : undefined;
  
  // Préchargement des PDFs en arrière-plan après 2 secondes
  usePdfPreload(slug, { delay: 2000 });

  // Hook de progression pour le plan 7 jours
  const { 
    isCompleted, 
    toggleAction, 
    getProgressPercent, 
    resetProgress,
    getDayCompletedCount,
    // Programme 8 semaines
    isWeekExerciseCompleted,
    toggleWeekExercise,
    getWeeklyProgressPercent,
    resetWeeklyProgress,
    getWeekCompletedCount,
  } = useProgramProgress(slug || '', selectedLevel);

  // Messages de félicitations variés
  const congratsMessages = [
    { title: "🎉 Bravo !", description: "Journée complétée avec succès !" },
    { title: "⭐ Excellent !", description: "Vous avez terminé cette journée !" },
    { title: "🌟 Super !", description: "Une journée de plus vers vos objectifs !" },
    { title: "💪 Bien joué !", description: "Continuez sur cette lancée !" },
  ];

  const weekCongratsMessages = [
    { title: "🏆 Félicitations !", description: "Semaine complétée avec brio !" },
    { title: "🎊 Incroyable !", description: "Une semaine entière terminée !" },
    { title: "🌈 Fantastique !", description: "Vous progressez magnifiquement !" },
    { title: "🚀 Extraordinaire !", description: "Continuez, vous êtes sur la bonne voie !" },
  ];

  // Handler pour toggle action avec notification
  const handleToggleAction = useCallback((dayIndex: number, actionIndex: number, totalActions: number, dayName: string) => {
    const wasCompleted = isCompleted(dayIndex, actionIndex);
    const currentCount = getDayCompletedCount(dayIndex, totalActions);
    
    // Si on va compléter la dernière action du jour
    if (!wasCompleted && currentCount === totalActions - 1) {
      const randomMsg = congratsMessages[Math.floor(Math.random() * congratsMessages.length)];
      setTimeout(() => {
        toast({
          title: randomMsg.title,
          description: `${dayName} terminé ! ${randomMsg.description}`,
          className: "animate-scale-in bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30",
        });
      }, 150);
    }
    
    toggleAction(dayIndex, actionIndex);
  }, [isCompleted, getDayCompletedCount, toggleAction, toast]);

  // Handler pour toggle exercice semaine avec notification
  const handleToggleWeekExercise = useCallback((weekIndex: number, exIndex: number, totalExercises: number, weekName: string) => {
    const wasCompleted = isWeekExerciseCompleted(weekIndex, exIndex);
    const currentCount = getWeekCompletedCount(weekIndex, totalExercises);
    
    // Si on va compléter le dernier exercice de la semaine
    if (!wasCompleted && currentCount === totalExercises - 1) {
      const randomMsg = weekCongratsMessages[Math.floor(Math.random() * weekCongratsMessages.length)];
      setTimeout(() => {
        toast({
          title: randomMsg.title,
          description: `${weekName} terminée ! ${randomMsg.description}`,
          className: "animate-scale-in bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30",
        });
      }, 150);
    }
    
    toggleWeekExercise(weekIndex, exIndex);
  }, [isWeekExerciseCompleted, getWeekCompletedCount, toggleWeekExercise, toast]);

  if (!evidence) {
    return <Navigate to="/pathologies" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  // Programmes disponibles
  const hasProgramsAvailable = hasPrograms(slug || '');
  const selectedSevenDayPlan = evidence.sevenDayPlans?.find(p => p.level === selectedLevel) || evidence.sevenDayPlans?.[0];
  const selectedEightWeekProgram = evidence.eightWeekPrograms?.find(p => p.level === selectedLevel) || evidence.eightWeekPrograms?.[0];

  // Calcul de la progression 7 jours
  const actionsPerDay = selectedSevenDayPlan?.days.map(d => d.actions.length) || [];
  const progressPercent = getProgressPercent(selectedSevenDayPlan?.days.length || 0, actionsPerDay);

  // Calcul de la progression 8 semaines
  const exercisesPerWeek = selectedEightWeekProgram?.weeks.map(w => w.exercises.length) || [];
  const weeklyProgressPercent = getWeeklyProgressPercent(exercisesPerWeek);

  // Autres pathologies de la même catégorie
  const allEvidence = getAllEvidence();
  const relatedPathologies = allEvidence
    .filter(e => e.category === evidence.category && e.slug !== evidence.slug)
    .slice(0, 3);

  // Niveaux disponibles
  const availableLevels = new Set<number>();
  evidence.sevenDayPlans?.forEach(p => availableLevels.add(p.level));
  evidence.eightWeekPrograms?.forEach(p => availableLevels.add(p.level));
  const sortedLevels = Array.from(availableLevels).sort() as (0 | 1 | 2)[];

  const levelLabels: Record<number, string> = {
    0: 'Très facile',
    1: 'Facile',
    2: 'Normal',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 print:py-2 print:px-2">
        <div className="no-print">
          <Breadcrumb
            items={[
              { label: 'Pathologies', href: '/pathologies' },
              { label: categoryLabels[evidence.category] },
              { label: evidence.name },
            ]}
          />
        </div>

        {/* Header */}
        <header className={seniorMode ? 'mb-10 lg:mb-14 print:mb-4' : 'mb-8 lg:mb-10 print:mb-4'}>
          <div className="flex flex-wrap items-center gap-3 mb-4 no-print">
            <span className={`font-medium rounded-full bg-primary/10 text-primary ${badgeClass}`}>
              {categoryLabels[evidence.category]}
            </span>
            <span className={`font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1 ${badgeClass}`}>
              <Shield className={seniorMode ? 'w-4 h-4' : 'w-3 h-3'} />
              Evidence-based
            </span>
            <span className={`flex items-center gap-1.5 text-muted-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>
              <Clock className={iconSize} />
              {evidence.readingTime} min
            </span>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <span className={seniorMode ? 'text-5xl' : 'text-4xl'}>{evidence.icon}</span>
            <h1 className={`${titleClass} print:text-2xl`}>
              {evidence.name}
            </h1>
          </div>

          <div className={`flex flex-wrap items-center gap-3 no-print ${seniorMode ? 'mt-8' : 'mt-6'}`}>
            <Button onClick={handlePrint} variant="pdf" size={buttonSize}>
              <Printer className={iconSize} />
              Imprimer cette fiche
            </Button>
            {slug && (
              <>
                <PdfDownloadButtons slug={slug} />
                <FavoriteButton slug={slug} />
              </>
            )}
          </div>
        </header>

        {/* Print header */}
        <div className="hidden print:block mb-4 pb-2 border-b-2 border-primary">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-primary">{evidence.name}</h1>
              <p className="text-xs text-muted-foreground">Dr Audric Bugnard — Médecin thermaliste — Aix-les-Bains</p>
            </div>
            <p className="text-xs text-muted-foreground text-right">Mise à jour : {evidence.lastUpdated}</p>
          </div>
        </div>

        {/* Onglets Informations / Programme */}
        <Tabs defaultValue="informations" className={seniorMode ? 'no-print mb-10' : 'no-print mb-8'}>
          <TabsList className={`grid w-full max-w-md grid-cols-2 ${seniorMode ? 'mb-10 h-14' : 'mb-8'}`}>
            <TabsTrigger value="informations" className={seniorMode ? 'text-lg py-3' : 'text-sm'}>
              📋 Informations
            </TabsTrigger>
            <TabsTrigger value="programme" className={seniorMode ? 'text-lg py-3' : 'text-sm'} disabled={!hasProgramsAvailable}>
              🎯 Programme
              {!hasProgramsAvailable && <span className="ml-1 text-xs opacity-50">(bientôt)</span>}
            </TabsTrigger>
          </TabsList>

          {/* Onglet Informations */}
          <TabsContent value="informations">
            <div className={seniorMode ? 'grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14' : 'grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'}>
              {/* Main Content */}
              <div className={seniorMode ? 'lg:col-span-2 space-y-12' : 'lg:col-span-2 space-y-10'}>
                
                {/* Section 1: Résumé 2 minutes */}
                <section id="resume">
                  <h2 className={`${subtitleClass} text-foreground mb-4 flex items-center gap-3`}>
                    <span className={`rounded-lg bg-primary/10 flex items-center justify-center text-primary ${seniorMode ? 'w-12 h-12 text-xl' : 'w-10 h-10 text-lg'}`}>
                      ⏱️
                    </span>
                    En 2 minutes
                  </h2>
                  <div className={`bg-primary/5 border border-primary/20 rounded-xl ${seniorMode ? 'p-8' : 'p-6'}`}>
                    <p className={`${textClass} text-foreground leading-relaxed whitespace-pre-line`}>
                      {evidence.summary}
                    </p>
                  </div>
                </section>

                {/* Section 2: Recommandations Evidence-Based */}
                {evidence.recommendations.length > 0 && (
                  <section id="recommandations">
                    <h2 className={`${subtitleClass} text-foreground mb-6 flex items-center gap-3`}>
                      <span className={`rounded-lg bg-green-100 flex items-center justify-center text-green-700 ${seniorMode ? 'w-12 h-12' : 'w-10 h-10 text-lg'}`}>
                        <Award className={iconSizeLg} />
                      </span>
                      Ce qui aide vraiment (non médicamenteux)
                    </h2>
                    
                    <div className={seniorMode ? 'space-y-4' : 'space-y-3'}>
                      {evidence.recommendations.map((rec, index) => (
                        <div key={index} className={`flex items-start gap-4 bg-card border border-border rounded-xl ${seniorMode ? 'p-5' : 'p-4'}`}>
                          <div className={`rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0 ${seniorMode ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm'}`}>
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className={`${textClass} text-foreground mb-2`}>
                              {rec.text}
                            </p>
                            <span className={`inline-block rounded-full border ${evidenceBadge(rec.evidence)} ${badgeClass}`}>
                              {rec.evidence}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Section 3: Red Flags (mobile) */}
                {evidence.red_flags.length > 0 && (
                  <section id="red-flags" className="lg:hidden">
                    <h2 className={`${subtitleClass} text-destructive mb-4 flex items-center gap-3`}>
                      <span className={`rounded-lg bg-destructive/10 flex items-center justify-center text-destructive ${seniorMode ? 'w-12 h-12' : 'w-10 h-10 text-lg'}`}>
                        <AlertTriangle className={iconSizeLg} />
                      </span>
                      Quand consulter rapidement
                    </h2>
                    <div className={`bg-destructive/5 border border-destructive/20 rounded-xl ${seniorMode ? 'p-8' : 'p-6'}`}>
                      <ul className={seniorMode ? 'space-y-3' : 'space-y-2'}>
                        {evidence.red_flags.map((alert, index) => (
                          <li key={index} className={`flex items-start gap-2 text-destructive ${seniorMode ? 'text-lg' : 'text-sm'}`}>
                            <span className="font-bold">⚠️</span>
                            {alert}
                          </li>
                        ))}
                      </ul>
                      <p className={`mt-4 text-muted-foreground ${smallTextClass}`}>
                        Ces signes nécessitent un avis médical rapide. En cas d'urgence : 15 / 112.
                      </p>
                    </div>
                  </section>
                )}

                {/* Section 4: Sources (mobile) */}
                {evidence.sources.length > 0 && (
                  <section id="sources" className="lg:hidden">
                    <h2 className={`${subtitleClass} text-foreground mb-4 flex items-center gap-3`}>
                      <span className={`rounded-lg bg-muted flex items-center justify-center text-primary ${seniorMode ? 'w-12 h-12' : 'w-10 h-10 text-lg'}`}>
                        <BookOpen className={iconSizeLg} />
                      </span>
                      Sources scientifiques
                    </h2>
                    <div className={`bg-muted/50 border border-border rounded-xl ${seniorMode ? 'p-8' : 'p-6'}`}>
                      <ul className={seniorMode ? 'space-y-4' : 'space-y-3'}>
                        {evidence.sources.map((source, index) => (
                          <li key={index} className={seniorMode ? 'text-base' : 'text-sm'}>
                            <div className="font-medium text-foreground">{source.title}</div>
                            <div className={`text-muted-foreground flex items-center justify-between flex-wrap gap-2 ${smallTextClass}`}>
                              <span>{source.org}, {source.year}</span>
                              {source.url && (
                                <a 
                                  href={source.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center gap-1"
                                >
                                  Lire <ExternalLink className={seniorMode ? 'w-4 h-4' : 'w-3 h-3'} />
                                </a>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}

                {/* Date de mise à jour */}
                <div className={`flex items-center gap-2 text-muted-foreground pt-4 border-t border-border ${smallTextClass}`}>
                  <Calendar className={iconSize} />
                  <span>Dernière mise à jour : {evidence.lastUpdated}</span>
                </div>
              </div>

              {/* Sidebar */}
              <aside className={seniorMode ? 'space-y-8' : 'space-y-6'}>
                {/* Red Flags (desktop sidebar) */}
                {evidence.red_flags.length > 0 && (
                  <div className={`${cardClass} bg-destructive/5 border-destructive/20 hidden lg:block ${cardPadding}`}>
                    <h3 className={`font-serif font-bold text-destructive mb-4 flex items-center gap-2 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                      <AlertTriangle className={iconSize} />
                      Quand consulter rapidement
                    </h3>
                    <ul className={seniorMode ? 'space-y-3' : 'space-y-2'}>
                      {evidence.red_flags.map((alert, index) => (
                        <li key={index} className={`flex items-start gap-2 text-destructive ${seniorMode ? 'text-base' : 'text-sm'}`}>
                          <span className="font-bold">⚠️</span>
                          {alert}
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-4 text-muted-foreground ${smallTextClass}`}>
                      Ces signes nécessitent un avis médical rapide. En cas d'urgence : 15 / 112.
                    </p>
                  </div>
                )}

                {/* Sources (desktop sidebar) */}
                {evidence.sources.length > 0 && (
                  <div className={`${cardClass} bg-muted/50 hidden lg:block ${cardPadding}`}>
                    <h3 className={`font-serif font-bold text-foreground mb-4 flex items-center gap-2 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                      <BookOpen className={`${iconSize} text-primary`} />
                      Sources scientifiques
                    </h3>
                    <ul className={seniorMode ? 'space-y-4' : 'space-y-3'}>
                      {evidence.sources.map((source, index) => (
                        <li key={index} className={seniorMode ? 'text-base' : 'text-sm'}>
                          <div className="font-medium text-foreground">{source.title}</div>
                          <div className={`text-muted-foreground flex items-center justify-between ${smallTextClass}`}>
                            <span>{source.org}, {source.year}</span>
                            {source.url && (
                              <a 
                                href={source.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                Lire <ExternalLink className={seniorMode ? 'w-4 h-4' : 'w-3 h-3'} />
                              </a>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className={`mt-4 text-muted-foreground ${smallTextClass}`}>
                      Dernière mise à jour : {evidence.lastUpdated}
                    </p>
                  </div>
                )}

                {/* PDF Download Card */}
                {slug && (
                  <PdfDownloadButtons slug={slug} variant="card" />
                )}

                {/* Medical Disclaimer */}
                <MedicalDisclaimer variant="compact" />

                {/* Navigation rapide */}
                <div className={`${cardClass} ${cardPadding}`}>
                  <h3 className={`font-serif font-bold text-foreground mb-4 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                    Sur cette page
                  </h3>
                  <nav className={`space-y-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                    <a href="#resume" className="block text-muted-foreground hover:text-primary transition-colors">
                      → En 2 minutes
                    </a>
                    <a href="#recommandations" className="block text-muted-foreground hover:text-primary transition-colors">
                      → Ce qui aide vraiment
                    </a>
                    <a href="#red-flags" className="block text-muted-foreground hover:text-primary transition-colors">
                      → Quand consulter
                    </a>
                    <a href="#sources" className="block text-muted-foreground hover:text-primary transition-colors">
                      → Sources
                    </a>
                  </nav>
                </div>

                {/* Autres pathologies */}
                {relatedPathologies.length > 0 && (
                  <div className={`${cardClass} ${cardPadding}`}>
                    <h3 className={`font-serif font-bold text-foreground mb-4 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                      Voir aussi
                    </h3>
                    <div className={seniorMode ? 'space-y-3' : 'space-y-2'}>
                      {relatedPathologies.map((related) => (
                        <Link 
                          key={related.slug}
                          to={`/pathologies/${related.slug}`} 
                          className={`flex items-center gap-2 text-primary hover:underline ${seniorMode ? 'text-base' : 'text-sm'}`}
                        >
                          <span>{related.icon}</span>
                          {related.name}
                          <ChevronRight className={seniorMode ? 'w-4 h-4' : 'w-3 h-3'} />
                        </Link>
                      ))}
                      <Link 
                        to="/pathologies" 
                        className={`block text-muted-foreground hover:text-primary mt-3 pt-2 border-t border-border ${seniorMode ? 'text-base' : 'text-sm'}`}
                      >
                        → Toutes les pathologies
                      </Link>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </TabsContent>

          {/* Onglet Programme */}
          <TabsContent value="programme">
            <div className={seniorMode ? 'space-y-10' : 'space-y-8'}>
              {/* Sélecteur de niveau */}
              {sortedLevels.length > 1 && (
                <div className={`bg-muted/50 rounded-xl border border-border ${seniorMode ? 'p-8' : 'p-6'}`}>
                  <h3 className={`font-serif font-bold text-foreground mb-4 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                    Choisissez votre niveau
                  </h3>
                  <div className={seniorMode ? 'flex flex-wrap gap-3' : 'flex flex-wrap gap-2'}>
                    {sortedLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`rounded-lg font-medium transition-colors ${
                          selectedLevel === level
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border border-border hover:border-primary/50'
                        } ${seniorMode ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-sm'}`}
                      >
                        {levelLabels[level]}
                      </button>
                    ))}
                  </div>
                  <p className={`text-muted-foreground mt-3 ${smallTextClass}`}>
                    {selectedLevel === 0 && "Pour les personnes très limitées, en poussée, ou qui reprennent après une longue pause."}
                    {selectedLevel === 1 && "Pour une progression douce et régulière, sans forcer."}
                    {selectedLevel === 2 && "Pour les personnes actives qui veulent maintenir leur forme."}
                  </p>
                </div>
              )}

              {/* Plan 7 jours */}
              {selectedSevenDayPlan && (
                <section>
                  <div className={`flex flex-wrap items-center justify-between gap-4 ${seniorMode ? 'mb-8' : 'mb-6'}`}>
                    <h2 className={`${subtitleClass} text-foreground flex items-center gap-3`}>
                      <span className={`rounded-lg bg-secondary/20 flex items-center justify-center text-secondary ${seniorMode ? 'w-12 h-12' : 'w-10 h-10 text-lg'}`}>
                        <Calendar className={iconSizeLg} />
                      </span>
                      Plan 7 jours — {selectedSevenDayPlan.levelName}
                    </h2>
                    {progressPercent > 0 && (
                      <Button
                        variant="ghost"
                        size={seniorMode ? 'default' : 'sm'}
                        onClick={resetProgress}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <RotateCcw className={iconSize} />
                        <span className="ml-1">Réinitialiser</span>
                      </Button>
                    )}
                  </div>

                  {/* Barre de progression globale */}
                  <div className={`bg-muted/50 rounded-xl border border-border ${seniorMode ? 'p-6 mb-8' : 'p-4 mb-6'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium text-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>Votre progression</span>
                      <span className={`font-bold text-primary ${seniorMode ? 'text-lg' : 'text-sm'}`}>{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className={seniorMode ? 'h-4' : 'h-3'} />
                    <p className={`text-muted-foreground mt-2 ${smallTextClass}`}>
                      {progressPercent === 0 && "Cochez les actions au fur et à mesure pour suivre votre progression."}
                      {progressPercent > 0 && progressPercent < 50 && "Bon début ! Continuez à votre rythme."}
                      {progressPercent >= 50 && progressPercent < 100 && "Bravo ! Vous êtes sur la bonne voie."}
                      {progressPercent === 100 && "🎉 Félicitations ! Vous avez complété le programme."}
                    </p>
                  </div>

                  <div className={seniorMode ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'}>
                    {selectedSevenDayPlan.days.map((day, dayIndex) => {
                      const completedCount = getDayCompletedCount(dayIndex, day.actions.length);
                      const isFullyCompleted = completedCount === day.actions.length;
                      
                      return (
                        <div 
                          key={dayIndex} 
                          className={`bg-card border rounded-xl transition-colors ${
                            isFullyCompleted 
                              ? 'border-primary/50 bg-primary/5' 
                              : 'border-border'
                          } ${seniorMode ? 'p-6 border-2' : 'p-4'}`}
                        >
                          <h4 className={`font-semibold text-foreground flex items-center justify-between ${seniorMode ? 'mb-4 text-lg' : 'mb-3'}`}>
                            <span className="flex items-center gap-2">
                              <span className={`rounded-full flex items-center justify-center font-bold ${
                                isFullyCompleted 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-secondary/20 text-secondary'
                              } ${seniorMode ? 'w-8 h-8 text-sm' : 'w-6 h-6 text-xs'}`}>
                                {isFullyCompleted ? '✓' : dayIndex + 1}
                              </span>
                              {day.day}
                            </span>
                            <span className={`text-muted-foreground ${smallTextClass}`}>
                              {completedCount}/{day.actions.length}
                            </span>
                          </h4>
                          <ul className={seniorMode ? 'space-y-4' : 'space-y-3'}>
                            {day.actions.map((action, actionIndex) => {
                              const completed = isCompleted(dayIndex, actionIndex);
                              return (
                                <li 
                                  key={actionIndex} 
                                  className="flex items-start gap-3"
                                >
                                  <Checkbox
                                    id={`action-${dayIndex}-${actionIndex}`}
                                    checked={completed}
                                    onCheckedChange={() => handleToggleAction(dayIndex, actionIndex, day.actions.length, day.day)}
                                    className={seniorMode ? 'mt-0.5 h-6 w-6' : 'mt-0.5 h-5 w-5'}
                                  />
                                  <label 
                                    htmlFor={`action-${dayIndex}-${actionIndex}`}
                                    className={`cursor-pointer select-none transition-colors ${
                                      completed 
                                        ? 'text-muted-foreground line-through' 
                                        : 'text-foreground'
                                    } ${seniorMode ? 'text-base' : 'text-sm'}`}
                                  >
                                    {action}
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Programme 8 semaines */}
              {selectedEightWeekProgram && (
                <section>
                  <div className={`flex flex-wrap items-center justify-between gap-4 ${seniorMode ? 'mb-8' : 'mb-6'}`}>
                    <h2 className={`${subtitleClass} text-foreground flex items-center gap-3`}>
                      <span className={`rounded-lg bg-primary/10 flex items-center justify-center text-primary ${seniorMode ? 'w-12 h-12' : 'w-10 h-10 text-lg'}`}>
                        <Target className={iconSizeLg} />
                      </span>
                      Programme 8 semaines — {selectedEightWeekProgram.levelName}
                    </h2>
                    {weeklyProgressPercent > 0 && (
                      <Button
                        variant="ghost"
                        size={seniorMode ? 'default' : 'sm'}
                        onClick={resetWeeklyProgress}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <RotateCcw className={iconSize} />
                        <span className="ml-1">Réinitialiser</span>
                      </Button>
                    )}
                  </div>

                  {/* Barre de progression globale 8 semaines */}
                  <div className={`bg-primary/5 rounded-xl border border-primary/20 ${seniorMode ? 'p-6 mb-8' : 'p-4 mb-6'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium text-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>Progression du programme</span>
                      <span className={`font-bold text-primary ${seniorMode ? 'text-lg' : 'text-sm'}`}>{weeklyProgressPercent}%</span>
                    </div>
                    <Progress value={weeklyProgressPercent} className={seniorMode ? 'h-4' : 'h-3'} />
                    <p className={`text-muted-foreground mt-2 ${smallTextClass}`}>
                      {weeklyProgressPercent === 0 && "Cochez les exercices réalisés chaque semaine."}
                      {weeklyProgressPercent > 0 && weeklyProgressPercent < 25 && "Bon démarrage ! La régularité est la clé."}
                      {weeklyProgressPercent >= 25 && weeklyProgressPercent < 50 && "Vous progressez bien, continuez !"}
                      {weeklyProgressPercent >= 50 && weeklyProgressPercent < 75 && "Plus de la moitié ! Bravo pour votre persévérance."}
                      {weeklyProgressPercent >= 75 && weeklyProgressPercent < 100 && "Dernière ligne droite, vous y êtes presque !"}
                      {weeklyProgressPercent === 100 && "🏆 Félicitations ! Programme complété avec succès."}
                    </p>
                  </div>

                  <div className={seniorMode ? 'space-y-6' : 'space-y-4'}>
                    {selectedEightWeekProgram.weeks.map((week, weekIndex) => {
                      const completedCount = getWeekCompletedCount(weekIndex, week.exercises.length);
                      const isFullyCompleted = completedCount === week.exercises.length;
                      
                      return (
                        <div 
                          key={weekIndex} 
                          className={`bg-card border rounded-xl transition-colors ${
                            isFullyCompleted 
                              ? 'border-primary/50 bg-primary/5' 
                              : 'border-border'
                          } ${seniorMode ? 'p-6 border-2' : 'p-5'}`}
                        >
                          <div className={seniorMode ? 'flex items-center justify-between mb-4' : 'flex items-center justify-between mb-3'}>
                            <div className="flex items-center gap-3">
                              <span className={`rounded-full flex items-center justify-center font-bold ${
                                isFullyCompleted 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-primary/10 text-primary'
                              } ${seniorMode ? 'w-12 h-12 text-lg' : 'w-10 h-10'}`}>
                                {isFullyCompleted ? '✓' : weekIndex + 1}
                              </span>
                              <div>
                                <h4 className={`font-semibold text-foreground ${seniorMode ? 'text-lg' : ''}`}>
                                  {week.week}
                                </h4>
                                <p className={`text-primary font-medium ${seniorMode ? 'text-base' : 'text-sm'}`}>
                                  Focus : {week.focus}
                                </p>
                              </div>
                            </div>
                            <span className={`text-muted-foreground bg-muted px-2 py-1 rounded-full ${smallTextClass}`}>
                              {completedCount}/{week.exercises.length}
                            </span>
                          </div>
                          <ul className={`ml-2 ${seniorMode ? 'space-y-4' : 'space-y-3'}`}>
                            {week.exercises.map((exercise, exIndex) => {
                              const completed = isWeekExerciseCompleted(weekIndex, exIndex);
                              return (
                                <li key={exIndex} className="flex items-start gap-3">
                                  <Checkbox
                                    id={`week-${weekIndex}-ex-${exIndex}`}
                                    checked={completed}
                                    onCheckedChange={() => handleToggleWeekExercise(weekIndex, exIndex, week.exercises.length, week.week)}
                                    className={seniorMode ? 'mt-0.5 h-6 w-6' : 'mt-0.5 h-5 w-5'}
                                  />
                                  <label 
                                    htmlFor={`week-${weekIndex}-ex-${exIndex}`}
                                    className={`cursor-pointer select-none transition-colors ${
                                      completed 
                                        ? 'text-muted-foreground line-through' 
                                        : 'text-foreground'
                                    } ${seniorMode ? 'text-base' : 'text-sm'}`}
                                  >
                                    {exercise}
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* CTA PDF */}
              {slug && (
                <div className={`bg-primary/5 border border-primary/20 rounded-xl text-center ${seniorMode ? 'p-8' : 'p-6'}`}>
                  <h3 className={`font-serif font-bold text-foreground mb-2 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                    📄 Téléchargez votre programme
                  </h3>
                  <p className={`text-muted-foreground mb-4 ${smallTextClass}`}>
                    Imprimez votre programme pour le suivre facilement au quotidien.
                  </p>
                  <PdfDownloadButtons slug={slug} />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Print content (always visible in print) */}
        <div className="hidden print:block space-y-4">
          {/* Résumé */}
          <section className="print:break-inside-avoid">
            <h2 className="text-lg font-bold mb-2">⏱️ En 2 minutes</h2>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xs leading-tight whitespace-pre-line">{evidence.summary}</p>
            </div>
          </section>

          {/* Recommandations */}
          {evidence.recommendations.length > 0 && (
            <section className="print:break-inside-avoid">
              <h2 className="text-lg font-bold mb-2">✅ Ce qui aide vraiment</h2>
              <div className="space-y-1">
                {evidence.recommendations.map((rec, index) => (
                  <div key={index} className="flex gap-2 text-xs">
                    <span className="font-bold">{index + 1}.</span>
                    <span>{rec.text}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Red Flags */}
          {evidence.red_flags.length > 0 && (
            <div className="p-3 border-2 border-destructive rounded bg-destructive/5">
              <h3 className="text-sm font-bold text-destructive mb-2">⚠️ Consultez rapidement si :</h3>
              <ul className="text-xs text-destructive space-y-1">
                {evidence.red_flags.slice(0, 4).map((alert, index) => (
                  <li key={index}>• {alert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Sources */}
          {evidence.sources.length > 0 && (
            <div className="pt-2 border-t text-xs text-muted-foreground">
              <strong>Sources :</strong> {evidence.sources.map(s => `${s.org} (${s.year})`).join(' • ')}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PathologyPage;