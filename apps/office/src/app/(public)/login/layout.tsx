'use client'

import { Box } from '@mui/material'
import { ReactNode } from 'react'
import styles from './layout.module.scss'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Box component="main" className={styles.publicLayout}>
      {children}
    </Box>
  )
}
