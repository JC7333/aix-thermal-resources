// ============================================
// DIALOG CRÉATION COLLECTION — COOLANCE
// ============================================

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCollections, suggestedEmojis } from '@/hooks/useCollections';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface CreateCollectionDialogProps {
  trigger?: React.ReactNode;
  onCreated?: (collectionId: string) => void;
}

export const CreateCollectionDialog = ({ trigger, onCreated }: CreateCollectionDialogProps) => {
  const { createCollection } = useCollections();
  const { toast } = useToast();
  
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('📁');

  const handleCreate = () => {
    if (!name.trim()) {
      toast({
        title: "Nom requis",
        description: "Donnez un nom à votre collection.",
        variant: "destructive",
      });
      return;
    }

    const collection = createCollection(name, emoji);
    toast({
      title: "Collection créée",
      description: `"${collection.name}" est prête à recevoir vos favoris.`,
    });

    setOpen(false);
    setName('');
    setEmoji('📁');
    onCreated?.(collection.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreate();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle collection
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{emoji}</span>
            Créer une collection
          </DialogTitle>
          <DialogDescription>
            Organisez vos favoris en les regroupant par thème, personne ou usage.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nom */}
          <div className="space-y-2">
            <Label htmlFor="collection-name">Nom de la collection</Label>
            <Input
              id="collection-name"
              placeholder="Ex: Ma routine quotidienne, Pour ma mère..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={50}
            />
          </div>

          {/* Choix emoji */}
          <div className="space-y-2">
            <Label>Icône</Label>
            <div className="flex flex-wrap gap-2">
              {suggestedEmojis.map((e) => (
                <motion.button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-10 h-10 text-xl rounded-lg transition-colors",
                    emoji === e
                      ? "bg-primary/20 ring-2 ring-primary"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {e}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleCreate} disabled={!name.trim()}>
            <Plus className="w-4 h-4 mr-2" />
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollectionDialog;
