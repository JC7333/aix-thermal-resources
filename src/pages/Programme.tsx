import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Users,
  BarChart3,
  Shield,
  Headphones,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { useSeniorMode } from "@/hooks/useSeniorMode";

const Programme = () => {
  const { seniorMode, titleClass, textClass, subtitleClass, buttonSize } =
    useSeniorMode();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: "Le Programme" }]} />

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className={seniorMode ? "mb-14" : "mb-10"}>
            <h1 className={titleClass}>Le Programme Étuve</h1>
            <p className={`${subtitleClass} mt-4 max-w-3xl`}>
              Un programme d'éducation thérapeutique du patient conçu par un
              médecin thermaliste, basé sur les recommandations scientifiques
              internationales.
            </p>
          </div>

          {/* What is Étuve */}
          <section className={seniorMode ? "mb-14" : "mb-10"}>
            <h2
              className={`font-serif font-bold text-foreground ${seniorMode ? "text-2xl mb-6" : "text-xl mb-4"}`}
            >
              Qu'est-ce que Étuve ?
            </h2>
            <div
              className={`bg-primary/5 rounded-2xl border-2 border-primary/20 ${seniorMode ? "p-8" : "p-6"}`}
            >
              <p className={`${textClass} leading-relaxed`}>
                Étuve est un programme d'éducation thérapeutique numérique
                pour les patients en cure thermale. Il vous accompagne avant,
                pendant et après votre cure avec des outils concrets : fiches
                imprimables, exercices adaptés à votre niveau, podcasts audio,
                et plans progressifs validés par la science.
              </p>
              <p className={`${textClass} leading-relaxed mt-4`}>
                L'objectif : que vous repartiez de votre cure avec les
                connaissances et les outils pour continuer à prendre soin de
                vous chez vous, en toute autonomie.
              </p>
            </div>
          </section>

          {/* 6 pillars */}
          <section className={seniorMode ? "mb-14" : "mb-10"}>
            <h2
              className={`font-serif font-bold text-foreground ${seniorMode ? "text-2xl mb-6" : "text-xl mb-4"}`}
            >
              Les 6 piliers du programme
            </h2>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${seniorMode ? "gap-6" : "gap-4"}`}
            >
              {[
                {
                  icon: BookOpen,
                  title: "Comprendre",
                  desc: "Votre pathologie expliquée simplement, avec les mécanismes en jeu et ce que dit la science.",
                },
                {
                  icon: Users,
                  title: "Exercices adaptés",
                  desc: "4 niveaux de difficulté. Du niveau 0 pour ceux qui ont très mal, au niveau 3 pour les plus actifs.",
                },
                {
                  icon: FileText,
                  title: "Fiches imprimables",
                  desc: "Fiche frigo 1 page et guide complet 4 pages. À imprimer et afficher chez vous.",
                },
                {
                  icon: Headphones,
                  title: "Podcasts audio",
                  desc: "Quinze à vingt minutes par pathologie. Écoutez en voiture, en marchant, pendant la cure.",
                },
                {
                  icon: BarChart3,
                  title: "Plans progressifs",
                  desc: "Plan 7 jours pour démarrer, programme 8 semaines pour progresser vers l'autonomie.",
                },
                {
                  icon: Shield,
                  title: "Signaux d'alerte",
                  desc: "Les situations qui nécessitent une consultation urgente, clairement identifiées.",
                },
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className={`bg-card rounded-xl border border-border ${seniorMode ? "p-6" : "p-5"}`}
                >
                  <pillar.icon
                    className={`text-primary ${seniorMode ? "w-8 h-8 mb-4" : "w-6 h-6 mb-3"}`}
                  />
                  <h3
                    className={`font-bold text-foreground ${seniorMode ? "text-lg mb-2" : "text-base mb-1"}`}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    className={`text-muted-foreground ${seniorMode ? "text-base" : "text-sm"}`}
                  >
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Evidence-based */}
          <section className={seniorMode ? "mb-14" : "mb-10"}>
            <h2
              className={`font-serif font-bold text-foreground ${seniorMode ? "text-2xl mb-6" : "text-xl mb-4"}`}
            >
              Basé sur les preuves scientifiques
            </h2>
            <div className="space-y-4">
              <p className={`${textClass} leading-relaxed`}>
                Chaque conseil, chaque exercice, chaque recommandation de
                Étuve est basé sur des études de haute qualité
                méthodologique. Nos sources incluent :
              </p>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${seniorMode ? "gap-4" : "gap-3"}`}
              >
                {[
                  "HAS — Haute Autorité de Santé (France)",
                  "NICE — National Institute for Health and Care Excellence (Royaume-Uni)",
                  "Cochrane — Revues systématiques internationales",
                  "OMS — Organisation Mondiale de la Santé",
                  "GOLD — Global Initiative for Chronic Obstructive Lung Disease",
                  "ESVS — European Society for Vascular Surgery",
                  "OARSI — Osteoarthritis Research Society International",
                  "SPLF — Société de Pneumologie de Langue Française",
                ].map((source, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span
                      className={`${seniorMode ? "text-base" : "text-sm"} text-foreground`}
                    >
                      {source}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className={`${textClass} leading-relaxed mt-4 text-muted-foreground`}
              >
                Chaque page pathologie affiche ses sources avec les liens vers
                les publications originales. Nous affichons six à dix sources
                par pathologie.
              </p>
            </div>
          </section>

          {/* Pathologies */}
          <section className={seniorMode ? "mb-14" : "mb-10"}>
            <h2
              className={`font-serif font-bold text-foreground ${seniorMode ? "text-2xl mb-6" : "text-xl mb-4"}`}
            >
              Pathologies couvertes
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "Gonarthrose (arthrose du genou)",
                  slug: "gonarthrose",
                },
                {
                  name: "Lombalgie chronique (mal de dos)",
                  slug: "lombalgie-chronique",
                },
                {
                  name: "Insuffisance veineuse chronique",
                  slug: "insuffisance-veineuse",
                },
                { name: "BPCO (bronchopneumopathie)", slug: "bpco" },
                {
                  name: "Otites à répétition (enfant)",
                  slug: "otites-repetition-enfant",
                },
              ].map((patho) => (
                <Link
                  key={patho.slug}
                  to={`/pathologies/v2/${patho.slug}`}
                  className={`flex items-center justify-between bg-card rounded-xl border border-border hover:border-primary transition-all ${seniorMode ? "p-5" : "p-4"}`}
                >
                  <span
                    className={`font-medium text-foreground ${seniorMode ? "text-lg" : "text-base"}`}
                  >
                    {patho.name}
                  </span>
                  <ArrowRight className="w-5 h-5 text-primary" />
                </Link>
              ))}
            </div>
          </section>

          {/* Who */}
          <section className={seniorMode ? "mb-14" : "mb-10"}>
            <h2
              className={`font-serif font-bold text-foreground ${seniorMode ? "text-2xl mb-6" : "text-xl mb-4"}`}
            >
              Conçu par un médecin thermaliste
            </h2>
            <div
              className={`bg-muted rounded-2xl ${seniorMode ? "p-8" : "p-6"}`}
            >
              <p className={`${textClass} leading-relaxed`}>
                Étuve a été conçu par le <strong>Dr Audric Bugnard</strong>,
                médecin généraliste et thermaliste à Aix-les-Bains (Savoie). Le
                contenu médical est intégralement rédigé et validé par un
                médecin, en conformité avec les recommandations des sociétés
                savantes internationales.
              </p>
              <p className={`${textClass} leading-relaxed mt-4`}>
                Les voix des podcasts sont générées par intelligence
                artificielle. Les scripts sont rédigés et validés manuellement
                par le Dr Bugnard avant toute génération audio.
              </p>
              <div className="mt-6">
                <Button asChild variant="outline" size={buttonSize}>
                  <Link to="/qui-suis-je" className="gap-2">
                    En savoir plus sur le Dr Bugnard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Data & Privacy */}
          <section className={seniorMode ? "mb-14" : "mb-10"}>
            <h2
              className={`font-serif font-bold text-foreground ${seniorMode ? "text-2xl mb-6" : "text-xl mb-4"}`}
            >
              Vos données
            </h2>
            <div className="space-y-3">
              {[
                "Aucune donnée personnelle n'est collectée.",
                "Aucun compte utilisateur n'est nécessaire.",
                "Les questionnaires sont anonymes et stockés localement sur votre appareil.",
                "Les analytics sont anonymes et sans cookies (Plausible.io, hébergé en UE).",
                "Ce site ne contient aucune publicité.",
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span
                    className={`${seniorMode ? "text-base" : "text-sm"} text-foreground`}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div
              className={`bg-primary/5 rounded-2xl border-2 border-primary/20 ${seniorMode ? "p-10" : "p-8"}`}
            >
              <p
                className={`font-serif font-bold text-foreground ${seniorMode ? "text-2xl mb-4" : "text-xl mb-3"}`}
              >
                Prêt à commencer ?
              </p>
              <p
                className={`text-muted-foreground ${seniorMode ? "text-lg mb-6" : "text-base mb-5"}`}
              >
                Choisissez votre pathologie ou répondez à 3 questions pour un
                plan personnalisé.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="xl">
                  <Link to="/parcours" className="gap-2">
                    Mon plan personnalisé
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link to="/#pathologies" className="gap-2">
                    Choisir ma pathologie
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Programme;
