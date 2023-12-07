import Navbar from '@/components/ui/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/ui/Footer';
import StoreProvider from '@/providers/StoreProvder';
import PersistStoreProvider from '@/providers/PersistStoreProvider';
import MessagePopup from '@/components/ui/MessagePopup';
import ConfirmDialog from '@/components/ui/ConfirmDialog';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Best Shop',
  description: 'CRM for best shop',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <StoreProvider>
          <PersistStoreProvider>
            <Navbar />
            <MessagePopup />
            <ConfirmDialog />
            <main className='mx-3 max-w-[1500px] pt-20 2xl:m-auto min-h-[calc(100vh-64px)]'>
              {children}
            </main>
            <Footer />
          </PersistStoreProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
