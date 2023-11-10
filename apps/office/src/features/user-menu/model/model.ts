import { ExceptionResponse } from '@shared/request'
import { createDomain } from 'effector'

export const userMenu = createDomain()
export const signOut = userMenu.createEvent()
export const signOutUserMenuRequestFx = userMenu.createEffect<
  void,
  void,
  ExceptionResponse
>()
