'use client'

import { AuthExceptions } from '@libs/schema'
import { Alert } from '@mui/material'
import { ApiException } from '@shared/request'
import { isKnownException } from '@shared/utils/is-known-exception'
import { useStore } from 'effector-react'
import { FC, memo } from 'react'
import { $formApiError } from '../../model'

const ErrorMessage: FC<{ children: string }> = memo(({ children }) => {
  return <Alert severity="error">{children}</Alert>
})
ErrorMessage.displayName = 'ErrorMessage'

export const Error: FC = memo(() => {
  const error = useStore($formApiError)
  if (!error) return null

  if (
    error instanceof ApiException &&
    isKnownException(AuthExceptions, error)
  ) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return <ErrorMessage>Что-то пошло не так, попробуйте позже</ErrorMessage>
})
Error.displayName = 'Error'
