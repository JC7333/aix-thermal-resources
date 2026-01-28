import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Compass, ZoomIn, Heart, Bone, Wind, Cigarette, Activity, Baby, CircleDot, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import { quickAnswers, pathologies } from '@/content/content';
import { downloadPdf1PageBySlug, hasEvidenceData } from '@/services/pdfService';
import { useToast } from '@/hooks/use-toast';
import { getPathologyUrl } from '@/lib/pathologyRoutes';

const themeButtons = [
  { 
    id: 'douleur', 
    label: 'Douleur', 
    sublabel: 'Arthrose / Dos',
    icon: Bone, 
    color: 'bg-primary/10 text-primary hover:bg-primary/20',
    href: '/reponses-rapides/arthrose-dos'
  },
  { 
    id: 'poids', 
    label: 'Poids', 
    sublabel: 'Sans se décourager',
    icon: Heart, 
    color: 'bg-secondary/20 text-secondary hover:bg-secondary/30',
    href: '/reponses-rapides/perdre-poids'
  },
  { 
    id: 'tabac', 
    label: 'Tabac', 
    sublabel: 'Plan simple',
    icon: Cigarette, 
    color: 'bg-accent/20 text-accent hover:bg-accent/30',
    href: '/reponses-rapides/arreter-fumer'
  },
  { 
    id: 'souffle', 
    label: 'Souffle', 
    sublabel: 'Asthme / BPCO',
    icon: Wind, 
    color: 'bg-trust-teal/20 text-trust-teal hover:bg-trust-teal/30',
    href: '/reponses-rapides/essoufflement'
  },
  { 
    id: 'jambes', 
    label: 'Jambes', 
    sublabel: 'Lourdes / Gonflées',
    icon: Activity, 
    color: 'bg-primary/10 text-primary hover:bg-primary/20',
    href: '/reponses-rapides/jambes-lourdes'
  },
  { 
    id: 'parents', 
    label: 'Parents ORL', 
    sublabel: 'Otites / Angines',
    icon: Baby, 
    color: 'bg-secondary/20 text-secondary hover:bg-secondary/30',
    href: '/reponses-rapides/otite-angine-enfant'
  },
];

const topPDFs = [
  { title: 'Plan arthrose 7 jours', category: 'Rhumatologie', slug: 'arthrose' },
  { title: 'Plan lombalgie 7 jours', category: 'Rhumatologie', slug: 'lombalgie-chronique' },
  { title: 'Jambes légères - 5 actions', category: 'Veino-lymphatique', slug: 'insuffisance-veineuse-chronique' },
  { title: 'BPCO - Respirer mieux', category: 'Respiratoire', slug: 'bpco' },
  { title: 'Otites enfant - Prévention', category: 'Parents', slug: 'otites-a-repetition-enfant' },
];

