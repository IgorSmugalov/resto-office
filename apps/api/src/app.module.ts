import { MiddlewareConsumer, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ZodSerializerInterceptor } from 'nestjs-zod'
import { AuthModule, RefreshTokenMiddleware } from './auth'
import { ConfigModule } from './config'
import { CryptoModule } from './crypto'
import { PrismaModule } from './prisma'
import { UserModule } from './user'

@Module({
  imports: [ConfigModule, PrismaModule, AuthModule, UserModule, CryptoModule],
  providers: [{ provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenMiddleware).forRoutes('*')
  }
}
