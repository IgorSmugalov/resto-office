import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { HashService } from '../crypto'
import { UserService } from '../user'
import { AccessJwtService } from './access-jwt.service'
import {
  IncorrectCredentialsException,
  UserNotActivatedException,
} from './auth.exceptions'
import { AuthDataDto, SignInRequestDto } from './dto'
import { RefreshJwtService } from './refresh-jwt.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly accessJwtService: AccessJwtService,
    private readonly refreshJwtService: RefreshJwtService,
    private readonly userService: UserService,
    private readonly hashService: HashService
  ) {}

  public async authByCredentials(
    userCredentials: SignInRequestDto
  ): Promise<AuthDataDto> {
    const { email, password } = userCredentials
    let user: User
    try {
      user = await this.userService.getUnique({ email })
      await this.hashService.validatePassword(user.password, password, {
        throwOnFail: true,
      })
    } catch {
      throw new IncorrectCredentialsException()
    }

    this.isCanAuth(user)
    const accessToken = await this.accessJwtService.signJwt(user)
    const refreshToken = await this.refreshJwtService.signJwt(user)
    return { accessToken, refreshToken, user }
  }

  private isCanAuth(user: User): boolean {
    if (!user.activated) throw new UserNotActivatedException()
    return true
  }
}
