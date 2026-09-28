import React, { useEffect } from 'react';
import { ArtistProfile } from '../types';
import { X, MapPin, Users, Music, ArrowLeft, ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/audioPlayer';

interface ArtistModalProps {
  artist: ArtistProfile | null;
  onClose: () => void;
  dataSaver: boolean;
}

export const ArtistModal: React.FC<ArtistModalProps> = ({ artist, onClose, dataSaver }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (artist) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [artist, onClose]);

  if (!artist) return null;

  const handlePlayArtistTrack = () => {
    const genreBeatMap: Record<string, 'marrabenta' | 'pandza' | 'kizomba' | 'afrohouse'> = {
      'Marrabenta': 'marrabenta',
      'Pandza': 'pandza',
      'Kizomba': 'kizomba',
      'Afro-Pop': 'pandza',
      'Hip-Hop MZ': 'pandza',
      'Afro-House': 'afrohouse'
    };
    const beat = genreBeatMap[artist.genres[0]] || 'marrabenta';
    audioEngine.playPreview(artist.id, beat);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#12151b] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-[#161a22]">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar aos Artistas</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-700">
              <img
                src={artist.avatarUrl}
                alt={artist.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover ${dataSaver ? 'filter brightness-95' : ''}`}
              />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs text-red-500 font-semibold">
                <span>{artist.genres.join(' · ')}</span>
              </div>

              <h2 className="text-2xl font-bold text-white font-serif-display">
                {artist.name}
              </h2>

              <p className="text-sm text-zinc-300 italic">
                "{artist.artisticName}"
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  {artist.originCity} ({artist.province})
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                  {artist.followers}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="border-t border-zinc-800/80 pt-4">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-zinc-400 mb-2">
              Sobre o Artista
            </h4>
            <p className="text-sm text-zinc-200 leading-relaxed">
              {artist.bio}
            </p>
          </div>

          {/* Featured Song action */}
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-red-500 font-bold block">
                Sucesso em Destaque
              </span>
              <span className="text-sm font-semibold text-white">
                {artist.popularTrack}
              </span>
            </div>

            <button
              onClick={handlePlayArtistTrack}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Ouvir Ritmo</span>
            </button>
          </div>

          {/* Mozambican note */}
          <div className="text-xs text-zinc-400 text-center border-t border-zinc-800/80 pt-4">
            Apoie os artistas moçambicanos ouvindo as suas faixas nas plataformas oficiais e comparecendo aos concertos ao vivo.
          </div>
        </div>
      </div>
    </div>
  );
};
