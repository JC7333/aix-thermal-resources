// ============================================
// VIDEO LIBRARY — Chargement et gestion des vidéos YouTube validées
// ============================================

export interface VideoData {
  rang: number;
  titre: string;
  chaine: string;
  url: string;
  duree: string;
  langue: string;
  annee: number;
  score_final: string;
  justification_selection: string;
  phrase_affichage: string;
  points_forts: string[];
  cible: string;
  materiel: string;
  note?: string;
  securite_enfant?: string;
}

export interface VideoTheme {
  theme_id: string;
  theme_nom: string;
  guideline_reference: string;
  videos_selectionnees: VideoData[];
}

export interface VideoLibrary {
  metadata: {
    version: string;
    date_validation: string;
    validator: string;
    criteres_selection: string[];
  };
  themes: VideoTheme[];
  references_guidelines: Array<{
    pathologie: string;
    guideline: string;
    url: string;
    point_cle: string;
  }>;
  notes_importantes: string[];
}

// Cache pour éviter de refetch
let cachedLibrary: VideoLibrary | null = null;
let fetchPromise: Promise<VideoLibrary> | null = null;

/**
 * Charge la bibliothèque de vidéos (avec cache)
 */
export async function loadVideoLibrary(): Promise<VideoLibrary> {
  // Retourner le cache si disponible
  if (cachedLibrary) {
    return cachedLibrary;
  }
  
  // Retourner la promesse en cours si déjà en train de fetcher
  if (fetchPromise) {
    return fetchPromise;
  }
  
  // Créer la promesse de fetch
  fetchPromise = (async () => {
    try {
      const base = import.meta.env.BASE_URL ?? '/';
      const url = `${base}data/video_library_validated.json`;
      
      console.log('[VideoLibrary] Fetching from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Extraire la structure correcte
      const library: VideoLibrary = data.video_library || {
        metadata: { version: '1.0', date_validation: '', validator: '', criteres_selection: [] },
        themes: [],
        references_guidelines: [],
        notes_importantes: []
      };
      
      console.log('[VideoLibrary] Loaded successfully:', library.themes.length, 'themes');
      
      cachedLibrary = library;
      return library;
    } catch (error) {
      console.error('[VideoLibrary] Failed to load:', error);
      // Retourner une structure vide en cas d'erreur
      return {
        metadata: { version: '0.0', date_validation: '', validator: '', criteres_selection: [] },
        themes: [],
        references_guidelines: [],
        notes_importantes: []
      };
    } finally {
      fetchPromise = null;
    }
  })();
  
  return fetchPromise;
}

/**
 * Obtenir tous les thèmes disponibles
 */
export async function getThemes(): Promise<VideoTheme[]> {
  const library = await loadVideoLibrary();
  return library.themes;
}

/**
 * Obtenir les vidéos pour un theme_id donné
 */
export async function getVideosByThemeId(themeId: string): Promise<VideoData[]> {
  const library = await loadVideoLibrary();
  const theme = library.themes.find(t => t.theme_id === themeId);
  return theme?.videos_selectionnees || [];
}

/**
 * Obtenir un thème complet par son ID
 */
export async function getThemeById(themeId: string): Promise<VideoTheme | undefined> {
  const library = await loadVideoLibrary();
  return library.themes.find(t => t.theme_id === themeId);
}

/**
 * Extraire l'ID YouTube d'une URL
 * Supporte: youtu.be, watch?v=, shorts, embed
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  
  // Format: youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  
  // Format: youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  
  // Format: youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  
  // Format: youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];
  
  // Format: youtube-nocookie.com/embed/VIDEO_ID
  const nocookieMatch = url.match(/youtube-nocookie\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (nocookieMatch) return nocookieMatch[1];
  
  return null;
}

/**
 * Générer l'URL d'embed YouTube (version no-cookie pour RGPD)
 */
export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

/**
 * Générer l'URL de la vignette YouTube
 */
export function getYouTubeThumbnailUrl(videoId: string, quality: 'default' | 'mq' | 'hq' | 'sd' | 'maxres' = 'hq'): string {
  const qualityMap = {
    default: 'default',
    mq: 'mqdefault',
    hq: 'hqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault'
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Vider le cache (utile pour debug)
 */
export function clearVideoLibraryCache(): void {
  cachedLibrary = null;
  fetchPromise = null;
  console.log('[VideoLibrary] Cache cleared');
}
