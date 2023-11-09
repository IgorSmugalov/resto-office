'use client'

import '@entities/authenticated-user/model/init'
import { FC, ReactNode } from 'react'

export const EffectorRegistry: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>
}
