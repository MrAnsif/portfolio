import Footer from './components/Footer'
import Preload from './components/Preload'
import Menu from './components/menu/Menu'
import './globals.css'
import { ReactNode } from 'react'
import Script from "next/script";
import AnalyticsTracker from "../components/AnalyticsTracker";

export const metadata = {
  title: 'Ansif | Portfolio',
  description: 'Portfolio of a Full stack developer.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html >
      <head>
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
            gtag('config', ${process.env.NEXT_PUBLIC_GA_ID}, {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <Preload />
        <Menu />
        {children}
        <Footer />
        <AnalyticsTracker />
      </body>
    </html>
  )
}
