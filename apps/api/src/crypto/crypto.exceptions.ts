import { UnauthorizedException } from '@nestjs/common'

export class IncorrectPasswordException extends UnauthorizedException {
  constructor() {
    super('Неверный пароль')
  }
}
