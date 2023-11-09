import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthCookieService } from '../auth-cookie.service'
import { RefreshJwtService } from '../refresh-jwt.service'

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly refreshJwtService: RefreshJwtService,
    private readonly authCookieService: AuthCookieService
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    req.refreshJwtClaims = null
    const refreshCookie = this.authCookieService.getAuthCookie(req)
    if (!refreshCookie) return next()
    req.refreshJwtClaims = await this.refreshJwtService.verifyJwt(refreshCookie)
    return next()
  }
}
