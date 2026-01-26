import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

const principles = [
  {
    title: "Des plans très simples",
    description: "Maximum 3 actions par jour. Pas plus. Si c'est trop compliqué, vous n'allez pas le faire. Et c'est normal."
  },
  {
    title: "Des niveaux 0 à 3",
    description: "Niveau 0 pour mobilité très limitée, niveau 3 pour les plus actifs. Vous choisissez ce qui vous correspond aujourd'hui."
  },
  {
    title: "Une version \"très facile\"",
    description: "Pour l'obésité, la douleur chronique, la fatigue. Je pars de là où vous êtes, pas de là où vous « devriez » être."
  },
  {
    title: "Zéro culpabilisation",
    description: "Vous n'avez pas réussi hier ? On recommence aujourd'hui. C'est aussi simple que ça."
  },
  {
    title: "Tout est imprimable",
    description: "Chaque plan tient sur une page A4. Vous l'imprimez, vous l'affichez, vous cochez. C'est concret."
  },
];

const QuiSuisJe = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Qui suis-je ?' }]} />

        {/* Header with Photo */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center mb-12">
            {/* Photo placeholder */}
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0 border-4 border-white shadow-lg">
              <div className="text-center">
                <span className="font-serif text-4xl lg:text-5xl font-bold text-primary">AB</span>
                <p className="text-xs text-muted-foreground mt-2">Photo à venir</p>
              </div>
            </div>

            {/* Intro */}
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                Qui suis-je ?
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Je suis le <strong className="text-foreground">Dr Audric Bugnard</strong>, médecin généraliste 
                et thermaliste à Aix-les-Bains. Depuis des années, j'accompagne des patients qui vivent 
                avec des douleurs chroniques, des problèmes de poids, des difficultés respiratoires.
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="card-medical mb-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Mon objectif est simple
              </h2>
              <p className="text-lg text-foreground leading-relaxed">
                Vous aider à mettre en place des habitudes qui tiennent dans la vraie vie.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pas des régimes impossibles. Pas des programmes de sportif. Pas des conseils culpabilisants. 
                Juste des actions concrètes, faisables, que vous pouvez commencer aujourd'hui — même si vous 
                avez mal, même si vous êtes fatigué, même si vous avez déjà essayé cent fois.
              </p>
            </div>

            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
              Ce que vous trouverez ici
            </h2>

            <div className="grid gap-4 mb-8">
              {principles.map((principle, index) => (
                <div key={index} className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">{principle.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-medical bg-primary/5 border-primary/20">
              <h2 className="font-serif text-xl font-bold text-foreground mb-3">
                Ma promesse
              </h2>
              <p className="text-foreground leading-relaxed">
                Je ne vous promets pas de miracle. Je ne vous promets pas de guérison. 
                Mais je vous promets des outils simples, honnêtes, que vous pouvez utiliser 
                dès maintenant pour améliorer votre quotidien.
              </p>
              <p className="text-muted-foreground mt-4 italic">
                Et si vous avez un doute, on en parle en consultation.
              </p>
            </div>
          </div>

          {/* Social + CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg">
              <Link to="/parcours" className="gap-2">
                Démarrer le parcours guidé
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact" className="gap-2">
                Me contacter
              </Link>
            </Button>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">Suivez COOLANCE sur les réseaux</p>
            <div className="flex justify-center gap-4">
              <a 
                href="https://instagram.com/coolance.sante" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://facebook.com/coolance.sante" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuiSuisJe;
