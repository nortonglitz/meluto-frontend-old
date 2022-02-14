import React from 'react'
import { Card, CardActionArea, Box, Typography, CardProps } from '@mui/material'
import RealEstateLogo from 'assets/imgs/real-estate-logo.jpg'

interface ICardAdvertiser extends CardProps {
  name?: string
}

export const CardAdvertiser: React.FC<ICardAdvertiser> = ({ ...props }) => {
  return (
    <Card {...props}>
      <CardActionArea>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', width: '40%', borderRight: theme => `4px solid ${theme.palette.primary.main}` }}>
            <img src={RealEstateLogo} loading="lazy" height="100%" width="100%" style={{ objectFit: 'cover' }}/>
          </Box>
          <Box sx={{ display: 'flex', width: '60%', p: 2, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h5" sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                Real Estate
              </Typography>
              <Typography
                color="primary.light"
                variant="overline"
                lineHeight={0}
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                Imobiliária
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontFamily: 'monospace',
                  mt: 1,
                  '& > span:first-of-type': {
                    color: theme => theme.palette.text.secondary
                  }
                }}>
                <span>CRECI-RJ</span>
                <span>XX XXX.XXX</span>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontFamily: 'monospace',
                  mt: 1,
                  '& > span:first-of-type': {
                    color: theme => theme.palette.text.secondary
                  }
                }}>
                <span>CNPJ</span>
                <span>XX.XXX.XXX/0001-XX</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  )
}
