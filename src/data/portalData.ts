import { Article, SongTrack, ArtistProfile, EventMZ } from '../types';

// Bundled static image imports so Vite compiles them into dist/assets for Cloudflare / production
import heroMusicImg from '../assets/images/hero_mozambique_music_1790599088083.jpg';
import festivalMaputoImg from '../assets/images/event_festival_maputo_1790599121617.jpg';
import producerStudioImg from '../assets/images/marrabenta_producer_studio_1790600549341.jpg';
import pandzaPartyImg from '../assets/images/pandza_summer_party_1790600561262.jpg';
import awardsGalaImg from '../assets/images/awards_trophy_gala_mz_1790600574188.jpg';
import studioCollabImg from '../assets/images/studio_duet_collab_mz_1790600598123.jpg';
import artistSpotlightImg from '../assets/images/artist_spotlight_marrabenta_1790599100366.jpg';
import albumPandzaImg from '../assets/images/album_launch_pandza_1790599110717.jpg';

export const HERO_ARTICLE: Article = {
  id: 'destaque-principal',
  title: 'Novo lançamento de artista moçambicano conquista destaque nas plataformas digitais',
  category: 'musica',
  categoryLabel: 'Lançamento & Destaque',
  date: '28 Setembro 2026',
  readTime: '3 min de leitura',
  author: 'Redacção Vibração MZ',
  summary: 'A fusão entre os ritmos tradicionais da Marrabenta e batidas urbanas contemporâneas atinge milhões de reproduções em menos de 48 horas, marcando nova fase na internacionalização da música de Moçambique.',
  fullContent: [
    'O novo single lançado este fim de semana por um dos nomes mais promissores da música jovem moçambicana alcançou o topo dos rankings no Spotify Moçambique, Apple Music e YouTube Music, superando a marca de 500 mil reproduções nas primeiras 48 horas.',
    'Produzido entre Maputo e Joanesburgo, o tema combina guitarras cadenciadas típicas da Marrabenta com o dinamismo do Afro-pop e arranjos de metais que homenageiam os grandes mestres da nossa terra como Fany Mpfumo e Wazimbo, ao mesmo tempo que dialoga com a linguagem moderna dos clubes de Maputo e da Beira.',
    '"O nosso objectivo foi mostrar que as nossas raízes não estão no passado, mas são o passaporte para o mundo", afirmou o artista durante a apresentação oficial do videoclipe no Centro Cultural Franco-Moçambicano.',
    'Nas redes sociais, internautas moçambicanos e da diáspora celebram o sucesso e partilham a coreografia que já se tornou viral no TikTok e Instagram Reels. Especialistas da indústria apontam o tema como forte candidato ao prémio de Melhor Canção do Ano nos próximos Ngoma Moçambique.'
  ],
  imageUrl: heroMusicImg,
  featured: true,
  tags: ['Marrabenta', 'Afro-Pop', 'Maputo', 'Lançamento', 'Tendências'],
  artistName: 'Mabermuda & Nova Geração MZ',
  viewsCount: 14250
};

