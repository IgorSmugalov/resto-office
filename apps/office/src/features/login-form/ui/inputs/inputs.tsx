'use client'

import { TextField } from '@mui/material'
import { useUnit } from 'effector-react'
import { FC, memo } from 'react'
import { $formPending, Credentials, form } from '../../model'

const InputBase: FC<{
  field: keyof Credentials
  label: string
  autoComplete: string
  type?: string
}> = memo(({ field, label, autoComplete, type }) => {
  const { onChange, value, errorText, isValid } = useUnit(form.fields[field])
  const formPending = useUnit($formPending)
  return (
    <TextField
      name={field}
      id={field}
      label={errorText || label}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      error={!isValid}
      value={value}
      disabled={formPending}
      type={type}
      required
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
  )
})
InputBase.displayName = 'InputBase'

export const EmailInput: FC = () => {
  return (
    <InputBase
      field="email"
      label="Email"
      autoComplete="username"
      type="email"
    />
  )
}

export const PasswordInput: FC = () => {
  return (
    <InputBase
      field="password"
      label="Пароль"
      autoComplete="current-password"
      type="password"
    />
  )
}
