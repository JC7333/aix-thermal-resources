// ============================================
// MENU AJOUT À COLLECTION — COOLANCE
// ============================================

import { useState } from 'react';
import { FolderPlus, Check, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useCollections } from '@/hooks/useCollections';
import { useToast } from '@/hooks/use-toast';
import { CreateCollectionDialog } from './CreateCollectionDialog';
import { cn } from '@/lib/utils';

interface AddToCollectionMenuProps {
  pathologySlug: string;
  pathologyName: string;
  variant?: 'icon' | 'button';
  className?: string;
}

export const AddToCollectionMenu = ({ 
  pathologySlug, 
  pathologyName,
  variant = 'icon',
  className = '',
}: AddToCollectionMenuProps) => {
  const { 
    collections, 
    addToCollection, 
    removeFromCollection, 
    isInCollection,
    getCollectionsForPathology,
  } = useCollections();
  const { toast } = useToast();
  
  const [open, setOpen] = useState(false);

  const inCollections = getCollectionsForPathology(pathologySlug);
  const hasCollections = collections.length > 0;

  const handleToggleCollection = (collectionId: string, collectionName: string) => {
    if (isInCollection(collectionId, pathologySlug)) {
      removeFromCollection(collectionId, pathologySlug);
      toast({
        title: "Retiré",
        description: `"${pathologyName}" retiré de "${collectionName}".`,
      });
    } else {
      addToCollection(collectionId, pathologySlug);
      toast({
        title: "Ajouté",
        description: `"${pathologyName}" ajouté à "${collectionName}".`,
      });
    }
  };

  const triggerButton = variant === 'icon' ? (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "relative h-8 w-8",
        inCollections.length > 0 && "text-primary",
        className
      )}
    >
      <FolderPlus className="w-4 h-4" />
      {inCollections.length > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
          {inCollections.length}
        </span>
      )}
    </Button>
  ) : (
    <Button
      variant="outline"
      size="sm"
      className={cn("gap-2", className)}
    >
      <FolderPlus className="w-4 h-4" />
      Collections
      {inCollections.length > 0 && (
        <span className="bg-primary text-primary-foreground text-xs px-1.5 rounded-full">
          {inCollections.length}
        </span>
      )}
    </Button>
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerButton}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-0">
        <div className="p-3 border-b border-border">
          <h4 className="font-medium text-sm">Ajouter à une collection</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {pathologyName}
          </p>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {!hasCollections ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              <p className="mb-3">Aucune collection créée.</p>
              <CreateCollectionDialog 
                trigger={
                  <Button size="sm" variant="outline" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Créer une collection
                  </Button>
                }
                onCreated={(id) => {
                  addToCollection(id, pathologySlug);
                  setOpen(false);
                }}
              />
            </div>
          ) : (
            <div className="p-2 space-y-1">
              <AnimatePresence>
                {collections.map((col) => {
                  const isIn = isInCollection(col.id, pathologySlug);
                  return (
                    <motion.button
                      key={col.id}
                      layout
                      onClick={() => handleToggleCollection(col.id, col.name)}
                      className={cn(
                        "w-full flex items-center gap-3 p-2 rounded-lg transition-colors text-left",
                        isIn 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted"
                      )}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-lg">{col.emoji}</span>
                      <span className="flex-1 text-sm font-medium truncate">
                        {col.name}
                      </span>
                      <AnimatePresence mode="wait">
                        {isIn && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Check className="w-4 h-4 text-primary" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {hasCollections && (
          <div className="p-2 border-t border-border">
            <CreateCollectionDialog 
              trigger={
                <Button variant="ghost" size="sm" className="w-full gap-2 justify-start">
                  <Plus className="w-4 h-4" />
                  Nouvelle collection
                </Button>
              }
              onCreated={(id) => {
                addToCollection(id, pathologySlug);
                setOpen(false);
              }}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AddToCollectionMenu;
