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

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const { data } = await axios.get("/api/v1/anime/top");
        const popular = JSON.parse(data);
        setPopular(popular.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <section className='relative w-full h-[80vh] overflow-hidden'>
        <Carousel className='w-full h-full'>
          <CarouselContent>
            <CarouselItem>
              <div className='relative w-full h-full'>
                <img
                  src='/placeholder.svg'
                  width={1920}
                  height={1080}
                  alt='Latest Show'
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col items-center justify-center text-white px-4 text-center'>
                  <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                    Stranger Things
                  </h1>
                  <p className='text-lg md:text-xl max-w-[700px] mb-8'>
                    A small town in Indiana is turned upside down when a young
                    boy vanishes, and his friends, family, and local police set
                    out to find him. Meanwhile, a mysterious government agency
                    gets involved.
                  </p>
                  <div className='flex gap-4'>
                    <Button
                      size='lg'
                      className='rounded-full px-8 py-3 text-lg'
                    >
                      Watch Now
                    </Button>
                    <Button
                      variant='outline'
                      size='lg'
                      className='rounded-full px-8 py-3 text-lg'
                    >
                      More Info
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
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
                      <div className='p-1'>
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
                              <div className='flex items-center text-muted-foreground text-sm my-2'>
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
                            <div className='flex items-center text-muted-foreground text-sm'>
                              <FlameIcon className='w-4 h-4 mr-1 text-orange-400' />
                              <span>Episode {anime.episodeNumber}</span>
                              <Link to={`/anime/${anime.id}`}>
                                <span className='ml-2 text-blue-500'>
                                  Watch Now
                                </span>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>
      <section className='py-12 md:py-20 bg-muted'>
        <div className='container'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>
            Recommended for You
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            <Card className='rounded-lg overflow-hidden'>
              <img
                src='/placeholder.svg'
                width={400}
                height={225}
                alt='Recommended Video'
                className='w-full h-[225px] object-cover'
              />
              <CardContent className='p-4'>
                <h3 className='text-lg font-bold mb-2'>
                  The Lord of the Rings: The Fellowship of the Ring
                </h3>
                <div className='flex items-center text-muted-foreground text-sm'>
                  <ClockIcon className='w-4 h-4 mr-1' />
                  <span>178 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className='rounded-lg overflow-hidden'>
              <img
                src='/placeholder.svg'
                width={400}
                height={225}
                alt='Recommended Video'
                className='w-full h-[225px] object-cover'
              />
              <CardContent className='p-4'>
                <h3 className='text-lg font-bold mb-2'>The Matrix</h3>
                <div className='flex items-center text-muted-foreground text-sm'>
                  <ClockIcon className='w-4 h-4 mr-1' />
                  <span>136 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className='rounded-lg overflow-hidden'>
              <img
                src='/placeholder.svg'
                width={400}
                height={225}
                alt='Recommended Video'
                className='w-full h-[225px] object-cover'
              />
              <CardContent className='p-4'>
                <h3 className='text-lg font-bold mb-2'>Forrest Gump</h3>
                <div className='flex items-center text-muted-foreground text-sm'>
                  <ClockIcon className='w-4 h-4 mr-1' />
                  <span>142 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className='rounded-lg overflow-hidden'>
              <img
                src='/placeholder.svg'
                width={400}
                height={225}
                alt='Recommended Video'
                className='w-full h-[225px] object-cover'
              />
              <CardContent className='p-4'>
                <h3 className='text-lg font-bold mb-2'>The Godfather</h3>
                <div className='flex items-center text-muted-foreground text-sm'>
                  <ClockIcon className='w-4 h-4 mr-1' />
                  <span>175 min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  );
}
