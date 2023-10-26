'use client'

import { FC, FormEvent } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import styles from './login-form.module.scss'

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  console.log({
    email: data.get('email'),
    password: data.get('password'),
  })
}

export const LoginForm: FC = () => {
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
          onSubmit={handleSubmit}
          noValidate
          className={styles.loginForm__form}
        >
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained">
            Войти
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
