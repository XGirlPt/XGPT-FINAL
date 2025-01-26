import {useEffect, useRef, useState} from "react";
import {LoadScript} from "@react-google-maps/api";

interface Props {
	onSelect: (address: string, lat: number, lng: number) => void;
}

const AddressAutocomplete: React.FC<Props> = ({onSelect}) => {
	const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Função para lidar com o carregamento do script do Google
	useEffect(() => {
		const handleScriptLoad = () => {
			setIsLoading(false);
		};

		const loadScript = () => {
			setIsLoading(true);
			const script = document.createElement("script");
			script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC9gd59nW47Bg63ksUnNd2HmigKDUDGA7E&libraries=places`;
			script.onload = handleScriptLoad;
			document.body.appendChild(script);
		};

		loadScript();
	}, []); // Executa uma vez quando o componente for montado

	// Função para inicializar o Autocomplete quando o campo de entrada ganha foco
	const handleLoad = () => {
		if (inputRef.current && !autocompleteRef.current) {
			autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
				types: ["geocode"],
				componentRestrictions: {country: "PT"},
			});

			autocompleteRef.current.addListener("place_changed", () => {
				const place = autocompleteRef.current?.getPlace();
				if (place && place.geometry) {
					const lat = place.geometry.location?.lat();
					const lng = place.geometry.location?.lng();
					const address = place.formatted_address || "";

					if (lat && lng) {
						// Passa as coordenadas junto com o endereço para o componente pai
						onSelect(address, lat, lng);
					} else {
						console.error("Coordenadas não encontradas para o endereço:", address);
					}
				}
			});
		}
	};

	return (
		<div>
			<input ref={inputRef} type='text' placeholder='Digite sua morada' onFocus={handleLoad} className='border rounded p-2 w-full' />
			{isLoading && <p>Carregando...</p>}
		</div>
	);
};

export default AddressAutocomplete;
