'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Star, Video, Share2, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface Ad {
  name: string;
  image: string;
  location: string;
  timeAgo: string;
  message: string;
  isLive?: boolean;
  isPremium?: boolean;
  hasStories?: boolean;
}

const featuredAds: Ad[] = [
  {
    name: 'Abella Danger',
    image: '/models/adds/1.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
    message: 'Come have a dinner with me',
    isLive: true,
    isPremium: true,
    hasStories: true,
  },
  {
    name: 'Lana Taylor',
    image: '/models/adds/2.png',
    location: 'Vagos',
    timeAgo: '6 hours ago',
    message: 'Come have a dinner with me',
  },
  {
    name: 'Eva Elite',
    image: '/models/adds/3.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
    message: 'Come have a dinner with me',
    isLive: false,
    isPremium: true,
    hasStories: true,
  },
  {
    name: 'Abella Danger',
    image: '/models/adds/4.png',
    location: 'Vagos',
    timeAgo: '6 hours ago',
    message: 'Come have a dinner with me',
  },
  {
    name: 'Emily Wells',
    image: '/models/adds/5.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
    message: 'Come have a dinner with me',
    isLive: true,
    isPremium: false,
    hasStories: true,
  },
  {
    name: 'Mia Khalifa',
    image: '/models/adds/6.png',
    location: 'Vagos',
    timeAgo: '6 hours ago',
    message: 'Come have a dinner with me',
    isLive: false,
    isPremium: false,
    hasStories: false,
  },
  {
    name: 'Brandi Love',
    image: '/models/adds/7.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
    message: 'Come have a dinner with me',
  },
  {
    name: 'Lana Taylor',
    image: '/models/adds/8.png',
    location: 'Vagos',
    timeAgo: '6 hours ago',
    message: 'Come have a dinner with me',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
};

export function FeaturedAds() {
  return (
    <div className="p-4 mt-20 relative">
      <motion.div
        className="relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.div
          className="flex items-center justify-between mb-4"
          variants={itemVariants}
        >
          <h2 className="lg:text-5xl text-3xl">Featured Ads</h2>
          <Link
            href="/ads"
            className="text-sm text-white px-4 py-2 rounded-full bg-darkpink font-body hidden md:block"
          >
            View All
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {featuredAds.map((ad, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              className="overflow-hidden bg-white dark:bg-[#300d1b] rounded-4xl p-1 md:p-2 cursor-pointer relative"
            >
              <div className="relative aspect-[4/4] rounded-4xl">
                <Image
                  src={ad.image}
                  alt={ad.name}
                  fill
                  className="object-cover rounded-4xl"
                />
                <div className="absolute top-0 left-0 right-0 p-3 flex justify-end font-body">
                  <div className="flex flex-row gap-1.5 flex-wrap justify-end max-w-[80%]">
                    {ad.isLive && (
                      <motion.div variants={badgeVariants}>
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
                      </motion.div>
                    )}
                    {ad.isPremium && (
                      <motion.div variants={badgeVariants}>
                        <Badge
                          variant="secondary"
                          className="bg-[#F1C40F]/90 hover:bg-[#F1C40F] dark:bg-[#F1C40F]/90 dark:hover:bg-[#F1C40F] text-white border-none transition-all duration-300 hover:scale-110 transform text-xs hover:shadow-lg"
                        >
                          <Crown fill="white" className="w-2.5 h-2.5 mr-1" />
                          Premium
                        </Badge>
                      </motion.div>
                    )}
                    {ad.hasStories && (
                      <motion.div variants={badgeVariants}>
                        <Badge
                          variant="secondary"
                          className="bg-[#8E44AD]/90 hover:bg-[#8E44AD] dark:bg-[#8E44AD]/90 dark:hover:bg-[#8E44AD] text-white border-none transition-all duration-300 hover:scale-110 transform text-xs hover:shadow-lg"
                        >
                          <Video fill="white" className="w-2.5 h-2.5 mr-1" />
                          Stories
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
              <motion.div className="p-2" variants={itemVariants}>
                <div className="flex items-center justify-between">
                  <h3 className="lg:text-2xl text-lg whitespace-nowrap">
                    {ad.name}
                  </h3>
                  <div className="font-body flex items-center gap-1 text-sm sm:text-base">
                    {' '}
                    <Image
                      src="/icons/location.png"
                      alt="Location"
                      width={15}
                      height={15}
                    />{' '}
                    {ad.location}
                  </div>
                </div>
                <p className="text-lg mt-1 text-gray-700 dark:text-gray-300">
                  &quot;{ad.message}&quot;
                </p>
                <div className="text-xs md:text-sm text-gray-400 mt-1 flex items-center gap-1 font-body">
                  {' '}
                  <Image
                    src="/icons/clock.png"
                    alt="Clock"
                    width={20}
                    height={20}
                  />{' '}
                  {ad.timeAgo}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <Link
          href="/ads"
          className="text-sm text-white px-4 py-2 rounded-full bg-darkpink font-body block md:hidden mt-10 text-center"
        >
          View All
        </Link>
      </motion.div>
      <motion.div
        className="absolute rounded-full z-30 bg-[#f2cadb] dark:bg-[#2e0415]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          height: '400px',
          width: '400px',
          borderRadius: '200px',
          bottom: '-100px',
          left: '-100px',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
    </div>
  );
}
