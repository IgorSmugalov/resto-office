import { NestFactory } from '@nestjs/core'
import * as dotenv from 'dotenv'
import { AppModule } from './app/app.module'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.enableShutdownHooks()
  app.setGlobalPrefix(globalPrefix)
  const port = 4201
  await app.listen(port)
}

bootstrap()
