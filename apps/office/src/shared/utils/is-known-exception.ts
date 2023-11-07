import { ApiException } from '@shared/request'

export const isKnownException = (
  knownExceptions: object,
  exception: ApiException
) => {
  if (exception.message === 'Validation exception') return true
  return Object.values(knownExceptions).includes(exception.message)
}
