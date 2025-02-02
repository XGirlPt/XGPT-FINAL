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
import { PlayCircle } from 'lucide-react'; // Ícone discreto de vídeo
import { fetchProfiles } from '@/services/profileService';

interface Profile {
  nome: string;
  photos: string[];
  cidade?: string;
  distrito?: string;
}

export function RecentStories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedProfiles: Profile[] = await fetchProfiles();
        setProfiles(fetchedProfiles);
        
        // Filtrando por distrito, se existir na URL
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
                    className="relative rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 border-[2.5px] border-pink-500 shadow-md transition-all duration-300"
                    whileHover={{
                      boxShadow: '0 0 25px rgba(243, 33, 118, 0.4)',
                    }}
                  >
                    <button onClick={() => router.push(`/escort/${profile.nome}`)}>
                      <Image
                        src={profile.photos[0]}
                        alt={profile.nome}
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </button>

                    {/* Ícone discreto de vídeo no canto inferior direito */}
                    <div className="absolute bottom-1 right-1 bg-black/60 p-1 rounded-full">
                      <PlayCircle size={16} className="text-white" />
                    </div>
                  </motion.div>

                  <motion.p className="text-lg md:text-xl mt-2 text-center">
                    {profile.nome}
                  </motion.p>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </motion.div>
  );
}
