import React, { useEffect } from 'react'
import { CardProperty } from 'components'
import { Grid } from '@mui/material'

export const ResidentialSearchList: React.FC = () => {
  useEffect(() => {
    document.title = 'Busca - Residencial'
  }, [])

  return (
    <>
      <Grid container spacing={2} sx={{ p: { xs: 0, sm: 2 } }}>
        <Grid item xs={12} sm={6} lg={4}>
          <CardProperty/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <CardProperty stats={{
            active: false,
            phoneViews: 100,
            views: 200,
            favSaves: 10
          }}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <CardProperty stats={{
            active: true,
            phoneViews: 100,
            views: 200,
            favSaves: 10
          }}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <CardProperty/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <CardProperty/>
        </Grid>
      </Grid>
    </>
  )
}
