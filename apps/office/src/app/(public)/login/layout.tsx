import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Resto-office',
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>PublicLayout</div>
      <div>{children}</div>
    </>
  )
}
