import React, { useState } from 'react'
import { formatCurrency, formatNumberUnits } from 'utils/handleNumber'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Lazy } from 'swiper'
import { Card, Fade, CardMedia, CardActionArea, Box, Typography, BoxProps, Button, IconButton, IconButtonProps, ButtonProps } from '@mui/material'
import { MapMarkerRadius, HeartOutline, Share, Delete, DeleteEmpty, Check, Close, Eye, Shower, Car, Heart, RulerSquare, Bed, Cellphone } from 'mdi-material-ui'
import Img1 from 'assets/imgs/residential/1.jpg'
import Img2 from 'assets/imgs/residential/2.jpg'
import Img3 from 'assets/imgs/residential/3.jpg'
import Img4 from 'assets/imgs/residential/4.jpg'
import Img5 from 'assets/imgs/residential/5.jpg'
import Img6 from 'assets/imgs/residential/6.jpg'
import Img7 from 'assets/imgs/residential/7.jpg'
import Img8 from 'assets/imgs/residential/8.jpg'
import Img9 from 'assets/imgs/residential/9.jpg'
import Img10 from 'assets/imgs/residential/10.jpg'
import Img11 from 'assets/imgs/residential/11.jpg'
import Img12 from 'assets/imgs/residential/12.jpg'
import Img13 from 'assets/imgs/residential/13.jpg'
import Img14 from 'assets/imgs/residential/14.jpg'
import Img15 from 'assets/imgs/residential/15.jpg'
import Img16 from 'assets/imgs/residential/16.jpg'
import Img17 from 'assets/imgs/residential/17.jpg'
import Img18 from 'assets/imgs/residential/18.jpg'
import Img19 from 'assets/imgs/residential/19.jpg'
import Img20 from 'assets/imgs/residential/20.jpg'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/lazy'

SwiperCore.use([Navigation, Lazy])

const photos = [
  Img1, Img2, Img3, Img4, Img5,
  Img6, Img7, Img8, Img9, Img10,
  Img11, Img12, Img13, Img14, Img15,
  Img16, Img17, Img18, Img19, Img20
]

interface IStatus {
  active?: boolean
}

const Status: React.FC<IStatus> = ({ active }) => {
  return (
    <Box sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      ml: 1,
      mt: 1,
      zIndex: 1,
      backgroundColor: theme => theme.palette.background.default + '90',
      p: 0.5,
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none'
    }}>
      <Typography variant="overline" lineHeight="0px">
        {active ? 'Ativo' : 'Pausado'}
      </Typography>
      <Box sx={{
        backgroundColor: theme => active ? theme.palette.success.main : theme.palette.error.main,
        ml: 1,
        width: '15px',
        height: '15px',
        borderRadius: '50%'
      }}/>
    </Box>
  )
}

interface IStatusButton extends ButtonProps {
  active?: boolean
}

const StatusButton: React.FC<IStatusButton> = ({ sx, active, ...props }) => {
  return (
    <Button
    {...props}
    size="large"
    color={active ? 'error' : 'success'}
    variant="contained"
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
      mt: 1,
      mr: 8
    }}>
      {active ? 'Pausar' : 'Ativar'}
  </Button>
  )
}

const StatsInfo: React.FC = () => {
  return (
    <Box sx={{
      position: 'absolute',
      top: '215px',
      left: '0px',
      zIndex: 1,
      ml: 1,
      p: 0.5,
      borderRadius: '5px',
      pointerEvents: 'none',
      backgroundColor: theme => theme.palette.background.default + 90
    }}>
      <IconDesc type="favSaves" desc={15}/>
      <IconDesc type="views" desc={218}/>
      <IconDesc type="phoneViews" desc={21}/>
    </Box>
  )
}

interface ICardDesc extends BoxProps {
  saleValue?: number
  rentValue?: number
}

const CardDesc: React.FC<ICardDesc> = ({ rentValue, saleValue, sx, ...props }) => {
  let saleValueFormatted, rentValueFormatted

  if (saleValue) {
    saleValueFormatted = formatCurrency(saleValue, 0)
  }

  if (rentValue) {
    rentValueFormatted = formatCurrency(rentValue, 0)
  }

  return (
    <Box sx={{ pt: 1, pb: 0.5, px: 1 }} {...props}>
      <Typography variant="overline" lineHeight="0.3rem" sx={{ mt: 1 }} color="text.secondary">
        Apartamento
      </Typography>
      <Box sx={{
        display: 'flex',
        '& > div:not(:first-of-type)': {
          ml: 2
        },
        ...sx
      }}>
        <IconDesc type="bedrooms" desc={3}/>
        <IconDesc type="bathrooms" desc={4}/>
        <IconDesc type="parkingSpaces" desc={2}/>
        <IconDesc type="size" desc={220}/>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: 0.5
      }}>
       {saleValue &&
         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="overline" lineHeight="0.3rem" sx={{ mt: 1 }} color="text.secondary">Valor</Typography>
            <Typography component="span" variant="h6">
              {saleValueFormatted}
            </Typography>
          </Box>
        }
        {rentValue &&
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="overline" lineHeight="0.4rem" sx={{ mt: 1 }} color="text.secondary">Aluguel + Cond + IPTU</Typography>
            <Typography component="span" variant="h6">
              {rentValueFormatted}
              <Typography component="span" color="text.secondary" variant="body2">
                /mês
              </Typography>
            </Typography>
          </Box>
        }
      </Box>
    </Box>
  )
}

