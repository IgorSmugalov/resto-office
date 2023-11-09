import { $authUser, authUser } from '@entities/authenticated-user/model/model'
import * as authApi from '@shared/api/auth'
import { resetAuth } from '@shared/request'
import { sample } from 'effector'

authUser.onCreateStore((store) => store.reset([resetAuth]))

sample({
  clock: authApi.signInRequestFx.doneData,
  fn: (response) => response.user,
  target: $authUser,
})
