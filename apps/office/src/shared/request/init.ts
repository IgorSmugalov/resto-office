import { $accessToken, request, resetAuth, setAuth } from '@shared/request'
import { sample } from 'effector'

request.onCreateStore((store) => store.reset([resetAuth]))

sample({
  clock: setAuth,
  target: $accessToken,
})
