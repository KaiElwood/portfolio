import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Header from '../src/components/Header';

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
			hello
			<Header />
			<body className={inter.className}>{children}</body>
		</html>
	)
}
