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
            <CarouselContent className="">
              {profiles.map((profile) => (
                <CarouselItem
                  key={profile.nome}
                  className=" md:basis-1/7 basis-1/7"
                >
                   <motion.div
      className="overflow-hidden rounded-3xl shadow-lg bg-white dark:bg-gray-900"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
    >
      {/* Foto de perfil */}
      <div className="relative aspect-square overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={profile.photos[0] || "/logo.webp"}
            alt={profile.nom}
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Nome e Localização sobre a imagem */}
        <div className="absolute bottom-2 left-2 bg-black/60 text-white p-2 rounded-lg">
          <h3 className="font-bold text-md">{profile.nom}</h3>
          <p className="text-xs flex items-center gap-1">
            <Image src="/icons/location.png" alt="Location" width={12} height={12} />
            {profile.distrito}
          </p>
        </div>
      </div>

      {/* Indicadores de status */}
      <div className="absolute top-2 right-2 flex gap-1.5 font-body">
        {profile.certifie && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-[#F1C40F]/90 text-white text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Usuário Premium</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {profile.histoires?.length > 0 && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-[#8E44AD]/90 text-white text-xs">
                  <Image src="/icons/stories.png" alt="Stories" width={12} height={12} className="mr-1" />
                  Stories
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Possui stories recentes</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {profile.enDirect && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="bg-[#E74C3C]/90 text-white text-xs flex items-center">
                  <motion.span
                    className="w-2 h-2 bg-white rounded-full mr-1"
                    animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  Live
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Está ao vivo agora</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {/* Tag de mensagem recente */}
      {profile.tag && (
        <motion.div
          className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 text-sm rounded-b-3xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle className="w-4 h-4 text-blue-500" />
          <span className="text-gray-700 dark:text-gray-300">{profile.tag}</span>
        </motion.div>
      )}
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
