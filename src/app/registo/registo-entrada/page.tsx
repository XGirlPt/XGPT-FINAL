'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FiltroAltura from '@/components/filtros/filtro-altura';
import FiltroCorpo from '@/components/filtros/filtro-corpo';
import FiltroMamas from '@/components/filtros/filtro-mamas';
import FiltroOlhos from '@/components/filtros/filtro-olhos';
import FiltroPeito from '@/components/filtros/filtro-peito';
import FiltroPelos from '@/components/filtros/filtro-pelos';
import FiltroTatuagem from '@/components/filtros/filtro-tatuagem';
import FiltroSigno from '@/components/filtros/filtro-signo';
import FiltroCabelo from '@/components/filtros/filtro-cabelo';
import FiltroDistrito from '@/components/filtros/filtro-distrito';
import { toast } from 'react-toastify';
import {
  updateNome,
  updateIdade,
  updateTelefone,
  updateCidade,
  updateDistrito,
  updateAddress,
  updateLatitude,
  updateLongitude,
} from '@/backend/actions/ProfileActions';
import { Switch } from '@/components/ui/switch';
import supabase from '@/backend/database/supabase';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

declare global {
  interface Window {
    google: any;
  }
}

// Schema do formulário ajustado para o registro
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  age: z.string().min(1, { message: 'Age is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  city: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
  height: z.string().optional(),
  body: z.string().optional(),
  breasts: z.string().optional(),
  hair: z.string().optional(),
  eyes: z.string().optional(),
  breastSize: z.string().optional(),
  hairiness: z.string().optional(),
  tattoos: z.string().optional(),
  sign: z.string().optional(),
  useaddress: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface Category {
  id: string;
  title: string;
  fields: Array<keyof FormValues>;
}

export function RegistoEntrada() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const autocompleteRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState('basicInfo');

  // Define categorias para as abas
  const categories: Category[] = [
    {
      id: 'basicInfo',
      title: 'Informação Básica',
      fields: ['name', 'age', 'phone', 'city', 'district', 'address', 'useaddress'],
    },
    {
      id: 'profileInfo',
      title: 'Informação de Perfil',
      fields: ['height', 'breasts', 'body', 'hair', 'eyes', 'breastSize', 'hairiness', 'tattoos', 'sign'],
    },
  ];

  // Inicializa o formulário com valores vazios (registro)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
      phone: '',
      city: '',
      district: '',
      address: '',
      height: '',
      breasts: '',
      body: '',
      hair: '',
      eyes: '',
      breastSize: '',
      hairiness: '',
      tattoos: '',
      sign: '',
      useaddress: false,
    },
  });

  // Carrega o Google Maps API
  useEffect(() => {
    const loadGoogleAPI = () => {
      if (typeof window !== 'undefined' && !window.google) {
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
          script.async = true;
          script.onload = () => setGoogleLoaded(true);
          script.onerror = (error) => console.error('Erro ao carregar Google Maps:', error);
          document.body.appendChild(script);
        } else {
          setGoogleLoaded(true);
        }
      }
    };
    if (!googleLoaded) loadGoogleAPI();
  }, [googleLoaded]);

  // Configura o Autocomplete do Google Maps
  useEffect(() => {
    if (googleLoaded && form.getValues('useaddress') && window.google && !autocompleteRef.current) {
      const input = document.getElementById('address-input') as HTMLInputElement;
      if (input && window.google?.maps?.places) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(input, {
          types: ['geocode'],
          componentRestrictions: { country: 'pt' },
        });
        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current.getPlace();
          if (place?.formatted_address) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            form.setValue('address', place.formatted_address);
            dispatch(updateAddress(place.formatted_address));
            dispatch(updateLatitude(lat));
            dispatch(updateLongitude(lng));
          }
        });
      }
    }
    return () => {
      if (autocompleteRef.current) {
        autocompleteRef.current.unbindAll();
        autocompleteRef.current = null;
      }
    };
  }, [googleLoaded, form, dispatch]);

  // Verifica sessão do Supabase
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log('Erro ao verificar sessão:', error);
      } else {
        console.log('Sessão iniciada:', data.session);
      }
    };
    getSession();
  }, []);

  // Toggle para usar endereço completo
  const toggleaddressOption = (checked: boolean) => {
    form.setValue('useaddress', checked);
    if (checked) {
      form.setValue('city', '');
      form.setValue('district', '');
      dispatch(updateCidade(''));
      dispatch(updateDistrito(''));
    } else {
      form.setValue('address', '');
      dispatch(updateaddress(''));
    }
  };

  // Renderiza o conteúdo da aba ativa
  const getActiveCategoryContent = () => {
    const category = categories.find((cat) => cat.id === activeTab);
    if (!category) return null;

    return (
      <div className="bg-opacity-40 rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-1 border-pink-100 p-4 bg-pink-50 dark:bg-[#100007] dark:border-gray-900 bg-opacity-25 rounded-2xl">
          {category.fields.map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>                <FormLabel className="text-md font-medium text-gray-400">
                {t(`input.${fieldName}`) || fieldName}
              </FormLabel>                  <FormControl>
                    {fieldName === 'name' || fieldName === 'age' || fieldName === 'phone' || fieldName === 'city' ? (
                      <Input
                        {...field}
                        className="relative w-full bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200"
                        onChange={(e) => {
                          field.onChange(e);
                          if (fieldName === 'name') dispatch(updateNome(e.target.value));
                          if (fieldName === 'age') dispatch(updateIdade(e.target.value));
                          if (fieldName === 'phone') dispatch(updateTelefone(e.target.value));
                          if (fieldName === 'city') dispatch(updateCidade(e.target.value));
                        }}
                      />
                    ) : fieldName === 'district' ? (
                      <FiltroDistrito
                        onChange={(value) => {
                          form.setValue('district', value);
                          dispatch(updateDistrito(value));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'address' && form.getValues('useaddress') ? (
                      <Input
                        id="address-input"
                        {...field}
                        className="relative w-full bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200"
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(updateaddress(e.target.value));
                        }}
                      />
                    ) : fieldName === 'height' ? (
                      <FiltroAltura
                        onChange={(value) => form.setValue('height', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'breasts' ? (
                      <FiltroMamas
                        onChange={(value) => form.setValue('breasts', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'body' ? (
                      <FiltroCorpo
                        onChange={(value) => form.setValue('body', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'hair' ? (
                      <FiltroCabelo
                        onChange={(value) => form.setValue('hair', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'eyes' ? (
                      <FiltroOlhos
                        onChange={(value) => form.setValue('eyes', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'breastSize' ? (
                      <FiltroPeito
                        onChange={(value) => form.setValue('breastSize', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'hairiness' ? (
                      <FiltroPelos
                        onChange={(value) => form.setValue('hairiness', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'tattoos' ? (
                      <FiltroTatuagem
                        onChange={(value) => form.setValue('tattoos', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'sign' ? (
                      <FiltroSigno
                        onChange={(value) => form.setValue('sign', value)}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === 'useaddress' ? (
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          toggleaddressOption(checked);
                        }}
                      />
                    ) : null}
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          ))}
        </div>
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

  // Função de submissão do formulário
  const handleSubmit = async () => {
    const data = form.getValues();
    try {
      // Atualiza o Redux com os dados preenchidos
      dispatch(updateNome(data.name));
      dispatch(updateIdade(data.age));
      dispatch(updateTelefone(data.phone));
      if (!data.useaddress) {
        dispatch(updateCidade(data.city));
        dispatch(updateDistrito(data.district));
      } else {
        dispatch(updateaddress(data.address));
      }
      toast.success('Dados salvos localmente com sucesso!');
      // Navega para a próxima página
      window.location.href = '/registo/registo-contacto';
    } catch (error) {
      console.error('Erro ao processar o registro:', error);
      toast.error('Erro ao salvar os dados.');
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-[#100007] dark:border-gray-800 border dark:border-opacity-20 dark:border rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t('profileR2.createTitle')}</h1>
          <p className="text-sm text-gray-500">{t('profileR2.createSubtitle')} <strong>Xgirl.pt</strong></p>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Link href="/">
            <Button className="rounded-full dark:bg-transparent dark:text-white" variant="outline">
              {t('button.back')}
            </Button>
          </Link>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
          >
            {t('button.createAccount')}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
        </form>
      </Form>
    </div>
  );
}

export default RegistoEntrada;