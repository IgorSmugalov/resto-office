import { Rubik } from 'next/font/google'
import { createTheme, Theme } from '@mui/material/styles'

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic-ext'],
})

export const theme: Theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: { fontFamily: rubik.style.fontFamily },
})
