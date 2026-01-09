
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  rating: string;
  year: string;
  category: string;
  isAfrican: boolean;
  cast: string[];
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  watchlist: string[];
  history: string[];
}

export enum SectionType {
  TRENDING = 'Em Alta',
  NEW_RELEASES = 'Novos Lançamentos',
  AFRICAN_CONTENT = 'Conteúdo Africano',
  MOVIES = 'Filmes',
  SERIES = 'Séries',
  DOCUMENTARIES = 'Documentários'
}
