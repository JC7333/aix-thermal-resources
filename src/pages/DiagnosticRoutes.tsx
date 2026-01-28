// ============================================
// DIAGNOSTIC PAGE — Routes Pathologies
// Accessible uniquement via URL /diagnostic/routes
// ============================================

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CheckCircle2, XCircle, ArrowRight, MapPin, ScrollText, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  getPathologyUrl, 
  isValidPathologySlug, 
  getV2Slug,
  SLUG_MIGRATION_MAP 
} from '@/lib/pathologyRoutes';
import { ALL_EVIDENCE_PACKS_V2 } from '@/content/evidence/v2';

const DiagnosticRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [testSlug, setTestSlug] = useState('');
  const [scrollY, setScrollY] = useState(window.scrollY);
  
  const [lastNavigation, setLastNavigation] = useState<{ from: string; to: string; scrollBefore: number; scrollAfter: number } | null>(null);

  // Get all V2 evidence data - use V2 packs as source of truth
  const allEvidence = ALL_EVIDENCE_PACKS_V2.filter(p => p.status === 'complete');
  
  // Track scroll position in real-time
  useEffect(() => {
    const updateScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  // Calculate URL for test slug
  const testUrl = testSlug ? getPathologyUrl(getV2Slug(testSlug)) : '';
  const isTestSlugValid = testSlug ? isValidPathologySlug(getV2Slug(testSlug)) : null;

  // Test navigation with scroll tracking
  const handleTestNavigation = (url: string) => {
    const scrollBefore = window.scrollY;
    setLastNavigation({
      from: location.pathname,
      to: url,
      scrollBefore,
      scrollAfter: -1,
    });

    // Navigate
    navigate(url);

    // Track scroll after navigation (with delay)
    setTimeout(() => {
      setScrollY(window.scrollY);
      setLastNavigation(prev => prev ? { ...prev, scrollAfter: window.scrollY } : null);
    }, 100);
  };

  // All valid slugs (from evidence + migration aliases)
  const allMigrationSlugs = Object.keys(SLUG_MIGRATION_MAP);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">Diagnostic Routes</h1>
          <Badge variant="outline">Non listé</Badge>
        </div>

        <p className="text-muted-foreground mb-6">
          Cette page vérifie les URLs des pathologies et le comportement scroll-to-top.
        </p>

        {/* Current state */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="border rounded-lg p-4 bg-card">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <ScrollText className="w-4 h-4" />
              État actuel
            </h3>
            <div className="space-y-1 text-sm">
              <p><strong>Route:</strong> <code className="bg-muted px-1 rounded">{location.pathname}</code></p>
              <p><strong>Hash:</strong> <code className="bg-muted px-1 rounded">{location.hash || '(none)'}</code></p>
              <p><strong>ScrollY:</strong> <code className="bg-muted px-1 rounded">{scrollY}px</code></p>
            </div>
          </div>

          {lastNavigation && (
            <div className="border rounded-lg p-4 bg-card">
              <h3 className="font-semibold mb-2">Dernière navigation</h3>
              <div className="space-y-1 text-sm">
                <p><strong>De:</strong> {lastNavigation.from}</p>
                <p><strong>Vers:</strong> {lastNavigation.to}</p>
                <p><strong>Scroll avant:</strong> {lastNavigation.scrollBefore}px</p>
                <p>
                  <strong>Scroll après:</strong> {lastNavigation.scrollAfter}px
                  {lastNavigation.scrollAfter === 0 ? (
                    <Badge className="ml-2 bg-green-600">✓ TOP</Badge>
                  ) : lastNavigation.scrollAfter > 0 ? (
                    <Badge variant="destructive" className="ml-2">✗ PAS EN HAUT</Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-2">En cours...</Badge>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Slug tester */}
        <section className="mb-8 border rounded-lg p-4 bg-card">
          <h2 className="text-lg font-semibold mb-4">Testeur de slug</h2>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-1 block">Entrer un slug</label>
              <Input
                value={testSlug}
                onChange={(e) => setTestSlug(e.target.value)}
                placeholder="ex: arthrose, lombalgie, gonarthrose..."
              />
            </div>
            <Button
              onClick={() => handleTestNavigation(testUrl)}
              disabled={!testSlug}
            >
              Naviguer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          {testSlug && (
            <div className="mt-3 text-sm space-y-1">
              <p>
                <strong>Slug V2:</strong> <code className="bg-muted px-1 rounded">{getV2Slug(testSlug)}</code>
                {testSlug !== getV2Slug(testSlug) && (
                  <span className="ml-2 text-yellow-600">(migré depuis {testSlug})</span>
                )}
              </p>
              <p>
                <strong>URL calculée:</strong> <code className="bg-muted px-1 rounded">{testUrl}</code>
              </p>
              <p>
                <strong>Slug valide:</strong>{' '}
                {isTestSlugValid ? (
                  <span className="text-green-600">✓ Oui</span>
                ) : (
                  <span className="text-red-600">✗ Non (non déclaré)</span>
                )}
              </p>
            </div>
          )}
        </section>

        {/* V2 Slugs list */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Slugs V2 existants ({allEvidence.length})
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Ce sont les pathologies réellement documentées dans le système V2.
          </p>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 font-medium">Slug</th>
                  <th className="text-left p-3 font-medium">Nom</th>
                  <th className="text-left p-3 font-medium">Catégorie</th>
                  <th className="text-left p-3 font-medium">URL V2</th>
                  <th className="text-left p-3 font-medium w-24">Test</th>
                </tr>
              </thead>
              <tbody>
                {allEvidence.map((evidence) => (
                  <tr key={evidence.slug} className="border-t">
                    <td className="p-3">
                      <code className="bg-muted px-1 rounded text-sm">{evidence.slug}</code>
                    </td>
                    <td className="p-3">{evidence.title}</td>
                    <td className="p-3">
                      <Badge variant="outline">{evidence.category}</Badge>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground font-mono">
                      {getPathologyUrl(evidence.slug)}
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTestNavigation(getPathologyUrl(evidence.slug))}
                      >
                        Go
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Migration aliases */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Aliases de migration V1 → V2 ({allMigrationSlugs.length})
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Ces anciens slugs V1 sont automatiquement redirigés vers les slugs V2.
          </p>
          <div className="grid gap-2">
            {allMigrationSlugs.map((oldSlug) => {
              const newSlug = SLUG_MIGRATION_MAP[oldSlug];
              const targetValid = isValidPathologySlug(newSlug);
              return (
                <div
                  key={oldSlug}
                  className="flex items-center gap-3 border rounded-lg p-3 bg-card"
                >
                  <code className="bg-muted px-2 py-1 rounded text-sm">{oldSlug}</code>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  <code className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">{newSlug}</code>
                  {targetValid ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Debug info */}
        <section className="border-t pt-6 mt-6 text-sm text-muted-foreground">
          <p><strong>getPathologyUrl(slug):</strong> <code>/pathologies/v2/$&#123;slug&#125;</code></p>
          <p><strong>Source de vérité:</strong> <code>src/lib/pathologyRoutes.ts</code></p>
          <p className="mt-2">
            Cliquer sur "Go" pour tester la navigation + vérifier que scrollY = 0 après navigation.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default DiagnosticRoutes;
