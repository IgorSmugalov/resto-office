'use client'

import { LoginForm } from '@features/login-form'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Avatar,
  Box,
  Container,
  Paper,
  styled,
  Typography,
} from '@mui/material'
import { FC } from 'react'

export const Login: FC = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={5}>
        <Wrapper>
          <StyledAvatar>
            <LockOutlinedIcon />
          </StyledAvatar>
          <Typography component="h1" variant="h5">
            Авторизуйтесь
          </Typography>
          <LoginForm />
        </Wrapper>
      </Paper>
    </Container>
  )
}

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.3em',
  alignItems: 'center',
  padding: '2em 1em',
}))

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: 75,
  width: 75,
}))
