import React, { useState } from 'react'
import { CardProperty } from 'components'
import { Fade, Box, Typography, Button, IconButton, Divider, Tabs, Tab, BoxProps, Grid, ButtonBase, ButtonBaseProps, useMediaQuery, useTheme } from '@mui/material'
import { CheckDecagram, MapMarker, ChevronRight, Youtube, Instagram, Facebook, Phone, Whatsapp } from 'mdi-material-ui'
import RealEstateLogo from 'assets/imgs/logo-real-estate.png'
import UserShowResidentialAdsIllustration from 'assets/illustrations/user-show-residential-ads.svg'
import UserNoAdsIllustration from 'assets/illustrations/user-no-ads.svg'

interface SocialMediaProps {
  type: 'instagram' | 'youtube' | 'facebook' | 'whatsapp'
}

const SocialMedia: React.FC<SocialMediaProps> = ({ type }) => {
  const chooseColor = () => {
    switch (type) {
      case 'facebook':
        return '#4267B2'
      case 'instagram':
        return '#E1306C'
      case 'youtube':
        return '#FF0000'
      case 'whatsapp':
        return '#25D366'
    }
  }

  const selectIcon = () => {
    switch (type) {
      case 'facebook':
        return <Facebook sx={{ color: chooseColor() }}/>
      case 'instagram':
        return <Instagram sx={{ color: chooseColor() }}/>
      case 'youtube':
        return <Youtube sx={{ color: chooseColor() }}/>
      case 'whatsapp':
        return <Whatsapp sx={{ color: chooseColor() }}/>
    }
  }

  return (
    <IconButton
      sx={{
        border: theme => `2px solid ${theme.palette.divider}`,
        color: chooseColor(),
        transition: 'all 0.2s',
        '&:hover': {
          backgroundColor: chooseColor() + '10',
          borderColor: chooseColor()
        }
      }}>
      {selectIcon()}
    </IconButton>
  )
}

interface UserLogoProps {
  url: string
}

const UserLogo: React.FC<UserLogoProps> = ({ url }) => {
  return (
  <Box sx={{ width: 'fit-content' }}>
    <Box sx={{
      display: 'flex',
      width: '250px',
      height: '250px',
      overflow: 'hidden',
      borderRadius: '50%',
      border: theme => `4px solid ${theme.palette.divider}`
    }}>
      <img src={url} style={{ objectFit: 'cover' }}/>
    </Box>
  </Box>
  )
}

interface DescriptionProps {
  name: string
  type: string
  description?: string
}

const Description: React.FC<DescriptionProps> = ({ name, type, description }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        sx={{
          textTransform: 'uppercase',
          color: theme => theme.palette.text.secondary,
          fontSize: theme => theme.typography.body2.fontSize,
          mt: 1,
          letterSpacing: '0.05em'
        }}
      >
        {type}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" noWrap fontWeight="medium">{name}</Typography>
        <CheckDecagram fontSize="small" sx={{ ml: 1, color: theme => theme.palette.primary.light }}/>
      </Box>
      <Typography variant="body2" color="text.secondary" align="justify" sx={{ mt: 1 }}>
        {description}
      </Typography>
    </Box>
  )
}

interface InfoProps {
  phone?: string
  address?: {
    street: string
    number?: string
    district: string
    city: string
    state: string
  }
}

const Info: React.FC<InfoProps> = ({ phone, address }) => {
  return (
    <>
      {address &&
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
          <MapMarker sx={{ color: theme => theme.palette.text.secondary }}/>
          <Divider flexItem orientation="vertical" sx={{ mx: 1 }}/>
          <Typography variant="body2">
            {address.street + ' '} {address.number && `nº ${address.number}`}<br/>
            {address.district}<br/>
            {address.city + ' - ' + address.state}
          </Typography>
        </Box>
      }
      {phone &&
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Phone sx={{ color: theme => theme.palette.text.secondary }}/>
          <Divider flexItem orientation="vertical" sx={{ mx: 1 }}/>
          <Button>(14) 99174 0220</Button>
        </Box>
      }
    </>
  )
}

interface BusinessInfoProps extends BoxProps {
  CNPJ?: string
  CRECI?: {
    number: string
    state: string
  }
}

const BusinessInfo: React.FC<BusinessInfoProps> = ({ CNPJ, CRECI, ...props }) => {
  return (
    <Box {...props}>
      <Typography variant="overline" component="p" lineHeight="0.5em" color="text.secondary">
        {CNPJ && 'CNPJ'}
        {CRECI && 'CRECI'}
      </Typography>
      <Typography variant="caption">
        {CNPJ}
        {CRECI && `${CRECI.number}-${CRECI.state}`}
      </Typography>
    </Box>
  )
}

