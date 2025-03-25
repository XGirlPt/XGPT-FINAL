'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUserUID, setLoggedIn } from '@/backend/reducers/profileSlice';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser, FaCog, FaSignOutAlt, FaSearch, FaHome, FaBook, FaPenAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/backend/context/LanguageContext';
import SearchModal from '../ui/search-modal';
import { useTheme } from 'next-themes';
import { BiSolidMoviePlay } from "react-icons/bi";
import { Search, Globe, SlidersHorizontal, ChevronDown } from 'lucide-react';
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
import supabase from '@/backend/database/supabase';

interface HeaderProps {
  blur?: boolean;
}

const Header: React.FC<HeaderProps> = ({ blur }) => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  const userUID = useSelector((state: any) => state.profile.userUID);
  const email = useSelector((state: any) => state.profile.email || '');
  const photoUID = useSelector((state: any) => state.profile.photos?.[0]);
  const isLoggedIn = useSelector((state: any) => state.profile.isLoggedIn);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedLanguage, setSelectedLanguage] = useState<string>('PT');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Erro ao obter sessão:', error.message);
        dispatch(setLoggedIn(false));
        dispatch(setUserUID(null));
        return;
      }
      if (session) {
        dispatch(setUserUID(session.user.id));
        dispatch(setLoggedIn(true));
        console.log('Sessão sincronizada - userUID:', session.user.id);
      } else {
        dispatch(setLoggedIn(false));
        dispatch(setUserUID(null));
        console.log('Nenhuma sessão ativa encontrada');
      }
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        dispatch(setUserUID(session.user.id));
        dispatch(setLoggedIn(true));
        console.log('Usuário logado - userUID:', session.user.id);
      } else if (event === 'SIGNED_OUT') {
        dispatch(setLoggedIn(false));
        dispatch(setUserUID(null));
        console.log('Usuário deslogado');
      } else if (event === 'TOKEN_REFRESHED') {
        console.log('Token atualizado:', session?.user.id);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    setSelectedLanguage(lang.toUpperCase());
  };

  const handleLogout = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.error('Erro ao verificar sessão antes do logout:', sessionError.message);
      }

      if (session) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Erro ao fazer logout no Supabase:', error.message);
          throw error;
        }
        console.log('Logout realizado com sucesso no Supabase');
      } else {
        console.log('Nenhuma sessão ativa encontrada para logout');
      }

      dispatch(setLoggedIn(false));
      dispatch(setUserUID(null));
      localStorage.removeItem('email');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userUID');
      router.push('/');
    } catch (error) {
      console.error('Falha no logout:', error);
      dispatch(setLoggedIn(false));
      dispatch(setUserUID(null));
      localStorage.removeItem('email');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userUID');
      router.push('/');
    }
  };

  const handleMyAccountClick = () => {
    if (isLoggedIn && userUID) {
      router.push('/my-account');
    } else {
      router.push('/login');
    }
  };

  const navigationLinks = [
    { href: '/', label: 'Home', Icon: FaHome },
    { href: '/escort', label: 'Escort', Icon: FaUser },
    { href: '/stories', label: 'Stories', Icon: BiSolidMoviePlay },
    { href: '/blog', label: 'Blog', Icon: FaPenAlt },
    { href: '/Pub', label: 'Pub', Icon: FaPenAlt },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#f2ebee] dark:bg-[#100007]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className={cn('container mx-auto py-1 relative', theme === 'dark' ? 'text-zinc-50' : 'text-gray-900')}>
        <div className="hidden lg:grid grid-cols-[200px_1fr_300px] items-center gap-4 pt-2">
          <div className="flex items-center justify-start">
            <Link href="/">
              <Image 
                src="/logo-white.png" 
                alt="X Girl" 
                width={140} 
                height={140} 
                style={{ width: 'auto', height: 'auto' }}
                priority
              />
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="relative ml-10" style={{ width: '480px' }}>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setModalOpen(true)}
                className={cn(
                  'pl-10 py-2 text-base rounded-full border w-full',
                  theme === 'dark'
                    ? 'bg-[#2b1a21] border-zinc-700 text-white placeholder:text-zinc-400'
                    : 'bg-white border-gray-200 text-gray-900 placeholder:text-gray-400'
                )}
              />
              <Button
                size="icon"
                className={cn(
                  'absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-pink-600 hover:bg-pink-700 w-8 h-8'
                )}
              >
                <SlidersHorizontal className="w-4 h-4 dark:text-white" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            {isLoggedIn && userUID ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 bg-transparent border-none cursor-pointer">
                    {photoUID ? (
                      <div className="w-10 h-10 relative border border-pink-600 rounded-full">
                        <Image
                          src={photoUID || '/logo.webp'}
                          alt="Avatar"
                          layout="fill"
                          className="rounded-full object-cover"
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
                  <DropdownMenuItem onClick={handleMyAccountClick}>
                    <FaUser className="mr-2" /> {t('Header.myAccount')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <FaCog className="mr-2" /> {t('Header.settings')}
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
                  className={cn('rounded-full !px-6 bg-pink-600 hover:bg-pink-700 dark:text-white font-body')}
                >
                  {t('Header.register')}
                </Button>
                <Button
                  onClick={() => router.push('/login')}
                  variant="outline"
                  className={cn(
                    'rounded-full !px-6 font-body',
                    theme === 'dark' ? 'border-zinc-700' : 'border-gray-200 '
                  )}
                >
                  {t('Header.login')}
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="hidden lg:grid grid-cols-[200px_1fr_300px] items-center gap-4 pt-2">
          <div className="opacity-0">
            <Image 
              src="/logo-white.png" 
              alt="X Girl" 
              width={120} 
              height={120} 
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
          <div className="flex items-center justify-center gap-6">
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
          <div className="flex items-center justify-end gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  <Globe className="w-4 h-4 text-pink-600" />
                  {selectedLanguage}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  <Image src="/Flags/en.svg" alt="English" width={24} height={24} className="rounded-full" />
                  {t('Header.EN')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('pt')}>
                  <Image src="/Flags/pt.svg" alt="Portuguese" width={24} height={24} className="rounded-full" />
                  {t('Header.PT')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('fr')}>
                  <Image src="/Flags/fr.svg" alt="Francais" width={24} height={24} className="rounded-full" />
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