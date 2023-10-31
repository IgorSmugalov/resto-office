'use client'

import { LoginForm } from '@features/login-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useUnit } from 'effector-react/effector-react.umd'
import { $isAuth } from '@shared/request'
import { useEffect } from 'react'

export default function Login() {
  useLoginNavigate()
  return (
    <main>
      <LoginForm />
    </main>
  )
}

const useLoginNavigate = () => {
  const router = useRouter()
  const [isAuth] = useUnit([$isAuth])
  const params = useSearchParams()
  useEffect(() => {
    if (isAuth) {
      const from = params.get('from') ?? '/'
      router.replace(from)
    }
  }, [isAuth, router, params])
}
