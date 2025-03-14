'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { HeroImageContainer } from './hero-image-container';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale'; // Importando o locale português
import { MdFiberManualRecord } from 'react-icons/md'; // Ícone de "Live"
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../backend/context/LanguageContext'; 
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

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
  stories: string[];
  tag: string;
  tagtimestamp: string;
  certificado: boolean;
  live: boolean | string;
  premium: boolean | string;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const timeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true, locale: pt });
};

export function HeroSection({ profiles }: { profiles: Profile[] }) {
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage();

  return (
    <section className="relative py-8 md:px-4">
      {/* Main content */}
      <motion.div
        className="text-center"
        initial="initial"
        animate="animate"
        variants={staggerChildren}
      >
        <div className="relative">
          <motion.div className="mb-8" variants={fadeInUp}>
            <span className="bg-[#f1c0d3] text-pink-600 lg:px-4 lg:py-1 px-2 py-1 rounded-full text-xs font-medium">
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
            {t('dashboard.meta_description')}
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
              src={profiles[1]?.photos[0] || '/logo.webp'}
              alt="Profile picture"
            />
          </motion.div>

          <Link href={`/escort/${profiles[0]?.nome}`} passHref>
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
                src={profiles[5]?.photos[0] || '/logo.webp'}
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
              src={profiles[3]?.photos[0] || '/logo.webp'}
              alt="Profile picture"
            />
          </motion.div>
        </div>

        {/* Profile Cards Carousel with animation */}
        <motion.div variants={fadeInUp} className="w-full pt-20 lg:pt-0">
          <div className="-mx-4 sm:-mx-8 lg:-mx-16 xl:-mx-36">
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
              <CarouselContent className="flex gap-4 pb-4">
                {profiles.map((profile, index) => (
                  Array.isArray(profile.photos) && profile.photos.length > 0 && profile.photos[0] && (
                    <CarouselItem key={index} className="basis-1/2 md:basis-1/6">
                      <Link href={`/escort/${profile.nome}`} passHref>
                        <motion.div
                          variants={cardVariants}
                          whileHover={{
                            scale: 1.03,
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.98 }}
                          className="relative bg-pink-100 dark:bg-[#300d1b] rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all hover:shadow-2xl flex flex-col w-[200px] md:w-[220px] h-[340px]"
                        >
                          {/* Foto de perfil com Nome e Localidade sobrepostos */}
                          <motion.div className="relative w-full h-[65%] rounded-xl overflow-hidden">
                            <Image
                              src={profile.photos[0]}
                              alt={profile.nome}
                              fill
                              className="object-cover w-full h-full"
                            />
                            {/* Premium Badge */}
                            {profile.premium && (
                              <div className="absolute top-2 right-2 bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 flex items-center shadow-md">
                                <FaCrown className="text-white mr-1" />
                                <span className="text-xs">Premium</span>
                              </div>
                            )}
                            {/* Badges na imagem */}
                            {profile.live && (
                              <div className="absolute top-2 left-2 bg-red-700 text-white text-xs font-semibold py-1 px-2 rounded-full z-10 animate-pulse flex items-center">
                                <MdFiberManualRecord className="text-white mr-1" />
                                <span className="text-xs">Live Cam</span>
                              </div>
                            )}
                            {Array.isArray(profile.stories) && profile.stories.length > 0 && (
                              <div className="absolute top-10 right-2 md:right-3 bg-pink-800 text-white text-xs font-semibold py-1 px-2 rounded-full z-50 flex items-center">
                                <FaVideo className="text-white mr-1" />
                                <span className="text-xs">Stories</span>
                              </div>
                            )}
                            {/* Gradiente e Nome + Localidade */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                              <h3 className="text-base md:text-lg font-semibold text-white leading-tight flex items-center gap-1">
                                {profile.nome} {profile.certificado && <FaCheckCircle className="text-green-500" />}
                              </h3>
                              <div className="flex items-center gap-1 text-white text-sm">
                                <FaMapMarkerAlt className="text-pink-600" />
                                {profile.cidade}
                              </div>
                            </div>
                          </motion.div>

                          {/* Tag e Tempo */}
                          <div className="bg-pink-100 dark:bg-[#3a1a2a] text-gray-800 dark:text-gray-200 px-3 py-3 rounded-xl shadow-md mt-2 flex flex-col justify-between flex-1 min-h-[70px] relative">
                            <div className="flex items-start justify-between gap-2">
                              <span className="block break-words italic text-xs md:text-lg leading-tight max-h-[60px] overflow-hidden font-arial animate-flash">
                              &quot;{profile.tag}&quot;
                              </span>
                              <FaCommentDots className="text-yellow-600 text-md min-w-[18px] min-h-[18px] flex-shrink-0" />
                            </div>
                            <div className="text-xs font-arial text-black dark:text-gray-100 flex items-center gap-1 mt-2">
                              <FaClock className="text-yellow-500 h-4 w-4 font-normal" />
                              {timeAgo(profile.tagtimestamp)}
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </CarouselItem>
                  )
                ))}
              </CarouselContent>

              {/* Custom navigation buttons */}
              <div className="flex justify-center gap-2 mt-2">
                <CarouselPrevious className="static flex translate-x-0 bg-white text-pink-600 dark:text-white dark:bg-black dark-text-white translate-y-0 position-static w-10 h-10 rounded-full" />
                <CarouselNext className="static flex translate-x-0 bg-pink-600 hover:bg-pink-700 text-white translate-y-0 position-static w-10 h-10 rounded-full" />
              </div>
            </Carousel>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}