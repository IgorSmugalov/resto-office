import { Module } from '@nestjs/common'
import { CryptoModule } from '../crypto'
import { PrismaModule } from '../prisma'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'

@Module({
  imports: [PrismaModule, CryptoModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [],
})
export class UserModule {}
