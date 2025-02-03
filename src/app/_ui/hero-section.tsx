'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, Radio } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { HeroImageContainer } from './hero-image-container';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Autoplay from 'embla-carousel-autoplay';
import { Badge } from '@/components/ui/badge';
import { Profile } from '@/types';
import Link from 'next/link';
import { Anonymous_Pro } from 'next/font/google';
import { TbArrowDownSquare, TbMoodSad } from 'react-icons/tb';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

interface Profile {
  nome: string;
  cidade: string;
  photos: string[];
  stories: string[]; // Histórias
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
  live: boolean | string;
  // live pode ser booleano ou string
}

export function HeroSection({ profiles }: { profiles: Profile[] }) {
  return (
    <section className="relative py-8 px-4">
      {/* Small profile images on sides - can be implemented as floating decorations */}

      {/* Main content */}
      <motion.div
        className="text-center"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="relative">
          <motion.div className="mb-8" variants={fadeInUp}>
            <span className="bg-[#f1c0d3] text-darkpink lg:px-4 lg:py-1 px-2 py-1 rounded-full text-xs font-medium">
              BEST ESCORT SERVICES
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-5xl mb-2 text-gray-900 dark:text-white"
            variants={fadeInUp}
          >
            Escort Girls & Errotic
            <br />
            Masseures In Portugal
          </motion.h1>

          <motion.p
            className="text-xl font-body text-gray-600 dark:text-gray-300 mb-12"
            variants={fadeInUp}
          >
            Discover the finest escort girls and skilled erotic masseuses in
            Portugal.
          </motion.p>

          {/* Floating corner images */}
          <motion.div
            className="absolute -top-10 lg:top-0 left-0 lg:left-20"
            variants={floatingAnimation}
          >
            <HeroImageContainer
  src={profiles[0]?.photos[0] || '/logo.webp'}
  alt="Profile picture"
/>
          </motion.div>

          <motion.div
            className="absolute -top-10 lg:top-0 right-0 lg:right-20"
            variants={floatingAnimation}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              },
            }}
          >
            <HeroImageContainer
              src={profiles[1]?.photos[0]  || '/logo.webp'}
              alt="Profile picture"
            />
          </motion.div>

          <Link href={`/escort/${profiles.nome}`} passHref>

          <motion.div
            className="absolute -bottom-20 lg:bottom-0 left-0 lg:-left-10"
            variants={floatingAnimation}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              },
            }}
          >
            <HeroImageContainer
              src={profiles[2]?.photos[0]  || '/logo.webp'}
              alt="Profile picture"
            />
          </motion.div>
          </Link>


          <motion.div
            className="absolute -bottom-20 lg:bottom-0 right-0 lg:-right-10"
            variants={floatingAnimation}
            animate={{
              y: [0, -10, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5,
              },
            }}
          >
            <HeroImageContainer
              src={profiles[3]?.photos[0]  || '/logo.webp'}
              alt="Profile picture"
            />
          </motion.div>
        </div>

        {/* Profile Cards Carousel with animation */}
        <motion.div
          variants={fadeInUp}
          className="w-full max-w-5xl  pt-20 lg:pt-0"
        >
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="">
              {profiles.map((profile) => (
                <CarouselItem
                  key={profile.nome}
                  className="pl-2 md:pl-4 md:basis-1/6 basis-1/2 "
                >
                  <motion.div
                    className="overflow-hidden rounded-3xl"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <div className="aspect-square relative">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {profile.photos[0] && (
                          <Image
                            src={profile.photos[0] || '/logo.webp'}
                            alt={profile.nome}
                            width={400}
                            height={400}
                            className="object-cover aspect-square"
                          />
                        )}
                      </motion.div>
                      {/* Status indicators */}
                      <motion.div
                        className="absolute top-2 right-2 flex gap-1.5 font-body"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {profile.certificado && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                              <Badge
  className="bg-[#F1C40F] hover:bg-[#F1C40F]/90 dark:bg-[#F1C40F] dark:hover:bg-[#F1C40F] text-white border-none transition-all duration-300 hover:scale-110 transform text-xs hover:shadow-lg"
>
  <CheckCircle className="w-2.5 h-2.5 mr-1" />
  Premium
</Badge>

                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Premium</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {profile.stories?.length > 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                              <Badge
  variant="secondary"
  className="bg-[#8E44AD]  dark:bg-[#8E44AD] dark:hover:bg-[#8E44AD] text-white border-none transition-all duration-300 hover:scale-110 transform text-xxs hover:shadow-lg"
>
  <Image
    src="/icons/stories.png"
    alt="Stories"
    width={10}
    height={10}
    className="w-2.5 h-2.5 mr-1"
  />
  Stories
</Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Stories</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {profile.live && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                              <Badge
  variant="secondary"
  className="bg-[#E74C3C]/90 hover:bg-[#E74C3C] dark:bg-[#E74C3C]/90 dark:hover:bg-[#E74C3C] text-white border-none transition-all duration-300 hover:scale-110 transform text-xs hover:shadow-lg"
>
  <motion.span
    className="w-1 h-1 bg-white rounded-full mr-1"
    animate={{
      opacity: [1, 0.5, 1],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
  Live
</Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Live Cam</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </motion.div>
                      {/* Tag */}
                      {profile.tag && (
                        <motion.span
                          className="absolute bottom-2 left-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {profile.tag}
                        </motion.span>
                      )}
                    </div>
                    <motion.div
                      className="p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >


                      
                      <h3 className="font-bold text-xl mb-1">{profile.nome}</h3>
                      <p className="text-black text-sm flex items-center justify-center">
                        <Image
                          src="/icons/location.png"
                          alt="Location"
                          width={16}
                          height={16}
                        />
                        <span className="font-body text-sm dark:text-gray-300">
                          {' '}
                          {profile.cidade}
                        </span>
                      </p>
                    </motion.div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom navigation buttons */}
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static flex translate-x-0 translate-y-0 position-static w-8 h-8 rounded-full" />
              <CarouselNext className="static flex translate-x-0 translate-y-0 position-static w-8 h-8 rounded-full" />
            </div>
          </Carousel>
        </motion.div>
      </motion.div>
    </section>
  );
}



// 961552713 - Patricia silva 

 - renegociar 
 - taxa fixa 2 a 3 anos 
 - seguros todos 
 - 778€  - - - 