import { $Enums } from '@prisma/client'
import { z } from 'nestjs-zod/z'

export const AccessJwtClaimsSchema = z.object({
  id: z.string(),
  email: z.string(),
  roles: z.nativeEnum($Enums.Role).array(),
  activated: z.boolean(),
  exp: z.number(),
  iat: z.number(),
})

export type AccessJwtClaims = z.infer<typeof AccessJwtClaimsSchema>
