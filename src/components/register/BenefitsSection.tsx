"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/backend/lib/utils';
import { FaStar, FaCrown, FaEye, FaPhone, FaHeart } from 'react-icons/fa';
import { fadeInUp } from './animationVariants'; // Importar variantes de animação

interface BenefitsSectionProps {
  setShowSubscriptionPlan: (value: boolean) => void;
  setShowHowItWorks: (value: boolean) => void;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ setShowSubscriptionPlan, setShowHowItWorks }) => {
  const benefits = [
    { icon: FaStar, text: 'Crie um perfil sedutor e personalize cada detalhe', color: 'text-yellow-500' },
    { icon: FaCrown, text: 'Plano premium: mais fotos, stories e destaque nos resultados', color: 'text-rose-500' },
    { icon: FaEye, text: 'Atualize seu "estado" a qualquer momento', color: 'text-pink-500' },
    { icon: FaPhone, text: 'Gerencie contatos e agendamentos com facilidade', color: 'text-purple-500' },
    { icon: FaHeart, text: 'Suporte dedicado para você brilhar', color: 'text-red-500' },
  ];

  return (
    <motion.div className="w-full md:w-1/2 p-6 md:pb-8 md:ml-24 lg:p-10" variants={fadeInUp}>
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md">
        Torne-se uma Estrela
      </h2>
      <p className="text-base text-gray-800 dark:text-gray-200 mb-8 max-w-md">
        Registre-se no site mais moderno de classificados eróticos em Portugal e alcance novos patamares.
      </p>
      <div className="space-y-6">
        {benefits.map((benefit, index) => (
          <motion.div key={index} className="flex items-center gap-4" variants={fadeInUp}>
            <benefit.icon className={cn('w-10 h-10 transition-transform hover:scale-110', benefit.color)} />
            <p className="text-gray-800 dark:text-gray-200 text-base">{benefit.text}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 flex gap-4">
        <Button
          onClick={() => setShowSubscriptionPlan(true)}
          className="rounded-full bg-transparent border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-105 transition-transform dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 px-6 py-2"
        >
          Ver Planos
        </Button>
        <Button
          onClick={() => setShowHowItWorks(true)}
          className="rounded-full bg-transparent border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white hover:scale-105 transition-transform dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-400 px-6 py-2"
        >
          Como Funciona
        </Button>
      </div>
    </motion.div>
  );
};

export default BenefitsSection;