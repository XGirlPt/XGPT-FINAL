'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Crown, Gift } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updatePremium } from '@/backend/reducers/profileSlice';


export function SubscriptionPlan() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handlePlanoSelect = (plano: 'free' | 'premium') => {
    dispatch(updatePremium(plano === 'premium'));
    setTimeout(() => {
      router.push('/registo/registo-entrada');
    }, 100);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-[#100007] dark:text-[#f2ebee]">
        Escolha o Seu Plano
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plano Free */}
        <Card className="border-[#100007] bg-[#f2ebee] dark:bg-[#27191f] rounded-3xl shadow-lg w-full max-w-md mx-auto flex flex-col h-full">
          <CardContent className="p-6 flex flex-col flex-grow">
            <h3 className="text-2xl font-semibold mb-4 text-[#100007] dark:text-[#f2ebee]">
              Starter (Gratuito)
            </h3>
            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-extrabold text-[#100007] dark:text-[#f2ebee]">Free</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">/ Mês</span>
            </div>
            <div className="space-y-3 text-[#100007] dark:text-[#f2ebee] flex-grow">
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
              <div className="flex items-center gap-2">
                <X className="text-white bg-red-600 rounded-full h-5 w-5 p-1" />
                <span>Suporte Básico (48h)</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="text-white bg-red-600 rounded-full h-5 w-5 p-1" />
                <span>Sem Estatísticas</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="text-white bg-red-600 rounded-full h-5 w-5 p-1" />
                <span>Limite de 50 Visualizações/Dia</span>
              </div>
            </div>
            <Button
              onClick={() => handlePlanoSelect('free')}
              className="w-full mt-6 rounded-full bg-[#100007] text-[#f2ebee] hover:bg-darkpink hover:text-white dark:hover:bg-[#f7a5c7] transition-all duration-300"
            >
              Escolher Gratuito
            </Button>
          </CardContent>
        </Card>

        {/* Plano Premium */}
        <Card className="bg-darkpink rounded-3xl text-[#f2ebee] border-none shadow-2xl w-full max-w-md mx-auto flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-[#100007] px-6 py-2 rounded-bl-3xl shadow-md text-lg font-bold">
            <Gift className="inline-block h-5 w-5 mr-2" />
            4 Meses Grátis!
          </div>
          <CardContent className="p-6 flex flex-col flex-grow">
            <div className="flex items-center  mb-4">
              <h3 className="text-2xl text-yellow-400 font-semibold ">Premium</h3>
              <Crown className="text-yellow-400 h-10 w-10 drop-shadow-lg " />
            </div>
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-5xl font-extrabold">16.00€</span>
                <span className="ml-2 text-sm opacity-80">/ Mês</span>
              </div>
              <div className="mt-2 text-sm">
                <span className="font-semibold">ou 135.00€ / Ano</span> 
                <span className="ml-2 text-green-400">(11.25€/mês - 30% OFF)</span>
              </div>
            </div>
            <div className="space-y-3 flex-grow">
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
                <span>Estatísticas Detalhadas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                <span>Suporte Prioritário (12h)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                <span>Personalização do Perfil</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                <span>Posts Regulares na Rede X (Opcional)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-white bg-green-500 rounded-full h-5 w-5 p-1" />
                <span>Visualizações Ilimitadas</span>
              </div>
            </div>
            <Button
              onClick={() => handlePlanoSelect('premium')}
              className="w-full mt-6 rounded-full bg-[#f7a5c7] text-[#100007] hover:bg-yellow-400 hover:text-[#100007] transition-all duration-300 font-bold"
            >
              Experimente Grátis por 4 Meses
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SubscriptionPlan;