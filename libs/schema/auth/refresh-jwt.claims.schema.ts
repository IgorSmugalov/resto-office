import { z } from 'nestjs-zod/z'

export const RefreshJwtClaimsSchema = z.object({
  id: z.string(),
  email: z.string(),
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
})

export type RefreshJwtClaims = z.infer<typeof RefreshJwtClaimsSchema>
