import type { Metadata } from 'next'
import { inter, spaceGrotesk } from './fonts'
import { Analytics } from '@vercel/analytics/react'
import ClientLayout from '@/components/ClientLayout'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import './design-system.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'TutusPorta - Accessibility Testing Platform',
  description: 'Professional accessibility testing and compliance monitoring platform for websites',
  keywords: ['accessibility', 'WCAG', 'testing', 'compliance', 'monitoring', 'a11y'],
  authors: [{ name: 'Vexnexa' }],
  creator: 'Vexnexa',
  publisher: 'Vexnexa',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TutuSporta',
  },
  openGraph: {
    title: 'TutuSporta - Accessibility Testing Platform',
    description: 'Professional accessibility testing and compliance monitoring platform for websites',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'TutuSporta - Accessibility Testing Platform',
    description: 'Professional accessibility testing and compliance monitoring platform for websites',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#0EA5E9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Default favicon - will be replaced by white label if configured */}
        <link rel="icon" href="/favicon.ico" />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />

        {/* iOS PWA Support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="TutuSporta" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* Android PWA Support */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="TutuSporta" />

        {/* Microsoft PWA Support */}
        <meta name="msapplication-TileColor" content="#0EA5E9" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Theme Color */}
        <meta name="theme-color" content="#0EA5E9" />
        <meta name="msapplication-navbutton-color" content="#0EA5E9" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Preload Service Worker */}
        <link rel="prefetch" href="/sw.js" />
      </head>
      <body className="font-sans antialiased bg-[var(--tp-muted)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}