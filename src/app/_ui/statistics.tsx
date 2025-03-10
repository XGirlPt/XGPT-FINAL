import { NumberTicker } from '@/components/ui/number-ticker';
import { cn } from '@/backend/lib/utils';

interface Statistic {
  value: number;
  label: string;
  suffix?: string;
}

const statistics: Statistic[] = [
  {
    value: 2200,
    label: 'Users',
    suffix: '+',
  },
  {
    value: 5000,
    label: 'Daily Visits',
    suffix: '+',
  },
  {
    value: 500,
    label: 'Daily Ads',
    suffix: '+',
  },
];

export function Statistics() {
  return (
    <div className="w-full my-10 px-12 md:px-0">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className={cn(
                'text-center',
                index !== statistics.length - 1 &&
                  'md:border-r border-gray-400 dark:border-gray-800',
                index !== statistics.length - 1 &&
                  'border-b pb-8 md:border-b-0 md:pb-0 border-gray-400 dark:border-gray-800 '
              )}
            >
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <NumberTicker
                    value={stat.value}
                    className="text-5xl text-pink-600"
                  />
                  {stat.suffix && (
                    <span className="text-5xl text-pink-600">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-black font-medium text-2xl md:text-lg font-body">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
