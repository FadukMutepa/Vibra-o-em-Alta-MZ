import React from 'react';
import { Category } from '../types';
import { MessageSquare, ArrowUp, Music } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: Category) => void;
  onOpenSubmitModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenSubmitModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppCommunity = () => {
    window.open('https://chat.whatsapp.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#090b0e] border-t border-zinc-800 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-zinc-800/80">
          
          {/* Brand & Slogan column */}
          <div className="md:col-span-5 space-y-3">
            <span className="text-xl font-extrabold tracking-tight text-white font-serif-display inline-block">
              Vibração em Alta <span className="text-white font-sans font-bold text-xs uppercase px-1.5 py-0.5 bg-red-600 rounded ml-1">MZ</span>
            </span>

            <p className="text-zinc-300 font-medium text-sm">
              "A música e o entretenimento de Moçambique em alta."
            </p>

            <p className="text-zinc-400 text-xs max-w-sm leading-relaxed">
              O portal de referência para a divulgação de ritmos moçambicanos — da Marrabenta tradicional ao Pandza, Afro-Pop, Kizomba e Hip-Hop nacional. Leve, rápido e optimizado para todos os telemóveis de Moçambique.
            </p>

            <div className="pt-2">
              <button
                onClick={handleWhatsAppCommunity}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/25 transition-colors cursor-pointer font-medium text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Canal WhatsApp MZ (Lançamentos Diários)</span>
              </button>
            </div>
          </div>

          {/* Quick Sections */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-zinc-200 font-semibold text-xs uppercase tracking-wider mb-3">
              Secções Principais
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('todos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Início (Destaques)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('musica')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Música & Top Músicas MZ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('artistas')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Artistas da Terra
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('entretenimento')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Notícias do Entretenimento
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('eventos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Agenda de Eventos e Festivais
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Artists */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-zinc-200 font-semibold text-xs uppercase tracking-wider mb-3">
              Divulgue a sua Arte
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              É artista, músico ou produtor moçambicano? Envie a sua música, lançamento de videoclipe ou data de concerto directamente para a nossa redacção.
            </p>
            <button
              onClick={onOpenSubmitModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-zinc-200 text-zinc-950 rounded-lg font-bold text-xs transition-colors cursor-pointer"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Enviar Trabalho Musical</span>
            </button>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Vibração em Alta MZ. Todos os direitos reservados.</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <span className="text-zinc-400 font-medium">Orgulho Moçambicano 🇲🇿</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-zinc-900 border border-zinc-800"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
