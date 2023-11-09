'use client'

import { useLoginNavigate } from '@shared/hooks'
import { Login as LoginWidget } from '@widgets/login'

export default function Login() {
  useLoginNavigate()

  return <LoginWidget />
}
