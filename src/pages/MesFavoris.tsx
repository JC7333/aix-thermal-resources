// ============================================
// PAGE MES FAVORIS — COOLANCE
// ============================================
// Page dédiée à la gestion des pathologies favorites
// Avec tri, filtres et options d'organisation
// ============================================

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Clock, 
  BookOpen, 
  Grid3X3, 
  List, 
  ArrowUpDown,
  Filter,
  FileText,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { FavoriteButton } from '@/components/shared/FavoriteButton';
import { FavoritesActionsMenu } from '@/components/shared/FavoritesActionsMenu';
import { FavoritesImportBanner } from '@/components/shared/FavoritesImportBanner';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';
import { useFavorites } from '@/hooks/useFavorites';
import { getAllEvidence, type EvidenceData } from '@/data/evidence';
import { hasEvidenceData } from '@/services/pdfService';

// Métadonnées pour chaque pathologie
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

type SortOption = 'name' | 'category' | 'readingTime';
type ViewMode = 'grid' | 'list';
type CategoryFilter = 'all' | 'rhumatologie' | 'veino-lymphatique' | 'orl-respiratoire';

const MesFavoris = () => {
  const { favorites, count, removeFavorite } = useFavorites();
  const allEvidence = getAllEvidence();
  
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  // Construire les données des favoris
  const favoritePathologies = useMemo(() => {
    return favorites
      .map(slug => {
        const evidence = allEvidence.find(e => e.slug === slug);
        const meta = pathologyMeta[slug];
        if (!meta) return null;
        return { slug, evidence, meta };
      })
      .filter((p): p is NonNullable<typeof p> => p !== null);
  }, [favorites, allEvidence]);

  // Filtrer par catégorie
  const filteredPathologies = useMemo(() => {
    if (categoryFilter === 'all') return favoritePathologies;
    return favoritePathologies.filter(p => p.meta.category === categoryFilter);
  }, [favoritePathologies, categoryFilter]);

  // Trier
  const sortedPathologies = useMemo(() => {
    const sorted = [...filteredPathologies];
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.meta.name.localeCompare(b.meta.name));
        break;
      case 'category':
        sorted.sort((a, b) => a.meta.category.localeCompare(b.meta.category));
        break;
      case 'readingTime':
        sorted.sort((a, b) => a.meta.readingTime - b.meta.readingTime);
        break;
    }
    return sorted;
  }, [filteredPathologies, sortBy]);

  // Compter par catégorie
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: favoritePathologies.length };
    favoritePathologies.forEach(p => {
      counts[p.meta.category] = (counts[p.meta.category] || 0) + 1;
    });
    return counts;
  }, [favoritePathologies]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Mes favoris' },
          ]}
        />

        {/* Header */}
        <header className="mb-8 lg:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-destructive/10 rounded-xl">
              <Heart className="w-8 h-8 text-destructive fill-destructive" />
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
                Mes favoris
              </h1>
              <p className="text-muted-foreground">
                {count === 0 
                  ? "Vous n'avez pas encore de favoris"
                  : `${count} pathologie${count > 1 ? 's' : ''} sauvegardée${count > 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </header>

        {/* Bannière import */}
        <FavoritesImportBanner />

        {count === 0 ? (
          /* État vide */
          <div className="text-center py-16 bg-muted/30 rounded-2xl">
            <Heart className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="font-serif text-xl font-bold text-foreground mb-2">
              Aucun favori pour le moment
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Parcourez les pathologies et cliquez sur le cœur pour ajouter 
              vos fiches préférées ici.
            </p>
            <Button asChild>
              <Link to="/pathologies">
                Découvrir les pathologies
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
              <div className="flex flex-wrap items-center gap-3">
                {/* Filtre catégorie */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select 
                    value={categoryFilter} 
                    onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        Toutes ({categoryCounts.all || 0})
                      </SelectItem>
                      <SelectItem value="rhumatologie">
                        🦴 Rhumatologie ({categoryCounts.rhumatologie || 0})
                      </SelectItem>
                      <SelectItem value="veino-lymphatique">
                        🩸 Veino-lymphatique ({categoryCounts['veino-lymphatique'] || 0})
                      </SelectItem>
                      <SelectItem value="orl-respiratoire">
                        🫁 ORL & Respiratoire ({categoryCounts['orl-respiratoire'] || 0})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tri */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <Select 
                    value={sortBy} 
                    onValueChange={(v) => setSortBy(v as SortOption)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nom (A-Z)</SelectItem>
                      <SelectItem value="category">Catégorie</SelectItem>
                      <SelectItem value="readingTime">Temps de lecture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Toggle vue */}
                <div className="flex border rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Actions menu */}
                <FavoritesActionsMenu />
              </div>
            </div>

            {/* Résultats filtrés */}
            {sortedPathologies.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucun favori dans cette catégorie.
              </div>
            ) : viewMode === 'grid' ? (
              /* Vue grille */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPathologies.map((pathology) => (
                  <div
                    key={pathology.slug}
                    className="card-medical flex flex-col group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[pathology.meta.category]}`}>
                        {categoryLabels[pathology.meta.category]}
                      </span>
                      <FavoriteButton slug={pathology.slug} variant="icon" />
                    </div>

                    <Link to={`/pathologies/${pathology.slug}`} className="block mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{pathology.meta.icon}</span>
                        <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {pathology.meta.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {pathology.meta.shortDescription}
                      </p>
                    </Link>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pathology.meta.readingTime} min
                      </span>
                      {pathology.evidence && (
                        <span className="flex items-center gap-1 text-primary">
                          <BookOpen className="w-3 h-3" />
                          {pathology.evidence.recommendations.length} recommandations
                        </span>
                      )}
                    </div>

                    {/* Actions PDF */}
                    {hasEvidenceData(pathology.slug) && (
                      <div className="pt-3 border-t border-border mt-auto">
                        <PdfDownloadButtons slug={pathology.slug} variant="compact" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Vue liste */
              <div className="space-y-3">
                {sortedPathologies.map((pathology) => (
                  <div
                    key={pathology.slug}
                    className="card-medical flex items-center gap-4 group"
                  >
                    <span className="text-3xl shrink-0">{pathology.meta.icon}</span>
                    
                    <Link 
                      to={`/pathologies/${pathology.slug}`}
                      className="flex-1 min-w-0"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                          {pathology.meta.name}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border shrink-0 ${categoryColors[pathology.meta.category]}`}>
                          {categoryLabels[pathology.meta.category]}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm truncate">
                        {pathology.meta.shortDescription}
                      </p>
                    </Link>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {pathology.meta.readingTime} min
                      </span>
                      
                      {hasEvidenceData(pathology.slug) && (
                        <PdfDownloadButtons slug={pathology.slug} variant="compact" />
                      )}
                      
                      <FavoriteButton slug={pathology.slug} variant="icon" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Conseil */}
            <div className="mt-10 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Astuce :</strong> Partagez vos favoris avec un proche via le menu "Actions" 
                ou exportez-les en JSON pour les sauvegarder.
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MesFavoris;
