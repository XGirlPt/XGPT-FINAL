import Image from 'next/image';
import { Card } from '../../components/ui/card';

interface Profile {
  nome: string;
  idade: number;
  altura: string;
  distrito: string;
  origem: string;
  cidade: string;
  peso: string;
  tatuagens: string;
  pelos: string;
  olhos: string;
  seios: string;
  mamas: string;
  signo: string;
  cabelo: string;
  description?: string;
}

interface DescriptionProps {
  selectedProfile: Profile | null;
}

export function Description({ selectedProfile }: DescriptionProps) {
  return (
    <Card className="p-6 bg-[#faf3f6] dark:bg-[#13040b] rounded-3xl border-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl md:text-4xl">Description</h2>
      </div>

      <div className="prose prose-pink dark:prose-invert max-w-none flex items-center gap-2">
        <Image src="/icons/check.png" alt="check" width={25} height={25} />
        {selectedProfile?.description ? (
          <p className="text-gray-600 dark:text-gray-300 font-body">
            {selectedProfile.description}
          </p>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic font-body">
            No description available
          </p>
        )}
      </div>
    </Card>
  );
}
