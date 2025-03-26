"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import supabase from '@/backend/database/supabase';
import { registerUser } from '@/backend/reducers/profileSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import { FaEnvelope, FaLock, FaUserPlus, FaHeart, FaCrown, FaStar, FaEye, FaPhone } from 'react-icons/fa';
import ListRegister from '@/components/register/list-register';
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

// Função para determinar a URL de redirecionamento dinâmica
const getRedirectUrl = () => {
  if (typeof window === 'undefined') return 'https://www.xgirl.pt/registo/confirmar-email';
  const host = window.location.host;
  if (host.includes('localhost')) return 'http://localhost:3000/registo/confirmar-email';
  if (host.includes('vercel.app')) return `${window.location.origin}/registo/confirmar-email`;
  return 'https://www.xgirl.pt/registo/confirmar-email';
};

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    name: string;
    unavailable: boolean;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOptionSelect = (option: { id: number; name: string; unavailable: boolean }) => {
    setSelectedOption(option);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert(t('register.passwordMismatch') || 'As senhas não correspondem');
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

      if (data?.user?.id) {
        dispatch(registerUser(data.user.id, email));
      }

      if (!selectedOption) {
        router.push('/registo/confirmar-email');
        return;
      }

      switch (selectedOption.id) {
        case 1:
          router.push('/registo/confirmar-email');
          break;
        case 2:
          const { error: etablissementError } = await supabase.from('etablissements').insert([
            { userUID: data.user?.id, userData: data.user },
          ]);
          if (etablissementError) throw etablissementError;
          router.push(`/registre-etablissement?email=${email}&userUID=${data.user?.id}`);
          break;
        case 3:
          router.push('/registre-entrada');
          break;
        default:
          router.push('/registo/confirmar-email');
          break;
      }
    } catch (error: any) {
      alert(t('register.error') || `Erro ao registrar: ${error.message}`);
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

  return (
    <motion.div
      className="min-h-screen flex items-center justify-between bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 dark:from-[#100007] dark:via-[#1a0a10] dark:to-[#2b1a21] py-12 px-4 md:px-8 lg:px-12"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      {/* Fundo decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-600/10 via-transparent to-transparent" />

      <div className="relative w-full max-w-7xl flex flex-col md:flex-row gap-12 z-10">
        {/* Seção de Vantagens - Mais à esquerda */}
        <motion.div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10" variants={fadeInUp}>
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md">
            {t('register.welcome') || 'Torne-se uma Estrela'}
          </h2>
          <p className="text-base text-gray-800 dark:text-gray-200 mb-8 max-w-md">
            {t('register.subtitle') || 'Registre-se no site mais moderno de classificados eróticos em Portugal e alcance novos patamares.'}
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
            <Link href="/planos" passHref>
              <Button
                className="rounded-full bg-transparent border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white hover:scale-105 transition-transform dark:border-pink-400 dark:text-pink-400 dark:hover:bg-pink-400 px-6 py-2"
              >
                {t('register.viewPlans') || 'Ver Planos'}
              </Button>
            </Link>
            <Link href="/como-funciona" passHref>
              <Button
                className="rounded-full bg-transparent border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white hover:scale-105 transition-transform dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-400 px-6 py-2"
              >
                {t('register.howItWorks') || 'Como Funciona'}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Formulário de Registro - Encostado à direita */}
        <motion.div
          className="w-full md:w-1/3 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl p-6 md:p-8 self-center md:ml-auto"
          variants={fadeInUp}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-center text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md">
            {t('register.title') || 'Crie Sua Conta'}
          </h1>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <motion.div variants={fadeInUp}>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                <FaEnvelope className="text-pink-600 dark:text-pink-400" />
                {t('register.email_label') || 'Email'}
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('register.email_placeholder') || 'Digite seu email'}
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
                {t('register.password_label') || 'Senha'}
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('register.password_placeholder') || 'Crie uma senha segura'}
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
                {t('register.confirm_password_label') || 'Confirmar Senha'}
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('register.confirm_password_placeholder') || 'Repita sua senha'}
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
                {t('register.option_label') || 'Tipo de Conta'}
              </label>
              <ListRegister handleOptionSelect={handleOptionSelect} />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Button
                type="button"
                onClick={handleRegister}
                disabled={loading}
                className={cn(
                  'w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden',
                  loading && 'opacity-75 cursor-not-allowed'
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
                  {t('register.register_button') || 'Registrar e Brilhar'}
                </span>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RegisterPage;