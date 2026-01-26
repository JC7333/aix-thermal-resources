import { useParams, Navigate, Link } from 'react-router-dom';
import { Download, Clock, Users, AlertTriangle, Printer, ChevronRight, Calendar, Target, Utensils, BookOpen, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { pathologies, categoryLabels, audienceLabels, levelLabels, MobilityLevel } from '@/data/pathologies';
import { useState } from 'react';

const PathologyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const pathology = pathologies.find((p) => p.slug === slug);
  const [selectedLevel, setSelectedLevel] = useState<MobilityLevel>(1);

  if (!pathology) {
    return <Navigate to="/pathologies" replace />;
  }

  const handleDownloadPDF = () => {
    alert('Téléchargement PDF - Fonctionnalité à venir');
  };

  const handlePrint = () => {
    window.print();
  };

  const selectedSevenDayPlan = pathology.sevenDayPlans?.find(p => p.level === selectedLevel);
  const selectedEightWeekProgram = pathology.eightWeekPrograms?.find(p => p.level === selectedLevel);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 print:py-2">
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
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              pathology.audience === 'senior' ? 'badge-senior' :
              pathology.audience === 'enfant' ? 'badge-enfant' : 'badge-adulte'
            }`}>
              <Users className="w-3 h-3 inline mr-1" />
              {audienceLabels[pathology.audience]}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {pathology.readingTime} min
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 print:text-2xl">
            {pathology.name}
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl print:text-base">
            {pathology.shortDescription}
          </p>

          <div className="flex flex-wrap gap-3 mt-6 no-print">
            <Button onClick={handleDownloadPDF} variant="pdf" size="lg">
              <Download className="w-5 h-5" />
              Télécharger le PDF
            </Button>
            <Button onClick={handlePrint} variant="outline" size="lg">
              <Printer className="w-5 h-5" />
              Imprimer
            </Button>
          </div>
        </header>

        {/* Print header */}
        <div className="hidden print:block mb-4 pb-4 border-b">
          <p className="text-sm text-gray-600">
            Dr Audric Bugnard — Médecin thermaliste — Aix-les-Bains | Mise à jour : {pathology.lastUpdated}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 print:block">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10 print:space-y-6">
            
            {/* Section 1: En 2 minutes */}
            <section className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3 print:text-xl">
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg print:w-8 print:h-8">
                  ⏱️
                </span>
                En 2 minutes
              </h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 print:p-4 print:bg-gray-50">
                <p className="text-foreground leading-relaxed print:text-sm">
                  {pathology.quickSummary}
                </p>
              </div>
            </section>

            {/* Section 2: Physiopathologie */}
            <section className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3 print:text-xl">
                <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg print:w-8 print:h-8">
                  🔬
                </span>
                Ce qui se passe dans le corps
              </h2>
              <p className="text-foreground leading-relaxed print:text-sm">
                {pathology.physiopathology}
              </p>
            </section>

            {/* Section 3: Top 5 non médicamenteux */}
            <section className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-xl print:mb-4">
                <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg print:w-8 print:h-8">
                  ✨
                </span>
                Ce qui aide vraiment (Top 5)
              </h2>
              <div className="space-y-4 print:space-y-2">
                {pathology.top5NonMedical?.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 print:p-3 print:bg-white">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl shrink-0 print:w-8 print:h-8 print:text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 print:text-sm">
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

            {/* Level Selector */}
            <section className="no-print bg-muted/50 rounded-xl p-6 border border-border">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Choisissez votre niveau de mobilité
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
                    Niveau {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {levelLabels[selectedLevel]}
              </p>
            </section>

            {/* Section 4: Plan 7 jours */}
            {selectedSevenDayPlan && (
              <section className="print:break-before-page">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-xl print:mb-4">
                  <span className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-lg print:w-8 print:h-8">
                    <Calendar className="w-5 h-5" />
                  </span>
                  Plan 7 jours — {selectedSevenDayPlan.levelName}
                </h2>
                <div className="space-y-3 print:space-y-2">
                  {selectedSevenDayPlan.days.map((day, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-4 print:p-3 print:bg-white">
                      <h4 className="font-semibold text-foreground mb-2 print:text-sm">
                        {day.day}
                      </h4>
                      <ul className="space-y-1">
                        {day.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="flex items-start gap-2 text-sm text-muted-foreground print:text-xs">
                            <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 5: Programme 8 semaines */}
            {selectedEightWeekProgram && (
              <section className="print:break-before-page">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-xl print:mb-4">
                  <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg print:w-8 print:h-8">
                    <Target className="w-5 h-5" />
                  </span>
                  Programme 8 semaines — {selectedEightWeekProgram.levelName}
                </h2>
                <div className="space-y-4 print:space-y-2">
                  {selectedEightWeekProgram.weeks.map((week, index) => (
                    <div key={index} className="bg-card border border-border rounded-xl p-5 print:p-3 print:bg-white">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm print:w-6 print:h-6">
                          {index + 1}
                        </span>
                        <h4 className="font-semibold text-foreground print:text-sm">
                          {week.week}
                        </h4>
                      </div>
                      <p className="text-sm text-primary font-medium mb-2 print:text-xs">
                        Focus : {week.focus}
                      </p>
                      <ul className="space-y-1">
                        {week.exercises.map((exercise, exIndex) => (
                          <li key={exIndex} className="flex items-start gap-2 text-sm text-muted-foreground print:text-xs">
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

            {/* Section 6: Nutrition */}
            <section className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-xl print:mb-4">
                <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg print:w-8 print:h-8">
                  <Utensils className="w-5 h-5" />
                </span>
                Nutrition facile
              </h2>
              
              <div className="space-y-4 print:space-y-3">
                <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 print:p-3">
                  <h4 className="font-semibold text-foreground mb-3 print:text-sm">
                    🍽️ L'assiette idéale
                  </h4>
                  <ul className="space-y-2 print:space-y-1">
                    {pathology.nutrition?.idealPlate.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs">
                        <span className="text-secondary">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 print:p-3">
                  <h4 className="font-semibold text-foreground mb-3 print:text-sm">
                    ❌ Erreurs courantes
                  </h4>
                  <ul className="space-y-2 print:space-y-1">
                    {pathology.nutrition?.commonMistakes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs">
                        <span className="text-destructive">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {pathology.nutrition?.tips && pathology.nutrition.tips.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-5 print:p-3">
                    <h4 className="font-semibold text-foreground mb-3 print:text-sm">
                      💡 Astuces
                    </h4>
                    <ul className="space-y-2 print:space-y-1">
                      {pathology.nutrition.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs">
                          <span className="text-primary">→</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* Section 7: Plan poussée 48h */}
            {pathology.flareProtocol && (
              <section className="print:break-inside-avoid">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-xl print:mb-4">
                  <span className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-lg print:w-8 print:h-8">
                    <Flame className="w-5 h-5" />
                  </span>
                  {pathology.flareProtocol.title}
                </h2>
                
                <div className="space-y-4 print:space-y-3">
                  <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 print:p-3">
                    <h4 className="font-semibold text-foreground mb-3 print:text-sm">
                      🕐 0 à 24 heures
                    </h4>
                    <ul className="space-y-2 print:space-y-1">
                      {pathology.flareProtocol.hours0to24.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs">
                          <span className="text-accent font-bold">{index + 1}.</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-5 print:p-3">
                    <h4 className="font-semibold text-foreground mb-3 print:text-sm">
                      🕐 24 à 48 heures
                    </h4>
                    <ul className="space-y-2 print:space-y-1">
                      {pathology.flareProtocol.hours24to48.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-foreground print:text-xs">
                          <span className="text-secondary font-bold">{index + 1}.</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 print:p-3">
                    <h4 className="font-semibold text-foreground mb-2 print:text-sm">
                      ▶️ Reprise d'activité
                    </h4>
                    <p className="text-sm text-foreground print:text-xs">
                      {pathology.flareProtocol.resumeActivity}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Section 8: Red flags */}
            <section className="print:break-inside-avoid">
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 lg:p-8 print:p-4">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3 print:text-xl print:mb-3">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                  Quand consulter rapidement
                </h2>
                <p className="text-muted-foreground mb-4 print:text-sm print:mb-3">
                  Consultez un médecin en urgence si vous présentez :
                </p>
                <ul className="space-y-2 print:space-y-1">
                  {pathology.alertSigns.map((sign, index) => (
                    <li key={index} className="flex items-start gap-3 print:gap-2">
                      <span className="text-destructive font-bold">!</span>
                      <span className="text-foreground font-medium print:text-sm">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 9: Sources */}
            <section className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3 print:text-xl print:mb-3">
                <span className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-lg print:w-8 print:h-8">
                  <BookOpen className="w-5 h-5" />
                </span>
                Sources & mise à jour
              </h2>
              <div className="bg-muted/50 rounded-xl p-5 print:p-3">
                <p className="text-sm text-muted-foreground mb-3 print:text-xs">
                  <strong>Dernière mise à jour :</strong> {pathology.lastUpdated}
                </p>
                <ul className="space-y-1">
                  {pathology.sources?.map((source, index) => (
                    <li key={index} className="text-sm text-muted-foreground print:text-xs">
                      • {source.name} ({source.year})
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 no-print">
            {/* Download Card */}
            <div className="card-medical sticky top-24">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                📄 Fiche PDF
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Téléchargez la fiche complète avec tous les programmes et conseils. Format A4, imprimable.
              </p>
              <div className="space-y-2">
                <Button onClick={handleDownloadPDF} variant="pdf" className="w-full">
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </Button>
                <Button onClick={handlePrint} variant="outline" className="w-full">
                  <Printer className="w-4 h-4" />
                  Imprimer cette page
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card-medical">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                📚 Ressources liées
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/programmes" className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Tous les programmes
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Guides transversaux
                  </Link>
                </li>
                <li>
                  <Link to="/parcours" className="text-sm text-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    Parcours guidé
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="card-medical bg-primary/5 border-primary/20">
              <h3 className="font-serif text-lg font-bold text-foreground mb-3">
                Besoin d'un accompagnement ?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Le Dr Bugnard vous accompagne dans la prise en charge de votre pathologie.
              </p>
              <Button asChild className="w-full">
                <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer">
                  Prendre rendez-vous
                </a>
              </Button>
            </div>

            {/* Disclaimer */}
            <MedicalDisclaimer variant="inline" />
          </aside>
        </div>

        {/* Print footer */}
        <div className="hidden print:block mt-8 pt-4 border-t text-center">
          <p className="text-xs text-gray-500">
            Ce document est fourni à titre informatif. Il ne remplace pas une consultation médicale. 
            En cas d'urgence : 15 ou 112.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © Dr Audric Bugnard — Médecin thermaliste — Aix-les-Bains
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default PathologyPage;
