import { registerAs } from '@nestjs/config'
import { CookieOptions } from 'express-serve-static-core'
import { COOKIE_CONFIG } from './const'

export interface ICookieConfig {
  key: string
  options: CookieOptions
}

const options: CookieOptions = {
  maxAge: Number(process.env.JWT_REFRESH_EXPIRES_AFTER) * 1000,
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
  path: '/',
}

export const cookieConfig = registerAs<ICookieConfig>(COOKIE_CONFIG, () => ({
  key: process.env.AUTH_COOKIE_KEY as string,
  options,
}))
