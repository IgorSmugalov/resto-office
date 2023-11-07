import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma'
import {
  UserAlreadyExistsException,
  UserDoesNotExistsException,
} from './user.exceptions'

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Return one User or throw User Does Not Exists Exception
   * @param {GetUniqueUserInput} where - Accept only one unique search key!
   **/
  public async getUnique(
    where: Prisma.UserWhereUniqueInput
  ): Promise<User | never> {
    let user: User | null = null
    try {
      user = await this.prisma.user.findUnique({ where })
    } catch (error) {
      this.parsePrismaError(error)
    }
    if (user) return user
    throw new UserDoesNotExistsException()
  }

  private parsePrismaError(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new UserAlreadyExistsException()
        case 'P2025':
          throw new UserDoesNotExistsException()
        default:
          throw new InternalServerErrorException(error.code)
      }
    }
    throw new InternalServerErrorException()
  }
}
