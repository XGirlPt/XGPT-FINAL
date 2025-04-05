import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  corpo: string;
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

// Mapas fixos em português (valores armazenados no banco)
const olhosEmPortugues = {
  Castanhos: 'Castanhos',
  Pretos: 'Pretos',
  Azuis: 'Azuis',
  Verdes: 'Verdes',
};

const origemEmPortugues = {
  Portuguesa: 'Portuguesa',
  Brasileira: 'Brasileira',
  Espanhola: 'Espanhola',
  Africana: 'Africana',
  Latina: 'Latina',
  Oriental: 'Oriental',
};

const signoEmPortugues = {
  Carneiro: 'Carneiro',
  Touro: 'Touro',
  Gémeos: 'Gémeos',
  Caranguejo: 'Caranguejo',
  Leão: 'Leão',
  Virgem: 'Virgem',
  Balança: 'Balança',
  Escorpião: 'Escorpião',
  Sagitário: 'Sagitário',
  Capricórnio: 'Capricórnio',
  Aquário: 'Aquário',
  Peixes: 'Peixes',
};

const cabeloEmPortugues = {
  Loiro: 'Loiro',
  Castanho: 'Castanho',
  Preto: 'Preto',
  Ruivo: 'Ruivo',
};

const corpoEmPortugues = {
  Magro: 'Magro',
  Atlético: 'Atlético',
  Médio: 'Médio',
  Robusto: 'Robusto',
};

const tatuagensEmPortugues = {
  Sim: 'Sim',
  Não: 'Não',
};

const pelosEmPortugues = {
  Depilado: 'Depilado',
  Parcial: 'Parcial',
  Natural: 'Natural',
};

const seiosEmPortugues = {
  Pequenos: 'Pequenos',
  Médios: 'Médios',
  Grandes: 'Grandes',
};

const mamasEmPortugues = {
  Natural: 'Natural',
  Silicone: 'Silicone',
};

