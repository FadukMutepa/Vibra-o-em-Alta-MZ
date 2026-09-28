export type Category = 'todos' | 'musica' | 'artistas' | 'entretenimento' | 'eventos';

export interface Article {
  id: string;
  title: string;
  category: 'musica' | 'artistas' | 'entretenimento' | 'eventos';
  categoryLabel: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  fullContent: string[];
  imageUrl: string;
  featured?: boolean;
  tags: string[];
  artistName?: string;
  viewsCount?: number;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  genre: 'Marrabenta' | 'Pandza' | 'Afro House' | 'Kizomba' | 'Hip-Hop MZ' | 'Amapiano MZ';
  duration: string;
  streams: string;
  releaseDate: string;
  coverImage?: string;
  beatType: 'marrabenta' | 'pandza' | 'kizomba' | 'afrohouse';
  lyricsSnippet: string;
}

export interface ArtistProfile {
  id: string;
  name: string;
  artisticName: string;
  genres: string[];
  originCity: string;
  province: string;
  bio: string;
  popularTrack: string;
  avatarUrl: string;
  followers: string;
}

export interface EventMZ {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  lineup: string[];
  price: string;
  status: 'Confirmado' | 'Últimos Bilhetes' | 'Entrada Livre';
  category: string;
}
