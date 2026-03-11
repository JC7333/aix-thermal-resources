import React, { useState, useRef } from 'react';
import { logEvent } from '@/services/analytics';
import type { PodcastEpisode } from '@/data/podcastData';

interface PodcastPlayerProps {
  pathologyName: string;
  episodes: PodcastEpisode[];
}

const SingleEpisodePlayer: React.FC<{ episode: PodcastEpisode; isMain?: boolean }> = ({ episode, isMain }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const available = !!episode.audioUrl;

  const togglePlay = () => {
    if (!audioRef.current || !available) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
      logEvent('podcast_play', undefined, {
        slug: episode.id,
        title: episode.title,
        type: episode.type,
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(pct);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !available) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    logEvent('podcast_complete', undefined, {
      slug: episode.id,
      title: episode.title,
      type: episode.type,
    });
  };

  return (
    <div className={`flex items-start gap-3 ${isMain ? '' : 'py-3'}`}>
      <button
        onClick={togglePlay}
        disabled={!available}
        className={`flex-shrink-0 rounded-full flex items-center justify-center text-white
          ${isMain ? 'w-14 h-14 text-xl' : 'w-10 h-10 text-base'}
          ${available ? 'bg-primary hover:bg-primary/90 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
        aria-label={isPlaying ? 'Pause' : 'Écouter'}
      >
        {isPlaying ? '||' : '▶'}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {episode.type === 'essential' && (
            <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded-full uppercase">
              Essentiel
            </span>
          )}
          {episode.type === 'bonus' && (
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase">
              Bonus
            </span>
          )}
          <span className="text-xs text-gray-400">{episode.duration}</span>
        </div>
        <p className={`font-bold text-gray-900 leading-tight mt-1 ${isMain ? 'text-base' : 'text-sm'}`}>
          {episode.title}
        </p>
        {isMain && (
          <p className="text-sm text-gray-500 mt-0.5">
            Avec {episode.expertName}, {episode.expertTitle}
          </p>
        )}
        {isMain && !available && (
          <p className="mt-2 text-sm text-amber-600 font-medium bg-amber-50 rounded-lg px-3 py-2 inline-block">
            Bientôt disponible
          </p>
        )}
        {available && (
          <>
            <div
              className="mt-2 h-1.5 bg-gray-200 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <audio
              ref={audioRef}
              src={episode.audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
              preload="metadata"
            />
          </>
        )}
        {!isMain && !available && (
          <p className="text-xs text-gray-400 italic mt-1">Bientôt disponible</p>
        )}
      </div>
    </div>
  );
};

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({ pathologyName, episodes }) => {
  const [showBonus, setShowBonus] = useState(false);

  const essential = episodes.find(e => e.type === 'essential');
  const bonusEpisodes = episodes.filter(e => e.type === 'bonus');

  if (!essential) return null;

  return (
    <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 sm:p-6">
      {/* Header */}
      <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-3">
        Podcast Coolance — {pathologyName}
      </p>

      {/* Main / Essential episode */}
      <SingleEpisodePlayer episode={essential} isMain />

      {/* Bonus episodes toggle */}
      {bonusEpisodes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-primary/10">
          <button
            onClick={() => setShowBonus(!showBonus)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-full"
          >
            <span className="text-base">{showBonus ? '▼' : '▶'}</span>
            {bonusEpisodes.length} épisodes pour aller plus loin
          </button>

          {showBonus && (
            <div className="mt-3 space-y-1 divide-y divide-gray-100">
              {bonusEpisodes.map((ep) => (
                <SingleEpisodePlayer key={ep.id} episode={ep} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-gray-400 mt-4 leading-relaxed">
        Voix générée par intelligence artificielle. Contenu validé par le Dr Audric Bugnard, médecin thermaliste.
        Ne remplace pas une consultation médicale.
      </p>
    </div>
  );
};

export default PodcastPlayer;
