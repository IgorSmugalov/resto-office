import ThemeRegistry from '@global/theme/theme-registry'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Resto-office',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ThemeRegistry options={{ key: 'mui' }}>
        <body className={inter.className}>{children}</body>
      </ThemeRegistry>
    </html>
  )
}
