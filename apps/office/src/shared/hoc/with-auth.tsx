import { $isAuth } from '@shared/request'
import { useUnit } from 'effector-react/effector-react.umd'
import { usePathname, useRouter } from 'next/navigation'
import { ComponentType, FC, useEffect } from 'react'

const withAuth = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const Protected: FC<P> = (props) => {
    const path = usePathname()
    const router = useRouter()
    const [isAuth] = useUnit([$isAuth])
    useEffect(() => {
      if (!isAuth) router.push(path === '/' ? 'login' : `login?from=${path}`)
    }, [isAuth, path, router])
    if (!isAuth) return null

    return <Component {...props} />
  }
  return Protected
}

export default withAuth