export const ARTICLES_DATA: Article[] = [
  HERO_ARTICLE,
  {
    id: 'art-2',
    title: 'Festival Sons do Índico regressa a Maputo com mais de 30 artistas nacionais',
    category: 'eventos',
    categoryLabel: 'Eventos Culturais',
    date: '27 Setembro 2026',
    readTime: '2 min de leitura',
    author: 'Equipa Cultural',
    summary: 'A 6ª edição promete celebrar a diversidade sonora de Cabo Delgado a Maputo com palcos temáticos na Baixa da cidade.',
    fullContent: [
      'A Baixa de Maputo vai acolher, nos dias 10 e 11 de Outubro, a maior celebração da música ao vivo do país. O Festival Sons do Índico anunciou hoje o alinhamento oficial reunindo lendas consagradas e novas vozes do Pandza, Timbila e Afro-House.',
      'Com bilhetes acessíveis e transmissão via rádio para todo o país, a organização destaca o compromisso de promover a economia criativa local e artesãos de todas as províncias.',
      'Os bilhetes já se encontram disponíveis nos postos habituais e via M-Pesa com desconto especial de lançamento.'
    ],
    imageUrl: festivalMaputoImg,
    tags: ['Festivais', 'Maputo', 'Música ao Vivo', 'Cultura MZ']
  },
  {
    id: 'art-3',
    title: 'Marrabenta da nova era: como jovens produtores estão a reinventar o património musical',
    category: 'artistas',
    categoryLabel: 'Perfil & Tendência',
    date: '26 Setembro 2026',
    readTime: '4 min de leitura',
    author: 'Carlos Tembe',
    summary: 'Novos produtores misturam solos de guitarra de corda de aço com sintetizadores analógicos, atraindo nova legião de fãs.',
    fullContent: [
      'Durante muito tempo associada exclusivamente às gerações mais velhas, a Marrabenta vive uma autêntica primavera criativa impulsionada por estúdios caseiros em bairros como Chamanculo, Polana Caniço e Munhava.',
      'Jovens beatmakers estão a resgatar vinis antigos de Dilon Djindji e Orchestra Marrabenta Star de Moçambique, transformando samples históricos em hinos para pistas de dança cosmopolitas.',
      '"Nós não precisamos de copiar o que vem de fora quando a nossa identidade tem um groove inconfundível", destaca o produtor Maputo Beats.'
    ],
    imageUrl: producerStudioImg,
    tags: ['Marrabenta', 'Produção Musical', 'Cultura', 'Chamanculo']
  },
  {
    id: 'art-4',
    title: 'Sucesso do Pandza nas pistas: novo EP promete aquecer as noites de Verão',
    category: 'musica',
    categoryLabel: 'Lançamentos',
    date: '25 Setembro 2026',
    readTime: '3 min de leitura',
    author: 'Sónia Machava',
    summary: 'Com batidas rápidas e letras de celebração, o novo projecto discográfico já domina as rádios comunitárias e festas de rua.',
    fullContent: [
      'O ritmo frenético do Pandza, nascido nas ruas de Maputo nos anos 2000, volta a mostrar a sua força inabalável com o lançamento do álbum conjunto que reúne os maiores MCs do género.',
      'As 7 faixas trazem colaborações inéditas e melodias contagiantes, pensadas para o calor e animação que caracterizam o verão moçambicano.',
      'Faixas como "Chapa 100" e "Bairro em Festa" registam grande adesão nas plataformas digitais e já são as mais pedidas nas rádios privadas e públicas.'
    ],
    imageUrl: pandzaPartyImg,
    tags: ['Pandza', 'Verão MZ', 'Música Urbana', 'Dança']
  },
  {
    id: 'art-5',
    title: 'Prémios da Música Moçambicana abrem votações públicas para as 18 categorias',
    category: 'entretenimento',
    categoryLabel: 'Premiações',
    date: '24 Setembro 2026',
    readTime: '2 min de leitura',
    author: 'Redacção Vibração MZ',
    summary: 'A cerimónia anual que distingue os melhores artistas, produtores e videoclipes terá votação transparente via SMS e online.',
    fullContent: [
      'A comissão organizadora dos prestigiados prémios de música de Moçambique revelou os nomeados oficiais para a gala deste ano, que se realizará no Cine-Teatro África.',
      'As categorias de Melhor Artista Masculino, Melhor Artista Feminina e Canção Mais Popular contam com forte disputa entre nomes de topo do cenário nacional.',
      'O público pode votar gratuitamente através do portal oficial até ao final da primeira quinzena do próximo mês.'
    ],
    imageUrl: awardsGalaImg,
    tags: ['Prémios', 'Ngoma', 'Reconhecimento', 'Votação']
  },
  {
    id: 'art-6',
    title: 'Colaboração entre artistas de Moçambique e Angola atinge primeiro lugar na CPLP',
    category: 'entretenimento',
    categoryLabel: 'Internacional',
    date: '23 Setembro 2026',
    readTime: '3 min de leitura',
    author: 'Redacção Vibração MZ',
    summary: 'A união entre o Kizomba moçambicano e o Semba clássico gera uma das faixas mais aclamadas do espaço lusófono este ano.',
    fullContent: [
      'A conexão Maputo-Luanda volta a render frutos de excelência musical. O dueto lançado no início do mês ultrapassou fronteiras e já ocupa o topo dos serviços de streaming em Portugal, Cabo Verde e Moçambique.',
      'O videoclipe gravado na Costa do Sol e na Ilha de Luanda recebeu rasgados elogios pela fotografia e valorização das paisagens tropicais dos dois países irmãos.'
    ],
    imageUrl: studioCollabImg,
    tags: ['CPLP', 'Colaborações', 'Kizomba', 'Lusofonia']
  }
];

export const TOP_TRACKS_DATA: SongTrack[] = [
  {
    id: 'track-1',
    title: 'Xigubo Moderno',
    artist: 'Laylizzy ft. Tamyris Moiane',
    genre: 'Hip-Hop MZ',
    duration: '3:24',
    streams: '840K plays',
    releaseDate: 'Há 3 dias',
    coverImage: albumPandzaImg,
    beatType: 'pandza',
    lyricsSnippet: 'Da Matola até à Polana, batida no peito, orgulho da terra...'
  },
  {
    id: 'track-2',
    title: 'Dança da Terra Nova',
    artist: 'Mr. Bow ft. Dama do Bling',
    genre: 'Marrabenta',
    duration: '3:45',
    streams: '1.2M plays',
    releaseDate: 'Há 1 semana',
    coverImage: heroMusicImg,
    beatType: 'marrabenta',
    lyricsSnippet: 'Marrabenta no sangue, acende o fogo, a noite é nossa...'
  },
  {
    id: 'track-3',
    title: 'Coração Puro de Maputo',
    artist: 'Twenty Fingers & Neyma',
    genre: 'Kizomba',
    duration: '4:10',
    streams: '960K plays',
    releaseDate: 'Há 2 semanas',
    coverImage: artistSpotlightImg,
    beatType: 'kizomba',
    lyricsSnippet: 'Segura na minha mão, vamos andar na marginal sob as estrelas...'
  },
  {
    id: 'track-4',
    title: 'Marrabenta Tech Grooves',
    artist: 'DJ Tarico & Maputo Boys',
    genre: 'Afro House',
    duration: '5:02',
    streams: '720K plays',
    releaseDate: 'Há 4 dias',
    coverImage: festivalMaputoImg,
    beatType: 'afrohouse',
    lyricsSnippet: 'Batida pesada, percussão que não para, sente a vibração...'
  },
  {
    id: 'track-5',
    title: 'Canto do Índico',
    artist: 'Stewart Sukuma',
    genre: 'Marrabenta',
    duration: '4:18',
    streams: '510K plays',
    releaseDate: 'Há 2 semanas',
    coverImage: heroMusicImg,
    beatType: 'marrabenta',
    lyricsSnippet: 'Vento que sopra do mar traz as memórias dos nossos avós...'
  }
];

