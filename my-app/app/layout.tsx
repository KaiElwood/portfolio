import type { Metadata } from 'next';
import { Inter, Work_Sans } from 'next/font/google';
import Footer from './components/Footer';
const work = Work_Sans({ subsets: ['latin'] });
import NavBar from './components/NavBar';
import "./globals.css";

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
    <body className={work.className}>
			<div className="md:max-w-2xl lg:max-w-5xl min-h-screen m-auto grid grid-rows-footer">
				<NavBar />
				{children}
				<Footer />
			</div>
	</body>
    </html>
	)
}
