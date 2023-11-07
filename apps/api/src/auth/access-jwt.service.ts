import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { KeyLike, SignJWT } from 'jose'
import { IJwtSetConfig, JWT_CONFIG } from '../config'
import { JwkService } from '../crypto'
import { AccessJwtClaimsDto } from './dto'

@Injectable()
export class AccessJwtService {
  private privateJwk: KeyLike
  private publicJwk: KeyLike
  private readonly config =
    this.configService.get<IJwtSetConfig>(JWT_CONFIG)!.accessJwtConfig

  constructor(
    private readonly jwkService: JwkService,
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    this.privateJwk = await this.jwkService.getPrivateJwk('access')
    this.publicJwk = await this.jwkService.getPublicJwk('access')
  }

  public async signJwt(user: User): Promise<string> {
    const claims = AccessJwtClaimsDto.fromUser(user)
    const issueTime = Date.now() / 1000
    return await new SignJWT({ ...claims })
      .setIssuedAt(issueTime)
      .setExpirationTime(issueTime + this.config.expiresAfter)
      .setProtectedHeader({ alg: this.config.algorithm })
      .sign(this.privateJwk)
  }

  // public async verifyJwt(token: string): Promise<AccessJwtClaimsDto | null> {
  //   try {
  //     const { payload } = await jwtVerify(token, this.publicJwk)
  //     return AccessJwtClaimsDto.fromToken(payload)
  //   } catch {
  //     return null
  //   }
  // }
}
