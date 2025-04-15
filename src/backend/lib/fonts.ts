// src/backend/lib/fonts.ts

import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const mofugu = localFont({
  src: [
    {
      path: '../../../public/fonts/mofugu.otf', // Caminho relativo a backend/lib/      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-mofugu',
});
