'use client'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Container, Typography } from '@mui/material'
import { $isAuth } from '@shared/request'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react/effector-react.umd'
import { useRouter } from 'next/navigation'
import { FC, memo, SyntheticEvent, useEffect } from 'react'
import { $formHasErrors, $formPending, form } from '../../model'
import { Error } from '../error'
import { EmailInput, PasswordInput } from '../inputs'
import styles from './form.module.scss'

export const Form: FC = memo(() => {
  const router = useRouter()
  const { submit } = useForm(form)
  const [formPending, formHasAnyError, isAuth] = useUnit([
    $formPending,
    $formHasErrors,
    $isAuth,
  ])
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    submit()
  }
  useEffect(() => {
    if (isAuth) {
      router.replace('/')
    }
  }, [isAuth, router])
  if (isAuth) return null
  return (
    <Container maxWidth="xs">
      <Box className={styles.loginForm}>
        <Avatar className={styles.loginForm__avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Авторизуйтесь
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          className={styles.loginForm__form}
        >
          <EmailInput />
          <PasswordInput />
          <Error />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={formPending}
            disabled={formHasAnyError}
          >
            Войти
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  )
})
Form.displayName = 'Form'
