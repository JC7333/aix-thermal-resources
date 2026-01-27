// ============================================
// SECTION COLLECTIONS — COOLANCE
// ============================================

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, BookOpen, Clock } from 'lucide-react';
import { useCollections } from '@/hooks/useCollections';
import { CollectionCard } from './CollectionCard';
import { CreateCollectionDialog } from './CreateCollectionDialog';

interface PathologyMeta {
  name: string;
  icon: string;
  category: string;
  readingTime?: number;
}

interface CollectionsSectionProps {
  pathologyMeta: Record<string, PathologyMeta>;
  categoryColors: Record<string, string>;
}

export const CollectionsSection = ({ 
  pathologyMeta, 
  categoryColors 
}: CollectionsSectionProps) => {
  const { collections, count, isLoaded } = useCollections();

  // Calcul des statistiques globales
  const stats = useMemo(() => {
    // Obtenir tous les slugs uniques dans toutes les collections
    const allSlugs = new Set<string>();
    collections.forEach(col => {
      col.pathologies.forEach(slug => allSlugs.add(slug));
    });

    // Calculer le temps de lecture total
    let totalReadingTime = 0;
    allSlugs.forEach(slug => {
      const meta = pathologyMeta[slug];
      if (meta?.readingTime) {
        totalReadingTime += meta.readingTime;
      }
    });

    return {
      uniquePathologies: allSlugs.size,
      totalReadingTime,
    };
  }, [collections, pathologyMeta]);

  if (!isLoaded) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-48 mb-4" />
        <div className="h-24 bg-muted rounded-xl" />
      </div>
    );
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <FolderOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              Mes collections
            </h2>
            <p className="text-sm text-muted-foreground">
              {count === 0 
                ? "Organisez vos favoris en collections"
                : `${count} collection${count > 1 ? 's' : ''}`
              }
            </p>
          </div>
        </div>
        <CreateCollectionDialog />
      </div>

      {/* Statistiques globales */}
      {count > 0 && stats.uniquePathologies > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 mb-4 p-3 bg-muted/30 rounded-lg"
        >
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">{stats.uniquePathologies}</strong> pathologie{stats.uniquePathologies > 1 ? 's' : ''} organisée{stats.uniquePathologies > 1 ? 's' : ''}
            </span>
          </div>
          {stats.totalReadingTime > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">{stats.totalReadingTime}</strong> min de lecture au total
              </span>
            </div>
          )}
        </motion.div>
      )}

      {count === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10 bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/20"
        >
          <FolderOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground mb-4">
            Créez des collections pour organiser vos favoris par thème.
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Exemples : "Ma routine quotidienne", "Pour ma mère", "Exercices du matin"
          </p>
          <CreateCollectionDialog />
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {collections.map((collection) => (
              <CollectionCard
                key={collection.id}
                collection={collection}
                pathologyMeta={pathologyMeta}
                categoryColors={categoryColors}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
};

export default CollectionsSection;
