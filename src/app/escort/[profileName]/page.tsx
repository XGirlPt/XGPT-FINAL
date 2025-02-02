'use client';
import { useEffect, useState, useCallback } from 'react';
import Liga from '@/components/profile/Liga';
import Partilha from '@/components/profile/Partilha';
import Certificado from '@/app/escort/_ui/certificado';
import Tarifas from '@/components/profile/Tarifas';
import Linguas from '@/components/profile/idioma';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LeftSide from '@/components/profile/left-side';
import FotoBig from '@/components/profile/foto-big';
import StoryBig from '@/components/profile/story-big';
import PhotosAndCertificado from '@/components/profile/photos-and-certificado';
import {ProvidedServices} from '@/components/profile/servicos-prestados';

import HeaderG from '@/components/header-filter/header-g';
import { Profile } from '@/types';
import { profileDataService } from '@/services/profileDataService';
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
} from 'lucide-react';
import { CommentProps } from 'postcss';
import ProfileStories from '@/components/profile/ProfileStories';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { AboutProfile } from '@/components/profile/about-profile';
import { CommentForm } from '@/app/profile/[name]/_ui/comment-form';
import { Comments } from '@/app/profile/[name]/_ui/comments';
import { Description } from '@/app/profile/[name]/_ui/description';
import { PhotoGrid } from '@/app/profile/[name]/_ui/photo-grid';
import { ProfileCard } from '@/app/profile/[name]/_ui/profile-card';
import { TariffsAndAccepts } from '@/app/profile/[name]/_ui/profile-details';
import { Languages } from '@/app/profile/[name]/_ui/profile-details';
// import { ProvidedServices } from '@/app/profile/[name]/_ui/provided-services';
import { Stories } from '@/app/profile/[name]/_ui/stories';

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
      console.error('Erro ao buscar perfis:', error?.message);
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
        console.error('Erro ao buscar perfil:', error.message);
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
  console.log('Selected Profile:', selectedProfile);


    return (
      <>
        {/* Sticky Header */}
        <div className="sticky top-24 z-50 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-3">
            {/* Desktop view */}
            <div className="hidden md:flex items-center justify-between z-40">
              <h1 className="text-4xl">Profile Details</h1>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="px-4 py-1 rounded-full border border-gray-300 text-sm bg-transparent font-body"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" /> Previous
                </Button>
                <Button
                  variant="outline"
                  className="px-4 py-1 rounded-full bg-darkpink text-white text-sm font-body"
                >
                  Next <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
  
            {/* Mobile view */}
            <div className="md:hidden">
              <h1 className="text-3xl text-center mb-3">Profile Details</h1>
              <div className="flex gap-2 justify-between">
                <Button
                  variant="outline"
                  className="flex-1 px-4 py-1 rounded-full border border-gray-300 text-sm bg-transparent font-body"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" /> Previous
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 px-4 py-1 rounded-full bg-darkpink text-white text-sm font-body"
                >
                  Next <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
  
        <div className="container mx-auto px-4 py-8 relative">
          <div
            className="absolute rounded-full  bg-[#f2cadb] dark:bg-[#2e0415] hidden lg:block"
            style={{
              height: '500px',
              width: '500px',
              borderRadius: '200px',
              top: '-80px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-45deg)',
              filter: 'blur(80px)',
              zIndex: 0,
            }}
          />
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - Fixed Profile Card */}
            <div className="w-full md:w-[370px] md:sticky md:top-44 md:self-start relative z-10">
              {/* <div className="transition-all duration-300 -mt-9 md:mt-[var(--profile-margin,-36px)]">
                <ProfileCard
               selectedProfile={selectedProfile as any}
                />
              </div> */}
              <LeftSide
                             selectedProfile={selectedProfile as any}
/>
            </div>
  
            {/* Right Side - Scrollable Content */}
            {/* <div className="flex-1 space-y-8 bg-white dark:bg-[#1a0a10] backdrop-blur-xl rounded-3xl p-6 z-40 relative">
              <Stories   selectedProfile={selectedProfile as any}/>
              <PhotoGrid
             selectedProfile={selectedProfile as any}
              />
              <AboutProfile
               selectedProfile={selectedProfile as any}
              />
              <Description selectedProfile={selectedProfile as any} />
               <ProvidedServices selectedProfile={selectedProfile as any}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Languages selectedProfile={selectedProfile as any} />
                <div className="space-y-4">
                  <TariffsAndAccepts selectedProfile={selectedProfile as any} />
                </div>
              </div>
             
             
              <Comments  profileuid={selectedProfile?.userUID || ''} 
              comment={selectedProfile?.comment || []}/>


              {/* <CommentForm /> */}
            {/* </div> */}
            <ProvidedServices 
            selectedProfile={selectedProfile as any}/>

            <AboutProfile
               selectedProfile={selectedProfile as any}
              />
            <div
              className="absolute rounded-full  bg-[#f2cadb] dark:bg-[#2e0415]"
              style={{
                height: '350px',
                width: '350px',
                borderRadius: '200px',
                bottom: '-0px',
                left: '-100px',
                filter: 'blur(80px)',
                zIndex: 0,
              }}
            />
          </div>
        </div>
      </>
    );



}

export default UserProfile;
