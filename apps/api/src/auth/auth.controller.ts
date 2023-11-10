import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { Response } from 'express'
import { ZodSerializerDto, ZodValidationPipe } from 'nestjs-zod'
import { AuthCookieService } from './auth-cookie.service'
import { AuthService } from './auth.service'
import { RefreshedUser } from './decorators/refreshed-user.decorator'
import { RefreshJwtClaimsDto, SignInRequestDto, SignInResponseDto } from './dto'
import { RefreshAuthGuard } from './guards'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookieService: AuthCookieService
  ) {}

  @Post('sign-in')
  @UsePipes(ZodValidationPipe)
  @ZodSerializerDto(SignInResponseDto)
  async signIn(
    @Body() credentialsDto: SignInRequestDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<SignInResponseDto> {
    const authData = await this.authService.authByCredentials(credentialsDto)
    this.authCookieService.setAuthCookie(response, authData.refreshToken)
    return authData
  }

  @Post('refresh')
  @UseGuards(RefreshAuthGuard)
  @ZodSerializerDto(SignInResponseDto)
  async refresh(
    @RefreshedUser() user: RefreshJwtClaimsDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<SignInResponseDto> {
    const authData = await this.authService.refreshAuth(user)
    this.authCookieService.setAuthCookie(response, authData.refreshToken)
    return authData
  }

  @Post('sign-out')
  @UseGuards(RefreshAuthGuard)
  @ZodSerializerDto(SignInResponseDto)
  async signOut(
    @RefreshedUser() user: RefreshJwtClaimsDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<SignInResponseDto> {
    console.log(user)
    const authData = await this.authService.refreshAuth(user)
    this.authCookieService.clearAuthCookie(response)
    return authData
  }
}
