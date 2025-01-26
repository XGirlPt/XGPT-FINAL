"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Privacidade() {
  const { t, i18n } = useTranslation();

  return (
    <div className="text-gray-400 bg-gray-800 mx-4 my-10 md:mt-44 md:mx-auto max-w-5xl p-8 rounded-lg shadow-lg font-sans space-y-12">
      <h1 className="text-center text-4xl font-bold mb-12 border-b border-gray-700 pb-4 text-pink-500">
        {t("privacyPolicy.title")}
      </h1>

      {/** SEÇÕES DA POLÍTICA */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          1. {t("privacyPolicy.section1.title")}
        </h2>
        <p>{t("privacyPolicy.section1.content.0")}</p>
        <p>{t("privacyPolicy.section1.content.1")}</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          2. {t("privacyPolicy.section2.title")}
        </h2>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
          <li>
            <strong>{t("privacyPolicy.section2.content.0")}</strong> Xgirl.pt
          </li>
          <li>
            <strong>{t("privacyPolicy.section2.content.1")}</strong> {t("privacyPolicy.section2.content.2")}
          </li>
          <li>
            <strong>{t("privacyPolicy.section2.content.3")}</strong> {t("privacyPolicy.section2.content.4")}
          </li>
          <li>
            <strong>{t("privacyPolicy.section2.content.5")}</strong> {t("privacyPolicy.section2.content.6")}
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          3. {t("privacyPolicy.section3.title")}
        </h2>
        <p>
          <strong>{t("privacyPolicy.section3.content.0")}</strong> Xgirl.pt, LDA.<br />
          <strong>{t("privacyPolicy.section3.content.1")}</strong> 123456789<br />
          <strong>{t("privacyPolicy.section3.content.2")}</strong> Avenida da Liberdade, n.º 100, Lisboa, Portugal.<br />
          <strong>{t("privacyPolicy.section3.content.3")}</strong> <a href="mailto:info@xgirl.pt" className="text-pink-500 hover:underline">info@xgirl.pt</a>
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          4. {t("privacyPolicy.section4.title")}
        </h2>
        <ul className="list-disc list-inside ml-6 space-y-3">
          <li>
            <strong>{t("privacyPolicy.section4.content.0")}</strong> {t("privacyPolicy.section4.content.1")}
          </li>
          <li>
            <strong>{t("privacyPolicy.section4.content.2")}</strong> {t("privacyPolicy.section4.content.3")}
          </li>
          <li>
            <strong>{t("privacyPolicy.section4.content.4")}</strong> {t("privacyPolicy.section4.content.5")}
          </li>
          <li>
            <strong>{t("privacyPolicy.section4.content.6")}</strong> {t("privacyPolicy.section4.content.7")}
          </li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          5. {t("privacyPolicy.section5.title")}
        </h2>
        <p>
          {t("privacyPolicy.section5.content.0")}:{" "}
          <a href="mailto:info@xgirl.pt" className="text-pink-500 hover:underline">
            info@xgirl.pt
          </a>{" "}
          {t("privacyPolicy.section5.content.1")}: +351 910253456
        </p>
      </section>

      {/** LINKS EXTERNOS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 text-white">
          6. {t("privacyPolicy.section6.title")}
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32016R0679" className="text-pink-500 hover:underline">
              {t("privacyPolicy.section6.content.0")}
            </a>
          </li>
          <li>
            <a href="https://commission.europa.eu/law/law-topic/data-protection/reform/rules-business-and-organisations_en" className="text-pink-500 hover:underline">
              {t("privacyPolicy.section6.content.1")}
            </a>
          </li>
        </ul>
      </section>

      {/** NOTA FINAL */}
      <section>
        <p className="text-gray-300 text-sm text-center">
          <em>{t("privacyPolicy.note.content")}</em>
        </p>
      </section>
    </div>
  );
}

export default Privacidade;
