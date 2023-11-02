import Navbar from '@/components/ui/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/ui/Footer';
import StoreProvider from '@/providers/StoreProvder';
import PersistStoreProvider from '@/providers/PersistStoreProvider';
import MessagePopup from '@/components/ui/MessagePopup';

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
      <body className={inter.className}>
        <StoreProvider>
          <PersistStoreProvider>
            <Navbar />
            <MessagePopup />
            <main className='mx-3 max-w-[1500px] 2xl:m-auto'>{children}</main>
            <Footer />
          </PersistStoreProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
