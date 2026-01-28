import { Link } from 'react-router-dom';
import { Clock, ChevronRight, BookOpen, Shield, FileText, Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { FavoriteButton } from '@/components/shared/FavoriteButton';
import { FavoritesActionsMenu } from '@/components/shared/FavoritesActionsMenu';
import { FavoritesImportBanner } from '@/components/shared/FavoritesImportBanner';
import { useFavorites } from '@/hooks/useFavorites';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import { Button } from '@/components/ui/button';
import { getPathologyUrl } from '@/lib/pathologyRoutes';
import { ALL_EVIDENCE_PACKS_V2, type EvidencePackV2 } from '@/content/evidence/v2';

// Mapping catégories
const categoryLabels: Record<string, string> = {
  'rhumatologie': 'Rhumatologie',
  'veino-lymphatique': 'Veino-lymphatique',
  'orl-respiratoire': 'ORL & Respiratoire',
  'respiratoire-orl': 'ORL & Respiratoire',
};

const categoryColors: Record<string, string> = {
  'rhumatologie': 'bg-primary/10 text-primary border-primary/20',
  'veino-lymphatique': 'bg-purple-100 text-purple-700 border-purple-200',
  'orl-respiratoire': 'bg-secondary/10 text-secondary border-secondary/20',
  'respiratoire-orl': 'bg-secondary/10 text-secondary border-secondary/20',
};

// Ordre d'affichage des catégories
const categoryDisplayOrder = ['rhumatologie', 'veino-lymphatique', 'respiratoire-orl', 'orl-respiratoire'];

const Pathologies = () => {
  // Utilise les données V2 comme source de vérité (packs complets uniquement)
  const allEvidence = ALL_EVIDENCE_PACKS_V2.filter(p => p.status === 'complete');
  
  const { favorites, isFavorite } = useFavorites();
  const { seniorMode, titleClass, textClass, gridCols, smallTextClass, iconSize } = useSeniorMode();
  
  // Grouper les pathologies par catégorie
  const groupedPathologies = allEvidence.reduce((acc, evidence) => {
    const cat = evidence.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(evidence);
    return acc;
  }, {} as Record<string, EvidencePackV2[]>);

  // Favoris
  const favoritePathologies = allEvidence.filter(e => favorites.includes(e.slug));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb
          items={[
            { label: 'Pathologies' },
          ]}
        />

        <header className={seniorMode ? 'mb-14 lg:mb-16 text-center' : 'mb-10 lg:mb-14 text-center'}>
          <h1 className={titleClass + ' text-center'}>
            Toutes les pathologies
          </h1>
          <p className={textClass + ' max-w-2xl mx-auto'}>
            Retrouvez des informations claires et des conseils pratiques pour chaque pathologie.
            Basé sur les données probantes les plus récentes.
          </p>
          
          {/* Badge Evidence-Based */}
          <div className={`flex items-center justify-center gap-2 mt-4 ${seniorMode ? 'text-base' : 'text-sm'} text-muted-foreground`}>
            <Shield className={iconSize + ' text-primary'} />
            <span>{allEvidence.length} pathologies documentées avec sources scientifiques</span>
          </div>
        </header>

        {/* Bannière import depuis URL */}
        <FavoritesImportBanner />

        {/* Section Favoris */}
        {favoritePathologies.length > 0 && (
          <section className={seniorMode ? 'mb-16' : 'mb-12'}>
            <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-destructive/50">
              <h2 className={`font-serif font-bold text-destructive flex items-center gap-2 ${seniorMode ? 'text-3xl' : 'text-2xl'}`}>
                <Heart className={`fill-destructive ${seniorMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
                Mes favoris ({favoritePathologies.length})
              </h2>
              <FavoritesActionsMenu />
            </div>
            <div className={gridCols}>
              {favoritePathologies.map((pathology) => (
                <Link
                  key={pathology.slug}
                  to={getPathologyUrl(pathology.slug)}
                  className="card-medical group flex flex-col ring-2 ring-destructive/20"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[pathology.category] || categoryColors['rhumatologie']}`}>
                      {categoryLabels[pathology.category] || pathology.category}
                    </span>
                    <FavoriteButton slug={pathology.slug} variant="icon" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{pathology.icon}</span>
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {pathology.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                    {pathology.definition?.summary?.split('\n')[0] || ''}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3 mt-auto">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      8 min
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      <BookOpen className="w-3 h-3" />
                      {pathology.recommendations?.length || 0} recommandations
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className={seniorMode ? 'space-y-16 lg:space-y-20' : 'space-y-12 lg:space-y-16'}>
          {categoryDisplayOrder.map((category) => {
            const label = categoryLabels[category];
            const categoryPathologies = groupedPathologies[category];
            if (!categoryPathologies || categoryPathologies.length === 0) return null;

            return (
              <section key={category}>
                <h2 className={`font-serif font-bold mb-6 pb-3 border-b-2 ${seniorMode ? 'text-3xl' : 'text-2xl'} ${
                  category === 'rhumatologie' ? 'border-primary text-primary' :
                  category === 'veino-lymphatique' ? 'border-purple-500 text-purple-600' :
                  'border-secondary text-secondary'
                }`}>
                  {label}
                </h2>

                <div className={gridCols}>
                  {categoryPathologies.map((pathology) => (
                    <article
                      key={pathology.slug}
                      className={`card-medical group flex flex-col ${isFavorite(pathology.slug) ? 'ring-2 ring-destructive/20' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[pathology.category] || categoryColors['rhumatologie']}`}>
                          {categoryLabels[pathology.category] || pathology.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <FavoriteButton slug={pathology.slug} variant="icon" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{pathology.icon}</span>
                        <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {pathology.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
                        {pathology.definition?.summary?.split('\n')[0] || ''}
                      </p>

                      {/* Indicateurs evidence-based */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border pt-3 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          8 min
                        </span>
                        <span className="flex items-center gap-1 text-primary">
                          <BookOpen className="w-3 h-3" />
                          {pathology.recommendations?.length || 0} recommandations
                        </span>
                        <span className="flex items-center gap-1 text-secondary">
                          <FileText className="w-3 h-3" />
                          {pathology.sources?.length || 0} sources
                        </span>
                      </div>

                      <Link to={getPathologyUrl(pathology.slug)}>
                        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <span>Voir</span>
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </Link>
                    </article>
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
