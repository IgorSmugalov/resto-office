import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { ZodSerializerDto, ZodValidationPipe } from 'nestjs-zod'
import { AuthService } from './auth.service'
import { SignInRequestDto, SignInResponseDto } from './dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @UsePipes(ZodValidationPipe)
  @ZodSerializerDto(SignInResponseDto)
  async signIn(
    @Body() credentialsDto: SignInRequestDto
  ): Promise<SignInResponseDto> {
    return await this.authService.authByCredentials(credentialsDto)
  }
}
