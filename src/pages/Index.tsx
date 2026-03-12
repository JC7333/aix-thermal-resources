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
import { usePageTitle } from '@/hooks/usePageTitle';

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
    sublabel: 'Sans se dÃ©courager',
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
    sublabel: 'Lourdes / GonflÃ©es',
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
  { title: 'Plan arthrose 7 jours', category: 'Rhumatologie', slug: 'gonarthrose' },
  { title: 'Plan lombalgie 7 jours', category: 'Rhumatologie', slug: 'lombalgie-chronique' },
  { title: 'Jambes lÃ©gÃ¨res - 5 actions', category: 'Veino-lymphatique', slug: 'insuffisance-veineuse' },
  { title: 'BPCO - Respirer mieux', category: 'Respiratoire', slug: 'bpco' },
  { title: 'Otites enfant - PrÃ©vention', category: 'Parents', slug: 'otites-repetition-enfant' },
];

const mainPathologies = [
  {
    slug: 'gonarthrose',
    name: 'Arthrose du genou',
    description: 'Exercices adaptÃ©s, plans 7 jours et 8 semaines, conseils quotidiens',
    icon: Bone,
    color: 'border-primary/30 hover:border-primary',
    badge: 'Rhumatologie',
  },
  {
    slug: 'lombalgie-chronique',
    name: 'Lombalgie chronique',
    description: 'Comprendre la douleur, bouger sans peur, programme progressif',
    icon: Activity,
    color: 'border-primary/30 hover:border-primary',
    badge: 'Rhumatologie',
  },
  {
    slug: 'insuffisance-veineuse',
    name: 'Insuffisance veineuse',
    description: 'Compression, pompe du mollet, Ã©lÃ©vation, soins de peau',
    icon: Heart,
    color: 'border-secondary/30 hover:border-secondary',
    badge: 'Veino-lymphatique',
  },
  {
    slug: 'bpco',
    name: 'BPCO',
    description: "Techniques respiratoires, marche fractionnÃ©e, plan d'action",
    icon: Wind,
    color: 'border-trust-teal/30 hover:border-trust-teal',
    badge: 'Respiratoire',
  },
  {
    slug: 'otites-repetition-enfant',
    name: 'Otites enfant',
    description: "PrÃ©vention, hygiÃ¨ne, quand consulter l'ORL",
    icon: Baby,
    color: 'border-accent/30 hover:border-accent',
    badge: 'Parents',
  },
];

const Index = () => {
  const { seniorMode, toggleSeniorMode } = useAccessibility();
  const { titleClass, textClass, subtitleClass, buttonSize, iconSize, iconSizeLg, gridCols, smallTextClass } = useSeniorMode();
  const [downloadingSlug, setDownloadingSlug] = useState<string | null>(null);
  const { toast } = useToast();
  usePageTitle();

  const handleDownloadPdf = async (slug: string) => {
    if (!hasEvidenceData(slug)) {
      toast({
        title: "PDF non disponible",
        description: "Les donnÃ©es pour cette pathologie ne sont pas encore disponibles.",
        variant: "destructive",
      });
      return;
    }
    
    setDownloadingSlug(slug);
    try {
      await downloadPdf1PageBySlug(slug);
      toast({
        title: "TÃ©lÃ©chargement rÃ©ussi",
        description: "Votre fiche PDF a Ã©tÃ© tÃ©lÃ©chargÃ©e.",
      });
    } catch (error) {
      console.error('Erreur tÃ©lÃ©chargement PDF:', error);
      toast({
        title: "Erreur de tÃ©lÃ©chargement",
        description: "Une erreur est survenue. Veuillez rÃ©essayer.",
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
              Exercices adaptÃ©s, fiches imprimables, podcasts audio.
              Tout est basÃ© sur les recommandations scientifiques.
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${seniorMode ? 'mb-10' : 'mb-8'}`}>
              <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg">
                <Link to="/parcours" className="gap-2">
                  <Compass className="w-5 h-5" />
                  Mon plan personnalisÃ©
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="xl" variant="heroOutline">
                <Link to="#pathologies" className="gap-2">
                  <FileText className="w-5 h-5" />
                  Choisir ma pathologie
                </Link>
              </Button>
            </div>

            {/* Senior Mode CTA */}
            {!seniorMode && (
              <div className="mb-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm inline-block">
                <p className="text-white/90 text-sm mb-3">
                  DifficultÃ©s Ã  lire ?
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

      {/* Section thÃ¨mes supprimÃ©e â€” les pathology cards V2 sont plus directes
      <section id="themes" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        ...
      </section>
      */}

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
                RÃ©pondez Ã  3 questions simples. Recevez un plan d'action personnalisÃ©, 
                imprimable, adaptÃ© Ã  votre niveau de mobilitÃ©.
              </p>
              <Button asChild size={seniorMode ? 'xl' : 'xl'}>
                <Link to="/parcours" className="gap-2">
                  <Compass className={iconSize} />
                  DÃ©marrer le parcours guidÃ©
                  <ArrowRight className={iconSize} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Main Pathologies â€” Direct V2 access */}
      <section id="pathologies" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl md:text-4xl mb-4' : 'text-2xl md:text-3xl mb-3'}`}>
                Votre pathologie
              </h2>
              <p className={`text-muted-foreground ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                Podcasts, exercices adaptÃ©s, fiches imprimables, sources scientifiques
              </p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${seniorMode ? 'gap-6' : 'gap-4'}`}>
              {mainPathologies.map((patho) => (
                <Link
                  key={patho.slug}
                  to={getPathologyUrl(patho.slug)}
                  className={`group rounded-2xl border-2 bg-card transition-all duration-200 hover:shadow-lg ${patho.color} ${seniorMode ? 'p-6' : 'p-5'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-xl bg-muted flex items-center justify-center flex-shrink-0 ${seniorMode ? 'w-14 h-14' : 'w-12 h-12'}`}>
                      <patho.icon className={`text-primary ${seniorMode ? 'w-7 h-7' : 'w-6 h-6'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        {patho.badge}
                      </span>
                      <h3 className={`font-bold text-foreground leading-tight mt-1 ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                        {patho.name}
                      </h3>
                      <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-base' : 'text-sm'}`}>
                        {patho.description}
                      </p>
                      <span className={`inline-flex items-center gap-1 font-semibold text-primary mt-3 group-hover:gap-2 transition-all ${seniorMode ? 'text-base' : 'text-sm'}`}>
                        DÃ©couvrir
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section rÃ©ponses rapides supprimÃ©e â€” les patients accÃ¨dent au contenu V2 directement
      <section id="resources" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        ...
      </section>
      */}

      {/* Top PDFs */}
      <section id="downloads" className={`warm-section ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`flex items-center justify-between ${seniorMode ? 'mb-10' : 'mb-8'}`}>
              <div>
                <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                  PDF imprimables
                </h2>
                <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-lg' : ''}`}>Mes 5 fiches les plus tÃ©lÃ©chargÃ©es</p>
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
              "Mon objectif est simple : vous aider Ã  mettre en place des habitudes qui tiennent dans la vraie vie."
            </p>
            <Link 
              to="/qui-suis-je" 
              className={`inline-flex items-center gap-2 text-primary font-medium hover:underline ${seniorMode ? 'text-xl' : ''}`}
            >
              En savoir plus sur ma dÃ©marche
              <ArrowRight className={iconSize} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

