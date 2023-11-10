import { createDomain } from 'effector'
import { equals, not } from 'patronum'
import { AccessToken, apiRequest, ExceptionResponse, Request } from './request'

export const request = createDomain()
export const setAuth = request.event<AccessToken>()
export const resetAuth = request.event<void>()
export const $accessToken = request.createStore<AccessToken | null>(null)
export const $isAuth = not(equals($accessToken, null))

// Request without auth
export const apiRequestFx = request.effect<Request, any, ExceptionResponse>()

// Request with Authorization header
export const apiAuthorizedRequestFx = request.effect<
  Request,
  any,
  ExceptionResponse
>()

apiRequestFx.use(apiRequest)

// apiAuthorizedRequestFx.use(
//   attach({
//     effect: apiRequestFx,
//     source: $accessToken,
//     mapParams: (params: Request, token) => {
//       const accessToken = token ?? undefined
//       return { ...params, accessToken }
//     },
//   })
// )
