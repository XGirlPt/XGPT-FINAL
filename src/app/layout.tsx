import {Inter} from "next/font/google";
import ReduxProvider from "@/provider/ReduxProvider";
import {Metadata} from "next";
import {NextUIProvider} from "@nextui-org/react";
import "normalize.css"; // Charge normalize.css
import "./globals.css";
import {LanguageProvider} from "@/context/LanguageContext";
import "../i18n/i18n";
// Importar o NextUIProvider
import {MainProvider} from "@/provider/MainProvider";
import {ThemeProvider} from "next-themes"; // Adicione o ThemeProvider para alternância de temas


const inter = Inter({subsets: ["latin"]});

// Métadonnées pour SEO
export const metadata: Metadata = {
	title: "XGirl - Annonces Érotiques, Escortes et Accompagnatrices de Luxe en France",
	description:
		"Découvrez les meilleures annonces érotiques en France avec XGirl. Explorez une large gamme de services érotiques et trouvez les meilleures escortes et accompagnatrices de luxe en France.",
	authors: [{name: "XGirl"}],
	keywords: "Annonces érotiques France, accompagnatrices, Escortes, services érotiques, annonces adultes, X-Girl",
	openGraph: {
		type: "website",
		locale: "fr_FR",
		siteName: "XGirl",
		title: "XGirl - Annonces Érotiques, Escortes et Accompagnatrices en France",
		description:
			"Bienvenue sur XGirl, votre principale source pour les meilleures annonces érotiques, escortes et accompagnatrices en France. Explorez une large gamme de services érotiques et trouvez les meilleures accompagnatrices et escortes de luxe en France.",
		images: [
			{
				url: "/logoxg.png",
				alt: "Logo XGirl",
			},
		],
		url: "https://www.xgirl.fr/",
	},
	twitter: {
		card: "summary_large_image",
		title: "XGirl - Annonces Érotiques, Escortes et Accompagnatrices en France",
		description:
			"Découvrez les meilleures annonces érotiques en France avec XGirl. Explorez une large gamme de services érotiques et trouvez les meilleures escortes et accompagnatrices de luxe en France.",
		images: ["/logoxg.png"],
	},
	metadataBase: new URL("https://www.xgirl.fr/"), // Base URL
};

// Composant racine
export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang='fr'>
			<head>
				<title>XGirl - Annonces Érotiques, Escortes et Accompagnatrices de Luxe en France</title>
				<meta
					name='description'
					content='Découvrez les meilleures annonces érotiques en France avec XGirl. Explorez une large gamme de services érotiques et trouvez les meilleures escortes et accompagnatrices de luxe en France.'
				/>
				<meta name='author' content='XGirl' />
				<meta name='keywords' content='Annonces érotiques France, accompagnatrices, Escortes, services érotiques, annonces adultes, X-Girl' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='language' content='French' />
				<meta name='robots' content='index, follow' />
				<meta name='copyright' content='Copyright © 2024 X-Girl' />
				<meta name='distribution' content='global' />
				<meta name='geo.region' content='FR' />
				<meta name='geo.placename' content='France' />
				<link rel='icon' href='/logoxg.png' />
				<link rel='apple-touch-icon' sizes='180x180' href='/logoxg.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/logoxg.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/logoxg.png' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta name='theme-color' content='#ffffff' />
				<meta property='og:image' content='/logoxg.png' />
				<meta property='og:image:alt' content='Logo XGirl' />
				<meta property='twitter:card' content='summary_large_image' />
			</head>
			<body className={`${inter.className}  bg-gray-200 dark:bg-gray-900`}>
        <ReduxProvider>
          <LanguageProvider>
            <ThemeProvider attribute="class" defaultTheme="light"> {/* ThemeProvider */}
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
