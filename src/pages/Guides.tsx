import { Scale, Cigarette, Moon, Activity, ChevronRight, Download, Eye, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { useToast } from '@/hooks/use-toast';
import { openGuidePrintFallback, isGuideAvailable } from '@/lib/guidePrintFallback';

const guides = [
  {
    id: 'poids',
    title: 'GÃ©rer son poids durablement',
    description: 'Des conseils pratiques et progressifs pour atteindre un poids santÃ©, sans rÃ©gime restrictif.',
    icon: Scale,
    color: 'bg-primary/10 text-primary',
    topics: [
      'Pourquoi les rÃ©gimes restrictifs Ã©chouent',
      'L\'assiette Ã©quilibrÃ©e au quotidien',
      'Bouger sans se faire mal',
      'GÃ©rer les fringales',
      'Dormir pour maigrir',
    ],
  },
  {
    id: 'tabac',
    title: 'ArrÃªter le tabac',
    description: 'Une approche progressive et bienveillante pour se libÃ©rer du tabac.',
    icon: Cigarette,
    color: 'bg-destructive/10 text-destructive',
    topics: [
      'Comprendre sa dÃ©pendance',
      'PrÃ©parer son arrÃªt',
      'Les substituts nicotiniques',
      'GÃ©rer les envies',
      'Ã‰viter la rechute',
    ],
  },
  {
    id: 'sommeil',
    title: 'AmÃ©liorer son sommeil',
    description: 'Retrouver un sommeil rÃ©parateur avec des habitudes simples et efficaces.',
    icon: Moon,
    color: 'bg-secondary/10 text-secondary',
    topics: [
      'L\'hygiÃ¨ne du sommeil',
      'PrÃ©parer sa nuit',
      'GÃ©rer les rÃ©veils nocturnes',
      'Alimentation et sommeil',
      'Quand consulter',
    ],
  },
  {
    id: 'bouger',
    title: 'Reprendre une activitÃ© physique',
    description: 'Bouger en douceur quand on a mal, qu\'on est essoufflÃ© ou qu\'on n\'a plus l\'habitude.',
    icon: Activity,
    color: 'bg-accent/10 text-accent',
    topics: [
      'Pourquoi bouger quand on a mal',
      'Commencer trÃ¨s progressivement',
      'Exercices niveau 0 (trÃ¨s facile)',
      'Exercices niveau 1 Ã  3',
      'IntÃ©grer le mouvement au quotidien',
    ],
  },
];

const Guides = () => {
  const seniorMode = false;
  const titleClass = "font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4";
  const subtitleClass = "text-xl md:text-2xl font-serif font-bold";
  const textClass = "text-lg text-muted-foreground";
  const smallTextClass = "text-sm text-muted-foreground";
  const buttonSize = "default" as const;
  const cardPadding = "p-4 lg:p-6";
  const gridCols = "grid md:grid-cols-2 lg:grid-cols-3 gap-6";
  const gridCols2 = "grid md:grid-cols-2 gap-4 lg:gap-6";
  const iconSize = "w-5 h-5";
  const iconSizeLg = "w-6 h-6";
  const badgeClass = "text-xs px-2 py-1";
  const inputClass = "h-11 text-base rounded-lg";
  const cardClass = "card-medical";
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);
  
  const handlePreview = (guideId: string) => {
    const available = isGuideAvailable(guideId);
    if (!available) {
      toast({
        title: "Guide indisponible",
        description: "Ce guide n'est pas encore disponible.",
        variant: "destructive",
      });
      return;
    }
    
    const success = openGuidePrintFallback({ guideId, autoPrint: false });
    if (!success) {
      toast({
        title: "Erreur",
        description: "Impossible d'ouvrir l'aperÃ§u. VÃ©rifiez que les popups ne sont pas bloquÃ©es.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = (guideId: string) => {
    const available = isGuideAvailable(guideId);
    if (!available) {
      toast({
        title: "Guide indisponible",
        description: "Ce guide n'est pas encore disponible.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(guideId);
    const success = openGuidePrintFallback({ guideId, autoPrint: true });
    
    if (success) {
      toast({
        title: "Impression lancÃ©e",
        description: "Utilisez 'Enregistrer en PDF' dans la boÃ®te de dialogue d'impression.",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Impossible d'ouvrir le guide. VÃ©rifiez que les popups ne sont pas bloquÃ©es.",
        variant: "destructive",
      });
    }
    setLoading(null);
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
            Des conseils qui s'appliquent Ã  toutes les pathologies : poids, tabac, sommeil, activitÃ© physique. 
            Ces guides vous accompagnent au quotidien pour une meilleure qualitÃ© de vie.
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
                  onClick={() => handlePreview(guide.id)} 
                  variant="outline"
                  size={buttonSize}
                  className="flex-1"
                  disabled={!isGuideAvailable(guide.id)}
                >
                  <Eye className={seniorMode ? 'w-5 h-5' : 'w-4 h-4'} />
                  AperÃ§u
                </Button>
                <Button 
                  onClick={() => handleDownload(guide.id)} 
                  variant="pdf"
                  size={buttonSize}
                  className="flex-1"
                  disabled={loading === guide.id || !isGuideAvailable(guide.id)}
                >
                  {loading === guide.id ? (
                    <Loader2 className={`animate-spin ${seniorMode ? 'w-5 h-5' : 'w-4 h-4'}`} />
                  ) : (
                    <Download className={seniorMode ? 'w-5 h-5' : 'w-4 h-4'} />
                  )}
                  TÃ©lÃ©charger
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Note importante */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className={`bg-muted/50 rounded-xl text-center ${seniorMode ? 'p-8' : 'p-6'}`}>
            <p className={smallTextClass}>
              <strong>Rappel :</strong> Ces guides sont des informations gÃ©nÃ©rales. 
              Pour un accompagnement personnalisÃ©, parlez-en avec votre mÃ©decin.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Guides;
