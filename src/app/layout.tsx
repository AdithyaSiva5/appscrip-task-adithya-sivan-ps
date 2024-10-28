import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-commerce Store',
  description: 'Our product catalog',
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