import { useParams, Navigate, Link } from 'react-router-dom';
import { Clock, AlertTriangle, Printer, Calendar, Target, Utensils, BookOpen, Flame, CheckCircle2, Shield, ExternalLink, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';
import { FavoriteButton } from '@/components/shared/FavoriteButton';
import { pathologies as oldPathologies, categoryLabels, audienceLabels, levelLabels, MobilityLevel } from '@/data/pathologies';
import { pathologies as contentPathologies } from '@/content/content';
import { getEvidenceBySlug, type EvidenceData } from '@/data/evidence';
import { useState } from 'react';
import { usePdfPreload } from '@/hooks/usePdfPreload';

// Niveau de preuve → badge couleur
const evidenceBadge = (level: string) => {
  if (level.toLowerCase().includes('élevé')) {
    return 'bg-green-100 text-green-700 border-green-200';
  }
  if (level.toLowerCase().includes('modéré')) {
    return 'bg-amber-100 text-amber-700 border-amber-200';
  }
  return 'bg-gray-100 text-gray-600 border-gray-200';
};

const PathologyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Données content factory
  const contentPathology = contentPathologies.find((p) => p.slug === slug);
  const oldPathology = oldPathologies.find((p) => p.slug === slug);
  const pathology = oldPathology;
  
  // Données evidence-based
  const evidence = slug ? getEvidenceBySlug(slug) : undefined;
  
  // Préchargement des PDFs en arrière-plan après 2 secondes
  usePdfPreload(slug, { delay: 2000 });
  
  const [selectedLevel, setSelectedLevel] = useState<MobilityLevel>(1);

  if (!pathology) {
    return <Navigate to="/pathologies" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  const selectedDailyPlan = pathology.dailyPlans?.find(p => p.level === selectedLevel) || pathology.dailyPlans?.[0];
  const selectedSevenDayPlan = pathology.sevenDayPlans?.find(p => p.level === selectedLevel);
  const selectedEightWeekProgram = pathology.eightWeekPrograms?.find(p => p.level === selectedLevel);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 print:py-2 print:px-2">
        <div className="no-print">
          <Breadcrumb
            items={[
              { label: 'Pathologies', href: '/pathologies' },
              { label: categoryLabels[pathology.category] },
              { label: pathology.name },
            ]}
          />
        </div>

        {/* Header */}
        <header className="mb-8 lg:mb-10 print:mb-4">
          <div className="flex flex-wrap items-center gap-3 mb-4 no-print">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {categoryLabels[pathology.category]}
            </span>
            {evidence && (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Evidence-based
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {pathology.readingTime} min
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 print:text-2xl print:mb-2">
            {pathology.name}
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl print:text-sm">
            {pathology.shortDescription}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 no-print">
            <Button onClick={handlePrint} variant="pdf" size="lg">
              <Printer className="w-5 h-5" />
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
              <h1 className="text-xl font-bold text-primary">{pathology.name}</h1>
              <p className="text-xs text-muted-foreground">Dr Audric Bugnard — Médecin thermaliste — Aix-les-Bains</p>
            </div>
            <p className="text-xs text-muted-foreground text-right">Mise à jour : {pathology.lastUpdated}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 print:block print:space-y-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10 print:space-y-4">
            
            {/* Section 1: En 2 minutes */}
            <section id="resume" className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3 print:text-lg print:mb-2">
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg print:w-6 print:h-6 print:text-sm">
                  ⏱️
                </span>
                En 2 minutes
              </h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 print:p-3 print:bg-gray-50">
                <p className="text-foreground leading-relaxed whitespace-pre-line print:text-xs print:leading-tight">
                  {pathology.quickSummary}
                </p>
              </div>
            </section>

            {/* Section 2: Physiopathologie */}
            <section id="physiopath" className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3 print:text-lg print:mb-2">
                <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg print:w-6 print:h-6 print:text-sm">
                  🔬
                </span>
                Ce qui se passe dans votre corps
              </h2>
              <p className="text-foreground leading-relaxed whitespace-pre-line print:text-xs print:leading-tight">
                {pathology.physiopathology}
              </p>
            </section>

            {/* Section 3: Recommandations Evidence-Based (NOUVEAU) */}
            {evidence && evidence.recommendations.length > 0 && (
              <section id="recommandations" className="print:break-inside-avoid">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-lg print:mb-2">
                  <span className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700 text-lg print:w-6 print:h-6 print:text-sm">
                    <Award className="w-5 h-5" />
                  </span>
                  Recommandations basées sur les preuves
                </h2>
                
                <div className="space-y-3 print:space-y-1">
                  {evidence.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 print:p-2 print:bg-white">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm shrink-0 print:w-5 print:h-5 print:text-xs">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground mb-2 print:text-xs print:mb-1">
                          {rec.text}
                        </p>
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${evidenceBadge(rec.evidence)}`}>
                          {rec.evidence}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 4: Top 5 non médicamenteux (fallback si pas evidence) */}
            {(!evidence || evidence.recommendations.length === 0) && pathology.top5NonMedical && (
              <section className="print:break-inside-avoid">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-lg print:mb-2">
                  <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg print:w-6 print:h-6 print:text-sm">
                    ✨
                  </span>
                  Ce qui aide vraiment (Top 5)
                </h2>
                <div className="space-y-4 print:space-y-1">
                  {pathology.top5NonMedical?.map((item, index) => (
                    <div key={index} className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 print:p-2">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0 print:w-6 print:h-6 print:text-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 print:text-xs print:mb-0">
                          {index + 1}. {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm print:text-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Level Selector */}
            <section className="no-print bg-muted/50 rounded-xl p-6 border border-border">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Choisissez votre niveau
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {([0, 1, 2, 3] as MobilityLevel[]).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedLevel === level
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-border hover:border-primary/50'
                    }`}
                  >
                    {level === 0 ? 'Très facile' : level === 1 ? 'Facile' : level === 2 ? 'Normal' : 'Actif'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {levelLabels[selectedLevel]}
              </p>
            </section>

            {/* Section 5: Plan du jour */}
            {selectedDailyPlan && (
              <section className="print:break-inside-avoid">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-lg print:mb-2">
                  <span className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-lg print:w-6 print:h-6 print:text-sm">
                    📋
                  </span>
                  Plan du jour — {selectedDailyPlan.levelName}
                </h2>
                <div className="bg-accent/5 border-2 border-accent/30 rounded-xl p-6 print:p-3">
                  <p className="text-sm text-muted-foreground mb-4 print:text-xs print:mb-2">
                    Aujourd'hui, faites ces 3 choses :
                  </p>
                  <ul className="space-y-3 print:space-y-1">
                    {selectedDailyPlan.actions.map((action, index) => (
                      <li key={index} className="flex items-start gap-3 print:gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm shrink-0 print:w-4 print:h-4 print:text-xs">
                          {index + 1}
                        </div>
                        <span className="text-foreground print:text-xs">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Section 6: Plan 7 jours */}
            {selectedSevenDayPlan && (
              <section className="no-print">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-lg">
                    <Calendar className="w-5 h-5" />
                  </span>
                  Plan 7 jours — {selectedSevenDayPlan.levelName}
                </h2>
                <div className="space-y-3">
                  {selectedSevenDayPlan.days.map((day, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        {day.day}
                      </h4>
                      <ul className="space-y-1">
                        {day.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 7: Programme 8 semaines */}
            {selectedEightWeekProgram && (
              <section className="no-print">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg">
                    <Target className="w-5 h-5" />
                  </span>
                  Programme 8 semaines — {selectedEightWeekProgram.levelName}
                </h2>
                <div className="space-y-4">
                  {selectedEightWeekProgram.weeks.map((week, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                          {index + 1}
                        </span>
                        <h4 className="font-semibold text-foreground">
                          {week.week}
                        </h4>
                      </div>
                      <p className="text-sm text-primary font-medium mb-2">
                        Focus : {week.focus}
                      </p>
                      <ul className="space-y-1">
                        {week.exercises.map((exercise, exIndex) => (
                          <li key={exIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-secondary">•</span>
                            {exercise}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 8: Nutrition */}
            <section className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-lg print:mb-2">
                <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg print:w-6 print:h-6 print:text-sm">
                  <Utensils className="w-5 h-5 print:w-3 print:h-3" />
                </span>
                Nutrition facile
              </h2>
              
              <div className="space-y-4 print:space-y-2 print:grid print:grid-cols-2 print:gap-2">
                <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 print:p-2">
                  <h4 className="font-semibold text-foreground mb-3 print:text-xs print:mb-1">
                    🍽️ L'assiette idéale
                  </h4>
                  <ul className="space-y-2 print:space-y-0">
                    {pathology.nutrition?.idealPlate.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs print:leading-tight">
                        <span className="text-secondary">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 print:p-2">
                  <h4 className="font-semibold text-foreground mb-3 print:text-xs print:mb-1">
                    ❌ Erreurs fréquentes
                  </h4>
                  <ul className="space-y-2 print:space-y-0">
                    {pathology.nutrition?.commonMistakes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs print:leading-tight">
                        <span className="text-destructive">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 9: Plan poussée 48h */}
            {pathology.flareProtocol && (
              <section className="print:break-inside-avoid">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-lg print:mb-2">
                  <span className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-lg print:w-6 print:h-6 print:text-sm">
                    <Flame className="w-5 h-5 print:w-3 print:h-3" />
                  </span>
                  {pathology.flareProtocol.title}
                </h2>
                
                <div className="space-y-4 print:space-y-2 print:grid print:grid-cols-2 print:gap-2">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 print:p-2">
                    <h4 className="font-semibold text-foreground mb-3 print:text-xs print:mb-1">
                      🕐 0 à 24 heures
                    </h4>
                    <ul className="space-y-2 print:space-y-0">
                      {pathology.flareProtocol.hours0to24.slice(0, 4).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs print:leading-tight">
                          <span className="text-accent font-bold">{index + 1}.</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 print:p-2">
                    <h4 className="font-semibold text-foreground mb-3 print:text-xs print:mb-1">
                      🕐 24 à 48 heures
                    </h4>
                    <ul className="space-y-2 print:space-y-0">
                      {pathology.flareProtocol.hours24to48.slice(0, 4).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs print:leading-tight">
                          <span className="text-secondary font-bold">{index + 1}.</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 print:hidden">
            {/* Red Flags Evidence-Based */}
            {evidence && evidence.red_flags.length > 0 && (
              <div id="red-flags" className="card-medical bg-destructive/5 border-destructive/20">
                <h3 className="font-serif text-lg font-bold text-destructive mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Quand consulter rapidement
                </h3>
                <ul className="space-y-2">
                  {evidence.red_flags.map((alert, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-destructive">
                      <span className="font-bold">⚠️</span>
                      {alert}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Ces signes nécessitent un avis médical rapide. En cas d'urgence : 15 / 112.
                </p>
              </div>
            )}

            {/* Fallback: Red flags from old data */}
            {(!evidence || evidence.red_flags.length === 0) && pathology.alertSigns && (
              <div className="card-medical bg-destructive/5 border-destructive/20">
                <h3 className="font-serif text-lg font-bold text-destructive mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Quand consulter rapidement
                </h3>
                <ul className="space-y-2">
                  {pathology.alertSigns.map((alert, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-destructive">
                      <span className="font-bold">⚠️</span>
                      {alert}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sources Evidence-Based */}
            {evidence && evidence.sources.length > 0 && (
              <div id="sources" className="card-medical bg-muted/50">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Sources scientifiques
                </h3>
                <ul className="space-y-3">
                  {evidence.sources.map((source, index) => (
                    <li key={index} className="text-sm">
                      <div className="font-medium text-foreground">{source.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center justify-between">
                        <span>{source.org}, {source.year}</span>
                        {source.url && (
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            Lire <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Dernière mise à jour : {pathology.lastUpdated}
                </p>
              </div>
            )}

            {/* Fallback: Old sources */}
            {(!evidence || evidence.sources.length === 0) && pathology.sources && (
              <div className="card-medical bg-muted/50">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Sources
                </h3>
                <ul className="space-y-2">
                  {pathology.sources.map((source, index) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {source.name} ({source.year})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Medical Disclaimer */}
            <MedicalDisclaimer variant="compact" />

            {/* Navigation rapide */}
            <div className="card-medical">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Sur cette page
              </h3>
              <nav className="space-y-2 text-sm">
                <a href="#resume" className="block text-muted-foreground hover:text-primary transition-colors">
                  → En 2 minutes
                </a>
                <a href="#physiopath" className="block text-muted-foreground hover:text-primary transition-colors">
                  → Ce qui se passe
                </a>
                {evidence && (
                  <a href="#recommandations" className="block text-muted-foreground hover:text-primary transition-colors">
                    → Recommandations
                  </a>
                )}
                {evidence && (
                  <a href="#red-flags" className="block text-muted-foreground hover:text-primary transition-colors">
                    → Quand consulter
                  </a>
                )}
                {evidence && (
                  <a href="#sources" className="block text-muted-foreground hover:text-primary transition-colors">
                    → Sources
                  </a>
                )}
              </nav>
            </div>

            {/* Autres pathologies */}
            <div className="card-medical">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Voir aussi
              </h3>
              <div className="space-y-2">
                <Link 
                  to="/pathologies" 
                  className="block text-sm text-primary hover:underline"
                >
                  → Toutes les pathologies
                </Link>
                <Link 
                  to="/ressources" 
                  className="block text-sm text-primary hover:underline"
                >
                  → Bibliothèque de ressources
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Print Red Flags */}
        {evidence && evidence.red_flags.length > 0 && (
          <div className="hidden print:block mt-4 p-3 border-2 border-red-500 rounded bg-red-50">
            <h3 className="text-sm font-bold text-red-700 mb-2">⚠️ Consultez rapidement si :</h3>
            <ul className="text-xs text-red-600 space-y-1">
              {evidence.red_flags.slice(0, 4).map((alert, index) => (
                <li key={index}>• {alert}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Print Sources */}
        {evidence && evidence.sources.length > 0 && (
          <div className="hidden print:block mt-3 pt-2 border-t text-xs text-gray-500">
            <strong>Sources :</strong> {evidence.sources.map(s => `${s.org} (${s.year})`).join(' • ')}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PathologyPage;
