import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { AccessJwtService } from '../access-jwt.service'

@Injectable()
export class AccessTokenMiddleware implements NestMiddleware {
  constructor(private readonly accessJwtService: AccessJwtService) {}

  async use(req: Request, res: Response, next: () => void) {
    const authorizationHeader = req.headers.authorization
    req.accessJwtClaims = null
    if (!authorizationHeader) return next()
    const [bearer, token] = authorizationHeader.split(' ')
    if (bearer !== 'Bearer') return next()
    req.accessJwtClaims = await this.accessJwtService.verifyJwt(token)
    return next()
  }
}
