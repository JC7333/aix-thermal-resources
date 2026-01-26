import { Link } from 'react-router-dom';
import { ArrowRight, Download, BookOpen, Heart, Stethoscope, Compass, Baby, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryCard } from '@/components/shared/CategoryCard';
import { Layout } from '@/components/layout/Layout';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { pathologies, categoryLabels, PathologyCategory } from '@/data/pathologies';

const categoryDescriptions: Record<PathologyCategory, string> = {
  'rhumatologie': 'Arthrose, lombalgie, sciatique et autres affections articulaires et musculo-squelettiques.',
  'veino-lymphatique': 'Insuffisance veineuse, lymphœdème et troubles de la circulation.',
  'orl-respiratoire': 'Asthme, BPCO, rhinite et infections ORL à répétition.',
  'muqueuses-buccales': 'Lichen plan buccal, glossodynie et affections de la bouche.',
};

const Index = () => {
  const { seniorMode, toggleSeniorMode } = useAccessibility();

  // Count pathologies by category
  const categoryCounts = pathologies.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<PathologyCategory, number>);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Dr Audric Bugnard
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-2 font-medium">
              Médecin généraliste & thermaliste à Aix-les-Bains
            </p>
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">
              Je vous propose des ressources pratiques pour mieux vivre avec votre pathologie au quotidien.
            </p>
            
            {/* Senior Mode CTA */}
            {!seniorMode && (
              <div className="mb-8 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <p className="text-white/90 text-sm mb-3">
                  Vous avez des difficultés à lire ? Activez le mode Senior.
                </p>
                <Button onClick={toggleSeniorMode} variant="heroOutline" size="lg" className="gap-2">
                  <ZoomIn className="w-5 h-5" />
                  Activer le mode Senior
                </Button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/parcours">
                  <Compass className="w-5 h-5" />
                  Trouver mon plan d'action
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/ressources">
                  <Download className="w-5 h-5" />
                  Télécharger mes fiches PDF
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access for Parents */}
      <section className="py-8 bg-secondary/5 border-b border-border">
        <div className="container mx-auto px-4">
          <Link 
            to="/parents"
            className="flex items-center justify-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <Baby className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="font-semibold text-foreground group-hover:text-secondary transition-colors">
                Espace Parents — ORL enfant
              </p>
              <p className="text-sm text-muted-foreground">
                Angines, otites, rhino-pharyngites à répétition
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-secondary transition-colors" />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explorez par spécialité
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Retrouvez des informations et conseils adaptés à votre pathologie
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {(Object.keys(categoryLabels) as PathologyCategory[]).map((category) => (
              <CategoryCard
                key={category}
                category={category}
                description={categoryDescriptions[category]}
                pathologyCount={categoryCounts[category] || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-12 lg:py-20 warm-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Comment se déroule une cure thermale ?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprendre les étapes d'une prise en charge thermale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto stagger-children">
            <div className="card-medical text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                1. Prescription médicale
              </h3>
              <p className="text-muted-foreground">
                Votre médecin traitant évalue votre pathologie et vous prescrit une cure thermale adaptée à votre orientation (rhumatologie, voies respiratoires, phlébologie...).
              </p>
            </div>

            <div className="card-medical text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                2. Soins quotidiens (3 semaines)
              </h3>
              <p className="text-muted-foreground">
                Bains, douches, boue, aérosols, massages et rééducation en piscine thermale. Les soins sont personnalisés selon votre pathologie.
              </p>
            </div>

            <div className="card-medical text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                3. Suivi et éducation
              </h3>
              <p className="text-muted-foreground">
                Ateliers d'éducation thérapeutique, conseils personnalisés et programmes d'exercices à poursuivre au domicile pour des effets durables.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/faq" className="flex items-center gap-2">
                En savoir plus sur le thermalisme
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access to Resources */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 lg:p-12 text-center">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                Téléchargez vos fiches conseils
              </h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                Plus de {pathologies.length * 2} fiches PDF gratuites : exercices illustrés, conseils nutritionnels, 
                signaux d'alerte et informations pratiques pour chaque pathologie.
              </p>
              <Button asChild size="xl">
                <Link to="/ressources" className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Accéder à la bibliothèque
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
