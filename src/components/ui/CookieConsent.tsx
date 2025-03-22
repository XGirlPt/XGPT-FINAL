"use client";

import * as React from "react";
import { Button } from "./button";
import { Switch } from "./switch";
import { useTranslation } from "react-i18next";

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
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 md:max-w-md md:left-auto md:right-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {t("cookieConsent.title") || "We use cookies"}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {t("cookieConsent.message") ||
          "We use essential cookies for site functionality and optional analytics cookies (e.g., Google Analytics: _ga, _gid) to understand how you use our site. Choose which cookies to allow:"}
      </p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {t("cookieConsent.essential") || "Essential Cookies (always required)"}
          </span>
          <Switch checked={true} disabled />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {t("cookieConsent.analytics") || "Analytics Cookies (e.g., Google Analytics)"}
          </span>
          <Switch
            checked={analyticsConsent}
            onCheckedChange={setAnalyticsConsent}
          />
        </div>
      </div>
      <div className="mt-4 flex gap-2 justify-end">
        <Button variant="outline" onClick={handleDecline} className="text-sm">
          {t("cookieConsent.decline") || "Decline All"}
        </Button>
        <Button
          onClick={handleSave}
          className="bg-darkpink hover:bg-darkpinkhover text-white text-sm"
        >
          {t("cookieConsent.save") || "Save"}
        </Button>
      </div>
      <a
        href="/Privacidade"
        className="mt-2 text-xs text-darkpink hover:underline"
      >
        {t("cookieConsent.learnMore") || "Learn more about our Privacy Policy"}
      </a>
    </div>
  );
};

export default CookieConsent;