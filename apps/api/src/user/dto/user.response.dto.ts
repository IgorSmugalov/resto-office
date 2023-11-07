import { UserResponseSchema } from '@libs/schema'
import { createZodDto } from 'nestjs-zod'

export class UserResponseDto extends createZodDto(UserResponseSchema) {}
