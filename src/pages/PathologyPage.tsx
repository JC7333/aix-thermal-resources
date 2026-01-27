import { useParams, Navigate, Link } from 'react-router-dom';
import { Clock, AlertTriangle, Printer, BookOpen, Shield, ExternalLink, Award, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { MedicalDisclaimer } from '@/components/shared/MedicalDisclaimer';
import { PdfDownloadButtons } from '@/components/shared/PdfDownloadButtons';
import { FavoriteButton } from '@/components/shared/FavoriteButton';
import { getEvidenceBySlug, getAllEvidence } from '@/data/evidence';
import { usePdfPreload } from '@/hooks/usePdfPreload';

// Niveau de preuve → badge couleur
const evidenceBadge = (level: string) => {
  if (level.toLowerCase().includes('élevé')) {
    return 'bg-green-100 text-green-700 border-green-200';
  }
  if (level.toLowerCase().includes('modéré')) {
    return 'bg-amber-100 text-amber-700 border-amber-200';
  }
  return 'bg-muted text-muted-foreground border-border';
};

const categoryLabels: Record<string, string> = {
  'rhumatologie': 'Rhumatologie',
  'veino-lymphatique': 'Veino-lymphatique',
  'orl-respiratoire': 'ORL & Respiratoire',
};

const PathologyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Données evidence-based (source unique)
  const evidence = slug ? getEvidenceBySlug(slug) : undefined;
  
  // Préchargement des PDFs en arrière-plan après 2 secondes
  usePdfPreload(slug, { delay: 2000 });

  if (!evidence) {
    return <Navigate to="/pathologies" replace />;
  }

  const handlePrint = () => {
    window.print();
  };

  // Autres pathologies de la même catégorie
  const allEvidence = getAllEvidence();
  const relatedPathologies = allEvidence
    .filter(e => e.category === evidence.category && e.slug !== evidence.slug)
    .slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8 print:py-2 print:px-2">
        <div className="no-print">
          <Breadcrumb
            items={[
              { label: 'Pathologies', href: '/pathologies' },
              { label: categoryLabels[evidence.category] },
              { label: evidence.name },
            ]}
          />
        </div>

        {/* Header */}
        <header className="mb-8 lg:mb-10 print:mb-4">
          <div className="flex flex-wrap items-center gap-3 mb-4 no-print">
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {categoryLabels[evidence.category]}
            </span>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Evidence-based
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {evidence.readingTime} min
            </span>
          </div>

          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">{evidence.icon}</span>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground print:text-2xl">
              {evidence.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-6 no-print">
            <Button onClick={handlePrint} variant="pdf" size="lg">
              <Printer className="w-5 h-5" />
              Imprimer cette fiche
            </Button>
            {slug && (
              <>
                <PdfDownloadButtons slug={slug} />
                <FavoriteButton slug={slug} />
              </>
            )}
          </div>
        </header>

        {/* Print header */}
        <div className="hidden print:block mb-4 pb-2 border-b-2 border-primary">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold text-primary">{evidence.name}</h1>
              <p className="text-xs text-muted-foreground">Dr Audric Bugnard — Médecin thermaliste — Aix-les-Bains</p>
            </div>
            <p className="text-xs text-muted-foreground text-right">Mise à jour : {evidence.lastUpdated}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 print:block print:space-y-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10 print:space-y-4">
            
            {/* Section 1: Résumé 2 minutes */}
            <section id="resume" className="print:break-inside-avoid">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3 print:text-lg print:mb-2">
                <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-lg print:w-6 print:h-6 print:text-sm">
                  ⏱️
                </span>
                En 2 minutes
              </h2>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 print:p-3 print:bg-gray-50">
                <p className="text-foreground leading-relaxed whitespace-pre-line print:text-xs print:leading-tight">
                  {evidence.summary}
                </p>
              </div>
            </section>

            {/* Section 2: Recommandations Evidence-Based */}
            {evidence.recommendations.length > 0 && (
              <section id="recommandations" className="print:break-inside-avoid">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center gap-3 print:text-lg print:mb-2">
                  <span className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-700 text-lg print:w-6 print:h-6 print:text-sm">
                    <Award className="w-5 h-5" />
                  </span>
                  Ce qui aide vraiment (non médicamenteux)
                </h2>
                
                <div className="space-y-3 print:space-y-1">
                  {evidence.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 print:p-2 print:bg-white">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm shrink-0 print:w-5 print:h-5 print:text-xs">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground mb-2 print:text-xs print:mb-1">
                          {rec.text}
                        </p>
                        <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${evidenceBadge(rec.evidence)}`}>
                          {rec.evidence}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 3: Red Flags */}
            {evidence.red_flags.length > 0 && (
              <section id="red-flags" className="print:break-inside-avoid lg:hidden">
                <h2 className="font-serif text-2xl font-bold text-destructive mb-4 flex items-center gap-3 print:text-lg print:mb-2">
                  <span className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive text-lg print:w-6 print:h-6 print:text-sm">
                    <AlertTriangle className="w-5 h-5" />
                  </span>
                  Quand consulter rapidement
                </h2>
                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 print:p-3">
                  <ul className="space-y-2">
                    {evidence.red_flags.map((alert, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-destructive print:text-xs">
                        <span className="font-bold">⚠️</span>
                        {alert}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Ces signes nécessitent un avis médical rapide. En cas d'urgence : 15 / 112.
                  </p>
                </div>
              </section>
            )}

            {/* Section 4: Sources */}
            {evidence.sources.length > 0 && (
              <section id="sources" className="print:break-inside-avoid lg:hidden">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4 flex items-center gap-3 print:text-lg print:mb-2">
                  <span className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-primary text-lg print:w-6 print:h-6 print:text-sm">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  Sources scientifiques
                </h2>
                <div className="bg-muted/50 border border-border rounded-xl p-6 print:p-3">
                  <ul className="space-y-3">
                    {evidence.sources.map((source, index) => (
                      <li key={index} className="text-sm">
                        <div className="font-medium text-foreground">{source.title}</div>
                        <div className="text-xs text-muted-foreground flex items-center justify-between flex-wrap gap-2">
                          <span>{source.org}, {source.year}</span>
                          {source.url && (
                            <a 
                              href={source.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1"
                            >
                              Lire <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Date de mise à jour */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
              <Calendar className="w-4 h-4" />
              <span>Dernière mise à jour : {evidence.lastUpdated}</span>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 print:hidden">
            {/* Red Flags (desktop sidebar) */}
            {evidence.red_flags.length > 0 && (
              <div className="card-medical bg-destructive/5 border-destructive/20 hidden lg:block">
                <h3 className="font-serif text-lg font-bold text-destructive mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Quand consulter rapidement
                </h3>
                <ul className="space-y-2">
                  {evidence.red_flags.map((alert, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-destructive">
                      <span className="font-bold">⚠️</span>
                      {alert}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Ces signes nécessitent un avis médical rapide. En cas d'urgence : 15 / 112.
                </p>
              </div>
            )}

            {/* Sources (desktop sidebar) */}
            {evidence.sources.length > 0 && (
              <div className="card-medical bg-muted/50 hidden lg:block">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Sources scientifiques
                </h3>
                <ul className="space-y-3">
                  {evidence.sources.map((source, index) => (
                    <li key={index} className="text-sm">
                      <div className="font-medium text-foreground">{source.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center justify-between">
                        <span>{source.org}, {source.year}</span>
                        {source.url && (
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            Lire <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Dernière mise à jour : {evidence.lastUpdated}
                </p>
              </div>
            )}

            {/* PDF Download Card */}
            {slug && (
              <PdfDownloadButtons slug={slug} variant="card" />
            )}

            {/* Medical Disclaimer */}
            <MedicalDisclaimer variant="compact" />

            {/* Navigation rapide */}
            <div className="card-medical">
              <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                Sur cette page
              </h3>
              <nav className="space-y-2 text-sm">
                <a href="#resume" className="block text-muted-foreground hover:text-primary transition-colors">
                  → En 2 minutes
                </a>
                <a href="#recommandations" className="block text-muted-foreground hover:text-primary transition-colors">
                  → Ce qui aide vraiment
                </a>
                <a href="#red-flags" className="block text-muted-foreground hover:text-primary transition-colors">
                  → Quand consulter
                </a>
                <a href="#sources" className="block text-muted-foreground hover:text-primary transition-colors">
                  → Sources
                </a>
              </nav>
            </div>

            {/* Autres pathologies */}
            {relatedPathologies.length > 0 && (
              <div className="card-medical">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                  Voir aussi
                </h3>
                <div className="space-y-2">
                  {relatedPathologies.map((related) => (
                    <Link 
                      key={related.slug}
                      to={`/pathologies/${related.slug}`} 
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <span>{related.icon}</span>
                      {related.name}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  ))}
                  <Link 
                    to="/pathologies" 
                    className="block text-sm text-muted-foreground hover:text-primary mt-3 pt-2 border-t border-border"
                  >
                    → Toutes les pathologies
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Print Red Flags */}
        {evidence.red_flags.length > 0 && (
          <div className="hidden print:block mt-4 p-3 border-2 border-destructive rounded bg-destructive/5">
            <h3 className="text-sm font-bold text-destructive mb-2">⚠️ Consultez rapidement si :</h3>
            <ul className="text-xs text-destructive space-y-1">
              {evidence.red_flags.slice(0, 4).map((alert, index) => (
                <li key={index}>• {alert}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Print Sources */}
        {evidence.sources.length > 0 && (
          <div className="hidden print:block mt-3 pt-2 border-t text-xs text-muted-foreground">
            <strong>Sources :</strong> {evidence.sources.map(s => `${s.org} (${s.year})`).join(' • ')}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PathologyPage;