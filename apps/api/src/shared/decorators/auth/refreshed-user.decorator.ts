import { RefreshJwtClaims } from '@libs/schema'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const RefreshedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RefreshJwtClaims | null => {
    const request: Request = ctx.switchToHttp().getRequest()
    return request.refreshJwtClaims
  }
)
