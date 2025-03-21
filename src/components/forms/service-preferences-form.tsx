'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileArrayField, fetchProfileData } from '@/backend/actions/ProfileActions';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '../ui/separator';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SubscriptionPlan from '@/components/subscriptionPlan';

interface PreferenceOption {
  id: string;
  label: string;
  checked: boolean;
}

interface PreferenceCategory {
  id: string;
  title: string;
  options: PreferenceOption[];
}

export const ServicePreferencesForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // Dados do Redux
  const userUID = useSelector((state: { profile: { userUID?: string } }) => state.profile.userUID);
  const servicoRedux = useSelector((state: { profile: { servico?: string[] } }) => state.profile.servico || []);
  const pagamentoRedux = useSelector((state: { profile: { pagamento?: string[] } }) => state.profile.pagamento || []);
  const linguaRedux = useSelector((state: { profile: { lingua?: string[] } }) => state.profile.lingua || []);
  const isPremiumUser = useSelector((state: { profile: { premium: boolean } }) => state.profile.premium || false);
  const loading = useSelector((state: { profile: { loading: boolean } }) => state.profile.loading);
  const error = useSelector((state: { profile: { error?: string | null } }) => state.profile.error);

  const maxServicesFree = 4; // Limite de serviços para plano free

  // Estado inicial sincronizado com o Redux
  const [categories, setCategories] = useState<PreferenceCategory[]>([
    {
      id: 'payment',
      title: t('paymentMethods.title'),
      options: [
        { id: 'Euro', label: 'Euro', checked: pagamentoRedux.includes('Euro') },
        { id: 'Dollars', label: 'Dollars', checked: pagamentoRedux.includes('Dollars') },
        { id: 'Mbway', label: 'Mbway', checked: pagamentoRedux.includes('Mbway') },
        { id: 'Visa', label: 'Visa', checked: pagamentoRedux.includes('Visa') },
        { id: 'Mastercard', label: 'Mastercard', checked: pagamentoRedux.includes('Mastercard') },
        { id: 'Paypal', label: 'Paypal', checked: pagamentoRedux.includes('Paypal') },
        { id: 'Maestro', label: 'Maestro', checked: pagamentoRedux.includes('Maestro') },
        { id: 'Bitcoin', label: 'Bitcoin', checked: pagamentoRedux.includes('Bitcoin') },
      ],
    },
    {
      id: 'languages',
      title: t('languages.title'),
      options: [
        { id: 'Portuguese', label: t('profile.linguas.portuguese'), checked: linguaRedux.includes('Portuguese') },
        { id: 'English', label: t('profile.linguas.english'), checked: linguaRedux.includes('English') },
        { id: 'French', label: t('profile.linguas.french'), checked: linguaRedux.includes('French') },
        { id: 'Spanish', label: t('profile.linguas.spanish'), checked: linguaRedux.includes('Spanish') },
        { id: 'German', label: t('profile.linguas.german'), checked: linguaRedux.includes('German') },
        { id: 'Italian', label: t('profile.linguas.italian'), checked: linguaRedux.includes('Italian') },
        { id: 'Russian', label: t('profile.linguas.russian'), checked: linguaRedux.includes('Russian') },
        { id: 'Arabic', label: t('profile.linguas.arabic'), checked: linguaRedux.includes('Arabic') },
      ],
    },
    {
      id: 'services',
      title: t('services.title'),
      options: [
        { id: '69', label: t('profile.servico.69'), checked: servicoRedux.includes('69') },
        { id: 'analingus-active', label: t('profile.servico.Anulingus Activo'), checked: servicoRedux.includes('analingus-active') },
        { id: 'analingus-passive', label: t('profile.servico.Anulingus Passivo'), checked: servicoRedux.includes('analingus-passive') },
        { id: 'active-golden', label: t('profile.servico.Champagne Dourado Activo'), checked: servicoRedux.includes('active-golden') },
        { id: 'champagne-golden', label: t('profile.servico.Champagne Dourado Passivo'), checked: servicoRedux.includes('champagne-golden') },
        { id: 'attends-couples', label: t('profile.servico.Atende Casais'), checked: servicoRedux.includes('attends-couples') },
        { id: 'fingers-anus', label: t('profile.servico.Dedos Anal'), checked: servicoRedux.includes('fingers-anus') },
        { id: 'fingers-vagina', label: t('profile.servico.Dedos Vagina'), checked: servicoRedux.includes('fingers-vagina') },
        { id: 'smooth-domination', label: t('profile.servico.Dominacao soft'), checked: servicoRedux.includes('smooth-domination') },
        { id: 'double-penetration', label: t('profile.servico.Dupla Penetracao'), checked: servicoRedux.includes('double-penetration') },
        { id: 'duo', label: t('profile.servico.Duo'), checked: servicoRedux.includes('duo') },
        { id: 'body-ejaculation', label: t('profile.servico.Ejaculacao Corporal'), checked: servicoRedux.includes('body-ejaculation') },
        { id: 'ejaculate-face', label: t('profile.servico.Ejaculer na Facial'), checked: servicoRedux.includes('ejaculate-face') },
        { id: 'multiple-ejaculation', label: t('profile.servico.Multipla Ejeculacao'), checked: servicoRedux.includes('multiple-ejaculation') },
        { id: 'face-sitting', label: t('profile.servico.Face Sitting'), checked: servicoRedux.includes('face-sitting') },
        { id: 'fetishism', label: t('profile.servico.Fetichismo'), checked: servicoRedux.includes('fetishism') },
        { id: 'french-kiss', label: t('profile.servico.Beijo Portugals'), checked: servicoRedux.includes('french-kiss') },
        { id: 'deep-throat', label: t('profile.servico.Garganta Profunda'), checked: servicoRedux.includes('deep-throat') },
        { id: 'erotic-games', label: t('profile.servico.Jogos Eroticos'), checked: servicoRedux.includes('erotic-games') },
        { id: 'lingerie', label: t('profile.servico.Lingerie'), checked: servicoRedux.includes('lingerie') },
        { id: 'erotic-massage', label: t('profile.servico.Massagem Erotica'), checked: servicoRedux.includes('erotic-massage') },
        { id: 'masturbation', label: t('profile.servico.Masturbacao'), checked: servicoRedux.includes('masturbation') },
        { id: 'porn-star', label: t('profile.servico.Experiencia Porn Star'), checked: servicoRedux.includes('porn-star') },
        { id: 'vip-service', label: t('profile.servico.Servico VIP'), checked: servicoRedux.includes('vip-service') },
        { id: 'group-sex', label: t('profile.servico.Sexo em Grupo'), checked: servicoRedux.includes('group-sex') },
        { id: 'sex-toys', label: t('profile.servico.Sex Toys'), checked: servicoRedux.includes('sex-toys') },
        { id: 'active-sodomy', label: t('profile.servico.Sodomia Activa'), checked: servicoRedux.includes('active-sodomy') },
        { id: 'passive-sodomy', label: t('profile.servico.Sodomia Passiva'), checked: servicoRedux.includes('passive-sodomy') },
        { id: 'striptease', label: t('profile.servico.Striptease'), checked: servicoRedux.includes('striptease') },
      ],
    },
  ]);

  // Estado da aba ativa e popup de subscrição
  const [activeTab, setActiveTab] = useState('payment');
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  // Carregar dados iniciais do perfil ao montar
  useEffect(() => {
    if (userUID) {
      console.log('Carregando dados iniciais para userUID:', userUID);
      dispatch(fetchProfileData());
    } else {
      console.error('userUID está indefinido - verifique a autenticação');
    }
  }, [dispatch, userUID]);

  // Sincronizar o estado local com o Redux sempre que os valores mudarem
  useEffect(() => {
    console.log('Sincronizando categorias com Redux. servicoRedux:', servicoRedux);
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        options: category.options.map((option) => ({
          ...option,
          checked:
            category.id === 'payment'
              ? pagamentoRedux.includes(option.id)
              : category.id === 'languages'
              ? linguaRedux.includes(option.id)
              : servicoRedux.includes(option.id),
        })),
      }))
    );
  }, [pagamentoRedux, linguaRedux, servicoRedux]);

  // Handle checkbox changes com limite para serviços no plano free
  const handleCheckboxChange = (categoryId: string, optionId: string, checked: boolean) => {
    if (categoryId === 'services' && !isPremiumUser) {
      const currentServicesCount = categories
        .find((cat) => cat.id === 'services')!
        .options.filter((opt) => opt.checked).length;

      if (checked && currentServicesCount >= maxServicesFree) {
        toast.error(t('messages.maxServicesReached'));
        setShowSubscriptionPopup(true);
        return;
      }
    }

    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
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
  };

  // Handle discard button click
  const handleDiscard = () => {
    console.log('Descartando alterações. Restaurando para:', { servicoRedux, pagamentoRedux, linguaRedux });
    setCategories((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        options: category.options.map((option) => ({
          ...option,
          checked:
            category.id === 'payment'
              ? pagamentoRedux.includes(option.id)
              : category.id === 'languages'
              ? linguaRedux.includes(option.id)
              : servicoRedux.includes(option.id),
        })),
      }))
    );
    toast.info(t('button.discard'));
  };

  // Handle save button click
  const handleSave = async () => {
    const dataToUpdate = {
      pagamento: categories.find((cat) => cat.id === 'payment')!.options
        .filter((opt) => opt.checked)
        .map((opt) => opt.id),
      lingua: categories.find((cat) => cat.id === 'languages')!.options
        .filter((opt) => opt.checked)
        .map((opt) => opt.id),
      servico: categories.find((cat) => cat.id === 'services')!.options
        .filter((opt) => opt.checked)
        .map((opt) => opt.id),
    };

    if (!userUID) {
      toast.error(t('messages.userNotIdentified'));
      return;
    }

    try {
      console.log('Salvando preferências:', dataToUpdate);
      await Promise.all([
        dispatch(updateProfileArrayField({ field: 'pagamento', value: dataToUpdate.pagamento })).unwrap(),
        dispatch(updateProfileArrayField({ field: 'lingua', value: dataToUpdate.lingua })).unwrap(),
        dispatch(updateProfileArrayField({ field: 'servico', value: dataToUpdate.servico })).unwrap(),
      ]);
      toast.success(t('messages.preferencesUpdated'));
    } catch (error: any) {
      console.error('Erro ao atualizar preferências:', error);
      toast.error(t('messages.preferencesUpdateError'));
    }
  };

  // Find a category by ID
  const getActiveCategoryContent = () => {
    const category = categories.find((cat) => cat.id === activeTab);
    if (!category) return null;

    return (
      <div className="bg-[#f2ebee] dark:bg-[#27191f] bg-opacity-40 rounded-3xl p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {category.options.map((option) => (
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
      </div>
    );
  };

  // Tab button component for both mobile and desktop
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
      className={`py-3 px-4 text-left transition-colors focus:outline-none border-b-2 dark:border-b-gray-800 dark:border-opacity-50 dark:[#281a20] border-gray-200 ${
        isActive
          ? 'text-darkpink border-l-2 border-l-darkpink font-medium'
          : 'text-gray-600 hover:text-darkpink'
      }`}
    >
      {title}
    </button>
  );

  if (loading) return <div>{t('loading')}</div>;
  if (error) return <div>{t('error')}: {error}</div>;

  return (
    <div className="p-8 bg-white dark:bg-[#100007] dark:border-gray-800 dark:border-opacity-50 dark:border rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t('contactData.title')}</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Button className="rounded-full" variant="outline" onClick={handleDiscard}>
          {t('buttonSave.discard')}          
          </Button>
          <Button
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
            onClick={handleSave}
          >
          {t('buttonSave.saveChanges')}          
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
        <div className="flex border-b overflow-x-auto">
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

      {/* Popup de subscrição */}
      {showSubscriptionPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#100007] rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <Button
              className="absolute top-2 right-2"
              variant="ghost"
              onClick={() => setShowSubscriptionPopup(false)}
            >
              X
            </Button>
            <SubscriptionPlan userUID={userUID} onPlanoSelect={() => setShowSubscriptionPopup(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePreferencesForm;