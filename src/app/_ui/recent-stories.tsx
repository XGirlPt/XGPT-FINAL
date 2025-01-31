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
import { useRouter } from 'next/navigation';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

interface Story {
  name: string;
  image: string;
}

const stories: Story[] = [
  { name: 'Olivia Austin', image: '/models/card/1.png' },
  { name: 'Jada Fire', image: '/models/card/2.png' },
  { name: 'Eva Angelina', image: '/models/card/3.png' },
  { name: 'Abella Danger', image: '/models/card/4.png' },
  { name: 'Eva Elite', image: '/models/card/1.png' },
  { name: 'Olivia Austin', image: '/models/card/2.png' },
  { name: 'Jada Fire', image: '/models/card/3.png' },
  { name: 'Eva Angelina', image: '/models/card/4.png' },
  { name: 'Abella Danger', image: '/models/card/3.png' },
  { name: 'Eva Elite', image: '/models/card/1.png' },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export function RecentStories() {
  const router = useRouter();

  return (
    <motion.div
      className="relative w-full px-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-4 relative">
          <div
            className="absolute rounded-full z-30 bg-[#f2cadb] dark:bg-[#2e0415] "
            style={{
              height: '300px',
              width: '300px',
              borderRadius: '200px',
              top: '-70px',
              left: '-70px',
              filter: 'blur(80px)',
              zIndex: 0,
            }}
          />
          <motion.h2
            variants={titleVariants}
            className="lg:text-5xl text-3xl z-10"
          >
            Recent Stories
          </motion.h2>
          <motion.div className="flex gap-2" variants={itemVariants}>
            <CarouselPrevious className="static h-8 w-8 border-none shadow-none translate-y-0" />
            <CarouselNext className="static h-8 w-8 border-none shadow-none translate-y-0" />
          </motion.div>
        </div>
        <div className="relative w-full  ">
          <CarouselContent className="-ml-2 py-10">
            {stories.map((story, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/6 basis-1/3">
                <motion.div
                  className="relative flex flex-col items-center"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="rounded-full overflow-hidden w-20 h-20 md:w-32 md:h-32 border-4 md:border-5 border-darkpink"
                    whileHover={{
                      boxShadow: '0 0 40px rgba(243, 33, 118, 0.5)',
                      transition: { duration: 0.2 },
                    }}
                  >
                    <button
                      onClick={() => {
                        router.push(`/profile/${story.name}`);
                      }}
                    >
                      <Image
                        src={story.image}
                        alt={story.name}
                        width={400}
                        height={400}
                        className="object-cover"
                      />
                    </button>
                  </motion.div>
                  <motion.p
                    className="text-xl md:text-2xl mt-3 text-center whitespace-nowrap"
                    variants={itemVariants}
                  >
                    {story.name}
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
