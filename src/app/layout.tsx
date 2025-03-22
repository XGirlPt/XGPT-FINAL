"use client";

import { Inter } from 'next/font/google';
import ReduxProvider from '@/provider/ReduxProvider';
import { NextUIProvider } from '@nextui-org/react';
import 'normalize.css';
import './globals.css';
import { LanguageProvider } from '@/backend/context/LanguageContext';
import { MainProvider } from '@/provider/MainProvider';
import { ThemeProvider } from 'next-themes';
import { interTight, mofugu } from '@/backend/lib/fonts';
import Script from 'next/script';
import "../backend/context/i18n/i18n";
import CookieConsent from '@/components/ui/CookieConsent';
import { useState, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState({ analytics: false });

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
      } catch (error) {
        if (savedConsent === "accepted") {
          const legacyConsent = { analytics: true };
          localStorage.setItem("cookieConsent", JSON.stringify(legacyConsent));
          setConsent(legacyConsent);
        } else if (savedConsent === "declined") {
          const legacyConsent = { analytics: false };
          localStorage.setItem("cookieConsent", JSON.stringify(legacyConsent));
          setConsent(legacyConsent);
        }
      }
    }
  }, []);

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
          content="Acompanhantes, Acompanhantes Portugal, Acompanhantes Lisboa, Acompanhantes Porto, Acompanhantes Faro, Acompanhantes Madeira, Acompanhantes Luxo, Escort, Escort Portugal, Escort Lisboa, Escort Porto, Escort Faro, Escort Lisboa, Acompanhantes, Anuncios Eróticos , Massagem Eróticas, anúncios, Portugal"
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
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_PT" />
        <meta property="og:site_name" content="XGirl" />
        <meta
          property="og:title"
          content="XGirl - Anúncios Eróticos, Escorts e Acompanhantes em Portugal"
        />
        <meta
          property="og:description"
          content="Bem-vindo ao XGirl, a sua principal fonte para os melhores anúncios eróticos, escorts e acompanhantes em Portugal. Explore uma ampla gama de serviços eróticos e encontre as melhores acompanhantes e escorts de luxo em Portugal."
        />
        <meta property="og:url" content="https://www.xgirl.pt/" />
        <meta property="og:image" content="/logoxg.png" />
        <meta property="og:image:alt" content="Logo XGirl" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="XGirl - Anúncios Eróticos, Escorts e Acompanhantes em Portugal"
        />
        <meta
          name="twitter:description"
          content="Descubra os melhores anúncios eróticos em Portugal com XGirl. Explore uma ampla gama de serviços eróticos e encontre as melhores escorts e acompanhantes de luxo em Portugal."
        />
        <meta name="twitter:image" content="/logoxg.png" />
      </head>
      <body
        className={`${mofugu.variable} ${interTight.variable} bg-[#f2ebee] dark:bg-[#100007]`}
      >
        {consent.analytics && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-FGCZWRX0E3"
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-FGCZWRX0E3', { 'cookie_flags': 'SameSite=None;Secure' });
                `,
              }}
            />
          </>
        )}

        <ReduxProvider>
          <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <NextUIProvider>
                <MainProvider>
                  {children}
                  <CookieConsent onConsentChange={setConsent} />
                </MainProvider>
              </NextUIProvider>
            </ThemeProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}