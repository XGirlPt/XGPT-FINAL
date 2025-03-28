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
    explore: [
      { href: '/', label: t('footer.home') || 'Home' },
      { href: '/escort', label: t('footer.escorts') || 'Acompanhantes' },
      { href: '/stories', label: t('footer.stories') || 'Histórias' },
    ],
    anunciantes: [
      { href: '/registo', label: t('footer.createAd') || 'Criar Anúncio' },
      { href: '/my-account', label: t('footer.myAccount') || 'Minha Conta' },
      { href: '/registo-pagamento', label: t('footer.payments') || 'Pagamentos' },
    ],
    suporte: [
      { href: '/contact', label: t('footer.contact') || 'Contato' },
      { href: '/about', label: t('footer.about') || 'Sobre Nós' },
      { href: '/blog', label: t('footer.blog') || 'Blog' },
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

      {/* Newsletter Section - Mobile */}
      <div className="mb-8 px-4 md:hidden">
        <h3 className="font-semibold mb-2 text-center">{t('footer.newsletter') || 'Receba Novidades'}</h3>
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            placeholder="seuemail@xgirl.pt"
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
            {t('footer.subscribe') || 'Inscrever-se'}
          </Button>
        </div>
        <p
          className={cn(
            'text-sm mt-2 text-left',
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
          )}
        >
          {t('footer.noSpam') || 'Sem spam, apenas atualizações!'}
        </p>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-8 font-body">
        {/* Explore Column */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">{t('footer.explore') || 'Explorar'}</h3>
          <div className="flex flex-col gap-2">
            {footerLinks.explore.map((link) => (
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

        {/* Anunciantes Column */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">{t('footer.advertisers') || 'Anunciantes'}</h3>
          <div className="flex flex-col gap-2">
            {footerLinks.anunciantes.map((link) => (
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

        {/* Suporte Column */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">{t('footer.support') || 'Suporte'}</h3>
          <div className="flex flex-col gap-2">
            {footerLinks.suporte.map((link) => (
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
            <h3 className="font-semibold mb-2">{t('footer.newsletter') || 'Receba Novidades'}</h3>
            <div className="relative flex">
              <Input
                type="email"
                placeholder="seuemail@xgirl.pt"
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
                {t('footer.subscribe') || 'Inscrever-se'}
              </Button>
            </div>
            <p
              className={cn(
                'text-sm mt-2',
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
              )}
            >
              {t('footer.noSpam') || 'Sem spam, apenas atualizações!'}
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
          XGirl.pt © 2025 - Todos os direitos reservados
        </p>
        <div className="flex flex-col sm:flex-row gap-4 text-center">
          <Link
            href="/politica-privacidade"
            className={cn(
              'text-sm hover:underline',
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            )}
          >
            {t('footer.privacy') || 'Política de Privacidade'}
          </Link>
          <Link
            href="/termos-de-uso"
            className={cn(
              'text-sm hover:underline',
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            )}
          >
            {t('footer.terms') || 'Termos e Condições'}
          </Link>
          <Link
            href="/cookies"
            className={cn(
              'text-sm hover:underline',
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            )}
          >
            {t('footer.cookies') || 'Política de Cookies'}
          </Link>
          <Link
            href="/registo-pagamento"
            className={cn(
              'text-sm hover:underline',
              theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'
            )}
          >
            {t('footer.payments') || 'Pagamentos'}
          </Link>
          <Button
            variant="link"
            onClick={handleRevokeCookies}
            className={cn(
              'text-sm p-0 h-auto',
              theme === 'dark' ? 'text-zinc-400 hover:text-zinc-200' : 'text-gray-600 hover:text-gray-800'
            )}
          >
            {t('footer.manageCookies') || 'Gerenciar Cookies'}
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;