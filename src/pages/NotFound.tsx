import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-lg mx-auto text-center">
          <p className="font-serif text-8xl font-bold text-primary/20 mb-4">404</p>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page introuvable
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Cette page n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/" className="gap-2">
                <Home className="w-5 h-5" />
                Retour à l'accueil
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/pathologies" className="gap-2">
                <ArrowLeft className="w-5 h-5" />
                Voir les pathologies
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
