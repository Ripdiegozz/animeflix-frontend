export interface TopAnime {
  id: string;
  title: string;
  image: string;
  url: string;
  genres: string[];
  episodeId: string;
  episodeNumber: number;
}

export interface Anime {
  id: string;
  title: string;
  url: string;
  genres: string[];
  totalEpisodes: number;
  image: string;
  releaseDate: string;
  description: string;
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  episodes: Episode[];
}

export interface Episode {
  id: string;
  number: number;
  url: string;
}
