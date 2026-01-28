import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X, Clock, Download, Printer, BookOpen, ChevronRight, Sparkles, ArrowUpDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { useSeniorMode } from '@/hooks/useSeniorMode';
import { useToast } from '@/hooks/use-toast';
import { downloadPdf1PageBySlug, hasEvidenceData } from '@/services/pdfService';
import { getPathologyUrl } from '@/lib/pathologyRoutes';
import {
  libraryResources,
  quickAnswers,
  categoryLabelsLibrary,
  categoryIconsLibrary,
  tagLabels,
  tagColors,
  audienceLabelsLibrary,
  audienceIconsLibrary,
  sortLabels,
  sortResources,
  LibraryCategory,
  LibraryTag,
  SortOption,
  LibraryResource,
} from '@/data/library-resources';

// Resource Card Component
const LibraryCard = ({ resource }: { resource: LibraryResource }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const hasPdf = resource.pathologySlug ? hasEvidenceData(resource.pathologySlug) : false;

  const handleDownloadPDF = async () => {
    if (!resource.pathologySlug || !hasPdf) {
      toast({
        title: "PDF non disponible",
        description: "Aucune donnée disponible pour générer ce PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    try {
      await downloadPdf1PageBySlug(resource.pathologySlug);
      toast({
        title: "Téléchargement réussi",
        description: "La fiche PDF a été téléchargée.",
      });
    } catch (error) {
      console.error('Erreur téléchargement PDF:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Impossible de générer le PDF. Réessayez plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  // Déterminer si le lien est valide
  const hasValidLink = resource.pathologySlug ? hasEvidenceData(resource.pathologySlug) : false;
  
  const linkTo = resource.pathologySlug 
    ? getPathologyUrl(resource.pathologySlug) 
    : null;

  return (
    <article className="card-medical flex flex-col h-full group">
      {/* Header with badges */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          {resource.tags.slice(0, 2).map((tag) => (
            <span 
              key={tag}
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${tagColors[tag]}`}
            >
              {tagLabels[tag]}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {resource.isNew && (
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-accent text-accent-foreground">
              Nouveau
            </span>
          )}
          {resource.isFeatured && (
            <Sparkles className="w-4 h-4 text-accent" />
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {linkTo ? (
          <Link to={linkTo}>
            {resource.title}
          </Link>
        ) : (
          <span>{resource.title}</span>
        )}
      </h3>

      {/* Summary */}
      <p className="text-muted-foreground text-sm flex-1 mb-4 line-clamp-2">
        {resource.summary}
      </p>

      {/* Meta info */}
      <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          {audienceIconsLibrary[resource.audience]}
          {audienceLabelsLibrary[resource.audience]}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {resource.readingTime} min
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-border">
        {linkTo ? (
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link to={linkTo}>
              <BookOpen className="w-4 h-4" />
              Lire
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="flex-1" disabled>
            <BookOpen className="w-4 h-4" />
            Non disponible
          </Button>
        )}
        <Button 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePrint();
          }}
          className="px-3"
        >
          <Printer className="w-4 h-4" />
        </Button>
        {hasPdf ? (
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDownloadPDF();
            }}
            disabled={isDownloading}
            className="px-3"
          >
            {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            disabled
            className="px-3"
            title="PDF non disponible"
          >
            <Download className="w-4 h-4" />
          </Button>
        )}
      </div>
    </article>
  );
};

// Quick Answer Card
const QuickAnswerCard = ({ answer }: { answer: typeof quickAnswers[0] }) => {
  const colorClasses = {
    primary: 'bg-primary/10 border-primary/30 hover:bg-primary/20',
    secondary: 'bg-secondary/10 border-secondary/30 hover:bg-secondary/20',
    accent: 'bg-accent/10 border-accent/30 hover:bg-accent/20',
  };

  const linkTo = answer.pathologySlug 
    ? getPathologyUrl(answer.pathologySlug) 
    : answer.link || '/guides';

  return (
    <Link 
      to={linkTo}
      className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${colorClasses[answer.color]} group`}
    >
      <span className="text-3xl">{answer.icon}</span>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {answer.title}
        </h3>
        <p className="text-sm text-muted-foreground">{answer.subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </Link>
  );
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LibraryCategory | ''>('');
  const [selectedTags, setSelectedTags] = useState<LibraryTag[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);
  
  const { seniorMode, titleClass, textClass, buttonSize, gridCols, inputClass, cardClass } = useSeniorMode();

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let results = libraryResources.filter((resource) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = resource.title.toLowerCase().includes(query);
        const matchesSummary = resource.summary.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && resource.category !== selectedCategory) {
        return false;
      }

      // Tags filter (OR logic - matches if any selected tag is present)
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some(tag => resource.tags.includes(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });

    // Sort
    return sortResources(results, sortBy);
  }, [searchQuery, selectedCategory, selectedTags, sortBy]);

  const toggleTag = (tag: LibraryTag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const hasActiveFilters = selectedCategory || selectedTags.length > 0;

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setSearchQuery('');
  };

  const categories = Object.keys(categoryLabelsLibrary) as LibraryCategory[];
  const tags = Object.keys(tagLabels) as LibraryTag[];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Bibliothèque de ressources' }]} />

        {/* Header */}
        <div className={seniorMode ? 'mb-10' : 'mb-8'}>
          <h1 className={titleClass}>
            Bibliothèque de ressources
          </h1>
          <p className={textClass + ' max-w-3xl'}>
            Toutes les fiches conseils, programmes et informations pratiques du site. 
            Trouvez rapidement ce dont vous avez besoin.
          </p>
        </div>

        {/* Quick Answers Section */}
        <section className={seniorMode ? 'mb-12' : 'mb-10'}>
          <h2 className={`font-serif font-bold text-foreground mb-4 flex items-center gap-2 ${seniorMode ? 'text-2xl' : 'text-xl'}`}>
            <Sparkles className={seniorMode ? 'w-6 h-6' : 'w-5 h-5'} />
            Réponses rapides
          </h2>
          <div className={seniorMode ? 'grid grid-cols-1 lg:grid-cols-3 gap-6' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}>
            {quickAnswers.map((answer) => (
              <QuickAnswerCard key={answer.id} answer={answer} />
            ))}
          </div>
        </section>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${seniorMode ? 'w-6 h-6' : 'w-5 h-5'}`} />
              <Input
                type="search"
                placeholder="Rechercher une ressource, un sujet..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-12 border-2 focus:border-primary ${inputClass}`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size={buttonSize}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 rounded-xl ${showFilters ? 'bg-primary/10 border-primary' : ''} ${seniorMode ? 'h-14' : 'h-11'}`}
            >
              <Filter className={seniorMode ? 'w-6 h-6' : 'w-5 h-5'} />
              <span className={seniorMode ? 'ml-2' : 'hidden sm:inline ml-2'}>Filtres</span>
              {hasActiveFilters && (
                <span className={`ml-2 rounded-full bg-primary text-primary-foreground flex items-center justify-center ${seniorMode ? 'w-6 h-6 text-sm' : 'w-5 h-5 text-xs'}`}>
                  {(selectedCategory ? 1 : 0) + selectedTags.length}
                </span>
              )}
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-muted/50 rounded-2xl p-6 animate-fade-in border border-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Filtrer les ressources</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-1" />
                    Tout effacer
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-muted-foreground mb-3">
                  Catégories
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !selectedCategory 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-background border border-border hover:border-primary/50'
                    }`}
                  >
                    Toutes
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        selectedCategory === cat 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-background border border-border hover:border-primary/50'
                      }`}
                    >
                      <span>{categoryIconsLibrary[cat]}</span>
                      {categoryLabelsLibrary[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-3">
                  Type de contenu
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTags.includes(tag)
                          ? `${tagColors[tag]} ring-2 ring-offset-2 ring-current`
                          : 'bg-background border border-border hover:border-primary/50'
                      }`}
                    >
                      {tagLabels[tag]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sort and Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{filteredResources.length}</span> ressource{filteredResources.length > 1 ? 's' : ''}
            </p>
            
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                  <option key={option} value={option}>
                    {sortLabels[option]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className={gridCols}>
            {filteredResources.map((resource) => (
              <LibraryCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-2xl">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg text-muted-foreground mb-4">
              Aucune ressource ne correspond à votre recherche.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Categories Quick Access */}
        <section className="mt-16 pt-12 border-t border-border">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">
            Explorer par catégorie
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowFilters(true);
                  window.scrollTo({ top: 300, behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border border-border bg-card hover:bg-muted hover:border-primary/30 transition-all group"
              >
                <span className="text-3xl">{categoryIconsLibrary[category]}</span>
                <span className="text-sm font-medium text-center text-foreground group-hover:text-primary transition-colors">
                  {categoryLabelsLibrary[category]}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Utilisez le parcours guidé pour obtenir des recommandations personnalisées en 30 secondes.
          </p>
          <Button asChild size="lg">
            <Link to="/parcours">
              Démarrer le parcours guidé
              <ChevronRight className="w-5 h-5" />
            </Link>
          </Button>
        </section>
      </div>
    </Layout>
  );
};

export default Resources;
