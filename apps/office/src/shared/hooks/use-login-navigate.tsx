import { $isAuth } from '@shared/request'
import { useUnit } from 'effector-react/effector-react.umd'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useLoginNavigate = () => {
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
