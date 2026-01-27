import { useState, useEffect } from 'react';
import { BarChart3, Users, Download, CheckCircle, MousePointer, Trash2, FileJson, RefreshCw, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  calculateStats, 
  clearAnalytics, 
  exportAnalyticsJson,
  getStoredEvents,
  type AnalyticsStats 
} from '@/services/analytics';

const Stats = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const refreshStats = () => {
    setStats(calculateStats());
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const getDateString = () => new Date().toISOString().split('T')[0];

  const handleExport = () => {
    const json = exportAnalyticsJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${getDateString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsvAggregated = () => {
    if (!stats) return;
    
    const lines: string[] = [];
    
    // Section: Top Pages
    lines.push('=== TOP PAGES ===');
    lines.push('Rang,Path,Vues');
    stats.topPages.forEach((p, i) => {
      lines.push(`${i + 1},"${p.path}",${p.count}`);
    });
    
    lines.push('');
    
    // Section: Top PDF
    lines.push('=== TOP PDF ===');
    lines.push('Rang,Slug,Type,Téléchargements');
    stats.topDownloads.forEach((d, i) => {
      lines.push(`${i + 1},"${d.name}","${d.type}",${d.count}`);
    });
    
    lines.push('');
    
    // Section: Wizard
    lines.push('=== WIZARD ===');
    lines.push('Métrique,Valeur');
    lines.push(`Démarrages,${stats.wizardStarts}`);
    lines.push(`Complétions,${stats.wizardCompletes}`);
    lines.push(`Taux complétion,${stats.wizardCompletionRate.toFixed(1)}%`);
    
    lines.push('');
    
    // Section: Résumé
    lines.push('=== RÉSUMÉ ===');
    lines.push('Métrique,Valeur');
    lines.push(`Total événements,${stats.totalEvents}`);
    lines.push(`Sessions uniques,${stats.uniqueSessions}`);
    lines.push(`PDF 1 page téléchargés,${stats.pdf1PageDownloads}`);
    lines.push(`PDF 4 pages téléchargés,${stats.pdf4PagesDownloads}`);
    
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coolance-stats-agregees-${getDateString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsvRaw = () => {
    const events = getStoredEvents();
    
    const lines: string[] = [];
    lines.push('eventName,path,slug,timestamp');
    
    events.forEach(e => {
      const timestamp = new Date(e.timestamp).toISOString();
      const slug = e.slug || e.metadata?.slug || '';
      lines.push(`"${e.eventName}","${e.path}","${slug}","${timestamp}"`);
    });
    
    const csv = lines.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coolance-stats-brutes-${getDateString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    clearAnalytics();
    setShowConfirmClear(false);
    refreshStats();
  };

  if (!stats) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Statistiques d'usage
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Données anonymes uniquement — Aucune donnée de santé
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshStats}>
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <FileJson className="w-4 h-4" />
              JSON
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportCsvAggregated}>
              <FileSpreadsheet className="w-4 h-4" />
              CSV agrégé
            </Button>
            <Button variant="outline" size="sm" onClick={handleExportCsvRaw}>
              <FileSpreadsheet className="w-4 h-4" />
              CSV brut
            </Button>
            {!showConfirmClear ? (
              <Button variant="outline" size="sm" onClick={() => setShowConfirmClear(true)}>
                <Trash2 className="w-4 h-4" />
                Effacer
              </Button>
            ) : (
              <Button variant="destructive" size="sm" onClick={handleClear}>
                Confirmer suppression
              </Button>
            )}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <MousePointer className="w-4 h-4" />
                Total événements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stats.totalEvents}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Sessions uniques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">{stats.uniqueSessions}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Taux complétion Wizard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {stats.wizardCompletionRate.toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.wizardCompletes} / {stats.wizardStarts} parcours
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Téléchargements PDF
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-foreground">
                {stats.pdf1PageDownloads + stats.pdf4PagesDownloads}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.pdf1PageDownloads} × 1 page • {stats.pdf4PagesDownloads} × 4 pages
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top pages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top pages visitées</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topPages.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune donnée</p>
              ) : (
                <ul className="space-y-2">
                  {stats.topPages.map((page, index) => (
                    <li key={page.path} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-sm text-foreground font-mono">{page.path}</span>
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">{page.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Top downloads */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top téléchargements PDF</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topDownloads.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune donnée</p>
              ) : (
                <ul className="space-y-2">
                  {stats.topDownloads.map((dl, index) => (
                    <li key={`${dl.name}-${dl.type}`} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-sm text-foreground">{dl.name}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{dl.type}</span>
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">{dl.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Top Quick Answers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top réponses rapides</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topQuickAnswers.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune donnée</p>
              ) : (
                <ul className="space-y-2">
                  {stats.topQuickAnswers.map((qa, index) => (
                    <li key={qa.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-accent/10 text-accent-foreground text-xs flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-sm text-foreground">{qa.title}</span>
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">{qa.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Events by type */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Événements par type</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.eventsByType.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune donnée</p>
              ) : (
                <ul className="space-y-2">
                  {stats.eventsByType.map((event) => (
                    <li key={event.eventName} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-foreground font-mono">{event.eventName}</span>
                      <span className="text-sm font-semibold text-muted-foreground">{event.count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Last 7 days - Bar Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Évolution sur 7 jours</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.last7Days.length === 0 ? (
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Aucune donnée sur les 7 derniers jours</p>
                </div>
              ) : (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.last7Days}
                      margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        className="fill-muted-foreground"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                        className="fill-muted-foreground"
                      />
                      <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))' }}
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-popover border border-border rounded-lg px-3 py-2 shadow-lg">
                                <p className="text-sm font-medium text-foreground">{payload[0].payload.date}</p>
                                <p className="text-sm text-primary font-semibold">{payload[0].value} événements</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar 
                        dataKey="count" 
                        radius={[4, 4, 0, 0]}
                        className="fill-primary"
                      >
                        {stats.last7Days.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`}
                            className="fill-primary hover:fill-primary/80 transition-colors"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Ces statistiques sont stockées localement dans le navigateur. 
            Aucune donnée personnelle ou médicale n'est collectée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
