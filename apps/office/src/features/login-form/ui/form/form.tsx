'use client'

import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { useEffectOnce } from '@shared/hooks'
import { useForm } from 'effector-forms'
import { useUnit } from 'effector-react/effector-react.umd'
import { FC, memo, SyntheticEvent } from 'react'
import { $formHasErrors, $formPending, form, reset } from '../../model'
import { Error } from '../error'
import { EmailInput, PasswordInput } from '../inputs'
import styles from './form.module.scss'

export const Form: FC = memo(() => {
  const { submit } = useForm(form)
  const [formPending, formHasAnyError, resetForm] = useUnit([
    $formPending,
    $formHasErrors,
    reset,
  ])
  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    submit()
  }
  useEffectOnce(() => {
    return resetForm()
  })
  return (
    <>
      <Box
        component="form"
        onSubmit={onSubmit}
        noValidate
        className={styles.loginForm}
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
      {process.env.NODE_ENV === 'development' ? (
        <>
          <Typography
            variant="body1"
            align="center"
            className={styles.loginForm}
          >
            APP RUN IN DEVELOPMENT MODE
            <br />
            use for signIn:
            <br />
            user@example.com
            <br />
            123456
          </Typography>
        </>
      ) : null}
    </>
  )
})
Form.displayName = 'Form'
