import Image from 'next/image';
import { Card } from '../../components/ui/card';
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
  servico?: string[]; // Mantendo um array de strings para os serviços
}

interface ProvidedServicesProps {
  selectedProfile?: Profile;
}

export function ProvidedServices({ selectedProfile }: ProvidedServicesProps) {
  const { t } = useTranslation();

  if (!selectedProfile) return null;

  const servico = selectedProfile.servico;

  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
      <h2 className="text-3xl md:text-4xl mb-6">{t('profile.services_provided')}</h2>

      {servico && servico.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {servico.map((service, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-darkpink">
                <Image
                  src="/icons/check.png"
                  alt="check"
                  width={25}
                  height={25}
                />
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                {t(`profile.servico.${service}`)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-base mt-4">
          <p>{t('profile.no_services')}</p>
        </div>
      )}
    </Card>
  );
}
