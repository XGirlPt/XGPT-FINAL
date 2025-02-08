'use client';

import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Profile } from '@/types';
import { useTranslation } from 'react-i18next';

interface ProfileStoriesProps {
  selectedProfile: Profile;
  storyURLs: string[];
  thumbnails: string[];
  onStoryClick: (index: number) => void;
}

export function ProfileStories({
  selectedProfile,
  storyURLs,
  thumbnails,
}: ProfileStoriesProps) {
  const router = useRouter();
  const { t } = useTranslation();

  if (!storyURLs || storyURLs.length === 0) {
    return <p className="text-gray-500">{t('profile.no_stories_available')}</p>;
  }

  return (
    <div className="bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl p-6">
      <h2 className="text-4xl mb-4 text-darkpink font-semibold">
        {t('profile.stories_of', { name: selectedProfile.nome })}
      </h2>
      <Carousel opts={{ align: 'start', loop: true }} className="w-full">
        <CarouselContent className="-ml-2">
          /{' '}
          {selectedProfile.storyURL.map((media, index) => {
            if (!media) return null;
            const isVideo =
              media.endsWith('.mp4') ||
              media.endsWith('.mov') ||
              media.endsWith('.webm');
            const thumbnailSrc = thumbnails[index];

            return (
              <CarouselItem key={index} className="pl-4 basis-1/3 md:basis-1/5">
                <div className="flex flex-col items-center">
                  <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-darkpink">
                    <button onClick={() => onStoryClick(index)}>
                      {isVideo ? (
                        <>
                          <Image
                            src={thumbnailSrc}
                            alt={`Story ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="text-white text-3xl">▶️</span>
                          </div>
                        </>
                      ) : (
                        <Image
                          src={thumbnailSrc}
                          alt={`Story ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      )}
                    </button>
                  </div>
                  <span className="text-sm font-medium truncate w-full text-center my-2">
                    {selectedProfile.nome}
                  </span>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default ProfileStories;
