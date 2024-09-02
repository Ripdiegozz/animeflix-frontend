import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Anime } from "@/models/anime";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export const Route = createLazyFileRoute("/watchlist")({
  component: WatchList,
});

function WatchList() {
  const [watchlist, setWatchlist] = useState<Anime[]>(() => {
    const watchlist = window.localStorage.getItem("watchlist");
    if (watchlist) {
      return JSON.parse(watchlist);
    }
    return [];
  });

  const removeFromWatchlist = (id: string) => {
    setWatchlist(watchlist.filter((anime) => anime.id !== id));

    window.localStorage.setItem(
      "watchlist",
      JSON.stringify(watchlist.filter((anime) => anime.id !== id))
    );
  };

  return (
    <div className='container mx-auto p-4'>
      <Card className='w-full max-w-4xl mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl'>My Watchlist</CardTitle>
          <CardDescription>
            You have {watchlist.length} anime in your watchlist
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className='h-[600px] w-full rounded-md border p-4'>
            {watchlist.map((anime) => (
              <Card key={anime.id} className='mb-4'>
                <CardContent className='p-4'>
                  <div className='flex items-start space-x-4'>
                    <img
                      src={anime.image}
                      alt={anime.title}
                      width={100}
                      height={150}
                      className='rounded-md object-cover'
                    />
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold'>{anime.title}</h3>
                      <p className='text-sm text-muted-foreground'>
                        Episodes: {anime.totalEpisodes}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Status: {anime.status}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Date: {anime.releaseDate}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Type: {anime.type}
                      </p>
                      <p className='text-sm text-muted-foreground py-2'>
                        {anime.genres?.map((genre) => (
                          <Badge key={genre} className='mr-2'>
                            {genre}
                          </Badge>
                        ))}
                      </p>
                    </div>
                    <div className='flex flex-col space-y-2'>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Link to={`/anime/${anime.id}`}>
                              <Button
                                variant='outline'
                                size='icon'
                                className='w-8 h-8'
                              >
                                <Eye className='h-4 w-4' />
                                <span className='sr-only'>View Details</span>
                              </Button>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side='left'>
                            <p>View details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              variant='outline'
                              size='icon'
                              className='w-8 h-8'
                              onClick={() => removeFromWatchlist(anime.id)}
                            >
                              <Trash2 className='h-4 w-4' />
                              <span className='sr-only'>
                                Remove from Watchlist
                              </span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side='left'>
                            <p>Remove from Watchlist</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {watchlist.length === 0 && (
              <p className='text-lg text-muted-foreground text-center'>
                Your watchlist is empty
              </p>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <p className='text-sm text-muted-foreground'>
            Manage your anime watchlist and keep track of what you want to watch
            next.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
