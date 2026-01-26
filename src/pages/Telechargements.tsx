import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Book, Filter, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { pathologies, categoryLabels, categoryColors, Pathology } from '@/data/pathologies';
import { generateOnePage, generateFourPages, downloadPdf } from '@/services/pdfGenerator';

type CategoryFilter = 'all' | 'rhumatologie' | 'veino-lymphatique' | 'orl-respiratoire' | 'muqueuses-buccales';

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Toutes les catégories' },
  { value: 'rhumatologie', label: '🦴 Rhumatologie' },
  { value: 'veino-lymphatique', label: '🩸 Veino-lymphatique' },
  { value: 'orl-respiratoire', label: '🫁 ORL & Respiratoire' },
  { value: 'muqueuses-buccales', label: '👄 Muqueuses buccales' },
];

interface PdfDownload {
  pathology: Pathology;
  type: '1page' | '4pages';
}

const Telechargements = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [downloading, setDownloading] = useState<PdfDownload | null>(null);

  const filteredPathologies = selectedCategory === 'all' 
    ? pathologies 
    : pathologies.filter(p => p.category === selectedCategory);

  const handleDownload1Page = async (pathology: Pathology) => {
    setDownloading({ pathology, type: '1page' });
    
    // Small delay for UX feedback
    setTimeout(() => {
      const doc = generateOnePage(pathology);
      downloadPdf(doc, `COOLANCE_${pathology.slug}_fiche-1-page.pdf`);
      setDownloading(null);
    }, 300);
  };

  const handleDownload4Pages = async (pathology: Pathology) => {
    setDownloading({ pathology, type: '4pages' });
    
    setTimeout(() => {
      const doc = generateFourPages(pathology);
      downloadPdf(doc, `COOLANCE_${pathology.slug}_guide-complet.pdf`);
      setDownloading(null);
    }, 300);
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
            Je vous ai préparé des fiches pratiques à imprimer. Chaque pathologie existe en deux versions :
            une fiche 1 page (checklist rapide) et un guide complet 4 pages (programme détaillé).
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
          {filteredPathologies.map((pathology) => (
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
                    <CardTitle className="text-xl font-serif">{pathology.name}</CardTitle>
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
                        Checklist + Plan du jour + Plan 7 jours
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => handleDownload1Page(pathology)}
                    disabled={downloading?.pathology.id === pathology.id && downloading?.type === '1page'}
                  >
                    {downloading?.pathology.id === pathology.id && downloading?.type === '1page' ? (
                      <>Génération...</>
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
                        Programme 8 semaines + Nutrition + Niveaux 0-3
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => handleDownload4Pages(pathology)}
                    disabled={downloading?.pathology.id === pathology.id && downloading?.type === '4pages'}
                  >
                    {downloading?.pathology.id === pathology.id && downloading?.type === '4pages' ? (
                      <>Génération...</>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Télécharger PDF 4 pages
                      </>
                    )}
                  </Button>
                </div>

                {/* Link to online page */}
                <Link 
                  to={`/pathologies/${pathology.slug}`}
                  className="block text-center text-sm text-primary hover:underline"
                >
                  Voir la version en ligne →
                </Link>
              </CardContent>
            </Card>
          ))}
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

        {/* Reminder */}
        <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-sm text-center text-muted-foreground">
            <strong>Rappel :</strong> Ces fiches sont des outils éducatifs. Elles ne remplacent pas 
            une consultation médicale. Si vous avez un doute, on en parle en consultation.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Telechargements;
