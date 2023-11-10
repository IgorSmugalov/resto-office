import * as authApi from '@shared/api/auth'
import { resetAuth } from '@shared/request'
import { sample } from 'effector'
import { $authUser, authUser } from '../model'

authUser.onCreateStore((store) => store.reset([resetAuth]))

sample({
  clock: [authApi.signInRequestFx.doneData, authApi.refreshRequestFx.doneData],
  fn: (response) => response.user,
  target: $authUser,
})
