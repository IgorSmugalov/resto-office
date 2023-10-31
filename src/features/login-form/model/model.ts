import { AuthResponse, Credentials } from '@shared/api/auth'
import { ExceptionResponse } from '@shared/request'
import { validateFormFx } from '@shared/utils'
import { attach, createDomain } from 'effector'
import { createForm } from 'effector-forms'
import { equals, not, some } from 'patronum'
import { z, ZodError } from 'zod'

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
  AuthResponse,
  ExceptionResponse
>()

export const validateLoginFormFx = loginForm.createEffect<
  Credentials,
  Credentials,
  ZodError
>(
  attach({
    effect: validateFormFx,
    mapParams: (object: Credentials) => ({ object, schema: formSchema }),
  })
)

enum formValidationErrors {
  incorrectEmail = 'Неправильный Email',
  notEmpty = `Поле не может быть пуcтым`,
}

const formSchema = z.object({
  email: z
    .string()
    .min(1, formValidationErrors.notEmpty)
    .email(formValidationErrors.incorrectEmail),
  password: z.string().min(1, formValidationErrors.notEmpty),
})
