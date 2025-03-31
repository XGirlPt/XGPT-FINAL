"use client";

import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface MaioresProps {
  setShowMaiores: (value: boolean) => void;
}

const Maiores: React.FC<MaioresProps> = ({ setShowMaiores }) => {
  const [mostrarMaiores, setMostrarMaiores] = useState(false);

  useEffect(() => {
    const ageConfirmed = localStorage.getItem("ageConfirmed");
    if (ageConfirmed === "true") {
      setShowMaiores(false);
      return;
    }

    const timer = setTimeout(() => {
      setMostrarMaiores(true);
    }, 300);

    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [setShowMaiores]);

  const handleConfirm = () => {
    localStorage.setItem("ageConfirmed", "true");
    setMostrarMaiores(false);
    setShowMaiores(false);
  };

  const handleDecline = () => {
    window.location.href = "https://www.google.com";
  };

  if (!mostrarMaiores) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#f2ebee] dark:bg-[#100007] bg-opacity-75 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 scale-100">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Verificação de Idade
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Bem-vindo ao Xgirl.pt
        </p>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Este site contém materiais de natureza adulta, incluindo imagens e conteúdos sexualmente explícitos, destinados exclusivamente a maiores de idade. Ao prosseguir, você declara ter pelo menos 18 anos (ou a idade mínima legal em sua jurisdição) e concorda em visualizar este tipo de conteúdo. Utilizamos cookies essenciais para garantir o funcionamento do site e cookies analíticos opcionais para melhorar sua experiência. Para mais detalhes, consulte nossa{" "}
          <Link href="/politica-privacidade" className="text-blue-600 hover:underline dark:text-blue-400">
            Política de Privacidade
          </Link>.
        </p>
        <div className="flex flex-col mt-6 gap-4">
          <Button
            className="w-full bg-darkpink hover:bg-darkpinkhover text-white text-sm py-3 rounded-md transition duration-200"
            onClick={handleConfirm}
            aria-label="Confirmar que tenho 18 anos ou mais e acessar o site"
          >
            Tenho 18 anos ou mais - Acessar o site
          </Button>
          <Button
            variant="outline"
            className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white text-sm py-3 rounded-md transition duration-200"
            onClick={handleDecline}
            aria-label="Indicar que tenho menos de 18 anos e sair do site"
          >
            Tenho menos de 18 anos - Sair do site
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Maiores;