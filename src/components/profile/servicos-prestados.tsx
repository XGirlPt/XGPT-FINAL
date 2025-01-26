import React from "react";
import { FaCheckCircle, FaClipboardList } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Card, CardBody } from "@nextui-org/react";

interface ServicosPrestadosProps {
  selectedProfile: { servico?: string[] } | null;
}

const ServicosPrestados: React.FC<ServicosPrestadosProps> = ({
  selectedProfile,
}) => {
  const servico = selectedProfile?.servico;
  const { t } = useTranslation();

  return (
    <Card
      isBlurred
      className="bg-white dark:bg-gray-800 w-full rounded-xl shadow-lg"
    >
      <CardBody>
        <div className="grid gap-6 py-6 px-8">
          {/* Título */}
          <div className="flex items-center gap-3 mb-4">
            <FaClipboardList className="text-pink-500 text-2xl" />
            <p className="text-pink-500 text-2xl font-semibold">
              {t("profile.services_provided")}
            </p>
          </div>

          {/* Lista de Serviços */}
          {servico && Array.isArray(servico) && servico.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {servico.map((servicoItem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm bg-pink-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg px-3 py-2 shadow-sm"
                >
                  <FaCheckCircle className="text-pink-500" />
                  {t(`profile.servico.${servicoItem}`)}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400 text-base mt-4">
              <p>{t("profile.no_services")}</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default ServicosPrestados;
