import React, { useState } from 'react';
import { Article } from '../types';
import { ArrowRight, Volume2, Eye, RotateCw } from 'lucide-react';
import { audioEngine } from '../utils/audioPlayer';

interface HeroDestaqueProps {
  article: Article;
  onReadArticle: (article: Article) => void;
  dataSaver: boolean;
}

export const HeroDestaque: React.FC<HeroDestaqueProps> = ({
  article,
  onReadArticle,
  dataSaver
}) => {
  const [imageError, setImageError] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const handlePlayPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingPreview) {
      audioEngine.stop();
      setIsPlayingPreview(false);
    } else {
      audioEngine.playPreview(article.id, 'marrabenta');
      setIsPlayingPreview(true);
    }
  };

  const handleReloadPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsReloading(true);
    // Instant lightning-fast page refresh
    window.location.reload();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#141821] to-[#0d0f14] border-b border-zinc-800/80">
      {/* Editorial Slogan banner (quiet & clean) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 text-xs text-zinc-400">
          <p className="font-medium text-zinc-300">
            "A música e o entretenimento de Moçambique em alta."
          </p>
          <div className="hidden sm:flex items-center gap-3 tabular-nums">
            <span>Maputo · Beira · Nampula</span>
            <span aria-hidden="true">·</span>
            <span>Edição Diária</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Main Visual Column (7 cols on desktop) */}
          <div className="lg:col-span-7">
            <div 
              onClick={() => onReadArticle(article)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all duration-200 hover:border-zinc-700"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-950 relative">
                {!imageError ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    onError={() => setImageError(true)}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01] ${
                      dataSaver ? 'filter brightness-95' : ''
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-zinc-900 to-zinc-950 text-center">
                    <span className="text-white font-serif-display text-2xl font-bold mb-2">Vibração em Alta MZ</span>
                    <p className="text-zinc-400 text-sm max-w-sm">{article.title}</p>
                  </div>
                )}

                {/* Subtle gradient scrim for instant contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Prominent Fast Page Reload Button with clean professional styling */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
                  <button
                    type="button"
                    onClick={handleReloadPage}
                    disabled={isReloading}
                    className="flex items-center gap-2.5 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl bg-[#0c0d12]/95 hover:bg-black text-white font-bold text-sm sm:text-base border-2 border-zinc-600 hover:border-zinc-400 shadow-xl shadow-black/80 active:scale-95 transition-all duration-100 cursor-pointer group select-none"
                    title="Actualizar toda a página instantaneamente"
                  >
                    <RotateCw className={`w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5] transition-transform ${isReloading ? 'animate-spin' : 'group-hover:rotate-180 duration-300'}`} />
                    <span className="whitespace-nowrap font-bold text-white tracking-wide">
                      {isReloading ? 'A actualizar...' : 'Actualizar Página'}
                    </span>
                  </button>
                </div>

                {/* Quick Audio preview floating button on visual */}
                <button
                  type="button"
                  onClick={handlePlayPreview}
                  className="absolute bottom-3 right-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-sm border border-zinc-700 transition-colors shadow-lg cursor-pointer z-10"
                  title="Ouvir prévia sonora do ritmo"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isPlayingPreview ? 'text-red-500 animate-pulse' : 'text-zinc-300'}`} />
                  <span className="whitespace-nowrap">
                    {isPlayingPreview ? 'A reproduzir ritmo...' : 'Prévia Sonora'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Destaque Content Details (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            {/* Zero-Pill unboxed metadata discipline with typographic separators */}
            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider mb-2.5">
              <span>{article.categoryLabel}</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400 font-normal">{article.date}</span>
              <span className="text-zinc-600" aria-hidden="true">·</span>
              <span className="text-zinc-400 font-normal">{article.readTime}</span>
            </div>

            {/* Main Headline */}
            <h1 
              onClick={() => onReadArticle(article)}
              className="text-2xl sm:text-3xl lg:text-[2rem] leading-tight font-bold text-white hover:text-zinc-300 transition-colors cursor-pointer font-serif-display mb-3.5"
              style={{ textWrap: 'balance' }}
            >
              {article.title}
            </h1>

            {/* Short summary */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              {article.summary}
            </p>

            {/* Author and Metadata details */}
            <div className="flex items-center justify-between border-t border-zinc-800/80 pt-4 mb-6">
              <div className="text-xs text-zinc-400">
                <span className="text-zinc-300 font-medium">{article.author}</span>
                <span className="mx-1.5 text-zinc-600">·</span>
                <span>Moçambique</span>
              </div>
              {article.viewsCount && (
                <div className="flex items-center gap-1 text-xs text-zinc-400 tabular-nums">
                  <Eye className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{article.viewsCount.toLocaleString()} leituras</span>
                </div>
              )}
            </div>

            {/* Main Action Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onReadArticle(article)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm transition-all duration-150 shadow-md active:translate-y-0.5 cursor-pointer"
              >
                <span>Ler Artigo Completo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
