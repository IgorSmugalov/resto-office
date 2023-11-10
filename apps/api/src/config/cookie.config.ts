import { registerAs } from '@nestjs/config'
import { CookieOptions } from 'express-serve-static-core'
import { COOKIE_CONFIG } from './const'

export interface ICookieConfig {
  key: string
  options: CookieOptions
}

const options: CookieOptions = {
  httpOnly: true,
  path: '/' + process.env.API_PREFIX + '/auth',
}

export const cookieConfig = registerAs<ICookieConfig>(COOKIE_CONFIG, () => ({
  key: process.env.AUTH_COOKIE_KEY as string,
  options,
}))
