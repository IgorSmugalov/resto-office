import { attach } from 'effector'
import { apiRequestFx, Method } from '@shared/request'

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

export const signInRequestFx = attach({
  effect: apiRequestFx,
  mapParams: (body: Credentials) => ({
    method: Method.post,
    path: 'auth/sign-in/',
    body,
  }),
})
