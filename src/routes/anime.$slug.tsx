import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import axios from "@/lib/axios";
import { Anime } from "@/models/anime";
import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { Calendar, Clock, Languages } from "lucide-react";
import { useState } from "react";

const fetchAnime = async (slug: string) => {
  const { data } = await axios.get(`/api/v1/anime/${slug}`);
  console.log(JSON.parse(data));
  return JSON.parse(data);
};

export const Route = createFileRoute("/anime/$slug")({
  loader: async ({ params }) => {
    return fetchAnime(params.slug);
  },
  component: AnimePage,
});

function AnimePage() {
  const anime: Anime = useLoaderData({ from: "/anime/$slug" });
  const [watchList, setWatchList] = useState<Anime[]>(() => {
    const watchlist = window.localStorage.getItem("watchlist");
    if (watchlist) {
      return JSON.parse(watchlist);
    }
    return [];
  });
  const isOnWatchlist = watchList.find(
    (animeFromWl) => animeFromWl.id === anime.id
  );

  const handleAddToWatchlist = () => {
    if (watchList.find((animeFromWl) => animeFromWl.id === anime.id)) {
      const updatedWatchlist = watchList.filter(
        (animeFromWl) => animeFromWl.id !== anime.id
      );

      setWatchList(updatedWatchlist);
      window.localStorage.setItem(
        "watchlist",
        JSON.stringify(updatedWatchlist)
      );

      return;
    }

    const updatedWatchlist = [...watchList, anime];
    setWatchList(updatedWatchlist);
    window.localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className='container mx-auto p-4'>
      <Card className='w-full max-w-4xl mx-auto'>
        <CardHeader>
          <div className='flex flex-col md:flex-row gap-6'>
            <img
              src={anime.image}
              alt={anime.title}
              width={300}
              height={400}
              className='rounded-lg object-cover'
            />
            <div className='flex flex-col justify-between'>
              <div>
                <CardTitle className='text-3xl mb-2'>{anime.title}</CardTitle>
                <CardDescription className='text-lg mb-4'>
                  {/* Only show japanese name */}
                  {anime.otherName.split(",")[1]}
                </CardDescription>
                <div className='flex flex-wrap gap-2 mb-4'>
                  {anime.genres &&
                    anime.genres.map((genre) => (
                      <Badge key={genre} variant='secondary'>
                        {genre}
                      </Badge>
                    ))}
                </div>

                <Button
                  onClick={handleAddToWatchlist}
                  className='py-2'
                  variant={isOnWatchlist ? "destructive" : "default"}
                >
                  {isOnWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
                </Button>
              </div>
              <div className='flex items-center gap-4 mt-4'>
                <div className='flex items-center'>
                  <Clock className='w-5 h-5 mr-1' />
                  <span>{anime.totalEpisodes} episodes</span>
                </div>
                <div className='flex items-center'>
                  <Calendar className='w-5 h-5 mr-1' />
                  <span>{anime.status}</span>
                </div>
                <div className='flex items-center'>
                  <Languages className='w-5 h-5 mr-1' />
                  <span>{anime.subOrDub}</span>
                </div>
                <div className='flex items-center'>
                  <Calendar className='w-5 h-5 mr-1' />
                  <span>{anime.releaseDate}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className='text-lg font-semibold mb-2'>Synopsis</h3>
          <ScrollArea className='h-[200px] rounded-md border p-4'>
            <p className='text-sm text-muted-foreground'>{anime.description}</p>
          </ScrollArea>

          <Separator className='my-4' />

          <Accordion
            type='single'
            collapsible
            defaultValue='episodes'
            className='w-full'
          >
            <AccordionItem value='episodes'>
              <AccordionTrigger>Episodes List</AccordionTrigger>
              <AccordionContent>
                <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
                  <table className='w-full'>
                    <thead>
                      <tr>
                        <th className='text-left p-2'>Number</th>
                        <th className='text-left p-2'>Watch</th>
                      </tr>
                    </thead>
                    <tbody>
                      {anime.episodes.map((episode) => (
                        <tr key={episode.number} className='border-t'>
                          <td className='p-2'>Episode {episode.number}</td>
                          <td className='p-2'>
                            <Link to={`/anime/${anime.id}/${episode.id}`}>
                              <Button variant='default'>Open Episode</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <Separator />
        <CardFooter className='flex items-center justify-end py-4'>
          <p className='text-muted-foreground'>{anime.type}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
