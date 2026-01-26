import { Link } from 'react-router-dom';
import { ArrowRight, Download, Compass, ZoomIn, Heart, Bone, Wind, Cigarette, Activity, Baby, CircleDot, FileText, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { fullQuickAnswers } from '@/data/quick-answers';
import { pathologies } from '@/data/pathologies';
import { generateOnePage, downloadPdf } from '@/services/pdfGenerator';

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
  { title: 'Jambes légères - 5 actions', category: 'Veino-lymphatique', slug: 'insuffisance-veineuse' },
  { title: 'BPCO - Respirer mieux', category: 'Respiratoire', slug: 'bpco' },
  { title: 'Otites enfant - Prévention', category: 'Parents', slug: 'otites-repetition-enfant' },
];

const Index = () => {
  const { seniorMode, toggleSeniorMode } = useAccessibility();

  return (
    <Layout>
      {/* Hero Section - Product focused */}
      <section className="hero-gradient text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Des plans simples, imprimables,<br />pour reprendre la main.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
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
      <section className="py-10 lg:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              Quel est votre sujet ?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {themeButtons.map((theme) => (
                <Link
                  key={theme.id}
                  to={theme.href}
                  className={`flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl transition-all duration-200 ${theme.color} border-2 border-transparent hover:border-current group`}
                >
                  <theme.icon className="w-10 h-10 lg:w-12 lg:h-12 mb-3" />
                  <span className="font-serif text-lg lg:text-xl font-bold">{theme.label}</span>
                  <span className="text-sm opacity-80">{theme.sublabel}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Start in 30 seconds */}
      <section className="py-10 lg:py-14 warm-section">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl shadow-card p-8 lg:p-10 text-center border border-border">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Compass className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Commencer en 30 secondes
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Répondez à 3 questions simples. Je vous propose un plan d'action personnalisé, 
                imprimable, adapté à votre niveau de mobilité.
              </p>
              <Button asChild size="xl">
                <Link to="/parcours" className="gap-2">
                  <Compass className="w-5 h-5" />
                  Démarrer le parcours guidé
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answers Preview */}
      <section className="py-10 lg:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  Réponses rapides
                </h2>
                <p className="text-muted-foreground mt-1">Une réponse en 20 secondes</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/reponses-rapides" className="gap-2">
                  Voir tout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fullQuickAnswers.slice(0, 3).map((answer) => (
                <Link
                  key={answer.slug}
                  to={`/reponses-rapides/${answer.slug}`}
                  className="card-medical hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${answer.color}`}>
                      <CircleDot className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {answer.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
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
      <section className="py-10 lg:py-14 warm-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                  PDF imprimables
                </h2>
                <p className="text-muted-foreground mt-1">Mes 5 fiches les plus téléchargées</p>
              </div>
              <Button asChild variant="outline">
                <Link to="/telechargements" className="gap-2">
                  <Download className="w-4 h-4" />
                  Tous les PDF
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {topPDFs.map((pdf, index) => {
                const pathology = pathologies.find(p => p.slug === pdf.slug);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/pathologies/${pdf.slug}`}
                        className="font-medium text-foreground group-hover:text-primary transition-colors"
                      >
                        {pdf.title}
                      </Link>
                      <p className="text-sm text-muted-foreground">{pdf.category}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-1 text-muted-foreground hover:text-primary"
                        onClick={() => {
                          if (pathology) {
                            const doc = generateOnePage(pathology);
                            downloadPdf(doc, `COOLANCE_${pdf.slug}_fiche-1-page.pdf`);
                          }
                        }}
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">PDF</span>
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
      <section className="py-10 lg:py-14 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-4">
              "Mon objectif est simple : vous aider à mettre en place des habitudes qui tiennent dans la vraie vie."
            </p>
            <Link 
              to="/qui-suis-je" 
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              En savoir plus sur ma démarche
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
