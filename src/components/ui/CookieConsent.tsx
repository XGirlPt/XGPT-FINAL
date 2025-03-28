"use client";

import * as React from "react";
import { Button } from "./button";
import { Switch } from "./switch";
import { useTranslation } from "react-i18next";
import Link from "next/link";

interface CookieConsentProps {
  onConsentChange?: (consent: { analytics: boolean; timestamp: string }) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = React.useState(false);
  const [analyticsConsent, setAnalyticsConsent] = React.useState(true); // Padrão: ativado

  React.useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    } else {
      try {
        const parsedConsent = JSON.parse(consent);
        setAnalyticsConsent(parsedConsent.analytics);
        onConsentChange?.(parsedConsent);
      } catch (error) {
        // Trata valores legados
        if (consent === "accepted") {
          const legacyConsent = { analytics: true, timestamp: new Date().toISOString() };
          localStorage.setItem("cookieConsent", JSON.stringify(legacyConsent));
          setAnalyticsConsent(true);
          onConsentChange?.(legacyConsent);
        } else if (consent === "declined") {
          const legacyConsent = { analytics: false, timestamp: new Date().toISOString() };
          localStorage.setItem("cookieConsent", JSON.stringify(legacyConsent));
          setAnalyticsConsent(false);
          onConsentChange?.(legacyConsent);
        }
      }
    }
  }, [onConsentChange]);

  const handleAcceptAll = () => {
    const consent = { analytics: true, timestamp: new Date().toISOString() };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setIsVisible(false);
    onConsentChange?.(consent);
  };

  const handleSave = () => {
    const consent = { analytics: analyticsConsent, timestamp: new Date().toISOString() };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setIsVisible(false);
    onConsentChange?.(consent);
  };

  const handleDecline = () => {
    const consent = { analytics: false, timestamp: new Date().toISOString() };
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setIsVisible(false);
    onConsentChange?.(consent);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-[#f2ebee] dark:bg-[#100007] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 md:max-w-lg md:left-auto md:right-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        {t("cookieConsent.title") || "Gerencie suas preferências de cookies"}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {t("cookieConsent.message") ||
          "Utilizamos cookies essenciais para o funcionamento do XGirl.pt e cookies opcionais de análise (ex.: Google Analytics: _ga, _gid) para melhorar sua experiência e entender como você usa o site. Escolha suas preferências:"}
      </p>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {t("cookieConsent.essential") || "Cookies Essenciais (sempre necessários)"}
          </span>
          <Switch checked={true} disabled aria-label="Cookies essenciais, sempre ativos" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {t("cookieConsent.analytics") || "Cookies de Análise (ex.: Google Analytics)"}
          </span>
          <Switch
            checked={analyticsConsent}
            onCheckedChange={setAnalyticsConsent}
            aria-label="Ativar ou desativar cookies de análise"
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline" onClick={handleDecline} className="text-sm">
          {t("cookieConsent.decline") || "Recusar Tudo"}
        </Button>
        <Button variant="outline" onClick={handleSave} className="text-sm">
          {t("cookieConsent.save") || "Salvar Preferências"}
        </Button>
        <Button
          onClick={handleAcceptAll}
          className="bg-darkpink hover:bg-darkpinkhover text-white text-sm"
        >
          {t("cookieConsent.accept") || "Aceitar Tudo"}
        </Button>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row gap-2 text-xs text-darkpink">
        <Link href="/politica-privacidade" className="hover:underline">
          {t("cookieConsent.learnMorePrivacy") || "Política de Privacidade"}
        </Link>
        <Link href="/cookies" className="hover:underline">
          {t("cookieConsent.learnMoreCookies") || "Política de Cookies"}
        </Link>
      </div>
    </div>
  );
};

export default CookieConsent;