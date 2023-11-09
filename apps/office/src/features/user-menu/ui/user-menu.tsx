import { Menu, MenuItem, MenuProps } from '@mui/material'
import { resetAuth } from '@shared/request'
import { NextLink } from '@shared/ui'
import { useUnit } from 'effector-react'
import { FC } from 'react'

interface UserMenuProps {
  anchorEl: MenuProps['anchorEl']
  handleClose: () => void
}

export const UserMenu: FC<UserMenuProps> = (props) => {
  const { handleClose, anchorEl } = props
  const logOut = useUnit(resetAuth)
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
          logOut()
        }}
      >
        Выйти
      </MenuItem>
    </Menu>
  )
}
