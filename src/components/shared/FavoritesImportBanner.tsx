// ============================================
// BANNIÈRE IMPORT FAVORIS — COOLANCE
// ============================================
// Affichée quand des favoris sont importés via URL
// ============================================

import { useState } from 'react';
import { Heart, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';

export const FavoritesImportBanner = () => {
  const { importedFromUrl, count, saveImportedFavorites, clearFavorites } = useFavorites();
  const { toast } = useToast();
  const [dismissed, setDismissed] = useState(false);

  if (!importedFromUrl || dismissed) {
    return null;
  }

  const handleSave = () => {
    saveImportedFavorites();
    toast({
      title: "Favoris enregistrés",
      description: `${count} favori(s) ajouté(s) à votre liste.`,
    });
    setDismissed(true);
  };

  const handleDismiss = () => {
    clearFavorites();
    // Nettoyer l'URL
    const url = new URL(window.location.href);
    url.searchParams.delete('favoris');
    window.history.replaceState({}, '', url.toString());
    setDismissed(true);
  };

  return (
    <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 animate-in slide-in-from-top-2">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/20 rounded-lg shrink-0">
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">
            Favoris partagés ({count})
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Quelqu'un a partagé ses pathologies favorites avec vous.
            Voulez-vous les ajouter à votre liste ?
          </p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSave} size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              Enregistrer dans mes favoris
            </Button>
            <Button onClick={handleDismiss} variant="ghost" size="sm" className="gap-2">
              <X className="w-4 h-4" />
              Ignorer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesImportBanner;
