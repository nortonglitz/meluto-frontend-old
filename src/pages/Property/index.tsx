import React, { useState, useEffect } from 'react'
import { Box, Fade, Tabs, Tab, useMediaQuery, useTheme, IconButton, Collapse, Slide, Button, useScrollTrigger } from '@mui/material'
import { Heart, PhoneOff, Whatsapp, Phone, HeartOutline, Share } from 'mdi-material-ui'
import Gallery from './Gallery'
import About from './About'

export const Property: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [option, setOption] = useState(0)
  const scrollTrigger = useScrollTrigger()
  const [favorited, setFavorited] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  useEffect(() => {
    document.title = 'Propriedade - Residencial'
  }, [])

  function handleShowPhone () {
    setShowPhone(!showPhone)
  }

  function handleWhatsClick () {
    if (smDown) {
      window.open('whatsapp://send?phone=5514991740220&text=Ol%C3%A1,%20estou%20vindo%20do%20site%20Meluto%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20im%C3%B3vel.', '_blank')
    } else {
      window.open('https://web.whatsapp.com/send?phone=5514991740220&text=Ol%C3%A1,%20estou%20vindo%20do%20site%20Meluto%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20im%C3%B3vel.', '_blank')
    }
  }

  function handleShareClick () {
    if (smDown) {
      window.open('whatsapp://send?text=Olha%20esse%20im%C3%B3vel%20que%20eu%20entrei.%20http://www.meluto.com.br/', '_blank')
    } else {
      window.open('https://web.whatsapp.com/send?text=Olha%20esse%20im%C3%B3vel%20que%20eu%20entrei.%20http://www.meluto.com.br/', '_blank')
    }
  }

  return (
    <Fade in>
      <Box>
        <Tabs
          textColor="inherit"
          centered={!smDown}
          variant={smDown ? 'fullWidth' : 'standard'}
          onChange={(_, value) => setOption(value)}
          value={option}
          sx={{
            position: 'fixed',
            width: '100%',
            zIndex: theme.zIndex.appBar - 10,
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[4],
            textTransform: 'none',
            '& button': {
              textTransform: 'none',
              fontSize: theme.typography.h6.fontSize,
              px: smDown ? 0 : 6,
              fontWeight: theme.typography.fontWeightRegular
            }
          }}
        >
          <Tab label="Galeria"/>
          <Tab label="Mapa"/>
          <Tab label="Sobre"/>
        </Tabs>
        <Slide direction="down" in={option !== 0 ? false : !scrollTrigger}>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'fixed', top: '112px', zIndex: theme => theme.zIndex.appBar - 20 }}>
            <Box sx={{
              top: theme => theme.spacing(1),
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.paper',
              boxShadow: theme => theme.shadows[4],
              borderRadius: '0px 0px 8px 8px',
              px: 2,
              py: 1,
              alignItems: 'center'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <IconButton color="error" onClick={() => setFavorited(!favorited)}>
                  {favorited ? <Heart fontSize="large"/> : <HeartOutline fontSize="large"/> }
                </IconButton>
                <IconButton color="success" onClick={handleShowPhone}>
                  {showPhone ? <PhoneOff fontSize="large"/> : <Phone fontSize="large"/> }
                </IconButton>
                <IconButton onClick={handleShareClick}>
                  <Share fontSize="large"/>
                </IconButton>
              </Box>
              <Collapse in={showPhone}>
                <Box sx={{ mt: 1, pb: 1 }}>
                  <Button variant="outlined" color="success" sx={{ fontSize: theme => theme.typography.h5.fontSize, mx: 0 }} onClick={() => window.open('tel:14991740220')}>
                    (14) 99174-0220
                  </Button>
                  <IconButton onClick={handleWhatsClick} sx={{ color: '#25D366', ml: 1 }}>
                    <Whatsapp fontSize="large"/>
                  </IconButton>
                </Box>
              </Collapse>
            </Box>
          </Box>
        </Slide>
        <Box sx={{ height: '48px', mb: { xs: 10, lg: 0 } }}/>
        {option === 0 && <Gallery/>}
        {option === 2 && <About/>}
      </Box>
    </Fade>
  )
}
