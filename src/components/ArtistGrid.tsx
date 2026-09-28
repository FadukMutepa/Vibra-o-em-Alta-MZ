import React, { useState } from 'react';
import { ARTISTS_DATA } from '../data/portalData';
import { ArtistProfile } from '../types';
import { MapPin, Users, Music } from 'lucide-react';

interface ArtistGridProps {
  dataSaver: boolean;
  onSelectArtist: (artist: ArtistProfile) => void;
}

export const ArtistGrid: React.FC<ArtistGridProps> = ({ dataSaver, onSelectArtist }) => {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="artistas" className="py-10 bg-[#0d0f14] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
              Figuras da Nossa Música
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-display">
              Artistas em Destaque
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-2 sm:mt-0 font-normal">
            Os nomes que estão a levar o nome de Moçambique além-fronteiras
          </p>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARTISTS_DATA.map((artist) => {
            const hasError = imageErrors[artist.id];

            return (
              <div
                key={artist.id}
                onClick={() => onSelectArtist(artist)}
                className="group cursor-pointer rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Artist Image / Avatar */}
                  <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative">
                    {!hasError ? (
                      <img
                        src={artist.avatarUrl}
                        alt={artist.name}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        onError={() => handleImageError(artist.id)}
                        className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                          dataSaver ? 'filter brightness-95' : ''
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white font-serif-display text-xl font-bold">
                        {artist.name}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-white">
                      <span className="flex items-center gap-1 font-medium bg-black/75 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] border border-white/10">
                        <MapPin className="w-3 h-3 text-zinc-400" />
                        {artist.originCity}
                      </span>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-red-500 font-semibold mb-1">
                      <span>{artist.genres.slice(0, 2).join(' · ')}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-zinc-300 transition-colors font-serif-display">
                      {artist.name}
                    </h3>
                    
                    <p className="text-xs text-zinc-400 italic mb-2.5">
                      "{artist.artisticName}"
                    </p>

                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="p-4 pt-0 mt-2 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5 truncate max-w-[170px]">
                    <Music className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate text-zinc-300 font-medium">{artist.popularTrack}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] tabular-nums text-zinc-500 shrink-0">
                    <Users className="w-3 h-3" />
                    <span>{artist.followers}</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
