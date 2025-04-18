"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FiltroAltura from "@/components/filtros/filtro-altura";
import FiltroCorpo from "@/components/filtros/filtro-corpo";
import FiltroMamas from "@/components/filtros/filtro-mamas";
import FiltroOlhos from "@/components/filtros/filtro-olhos";
import FiltroPeito from "@/components/filtros/filtro-peito";
import FiltroPelos from "@/components/filtros/filtro-pelos";
import FiltroTatuagem from "@/components/filtros/filtro-tatuagem";
import FiltroSigno from "@/components/filtros/filtro-signo";
import FiltroCabelo from "@/components/filtros/filtro-cabelo";
import FiltroDistrito from "@/components/filtros/filtro-distrito";
import FiltroOrigem from "@/components/filtros/filtro-origem";
import { toast } from "react-toastify";
import {
  updateNome,
  updateIdade,
  updateTelefone,
  updateCidade,
  updateDistrito,
  updateAddress,
  updateLatitude,
  updateLongitude,
  updateAltura,
  updateCorpo,
  updateMamas,
  updateOlhos,
  updateSeios,
  updatePelos,
  updateTatuagem,
  updateSigno,
  updateCabelo,
  updateOrigem
} from "@/backend/reducers/profileSlice";
import { Switch } from "@/components/ui/switch";
import supabase from "@/backend/database/supabase";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().min(1, { message: "Age is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
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
  origin: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Category {
  id: string;
  title: string;
  fields: Array<keyof FormValues>;
}

export function RegistoEntrada() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation();
  const [useAddress, setUseAddress] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [addressInput, setAddressInput] = useState("");
  const [activeTab, setActiveTab] = useState("basicInfo");

  const profile = useSelector((state: any) => state.profile || {});

  const categories: Category[] = [
    {
      id: "basicInfo",
      title: "Informação Básica",
      fields: ["name", "age", "phone", "city", "district", "address", "useaddress"],
    },
    {
      id: "profileInfo",
      title: "Informação de Perfil",
      fields: ["height", "breasts", "body", "hair", "eyes", "breastSize", "hairiness","origin", "tattoos", "sign"],
    },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.nome || "",
      age: profile.idade?.toString() || "",
      phone: profile.telefone || "",
      city: profile.cidade || "",
      district: profile.distrito || "",
      address: profile.address || "",
      height: profile.altura || "",
      breasts: profile.mamas || "",
      body: profile.corpo || "",
      hair: profile.cabelo || "",
      eyes: profile.olhos || "",
      breastSize: profile.seios || "",
      hairiness: profile.pelos || "",
      tattoos: profile.tatuagem || "",
      sign: profile.signo || "",
      origin: profile.origem  || "",
      useaddress: profile.useaddress || false,
    },
  });

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        console.log("Erro ao verificar sessão:", error);
        router.push("/registo"); // Redireciona se não houver sessão
      } else {
        console.log("Sessão iniciada:", data.session);
      }
    };
    getSession();

    setUseAddress(form.getValues("useaddress"));
    setAddressInput(form.getValues("address") || "");
  }, [form, router]);

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${accessToken}&types=address,place&limit=5&country=PT`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Erro ao buscar sugestões do Mapbox:", error);
      toast.error("Erro ao buscar sugestões de endereço.");
    }
  };

  const handleSuggestionSelect = (suggestion: any) => {
    const city = suggestion.context.find((c: any) => c.id.includes("place"))?.text || "";
    const district = suggestion.context.find((c: any) => c.id.includes("region"))?.text || "";
    const address = suggestion.place_name || "";
    const [longitude, latitude] = suggestion.center || [0, 0];

    form.setValue("city", city);
    form.setValue("district", district);
    form.setValue("address", address);
    dispatch(updateCidade(city || null));
    dispatch(updateDistrito(district || null));
    dispatch(updateAddress(address || null));
    dispatch(updateLatitude(latitude));
    dispatch(updateLongitude(longitude));
    setAddressInput(address);
    setSuggestions([]);
  };

  const toggleAddressOption = (checked: boolean) => {
    setUseAddress(checked);
    form.setValue("useaddress", checked);
    if (checked) {
      form.setValue("city", "");
      form.setValue("district", "");
      dispatch(updateCidade(null));
      dispatch(updateDistrito(null));
    } else {
      form.setValue("address", "");
      dispatch(updateAddress(null));
      dispatch(updateLatitude(0));
      dispatch(updateLongitude(0));
      setAddressInput("");
      setSuggestions([]);
    }
  };

  const getActiveCategoryContent = () => {
    const category = categories.find((cat) => cat.id === activeTab);
    if (!category) return null;

    const commonInputClass =
      "relative w-full bg-[#FFF5F8] dark:bg-[#27191f] text-gray-600 dark:text-gray-200 text-sm py-2.5 pl-3 pr-10 text-left rounded-full focus:outline-none border border-pink-200 hover:border-pink-300 dark:border-[#2D3748] dark:hover:border-[#4A5568] transition-colors duration-200";
    const readOnlyClass = "text-gray-400 dark:text-gray-500 cursor-not-allowed";

    return (
      <div className="bg-opacity-40 rounded-3xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-1 border-pink-100 p-4 bg-pink-50 dark:bg-[#100007] dark:border-gray-900 bg-opacity-25 rounded-2xl">
          {category.fields.map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName}
              render={({ field }) => (
                <FormItem>
                  {fieldName === "name" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                      {t("input.name") || "Nome"}
                    </FormLabel>
                  )}
                  {fieldName === "age" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                      {t("input.age") || "Idade"}
                    </FormLabel>
                  )}
                  {fieldName === "phone" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                      {t("input.phone") || "Telefone"}
                    </FormLabel>
                  )}
                  {fieldName === "city" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                                                                    {t("input.city") || "Cidade"}

                    </FormLabel>
                  )}

                  {fieldName === "district" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                        {t("input.district") || "Distrito"}
                    </FormLabel>
                  )}


                  {fieldName === "address" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                                              {t("input.address") || "Morada"}

                    </FormLabel>
                  )}
                  {fieldName === "height" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                   
                    </FormLabel>
                  )}
                  {fieldName === "breasts" && (
                    <FormLabel className="text-md font-medium text-gray-400">

                    </FormLabel>
                  )}
                  {fieldName === "origin" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                     
                    </FormLabel>
                  )}
                  {fieldName === "body" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                 
                    </FormLabel>
                  )}
                  {fieldName === "hair" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                    </FormLabel>
                  )}
                  {fieldName === "eyes" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                 
                    </FormLabel>
                  )}
                  {fieldName === "breastSize" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                    </FormLabel>
                  )}
                  {fieldName === "hairiness" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                    </FormLabel>
                  )}
                  {fieldName === "tattoos" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                    </FormLabel>
                  )}
                  {fieldName === "sign" && (
                    <FormLabel className="text-md font-medium text-gray-400">
                    </FormLabel>
                  )}
                  <FormControl>
                    {fieldName === "name" || fieldName === "age" || fieldName === "phone" ? (
                      <Input
                        {...field}
                        className={commonInputClass}
                        onChange={(e) => {
                          field.onChange(e);
                          if (fieldName === "name") dispatch(updateNome(e.target.value || null));
                          if (fieldName === "age") dispatch(updateIdade(parseInt(e.target.value) || 0));
                          if (fieldName === "phone") dispatch(updateTelefone(e.target.value || null));
                        }}
                      />
                    ) : fieldName === "city" && useAddress ? (
                      <Input
                        value={field.value || ""}
                        readOnly
                        className={`${commonInputClass} ${readOnlyClass}`}
                      />
                    ) : fieldName === "city" ? (
                      <Input
                        {...field}
                        className={commonInputClass}
                        onChange={(e) => {
                          field.onChange(e);
                          dispatch(updateCidade(e.target.value || null));
                        }}
                      />
                    ) : fieldName === "district" && useAddress ? (
                      <Input
                        value={field.value || ""}
                        readOnly
                        className={`${commonInputClass} ${readOnlyClass}`}
                      />
                    ) : fieldName === "district" ? (
                      <FiltroDistrito
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("district", value);
                          dispatch(updateDistrito(value || null));
                        }}
                        disabled={useAddress}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === "address" ? (
                      <div className="flex flex-col gap-2">
                        <Input
                          value={addressInput}
                          onChange={(e) => {
                            if (useAddress) {
                              setAddressInput(e.target.value);
                              fetchSuggestions(e.target.value);
                              field.onChange(e.target.value);
                              dispatch(updateAddress(e.target.value || null));
                            }
                          }}
                          disabled={!useAddress}
                          placeholder={
                            useAddress
                              ? "Digite o endereço completo (apenas Portugal)"
                              : "Ative para inserir endereço"
                          }
                          className={commonInputClass}
                        />
                        <div className="flex items-center gap-2">
                          <Switch checked={useAddress} onCheckedChange={toggleAddressOption} />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t("input.useaddress") || "Morada Completa"}
                          </span>
                        </div>
                        {suggestions.length > 0 && useAddress && (
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
                    ) : fieldName === "height" ? (
                      <FiltroAltura
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("height", value);
                          dispatch(updateAltura(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === "breasts" ? (
                      <FiltroMamas
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("breasts", value);
                          dispatch(updateMamas(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === "origin" ? (
                      <FiltroOrigem
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("origin", value);
                          dispatch(updateOrigem(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />



                    ) : fieldName === "body" ? (
                      <FiltroCorpo
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("body", value);
                          dispatch(updateCorpo(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === "hair" ? (
                      <FiltroCabelo
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("hair", value);
                          dispatch(updateCabelo(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === "eyes" ? (
                      <FiltroOlhos
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("eyes", value);
                          dispatch(updateOlhos(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === "breastSize" ? (
                      <FiltroPeito
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("breastSize", value);
                          dispatch(updateSeios(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />
                    ) : fieldName === "hairiness" ? (
                      <FiltroPelos
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("hairiness", value);
                          dispatch(updatePelos(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />

                    ) : fieldName === "tattoos" ? (
                      <FiltroTatuagem
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("tattoos", value);
                          dispatch(updateTatuagem(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
                      />


                    ) : fieldName === "sign" ? (
                      <FiltroSigno
                        value={field.value || ""}
                        onChange={(value) => {
                          form.setValue("sign", value);
                          dispatch(updateSigno(value || null));
                        }}
                        bgColor="bg-[#FFF5F8] dark:bg-[#27191f]"
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
        isActive ? "text-darkpink border-l-2 border-l-darkpink font-medium" : "text-gray-600 hover:text-darkpink"
      }`}
    >
      {title}
    </button>
  );

  const handleSubmit = async () => {
    const data = form.getValues();
    try {
      // Pegar o userUID da sessão atual
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error("Usuário não autenticado. Por favor, faça login novamente.");
      }
      const userUID = sessionData.session.user.id;

      // Dados a serem enviados ao Supabase
      const profileData = {
        userUID,
        nome: data.name || null,
        idade: parseInt(data.age) || 0,
        telefone: data.phone || null,
        cidade: !data.useaddress ? data.city || null : null,
        distrito: !data.useaddress ? data.district || null : null,
        address: data.useaddress ? data.address || null : null,
        latitude: data.useaddress ? profile.latitude || 0 : 0,
        longitude: data.useaddress ? profile.longitude || 0 : 0,
        altura: data.height || null,
        mamas: data.breasts || null,
        origem: data.origin || null,
        corpo: data.body || null,
        cabelo: data.hair || null,
        olhos: data.eyes || null,
        seios: data.breastSize || null,
        pelos: data.hairiness || null,
        tatuagem: data.tattoos || null,
        signo: data.sign || null,
        status: false, // Perfil inativo até aprovação
        approval_status: 'pending', // Estado temporário
        premium: false, // Padrão para novos perfis
      };

      // Verificar se o perfil já existe no Supabase
      const { data: existingProfile, error: fetchError } = await supabase
        .from('ProfilesData')
        .select('*')
        .eq('userUID', userUID)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows found
        throw new Error(`Erro ao verificar perfil existente: ${fetchError.message}`);
      }

      if (existingProfile) {
        // Atualizar perfil existente
        const { error: updateError } = await supabase
          .from('ProfilesData')
          .update(profileData)
          .eq('userUID', userUID);
        if (updateError) {
          throw new Error(`Erro ao atualizar perfil: ${updateError.message}`);
        }
      } else {
        // Inserir novo perfil
        const { error: insertError } = await supabase
          .from('ProfilesData')
          .insert(profileData);
        if (insertError) {
          throw new Error(`Erro ao criar perfil: ${insertError.message}`);
        }
      }

      // Atualizar o estado no Redux
      dispatch(updateNome(data.name || null));
      dispatch(updateIdade(parseInt(data.age) || 0));
      dispatch(updateTelefone(data.phone || null));
      if (!data.useaddress) {
        dispatch(updateCidade(data.city || null));
        dispatch(updateDistrito(data.district || null));
      } else {
        dispatch(updateAddress(data.address || null));
        dispatch(updateLatitude(profile.latitude || 0));
        dispatch(updateLongitude(profile.longitude || 0));
      }
      dispatch(updateAltura(data.height || null));
      dispatch(updateMamas(data.breasts || null));
      dispatch(updateCorpo(data.body || null));
      dispatch(updateOrigem(data.origin || null));

      dispatch(updateCabelo(data.hair || null));
      dispatch(updateOlhos(data.eyes || null));
      dispatch(updateSeios(data.breastSize || null));
      dispatch(updatePelos(data.hairiness || null));
      dispatch(updateTatuagem(data.tattoos || null));
      dispatch(updateSigno(data.sign || null));

      toast.success("Dados salvos com sucesso!");
      router.push("/registo/registo-contacto");
    } catch (error: any) {
      console.error("Erro ao processar o registro:", error);
      toast.error(`Erro ao salvar os dados: ${error.message}`);
    }
  };

  return (
    <div className="p-8 bg-white dark:bg-[#100007] dark:border-gray-800 border dark:border-opacity-20 dark:border rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl font-bold">{t("profileR2.createTitle")}</h1>
          <p className="text-sm text-gray-500">
            {t("profileR2.createSubtitle")} <strong>Xgirl.pt</strong>
          </p>
          <Separator className="my-3 md:my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 md:hidden" />
        </div>
        <div className="w-full md:w-auto flex justify-between md:justify-end space-x-4 mt-3 md:mt-0">
          <Link href="/">
            <Button className="rounded-full dark:bg-transparent dark:text-white" variant="outline">
              {t("button.back")}
            </Button>
          </Link>
          <Button
            onClick={form.handleSubmit(handleSubmit)}
            className="bg-darkpink hover:bg-darkpinkhover text-white rounded-full"
          >
            {t("button.next")}
          </Button>
        </div>
      </div>
      <Separator className="my-6 h-0.5 bg-gray-200 dark:bg-gray-800 dark:opacity-50 hidden md:block" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                      ? "text-darkpink border-b-2 dark:border-b-gray-800 dark:border-opacity-50 border-darkpink font-medium"
                      : "text-gray-600"
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