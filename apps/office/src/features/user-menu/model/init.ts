import * as authApi from '@shared/api/auth'
import { attach, sample } from 'effector'
import { signOut, signOutUserMenuRequestFx } from '../model'

signOutUserMenuRequestFx.use(attach({ effect: authApi.signOutRequestFx }))

sample({
  clock: signOut,
  target: signOutUserMenuRequestFx,
})
