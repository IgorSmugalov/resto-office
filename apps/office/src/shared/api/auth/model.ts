import { SignInRequest, SignInResponse } from '@libs/schema'
import {
  apiRequestFx,
  ExceptionResponse,
  Method,
  setAuth,
} from '@shared/request'
import { attach, createDomain, sample } from 'effector'

const model = createDomain()

export const signInRequestFx = model.createEffect<
  SignInRequest,
  SignInResponse,
  ExceptionResponse
>()

export const refreshRequestFx = model.createEffect<
  void,
  SignInResponse,
  ExceptionResponse
>()

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

sample({
  clock: [signInRequestFx.doneData, refreshRequestFx.doneData],
  fn: ({ accessToken }) => accessToken,
  target: setAuth,
})
