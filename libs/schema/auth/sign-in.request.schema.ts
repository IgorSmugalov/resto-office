import { z } from 'nestjs-zod/z'

enum CredentialsSchemaErrors {
  incorrectType = 'Значение должно быть строкой',
  incorrectEmail = 'Неправильный формат Email',
  notEmpty = 'Поле не может быть пуcтым',
  passwordTooSmall = 'Пароль должен быть не короче 6 символов',
  passwordTooLarge = 'Пароль должен быть не длиннее 20 символов',
}

export const SignInRequestSchema = z.object({
  email: z
    .string({
      invalid_type_error: CredentialsSchemaErrors.incorrectType,
      required_error: CredentialsSchemaErrors.notEmpty,
    })
    .min(1, CredentialsSchemaErrors.notEmpty)
    .email(CredentialsSchemaErrors.incorrectEmail),
  password: z
    .string({
      invalid_type_error: CredentialsSchemaErrors.incorrectType,
      required_error: CredentialsSchemaErrors.notEmpty,
    })
    .min(6, CredentialsSchemaErrors.passwordTooSmall)
    .max(20, CredentialsSchemaErrors.passwordTooLarge),
})
