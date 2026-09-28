import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface SubmitMusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitMusicModal: React.FC<SubmitMusicModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    artistName: '',
    songTitle: '',
    genre: 'Marrabenta',
    province: 'Maputo Cidade',
    musicLink: '',
    whatsappContact: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      artistName: '',
      songTitle: '',
      genre: 'Marrabenta',
      province: 'Maputo Cidade',
      musicLink: '',
      whatsappContact: '',
      description: ''
    });
    onClose();
  };

  const provinces = [
    'Maputo Cidade',
    'Maputo Província',
    'Gaza (Xai-Xai)',
    'Inhambane',
    'Sofala (Beira)',
    'Manica (Chimoio)',
    'Tete',
    'Zambézia (Quelimane)',
    'Nampula',
    'Cabo Delgado (Pemba)',
    'Niassa (Lichinga)',
    'Diáspora'
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#12151b] border border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-5">
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                Para Artistas & Produtores
              </span>
              <h3 className="text-xl font-bold text-white font-serif-display mt-1">
                Submeter Música ou Lançamento
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Envie o seu trabalho para análise editorial e publicação no portal Vibração em Alta MZ.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Nome do Artista / Grupo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: MC Moçambique"
                    value={formData.artistName}
                    onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Título da Faixa *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Minha Terra Linda"
                    value={formData.songTitle}
                    onChange={(e) => setFormData({ ...formData, songTitle: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Género Musical
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-400"
                  >
                    <option value="Marrabenta">Marrabenta</option>
                    <option value="Pandza">Pandza</option>
                    <option value="Afro-Pop">Afro-Pop</option>
                    <option value="Kizomba / Zouk">Kizomba / Zouk</option>
                    <option value="Hip-Hop MZ">Hip-Hop MZ</option>
                    <option value="Afro-House">Afro-House</option>
                    <option value="Amapiano MZ">Amapiano MZ</option>
                    <option value="Tradicional / Timbila">Tradicional / Timbila</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Província / Origem
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-400"
                  >
                    {provinces.map((prov) => (
                      <option key={prov} value={prov}>{prov}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Link de Áudio / Vídeo (YouTube, Audiomack, Drive) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://youtu.be/... ou link de streaming"
                  value={formData.musicLink}
                  onChange={(e) => setFormData({ ...formData, musicLink: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Contacto WhatsApp para Confirmação *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+258 84/85/86/87 XXX XXXX"
                  value={formData.whatsappContact}
                  onChange={(e) => setFormData({ ...formData, whatsappContact: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Breve Descrição / Release (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Conte um pouco sobre o conceito da música e os produtores envolvidos..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-zinc-400 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submeter para a Redacção</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white font-serif-display">
              Submissão Enviada com Sucesso!
            </h3>
            <p className="text-xs text-zinc-300 max-w-sm mx-auto leading-relaxed">
              Obrigado, <strong className="text-white">{formData.artistName}</strong>! A equipa editorial do <strong>Vibração em Alta MZ</strong> irá analisar a faixa "{formData.songTitle}" e entrar em contacto via WhatsApp ({formData.whatsappContact}).
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
