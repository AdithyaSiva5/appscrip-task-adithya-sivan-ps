import './globals.css'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
export const metadata: Metadata = {
  title: 'E-commerce Store',
  description: 'Discover our premium collection of products with great deals and fast shipping. Shop now for the best online shopping experience.',
  keywords: 'e-commerce, online shopping, premium products, deals, fast shipping',
  authors: [{ name: 'Ecommerce' }],
  creator: 'Adithya',
  publisher: 'Ecommerce',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // metadataBase: new URL('ecommerce.vercel'),
  // alternates: {
  //   canonical: '/',
  //   languages: {
  //     'en-US': '/en-us',
  //     'es-ES': '/es',
  //   },
  // },
  openGraph: {
    title: 'E-commerce Store',
    description: 'Discover our premium collection of products with great deals and fast shipping.',
    url: 'ecommerce.vercel',
    siteName: 'E-commerce Store',
    images: [
      {
        url: 'https://ecommerce.vercel/og-image.png',
        width: 1200,
        height: 630,
        alt: 'E-commerce Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-commerce Store',
    description: 'Discover our premium collection of products with great deals and fast shipping.',
    creator: '@yourhandle',
    images: ['https://ecommerce.vercel/twitter-image.png'],
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
  verification: {
    google: 'code',
    yandex: 'code',
    yahoo: 'code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}