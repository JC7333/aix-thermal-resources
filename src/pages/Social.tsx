import { Instagram, Facebook, CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

const socialBenefits = [
  "1 conseil simple par jour",
  "PDF imprimables gratuits",
  "Rappels pour vos habitudes",
  "Questions / réponses en direct",
];

const Social = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Nous suivre' }]} />

        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Suivez COOLANCE
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Retrouvez-moi sur les réseaux pour des conseils quotidiens, 
            des PDF gratuits et des rappels pour vos habitudes.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-lg mx-auto">
            {socialBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg text-left">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Social Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Instagram */}
            <div className="card-medical text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mx-auto mb-4">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-2">Instagram</h2>
              <p className="text-muted-foreground text-sm mb-4">
                @coolance.sante
              </p>
              <Button asChild size="lg" className="w-full">
                <a 
                  href="https://instagram.com/coolance.sante" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Suivre
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>

            {/* Facebook */}
            <div className="card-medical text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
                <Facebook className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-serif text-xl font-bold text-foreground mb-2">Facebook</h2>
              <p className="text-muted-foreground text-sm mb-4">
                COOLANCE Santé
              </p>
              <Button asChild size="lg" className="w-full">
                <a 
                  href="https://facebook.com/coolance.sante" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Suivre
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-2">
              Ce que vous trouverez sur mes réseaux
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Uniquement du contenu éducatif : des conseils simples pour le quotidien, 
              des rappels pour vos habitudes, des réponses à vos questions. 
              <strong className="text-foreground"> Jamais de diagnostic, jamais de traitement médicamenteux.</strong>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Social;
