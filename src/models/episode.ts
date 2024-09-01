export interface EpisodeSources {
  headers: {
    Referer: string;
  };
  sources: Source[];
  download: string;
}

export interface Source {
  url: string;
  isM3U8: boolean;
  quality: string;
}
