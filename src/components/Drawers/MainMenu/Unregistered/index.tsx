import React, { SyntheticEvent } from 'react'
import { SwipeableDrawer, List, ListItemButton, Divider, SwipeableDrawerProps, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { HomeAccount } from 'mdi-material-ui'

export const MainMenuUnregistered: React.FC<SwipeableDrawerProps> = ({ open, onClose, onOpen }) => {
  const navigate = useNavigate()

  const handleItemClick = (e: SyntheticEvent, destination: string) => {
    navigate(destination)
    onClose(e)
  }
  return (
    <>
      <SwipeableDrawer open={open} anchor="right" onClose={onClose} onOpen={onOpen}>
        <List sx={{ width: '250px' }}>
          <ListItemButton sx={{ justifyContent: 'center' }} onClick={e => handleItemClick(e, '/login')}>
            <HomeAccount sx={{ fontSize: '2.5rem', mr: 2 }}/>
            <Typography variant="h6" letterSpacing="0.07rem">
              Entrar
            </Typography>
          </ListItemButton>
          <ListItemButton sx={{ justifyContent: 'center', height: '56px' }} onClick={e => handleItemClick(e, '/register')}>
            <Typography fontWeight="medium" color="primary" letterSpacing="0.04rem">
              Faça o seu cadastro
            </Typography>
          </ListItemButton>
          <Divider/>
        </List>
      </SwipeableDrawer>
    </>
  )
}