export function AboutProfile({ selectedProfile }: AboutProfileProps) {
  const { t } = useTranslation();

  if (!selectedProfile) return null;

  // Função para verificar se um valor é válido (não é null, undefined ou vazio)
  const isValidValue = (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
  };

  // Função para traduzir valores dinamicamente
  const translateValue = (field: string, value: string): string => {
    if (!isValidValue(value)) return value; // Retorna o valor bruto se for inválido

    switch (field) {
      case 'olhos':
        const eyeMap: { [key: string]: string } = {
          Castanhos: 'brown',
          Pretos: 'black',
          Azuis: 'blue',
          Verdes: 'green',
        };
        const eyeKey = eyeMap[value] || value.toLowerCase();
        return t(`eyes.${eyeKey}`);
      case 'origem':
        const originMap: { [key: string]: string } = {
          Portuguesa: 'portuguese',
          Brasileira: 'brazilian',
          Espanhola: 'spanish',
          Africana: 'african',
          Latina: 'latin',
          Oriental: 'oriental',
        };
        const originKey = originMap[value] || value.toLowerCase();
        return t(`origin.${originKey}`);
      case 'signo':
        const zodiacMap: { [key: string]: string } = {
          Carneiro: 'aries',
          Touro: 'taurus',
          Gémeos: 'gemini',
          Caranguejo: 'cancer',
          Leão: 'leo',
          Virgem: 'virgo',
          Balança: 'libra',
          Escorpião: 'scorpio',
          Sagitário: 'sagittarius',
          Capricórnio: 'capricorn',
          Aquário: 'aquarius',
          Peixes: 'pisces',
        };
        const zodiacKey = zodiacMap[value] || value.toLowerCase();
        return t(`zodiac.${zodiacKey}`);
      case 'cabelo':
        const hairMap: { [key: string]: string } = {
          Loiro: 'blonde',
          Castanho: 'brown',
          Preto: 'black',
          Ruivo: 'red',
        };
        const hairKey = hairMap[value] || value.toLowerCase();
        return t(`hair.${hairKey}`);
      case 'corpo':
        const bodyMap: { [key: string]: string } = {
          Magro: 'slim',
          Atlético: 'athletic',
          Médio: 'medium',
          Robusto: 'robust',
        };
        const bodyKey = bodyMap[value] || value.toLowerCase();
        return t(`body.${bodyKey}`);
      case 'tatuagens':
        const tattooMap: { [key: string]: string } = {
          Sim: 'yes',
          Não: 'no',
        };
        const tattooKey = tattooMap[value] || value.toLowerCase();
        return t(`tattoos.${tattooKey}`);
      case 'pelos':
        const hairRemovalMap: { [key: string]: string } = {
          Depilado: 'shaved',
          Parcial: 'partial',
          Natural: 'natural',
        };
        const hairRemovalKey = hairRemovalMap[value] || value.toLowerCase();
        return t(`hair_removalPelos.${hairRemovalKey}`);
      case 'seios':
        const breastSizeMap: { [key: string]: string } = {
          Pequenos: 'small',
          Médios: 'medium',
          Grandes: 'large',
        };
        const breastSizeKey = breastSizeMap[value] || value.toLowerCase();
        return t(`breasts.${breastSizeKey}`);
      case 'mamas':
        const breastsMap: { [key: string]: string } = {
          Natural: 'natural',
          Silicone: 'silicone',
        };
        const breastsKey = breastsMap[value] || value.toLowerCase();
        return t(`breasts.${breastsKey}`);
      default:
        return value; // Campos como idade, altura, distrito, cidade não precisam de tradução
    }
  };

  const details = useMemo(
    () => [
      {
        label: t('input.age'),
        value: isValidValue(selectedProfile.idade) ? selectedProfile.idade : null,
        icon: <LiaBirthdayCakeSolid className="text-pink-500" />,
      },
      {
        label: t('filter.height'),
        value: isValidValue(selectedProfile.altura) ? selectedProfile.altura : null,
        icon: <GiBodyHeight className="text-pink-500" />,
      },
      {
        label: t('filterOlhos.eye_color'),
        value: isValidValue(selectedProfile.olhos) ? translateValue('olhos', selectedProfile.olhos) : null,
        icon: <FaEye className="text-pink-500" />,
      },
      {
        label: t('filter.hair_color'),
        value: isValidValue(selectedProfile.cabelo) ? translateValue('cabelo', selectedProfile.cabelo) : null,
        icon: <FaCheck className="text-pink-500" />,
      },
      {
        label: t('filterT.tattoos'),
        value: isValidValue(selectedProfile.tatuagens) ? translateValue('tatuagens', selectedProfile.tatuagens) : null,
        icon: <FaCheck className="text-pink-500" />,
      },
      {
        label: t('filterT.body'),
        value: isValidValue(selectedProfile.corpo) ? translateValue('corpo', selectedProfile.corpo) : null,
        icon: <FaCheck className="text-pink-500" />,
      },
      {
        label: t('filterPelos.hair_removal'),
        value: isValidValue(selectedProfile.pelos) ? translateValue('pelos', selectedProfile.pelos) : null,
        icon: <AiOutlineScissor className="text-pink-500" />,
      },
      {
        label: t('filterB.breast_size'),
        value: isValidValue(selectedProfile.seios) ? translateValue('seios', selectedProfile.seios) : null,
        icon: <FaCheck className="text-pink-500" />,
      },
      {
        label: t('filterB.breasts'),
        value: isValidValue(selectedProfile.mamas) ? translateValue('mamas', selectedProfile.mamas) : null,
        icon: <FaCheck className="text-pink-500" />,
      },
      {
        label: 'Distrito',
        value: isValidValue(selectedProfile.distrito) ? selectedProfile.distrito : null,
        icon: <FaMapMarkerAlt className="text-pink-500" />,
      },
      {
        label: t('input.city'),
        value: isValidValue(selectedProfile.cidade) ? selectedProfile.cidade : null,
        icon: <FaMapMarkerAlt className="text-pink-500" />,
      },
      {
        label: t('filter.origin'),
        value: isValidValue(selectedProfile.origem) ? translateValue('origem', selectedProfile.origem) : null,
        icon: <FaFlag className="text-pink-500" />,
      },
      {
        label: t('filterTa.signo'),
        value: isValidValue(selectedProfile.signo) ? translateValue('signo', selectedProfile.signo) : null,
        icon: signoIcons[selectedProfile.signo] || <TbZodiacPisces className="text-pink-500" />,
      },
    ],
    [selectedProfile, t]
  );

  // Filtra detalhes para remover aqueles com valores null, undefined ou vazio
  const filteredDetails = details.filter((detail) => isValidValue(detail.value));

  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
      <h2 className="text-3xl md:text-4xl mb-6">
        {t('aboutProfile.title', { name: selectedProfile.nome })}
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