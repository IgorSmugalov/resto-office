'use client'

import { ThemeProvider } from '@mui/material/styles'
import EmotionCacheProvider from './emotion-cache'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme'
import { FC, ReactNode } from 'react'

export const ThemeRegistry: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <EmotionCacheProvider options={{ key: 'mui', prepend: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  )
}
