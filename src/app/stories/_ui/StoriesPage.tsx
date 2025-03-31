"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchProfiles } from "@/backend/services/profileService";
import { Profile } from "@/backend/types";
import { useTranslation } from "react-i18next";
import CaroselRound from "@/components/ui/carosel-round";
import StoryBigS from "./storyBigS";
import StoryCard from "./StoryCard";

function StoriesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true); // Adicionado estado de carregamento
  const searchParams = useSearchParams();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [selectedCidade, setSelectedCidade] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [selectedNome, setSelectedNome] = useState<string | null>(null);
  const [selectedPhotoURL, setSelectedPhotoURL] = useState<string | null>(null);
  const [showLargeStory, setShowLargeStory] = useState(false);

  const handleStoryClick = (
    story: string,
    cidade: string,
    photos: string[],
    nome: string,
    photoURL: string
  ) => {
    setSelectedStory(story);
    setSelectedCidade(cidade);
    setSelectedPhotos(photos);
    setSelectedNome(nome);
    setShowLargeStory(true);
    setSelectedPhotoURL(photoURL);
  };

  // Fetch profiles
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const fetchedProfiles: Profile[] = await fetchProfiles();
        const validProfiles = fetchedProfiles.filter((p) => p.nome && p.photos); // Filtrar perfis inválidos
        setProfiles(validProfiles);
        const distrito = searchParams.get("distrito");
        const profilesToDisplay = distrito
          ? validProfiles.filter((profile) => profile.distrito === distrito)
          : validProfiles;
        setFilteredProfiles(profilesToDisplay);
      } catch (error) {
        console.error("Erreur lors de la récupération des profils:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams]);

  // Filter profiles by cidade
  useEffect(() => {
    console.log("Ville sélectionnée:", selectedCidade);
    if (selectedCidade) {
      const profilesToDisplay = profiles.filter(
        (profile) => profile.cidade === selectedCidade
      );
      console.log("Profils filtrés:", profilesToDisplay);
      setFilteredProfiles(profilesToDisplay);
    } else {
      setFilteredProfiles(profiles);
    }
  }, [selectedCidade, profiles]);

  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="text-gray-100 dark:bg-gray-900 pt-4">
        <p className="text-center text-pink-800 text-3xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="text-gray-100 dark:bg-gray-900 pt-4">
      <div className="px-2 md:px-36">
        <p className="text-pink-800 text-3xl text-center justify-center mt-4">
          {t("storyPage.titleStory")}
        </p>
      </div>
      <CaroselRound profiles={filteredProfiles} />
      <p className="text-pink-800 text-3xl text-center justify-center pt-8 md:pt-4">
        {t("storyPage.latest_stories")}
      </p>
      <div className="px-8 md:px-36">
        {showLargeStory && selectedNome && (
          <StoryBigS
            profile={filteredProfiles.find(
              (profile) => profile.nome === selectedNome
            )}
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

export const metadata = {
  title: "Acompanhantes de Luxo, Massagistas e Escorts em Portugal",
  description:
    "Encontre acompanhantes de luxo, massagistas eróticas e escorts disponíveis em todo o Portugal. Veja os perfis mais recentes e histórias das melhores acompanhantes na sua região.",
  keywords: [
    "acompanhantes de luxo",
    "massagistas eróticas",
    "escorts Portugal",
    "serviços de acompanhantes",
    "massagens eróticas",
    "luxury escorts Portugal",
  ],
  openGraph: {
    title: "Acompanhantes de Luxo e Massagistas Eróticas em Portugal",
    description:
      "Descubra as melhores acompanhantes e massagistas eróticas de luxo disponíveis em Portugal.",
    type: "website",
    locale: "pt_PT",
    url: "https://www.xgirl.pt",
    site_name: "XGirl - Nº1 em Acompanhantes de Luxo em Portugal",
    images: [
      {
        url: "https://www.xgirl.pt/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Acompanhantes de Luxo, Massagistas Eróticas e Escorts em Portugal",
      },
    ],
  },
};