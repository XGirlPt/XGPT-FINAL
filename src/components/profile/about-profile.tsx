import { Card } from '../ui/card';
import { FaCheck, FaMapMarkerAlt, FaFlag, FaEye } from 'react-icons/fa';
import { AiOutlineScissor } from 'react-icons/ai';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { GiBodyHeight } from 'react-icons/gi';
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
} from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

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

interface AboutProfileProps {
  selectedProfile?: Profile;
}

const signoIcons: { [key: string]: JSX.Element } = {
  Carneiro: <TbZodiacAries className="text-pink-500 mr-2" />,
  Touro: <TbZodiacTaurus className="text-pink-500 mr-2" />,
  Gémeos: <TbZodiacGemini className="text-pink-500 mr-2" />,
  Caranguejo: <TbZodiacCancer className="text-pink-500 mr-2" />,
  Leão: <TbZodiacLeo className="text-pink-500 mr-2" />,
  Virgem: <TbZodiacVirgo className="text-pink-500 mr-2" />,
  Balança: <TbZodiacLibra className="text-pink-500 mr-2" />,
  Escorpião: <TbZodiacScorpio className="text-pink-500 mr-2" />,
  Sagitário: <TbZodiacSagittarius className="text-pink-500 mr-2" />,
  Capricórnio: <TbZodiacCapricorn className="text-pink-500 mr-2" />,
  Aquário: <TbZodiacAquarius className="text-pink-500 mr-2" />,
  Peixes: <TbZodiacPisces className="text-pink-500 mr-2" />,
};

export function AboutProfile({ selectedProfile }: AboutProfileProps) {
  if (!selectedProfile) return null;
  const { t } = useTranslation();


  const details = [
    {
      label: t('input.age'),
      value: selectedProfile.idade,
      icon: <LiaBirthdayCakeSolid className="text-pink-500" />,
    },
    {
      label: t('filter.height'),
      value: selectedProfile.altura,
      icon: <GiBodyHeight className="text-pink-500" />,
    },
    // { label: "Peso", value: selectedProfile.peso, icon: <FaWeightScale className="text-pink-500" /> },
    {
      label: t('filterOlhos.eye_color'),
      value: selectedProfile.olhos,
      icon: <FaEye className="text-pink-500" />,
    },
    {
      label: t('filter.hair_color'),
      value: selectedProfile.cabelo,
      icon: <FaCheck className="text-pink-500" />,
    },
    {
      label: t('filterT.tattoos'),
      value: selectedProfile.tatuagens,
      icon: <FaCheck className="text-pink-500" />,
    },
    {
      label: t('filterP.hair_removal'),
      value: selectedProfile.pelos,
      icon: <AiOutlineScissor className="text-pink-500" />,
    },
    {
      label: t('filterB.breast_size'),
      value: selectedProfile.seios,
      icon: <FaCheck className="text-pink-500" />,
    },
    {
      label: t('filterB.breasts'),
      value: selectedProfile.mamas,
      icon: <FaCheck className="text-pink-500" />,
    },
    {
      label: 'Distrito',
      value: selectedProfile.distrito,
      icon: <FaMapMarkerAlt className="text-pink-500" />,
    },
    {
      label: t('input.city'),
      value: selectedProfile.cidade,
      icon: <FaMapMarkerAlt className="text-pink-500" />,
    },
    {
      label: t('filter.origin'),
      value: selectedProfile.origem,
      icon: <FaFlag className="text-pink-500" />,
    },
    {
      label: t('filterTa.signo'),
      value: selectedProfile.signo,
      icon: signoIcons[selectedProfile.signo] || (
        <TbZodiacPisces className="text-pink-500" />
      ),
    },
  ];

  const filteredDetails = details.filter((detail) => detail.value);


  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
      <h2 className="text-3xl md:text-4xl mb-6">
        Sobre {selectedProfile.nome}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-10">
      {filteredDetails.map((detail, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-4 font-body"
          >
            <div className="flex-none">{detail.icon}</div>
            <div className="flex-none text-gray-600 dark:text-gray-400">
              {detail.label}
            </div>
            <div className="flex-1 border-b border-dashed border-gray-300 dark:border-gray-700" />
            <div className="flex-none text-pink-600 font-medium">
              {detail.value}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
