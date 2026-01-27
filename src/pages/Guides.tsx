import { Link } from 'react-router-dom';
import { Scale, Cigarette, Moon, Activity, ChevronRight, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import { useToast } from '@/hooks/use-toast';

const guides = [
  {
    id: 'poids',
    title: 'Gérer son poids durablement',
    description: 'Des conseils pratiques et progressifs pour atteindre un poids santé, sans régime restrictif.',
    icon: Scale,
    color: 'bg-primary/10 text-primary',
    pdfAvailable: false,
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
    pdfAvailable: false,
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
    pdfAvailable: false,
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
    pdfAvailable: false,
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
  const { seniorMode, titleClass, textClass, buttonSize, gridCols2, cardPadding, smallTextClass, subtitleClass } = useSeniorMode();
  const { toast } = useToast();
  
  const handleDownloadPDF = (guideId: string, pdfAvailable: boolean) => {
    if (!pdfAvailable) {
      toast({
        title: "Guide bientôt disponible",
        description: "Ce guide PDF est en cours de préparation. Revenez prochainement.",
      });
      return;
    }
    // Future: download real PDF
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb
          items={[
            { label: 'Guides transversaux' },
          ]}
        />

        <header className={seniorMode ? 'mb-14 lg:mb-16 text-center' : 'mb-10 lg:mb-14 text-center'}>
          <h1 className={titleClass + ' text-center'}>
            Guides transversaux
          </h1>
          <p className={textClass + ' max-w-2xl mx-auto'}>
            Des conseils qui s'appliquent à toutes les pathologies : poids, tabac, sommeil, activité physique. 
            Ces guides vous accompagnent au quotidien pour une meilleure qualité de vie.
          </p>
        </header>

        <div className={`${gridCols2} max-w-5xl mx-auto`}>
          {guides.map((guide) => (
            <div key={guide.id} className={`card-medical flex flex-col ${seniorMode ? 'border-2' : ''}`}>
              <div className={`flex items-start gap-4 ${seniorMode ? 'mb-6' : 'mb-4'}`}>
                <div className={`rounded-xl ${guide.color} flex items-center justify-center shrink-0 ${seniorMode ? 'w-16 h-16' : 'w-14 h-14'}`}>
                  <guide.icon className={seniorMode ? 'w-8 h-8' : 'w-7 h-7'} />
                </div>
                <div>
                  <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-2xl mb-2' : 'text-xl mb-1'}`}>
                    {guide.title}
                  </h2>
                  <p className={smallTextClass}>
                    {guide.description}
                  </p>
                </div>
              </div>

              <div className={`flex-grow ${seniorMode ? 'mb-8' : 'mb-6'}`}>
                <h3 className={`font-semibold text-foreground ${seniorMode ? 'text-base mb-3' : 'text-sm mb-2'}`}>Dans ce guide :</h3>
                <ul className={seniorMode ? 'space-y-2' : 'space-y-1.5'}>
                  {guide.topics.map((topic, index) => (
                    <li key={index} className={`flex items-center gap-2 text-muted-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>
                      <ChevronRight className={`text-primary shrink-0 ${seniorMode ? 'w-5 h-5' : 'w-4 h-4'}`} />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => handleDownloadPDF(guide.id, guide.pdfAvailable)} 
                  variant={guide.pdfAvailable ? "pdf" : "outline"}
                  size={buttonSize}
                  className="flex-1"
                  disabled={!guide.pdfAvailable}
                >
                  {guide.pdfAvailable ? (
                    <Download className={seniorMode ? 'w-5 h-5' : 'w-4 h-4'} />
                  ) : (
                    <Clock className={seniorMode ? 'w-5 h-5' : 'w-4 h-4'} />
                  )}
                  {guide.pdfAvailable ? 'Télécharger le PDF' : 'Bientôt disponible'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Note importante */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className={`bg-muted/50 rounded-xl text-center ${seniorMode ? 'p-8' : 'p-6'}`}>
            <p className={smallTextClass}>
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
