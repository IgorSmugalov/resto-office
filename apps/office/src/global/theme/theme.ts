import { createTheme, Theme } from '@mui/material/styles'
import { Rubik } from 'next/font/google'

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'cyrillic-ext'],
})

export const theme: Theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => `
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active  {
          -webkit-box-shadow: 0 0 0 100px ${theme.palette.background.default} inset !important;
        }
      `,
    },
  },
  palette: {
    mode: 'dark',
  },
  typography: { fontFamily: rubik.style.fontFamily },
})
