import React, { useState, useEffect, ReactElement } from 'react'
import { AppBar, Toolbar, IconButton, Box, Button, useTheme, useMediaQuery } from '@mui/material'
import { Menu, SignRealEstate } from 'mdi-material-ui'
import { useNavigate } from 'react-router-dom'
import { MainMenuUnregistered, MainMenuRegistered } from 'components'
import { useAuth } from 'contexts/auth'
import MelutoSmallLogo from 'assets/meluto/topbar_logo_small.svg'
import MelutoLogo from 'assets/meluto/topbar_logo.svg'

export const TopBar: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [menuIcon, setMenuIcon] = useState<ReactElement>()
  const [menu, setMenu] = useState<ReactElement>()
  const [openDrawer, setOpenDrawer] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setMenuIcon(<img src={user.avatar} style={{ width: '36px', borderRadius: '50%' }}/>)
    } else {
      setMenuIcon(<Menu fontSize="large"/>)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      setMenu(<MainMenuRegistered open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)} user={user}/>)
    } else {
      setMenu(<MainMenuUnregistered open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}/>)
    }
  }, [user, openDrawer])

  return (
    <>
      {menu}
      <AppBar sx={{ height: '64px', position: 'fixed' }}>
        <Toolbar sx={{
          justifyContent: 'space-between',
          '& > img': {
            cursor: 'pointer'
          }
        }}>
          <img
            src={MelutoLogo}
            height="36px"
            style={{ display: smDown ? 'none' : 'flex' }}
            onClick={() => navigate('/')}
            alt="Meluto"
          />
          <img
            src={MelutoSmallLogo}
            height="24px"
            style={{ display: smDown ? 'flex' : 'none' }}
            onClick={() => navigate('/')}
            alt="Meluto"
          />
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<SignRealEstate/>}
              size={smDown ? 'medium' : 'large'}
            >
              Anuncie
            </Button>
            <IconButton sx={{ ml: smDown ? 1 : 2 }} onClick={() => setOpenDrawer(true)}>
              {menuIcon}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ height: '64px', width: '100%' }}/>
    </>
  )
}
