// "use client" directive for client-side rendering
"use client";

// Import React hooks and components
import {useState, useEffect} from "react";

import {fetchProfiles} from "@/services/profileService";
import {useSearchParams} from "next/navigation";
import {Profile} from "@/types";

import {useTranslation} from "react-i18next";
import CaroselRound from "@/components/ui/carosel-round";
import StoryBigS from "./storyBigS";
import StoryCard from "./StoryCard";

function StoriesPage({}) {
	// State declarations
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
	const searchParams = useSearchParams();
	const [selectedStory, setSelectedStory] = useState<string | null>(null);
	const [selectedCidade, setSelectedCidade] = useState<string | null>(null);
	const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]); // Modifié pour être un tableau de chaînes de caractères
	const [selectedNome, setSelectedNome] = useState<string | null>(null);
	const [selectedPhotoURL, setSelectedPhotoURL] = useState<string | null>(null);
	const [showLargeStory, setShowLargeStory] = useState(false);

	// Gestionnaire d'événements pour cliquer sur une story
	const handleStoryClick = (story: string, cidade: string, photos: string[], nome: string, photoURL: string) => {
		setSelectedStory(story);
		setSelectedCidade(cidade);
		setSelectedPhotos(photos);
		setSelectedNome(nome);
		setShowLargeStory(true);
		setSelectedPhotoURL(photoURL);
	};

	// useEffect pour récupérer les profils
	useEffect(() => {
		async function fetchData() {
			try {
				const fetchedProfiles: Profile[] = await fetchProfiles();
				setProfiles(fetchedProfiles);
				const distrito = searchParams.get("distrito");
				const profilesToDisplay = distrito ? fetchedProfiles.filter(profile => profile.distrito === distrito) : fetchedProfiles;
				setFilteredProfiles(profilesToDisplay);
			} catch (error) {
				console.error("Erreur lors de la récupération des profils:", error);
			}
		}
		fetchData();
	}, [searchParams]);

	// useEffect pour filtrer les profils par ville
	useEffect(() => {
		console.log("Ville sélectionnée:", selectedCidade);
		if (selectedCidade) {
			const profilesToDisplay = profiles.filter(profile => profile.cidade === selectedCidade);
			console.log("Profils filtrés:", profilesToDisplay);
			setFilteredProfiles(profilesToDisplay);
		} else {
			setFilteredProfiles(profiles);
		}
	}, [selectedCidade, profiles]);

	const {t, i18n} = useTranslation();

	return (
		<div className='text-gray-100 dark:bg-gray-900 pt-4'>
			<div className='px-2 md:px-36'>
				<p className='text-pink-800 text-3xl text-center justify-center mt-4'>{t("storyPage.titleStory")}</p>
				{/* <div>
        </div> */}
			</div>
			<CaroselRound profiles={filteredProfiles} />
			<p className='text-pink-800 text-3xl text-center justify-center pt-8 md:pt-4'>{t("storyPage.latest_stories")}</p>
			<div className='px-8 md:px-36'>
				{showLargeStory && (
					<StoryBigS
						profile={filteredProfiles.find(profile => profile.nome === selectedNome)} // Trouve le profil correspondant
						onClose={() => setShowLargeStory(false)}
						open={showLargeStory}
					/>
				)}
				<StoryCard profiles={filteredProfiles} onStoryClick={handleStoryClick} />
			</div>
		</div>
	);
}

export default StoriesPage;

// SEO complet ajouté
export const metadata = {
	title: "Escort Girls, Masseuses et Accompagnatrices de luxe en France",
	description:
		"Découvrez des escort girls, masseuses érotiques et accompagnatrices de luxe disponibles à travers le Portugal. Consultez les derniers profils et stories d'accompagnatrices dans votre région.",
	keywords: [
		"escort girls",
		"masseuses érotiques",
		"accompagnatrices de luxe",
		"Portugal",
		"services d'accompagnement",
		"luxury escorts",
		"massages érotiques",
	],
	openGraph: {
		title: "Escort Girls et Accompagnatrices de luxe en France",
		description: "Découvrez des escort girls et masseuses érotiques de luxe disponibles partout au Portugal.",
		type: "website",
		locale: "fr_FR",
		url: "https://www.xgirl.fr",
		site_name: "XGirl - N°1 des Escortes en France",
		images: [
			{
				url: "https://votre-site.com/images/cover.jpg",
				width: 1200,
				height: 630,
				alt: "Escort Girls, Masseuses érotiques et Accompagnatrices de luxe en France ",
			},
		],
	},
};
