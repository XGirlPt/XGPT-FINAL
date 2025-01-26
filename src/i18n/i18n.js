"use client"

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/en.json';  // Corrigir o caminho
import pt from '../locales/pt/pt.json';  // Corrigir o caminho
import fr from '../locales/fr/fr.json';  // Corrigir o caminho

i18n
  .use(initReactI18next) // Inicializa o i18next com o React
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      fr: { translation: fr },
    },
    lng: 'fr', // Idioma padrão
    fallbackLng: 'fr', // Idioma de fallback caso o idioma não esteja disponível
    interpolation: {
      escapeValue: false, // Não precisamos escapar valores no React
    },
  });

export default i18n; // Exporta o objeto i18n
