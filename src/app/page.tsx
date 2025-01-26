"use client";
import {useState, useEffect} from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import {fetchProfiles} from "@/services/profileService";
import "../styles/globals.min.css";

// import {useTranslation} from "react-i18next";
import {useLanguage} from "../context/LanguageContext"; // Importe o contexto de idioma
import {useTranslation} from "react-i18next";
import MainCard from "@/components/ui/main-card";

import LastAnnounce from "@/app/_ui/last-announce";
import CarouselG from "@/app/_ui/carosel-g";
import InfoCard from "@/components/ui/info-card";

// Chargement dynamique des composants lourds
// const CaroselG = dynamic(() => import("@/components/CaroselG"), {ssr: false});
// const InfoCard = dynamic(() => import("@/components/InfoCard"), {ssr: false});
// const LastAnnounce = dynamic(() => import("@/components/LastAnnounce"), {ssr: false});
// const MainCard = dynamic(() => import("@/components/MainCard"), {ssr: false});

interface Profile {
	nom: string;
	ville: string;
	adresse: string;
	photos: string[];
	histoires: string[];
	tag: string;
	tagtimestamp: string;
	certifie: boolean;
	enDirect: boolean;
	latitude?: number;
	longitude?: number;
}

async function fetchCoordinates(address: string): Promise<{latitude: number; longitude: number}> {
	if (!address || address.trim() === "") {
		console.error("Adresse invalide :", address);
		return {latitude: 0, longitude: 0};
	}

	try {
		const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=VOTRE_API_KEY`);
		const data = await response.json();

		if (data.results && data.results[0]) {
			const location = data.results[0].geometry.location;
			return {latitude: location.lat, longitude: location.lng};
		} else {
			console.error("Aucun résultat trouvé pour l'adresse :", address);
			return {latitude: 0, longitude: 0};
		}
	} catch (error) {
		console.error("Erreur lors de la récupération des coordonnées :", error);
		return {latitude: 0, longitude: 0};
	}
}

const Dashboard: React.FC = () => {
	const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [showMaiores, setShowMaiores] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [darkMode, setDarkMode] = useState(false);

	const {t, i18n} = useTranslation();
	const {language, changeLanguage} = useLanguage();

	useEffect(() => {
		async function fetchData() {
			try {
				const combinedProfiles = await fetchProfiles();

				const profilesWithCoordinates = await Promise.all(
					combinedProfiles.map(async (profile: Profile) => {
						if (profile.latitude && profile.longitude) {
							return profile;
						}

						if (profile.adresse && profile.adresse.trim() !== "") {
							const coordinates = await fetchCoordinates(profile.adresse);
							return {
								...profile,
								latitude: coordinates.latitude,
								longitude: coordinates.longitude,
							};
						} else {
							console.warn(`Adresse invalide pour le profil ${profile.nom}`);
							return profile;
						}
					})
				);

				const sortedProfiles = profilesWithCoordinates.sort((a, b) => new Date(b.tagtimestamp).getTime() - new Date(a.tagtimestamp).getTime());

				setProfiles(sortedProfiles);
			} catch (error) {
				console.error("Erreur lors de la récupération des profils :", error);
			}
		}

		fetchData();
	}, []);

	const handleCloseMaiores = () => {
		setShowMaiores(false);
		localStorage.setItem("hasVisitedDashboard", "true");
	};

	return (
		<div className='text-gray-600 w-full overflow-x-hidden'>
			<Head>
				<title>{t("dashboard.escort_title_en")}</title>
				<meta
					name='description'
					content='Découvrez les meilleures escort girls et masseuses érotiques en France. Explorez nos annonces en vedette et nos nouveautés.'
				/>
				<meta name='keywords' content='escort girls, masseuses érotiques, annonces, France, services' />
				<meta name='author' content='Xgirl' />
				<meta property='og:title' content='Escort Girls et Masseuses Érotiques en France' />
				<meta
					property='og:description'
					content='Trouvez les meilleures escort girls et masseuses érotiques en France. Consultez nos annonces et nos nouveautés.'
				/>
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://xgirl.fr' />
				<meta property='og:image' content='/public/photos/logo.webp' />
			</Head>

			<div className='w-full'>{profiles && profiles.length > 0 && <CarouselG profiles={profiles} />}</div>

			
			<div className='w-full px-4 sm:px-8 md:px-36 lg:px-36 xl:px-36 max-w-full'>
				<MainCard profiles={profiles} currentPage={currentPage} itemsPerPage={itemsPerPage} />
			</div>

			<p className='text-pink-800 text-2xl flex justify-center pb-5 w-full h-[50px]'>{t("dashboard.search_area")}</p>

			{/* <Map profiles={profiles} /> */}

			<div className="mx-36">
					<InfoCard />
					</div>

			{/* <div className='w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 max-w-full'>
				<p className='text-white text-3xl flex'>{t("dashboard.news")} </p>
			</div> */}

			<div className='w-full px-4 sm:px-8 md:px-36 lg:px-36 xl:px-36 max-w-full'>
				<LastAnnounce profiles={profiles} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
			</div>
		</div>
	);
};

export default Dashboard;
