import React, { useState, useMemo } from 'react';
import { Article, Category } from '../types';
import { ARTICLES_DATA } from '../data/portalData';
import { Search, ArrowUpRight, X } from 'lucide-react';

interface NewsSectionProps {
  onReadArticle: (article: Article) => void;
  activeCategory: Category;
  onSelectCategory: (cat: Category) => void;
  dataSaver: boolean;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
  onReadArticle,
  activeCategory,
  onSelectCategory,
  dataSaver
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const filterTabs: { id: Category; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'musica', label: 'Música' },
    { id: 'artistas', label: 'Artistas' },
    { id: 'entretenimento', label: 'Entretenimento' },
    { id: 'eventos', label: 'Eventos' }
  ];

  // Fast client-side search and category filtering
  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      // Exclude main hero from this listing if viewing 'todos' so there is no duplicate
      const matchesCategory = activeCategory === 'todos' || article.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (article.artistName && article.artistName.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="entretenimento" className="py-10 bg-[#0d0f14] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
              Actualidade & Cobertura
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-display">
              Notícias do Entretenimento MZ
            </h2>
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full lg:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar notícias, artistas..."
              className="w-full pl-9 pr-8 py-2 bg-zinc-900 border border-zinc-700/80 focus:border-zinc-400 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-colors"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-white cursor-pointer"
                title="Limpar pesquisa"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Segmented Filter Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-white text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results status if search is active */}
        {searchQuery && (
          <div className="mb-4 text-xs text-zinc-400 flex items-center justify-between">
            <span>
              A mostrar <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'resultado' : 'resultados'} para "{searchQuery}"
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-red-400 hover:underline cursor-pointer font-medium"
            >
              Limpar filtro
            </button>
          </div>
        )}

        {/* Articles List / Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => {
              const hasError = imageErrors[article.id];

              return (
                <article
                  key={article.id}
                  onClick={() => onReadArticle(article)}
                  className="group cursor-pointer rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-200 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Article Thumbnail */}
                    <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-950 relative">
                      {!hasError ? (
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          onError={() => handleImageError(article.id)}
                          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                            dataSaver ? 'filter brightness-95' : ''
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-white font-serif-display text-sm font-semibold p-4 text-center">
                          Vibração em Alta MZ
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    </div>

                    {/* Article Content */}
                    <div className="p-4 sm:p-5">
                      {/* Zero-Pill unboxed metadata */}
                      <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-medium">
                        <span className="text-red-500 font-bold">{article.categoryLabel}</span>
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span>{article.date}</span>
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                        <span>{article.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-zinc-300 transition-colors font-serif-display leading-snug mb-2">
                        {article.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer with action link */}
                  <div className="p-4 sm:p-5 pt-0 border-t border-zinc-800/60 mt-2 flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Por {article.author}</span>
                    <span className="text-zinc-200 group-hover:text-white font-semibold flex items-center gap-1">
                      Ler mais
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                    </span>
                  </div>

                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center bg-zinc-900/40 rounded-xl border border-zinc-800">
            <p className="text-zinc-300 text-sm mb-2">
              Nenhuma notícia encontrada com os critérios actuais.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('todos');
              }}
              className="text-xs font-semibold text-zinc-200 hover:underline cursor-pointer"
            >
              Ver todas as notícias
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
