// ============================================
// DIAGNOSTIC LINKS — Page cachée pour vérifier les liens
// ============================================

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/shared/Breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';
import { libraryResources, quickAnswers } from '@/data/library-resources';
import { getPathologyUrl, isValidPathologySlug } from '@/lib/pathologyRoutes';

interface LinkStatus {
  id: string;
  title: string;
  targetUrl: string;
  pathologySlug?: string;
  status: 'ok' | 'ko' | 'warning';
  reason?: string;
}

const DiagnosticLinks = () => {
  const [results, setResults] = useState<LinkStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ ok: 0, ko: 0, warning: 0 });

  useEffect(() => {
    analyzLinks();
  }, []);

  const analyzLinks = () => {
    setLoading(true);
    const linkStatuses: LinkStatus[] = [];

    // Analyser les ressources de la bibliothèque
    libraryResources.forEach((resource) => {
      let status: 'ok' | 'ko' | 'warning' = 'ok';
      let reason: string | undefined;
      let targetUrl = '';

      if (resource.pathologySlug) {
        // Vérifie si le slug est valide dans V2
        const isValid = isValidPathologySlug(resource.pathologySlug);
        if (isValid) {
          targetUrl = getPathologyUrl(resource.pathologySlug);
          status = 'ok';
        } else {
          targetUrl = getPathologyUrl(resource.pathologySlug);
          status = 'warning';
          reason = `Slug "${resource.pathologySlug}" non trouvé dans la liste V2 valide`;
        }
      } else {
        // Pas de pathologySlug → devrait pointer vers /guides ou autre
        targetUrl = '/guides';
        status = 'warning';
        reason = 'Aucun pathologySlug défini → pointe vers /guides par défaut';
      }

      linkStatuses.push({
        id: resource.id,
        title: resource.title,
        targetUrl,
        pathologySlug: resource.pathologySlug,
        status,
        reason,
      });
    });

    // Analyser les réponses rapides
    quickAnswers.forEach((answer) => {
      let status: 'ok' | 'ko' | 'warning' = 'ok';
      let reason: string | undefined;
      let targetUrl = '';

      if (answer.pathologySlug) {
        const isValid = isValidPathologySlug(answer.pathologySlug);
        if (isValid) {
          targetUrl = getPathologyUrl(answer.pathologySlug);
          status = 'ok';
        } else {
          targetUrl = getPathologyUrl(answer.pathologySlug);
          status = 'warning';
          reason = `Slug "${answer.pathologySlug}" non trouvé dans V2`;
        }
      } else if (answer.link) {
        targetUrl = answer.link;
        status = 'ok';
      } else {
        targetUrl = '/guides';
        status = 'ko';
        reason = 'Ni pathologySlug ni link défini';
      }

      linkStatuses.push({
        id: `quick-${answer.id}`,
        title: `[Quick] ${answer.title}`,
        targetUrl,
        pathologySlug: answer.pathologySlug,
        status,
        reason,
      });
    });

    // Calculer les statistiques
    const ok = linkStatuses.filter((l) => l.status === 'ok').length;
    const ko = linkStatuses.filter((l) => l.status === 'ko').length;
    const warning = linkStatuses.filter((l) => l.status === 'warning').length;

    setSummary({ ok, ko, warning });
    setResults(linkStatuses);
    setLoading(false);
  };

  const getStatusIcon = (status: 'ok' | 'ko' | 'warning') => {
    switch (status) {
      case 'ok':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'ko':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
    }
  };

  const getStatusBadge = (status: 'ok' | 'ko' | 'warning') => {
    switch (status) {
      case 'ok':
        return <Badge className="bg-green-100 text-green-700">OK</Badge>;
      case 'ko':
        return <Badge className="bg-red-100 text-red-700">KO</Badge>;
      case 'warning':
        return <Badge className="bg-amber-100 text-amber-700">Warning</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 lg:py-8">
        <Breadcrumb items={[{ label: 'Diagnostic', href: '/diagnostic/videos' }, { label: 'Liens ressources' }]} />

        <header className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            🔗 Diagnostic des liens (Ressources)
          </h1>
          <p className="text-muted-foreground">
            Vérifie que tous les boutons "Lire" des ressources pointent vers des URLs valides.
          </p>
        </header>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-700">{summary.ok}</div>
            <div className="text-sm text-green-600">OK</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-amber-700">{summary.warning}</div>
            <div className="text-sm text-amber-600">Warnings</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-700">{summary.ko}</div>
            <div className="text-sm text-red-600">Erreurs</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-muted-foreground">
            Total: <strong>{results.length}</strong> ressources analysées
          </p>
          <Button variant="outline" size="sm" onClick={analyzLinks} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Relancer
          </Button>
        </div>

        {/* Results table */}
        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Ressource</th>
                <th className="px-4 py-3 text-left font-medium">Slug</th>
                <th className="px-4 py-3 text-left font-medium">URL cible</th>
                <th className="px-4 py-3 text-left font-medium">Raison</th>
                <th className="px-4 py-3 text-left font-medium">Test</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {results.map((result) => (
                <tr key={result.id} className={result.status === 'ko' ? 'bg-red-50' : result.status === 'warning' ? 'bg-amber-50' : ''}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(result.status)}
                      {getStatusBadge(result.status)}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium max-w-xs truncate" title={result.title}>
                    {result.title}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {result.pathologySlug || '—'}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-primary max-w-xs truncate" title={result.targetUrl}>
                    {result.targetUrl}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs">
                    {result.reason || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={result.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Ouvrir
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Valid V2 slugs reference */}
        <div className="mt-8 p-4 bg-muted/50 rounded-xl">
          <h3 className="font-semibold mb-2">Slugs V2 valides (référence)</h3>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {[
              'gonarthrose', 'coxarthrose', 'lombalgie-chronique', 'insuffisance-veineuse',
              'bpco', 'otites-repetition-enfant', 'rhinosinusite-chronique'
            ].map((slug) => (
              <Badge key={slug} variant="outline">{slug}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DiagnosticLinks;
