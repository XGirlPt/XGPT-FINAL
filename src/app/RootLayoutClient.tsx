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

export default function RootLayoutClient({
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
    <>
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
                <div
                  className={`${mofugu.variable} ${interTight.variable} bg-[#f2ebee] dark:bg-[#100007]`}
                >
                  {children}
                  <CookieConsent onConsentChange={setConsent} />
                </div>
              </MainProvider>
            </NextUIProvider>
          </ThemeProvider>
        </LanguageProvider>
      </ReduxProvider>
    </>
  );
}