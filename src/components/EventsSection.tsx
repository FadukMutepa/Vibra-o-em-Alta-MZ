import React, { useState } from 'react';
import { EVENTS_DATA } from '../data/portalData';
import { EventMZ } from '../types';
import { Calendar, MapPin, Clock, Ticket, Check } from 'lucide-react';

export const EventsSection: React.FC = () => {
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  const toggleSaveEvent = (event: EventMZ) => {
    if (savedEventIds.includes(event.id)) {
      setSavedEventIds(savedEventIds.filter(id => id !== event.id));
      setNotification(`Removido da sua lista: ${event.title}`);
    } else {
      setSavedEventIds([...savedEventIds, event.id]);
      setNotification(`Lembrete guardado para: ${event.title}`);
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <section id="eventos" className="py-10 bg-[#0d0f14] border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold text-red-500 uppercase tracking-wider mb-1">
              Música ao Vivo & Festivais
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif-display">
              Agenda Cultural MZ
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-2 sm:mt-0 font-normal">
            Os principais concertos e espectáculos agendados no país
          </p>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="mb-4 p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs flex items-center justify-between animate-in fade-in duration-150">
            <span>{notification}</span>
            <button
              onClick={() => setNotification(null)}
              className="text-white font-bold hover:underline ml-2"
            >
              OK
            </button>
          </div>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EVENTS_DATA.map((event) => {
            const isSaved = savedEventIds.includes(event.id);

            return (
              <div
                key={event.id}
                className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 p-5 flex flex-col justify-between transition-colors"
              >
                <div>
                  {/* Status & Category */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-red-500 font-semibold">{event.category}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      event.status === 'Últimos Bilhetes'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : event.status === 'Entrada Livre'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}>
                      {event.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white font-serif-display mb-3">
                    {event.title}
                  </h3>

                  {/* Meta items */}
                  <div className="space-y-2 text-xs text-zinc-300 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="font-semibold text-zinc-200">{event.date}</span>
                      <span className="text-zinc-600">·</span>
                      <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-1" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{event.venue} — <strong>{event.city}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Ticket className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span className="text-zinc-200 font-medium">{event.price}</span>
                    </div>
                  </div>

                  {/* Lineup pills/list */}
                  <div className="pt-3 border-t border-zinc-800/80">
                    <span className="text-[11px] text-zinc-400 block mb-1.5 uppercase tracking-wide">
                      Alinhamento / Artistas:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {event.lineup.map((artistName, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-zinc-300 bg-zinc-800/70 px-2 py-0.5 rounded border border-zinc-700/50"
                        >
                          {artistName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400">
                    Pagamentos aceites via M-Pesa / e-Mola / Balcão
                  </span>

                  <button
                    onClick={() => toggleSaveEvent(event)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Agendado</span>
                      </>
                    ) : (
                      <>
                        <span>Guardar Data</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
