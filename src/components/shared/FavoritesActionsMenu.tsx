// ============================================
// MENU ACTIONS FAVORIS — COOLANCE
// ============================================
// Dropdown avec options export/partage des favoris
// ============================================

import { useState } from 'react';
import { Share2, Download, Link2, Copy, Check, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/hooks/use-toast';

interface FavoritesActionsMenuProps {
  className?: string;
}

export const FavoritesActionsMenu = ({ className = '' }: FavoritesActionsMenuProps) => {
  const { 
    favorites, 
    count, 
    getShareLink, 
    downloadJson, 
    clearFavorites,
    importFavorites,
  } = useFavorites();
  const { toast } = useToast();
  
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const handleShare = () => {
    const link = getShareLink();
    if (link) {
      setShareLink(link);
      setShareDialogOpen(true);
    } else {
      toast({
        title: "Aucun favori",
        description: "Ajoutez des pathologies à vos favoris pour les partager.",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast({
        title: "Lien copié !",
        description: "Le lien de partage est dans votre presse-papier.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de copier le lien.",
        variant: "destructive",
      });
    }
  };

  const handleExportJson = () => {
    if (count === 0) {
      toast({
        title: "Aucun favori",
        description: "Ajoutez des pathologies à vos favoris pour les exporter.",
        variant: "destructive",
      });
      return;
    }
    downloadJson();
    toast({
      title: "Export réussi",
      description: `${count} favori(s) exporté(s) en JSON.`,
    });
  };

  const handleClear = () => {
    if (count === 0) return;
    clearFavorites();
    toast({
      title: "Favoris vidés",
      description: "Tous vos favoris ont été supprimés.",
    });
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const data = JSON.parse(content);
        
        if (data.favorites && Array.isArray(data.favorites)) {
          importFavorites(data.favorites, false);
          toast({
            title: "Import réussi",
            description: `${data.favorites.length} favori(s) importé(s).`,
          });
          setImportDialogOpen(false);
        } else {
          throw new Error('Format invalide');
        }
      } catch (error) {
        toast({
          title: "Erreur d'import",
          description: "Le fichier n'est pas un export valide de favoris.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  if (count === 0) {
    return null;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className={`gap-2 ${className}`}>
            <Share2 className="w-4 h-4" />
            Actions ({count})
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleShare}>
            <Link2 className="w-4 h-4 mr-2" />
            Partager via lien
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportJson}>
            <Download className="w-4 h-4 mr-2" />
            Exporter en JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setImportDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Importer un fichier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onClick={handleClear}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Vider les favoris
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de partage */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Partager mes favoris</DialogTitle>
            <DialogDescription>
              Copiez ce lien pour partager vos {count} pathologie(s) favorite(s).
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Input 
              value={shareLink} 
              readOnly 
              className="font-mono text-xs"
            />
            <Button onClick={handleCopyLink} variant="outline" size="icon">
              {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShareDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog d'import */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importer des favoris</DialogTitle>
            <DialogDescription>
              Sélectionnez un fichier JSON exporté depuis COOLANCE.
              Les favoris seront ajoutés à votre liste existante.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input 
              type="file" 
              accept=".json,application/json"
              onChange={handleImportFile}
            />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setImportDialogOpen(false)}>
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FavoritesActionsMenu;
