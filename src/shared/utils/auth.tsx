'use client'

import { createContext, FC, ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEffectOnce } from '@shared/hooks'

export const AuthContext = createContext<{ name: string } | undefined>(
  undefined
)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state] = useState<{ name: string } | undefined>(undefined)
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const protectedPage = (Page: () => ReactNode) => {
  return function useProtectedPage(props: object) {
    const auth = false
    const router = useRouter()
    useEffectOnce(() => {
      if (!auth) return router.push('/login')
    })

    if (!auth) return null

    return <Page {...props} />
  }
}
