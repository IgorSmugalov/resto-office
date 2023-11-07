import { SignInResponseSchema } from '@libs/schema'
import { createZodDto } from 'nestjs-zod'

export class SignInResponseDto extends createZodDto(SignInResponseSchema) {}
