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
  public async getUnique(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where })
    } catch (error) {
      throw new (this.parsePrismaError(error))()
    }
  }

  public async updateUnique(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ): Promise<User> {
    try {
      return await this.prisma.user.update({ where, data })
    } catch (error) {
      throw new (this.parsePrismaError(error))()
    }
  }

  private parsePrismaError(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return UserAlreadyExistsException
        case 'P2025':
          return UserDoesNotExistsException
        default:
          return InternalServerErrorException
      }
    }
    return InternalServerErrorException
  }
}
