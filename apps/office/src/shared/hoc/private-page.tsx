import { $appReady } from '@entities/app/model/model'
import { $isAuth } from '@shared/request'
import { useUnit } from 'effector-react/effector-react.umd'
import { usePathname, useRouter } from 'next/navigation'
import { ComponentType, FC, useEffect } from 'react'

const privatePage = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const Private: FC<P> = (props) => {
    const path = usePathname()
    const router = useRouter()
    const [appReady, isAuth] = useUnit([$appReady, $isAuth])

    useEffect(() => {
      if (!isAuth && appReady)
        router.push(path === '/' ? 'login' : `login?from=${path}`)
    }, [isAuth, appReady, path, router])

    if (!isAuth || !appReady) return null

    return <Component {...props} />
  }
  return Private
}

export default privatePage
