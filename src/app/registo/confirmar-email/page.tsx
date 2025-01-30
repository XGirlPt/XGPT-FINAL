'use client'; // Garantir que o código seja executado no lado do cliente

import { useRouter } from 'next/navigation'; // Importando o useRouter do next/navigation
import React, { useEffect, useState } from 'react';
import supabase from '@/database/supabase'; // Importe o Supabase para verificar a sessão

const ConfirmarEmail = () => {
  const [isClient, setIsClient] = useState(false); // Garantir que o código só execute no cliente
  const [isVerified, setIsVerified] = useState(false); // Controla a navegação
  const router = useRouter();

  useEffect(() => {
    // Garante que a navegação só ocorra no cliente
    setIsClient(true); // Seta isClient como true após a renderização no cliente
  }, []);

  useEffect(() => {
    if (isClient) {
      const checkEmailVerification = async () => {
        const session = await supabase.auth.getSession();

        // Verifica se o e-mail foi confirmado
        if (session?.user?.email_confirmed_at) {
          setIsVerified(true); // Marca que o e-mail está verificado
        }
      };

      checkEmailVerification(); // Verifica a confirmação do e-mail
    }
  }, [isClient]);

  useEffect(() => {
    if (isVerified) {
      // Realiza a navegação para a criação de perfil quando o e-mail for confirmado
      router.push('/registo/registo-entrada');
    }
  }, [isVerified, router]);

  if (!isClient) {
    return null; // Previne o render no servidor
  }

  return (
    <div className="h-screen">
      <h2>Por favor, verifique seu e-mail.</h2>
      <p>
        Um link foi enviado para o seu e-mail. Clique no link para confirmar sua
        conta.
      </p>
    </div>
  );
};

export default ConfirmarEmail;
