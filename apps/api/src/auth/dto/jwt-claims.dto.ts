import { AccessJwtClaims, AccessJwtClaimsSchema } from '@libs/schema'
import { $Enums, User } from '@prisma/client'
import { Expose, plainToInstance } from 'class-transformer'
import { createZodDto } from 'nestjs-zod'

export class AccessJwtClaimsDto extends createZodDto(AccessJwtClaimsSchema) {
  @Expose() id: string
  @Expose() roles: $Enums.Role[]
  @Expose() email: string
  @Expose() activated: boolean
  @Expose() exp: number
  @Expose() iat: number

  static fromUser(user: User): AccessJwtClaimsDto {
    return plainToInstance(this, user, {
      excludeExtraneousValues: true,
    })
  }

  static fromToken(jwt: AccessJwtClaims): AccessJwtClaimsDto {
    const validated = AccessJwtClaimsSchema.parse(jwt)
    return plainToInstance(this, validated, {
      strategy: 'excludeAll',
    })
  }
}
