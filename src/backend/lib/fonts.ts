import localFont from 'next/font/local';
import { Inter_Tight } from 'next/font/google';

export const mofugu = localFont({
  src: '../../../public/fonts/mofugu.otf',
  variable: '--font-mofugu',
  display: 'swap',
});

export const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});
