export enum AuthExceptions {
  notAuthenticated = 'Пользователь не аутентифицирован',
  userNotActivated = 'Пользователь не активирован',
  incorrectCredentials = 'Неверный логин или пароль',
  incorrectRefreshTokenException = 'Токен обновления не действителен',

  // forbiddenDefaultMessage = 'Доступ запрещён',
  // userUnactivatedOrBlocked = 'Пользователь не активирован или заблокирован',
  // userAlreadyAuthorized = 'Пользователь уже авторизован',
  // userNotActivated = 'Пользователь не активирован',
  // userBlockedException = 'Пользователь заблокирован',
}
