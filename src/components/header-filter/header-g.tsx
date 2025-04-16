
'use client';

import { Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Profile } from '@/backend/types';
import { useTranslation } from 'react-i18next';
import Breadcrumbs from '@/components/Breadcrumbs';

interface HeaderGProps {
  currentProfileIndex: number;
  setCurrentProfileIndex: Dispatch<SetStateAction<number>>;
  profiles: Profile[];
  selectedProfile: Profile | null;
}

const HeaderG: React.FC<HeaderGProps> = ({
  currentProfileIndex,
  setCurrentProfileIndex,
  profiles,
  selectedProfile,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNextProfile = () => {
    const nextIndex = (currentProfileIndex + 1) % profiles.length;
    const nextProfile = profiles[nextIndex];
    if (nextProfile) {
      setCurrentProfileIndex(nextIndex);
      router.push(`/escort/${nextProfile.nome}`);
    }
  };

  const handlePrevProfile = () => {
    const prevIndex = (currentProfileIndex - 1 + profiles.length) % profiles.length;
    const prevProfile = profiles[prevIndex];
    if (prevProfile) {
      setCurrentProfileIndex(prevIndex);
      router.push(`/escort/${prevProfile.nome}`);
    }
  };

  // Itens dos breadcrumbs
  const breadcrumbItems = [
    { name: t('common.profile', { defaultValue: 'Perfil' }), href: '/escort' },
    {
      name: selectedProfile?.distrito || '', // Valor real (ex.: "Beja")
      href: `/escort?distrito=${encodeURIComponent(selectedProfile?.distrito || '')}`,
    },
    { name: selectedProfile?.nome || '', href: '#' }, // Valor real (ex.: "Vanessa")
  ];

  return (
    <div className="flex items-center w-full  backdrop-blur-md py-1 px-4">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white flex-none">
        {t('profile.details', { defaultValue: 'Profile Details' })}
      </h1>
      <div className="flex-grow flex justify-center">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <div className="flex gap-3 flex-none">
        <Button
          variant="outline"
          className="px-4 py-1 rounded-full border border-gray-300 text-sm bg-transparent font-body text-gray-900 dark:text-white"
          onClick={handlePrevProfile}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> {t('escort.previous_page', { defaultValue: 'Previous' })}
        </Button>
        <Button
          className="px-4 py-2 rounded-full bg-pink-600 text-white text-sm font-body shadow-md hover:shadow-lg transition-all"
          onClick={handleNextProfile}
        >
          {t('escort.next_page', { defaultValue: 'Next' })} <ArrowRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default HeaderG;
