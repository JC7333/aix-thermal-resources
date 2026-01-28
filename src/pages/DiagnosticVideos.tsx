// ============================================
// DIAGNOSTIC VIDEOS — Page cachée pour vérifier le chargement JSON
// Accessible uniquement via URL directe: /diagnostic/videos
// ============================================

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Play, RefreshCw, Video, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  loadVideoLibrary, 
  getThemes, 
  extractYouTubeId, 
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  clearVideoLibraryCache,
  type VideoLibrary,
  type VideoTheme 
} from '@/lib/videoLibrary';
import { getAvailableThemeIds, getSlugsWithVideos } from '@/lib/videoThemeMap';

const DiagnosticVideos = () => {
  const [library, setLibrary] = useState<VideoLibrary | null>(null);
  const [themes, setThemes] = useState<VideoTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchUrl, setFetchUrl] = useState<string>('');
  const [testVideoId, setTestVideoId] = useState<string | null>(null);
  const [showEmbed, setShowEmbed] = useState(false);
  
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const base = import.meta.env.BASE_URL ?? '/';
      const url = `${base}data/video_library_validated.json`;
      setFetchUrl(url);
      
      const lib = await loadVideoLibrary();
      setLibrary(lib);
      
      const themeList = await getThemes();
      setThemes(themeList);
      
      // Get first video ID for test
      if (themeList.length > 0 && themeList[0].videos_selectionnees.length > 0) {
        const firstVideo = themeList[0].videos_selectionnees[0];
        const id = extractYouTubeId(firstVideo.url);
        setTestVideoId(id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  const handleRefresh = () => {
    clearVideoLibraryCache();
    loadData();
  };
  
  const handleTestEmbed = () => {
    setShowEmbed(true);
  };
  
  const isSuccess = library && themes.length > 0;
  const mappedThemeIds = getAvailableThemeIds();
  const slugsWithVideos = getSlugsWithVideos();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Video className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Diagnostic Vidéos</h1>
          <Badge variant="outline">Page cachée</Badge>
        </div>
        
        {/* Status */}
        <div className={`rounded-xl p-6 mb-6 ${isSuccess ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            {isSuccess ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <div>
              <h2 className="text-xl font-semibold">
                Statut: {loading ? 'Chargement...' : isSuccess ? 'OK ✓' : 'ERREUR ✗'}
              </h2>
              <p className="text-muted-foreground">
                URL: <code className="bg-muted px-2 py-0.5 rounded text-sm">{fetchUrl}</code>
              </p>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-100 text-red-800 rounded-lg p-4 mt-4">
              <strong>Erreur:</strong> {error}
            </div>
          )}
          
          <Button onClick={handleRefresh} variant="outline" className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rafraîchir (vider cache)
          </Button>
        </div>
        
        {/* Metadata */}
        {library && (
          <div className="bg-card border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Métadonnées</h3>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Version</dt>
                <dd className="font-mono">{library.metadata.version}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Date validation</dt>
                <dd className="font-mono">{library.metadata.date_validation}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Validateur</dt>
                <dd>{library.metadata.validator}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Nombre de thèmes</dt>
                <dd className="font-mono font-bold text-primary">{themes.length}</dd>
              </div>
            </dl>
          </div>
        )}
        
        {/* Themes */}
        <div className="bg-card border rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Thèmes trouvés</h3>
          
          {themes.length === 0 ? (
            <p className="text-muted-foreground">Aucun thème trouvé</p>
          ) : (
            <div className="space-y-3">
              {themes.map((theme) => (
                <div key={theme.theme_id} className="flex items-center justify-between bg-muted/50 rounded-lg p-4">
                  <div>
                    <code className="text-primary font-mono text-sm">{theme.theme_id}</code>
                    <p className="text-foreground">{theme.theme_nom}</p>
                  </div>
                  <Badge variant="secondary" className="text-lg">
                    {theme.videos_selectionnees.length} vidéo(s)
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Mapping */}
        <div className="bg-card border rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Mapping slug → theme_id</h3>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Theme IDs mappés:</h4>
            <div className="flex flex-wrap gap-2">
              {mappedThemeIds.map(id => (
                <Badge key={id} className="bg-green-100 text-green-700">{id}</Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Slugs avec vidéos ({slugsWithVideos.length}):</h4>
            <div className="flex flex-wrap gap-2">
              {slugsWithVideos.map(slug => (
                <Badge key={slug} variant="outline">{slug}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Test Embed */}
        {testVideoId && (
          <div className="bg-card border rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Test Embed YouTube</h3>
            <p className="text-muted-foreground mb-4">
              Video ID: <code className="bg-muted px-2 py-0.5 rounded">{testVideoId}</code>
            </p>
            
            {!showEmbed ? (
              <div className="space-y-4">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden max-w-md">
                  <img 
                    src={getYouTubeThumbnailUrl(testVideoId, 'hq')} 
                    alt="Thumbnail test"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button onClick={handleTestEmbed}>
                  <Play className="w-4 h-4 mr-2" />
                  Tester l'embed
                </Button>
              </div>
            ) : (
              <div className="aspect-video max-w-md rounded-lg overflow-hidden">
                <iframe
                  src={getYouTubeEmbedUrl(testVideoId)}
                  title="Test embed"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
        
        {/* Quick Links */}
        <div className="bg-card border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Liens rapides pour vérification</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { slug: 'gonarthrose', label: 'Gonarthrose' },
              { slug: 'coxarthrose', label: 'Coxarthrose' },
              { slug: 'lombalgie-chronique', label: 'Lombalgie' },
              { slug: 'bpco', label: 'BPCO' },
              { slug: 'otites-repetition-enfant', label: 'Otites enfant' },
              { slug: 'insuffisance-veineuse', label: 'Insuff. veineuse' },
            ].map(({ slug, label }) => (
              <a
                key={slug}
                href={`/pathologies/v2/${slug}#videos`}
                className="flex items-center gap-2 bg-muted hover:bg-muted/80 rounded-lg p-3 text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                {label}
              </a>
            ))}
          </div>
        </div>
        
        {/* Console hint */}
        <p className="text-center text-muted-foreground text-sm mt-8">
          💡 Ouvrez la console navigateur (F12) pour voir les logs de chargement
        </p>
      </div>
    </div>
  );
};

export default DiagnosticVideos;
