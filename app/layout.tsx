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
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5GJ9FB09QJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5GJ9FB09QJ', {
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
