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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Autoplay from 'embla-carousel-autoplay';
import { Badge } from '@/components/ui/badge';
import {  MessageCircle } from "lucide-react";
import { FaVideo, FaCrown, FaClock, FaCommentDots, FaMapMarkerAlt } from "react-icons/fa";

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

export function HeroSection() {
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
            <span className="bg-[#f1c0d3] text-pink-600 lg:px-4 lg:py-1 px-2 py-1 rounded-full text-sm font-medium">
              BEST ESCORT SERVICES
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-5xl mb-2 text-gray-900 dark:text-white"
            variants={fadeInUp}
          >
            Escort Girls & Erroticssssss
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
          ></motion.div>

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
          ></motion.div>

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
          ></motion.div>

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
          ></motion.div>
        </div>

        {/* Profile Cards Carousel with animation */}
        <motion.div
          variants={fadeInUp}
          className="w-full max-w-5xl mx-auto pt-20 lg:pt-0"
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
                <CarouselContent className="-ml-2">
          {profiles.map((profile, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 md:basis-1/5 gap-4"
            >
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-white dark:bg-[#300d1b] rounded-3xl p-4 shadow-lg overflow-hidden cursor-pointer transform transition-all hover:shadow-2xl
                flex flex-col justify-between min-h-[320px]"
              >
                {/* Foto de perfil com Nome e Cidade sobrepostos */}
                <motion.div
                  className="relative aspect-[4/4] rounded-2xl overflow-hidden"
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Image
                    src={profile.photos[0] || "/logo.webp"}
                    alt={profile.nome}
                    fill
                    className="object-cover rounded-2xl"
                  />
                  {/* Gradiente para legibilidade */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      {profile.nome}
                    </h3>
                    <div className="flex items-center gap-1 text-white text-sm">
                      <FaMapMarkerAlt className="text-sm" />
                      {profile.cidade}
                    </div>
                  </div>
                </motion.div>
        
                {/* Conteúdo da Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col justify-between flex-1"
                >
                  {/* Tag/Status - Efeito de Balão de Mensagem */}
                  <div className="self-start bg-blue-100 dark:bg-[#3a1a2a] text-gray-800 dark:text-white px-3 py-2 rounded-2xl relative shadow-md italic text-sm md:text-base">
        <div className='flex'>
        <span className="italic">&quot;  {profile.tag}&quot;  </span>            
        <FaCommentDots className=" text-pink-600" />
                    </div>
        
                  {/* Tempo passado */}
                  <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                    <FaClock className="text-yellow-500" />
                    {timeAgo(profile.tagtimestamp)}
                  </div>
                  </div>
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
