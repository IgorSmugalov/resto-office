import { User } from '@prisma/client'

export class AuthDataDto {
  accessToken: string
  refreshToken: string
  user: User
}
