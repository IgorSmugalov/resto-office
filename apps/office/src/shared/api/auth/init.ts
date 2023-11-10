import { SignInRequest } from '@libs/schema'
import {
  refreshRequestFx,
  signInRequestFx,
  signOutRequestFx,
} from '@shared/api/auth/model'
import { apiRequestFx, Method, resetAuth, setAuth } from '@shared/request'
import { attach, sample } from 'effector'

signInRequestFx.use(
  attach({
    effect: apiRequestFx,
    mapParams: (body: SignInRequest) => ({
      method: Method.post,
      path: 'auth/sign-in/',
      body,
    }),
  })
)

refreshRequestFx.use(
  attach({
    effect: apiRequestFx,
    mapParams: () => ({
      method: Method.post,
      path: 'auth/refresh',
    }),
  })
)

signOutRequestFx.use(
  attach({
    effect: apiRequestFx,
    mapParams: () => ({
      method: Method.delete,
      path: 'auth/sign-out',
    }),
  })
)

sample({
  clock: [signInRequestFx.doneData, refreshRequestFx.doneData],
  fn: ({ accessToken }) => accessToken,
  target: setAuth,
})

sample({
  clock: [signOutRequestFx.doneData],
  target: resetAuth,
})
