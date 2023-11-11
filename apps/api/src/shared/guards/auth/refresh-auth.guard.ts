import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { UserNotAuthenticatedException } from './auth.exceptions'

@Injectable()
export class RefreshAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { refreshJwtClaims }: Request = context.switchToHttp().getRequest()
    if (refreshJwtClaims) return true
    throw new UserNotAuthenticatedException()
  }
}
