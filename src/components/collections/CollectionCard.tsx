// ============================================
// CARTE COLLECTION — COOLANCE
// ============================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Edit3, 
  Trash2, 
  MoreHorizontal,
  FolderOpen,
  X,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { type Collection, useCollections, suggestedEmojis } from '@/hooks/useCollections';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface PathologyMeta {
  name: string;
  icon: string;
  category: string;
}

interface CollectionCardProps {
  collection: Collection;
  pathologyMeta: Record<string, PathologyMeta>;
  categoryColors: Record<string, string>;
  onRemovePathology?: (collectionId: string, pathologySlug: string) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0 as const,
    transition: { type: "spring" as const, stiffness: 400, damping: 25 }
  },
  exit: { opacity: 0, scale: 0.95 }
};

export const CollectionCard = ({ 
  collection, 
  pathologyMeta,
  categoryColors,
  onRemovePathology,
}: CollectionCardProps) => {
  const { updateCollection, deleteCollection, removeFromCollection, getShareLink } = useCollections();
  const { toast } = useToast();
  
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(collection.name);
  const [editEmoji, setEditEmoji] = useState(collection.emoji);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSaveEdit = () => {
    if (!editName.trim()) {
      toast({
        title: "Nom requis",
        description: "Le nom ne peut pas être vide.",
        variant: "destructive",
      });
      return;
    }
    updateCollection(collection.id, { name: editName.trim(), emoji: editEmoji });
    setIsEditing(false);
    toast({
      title: "Collection mise à jour",
      description: `"${editName}" a été modifiée.`,
    });
  };

  const handleDelete = () => {
    deleteCollection(collection.id);
    toast({
      title: "Collection supprimée",
      description: `"${collection.name}" a été supprimée.`,
    });
    setDeleteDialogOpen(false);
  };

  const handleRemovePathology = (slug: string) => {
    removeFromCollection(collection.id, slug);
    onRemovePathology?.(collection.id, slug);
    toast({
      title: "Retiré de la collection",
      description: `${pathologyMeta[slug]?.name || slug} a été retiré.`,
    });
  };

  const handleShare = async () => {
    if (collection.pathologies.length === 0) {
      toast({
        title: "Collection vide",
        description: "Ajoutez des pathologies avant de partager.",
        variant: "destructive",
      });
      return;
    }
    
    const link = getShareLink(collection.id);
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast({
        title: "Lien copié !",
        description: `Le lien de "${collection.name}" est dans votre presse-papier.`,
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

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className="bg-card border border-border rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-muted/30">
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex flex-wrap gap-1">
                  {suggestedEmojis.slice(0, 10).map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={() => setEditEmoji(e)}
                      className={cn(
                        "w-8 h-8 text-lg rounded transition-colors",
                        editEmoji === e
                          ? "bg-primary/20 ring-1 ring-primary"
                          : "hover:bg-muted"
                      )}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                  placeholder="Nom de la collection"
                  className="flex-1"
                  autoFocus
                />
                <Button size="sm" onClick={handleSaveEdit}>
                  Sauver
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                  Annuler
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-3 flex-1 text-left group"
              >
                <motion.span 
                  className="text-2xl"
                  animate={{ rotate: isExpanded ? 0 : -10 }}
                >
                  {collection.emoji}
                </motion.span>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {collection.pathologies.length} pathologie{collection.pathologies.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleShare}>
                    {copied ? (
                      <Check className="w-4 h-4 mr-2 text-primary" />
                    ) : (
                      <Share2 className="w-4 h-4 mr-2" />
                    )}
                    Partager via lien
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => setDeleteDialogOpen(true)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Contenu */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 pt-0">
                {collection.pathologies.length === 0 ? (
                  <div className="py-8 text-center text-muted-foreground">
                    <FolderOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">Cette collection est vide.</p>
                    <p className="text-xs mt-1">
                      Ajoutez des pathologies depuis vos favoris.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 mt-3">
                    <AnimatePresence mode="popLayout">
                      {collection.pathologies.map((slug) => {
                        const meta = pathologyMeta[slug];
                        if (!meta) return null;
                        
                        return (
                          <motion.div
                            key={slug}
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10, scale: 0.95 }}
                            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg group"
                          >
                            <span className="text-xl">{meta.icon}</span>
                            <Link 
                              to={`/pathologies/${slug}`}
                              className="flex-1 font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {meta.name}
                            </Link>
                            <span className={cn(
                              "px-2 py-0.5 text-xs rounded-full border",
                              categoryColors[meta.category] || "bg-muted"
                            )}>
                              {meta.category}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                              onClick={() => handleRemovePathology(slug)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dialog de confirmation suppression */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette collection ?</AlertDialogTitle>
            <AlertDialogDescription>
              La collection "{collection.name}" sera supprimée. 
              Les pathologies resteront dans vos favoris.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CollectionCard;
