import { NestFactory } from '@nestjs/core'
import dotenv from 'dotenv'

import { AppModule } from './app/app.module'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = 3000
  await app.listen(port)
}

bootstrap()
