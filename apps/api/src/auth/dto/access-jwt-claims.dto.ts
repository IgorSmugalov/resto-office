import { AccessJwtClaimsSchema } from '@libs/schema'
import { createZodDto } from 'nestjs-zod'

export class AccessJwtClaimsDto extends createZodDto(AccessJwtClaimsSchema) {}
