"use client";
import {useState, useEffect, ChangeEvent, useRef, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateNome, updateIdade, updateTelefone, updateCidade, updateDistrito, updateAdress, updateLongitude, updateLatitude} from "@/actions/ProfileActions";
import {Switch, FormControlLabel, } from "@mui/material";
import Link from "next/link";
import FiltroAltura from "@/components/filtros/filtro-altura";
import FiltroCorpo from "@/components/filtros/filtro-corpo";
import FiltroMamas from "@/components/filtros/filtro-mamas";
import FiltroOlhos from "@/components/filtros/filtro-olhos";
import FiltroPeito from "@/components/filtros/filtro-peito";
import FiltroTatuagem from "@/components/filtros/filtro-tatuagem";
import FiltroPelos from "@/components/filtros/filtro-pelos";
import FiltroSigno from "@/components/filtros/filtro-signo";
import supabase from "@/database/supabase";
import CommonInput from "@/components/ui/common-input";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import FiltroCabelo from "@/components/filtros/filtro-cabelo";
import {useTranslation} from "react-i18next";


declare global {
	interface Window {
		google: any;
	}
}

const RegistoEntrada = () => {
	const dispatch = useDispatch();
	const [nome, setNome] = useState("");
	const [idade, setIdade] = useState("");
	const [telefone, setTelefone] = useState("");
	const [cidade, setCidade] = useState("");
	const [distrito, setDistrito] = useState("");
	const [adress, setAdress] = useState("");
	const [useAdress, setUseAdress] = useState(false);
	const [googleLoaded, setGoogleLoaded] = useState(false);
	const autocompleteRef = useRef<any>(null);
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);

	const nomeRedux = useSelector((state: any) => state.profile?.profile?.nome);
	const idadeRedux = useSelector((state: any) => state.profile?.profile?.idade);
	const telefoneRedux = useSelector((state: any) => state.profile?.profile?.telefone);
	const cidadeRedux = useSelector((state: any) => state.profile?.profile?.cidade);
	const distritoRedux = useSelector((state: any) => state.profile?.profile?.distrito);
	const adressRedux = useSelector((state: any) => state.profile?.profile?.adress);
		const {t, i18n} = useTranslation();

	useEffect(() => {
		setNome(nomeRedux || "");
		setIdade(idadeRedux || "");
		setTelefone(telefoneRedux || "");
		setCidade(cidadeRedux || "");
		setDistrito(distritoRedux || "");
		setAdress(adressRedux || "");
	}, [nomeRedux, idadeRedux, telefoneRedux, cidadeRedux, distritoRedux, adressRedux]);

	const handleNomeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNome(event.target.value);
		dispatch(updateNome(event.target.value));
	};

	const handleIdadeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setIdade(event.target.value);
		dispatch(updateIdade(event.target.value));
	};

	const handleTelefoneChange = (event: ChangeEvent<HTMLInputElement>) => {
		setTelefone(event.target.value);
		dispatch(updateTelefone(event.target.value));
	};

	const handleCidadeChange = (event: ChangeEvent<HTMLInputElement>) => {
		setCidade(event.target.value);
		dispatch(updateCidade(event.target.value));
	};

	const handleDistritoChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDistrito(event.target.value);
		dispatch(updateDistrito(event.target.value));
	};

	const handleAdressChange = (event: ChangeEvent<HTMLInputElement>) => {
		setAdress(event.target.value);
		dispatch(updateAdress(event.target.value));
	};

	const handleFiltroTatuagem = (filtro: any) => {
		// Aqui você pode atualizar o estado geral de filtros
		console.log("Filtro de Tatuagem atualizado:", filtro);
	};

	const toggleAdressOption = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		setUseAdress(checked);
		if (checked) {
			setCidade("");
			setDistrito("");
			dispatch(updateCidade(""));
			dispatch(updateDistrito(""));
		} else {
			setAdress("");
			dispatch(updateAdress(""));
		}
	};

	const handleSelectAddress = useCallback((address: string, lat: number, lng: number) => {
		setAdress(address);
		setLatitude(lat);
		setLongitude(lng);
		dispatch(updateAdress(address));
		dispatch(updateLatitude(lat));
		dispatch(updateLongitude(lng));
	}, [dispatch])

	// Carregamento dinâmico do script do Google
	useEffect(() => {
		const loadGoogleAPI = () => {
		  if (typeof window !== "undefined" && !window.google) {
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC9gd59nW47Bg63ksUnNd2HmigKDUDGA7E&libraries=places`;
			script.async = true;
			script.onload = () => setGoogleLoaded(true);
			document.body.appendChild(script);
		  } else {
			setGoogleLoaded(true);
		  }
		};
	
		loadGoogleAPI();
	  }, []); 

	  
	  useEffect(() => {
		if (googleLoaded && useAdress && window.google && !autocompleteRef.current) {
			const input = document.getElementById("adress-input") as HTMLInputElement;

			if (input && !autocompleteRef.current) {
				if (window.google && window.google.maps && window.google.maps.places) {
					autocompleteRef.current = new window.google.maps.places.Autocomplete(input, {
						types: ["geocode"],
						componentRestrictions: { country: "pt" },
					});

					autocompleteRef.current.addListener("place_changed", () => {
						const place = autocompleteRef.current.getPlace();
						if (place?.formatted_address) {
							const lat = place.geometry.location.lat();
							const lng = place.geometry.location.lng();
							// Call handleSelectAddress with the correct lat/lng values
							handleSelectAddress(place.formatted_address, lat, lng); 
						}
					});
				} else {
					console.error("Google Maps não foi carregado corretamente.");
				}
			}
		}

		return () => {
			if (autocompleteRef.current) {
				autocompleteRef.current.unbindAll();
				autocompleteRef.current = null;
			}
		};
	}, [googleLoaded, useAdress, handleSelectAddress]);

	useEffect(() => {
		const getSession = async () => {
			const {data, error} = await supabase.auth.getSession();
			if (error || !data.session) {
				console.log("Erro ao verificar sessão:", error);
			} else {
				console.log("Sessão iniciada:", data.session);
			}
		};
		getSession();
	}, []);

	return (
		<Dialog open onClose={() => {}} fullWidth>

<DialogContent className='max-w-4xl w-full  h-2/3 md:h-4/5 sm:max-h-[80vh] p-0  overflow-hidden'>

<DialogHeader className='bg-pink-900 py-6 px-4 md:px-10'>
<h1 className='text-3xl font-bold tracking-wide text-white justify-center items-center'>{t('profileR2.createTitle')}
</h1>
				<DialogTitle className='text-sm mt-2 text-gray-200'>
				{t('profileR2.createSubtitle')}  <strong>Xgirl.pt</strong>
			</DialogTitle>
			</DialogHeader>

			<div className='p-8 space-y-8 overflow-y-auto'>
  {/* Grupo de inputs em duas colunas no desktop e uma coluna no mobile */}
  <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
    <CommonInput 
            label={t('input.name')}
			value={nome} 
      onChange={handleNomeChange}
	  placeholder={t('input.namePlaceholder')}
	  />
    <CommonInput 
            label={t('input.age')}
			value={idade} 
      onChange={handleIdadeChange} 
	  placeholder={t('input.agePlaceholder')}
	  />
    <CommonInput 
            label={t('input.phone')}
			value={telefone} 
      onChange={handleTelefoneChange} 
	  placeholder={t('input.phonePlaceholder')}
	  />
  </div>

  <div>
    <label className='block text-sm font-medium text-gray-300'> {t('input.chooseOption')}
	</label>
    <FormControlLabel 
      control={<Switch checked={useAdress} onChange={toggleAdressOption} color='primary' />} 
	  label={t('input.useFullAddress')}
	  className="text-gray-300"
	  />

    {useAdress ? (
      <div className='mt-6'>
        <CommonInput
                label={t('input.fullAddress')}
				id='adress-input'
          value={adress}
          onChange={(e: string) => setAdress(e)}
		  placeholder={t('input.fullAddressPlaceholder')}
		  />
      </div>
    ) : (
		<div className=' mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
        <CommonInput 
                label={t('input.city')}
				value={cidade} 
          onChange={handleCidadeChange} 
		  placeholder={t('input.cityPlaceholder')}
		  />
        <CommonInput 
                label={t('input.district')}
				value={distrito} 
          onChange={handleDistritoChange}
		  placeholder={t('input.districtPlaceholder')}
		  />
      </div>
    )}
  </div>

  {/* Filtros em duas colunas no desktop e uma no mobile */}
  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    <FiltroAltura />
    <FiltroCorpo />
    <FiltroOlhos />
	<FiltroCabelo/>
    <FiltroMamas />
    <FiltroPeito />
    <FiltroPelos />
    <FiltroTatuagem />
    <FiltroSigno />
  </div>
</div>

<div className="justify-around">
			<DialogFooter className='bg-gray-800 pb-4 '>
				<Link href='/'>
					<Button variant='voltar' color='secondary' className='px-6 py-3'>
					{t('button.back')}
					</Button>
				</Link>
				<Link href='/registo/registo-contacto'>
					<Button variant='guarder' color='primary' className='px-6 py-3'>
					{t('button.createAccount')}
					</Button>
				</Link>
			</DialogFooter>
			</div>
			</DialogContent>
		</Dialog>
		
	);
};

export default RegistoEntrada;
