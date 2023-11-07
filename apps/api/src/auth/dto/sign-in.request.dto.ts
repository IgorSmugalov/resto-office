import { SignInRequestSchema } from '@libs/schema'
import { createZodDto } from 'nestjs-zod'

export class SignInRequestDto extends createZodDto(SignInRequestSchema) {}
