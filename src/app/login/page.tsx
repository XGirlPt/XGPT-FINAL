'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/backend/store';
import { fetchProfileFromDatabase } from '@/backend/services/profileService';
import { useTranslation } from 'react-i18next';
import InputWithIcon from './_ui/InputWithIcon';
import { Button } from '@/components/ui/button';
import { addProfileData } from '@/backend/reducers/profileSlice';
import { login } from '@/backend/actions/ProfileActions';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { loading, error, isLoggedIn, userUID } = useSelector((state: any) => state.profile);

  // Redireciona para /my-account se o usuário já estiver logado
  useEffect(() => {
    if (isLoggedIn && userUID) {
      router.push('/my-account');
    }
  }, [isLoggedIn, userUID, router]);

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      // Dispara o login thunk e espera o resultado
      const result = await dispatch(login({ email, password })).unwrap();
      
      // Verifica se o resultado contém o userUID
      const uid = result.userUID || result.user?.uid;
      if (!uid) {
        throw new Error('UID do usuário não encontrado no resultado do login.');
      }

      console.log('Login bem-sucedido - userUID:', uid);

      // Busca os dados do perfil e atualiza o estado Redux
      const profileData = await fetchProfileFromDatabase(uid);
      if (profileData) {
        dispatch(addProfileData(profileData));
      } else {
        console.warn('Nenhum dado de perfil encontrado para o usuário:', uid);
      }

      // O redirecionamento será tratado pelo useEffect
    } catch (err: any) {
      const message = err.message || t('loginPage.error') || 'Email ou senha incorretos.';
      setErrorMessage(message);
      console.error('Erro ao fazer login:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">{t('loginPage.title')}</h1>
      <div className="w-full max-w-md space-y-4">
        <InputWithIcon
          label={t('loginPage.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
        />
        <InputWithIcon
          label={t('loginPage.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
        />
        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
        >
          {loading ? 'Fazendo login...' : t('loginPage.login_button')}
        </Button>
        {(errorMessage || error) && (
          <p className="text-red-500 text-center">{errorMessage || error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;