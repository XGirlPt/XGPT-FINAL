'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/ProfileActions';
import { logoutClubs } from '../../actions/ClubsActions';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte du langage
import SearchModal from '../ui/search-modal';

import { useTheme } from 'next-themes';

import { Search, Globe, SlidersHorizontal, ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ThemeToggle } from '../theme-toggle';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

interface HeaderProps {
  blur?: boolean;
}

const Header: React.FC<HeaderProps> = ({ blur }) => {
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage(); // Use o contexto de idioma

  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');

  const userUID = useSelector((state: any) => state.profile?.profile?.userUID);
  const emailReduxProfile = useSelector(
    (state: any) => state.profile?.profile?.email
  );
  const emailReduxClubs = useSelector(
    (state: any) => state.clubs && state.clubs.email
  );
  const photoUID = useSelector(
    (state: any) => state.profile?.profile?.photos?.[0]
  );

  const [filtroAberto, setFiltroAberto] = useState<boolean>(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] =
    useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState<boolean>(false); // Novo estado para o menu de idiomas
  const [selectedLanguage, setSelectedLanguage] = useState<string>('PT'); // Idioma padrão
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dropdownRef = useRef<HTMLUListElement>(null);
  const languageRef = useRef<HTMLUListElement>(null); // Ref para o menu de idiomas
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // const { theme, setTheme } = useTheme();

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang); // Use a função do contexto para mudar o idioma
    setSelectedLanguage(lang.toUpperCase()); // Atualize o estado de selectedLanguage
    setLanguageMenuOpen(false); // Fecha o menu após a seleção
  };

  const handleClickOutsideLang = (event: MouseEvent) => {
    if (
      languageRef.current &&
      !languageRef.current.contains(event.target as Node)
    ) {
      setLanguageMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to close dropdown when clicking outside
    document.addEventListener('mousedown', handleClickOutsideLang);
    return () => {
      // Cleanup event listener
      document.removeEventListener('mousedown', handleClickOutsideLang);
    };
  }, []);

  const languageMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setEmail(emailReduxProfile || '');
  }, [emailReduxProfile]);

  const handleLogout = () => {
    if (emailReduxProfile) {
      dispatch(logout());
    } else if (emailReduxClubs) {
      dispatch(logoutClubs());
    }
    localStorage.removeItem('email');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userUID');
    router.push('/');
  };

  const { theme } = useTheme();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [navWidth, setNavWidth] = useState(0);

  // Calculate nav and logo width on mount and window resize
  useEffect(() => {
    const updateWidths = () => {
      if (navRef.current) {
        setNavWidth(navRef.current.offsetWidth);
      }
    };

    updateWidths(); // Initial calculation
    window.addEventListener('resize', updateWidths);

    return () => window.removeEventListener('resize', updateWidths);
  }, []);

  const navigationLinks = [
    {
      href: '/',
      label: t('Header.home'),
      darkIcon: '/icons/home-dark.png',
      lightIcon: '/icons/home.png',
    },
    {
      href: '/escort',
      label: t('Header.escort'),
      darkIcon: '/icons/escort-dark.png',
      lightIcon: '/icons/escort.png',
    },
    {
      href: '/stories',
      label: t('Header.stories'),
      darkIcon: '/icons/stories-dark.png',
      lightIcon: '/icons/stories.png',
    },
    {
      href: '/blog',
      label: t('Header.blog'),
      darkIcon: '/icons/stories-dark.png',
      lightIcon: '/icons/stories.png',
    },
    {
      href: '/Puclicidade',
      label: t('Header.ads'),
      darkIcon: '/icons/ads-dark.png',
      lightIcon: '/icons/ads.png',
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (


     <div className="fixed top-0 left-0 right-0 z-20 bg-[#f2ebee] dark:bg-[#100007]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div
        className={cn(
          'container mx-auto py-1 relative',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
      >

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <div ref={logoRef}>
            <Link href="/">
            <Image
              src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
              alt="X Girl"
              width={120}
              height={120}
              />
              </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
                    >
                      <Image
                        src={theme === 'dark' ? link.darkIcon : link.lightIcon}
                        alt={link.label}
                        width={24}
                        height={24}
                      />
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button className="w-full mb-2 rounded-full bg-pink-600 hover:bg-pink-600hover">
                      Register
                    </Button>
                    <Button variant="outline" className="w-full rounded-full">
                      Login
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>






        {/* Desktop Header */}
        <div className="hidden lg:flex items-center pt-2 gap-2 justify-between w-full">
          <div className="flex items-center">
            <div ref={logoRef}>
              <Link href="/">
                <Image
                  src={ '/logo-white.png'}
                  alt="X Girl"
                  width={140}
                  height={140}
                />
              </Link>
            </div>
          </div>
          <div
            className="relative flex"
            style={{ width: navWidth > 0 ? `${navWidth}px` : 'auto' }}
          >
            <Search
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-3',
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
              )}
              onClick={() => setModalOpen(true)}
            />
            <Input
              type="search"
              placeholder="Search..."
              className={cn(
                'pl-10 py-2 text-base rounded-full border',
                theme === 'dark'
                  ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
              )}
            />
            <Button
              size="icon"
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 rounded-full',
                'bg-pink-600  hover w-8 h-8'
              )}
            >
              <SlidersHorizontal className="w-4 h-4 dark:text-white" />
            </Button>
          </div>
          
          
          <div className="flex items-center gap-2">
  <Link href="/registo/regista2">
    <Button className="rounded-full !px-6 bg-pink-600 hover:bg-pink-600hover dark:text-white font-body">
      Register
    </Button>
  </Link>
  <Link href="/login">
    <Button
      variant="outline"
      className={cn(
        'rounded-full !px-6 font-body',
        theme === 'dark'
          ? 'border-zinc-700 hover:bg-zinc-800'
          : 'border-gray-200 hover:bg-gray-100'
      )}
    >
      Login
    </Button>
  </Link>
</div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 pr-12 py-4 text-base rounded-full border"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-pink-600 hover:bg-pink-600 hover w-8 h-8 "
            >
              <SlidersHorizontal className="w-4 h-4 dark:text-white" />
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 justify-between pt-2">
          <div className="opacity-0">
            <Image
              src={'/logo-white.png'}
              alt="X Girl"
              width={120}
              height={120}
            />
          </div>
          <div ref={navRef} className="flex items-center gap-6">
  {navigationLinks.map((link) => {
    const active = isActive(link.href);

    return (
      <Link
        key={link.href}
        href={link.href}
        className={cn(
          'flex items-center gap-1 transition-colors font-body text-center py-2',
          active ? 'text-pink-600 font-medium border-b-2 border-pink-600' : 'text-[#725a64] dark:text-[#a3999d] hover:text-pink-600'
        )}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <Image
            src={active ? link.lightIcon : link.darkIcon} 
            alt={link.label}
            width={20}
            height={20}
            className={cn(active ? 'brightness-0 invert-[31%] sepia-[78%] saturate-[593%] hue-rotate-[292deg] contrast-[95%]' : '')}
          />
        </div>
        {link.label}
      </Link>
    );
  })}
</div>


          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Globe className="w-4 h-4 text-pink-600" />
                  English
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
  <DropdownMenuItem>
    <Image
      src="/Flags/en.svg"
      alt="English"
      width={24}
      height={24}
      className="rounded-full"
    />
    English
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Image
      src="/Flags/pt.svg"
      alt="Portuguese"
      width={24}
      height={24}
      className="rounded-full"
    />
    Portuguese
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Image
      src="/Flags/fr.svg"
      alt="Francais"
      width={24}
      height={24}
      className="rounded-full"
    />
    Francais
  </DropdownMenuItem>
</DropdownMenuContent>

            </DropdownMenu>

            <ThemeToggle />
          </div>
        </div>
      </div>
      <SearchModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
};

export default Header;
