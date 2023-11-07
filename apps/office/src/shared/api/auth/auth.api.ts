import { SignInRequest, SignInResponse } from '@libs/schema'
import {
  apiRequestFx,
  authenticate,
  ExceptionResponse,
  Method,
} from '@shared/request'
import { attach, createEffect, sample } from 'effector'

export enum AuthApiExceptionMessages {
  'IncorrectCredentials' = 'IncorrectCredentials',
  'UserNotActivated' = 'UserNotActivated',
}

export const signInRequestFx = createEffect<
  SignInRequest,
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

sample({
  clock: signInRequestFx.doneData,
  fn: ({ accessToken }) => {
    return accessToken
  },
  target: authenticate,
})
