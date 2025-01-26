"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Termes({}) {
  const { t } = useTranslation();


  return (
    <div className="text-gray-200 bg-gray-800 mx-4 my-10 md:mt-20 md:mx-auto max-w-5xl p-8 rounded-lg shadow-2xl font-sans space-y-12">
      {/* Titre principal */}
      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-100 mb-12 border-b-4 border-gray-600 pb-4">
      {t("terms.title")}
      </h1>

      {/* Sections */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t("terms.section1.title")}
        </h2>
        <p className="leading-relaxed text-gray-300">
          Cet avis légal régule lutilisation du site XGirl.fr, propriété de XGirl, LDA.
        </p>
        <p className="leading-relaxed text-gray-300">
          Laccès et la navigation sur le site attribuent automatiquement la condition dUTILISATEUR et impliquent lacceptation pleine et sans réserve de toutes les conditions publiées dans cet avis légal. Le PROPRIÉTAIRE DU SITE peut modifier ces conditions sans préavis, les modifications étant publiées et notifiées dès que possible.
        </p>
        <p className="leading-relaxed text-gray-300">
          Il est recommandé que lUTILISATEUR lise attentivement ce contenu avant d^utiliser les services et informations mis à disposition par le site.
        </p>
        <p className="leading-relaxed text-gray-300">
          LUTILISATEUR sengage à utiliser le site conformément aux lois, à la bonne foi, à lordre public, aux pratiques du marché et au présent Avis Légal, étant responsable envers le PROPRIÉTAIRE DU SITE ou des tiers de tout dommage résultant du non-respect de cette obligation.
        </p>
        <p className="leading-relaxed text-gray-300">
          Toute utilisation non autorisée peut entraîner la suspension de laccès et de lutilisation du site.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          2. IDENTIFICATION
        </h2>
        <p className="leading-relaxed text-gray-300">
          <strong className="text-gray-200">Nom légal :</strong> XGirl.pt, LDA.<br />
          <strong className="text-gray-200">NIF :</strong> 123456789<br />
          <strong className="text-gray-200">Adresse :</strong> Rua da Liberdade, 123, 1er étage, Quartier Central, Lisbonne, Portugal.<br />
          <strong className="text-gray-200">Email de contact :</strong> info@xgirl.fr
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          3. COMMUNICATIONS
        </h2>
        <p className="leading-relaxed text-gray-300">
          Les moyens de contact sont :<br />
          <strong className="text-gray-200">Téléphone :</strong> +351 910253456<br />
          <strong className="text-gray-200">Email :</strong> info@xgirl.fr
        </p>
        <p className="leading-relaxed text-gray-300">
          Toutes les communications entre lUTILISATEUR et le PROPRIÉTAIRE DU SITE seront considérées comme valides lorsquelles sont faites par lun des moyens mentionnés ci-dessus.
        </p>
      </section>

      {/* Section 4 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          4. CONDITIONS DACCÈS ET DUTILISATION
        </h2>
        <p className="leading-relaxed text-gray-300">
          Laccès au site et à ses services est gratuit. Cependant, certains services peuvent nécessiter le remplissage préalable de formulaires dinscription.
        </p>
        <p className="leading-relaxed text-gray-300">
          LUTILISATEUR déclare que toutes les informations fournies sont vraies et authentiques, étant le seul responsable de toute information fausse ou inexacte.
        </p>
        <p className="leading-relaxed text-gray-300">
          LUTILISATEUR sengage à utiliser de manière appropriée les contenus et services du site, sabstenant de :
        </p>
        <ul className="list-disc list-inside ml-6 text-gray-300 space-y-2">
          <li>Diffuser des contenus illégaux, violents, pornographiques, discriminatoires ou contraires à la loi et à lordre public.</li>
          <li>Insérer des virus ou des programmes pouvant endommager les systèmes du site ou de tiers.</li>
          <li>Tenter daccéder à des zones restreintes des systèmes du site ou de tiers et extraire des données non autorisées.</li>
          <li>Violer des droits de propriété intellectuelle ou industrielle.</li>
          <li>Usurper lidentité dautres utilisateurs.</li>
          <li>Distribuer, reproduire ou modifier des contenus sans autorisation expresse.</li>
        </ul>
      </section>

      {/* SEO Complet */}
      <section className="hidden">
        <h2>Termes et Conditions dUtilisation - XGirl</h2>
        <meta name="description" content="Découvrez les termes et conditions dutilisation du site XGirl.fr. Informations légales, conditions daccès et dutilisation des services proposés." />
        <meta name="keywords" content="termes et conditions, mention légale, XGirl, utilisation, services, accès, Portugal" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://xgirl.fr/termes" />
      </section>
    </div>
  );
}

export default Termes;
