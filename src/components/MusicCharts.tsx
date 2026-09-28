import React, { useState, useEffect } from 'react';
import { TOP_TRACKS_DATA } from '../data/portalData';
import { SongTrack } from '../types';
import { Play, Pause, Share2, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioPlayer';

interface MusicChartsProps {
  dataSaver: boolean;
  onSelectArtistByName?: (name: string) => void;
}

export const MusicCharts: React.FC<MusicChartsProps> = ({ dataSaver }) => {
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [expandedLyricsId, setExpandedLyricsId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    audioEngine.setListener((trackId, playing) => {
      setCurrentPlayingId(playing ? trackId : null);
    });

    return () => {
      audioEngine.stop();
    };
  }, []);

  const togglePlay = (track: SongTrack) => {
    if (currentPlayingId === track.id) {
      audioEngine.stop();
    } else {
      audioEngine.playPreview(track.id, track.beatType);
    }
  };

  const handleShare = (track: SongTrack) => {
    const text = `Ouve "${track.title}" de ${track.artist} no Vibração em Alta MZ!`;
    const url = window.location.href;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setCopiedId(track.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="musica" className="py-10 bg-[#0d0f14] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Parada Semanal de Moçambique</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-display">
              Músicas Mais Tocadas
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-2 sm:mt-0 font-normal">
            Actualizado hoje · Baseado nas rádios e streamings de Maputo e províncias
          </p>
        </div>

        {/* Music Ranking List */}
        <div className="space-y-3">
          {TOP_TRACKS_DATA.map((track, index) => {
            const isPlaying = currentPlayingId === track.id;
            const isLyricsOpen = expandedLyricsId === track.id;

            return (
              <div
                key={track.id}
                className={`rounded-xl border transition-all duration-150 ${
                  isPlaying
                    ? 'bg-zinc-800/95 border-zinc-600 shadow-md'
                    : 'bg-zinc-900/60 hover:bg-zinc-900 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div className="p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4">
                  
                  {/* Position number & Play control */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <span className="text-lg sm:text-xl font-bold font-mono tabular-nums text-zinc-500 w-6 text-center">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <button
                      onClick={() => togglePlay(track)}
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shrink-0 ${
                        isPlaying
                          ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                          : 'bg-zinc-800 text-zinc-200 hover:bg-white hover:text-zinc-950'
                      }`}
                      aria-label={isPlaying ? `Pausar ${track.title}` : `Tocar ${track.title}`}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Track and Artist Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                        {track.title}
                      </h3>
                      {isPlaying && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 bg-red-950/40 px-1.5 py-0.5 rounded border border-red-800/60 shrink-0">
                          A tocar
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                      <span className="font-medium text-zinc-300 truncate">{track.artist}</span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span className="text-zinc-400 shrink-0">{track.genre}</span>
                      <span aria-hidden="true" className="text-zinc-600 hidden sm:inline">·</span>
                      <span className="hidden sm:inline tabular-nums text-zinc-500">{track.duration}</span>
                    </div>
                  </div>

                  {/* Streams & Actions */}
                  <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="block text-xs font-semibold text-zinc-200 tabular-nums">
                        {track.streams}
                      </span>
                      <span className="text-[11px] text-zinc-500">{track.releaseDate}</span>
                    </div>

                    {/* Toggle lyrics snippet */}
                    <button
                      onClick={() => setExpandedLyricsId(isLyricsOpen ? null : track.id)}
                      className="px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 rounded border border-zinc-700/60 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {isLyricsOpen ? 'Ocultar' : 'Letra'}
                    </button>

                    {/* Share on WhatsApp */}
                    <button
                      onClick={() => handleShare(track)}
                      className="p-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                      title="Partilhar no WhatsApp"
                      aria-label="Partilhar"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                {/* Lyrics Snippet Drawer */}
                {isLyricsOpen && (
                  <div className="px-4 py-3 bg-zinc-950/60 border-t border-zinc-800 text-xs sm:text-sm text-zinc-300 rounded-b-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <p className="italic text-zinc-300">
                      "{track.lyricsSnippet}"
                    </p>
                    <span className="text-[11px] text-zinc-400 font-mono shrink-0">
                      Ritmo {track.genre} · Produzido em Moçambique
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Informative Note for speed & data optimization */}
        <div className="mt-4 p-3 bg-zinc-900/40 rounded-lg border border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
          <p>
            💡 <strong className="text-zinc-300">Ouvinte MZ:</strong> O reprodutor utiliza síntese de áudio imediata para poupar 100% dos seus megabytes móveis!
          </p>
          <span className="text-zinc-500 hidden sm:inline font-mono">0 KB consumidos</span>
        </div>

      </div>
    </section>
  );
};
