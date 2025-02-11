'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { fetchProfiles } from '@/services/profileService';
import StoryBigS from '../../app/stories/_ui/storyBigS';

interface Profile {
  nome: string;
  stories?: string[];
  cidade?: string;
  distrito?: string;
}

export function RecentStories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProfiles: Profile[] = await fetchProfiles();
        setProfiles(fetchedProfiles);

        const distrito = searchParams.get('distrito');
        const profilesToDisplay = distrito
          ? fetchedProfiles.filter((profile) => profile.distrito === distrito)
          : fetchedProfiles;
        setFilteredProfiles(profilesToDisplay);
      } catch (error) {
        console.error('Erro ao buscar perfis:', error);
      }
    }
    fetchData();
  }, [searchParams]);

  const openStory = (story: string, profile: Profile) => {
    setSelectedStory(story);
    setSelectedProfile(profile);
  };

  const closeStory = () => {
    setSelectedStory(null);
    setSelectedProfile(null);
  };

  return (
    <motion.div
      className="relative w-full px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Carousel
        opts={{ align: 'start', loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4 relative">
          <motion.h2 className="lg:text-5xl text-3xl font-semibold">
            Recent Stories
          </motion.h2>
          <div className="flex gap-2">
            <CarouselPrevious className="static h-8 w-8 border-none shadow-none" />
            <CarouselNext className="static h-8 w-8 border-none shadow-none" />
          </div>
        </div>

        <div className="relative w-full">
          <CarouselContent className="-ml-2 py-10">
            {filteredProfiles.map((profile, index) => (
              profile.stories && profile.stories.length > 0 ? (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                >
                  <motion.div
                    className="relative flex flex-col items-center"
                    whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="relative rounded-full overflow-hidden w-16 h-16 md:w-32 md:h-32 border-[3.5px] border-pink-500 shadow-md transition-all duration-300"
                      whileHover={{
                        boxShadow: '0 0 25px rgba(243, 33, 118, 0.4)',
                      }}
                    >
                      <button onClick={() => openStory(profile.stories[0], profile)}>
                        <video
                          src={profile.stories[0]}
                          className="object-cover w-full h-full"
                          autoPlay
                          loop
                          muted
                        />
                      </button>
                      <div className="absolute bottom-1 right-1 bg-black/60 p-1 rounded-full">
                        <PlayCircle size={16} className="text-white" />
                      </div>
                    </motion.div>

                    <motion.p className="text-lg md:text-xl mt-2 text-center">
                      {profile.nome}
                    </motion.p>
                  </motion.div>
                </CarouselItem>
              ) : null
            ))}
          </CarouselContent>
        </div>
      </Carousel>
      
      {selectedStory && selectedProfile && (
        <StoryBigS
          story={selectedStory}
          cidade={selectedProfile.cidade || ''}
          firstPhotos={selectedProfile.stories ? selectedProfile.stories[0] : ''}
          nome={selectedProfile.nome}
          onClose={closeStory}
          profiles={profiles}
        />
      )}
    </motion.div>
  );
}
