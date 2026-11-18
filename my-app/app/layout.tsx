import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import './globals.css';

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Kai's Garden",
  description: 'A personal garden of data, code, and things I’ve been growing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jetbrains.className}>
        <div className="flex min-h-screen min-h-[100svh] w-full max-w-[1440px] flex-col px-6 sm:px-10">
          <NavBar />
          <main className="flex min-w-0 flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
