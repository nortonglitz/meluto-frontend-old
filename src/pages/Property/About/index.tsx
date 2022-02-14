import React from 'react'
import { AccordionClean, CardAdvertiser } from 'components'
import { formatCurrency, formatNumberUnits } from 'utils/handleNumber'
import { translateAmenities, translateNearby, translateSafety, translateSpecialFeature } from 'utils/translate'
import { AmenitiesIcon, NearbyIcon, SafetyIcon, SpecialFeatureIcon } from 'utils/chooseIcon'
import { BoxProps, Box, Typography, Divider, Fade, Grid, AccordionSummary, AccordionDetails, Chip } from '@mui/material'
import { MapMarkerRadius, Bed, Shower, Car, RulerSquare, Pool, NoteText, Walk, ShieldHome, ChevronDown } from 'mdi-material-ui'

const amenities = {
  pool: true,
  barbecue: true,
  sportsCourt: true,
  gym: true,
  sauna: true,
  elevator: true,
  movieRoom: true,
  gameRoom: true,
  ofuro: true,
  hotTub: true,
  fireplace: true,
  heater: true,
  airConditioner: true,
  ceilingFan: true
}

const nearby = {
  market: true,
  bank: true,
  metro: true,
  club: true,
  airport: true,
  gym: true,
  stadium: true,
  busStop: true,
  mall: true,
  restaurant: true,
  bakery: true,
  beach: true,
  dam: true,
  river: true,
  park: true,
  naturalReserve: true,
  hill: true
}

const safety = {
  cctv: true,
  security24: true,
  gatedCommunity: true,
  electronicGate: true,
  alarm: true,
  electricFence: true
}

const specialFeatures = {
  furnished: true,
  offPlan: true,
  renovated: true,
  seaFront: true,
  launch: true
}

interface IValues extends BoxProps {
  saleValue?: number
  rentValue?: number
  iptuValue?: number
  condValue?: number
}

const Values: React.FC<IValues> = ({ saleValue, rentValue, condValue, iptuValue }) => {
  return (
  <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <Box
      sx={{
        border: theme => `2px solid ${theme.palette.secondary.main}`,
        borderRadius: '10px',
        p: 2,
        width: 'fit-content'
      }}>
      <Box sx={{
        '& > div:nth-of-type(2)': {
          mt: 2
        }
      }}>
      {saleValue &&
        <Box>
          <Typography variant="body2" lineHeight={1} textTransform="uppercase" color="text.secondary">
            Venda
          </Typography>
          <Typography variant="h3">
            {formatCurrency(saleValue, 0)}
          </Typography>
        </Box>
      }
      {rentValue &&
        <Box>
          <Typography variant="body2" lineHeight={1} textTransform="uppercase" color="text.secondary">
            Aluguel
          </Typography>
          <Typography variant="h3">
            {formatCurrency(rentValue, 0)}
            <Typography component="span" color="text.secondary" variant="h6">
              /mês
            </Typography>
          </Typography>
        </Box>
      }
      </Box>
    </Box>
    <Box sx={{ display: 'flex', mt: 2, justifyContent: 'center' }}>
      <Box>
        <Typography variant="body2" lineHeight={1} color="text.secondary">
          Condomínio
        </Typography>
        <Typography variant="h6">
          {!condValue ? '-' : formatCurrency(condValue, 0)}
        </Typography>
      </Box>
      <Divider flexItem orientation="vertical" sx={{ mx: 2 }}/>
      <Box>
        <Typography variant="body2" lineHeight={1} color="text.secondary">
          IPTU
        </Typography>
        <Typography variant="h6">
          {iptuValue
            ? <>
                {formatCurrency(iptuValue, 0)}
                <Typography component="span" color="text.secondary" variant="body1">
                  /ano
                </Typography>
              </>
            : '-'
          }
        </Typography>
      </Box>
    </Box>
  </Box>
  )
}

