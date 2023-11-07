import { SignInRequest, SignInResponse } from '@libs/schema'
import { ExceptionResponse } from '@shared/request'
import { createDomain } from 'effector'
import { createForm } from 'effector-forms'
import { equals, not, some } from 'patronum'
import { ZodError } from 'zod'

export type Credentials = SignInRequest

export const loginForm = createDomain()
export const form = createForm<Credentials>({
  domain: loginForm,
  fields: {
    email: {
      init: '',
    },
    password: {
      init: '',
    },
  },
})
export const init = loginForm.createEvent<void>()
export const reset = loginForm.createEvent<void>()
export const enableForm = loginForm.createEvent<void>()
export const disableForm = loginForm.createEvent<void>()
export const $formPending = loginForm.createStore(false)
export const $formApiError = loginForm.createStore<ExceptionResponse | null>(
  null
)
export const $formHasApiError = not(equals($formApiError, null))
export const $formHasValidationError = not(form.$isValid)
export const $formHasErrors = some({
  stores: [$formHasValidationError, $formHasApiError],
  predicate: true,
})

export const signInRequestFx = loginForm.createEffect<
  Credentials,
  SignInResponse,
  ExceptionResponse
>()

export const validateLoginFormFx = loginForm.createEffect<
  Credentials,
  Credentials,
  ZodError
>()
