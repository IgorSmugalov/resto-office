import { EffectorRegistry } from '@global/effector/effector-registry'
import { ThemeRegistry } from '@global/theme'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resto-office',
}

export default function RootLayout({ children }: { children: boolean }) {
  return (
    <html lang="ru">
      <body>
        <ThemeRegistry>
          <EffectorRegistry>{children}</EffectorRegistry>
        </ThemeRegistry>
      </body>
    </html>
  )
}
