import { Module } from '@nestjs/common'
import { ConfigModule as Config } from '@nestjs/config'
import { cookieConfig } from './cookie.config'
import { jwkConfig } from './jwk.config'
import { jwtConfig } from './jwt.config'
import { userConfig } from './user.config'

@Module({
  imports: [
    Config.forRoot({
      isGlobal: true,
      load: [jwkConfig, jwtConfig, userConfig, cookieConfig],
    }),
  ],
})
export class ConfigModule {}
