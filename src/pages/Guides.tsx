import { Link } from 'react-router-dom';
import { Scale, Cigarette, Moon, Activity, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

const guides = [
  {
    id: 'poids',
    title: 'Gérer son poids durablement',
    description: 'Des conseils pratiques et progressifs pour atteindre un poids santé, sans régime restrictif.',
    icon: Scale,
    color: 'bg-primary/10 text-primary',
    topics: [
      'Pourquoi les régimes restrictifs échouent',
      'L\'assiette équilibrée au quotidien',
      'Bouger sans se faire mal',
      'Gérer les fringales',
      'Dormir pour maigrir',
    ],
  },
  {
    id: 'tabac',
    title: 'Arrêter le tabac',
    description: 'Une approche progressive et bienveillante pour se libérer du tabac.',
    icon: Cigarette,
    color: 'bg-destructive/10 text-destructive',
    topics: [
      'Comprendre sa dépendance',
      'Préparer son arrêt',
      'Les substituts nicotiniques',
      'Gérer les envies',
      'Éviter la rechute',
    ],
  },
  {
    id: 'sommeil',
    title: 'Améliorer son sommeil',
    description: 'Retrouver un sommeil réparateur avec des habitudes simples et efficaces.',
    icon: Moon,
    color: 'bg-secondary/10 text-secondary',
    topics: [
      'L\'hygiène du sommeil',
      'Préparer sa nuit',
      'Gérer les réveils nocturnes',
      'Alimentation et sommeil',
      'Quand consulter',
    ],
  },
  {
    id: 'bouger',
    title: 'Reprendre une activité physique',
    description: 'Bouger en douceur quand on a mal, qu\'on est essoufflé ou qu\'on n\'a plus l\'habitude.',
    icon: Activity,
    color: 'bg-accent/10 text-accent',
    topics: [
      'Pourquoi bouger quand on a mal',
      'Commencer très progressivement',
      'Exercices niveau 0 (très facile)',
      'Exercices niveau 1 à 3',
      'Intégrer le mouvement au quotidien',
    ],
  },
];

const Guides = () => {
  const handleDownloadPDF = (guideId: string) => {
    alert(`Téléchargement du guide ${guideId} - PDF à venir`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb
          items={[
            { label: 'Guides transversaux' },
          ]}
        />

        <header className="mb-10 lg:mb-14 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Guides transversaux
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des conseils qui s'appliquent à toutes les pathologies : poids, tabac, sommeil, activité physique. 
            Ces guides vous accompagnent au quotidien.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {guides.map((guide) => (
            <div key={guide.id} className="card-medical flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl ${guide.color} flex items-center justify-center shrink-0`}>
                  <guide.icon className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground mb-1">
                    {guide.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {guide.description}
                  </p>
                </div>
              </div>

              <div className="mb-6 flex-grow">
                <h3 className="text-sm font-semibold text-foreground mb-2">Dans ce guide :</h3>
                <ul className="space-y-1.5">
                  {guide.topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => handleDownloadPDF(guide.id)} 
                  variant="pdf" 
                  className="flex-1"
                >
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Note importante */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-muted/50 rounded-xl p-6 text-center">
            <p className="text-muted-foreground">
              <strong>Rappel :</strong> Ces guides sont des informations générales. 
              Pour un accompagnement personnalisé, parlez-en avec votre médecin.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guides;
