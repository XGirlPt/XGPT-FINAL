import React from "react";
import { FaCheck, FaWeightScale } from "react-icons/fa6";
import { AiOutlineScissor } from "react-icons/ai";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaMapMarkerAlt, FaFlag, FaEye } from "react-icons/fa";
import { GiBodyHeight } from "react-icons/gi";
import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { Card, CardBody } from "@nextui-org/react";


interface Profile {
  nome: string;
  idade: number;
  altura: string;
  distrito: string;
  origem: string;
  cidade: string;
  peso: string;
  tatuagens: string;
  pelos: string;
  olhos: string;
  seios: string;
  mamas: string;
  signo: string;
  cabelo: string;
}

interface SobreProps {
  selectedProfile?: Profile;
}

const signoIcons: { [key: string]: JSX.Element } = {
  Carneiro: <TbZodiacAries className="text-pink-800 mr-2" />,
  Touro: <TbZodiacTaurus className="text-pink-800 mr-2" />,
  Gémeos: <TbZodiacGemini className="text-pink-800 mr-2" />,
  Caranguejo: <TbZodiacCancer className="text-pink-800 mr-2" />,
  Leão: <TbZodiacLeo className="text-pink-800 mr-2" />,
  Virgem: <TbZodiacVirgo className="text-pink-800 mr-2" />,
  Balança: <TbZodiacLibra className="text-pink-800 mr-2" />,
  Escorpião: <TbZodiacScorpio className="text-pink-800 mr-2" />,
  Sagitário: <TbZodiacSagittarius className="text-pink-800 mr-2" />,
  Capricórnio: <TbZodiacCapricorn className="text-pink-800 mr-2" />,
  Aquário: <TbZodiacAquarius className="text-pink-800 mr-2" />,
  Peixes: <TbZodiacPisces className="text-pink-800 mr-2" />,
};

const Sobre: React.FC<SobreProps> = ({ selectedProfile }) => {

  const { t, i18n } = useTranslation();

  return (
    <Card
      isBlurred
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6"
    >
      <CardBody>
        {/* Título */}
        <h2 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-400">
          {t("profile.about", { name: selectedProfile?.nome })}
        </h2>

        {/* Informações do Perfil */}
        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
          {selectedProfile?.idade && (
            <div className="flex items-center">
              <LiaBirthdayCakeSolid className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.idade}</p>
            </div>
          )}

          {selectedProfile?.altura && (
            <div className="flex items-center">
              <GiBodyHeight className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.altura}</p>
            </div>
          )}

{selectedProfile?.olhos && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.olhos}</p>
            </div>
          )}


          {selectedProfile?.distrito && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.distrito}</p>
            </div>
          )}

          {selectedProfile?.origem && (
            <div className="flex items-center">
              <FaFlag className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.origem}</p>
            </div>
          )}

          {selectedProfile?.cidade && (
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.cidade}</p>
            </div>
          )}

          {selectedProfile?.peso && (
            <div className="flex items-center">
              <FaWeightScale className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.peso}</p>
            </div>
          )}

          {selectedProfile?.cabelo && (
            <div className="flex items-center">
              <FaCheck className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.cabelo}</p>
            </div>
          )}

          {selectedProfile?.tatuagens && (
            <div className="flex items-center">
              <FaCheck className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.tatuagens}</p>
            </div>
          )}

          {selectedProfile?.pelos && (
            <div className="flex items-center">
              <AiOutlineScissor className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.pelos}</p>
            </div>
          )}

          {selectedProfile?.olhos && (
            <div className="flex items-center">
              <FaEye className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.olhos}</p>
            </div>
          )}

          {selectedProfile?.seios && (
            <div className="flex items-center">
              <FaCheck className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.seios}</p>
            </div>
          )}

          {selectedProfile?.mamas && (
            <div className="flex items-center">
              <FaCheck className="text-pink-500 mr-2" />
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.mamas}</p>
            </div>
          )}

          {selectedProfile?.signo && (
            <div className="flex items-center">
              {signoIcons[selectedProfile?.signo]}
              <p className="bg-white dark:bg-gray-800 ">{selectedProfile?.signo}</p>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default Sobre;




