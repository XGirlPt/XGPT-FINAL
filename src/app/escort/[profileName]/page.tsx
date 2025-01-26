"use client";
import { useEffect, useState, useCallback } from "react";
import Liga from "@/components/profile/Liga";
import Partilha from "@/components/profile/Partilha";
import Certificado from "@/app/escort/_ui/certificado";
import Sobre from "@//components/profile/Sobre";
import Tarifas from "@/components/profile/Tarifas";
import Linguas from "@/components/profile/idioma";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LeftSide from "@/components/profile/left-side";
import FotoBig from "@/components/profile/foto-big";
import StoryBig from "@/components/profile/story-big";
import PhotosAndCertificado from "@/components/profile/photos-and-certificado";
import ServicosPrestados from "@/components/profile/servicos-prestados";
import HeaderG from "@/components/header-filter/header-g";
import  Comments  from "./_ui/comments";
import { Profile } from "@/types";
import { profileDataService } from "@/services/profileDataService";
import {
  Heart,
  MapPin,
  MessageCircle,
  Star,
  Clock,
  Share2,
  Phone,
  Globe,
  Check,
} from "lucide-react";
import { CommentProps } from "postcss";
import ProfileStories from "@/components/profile/ProfileStories";

function UserProfile() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isCertified, setIsCertified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { profileName } = useParams<{ profileName: string }>();
  const [showLargePhoto, setShowLargePhoto] = useState(false);
  const [showLargeStory, setShowLargeStory] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [StoryIndex, setStoryIndex] = useState(0);
  const [showLiga, setShowLiga] = useState(false);
  const [showPartilha, setShowPartilha] = useState(false);
  const [showCertificado, setShowCertificado] = useState(false);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const { t, i18n } = useTranslation();

  const userUID = useSelector((state: any) => state.profile?.profile.userUID);
  const photoURLsRedux = useSelector(
    (state: any) => state.profile?.profile.photos
  );
  const storyURLsRedux = useSelector(
    (state: any) => state.profile?.profile.stories
  );

  const storiesRDX = selectedProfile?.storyURL;

  const fetchProfiles = async () => {
    try {
      const data = await profileDataService.fetchProfiles();
      setProfiles(data);
    } catch (error: any) {
      console.error("Erro ao buscar perfis:", error?.message);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const { profile, isCertified: certified } =
          await profileDataService.fetchProfile(profileName);
        setIsCertified(certified);
        setSelectedProfile(profile);
      } catch (error: any) {
        console.error("Erro ao buscar perfil:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [profileName]);

  const handleLigaMeClick = () => setShowLiga(!showLiga);
  const handleCertificadoClick = () => setShowCertificado(!showCertificado);
  const handlePartilhaClick = () => setShowPartilha(!showPartilha);
  const handlePhotoClick = (index: number) => {
    setShowLargePhoto(true);
    setPhotoIndex(index);
  };

  const handleStoryClick = (index: number) => {
	setShowLargeStory(true);
	setStoryIndex(index);
};

  const findProfileIndex = useCallback(
    (profileId: number) => {
      return profiles.findIndex((profile) => profile.id === profileId);
    },
    [profiles] // Dependency array
  );

  useEffect(() => {
    if (profiles.length > 0 && selectedProfile?.id) {
      setCurrentProfileIndex(findProfileIndex(selectedProfile.id));
    }
  }, [profiles, selectedProfile, findProfileIndex]);

  useEffect(() => {
    // console.log("isCertified state changed:", isCertified);
  }, [isCertified]);

  // console.log("Story URLs:", selectedProfile?.storyURL);
  // console.log("Foto URLs:", selectedProfile?.photoURL);
  console.log("Selected Profile:", selectedProfile);

  return (
    <>
      <HeaderG
        setCurrentProfileIndex={setCurrentProfileIndex}
        currentProfileIndex={currentProfileIndex}
        profiles={profiles}
      />
      <div className="container relative">
        <div className="w-screen  flex flex-col user-profile justify-center align-middle">
          <div className="md:flex md:mx-36 my-8 md:mt-16 md:mb-36 relative">
            {showLiga && (
              <Liga
                selectedProfile={selectedProfile as any}
                setShowLiga={setShowLiga}
              />
            )}
            {showPartilha && (
              <Partilha
                selectedProfile={selectedProfile as any}
                setShowPartilha={setShowPartilha}
              />
            )}
            {showCertificado && (
              <Certificado
                selectedProfile={selectedProfile as any}
                setShowCertificado={setShowCertificado}
              />
            )}

            <LeftSide
              selectedProfile={selectedProfile as any}
              handleLigaMeClick={handleLigaMeClick}
              handlePartilhaClick={handlePartilhaClick}
            />

            {showLargePhoto && (
              <FotoBig
                selectedProfile={selectedProfile as any}
                onClose={() => setShowLargePhoto(false)}
                currentIndex={photoIndex}
              />
            )}

            {showLargeStory && (
              <StoryBig
                selectedProfile={selectedProfile as any}
                onClose={() => setShowLargeStory(false)}
                currentIndex={StoryIndex}
              />
            )}

            <div className="w-screen md:w-3/5 grid gap-4   justify-center align-middle">
            <div className="flex md:grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-2">
     {selectedProfile && selectedProfile.storyURL?.length > 0 && (
                <div className="flex flex-col ml-8 md:ml-10 md:mr-24">
                  <p className="text-pink-500 text-2xl mb-4 font-semibold">
                    {" "}
                    {t("profile.stories_of", { name: selectedProfile.nome })}
                  </p>
                  <div className="flex md:grid grid-cols-1  md:grid-cols-4 gap-6 md:gap-2">
                    {selectedProfile.storyURL.map((media, index) => {
                      if (!media) return null;
                      const isVideo =
                        media.endsWith(".mp4") ||
                        media.endsWith(".mov") ||
                        media.endsWith(".webm");
                      const thumbnailSrc = thumbnails[index];

                      return (
                        <div key={index} className="relative flex">
                          {isVideo ? (
                            <div>
                              <video
                                src={thumbnailSrc}
                                alt={`Thumbnail ${index + 1}`}
                                className="rounded-2xl border border-zinc-500 shadow-md transition-transform duration-200 ease-in-out hover:scale-105"
                                onClick={() => handleStoryClick(index)}
                                width={300}
                                height={200}
                                priority={index === 0}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-3xl">▶️</span>
                              </div>
                            </div>
                          ) : (
                            <video
                              src={media}
                              className="relative w-20 h-20 md:w-24 md:h-24 rounded-full cursor-pointer object-cover overflow-hidden border-2 border-pink-800 transition duration-300 ease-in-out transform hover:scale-105"
                              onClick={() => handleStoryClick(index)}
                              controls={false}
                              muted
                              playsInline
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
    </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-2 mt-14">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold  dark:text-white">
                      {" "}
                      {selectedProfile?.nome}
                    </h1>
                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{selectedProfile?.cidade}</span>
                      <span className="mx-2">•</span>
                      <span>{selectedProfile?.idade} years</span>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {/* <span>{selectedProfile?.rating}</span> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300">
                      <Heart className="h-6 w-6" />
                    </button>
                    <button className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid md:mx-0 gap-y-6 justify-center items-center px-10 md:px-2 min-h-screen align-middle ">
                <PhotosAndCertificado
                  selectedProfile={selectedProfile}
                  loading={loading}
                  isCertified={isCertified}
                  handleCertificadoClick={handleCertificadoClick}
                  handlePhotoClick={handlePhotoClick}
                />

                <Sobre selectedProfile={selectedProfile as any} />

                <ServicosPrestados selectedProfile={selectedProfile} />

                <div className="bg-white dark:bg-gray-800 grid gap-2 items-center  py-6 w-full px-10  rounded-xl">
                  <p className="text-pink-500 text-2xl">
                    {t("profile.description")}
                  </p>
                  <div className="gap-4 mt-6">
                    <div
                      className="bg-white dark:bg-gray-800  "
                      style={{ textAlign: "justify" }}
                      dangerouslySetInnerHTML={{
                        __html: selectedProfile?.description as any,
                      }}
                    />
                  </div>
                </div>

                <div className=" md:flex gap-6">
                  <Linguas selectedProfile={selectedProfile as any} />
                  <Tarifas selectedProfile={selectedProfile as any} />
                </div>

                <Comments
									profileuid={selectedProfile?.userUID || ""}
									comment={selectedProfile?.comment || []}
								/>								
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
