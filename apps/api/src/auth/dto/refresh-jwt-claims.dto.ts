import { RefreshJwtClaimsSchema } from '@libs/schema'
import { createZodDto } from 'nestjs-zod'

export class RefreshJwtClaimsDto extends createZodDto(RefreshJwtClaimsSchema) {}
