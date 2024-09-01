import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactPlayer from "react-player/lazy";
import axios from "@/lib/axios";
import { Anime } from "@/models/anime";
import { EpisodeSources } from "@/models/episode";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";

const fetchEpisodeSources = async (slug: string) => {
  const { data } = await axios.get(
    `/api/v1/anime/episode/sources?episodeId=${slug}`
  );
  return JSON.parse(data);
};

const fetchAnime = async (slug: string) => {
  const { data } = await axios.get(`/api/v1/anime/${slug}`);
  return JSON.parse(data);
};

export const Route = createFileRoute("/anime/$slug/$episodeId")({
  loader: async ({ params }) => {
    const episodeSources = await fetchEpisodeSources(params.episodeId);
    const anime = await fetchAnime(params.slug);

    return {
      episodeSources,
      anime,
    };
  },
  component: AnimePlayer,
});

interface AnimeInfo {
  anime: Anime;
  episodeSources: EpisodeSources;
}

function AnimePlayer() {
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const animeInfo: AnimeInfo = useLoaderData({
    from: "/anime/$slug/$episodeId",
  });

  const handlePreviousEpisode = () => {
    setCurrentEpisode((prev) => Math.max(1, prev - 1));
  };

  const handleNextEpisode = () => {
    setCurrentEpisode((prev) =>
      Math.min(animeInfo.anime.totalEpisodes, prev + 1)
    );
  };

  return (
    <div className='container mx-auto p-4'>
      <Card className='w-full max-w-4xl mx-auto'>
        <CardHeader>
          <CardTitle>{animeInfo.anime.title}</CardTitle>
          <CardDescription>
            {/* Season {animeInfo.anime.} - Episode {currentEpisodeData.number}:{" "}
            {currentEpisodeData.title} */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='aspect-video bg-muted relative'>
            <ReactPlayer
              url={animeInfo.episodeSources.sources[0].url}
              controls
              width='100%'
              height='100%'
              className='absolute top-0 left-0'
            />
          </div>
          <div className='mt-4 flex justify-between items-center'>
            <Button
              variant='outline'
              onClick={handlePreviousEpisode}
              disabled={currentEpisode === 1}
            >
              <ChevronLeft className='mr-2 h-4 w-4' /> Previous
            </Button>
            <span>
              Episode {currentEpisode} / {animeInfo.anime.totalEpisodes}
            </span>
            <Button
              variant='outline'
              onClick={handleNextEpisode}
              disabled={currentEpisode === animeInfo.anime.totalEpisodes}
            >
              Next <ChevronRight className='ml-2 h-4 w-4' />
            </Button>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <div>
            <h3 className='text-lg font-semibold'>
              {/* {currentEpisodeData.title} */}
            </h3>
            <p className='text-sm text-muted-foreground'>
              {/* Duration: {currentEpisodeData.duration} */}
            </p>
          </div>
          <div className='flex space-x-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentEpisode(1)}
              disabled={currentEpisode === 1}
            >
              <SkipBack className='h-4 w-4' />
              <span className='sr-only'>First Episode</span>
            </Button>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentEpisode(animeInfo.anime.totalEpisodes)}
              disabled={currentEpisode === animeInfo.anime.totalEpisodes}
            >
              <SkipForward className='h-4 w-4' />
              <span className='sr-only'>Last Episode</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
