'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/backend/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // const footerLinks = {
  //   quickLinks: [
  //     { labelKey: 'Footer.escort_lisboa', href: '/escort?distrito=Lisboa' },
  //     { labelKey: 'Footer.escort_porto', href: '/girls?distrito=Porto' },
  //     { labelKey: 'Footer.escort_braga', href: '/girls?distrito=Faro' },
  //     { labelKey: 'Footer.escort_faro', href: '/girls?distrito=Madeira' },
  //     { labelKey: 'Footer.escort_madeira', href: '/girls?distrito=Acores' },
  //   ],
  //   categories: [
  //     { labelKey: 'Footer.vip_escorts', href: '/escort' },
  //     { labelKey: 'Footer.bdsm', href: '/tarifs' },
  //     { labelKey: 'Footer.salons', href: '/apropos' },
  //     { labelKey: 'Footer.stories', href: '/Stories' },
  //     { labelKey: 'Footer.erotic_massage', href: '/stories' },
  //   ],
  //   about: [
  //     {
  //       type: 'combined',
  //       links: [
  //         { labelKey: 'Footer.faq', href: '/faq' },
  //         { labelKey: 'Footer.dmca', href: '/dmca' },
  //         { labelKey: 'Footer.report', href: '/report' },
  //       ],
  //     },
  //     { labelKey: 'Footer.terms_conditions', href: '/Termos' },
  //     { labelKey: 'Footer.privacy_policy', href: '/Privacidade' },
  //     {
  //       type: 'combined',
  //       links: [
  //         { labelKey: 'Footer.xgirl_history', href: '/faq' },
  //         { labelKey: 'Footer.contact', href: '/contact' },
  //       ],
  //     },
  //     { labelKey: 'Footer.join_us', href: '/regista2' },
  //   ],
  // };

  const footerLinks = {
    features: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/product', label: 'Product' },
    ],
    solutions: [
      { href: '/pricing', label: 'Pricing' },
      { href: '/blog', label: 'Blog' },
      { href: '/blog-article', label: 'Blog Article' },
    ],
    company: [
      { href: '/contact', label: 'Contact' },
      { href: '/login', label: 'Login' },
      { href: '/signup', label: 'Signup' },
    ],
  };

  return (
    // <footer className="bg-white dark:bg-gray-800 w-full pt-8 border-t border-pink-500">
    //   <div className="max-w-screen-xl mx-auto px-4">
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
    //       {/* LOGO */}
    //       <div className="mb-8">
    //         <Link href="/">
    //           <div className="w-36 h-12 object-contain mx-auto md:mx-0 mb-4">
    //             <Image
    //               src="/photos/logo1.png"
    //               alt="logo"
    //               width={144}
    //               height={48}
    //             />
    //           </div>
    //         </Link>
    //         <p className="text-sm text-gray-400 mb-4">
    //           {t('Footer.services_description')}
    //         </p>
    //       </div>

    //       {/* LIENS RAPIDES */}
    //       <div className="mb-8">
    //         <p className="text-xl text-white py-2">
    //           {t('Footer.quick_links_title')}
    //         </p>
    //         <ul className="space-y-1">
    //           {footerLinks.quickLinks.map((link) => (
    //             <li key={link.href}>
    //               <Link
    //                 href={link.href}
    //                 className="text-pink-500 cursor-pointer hover:underline hover:text-[#C2136A]"
    //               >
    //                 {t(link.labelKey)}
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //       {/* TOP CATÉGORIE */}
    //       <div className="mb-8">
    //         <p className="text-xl text-white py-2">
    //           {t('Footer.top_categories_title')}
    //         </p>
    //         <ul className="space-y-1">
    //           {footerLinks.categories.map((link) => (
    //             <li key={link.href}>
    //               <Link
    //                 href={link.href}
    //                 className="text-pink-500 cursor-pointer hover:underline hover:text-[#C2136A]"
    //               >
    //                 {t(link.labelKey)}
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>

    //       {/* À PROPOS */}
    //       <div className="mb-8">
    //         <p className="text-xl text-gray-400 dark:text-white py-2">
    //           {t('Footer.about_title')}
    //         </p>
    //         <ul className="space-y-1">
    //           {footerLinks.about.map((item, index) =>
    //             item.type === 'combined' ? (
    //               <li key={index} className="flex space-x-2">
    //                 {item.links.map((link, linkIndex) => (
    //                   <Fragment key={link.href}>
    //                     <Link
    //                       href={link.href}
    //                       className="text-pink-500 cursor-pointer hover:underline hover:text-pink-600"
    //                     >
    //                       {t(link.labelKey)}
    //                     </Link>
    //                     {linkIndex < item.links.length - 1 && (
    //                       <span className="text-white">/</span>
    //                     )}
    //                   </Fragment>
    //                 ))}
    //               </li>
    //             ) : (
    //               <li key={item.href}>
    //                 <Link
    //                   href={item.href}
    //                   className="text-pink-500 cursor-pointer hover:underline hover:text-pink-600"
    //                 >
    //                   {t(item.labelKey)}
    //                 </Link>
    //               </li>
    //             )
    //           )}
    //         </ul>
    //       </div>
    //     </div>

    //     {/* Droit Ressource */}
    //     <div className="text-xs text-gray-400 md:flex-1">
    //       {t('Footer.disclaimer')}
    //     </div>
    //   </div>

    //   {/* FOOTER BAS */}
    //   <div className="bg-gray-900 w-full mt-8">
    //     <div className="grid grid-cols-3 gap-4 py-4">
    //       {/* Colonne de gauche */}
    //       <div className="flex items-center justify-start pr-4"></div>

    //       {/* Colonne du milieu */}
    //       <div className="flex items-center justify-center">
    //         <p className="text-xs text-white text-center">
    //           {t('Footer.copyright', { year: new Date().getFullYear() })}
    //         </p>
    //       </div>

    //       {/* Colonne de droite */}
    //       <div className="flex items-center justify-end padding-righ pr-10">
    //         <Image
    //           src="/photos/icon_paiement.webp"
    //           alt="Méthodes de paiement"
    //           width={150}
    //           height={150}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </footer>

    <footer
      className={cn(
        'container mx-auto py-16',
        theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
      )}
    >
      {/* Logo Section */}
      <div className="text-center mb-8 md:text-left md:mb-0">
        <Link href="/">
          <Image
            src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
            alt="XGirl.pt"
            width={150}
            height={150}
            className="pb-4 mx-auto md:mx-0"
          />
        </Link>
      </div>

      {/* Newsletter Section - Moved up for mobile */}
      <div className="mb-8 px-4 md:hidden">
        <h3 className="font-semibold mb-2 text-center">Email Address</h3>
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="Hello@Xgirl.pt"
            className={cn(
              'rounded-full',
              theme === 'dark'
                ? 'bg-zinc-800 border-zinc-700'
                : 'bg-white border-gray-200'
            )}
          />
          <Button
            className={cn(
              'rounded-full w-full',
              theme === 'dark'
                ? 'bg-pink-600 hover:bg-pink-700'
                : 'bg-pink-500 hover:bg-pink-600'
            )}
          >
            Subscribe Now
          </Button>
        </div>
        <p
          className={cn(
            'text-sm mt-2 text-left',
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
          )}
        >
          Don&apos;t worry! We don&apos;t spam you!
        </p>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-8 font-body">
        {/* Features Column */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">Features</h3>
          <div className="flex flex-col gap-2">
            {footerLinks.features.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm hover:underline',
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Solutions Column */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">Solutions</h3>
          <div className="flex flex-col gap-2">
            {footerLinks.solutions.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm hover:underline',
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Company Column */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">Company</h3>
          <div className="flex flex-col gap-2">
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm hover:underline',
                  theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter Section - Desktop */}
        <div className="hidden md:flex items-center justify-between col-span-2">
          <div className="flex-1 max-w-md">
            <h3 className="font-semibold mb-2">Email Address</h3>
            <div className="relative flex">
              <Input
                type="email"
                placeholder="Hello@Xgirl.pt"
                className={cn(
                  'pr-32 rounded-full',
                  theme === 'dark'
                    ? 'bg-zinc-800 border-zinc-700'
                    : 'bg-white border-gray-200'
                )}
              />
              <Button
                className={cn(
                  ' rounded-full',
                  theme === 'dark'
                    ? 'bg-pink-600 hover:bg-pink-700'
                    : 'bg-pink-500 hover:bg-pink-600'
                )}
              >
                Register Now
              </Button>
            </div>
            <p
              className={cn(
                'text-sm mt-2',
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
              )}
            >
              Don&apos;t worry! We don&apos;t spam you!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={cn(
          'mt-8 flex flex-col md:flex-row items-center justify-between pt-8 border-t gap-4',
          theme === 'dark' ? 'border-zinc-800' : 'border-gray-200'
        )}
      >
        <p
          className={cn(
            'text-sm text-center md:text-left',
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
          )}
        >
          Xgirl ©2025
        </p>
        <div className="flex gap-4">
          <Link
            href="/Privacidade"
            className={cn(
              'text-sm hover:underline',
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
            )}
          >
            Privacy Policy
          </Link>
          <Link
            href="/Termos"
            className={cn(
              'text-sm hover:underline',
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
            )}
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
