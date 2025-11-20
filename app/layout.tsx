import Footer from './components/Footer'
import Preload from './components/Preload'
import Menu from './components/menu/Menu'
import './globals.css'
import { ReactNode } from 'react'
import Script from "next/script";
import AnalyticsTracker from "../components/AnalyticsTracker";

export const metadata = {
  title: 'Ansif | MERN Stack Developer & Full Stack Developer',
  description:
    'Portfolio of Ansif, MERN stack developer specializing in React, Next.js, full-stack developer and AI integrated smart web apps.',

  // Added icons (keeps your favicon + supports browser / PWA)
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  // Added OpenGraph block (Google, FB, LinkedIn use this)
  openGraph: {
    title: 'Ansif | MERN Stack Developer',
    description:
      'Portfolio of Ansif, MERN and Next.js developer building AI-powered full-stack applications.',
    url: 'https://ansif.tech',
    siteName: 'Ansif Portfolio',
    images: [
      {
        url: '/icon.png',  // <-- your updated logo with background
        width: 1200,
        height: 630,
        alt: 'Ansif Portfolio Logo',
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics scripts (kept exactly as is) */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Added Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ansif",
              "url": "https://ansif.tech",
              "logo": "https://ansif.tech/icon.png"
            }),
          }}
        />
      </head>

      <body>
        <Preload />
        <Menu />
        {children}
        <Footer />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
