import React, { useState } from 'react';
import { Menu, X, Zap, Send } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  dataSaver: boolean;
  onToggleDataSaver: () => void;
  onOpenSubmitModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  dataSaver,
  onToggleDataSaver,
  onOpenSubmitModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; id: Category }[] = [
    { label: 'Início', id: 'todos' },
    { label: 'Música', id: 'musica' },
    { label: 'Artistas', id: 'artistas' },
    { label: 'Entretenimento', id: 'entretenimento' },
    { label: 'Eventos', id: 'eventos' }
  ];

  const handleNavClick = (id: Category) => {
    onSelectCategory(id);
    setMobileMenuOpen(false);
    
    // Smooth scroll to relevant section if already on page
    if (id === 'todos') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0d0f14]/95 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Single element Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('todos');
            }}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-serif-display group-hover:text-zinc-200 transition-colors">
              Vibração em Alta <span className="text-white font-sans font-bold text-xs uppercase ml-1 px-1.5 py-0.5 bg-red-600 rounded tracking-wider">MZ</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded cursor-pointer ${
                  activeCategory === item.id
                    ? 'text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
                {activeCategory === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Data-saver toggle & Submit music CTA) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onToggleDataSaver}
              title={dataSaver ? "Modo Económico activo (poupança de dados)" : "Activar modo económico de dados"}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                dataSaver
                  ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 ${dataSaver ? 'text-emerald-400 fill-emerald-400' : 'text-zinc-400'}`} />
              <span className="whitespace-nowrap">
                {dataSaver ? 'Poupança Activa' : 'Poupança MZ'}
              </span>
            </button>

            <button
              onClick={onOpenSubmitModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold bg-white hover:bg-zinc-200 text-zinc-950 rounded-md transition-colors cursor-pointer shadow-sm whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Música</span>
            </button>
          </div>

          {/* Mobile menu and mobile data button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleDataSaver}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                dataSaver
                  ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
              aria-label="Poupar Dados"
              title="Poupança de Dados"
            >
              <Zap className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-zinc-300 hover:text-white rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Compact Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-zinc-800/80 animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer min-h-[44px] flex items-center justify-between ${
                    activeCategory === item.id
                      ? 'bg-zinc-800 text-white font-bold'
                      : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeCategory === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  )}
                </button>
              ))}

              <div className="pt-2 mt-2 border-t border-zinc-800/80 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSubmitModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-zinc-200 text-zinc-950 text-sm font-bold rounded-md transition-colors min-h-[44px]"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Música / Notícia MZ</span>
                </button>
              </div>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
};
