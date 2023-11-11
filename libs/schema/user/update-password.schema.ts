import { z } from 'nestjs-zod/z'
import { UserSchema } from './user.schema'

export const UpdatePasswordSchema = z.object({
  oldPassword: UserSchema.shape.password,
  newPassword: UserSchema.shape.password,
})

export type UpdatePassword = z.infer<typeof UpdatePasswordSchema>
