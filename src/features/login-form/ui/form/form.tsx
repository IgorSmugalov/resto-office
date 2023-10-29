'use client'

import { FC, memo, SyntheticEvent } from 'react'
import { useForm } from 'effector-forms'
import { LoadingButton } from '@mui/lab'
import { $formHasErrors, $formPending, form } from '../../model'
import { Avatar, Box, Container, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { EmailInput, PasswordInput } from '../inputs'
import { useUnit } from 'effector-react/effector-react.umd'
import { Error } from '../error'
import styles from './form.module.scss'

export const Form: FC = memo(() => {
  const { submit } = useForm(form)
  const [formPending, formHasAnyError] = useUnit([$formPending, $formHasErrors])
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    submit()
  }
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
