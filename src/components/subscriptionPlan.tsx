'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updatePremiumStatus } from '@/backend/actions/ProfileActions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Crown, Gift } from 'lucide-react';
import supabase from '@/backend/database/supabase';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { X } from 'lucide-react';

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.2 } },
};

interface SubscriptionPlanProps {
  userUID: string;
  onPlanoSelect: () => void;
}

export function SubscriptionPlan({ userUID, onPlanoSelect }: SubscriptionPlanProps) {
  const dispatch = useDispatch();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handlePlanoSelect = async (plano: 'free' | 'premium') => {
    const isPremium = plano === 'premium';

    if (!userUID) {
      console.error('userUID não disponível para atualização');
      toast.error('Erro: Usuário não identificado');
      return;
    }

    try {
      console.log('Tentando atualizar premium para:', isPremium, 'com userUID:', userUID);
      const { error } = await supabase
        .from('ProfilesData')
        .update({ premium: isPremium })
        .eq('userUID', userUID);

      if (error) throw new Error(error.message);

      console.log('Supabase atualizado com premium:', isPremium);
      await dispatch(updatePremiumStatus({ userUID, premium: isPremium })).unwrap();
      console.log('Redux atualizado com premium:', isPremium);
      toast.success('Plano atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar status premium no Supabase:', error.message);
      toast.error('Erro ao atualizar o plano');
    }

    onPlanoSelect();
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-[#1a0a10] rounded-2xl shadow-2xl"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <motion.h1
        className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white"
        variants={fadeInUp}
      >
        Escolha o Seu Plano
      </motion.h1>

      {/* Toggle Mensal/Anual */}
      <motion.div className="flex justify-center mb-8" variants={fadeInUp}>
        <div className="inline-flex bg-gray-200 dark:bg-gray-800 rounded-full p-1 shadow-md">
          <Button
            className={`px-4 py-1 rounded-full text-sm md:text-base ${
              billingCycle === 'monthly'
                ? 'bg-pink-600 text-white'
                : 'bg-transparent text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            Mensal
          </Button>
          <Button
            className={`px-4 py-1 rounded-full text-sm md:text-base ${
              billingCycle === 'yearly'
                ? 'bg-pink-600 text-white'
                : 'bg-transparent text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
            onClick={() => setBillingCycle('yearly')}
          >
            Anual
          </Button>
        </div>
      </motion.div>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={staggerChildren}>
        {/* Plano Free */}
        <Card className="bg-white dark:bg-[#1a0a10] rounded-2xl shadow-lg flex flex-col h-full border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
            <motion.h3
              className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white"
              variants={fadeInUp}
            >
              Starter (Gratuito)
            </motion.h3>
            <motion.div className="flex items-baseline mb-4" variants={fadeInUp}>
              <span className="text-4xl md:text-5xl font-extrabold text-pink-600">Grátis</span>
              <span className="text-gray-600 dark:text-gray-300 ml-2 text-sm">/ Mês</span>
            </motion.div>
            <div className="space-y-3 text-gray-900 dark:text-gray-300 flex-grow">
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>3 Fotos</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="text-white bg-red-600 rounded-full h-4 w-4 p-0.5" />
                <span>Sem Stories</span>
              </div>
              <div className="flex items-center gap-2">
              <X className="text-white bg-red-600 rounded-full h-4 w-4 p-0.5" />
              <span>Prioridade Baixa</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>1 Tag por Dia</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Até 5 Serviços</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="text-white bg-red-600 rounded-full h-4 w-4 p-0.5" />
                <span>Visibilidade Padrão</span>
              </div>
            </div>
            <Button
              onClick={() => handlePlanoSelect('free')}
              className="w-full mt-6 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-all duration-300 text-sm md:text-base"
            >
              Escolher Gratuito
            </Button>
            <Link href="/plans-details" passHref>
              <p className="text-center text-xs md:text-sm text-pink-600 mt-3 hover:underline">Saiba Mais</p>
            </Link>
          </CardContent>
        </Card>

        {/* Plano Premium */}
        <Card className="bg-pink-600 text-white rounded-2xl shadow-2xl flex flex-col h-full relative overflow-hidden border border-pink-700">
          <div className="absolute top-0 right-0 bg-yellow-400 text-[#100007] px-3 py-1 rounded-bl-2xl shadow-md font-bold text-xs md:text-sm">
            <Gift className="inline-block h-3 w-3 md:h-4 md:w-4 mr-1" /> 4 Meses Grátis!
          </div>
          <CardContent className="p-4 md:p-6 flex flex-col flex-grow">
            <motion.div className="flex items-center mb-4" variants={fadeInUp}>
              <h3 className="text-xl md:text-2xl font-semibold text-yellow-400">Premium</h3>
              <Crown className="text-yellow-400 h-6 w-6 md:h-8 md:w-8 ml-2 drop-shadow-lg" />
            </motion.div>
            <motion.div className="mb-4" variants={fadeInUp}>
              <div className="flex items-baseline">
                <span className="text-4xl md:text-5xl font-extrabold">
                  {billingCycle === 'monthly' ? '€16' : '€135'}
                </span>
                <span className="ml-2 text-sm opacity-80">
                  {billingCycle === 'monthly' ? '/ Mês' : '/ Ano'}
                </span>
              </div>
              {billingCycle === 'yearly' && (
                <p className="text-xs md:text-sm text-green-400 mt-2">
                  (Equivale a €11.25/mês - 30% OFF)
                </p>
              )}
            </motion.div>
            <div className="space-y-3 flex-grow">
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>10 Fotos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>5 Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Prioridade Alta</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>1 Tag por Hora</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Full - Até 40 Serviços</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Visibilidade no Topo + Selo Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Escrever artigos (5 dias de destaque na pagina principal)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Posts Regulares na Rede X (Opcional)</span>
              </div>
            </div>
            <Button
              onClick={() => handlePlanoSelect('premium')}
              className="w-full mt-6 rounded-full bg-white text-pink-600 hover:bg-yellow-400 hover:text-[#100007] transition-all duration-300 font-bold text-sm md:text-base relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-sweep w-1/3" />
              <span className="relative z-10">Experimente Grátis por 4 Meses</span>
            </Button>
            <Link href="/plans-details" passHref>
              <p className="text-center text-xs md:text-sm text-white mt-3 hover:underline">Saiba Mais</p>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Estilos personalizados */}
      <style jsx>{`
        @keyframes sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
        .animate-sweep {
          animation: sweep 1s infinite linear;
        }
      `}</style>
    </motion.div>
  );
}

export default SubscriptionPlan;