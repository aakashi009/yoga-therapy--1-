import type { Metadata } from 'next'
import './globals.css'
import FloatingChatbot from '@/components/floating-chatbot'

export const metadata: Metadata = {
  title: 'CureThruYoga',
  description: 'Heal your body through yoga - Personalized yoga therapy for various health conditions',
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        {children}
        <FloatingChatbot />
      </body>
    </html>
  )
}
