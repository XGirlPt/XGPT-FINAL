import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/ProfileActions';
import { logoutClubs } from '../../actions/ClubsActions';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte du langage
import SearchModal from '../ui/search-modal';

import { useTheme } from 'next-themes';

import {
  Search,
  Globe,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
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
      href: '/stories-2',
      label: t('Header.stories'),
      darkIcon: '/icons/stories-dark.png',
      lightIcon: '/icons/stories.png',
    },
    {
      href: '/ads',
      label: t('Header.ads'),
      darkIcon: '/icons/ads-dark.png',
      lightIcon: '/icons/ads.png',
    },
  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (

    <div className="fixed top-0 left-0 right-0 z-50 bg-[#f2ebee] dark:bg-[#100007]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div
        className={cn(
          'container mx-auto py-2 relative',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
      >
      

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center gap-2 justify-between w-full">
          <div className="flex items-center">
            <div ref={logoRef}>
              <Image
                src={'/logo.webp'}
                alt="X Girl"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div
            className="relative flex"
            style={{ width: navWidth > 0 ? `${navWidth}px` : 'auto' }}
          >
            <Search
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5',
                theme === 'dark' ? 'text-zinc-400' : 'text-gray-400'
              )}
            />
            <Input
              type="search"
              placeholder={t('Header.search')}
              className={cn(
                'pl-10 py-2 text-base rounded-full border',
                theme === 'dark'
                  ? 'bg-[#2b1a21] border-zinc-700 required text-sm text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-200 text-gray-900 text-sm placeholder:text-gray-400'
              )}
              onClick={() => setModalOpen(true)}
            />
            <Button
              size="icon"
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 rounded-full',
                'bg-darkpink hover:bg-darkpinkhover w-8 h-8'
              )}
            >
              <SlidersHorizontal className="w-4 h-4 dark:text-white" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
  {userUID ? (
    // Se o usuário estiver logado, exibir o avatar e email
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
          {photoUID ? (
            <Image
              src={photoUID}
              alt="Avatar"
              width={20}
              height={20}
              className="rounded-full border border-pink-500"
            />
          ) : (
            <FaUser className="w-10 h-10 text-gray-500 dark:text-gray-300" />
          )}
          <span className="text-gray-700 dark:text-white text-sm">{email}</span>
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-300" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push('/profile')}>
          <FaCog className="mr-2" /> {t('Header.settings')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <FaSignOutAlt className="mr-2" /> {t('Header.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    // Se não estiver logado, mostrar os botões "Registar" e "Login"
    <>
      <Button
        onClick={() => router.push('/registo/regista2')}
        className={cn(
          'rounded-full !px-6 bg-darkpink hover:bg-darkpinkhover dark:text-white font-body'
        )}
      >
        {t('Header.register')}
      </Button>


      <Button
        onClick={() => router.push('/login')}
        variant="outline"
        className={cn(
          'rounded-full !px-6 font-body',
          theme === 'dark'
            ? 'border-zinc-700 hover:bg-zinc-800'
            : 'border-gray-200 hover:bg-gray-100'
        )}
      >
        {t('Header.login')}
      </Button>
    </>
  )}
</div>
        </div>

  

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 justify-between">
          <div className="opacity-0">
            <Image
              src={'/logo.png'}
              alt="X Girl"
              width={120}
              height={120}
            />
          </div>
          <div ref={navRef} className="flex items-center gap-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1 transition-colors text-[#725a64] text-sm hover:text-[#725a64] font-body dark:text-[#a3999d] text-center py-1',
                  'hover:text-darkpink',
                  link.href === '/' && 'text-darkpink',
                  link.href === '/' && 'font-medium',
                  isActive(link.href) &&
                    link.href === '/' &&
                    'border-b-2 border-darkpink'
                )}
              >
                <Image
                  src={isActive(link.href) ? link.lightIcon : link.darkIcon}
                  alt={link.label}
                  width={20}
                  height={20}
                />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Globe className="w-4 h-4 text-darkpink" />
                  {selectedLanguage}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  {t('EN')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                  {t('FR')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('pt')}>
                  {t('PT')}
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