export const ARTISTS_DATA: ArtistProfile[] = [
  {
    id: 'artist-1',
    name: 'Mr. Bow',
    artisticName: 'O Rei do Pandza & Marrabenta',
    genres: ['Marrabenta', 'Pandza', 'Afro-Pop'],
    originCity: 'Guijá, Gaza / Maputo',
    province: 'Gaza',
    bio: 'Figura central da música popular moçambicana contemporânea, com dezenas de sucessos que marcam casamentos, celebrações e as maiores pistas de dança do país.',
    popularTrack: 'Dança da Terra Nova',
    avatarUrl: artistSpotlightImg,
    followers: '2.4M seguidores'
  },
  {
    id: 'artist-2',
    name: 'Tamyris Moiane',
    artisticName: 'A Nova Voz de Ouro MZ',
    genres: ['Afro-Pop', 'R&B MZ', 'Kizomba'],
    originCity: 'Maputo',
    province: 'Maputo Cidade',
    bio: 'Revelação meteórica com timbre inconfundível, acumulando milhões de visualizações e duetos com as maiores referências da lusofonia.',
    popularTrack: 'Xigubo Moderno',
    avatarUrl: albumPandzaImg,
    followers: '1.8M seguidores'
  },
  {
    id: 'artist-3',
    name: 'Laylizzy',
    artisticName: 'O Embaixador do Rap MZ',
    genres: ['Hip-Hop MZ', 'Trap Afro', 'Inglês/Português/Changana'],
    originCity: 'Maputo',
    province: 'Maputo Cidade',
    bio: 'Pioneiro moçambicano a cruzar fronteiras com colaborações de peso em África e nos EUA, elevando a rima urbana em Changana e Português.',
    popularTrack: 'Slay & Xigubo',
    avatarUrl: heroMusicImg,
    followers: '1.5M seguidores'
  },
  {
    id: 'artist-4',
    name: 'Neyma',
    artisticName: 'A Diva da Marrabenta',
    genres: ['Marrabenta', 'Tradicional', 'Pop'],
    originCity: 'Maputo',
    province: 'Maputo',
    bio: 'Mais de duas décadas de carreira exemplar, defendendo a riqueza cultural e musical de Moçambique com carisma inigualável e energia nos palcos.',
    popularTrack: 'Arromba & Marrabenta',
    avatarUrl: artistSpotlightImg,
    followers: '2.1M seguidores'
  }
];

export const EVENTS_DATA: EventMZ[] = [
  {
    id: 'ev-1',
    title: 'Festival Sons do Índico 2026',
    date: '10–11 Outubro',
    time: 'Abertura de portas 15:00',
    venue: 'Baixa de Maputo (Praça dos Trabalhadores)',
    city: 'Maputo',
    lineup: ['Stewart Sukuma', 'Mr. Bow', 'Tamyris Moiane', 'Dj Tarico'],
    price: '500 MT (Normal) / 1.500 MT (VIP)',
    status: 'Confirmado',
    category: 'Festival'
  },
  {
    id: 'ev-2',
    title: 'Noite Acústica de Marrabenta & Jazz',
    date: '03 Outubro',
    time: '20:00',
    venue: 'Centro Cultural Franco-Moçambicano (CCFM)',
    city: 'Maputo',
    lineup: ['Mestres da Marrabenta', 'Guitarras de Gaza'],
    price: '300 MT',
    status: 'Últimos Bilhetes',
    category: 'Concerto Íntimo'
  },
  {
    id: 'ev-3',
    title: 'Show das Beiras: Verão em Festa',
    date: '18 Outubro',
    time: '16:00',
    venue: 'Clube Ferroviário da Beira',
    city: 'Beira, Sofala',
    lineup: ['Twenty Fingers', 'Artistas Locais de Sofala'],
    price: '400 MT',
    status: 'Confirmado',
    category: 'Show Regional'
  },
  {
    id: 'ev-4',
    title: 'Gala dos Prémios da Música Moçambicana',
    date: '28 Novembro',
    time: '19:30',
    venue: 'Cine-Teatro África',
    city: 'Maputo',
    lineup: ['Transmissão Nacional TVM & STV', 'Show Especial de Abertura'],
    price: 'Acesso por convite e votação pública',
    status: 'Entrada Livre',
    category: 'Gala / Premiação'
  }
];
