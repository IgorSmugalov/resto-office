import { UserIdParamSchema } from '@libs/schema'
import { createZodDto } from 'nestjs-zod'

export class UserIdParam extends createZodDto(UserIdParamSchema) {}
