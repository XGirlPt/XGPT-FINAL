"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import supabase from '@/backend/database/supabase';
import { registerUser, setAccountType } from '@/backend/reducers/profileSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import { FaEnvelope, FaLock, FaUserPlus, FaHeart, FaCrown, FaVideo, FaPen, FaStar, FaEye, FaPhone } from 'react-icons/fa';
import ListRegister from '@/components/register/list-register';
import Link from 'next/link';
import SubscriptionPlan from '@/components/subscriptionPlan';
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

// Função para determinar a URL de redirecionamento dinâmica
const getRedirectUrl = () => {
  if (typeof window === 'undefined') return 'https://www.xgirl.pt/registo/confirmar-email';
  const host = window.location.host;
  if (host.includes('localhost')) return 'http://localhost:3000/registo/confirmar-email';
  if (host.includes('vercel.app')) return `${window.location.origin}/registo/confirmar-email`;
  return 'https://www.xgirl.pt/registo/confirmar-email';
};

const RegisterPage: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<{ id: number; name: string; unavailable: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [thirdPartyConsent, setThirdPartyConsent] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showSubscriptionPlan, setShowSubscriptionPlan] = useState(false);

  const handleOptionSelect = (option: { id: number; name: string; unavailable: boolean }) => {
    setSelectedOption(option);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('As senhas não correspondem');
      return;
    }
    if (!termsAccepted || !dataConsent || !thirdPartyConsent) {
      alert('Você deve aceitar os termos e condições para continuar');
      return;
    }
    if (!selectedOption) {
      alert('Por favor, selecione o tipo de conta');
      return;
    }

    setLoading(true);
    try {
      const redirectTo = getRedirectUrl();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      });

      if (error) throw error;
      if (!data.user?.id) throw new Error('Nenhum utilizador retornado após registo');

      const userId = data.user.id;
      dispatch(registerUser({ userUID: userId, email }));
      dispatch(setAccountType(selectedOption.name as "Anunciante" | "Membro" | "Estabelecimento"));

      // Criar perfil dependendo do tipo de conta
      switch (selectedOption.id) {
        case 1: // Anunciante
          console.log('Tentando inserir em ProfilesData (Anunciante):', { 
            userUID: userId, 
            email, 
            status: false, 
            approval_status: 'pending', 
            premium: false 
          });
          const { error: profileError } = await supabase.from('ProfilesData').insert({
            userUID: userId,
            email,
            status: false, // Inativo até aprovação
            approval_status: 'pending', // Estado temporário
            premium: false,
          });
          if (profileError) {
            console.error('Erro ao inserir em ProfilesData:', profileError);
            throw new Error(`Erro ao criar perfil de anunciante: ${profileError.message}`);
          }
          router.push('/registo/confirmar-email');
          break;
        case 2: // Membro (User)
          console.log('Tentando inserir em users (Membro):', { userUID: userId, email });
          const { error: userError } = await supabase.from('users').insert({
            userUID: userId,
            email,
          });
          if (userError) {
            console.error('Erro ao inserir em users:', userError);
            throw new Error(`Erro ao criar perfil de membro: ${userError.message}`);
          }
          router.push('/registo/confirmar-email');
          break;
        case 3: // Estabelecimento
          console.log('Tentando inserir em ProfilesData (Estabelecimento):', { 
            userUID: userId, 
            email, 
            status: false, 
            approval_status: 'pending', 
            premium: false 
          });
          const { error: estabError } = await supabase.from('ProfilesData').insert({
            userUID: userId,
            email,
            status: false, // Inativo até aprovação
            approval_status: 'pending', // Estado temporário
            premium: false,
          });
          if (estabError) {
            console.error('Erro ao inserir em ProfilesData:', estabError);
            throw new Error(`Erro ao criar perfil de estabelecimento: ${estabError.message}`);
          }
          router.push('/registo/confirmar-email');
          break;
        default:
          throw new Error('Tipo de conta inválido');
      }
    } catch (error: any) {
      console.error('Erro completo no registro:', error);
      alert(`Erro ao registrar: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log('Sessão atual:', data.session);
    };
    checkSession();
  }, []);

  const handleCloseSubscriptionPlan = () => {
    setShowSubscriptionPlan(false);
  };

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
            Torne-se uma Estrela
          </h2>
          <p className="text-base text-gray-800 dark:text-gray-200 mb-8 max-w-md">
            Registre-se no site mais moderno de classificados eróticos em Portugal e alcance novos patamares.
          </p>
          <div className="space-y-6">
            {[
              { icon: FaStar, text: 'Crie um perfil sedutor e personalize cada detalhe', color: 'text-yellow-500' },
              { icon: FaCrown, text: 'Plano premium: mais fotos, stories e destaque nos resultados', color: 'text-rose-500' },
              { icon: FaEye, text: 'Atualize seu "estado" a qualquer momento', color: 'text-pink-500' },
              { icon: FaPhone, text: 'Gerencie contatos e agendamentos com facilidade', color: 'text-purple-500' },
              { icon: FaHeart, text: 'Suporte dedicado para você brilhar', color: 'text-red-500' },
            ].map((benefit, index) => (
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

        <motion.div
          className="w-full md:w-1/3 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl p-6 md:pb-1 md:ml-auto"
          variants={fadeInUp}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md">
            Crie Sua Conta
          </h1>
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
            <motion.div variants={fadeInUp}>
              <label className="block flex mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 items-center gap-2">
                <FaEnvelope className="text-pink-600 dark:text-pink-400" />
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
                className={cn(
                  'w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-gray-50 to-white dark:from-[#2b1a21] dark:to-[#2b1a21]',
                  theme === 'dark' ? 'border-zinc-700 text-white placeholder:text-zinc-400' : 'border-gray-200 text-gray-900 placeholder:text-gray-400'
                )}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <FaLock className="text-pink-600 dark:text-pink-400" />
                Senha
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Crie uma senha segura"
                required
                className={cn(
                  'w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-gray-50 to-white dark:from-[#2b1a21] dark:to-[#2b1a21]',
                  theme === 'dark' ? 'border-zinc-700 text-white placeholder:text-zinc-400' : 'border-gray-200 text-gray-900 placeholder:text-gray-400'
                )}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <FaLock className="text-pink-600 dark:text-pink-400" />
                Confirmar Senha
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repita sua senha"
                required
                className={cn(
                  'w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500 bg-gradient-to-r from-gray-50 to-white dark:from-[#2b1a21] dark:to-[#2b1a21]',
                  theme === 'dark' ? 'border-zinc-700 text-white placeholder:text-zinc-400' : 'border-gray-200 text-gray-900 placeholder:text-gray-400'
                )}
              />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <FaUserPlus className="text-pink-600 dark:text-pink-400" />
                Tipo de Conta
              </label>
              <ListRegister handleOptionSelect={handleOptionSelect} />
            </motion.div>

            {/* Checkboxes para Termos e Consentimento */}
            <motion.div className="space-y-4" variants={fadeInUp}>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label className="text-sm text-gray-700 dark:text-gray-200">
                  Declaro ter lido e aceito a{' '}
                  <Link href="/politica-privacidade" className="text-pink-600 hover:underline">
                    Política de Privacidade
                  </Link>{' '}
                  e os{' '}
                  <Link href="/termos-de-uso" className="text-pink-600 hover:underline">
                    Termos de Uso
                  </Link>.
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={dataConsent}
                  onChange={(e) => setDataConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label className="text-sm text-gray-700 dark:text-gray-200">
                  Consinto o tratamento por XGirl.pt de dados sensíveis me concernant (relativos à minha sexualidade). Os dados concernés, os motivos e os fins do tratamento estão explicados na{' '}
                  <Link href="/dados-sensiveis" className="text-pink-600 hover:underline">
                    Declaração de Proteção de Dados Sensíveis
                  </Link>.
                </label>
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={thirdPartyConsent}
                  onChange={(e) => setThirdPartyConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label className="text-sm text-gray-700 dark:text-gray-200">
                  Consinto a transmissão por XGirl.pt de todo ou parte dos dados colocados online a entidades terceiras situadas em Estados sem legislação que assegure um nível de proteção adequado. Esta transmissão visa controlar que a personalidade de terceiros e, mais geralmente, a ordem jurídica portuguesa não sejam violadas.
                </label>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                type="submit"
                disabled={loading || !termsAccepted || !dataConsent || !thirdPartyConsent || !selectedOption}
                className={cn(
                  'w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden',
                  (loading || !termsAccepted || !dataConsent || !thirdPartyConsent || !selectedOption) && 'opacity-75 cursor-not-allowed'
                )}
              >
                {loading ? (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                ) : null}
                <span className={loading ? 'opacity-0' : 'relative z-10'}>
                  Registrar e Brilhar
                </span>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Modal "Como Funciona" */}
      {showHowItWorks && (
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
            {/* Conteúdo do modal mantido igual */}
            <Button
              onClick={() => setShowHowItWorks(false)}
              className="mt-6 w-full rounded-full bg-pink-600 text-white hover:bg-pink-700"
            >
              Fechar
            </Button>
          </motion.div>
        </motion.div>
      )}

      {/* Modal "SubscriptionPlan" */}
      {showSubscriptionPlan && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-[#1a0a10] rounded-2xl p-6 max-w-4xl w-full mx-4 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={handleCloseSubscriptionPlan}
              className="absolute top-4 right-4 rounded-full bg-pink-600 text-white hover:bg-pink-700 w-10 h-10 flex items-center justify-center"
            >
              <X size={20} />
            </Button>
            <SubscriptionPlan userUID={''} onPlanoSelect={handleCloseSubscriptionPlan} />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RegisterPage;