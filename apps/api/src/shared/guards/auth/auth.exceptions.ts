import { AuthExceptions } from '@libs/schema'
import { UnauthorizedException } from '@nestjs/common'

export class UserNotAuthenticatedException extends UnauthorizedException {
  constructor() {
    super(AuthExceptions.notAuthenticated)
  }
}
