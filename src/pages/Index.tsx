import { Link } from "react-router-dom";
import { ArrowRight, Download, FileText, Loader2 } from "lucide-react";
import { useState } from "react";
import { BLOG_ARTICLES } from "@/content/blog";
import { PATHOLOGY_LABELS } from "@/content/blog/constants";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import {
  hasEvidenceData,
  generatePdf1PageBySlug,
  downloadPdf,
  getPdfFilename,
} from "@/services/pdfService";
import { useToast } from "@/hooks/use-toast";
import { getPathologyUrl } from "@/lib/pathologyRoutes";
import { usePageTitle } from "@/hooks/usePageTitle";
import { JsonLd } from "@/components/shared/JsonLd";
import { FAQ_GENERAL } from "@/content/faq";
import { FaqSection } from "@/components/shared/FaqSection";
import { FaqJsonLd } from "@/components/shared/FaqJsonLd";
import { FadeIn } from "@/components/shared/FadeIn";

const mainPathologies = [
  {
    slug: "gonarthrose",
    name: "Arthrose du genou",
    subtitle: "(gonarthrose)",
    desc: "Un programme pour soulager votre genou. 5 min/jour pendant 3 semaines.",
    badge: "Rhumatologie",
  },
  {
    slug: "coxarthrose",
    name: "Arthrose de la hanche",
    subtitle: "(coxarthrose)",
    desc: "Moins de douleur, plus de mobilité. Exercices adaptés à votre niveau.",
    badge: "Rhumatologie",
  },
  {
    slug: "lombalgie-chronique",
    name: "Mal de dos chronique",
    subtitle: "(lombalgie)",
    desc: "Comprendre sa douleur et reprendre les activités sans crainte.",
    badge: "Rhumatologie",
  },
  {
    slug: "tendinopathie-coiffe",
    name: "Douleur à l'épaule",
    subtitle: "(coiffe des rotateurs)",
    desc: "Retrouver les gestes du quotidien : s'habiller, porter, dormir.",
    badge: "Rhumatologie",
  },
  {
    slug: "insuffisance-veineuse",
    name: "Jambes lourdes",
    subtitle: "(insuffisance veineuse)",
    desc: "Soulager les jambes, réduire les gonflements, mieux marcher.",
    badge: "Veino-lymphatique",
  },
  {
    slug: "bpco",
    name: "Essoufflement chronique",
    subtitle: "(BPCO)",
    desc: "Respirer mieux au quotidien grâce à des techniques simples.",
    badge: "Respiratoire",
  },
  {
    slug: "asthme",
    name: "Asthme",
    subtitle: "",
    desc: "Contrôler ses crises et pratiquer une activité physique en sécurité.",
    badge: "Respiratoire",
  },
  {
    slug: "otites-repetition-enfant",
    name: "Otites à répétition",
    subtitle: "(enfant)",
    desc: "Prévention, hygiène du nez et savoir quand consulter.",
    badge: "Parents",
  },
];

const topPDFs = [
  {
    title: "Plan arthrose 7 jours",
    category: "Rhumatologie",
    slug: "gonarthrose",
  },
  {
    title: "Plan lombalgie 7 jours",
    category: "Rhumatologie",
    slug: "lombalgie-chronique",
  },
  {
    title: "Jambes légères",
    category: "Veino-lymphatique",
    slug: "insuffisance-veineuse",
  },
  { title: "BPCO - Respirer mieux", category: "Respiratoire", slug: "bpco" },
  {
    title: "Otites enfant",
    category: "Parents",
    slug: "otites-repetition-enfant",
  },
];

