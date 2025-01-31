import Image from 'next/image';

export function MapSection() {
  return (
    <div className="flex items-center justify-between py-16 px-4 relative z-10 flex-col md:flex-row">
      {/* Left content */}
      <div className="max-w-xl">
        <h1 className="text-3xl md:text-5xl mb-4 text-gray-900 dark:text-white">
          Looking For Companionship Nearby?
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-md font-body">
          Explore a range of options to find someone who matches your
          preferences and interests.
        </p>
      </div>

      {/* Right content - Map image */}
      <div className="mt-10 md:mt-0 rounded-4xl overflow-hidden">
        <Image
          src="/map.png"
          alt="Location Map"
          className="w-[400px] h-auto rounded-lg shadow-lg"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
