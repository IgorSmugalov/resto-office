import { Menu, MenuItem, MenuProps } from '@mui/material'
import { NextLink } from '@shared/ui'
import { useUnit } from 'effector-react'
import { FC } from 'react'
import { signOut } from '../model'

interface UserMenuProps {
  anchorEl: MenuProps['anchorEl']
  handleClose: () => void
}

export const UserMenu: FC<UserMenuProps> = (props) => {
  const { handleClose, anchorEl } = props
  const signOutEv = useUnit(signOut)
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <NextLink href={'profile'}>
        <MenuItem onClick={handleClose}>Профиль</MenuItem>
      </NextLink>

      <MenuItem
        onClick={() => {
          handleClose()
          signOutEv()
        }}
      >
        Выйти
      </MenuItem>
    </Menu>
  )
}
