import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='p-2 flex gap-2 w-full'>
        <header className='bg-muted px-4 py-3 flex items-center justify-between w-full'>
          <Link href='/' className='flex items-center gap-2'>
            <PlayIcon className='w-6 h-6' />
            <span className='text-lg font-semibold'>Animeflix</span>
          </Link>
          <nav className='hidden sm:flex items-center gap-4'>
            <Link
              to='/'
              className='text-muted-foreground hover:text-foreground'
            >
              Home
            </Link>
            <Link
              to='/about'
              className='text-muted-foreground hover:text-foreground'
            >
              Discover
            </Link>
            <Link
              to='/favorites'
              className='text-muted-foreground hover:text-foreground'
            >
              Favorites
            </Link>
          </nav>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <SearchIcon className='w-5 h-5' />
              <span className='sr-only'>Search</span>
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <BellIcon className='w-5 h-5' />
              <span className='sr-only'>Notifications</span>
            </Button>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <img
                src='/placeholder.svg'
                width={32}
                height={32}
                alt='Avatar'
                className='rounded-full'
              />
              <span className='sr-only'>Profile</span>
            </Button>
          </div>
        </header>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polygon points='6 3 20 12 6 21 6 3' />
    </svg>
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

function BellIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' />
      <path d='M10.3 21a1.94 1.94 0 0 0 3.4 0' />
    </svg>
  );
}
