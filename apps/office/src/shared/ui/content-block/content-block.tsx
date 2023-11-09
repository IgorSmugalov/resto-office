import { Box, Paper } from '@mui/material'
import { FC, ReactNode } from 'react'
import styles from './content-block.module.scss'

export const ContentBlock: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box>
      <Paper className={styles.contentBlock}>{children}</Paper>
    </Box>
  )
}
