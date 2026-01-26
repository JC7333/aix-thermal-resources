import { Link } from 'react-router-dom';
import { Download, Clock, Target, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { programs, pathologies } from '@/data/pathologies';

const Programs = () => {
  const getPathologyName = (pathologyId: string) => {
    return pathologies.find((p) => p.id === pathologyId)?.name || '';
  };

  const handleDownloadPDF = (programId: string) => {
    alert('Téléchargement PDF - Fonctionnalité à venir');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Programmes' }]} />

        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Programmes d'exercices
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Des programmes structurés et progressifs pour vous accompagner au quotidien. 
            Chaque programme est adapté à votre niveau et votre pathologie.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program) => (
            <article key={program.id} className="card-medical">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      program.level === 'debutant' 
                        ? 'bg-secondary/15 text-secondary' 
                        : 'bg-accent/15 text-accent'
                    }`}>
                      {program.level === 'debutant' ? '🌱 Débutant' : '💪 Confirmé'}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {program.duration}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-1">
                    {program.title}
                  </h2>
                  <Link
                    to={`/pathologie/${pathologies.find((p) => p.id === program.pathologyId)?.slug}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {getPathologyName(program.pathologyId)}
                  </Link>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                {program.description}
              </p>

              {/* Sessions Preview */}
              <div className="space-y-3 mb-6">
                {program.sessions.map((session, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      {session.day}
                    </h4>
                    <ul className="space-y-1">
                      {session.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <ChevronRight className="w-3 h-3 mt-1 shrink-0" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <Button
                variant="pdf"
                onClick={() => handleDownloadPDF(program.id)}
                className="w-full"
              >
                <Download className="w-4 h-4" />
                Télécharger le programme PDF
              </Button>
            </article>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-xl p-6 lg:p-8 max-w-3xl mx-auto text-center">
          <h3 className="font-serif text-xl font-bold text-foreground mb-3">
            Besoin d'un programme personnalisé ?
          </h3>
          <p className="text-muted-foreground mb-4">
            Ces programmes sont des bases générales. Pour un accompagnement adapté à votre situation, 
            consultez votre médecin ou un kinésithérapeute.
          </p>
          <Button asChild>
            <a href="https://www.doctolib.fr" target="_blank" rel="noopener noreferrer">
              Prendre rendez-vous
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Programs;
