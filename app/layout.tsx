import Footer from './components/Footer'
import Preload from './components/Preload'
import Menu from './components/menu/Menu'
import './globals.css'
import { ReactNode } from 'react'
import type { Metadata } from 'next'
import Script from "next/script";
import AnalyticsTracker from "../components/AnalyticsTracker";

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-ansif.vercel.app'),
  title: 'Ansif Muhammed | Software Engineer & Full Stack Developer',
  description:
    'Official portfolio of Ansif Muhammed, a Software Engineer and Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, and modern AI-integrated web applications.',
  keywords: [
    'Ansif Muhammed',
    'Ansif',
    'Software Engineer',
    'AI software Developer',
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'React Developer',
    'Next.js Developer',
    'MERN Stack Developer',
    'Web Developer Portfolio',
  ],
  authors: [{ name: 'Ansif Muhammed', url: 'https://portfolio-ansif.vercel.app' }],
  creator: 'Ansif Muhammed',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  alternates: {
    canonical: 'https://portfolio-ansif.vercel.app',
  },
  openGraph: {
    title: 'Ansif Muhammed | Software Engineer & Full Stack Developer',
    description:
      'Official portfolio of Ansif Muhammed, a Software Engineer and Full Stack Developer building scalable, performant web applications.',
    url: 'https://portfolio-ansif.vercel.app',
    siteName: 'Ansif Muhammed Portfolio',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Ansif Muhammed - Software Engineer Portfolio',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ansif Muhammed | Software Engineer & Full Stack Developer',
    description:
      'Official portfolio of Ansif Muhammed, a Software Engineer and Full Stack Developer.',
    images: ['/icon.png'],
  },
  verification: {
    google: 'google652b5dbcb908b625',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
              page_location: window.location.href,
              page_path: window.location.pathname,
              version_number: "1",
            });
          `}
        </Script>

        {/* Schema.org Person & ProfilePage Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://portfolio-ansif.vercel.app/#person",
                  "name": "Ansif Muhammed",
                  "alternateName": ["Ansif", "Ansif Muhammed N N"],
                  "givenName": "Ansif",
                  "familyName": "Muhammed",
                  "url": "https://portfolio-ansif.vercel.app",
                  "image": "https://portfolio-ansif.vercel.app/icon.png",
                  "jobTitle": "Software Engineer / Full Stack Developer",
                  "description": "Software Engineer and Full Stack Developer specializing in React, Next.js, MERN stack, TypeScript, and AI-integrated web applications.",
                  "email": "mailto:ansifpta2003@gmail.com",
                  "sameAs": [
                    "https://github.com/mransif/",
                    "https://www.linkedin.com/in/ansif1/",
                    "https://www.instagram.com/anzi_f7/"
                  ],
                  "worksFor": {
                    "@type": "Organization",
                    "name": "Craftgenn Technology"
                  },
                  "knowsAbout": [
                    "Software Engineering",
                    "Full Stack Development",
                    "React.js",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                    "JavaScript",
                    "MongoDB",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "Artificial Intelligence Integration"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://portfolio-ansif.vercel.app/#website",
                  "url": "https://portfolio-ansif.vercel.app",
                  "name": "Ansif Muhammed | Portfolio",
                  "description": "Official personal portfolio of Ansif Muhammed, Software Engineer and Full Stack Developer.",
                  "publisher": {
                    "@id": "https://portfolio-ansif.vercel.app/#person"
                  }
                },
                {
                  "@type": "ProfilePage",
                  "@id": "https://portfolio-ansif.vercel.app/#profilepage",
                  "url": "https://portfolio-ansif.vercel.app",
                  "name": "Ansif Muhammed - Software Engineer & Full Stack Developer",
                  "isPartOf": {
                    "@id": "https://portfolio-ansif.vercel.app/#website"
                  },
                  "about": {
                    "@id": "https://portfolio-ansif.vercel.app/#person"
                  },
                  "mainEntity": {
                    "@id": "https://portfolio-ansif.vercel.app/#person"
                  }
                }
              ]
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
