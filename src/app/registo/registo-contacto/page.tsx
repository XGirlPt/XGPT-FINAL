'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { updateServico, updatePagamento, updateLingua, updateDescription } from '@/backend/actions/ProfileActions';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import FiltroPrice from '@/components/filtros/filtro-tarifa';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  // Dados do Redux
  const servicoRedux = useSelector((state: any) => state.profile?.profile?.servico || []);
  const pagamentoRedux = useSelector((state: any) => state.profile?.profile?.pagamento || []);
  const linguaRedux = useSelector((state: any) => state.profile?.profile?.lingua || []);
  // const descriptionRedux = useSelector((state: any) => state.profile?.profile?.description || '');

  // Estado inicial das categorias
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
        { id: 'pt', label: t('profile.linguas.portuguese'), checked: false },
        { id: 'en', label: t('profile.linguas.english'), checked: false },
        { id: 'fr', label: t('profile.linguas.french'), checked: false },
        { id: 'es', label: t('profile.linguas.spanish'), checked: false },
        { id: 'de', label: t('profile.linguas.german'), checked: false },
        { id: 'it', label: t('profile.linguas.italian'), checked: false },
        { id: 'ru', label: t('profile.linguas.russian'), checked: false },
        { id: 'ar', label: t('profile.linguas.arabic'), checked: false },
      ],
    },
    {
      id: 'services',
      title: t('services.title'),
      options: [
        { id: '69', label: t('profile.servico.69'), checked: false },
        { id: 'analingus-active', label: t('profile.servico.Anulingus Activo'), checked: false },
        { id: 'analingus-passive', label: t('profile.servico.Anulingus Passivo'), checked: false },
        { id: 'active-golden', label: t('profile.servico.Champagne Dourado Activo'), checked: false },
        { id: 'champagne-golden', label: t('profile.servico.Champagne Dourado Passivo'), checked: false },
        { id: 'attends-couples', label: t('profile.servico.Atende Casais'), checked: false },
        { id: 'fingers-anus', label: t('profile.servico.Dedos Anal'), checked: false },
        { id: 'fingers-vagina', label: t('profile.servico.Dedos Vagina'), checked: false },
        { id: 'smooth-domination', label: t('profile.servico.Dominacao soft'), checked: false },
        { id: 'double-penetration', label: t('profile.servico.Dupla Penetracao'), checked: false },
        { id: 'duo', label: t('profile.servico.Duo'), checked: false },
        { id: 'body-ejaculation', label: t('profile.servico.Ejaculacao Corporal'), checked: false },
        { id: 'ejaculate-face', label: t('profile.servico.Ejaculer na Facial'), checked: false },
        { id: 'multiple-ejaculation', label: t('profile.servico.Multipla Ejeculacao'), checked: false },
        { id: 'face-sitting', label: t('profile.servico.Face Sitting'), checked: false },
        { id: 'fetishism', label: t('profile.servico.Fetichismo'), checked: false },
        { id: 'french-kiss', label: t('profile.servico.Beijo Portugals'), checked: false },
        { id: 'deep-throat', label: t('profile.servico.Garganta Profunda'), checked: false },
        { id: 'erotic-games', label: t('profile.servico.Jogos Eroticos'), checked: false },
        { id: 'lingerie', label: t('profile.servico.Lingerie'), checked: false },
        { id: 'erotic-massage', label: t('profile.servico.Massagem Erotica'), checked: false },
        { id: 'masturbation', label: t('profile.servico.Masturbacao'), checked: false },
        { id: 'porn-star', label: t('profile.servico.Experiencia Porn Star'), checked: false },
        { id: 'vip-service', label: t('profile.servico.Servico VIP'), checked: false },
        { id: 'group-sex', label: t('profile.servico.Sexo em Grupo'), checked: false },
        { id: 'sex-toys', label: t('profile.servico.Sex Toys'), checked: false },
        { id: 'active-sodomy', label: t('profile.servico.Sodomia Activa'), checked: false },
        { id: 'passive-sodomy', label: t('profile.servico.Sodomia Passiva'), checked: false },
        { id: 'striptease', label: t('profile.servico.Striptease'), checked: false },
      ],
    },
    {
      id: 'description',
      title: t('description.title'),
    },
  ]);

  // const [description, setDescription] = useState<string> h('');
  const [activeTab, setActiveTab] = useState('payment');

  // Sincroniza o estado inicial apenas uma vez na montagem
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
    // setDescription(descriptionRedux || '');
  }, []); // Sem dependências, executa apenas na montagem

  // Handle checkbox changes
  const handleCheckboxChange = (categoryId: string, optionId: string, checked: boolean) => {
    const updatedCategories = categories.map((category) => {
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
    setCategories(updatedCategories);

    const selectedOptions = updatedCategories
      .find((cat) => cat.id === categoryId)!
      .options!.filter((opt) => opt.checked)
      .map((opt) => opt.id);

    if (categoryId === 'payment') {
      dispatch(updatePagamento(selectedOptions));
    } else if (categoryId === 'languages') {
      dispatch(updateLingua(selectedOptions));
    } else if (categoryId === 'services') {
      dispatch(updateServico(selectedOptions));
    }
  };

  // Handle description change
  // const handleDescriptionChange = (content: string) => {
  //   setDescription(content);
  //   dispatch(updateDescription(content));
  // };

  // Renderiza o conteúdo da aba ativa
  const getActiveCategoryContent = () => {
    const category = categories.find((cat) => cat.id === activeTab);
    if (!category) return null;

    return (
      <div className="bg-opacity-40  rounded-3xl p-6">
        {category.id === 'description' ? (
          <div className="w-full">
            {/* <Textarea
              name="description"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-800 text-gray-700 dark:bg-[#27191f] dark:text-gray-200 dark:border-gray-700"
              placeholder={t('description.placeholder')}
            /> */}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4  border border-1 border-pink-100 p-4 bg-pink-50 dark:bg-[#100007] dark:border-gray-900 bg-opacity-25 rounded-2xl">
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

  // Componente de botão de aba
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

  // Handle continuar (salva no Redux e navega)
  const handleContinue = () => {
    toast.success('Dados salvos localmente com sucesso!');
    window.location.href = '/registo/registo-fotos';
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

      {/* Desktop View - Vertical tabs on left */}
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

      {/* Mobile View - Horizontal tabs on top */}
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
    </div>
  );
}

export default RegistoContacto;