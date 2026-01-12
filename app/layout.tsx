import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Toaster } from '@/components/ui/Toasts/toaster';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import 'styles/main.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const title = 'study.exe // ADHD Focus Eye Tracking Distraction Destroyer';
const description = 'Destroy your distractions. Reclaim your focus. Study or perish trying.';

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    type: 'website',
    siteName: 'study.exe'
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description
  },
  icons: {
    icon: '/studyexe_logo_white_on_black.svg',
    shortcut: '/studyexe_logo_white_on_black.svg',
    apple: '/studyexe_logo_white_on_black.svg',
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <link rel="icon" href="/studyexe_logo_white_on_black.svg" type="image/svg+xml" />
      </head>
      <body className={`${inter.className} bg-black font-light flex flex-col min-h-screen`}>
        <div className="fixed inset-0 bg-matrix-grid z-[-1]" />
        <Navbar />
        <main
          id="skip"
          className="flex-grow"
        >
          {children}
        </main>
        <Footer />
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}

