import { useAnime } from "@/lib/zustand";
import { Command } from "cmdk";
import { FormEvent, useEffect, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Link } from "@tanstack/react-router";
import { Languages, Loader } from "lucide-react";
import { AnimeSearchResponse } from "@/models/anime";

interface CommandPalleteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const CommandPallete = ({
  open,
  setOpen,
  loading,
  setLoading,
}: CommandPalleteProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [searchResults, setSearchResults] =
    useState<AnimeSearchResponse | null>(null);
  const [renderKey, setRenderKey] = useState(0);
  const { search, fetchSearch, cleanSearch } = useAnime();

  useEffect(() => {}, [renderKey]);

  useEffect(() => {
    if (search) {
      const response = search as AnimeSearchResponse;
      setSearchResults(response);
      console.log("Search results updated:", response);
    } else {
      setSearchResults(null);
    }
  }, [search]);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.length < 1) {
      setSearchQuery("");
      setLoading(false);
      return;
    }

    setSearchQuery(searchQuery);
    setLoading(true);
    setSearchResults(null);

    await fetchSearch(searchQuery);
    setLoading(false);
    setRenderKey((prev) => prev + 1);
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const searchQuery = event.currentTarget.value;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (searchQuery.length < 1) {
      cleanSearch();
      return;
    }

    setTypingTimeout(
      setTimeout(() => {
        handleSearch(searchQuery);
      }, 800)
    );
  };

  return (
    <Command.Dialog
      key={renderKey}
      open={open}
      onOpenChange={setOpen}
      className='
            z-10
            w-full
            max-w-xl
            bg-muted/90
            rounded-lg
            shadow-lg
            p-4
            absolute
            top-16
            left-0
            right-0
            mx-auto
            inset-x-0
          '
    >
      <Command.Input
        className='
              w-full
              p-2
              border
              border-muted-foreground
              bg-muted
              rounded-lg
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:border-transparent
              text-muted-foreground
      '
        placeholder='Search an anime…'
        onChangeCapture={(e) => handleInputChange(e)}
      />
      <Command.List>
        {loading && !searchResults && (
          <Command.Loading className='py-4 flex flex-col gap-4 items-center justify-center w-full'>
            <div
              className='flex flex-col gap-2 items-center justify-center'
              style={{ width: "100%" }}
            >
              <p className='text-black dark:text-white'>
                Searching for "{searchQuery}"
              </p>
              <Loader className='w-8 h-8 animate-spin text-center' />
            </div>
          </Command.Loading>
        )}

        {searchResults && (
          <Command.Group className='py-4'>
            <ScrollArea className='w-full h-96 bg-muted p-2 rounded-md'>
              {searchResults.results.map((result) => (
                <Link
                  key={result.id}
                  to={`/anime/${result.id}`}
                  onClick={() => setOpen(false)}
                  className='flex items-center gap-4 p-2 hover:bg-muted-foreground/90 rounded-lg'
                >
                  <img
                    src={result.image}
                    alt={result.title}
                    width={50}
                    height={75}
                    className='rounded-lg object-cover'
                  />
                  <div>
                    <h3 className='text-lg font-semibold'>{result.title}</h3>
                    <p className='text-xs'>{result.releaseDate || ""}</p>
                    <p className='text-xs flex gap-1 items-center'>
                      <Languages className='h-3 w-3' /> {result.subOrDub || ""}
                    </p>
                  </div>
                </Link>
              ))}
            </ScrollArea>
          </Command.Group>
        )}
      </Command.List>
    </Command.Dialog>
  );
};
