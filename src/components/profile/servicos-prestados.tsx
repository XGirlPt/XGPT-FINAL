import Image from 'next/image';
import { Card } from '../ui/card';
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
  servico?: string[];
}

interface ProvidedServicesProps {
  selectedProfile?: Profile;
}

export function ProvidedServices({ selectedProfile }: ProvidedServicesProps) {
  const { t } = useTranslation();

  if (!selectedProfile) return null;

  const servico = selectedProfile.servico || [];

  // Mapeamento de IDs de serviços para chaves do JSON de tradução
  const serviceIdToTranslationKey: { [key: string]: string } = {
    '69': '69',
    'analingus-active': 'AnulingusActivo',
    'analingus-passive': 'AnulingusPassivo',
    'active-golden': 'ChampagneDouradoActivo',
    'champagne-golden': 'ChampagneDouradoPassivo',
    'attends-couples': 'AtendeCasais',
    'fingers-anus': 'DedosAnal',
    'fingers-vagina': 'DedosVagina',
    'smooth-domination': 'DominacaoSoft',
    'double-penetration': 'DuplaPenetracao',
    'duo': 'Duo',
    'body-ejaculation': 'EjaculacaoCorporal',
    'ejaculate-face': 'EjacularNaFacial',
    'multiple-ejaculation': 'MultiplaEjaculacao',
    'face-sitting': 'FaceSitting',
    'fetishism': 'Fetichismo',
    'french-kiss': 'BeijoFrances',
    'deep-throat': 'GargantaProfunda',
    'erotic-games': 'JogosEroticos',
    'lingerie': 'Lingerie',
    'erotic-massage': 'MassagemErotica',
    'masturbation': 'Masturbacao',
    'porn-star': 'ExperienciaPornStar',
    'vip-service': 'ServicoVIP',
    'group-sex': 'SexoEmGrupo',
    'sex-toys': 'SexToys',
    'active-sodomy': 'SodomiaActiva',
    'passive-sodomy': 'SodomiaPassiva',
    'striptease': 'Striptease',
    'roleplay': 'JogoDePapeis',
    'foot-fetish': 'FetichePorPes',
    'tantric-massage': 'MassagemTantrica',
    'bdsm': 'BDSM',
    'shower-together': 'BanhoJuntos',
    'girlfriend-experience': 'ExperienciaNamorada',
    'webcam-service': 'ServicoWebcam',
    'threesome': 'Trio',
    'erotic-dance': 'DancaErotica',
    'prostate-massage': 'MassagemProstatica',
    'spanking': 'Spanking',
    'cuckold': 'Cuckold',
    'voyeurism': 'Voyeurismo',
    'phone-sex': 'SexoTelefonico',
    'fisting': 'Fisting',
    'swing': 'Swing',
  };

  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
      <h2 className="text-3xl md:text-4xl mb-6">
        {t('profile.services_provided')}
      </h2>

      {servico.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {servico.map((service, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-pink-600">
                <Image
                  src="/icons/check.png"
                  alt="check"
                  width={18}
                  height={18}
                />
              </span>
              <span className="text-gray-800 dark:text-gray-400 text-md">
                {t(`servico.${serviceIdToTranslationKey[service] || service}`)}
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