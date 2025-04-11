"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from './animationVariants'; // Importar variantes de animação

const RegisterHeader: React.FC = () => {
  return (
    <motion.div className="w-full" variants={fadeInUp}>
      <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md">
        Crie Sua Conta
      </h1>
    </motion.div>
  );
};

export default RegisterHeader;