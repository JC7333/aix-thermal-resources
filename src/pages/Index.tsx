import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Compass, ZoomIn, Heart, Bone, Wind, Activity, Baby, FileText, Loader2 } from 'lucide-react';
import { BLOG_ARTICLES } from '@/content/blog';
import { PATHOLOGY_LABELS } from '@/content/blog/constants';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import { pathologies } from '@/content/content';
import { downloadPdf1PageBySlug, hasEvidenceData } from '@/services/pdfService';
import { useToast } from '@/hooks/use-toast';
import { getPathologyUrl } from '@/lib/pathologyRoutes';
import { usePageTitle } from '@/hooks/usePageTitle';
import { JsonLd } from '@/components/shared/JsonLd';
import { FAQ_GENERAL } from '@/content/faq';
import { FaqSection } from '@/components/shared/FaqSection';
import { FaqJsonLd } from '@/components/shared/FaqJsonLd';

const topPDFs = [
  { title: 'Plan arthrose 7 jours', category: 'Rhumatologie', slug: 'gonarthrose' },
  { title: 'Plan lombalgie 7 jours', category: 'Rhumatologie', slug: 'lombalgie-chronique' },
  { title: 'Jambes légères - 5 actions', category: 'Veino-lymphatique', slug: 'insuffisance-veineuse' },
  { title: 'BPCO - Respirer mieux', category: 'Respiratoire', slug: 'bpco' },
  { title: 'Otites enfant - Prévention', category: 'Parents', slug: 'otites-repetition-enfant' },
];

const mainPathologies = [
  {
    slug: 'gonarthrose',
    name: 'Arthrose du genou',
    description: 'Exercices, plans 7 jours et 8 semaines',
    icon: Bone,
    color: 'border-primary/30 hover:border-primary',
    badge: 'Rhumatologie',
  },
  {
    slug: 'coxarthrose',
    name: 'Arthrose de la hanche',
    description: 'Mobilité, renforcement, gestion du poids',
    icon: Bone,
    color: 'border-primary/30 hover:border-primary',
    badge: 'Rhumatologie',
  },
  {
    slug: 'lombalgie-chronique',
    name: 'Lombalgie chronique',
    description: 'Comprendre la douleur, bouger sans peur',
    icon: Activity,
    color: 'border-primary/30 hover:border-primary',
    badge: 'Rhumatologie',
  },
  {
    slug: 'tendinopathie-coiffe',
    name: 'Épaule (coiffe)',
    description: 'Rééducation, renforcement, posture',
    icon: Activity,
    color: 'border-primary/30 hover:border-primary',
    badge: 'Rhumatologie',
  },
  {
    slug: 'insuffisance-veineuse',
    name: 'Insuffisance veineuse',
    description: 'Compression, pompe du mollet, soins de peau',
    icon: Heart,
    color: 'border-secondary/30 hover:border-secondary',
    badge: 'Veino-lymphatique',
  },
  {
    slug: 'bpco',
    name: 'BPCO',
    description: 'Techniques respiratoires, marche fractionnée',
    icon: Wind,
    color: 'border-trust-teal/30 hover:border-trust-teal',
    badge: 'Respiratoire',
  },
  {
    slug: 'asthme',
    name: 'Asthme',
    description: "Contrôle, exercice adapté, plan d'action",
    icon: Wind,
    color: 'border-trust-teal/30 hover:border-trust-teal',
    badge: 'Respiratoire',
  },
  {
    slug: 'otites-repetition-enfant',
    name: 'Otites enfant',
    description: 'Prévention, hygiène, quand consulter',
    icon: Baby,
    color: 'border-accent/30 hover:border-accent',
    badge: 'Parents',
  },
];

