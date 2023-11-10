import { RefreshJwtClaims, RefreshJwtClaimsSchema } from '@libs/schema'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RefreshToken, User } from '@prisma/client'
import { jwtVerify, KeyLike, SignJWT } from 'jose'
import { v4 as uuid } from 'uuid'
import { IJwtSetConfig, JWT_CONFIG } from '../config'
import { JwkService } from '../crypto'
import { PrismaService } from '../prisma'

@Injectable()
export class RefreshJwtService {
  private privateJwk: KeyLike
  private publicJwk: KeyLike

  constructor(
    private readonly jwkService: JwkService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  private readonly config =
    this.configService.getOrThrow<IJwtSetConfig>(JWT_CONFIG).refreshJwtConfig

  async onModuleInit() {
    this.privateJwk = await this.jwkService.getPrivateJwk('refresh')
    this.publicJwk = await this.jwkService.getPublicJwk('refresh')
  }

  public async signJwt(user: User): Promise<string> {
    const issuedAtTime: number = Math.floor(Date.now() / 1000)
    const expirationTime: number = issuedAtTime + this.config.expiresAfter
    const payload = RefreshJwtClaimsSchema.parse({
      ...user,
      iat: issuedAtTime,
      exp: expirationTime,
      jti: uuid(),
    } as RefreshJwtClaims)
    await this.addToWhitelist(payload)
    await this.limitWhitelist(payload.id)
    return await new SignJWT(payload)
      .setProtectedHeader({
        alg: this.config.algorithm,
      })
      .sign(this.privateJwk)
  }

  public async verifyJwt(token: string): Promise<RefreshJwtClaims | null> {
    try {
      const { payload } = await jwtVerify<RefreshJwtClaims>(
        token,
        this.publicJwk
      )
      const validatedPayload = RefreshJwtClaimsSchema.parse(payload)
      const isWhitelisted = await this.isWhitelisted(validatedPayload.jti)

      return isWhitelisted ? validatedPayload : null
    } catch {
      return null
    }
  }

  public async addToWhitelist(claims: RefreshJwtClaims): Promise<void> {
    await this.prisma.refreshToken.create({
      data: {
        id: claims.jti,
        issuedAt: new Date(claims.iat * 1000),
        expiresAt: new Date(claims.exp * 1000),
        userId: claims.id,
      },
    })
  }

  public async removeFromWhitelist(
    jti: RefreshJwtClaims['jti']
  ): Promise<RefreshToken | null> {
    try {
      return await this.prisma.refreshToken.delete({
        where: { id: jti },
      })
    } catch {
      return null
    }
  }

  private async limitWhitelist(userId: string): Promise<void> {
    const firstRedundantToken = await this.prisma.refreshToken.findFirst({
      where: { userId },
      orderBy: { issuedAt: 'desc' },
      skip: 5,
    })
    if (!firstRedundantToken) return
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId,
        issuedAt: { lte: firstRedundantToken.issuedAt },
      },
    })
  }

  public async isWhitelisted(jti: RefreshJwtClaims['jti']): Promise<boolean> {
    const token = await this.prisma.refreshToken.findUnique({
      where: { id: jti },
    })
    return Boolean(token)
  }
}
