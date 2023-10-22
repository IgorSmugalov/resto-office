import { Rubik } from 'next/font/google'
import { createTheme, Theme } from '@mui/material/styles'

const rubik = Rubik({
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const muiTheme: Theme = createTheme({
  typography: { fontFamily: rubik.style.fontFamily },
})
