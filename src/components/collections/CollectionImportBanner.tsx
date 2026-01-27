// ============================================
// BANNIÈRE IMPORT COLLECTION — COOLANCE
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  useCollections, 
  getSharedCollectionFromUrl,
  type SharedCollection,
} from '@/hooks/useCollections';
import { useToast } from '@/hooks/use-toast';

export const CollectionImportBanner = () => {
  const { importSharedCollection } = useCollections();
  const { toast } = useToast();
  
  const [sharedCollection, setSharedCollection] = useState<SharedCollection | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const shared = getSharedCollectionFromUrl();
    if (shared) {
      setSharedCollection(shared);
    }
  }, []);

  const handleImport = () => {
    if (!sharedCollection) return;
    
    const imported = importSharedCollection(sharedCollection);
    toast({
      title: "Collection importée !",
      description: `"${imported.name}" avec ${imported.pathologies.length} pathologie(s) ajoutée.`,
    });
    
    // Nettoyer l'URL
    const url = new URL(window.location.href);
    url.searchParams.delete('collection');
    window.history.replaceState({}, '', url.toString());
    
    setSharedCollection(null);
  };

  const handleDismiss = () => {
    setDismissed(true);
    // Nettoyer l'URL
    const url = new URL(window.location.href);
    url.searchParams.delete('collection');
    window.history.replaceState({}, '', url.toString());
  };

  if (!sharedCollection || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="mb-6 p-4 bg-primary/10 rounded-xl border border-primary/20"
      >
        <div className="flex items-start gap-4">
          <div className="p-2 bg-primary/20 rounded-lg shrink-0">
            <FolderPlus className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground">
              Collection partagée : {sharedCollection.emoji} {sharedCollection.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Quelqu'un vous a partagé une collection contenant{' '}
              <strong>{sharedCollection.pathologies.length} pathologie(s)</strong>.
              Voulez-vous l'ajouter à vos collections ?
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" onClick={handleImport} className="gap-2">
              <Check className="w-4 h-4" />
              Importer
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={handleDismiss}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CollectionImportBanner;
