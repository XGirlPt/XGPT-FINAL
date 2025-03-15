'use client';
import { memo } from 'react';
import Map from './map';
import { Profile } from '@/backend/types';

function MapSection({ profiles }: { profiles: Profile[] }) {
  console.log('MapSection rendered');
  return (
    <div className="flex items-center justify-between py-16 px-4 relative z-10 flex-col md:flex-row">
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-5xl mb-4 text-gray-900 dark:text-white">
          Looking For Companionship Nearby?
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-md font-body">
          Explore a range of options to find someone who matches your preferences and interests.
        </p>
      </div>
      <div className="mt-10 md:mt-0 rounded-4xl overflow-hidden">
        <Map profiles={profiles} />
      </div>
    </div>
  );
}

export default memo(MapSection, (prevProps, nextProps) => {
  return prevProps.profiles.length === nextProps.profiles.length &&
    prevProps.profiles.every((profile, index) => profile.id === nextProps.profiles[index]?.id);
});