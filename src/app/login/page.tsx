'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import supabase from '@/backend/database/supabase';
import { useDispatch } from 'react-redux';
import {
  loginSuccess,
  loginFailure,
  addProfileData,
} from '@/backend/actions/ProfileActions';
import { fetchProfileFromDatabase } from '@/backend/services/profileService';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import InputWithIcon from './_ui/InputWithIcon';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const storedEmail = localStorage.getItem('email');

    if (token && storedEmail) {
      dispatch(
        loginSuccess({
          email: storedEmail,
          token,
          user: { uid: localStorage.getItem('userUID') || '' },
        })
      );
      router.push('/my-account'); // Redireciona para my-account ao carregar
    }
  }, [dispatch, router]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setErrorMessage('');
    const { data: user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage('Email ou senha incorretos.');
      dispatch(loginFailure(error.message));
    } else if (user) {
      const userUID = user.user.id;
      if (!userUID) {
        setErrorMessage('Erro ao recuperar os dados do usuário.');
        return;
      }

      try {
        const profileData = await fetchProfileFromDatabase(userUID);
        dispatch(addProfileData(profileData));
      } catch (fetchError) {
        setErrorMessage('Erro ao carregar dados do perfil.');
        return;
      }

      const token = user.session.refresh_token;
      dispatch(
        loginSuccess({
          email: user.user.email,
          token,
          user: { uid: userUID },
        })
      );

      localStorage.setItem('userToken', token);
      localStorage.setItem('email', email);
      localStorage.setItem('userUID', userUID);
      router.push('/my-account'); // Redireciona para my-account após login
    } else {
      setErrorMessage('Erro ao processar o login.');
    }
  };

  return (
    <>
      <Head>
        <title>Connexion - X-Girl</title>
      </Head>
      <div className="flex flex-col items-center mt-36 h-screen pb-4">
        <div className="w-full mt-10 max-w-md md:w-1/3 rounded-lg shadow-2xl border px-6 py-6 space-y-4">
          <h1 className="text-3xl font-extrabold text-center text-pink-500 mb-4">
            {t('loginPage.title')}
          </h1>
          <p className="text-center text-gray-400 text-sm mb-4">
            {t('loginPage.description')}
          </p>
          <div className="space-y-4">
            <InputWithIcon
              label={t('loginPage.email')}
              type="email"
              placeholder={t('loginPage.email_placeholder')}
              value={email}
              onChange={handleEmailChange}
              required
            />
            <InputWithIcon
              label={t('loginPage.password')}
              type="password"
              placeholder={t('loginPage.password_placeholder')}
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {errorMessage && (
              <div className="text-center bg-pink-100 text-pink-500 border border-pink-500 rounded-lg p-2 text-sm">
                {errorMessage}
              </div>
            )}
          </div>
          <Button onClick={handleLogin} variant="guarder" className="w-full">
            {t('loginPage.login_button')}
          </Button>
          <div className="text-center mt-4">
            <Link href="/regista2" className="text-pink-500 hover:text-pink-600 font-semibold">
              {t('loginPage.register_link')}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;