import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { HashService } from '../crypto'
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
}
