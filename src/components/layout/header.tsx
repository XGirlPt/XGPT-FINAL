'use client';

import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../backend/actions/ProfileActions';
import { logoutClubs } from '../../backend/actions/ClubsActions';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaCog, FaSignOutAlt, FaSearch, FaHome, FaBook, FaPenAlt } from 'react-icons/fa';
import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../backend/context/LanguageContext'; // Importer le contexte du langage
import SearchModal from '../ui/search-modal';

import { useTheme } from 'next-themes';
import { BiSolidMoviePlay } from "react-icons/bi";

import { Search, Globe, SlidersHorizontal, ChevronDown, Menu } from 'lucide-react';
import { cn } from '@/backend/lib/utils';
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
    { href: '/', label: 'Home', Icon: FaHome },
    { href: '/escort', label: 'Escort', Icon: FaUser },
    { href: '/stories', label: 'Stories', Icon: BiSolidMoviePlay },
    { href: '/blog', label: 'Blog', Icon: FaPenAlt },
    { href: '/Pub', label: 'Pub', Icon: FaPenAlt },

  ];

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (


     <div className="fixed top-0 left-0 right-0 z-50 bg-[#f2ebee] dark:bg-[#100007]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div
        className={cn(
          'container mx-auto py-1 relative',
          theme === 'dark' ? 'text-zinc-50' : 'text-gray-900'
        )}
      >

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
  className="relative flex w-36" // Aumentei a largura aqui
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
          {userUID ? (
    // Se o usuário estiver logado, exibir o avatar e email
    <DropdownMenu>
<DropdownMenuTrigger asChild>
  <button className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
    {photoUID ? (
      <div className="w-10 h-10 relative border border-pink-600 rounded-full"> {/* Contêiner com tamanho fixo */}
        <Image
          src={photoUID || '/logo.webp'}
          alt="Avatar"
          layout="fill" /* Faz a imagem preencher todo o contêiner */
          className="rounded-full border-2 border-pink-600 object-cover" /* Borda pink e imagem 100% coberta */
        
        />
      </div>
    ) : (
      <FaUser className="w-10 h-10 text-gray-500 dark:text-gray-300" />
    )}
    <span className="text-gray-700 dark:text-white text-base">{email}</span>
    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-300" />
  </button>
</DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          <FaCog className="mr-2 " /> {t('Header.settings')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/my-account')}>
          <FaSignOutAlt className="mr-2" /> {t('Header.myAccount')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <FaSignOutAlt className="mr-2" /> {t('Header.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
    <Button
      onClick={() => router.push('/registo/regista2')}
      className={cn(
        'rounded-full !px-6 bg-pink-600 hover:bg-pink-700 dark:text-white font-body'
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
        <div className="hidden lg:flex items-center gap-2 justify-between pt-2">
          <div className="opacity-0">
            <Image
              src={'/logo-white.png'}
              alt="X Girl"
              width={120}
              height={120}
            />
          </div>
          <div ref={navRef} className="flex items-center gap-6">
            {navigationLinks.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1 text-sm font-body text-center py-2 ${
                  isActive(href)
                    ? 'text-pink-600 border-b-2 border-pink-600'
                    : 'text-[#725a64] dark:text-[#a3999d] hover:text-pink-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive(href) ? 'text-pink-600' : 'text-[#725a64] dark:text-[#a3999d]'}`} />
                {label}
              </Link>
            ))}
          </div>


          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="md"
                  className="flex items-center gap-1"
                >
                  <Globe className="w-4 h-4 text-pink-600" />
                  {selectedLanguage}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
  <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
    <Image
      src="/Flags/en.svg"
      alt="English"
      width={24}
      height={24}
      className="rounded-full"
    />
    {t('Header.EN')}
  </DropdownMenuItem>
  <DropdownMenuItem  onClick={() => handleLanguageChange('pt')}>
    <Image
      src="/Flags/pt.svg"
      alt="Portuguese"
      width={24}
      height={24}
      className="rounded-full"
    />
    {t('Header.PT')}
    </DropdownMenuItem>
  <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
    <Image
      src="/Flags/fr.svg"
      alt="Francais"
      width={24}
      height={24}
      className="rounded-full"
    />
    {t('Header.FR')}
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













//   {/* Mobile Search Bar */}
{/* <div className="lg:hidden mt-4">
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
</div> */}






        // {/* Mobile Header */}
        // <div className="lg:hidden flex items-center justify-between w-full">
        //   <div ref={logoRef}>
        //     <Link href="/">
        //     <Image
        //       src={theme === 'dark' ? '/logo-white.png' : '/logo.png'}
        //       alt="X Girl"
        //       width={120}
        //       height={120}
        //       />
        //       </Link>
        //   </div>
        //   <div className="flex items-center gap-2">
        //     <ThemeToggle />
        //     <Sheet>
        //       <SheetTrigger asChild>
        //         <Button variant="ghost" size="icon">
        //           <Menu className="w-6 h-6" />
        //         </Button>
        //       </SheetTrigger>
        //       <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        //         <SheetHeader>
        //           <SheetTitle className="text-left">Menu</SheetTitle>
        //         </SheetHeader>
        //         <div className="flex flex-col space-y-4 mt-4">
        //           {navigationLinks.map((link) => (
        //             <Link
        //               key={link.href}
        //               href={link.href}
        //               className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg"
        //             >
        //               <Image
        //                 src={theme === 'dark' ? link.darkIcon : link.lightIcon}
        //                 alt={link.label}
        //                 width={24}
        //                 height={24}
        //               />
        //               {link.label}
        //             </Link>
        //           ))}
        //           <div className="pt-4 border-t">
        //             <Button className="w-full mb-2 rounded-full bg-pink-600 hover:bg-pink-600hover">
        //               Register
        //             </Button>
        //             <Button variant="outline" className="w-full rounded-full">
        //               Login
        //             </Button>
        //           </div>
        //         </div>
        //       </SheetContent>
        //     </Sheet>
        //   </div>
        // </div>
