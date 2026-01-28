// ============================================
// VIDEO SECTION — Affichage des vidéos YouTube validées
// ============================================

import { useState, useEffect } from 'react';
import { Play, ExternalLink, Clock, User, AlertCircle, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  getVideosByThemeId, 
  getThemeById,
  extractYouTubeId, 
  getYouTubeThumbnailUrl, 
  getYouTubeEmbedUrl,
  type VideoData 
} from '@/lib/videoLibrary';
import { getThemeIdForSlug, hasVideosForSlug } from '@/lib/videoThemeMap';
import { useSeniorMode } from '@/hooks/useSeniorMode';

interface VideoCardProps {
  video: VideoData;
  seniorMode: boolean;
}

const VideoCard = ({ video, seniorMode }: VideoCardProps) => {
  const [showEmbed, setShowEmbed] = useState(false);
  const [embedError, setEmbedError] = useState(false);
  
  const videoId = extractYouTubeId(video.url);
  const thumbnailUrl = videoId ? getYouTubeThumbnailUrl(videoId, 'hq') : null;
  const embedUrl = videoId ? getYouTubeEmbedUrl(videoId) : null;
  
  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoId) {
      setShowEmbed(true);
    } else {
      // Fallback: ouvrir dans un nouvel onglet
      window.open(video.url, '_blank', 'noopener,noreferrer');
    }
  };
  
  const handleEmbedError = () => {
    setEmbedError(true);
    setShowEmbed(false);
  };
  
  const handleOpenYouTube = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(video.url, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <div className={`bg-card border border-border rounded-xl overflow-hidden ${seniorMode ? '' : ''}`}>
      {/* Video / Thumbnail */}
      <div className="relative aspect-video bg-muted">
        {showEmbed && embedUrl && !embedError ? (
          <iframe
            src={embedUrl}
            title={video.titre}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleEmbedError}
          />
        ) : (
          <>
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl} 
                alt={video.titre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback si la vignette ne charge pas
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <Video className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
            
            {/* Play button overlay */}
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
              aria-label={`Lire la vidéo: ${video.titre}`}
            >
              <div className={`rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${seniorMode ? 'w-20 h-20' : 'w-16 h-16'}`}>
                <Play className={seniorMode ? 'w-10 h-10 ml-1' : 'w-8 h-8 ml-1'} fill="currentColor" />
              </div>
            </button>
            
            {/* Duration badge */}
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-none">
              <Clock className="w-3 h-3 mr-1" />
              {video.duree}
            </Badge>
          </>
        )}
      </div>
      
      {/* Content */}
      <div className={seniorMode ? 'p-5' : 'p-4'}>
        <h4 className={`font-semibold text-foreground mb-2 line-clamp-2 ${seniorMode ? 'text-lg' : 'text-base'}`}>
          {video.titre}
        </h4>
        
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <User className="w-4 h-4" />
          <span className={seniorMode ? 'text-base' : 'text-sm'}>{video.chaine}</span>
          <span className="text-muted-foreground/50">•</span>
          <span className={seniorMode ? 'text-base' : 'text-sm'}>{video.annee}</span>
        </div>
        
        <p className={`text-muted-foreground mb-4 ${seniorMode ? 'text-base' : 'text-sm'}`}>
          {video.phrase_affichage}
        </p>
        
        {/* Points forts */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {video.points_forts.slice(0, 3).map((point, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {point}
            </Badge>
          ))}
        </div>
        
        {/* Embed error fallback */}
        {embedError && (
          <div className="flex items-center gap-2 text-amber-600 mb-3 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>La lecture intégrée n'est pas disponible</span>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-2">
          {!showEmbed && (
            <Button 
              onClick={handlePlayClick} 
              size={seniorMode ? 'lg' : 'default'}
              className="flex-1"
            >
              <Play className="w-4 h-4 mr-2" />
              Voir la vidéo
            </Button>
          )}
          <Button 
            onClick={handleOpenYouTube} 
            variant="outline"
            size={seniorMode ? 'lg' : 'default'}
            title="Ouvrir sur YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface VideoSectionProps {
  slug: string;
  maxVideos?: number;
  className?: string;
}

export const VideoSection = ({ slug, maxVideos = 2, className = '' }: VideoSectionProps) => {
  const { seniorMode, titleClass, textClass, iconSizeLg } = useSeniorMode();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [themeInfo, setThemeInfo] = useState<{ nom: string; guideline: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const hasVideos = hasVideosForSlug(slug);
  const themeId = getThemeIdForSlug(slug);
  
  useEffect(() => {
    if (!themeId) {
      setLoading(false);
      return;
    }
    
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [videoList, theme] = await Promise.all([
          getVideosByThemeId(themeId),
          getThemeById(themeId)
        ]);
        
        setVideos(videoList.slice(0, maxVideos));
        if (theme) {
          setThemeInfo({
            nom: theme.theme_nom,
            guideline: theme.guideline_reference
          });
        }
      } catch (err) {
        console.error('[VideoSection] Error loading videos:', err);
        setError('Impossible de charger les vidéos');
      } finally {
        setLoading(false);
      }
    };
    
    loadVideos();
  }, [themeId, maxVideos]);
  
  // Si pas de vidéos pour cette pathologie, afficher un message
  if (!hasVideos) {
    return (
      <section id="videos" className={className}>
        <h2 className={`font-serif font-bold text-foreground flex items-center gap-3 ${seniorMode ? 'text-2xl mb-6' : 'text-xl mb-4'}`}>
          <span className={`rounded-lg flex items-center justify-center bg-red-100 text-red-700 ${seniorMode ? 'w-12 h-12' : 'w-10 h-10'}`}>
            <Video className={iconSizeLg} />
          </span>
          Vidéos guidées
        </h2>
        <div className={`bg-muted/30 border border-border rounded-xl ${seniorMode ? 'p-6' : 'p-5'}`}>
          <p className={`text-muted-foreground ${textClass}`}>
            Aucune vidéo validée disponible pour le moment pour ce sujet.
          </p>
          <p className={`text-muted-foreground mt-2 ${seniorMode ? 'text-base' : 'text-sm'}`}>
            Les vidéos sont sélectionnées selon des critères stricts : sources institutionnelles, 
            conformité aux recommandations, et accessibilité.
          </p>
        </div>
      </section>
    );
  }
  
  // Loading state
  if (loading) {
    return (
      <section id="videos" className={className}>
        <h2 className={`font-serif font-bold text-foreground flex items-center gap-3 ${seniorMode ? 'text-2xl mb-6' : 'text-xl mb-4'}`}>
          <span className={`rounded-lg flex items-center justify-center bg-red-100 text-red-700 ${seniorMode ? 'w-12 h-12' : 'w-10 h-10'}`}>
            <Video className={iconSizeLg} />
          </span>
          Vidéos guidées
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted animate-pulse rounded-xl aspect-video" />
          <div className="bg-muted animate-pulse rounded-xl aspect-video" />
        </div>
      </section>
    );
  }
  
  // Error state
  if (error) {
    return (
      <section id="videos" className={className}>
        <h2 className={`font-serif font-bold text-foreground flex items-center gap-3 ${seniorMode ? 'text-2xl mb-6' : 'text-xl mb-4'}`}>
          <span className={`rounded-lg flex items-center justify-center bg-red-100 text-red-700 ${seniorMode ? 'w-12 h-12' : 'w-10 h-10'}`}>
            <Video className={iconSizeLg} />
          </span>
          Vidéos guidées
        </h2>
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive">
          {error}
        </div>
      </section>
    );
  }
  
  // No videos found (but should have them)
  if (videos.length === 0) {
    return null;
  }
  
  return (
    <section id="videos" className={className}>
      <h2 className={`font-serif font-bold text-foreground flex items-center gap-3 ${seniorMode ? 'text-2xl mb-6' : 'text-xl mb-4'}`}>
        <span className={`rounded-lg flex items-center justify-center bg-red-100 text-red-700 ${seniorMode ? 'w-12 h-12' : 'w-10 h-10'}`}>
          <Video className={iconSizeLg} />
        </span>
        Vidéos guidées (sélection validée)
      </h2>
      
      {/* Guideline reference */}
      {themeInfo?.guideline && (
        <p className={`text-muted-foreground mb-4 ${seniorMode ? 'text-base' : 'text-sm'}`}>
          📋 {themeInfo.guideline}
        </p>
      )}
      
      {/* Video cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video, idx) => (
          <VideoCard key={idx} video={video} seniorMode={seniorMode} />
        ))}
      </div>
      
      {/* Security note */}
      <p className={`text-muted-foreground mt-4 ${seniorMode ? 'text-sm' : 'text-xs'}`}>
        ✓ Vidéos sélectionnées selon des critères stricts : sources institutionnelles, conformité aux guidelines, 
        sécurité patients, accessibilité seniors. Score minimum : 8.5/10.
      </p>
    </section>
  );
};

export default VideoSection;
