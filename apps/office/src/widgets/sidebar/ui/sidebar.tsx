'use client'

import InboxIcon from '@mui/icons-material/MoveToInbox'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { NextLink } from '@shared/ui'
import * as React from 'react'

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <NextLink href={'/'}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={'main'} />
              </ListItemButton>
            </ListItem>
          </NextLink>
        </List>
      </Box>
    </Drawer>
  )
}
