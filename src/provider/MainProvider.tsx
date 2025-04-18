
// src/provider/MainProvider.tsx

'use client';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import HeaderMobile from '@/components/layout/header-mobile';
import ChatFloatingButton from '../components/ChatFloatingButton'; // Ajusta o caminho
export interface MainProviderProps {
  children: React.ReactNode;
}

export function MainProvider(props: MainProviderProps) {
  const { children } = props;

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[100px]  ">{children}</main>
        <ChatFloatingButton />
        <Footer />
      </div>
    </>
  );
}
