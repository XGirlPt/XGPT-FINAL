'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { RiMessage2Fill } from 'react-icons/ri';
import { FiPhone } from 'react-icons/fi';
import { IoShareSocialOutline } from 'react-icons/io5';
import { Profile } from '@/types';
import { useTranslation } from 'react-i18next';

interface LeftSideProps {
  selectedProfile: Profile;
  handlePartilhaClick: () => void;
  handleLigaMeClick: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({
  selectedProfile,
  handlePartilhaClick,
  handleLigaMeClick,
}) => {
  const [timeElapsed, setTimeElapsed] = useState<string>('');
  const { t } = useTranslation();

  const formatTimeElapsed = useCallback(
    (minutesElapsed: number): string => {
      const hoursElapsed = minutesElapsed / 60;

      if (hoursElapsed > 48) {
        return t('profile.time_elapsed.more_than_48_hours');
      } else if (minutesElapsed < 60) {
        return t('profile.time_elapsed.minutes_ago', {
          minutes: minutesElapsed,
          plural: minutesElapsed !== 1 ? 's' : '',
        });
      } else {
        const hours = Math.floor(hoursElapsed);
        const minutes = minutesElapsed % 60;
        return t('profile.time_elapsed.hours_and_minutes_ago', {
          hours,
          hoursPlural: hours !== 1 ? 's' : '',
          minutes,
          minutesPlural: minutes > 0 ? (minutes !== 1 ? 's' : '') : '',
        });
      }
    },
    [t]
  );

  const calculateTimeElapsed = useCallback(() => {
    if (!selectedProfile || !selectedProfile.tagtimestamp) {
      setTimeElapsed(t('profile.time_elapsed.indeterminate'));
      return;
    }

    const tagTimestamp = new Date(selectedProfile.tagtimestamp);

    if (isNaN(tagTimestamp.getTime())) {
      setTimeElapsed(t('profile.time_elapsed.indeterminate'));
      return;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - tagTimestamp.getTime();
    const minutesElapsed = Math.floor(elapsedTime / (1000 * 60));

    setTimeElapsed(formatTimeElapsed(minutesElapsed));
  }, [selectedProfile, t, formatTimeElapsed]);

  useEffect(() => {
    if (selectedProfile?.tagtimestamp) {
      calculateTimeElapsed();
      const interval = setInterval(calculateTimeElapsed, 60000);
      return () => clearInterval(interval);
    }
  }, [selectedProfile?.tagtimestamp, calculateTimeElapsed]);

  return (
    <Card className="w-full lg:w-[370px] overflow-hidden bg-white dark:bg-[#1a0a10] rounded-3xl p-4">
      <div className="space-y-4">
        {/* Foto de Perfil */}
        <div className="relative aspect-square rounded-2xl overflow-hidden">
          <Image
            src={
              selectedProfile?.photoURL?.[0] ||
              '/logo.webp'
            }
            alt={selectedProfile?.nome || 'Profile'}
            fill
            className="object-cover"
            sizes="(max-width: 300px) 100vw, 300px"
          />
        </div>

        {/* Nome, Status e Tempo */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-semibold">{selectedProfile?.nome}</h3>
            <Image
              src="/icons/verify.png"
              alt="Verified User"
              width={24}
              height={24}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {selectedProfile?.tag || t('profile.no_status_available')}
          </p>
          <div className="flex items-center gap-1">
            <Image src="/icons/clock.png" alt="clock" width={20} height={20} />
            <span className="text-sm text-gray-400">{timeElapsed}</span>
            <RiMessage2Fill className="text-yellow-600 dark:text-yellow-500 ml-2" size={16} />
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="space-y-2">
          <Button
            className="w-full rounded-full bg-darkpink hover:bg-darkpinkhover text-white font-body flex items-center justify-center gap-2"
            onClick={handleLigaMeClick}
          >
            <FiPhone />
            {t('profile.call_me')}
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full border-gray-200 dark:border-gray-700 font-body flex items-center justify-center gap-2"
            onClick={handlePartilhaClick}
          >
            <IoShareSocialOutline size={20} />
            {t('profile.share_profile')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LeftSide;