const FavButton: React.FC<IconButtonProps> = ({ sx, ...props }) => (
  <IconButton
    {...props}
    color="error"
    sx={{
      ...sx,
      position: 'absolute',
      top: 0,
      left: 0,
      opacity: '0.7',
      ml: 1,
      mt: 1,
      zIndex: 1
    }}
    >
      <HeartOutline fontSize="large"/>
  </IconButton>
)

const ShareButton: React.FC<IconButtonProps> = ({ sx, ...props }) => (
  <IconButton
    {...props}
    sx={{
      ...sx,
      position: 'absolute',
      color: theme => theme.palette.background.default,
      top: '0px',
      right: '0px',
      opacity: '0.7',
      mr: 1,
      mt: 1,
      zIndex: 1,
      '&:hover': {
        backgroundColor: theme => theme.palette.background.default + 10
      }
    }}
  >
    <Share fontSize="large"/>
  </IconButton>
)

const DeleteButton: React.FC<IconButtonProps> = ({ sx, ...props }) => {
  const [hovered, setHovered] = useState(false)
  return (
  <IconButton
    {...props}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    sx={{
      ...sx,
      position: 'absolute',
      color: theme => theme.palette.background.default,
      top: '0px',
      right: '0px',
      mr: 1,
      p: 1,
      opacity: 0.8,
      zIndex: 1,
      '&:hover': {
        backgroundColor: theme => theme.palette.background.paper + '10',
        opacity: 1
      }
    }}
  >
    {hovered ? <DeleteEmpty fontSize="large"/> : <Delete fontSize="large"/> }
  </IconButton>
  )
}

interface IDeleteModal extends BoxProps {
  open?: boolean
  onCancel: () => void
}

const DeleteModal: React.FC<IDeleteModal> = ({ sx, open, onCancel, ...props }) => {
  return (
    <Fade in={open}>
      <Box {...props} sx={{
        display: 'flex',
        position: 'absolute',
        flexDirection: 'column',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme => theme.palette.background.default + 'E0',
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        ...sx
      }}>
        <Typography variant="h6">
          Excluir anúncio?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <IconButton color="success" sx={{ border: theme => `2px solid ${theme.palette.success.main}`, mr: 5 }}>
            <Check fontSize="large"/>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onCancel()}
            sx={{
              border: theme => `2px solid ${theme.palette.error.main}`
            }}>
            <Close fontSize="large"/>
          </IconButton>
        </Box>
        <Typography sx={{ mt: 4 }}>
          Essa ação não poderá ser revertida
        </Typography>
      </Box>
    </Fade>
  )
}

const LocationButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    {...props}
    color="inherit"
    size="small"
    endIcon={<MapMarkerRadius/>}
    sx={{
      position: 'absolute',
      right: 0,
      bottom: 0,
      pr: 1,
      pb: 1,
      textTransform: 'none'
    }}>
    {children}
  </Button>
)

interface IIconDesc extends BoxProps {
  type: 'size' | 'bedrooms' | 'bathrooms' | 'parkingSpaces' | 'views' | 'phoneViews' | 'favSaves'
  desc: number
}

export const IconDesc: React.FC<IIconDesc> = ({ type, desc, sx, ...props }) => {
  const descFormatted = formatNumberUnits(desc)
  const renderIcon = (type: string) => {
    switch (type) {
      case 'size':
        return <RulerSquare fontSize="small"/>
      case 'bedrooms':
        return <Bed fontSize="small"/>
      case 'bathrooms':
        return <Shower fontSize="small"/>
      case 'parkingSpaces':
        return <Car fontSize="small"/>
      case 'views':
        return <Eye fontSize="small"/>
      case 'phoneViews':
        return <Cellphone fontSize="small"/>
      case 'favSaves':
        return <Heart fontSize="small"/>
    }
  }
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...sx
      }}
    >
      {renderIcon(type)}
      <Typography sx={{ ml: 0.5 }} fontWeight="medium">
        {type === 'size' ? `${descFormatted}m²` : descFormatted}
      </Typography>
    </Box>
  )
}

interface ICardProperty {
  stats?: {
    active: boolean
    phoneViews: number
    views: number
    favSaves: number
  }
}

export const CardProperty: React.FC<ICardProperty> = ({ stats }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Card
      sx={{
        borderRadius: { xs: '0px', sm: '5px' },
        position: 'relative',
        '.swiper-button-next, .swiper-button-prev': {
          color: 'rgba(255, 255, 255, 0.6)'
        }
      }}>
      <Swiper
        lazy={{
          loadPrevNext: true
        }}
        navigation
      >
      {photos.map((photo, i) =>
        <SwiperSlide key={`swiper-slide-card-${i}`}>
          <CardMedia
            component="img"
            data-src={photo}
            className="swiper-lazy"
            style={{ cursor: 'pointer', height: '300px' }}
          />
        </SwiperSlide>
      )}
      </Swiper>
      <CardActionArea sx={{ position: 'relative' }}>
        <Box sx={{
          backgroundColor: theme => !stats
            ? theme.palette.primary.main
            : stats.active
              ? theme.palette.success.main
              : theme.palette.error.main,
          height: '3px'
        }}/>
        <CardDesc saleValue={2000000} rentValue={2000}/>
      </CardActionArea>
      <LocationButton disabled={!!stats}>
        Barra da Tijuca - RJ
      </LocationButton>
      {stats &&
        <>
          <Status active={stats.active}/>
          <StatusButton active={stats.active}/>
          <StatsInfo/>
          <DeleteButton onClick={() => setOpenModal(true)}/>
          <DeleteModal open={openModal} onCancel={() => setOpenModal(false)}/>
        </>
      }
      {!stats &&
        <>
          <FavButton/>
          <ShareButton/>
        </>
      }
    </Card>
  )
}
