import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.use(cookieParser())
  app.enableShutdownHooks()
  const globalPrefix = String(process.env.API_PREFIX)
  app.setGlobalPrefix(globalPrefix)
  const port = Number(process.env.API_PORT)
  await app.listen(port)
}

bootstrap()
