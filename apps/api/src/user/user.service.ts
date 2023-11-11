import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { AccessJwtClaimsDto } from '../auth/dto'
import { HashService } from '../crypto'
import { UpdatePasswordDto } from './dto'
import { UserPasswordIsIncorrect } from './user.exceptions'
import { UserRepository } from './user.repository'
import { GetUniqueInput } from './user.types'

@Injectable()
export class UserService {
  constructor(
    private readonly hashService: HashService,
    private readonly userRepository: UserRepository
  ) {}

  /**
   * @description
   * Get one User by id | email or throw if user is not exists
   * @param {GetPartialUniqueUserInput} dto Accept only one unique User search key!
   * @return {Promise<User>} Unsafe User Entity
   * @throws {UserDoesNotExistsException}
   **/
  public async getUnique(dto: GetUniqueInput): Promise<User> {
    return await this.userRepository.getUnique(dto)
  }

  public async updatePassword(
    authUser: AccessJwtClaimsDto,
    updatePasswordDto: UpdatePasswordDto
  ): Promise<User> {
    const { oldPassword, newPassword } = updatePasswordDto

    const { id } = authUser
    const user: User = await this.userRepository.getUnique({ id })
    const passwordIsValid = await this.hashService.validatePassword(
      user.password,
      oldPassword
    )
    if (!passwordIsValid) throw new UserPasswordIsIncorrect()
    const password = await this.hashService.hashPassword(newPassword)
    return await this.userRepository.updateUnique({ id }, { password })
  }
}
