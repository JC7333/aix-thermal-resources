import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import drAudricPhoto from '@/assets/dr-audric-bugnard.jpg';

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
  const { seniorMode, titleClass, textClass, buttonSize, smallTextClass, subtitleClass, iconSize } = useSeniorMode();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Qui suis-je ?' }]} />

        {/* Header with Photo */}
        <div className="max-w-4xl mx-auto">
          <div className={`flex flex-col lg:flex-row items-center ${seniorMode ? 'gap-10 lg:gap-14 mb-14' : 'gap-8 lg:gap-12 mb-12'}`}>
            {/* Photo */}
            <div className={`rounded-2xl overflow-hidden shrink-0 border-4 border-white shadow-lg ${seniorMode ? 'w-56 h-56 lg:w-72 lg:h-72' : 'w-48 h-48 lg:w-64 lg:h-64'}`}>
              <img 
                src={drAudricPhoto} 
                alt="Dr Audric Bugnard" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Intro */}
            <div>
              <h1 className={titleClass}>
                Qui suis-je ?
              </h1>
              <p className={textClass + ' leading-relaxed'}>
                Je suis le <strong className="text-foreground">Dr Audric Bugnard</strong>, médecin généraliste 
                et thermaliste à Aix-les-Bains. Depuis des années, j'accompagne des patients qui vivent 
                avec des douleurs chroniques, des problèmes de poids, des difficultés respiratoires.
              </p>
            </div>
          </div>

          {/* Main content */}
          <div className={`prose max-w-none ${seniorMode ? 'prose-xl mb-14' : 'prose-lg mb-12'}`}>
            <div className={`card-medical ${seniorMode ? 'mb-10 p-8' : 'mb-8'}`}>
              <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl mb-5' : 'text-2xl mb-4'}`}>
                Mon objectif est simple
              </h2>
              <p className={`text-foreground leading-relaxed ${seniorMode ? 'text-xl' : 'text-lg'}`}>
                Vous aider à mettre en place des habitudes qui tiennent dans la vraie vie.
              </p>
              <p className={`text-muted-foreground leading-relaxed mt-4 ${seniorMode ? 'text-lg' : ''}`}>
                Pas des régimes impossibles. Pas des programmes de sportif. Pas des conseils culpabilisants. 
                Juste des actions concrètes, faisables, que vous pouvez commencer aujourd'hui — même si vous 
                avez mal, même si vous êtes fatigué, même si vous avez déjà essayé cent fois.
              </p>
            </div>

            <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-3xl mb-8' : 'text-2xl mb-6'}`}>
              Ce que vous trouverez ici
            </h2>

            <div className={`grid ${seniorMode ? 'gap-5 mb-10' : 'gap-4 mb-8'}`}>
              {principles.map((principle, index) => (
                <div key={index} className={`flex gap-4 bg-muted/30 rounded-xl ${seniorMode ? 'p-6' : 'p-4'}`}>
                  <CheckCircle2 className={`text-primary shrink-0 mt-0.5 ${seniorMode ? 'w-7 h-7' : 'w-6 h-6'}`} />
                  <div>
                    <h3 className={`font-semibold text-foreground ${seniorMode ? 'text-xl' : ''}`}>{principle.title}</h3>
                    <p className={`text-muted-foreground mt-1 ${seniorMode ? 'text-lg' : 'text-sm'}`}>{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`card-medical bg-primary/5 border-primary/20 ${seniorMode ? 'p-8' : ''}`}>
              <h2 className={`font-serif font-bold text-foreground ${seniorMode ? 'text-2xl mb-4' : 'text-xl mb-3'}`}>
                Ma promesse
              </h2>
              <p className={`text-foreground leading-relaxed ${seniorMode ? 'text-lg' : ''}`}>
                Je ne vous promets pas de miracle. Je ne vous promets pas de guérison. 
                Mais je vous promets des outils simples, honnêtes, que vous pouvez utiliser 
                dès maintenant pour améliorer votre quotidien.
              </p>
              <p className={`text-muted-foreground mt-4 italic ${seniorMode ? 'text-lg' : ''}`}>
                En cas de doute sur votre situation, n'hésitez pas à consulter un professionnel de santé.
              </p>
            </div>
          </div>

          {/* Social + CTA */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${seniorMode ? 'mb-10' : 'mb-8'}`}>
            <Button asChild size={buttonSize}>
              <Link to="/parcours" className="gap-2">
                Démarrer le parcours guidé
                <ArrowRight className={iconSize} />
              </Link>
            </Button>
            <Button asChild variant="outline" size={buttonSize}>
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
