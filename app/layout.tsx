import type { Metadata } from 'next'
import { Inter, Playfair_Display, Noto_Sans_Gujarati } from 'next/font/google'
import './globals.css'
import { ElementSelector } from '@/components/dev-tools/ElementSelector'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const gujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  variable: '--font-gujarati',
  display: 'swap',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'E-Kankotri - Create Beautiful Gujarati Wedding Invitations',
  description: 'Create stunning animated wedding invitations in 2 minutes. Share via link or PDF. ₹299 one-time payment.',
  keywords: ['wedding invitation', 'gujarati wedding', 'kankotri', 'digital invitation', 'animated invitation'],
  authors: [{ name: 'E-Kankotri' }],
  openGraph: {
    title: 'E-Kankotri - Create Beautiful Gujarati Wedding Invitations',
    description: 'Create stunning animated wedding invitations in 2 minutes. Share via link or PDF.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDev = process.env.NODE_ENV === 'development';
  
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${gujarati.variable}`}>
      <body className="font-inter antialiased">
        {children}
        {/* Element Selector - Development Mode Only */}
        {isDev && <ElementSelector />}
      </body>
    </html>
  )
}
