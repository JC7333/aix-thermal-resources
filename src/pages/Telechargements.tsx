import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, FileText, Book, Filter, Settings, Printer, Eye, Zap, 
  Clock, CheckCircle2, Archive, Search, X, Accessibility, Heart, 
  Activity, Wind, Baby, Refrigerator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Layout } from '@/components/layout/Layout';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { 
  pathologies, 
  categoryLabels, 
  categoryColors, 
  exportContentAsJson,
  ContentCategory 
} from '@/content/content';
import { hasEvidenceData, getCacheStats, generatePdf1PageBySlug, downloadPdf, getPdfFilename } from '@/services/pdfService';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';
import { ZipDownloadButton } from '@/components/shared/ZipDownloadButton';
import { useToast } from '@/hooks/use-toast';
import { logEvent } from '@/services/analytics';
import { openPrintableFallback } from '@/lib/printFallback';

// ============================================
// FILTRES THÉMATIQUES
// ============================================
type ThemeFilter = 'all' | 'douleur' | 'dos' | 'jambes' | 'souffle' | 'enfants';

interface ThemeFilterOption {
  value: ThemeFilter;
  label: string;
  icon: React.ReactNode;
  keywords: string[];
}

const themeFilters: ThemeFilterOption[] = [
  { 
    value: 'all', 
    label: 'Tout', 
    icon: <Filter className="w-4 h-4" />,
    keywords: [] 
  },
  { 
    value: 'douleur', 
    label: 'Douleur', 
    icon: <Heart className="w-4 h-4" />,
    keywords: ['douleur', 'arthrose', 'articulaire', 'inflammation', 'rhumatisme'] 
  },
  { 
    value: 'dos', 
    label: 'Dos', 
    icon: <Activity className="w-4 h-4" />,
    keywords: ['dos', 'lombalgie', 'lombaire', 'sciatique', 'colonne', 'vertèbre'] 
  },
  { 
    value: 'jambes', 
    label: 'Jambes', 
    icon: <Activity className="w-4 h-4" />,
    keywords: ['jambe', 'veine', 'veineuse', 'lymphatique', 'circulation', 'mollet', 'cheville'] 
  },
  { 
    value: 'souffle', 
    label: 'Souffle', 
    icon: <Wind className="w-4 h-4" />,
    keywords: ['souffle', 'respir', 'bpco', 'asthme', 'poumon', 'bronch'] 
  },
  { 
    value: 'enfants', 
    label: 'Enfants', 
    icon: <Baby className="w-4 h-4" />,
    keywords: ['enfant', 'otite', 'pédiatri', 'bébé', 'nourrisson', 'angine'] 
  },
];

// Temps estimés de génération par type de PDF
const estimatedTimes = {
  '1page': { first: '~2s', cached: '<50ms' },
  '4pages': { first: '~3s', cached: '<50ms' },
};

