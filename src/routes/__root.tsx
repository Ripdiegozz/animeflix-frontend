import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CommandPallete } from "@/components/cmdk";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Footer } from "@/components/footer";

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <hr />
      <Outlet />
      <Footer />
      <TanStackRouterDevtools />
    </>
  ),
});

function Header() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className='p-2 flex gap-2 w-full'>
        <header className='bg-muted rounded-md px-4 py-3 flex items-center justify-between w-full'>
          <Link href='/' className='flex items-center gap-2'>
            <Button variant='ghost'>
              <span className='text-lg font-semibold'>🦊 Animeflix</span>
            </Button>
          </Link>
          <nav className='hidden sm:flex items-center gap-4'>
            <Link
              to='/'
              className='text-muted-foreground hover:text-foreground'
            >
              Home
            </Link>
            <Link
              to='/discover'
              className='text-muted-foreground hover:text-foreground'
            >
              Discover
            </Link>
            <Link
              to='/watchlist'
              className='text-muted-foreground hover:text-foreground'
            >
              Watchlist
            </Link>
          </nav>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              className='rounded-full felx gap-2 items-center'
              onClick={() => setOpen(true)}
            >
              <SearchIcon className='w-5 h-5' />
              Search
            </Button>
            <ModeToggle />
          </div>
          <CommandPallete
            open={open}
            setOpen={setOpen}
            loading={loading}
            setLoading={setLoading}
          />
        </header>
      </div>
    </>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
