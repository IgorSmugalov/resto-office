import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { UserNotAuthenticatedException } from './auth.exceptions'

@Injectable()
export class AccessAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { accessJwtClaims }: Request = context.switchToHttp().getRequest()
    if (accessJwtClaims) return true
    throw new UserNotAuthenticatedException()
  }
}