const Index = () => {
  const { seniorMode, toggleSeniorMode } = useAccessibility();
  const { titleClass, textClass, subtitleClass, buttonSize, iconSize, iconSizeLg, gridCols, smallTextClass } = useSeniorMode();
  const [downloadingSlug, setDownloadingSlug] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDownloadPdf = async (slug: string) => {
    if (!hasEvidenceData(slug)) {
      toast({
        title: "PDF non disponible",
        description: "Les données pour cette pathologie ne sont pas encore disponibles.",
        variant: "destructive",
      });
      return;
    }
    
    setDownloadingSlug(slug);
    try {
      await downloadPdf1PageBySlug(slug);
      toast({
        title: "Téléchargement réussi",
        description: "Votre fiche PDF a été téléchargée.",
      });
    } catch (error) {
      console.error('Erreur téléchargement PDF:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setDownloadingSlug(null);
    }
  };
  return (
    <Layout>
      {/* Hero Section - Product focused */}
      <section id="hero" className={`hero-gradient text-white ${seniorMode ? 'py-20 lg:py-28' : 'py-16 lg:py-24'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`font-serif font-bold leading-tight ${seniorMode ? 'text-4xl md:text-5xl lg:text-6xl mb-8' : 'text-3xl md:text-4xl lg:text-5xl mb-6'}`}>
              Des plans simples, imprimables,<br />pour reprendre la main.
            </h1>
            <p className={`text-white/90 leading-relaxed max-w-2xl mx-auto ${seniorMode ? 'text-xl md:text-2xl mb-10' : 'text-lg md:text-xl mb-8'}`}>
              Douleur, poids, souffle, jambes, enfants : je vous guide avec des actions concrètes, 
              adaptées à votre niveau de mobilité.
            </p>
            
            {/* Senior Mode CTA */}
            {!seniorMode && (
              <div className="mb-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm inline-block">
                <p className="text-white/90 text-sm mb-3">
                  Difficultés à lire ?
                </p>
                <Button onClick={toggleSeniorMode} variant="heroOutline" size="lg" className="gap-2">
                  <ZoomIn className="w-5 h-5" />
                  Activer le mode Senior
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6 Theme Buttons */}
      <section id="themes" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className={`font-serif font-bold text-foreground text-center ${seniorMode ? 'text-3xl md:text-4xl mb-10' : 'text-2xl md:text-3xl mb-8'}`}>
              Quel est votre sujet ?
            </h2>
            <div className={`grid grid-cols-2 md:grid-cols-3 ${seniorMode ? 'gap-6 lg:gap-8' : 'gap-4 lg:gap-6'}`}>
              {themeButtons.map((theme) => (
                <Link
                  key={theme.id}
                  to={theme.href}
                  className={`flex flex-col items-center justify-center rounded-2xl transition-all duration-200 ${theme.color} border-2 border-transparent hover:border-current group ${seniorMode ? 'p-8 lg:p-10' : 'p-6 lg:p-8'}`}
                >
                  <theme.icon className={seniorMode ? 'w-14 h-14 lg:w-16 lg:h-16 mb-4' : 'w-10 h-10 lg:w-12 lg:h-12 mb-3'} />
                  <span className={`font-serif font-bold ${seniorMode ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'}`}>{theme.label}</span>
                  <span className={`opacity-80 ${seniorMode ? 'text-base' : 'text-sm'}`}>{theme.sublabel}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Start in 30 seconds */}
      <section id="guided-path" className={`warm-section ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className={`bg-card rounded-2xl shadow-card text-center border border-border ${seniorMode ? 'p-10 lg:p-14' : 'p-8 lg:p-10'}`}>
              <div className={`rounded-2xl bg-primary/10 flex items-center justify-center mx-auto ${seniorMode ? 'w-20 h-20 mb-8' : 'w-16 h-16 mb-6'}`}>
                <Compass className={seniorMode ? 'w-10 h-10 text-primary' : 'w-8 h-8 text-primary'} />
              </div>
              <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl md:text-4xl mb-6' : 'text-2xl md:text-3xl mb-4'}`}>
                Commencer en 30 secondes
              </h2>
              <p className={`text-muted-foreground ${seniorMode ? 'text-xl mb-8' : 'text-lg mb-6'}`}>
                Répondez à 3 questions simples. Je vous propose un plan d'action personnalisé, 
                imprimable, adapté à votre niveau de mobilité.
              </p>
              <Button asChild size={seniorMode ? 'xl' : 'xl'}>
                <Link to="/parcours" className="gap-2">
                  <Compass className={iconSize} />
                  Démarrer le parcours guidé
                  <ArrowRight className={iconSize} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answers Preview */}
      <section id="resources" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className={`flex items-center justify-between ${seniorMode ? 'mb-10' : 'mb-8'}`}>
              <div>
                <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                  Réponses rapides
                </h2>
                <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-lg' : ''}`}>Une réponse en 20 secondes</p>
              </div>
              <Button asChild variant="outline" size={buttonSize}>
                <Link to="/reponses-rapides" className="gap-2">
                  Voir tout
                  <ArrowRight className={iconSize} />
                </Link>
              </Button>
            </div>

            <div className={seniorMode ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
              {quickAnswers.slice(0, 3).map((answer) => (
                <Link
                  key={answer.slug}
                  to={`/reponses-rapides/${answer.slug}`}
                  className={`card-medical hover:shadow-lg transition-shadow group ${seniorMode ? 'border-2 p-6' : ''}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-xl flex items-center justify-center shrink-0 bg-${answer.color}/10 ${seniorMode ? 'w-14 h-14' : 'w-12 h-12'}`}>
                      <span className={seniorMode ? 'text-3xl' : 'text-2xl'}>{answer.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                        {answer.title}
                      </h3>
                      <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                        {answer.subtitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top PDFs */}
      <section id="downloads" className={`warm-section ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`flex items-center justify-between ${seniorMode ? 'mb-10' : 'mb-8'}`}>
              <div>
                <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                  PDF imprimables
                </h2>
                <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-lg' : ''}`}>Mes 5 fiches les plus téléchargées</p>
              </div>
              <Button asChild variant="outline" size={buttonSize}>
                <Link to="/telechargements" className="gap-2">
                  <Download className={iconSize} />
                  Tous les PDF
                </Link>
              </Button>
            </div>

            <div className={seniorMode ? 'space-y-4' : 'space-y-3'}>
              {topPDFs.map((pdf, index) => {
                const pathology = pathologies.find(p => p.slug === pdf.slug);
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-4 bg-card rounded-xl border hover:border-primary/30 hover:shadow-sm transition-all group ${seniorMode ? 'p-6 border-2' : 'p-4 border'}`}
                  >
                    <div className={`rounded-lg bg-primary/10 flex items-center justify-center shrink-0 ${seniorMode ? 'w-14 h-14' : 'w-10 h-10'}`}>
                      <FileText className={`text-primary ${seniorMode ? 'w-7 h-7' : 'w-5 h-5'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={getPathologyUrl(pdf.slug)}
                        className={`font-medium text-foreground group-hover:text-primary transition-colors ${seniorMode ? 'text-xl' : ''}`}
                      >
                        {pdf.title}
                      </Link>
                      <p className={`text-muted-foreground ${seniorMode ? 'text-base' : 'text-sm'}`}>{pdf.category}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button 
                        variant="ghost" 
                        size={buttonSize} 
                        className={`gap-1 text-muted-foreground hover:text-primary ${seniorMode ? 'h-12 px-4' : ''}`}
                        disabled={downloadingSlug === pdf.slug}
                        onClick={() => handleDownloadPdf(pdf.slug)}
                      >
                        {downloadingSlug === pdf.slug ? (
                          <Loader2 className={`animate-spin ${iconSize}`} />
                        ) : (
                          <Download className={iconSize} />
                        )}
                        <span className={seniorMode ? 'inline' : 'hidden sm:inline'}>PDF</span>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section id="about" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className={`text-muted-foreground ${seniorMode ? 'text-xl mb-6' : 'text-lg mb-4'}`}>
              "Mon objectif est simple : vous aider à mettre en place des habitudes qui tiennent dans la vraie vie."
            </p>
            <Link 
              to="/qui-suis-je" 
              className={`inline-flex items-center gap-2 text-primary font-medium hover:underline ${seniorMode ? 'text-xl' : ''}`}
            >
              En savoir plus sur ma démarche
              <ArrowRight className={iconSize} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
