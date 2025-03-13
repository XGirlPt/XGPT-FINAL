'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { fetchProfiles } from '@/backend/services/profileService';
import '../styles/globals.min.css';

import { HeroSection } from './_ui/hero-section';
import { RecentStories } from './_ui/recent-stories';

import FeaturedAds from './_ui/featured-ads';

import { MapSection } from './_ui/map-section';
import NewestAdds from './_ui/newest-add';
import { Statistics } from './_ui/statistics';
import { PublishAdBanner } from './_ui/publish-ad-banner';

// import {useTranslation} from "react-i18next";
import { useLanguage } from '../backend/context/LanguageContext'; // Importe o contexto de idioma
import { useTranslation } from 'react-i18next';
import type { Profile } from '@/backend/types/index';


async function fetchCoordinates(
  address: string
): Promise<{ latitude: number; longitude: number }> {
  const defaultCoords = { latitude: 0, longitude: 0 };

  try {
    // Input validation
    if (!address || address.trim() === '') {
      console.warn('Invalid address provided');
      return defaultCoords;
    }

    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!API_KEY) {
      console.warn('Google Maps API key is not configured');
      return defaultCoords;
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );

    if (!response.ok) {
      console.warn(`HTTP error! status: ${response.status}`);
      return defaultCoords;
    }

    const data = await response.json();

    // Handle all possible API response statuses
    switch (data.status) {
      case 'OK':
        if (data.results?.[0]?.geometry?.location) {
          const location = data.results[0].geometry.location;
          return { latitude: location.lat, longitude: location.lng };
        }
        console.warn('Invalid response structure from API');
        break;

      case 'ZERO_RESULTS':
        console.warn(`No results found for address: ${address}`);
        break;

      case 'REQUEST_DENIED':
        console.warn('API request denied. Please check API key configuration');
        break;

      case 'OVER_QUERY_LIMIT':
        console.warn('API query limit exceeded');
        break;

      case 'INVALID_REQUEST':
        console.warn('Invalid request parameters');
        break;

      default:
        console.warn(`Unexpected API status: ${data.status}`);
        if (data.error_message) {
          console.warn('API error details:', data.error_message);
        }
    }

    return defaultCoords;
  } catch (error) {
    console.warn('Error in fetchCoordinates:', error);
    return defaultCoords;
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
    console.log('useEffect');
    console.log('API_KEY:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
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

  const mapProfiles = profiles.map((profile) => ({
    id: profile.id,
    nome: profile.nome,
    photos: profile.photos,
    cidade: profile.cidade,
    latitude: profile.latitude,
    longitude: profile.longitude,
  }));

  return (
  

    <main className="bg-[#f2ebee] dark:bg-[#100007] container mx-auto relative mt-6">
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
      <FeaturedAds profiles={profiles} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      {/* <MapSection profxiles={mapProfiles} /> */}
      <NewestAdds  profiles={profiles as Profile[]}/>
      <Statistics />
      <PublishAdBanner />
    </main>
  );
};

export default Dashboard;
