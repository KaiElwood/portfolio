import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import NavBar from './components/NavBar';

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
		<NavBar />
		{children}
	</body>
    </html>
	)
}
