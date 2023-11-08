'use client'

import { UserMenu } from '@features/user-menu'
import { AccountCircle } from '@mui/icons-material'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import { FC, useState } from 'react'
import styles from './header.module.scss'

export const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar className={styles.toolbar}>
        <div>
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <UserMenu handleClose={handleClose} anchorEl={anchorEl} />
        </div>
      </Toolbar>
    </AppBar>
  )
}
