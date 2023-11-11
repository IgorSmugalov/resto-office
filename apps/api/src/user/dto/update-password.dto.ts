import { UpdatePasswordSchema } from '@libs/schema'
import { createZodDto } from 'nestjs-zod'

export class UpdatePasswordDto extends createZodDto(UpdatePasswordSchema) {}
