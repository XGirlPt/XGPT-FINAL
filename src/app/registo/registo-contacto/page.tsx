'use client';

import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { updateServico, updatePagamento, updateLingua, updatePremium } from '@/backend/reducers/profileSlice';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import FiltroPrice from '@/components/filtros/filtro-tarifa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { SubscriptionPlan } from '../../../components/subscriptionPlan';
import { shallowEqual } from 'react-redux';

interface PreferenceOption {
  id: string;
  label: string;
  checked: boolean;
}

interface PreferenceCategory {
  id: string;
  title: string;
  options?: PreferenceOption[];
}

export function RegistoContacto() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // Seletor memoizado com shallowEqual para evitar novas referências
  const profile = useSelector((state: any) => state.profile?.profile || {}, shallowEqual);
  const servicoRedux = useMemo(() => profile.servico || [], [profile.servico]);
  const pagamentoRedux = useMemo(() => profile.pagamento || [], [profile.pagamento]);
  const linguaRedux = useMemo(() => profile.lingua || [], [profile.lingua]);
  const isPremium = useMemo(() => profile.premium || false, [profile.premium]);

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

  const [categories, setCategories] = useState<PreferenceCategory[]>([
    {
      id: 'payment',
      title: t('paymentMethods.title'),
      options: [
        { id: 'Euro', label: 'Euro', checked: false },
        { id: 'Dollars', label: 'Dollars', checked: false },
        { id: 'Mbway', label: 'Mbway', checked: false },
        { id: 'visa', label: 'Visa', checked: false },
        { id: 'Mastercard', label: 'Mastercard', checked: false },
        { id: 'Paypal', label: 'Paypal', checked: false },
        { id: 'Maestro', label: 'Maestro', checked: false },
        { id: 'Bitcoin', label: 'Bitcoin', checked: false },
      ],
    },
    {
      id: 'languages',
      title: t('languages.title'),

      options: [
        { id: 'pt', label: t('language.pt'), checked: linguaRedux.includes('pt') },
        { id: 'en', label: t('language.en'), checked: linguaRedux.includes('en') },
        { id: 'fr', label: t('language.fr'), checked: linguaRedux.includes('fr') },
        { id: 'es', label: t('language.es'), checked: linguaRedux.includes('es') },
        { id: 'de', label: t('language.de'), checked: linguaRedux.includes('de') },
        { id: 'it', label: t('language.it'), checked: linguaRedux.includes('it') },
        { id: 'ru', label: t('language.ru'), checked: linguaRedux.includes('ru') },
        { id: 'ar', label: t('language.ar'), checked: linguaRedux.includes('ar') },
      ],
    },
    {
      id: 'services',
      title: t('services.title'),
      options: [
        { id: '69', label: t('servico.69'), checked: false },
        { id: 'analingus-active', label: t('servico.AnulingusActivo'), checked: false },
        { id: 'analingus-passive', label: t('servico.AnulingusPassivo'), checked: false },
        { id: 'active-golden', label: t('servico.ChampagneDouradoActivo'), checked: false },
        { id: 'champagne-golden', label: t('servico.ChampagneDouradoPassivo'), checked: false },
        { id: 'attends-couples', label: t('servico.AtendeCasais'), checked: false },
        { id: 'fingers-anus', label: t('servico.DedosAnal'), checked: false },
        { id: 'fingers-vagina', label: t('servico.DedosVagina'), checked: false },
        { id: 'smooth-domination', label: t('servico.DominacaoSoft'), checked: false },
        { id: 'double-penetration', label: t('servico.DuplaPenetracao'), checked: false },
        { id: 'duo', label: t('servico.Duo'), checked: false },
        { id: 'body-ejaculation', label: t('servico.EjaculacaoCorporal'), checked: false },
        { id: 'ejaculate-face', label: t('servico.EjacularNaFacial'), checked: false },
        { id: 'multiple-ejaculation', label: t('servico.MultiplaEjaculacao'), checked: false },
        { id: 'face-sitting', label: t('servico.FaceSitting'), checked: false },
        { id: 'fetishism', label: t('servico.Fetichismo'), checked: false },
        { id: 'french-kiss', label: t('servico.BeijoFrances'), checked: false },
        { id: 'deep-throat', label: t('servico.GargantaProfunda'), checked: false },
        { id: 'erotic-games', label: t('servico.JogosEroticos'), checked: false },
        { id: 'lingerie', label: t('servico.Lingerie'), checked: false },
        { id: 'erotic-massage', label: t('servico.MassagemErotica'), checked: false },
        { id: 'masturbation', label: t('servico.Masturbacao'), checked: false },
        { id: 'porn-star', label: t('servico.ExperienciaPornStar'), checked: false },
        { id: 'vip-service', label: t('servico.ServicoVIP'), checked: false },
        { id: 'group-sex', label: t('servico.SexoEmGrupo'), checked: false },
        { id: 'sex-toys', label: t('servico.SexToys'), checked: false },
        { id: 'active-sodomy', label: t('servico.SodomiaActiva'), checked: false },
        { id: 'passive-sodomy', label: t('servico.SodomiaPassiva'), checked: false },
        { id: 'striptease', label: t('servico.Striptease'), checked: false },
        { id: 'roleplay', label: t('servico.JogoDePapeis'), checked: false },
        { id: 'foot-fetish', label: t('servico.FetichePorPes'), checked: false },
        { id: 'tantric-massage', label: t('servico.MassagemTantrica'), checked: false },
        { id: 'bdsm', label: t('servico.BDSM'), checked: false },
        { id: 'shower-together', label: t('servico.BanhoJuntos'), checked: false },
        { id: 'girlfriend-experience', label: t('servico.ExperienciaNamorada'), checked: false },
        { id: 'webcam-service', label: t('servico.ServicoWebcam'), checked: false },
        { id: 'threesome', label: t('servico.Trio'), checked: false },
        { id: 'erotic-dance', label: t('servico.DancaErotica'), checked: false },
        { id: 'prostate-massage', label: t('servico.MassagemProstatica'), checked: false },
        { id: 'spanking', label: t('servico.Spanking'), checked: false },
        { id: 'cuckold', label: t('servico.Cuckold'), checked: false },
        { id: 'voyeurism', label: t('servico.Voyeurismo'), checked: false },
        { id: 'phone-sex', label: t('servico.SexoTelefonico'), checked: false },
        { id: 'fisting', label: t('servico.Fisting'), checked: false },
        { id: 'swing', label: t('servico.Swing'), checked: false },
      ],
    },
    {
      id: 'description',
      title: t('description.title'),
    },
  ]);

  const [activeTab, setActiveTab] = useState('payment');
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  // Sincronização inicial apenas na montagem
  useEffect(() => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        options: category.options?.map((option) => ({
          ...option,
          checked:
            category.id === 'payment'
              ? pagamentoRedux.includes(option.id)
              : category.id === 'languages'
              ? linguaRedux.includes(option.id)
              : category.id === 'services'
              ? servicoRedux.includes(option.id)
              : option.checked,
        })),
      }))
    );
  }, [servicoRedux, pagamentoRedux, linguaRedux]); // Dependências fixas

  // Atualizar traduções apenas quando o idioma muda
  useEffect(() => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        title: t(`${category.id === 'payment' ? 'paymentMethods' : category.id === 'languages' ? 'languages' : category.id === 'services' ? 'services' : 'description'}.title`),
        options: category.options?.map((option) => ({
          ...option,
          label:
            category.id === 'payment'
              ? option.label
              : category.id === 'languages'
              ? t(`profile.linguas.${option.id === 'pt' ? 'portuguese' : option.id === 'en' ? 'english' : option.id === 'fr' ? 'french' : option.id === 'es' ? 'spanish' : option.id === 'de' ? 'german' : option.id === 'it' ? 'italian' : option.id === 'ru' ? 'russian' : 'arabic'}`)
              : category.id === 'services'
              ? t(`servico.${serviceIdToTranslationKey[option.id] || option.id}`)
              : option.label,
        })),
      }))
    );
  }, [i18n.language, t]);

  const handleCheckboxChange = (categoryId: string, optionId: string, checked: boolean) => {
    if (categoryId === 'services' && !isPremium && checked) {
      const selectedServices = categories
        .find((cat) => cat.id === 'services')!
        .options!.filter((opt) => opt.checked).length;

      if (selectedServices >= 5) {
        setShowUpgradePopup(true);
        return;
      }
    }

    setCategories((prevCategories) => {
      const newCategories = prevCategories.map((category) => {
        if (category.id === categoryId && category.options) {
          return {
            ...category,
            options: category.options.map((option) =>
              option.id === optionId ? { ...option, checked } : option
            ),
          };
        }
        return category;
      });

      // Calcular selectedOptions apenas uma vez, após a atualização
      const updatedCategory = newCategories.find((cat) => cat.id === categoryId);
      const selectedOptions = updatedCategory?.options
        ?.filter((opt) => opt.checked)
        .map((opt) => opt.id) || [];

      if (categoryId === 'payment') {
        dispatch(updatePagamento(selectedOptions));
      } else if (categoryId === 'languages') {
        dispatch(updateLingua(selectedOptions));
      } else if (categoryId === 'services') {
        dispatch(updateServico(selectedOptions));
      }

      return newCategories;
    });
  };

  const getActiveCategoryContent = () => {
    const category = categories.find((cat) => cat.id === activeTab);
    if (!category) return null;

    return (
      <div className="bg-opacity-40 rounded-3xl p-6">
        {category.id === 'description' ? (
          <div className="w-full">
            {/* Placeholder para descrição, se necessário */}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border border-1 border-pink-100 p-4 bg-pink-50 dark:bg-[#100007] dark:border-gray-900 bg-opacity-25 rounded-2xl">
            {category.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`${category.id}-${option.id}`}
                  checked={option.checked}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(category.id, option.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`${category.id}-${option.id}`}
                  className="text-sm font-normal dark:text-gray-400"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const TabButton = ({
    id,
    title,
    isActive,
    onClick,
  }: {
    id: string;
    title: string;
    isActive: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`py-3 px-4 text-left transition-colors focus:outline-none border dark:border-b-gray-800 dark:border-opacity-50 ${
        isActive
          ? 'text-darkpink border-l-2 border-l-darkpink font-medium'
          : 'text-gray-600 hover:text-darkpink'
      }`}
    >
      {title}
    </button>
  );

  const handleContinue = () => {
    toast.success('Dados salvos localmente com sucesso!');
    window.location.href = '/registo/registo-fotos';
  };

  const handlePlanoSelect = (plano: 'free' | 'premium') => {
    if (plano === 'premium') {
      dispatch(updatePremium(true));
      toast.success('Plano Premium selecionado! Continue seu registro com todas as opções desbloqueadas.');
    }
    setShowUpgradePopup(false);
  };

  return (
    <div className="p-8 bg-white dark:bg-[#100007] dark:border-gray-800 mt-8 border dark:border-opacity-20 dark:border rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t('contactData.title')}</h1>
          <p className="text-sm text-gray-500">{t('contactData.subtitle')}</p>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
          <div className="w-44 mt-4">
            <FiltroPrice />
          </div>
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Link href="/registo/registo-entrada">
            <Button className="rounded-full dark:bg-transparent dark:text-white" variant="outline">
              {t('button2.back')}
            </Button>
          </Link>
          <Button
            onClick={handleContinue}
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
          >
            {t('button2.continue')}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      <div className="hidden md:flex gap-8">
        <div className="w-64 flex flex-col">
          {categories.map((category) => (
            <TabButton
              key={category.id}
              id={category.id}
              title={category.title}
              isActive={activeTab === category.id}
              onClick={() => setActiveTab(category.id)}
            />
          ))}
        </div>
        <div className="flex-1">{getActiveCategoryContent()}</div>
      </div>

      <div className="md:hidden">
        <div className="flex border-b bg-pink-400 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`py-2 px-4 flex-shrink-0 transition-colors ${
                activeTab === category.id
                  ? 'text-darkpink border-b-2 dark:border-b-gray-800 dark:border-opacity-50 border-darkpink font-medium'
                  : 'text-gray-600'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
        <div className="mt-4">{getActiveCategoryContent()}</div>
      </div>

      <Dialog open={showUpgradePopup} onOpenChange={setShowUpgradePopup}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-darkpink">Escolha um Plano</DialogTitle>
            <DialogDescription>
              Você atingiu o limite de 5 serviços no plano gratuito. Escolha o plano Premium para desbloquear até 40 serviços e outros benefícios exclusivos! O pagamento será solicitado no final do registro.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <SubscriptionPlan onPlanoSelect={handlePlanoSelect} />
          </div>
          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setShowUpgradePopup(false)}
              className="rounded-full"
            >
              Continuar Grátis
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default RegistoContacto;