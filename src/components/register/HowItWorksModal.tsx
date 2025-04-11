"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FaCrown } from 'react-icons/fa';
import {  MdVerified,  } from 'react-icons/md';

interface HowItWorksModalProps {
  showHowItWorks: boolean;
  setShowHowItWorks: (value: boolean) => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ showHowItWorks, setShowHowItWorks }) => {
  if (!showHowItWorks) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-[#1a0a10] rounded-2xl p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-6">Como Funciona o XGirl.pt</h2>
        <div className="text-gray-700 dark:text-gray-200 space-y-6">
          {/* Conteúdo do modal "Como Funciona" */}
          <p>
            Bem-vindo ao <strong>XGirl.pt</strong>, a plataforma de classificados eróticos mais justa, completa e divertida de Portugal! Aqui, conectamos <strong>acompanhantes em Portugal</strong> com clientes de forma inovadora e segura.
          </p>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">1. Registro e Criação de Perfil</h3>
          <p>
            Tudo começa nesta página de registro. Crie sua conta com email e senha, depois personalize seu perfil. Adicione fotos (até 10 no plano Premium!), uma descrição única e seus serviços.
          </p>
          {/* ... (todo o conteúdo restante do modal) */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">4. Badges: Reconhecimento do Seu Valor</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <span className="text-green-500"><MdVerified className="w-10 h-10" /></span>
              Tem foto verificada e aprovada pela equipe XGirl.pt.
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-yellow-600 text-white text-xs font-semibold py-1 px-2 rounded-full inline-flex items-center shadow-md"><FaCrown className="text-white mr-1" /> Premium</span>
              Membro Premium, com benefícios como mais fotos e Stories.
            </li>
            {/* ... (outros badges) */}
          </ul>
          <p className="font-semibold">
            Registre-se agora e veja como o <strong>XGirl.pt</strong> combina dedicação, igualdade e diversão!
          </p>
        </div>
        <Button
          onClick={() => setShowHowItWorks(false)}
          className="mt-6 w-full rounded-full bg-pink-600 text-white hover:bg-pink-700"
        >
          Fechar
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HowItWorksModal;