"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/backend/lib/utils';
import { FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import ListRegister from '@/components/register/list-register';
import Link from 'next/link';
import { fadeInUp } from './animationVariants'; // Importar variantes de animação

interface RegisterFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  selectedOption: { id: number; name: string; unavailable: boolean } | null;
  loading: boolean;
  termsAccepted: boolean;
  dataConsent: boolean;
  thirdPartyConsent: boolean;
  theme: string | undefined;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  handleOptionSelect: (option: { id: number; name: string; unavailable: boolean }) => void;
  handleRegister: () => void;
  setTermsAccepted: (value: boolean) => void;
  setDataConsent: (value: boolean) => void;
  setThirdPartyConsent: (value: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  password,
  confirmPassword,
  selectedOption,
  loading,
  termsAccepted,
  dataConsent,
  thirdPartyConsent,
  theme,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleOptionSelect,
  handleRegister,
  setTermsAccepted,
  setDataConsent,
  setThirdPartyConsent,
}) => {
  return (
    <motion.div
      className="w-full md:w-1/3 bg-white dark:bg-[#1a0a10] rounded-3xl shadow-2xl p-6 md:pb-1 md:ml-auto"
      variants={fadeInUp}
    >
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
              Consinto a transmissão por XGirl.pt de todo ou parte dos dados colocados online a entidades terceiras situadas em Estados sem legislação que assegure um nível de proteção adequado.
            </label>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Button
            type="button"
            onClick={handleRegister}
            disabled={loading || !termsAccepted || !dataConsent || !thirdPartyConsent}
            className={cn(
              'w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold py-3 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden',
              (loading || !termsAccepted || !dataConsent || !thirdPartyConsent) && 'opacity-75 cursor-not-allowed'
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
            <span className={loading ? 'opacity-0' : 'relative z-10'}>Registrar e Brilhar</span>
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;