const Index = () => {
  const { seniorMode, toggleSeniorMode } = useAccessibility();
  const { buttonSize, iconSize } = useSeniorMode();
  const [downloadingSlug, setDownloadingSlug] = useState<string | null>(null);
  const { toast } = useToast();
  usePageTitle();

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
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Étuve",
        "url": "https://etuve.fr",
        "description": "Programme d'éducation thérapeutique pour patients en cure thermale",
        "founder": {
          "@type": "Person",
          "name": "Dr Audric Bugnard",
          "jobTitle": "Médecin généraliste et thermaliste"
        },
        "areaServed": { "@type": "Place", "name": "Aix-les-Bains, France" }
      }} />
      {/* Hero Section - Product focused */}
      <section id="hero" className={`hero-gradient text-white ${seniorMode ? 'py-20 lg:py-28' : 'py-16 lg:py-24'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={`font-serif font-bold leading-tight ${seniorMode ? 'text-4xl md:text-5xl lg:text-6xl mb-8' : 'text-3xl md:text-4xl lg:text-5xl mb-6'}`}>
              Des plans simples, imprimables,<br />pour reprendre la main.
            </h1>
            <p className={`text-white/90 leading-relaxed max-w-2xl mx-auto ${seniorMode ? 'text-xl md:text-2xl mb-10' : 'text-lg md:text-xl mb-8'}`}>
              Exercices adaptés, fiches imprimables, podcasts audio.
              Tout est basé sur les recommandations scientifiques.
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${seniorMode ? 'mb-10' : 'mb-8'}`}>
              <Button asChild size="xl" className="bg-white text-primary hover:bg-white/90 font-bold shadow-lg">
                <Link to="/parcours" className="gap-2">
                  <Compass className="w-5 h-5" />
                  Mon plan personnalisé
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
                  Difficultés Ã  lire ?
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

      {/* Section thèmes supprimée â€” les pathology cards V2 sont plus directes
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
                Répondez Ã  3 questions simples. Recevez un plan d'action personnalisé, 
                imprimable, adapté Ã  votre niveau de mobilité.
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

      {/* 5 Main Pathologies â€” Direct V2 access */}
      <section id="pathologies" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl md:text-4xl mb-4' : 'text-2xl md:text-3xl mb-3'}`}>
                Votre pathologie
              </h2>
              <p className={`text-muted-foreground ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                Podcasts, exercices adaptés, fiches imprimables, sources scientifiques
              </p>
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${seniorMode ? 'gap-6' : 'gap-4'}`}>
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
                        Découvrir
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

      {/* Section réponses rapides supprimée â€” les patients accèdent au contenu V2 directement
      <section id="resources" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        ...
      </section>
      */}

      {/* Top PDFs */}

      {/* Evidence-based + IA signal */}
      <section className={`bg-muted/50 ${seniorMode ? 'py-8' : 'py-6'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className={`flex flex-wrap items-center justify-center ${seniorMode ? 'gap-8' : 'gap-6'} text-muted-foreground`}>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={seniorMode ? 'text-base' : 'text-sm'}>Sources HAS, Cochrane, NICE</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className={seniorMode ? 'text-base' : 'text-sm'}>6 à 10 sources par pathologie</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
                <span className={seniorMode ? 'text-base' : 'text-sm'}>Validé par un médecin thermaliste</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                <span className={seniorMode ? 'text-base' : 'text-sm'}>Podcasts générés par IA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* Derniers articles du blog */}
      {BLOG_ARTICLES.length > 0 && (
        <section className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl md:text-4xl mb-6' : 'text-2xl md:text-3xl mb-6'}`}>
                Derniers articles
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {BLOG_ARTICLES.slice(0, 4).map((article) => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="p-5 rounded-xl border border-border hover:border-primary/50 hover:shadow-sm transition-all group"
                  >
                    <div className="text-xs text-muted-foreground mb-1 flex items-center gap-2">
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                      </time>
                      {article.pathology && (
                        <span className="text-primary">{PATHOLOGY_LABELS[article.pathology] || ''}</span>
                      )}
                    </div>
                    <h3 className={`font-semibold text-foreground group-hover:text-primary transition-colors leading-snug ${seniorMode ? 'text-base' : 'text-sm'}`}>
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link to="/blog" className="text-primary font-medium hover:underline text-sm inline-flex items-center gap-1">
                  Tous les articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ générale */}
      <section className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <FaqJsonLd items={FAQ_GENERAL} id="jsonld-faq-home" />
            <FaqSection items={FAQ_GENERAL} />
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section id="about" className={`bg-background ${seniorMode ? 'py-14 lg:py-18' : 'py-10 lg:py-14'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className={`text-muted-foreground ${seniorMode ? 'text-xl mb-6' : 'text-lg mb-4'}`}>
              "Mon objectif est simple : vous aider Ã  mettre en place des habitudes qui tiennent dans la vraie vie."
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

