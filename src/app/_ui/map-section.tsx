'use client';
import { memo } from 'react';
import Map from './map';
import { Profile } from '@/backend/types';
import { useTranslation } from 'react-i18next';

function MapSection({ profiles }: { profiles: Profile[] }) {
  console.log('MapSection rendered');
  const { t } = useTranslation(); // Hook para acessar traduções

  return (
    <div className="flex items-center justify-between py-16 px-4 relative z-10 flex-col md:flex-row">
      <div className="max-w-xl">
        <h1 className="text-6xl md:text-6xl mb-4 text-gray-900 dark:text-white">
          {t('mapSection.title')}
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-md font-body">
          {t('mapSection.description')}
        </p>
      </div>
      <div className="mt-10 md:mt-0 rounded-4xl overflow-hidden">
        <Map profiles={profiles} />
      </div>
    </div>
  );
}

export default memo(MapSection, (prevProps, nextProps) => {
  return (
    prevProps.profiles.length === nextProps.profiles.length &&
    prevProps.profiles.every((profile, index) => profile.id === nextProps.profiles[index]?.id)
  );
});