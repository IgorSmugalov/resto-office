import { sample } from 'effector'
import { formatZodError } from '@shared/utils'
import {
  $formApiError,
  $formPending,
  disableForm,
  enableForm,
  form,
  init,
  loginForm,
  reset,
  signInRequestFx,
  validateLoginFormFx,
} from '../model'
import { not } from 'patronum'
import * as authApi from '@shared/api/auth'

// Init units
signInRequestFx.use(authApi.signInRequestFx)

// General form logic:
// Reset all data in domain on init or reset events
loginForm.onCreateStore((store) => store.reset([init, reset]))

//  Reset api error on any form values change
$formApiError.on(form.$values, () => null)

//  Toggle form status
$formPending.on(disableForm, () => true)
$formPending.on(enableForm, () => false)

//  Step by step logic:
//  1. On form submit -> run validation
sample({
  clock: form.submit,
  filter: not($formPending),
  source: form.$values,
  target: [validateLoginFormFx, disableForm],
})

//  2. Validation
//  //  2.1 Validation success -> run request
sample({
  clock: validateLoginFormFx.doneData,
  filter: not(signInRequestFx.pending),
  target: signInRequestFx,
})

//  //  2.2 Validation fail -> set validation errors
sample({
  clock: validateLoginFormFx.failData,
  fn: formatZodError,
  target: [form.addErrors, enableForm],
})

//  3. Login
//  //  3.1 Request success -> reset form domain
sample({
  clock: signInRequestFx.doneData,
  target: reset,
})

//  //  3.2 Request fail -> set server errors
sample({
  clock: signInRequestFx.failData,
  target: [$formApiError, enableForm],
})

// TODO: next steps
