import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common'
import { Response } from 'express'
import { ZodSerializerDto, ZodValidationPipe } from 'nestjs-zod'
import { AuthCookieService } from './auth-cookie.service'
import { AuthService } from './auth.service'
import { SignInRequestDto, SignInResponseDto } from './dto'

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

  //
  // @Post('refresh')
  // // @UsePipes(ZodValidationPipe)
  // async refresh(
  //   @RefreshedUser() user: RefreshJwtClaimsDto
  // ): Promise<RefreshJwtClaimsDto> {
  //   console.log(user)
  //   return user || 'no'
  // }
}
