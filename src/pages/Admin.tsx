// ============================================
// PAGE ADMIN — EXPORT CONTENU
// ============================================
// Page non indexée pour exporter la base de données
// ============================================

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Copy, Download, Check, Database, List, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import evidencePack from '@/data/evidence-pack.json';
import { getAllSlugs } from '@/data/evidence';

const Admin = () => {
  const { toast } = useToast();
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedSlugs, setCopiedSlugs] = useState(false);
  const [lastUpdate] = useState('Janvier 2026'); // Placeholder

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(evidencePack, null, 2));
      setCopiedJson(true);
      toast({ title: 'JSON copié !', description: 'Evidence Pack copié dans le presse-papier.' });
      setTimeout(() => setCopiedJson(false), 2000);
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de copier.', variant: 'destructive' });
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(evidencePack, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evidence-pack.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Téléchargement lancé', description: 'evidence-pack.json' });
  };

  const handleCopySlugs = async () => {
    const slugs = getAllSlugs();
    try {
      await navigator.clipboard.writeText(slugs.join('\n'));
      setCopiedSlugs(true);
      toast({ title: 'Slugs copiés !', description: `${slugs.length} slugs copiés.` });
      setTimeout(() => setCopiedSlugs(false), 2000);
    } catch {
      toast({ title: 'Erreur', description: 'Impossible de copier.', variant: 'destructive' });
    }
  };

  const slugs = getAllSlugs();
  const pathologyCount = evidencePack.length;

  return (
    <>
      <Helmet>
        <title>Admin — Export contenu</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-muted/30 py-12 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Admin — Export</h1>
            <p className="text-muted-foreground">
              Page interne pour exporter la base de contenu
            </p>
          </div>

          {/* Stats */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Base de données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Pathologies</span>
                <span className="font-semibold">{pathologyCount}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Slugs disponibles</span>
                <span className="font-semibold">{slugs.length}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Dernière mise à jour
                </span>
                <span className="font-semibold">{lastUpdate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Actions d'export</CardTitle>
              <CardDescription>
                Exporter le contenu pour réutilisation sur d'autres supports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleCopyJson}
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                {copiedJson ? (
                  <Check className="w-5 h-5 text-primary" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
                Copier Evidence Pack JSON
              </Button>

              <Button
                onClick={handleDownloadJson}
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                <Download className="w-5 h-5" />
                Télécharger evidence-pack.json
              </Button>

              <Button
                onClick={handleCopySlugs}
                variant="outline"
                className="w-full justify-start gap-3 h-12"
              >
                {copiedSlugs ? (
                  <Check className="w-5 h-5 text-primary" />
                ) : (
                  <List className="w-5 h-5" />
                )}
                Copier la liste des slugs ({slugs.length})
              </Button>
            </CardContent>
          </Card>

          {/* Slugs preview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <List className="w-5 h-5 text-primary" />
                Slugs disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1 max-h-48 overflow-y-auto">
                {slugs.map((slug) => (
                  <div key={slug} className="text-muted-foreground">
                    {slug}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            Page non indexée • Accès interne uniquement
          </p>
        </div>
      </div>
    </>
  );
};

export default Admin;
