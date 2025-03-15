'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import supabase from '@/backend/database/supabase';
import { registerUser } from '@/backend/actions/ProfileActions';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import FeaturesList from './_ui/FeaturedList';
import ListRegister from '@/components/register/list-register';
import CommonInput from '@/components/ui/common-input';

// Função para determinar a URL de redirecionamento dinâmica
const getRedirectUrl = () => {
  if (typeof window === 'undefined') return 'https://www.xgirl.pt/registo/confirmar-email'; // Default no servidor
  const host = window.location.host;
  if (host.includes('localhost')) {
    return 'http://localhost:3000/registo/confirmar-email';
  } else if (host.includes('vercel.app')) {
    return `${window.location.origin}/registo/confirmar-email`;
  }
  return 'https://www.xgirl.pt/registo/confirmar-email'; // Produção
};

const Registre1: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    name: string;
    unavailable: boolean;
  } | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleOptionSelect = (option: { id: number; name: string; unavailable: boolean }) => {
    setSelectedOption(option);
    console.log('Opção selecionada:', option);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      console.error('As senhas não correspondem');
      return;
    }

    try {
      console.log('Iniciando registro com:', { email, password });
      const redirectTo = getRedirectUrl(); // URL dinâmica
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        console.error('Erro ao se inscrever:', error.message, error);
        return;
      }

      console.log('Usuário registrado com sucesso:', data.user);

      if (data?.user?.id) {
        dispatch(registerUser(data.user.id, email));
        console.log('Redux atualizado com userUID:', data.user.id);
      }

      console.log('E-mail enviado automaticamente pelo Supabase para:', email, 'com redirectTo:', redirectTo);

      if (!selectedOption) {
        console.warn('Nenhuma opção selecionada. Redirecionando para confirmar-email por padrão.');
        router.push('/registo/confirmar-email');
        return;
      }

      console.log('Opção selecionada para redirecionamento:', selectedOption);
      switch (selectedOption.id) {
        case 1:
          console.log('Redirecionando para /registo/confirmar-email');
          router.push('/registo/confirmar-email');
          break;
        case 2:
          console.log('Inserindo em etablissements...');
          const { error: etablissementError } = await supabase.from('etablissements').insert([
            {
              userUID: data.user?.id,
              userData: data.user,
            },
          ]);
          if (etablissementError) {
            console.error('Erro ao inserir em etablissements:', etablissementError);
            return;
          }
          console.log('Redirecionando para /registre-etablissement');
          router.push(`/registre-etablissement?email=${email}&userUID=${data.user?.id}`);
          break;
        case 3:
          console.log('Redirecionando para /registre-entrada');
          router.push('/registre-entrada');
          break;
        default:
          console.warn('Opção inválida, redirecionando para /registo/confirmar-email por padrão');
          router.push('/registo/confirmar-email');
          break;
      }
    } catch (error: any) {
      console.error('Erro ao se inscrever:', error.message, error);
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
    <div className="pb-4 bg-gray-100 dark:bg-black rounded-md pt-24">
      <div className="h-full dark:bg-black justify-center md:flex">
        <FeaturesList />
        <div className="bg-gray-100 dark:bg-gray-800 mt-10 w-full max-w-lg mx-auto border border-gray-700 rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-center text-gray-500 dark:text-white mb-6">
            {t('RegisterPage.create_account_title')}
          </h1>
          <form className="space-y-6">
            <CommonInput
              label={t('RegisterPage.email_label')}
              placeholder={t('RegisterPage.email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
            <div>
              <ListRegister handleOptionSelect={handleOptionSelect} />
            </div>
            <CommonInput
              label={t('RegisterPage.password_label')}
              placeholder={t('RegisterPage.password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
            <CommonInput
              label={t('RegisterPage.confirm_password_label')}
              placeholder={t('RegisterPage.confirm_password_placeholder')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              required
            />
            <div className="mt-6">
              <button
                type="button"
                onClick={handleRegister}
                className="w-full py-3 px-6 bg-pink-500 hover:bg-pink-400 text-white text-sm font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                {t('RegisterPage.register_button')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registre1;