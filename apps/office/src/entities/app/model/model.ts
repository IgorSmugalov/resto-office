import { SignInResponse } from '@libs/schema'
import { createDomain } from 'effector'

export const app = createDomain()
export const initApp = app.createEvent<void>()
export const $appReady = app.createStore<boolean>(false)
export const initAuthRequestFx = app.createEffect<void, SignInResponse>()
