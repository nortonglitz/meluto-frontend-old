import React, { useState } from 'react'
import { Fade, Box, Modal, Button, Grid, ButtonBase } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Lazy, Zoom } from 'swiper'
import { Close } from 'mdi-material-ui'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/lazy'
import 'swiper/css/zoom'

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

const photos = [
  Img1, Img2, Img3, Img4, Img5,
  Img6, Img7, Img8, Img9, Img10,
  Img11, Img12, Img13, Img14, Img15,
  Img16, Img17, Img18, Img19, Img20
]

SwiperCore.use([Navigation, Lazy, Zoom])

const Gallery: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [initialSlide, setInitialSlide] = useState(0)

  return (
    <Fade in>
      <Box>
        <Modal open={openModal} sx={{
          height: '100%',
          '.swiper-button-next, .swiper-button-prev': {
            color: 'rgba(255, 255, 255, 0.6)'
          }
        }}>
          <Box sx={{ height: '100%' }}>
            <Button
              variant="contained"
              sx={{ position: 'absolute', right: '16px', top: '16px', zIndex: 1000, color: theme => theme.palette.background.default }}
              onClick={() => setOpenModal(false)}
              color="inherit"
              endIcon={<Close/>}
              >
                Fechar
            </Button>
            <Box sx={{ height: '100%' }}>
              <Swiper
                initialSlide={initialSlide}
                style={{ height: '100%' }}
                zoom={true}
                lazy={{
                  loadPrevNext: true
                }}
                navigation
              >
              {photos.map(photo =>
                <SwiperSlide key={photo}>
                  <div className="swiper-zoom-container">
                    <img
                      data-src={photo}
                      className="swiper-lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'scale-down' }}
                    />
                  </div>
                </SwiperSlide>
              )}
              </Swiper>
            </Box>
          </Box>
        </Modal>
        <Grid container spacing={0.5}>
          {photos.map((photo, i) => (
            <Grid item xs={6} lg={4} key={`swiper-property-slide-${i}`}>
              <ButtonBase
                onClick={() => {
                  setInitialSlide(i)
                  setOpenModal(true)
                }}
                sx={{ width: '100%', height: '100%' }}
              >
                <Box sx={{
                  display: 'flex',
                  height: { xs: '200px', sm: '300px', lg: '400px' },
                  width: '100%'
                }}>
                  <img src={photo} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                </Box>
              </ButtonBase>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  )
}

export default Gallery
