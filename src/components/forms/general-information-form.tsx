'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileData } from '@/backend/services/profileService';
import { fetchProfileData } from '../../backend/actions/ProfileActions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FiltroTarifa from '@/components/filtros/filtro-tarifa';
import FiltroAltura from '@/components/filtros/filtro-altura';
import FiltroCorpo from '@/components/filtros/filtro-corpo';
import FiltroMamas from '@/components/filtros/filtro-mamas';
import FiltroOlhos from '@/components/filtros/filtro-olhos';
import FiltroPeito from '@/components/filtros/filtro-peito';
import FiltroPelos from '@/components/filtros/filtro-pelos';
import FiltroTatuagem from '@/components/filtros/filtro-tatuagem';
import FiltroSigno from '@/components/filtros/filtro-signo';
import FiltroDistrito from '@/components/filtros/filtro-distrito';
import FiltroOrigem from '@/components/filtros/filtro-origem';
import FiltroCabelo from '@/components/filtros/filtro-cabelo';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import {
  updateNome,
  updateIdade,
  updateTelefone,
  updateCidade,
  updateDistrito,
  updateOrigem,
  updateAltura,
  updateMamas,
  updateCorpo,
  updateCabelo,
  updateOlhos,
  updateSeios,
  updatePelos,
  updateTatuagem,
  updateSigno,
  updateTarifa,
  updateDescription,
  updateLive,
} from '../../backend/reducers/profileSlice';

