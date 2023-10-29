import { ZodError } from 'zod'
import { AddErrorPayload } from 'effector-forms'

export const formatZodError = (zodError: ZodError): AddErrorPayload[] => {
  const { fieldErrors } = zodError.flatten()
  const effectorFormErrors: AddErrorPayload[] = []
  for (const field in fieldErrors) {
    const errors = fieldErrors[field]
    if (errors && errors.length > 0)
      errors.forEach((errorText) => {
        effectorFormErrors.push({
          field: String(field),
          errorText,
          rule: 'zod',
        })
      })
  }
  return effectorFormErrors
}
