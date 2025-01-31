'use client';

import * as React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Adds {
  name: string;
  image: string;
  location: string;
  timeAgo: string;
}

const adds: Adds[] = [
  {
    name: 'Olivia Austin',
    image: '/models/adds/1.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
  },
  {
    name: 'Jada Fire',
    image: '/models/adds/2.png',
    location: 'Vagos',
    timeAgo: '6 hours ago',
  },
  {
    name: 'Eva Angelina',
    image: '/models/adds/3.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
  },
  {
    name: 'Abella Danger',
    image: '/models/adds/4.png',
    location: 'Vagos',
    timeAgo: '6 hours ago',
  },
  {
    name: 'Eva Elite',
    image: '/models/adds/1.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
  },
  {
    name: 'Olivia Austin',
    image: '/models/adds/2.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
  },
  {
    name: 'Jada Fire',
    image: '/models/adds/3.png',
    location: 'Vagos',
    timeAgo: '6 hours ago',
  },
  {
    name: 'Eva Angelina',
    image: '/models/adds/4.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
  },
  {
    name: 'Abella Danger',
    image: '/models/adds/5.png',
    location: 'Vagos',
    timeAgo: '6 hours ago',
  },
  {
    name: 'Eva Elite',
    image: '/models/adds/1.png',
    location: 'Vagos',
    timeAgo: '5 hours ago',
  },
];

// Animation variants
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

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

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

export function NewestAdds() {
  return (
    <motion.div
      className="relative w-full px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={containerVariants}
    >
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full relative z-10"
      >
        <motion.div
          className="flex items-center justify-between mb-4"
          variants={titleVariants}
        >
          <h2 className="lg:text-5xl text-3xl">Newest Adds</h2>
          <div className="flex gap-2">
            <CarouselPrevious className="static h-8 w-8 border-none shadow-none hover:bg-transparent translate-y-0" />
            <CarouselNext className="static h-8 w-8 border-none shadow-none hover:bg-transparent translate-y-0" />
          </div>
        </motion.div>

        <div className="relative w-full">
          <CarouselContent className="-ml-2">
            {adds.map((add, index) => (
              <CarouselItem
                key={index}
                className=" basis-1/2 md:basis-1/5 gap-4"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="overflow-hidden bg-white dark:bg-[#1a0a10] rounded-4xl p-4"
                >
                  <motion.div
                    className="relative aspect-[4/4] rounded-4xl"
                    whileHover={{
                      scale: 1.03,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Image
                      src={add.image}
                      alt={add.name}
                      fill
                      className="object-cover rounded-4xl"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg md:text-2xl whitespace-nowrap">
                        {add.name}
                      </h3>
                      <div className="font-body flex items-center gap-1 text-sm md:text-base">
                        <Image
                          src="/icons/location.png"
                          alt="Location"
                          width={20}
                          height={20}
                        />
                        {add.location}
                      </div>
                    </div>
                    <div className="text-sm md:text-base text-gray-400 mt-1 flex items-center gap-1 font-body">
                      <Image
                        src="/icons/clock.png"
                        alt="Clock"
                        width={20}
                        height={20}
                      />
                      {add.timeAgo}
                    </div>
                  </motion.div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>

      <motion.div
        className="absolute rounded-l-full z-30 bg-[#f2cadb] dark:bg-[#2e0415] hidden md:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          height: '400px',
          width: '200px',
          top: '-100px',
          right: '0',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
    </motion.div>
  );
}
//
