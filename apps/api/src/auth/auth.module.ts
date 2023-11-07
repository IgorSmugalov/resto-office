import { Module } from '@nestjs/common'
import { CryptoModule } from '../crypto'
import { UserModule } from '../user'
import { AccessJwtService } from './access-jwt.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessJwtService],
  imports: [CryptoModule, UserModule],
})
export class AuthModule {}
