import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'
import { COOKIE_CONFIG, ICookieConfig } from '../config'

@Injectable()
export class AuthCookieService {
  private config = this.configService.getOrThrow<ICookieConfig>(COOKIE_CONFIG)

  constructor(private readonly configService: ConfigService) {}

  public setAuthCookie(response: Response, refreshToken: string) {
    response.cookie(this.config.key, refreshToken, this.config.options)
  }

  public getAuthCookie(request: Request): string {
    return request.cookies[this.config.key]
  }

  public clearAuthCookie(response: Response) {
    return response.clearCookie(this.config.key, this.config.options)
  }
}
