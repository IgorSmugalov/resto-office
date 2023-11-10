import { $appReady, initApp, initAuthRequestFx } from '@entities/app'
import * as authApi from '@shared/api/auth'
import { attach, sample } from 'effector'

initAuthRequestFx.use(
  attach({
    effect: authApi.refreshRequestFx,
  })
)

sample({
  clock: initApp,
  target: initAuthRequestFx,
})

sample({
  clock: initAuthRequestFx.finally,
  fn: () => true,
  target: $appReady,
})
