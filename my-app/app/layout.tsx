import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
const inter = Inter({ subsets: ['latin'] });
import NavBar from './components/NavBar';
import "./globals.css";
// import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Kai's Garden",
  description: 'Welcome to my garden',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
	return (
		<html lang="en">
    {
    }
    <head />
    <body className={inter.className}>
			<div className="md:max-w-xl lg:max-w-5xl min-h-screen m-auto grid grid-rows-footer">
				<NavBar />
				{children}
				<Footer />
			</div>
	</body>
    </html>
	)
}
