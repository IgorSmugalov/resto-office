import {
  apiRequestFx,
  authenticate,
  ExceptionResponse,
  Method,
} from '@shared/request'
import { attach, createEffect, sample } from 'effector'

export interface Credentials {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
}

export enum AuthApiExceptionMessages {
  'IncorrectCredentials' = 'IncorrectCredentials',
  'UserNotActivated' = 'UserNotActivated',
}

export const signInRequestFx = createEffect<
  Credentials,
  AuthResponse,
  ExceptionResponse
>()

signInRequestFx.use(
  attach({
    effect: apiRequestFx,
    mapParams: (body: Credentials) => ({
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
