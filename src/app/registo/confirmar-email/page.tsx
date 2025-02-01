"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import supabase from "@/database/supabase";

const ConfirmarEmail = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const verifyEmailAndRedirect = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("access_token");

        if (token) {
          // Configura a sessão com os tokens recebidos
          await supabase.auth.setSession({
            access_token: token,
            refresh_token: queryParams.get("refresh_token") || "",
          });
        }

        // Verifica se o email foi confirmado
        const { data } = await supabase.auth.getUser();
        if (data?.user?.email_confirmed_at) {
          router.push("/registo/registo-entrada");
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
