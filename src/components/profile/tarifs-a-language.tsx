import { Card } from '../ui/card';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  FaEuroSign,
  FaCcMastercard,
  FaBitcoin,
  FaCcVisa,
} from 'react-icons/fa';
import { RiPaypalLine } from 'react-icons/ri';
import { FaDollarSign } from 'react-icons/fa6';

interface Profile {
  lingua: string[];
  pagamento: string[];
  tarifa: number;
}

interface TarifsAndLanguageProps {
  selectedProfile?: Profile;
}

export function TarifsAndLanguage({ selectedProfile }: TarifsAndLanguageProps) {
  const { t } = useTranslation();

  // Recuperação dos dados do Redux
  const linguaRedux = useSelector(
    (state: any) => state.profile?.profile?.lingua
  );
  const tarifaRedux = useSelector(
    (state: any) => state.profile?.profile?.tarifa
  );

  // Ícones dos métodos de pagamento
  const paymentIcons: { [key: string]: JSX.Element } = {
    Paypall: <RiPaypalLine className="text-blue-400 w-5 h-5" />,
    Bitcoin: <FaBitcoin className="text-orange-400 w-5 h-5" />,
    Euro: <FaEuroSign className="text-yellow-500 w-5 h-5" />,
    Mastercard: <FaCcMastercard className="text-blue-400 w-5 h-5" />,
    Dollars: <FaDollarSign className="text-blue-400 w-5 h-5" />,
    Visa: <FaCcVisa className="text-blue-400 w-5 h-5" />,
  };

  // Função para buscar bandeiras de idiomas
  const obterBandeira = (lingua: string): string => {
    switch (lingua) {
      case t('language.russian'):
        return '/Flags/ru.svg';
      case t('language.german'):
        return '/Flags/ale.svg';
      case t('language.portuguese'):
        return '/Flags/pt.svg';
      case t('language.french'):
        return '/Flags/fr.svg';
      case t('language.english'):
        return '/Flags/ing.svg';
      case t('language.italian'):
        return '/Flags/it.svg';
      case t('language.spanish'):
        return '/Flags/es.svg';
      case t('language.arabic'):
        return '/Flags/ar.png';
      default:
        return '';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Cartão de Línguas */}
      <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
        <h2 className="text-3xl md:text-4xl mb-6">{t('profile.languages')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {linguaRedux &&
            linguaRedux.map((lingua: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Image
                  src={obterBandeira(lingua) || '/logo.webp'}
                  alt={`${lingua} flag`}
                  width={25}
                  height={25}
                />
                <span className="text-gray-800 dark:text-gray-200">
                  {lingua}
                </span>
              </div>
            ))}
        </div>
      </Card>

      {/* Cartão de Tarifas e Métodos de Pagamento */}
      <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
        <h2 className="text-3xl md:text-4xl mb-4">{t('profile.rates')}</h2>
        <p className="text-lg text-gray-800 dark:text-gray-200">
          {t('profile.tariffs_starting_from', {
            tarifa: selectedProfile?.tarifa || tarifaRedux,
          })}
        </p>

        <h2 className="text-3xl md:text-4xl mb-6 mt-4">
          {t('profile.accepts')}
        </h2>
        {selectedProfile?.pagamento &&
        Array.isArray(selectedProfile.pagamento) ? (
          <div className="grid grid-cols-3 gap-4">
            {selectedProfile.pagamento.map((pagamento, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-full"
              >
                {paymentIcons[pagamento] || null}
                <span className="text-sm text-gray-800 dark:text-gray-200">
                  {pagamento}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-500">
            {t('profile.no_payment_methods_selected')}
          </p>
        )}
      </Card>
    </div>
  );
}
