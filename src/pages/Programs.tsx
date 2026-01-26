import { Link } from 'react-router-dom';
import { Download, Target, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { pathologies, levelLabels, MobilityLevel } from '@/data/pathologies';

const Programs = () => {
  // Filter pathologies that have 8-week programs
  const pathologiesWithPrograms = pathologies.filter(
    (p) => p.eightWeekPrograms && p.eightWeekPrograms.length > 0
  );

  const handleDownloadPDF = (pathologyId: string) => {
    alert(`Téléchargement du programme ${pathologyId} - PDF à venir`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Programmes' }]} />

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Programmes 8 semaines
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Des programmes structurés et progressifs adaptés à votre niveau de mobilité. 
            Choisissez le programme correspondant à votre pathologie, puis le niveau qui vous correspond.
          </p>
        </div>

        {/* Programs by pathology */}
        <div className="space-y-12">
          {pathologiesWithPrograms.map((pathology) => (
            <section key={pathology.id} className="bg-card border border-border rounded-2xl p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <Link
                    to={`/pathologies/${pathology.slug}`}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    Voir la fiche complète
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <h2 className="font-serif text-2xl font-bold text-foreground mt-1">
                    {pathology.name}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    {pathology.shortDescription}
                  </p>
                </div>
                <Button
                  variant="pdf"
                  onClick={() => handleDownloadPDF(pathology.id)}
                  className="shrink-0"
                >
                  <Download className="w-4 h-4" />
                  Télécharger les programmes PDF
                </Button>
              </div>

              {/* Levels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pathology.eightWeekPrograms?.map((program) => (
                  <div
                    key={program.level}
                    className="bg-muted/50 rounded-xl p-5 border border-border"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        program.level === 0 ? 'bg-destructive/20 text-destructive' :
                        program.level === 1 ? 'bg-accent/20 text-accent' :
                        program.level === 2 ? 'bg-secondary/20 text-secondary' :
                        'bg-primary/20 text-primary'
                      }`}>
                        {program.level}
                      </span>
                      <h3 className="font-semibold text-foreground">
                        {program.levelName}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {program.weeks.map((week, index) => (
                        <div key={index} className="pl-2 border-l-2 border-primary/30">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-medium text-sm text-foreground">
                              {week.week}
                            </span>
                          </div>
                          <p className="text-xs text-primary font-medium mb-1">
                            Focus : {week.focus}
                          </p>
                          <ul className="space-y-0.5">
                            {week.exercises.slice(0, 2).map((exercise, exIndex) => (
                              <li key={exIndex} className="text-xs text-muted-foreground flex items-start gap-1">
                                <span>•</span>
                                <span>{exercise}</span>
                              </li>
                            ))}
                            {week.exercises.length > 2 && (
                              <li className="text-xs text-muted-foreground italic">
                                + {week.exercises.length - 2} autres...
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6 lg:p-8 max-w-3xl mx-auto text-center">
          <h3 className="font-serif text-xl font-bold text-foreground mb-3">
            Comment choisir mon niveau ?
          </h3>
          <div className="text-left space-y-2 mb-6">
            <p className="text-muted-foreground text-sm">
              <strong>Niveau 0 :</strong> Je peux à peine bouger, marcher est très difficile
            </p>
            <p className="text-muted-foreground text-sm">
              <strong>Niveau 1 :</strong> Je peux marcher un peu mais je me fatigue vite
            </p>
            <p className="text-muted-foreground text-sm">
              <strong>Niveau 2 :</strong> Je peux marcher 15-30 min sans trop de difficulté
            </p>
            <p className="text-muted-foreground text-sm">
              <strong>Niveau 3 :</strong> Je suis relativement actif(ve)
            </p>
          </div>
          <p className="text-muted-foreground text-sm">
            En cas de doute, commencez par le niveau inférieur. Vous pourrez toujours progresser !
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Programs;
