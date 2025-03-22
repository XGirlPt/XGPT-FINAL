"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";

interface MaioresProps {
  setShowMaiores: (value: boolean) => void;
}

const Maiores: React.FC<MaioresProps> = ({ setShowMaiores }) => {
  const [mostrarMaiores, setMostrarMaiores] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já confirmou a idade anteriormente
    const ageConfirmed = localStorage.getItem("ageConfirmed");
    if (ageConfirmed === "true") {
      setShowMaiores(false);
      return;
    }

    // Mostra o popup com um pequeno atraso para melhorar a experiência
    const timer = setTimeout(() => {
      setMostrarMaiores(true);
    }, 300);

    document.body.style.overflow = "hidden"; // Impedir rolagem
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = ""; // Liberar rolagem ao desmontar
    };
  }, [setShowMaiores]);

  const handleConfirm = () => {
    localStorage.setItem("ageConfirmed", "true"); // Salva a confirmação
    setMostrarMaiores(false);
    setShowMaiores(false);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com"; // Redireciona para o Google
  };

  if (!mostrarMaiores) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 scale-100">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Aviso de Conteúdo Adulto
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Bem-vindo ao Xgirl.pt
        </p>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          Este site contém conteúdo adulto, incluindo nudez e material sexualmente explícito. Ao entrar, você confirma que tem pelo menos 18 anos (ou a idade legal em sua jurisdição) e consente em visualizar este conteúdo. Usamos cookies essenciais para funcionamento e cookies analíticos opcionais (veja nossa Política de Privacidade).
        </p>
        <div className="flex justify-around mt-6 gap-4">
          <Button
            className="flex-1 bg-darkpink hover:bg-darkpinkhover text-white text-sm py-3 rounded-md transition duration-200"
            onClick={handleConfirm}
            aria-label="Confirmar que sou maior de 18 anos e entrar"
          >
            Sou maior de 18 anos - Entrar
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm py-3 rounded-md transition duration-200"
            onClick={handleDecline}
            aria-label="Indicar que sou menor de 18 anos e sair"
          >
            Sou menor de 18 anos - Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Maiores;