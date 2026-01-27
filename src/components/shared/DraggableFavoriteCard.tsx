// ============================================
// CARTE FAVORI DRAGGABLE — COOLANCE
// ============================================
// Carte de pathologie favorite avec support drag & drop
// Animations fluides avec framer-motion
// ============================================

import { Link } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, BookOpen, GripVertical } from 'lucide-react';
import { FavoriteButton } from '@/components/shared/FavoriteButton';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';
import { AddToCollectionMenu } from '@/components/collections/AddToCollectionMenu';
import { hasEvidenceData } from '@/services/pdfService';
import { cn } from '@/lib/utils';

interface PathologyData {
  slug: string;
  meta: {
    name: string;
    category: string;
    shortDescription: string;
    readingTime: number;
    icon: string;
  };
  evidence?: {
    recommendations: { text: string; evidence: string }[];
  };
}

interface DraggableFavoriteCardProps {
  pathology: PathologyData;
  categoryLabels: Record<string, string>;
  categoryColors: Record<string, string>;
  viewMode: 'grid' | 'list';
  isDragMode: boolean;
}

// Variants d'animation pour les cartes
const cardVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.95,
    y: 10,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.15,
    }
  },
  dragging: {
    scale: 1.02,
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.15)",
    zIndex: 1000,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    }
  },
};

// Variants pour le handle de drag
const handleVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    x: -10,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 30,
    }
  },
};

// Variants pour le badge grip en mode grille
const gripBadgeVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 600,
      damping: 25,
      delay: 0.1,
    }
  },
};

export const DraggableFavoriteCard = ({
  pathology,
  categoryLabels,
  categoryColors,
  viewMode,
  isDragMode,
}: DraggableFavoriteCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pathology.slug });

  // Style pour dnd-kit (position uniquement)
  const dndStyle = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: isDragging ? undefined : transition,
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        ref={setNodeRef}
        style={dndStyle}
        initial="initial"
        animate={isDragging ? "dragging" : "animate"}
        exit="exit"
        variants={cardVariants}
        layout
        layoutId={`favorite-${pathology.slug}`}
        className={cn(
          "card-medical flex items-center gap-4 group",
          isDragging && "ring-2 ring-primary/30",
          isDragMode && "cursor-grab active:cursor-grabbing"
        )}
      >
        {/* Handle de drag animé */}
        <AnimatePresence>
          {isDragMode && (
            <motion.button
              {...attributes}
              {...listeners}
              variants={handleVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground touch-none"
              aria-label="Glisser pour réordonner"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GripVertical className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.span 
          className="text-3xl shrink-0"
          animate={{ 
            rotate: isDragging ? [0, -5, 5, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {pathology.meta.icon}
        </motion.span>
        
        <Link 
          to={`/pathologies/${pathology.slug}`}
          className="flex-1 min-w-0"
          onClick={(e) => isDragMode && e.preventDefault()}
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

        <motion.div 
          className="flex items-center gap-2 shrink-0"
          animate={{ opacity: isDragMode ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {pathology.meta.readingTime} min
          </span>
          
          <AnimatePresence>
            {!isDragMode && hasEvidenceData(pathology.slug) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <PdfDownloadButtons slug={pathology.slug} variant="compact" />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isDragMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <AddToCollectionMenu 
                  pathologySlug={pathology.slug} 
                  pathologyName={pathology.meta.name}
                  variant="icon"
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {!isDragMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
              >
                <FavoriteButton slug={pathology.slug} variant="icon" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  }

  // Vue grille
  return (
    <motion.div
      ref={setNodeRef}
      style={dndStyle}
      initial="initial"
      animate={isDragging ? "dragging" : "animate"}
      exit="exit"
      variants={cardVariants}
      layout
      layoutId={`favorite-grid-${pathology.slug}`}
      className={cn(
        "card-medical flex flex-col group relative",
        isDragging && "ring-2 ring-primary/30",
        isDragMode && "cursor-grab active:cursor-grabbing"
      )}
    >
      {/* Handle de drag en mode grille */}
      <AnimatePresence>
        {isDragMode && (
          <motion.button
            {...attributes}
            {...listeners}
            variants={gripBadgeVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-2 left-2 p-1.5 bg-primary/10 backdrop-blur-sm rounded-md text-primary hover:bg-primary/20 touch-none z-10"
            aria-label="Glisser pour réordonner"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <GripVertical className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex items-start justify-between mb-3">
        <motion.span 
          layout
          className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[pathology.meta.category]}`}
        >
          {categoryLabels[pathology.meta.category]}
        </motion.span>
        <AnimatePresence>
          {!isDragMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-1"
            >
              <AddToCollectionMenu 
                pathologySlug={pathology.slug} 
                pathologyName={pathology.meta.name}
                variant="icon"
              />
              <FavoriteButton slug={pathology.slug} variant="icon" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link 
        to={`/pathologies/${pathology.slug}`} 
        className="block mb-4"
        onClick={(e) => isDragMode && e.preventDefault()}
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.span 
            className="text-2xl"
            animate={{ 
              rotate: isDragging ? [0, -10, 10, 0] : 0,
              scale: isDragging ? 1.1 : 1,
            }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            {pathology.meta.icon}
          </motion.span>
          <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {pathology.meta.name}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm">
          {pathology.meta.shortDescription}
        </p>
      </Link>

      <motion.div 
        className="flex items-center gap-3 text-xs text-muted-foreground mb-4"
        animate={{ opacity: isDragMode ? 0.6 : 1 }}
      >
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
      </motion.div>

      {/* Actions PDF avec animation */}
      <AnimatePresence>
        {!isDragMode && hasEvidenceData(pathology.slug) && (
          <motion.div 
            className="pt-3 border-t border-border mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <PdfDownloadButtons slug={pathology.slug} variant="compact" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DraggableFavoriteCard;
