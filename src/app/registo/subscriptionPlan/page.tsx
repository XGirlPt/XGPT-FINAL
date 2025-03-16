'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setPremium } from '@/backend/actions/ProfileActions';

export function SubscriptionPlan() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePlanoSelect = (plano: 'free' | 'premium') => {
    dispatch(setPremium(plano === 'premium')); // Atualiza o estado no Redux
    // Adiciona um pequeno atraso para garantir que o Redux atualize antes da navegação
    setTimeout(() => {
      router.push('/registo/registo-entrada');
    }, 100); // 100ms de atraso
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Escolha o Seu Plano</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-darkpink dark:bg-[#27191f] rounded-3xl">
          <CardContent className="p-6">
            <h3 className="font-medium mb-2">Starter</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold text-darkpink">Free</span>
              <span className="text-gray-400 ml-2">/ Month</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="text-black bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>3 Fotos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-black bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Sem Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-black bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Prioridade Baixa</span>
              </div>
            </div>
            <Button
              onClick={() => handlePlanoSelect('free')}
              className="w-full mt-6 rounded-full border-gray-200 dark:border-gray-800 dark:border-opacity-50 text-black hover:bg-darkpink hover:text-white"
            >
              Escolher Gratuito
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-darkpink rounded-3xl text-white border-none">
          <CardContent className="p-6">
            <h3 className="font-medium mb-2">Premium</h3>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">15.00</span>
              <span className="ml-2">/ Month</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="text-black bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>10 Fotos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-black bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>5 Stories</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-black bg-green-500 rounded-full h-4 w-4 p-0.5" />
                <span>Prioridade Alta</span>
              </div>
            </div>
            <Button
              onClick={() => handlePlanoSelect('premium')}
              className="w-full mt-6 bg-white text-darkpink hover:bg-gray-100 rounded-full"
            >
              Escolher Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SubscriptionPlan;