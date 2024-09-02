import { create } from "zustand";
import { Anime, AnimeSearchResponse, TopAnimeResponse } from "@/models/anime";
import { TopAnime } from "@/models/anime";
import axios from "@/lib/axios";

interface Store {
  popular: TopAnimeResponse | null;
  showcase: TopAnime | null;
  anime: Anime | null;
  search: AnimeSearchResponse | null;
  fetchPopular: (page: number) => void;
  fetchAnime: (slug: string) => void;
  fetchSearch: (query: string) => void;
  cleanSearch: () => void;
}

export const useStore = create<Store>((set) => ({
  popular: null,
  showcase: null,
  anime: null,
  search: null,
  fetchPopular: async (page: number) => {
    try {
      const { data } = await axios.get(`/api/v1/anime/top?page=${page}`);
      const popular = JSON.parse(data);
      set({ popular: popular.results });
      set({
        showcase:
          popular.results[Math.floor(Math.random() * popular.results.length)],
      });
    } catch (error) {
      console.error(error);
    }
  },
  fetchAnime: async (slug: string) => {
    const { data } = await axios.get(`/api/v1/anime/${slug}`);
    set({ anime: JSON.parse(data) });
  },
  fetchSearch: async (query: string) => {
    try {
      const { data } = await axios.get(
        `/api/v1/anime/search?q=${query}&page=1`
      );
      const parsedData = JSON.parse(data);
      if (parsedData && parsedData.results) {
        set({ search: parsedData });
      } else {
        set({ search: null });
        console.warn("No search results found.");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      set({ search: null });
    }
  },
  cleanSearch: () => set({ search: null }),
}));

export const useAnime = () => {
  const {
    popular,
    showcase,
    anime,
    search,
    fetchPopular,
    fetchAnime,
    fetchSearch,
    cleanSearch,
  } = useStore();
  return {
    popular,
    showcase,
    anime,
    search,
    fetchPopular,
    fetchAnime,
    fetchSearch,
    cleanSearch,
  };
};
