import React, { SyntheticEvent, useState } from 'react'
import {
  SwipeableDrawer, List, Collapse, Divider, SwipeableDrawerProps,
  Typography, Dialog, Box, ListItem, ListItemIcon, ListItemText,
  DialogContentText, DialogActions, Button, DialogTitle, DialogContent
} from '@mui/material'
import { UserModel } from 'types/user'
import { useNavigate } from 'react-router-dom'
import { HomeGroup, Cog, Heart, SignRealEstate, Bank, ChevronDown, Logout } from 'mdi-material-ui'
import { useAuth } from 'contexts/auth'

interface MainMenuRegisteredProps extends SwipeableDrawerProps {
  user: UserModel
}

export const MainMenuRegistered: React.FC<MainMenuRegisteredProps> = ({ open, onClose, onOpen, user }) => {
  const navigate = useNavigate()
  const [openConfig, setOpenConfig] = useState(false)
  const [openSignOut, setOpenSignOut] = useState(false)
  const { signOut } = useAuth()

  const handleItemClick = (e: SyntheticEvent, destination: string) => {
    navigate(destination)
    onClose(e)
  }

  const handleSignOutClick = async (e: SyntheticEvent) => {
    await signOut()
    navigate('/login')
    setOpenSignOut(false)
    onClose(e)
  }

  return (
    <>
      <Dialog open={openSignOut} onClose={() => setOpenSignOut(false)}>
        <DialogTitle>
          Você deseja mesmo sair?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para entrar novamente será preciso que você entre com sua senha e login.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setOpenSignOut(false)}>Cancelar</Button>
          <Button color="error" onClick={handleSignOutClick}>Sair</Button>
        </DialogActions>
      </Dialog>
      <SwipeableDrawer open={open} anchor="right" onClose={onClose} onOpen={onOpen}>
        <List sx={{ width: '250px' }}>
          <ListItem button sx={{ mb: 1, justifyContent: 'center' }} onClick={e => handleItemClick(e, `/${user.username.value}`)}>
            <img src={user.avatar.value} style={{ width: '36px', borderRadius: '50%' }}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
              <Typography variant="h6" lineHeight={1} sx={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.1em' }}>
                {user.names.first}
              </Typography>
              <Typography variant="caption" lineHeight={0.5} sx={{ mt: 0.5 }} color="text.secondary">
                Ver meu perfil
              </Typography>
            </Box>
          </ListItem>
          <Divider/>
          <ListItem button onClick={e => handleItemClick(e, '/')}>
            <ListItemIcon><HomeGroup/></ListItemIcon>
            <ListItemText primary="Buscar imóveis" />
          </ListItem>
          <Divider/>
          <ListItem button onClick={e => handleItemClick(e, '/')}>
            <ListItemIcon><SignRealEstate/></ListItemIcon>
            <ListItemText primary="Anúncios" />
          </ListItem>
          <ListItem button onClick={e => handleItemClick(e, '/')}>
            <ListItemIcon><Heart/></ListItemIcon>
            <ListItemText primary="Favoritos" />
          </ListItem>
          <ListItem button onClick={e => handleItemClick(e, '/')}>
            <ListItemIcon><Bank/></ListItemIcon>
            <ListItemText primary="Financeiro" />
          </ListItem>
          <ListItem button onClick={e => setOpenConfig(!openConfig)}>
            <ListItemIcon>
              <Cog sx={{
                transition: 'all 0.4s',
                transform: openConfig ? 'rotate(90deg)' : ''
              }}/>
            </ListItemIcon>
            <ListItemText primary="Configurações" />
            <ChevronDown
              sx={{
                transition: 'all 0.4s',
                transform: openConfig ? 'rotate(180deg)' : ''
              }}
            />
          </ListItem>
          <Collapse in={openConfig} timeout="auto" unmountOnExit>
            <List sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              boxShadow: theme => theme.innerShadows[2]
            }}>
              <ListItem button sx={{ textAlign: 'center' }}
                onClick={e => {
                  setOpenConfig(false)
                  handleItemClick(e, '/settings/profile')
                }}
              >
                <ListItemText sx={{ fontStyle: 'italic' }} primary="Perfil"/>
              </ListItem>
              <ListItem button sx={{ textAlign: 'center' }}
                onClick={e => {
                  setOpenConfig(false)
                  handleItemClick(e, '/settings/contact')
                }}
              >
                <ListItemText sx={{ fontStyle: 'italic' }} primary="Contato"/>
              </ListItem>
              <ListItem button sx={{ textAlign: 'center' }}
                onClick={e => {
                  setOpenConfig(false)
                  handleItemClick(e, '/settings/sessions')
                }}
              >
                <ListItemText sx={{ fontStyle: 'italic' }} primary="Sessões"/>
              </ListItem>
            </List>
          </Collapse>
          <Divider/>
          <ListItem button sx={{ justifyContent: 'center', color: theme => theme.palette.error.dark }} onClick={() => setOpenSignOut(true)}>
            <Typography fontWeight={500}>Sair</Typography>
            <Logout sx={{ ml: 1 }}/>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  )
}
