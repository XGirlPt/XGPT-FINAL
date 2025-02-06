"use client";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Termos() {
  const { t } = useTranslation();

  return (
    <div className=" mx-4 my-10 md:mt-20 md:mx-auto max-w-5xl p-8 rounded-lg shadow-2xl font-sans space-y-12">
      <h1 className="text-center text-3xl md:text-5xl font-bold text-gray-100 mb-12pb-4">
        {t('TermosPage.title')}
      </h1>

      {/* Seção 1 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t('TermosPage.section1.title')}
        </h2>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section1.content')}</p>
      </section>

      {/* Seção 2 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t('TermosPage.section2.title')}
        </h2>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section2.content')}</p>
      </section>

      {/* Seção 3 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t('TermosPage.section3.title')}
        </h2>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section3.content')}</p>
      </section>

      {/* Seção 4 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t('TermosPage.section4.title')}
        </h2>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section4.content')}</p>
      </section>

      {/* Seção 5 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t('TermosPage.section5.title')}
        </h2>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section5.content')}</p>
      </section>

      {/* Seção 6 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t('TermosPage.section6.title')}
        </h2>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section6.content')}</p>
      </section>

      {/* Seção 7 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t('TermosPage.section7.title')}
        </h2>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section7.content')}</p>
      </section>

      {/* Seção 8 */}
      <section className="space-y-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-100 border-b border-gray-600 pb-2">
          {t('TermosPage.section8.title')}
        </h2>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section8.content')}</p>
        <p className="leading-relaxed text-gray-300">{t('TermosPage.section8.contact')}</p>
      </section>
    </div>
  
  );
}

export default Termos;
