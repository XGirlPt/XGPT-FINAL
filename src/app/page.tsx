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

import  MapSection from './_ui/map-section';
import NewestAdds from './_ui/newest-add';
import { Statistics } from './_ui/statistics';
import { PublishAdBanner } from './_ui/publish-ad-banner';

// import {useTranslation} from "react-i18next";
import { useLanguage } from '../backend/context/LanguageContext'; // Importe o contexto de idioma
import { useTranslation } from 'react-i18next';
import type { Profile } from '@/backend/types/index';
import Maiores from "@/components/ui/maiores";

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
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showMaiores, setShowMaiores] = useState(true);


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

            if (profile.address && profile.address.trim() !== '') {
              const coordinates = await fetchCoordinates(profile.address);
              return {
                ...profile,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              };
            } else {
              console.warn(`addresse invalide pour le profil ${profile.nome}`);
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
    <>
    {showMaiores && <Maiores setShowMaiores={setShowMaiores} />}
    <main className="bg-[#f2ebee] dark:bg-[#100007] container mx-auto relative mt-6">
   
    <div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415] z-0"
          style={{
            height: "500px",
            width: "500px",
            borderRadius: "250px",
            top: "-100px",
            left: "-100px",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />
      <HeroSection profiles={profiles as Profile[]} />
      <RecentStories />
      <FeaturedAds    profiles={profiles} currentPage={1} itemsPerPage={10} onProfileClick={() => {}} />
      <MapSection profiles={profiles} />
      <NewestAdds  profiles={profiles as Profile[]}/>
      <Statistics />
      <PublishAdBanner />
    </main>
    <div
          className="absolute rounded-full bg-[#f2cadb] dark:bg-[#2e0415]"
          style={{
            height: "400px",
            width: "400px",
            borderRadius: "200px",
            bottom: "-100px",
            right: "-100px",
            filter: "blur(80px)",
            zIndex: 0,
          }}
        />
    </>
  );
};

export default Dashboard;
