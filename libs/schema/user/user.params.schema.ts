import { z } from 'nestjs-zod/z'
import { UserSchema } from './user.schema'

export const UserIdParamSchema = UserSchema.pick({ id: true })

export type UserIdParam = z.infer<typeof UserIdParamSchema>
