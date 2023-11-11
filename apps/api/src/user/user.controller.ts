import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common'
import { ZodSerializerDto, ZodValidationPipe } from 'nestjs-zod'
import { AccessJwtClaimsDto } from '../auth/dto'
import { AuthenticatedUser, AuthGuard } from '../shared/decorators/auth'
import { UpdatePasswordDto, UserIdParam, UserResponseDto } from './dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @UsePipes(ZodValidationPipe)
  @ZodSerializerDto(UserResponseDto)
  async getById(@Param() userId: UserIdParam): Promise<UserResponseDto> {
    return await this.userService.getUnique(userId)
  }

  @Post('update-password')
  @AuthGuard()
  @UsePipes(ZodValidationPipe)
  @ZodSerializerDto(UserResponseDto)
  async updatePassword(
    @AuthenticatedUser() authUserDto: AccessJwtClaimsDto,
    @Body() updatePasswordDto: UpdatePasswordDto
  ): Promise<UserResponseDto> {
    return await this.userService.updatePassword(authUserDto, updatePasswordDto)
  }

  // @ApiTags('User')
  // @Post('sign-up')
  // @UseResponseSerializer(UserResponseDTO)
  // @ApiBody({ type: SignUpDTO })
  // @ApiCreatedResponse({ type: UserResponseDTO })
  // @ApiException(() => UserAlreadyExistsException)
  // async register(@Body() signUpDto: SignUpDTO): Promise<User> {
  //   return await this.userService.signUp(signUpDto);
  // }
  //

  //
  // @ApiTags('User')
  // @Patch(':id')
  // @UsePermissionsControl(UserActions.update, UserDTO, UserDTOHook)
  // @UseResponseSerializer(UserResponseDTO)
  // @ApiOkResponse({ type: UserResponseDTO })
  // @ApiException(() => [UserDoesNotExistsException, EmailAlreadyInUseException])
  // async updateUser(
  //   @Param() idDto: UserIdDTO,
  //   @Body() updateDto: UpdateUserDTO,
  // ) {
  //   return this.userService.updateUser(idDto, updateDto);
  // }
  //
  // @ApiTags('User/activation')
  // @Post('activate/:activationKey')
  // @UseResponseSerializer(ActivationUserResponseDTO)
  // @ApiCreatedResponse({ type: ActivationUserResponseDTO })
  // @ApiException(() => ActivationKeyNotValidException)
  // async activate(@Param() activationDTO: UserActivationKeyDTO): Promise<User> {
  //   return await this.userService.acivateByKey(activationDTO);
  // }
  //
  // @ApiTags('User/activation')
  // @Post('renew-activation-key/:email')
  // @UseResponseSerializer(ActivationUserResponseDTO)
  // @ApiCreatedResponse({ type: ActivationUserResponseDTO })
  // @ApiException(() => [
  //   UserAlreadyActivatedException,
  //   UserDoesNotExistsException,
  // ])
  // async renewActivationKey(@Param() emailDto: UserEmailDTO) {
  //   return await this.userService.renewActivationKey(emailDto);
  // }
  //
  // @ApiTags('User/password')
  // @Post('update-password')
  // @UseResponseSerializer(UserResponseDTO)
  // @ApiBody({ type: UpdatePasswordDTO })
  // @ApiCreatedResponse({ type: UserResponseDTO })
  // @ApiException(() => [UserDoesNotExistsException, IncorrectPasswordException])
  // async updatePassword(
  //   @AuthenticatedUser() userDto: AuthenticatedUserDTO,
  //   @Body() updateDto: UpdatePasswordDTO,
  // ): Promise<User> {
  //   return await this.userService.updatePassword(userDto, updateDto);
  // }
  //
  // @ApiTags('User/password')
  // @Post('pass-recovery-init/:email')
  // @UseResponseSerializer(UserEmailDTO)
  // @ApiCreatedResponse({ type: UserEmailDTO })
  // @ApiException(() => UserDoesNotExistsException)
  // async initPasswordRecovering(@Param() emailDto: UserEmailDTO): Promise<User> {
  //   return await this.userService.initPasswordRecovering(emailDto);
  // }
  //
  // @ApiTags('User/password')
  // @Get('pass-recovery/:recoveryPasswordKey')
  // @UseResponseSerializer(UserRecoveryPasswordKeyDTO)
  // @ApiOkResponse({ type: UserRecoveryPasswordKeyDTO })
  // @ApiException(() => PasswordRecoveryKeyNotValidException)
  // async checkPasswordRecoveryKey(
  //   @Param() keyDto: UserRecoveryPasswordKeyDTO,
  // ): Promise<User> {
  //   return await this.userService.validatePasswordRecoveryKey(keyDto);
  // }
  //
  // @ApiTags('User/password')
  // @Post('pass-recovery')
  // @UseResponseSerializer(UserEmailDTO)
  // @ApiBody({ type: RecoveryPasswordDTO })
  // @ApiCreatedResponse({ type: UserEmailDTO })
  // @ApiException(() => PasswordRecoveryKeyNotValidException)
  // async finishPasswordRecovering(
  //   @Body() recoveryDto: RecoveryPasswordDTO,
  // ): Promise<User> {
  //   return await this.userService.finishPasswordRecovering(recoveryDto);
  // }
  //
  // // Temporary: for activation link from email -> redirect from GET to POST api, in future this logic can be moved to frontend
  // @ApiTags('User/activation')
  // @Get('email-activation-proxy/:activationKey')
  // @UseResponseSerializer(ActivationUserResponseDTO)
  // @ApiOkResponse({ type: ActivationUserResponseDTO })
  // @ApiException(() => ActivationKeyNotValidException)
  // async activationProxy(
  //   @Param() activationDTO: UserActivationKeyDTO,
  // ): Promise<UserActivationKey> {
  //   const { data } = await firstValueFrom(
  //     this.httpService
  //       .post(
  //         `${this.serverConfig.protocol}://${this.serverConfig.host}:${this.serverConfig.port}/user/activate/${activationDTO.activationKey}`,
  //       )
  //       .pipe(
  //         catchError((error: AxiosError) => {
  //           throw new HttpException(error.response.data, error.response.status);
  //         }),
  //       ),
  //   );
  //   return data;
  // }
}
