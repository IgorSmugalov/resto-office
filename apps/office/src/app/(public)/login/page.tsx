'use client'

import { $appReady } from '@entities/app/model/model'
import { $isAuth } from '@shared/request'
import { Login as LoginWidget } from '@widgets/login'
import { useUnit } from 'effector-react/effector-react.umd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Login() {
  const [appReady, isAuth] = useUnit([$appReady, $isAuth])
  const router = useRouter()
  const params = useSearchParams()
  useEffect(() => {
    if (isAuth) {
      const from = params.get('from') ?? '/'
      router.replace(from)
    }
  }, [isAuth, router, params])
  if (!appReady || isAuth) return null
  return <LoginWidget />
}
