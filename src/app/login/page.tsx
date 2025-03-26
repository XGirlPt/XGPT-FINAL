'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserUID, setLoggedIn } from '@/backend/reducers/profileSlice';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import supabase from '@/backend/database/supabase';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Lock, Mail } from 'lucide-react';

// Variantes de animação
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.2 } },
};

export default function Login() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        dispatch(setUserUID(data.user.id));
        dispatch(setLoggedIn(true));
        toast.success(t('login.success_message'), { position: 'top-right' });
        router.push('/my-account');
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.message);
      toast.error(t('login.error_message'), { position: 'top-right' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center  dark:bg-[#100007] relative overflow-hidden p-4 md:p-8"
      initial="initial"
      animate="animate"
      variants={staggerChildren}
    >
      {/* Fundo com gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600/10 via-transparent to-rose-500/10" />

      <motion.section
        className={cn(
          'relative w-full max-w-md bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl p-6 md:p-8 z-10',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
        variants={fadeInUp}
      >
        {/* Botão de alternar tema no canto superior direito */}
       
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-4"
          variants={fadeInUp}
        >
          {t('loginPage.title')}
        </motion.h1>
        <motion.p
          className="text-sm font-light text-center text-gray-500 dark:text-gray-400 mb-8"
          variants={fadeInUp}
        >
          {t('loginPage.subtitle')}
        </motion.p>

        <form onSubmit={handleLogin} className="space-y-6">
          <motion.div variants={fadeInUp}>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-pink-600" />
              {t('login.email_label')}
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.email_placeholder')}
              required
              className={cn(
                'w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500',
                theme === 'dark'
                  ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
              )}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-pink-600" />
              {t('login.password_label')}
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.password_placeholder')}
              required
              className={cn(
                'w-full px-4 py-3 rounded-full border shadow-sm focus:ring-2 focus:ring-pink-500',
                theme === 'dark'
                  ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
              )}
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <Button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 shadow-md transition-all duration-300 relative overflow-hidden',
                loading && 'opacity-75 cursor-not-allowed'
              )}
            >
              {loading && (
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
              )}
              <span className={loading ? 'opacity-0' : 'relative z-10'}>
                {t('login.login_button')}
              </span>
            </Button>
          </motion.div>
        </form>

        <motion.div className="mt-6 text-center space-y-4" variants={fadeInUp}>
          <Link href="/registo/regista2" passHref>
            <p className="text-sm text-pink-600 hover:underline cursor-pointer">
              {t('login.register_link')}
            </p>
          </Link>
          <Link href="/forgot-password" passHref>
            <p className="text-sm text-gray-500 dark:text-gray-400 hover:underline cursor-pointer">
              {t('login.forgot_password')}
            </p>
          </Link>
        </motion.div>
      </motion.section>

      <ToastContainer position="top-right" />
    </motion.div>
  );
}