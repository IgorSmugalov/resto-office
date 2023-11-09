import { AccessJwtClaims, AccessJwtClaimsSchema } from '@libs/schema'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { jwtVerify, KeyLike, SignJWT } from 'jose'
import { IJwtSetConfig, JWT_CONFIG } from '../config'
import { JwkService } from '../crypto'

@Injectable()
export class AccessJwtService {
  private privateJwk: KeyLike
  private publicJwk: KeyLike
  private readonly config =
    this.configService.getOrThrow<IJwtSetConfig>(JWT_CONFIG).accessJwtConfig

  constructor(
    private readonly jwkService: JwkService,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    this.privateJwk = await this.jwkService.getPrivateJwk('access')
    this.publicJwk = await this.jwkService.getPublicJwk('access')
  }

  public async signJwt(user: User): Promise<string> {
    const issuedAtTime: number = Math.floor(Date.now() / 1000)
    const expirationTime: number = issuedAtTime + this.config.expiresAfter
    const payload = AccessJwtClaimsSchema.parse({
      ...user,
      iat: issuedAtTime,
      exp: expirationTime,
    } as AccessJwtClaims)

    return await new SignJWT(payload)
      .setProtectedHeader({
        alg: this.config.algorithm,
      })
      .sign(this.privateJwk)
  }

  public async verifyJwt(token: string): Promise<AccessJwtClaims | null> {
    try {
      const { payload } = await jwtVerify<AccessJwtClaims>(
        token,
        this.publicJwk
      )
      return AccessJwtClaimsSchema.parse(payload)
    } catch {
      return null
    }
  }
}
