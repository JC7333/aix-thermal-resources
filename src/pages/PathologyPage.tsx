import { useParams, Navigate, Link } from 'react-router-dom';
import { Download, Clock, Users, AlertTriangle, Apple, Activity, Moon, Brain, Droplets, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ExerciseCard } from '@/components/shared/ExerciseCard';
import { pathologies, categoryLabels, audienceLabels, resources } from '@/data/pathologies';

const PathologyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const pathology = pathologies.find((p) => p.slug === slug);

  if (!pathology) {
    return <Navigate to="/ressources" replace />;
  }

  const relatedResources = resources.filter((r) => r.pathologyId === pathology.id);

  const handleDownloadPDF = () => {
    // PDF generation/download logic
    alert('Téléchargement PDF - Fonctionnalité à venir');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb
          items={[
            { label: 'Ressources', href: '/ressources' },
            { label: categoryLabels[pathology.category], href: `/ressources?categorie=${pathology.category}` },
            { label: pathology.name },
          ]}
        />

        {/* Header */}
        <header className="mb-10 lg:mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary`}>
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
              {pathology.readingTime} min de lecture
            </span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {pathology.name}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            {pathology.shortDescription}
          </p>

          <Button onClick={handleDownloadPDF} variant="pdf" size="lg" className="mt-6">
            <Download className="w-5 h-5" />
            Télécharger la fiche PDF de synthèse
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Definition */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg">
                  📖
                </span>
                Définition
              </h2>
              <p className="text-foreground leading-relaxed">
                {pathology.definition}
              </p>
            </section>

            {/* Physiopathology */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg">
                  🔬
                </span>
                Comprendre la maladie
              </h2>
              <p className="text-foreground leading-relaxed">
                {pathology.physiopathology}
              </p>
            </section>

            {/* Symptoms */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent text-lg">
                  🩺
                </span>
                Symptômes fréquents
              </h2>
              <ul className="space-y-2">
                {pathology.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-foreground">{symptom}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Aggravating / Helpful Factors */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-destructive">⚠️</span>
                  Ce qui aggrave
                </h3>
                <ul className="space-y-2">
                  {pathology.aggravatingFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-destructive">•</span>
                      <span className="text-foreground">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  Ce qui aide
                </h3>
                <ul className="space-y-2">
                  {pathology.helpfulFactors.map((factor, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-secondary">•</span>
                      <span className="text-foreground">{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Non-Medicinal Treatments */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg">
                  💡
                </span>
                Traitements non médicamenteux
              </h2>

              <div className="space-y-4">
                <div className="card-medical">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Activité physique</h4>
                      <p className="text-muted-foreground text-sm">{pathology.nonMedicinalTreatments.physicalActivity}</p>
                    </div>
                  </div>
                </div>

                <div className="card-medical">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-lg">🧍</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Conseils posturaux</h4>
                      <p className="text-muted-foreground text-sm">{pathology.nonMedicinalTreatments.posturalAdvice}</p>
                    </div>
                  </div>
                </div>

                <div className="card-medical">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-lg">🏠</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Hygiène de vie</h4>
                      <p className="text-muted-foreground text-sm">{pathology.nonMedicinalTreatments.lifestyle}</p>
                    </div>
                  </div>
                </div>

                <div className="card-medical">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Moon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Sommeil</h4>
                      <p className="text-muted-foreground text-sm">{pathology.nonMedicinalTreatments.sleep}</p>
                    </div>
                  </div>
                </div>

                <div className="card-medical">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                      <Brain className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Gestion du stress</h4>
                      <p className="text-muted-foreground text-sm">{pathology.nonMedicinalTreatments.stressManagement}</p>
                    </div>
                  </div>
                </div>

                <div className="card-medical bg-primary/5 border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Droplets className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Thermalisme</h4>
                      <p className="text-muted-foreground text-sm">{pathology.nonMedicinalTreatments.thermalism}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Exercises */}
            {pathology.exercises.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary text-lg">
                    🏋️
                  </span>
                  Exercices recommandés
                </h2>

                <div className="space-y-4">
                  {pathology.exercises.map((exercise, index) => (
                    <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Nutrition */}
            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center shrink-0">
                  <Apple className="w-5 h-5 text-secondary" />
                </span>
                Conseils nutritionnels
              </h2>
              <ul className="space-y-2">
                {pathology.nutritionAdvice.map((advice, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                    <span className="text-foreground">{advice}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Alert Signs */}
            <section className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 lg:p-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                Signaux d'alerte — Quand consulter rapidement
              </h2>
              <p className="text-muted-foreground mb-4">
                Consultez un médecin en urgence si vous présentez l'un de ces symptômes :
              </p>
              <ul className="space-y-2">
                {pathology.alertSigns.map((sign, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-destructive font-bold">!</span>
                    <span className="text-foreground font-medium">{sign}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Download Card */}
            <div className="card-medical sticky top-24">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Fiche PDF
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Téléchargez la fiche de synthèse pour cette pathologie. Format A4, imprimable.
              </p>
              <Button onClick={handleDownloadPDF} variant="pdf" className="w-full">
                <Download className="w-4 h-4" />
                Télécharger le PDF
              </Button>
            </div>

            {/* Related Resources */}
            {relatedResources.length > 0 && (
              <div className="card-medical">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                  Ressources associées
                </h3>
                <ul className="space-y-3">
                  {relatedResources.slice(0, 5).map((resource) => (
                    <li key={resource.id}>
                      <Link
                        to={`/ressources`}
                        className="flex items-center justify-between text-sm text-foreground hover:text-primary transition-colors group"
                      >
                        <span>{resource.title}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="card-medical bg-primary/5 border-primary/20">
              <h3 className="font-serif text-lg font-bold text-foreground mb-3">
                Besoin d'un accompagnement ?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Le Dr Martin vous accompagne dans la prise en charge de votre pathologie.
              </p>
              <Button asChild className="w-full">
                <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer">
                  Prendre rendez-vous
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
};

export default PathologyPage;