const MoreAdsButton: React.FC<ButtonBaseProps> = ({ sx, ...props }) => {
  return (
    <ButtonBase
    sx={{
      position: 'relative',
      py: 2,
      pl: 4,
      pr: 8,
      borderRadius: '10px',
      backgroundColor: theme => theme.palette.background.paper,
      ...sx
    }}
    {...props}
  >
    <Box>
      <img src={UserShowResidentialAdsIllustration} style={{ width: '100%', maxWidth: '220px' }}/>
      <Typography variant="body1" fontWeight="medium" sx={{ mt: 1 }} color="primary">
        Veja todos os imóveis
      </Typography>
    </Box>
    <ChevronRight sx={{ position: 'absolute', mr: 2, right: 0, bottom: '40%', fontSize: '36px' }}/>
  </ButtonBase>
  )
}

interface ResidentialAdsProps {
  residentialAds?: string[]
}

const ResidentialAds: React.FC<ResidentialAdsProps> = ({ residentialAds }) => {
  return (
    <Fade in>
      <Box>
        {!residentialAds || residentialAds.length < 1
          ? <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={UserNoAdsIllustration} style={{ width: '100%', maxWidth: '300px' }}/>
              <Typography sx={{ mt: 2 }} color="text.secondary" align="center">
                Ainda não há anúncios residenciais
              </Typography>
            </Box>
          : <>
              <MoreAdsButton sx={{ mt: 2, ml: { xs: 2, md: 0 } }}/>
              <Typography fontWeight="medium" variant="h6" sx={{ my: 2, ml: { xs: 2, md: 0 } }}>
                Imóveis mais recentes
                <Button sx={{ ml: 1 }}>Ver mais</Button>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6} xl={4}>
                  <CardProperty/>
                </Grid>
                <Grid item xs={12} lg={6} xl={4}>
                  <CardProperty/>
                </Grid>
                <Grid item xs={12} lg={6} xl={4}>
                  <CardProperty/>
                </Grid>
              </Grid>
            </>
        }
      </Box>
    </Fade>
  )
}

interface CommercialAdsProps {
  commercialAds?: string[]
}

const CommercialAds: React.FC<CommercialAdsProps> = ({ commercialAds }) => {
  return (
    <Fade in>
      <Box>
        {!commercialAds || commercialAds.length < 1
          ? <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={UserNoAdsIllustration} width={300}/>
              <Typography sx={{ mt: 2 }} color="text.secondary" align="center">
                Ainda não há anúncios comerciais
              </Typography>
            </Box>
          : <>
              <MoreAdsButton sx={{ mt: 2, ml: { xs: 2, md: 0 } }}/>
              <Typography fontWeight="medium" variant="h6" sx={{ my: 2, ml: { xs: 2, md: 0 } }}>
                Imóveis mais recentes
                <Button sx={{ ml: 1 }}>Ver mais</Button>
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6} xl={4}>
                  <CardProperty/>
                </Grid>
                <Grid item xs={12} lg={6} xl={4}>
                  <CardProperty/>
                </Grid>
                <Grid item xs={12} lg={6} xl={4}>
                  <CardProperty/>
                </Grid>
              </Grid>
            </>
        }
      </Box>
    </Fade>
  )
}

export const User: React.FC = () => {
  const [propertyTab, setPropertyTab] = useState<'residential' | 'commercial'>('residential')
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Fade in>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 0 }}>
        <Grid item xs={12} sm={8} md={5} lg={4} xl={3}>
          <Box sx={{ position: { xs: 'flex', md: 'sticky' }, top: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <UserLogo url={RealEstateLogo}/>
            <Box sx={{ mt: 2, mb: 1, display: 'flex', width: '100%', justifyContent: 'space-evenly' }}>
              <SocialMedia type="instagram"/>
              <SocialMedia type="youtube"/>
              <SocialMedia type="facebook"/>
              <SocialMedia type="whatsapp"/>
            </Box>
            <Description name="Muller Imóveis" type="Imobiliária" description="A nível organizacional, o desenvolvimento contínuo de distintas formas de atuação estimula a padronização das formas de ação."/>
            <Button variant="outlined" sx={{ borderRadius: '10px', my: 2, width: 'fit-content' }} endIcon={<ChevronRight/>}>Site</Button>
            <Info
              phone="14 99174 0220"
              address={{
                street: 'Rua Alceu Amoroso Lima',
                number: '65',
                district: 'Barra da Tijuca',
                city: 'Rio de Janeiro',
                state: 'RJ'
              }}/>
            <Box sx={{ width: '100%' }}>
              <BusinessInfo CNPJ="XX.XXX.XXX/0001-XX" sx={{ mt: 3 }}/>
              <BusinessInfo CRECI={{ number: 'XXX.XXX', state: 'RJ' }} sx={{ mt: 2 }}/>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} lg={8} xl={9} sx={{ pr: { xs: 0, lg: 2 } }}>
          <Tabs value={propertyTab} onChange={(e, value) => setPropertyTab(value)} variant={mdDown ? 'fullWidth' : 'standard'}>
            <Tab label="Residencial" value="residential"/>
            <Tab label="Comercial" value="commercial"/>
          </Tabs>
          {propertyTab === 'residential'
            ? <ResidentialAds residentialAds={['123']}/>
            : <CommercialAds commercialAds={[]}/>
          }
        </Grid>
      </Grid>
    </Fade>
  )
}
