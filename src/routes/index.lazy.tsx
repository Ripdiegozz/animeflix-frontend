import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { Card, CardContent } from "../components/ui/card";

export const Route = createLazyFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-muted px-4 py-3 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2">
          <PlayIcon className="w-6 h-6" />
          <span className="text-lg font-semibold">Streamly</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Movies
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            TV Shows
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground"
          >
            Live
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <SearchIcon className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <BellIcon className="w-5 h-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src="/placeholder.svg"
              width={32}
              height={32}
              alt="Avatar"
              className="rounded-full"
            />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </header>
      <section className="relative w-full h-[80vh] overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            <CarouselItem>
              <div className="relative w-full h-full">
                <img
                  src="/placeholder.svg"
                  width={1920}
                  height={1080}
                  alt="Latest Show"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col items-center justify-center text-white px-4 text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Stranger Things
                  </h1>
                  <p className="text-lg md:text-xl max-w-[700px] mb-8">
                    A small town in Indiana is turned upside down when a young
                    boy vanishes, and his friends, family, and local police set
                    out to find him. Meanwhile, a mysterious government agency
                    gets involved.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-3 text-lg"
                    >
                      Watch Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-3 text-lg"
                    >
                      More Info
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-full">
                <img
                  src="/placeholder.svg"
                  width={1920}
                  height={1080}
                  alt="Latest Show"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col items-center justify-center text-white px-4 text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    The Last of Us
                  </h1>
                  <p className="text-lg md:text-xl max-w-[700px] mb-8">
                    In a post-apocalyptic world where a fungal infection has
                    taken over, a hardened survivor is hired to smuggle a young
                    girl out of an oppressive quarantine zone.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-3 text-lg"
                    >
                      Watch Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-3 text-lg"
                    >
                      More Info
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative w-full h-full">
                <img
                  src="/placeholder.svg"
                  width={1920}
                  height={1080}
                  alt="Latest Show"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col items-center justify-center text-white px-4 text-center">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    House of the Dragon
                  </h1>
                  <p className="text-lg md:text-xl max-w-[700px] mb-8">
                    The prequel series finds the Targaryen dynasty at the
                    absolute apex of its power, with more than 15 dragons under
                    their yoke. Most empires crumble from such heights.
                  </p>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="rounded-full px-8 py-3 text-lg"
                    >
                      Watch Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 py-3 text-lg"
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
      <section className="py-12 md:py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                width={400}
                height={225}
                alt="Featured Video"
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  The Shawshank Redemption
                </h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>142 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                width={400}
                height={225}
                alt="Featured Video"
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">Inception</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>148 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                width={400}
                height={225}
                alt="Featured Video"
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">The Dark Knight</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>152 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                width={400}
                height={225}
                alt="Featured Video"
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">Interstellar</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>169 min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Recommended for You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                width={400}
                height={225}
                alt="Recommended Video"
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  The Lord of the Rings: The Fellowship of the Ring
                </h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>178 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                width={400}
                height={225}
                alt="Recommended Video"
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">The Matrix</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>136 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                width={400}
                height={225}
                alt="Recommended Video"
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">Forrest Gump</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>142 min</span>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg overflow-hidden">
              <img
                src="/placeholder.svg"
                width={400}
                height={225}
                alt="Recommended Video"
                className="w-full h-[225px] object-cover"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2">The Godfather</h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <ClockIcon className="w-4 h-4 mr-1" />
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

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
