'use client'

import { Box, Toolbar } from '@mui/material'
import privatePage from '@shared/hoc/private-page'
import { Header } from '@widgets/header'
import { Sidebar } from '@widgets/sidebar'
import * as React from 'react'
import { FC, ReactNode } from 'react'
import styles from './layout.module.scss'

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <Box className={styles.dashboardLayout}>
      <Header />
      <Sidebar />
      <PageContent>{children}</PageContent>
    </Box>
  )
}

const PageContent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.contentWrapper}>
      <Toolbar />
      <Box component="main" className={styles.contentWrapper__pageContent}>
        {children}
      </Box>
    </div>
  )
}

export default privatePage(DashboardLayout)
