'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { fetchProfiles } from '@/services/profileService';
import '../styles/globals.min.css';

import { HeroSection } from "./_ui/hero-section";
import { RecentStories } from "./_ui/recent-stories";
import { FeaturedAds } from "./_ui/featured-ads";
import { MapSection } from "./_ui/map-section";
import { NewestAdds } from "./_ui/newest-add";
import { Statistics } from "./_ui/statistics";
import { PublishAdBanner } from "./_ui/publish-ad-banner";

// import {useTranslation} from "react-i18next";
import { useLanguage } from '../context/LanguageContext'; // Importe o contexto de idioma
import { useTranslation } from 'react-i18next';
import { Profile } from '@/types';

const CarouselG = dynamic(() => import('@/app/_ui/carosel'), { ssr: false });
const InfoCard = dynamic(() => import('@/components/ui/info-card'), {
  ssr: false,
});
const LastAnnounce = dynamic(() => import('@/app/_ui/last-announce'), {
  ssr: false,
});
const MainCard = dynamic(() => import('@/components/ui/main-card'), {
  ssr: false,
});



async function fetchCoordinates(
  address: string
): Promise<{ latitude: number; longitude: number }> {
  if (!address || address.trim() === '') {
    console.error('Adresse invalide :', address);
    return { latitude: 0, longitude: 0 };
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=VOTRE_API_KEY`
    );
    const data = await response.json();

    if (data.results && data.results[0]) {
      const location = data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    } else {
      console.error("Aucun résultat trouvé pour l'adresse :", address);
      return { latitude: 0, longitude: 0 };
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des coordonnées :', error);
    return { latitude: 0, longitude: 0 };
  }
}

const Dashboard: React.FC = () => {
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showMaiores, setShowMaiores] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [darkMode, setDarkMode] = useState(false);

  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    async function fetchData() {
      try {
        const combinedProfiles = await fetchProfiles();

        const profilesWithCoordinates = await Promise.all(
          combinedProfiles.map(async (profile: Profile) => {
            if (profile.latitude && profile.longitude) {
              return profile;
            }

            if (profile.adress && profile.adress.trim() !== '') {
              const coordinates = await fetchCoordinates(profile.adress);
              return {
                ...profile,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              };
            } else {
              console.warn(`Adresse invalide pour le profil ${profile.nome}`);
              return profile;
            }
          })
        );

        const sortedProfiles = profilesWithCoordinates.sort(
          (a, b) =>
            new Date(b.tagtimestamp ?? 0).getTime() -
            new Date(a.tagtimestamp ?? 0).getTime()
        );

        setProfiles(sortedProfiles);
      } catch (error) {
        console.error('Erreur lors de la récupération des profils :', error);
      }
    }

    fetchData();
  }, []);

  const handleCloseMaiores = () => {
    setShowMaiores(false);
    localStorage.setItem('hasVisitedDashboard', 'true');
  };

  return (
    // <div className="text-gray-600 w-full overflow-x-hidden">
    //   <Head>
    //     <title>{t('dashboard.escort_title_pt')}</title>
    //     <meta
    //       name="description"
    //       content="Descubra as melhores acompanhantes e massagistas eróticas em Portugal. Explore os nossos anúncios em destaque e as novidades."
    //     />
    //     <meta
    //       name="keywords"
    //       content="Acompanhantes, Acompanhantes Luxo, Escort, Escort Portugal, Escort Lisboa, Escort Porto, Escort Faro, Escort Lisboa, Acompanhantes, Anuncios Eróticos , massagistas Eróticas, anúncios, Portugal, serviços"
    //     />
    //     <meta name="author" content="Xgirl" />
    //     <meta
    //       property="og:title"
    //       content="Acompanhantes de luxo e Escort Eróticas em Portugal"
    //     />
    //     <meta
    //       property="og:description"
    //       content="Encontre as melhores acompanhantes e massagistas eróticas em Portugal. Consulte os nossos anúncios e as novidades."
    //     />
    //     <meta property="og:type" content="website" />
    //     <meta property="og:url" content="https://xgirl.pt" />
    //     <meta property="og:image" content="/public/photos/logo.webp" />
    //   </Head>

    //   <div className="w-full pt-[100px]">
    //     {profiles && profiles.length > 0 && <CarouselG profiles={profiles} />}
    //   </div>

    //   <div className="w-full px-4 sm:px-8 md:px-36 lg:px-36 xl:px-36 max-w-full">
    //     <MainCard
    //       profiles={profiles}
    //       currentPage={currentPage}
    //       itemsPerPage={itemsPerPage}
    //     />
    //   </div>

    //   <p className="text-pink-800 text-2xl flex justify-center pb-5 w-full h-[50px]">
    //     {t('dashboard.search_area')}
    //   </p>

    //   {/* <Map profiles={profiles} /> */}

    //   <div className="mx-36">
    //     <InfoCard />
    //   </div>

    //   {/* <div className='w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full'>
		// 		<p className='text-white text-3xl flex'>{t("dashboard.news")} </p>
		// 	</div> */}

    //   <div className="w-full px-4 sm:px-8 md:px-36 lg:px-36 xl:px-36 max-w-full">
    //     <LastAnnounce
    //       profiles={profiles}
    //       currentPage={currentPage}
    //       itemsPerPage={itemsPerPage}
    //     />
    //   </div>
    // </div>

    	<main className="bg-[#f2ebee] dark:bg-[#100007] container mx-auto relative mt-10">
      <div
        className="absolute rounded-full z-30 bg-[#f2cadb] dark:bg-[#2e0415]"
        style={{
          height: '300px',
          width: '300px',
          borderRadius: '200px',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-45deg)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
      <HeroSection profiles={profiles as Profile[]} />
      <RecentStories />
      <FeaturedAds />
      <MapSection />
      <NewestAdds />
      <Statistics />
      <PublishAdBanner />
    </main>
  );
};

export default Dashboard;