// Esquema de validação
const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  age: z.string().min(1, { message: 'Idade é obrigatória' }),
  phone: z.string().min(1, { message: 'Telefone é obrigatório' }),
  city: z.string().min(1, { message: 'Cidade é obrigatória' }),
  district: z.string().min(1, { message: 'Distrito é obrigatório' }),
  origin: z.string().min(1, { message: 'Origem é obrigatória' }),
  height: z.string().min(1, { message: 'Altura é obrigatória' }),
  breasts: z.string().min(1, { message: 'Mamas é obrigatório' }),
  body: z.string().min(1, { message: 'Corpo é obrigatório' }),
  hair: z.string().min(1, { message: 'Cabelo é obrigatório' }),
  eyes: z.string().min(1, { message: 'Olhos é obrigatório' }),
  breastSize: z.string().min(1, { message: 'Tamanho dos seios é obrigatório' }),
  hairiness: z.string().min(1, { message: 'Pelagem é obrigatória' }),
  tattoos: z.string().min(1, { message: 'Informação de tatuagens é obrigatória' }),
  sign: z.string().min(1, { message: 'Signo é obrigatório' }),
  selectRate: z.string().min(1, { message: 'Tarifa é obrigatória' }),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  briefBio: z.string().optional(),
  liveCam: z.boolean().default(false),
  attends: z.object({
    myPrivateApartment: z.boolean().default(false),
    dislocation: z.boolean().default(false),
    hotels: z.boolean().default(false),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface Category {
  id: string;
  title: string;
  fields: Array<keyof FormValues>;
}

export function GeneralInformationForm() {
  const dispatch = useDispatch();
  const userUID = useSelector((state: any) => state.profile.userUID);
  const reduxProfile = useSelector((state: any) => state.profile || {});
  const loading = useSelector((state: any) => state.profile.loading);
  const error = useSelector((state: any) => state.profile.error);
  const isLoggedIn = useSelector((state: any) => state.profile.isLoggedIn);
  const { t } = useTranslation();

  const [useAddress, setUseAddress] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [addressInput, setAddressInput] = useState('');

  const categories: Category[] = [
    {
      id: 'basicInfo',
      title: 'Informação Básica',
      fields: ['name', 'age', 'phone', 'city', 'district', 'address'],
    },
    {
      id: 'profileInfo',
      title: 'Informação de Perfil',
      fields: [
        'origin',
        'height',
        'breasts',
        'body',
        'hair',
        'eyes',
        'breastSize',
        'hairiness',
        'tattoos',
        'sign',
        'selectRate',
        'liveCam',
        'attends',
      ],
    },
    {
      id: 'description',
      title: 'Descrição',
      fields: ['briefBio'],
    },
  ];

  const [activeTab, setActiveTab] = useState('basicInfo');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: reduxProfile.nome || '',
      age: reduxProfile.idade ? String(reduxProfile.idade) : '',
      phone: reduxProfile.telefone || '',
      city: reduxProfile.cidade || '',
      district: reduxProfile.distrito || '',
      origin: reduxProfile.origem || '',
      height: reduxProfile.altura || '',
      breasts: reduxProfile.mamas || '',
      body: reduxProfile.corpo || '',
      hair: reduxProfile.cabelo || '',
      eyes: reduxProfile.olhos || '',
      breastSize: reduxProfile.seios || '',
      hairiness: reduxProfile.pelos || '',
      tattoos: reduxProfile.tatuagem || '',
      sign: reduxProfile.signo || '',
      selectRate: reduxProfile.tarifa ? String(reduxProfile.tarifa) : '',
      address: reduxProfile.address || '',
      latitude: reduxProfile.latitude || 0,
      longitude: reduxProfile.longitude || 0,
      briefBio: reduxProfile.description || '',
      liveCam: reduxProfile.live || false,
      attends: {
        myPrivateApartment: reduxProfile.attends?.myPrivateApartment || false,
        dislocation: reduxProfile.attends?.dislocation || false,
        hotels: reduxProfile.attends?.hotels || false,
      },
    },
  });

  // Carrega os dados do perfil ao montar o componente
  useEffect(() => {
    console.log('Estado inicial - isLoggedIn:', isLoggedIn, 'userUID:', userUID);
    if (!isLoggedIn || !userUID) {
      console.log('Aguardando autenticação ou userUID...');
      return;
    }
    console.log('Carregando dados para userUID:', userUID);
    dispatch(fetchProfileData());
  }, [dispatch, userUID, isLoggedIn]);

  // Sincroniza o formulário com o Redux em tempo real
  useEffect(() => {
    console.log('Estado do Redux:', reduxProfile);
    form.reset({
      name: reduxProfile.nome || '',
      age: reduxProfile.idade ? String(reduxProfile.idade) : '',
      phone: reduxProfile.telefone || '',
      city: reduxProfile.cidade || '',
      district: reduxProfile.distrito || '',
      origin: reduxProfile.origem || '',
      height: reduxProfile.altura || '',
      breasts: reduxProfile.mamas || '',
      body: reduxProfile.corpo || '',
      hair: reduxProfile.cabelo || '',
      eyes: reduxProfile.olhos || '',
      breastSize: reduxProfile.seios || '',
      hairiness: reduxProfile.pelos || '',
      tattoos: reduxProfile.tatuagem || '',
      sign: reduxProfile.signo || '',
      selectRate: reduxProfile.tarifa ? String(reduxProfile.tarifa) : '',
      address: reduxProfile.address || '',
      latitude: reduxProfile.latitude || 0,
      longitude: reduxProfile.longitude || 0,
      briefBio: reduxProfile.description || '',
      liveCam: reduxProfile.live || false,
      attends: {
        myPrivateApartment: reduxProfile.attends?.myPrivateApartment || false,
        dislocation: reduxProfile.attends?.dislocation || false,
        hotels: reduxProfile.attends?.hotels || false,
      },
    });
    console.log('Valores do formulário após reset:', form.getValues());
  }, [reduxProfile, form]);

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${accessToken}&types=address,place&limit=5&country=PT`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error('Erro ao buscar sugestões do Mapbox:', error);
      toast.error('Erro ao buscar sugestões de endereço.');
    }
  };

  const handleSuggestionSelect = (suggestion: any) => {
    const city = suggestion.context.find((c: any) => c.id.includes('place'))?.text || '';
    const district = suggestion.context.find((c: any) => c.id.includes('region'))?.text || '';
    const address = suggestion.place_name || '';
    const [longitude, latitude] = suggestion.center || [0, 0];
    form.setValue('city', city);
    form.setValue('district', district);
    form.setValue('address', address);
    form.setValue('latitude', latitude);
    form.setValue('longitude', longitude);
    setAddressInput(address);
    setSuggestions([]);
  };

  const handleGuardar = async () => {
    const data = form.getValues();
    const dataToUpdate = {
      nome: data.name,
      idade: Number(data.age),
      telefone: data.phone,
      cidade: data.city,
      distrito: data.district,
      origem: data.origin,
      altura: data.height,
      mamas: data.breasts,
      corpo: data.body,
      cabelo: data.hair,
      olhos: data.eyes,
      seios: data.breastSize,
      pelos: data.hairiness,
      tatuagem: data.tattoos,
      signo: data.sign,
      tarifa: Number(data.selectRate),
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      description: data.briefBio,
      live: data.liveCam,
    };

    if (!userUID) {
      toast.error('Erro: ID do usuário não encontrado.');
      return;
    }

    try {
      await toast.promise(updateProfileData(dataToUpdate, userUID), {
        loading: 'A guardar alterações...',
        success: 'Alterações guardadas com sucesso!',
        error: 'Erro ao guardar alterações.',
      });

      dispatch(updateNome(data.name));
      dispatch(updateIdade(Number(data.age)));
      dispatch(updateTelefone(data.phone));
      dispatch(updateCidade(data.city));
      dispatch(updateDistrito(data.district));
      dispatch(updateOrigem(data.origin));
      dispatch(updateAltura(data.height));
      dispatch(updateMamas(data.breasts));
      dispatch(updateCorpo(data.body));
      dispatch(updateCabelo(data.hair));
      dispatch(updateOlhos(data.eyes));
      dispatch(updateSeios(data.breastSize));
      dispatch(updatePelos(data.hairiness));
      dispatch(updateTatuagem(data.tattoos));
      dispatch(updateSigno(data.sign));
      dispatch(updateTarifa(Number(data.selectRate)));
      dispatch(updateDescription(data.briefBio));
      dispatch(updateLive(data.liveCam));
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Erro ao atualizar perfil.');
    }
  };

  const handleClear = () => {
    form.reset({
      name: '',
      age: '',
      phone: '',
      city: '',
      district: '',
      origin: '',
      height: '',
      breasts: '',
      body: '',
      hair: '',
      eyes: '',
      breastSize: '',
      hairiness: '',
      tattoos: '',
      sign: '',
      selectRate: '',
      address: '',
      latitude: 0,
      longitude: 0,
      briefBio: '',
      liveCam: false,
      attends: { myPrivateApartment: false, dislocation: false, hotels: false },
    });
    setAddressInput('');
    setSuggestions([]);
  };

  const renderField = (fieldname: keyof FormValues, field: any) => {
    const commonInputClass =
      'relative w-full bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200';

    switch (fieldname) {
      case 'name':
      case 'age':
      case 'phone':
      case 'city':
      case 'district':
        return <Input {...field} className={commonInputClass} />;
      case 'address':
        if (useAddress) {
          return (
            <div className="relative">
              <Input
                value={addressInput}
                onChange={(e) => {
                  setAddressInput(e.target.value);
                  fetchSuggestions(e.target.value);
                }}
                placeholder="Digite o endereço completo (apenas Portugal)"
                className={commonInputClass}
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-[#27191f] border border-pink-200 dark:border-[#2D3748] rounded-lg mt-1 max-h-40 overflow-y-auto">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="px-3 py-2 text-sm text-gray-600 dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-[#4A5568] cursor-pointer"
                    >
                      {suggestion.place_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }
        return null;
      case 'height':
        return <FiltroAltura value={field.value} onChange={field.onChange} />;
      case 'origin':
        return <FiltroOrigem value={field.value} onChange={field.onChange} />;
      case 'breasts':
        return <FiltroMamas value={field.value} onChange={field.onChange} />;
      case 'body':
        return <FiltroCorpo value={field.value} onChange={field.onChange} />;
      case 'hair':
        return <FiltroCabelo value={field.value} onChange={field.onChange} />;
      case 'eyes':
        return <FiltroOlhos value={field.value} onChange={field.onChange} />;
      case 'breastSize':
        return <FiltroPeito value={field.value} onChange={field.onChange} />;
      case 'hairiness':
        return <FiltroPelos value={field.value} onChange={field.onChange} />;
      case 'tattoos':
        return <FiltroTatuagem value={field.value} onChange={field.onChange} />;
      case 'sign':
        return <FiltroSigno value={field.value} onChange={field.onChange} />;
      case 'selectRate':
        return <FiltroTarifa value={field.value} onChange={field.onChange} />;
      case 'briefBio':
        return (
          <Textarea
            {...field}
            className="w-full min-h-[150px] bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm p-4 rounded-xl border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors duration-200 resize-y"
            placeholder="Escreva uma breve descrição sobre você..."
          />
        );
      case 'liveCam':
        return <Switch checked={field.value} onCheckedChange={field.onChange} />;
      case 'attends':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={field.value.myPrivateApartment}
                onCheckedChange={(checked) => form.setValue('attends.myPrivateApartment', checked as boolean)}
              />
              <span>Apartamento Privado</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={field.value.dislocation}
                onCheckedChange={(checked) => form.setValue('attends.dislocation', checked as boolean)}
              />
              <span>Deslocação</span>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={field.value.hotels}
                onCheckedChange={(checked) => form.setValue('attends.hotels', checked as boolean)}
              />
              <span>Hotéis</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getActiveCategoryContent = () => {
    const category = categories.find((cat) => cat.id === activeTab);
    if (!category) return null;

    const gridClass =
      activeTab === 'description'
        ? 'grid grid-cols-1 md:grid-cols-1 gap-6 border border-1 border-pink-100 p-4 bg-pink-50 dark:bg-[#100007] dark:border-gray-900 bg-opacity-25 rounded-2xl'
        : 'grid grid-cols-1 md:grid-cols-2 gap-6 border border-1 border-pink-100 p-4 bg-pink-50 dark:bg-[#100007] dark:border-gray-900 bg-opacity-25 rounded-2xl';

    return (
      <div className="bg-opacity-40 rounded-3xl p-6">
        <div className={gridClass}>
          {category.fields.map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
              
                  <FormControl>{renderField(fieldName, field)}</FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          ))}
          {activeTab === 'basicInfo' && (
            <div className="flex items-center space-x-2 mt-4">
              <Switch
                checked={useAddress}
                onCheckedChange={(checked) => {
                  setUseAddress(checked);
                  if (!checked) {
                    form.setValue('address', '');
                    form.setValue('latitude', 0);
                    form.setValue('longitude', 0);
                    setAddressInput('');
                    setSuggestions([]);
                  }
                }}
              />
              <span>Usar Endereço Completo</span>
            </div>
          )}
        </div>
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
    className={`py-3 px-4 text-left transition-colors focus:outline-none border-b-2 dark:border-b-gray-800 dark:border-opacity-50 dark:[#281a20] border-gray-200 ${
      isActive
        ? 'text-darkpink border-l-2 border-l-darkpink font-medium'
        : 'text-gray-600 hover:text-darkpink'
    }`}
  >
    {title}
  </button>
  );

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  if (error) {
    return <div>{t('error')}: {error}</div>;
  }

  if (!isLoggedIn || !userUID) {
    return <div>Por favor, faça login para acessar esta página.</div>;
  }

  return (
    <div className="p-8 bg-white dark:bg-[#100007] dark:border-gray-800 border dark:border-opacity-20 dark:border rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">Informação Geral</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Button className="rounded-full dark:bg-transparent dark:text-white" variant="outline" onClick={handleClear}>
            {t('buttonSave.discard')}
          </Button>
          <Button onClick={handleGuardar} className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full">
            {t('buttonSave.saveChanges')}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGuardar)} className="space-y-6">
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
          <Toaster position="top-right" />
        </form>
      </Form>
    </div>
  );
}

export default GeneralInformationForm;