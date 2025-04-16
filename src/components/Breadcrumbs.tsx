
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const breadcrumbVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="backdrop-blur-xl rounded-full px-4 py-2 "
    >
      <motion.ol
        className="flex items-center gap-4 text-md font-body"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <motion.li key={item.href} variants={breadcrumbVariants}>
              <div className="flex items-center">
                {isLast ? (
                  <span
                    className={cn(
                      'text-gray-900 dark:text-gray-100 font-semibold',
                      theme === 'dark' ? 'hover:text-gray-50' : 'hover:text-gray-700'
                    )}
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition-colors',
                      'focus:outline-none focus:ring-2 focus:ring-pink-500 rounded'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
                {!isLast && (
                  <ChevronRightIcon
                    className="mx-2 h-4 w-4 text-pink-600 dark:text-pink-400"
                    aria-hidden="true"
                  />
                )}
              </div>
            </motion.li>
          );
        })}
      </motion.ol>
    </nav>
  );
};

export default Breadcrumbs;
