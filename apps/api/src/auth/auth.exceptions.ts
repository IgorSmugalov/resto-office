import { AuthExceptions } from '@libs/schema'
import { ForbiddenException, UnauthorizedException } from '@nestjs/common'

export class IncorrectCredentialsException extends UnauthorizedException {
  constructor() {
    super(AuthExceptions.incorrectCredentials)
  }
}

export class UserNotActivatedException extends ForbiddenException {
  constructor() {
    super(AuthExceptions.UserNotActivated)
  }
}

//
// export class IncorrectRefreshTokenException extends UnauthorizedException {
//   constructor() {
//     super(AuthExceptions.incorrectRefreshTokenException)
//   }
// }
//
// export class UserBlockedException extends UnauthorizedException {
//   constructor() {
//     super(AuthExceptions.userBlockedException)
//   }
// }
//
// export class UserUnauthorizedException extends UnauthorizedException {
//   constructor() {
//     super(AuthExceptions.unauthorizedDefaultMessage)
//   }
// }
//
// export class UserAlreadyAuthorizedException extends ForbiddenException {
//   constructor() {
//     super(AuthExceptions.userAlreadyAuthorized)
//   }
// }
//
// export class AccessForbiddenException extends ForbiddenException {
//   constructor() {
//     super(AuthExceptions.forbiddenDefaultMessage)
//   }
// }
//
