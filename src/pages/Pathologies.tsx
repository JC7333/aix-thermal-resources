import { Link } from 'react-router-dom';
import { Clock, Users, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { pathologies, categoryLabels, categoryColors, audienceLabels, PathologyCategory } from '@/data/pathologies';

const Pathologies = () => {
  // Grouper par catégorie
  const groupedPathologies = pathologies.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {} as Record<PathologyCategory, typeof pathologies>);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb
          items={[
            { label: 'Pathologies' },
          ]}
        />

        <header className="mb-10 lg:mb-14 text-center">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Toutes les pathologies
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Retrouvez des informations claires et des conseils pratiques pour chaque pathologie. 
            Cliquez sur une fiche pour accéder aux détails.
          </p>
        </header>

        <div className="space-y-12 lg:space-y-16">
          {(Object.keys(categoryLabels) as PathologyCategory[]).map((category) => {
            const categoryPathologies = groupedPathologies[category];
            if (!categoryPathologies || categoryPathologies.length === 0) return null;

            return (
              <section key={category}>
                <h2 className={`font-serif text-2xl font-bold mb-6 pb-3 border-b-2 ${
                  category === 'rhumatologie' ? 'border-primary text-primary' :
                  category === 'veino-lymphatique' ? 'border-[hsl(280,45%,50%)] text-[hsl(280,45%,50%)]' :
                  category === 'orl-respiratoire' ? 'border-secondary text-secondary' :
                  'border-[hsl(340,45%,50%)] text-[hsl(340,45%,50%)]'
                }`}>
                  {categoryLabels[category]}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {categoryPathologies.map((pathology) => (
                    <Link
                      key={pathology.id}
                      to={`/pathologies/${pathology.slug}`}
                      className="card-medical group flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${categoryColors[category]} border`}>
                          {categoryLabels[category]}
                        </span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>

                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {pathology.name}
                      </h3>

                      <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {pathology.shortDescription}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pathology.readingTime} min
                        </span>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${
                          pathology.audience === 'senior' ? 'badge-senior' :
                          pathology.audience === 'enfant' ? 'badge-enfant' : 'badge-adulte'
                        }`}>
                          <Users className="w-3 h-3" />
                          {audienceLabels[pathology.audience]}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Pathologies;
