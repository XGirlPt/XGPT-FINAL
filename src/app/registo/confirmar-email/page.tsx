'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import supabase from '@/backend/database/supabase';

const ConfirmarEmail = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const verifyEmailAndRedirect = async () => {
        // Ler o fragmento da URL (após #)
        const hash = window.location.hash.substring(1); // Remove o "#"
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          // Configurar a sessão com os tokens recebidos
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.error('Erro ao configurar a sessão:', error.message);
            return;
          }

          // Verificar se o email foi confirmado
          const { data, error: userError } = await supabase.auth.getUser();
          if (userError) {
            console.error('Erro ao obter usuário:', userError.message);
            return;
          }

          if (data?.user?.email_confirmed_at) {
            console.log('Email confirmado com sucesso:', data.user);
            router.push('/registo/registo-entrada');
          } else {
            console.log('Email ainda não confirmado.');
          }
        } else {
          console.error('Tokens de autenticação não encontrados na URL.');
        }
      };

      verifyEmailAndRedirect();
    }
  }, [isClient, router]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-black">
      <h2 className="text-2xl font-semibold mb-4">Confirmação de E-mail</h2>
      <p className="mb-6">
        Um link foi enviado para o seu e-mail. Clique no link para confirmar sua conta.
      </p>
      <p className="text-blue-500">Verificando e-mail...</p>
    </div>
  );
};

export default ConfirmarEmail;