// ============================================
// PAGE MES FAVORIS — COOLANCE
// ============================================
// Page dédiée à la gestion des pathologies favorites
// Avec tri, filtres, drag & drop et options d'organisation
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
  ChevronRight,
  GripVertical,
  Move,
} from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
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
import { FavoritesActionsMenu } from '@/components/shared/FavoritesActionsMenu';
import { FavoritesImportBanner } from '@/components/shared/FavoritesImportBanner';
import { DraggableFavoriteCard } from '@/components/shared/DraggableFavoriteCard';
import { CollectionsSection } from '@/components/collections/CollectionsSection';
import { AddToCollectionMenu } from '@/components/collections/AddToCollectionMenu';
import { CollectionImportBanner } from '@/components/collections/CollectionImportBanner';
import { useFavorites } from '@/hooks/useFavorites';
import { getAllEvidence } from '@/data/evidence';
import { useToast } from '@/hooks/use-toast';

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

type SortOption = 'custom' | 'name' | 'category' | 'readingTime';
type ViewMode = 'grid' | 'list';
type CategoryFilter = 'all' | 'rhumatologie' | 'veino-lymphatique' | 'orl-respiratoire';

const MesFavoris = () => {
  const { favorites, count, reorderFavorites } = useFavorites();
  const allEvidence = getAllEvidence();
  const { toast } = useToast();
  
  const [sortBy, setSortBy] = useState<SortOption>('custom');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [isDragMode, setIsDragMode] = useState(false);

  // Sensors pour le drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  // Trier (sauf en mode custom/drag)
  const sortedPathologies = useMemo(() => {
    if (sortBy === 'custom') return filteredPathologies;
    
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

  // Gérer le drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = favorites.indexOf(active.id as string);
      const newIndex = favorites.indexOf(over.id as string);
      
      const newOrder = arrayMove(favorites, oldIndex, newIndex);
      reorderFavorites(newOrder);
      
      toast({
        title: "Ordre mis à jour",
        description: "Vos favoris ont été réorganisés.",
      });
    }
  };

  // Toggle mode drag
  const toggleDragMode = () => {
    if (!isDragMode) {
      setSortBy('custom');
      setCategoryFilter('all');
    }
    setIsDragMode(!isDragMode);
  };

  // Désactiver le drag si on change le tri ou le filtre
  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    if (value !== 'custom') {
      setIsDragMode(false);
    }
  };

  const handleFilterChange = (value: CategoryFilter) => {
    setCategoryFilter(value);
    if (value !== 'all') {
      setIsDragMode(false);
    }
  };

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

        {/* Bannières import */}
        <FavoritesImportBanner />
        <CollectionImportBanner />

        {/* Section Collections */}
        <CollectionsSection 
          pathologyMeta={Object.fromEntries(
            Object.entries(pathologyMeta).map(([slug, meta]) => [
              slug,
              { name: meta.name, icon: meta.icon, category: meta.category }
            ])
          )}
          categoryColors={categoryColors}
        />

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
                {/* Bouton mode réorganisation */}
                <Button
                  variant={isDragMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={toggleDragMode}
                  className="gap-2"
                >
                  {isDragMode ? (
                    <>
                      <Move className="w-4 h-4" />
                      Mode réorganisation
                    </>
                  ) : (
                    <>
                      <GripVertical className="w-4 h-4" />
                      Réorganiser
                    </>
                  )}
                </Button>

                {/* Filtre catégorie */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select 
                    value={categoryFilter} 
                    onValueChange={(v) => handleFilterChange(v as CategoryFilter)}
                    disabled={isDragMode}
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
                    onValueChange={(v) => handleSortChange(v as SortOption)}
                    disabled={isDragMode}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Ordre personnalisé</SelectItem>
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

            {/* Info mode drag */}
            {isDragMode && (
              <div className="mb-6 p-4 bg-primary/10 rounded-xl border border-primary/20 animate-fade-in">
                <p className="text-sm text-primary flex items-center gap-2">
                  <GripVertical className="w-4 h-4" />
                  <strong>Mode réorganisation activé :</strong> Glissez-déposez les cartes pour les réordonner.
                  Cliquez sur "Réorganiser" pour quitter ce mode.
                </p>
              </div>
            )}

            {/* Résultats filtrés */}
            {sortedPathologies.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucun favori dans cette catégorie.
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sortedPathologies.map(p => p.slug)}
                  strategy={viewMode === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}
                >
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {sortedPathologies.map((pathology) => (
                        <DraggableFavoriteCard
                          key={pathology.slug}
                          pathology={pathology}
                          categoryLabels={categoryLabels}
                          categoryColors={categoryColors}
                          viewMode="grid"
                          isDragMode={isDragMode}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sortedPathologies.map((pathology) => (
                        <DraggableFavoriteCard
                          key={pathology.slug}
                          pathology={pathology}
                          categoryLabels={categoryLabels}
                          categoryColors={categoryColors}
                          viewMode="list"
                          isDragMode={isDragMode}
                        />
                      ))}
                    </div>
                  )}
                </SortableContext>
              </DndContext>
            )}

            {/* Conseil */}
            <div className="mt-10 p-4 bg-primary/5 rounded-xl border border-primary/10 text-center">
              <p className="text-sm text-muted-foreground">
                💡 <strong>Astuce :</strong> Cliquez sur "Réorganiser" pour personnaliser l'ordre de vos favoris 
                par glisser-déposer. Partagez-les via le menu "Actions".
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MesFavoris;
