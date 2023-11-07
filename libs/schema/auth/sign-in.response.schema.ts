import { z } from 'nestjs-zod/z'
import { UserResponseSchema } from '../user'

export const SignInResponseSchema = z.object({
  accessToken: z.string(),
  user: UserResponseSchema,
})
