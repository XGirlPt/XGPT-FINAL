import Image from 'next/image';
import { Card } from '../ui/card';
import { Profile } from '@/backend/types';

interface PhotoGridProps {
  selectedProfile: Profile;
  handlePartilhaClick: () => void;
  handleLigaMeClick: () => void;
}

export function PhotoGrid({}: PhotoGridProps) {
  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] backdrop-blur-xl rounded-3xl border-none">
      <h2 className="text-3xl md:text-4xl  mb-4">
        Photos of {selectedProfile.nome}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="aspect-square relative rounded-3xl overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src={photo || '/logo.webp'}
              alt={`Photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
