import Image from 'next/image';

export function HeroImageContainer({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-16 h-16 sm:w-[100px] sm:h-[100px] rounded-full ${className}`}
      style={{
        boxShadow: '0 8px 100px rgba(233, 30, 99, 0.45)',
      }}
    >
      <div className="absolute inset-0 rounded-full border-[4px] border-[#e91e63]" />

      <div className="absolute inset-[4px] rounded-full overflow-hidden">
        <Image src={src} alt={alt} width={200} height={200} />
      </div>
    </div>
  );
}
