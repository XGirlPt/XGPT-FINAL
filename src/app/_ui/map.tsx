import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from "@react-google-maps/api";
import {useState} from "react";
import MiniCard from "@/components/ui/mini-card";

interface Profile {
	id: number;
	nome: string;
	photos: string[];
	cidade: string;
	latitude: number;
	longitude: number;
}

interface MapProps {
	profiles: Profile[];
}

function Map({profiles}: MapProps) {
	const mapStyles = {
		height: "400px",
		width: "100%",
	};

	const defaultCenter = {
		lat: 38.7,
		lng: -10.13,
	};

	const validCoordinates = profiles.filter(profile => profile.latitude && profile.longitude);

	const center =
		validCoordinates.length > 0
			? {
					lat: validCoordinates[0].latitude!,
					lng: validCoordinates[0].longitude!,
			  }
			: defaultCenter;

	const zoom = validCoordinates.length > 0 ? 10 : 8;

	const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

	const {isLoaded, loadError} = useJsApiLoader({
		googleMapsApiKey: "AIzaSyC9gd59nW47Bg63ksUnNd2HmigKDUDGA7E",
	});

	if (!isLoaded) {
		return <div>Loading Map...</div>;
	}

	if (loadError) {
		console.error("Erro ao carregar o mapa:", loadError);
		return <div>Erro ao carregar o mapa</div>;
	}

	return (
		<div className='px-4 md:px-36 pb-20'>
			<GoogleMap mapContainerStyle={mapStyles} zoom={zoom} center={center}>
				{validCoordinates.map((profile, index) => (
					<Marker
						key={index}
						position={{
							lat: profile.latitude!,
							lng: profile.longitude!,
						}}
						onClick={() => setSelectedProfile(profile)}
					/>
				))}

				{selectedProfile && (
					<InfoWindow
						position={{
							lat: selectedProfile.latitude!,
							lng: selectedProfile.longitude!,
						}}
						onCloseClick={() => setSelectedProfile(null)}
						options={{
							pixelOffset: new google.maps.Size(0, -30),
						}}
					>
						<div
							style={{
								maxWidth: "220px",
								overflow: "hidden",
								textAlign: "center",
							}}
						>
							<MiniCard
								nome={selectedProfile.nome}
								cidade={selectedProfile.cidade}
								photo={selectedProfile.photos[0]} // Passa diretamente a foto
							/>
						</div>
					</InfoWindow>
				)}
			</GoogleMap>
		</div>
	);
}

export default Map;
