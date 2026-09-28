/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroDestaque } from './components/HeroDestaque';
import { MusicCharts } from './components/MusicCharts';
import { ArtistGrid } from './components/ArtistGrid';
import { NewsSection } from './components/NewsSection';
import { EventsSection } from './components/EventsSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { ArtistModal } from './components/ArtistModal';
import { SubmitMusicModal } from './components/SubmitMusicModal';
import { HERO_ARTICLE } from './data/portalData';
import { Category, Article, ArtistProfile } from './types';
import { Zap, Volume2, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('todos');
  const [dataSaver, setDataSaver] = useState<boolean>(() => {
    try {
      return localStorage.getItem('vibra_mz_data_saver') === 'true';
    } catch {
      return false;
    }
  });

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedArtist, setSelectedArtist] = useState<ArtistProfile | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const toggleDataSaver = () => {
    setDataSaver(prev => {
      const next = !prev;
      try {
        localStorage.setItem('vibra_mz_data_saver', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (dataSaver) {
      document.body.classList.add('data-saver-mode');
    } else {
      document.body.classList.remove('data-saver-mode');
    }
  }, [dataSaver]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0d11] text-zinc-100 selection:bg-red-600 selection:text-white">
      
      {/* Ultra-lightweight Status Ribbon for Mozambican mobile users */}
      {dataSaver && (
        <div className="bg-zinc-900 border-b border-zinc-800 py-1.5 px-4 text-center text-xs text-zinc-300 flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5 text-zinc-400" />
          <span>Modo de Poupança de Dados MZ activo: Imagens optimizadas para máxima velocidade móvel.</span>
          <button
            onClick={toggleDataSaver}
            className="underline hover:text-white ml-1 font-semibold cursor-pointer text-zinc-200"
          >
            Desactivar
          </button>
        </div>
      )}

      {/* Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        dataSaver={dataSaver}
        onToggleDataSaver={toggleDataSaver}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Single Page Content */}
      <main className="flex-1">
        
        {/* 1. DESTAQUE PRINCIPAL (Always visible on 'todos' and 'musica') */}
        {(activeCategory === 'todos' || activeCategory === 'musica') && (
          <HeroDestaque
            article={HERO_ARTICLE}
            onReadArticle={(art) => setSelectedArticle(art)}
            dataSaver={dataSaver}
          />
        )}

        {/* 2. TOP MÚSICAS MZ DA SEMANA */}
        {(activeCategory === 'todos' || activeCategory === 'musica') && (
          <MusicCharts
            dataSaver={dataSaver}
          />
        )}

        {/* 3. ARTISTAS EM DESTAQUE */}
        {(activeCategory === 'todos' || activeCategory === 'artistas') && (
          <ArtistGrid
            dataSaver={dataSaver}
            onSelectArtist={(art) => setSelectedArtist(art)}
          />
        )}

        {/* 4. NOTÍCIAS E ENTRETENIMENTO */}
        {(activeCategory === 'todos' || activeCategory === 'entretenimento') && (
          <NewsSection
            onReadArticle={(art) => setSelectedArticle(art)}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            dataSaver={dataSaver}
          />
        )}

        {/* 5. AGENDA CULTURAL & EVENTOS */}
        {(activeCategory === 'todos' || activeCategory === 'eventos') && (
          <EventsSection />
        )}

        {/* Speed & Optimization Guarantee Badge */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Vibração em Alta MZ</strong> é projectado para carregar instantaneamente em redes 2G, 3G e 4G em todo o território de Moçambique.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-zinc-500 font-mono">Prioridade: Velocidade</span>
              <span className="w-1 h-1 rounded-full bg-zinc-700" />
              <span className="text-zinc-200 font-semibold">Sem Bloqueios</span>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Instant Article Reader Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        dataSaver={dataSaver}
      />

      {/* Artist Profile Modal */}
      <ArtistModal
        artist={selectedArtist}
        onClose={() => setSelectedArtist(null)}
        dataSaver={dataSaver}
      />

      {/* Submit Music Modal */}
      <SubmitMusicModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />

    </div>
  );
}
