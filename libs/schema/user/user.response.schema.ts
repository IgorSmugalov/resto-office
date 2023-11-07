import { $Enums } from '@prisma/client'
import { z } from 'nestjs-zod/z'

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  roles: z.nativeEnum($Enums.Role).array(),
  activated: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type UserResponse = z.infer<typeof UserResponseSchema>
