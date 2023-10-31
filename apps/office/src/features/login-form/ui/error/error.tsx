'use client'

import { Alert } from '@mui/material'
import { AuthApiExceptionMessages } from '@shared/api/auth'
import { ApiException } from '@shared/request'
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

  if (error instanceof ApiException) {
    if (error.message === AuthApiExceptionMessages.IncorrectCredentials)
      return (
        <ErrorMessage>Неправильное имя пользователя или пароль</ErrorMessage>
      )

    if (error.message === AuthApiExceptionMessages.UserNotActivated)
      return <ErrorMessage>Пользователь не активирован</ErrorMessage>
  }

  return <ErrorMessage>Что-то пошло не так, попробуйте позже</ErrorMessage>
})
Error.displayName = 'Error'
