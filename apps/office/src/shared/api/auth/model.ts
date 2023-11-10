import { SignInRequest, SignInResponse } from '@libs/schema'
import { ExceptionResponse } from '@shared/request'
import { createDomain } from 'effector'

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

export const signOutRequestFx = model.createEffect<
  void,
  void,
  ExceptionResponse
>()
