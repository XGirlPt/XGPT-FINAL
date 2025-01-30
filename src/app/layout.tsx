import { Inter } from 'next/font/google';
import ReduxProvider from '@/provider/ReduxProvider';
import { Metadata } from 'next';
import { NextUIProvider } from '@nextui-org/react';
import 'normalize.css'; // Charge normalize.css
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import '../i18n/i18n';
// Importar o NextUIProvider
import { MainProvider } from '@/provider/MainProvider';
import { ThemeProvider } from 'next-themes'; // Adicione o ThemeProvider para alternância de temas

const inter = Inter({ subsets: ['latin'] });

// Métadonnées pour SEO
export const metadata: Metadata = {
  title:
    'XGirl - Anúncios Eróticos, Acompanhantes e Escorts de Luxo em Portugal',
  description:
    'Descubra os melhores anúncios eróticos em Portugal com XGirl. Explore uma ampla gama de serviços eróticos e encontre as melhores escorts e acompanhantes de luxo em Portugal.',
  authors: [{ name: 'XGirl' }],
  keywords:
    'Anúncios eróticos Portugal, acompanhantes, Escorts, serviços eróticos, anúncios adultos, X-Girl',
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    siteName: 'XGirl',
    title: 'XGirl - Anúncios Eróticos, Escorts e Acompanhantes em Portugal',
    description:
      'Bem-vindo ao XGirl, a sua principal fonte para os melhores anúncios eróticos, escorts e acompanhantes em Portugal. Explore uma ampla gama de serviços eróticos e encontre as melhores acompanhantes e escorts de luxo em Portugal.',
    images: [
      {
        url: '/logoxg.png',
        alt: 'Logo XGirl',
      },
    ],
    url: 'https://www.xgirl.pt/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XGirl - Anúncios Eróticos, Escorts e Acompanhantes em Portugal',
    description:
      'Descubra os melhores anúncios eróticos em Portugal com XGirl. Explore uma ampla gama de serviços eróticos e encontre as melhores escorts e acompanhantes de luxo em Portugal.',
    images: ['/logoxg.png'],
  },
  metadataBase: new URL('https://www.xgirl.pt/'), // URL base
};

// Composant racine
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <head>
        <title>
          XGirl - Anúncios Eróticos, Escorts e Acompanhantes em Portugal
        </title>
        <meta
          name="description"
          content="Descubra os melhores anúncios eróticos em Portugal com XGirl. Explore uma ampla gama de serviços eróticos e encontre as melhores escorts e acompanhantes de luxo em Portugal."
        />
        <meta name="author" content="XGirl" />
        <meta
          name="keywords"
          content="Acompanhantes, Acompanhantes Portugal, Acompanhantes Lisboa, Acompanhantes Porto, Acompanhantes Faro, Acompanhantes Madeira,  Acompanhantes Luxo, Escort,  Escort Portugal, Escort Lisboa, Escort Porto, Escort Faro, Escort Lisboa, Acompanhantes, Anuncios Eróticos , Massagem Eróticas, anúncios, Portugal, "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="language" content="portuguese" />
        <meta name="robots" content="index, follow" />
        <meta name="copyright" content="Copyright © 2024 X-Girl" />
        <meta name="distribution" content="global" />
        <meta name="geo.region" content="PT" />
        <meta name="geo.placename" content="Portugal" />
        <link rel="icon" href="/logoxg.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logoxg.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logoxg.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logoxg.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content="/logoxg.png" />
        <meta property="og:image:alt" content="Logo XGirl" />
        <meta property="twitter:card" content="summary_large_image" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FGCZWRX0E3"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-FGCZWRX0E3');
      `,
          }}
        />
      </head>
      <body className={`${inter.className}  bg-gray-200 dark:bg-gray-900`}>
        <ReduxProvider>
          <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              {' '}
              {/* ThemeProvider */}
              <NextUIProvider>
                <MainProvider>{children}</MainProvider>
              </NextUIProvider>
            </ThemeProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
