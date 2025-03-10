'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
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
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNome,
  updateuserUID,
  updateIdade,
  updateTelefone,
  updateCidade,
  updateMamas,
  updateAltura,
  updateDistrito,
  updateOrigem,
  updateCorpo,
  updateCabelo,
  updateOlhos,
  updateSeios,
  updatePelos,
  updateSigno,
  updateTatuagem,
  updateTarifa,
} from '@/backend/actions/ProfileActions';
import { updateProfileData } from '@/backend/services/profileService';
import supabase from '@/backend/database/supabase';
import { useParams } from 'next/navigation';
import FiltroCabelo from '../filtros/filtro-cabelo';
import { useTranslation } from 'react-i18next';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  age: z.string().min(1, { message: 'Age is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  district: z.string().min(1, { message: 'District is required' }),
  origin: z.string().min(1, { message: 'Origin is required' }),
  height: z.string().min(1, { message: 'Height is required' }),
  breasts: z.string().min(1, { message: 'Breasts is required' }),
  body: z.string().min(1, { message: 'Body is required' }),
  hair: z.string().min(1, { message: 'Hair is required' }),
  eyes: z.string().min(1, { message: 'Eyes is required' }),
  breastSize: z.string().min(1, { message: 'Breast size is required' }),
  hairiness: z.string().min(1, { message: 'Hairiness is required' }),
  tattoos: z.string().min(1, { message: 'Tattoos information is required' }),
  sign: z.string().min(1, { message: 'Sign is required' }),
  selectRate: z.string().min(1, { message: 'Rate is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  briefBio: z.string().optional(),
  liveCam: z.boolean().default(false),
  attends: z.object({
    myPrivateApartment: z.boolean().default(false),
    dislocation: z.boolean().default(false),
    hotels: z.boolean().default(false),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function GeneralInformationForm() {
  const dispatch = useDispatch();
  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);
  const reduxProfile = useSelector((state: any) => state.profile?.profile || {});
const { t } = useTranslation();



  // Initialize the form with default values from Redux
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: reduxProfile.nome || '',
      age: reduxProfile.idade || '',
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
      selectRate: reduxProfile.tarifa || '',
      address: '',
      briefBio: '',
      liveCam: false,
      attends: {
        myPrivateApartment: false,
        dislocation: false,
        hotels: false,
      },
    },
  });

  // Sync userUID with Redux
  useEffect(() => {
    if (userUID) {
      console.log('Setting userUID:', userUID);
      dispatch(updateuserUID(userUID));
    } else {
      console.error('userUID is undefined from useParams');
    }
  }, [userUID, dispatch]);

  // Check Supabase session
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log('Sessão não iniciada ou erro ao verificar a sessão:', error);
      } else {
        console.log('Sessão iniciada:', data.session);
      }
    };
    getSession();
  }, []);

  // Handle form submission
  const handleGuardar = async () => {
    const data = form.getValues();
    const dataToUpdate = {
      nome: data.name,
      idade: data.age,
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
      tarifa: data.selectRate,
      userUID: userUID,
    };

    if (!userUID) {
      console.error('Cannot update profile: userUID is undefined');
      toast.error('Erro: ID do usuário não encontrado.');
      return;
    }

    try {
      console.log('Data to update:', dataToUpdate);
      await updateProfileData(dataToUpdate, userUID);
      toast.success('Alteração efetuada com sucesso!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      // Update Redux state
      dispatch(updateNome(data.name));
      dispatch(updateIdade(data.age));
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
      dispatch(updateTarifa(data.selectRate));
    } catch (error) {
      console.error('Erro ao atualizar perfil na base de dados:', error);
      toast.error('Erro ao atualizar perfil na base de dados: ' + error, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    }
  };

  // Handle form reset
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
      briefBio: '',
      liveCam: false,
      attends: {
        myPrivateApartment: false,
        dislocation: false,
        hotels: false,
      },
    });
  };

  return (
    <div className="p-8 bg-white dark:bg-[#100007] dark:border-gray-800 dark:border-opacity-50 dark:border rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">General Information</h1>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Button
            className="rounded-full dark:bg-transparent dark:text-white"
            variant="outline"
            onClick={handleClear}
          >
            Discard
          </Button>
          <Button
            onClick={handleGuardar}
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
          >
            Save Changes
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleGuardar)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name and Age */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem cl>
                  <FormLabel className="text-md font-medium text-gray-400">{t('input.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="relative w-full bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-medium text-gray-400">{t('input.age')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="relative w-full bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* Phone and City */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-medium text-gray-400">{t('input.phone')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="relative w-full bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-medium text-gray-400">{t('input.city')}</FormLabel>
                  <FormControl>
                    <Input {...field} className="relative w-full bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm cursor-pointer py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* District and Origin */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroDistrito
                      onChange={(value) => form.setValue('district', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroOrigem
                      onChange={(value) => form.setValue('origin', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroCorpo
                      onChange={(value) => form.setValue('body', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Height and Breasts */}
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroAltura
                      onChange={(value) => form.setValue('height', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breasts"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroMamas
                      onChange={(value) => form.setValue('breasts', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* Body and Hair */}
          
            <FormField
              control={form.control}
              name="hair"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroCabelo
                      onChange={(value) => form.setValue('hair', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* Eyes and Breast Size */}
            <FormField
              control={form.control}
              name="eyes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroOlhos
                      onChange={(value) => form.setValue('eyes', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breastSize"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroPeito
                      onChange={(value) => form.setValue('breastSize', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* Hairiness and Tattoos */}
            <FormField
              control={form.control}
              name="hairiness"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroPelos
                      onChange={(value) => form.setValue('hairiness', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tattoos"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FiltroTatuagem
                      onChange={(value) => form.setValue('tattoos', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />


            {/* Sign and Rate */}
            <FormField
              control={form.control}
              name="sign"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                  <FiltroSigno
                      key={t('filterTa.signo')} // Força re-render ao mudar a língua
                      onChange={(value) => form.setValue('sign', value)}
                      bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />


       <FormField
  control={form.control}
  name="selectRate" // Alinhado com o schema e handleGuardar
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <FiltroTarifa
          onChange={(value) => form.setValue('selectRate', value)} // Passa o valor numérico como string
          bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
        />
      </FormControl>
      <FormMessage className="text-red-500" />
    </FormItem>
  )}
/>
            {/* Address and Brief Bio */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} className="bg-[#FFF5F8] dark:bg-[#27191f]" />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="briefBio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="bg-[#FFF5F8] dark:bg-[#27191f] rounded-3xl"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            {/* Live Cam */}
            <FormField
              control={form.control}
              name="liveCam"
              render={({ field }) => (
                <FormItem className="flex items-top justify-between">
                  <FormLabel className="text-md font-medium">Live Cam</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Attends Checkboxes */}
            <div>
              <FormLabel className="text-md font-medium">Attends</FormLabel>
              <div className="flex flex-col sm:flex-row justify-between mt-2">
                <FormField
                  control={form.control}
                  name="attends.myPrivateApartment"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">My private apartment</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attends.dislocation"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Dislocation</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attends.hotels"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Hotels</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default GeneralInformationForm;