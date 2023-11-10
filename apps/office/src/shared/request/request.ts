import ky, { HTTPError } from 'ky'
import process from 'process'

export enum Method {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete',
  patch = 'patch',
}

export type AccessToken = string

export type Request = {
  method: Method
  path: string
  accessToken?: AccessToken
  body?: object | FormData
}

export class ApiException {
  message = 'UnknownApiException'

  constructor(obj: { message: string }) {
    Object.assign(this, obj)
  }
}

export class NonApiException {}

export type ExceptionResponse = NonApiException | ApiException

export const api = ky.create({
  prefixUrl: process.env.API_URL,
  credentials: 'include',
})
export const apiRequest = async (params: Request): Promise<any> => {
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
