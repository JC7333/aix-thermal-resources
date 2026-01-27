import { Link } from 'react-router-dom';
import { Clock, ChevronRight, BookOpen, Shield, FileText } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { getAllEvidence, type EvidenceData } from '@/data/evidence';

// Métadonnées enrichies pour chaque pathologie
const pathologyMeta: Record<string, {
  name: string;
  category: 'rhumatologie' | 'veino-lymphatique' | 'orl-respiratoire';
  shortDescription: string;
  readingTime: number;
  icon: string;
}> = {
  'arthrose': {
    name: 'Arthrose',
    category: 'rhumatologie',
    shortDescription: 'Je vous aide à mieux vivre avec l\'arthrose au quotidien.',
    readingTime: 8,
    icon: '🦴',
  },
  'lombalgie-chronique': {
    name: 'Lombalgie chronique',
    category: 'rhumatologie',
    shortDescription: 'Je vous accompagne pour soulager votre mal de dos chronique.',
    readingTime: 8,
    icon: '🦴',
  },
  'insuffisance-veineuse-chronique': {
    name: 'Insuffisance veineuse chronique',
    category: 'veino-lymphatique',
    shortDescription: 'Jambes lourdes, varices : des solutions concrètes existent.',
    readingTime: 7,
    icon: '🩸',
  },
  'bpco': {
    name: 'BPCO',
    category: 'orl-respiratoire',
    shortDescription: 'Reprendre souffle et qualité de vie avec la BPCO.',
    readingTime: 9,
    icon: '🫁',
  },
  'otites-a-repetition-enfant': {
    name: 'Otites à répétition (enfant)',
    category: 'orl-respiratoire',
    shortDescription: 'Comment prévenir les otites fréquentes chez l\'enfant.',
    readingTime: 6,
    icon: '👂',
  },
};

const categoryLabels: Record<string, string> = {
  'rhumatologie': 'Rhumatologie',
  'veino-lymphatique': 'Veino-lymphatique',
  'orl-respiratoire': 'ORL & Respiratoire',
};

const categoryColors: Record<string, string> = {
  'rhumatologie': 'bg-primary/10 text-primary border-primary/20',
  'veino-lymphatique': 'bg-purple-100 text-purple-700 border-purple-200',
  'orl-respiratoire': 'bg-secondary/10 text-secondary border-secondary/20',
};

const Pathologies = () => {
  const allEvidence = getAllEvidence();
  
  // Grouper les pathologies par catégorie
  const groupedPathologies = allEvidence.reduce((acc, evidence) => {
    const meta = pathologyMeta[evidence.slug];
    if (!meta) return acc;
    
    if (!acc[meta.category]) acc[meta.category] = [];
    acc[meta.category].push({ ...evidence, meta });
    return acc;
  }, {} as Record<string, (EvidenceData & { meta: typeof pathologyMeta[string] })[]>);

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
            Basé sur les données probantes les plus récentes.
          </p>
          
          {/* Badge Evidence-Based */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>{allEvidence.length} pathologies documentées avec sources scientifiques</span>
          </div>
        </header>

        <div className="space-y-12 lg:space-y-16">
          {Object.entries(categoryLabels).map(([category, label]) => {
            const categoryPathologies = groupedPathologies[category];
            if (!categoryPathologies || categoryPathologies.length === 0) return null;

            return (
              <section key={category}>
                <h2 className={`font-serif text-2xl font-bold mb-6 pb-3 border-b-2 ${
                  category === 'rhumatologie' ? 'border-primary text-primary' :
                  category === 'veino-lymphatique' ? 'border-purple-500 text-purple-600' :
                  'border-secondary text-secondary'
                }`}>
                  {label}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {categoryPathologies.map((pathology) => (
                    <Link
                      key={pathology.slug}
                      to={`/pathologies/${pathology.slug}`}
                      className="card-medical group flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[pathology.meta.category]}`}>
                          {categoryLabels[pathology.meta.category]}
                        </span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{pathology.meta.icon}</span>
                        <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {pathology.meta.name}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 flex-grow">
                        {pathology.meta.shortDescription}
                      </p>

                      {/* Indicateurs evidence-based */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {pathology.meta.readingTime} min
                        </span>
                        <span className="flex items-center gap-1 text-primary">
                          <BookOpen className="w-3 h-3" />
                          {pathology.recommendations.length} recommandations
                        </span>
                        <span className="flex items-center gap-1 text-secondary">
                          <FileText className="w-3 h-3" />
                          {pathology.sources.length} sources
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
