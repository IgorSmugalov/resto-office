import { forwardRef, Module } from '@nestjs/common'
import { AuthModule } from '../auth'
import { CryptoModule } from '../crypto'
import { PrismaModule } from '../prisma'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
  imports: [PrismaModule, CryptoModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
