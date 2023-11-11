import { UseGuards } from '@nestjs/common'
import { AccessAuthGuard, RefreshAuthGuard } from '../../guards'

export const AuthGuard = () => UseGuards(AccessAuthGuard)
export const CookieAuthGuard = () => UseGuards(RefreshAuthGuard)
