"use client";

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

  const handleRevokeCookies = () => {
    localStorage.removeItem("cookieConsent");
    window.location.reload(); // Recarrega a página para mostrar o popup novamente
  };

  return (
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
                  'rounded-full',
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
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            )}
          >
            
            Privacy Policy
          </Link>
          <Link
            href="/Termos"
            className={cn(
              'text-sm hover:underline',
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            )}
          >
            Terms of Service
          </Link>
          <Button
            variant="link"
            onClick={handleRevokeCookies}
            className={cn(
              'text-sm p-0 h-auto',
              theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-800'
            )}
          >
            Manage Cookies
          </Button>
        </div>
    
      </div>
    </footer>
  );
};

export default Footer;