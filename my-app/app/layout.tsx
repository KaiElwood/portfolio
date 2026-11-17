import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import './globals.css';

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Kai's Garden",
  description: 'Welcome to my garden',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jetbrains.className}>
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 sm:px-8">
          <NavBar />
          <main className="flex min-w-0 flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
