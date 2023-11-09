import { AccessJwtClaims, RefreshJwtClaims } from '@libs/schema'

export {}

declare global {
  namespace Express {
    export interface Request {
      accessJwtClaims: AccessJwtClaims | null
      refreshJwtClaims: RefreshJwtClaims | null
    }
  }
}
