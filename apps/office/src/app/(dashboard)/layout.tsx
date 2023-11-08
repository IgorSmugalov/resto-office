import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Resto-office',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>DashboardLayout</div>
      <div>{children}</div>
    </>
  )
}
