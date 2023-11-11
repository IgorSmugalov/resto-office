import { AccessJwtClaims } from '@libs/schema'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AccessJwtClaims | null => {
    const request: Request = ctx.switchToHttp().getRequest()
    return request.accessJwtClaims
  }
)
