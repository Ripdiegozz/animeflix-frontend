import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { Card, CardContent } from "../components/ui/card";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { TopAnime } from "@/models/anime";
import { FlameIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createLazyFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [popular, setPopular] = useState<TopAnime[]>([]);
  const [showcase, setShowcase] = useState<TopAnime>();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const { data } = await axios.get("/api/v1/anime/top");
        const popular = JSON.parse(data);
        setPopular(popular.results);
        setShowcase(
          popular.results[Math.floor(Math.random() * popular.results.length)]
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <section className='relative w-full h-[70vh] overflow-hidden'>
        <img
          src={showcase?.image}
          alt={showcase?.title}
          className='w-full h-full object-cover blur-sm'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent' />
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='text-center text-white'>
            <h2 className='text-lg md:text-xl lg:text-2xl font-bold text-white py-2'>
              <span className='text-lg md:text-xl lg:text-2xl'>
                New Episode Available
              </span>
            </h2>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold'>
              {showcase?.title}
            </h1>
            <p className='text-lg md:text-xl lg:text-2xl'>
              Episode {showcase?.episodeNumber}
            </p>
            <Link to={`/anime/${showcase?.id}/${showcase?.episodeId}`}>
              <Button className='mt-4' variant='secondary' size='lg'>
                Watch Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className='py-12 md:py-20'>
        <div className='container'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>Popular Shows</h2>
          <div className='flex items-center justify-center'>
            <Carousel
              opts={{
                align: "start",
              }}
              className='w-full max-w-[200px] md:max-w-xl lg:max-w-3xl xl:max-w-6xl'
            >
              <CarouselContent>
                {popular &&
                  popular.map((anime) => (
                    <CarouselItem
                      key={anime.id}
                      className='md:basis-1/2 lg:basis-1/3'
                    >
                      <Link to={`/anime/${anime.id}`} className='p-1'>
                        <Card
                          key={anime.id}
                          className='rounded-lg overflow-hidden'
                        >
                          <img
                            src={anime.image}
                            width={400}
                            height={225}
                            alt={anime.title}
                            className='w-full h-[225px] object-cover'
                          />
                          <CardContent className='p-4'>
                            <h3 className='text-lg font-bold'>{anime.title}</h3>
                            {anime.genres && (
                              <div className='flex items-center flex-wrap gap-y-2 text-muted-foreground text-sm my-2'>
                                {anime.genres.map((genre) => (
                                  <Badge
                                    variant='outline'
                                    key={genre}
                                    className='mr-2'
                                  >
                                    {genre}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            <div className='flex justify-between items-center text-muted-foreground text-sm'>
                              <div className='flex items-center'>
                                <FlameIcon className='w-4 h-4 mr-1 text-orange-400' />
                                <span>Episode {anime.episodeNumber}</span>
                              </div>
                              <Link
                                to={`/anime/${anime.id}/${anime.episodeId}`}
                              >
                                <span className='ml-2 text-blue-500'>
                                  Watch Now
                                </span>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}
