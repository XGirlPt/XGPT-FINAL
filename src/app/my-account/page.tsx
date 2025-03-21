'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneralInformationForm } from '@/components/forms/general-information-form';
import { ServicePreferencesForm } from '@/components/forms/service-preferences-form';
import PhotosForm from '@/components/forms/photos-form';
import { StoriesForm } from '@/components/forms/stories-form';
import { MyCardForm } from '@/components/forms/my-card-form';
import { logout } from '@/backend/actions/ProfileActions';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useTranslation } from 'react-i18next';


export default function MyAccount() {
  const router = useRouter();
  const isLoggedIn = useSelector((state: any) => state.profile.isLoggedIn);
  const { t } = useTranslation();

  
  useEffect(() => {
    console.log('MyAccount - isLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      console.log('MyAccount - Redirecionando para /login');
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Redirecionado
  }


  return (
    <main className="bg-[#f2ebee] dark:bg-[#100007] py-10">
      <div className="container mx-auto relative font-body">
      <Breadcrumb>
        <BreadcrumbList className="text-md">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t('MySettings.home')}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-darkpink">{t('MySettings.myAccount')}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="text-4xl mt-6 font-bold">{t('MySettings.title')}</h2>
      <div className="mt-6">
        <Tabs defaultValue="general-information">
          <div className="overflow-x-auto scrollbar-hide pb-2">
            <TabsList className="w-max min-w-full bg-transparent lg:grid lg:grid-cols-5 2xl:gap-0 flex gap-0 mb-10">
              <TabsTrigger value="general-information" className="text-xl whitespace-nowrap">
                {t('MySettings.generalInformation')}
              </TabsTrigger>
              <TabsTrigger value="service-preferences" className="text-xl whitespace-nowrap">
                {t('MySettings.servicePreferences')}
              </TabsTrigger>
              <TabsTrigger value="photos" className="text-xl whitespace-nowrap">
                {t('MySettings.photos')}
              </TabsTrigger>
              <TabsTrigger value="stories" className="text-xl whitespace-nowrap">
                {t('MySettings.stories')}
              </TabsTrigger>
              <TabsTrigger value="my-card" className="text-xl whitespace-nowrap">
                {t('MySettings.myCard')}
              </TabsTrigger>
            </TabsList>
            </div>
            <TabsContent value="general-information">
              <GeneralInformationForm />
            </TabsContent>
            <TabsContent value="service-preferences">
              <ServicePreferencesForm />
            </TabsContent>
            <TabsContent value="photos">
              <PhotosForm />
            </TabsContent>
            <TabsContent value="stories">
              <StoriesForm />
            </TabsContent>
            <TabsContent value="my-card">
              <MyCardForm />
            </TabsContent>
          </Tabs>
        </div>
     
      </div>
    </main>
  );
}