const Index = () => {
  const [downloadingSlug, setDownloadingSlug] = useState<string | null>(null);
  const { toast } = useToast();
  usePageTitle();

  const handleDownloadPdf = async (slug: string) => {
    if (!hasEvidenceData(slug)) {
      toast({ title: "PDF non disponible", variant: "destructive" });
      return;
    }
    setDownloadingSlug(slug);
    try {
      const result = await generatePdf1PageBySlug(slug);
      if (result) {
        downloadPdf(result.blob, getPdfFilename(slug, "1page"));
      } else {
        toast({ title: "PDF non disponible", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur lors du téléchargement", variant: "destructive" });
    } finally {
      setDownloadingSlug(null);
    }
  };

  return (
    <Layout noPadding>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          name: "Étuve",
          url: "https://etuve.fr",
          description:
            "Programme personnalisé pour patients en cure thermale. 3 semaines pour aller mieux.",
          founder: {
            "@type": "Person",
            name: "Dr Audric Bugnard",
            jobTitle: "Médecin thermaliste",
          },
          areaServed: { "@type": "Place", name: "Aix-les-Bains, France" },
        }}
      />

      {/* HERO */}
      <section
        className="hero-photo min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center text-white"
        style={{ backgroundImage: "url(/images/hero.jpg)" }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn delay={0.2} direction="none">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              Votre programme personnalisé
              <br />
              <span className="text-white/90">en cure thermale</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.5} direction="none">
            <p className="text-lg sm:text-xl lg:text-2xl text-white/85 max-w-2xl mx-auto mb-4 leading-relaxed">
              3 semaines pour aller mieux. 5 minutes par jour. Gratuit.
            </p>
            <p className="text-base text-white/80 mt-2 mb-10">
              Un programme conçu par un médecin thermaliste, basé sur les preuves scientifiques.
            </p>
          </FadeIn>
          <FadeIn delay={0.8} direction="none">
            <div className="flex flex-col items-center justify-center">
              <a
                href="#pathologies"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary text-lg font-semibold hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                Choisir ma pathologie
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-white/70 mt-3">
                ou <a href="/pathologies" className="underline hover:text-white">voir tous les programmes</a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <FadeIn className="max-w-2xl mx-auto text-center py-16 px-5">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8">
          Comment ça marche ?
        </h2>
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">1.</span> Scannez le
            QR code dans votre cabine
          </p>
          <p>
            <span className="font-semibold text-foreground">2.</span> Répondez à
            3 questions <span className="text-sm">(5 min)</span>
          </p>
          <p>
            <span className="font-semibold text-foreground">3.</span> Recevez
            votre programme personnalisé de 21 jours
          </p>
        </div>
        <p className="text-base text-muted-foreground mt-6">
          Chaque jour : un conseil, un exercice et un suivi de votre douleur.
        </p>
      </FadeIn>

      {/* TRUST BAR */}
      <section className="py-6 border-b border-border/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <span>11 programmes adaptés</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>Contenu vérifié par un médecin</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>100% anonyme, aucune inscription</span>
            <span className="hidden sm:inline text-border">·</span>
            <span>Entièrement gratuit</span>
          </div>
        </div>
      </section>

      {/* PATHOLOGIES */}
      <section id="pathologies" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="max-w-2xl mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Quel est votre problème de santé ?
              </h2>
              <p className="text-lg text-muted-foreground">
                Choisissez votre pathologie pour accéder à un programme
                personnalisé, validé par les recommandations médicales.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mainPathologies.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.08}>
                <Link
                  to={getPathologyUrl(p.slug)}
                  className="group block p-6 rounded-2xl border border-border/60 hover:border-primary/40 bg-card hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    {p.badge}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground mt-2 mb-0.5 group-hover:text-primary transition-colors">
                    {p.name}
                  </h3>
                  {p.subtitle && (
                    <p className="text-xs text-muted-foreground mb-1">
                      {p.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                    {p.desc}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 text-center">
              <Link
                to="/pathologies"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                Voir les 11 pathologies <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* LIEN PROFESSIONNELS */}
      <div className="text-center py-8">
        <a
          href="/professionnels"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Vous êtes professionnel de santé ? Découvrir le programme ETP →
        </a>
      </div>

      {/* IMAGE BREAK */}
      <div
        className="h-64 lg:h-80 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/parcours.jpg)" }}
        role="presentation"
      />

      {/* PDFs */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                  Fiches imprimables
                </h2>
                <p className="text-muted-foreground mt-2">
                  Les 5 fiches les plus téléchargées
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <Link to="/telechargements" className="gap-2">
                  <Download className="w-4 h-4" />
                  Tous les PDF
                </Link>
              </Button>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {topPDFs.map((pdf, i) => (
              <FadeIn key={pdf.slug} delay={i * 0.06}>
                <div className="flex items-center gap-4 p-5 rounded-xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-200 group">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={getPathologyUrl(pdf.slug)}
                      className="font-medium text-foreground group-hover:text-primary transition-colors"
                    >
                      {pdf.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {pdf.category}
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors flex items-center gap-1.5"
                    disabled={downloadingSlug === pdf.slug}
                    onClick={() => handleDownloadPdf(pdf.slug)}
                  >
                    {downloadingSlug === pdf.slug ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    PDF
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      {BLOG_ARTICLES.length > 0 && (
        <section className="py-24 lg:py-32 border-t border-border/30">
          <div className="max-w-5xl mx-auto px-6">
            <FadeIn>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-10">
                Derniers articles
              </h2>
            </FadeIn>
            <div className="grid gap-5 sm:grid-cols-2">
              {BLOG_ARTICLES.slice(0, 4).map((article, i) => (
                <FadeIn key={article.slug} delay={i * 0.1}>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="block p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </time>
                      {article.pathology && (
                        <span className="text-primary">
                          {PATHOLOGY_LABELS[article.pathology] || ""}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <div className="mt-8 text-center">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  Tous les articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-24 lg:py-32 border-t border-border/30">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <FaqJsonLd items={FAQ_GENERAL} id="jsonld-faq-home" />
            <FaqSection items={FAQ_GENERAL} />
          </FadeIn>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-24 lg:py-32 border-t border-border/30">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="font-serif text-2xl lg:text-3xl text-foreground leading-relaxed mb-6">
              « Mon objectif est simple : vous aider à mettre en place des
              habitudes qui tiennent dans la vraie vie. »
            </p>
            <Link
              to="/qui-suis-je"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              En savoir plus sur ma démarche
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