const Address: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <MapMarkerRadius fontSize="large" sx={{ mr: 0.5 }}/>
        <Typography variant="h5">Localização</Typography>
      </Box>
      <Divider sx={{ my: 1 }}/>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        '& > div': { whiteSpace: 'nowrap' }
      }}>
        <Box>
          <Typography variant="overline" lineHeight={0} color="text.secondary">
            Bairro
          </Typography>
          <Typography variant="h6" lineHeight={1}>
            Barra da Tijuca
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline" lineHeight={0} color="text.secondary">
            Cidade
          </Typography>
          <Typography variant="h6" lineHeight={1}>
            Rio de Janeiro
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline" lineHeight={0} color="text.secondary">
            UF
          </Typography>
          <Typography variant="h6" lineHeight={1}>
            RJ
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

interface IIconDesc extends BoxProps {
  type: 'bedrooms' | 'bathrooms' | 'parkingSpaces' | 'size'
  title: string
  value: number
}

const IconDesc: React.FC<IIconDesc> = ({ type, title, value }) => {
  const setIcon = (type: string) => {
    switch (type) {
      case 'bedrooms':
        return <Bed fontSize="small"/>
      case 'bathrooms':
        return <Shower fontSize="small"/>
      case 'parkingSpaces':
        return <Car fontSize="small"/>
      case 'size':
        return <RulerSquare fontSize="small"/>
    }
  }
  return (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', '& > svg': { mr: 1 } }}>
      {setIcon(type)}
      <Typography variant="h6" lineHeight={0.5}>
        {formatNumberUnits(value)}
        { type === 'size' && <Typography variant="h6" component="span" lineHeight={0.5}>m²</Typography>}
      </Typography>
    </Box>
    <Typography variant="overline" color="text.secondary">
      {title}
    </Typography>
  </Box>
  )
}

interface ISpecialFeatures {
  items: { [key: string]: boolean }
}

const SpecialFeatures: React.FC<ISpecialFeatures> = ({ items }) => {
  type Item = keyof typeof items
  const selectedItems = Object.keys(items).filter((item) => items[item as Item])

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      mt: 3,
      '& > div': {
        m: 1
      }
    }}>
      {selectedItems.map((item, i) =>
        <Chip
          key={`chip-special-detail-${i}`}
          icon={<SpecialFeatureIcon item={item}/>}
          label={<Typography>{translateSpecialFeature(item)}</Typography>}
        />
      )}
    </Box>
  )
}

const Details: React.FC = () => {
  return (
  <Box>
    <Box
      sx={{
        p: 2,
        border: theme => `2px solid ${theme.palette.divider}`,
        borderRadius: '10px'
      }}>
      <Box>
        <Typography
          variant="h5"
          textTransform="uppercase"
          align="center"
          sx={{
            p: 1,
            borderRadius: '5px'
          }}>
          Apartamento
        </Typography>
      </Box>
      <Divider/>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        '& > div': {
          display: 'flex',
          mt: 2,
          '& > div': {
            mx: 2
          }
        }
      }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <IconDesc value={5} type="bedrooms" title="Quartos"/>
          <IconDesc value={6} type="bathrooms" title="Banheiros"/>
          <IconDesc value={3} type="parkingSpaces" title="Vagas"/>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <IconDesc value={9300002} type="size" title="Área Útil"/>
          <IconDesc value={150000000} type="size" title="Área Total"/>
        </Box>
      </Box>
    </Box>
    <SpecialFeatures items={specialFeatures}/>
  </Box>
  )
}

const Description: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <NoteText fontSize="large" sx={{ mr: 0.5 }}/>
        <Typography variant="h5">Descrição</Typography>
      </Box>
      <Divider sx={{ my: 1 }}/>
      <Typography align="justify">
      Casa construída em madeira de lei, exterior de Itauba e parte interior de cedrinho, na Estrada Geral do Ouvidor no bairro Campo duna no município de Garopaba, com 140 metros de área construída, e terreno com área total de 408 metros. Há plantas no quintal inclusive árvores frutíferas como: acerola, pitanga, carambola, coco da Bahia e limão.
      </Typography>
    </Box>
  )
}