const Telechargements = () => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [fridgeMode, setFridgeMode] = useState(false); // Mode Frigo = PDFs 1 page uniquement
  const [printingSlug, setPrintingSlug] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Synchronisation avec le Mode Senior global
  const { seniorMode: readableMode } = useAccessibility();
  
  // En mode frigo, on force le mode lisible
  const effectiveReadableMode = readableMode || fridgeMode;

  const publishedPathologies = pathologies.filter(p => p.isPublished);
  
  // Filtrage combiné (thème + recherche)
  const filteredPathologies = useMemo(() => {
    let results = publishedPathologies;
    
    // Filtre par thème
    if (selectedTheme !== 'all') {
      const themeOption = themeFilters.find(t => t.value === selectedTheme);
      if (themeOption) {
        results = results.filter(p => {
          const searchText = `${p.title} ${p.shortDescription} ${p.slug}`.toLowerCase();
          return themeOption.keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
        });
      }
    }
    
    // Filtre par recherche texte
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(p => {
        const searchText = `${p.title} ${p.shortDescription} ${categoryLabels[p.category]}`.toLowerCase();
        return searchText.includes(query);
      });
    }
    
    return results;
  }, [publishedPathologies, selectedTheme, searchQuery]);

  // Stats globales
  const totalPdfs = publishedPathologies.filter(p => hasEvidenceData(p.slug)).length * 2;
  const cacheStats = getCacheStats();

  // Impression directe 1 page
  const handlePrintDirect = async (slug: string, title: string) => {
    setPrintingSlug(slug);
    try {
      const result = await generatePdf1PageBySlug(slug);
      if (result) {
        // Ouvrir le PDF dans un nouvel onglet pour impression
        const url = URL.createObjectURL(result.blob);
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
          };
        }
        logEvent('print_click', `/telechargements`, { slug });
        toast({
          title: "Fiche prête à imprimer",
          description: `${title} — 1 page`,
        });
      } else {
        toast({
          title: 'PDF non disponible',
          description: "Les données pour cette pathologie ne sont pas encore disponibles.",
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('[PDF_GEN_ERROR_UI]', { slug, variant: '1page', error });
      openPrintableFallback({ slug, variant: '1page', autoPrint: true });
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF. Ouverture de la version imprimable (Imprimer → Enregistrer en PDF).",
        variant: "destructive",
      });
    } finally {
      setPrintingSlug(null);
    }
  };

  const handleExportJson = () => {
    const json = exportContentAsJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coolance-content-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSelectedTheme('all');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedTheme !== 'all' || searchQuery.trim() !== '';

  // Classes adaptatives pour le mode très lisible (ou mode frigo)
  const titleClass = effectiveReadableMode 
    ? 'font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6' 
    : 'font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4';
  const textClass = effectiveReadableMode 
    ? 'text-xl text-muted-foreground leading-relaxed' 
    : 'text-lg text-muted-foreground';
  const buttonSize = effectiveReadableMode ? 'lg' : 'default';
  const cardPadding = effectiveReadableMode ? 'p-6 lg:p-8' : 'p-4';
  const gridCols = effectiveReadableMode 
    ? 'grid md:grid-cols-1 lg:grid-cols-2 gap-8' 
    : 'grid md:grid-cols-2 lg:grid-cols-3 gap-6';
  
  // Hauteur minimum des boutons (48px pour accessibilité)
  const buttonMinHeight = effectiveReadableMode ? 'min-h-[56px]' : 'min-h-[48px]';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <Breadcrumb
          items={[
            { label: 'Accueil', href: '/' },
            { label: 'Téléchargements' },
          ]}
        />

        {/* Header */}
        <div className="max-w-4xl mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[280px]">
              <h1 className={titleClass}>
                {fridgeMode ? '🧊 Mode Frigo — Fiches 1 page' : '📥 Téléchargements PDF'}
              </h1>
              <p className={textClass}>
                {fridgeMode 
                  ? 'Les fiches essentielles à imprimer et afficher sur votre réfrigérateur.'
                  : 'Fiches pratiques à imprimer, basées sur les preuves scientifiques. Deux versions par pathologie : 1 page (frigo) ou 4 pages (complet).'}
              </p>
            </div>
            
            {/* Indicateur Mode Senior synchronisé */}
            {effectiveReadableMode && !fridgeMode && (
              <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl border border-primary/30">
                <Accessibility className="w-6 h-6 text-primary" />
                <span className="text-lg font-medium text-primary">
                  Mode Senior actif ✓
                </span>
              </div>
            )}
          </div>
          
          {/* Mode Frigo Switch */}
          <div className={`flex items-center gap-4 mt-6 p-4 rounded-xl border-2 transition-all ${
            fridgeMode 
              ? 'bg-cyan-50 dark:bg-cyan-950/30 border-cyan-300 dark:border-cyan-800' 
              : 'bg-muted/30 border-muted'
          }`}>
            <div className={`p-3 rounded-lg ${fridgeMode ? 'bg-cyan-100 dark:bg-cyan-900' : 'bg-muted'}`}>
              <Refrigerator className={`w-6 h-6 ${fridgeMode ? 'text-cyan-600 dark:text-cyan-400' : 'text-muted-foreground'}`} />
            </div>
            <div className="flex-1">
              <Label htmlFor="fridge-mode" className={`font-semibold cursor-pointer ${effectiveReadableMode ? 'text-xl' : 'text-lg'}`}>
                Mode Frigo
              </Label>
              <p className={`text-muted-foreground ${effectiveReadableMode ? 'text-base' : 'text-sm'}`}>
                Affiche uniquement les fiches 1 page, en texte très gros
              </p>
            </div>
            <Switch 
              id="fridge-mode"
              checked={fridgeMode}
              onCheckedChange={setFridgeMode}
              className="scale-125"
            />
          </div>
          
          {/* Stats rapides */}
          {!fridgeMode && (
            <div className={`flex flex-wrap gap-3 mt-6 ${effectiveReadableMode ? 'text-lg' : ''}`}>
              <div className={`flex items-center gap-2 ${effectiveReadableMode ? 'px-5 py-3' : 'px-4 py-2'} bg-primary/10 rounded-full`}>
                <FileText className={`${effectiveReadableMode ? 'w-5 h-5' : 'w-4 h-4'} text-primary`} />
                <span className="font-medium">{totalPdfs} PDFs disponibles</span>
              </div>
              <div className={`flex items-center gap-2 ${effectiveReadableMode ? 'px-5 py-3' : 'px-4 py-2'} bg-secondary/10 rounded-full`}>
                <Eye className={`${effectiveReadableMode ? 'w-5 h-5' : 'w-4 h-4'} text-secondary`} />
                <span className="font-medium">Prévisualisation intégrée</span>
              </div>
              {cacheStats.size > 0 && (
                <div className={`flex items-center gap-2 ${effectiveReadableMode ? 'px-5 py-3' : 'px-4 py-2'} bg-accent/10 rounded-full`}>
                  <Zap className={`${effectiveReadableMode ? 'w-5 h-5' : 'w-4 h-4'} text-accent-foreground`} />
                  <span className="font-medium">{cacheStats.size} en cache</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Téléchargement groupé ZIP — masqué en mode frigo */}
        {!fridgeMode && (
          <div className={`mb-8 ${effectiveReadableMode ? 'p-8' : 'p-6'} bg-primary/5 rounded-xl border border-primary/20`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`${effectiveReadableMode ? 'p-3' : 'p-2'} bg-primary/10 rounded-lg`}>
                <Archive className={`${effectiveReadableMode ? 'w-7 h-7' : 'w-5 h-5'} text-primary`} />
              </div>
              <div>
                <h2 className={`font-serif ${effectiveReadableMode ? 'text-2xl' : 'text-xl'} font-bold text-foreground`}>
                  Tout télécharger en un clic
                </h2>
                <p className={`${effectiveReadableMode ? 'text-base' : 'text-sm'} text-muted-foreground`}>
                  Téléchargez tous les PDFs dans une archive ZIP
                </p>
              </div>
            </div>
            <ZipDownloadButton variant="default" className={effectiveReadableMode ? 'h-14 text-lg px-8' : ''} />
          </div>
        )}

        {/* Barre de recherche + Filtres */}
        <div className={`mb-8 space-y-4 ${effectiveReadableMode ? 'p-6' : 'p-4'} bg-muted/30 rounded-xl border border-muted`}>
          {/* Recherche */}
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${effectiveReadableMode ? 'w-6 h-6' : 'w-5 h-5'} text-muted-foreground`} />
            <Input
              type="text"
              placeholder="Rechercher une pathologie..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${effectiveReadableMode ? 'pl-14 h-16 text-2xl' : 'pl-12 h-12 text-lg'} rounded-full ${buttonMinHeight}`}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className={`absolute right-2 top-1/2 -translate-y-1/2 ${effectiveReadableMode ? 'h-12 w-12' : 'h-10 w-10'}`}
                onClick={() => setSearchQuery('')}
              >
                <X className={effectiveReadableMode ? 'w-6 h-6' : 'w-5 h-5'} />
              </Button>
            )}
          </div>

          {/* Filtres thématiques */}
          <div>
            <p className={`${effectiveReadableMode ? 'text-xl mb-4' : 'text-sm mb-2'} font-medium text-muted-foreground`}>
              Filtrer par thème :
            </p>
            <div className={`flex flex-wrap ${effectiveReadableMode ? 'gap-3' : 'gap-2'}`}>
              {themeFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedTheme === filter.value ? 'default' : 'outline'}
                  size={buttonSize}
                  onClick={() => setSelectedTheme(filter.value)}
                  className={`gap-2 rounded-full ${buttonMinHeight} ${effectiveReadableMode ? 'text-xl px-8' : 'px-6'}`}
                >
                  {filter.icon}
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Reset filters */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between pt-3 border-t border-muted">
              <p className={`${effectiveReadableMode ? 'text-lg' : 'text-sm'} text-muted-foreground`}>
                {filteredPathologies.length} résultat{filteredPathologies.length > 1 ? 's' : ''}
              </p>
              <Button 
                variant="ghost" 
                size={effectiveReadableMode ? 'lg' : 'default'} 
                onClick={clearFilters}
                className={`gap-2 ${buttonMinHeight}`}
              >
                <X className={effectiveReadableMode ? 'w-5 h-5' : 'w-4 h-4'} />
                Effacer les filtres
              </Button>
            </div>
          )}
        </div>

        {/* PDF Grid */}
        <div className={gridCols}>
          {filteredPathologies.map((pathology) => {
            const hasEvidence = hasEvidenceData(pathology.slug);
            const isPrinting = printingSlug === pathology.slug;
            
            return (
              <Card 
                key={pathology.id} 
                className={`hover:shadow-lg transition-shadow group ${effectiveReadableMode ? 'border-2' : ''}`}
              >
                <CardContent className={`${cardPadding} space-y-4`}>
                  {/* Header de la carte */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <Badge 
                        variant="outline" 
                        className={`mb-2 ${categoryColors[pathology.category]} ${effectiveReadableMode ? 'text-base px-4 py-1.5' : ''}`}
                      >
                        {categoryLabels[pathology.category]}
                      </Badge>
                      <h3 className={`font-serif font-bold group-hover:text-primary transition-colors ${effectiveReadableMode ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                        {pathology.title}
                      </h3>
                    </div>
                    {hasEvidence && !fridgeMode && (
                      <Badge variant="secondary" className={`shrink-0 gap-1 ${effectiveReadableMode ? 'text-sm' : ''}`}>
                        <CheckCircle2 className="w-3 h-3" />
                        Evidence
                      </Badge>
                    )}
                  </div>
                  
                  <p className={`${effectiveReadableMode ? 'text-xl' : 'text-sm'} text-muted-foreground`}>
                    {pathology.shortDescription}
                  </p>

                  {hasEvidence ? (
                    <>
                      {fridgeMode ? (
                        /* Mode Frigo : uniquement fiche 1 page avec gros boutons */
                        <div className="space-y-3 pt-2">
                          <PdfDownloadButtons 
                            slug={pathology.slug} 
                            variant="compact"
                            showPreview={true}
                            size="lg"
                          />
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handlePrintDirect(pathology.slug, pathology.title)}
                            disabled={isPrinting}
                            className={`w-full gap-3 ${buttonMinHeight} text-lg`}
                          >
                            <Printer className="w-5 h-5" />
                            {isPrinting ? 'Préparation...' : 'Imprimer la fiche'}
                          </Button>
                        </div>
                      ) : (
                        /* Mode normal : boutons PDF côte à côte + bouton imprimer */
                        <div className="space-y-3 pt-2">
                          <div className={`grid grid-cols-2 gap-3`}>
                            <PdfDownloadButtons 
                              slug={pathology.slug} 
                              variant="split"
                              showPreview={true}
                              size={effectiveReadableMode ? 'lg' : 'default'}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size={effectiveReadableMode ? 'lg' : 'default'}
                            onClick={() => handlePrintDirect(pathology.slug, pathology.title)}
                            disabled={isPrinting}
                            className={`w-full gap-2 ${buttonMinHeight} text-muted-foreground hover:text-foreground`}
                          >
                            <Printer className={effectiveReadableMode ? 'w-5 h-5' : 'w-4 h-4'} />
                            {isPrinting ? 'Préparation...' : 'Imprimer 1 page'}
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={`${effectiveReadableMode ? 'p-6' : 'p-4'} bg-muted/30 rounded-lg text-center`}>
                      <p className={`${effectiveReadableMode ? 'text-lg' : 'text-sm'} text-muted-foreground italic`}>
                        Aucun PDF disponible pour cette catégorie
                      </p>
                    </div>
                  )}

                  {/* Lien vers page en ligne — masqué en mode frigo */}
                  {!fridgeMode && (
                    <Link 
                      to={`/pathologies/v2/${pathology.slug}`}
                      className={`block text-center text-primary hover:underline ${effectiveReadableMode ? 'text-lg font-medium' : 'text-sm'}`}
                    >
                      Voir la version en ligne →
                    </Link>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredPathologies.length === 0 && (
          <div className={`text-center ${effectiveReadableMode ? 'py-16' : 'py-12'}`}>
            <p className={`${effectiveReadableMode ? 'text-2xl' : 'text-base'} text-muted-foreground mb-4`}>
              Aucune pathologie ne correspond à votre recherche.
            </p>
            <Button variant="outline" size={buttonSize} onClick={clearFilters} className={buttonMinHeight}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Print tips — masqué en mode frigo */}
        {!fridgeMode && (
          <div className={`mt-12 ${effectiveReadableMode ? 'p-8' : 'p-6'} bg-muted/50 rounded-xl`}>
            <div className="flex items-start gap-4">
              <div className={`${effectiveReadableMode ? 'p-4' : 'p-3'} bg-primary/10 rounded-lg shrink-0`}>
                <Printer className={`${effectiveReadableMode ? 'w-8 h-8' : 'w-6 h-6'} text-primary`} />
              </div>
              <div>
                <h3 className={`font-semibold ${effectiveReadableMode ? 'text-2xl mb-4' : 'text-lg mb-2'}`}>
                  Conseils d'impression
                </h3>
                <ul className={`text-muted-foreground space-y-2 ${effectiveReadableMode ? 'text-lg' : ''}`}>
                  <li>• Imprimez en <strong>format A4</strong> pour une lisibilité optimale</li>
                  <li>• Gardez les couleurs pour les repères visuels</li>
                  <li>• Vous pouvez cocher les cases directement sur la fiche imprimée</li>
                  <li>• Affichez la <strong>fiche 1 page sur votre réfrigérateur</strong> !</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Cache info — masqué en mode frigo */}
        {!fridgeMode && (
          <div className={`mt-8 ${effectiveReadableMode ? 'p-5' : 'p-4'} bg-secondary/5 rounded-lg border border-secondary/20`}>
            <div className="flex items-center gap-3">
              <Zap className={`${effectiveReadableMode ? 'w-6 h-6' : 'w-5 h-5'} text-secondary shrink-0`} />
              <div>
                <p className={`font-medium text-foreground ${effectiveReadableMode ? 'text-lg' : 'text-sm'}`}>
                  Système de cache intelligent
                </p>
                <p className={`text-muted-foreground ${effectiveReadableMode ? 'text-base' : 'text-xs'}`}>
                  Les PDFs sont mis en cache 30 min. La 2ème ouverture est quasi instantanée !
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reminder */}
        <div className={`mt-8 ${effectiveReadableMode ? 'p-6' : 'p-4'} bg-accent/10 rounded-lg border border-accent/20`}>
          <p className={`text-center text-muted-foreground ${effectiveReadableMode ? 'text-xl' : 'text-sm'}`}>
            <strong>Rappel :</strong> Ces fiches sont des outils éducatifs. Elles ne remplacent pas 
            un avis médical. Si vos symptômes persistent, parlez-en à un professionnel de santé.
          </p>
        </div>

        {/* Admin (discret) */}
        <div className="mt-8 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground/50 hover:text-muted-foreground text-xs"
            onClick={() => setShowAdmin(!showAdmin)}
          >
            <Settings className="w-3 h-3 mr-1" />
            Admin
          </Button>
        </div>

        {showAdmin && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm">Exporter le contenu</p>
                <p className="text-xs text-muted-foreground">
                  Télécharge tout le contenu en JSON
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportJson}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Exporter JSON
              </Button>
            </div>

            <div className="pt-4 border-t border-muted">
              <p className="font-medium text-sm mb-2">Statistiques cache PDF</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground text-xs">PDFs en cache</p>
                  <p className="font-mono text-lg font-bold text-primary">{cacheStats.size}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground text-xs">Entrées</p>
                  <p className="font-mono text-xs text-muted-foreground truncate">
                    {cacheStats.entries.length > 0 ? cacheStats.entries.join(', ') : 'Vide'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Telechargements;
