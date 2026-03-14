import { Link } from 'react-router-dom';
import { BookOpen, Shield, ExternalLink, FileText, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';

// Date de dernière mise à jour globale du contenu
const CONTENT_LAST_UPDATE = '2026-01-27';

const sourcesCategories = [
  {
    name: 'Guidelines officiels',
    description: 'Recommandations des autorités de santé nationales et internationales',
    examples: [
      { name: 'NICE (UK)', url: 'https://www.nice.org.uk', description: 'National Institute for Health and Care Excellence' },
      { name: 'HAS (France)', url: 'https://www.has-sante.fr', description: 'Haute Autorité de Santé' },
      { name: 'OMS', url: 'https://www.who.int', description: 'Organisation Mondiale de la Santé' },
    ],
    icon: Shield,
    color: 'bg-primary/10 text-primary',
  },
  {
    name: 'Revues systématiques',
    description: 'Synthèses de la littérature scientifique disponible',
    examples: [
      { name: 'Cochrane Library', url: 'https://www.cochranelibrary.com', description: 'Référence mondiale des revues systématiques' },
      { name: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov', description: 'Base de données biomédicales' },
    ],
    icon: BookOpen,
    color: 'bg-secondary/10 text-secondary',
  },
  {
    name: 'Sociétés savantes',
    description: 'Recommandations des associations professionnelles spécialisées',
    examples: [
      { name: 'EULAR', url: 'https://www.eular.org', description: 'Rhumatologie européenne' },
      { name: 'SPLF', url: 'https://splf.fr', description: 'Pneumologie francophone' },
    ],
    icon: FileText,
    color: 'bg-accent/10 text-accent',
  },
];

const methodology = [
  {
    step: 1,
    title: 'Recherche des sources',
    description: 'Consultation des guidelines récents (< 5 ans), des revues Cochrane et des recommandations des sociétés savantes.',
  },
  {
    step: 2,
    title: 'Évaluation des preuves',
    description: 'Classification du niveau de preuve : Élevé (études contrôlées), Modéré (consensus experts), Faible (pratique clinique).',
  },
  {
    step: 3,
    title: 'Adaptation au contexte',
    description: 'Traduction en conseils pratiques, adaptés à différents niveaux de mobilité et accessibles à tous.',
  },
  {
    step: 4,
    title: 'Validation et mise à jour',
    description: 'Vérification régulière des nouvelles publications et mise à jour du contenu.',
  },
];

const SourcesMethodologie = () => {

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Sources & Méthodologie' }]} />

        {/* Header */}
        <header className="mb-10 lg:mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-xl bg-primary/10 flex items-center justify-center w-12 h-12">
              <BookOpen className="text-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Sources & Méthodologie</h1>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            <Calendar className="w-5 h-5" />
                Dernière mise à jour : {CONTENT_LAST_UPDATE}
              </p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Ce site propose des contenus éducatifs basés sur les recommandations internationales et les revues systématiques les plus récentes. 
            Voici comment ces informations sont sélectionnées et présentées.
          </p>
        </header>

        {/* Avertissement */}
        <div className="bg-muted/50 border border-border rounded-xl mb-10 p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-muted-foreground shrink-0 w-6 h-6" />
            <div>
              <h2 className="font-semibold text-foreground mb-2 text-lg">
                Information importante
              </h2>
              <p className="text-lg text-muted-foreground">
                Ces contenus sont à visée éducative et ne remplacent en aucun cas l'avis d'un professionnel de santé. 
                En cas de symptômes inquiétants, consultez votre médecin. Urgence : <strong>15</strong> ou <strong>112</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Méthodologie */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
            <CheckCircle className="text-secondary w-6 h-6" />
            Comment le contenu est élaboré
          </h2>
          
          <div className="grid gap-4 md:grid-cols-4">
            {methodology.map((item) => (
              <div key={item.step} className="bg-card border border-border rounded-xl p-4 lg:p-6">
                <div className="rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4 w-10 h-10 text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Types de sources */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
            <BookOpen className="text-primary w-6 h-6" />
            Types de sources utilisées
          </h2>
          
          <div className="space-y-6">
            {sourcesCategories.map((category) => (
              <div key={category.name} className="bg-card border border-border rounded-xl p-4 lg:p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`rounded-xl ${category.color} flex items-center justify-center shrink-0 w-12 h-12`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className={`flex flex-wrap gap-3 pt-4 border-t border-border`}>
                  {category.examples.map((example) => (
                    <a
                      key={example.name}
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-sm"
                    >
                      {example.name}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Niveaux de preuve */}
        <section className="mb-12">
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-6 flex items-center gap-3">
            <Shield className="text-secondary w-6 h-6" />
            Comprendre les niveaux de preuve
          </h2>
          
          <div className="space-y-4">
            <div className={`flex items-start gap-4 p-4 rounded-xl bg-green-50 border border-green-200`}>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium shrink-0">
                Élevé
              </span>
              <p className="text-lg text-muted-foreground">
                Basé sur des études contrôlées randomisées ou des revues systématiques de bonne qualité. 
                La recommandation est solidement établie.
              </p>
            </div>
            <div className={`flex items-start gap-4 p-4 rounded-xl bg-amber-50 border border-amber-200`}>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium shrink-0">
                Modéré
              </span>
              <p className="text-lg text-muted-foreground">
                Basé sur des consensus d'experts ou des études de qualité moyenne. 
                La recommandation est probable mais peut évoluer.
              </p>
            </div>
            <div className={`flex items-start gap-4 p-4 rounded-xl bg-muted border border-border`}>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-medium shrink-0">
                Faible
              </span>
              <p className="text-lg text-muted-foreground">
                Basé sur la pratique clinique ou des études limitées. 
                Information fournie à titre indicatif.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary/5 border border-primary/20 rounded-2xl text-center p-8">
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-4">
            Des questions sur nos sources ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Pour toute question concernant les références utilisées ou pour signaler une information qui vous semble inexacte, 
            n'hésitez pas à nous contacter.
          </p>
          <Button asChild size="default">
            <Link to="/contact">
              Nous contacter
            </Link>
          </Button>
        </section>
      </div>
    </Layout>
  );
};

export default SourcesMethodologie;
