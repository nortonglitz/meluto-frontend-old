import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Box, Button, useTheme, useMediaQuery } from '@mui/material'
import { Menu, SignRealEstate } from 'mdi-material-ui'
import { useNavigate } from 'react-router-dom'
import { DrawerMainMenu } from 'components'
import MelutoSmallLogo from 'assets/meluto/topbar_logo_small.svg'
import MelutoLogo from 'assets/meluto/topbar_logo.svg'

export const TopBar: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [openDrawer, setOpenDrawer] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <DrawerMainMenu open={openDrawer} onClose={() => setOpenDrawer(false)} onOpen={() => setOpenDrawer(true)}/>
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
              <Menu fontSize="large"/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <div style={{ height: '64px', width: '100%' }}/>
    </>
  )
}
