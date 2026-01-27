// ============================================
// CARTE FAVORI DRAGGABLE — COOLANCE
// ============================================
// Carte de pathologie favorite avec support drag & drop
// ============================================

import { Link } from 'react-router-dom';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, BookOpen, GripVertical } from 'lucide-react';
import { FavoriteButton } from '@/components/shared/FavoriteButton';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  if (viewMode === 'list') {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "card-medical flex items-center gap-4 group",
          isDragging && "shadow-lg ring-2 ring-primary/30",
          isDragMode && "cursor-grab active:cursor-grabbing"
        )}
      >
        {/* Handle de drag */}
        {isDragMode && (
          <button
            {...attributes}
            {...listeners}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground touch-none"
            aria-label="Glisser pour réordonner"
          >
            <GripVertical className="w-5 h-5" />
          </button>
        )}

        <span className="text-3xl shrink-0">{pathology.meta.icon}</span>
        
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

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {pathology.meta.readingTime} min
          </span>
          
          {!isDragMode && hasEvidenceData(pathology.slug) && (
            <PdfDownloadButtons slug={pathology.slug} variant="compact" />
          )}
          
          {!isDragMode && <FavoriteButton slug={pathology.slug} variant="icon" />}
        </div>
      </div>
    );
  }

  // Vue grille
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "card-medical flex flex-col group relative",
        isDragging && "shadow-lg ring-2 ring-primary/30",
        isDragMode && "cursor-grab active:cursor-grabbing"
      )}
    >
      {/* Handle de drag en mode grille */}
      {isDragMode && (
        <button
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 p-1.5 bg-muted/80 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted touch-none z-10"
          aria-label="Glisser pour réordonner"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      )}

      <div className="flex items-start justify-between mb-3">
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[pathology.meta.category]}`}>
          {categoryLabels[pathology.meta.category]}
        </span>
        {!isDragMode && <FavoriteButton slug={pathology.slug} variant="icon" />}
      </div>

      <Link 
        to={`/pathologies/${pathology.slug}`} 
        className="block mb-4"
        onClick={(e) => isDragMode && e.preventDefault()}
      >
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
      {!isDragMode && hasEvidenceData(pathology.slug) && (
        <div className="pt-3 border-t border-border mt-auto">
          <PdfDownloadButtons slug={pathology.slug} variant="compact" />
        </div>
      )}
    </div>
  );
};

export default DraggableFavoriteCard;
