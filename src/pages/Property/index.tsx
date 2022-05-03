import React, { useState, useEffect } from 'react'
import { Box, Fade, Tabs, Tab, useMediaQuery, useTheme } from '@mui/material'
import Gallery from './Gallery'
import About from './About'

export const Property: React.FC = () => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [option, setOption] = useState(0)
  useEffect(() => {
    document.title = 'Propriedade - Residencial'
  }, [])

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
        <Box sx={{ height: '48px' }}/>
        {option === 0 && <Gallery/>}
        {option === 2 && <About/>}
      </Box>
    </Fade>
  )
}
