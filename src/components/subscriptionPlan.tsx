'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updatePremiumStatus } from '@/backend/actions/ProfileActions';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Crown, Gift } from 'lucide-react';
import supabase from '@/backend/database/supabase';
import { toast } from 'react-toastify';
import Link from 'next/link';

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
      className="min-h-screen w-full flex items-center justify-center bg-[#f2ebee] dark:bg-[#100007] p-4 md:p-8"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className="max-w-4xl w-full">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          variants={fadeInUp}
        >
          Escolha o Seu Plano
        </motion.h1>

        {/* Toggle Mensal/Anual */}
        <motion.div className="flex justify-center mb-12" variants={fadeInUp}>
          <div className="flex bg-gray-200 dark:bg-gray-800 rounded-full p-1">
            <Button
              className={`px-6 py-2 rounded-full ${
                billingCycle === 'monthly' ? 'bg-pink-600 text-white' : 'bg-transparent text-gray-900 dark:text-white'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Mensal
            </Button>
            <Button
              className={`px-6 py-2 rounded-full ${
                billingCycle === 'yearly' ? 'bg-pink-600 text-white' : 'bg-transparent text-gray-900 dark:text-white'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Anual
            </Button>
          </div>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={staggerChildren}>
          {/* Plano Free */}
          <Card className="bg-white dark:bg-[#1a0a10] rounded-3xl shadow-lg flex flex-col h-full">
            <CardContent className="p-6 flex flex-col flex-grow">
              <motion.h3
                className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white"
                variants={fadeInUp}
              >
                Starter (Gratuito)
              </motion.h3>
              <motion.div className="flex items-baseline mb-6" variants={fadeInUp}>
                <span className="text-5xl font-extrabold text-pink-600">Grátis</span>
                <span className="text-gray-600 dark:text-gray-300 ml-2 text-sm">/ Mês</span>
              </motion.div>
              <div className="space-y-4 text-gray-900 dark:text-gray-300 flex-grow">
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>3 Fotos</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="text-white bg-red-600 rounded-full h-5 w-5 p-1" />
                  <span>Sem Stories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>Prioridade Baixa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>1 Tag por Dia</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>Até 5 Serviços</span>
                </div>
                <div className="flex items-center gap-2">
                  <X className="text-white bg-red-600 rounded-full h-5 w-5 p-1" />
                  <span>Visibilidade Padrão</span>
                </div>
              </div>
              <Button
                onClick={() => handlePlanoSelect('free')}
                className="w-full mt-8 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-all duration-300"
              >
                Escolher Gratuito
              </Button>
              <Link href="/plans-details" passHref>
                <p className="text-center text-sm text-pink-600 mt-4 hover:underline">Saiba Mais</p>
              </Link>
            </CardContent>
          </Card>

          {/* Plano Premium */}
          <Card className="bg-pink-600 text-white rounded-3xl shadow-2xl flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-[#100007] px-4 py-1 rounded-bl-3xl shadow-md font-bold">
              <Gift className="inline-block h-4 w-4 mr-1" /> 4 Meses Grátis!
            </div>
            <CardContent className="p-6 flex flex-col flex-grow">
              <motion.div className="flex items-center mb-4" variants={fadeInUp}>
                <h3 className="text-2xl font-semibold text-yellow-400">Premium</h3>
                <Crown className="text-yellow-400 h-8 w-8 ml-2 drop-shadow-lg" />
              </motion.div>
              <motion.div className="mb-6" variants={fadeInUp}>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold">
                    {billingCycle === 'monthly' ? '€16' : '€135'}
                  </span>
                  <span className="ml-2 text-sm opacity-80">
                    {billingCycle === 'monthly' ? '/ Mês' : '/ Ano'}
                  </span>
                </div>
                {billingCycle === 'yearly' && (
                  <p className="text-sm text-green-400 mt-2">
                    (Equivale a €11.25/mês - 30% OFF)
                  </p>
                )}
              </motion.div>
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>10 Fotos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>5 Stories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>Prioridade Alta</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>1 Tag por Hora</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>Full - Até 40 Serviços</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>Visibilidade no Topo + Selo Premium</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                  <span>Posts Regulares na Rede X (Opcional)</span>
                </div>
              </div>
              <Button
                onClick={() => handlePlanoSelect('premium')}
                className="w-full mt-8 rounded-full bg-white text-pink-600 hover:bg-yellow-400 hover:text-[#100007] transition-all duration-300 font-bold relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-sweep w-1/3" />
                <span className="relative z-10">Experimente Grátis por 4 Meses</span>
              </Button>
              <Link href="/plans-details" passHref>
                <p className="text-center text-sm text-white mt-4 hover:underline">Saiba Mais</p>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

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