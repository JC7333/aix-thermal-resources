import { useState, useEffect } from 'react';
import { BarChart3, Users, Download, CheckCircle, MousePointer, Trash2, FileJson, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  calculateStats, 
  clearAnalytics, 
  exportAnalyticsJson,
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

  const handleExport = () => {
    const json = exportAnalyticsJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={refreshStats}>
              <RefreshCw className="w-4 h-4" />
              Actualiser
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <FileJson className="w-4 h-4" />
              Exporter JSON
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
                {stats.eventsByType.find(e => e.eventName === 'pdf_download')?.count || 0}
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
              <CardTitle className="text-lg">Top téléchargements</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topDownloads.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune donnée</p>
              ) : (
                <ul className="space-y-2">
                  {stats.topDownloads.map((dl, index) => (
                    <li key={dl.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-secondary/10 text-secondary text-xs flex items-center justify-center font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-sm text-foreground">{dl.name}</span>
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">{dl.count}</span>
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

          {/* Last 7 days */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">7 derniers jours</CardTitle>
            </CardHeader>
            <CardContent>
              {stats.last7Days.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucune donnée</p>
              ) : (
                <ul className="space-y-2">
                  {stats.last7Days.map((day) => (
                    <li key={day.date} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-foreground">{day.date}</span>
                      <span className="text-sm font-semibold text-muted-foreground">{day.count} événements</span>
                    </li>
                  ))}
                </ul>
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
