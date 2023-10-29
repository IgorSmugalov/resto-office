/* eslint-disable  @typescript-eslint/no-explicit-any */

import { attach, createDomain } from 'effector'
import ky, { HTTPError } from 'ky'

export enum Method {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
  patch = 'patch',
}

export type AccessToken = string

type Request = {
  method: Method
  path: string
  accessToken?: AccessToken
  body?: object | FormData
}

export class ApiException {
  message: string = 'UnknownApiException'

  constructor(obj: { message: string }) {
    Object.assign(this, obj)
  }
}

export class NonApiException {}

export type ExceptionResponse = NonApiException | ApiException

export const request = createDomain()
const $accessToken = request.createStore<AccessToken | null>(null)
// export const $isAuth = not(equals($accessToken, null))
// export const writeTokenFx = request.effect<AccessToken, void, Error>()
// export const readTokenFx = request.effect<void, AccessToken, Error>()

// Request without auth
export const apiRequestFx = request.effect<Request, any, ExceptionResponse>()

// Request with Authorization header
export const apiAuthorizedRequestFx = request.effect<
  Request,
  any,
  ExceptionResponse
>()

const api = ky.create({ prefixUrl: 'http://localhost:3001' })
const apiRequest = async (params: Request) => {
  const { method, path, body: json, accessToken } = params
  const headers: Record<string, string | undefined> = {}
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`
  try {
    return await api(path, {
      method,
      json,
      headers,
    }).json()
  } catch (error) {
    if (error instanceof HTTPError) {
      const errorBody = await error.response.json()
      throw new ApiException(errorBody)
    }
    throw new NonApiException()
  }
}

apiRequestFx.use(apiRequest)

apiAuthorizedRequestFx.use(
  attach({
    effect: apiRequestFx,
    source: $accessToken,
    mapParams: (params: Request, token) => {
      const accessToken = token ?? undefined
      return { ...params, accessToken }
    },
  })
)
