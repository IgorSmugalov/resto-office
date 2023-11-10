'use client'

import { initApp } from '@entities/app'
import { ThemeRegistry } from '@global/theme'
import { useEffectOnce } from '@shared/hooks'
import { useUnit } from 'effector-react'
import './init'

export default function RootLayout({ children }: { children: boolean }) {
  const [initAppEv] = useUnit([initApp])
  useEffectOnce(() => initAppEv)

  return (
    <html lang="ru">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
