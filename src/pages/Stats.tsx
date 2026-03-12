import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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

// PRO data types and reader
interface ProResponse {
  slug: string;
  timestamp: number;
  painScore: number;
  functionScore: number;
  helpfulness: 'yes' | 'somewhat' | 'no';
}

const getProResponses = (): ProResponse[] => {
  try {
    const stored = localStorage.getItem('coolance_pro_responses');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

interface ProStats {
  totalResponses: number;
  avgPainScore: number;
  avgFunctionScore: number;
  helpfulnessBreakdown: { yes: number; somewhat: number; no: number };
  byPathology: { slug: string; count: number; avgPain: number; avgFunction: number }[];
  last30Days: ProResponse[];
}

interface SupabaseProRow {
  slug: string;
  pain_score: number;
  function_score: number;
  helpfulness: 'yes' | 'somewhat' | 'no';
  created_at: string;
}

const fetchSupabaseProStats = async (): Promise<ProStats | null> => {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('pro_responses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5000);

    if (error || !data) return null;

    const total = data.length;
    if (total === 0) return null;

    const avgPain = data.reduce((s: number, r: SupabaseProRow) => s + r.pain_score, 0) / total;
    const avgFunction = data.reduce((s: number, r: SupabaseProRow) => s + r.function_score, 0) / total;

    const helpfulness = { yes: 0, somewhat: 0, no: 0 };
    data.forEach((r: SupabaseProRow) => { helpfulness[r.helpfulness as keyof typeof helpfulness]++; });

    const bySlug: Record<string, SupabaseProRow[]> = {};
    data.forEach((r: SupabaseProRow) => {
      if (!bySlug[r.slug]) bySlug[r.slug] = [];
      bySlug[r.slug].push(r);
    });
    const byPathology = Object.entries(bySlug).map(([slug, resps]) => ({
      slug,
      count: resps.length,
      avgPain: resps.reduce((s: number, r: SupabaseProRow) => s + r.pain_score, 0) / resps.length,
      avgFunction: resps.reduce((s: number, r: SupabaseProRow) => s + r.function_score, 0) / resps.length,
    })).sort((a, b) => b.count - a.count);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const last30 = data.filter((r: SupabaseProRow) => r.created_at >= thirtyDaysAgo);

    return {
      totalResponses: total,
      avgPainScore: avgPain,
      avgFunctionScore: avgFunction,
      helpfulnessBreakdown: helpfulness,
      byPathology,
      last30Days: last30.map((r: SupabaseProRow) => ({
        slug: r.slug,
        timestamp: new Date(r.created_at).getTime(),
        painScore: r.pain_score,
        functionScore: r.function_score,
        helpfulness: r.helpfulness,
      })),
    };
  } catch {
    return null;
  }
};

const calculateProStats = (): ProStats => {
  const responses = getProResponses();
  const total = responses.length;

  if (total === 0) {
    return {
      totalResponses: 0,
      avgPainScore: 0,
      avgFunctionScore: 0,
      helpfulnessBreakdown: { yes: 0, somewhat: 0, no: 0 },
      byPathology: [],
      last30Days: [],
    };
  }

  const avgPain = responses.reduce((sum, r) => sum + r.painScore, 0) / total;
  const avgFunction = responses.reduce((sum, r) => sum + r.functionScore, 0) / total;

  const helpfulness = { yes: 0, somewhat: 0, no: 0 };
  responses.forEach(r => { helpfulness[r.helpfulness]++; });

  // Group by pathology
  const bySlug: Record<string, ProResponse[]> = {};
  responses.forEach(r => {
    if (!bySlug[r.slug]) bySlug[r.slug] = [];
    bySlug[r.slug].push(r);
  });
  const byPathology = Object.entries(bySlug).map(([slug, resps]) => ({
    slug,
    count: resps.length,
    avgPain: resps.reduce((s, r) => s + r.painScore, 0) / resps.length,
    avgFunction: resps.reduce((s, r) => s + r.functionScore, 0) / resps.length,
  })).sort((a, b) => b.count - a.count);

  // Last 30 days
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const last30Days = responses.filter(r => r.timestamp >= thirtyDaysAgo);

  return { totalResponses: total, avgPainScore: avgPain, avgFunctionScore: avgFunction, helpfulnessBreakdown: helpfulness, byPathology, last30Days };
};

const Stats = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [proStats, setProStats] = useState<ProStats | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const refreshStats = async () => {
    setStats(calculateStats());

    // Tenter Supabase pour les PRO
    const supabasePro = await fetchSupabaseProStats();
    if (supabasePro) {
      setProStats(supabasePro);
    } else {
      setProStats(calculateProStats());
    }
  };

  useEffect(() => {
    void refreshStats();
  }, []);

  const getDateString = () => new Date().toISOString().split('T')[0];

  const handleExport = () => {
    const analyticsJson = exportAnalyticsJson();
    const proResponses = getProResponses();
    const proStatsData = calculateProStats();

    const fullExport = {
      ...JSON.parse(analyticsJson),
      proResponses,
      proStats: proStatsData,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(fullExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `etuve_data_${getDateString()}.json`;
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
    a.download = `etuve-stats-agregees-${getDateString()}.csv`;
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
    a.download = `etuve-stats-brutes-${getDateString()}.csv`;
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

        {/* PRO — Patient Reported Outcomes */}
        {proStats && proStats.totalResponses > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Questionnaires patients (PRO)
              </CardTitle>
              <CardDescription>
                {isSupabaseConfigured() ? '🟢 Données centralisées (Supabase)' : '🟡 Données locales uniquement'}{' '}
                — {proStats.totalResponses} réponse{proStats.totalResponses > 1 ? 's' : ''}
                {proStats.last30Days.length > 0 && ` (${proStats.last30Days.length} sur les 30 derniers jours)`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-red-600 font-medium">Douleur moyenne</p>
                  <p className="text-3xl font-bold text-red-700">{proStats.avgPainScore.toFixed(1)}</p>
                  <p className="text-xs text-red-500">sur 10</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-blue-600 font-medium">Fonction moyenne</p>
                  <p className="text-3xl font-bold text-blue-700">{proStats.avgFunctionScore.toFixed(1)}</p>
                  <p className="text-xs text-blue-500">sur 10</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-green-600 font-medium">Contenu utile</p>
                  <p className="text-3xl font-bold text-green-700">
                    {proStats.totalResponses > 0
                      ? Math.round((proStats.helpfulnessBreakdown.yes / proStats.totalResponses) * 100)
                      : 0}%
                  </p>
                  <p className="text-xs text-green-500">repondent "oui"</p>
                </div>
              </div>

              {/* Helpfulness breakdown */}
              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground mb-2">Utilite du contenu</p>
                <div className="flex gap-2 h-8 rounded-full overflow-hidden">
                  {proStats.helpfulnessBreakdown.yes > 0 && (
                    <div
                      className="bg-green-500 flex items-center justify-center text-white text-xs font-bold"
                      style={{ width: `${(proStats.helpfulnessBreakdown.yes / proStats.totalResponses) * 100}%` }}
                    >
                      Oui ({proStats.helpfulnessBreakdown.yes})
                    </div>
                  )}
                  {proStats.helpfulnessBreakdown.somewhat > 0 && (
                    <div
                      className="bg-amber-400 flex items-center justify-center text-white text-xs font-bold"
                      style={{ width: `${(proStats.helpfulnessBreakdown.somewhat / proStats.totalResponses) * 100}%` }}
                    >
                      Un peu ({proStats.helpfulnessBreakdown.somewhat})
                    </div>
                  )}
                  {proStats.helpfulnessBreakdown.no > 0 && (
                    <div
                      className="bg-red-400 flex items-center justify-center text-white text-xs font-bold"
                      style={{ width: `${(proStats.helpfulnessBreakdown.no / proStats.totalResponses) * 100}%` }}
                    >
                      Non ({proStats.helpfulnessBreakdown.no})
                    </div>
                  )}
                </div>
              </div>

              {/* By pathology */}
              {proStats.byPathology.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">Par pathologie</p>
                  <div className="space-y-3">
                    {proStats.byPathology.map((p) => (
                      <div key={p.slug} className="flex items-center justify-between bg-muted rounded-lg p-3">
                        <div>
                          <p className="font-medium text-sm">{p.slug}</p>
                          <p className="text-xs text-muted-foreground">{p.count} reponse{p.count > 1 ? 's' : ''}</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                          <span className="text-red-600">Douleur: {p.avgPain.toFixed(1)}</span>
                          <span className="text-blue-600">Fonction: {p.avgFunction.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* PRO empty state */}
        {proStats && proStats.totalResponses === 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-muted-foreground" />
                Questionnaires patients (PRO)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Aucune reponse PRO pour le moment. Les patients peuvent remplir le questionnaire en bas de chaque page pathologie.
              </p>
            </CardContent>
          </Card>
        )}

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
