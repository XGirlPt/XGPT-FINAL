'use client'

import { FaCreditCard, FaCalendar, FaLock, FaStar,FaHeart , FaUser} from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@/backend/lib/utils';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { Input } from '@/components/ui/input';
import { toast } from "react-toastify";


const FinalRegistrationPage: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState(''); // Campo opcional
  const router = useRouter();
  const { theme } = useTheme();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.2 } },
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const paymentData = {
  //       cardNumber,
  //       expiryDate,
  //       cvv,
  //       nameOnCard,
  //       // Adicione outros campos necessários para o Verotel
  //     };
  //     const response = await processPayment(paymentData); // Substituir com API do Verotel
  //     if (response.success) {
  //       toast.success('Pagamento bem-sucedido! Conta ativada.', {
  //         position: 'top-right',
  //         autoClose: 2000,
  //       });
  //       router.push('/my-account');
  //     } else {
  //       toast.error(`Pagamento falhou: ${response.error}`, {
  //         position: 'top-right',
  //         autoClose: 2000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Erro ao processar pagamento:', error);
  //     toast.error('Erro ao processar pagamento. Tente novamente.', {
  //       position: 'top-right',
  //       autoClose: 2000,
  //     });
  //   }
  // };

  return (
    <motion.div
      className="min-h-screen flex pt-10 justify-between bg-gradient-to-br from-pink-100 to-rose-50 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] pb-8 px-4 md:px-8 lg:px-12"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-600/10 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl flex flex-col md:flex-row gap-12 z-10">
        <motion.div className="w-full md:w-1/2 p-6 md:pb-8 md:ml-24 lg:p-10" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md">
            Finalize Seu Registro
          </h2>
          <p className="text-base text-gray-800 dark:text-gray-200 mb-8 max-w-md">
            Complete o processo de registo inserindo os dados do seu cartão de crédito para ativar sua conta.
          </p>
          <div className="space-y-6">
            {[
              { icon: FaCreditCard, text: 'Pagamentos seguros e rápidos', color: 'text-blue-500' },
              { icon: FaLock, text: 'Proteção de dados com PCI compliance', color: 'text-green-500' },
              { icon: FaCalendar, text: 'Subscrições gerenciáveis', color: 'text-purple-500' },
              { icon: FaStar, text: 'Acesso a recursos premium', color: 'text-yellow-500' },
              { icon: FaHeart, text: 'Suporte dedicado para sua conta', color: 'text-red-500' },
            ].map((benefit, index) => (
              <motion.div key={index} className="flex items-center gap-4" variants={fadeInUp}>
                <benefit.icon className={cn('w-10 h-10 transition-transform hover:scale-110', benefit.color)} />
                <p className="text-gray-800 dark:text-gray-200 text-base">{benefit.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/3 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl p-6 md:pb-1 md:ml-auto"
          variants={fadeInUp}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md">
            Finalizar Pagamento
          </h1>
          <form className="space-y-6" >
            <motion.div variants={fadeInUp}>
              <label className="block flex mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 items-center gap-2">
                <FaCreditCard className="text-pink-600 dark:text-pink-400" />
                Número do Cartão
              </label>
              <Input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
                className={cn(
                  "w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-gray-50 to-white dark:from-[#2b1a21] dark:to-[#2b1a21]",
                  theme === "dark" ? "border-zinc-700 text-white placeholder:text-zinc-400" : "border-gray-200 text-gray-900 placeholder:text-gray-400"
                )}
              />
            </motion.div>

            <div className="flex gap-4">
              <motion.div variants={fadeInUp} className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <FaCalendar className="text-pink-600 dark:text-pink-400" />
                  Data de Validade
                </label>
                <Input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/AA"
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-gray-50 to-white dark:from-[#2b1a21] dark:to-[#2b1a21]",
                    theme === "dark" ? "border-zinc-700 text-white placeholder:text-zinc-400" : "border-gray-200 text-gray-900 placeholder:text-gray-400"
                  )}
                />
              </motion.div>

              <motion.div variants={fadeInUp} className="w-1/2">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                  <FaLock className="text-pink-600 dark:text-pink-400" />
                  CVV
                </label>
                <Input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-gray-50 to-white dark:from-[#2b1a21] dark:to-[#2b1a21]",
                    theme === "dark" ? "border-zinc-700 text-white placeholder:text-zinc-400" : "border-gray-200 text-gray-900 placeholder:text-gray-400"
                  )}
                />
              </motion.div>
            </div>

            <motion.div variants={fadeInUp}>
              <label className="block flex mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 items-center gap-2">
                <FaUser className="text-pink-600 dark:text-pink-400" />
                Nome no Cartão
              </label>
              <Input
                type="text"
                value={nameOnCard}
                onChange={(e) => setNameOnCard(e.target.value)}
                placeholder="Nome como aparece no cartão"
                required
                className={cn(
                  "w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-gray-50 to-white dark:from-[#2b1a21] dark:to-[#2b1a21]",
                  theme === "dark" ? "border-zinc-700 text-white placeholder:text-zinc-400" : "border-gray-200 text-gray-900 placeholder:text-gray-400"
                )}
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-between">
              <Link href="/registo/registo-fotos">
                <Button className="rounded-full bg-transparent border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-105 transition-transform dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 px-6 py-2">
                  Voltar
                </Button>
              </Link>
              <Button
                type="submit"
                className={cn(
                  "rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                )}
              >
                Finalizar Registro e Pagar
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FinalRegistrationPage;