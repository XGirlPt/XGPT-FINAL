"use client";

import React, {createContext, useContext, useState, ReactNode} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useTranslation} from "react-i18next"; // Adicione esta linha

interface LanguageContextProps {
	language: string;
	changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({children}: {children: ReactNode}) => {
	const {i18n} = useTranslation(); // Adicione o hook useTranslation para acessar o i18next
	const router = useRouter();
	const pathname = usePathname();
	const [language, setLanguage] = useState<string>("pt"); // Idioma padrão

	const changeLanguage = (lang: string) => {
		setLanguage(lang);
		i18n.changeLanguage(lang); // Atualiza o idioma no i18next
	};

	return <LanguageContext.Provider value={{language, changeLanguage}}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage deve ser usado dentro de LanguageProvider");
	}
	return context;
};
