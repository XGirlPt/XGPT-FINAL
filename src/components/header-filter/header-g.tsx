import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Profile } from '@/backend/types';
import { useTranslation } from "react-i18next";

interface HeaderGProps {
  currentProfileIndex: number;
  setCurrentProfileIndex: Dispatch<SetStateAction<number>>;
  profiles: Profile[];
}

const HeaderG: React.FC<HeaderGProps> = ({
  currentProfileIndex,
  setCurrentProfileIndex,
  profiles,
}) => {
  const router = useRouter();

  const handleNextProfile = () => {
    const nextIndex = (currentProfileIndex + 1) % profiles.length;
    const nextProfile = profiles[nextIndex];
    if (nextProfile) {
      setCurrentProfileIndex(nextIndex);
      router.push(`/escort/${nextProfile.nome}`);
    }
  };

  const handlePrevProfile = () => {
    const prevIndex =
      (currentProfileIndex - 1 + profiles.length) % profiles.length;
    const prevProfile = profiles[prevIndex];
    if (prevProfile) {
      setCurrentProfileIndex(prevIndex);
      router.push(`/escort/${prevProfile.nome}`);
    }
  };

  const { t } = useTranslation();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="px-4 py-1 rounded-full border border-gray-300 text-sm bg-transparent font-body"
        onClick={handlePrevProfile}
      >
        <ArrowLeftIcon className="w-4 h-4 mr-2" /> {t('escort.previous_page')}
      </Button>
      <Button
        variant="outline"
        className="px-4 py-1 rounded-full bg-pink-600 hover:bg-pink-700 text-sm font-body"
        onClick={handleNextProfile}
      >
      {t('escort.next_page')} <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default HeaderG;
