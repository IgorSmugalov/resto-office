import {
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common'

export enum UserExceptionMessages {
  userUnknownError = 'Неизвестная ошибка',
  userAlreadyExists = 'Пользователь уже существует',
  userDoesNotExists = 'Пользователь не существует',
  passwordIsIncorrect = 'Неправильный пароль',
  emailAlreadyInUse = 'Email уже используется',
  activationKeyNotValid = 'Ключ активации не валиден',
  userAlreadyActivated = 'Пользователь уже активирован',
  passwordRecoveryKeyNotValid = 'Ключ восстановления пароля не валиден',
  KeyExpired = 'Ключ просрочен',
}

export class UserUnknownErrorException extends InternalServerErrorException {
  constructor() {
    super(UserExceptionMessages.userUnknownError)
  }
}

export class UserAlreadyExistsException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.userAlreadyExists)
  }
}

export class UserPasswordIsIncorrect extends UnauthorizedException {
  constructor() {
    super(UserExceptionMessages.passwordIsIncorrect)
  }
}

export class EmailAlreadyInUseException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.emailAlreadyInUse)
  }
}

export class UserDoesNotExistsException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.userDoesNotExists)
  }
}

export class ActivationKeyNotValidException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.activationKeyNotValid)
  }
}

export class UserAlreadyActivatedException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.userAlreadyActivated)
  }
}

export class PasswordRecoveryKeyNotValidException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.passwordRecoveryKeyNotValid)
  }
}

export class KeyExpiredException extends BadRequestException {
  constructor() {
    super(UserExceptionMessages.KeyExpired)
  }
}
