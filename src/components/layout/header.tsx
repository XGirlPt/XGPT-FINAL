import { useState, useEffect, useRef } from 'react';
import { IoIosOptions, IoIosArrowDown } from 'react-icons/io';
import { BiSolidMoviePlay } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/ProfileActions';
import { logoutClubs } from '../../actions/ClubsActions';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaGlobe,
  FaSearch,
} from 'react-icons/fa';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext'; // Importer le contexte du langage
import SearchModal from '../ui/search-modal';
import Filtro from './filtro';
import { Switch } from '@nextui-org/react'; // Alternador visual
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import ThemeSwitcher from '@/components/ThemeSwitcher'; // Importe o ThemeSwitcher
import {
  Moon,
  Sun,
  Search,
  Globe,
  Menu,
  FilterIcon,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { PiSlidersHorizontal } from 'react-icons/pi';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
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

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const languageMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Add event listener to close dropdown when clicking outside
    document.addEventListener('mousedown', handleClickOutsideLang);
    return () => {
      // Cleanup event listener
      document.removeEventListener('mousedown', handleClickOutsideLang);
    };
  }, []);

  useEffect(() => {
    setEmail(emailReduxProfile || '');
  }, [emailReduxProfile]);

  const toggleFiltro = () => {
    setFiltroAberto(!filtroAberto);
  };

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
    // <header className="z-100">
    //   <div className="container mx-auto ">
    //     <div className="flex items-center justify-between">
    //       <div className="flex items-center space-x-8 h-16">
    //         <Link href="/">
    //           <Image
    //             src="/logo.webp"
    //             alt="Logo"
    //             width={200}
    //             height={200}
    //             className="hover:opacity-80 transition-opacity duration-600"
    //           />
    //         </Link>

    //         <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
    //           {[
    //            { href: "/", label: t("Header.home") },
    //            { href: "/escort", label: t("Header.escort") },
    //            { href: "/stories", label: t("Header.stories") },
    //            { href: "/filters", label: t("Header.filters") },
    //           ].map((item) => (
    //             <Link
    //               key={item.href}
    //               href={item.href}
    //               className={`relative pb-1 ${
    //                 window.location.pathname === item.href
    //                   ? "text-pink-500 font-semibold"
    //                   : "text-gray-700 dark:text-white hover:text-pink-500"
    //               }`}
    //             >
    //               {item.label}
    //               {/* Underline animation */}
    //               <span
    //                 className={`absolute left-0 bottom-0 h-[2px] w-full bg-pink-500 transform transition-transform duration-300 ${
    //                   window.location.pathname === item.href
    //                     ? "scale-x-100"
    //                     : "scale-x-0"
    //                 }`}
    //               ></span>
    //             </Link>
    //           ))}
    //         </nav>
    //       </div>

    //       <div className="flex items-center space-x-4">

    //         <div className="relative flex items-center rounded-full bg-gray-800 dark:bg-gray-700 p-2 py-2 pr-2">
    //           <Search className="text-gray-400 h-4 w-4 mr-1" />
    //           <input
    //             type="text"
    //             placeholder= {t("Header.search")}
    //             className="flex-1 bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none"
    //             onClick={() => setModalOpen(true)}
    //           />
    //           <PiSlidersHorizontal className="h-6 w-6 p-1 bg-gray-500 rounded-full" />
    //         </div>
    //         <ThemeSwitcher />
    //         <div className="relative">
    //           <button
    //             onClick={toggleLanguageMenu}
    //             className="flex items-center px-4 py-2  rounded-full transition duration-200 "
    //           >
    //             <FaGlobe className="mr-2 text-sm" />
    //             {selectedLanguage}
    //             <IoIosArrowDown className="ml-2 text-sm" />
    //           </button>
    //           {languageMenuOpen && (
    //             <ul
    //               ref={languageRef}
    //               className="absolute right-0 w-32 bg-white text-sm dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg rounded-lg hover:rounded-md"
    //             >

    //               <li
    //                 onClick={() => handleLanguageChange("en")}
    //                 className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-200"
    //               >
    //                 {t("EN")}
    //               </li>
    //               <li
    //                 onClick={() => handleLanguageChange("fr")}
    //                 className="px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-200"
    //               >
    //                 {t("FR")}
    //               </li>
    //               <li
    //                 onClick={() => handleLanguageChange("pt")}
    //                 className="px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-200"
    //               >
    //                 {t("PT")}
    //               </li>
    //             </ul>
    //           )}
    //         </div>

    //         <div className="flex items-center space-x-4">
    //           {!emailReduxProfile && !emailReduxClubs ? (
    //             <>
    //               <Link
    //                 href="/login"
    //                 className="px-4 py-2 text-xs font-semibold rounded-full border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
    //               >
    //                 {t("Header.login")}
    //               </Link>

    //               <Link
    //                 href="/registo/regista2"
    //                 className={`nav-link flex items-center justify-center font-semibold text-xs px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors ${
    //                   pathname === "/registo/regista2"
    //                     ? "bg-pink-500 py-2"
    //                     : "hover:bg-pink-600"
    //                 } transition duration-200`}
    //               >
    //                 {t("Header.register")}
    //               </Link>
    //             </>
    //           ) : (
    //             <div className="flex items-center space-x-4 cursor-pointer">
    //               <span className="text-gray-800 dark:text-gray-300 text-xs flex">
    //                 {" "}
    //                 {emailReduxProfile}
    //               </span>
    //               <div className="relative w-10 h-10 rounded-full overflow-hidden border border-pink-500 transition-transform hover:scale-110">
    //                 {photoUID ? (
    //                   <Image
    //                     src={photoUID || "/logo.webp"}
    //                     alt="Profile Photo"
    //                     className="w-full h-full object-cover rounded-full"
    //                     loading="lazy"
    //                     width={100}
    //                     height={100}
    //                   />
    //                 ) : (
    //                   <div className="w-full h-full bg-gray-400"></div>
    //                 )}
    //               </div>
    //               <div className="relative">
    //                 <button
    //                   onClick={toggleLanguageDropdown}
    //                   className="flex items-center text-gray-300 h-full"
    //                 >
    //                   <IoIosArrowDown className="text-sm text-gray-800 dark:text-gray-300" />
    //                 </button>
    //                 {languageDropdownOpen && (
    //                   <ul
    //                     ref={dropdownRef}
    //                     className="absolute right-0 mt-2 w-48 dark:bg-gray-800 bg-white text-gray-700 dark:text-gray-200 shadow-lg rounded-lg py-2"
    //                   >
    //                     <li
    //                       onClick={() => {
    //                         router.push("/minha-conta");
    //                         setLanguageDropdownOpen(false);
    //                       }}
    //                       className="flex items-center px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer transition duration-200"
    //                     >
    //                       <FaUser className="mr-2 text-pink-500" />
    //                       {t("Header.user.myAccount")}
    //                     </li>
    //                     <li
    //                       onClick={() => {
    //                         router.push("/definicoes");
    //                         setLanguageDropdownOpen(false);
    //                       }}
    //                       className="flex items-center px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer transition duration-200"
    //                     >
    //                       <FaCog className="mr-2  text-pink-500" />
    //                       {t("Header.user.settings")}
    //                     </li>
    //                     <li
    //                       onClick={handleLogout}
    //                       className="flex items-center px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer transition duration-200"
    //                     >
    //                       <FaSignOutAlt className="mr-2  text-pink-500" />
    //                       {t("Header.user.logout")}
    //                     </li>
    //                   </ul>
    //                 )}
    //               </div>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //     <SearchModal
    //       isOpen={modalOpen}
    //       onClose={() => setModalOpen(false)}
    //       searchQuery={searchQuery}
    //       setSearchQuery={setSearchQuery}
    //     />
    //   </div>
    // </header>
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#f2ebee] dark:bg-[#100007]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div
        className={cn(
          'container mx-auto py-2 relative',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
      >
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <div ref={logoRef}>
            <Image
              src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
              alt="X Girl"
              width={120}
              height={120}
            />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* <ThemeSwitcher /> */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    {t('Header.menu')}
                  </SheetTitle>
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
                    <Button
                      className="w-full mb-2 rounded-full bg-darkpink hover:bg-darkpinkhover"
                      onClick={() => router.push('/registo/regista2')}
                    >
                      {t('Header.register')}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-full"
                      onClick={() => router.push('/login')}
                    >
                      {t('Header.login')}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex items-center gap-2 justify-between w-full">
          <div className="flex items-center">
            <div ref={logoRef}>
              <Image
                src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
                alt="X Girl"
                width={120}
                height={120}
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
                'pl-10 py-5 text-base rounded-full border',
                theme === 'dark'
                  ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                  : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
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
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder={t('Header.search')}
              className="w-full pl-10 pr-12 py-4 text-base rounded-full border"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-darkpink hover:bg-darkpinkhover w-8 h-8 "
            >
              <SlidersHorizontal className="w-4 h-4 dark:text-white" />
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 justify-between pt-2">
          <div className="opacity-0">
            <Image
              src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
              alt="X Girl"
              width={120}
              height={120}
            />
          </div>
          <div ref={navRef} className="flex items-center gap-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-1 transition-colors text-[#725a64] hover:text-[#725a64] font-body dark:text-[#a3999d] text-center py-2',
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
            {/* <ThemeSwitcher /> */}
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
