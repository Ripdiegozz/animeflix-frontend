import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useAnime } from "@/lib/zustand";
import axios from "@/lib/axios";
import { TopAnime } from "@/models/anime";

const generateAnimeData = async () => {
  try {
    const { data } = await axios.get(`/api/v1/anime/top/page=1`);
    const parsedData = JSON.parse(data);

    return parsedData;
  } catch (error) {
    console.error("Error fetching popular results:", error);
  }
};

export const Route = createFileRoute("/discover")({
  loader: async () => {
    return generateAnimeData();
  },
  component: Discover,
});

function Discover() {
  const { fetchPopular, popular } = useAnime();
  const initialList = useLoaderData({ from: "/discover" });
  const [animeList, setAnimeList] = useState<TopAnime[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const handleLoadPopular = async () => {
    await fetchPopular(page);
  };

  const loadMoreAnime = () => {
    setLoading(true);
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
      handleLoadPopular();

      if (popular) {
        setAnimeList((prevList) => [...prevList, ...popular]);
      }

      setLoading(false);
    }, 1000); // Simulating API delay
  };

  useEffect(() => {
    if (initialList) {
      setAnimeList(initialList.results);
    }
  }, [setAnimeList, initialList]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreAnime();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading]);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold my-6'>Discover Anime</h1>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {animeList &&
          animeList.map((anime) => (
            <Card key={anime.id} className='overflow-hidden'>
              <CardContent className='p-0'>
                <img
                  src={anime.image}
                  alt={anime.title}
                  width={150}
                  height={225}
                  className='w-full h-auto object-cover'
                />
              </CardContent>
              <CardFooter className='flex flex-col items-start p-2'>
                <h3 className='font-semibold text-sm mb-1 line-clamp-1'>
                  {anime.title}
                </h3>
                <div className='flex items-center mb-1'>
                  <Star className='w-4 h-4 text-yellow-400 mr-1' />
                  {/* <span className='text-sm'>{anime.rating}</span> */}
                </div>
                <div className='flex flex-wrap gap-1'>
                  {anime.genres.map((genre) => (
                    <Badge key={genre} variant='secondary' className='text-xs'>
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>

      <div ref={loader} className='flex justify-center mt-8'>
        {loading && <p>Loading more anime...</p>}
      </div>
    </div>
  );
}
