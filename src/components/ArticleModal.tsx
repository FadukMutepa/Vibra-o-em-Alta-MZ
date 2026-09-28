import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { X, Share2, Check, ArrowLeft, Eye } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  dataSaver: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  dataSaver
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleShareWhatsApp = () => {
    const text = `*${article.title}*\nLeia no Vibração em Alta MZ: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#12151b] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top utility bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/90 bg-[#161a22]">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Portal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded text-xs font-semibold hover:bg-emerald-600/30 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp MZ</span>
            </button>
            <button
              onClick={handleCopyLink}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Copiar link do artigo"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto px-5 sm:px-8 py-6 space-y-5">
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400 font-medium">
            <span className="text-red-500 font-bold uppercase tracking-wider">{article.categoryLabel}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>{article.readTime}</span>
            {article.viewsCount && (
              <>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <Eye className="w-3.5 h-3.5 text-zinc-500" />
                  {article.viewsCount.toLocaleString()} visualizações
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-display leading-tight">
            {article.title}
          </h2>

          {/* Subtitle / summary */}
          <p className="text-base text-zinc-300 font-medium leading-relaxed border-l-2 border-red-600 pl-3.5 py-0.5">
            {article.summary}
          </p>

          {/* Author line */}
          <div className="text-xs text-zinc-400 pb-2 border-b border-zinc-800">
            Escrito por <strong className="text-zinc-200">{article.author}</strong> · Vibração em Alta MZ
          </div>

          {/* Image */}
          <div className="rounded-xl overflow-hidden aspect-[16/9] bg-zinc-950 border border-zinc-800">
            <img
              src={article.imageUrl}
              alt={article.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover ${dataSaver ? 'filter brightness-95' : ''}`}
            />
          </div>

          {/* Full Content Paragraphs */}
          <div className="space-y-4 text-zinc-200 text-sm sm:text-base leading-relaxed pt-2">
            {article.fullContent.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-400 font-semibold mr-1">Temas:</span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Mozambican footer note inside article */}
          <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 text-xs text-zinc-400">
            <p className="font-semibold text-zinc-200 mb-1">
              🇲🇿 Vibração em Alta MZ — A música e o entretenimento de Moçambique em alta.
            </p>
            <p>
              Tem uma novidade, videoclipe ou lançamento musical para partilhar com o nosso público? Utilize o botão "Enviar Música" no topo da página.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
