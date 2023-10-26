import { ReactNode } from 'react'
import { ThemeRegistry } from '@global/theme'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resto-office',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
