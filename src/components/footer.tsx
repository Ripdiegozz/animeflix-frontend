import { Facebook, Twitter, Instagram, Youtube, Github } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className='bg-background border-t'>
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>About Us</h3>
            <p className='text-sm text-muted-foreground'>
              Animeflix is your go-to platform for watching and tracking your
              favorite anime series and movies.
            </p>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/browse'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Browse Anime
                </Link>
              </li>
              <li>
                <Link
                  href='/watchlist'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  My Watchlist
                </Link>
              </li>
              <li>
                <Link
                  href='/profile'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div className='space-y-4'>
            <h3 className='text-lg font-semibold'>Help & Support</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/faq'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-muted'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-sm text-muted-foreground'>
              © 2024 Animeflix. All rights reserved.
            </p>
            <div className='flex space-x-4 mt-4 md:mt-0'>
              <Link
                href='https://facebook.com'
                className='text-muted-foreground hover:text-primary'
              >
                <Facebook className='h-5 w-5' />
                <span className='sr-only'>Facebook</span>
              </Link>
              <Link
                href='https://twitter.com'
                className='text-muted-foreground hover:text-primary'
              >
                <Twitter className='h-5 w-5' />
                <span className='sr-only'>Twitter</span>
              </Link>
              <Link
                href='https://instagram.com'
                className='text-muted-foreground hover:text-primary'
              >
                <Instagram className='h-5 w-5' />
                <span className='sr-only'>Instagram</span>
              </Link>
              <Link
                href='https://youtube.com'
                className='text-muted-foreground hover:text-primary'
              >
                <Youtube className='h-5 w-5' />
                <span className='sr-only'>YouTube</span>
              </Link>
              <Link
                href='https://github.com'
                className='text-muted-foreground hover:text-primary'
              >
                <Github className='h-5 w-5' />
                <span className='sr-only'>GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