interface IAccordionItems {
  type: 'safety' | 'nearby' | 'amenities'
  items: { [key: string]: boolean }
}

const AccordionItems: React.FC<IAccordionItems> = ({ type, items }) => {
  type Item = keyof typeof items
  const selectedItems = Object.keys(items).filter((item) => items[item as Item])

  const translate = (translateType: string, value: string) => {
    switch (translateType) {
      case 'safety':
        return translateSafety(value)
      case 'nearby':
        return translateNearby(value)
      case 'amenities':
        return translateAmenities(value)
    }
  }

  const chooseIconList = (iconType: string, value: string) => {
    switch (iconType) {
      case 'safety':
        return <SafetyIcon item={value} fontSize="small" sx={{ mr: 0.5 }}/>
      case 'nearby':
        return <NearbyIcon item={value} fontSize="small" sx={{ mr: 0.5 }}/>
      case 'amenities':
        return <AmenitiesIcon item={value} fontSize="small" sx={{ mr: 0.5 }}/>
    }
  }

  const chooseIcon = (iconType: string) => {
    switch (iconType) {
      case 'safety':
        return <ShieldHome sx={{ mr: 0.5 }} fontSize="large"/>
      case 'nearby':
        return <Walk sx={{ mr: 0.5 }} fontSize="large"/>
      case 'amenities':
        return <Pool sx={{ mr: 0.5 }} fontSize="large"/>
    }
  }

  const chooseTitle = (iconType: string) => {
    switch (iconType) {
      case 'safety':
        return 'Segurança'
      case 'nearby':
        return 'Proximidade'
      case 'amenities':
        return 'Comodidade'
    }
  }

  return (
    <AccordionClean sx={{ borderWidth: '1px' }}>
      <AccordionSummary expandIcon={<ChevronDown/>}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {chooseIcon(type)}
            <Typography variant="h5">
              {chooseTitle(type)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mr: 1 }}>
            <Typography color="text.secondary" fontStyle="italic">
              {selectedItems.length === 0
                ? 'Nenhum'
                : selectedItems.length > 1
                  ? `${selectedItems.length} itens`
                  : `${selectedItems.length} item`}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={0.5}>
          {selectedItems.map((item, i) =>
          <Grid item key={`${type}-${i}`} xs={12} md={4}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: 'flex',
              alignItems: 'center'
            }}>
            {chooseIconList(type, item)}
            {translate(type, item)}
          </Grid>
          )}
        </Grid>
      </AccordionDetails>
    </AccordionClean>
  )
}

const About: React.FC = () => {
  return (
    <Fade in>
      <Grid container justifyContent="center" sx={{ mt: 2, pb: 4, px: 2 }} spacing={2}>
        <Grid item xs={12} sm={7} md={5} xl={3}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            mb: 4,
            '& > div:last-of-type': {
              mt: 4
            }
          }}>
            <Values saleValue={400000000} rentValue={1600000} condValue={6000} iptuValue={5000}/>
            <Details/>
          </Box>
        </Grid>
        <Grid item xs={12} md={7} xl={6} container justifyContent="center">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: { xs: 0, md: 10 },
              '& > div:not(:first-of-type)': {
                mt: 4
              }
            }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardAdvertiser sx={{ maxWidth: '450px' }}/>
            </Box>
            <Address/>
            <Description/>
            <AccordionItems type="safety" items={safety}/>
            <AccordionItems type="amenities" items={amenities}/>
            <AccordionItems type="nearby" items={nearby}/>
          </Box>
        </Grid>
      </Grid>
    </Fade>
  )
}

export default About
