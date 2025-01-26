import { useState, useEffect, useRef } from "react";
import { IoIosOptions, IoIosArrowDown } from "react-icons/io";
import { BiSolidMoviePlay } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/ProfileActions";
import { logoutClubs } from "../../actions/ClubsActions";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaGlobe,
  FaSearch,
} from "react-icons/fa";
import Image from "next/image";

import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext"; // Importer le contexte du langage
import SearchModal from "../ui/search-modal";
import Filtro from "./filtro";
import { Switch } from "@nextui-org/react"; // Alternador visual
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeSwitcher from "@/components/ThemeSwitcher"; // Importe o ThemeSwitcher
import { Moon, Sun, Search, Globe, Menu, FilterIcon } from "lucide-react";
import { PiSlidersHorizontal } from "react-icons/pi";

interface HeaderProps {
  blur?: boolean;
}

const Header: React.FC<HeaderProps> = ({ blur }) => {
  const { t, i18n } = useTranslation();
  const { language, changeLanguage } = useLanguage(); // Use o contexto de idioma

  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");

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
  const [selectedLanguage, setSelectedLanguage] = useState<string>("FR"); // Idioma padrão
  const [searchQuery, setSearchQuery] = useState<string>("");

  const dropdownRef = useRef<HTMLUListElement>(null);
  const languageRef = useRef<HTMLUListElement>(null); // Ref para o menu de idiomas
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang); // Use a função do contexto para mudar o idioma
    setSelectedLanguage(lang.toUpperCase()); // Atualize o estado de selectedLanguage
    setLanguageMenuOpen(false); // Fecha o menu após a seleção
  };

  const handleClickOutsideLang = (event) => {
    if (languageRef.current && !languageRef.current.contains(event.target)) {
      setLanguageMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to close dropdown when clicking outside
    document.addEventListener("mousedown", handleClickOutsideLang);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutsideLang);
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
    document.addEventListener("mousedown", handleClickOutsideLang);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutsideLang);
    };
  }, []);

  useEffect(() => {
    setEmail(emailReduxProfile || "");
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
    localStorage.removeItem("email");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userUID");
    router.push("/");
  };

  return (
    <header className="">
      {/* <div className='w-full bg-black  h-16 flex justify-center items-center shadow-md'>
			<Link href='/' aria-label='Ir para a página inicial'>
	 			<Image src='/logo.webp' alt='Logo' width={200} height={200} priority style={{objectFit: "contain"}} />
			</Link>
			</div> */}
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8 h-16">
            <Link href="/">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={200}
                height={200}
                className="hover:opacity-80 transition-opacity duration-600"
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold">
              {[
                { href: "/", label: "Home" },
                { href: "/escort", label: "Escort" },
                { href: "/stories", label: "Stories" },
                { href: "/Filters", label: "Filters" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative pb-1 ${
                    window.location.pathname === item.href
                      ? "text-pink-500 font-semibold"
                      : "text-gray-700 dark:text-white hover:text-pink-500"
                  }`}
                >
                  {item.label}
                  {/* Underline animation */}
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] w-full bg-pink-500 transform transition-transform duration-300 ${
                      window.location.pathname === item.href
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-10" />
                <input
                  type="text"
                  placeholder={t("searchBar")}
                  className="pl-36 pr-4 py-2 text-sm mr-8 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
				  onClick={() => setModalOpen(true)} 			   />
              </div> */}

            <div className="relative flex items-center rounded-full bg-gray-800 dark:bg-gray-700 p-2 py-2 pr-2">
              {/* Ícone de busca */}
              <Search className="text-gray-400 h-4 w-4 mr-1" />

              {/* Input de busca */}
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-white text-sm placeholder-gray-400 focus:outline-none"
                onClick={() => setModalOpen(true)}
              />
              <PiSlidersHorizontal className="h-6 w-6 p-1 bg-gray-500 rounded-full" />
            </div>
            <ThemeSwitcher />
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center px-4 py-2  rounded-full transition duration-200 "
              >
                <FaGlobe className="mr-2 text-sm" />
                {selectedLanguage}
                <IoIosArrowDown className="ml-2 text-sm" />
              </button>
              {languageMenuOpen && (
                <ul
                  ref={languageRef}
                  className="absolute right-0 w-32 bg-white text-sm dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-lg rounded-lg hover:rounded-md"
                >
                  {/* <li
                     onClick={() => handleLanguageChange("pt")}
                     className="px-4 py-2 hover:bg-pink-900 cursor-pointer transition duration-200"
               >
                     Português
                   </li> */}
                  <li
                    onClick={() => handleLanguageChange("en")}
                    className="px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-200"
                  >
                    {t("EN")}
                  </li>
                  <li
                    onClick={() => handleLanguageChange("fr")}
                    className="px-4 py-2 text-sm  hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-200"
                  >
                    {t("FR")}
                  </li>
                </ul>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {!emailReduxProfile && !emailReduxClubs ? (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-xs font-semibold rounded-full border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-colors"
                  >
                    {t("login")}
                  </Link>

                  <Link
                    href="/registo/regista2"
                    className={`nav-link flex items-center justify-center font-semibold text-xs px-6 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors ${
                      pathname === "/registo/regista2"
                        ? "bg-pink-500 py-2"
                        : "hover:bg-pink-600"
                    } transition duration-200`}
                  >
                    {/* <FaUser className="mr-2 text-base" /> */}
                    {t("register")}
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4 cursor-pointer">
                  <span className="text-gray-800 dark:text-gray-300 text-xs flex">
                    {" "}
                    {emailReduxProfile}
                  </span>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-pink-500 transition-transform hover:scale-110">
                    {photoUID ? (
                      <Image
                        src={photoUID || "/logo.webp"}
                        alt="Profile Photo"
                        className="w-full h-full object-cover rounded-full"
                        loading="lazy"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-400"></div>
                    )}
                  </div>
                  {/* Seta do dropdown só é renderizada quando o usuário está logado */}
                  <div className="relative">
                    <button
                      onClick={toggleLanguageDropdown}
                      className="flex items-center text-gray-300 h-full"
                    >
                      <IoIosArrowDown className="text-sm text-gray-800 dark:text-gray-300" />
                    </button>
                    {languageDropdownOpen && (
                      <ul
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-48 dark:bg-gray-800 bg-white text-gray-700 dark:text-gray-200 shadow-lg rounded-lg py-2"
                      >
                        <li
                          onClick={() => {
                            router.push("/minha-conta");
                            setLanguageDropdownOpen(false);
                          }}
                          className="flex items-center px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer transition duration-200"
                        >
                          <FaUser className="mr-2 text-pink-500" />
                          {t("user.myAccount")}
                        </li>
                        <li
                          onClick={() => {
                            router.push("/definicoes");
                            setLanguageDropdownOpen(false);
                          }}
                          className="flex items-center px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer transition duration-200"
                        >
                          <FaCog className="mr-2  text-pink-500" />
                          {t("user.settings")}
                        </li>
                        <li
                          onClick={handleLogout}
                          className="flex items-center px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer transition duration-200"
                        >
                          <FaSignOutAlt className="mr-2  text-pink-500" />
                          {t("user.logout")}
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              )}
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
    </header>
  );
};

export default Header;
