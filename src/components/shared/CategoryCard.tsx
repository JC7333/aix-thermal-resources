import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PathologyCategory, categoryLabels, categoryIcons, categoryColors } from '@/data/pathologies';

interface CategoryCardProps {
  category: PathologyCategory;
  description: string;
  pathologyCount: number;
}

export const CategoryCard = ({ category, description, pathologyCount }: CategoryCardProps) => {
  return (
    <Link
      to={`/ressources?categorie=${category}`}
      className="group card-medical block hover:shadow-elevated"
    >
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${categoryColors[category]} border shrink-0`}>
          {categoryIcons[category]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {categoryLabels[category]}
          </h3>
          <p className="mt-1 text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {pathologyCount} pathologies
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Explorer
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
