import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Book, Filter, Settings, Loader2, Printer } from 'lucide-react';
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
import { downloadPdf1PageBySlug, downloadPdf4PagesBySlug, hasEvidenceData } from '@/services/pdfService';
import { useToast } from '@/hooks/use-toast';

type CategoryFilter = 'all' | ContentCategory;

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'rhumatologie', label: '🦴 Rhumatologie' },
  { value: 'veino-lymphatique', label: '🩸 Veino-lymphatique' },
  { value: 'orl-respiratoire', label: '🫁 ORL & Respiratoire' },
  { value: 'muqueuses-buccales', label: '👄 Muqueuses buccales' },
];

interface PdfDownload {
  slug: string;
  type: '1page' | '4pages';
}

const Telechargements = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [downloading, setDownloading] = useState<PdfDownload | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const { toast } = useToast();

  const publishedPathologies = pathologies.filter(p => p.isPublished);
  const filteredPathologies = selectedCategory === 'all' 
    ? publishedPathologies 
    : publishedPathologies.filter(p => p.category === selectedCategory);

  const handleDownload1Page = async (pathology: PathologyContent) => {
    if (!hasEvidenceData(pathology.slug)) {
      toast({
        title: "PDF non disponible",
        description: "Les données evidence-based ne sont pas encore disponibles pour cette pathologie.",
        variant: "destructive",
      });
      return;
    }

    setDownloading({ slug: pathology.slug, type: '1page' });
    try {
      await downloadPdf1PageBySlug(pathology.slug);
      toast({
        title: "Téléchargement réussi",
        description: "Votre fiche PDF 1 page a été téléchargée.",
      });
    } catch (error) {
      console.error('Erreur téléchargement PDF:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
    }
  };

  const handleDownload4Pages = async (pathology: PathologyContent) => {
    if (!hasEvidenceData(pathology.slug)) {
      toast({
        title: "PDF non disponible",
        description: "Les données evidence-based ne sont pas encore disponibles pour cette pathologie.",
        variant: "destructive",
      });
      return;
    }

    setDownloading({ slug: pathology.slug, type: '4pages' });
    try {
      await downloadPdf4PagesBySlug(pathology.slug);
      toast({
        title: "Téléchargement réussi",
        description: "Votre guide PDF 4 pages a été téléchargé.",
      });
    } catch (error) {
      console.error('Erreur téléchargement PDF:', error);
      toast({
        title: "Erreur de téléchargement",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setDownloading(null);
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
          <p className="text-base text-muted-foreground mt-3">
            <strong>Police large et lisible</strong> — optimisé pour l'impression A4.
          </p>
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
              <Card key={pathology.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge 
                        variant="outline" 
                        className={`mb-2 ${categoryColors[pathology.category]}`}
                      >
                        {categoryLabels[pathology.category]}
                      </Badge>
                      <CardTitle className="text-xl font-serif">{pathology.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {pathology.shortDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* 1-page PDF */}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Fiche 1 page</p>
                        <p className="text-xs text-muted-foreground">
                          Recommandations + Red flags + Sources
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleDownload1Page(pathology)}
                      disabled={downloading?.slug === pathology.slug && downloading?.type === '1page'}
                    >
                      {downloading?.slug === pathology.slug && downloading?.type === '1page' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Génération...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Télécharger PDF 1 page
                        </>
                      )}
                    </Button>
                  </div>

                  {/* 4-pages PDF */}
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Book className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">Guide complet 4 pages</p>
                        <p className="text-xs text-muted-foreground">
                          Visuels + Plan d'action + Sources complètes
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => handleDownload4Pages(pathology)}
                      disabled={downloading?.slug === pathology.slug && downloading?.type === '4pages'}
                    >
                      {downloading?.slug === pathology.slug && downloading?.type === '4pages' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Génération...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Télécharger PDF 4 pages
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Evidence badge or warning */}
                  {!hasEvidence && (
                    <p className="text-xs text-muted-foreground text-center italic">
                      PDF basé sur evidence-pack bientôt disponible
                    </p>
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
          <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-dashed border-muted-foreground/20">
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
