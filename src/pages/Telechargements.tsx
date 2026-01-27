import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Book, Filter, Settings, Printer, Eye, Zap, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { 
  pathologies, 
  categoryLabels, 
  categoryColors, 
  PathologyContent,
  exportContentAsJson,
  ContentCategory 
} from '@/content/content';
import { hasEvidenceData, getCacheStats } from '@/services/pdfService';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';

type CategoryFilter = 'all' | ContentCategory;

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'rhumatologie', label: '🦴 Rhumatologie' },
  { value: 'veino-lymphatique', label: '🩸 Veino-lymphatique' },
  { value: 'orl-respiratoire', label: '🫁 ORL & Respiratoire' },
  { value: 'muqueuses-buccales', label: '👄 Muqueuses buccales' },
];

// Temps estimés de génération par type de PDF
const estimatedTimes = {
  '1page': { first: '~2s', cached: '<50ms' },
  '4pages': { first: '~3s', cached: '<50ms' },
};

const Telechargements = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [showAdmin, setShowAdmin] = useState(false);

  const publishedPathologies = pathologies.filter(p => p.isPublished);
  const filteredPathologies = selectedCategory === 'all' 
    ? publishedPathologies 
    : publishedPathologies.filter(p => p.category === selectedCategory);

  // Stats globales
  const totalPdfs = publishedPathologies.filter(p => hasEvidenceData(p.slug)).length * 2;
  const cacheStats = getCacheStats();

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
        <div className="max-w-3xl mb-10">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Téléchargements PDF
          </h1>
          <p className="text-lg text-muted-foreground">
            Je vous ai préparé des fiches pratiques à imprimer, basées sur les dernières preuves scientifiques.
            Chaque pathologie existe en deux versions : une fiche 1 page (essentiel) et un guide complet 4 pages.
          </p>
          
          {/* Stats rapides */}
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{totalPdfs} PDFs disponibles</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
              <Eye className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">Prévisualisation intégrée</span>
            </div>
            {cacheStats.size > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                <Zap className="w-4 h-4 text-accent-foreground" />
                <span className="text-sm font-medium">{cacheStats.size} en cache</span>
              </div>
            )}
          </div>
        </div>

        {/* Info temps de génération */}
        <div className="mb-8 p-4 bg-muted/30 rounded-xl border border-muted">
          <div className="flex items-start gap-4">
            <Clock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-sm text-foreground mb-2">Temps de génération estimés</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Fiche 1 page : <strong className="text-foreground">{estimatedTimes['1page'].first}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span>Guide 4 pages : <strong className="text-foreground">{estimatedTimes['4pages'].first}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-secondary" />
                  <span>Depuis cache : <strong className="text-secondary">{estimatedTimes['1page'].cached}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Filtrer par catégorie :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <Button
                key={filter.value}
                variant={selectedCategory === filter.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(filter.value)}
                className="rounded-full"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* PDF Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPathologies.map((pathology) => {
            const hasEvidence = hasEvidenceData(pathology.slug);
            
            return (
              <Card key={pathology.id} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge 
                        variant="outline" 
                        className={`mb-2 ${categoryColors[pathology.category]}`}
                      >
                        {categoryLabels[pathology.category]}
                      </Badge>
                      <CardTitle className="text-xl font-serif group-hover:text-primary transition-colors">
                        {pathology.title}
                      </CardTitle>
                    </div>
                    {hasEvidence && (
                      <Badge variant="secondary" className="shrink-0 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Evidence
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {pathology.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hasEvidence ? (
                    <>
                      {/* Infos PDF */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2 bg-muted/50 rounded-lg text-center">
                          <FileText className="w-4 h-4 mx-auto mb-1 text-primary" />
                          <span className="text-muted-foreground">1 page</span>
                          <p className="font-mono text-primary">{estimatedTimes['1page'].first}</p>
                        </div>
                        <div className="p-2 bg-primary/5 rounded-lg text-center border border-primary/10">
                          <Book className="w-4 h-4 mx-auto mb-1 text-primary" />
                          <span className="text-muted-foreground">4 pages</span>
                          <p className="font-mono text-primary">{estimatedTimes['4pages'].first}</p>
                        </div>
                      </div>

                      {/* Boutons avec prévisualisation */}
                      <PdfDownloadButtons 
                        slug={pathology.slug} 
                        variant="default"
                        showPreview={true}
                      />
                    </>
                  ) : (
                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground italic">
                        PDFs evidence-based bientôt disponibles
                      </p>
                    </div>
                  )}

                  {/* Link to online page */}
                  <Link 
                    to={`/pathologies/${pathology.slug}`}
                    className="block text-center text-sm text-primary hover:underline"
                  >
                    Voir la version en ligne →
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredPathologies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Aucune pathologie dans cette catégorie pour le moment.
            </p>
          </div>
        )}

        {/* Print tips */}
        <div className="mt-12 p-6 bg-muted/50 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-lg shrink-0">
              <Printer className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Conseils d'impression</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Imprimez en <strong>format A4</strong> pour une lisibilité optimale</li>
                <li>• Gardez les couleurs pour les repères visuels (ou imprimez en noir et blanc)</li>
                <li>• Vous pouvez cocher les cases directement sur la fiche imprimée</li>
                <li>• Affichez la fiche 1 page sur votre réfrigérateur pour ne rien oublier</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cache performance info */}
        <div className="mt-8 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-secondary shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Système de cache intelligent</p>
              <p className="text-xs text-muted-foreground">
                Les PDFs sont mis en cache pendant 30 minutes. La 2ème ouverture est quasi instantanée !
              </p>
            </div>
          </div>
        </div>

        {/* Admin Export Button (discret) */}
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
            {/* Export JSON */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium text-sm">Exporter le contenu</p>
                <p className="text-xs text-muted-foreground">
                  Télécharge tout le contenu en JSON (pour audio, podcast, social...)
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

            {/* Cache stats */}
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

        {/* Reminder */}
        <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Rappel :</strong> Ces fiches sont des outils éducatifs. Elles ne remplacent pas 
            un avis médical. Si vos symptômes persistent, consultez un professionnel de santé.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Telechargements;
