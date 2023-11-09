import { Module } from '@nestjs/common'
import { CryptoModule } from '../crypto'
import { PrismaModule } from '../prisma'
import { UserModule } from '../user'
import { AccessJwtService } from './access-jwt.service'
import { AuthCookieService } from './auth-cookie.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { RefreshJwtService } from './refresh-jwt.service'

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessJwtService,
    RefreshJwtService,
    AuthCookieService,
  ],
  exports: [RefreshJwtService, AuthCookieService],
  imports: [CryptoModule, UserModule, PrismaModule],
})
export class AuthModule {}
