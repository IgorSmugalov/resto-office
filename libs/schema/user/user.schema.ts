import { $Enums } from '@prisma/client'
import { z } from 'nestjs-zod/z'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string(),
  roles: z.nativeEnum($Enums.Role).array(),
  activated: z.boolean(),
  activationKey: z.string().uuid(),
  activationKeyCreated: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserSchema = z.infer<typeof UserSchema>
