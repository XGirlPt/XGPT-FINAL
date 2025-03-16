'use client';
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountSettingsForm } from '../../components/forms/account-settings-form';
import { SubscriptionForm } from '../../components/forms/subscription-form';
import { logout } from '@/backend/actions/ProfileActions';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export default function Settings() {

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: any) => state.profile.isLoggedIn);

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
    <main className="bg-[#f2ebee] dark:bg-[#100007] py-10 ">
      <div className="container mx-auto relative font-body">
        <Breadcrumb>
          <BreadcrumbList className="text-md">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-darkpink">
                My Account
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div
          className="absolute rounded-full z-30 bg-[#f7a5c7] dark:bg-[#2e0415]"
          style={{
            height: '300px',
            width: '300px',
            borderRadius: '200px',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-45deg)',
            filter: 'blur(80px)',
            zIndex: 0,
          }}
        />
        <h2 className="text-4xl mt-6 font-bold">Settings</h2>
        <div className="mt-6 relative z-10">
          <Tabs defaultValue="account-settings">
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <TabsList className="w-max min-w-full bg-transparent lg:grid lg:grid-cols-3 2xl:gap-0 flex gap-0 mb-10">
                <TabsTrigger
                  value="account-settings"
                  className="text-xl whitespace-nowrap"
                >
                  Account Settings
                </TabsTrigger>
                <TabsTrigger
                  value="subscription"
                  className="text-xl whitespace-nowrap"
                >
                  Subscription
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="text-xl whitespace-nowrap"
                >
                  Profile
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="account-settings">
              <AccountSettingsForm />
            </TabsContent>
            <TabsContent value="subscription">
              <SubscriptionForm />
            </TabsContent>
            <TabsContent value="profile">
              {/* <ProfileForm /> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
