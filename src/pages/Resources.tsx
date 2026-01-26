import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { ResourceCard } from '@/components/shared/ResourceCard';
import {
  resources,
  pathologies,
  categoryLabels,
  resourceTypeLabels,
  audienceLabels,
  PathologyCategory,
  ResourceType,
  AudienceType,
} from '@/data/pathologies';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PathologyCategory | ''>('');
  const [selectedType, setSelectedType] = useState<ResourceType | ''>('');
  const [selectedAudience, setSelectedAudience] = useState<AudienceType | ''>('');
  const [showFilters, setShowFilters] = useState(false);

  // Get pathology map for quick lookup
  const pathologyMap = useMemo(() => {
    return pathologies.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {} as Record<string, typeof pathologies[0]>);
  }, []);

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const pathology = pathologyMap[resource.pathologyId];
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = resource.title.toLowerCase().includes(query);
        const matchesSummary = resource.summary.toLowerCase().includes(query);
        const matchesPathology = pathology?.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary && !matchesPathology) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && pathology?.category !== selectedCategory) {
        return false;
      }

      // Type filter
      if (selectedType && resource.type !== selectedType) {
        return false;
      }

      // Audience filter
      if (selectedAudience && resource.audience !== selectedAudience) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedType, selectedAudience, pathologyMap]);

  const hasActiveFilters = selectedCategory || selectedType || selectedAudience;

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedType('');
    setSelectedAudience('');
    setSearchQuery('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Bibliothèque de ressources' }]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
            Bibliothèque de ressources
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Retrouvez toutes nos fiches conseils, exercices et informations pratiques. 
            Utilisez les filtres pour trouver les ressources adaptées à votre pathologie.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une ressource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-primary/10' : ''}
            >
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filtres</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-muted/50 rounded-xl p-4 lg:p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">Filtrer les ressources</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Effacer les filtres
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Spécialité
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as PathologyCategory | '')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Toutes les spécialités</option>
                    {(Object.keys(categoryLabels) as PathologyCategory[]).map((cat) => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Type de contenu
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as ResourceType | '')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Tous les types</option>
                    {(Object.keys(resourceTypeLabels) as ResourceType[]).map((type) => (
                      <option key={type} value={type}>
                        {resourceTypeLabels[type]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Audience Filter */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Public cible
                  </label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value as AudienceType | '')}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Tous les publics</option>
                    {(Object.keys(audienceLabels) as AudienceType[]).map((aud) => (
                      <option key={aud} value={aud}>
                        {audienceLabels[aud]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {filteredResources.length} ressource{filteredResources.length > 1 ? 's' : ''} trouvée{filteredResources.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                pathology={pathologyMap[resource.pathologyId]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              Aucune ressource ne correspond à votre recherche.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Pathologies Quick Access */}
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
            Accès par pathologie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {pathologies.map((pathology) => (
              <Link
                key={pathology.id}
                to={`/pathologie/${pathology.slug}`}
                className="px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted hover:border-primary/30 transition-colors text-sm font-medium text-foreground"
              >
                {pathology.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Resources;
