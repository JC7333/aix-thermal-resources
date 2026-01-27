// ============================================
// BOUTON FAVORI — COOLANCE
// ============================================
// Bouton pour ajouter/retirer une pathologie des favoris
// Avec animation et feedback visuel
// ============================================

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  slug: string;
  variant?: 'default' | 'icon' | 'compact';
  className?: string;
  showLabel?: boolean;
}

export const FavoriteButton = ({ 
  slug, 
  variant = 'default',
  className = '',
  showLabel = true,
}: FavoriteButtonProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isActive = isFavorite(slug);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(slug);
  };

  // Variant icon only
  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          "p-2 rounded-full transition-all duration-200",
          "hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary/50",
          isActive && "text-destructive",
          className
        )}
        aria-label={isActive ? "Retirer des favoris" : "Ajouter aux favoris"}
        title={isActive ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart 
          className={cn(
            "w-5 h-5 transition-all duration-200",
            isActive ? "fill-destructive stroke-destructive scale-110" : "stroke-muted-foreground hover:stroke-destructive"
          )} 
        />
      </button>
    );
  }

  // Variant compact
  if (variant === 'compact') {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className={cn(
          "gap-1.5 h-8 px-2",
          isActive && "text-destructive",
          className
        )}
      >
        <Heart 
          className={cn(
            "w-4 h-4 transition-all duration-200",
            isActive ? "fill-destructive stroke-destructive" : "stroke-current"
          )} 
        />
        {showLabel && (
          <span className="text-xs">
            {isActive ? 'Favori' : 'Ajouter'}
          </span>
        )}
      </Button>
    );
  }

  // Variant default
  return (
    <Button
      variant={isActive ? "outline" : "ghost"}
      size="sm"
      onClick={handleClick}
      className={cn(
        "gap-2 transition-all duration-200",
        isActive && "border-destructive/30 text-destructive hover:text-destructive hover:bg-destructive/5",
        className
      )}
    >
      <Heart 
        className={cn(
          "w-4 h-4 transition-all duration-200",
          isActive ? "fill-destructive stroke-destructive" : "stroke-current"
        )} 
      />
      {showLabel && (
        <span>
          {isActive ? 'Dans mes favoris' : 'Ajouter aux favoris'}
        </span>
      )}
    </Button>
  );
};

export default FavoriteButton;
