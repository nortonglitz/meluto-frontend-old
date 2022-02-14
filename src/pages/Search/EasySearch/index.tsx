import React, { useState, useEffect } from 'react'
import { showNumberMetricAffixes } from 'utils/handleNumber'
import { useTheme, useMediaQuery, Box, Typography, SxProps, Divider, AccordionSummary, AccordionDetails, Grid, Fade, Button, TextField, IconButton } from '@mui/material'
import { Bed, Shower, Car, ChevronDown, ArrowRight, Restore, City, HomeSearch } from 'mdi-material-ui'
import { SelectIllustrationButton, SelectTextButton, AccordionClean, TextFieldPrice, SelectGroup, SelectTextMenu } from 'components'
import CommercialIllustration from 'assets/illustrations/search-commercial.svg'
import ResidentialIllustration from 'assets/illustrations/search-residential.svg'
import SearchBackgroundImage from 'assets/imgs/easysearch-background.jpg'

interface ISearchBox {
  sx?: SxProps,
  form: {property: 'residential' | 'commercial', transaction: 'buy' | 'rent'}
  setForm: ({ property, transaction } : {property: 'residential' | 'commercial', transaction: 'buy' | 'rent'}) => void
}
const SearchBox: React.FC<ISearchBox> = ({ sx, form, setForm }) => {
  const handleClick = (type: 'transaction' | 'property', value: string) => {
    setForm({ ...form, [type]: value })
  }
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
        <Box sx={{ display: 'flex' }}>
          <SelectIllustrationButton
            sx={{ mr: 1, p: 1 }}
            label="Residencial"
            selected={form.property === 'residential'}
            onClick={() => handleClick('property', 'residential')}
          >
            <img src={ResidentialIllustration} width={100} alt="Residencial" />
          </SelectIllustrationButton>
          <SelectIllustrationButton
            sx={{ ml: 1, p: 1 }}
            label="Comercial"
            selected={form.property === 'commercial'}
            onClick={() => handleClick('property', 'commercial')}
          >
            <img src={CommercialIllustration} width={100} alt="Comercial"/>
          </SelectIllustrationButton>
        </Box>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <SelectTextButton sx={{ width: '50%', mr: 1 }}
            selected={form.transaction === 'buy'}
            onClick={() => handleClick('transaction', 'buy')}
          >
            Comprar
          </SelectTextButton>
          <SelectTextButton sx={{ width: '50%', ml: 1 }}
            selected={form.transaction === 'rent'}
            onClick={() => handleClick('transaction', 'rent')}
          >
            Alugar
          </SelectTextButton>
        </Box>
      </Box>
  )
}

interface IResidentialForm {
  sx?: SxProps,
  form: { bedrooms: number, bathrooms: number, parkingSpaces: number }
  setForm: ({ bedrooms, bathrooms, parkingSpaces }: {bedrooms: number, bathrooms: number, parkingSpaces: number}) => void
}

const ResidentialForm: React.FC<IResidentialForm> = ({ sx, setForm, form }) => {
  const options = [
    { value: 0, label: '0' },
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
  ]
  return (
    <AccordionClean sx={sx}>
      <AccordionSummary expandIcon={<ChevronDown/>}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Bed/>
            <Typography
              color="secondary"
              variant="h6"
              sx={{
                ml: 0.5,
                fontWeight: 500
              }}>
              {form.bedrooms + '+'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Shower/>
            <Typography
              color="secondary"
              variant="h6"
              sx={{
                ml: 0.5
              }}>
              {form.bathrooms + '+'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Car/>
            <Typography
              color="secondary"
              variant="h6"
              sx={{
                ml: 0.5
              }}>
              {form.parkingSpaces + '+'}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Divider flexItem sx={{ mb: 2 }}/>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SelectGroup
            icon={<Bed/>}
            label="Quartos"
            options={options}
            setChosen={value => setForm({ ...form, bedrooms: value as number })}
            chosen={form.bedrooms}
          />
        </Box>
        <Divider flexItem sx={{ my: 2 }}/>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SelectGroup
            icon={<Shower/>}
            label="Banheiros"
            options={options}
            setChosen={value => setForm({ ...form, bathrooms: value as number })}
            chosen={form.bathrooms}
          />
        </Box>
        <Divider flexItem sx={{ my: 2 }}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <SelectGroup
            icon={<Car/>}
            label="Vagas"
            options={options}
            setChosen={value => setForm({ ...form, parkingSpaces: value as number })}
            chosen={form.parkingSpaces}
          />
        </Box>
      </AccordionDetails>
    </AccordionClean>
  )
}

interface ICommercialForm {
  sx?: SxProps
  setForm: (value: string[]) => void
  form: string[]
}

const CommercialForm: React.FC<ICommercialForm> = ({ sx, setForm, form }) => {
  const options = ['Loja/Salão', 'Grande Empreendimento', 'Sala Comercial', 'Casa Comercial', 'Edifício', 'Laje Corporativa/Andar', 'Terreno/Terra', 'Depósito/Galpão']
  return (
    <AccordionClean sx={{ ...sx }}>
      <AccordionSummary expandIcon={<ChevronDown/>}>
        <City/>
        <Typography align="center" color={form.length > 0 ? 'text.primary' : 'text.secondary'} sx={{ flexGrow: 1 }}>
          {form.length > 1 ? `${form[0]} +${form.length - 1}` : form.length === 1 ? form : 'Todos'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SelectTextMenu
            sx={{ width: '250px' }}
            label="Tipos"
            multiple
            options={options}
            value={form}
            onChoose={(chosen) => setForm(chosen as string[])}
          />
        </Box>
      </AccordionDetails>
    </AccordionClean>
  )
}

interface IPriceForm {
  sx?: SxProps,
  form: { max: number, min: number }
  setForm: ({ max, min }: { max: number, min: number}) => void
}

const PriceForm: React.FC<IPriceForm> = ({ sx, setForm, form }) => {
  const checkValues = () => {
    if (form.max < form.min && form.max && form.min) {
      setForm({
        max: form.min,
        min: form.max
      })
    }
  }
  return (
    <AccordionClean sx={sx}>
    <AccordionSummary expandIcon={<ChevronDown/>}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
          R$ {!form.min || form.min === 0 ? <Typography color="text.secondary" component="span" sx={{ ml: 0.5 }}>Mínimo</Typography> : showNumberMetricAffixes(form.min)}
          <ArrowRight sx={{ mx: 1 }} fontSize="small"/>
          R$ {!form.max || form.max === 1000000000 ? <Typography color="text.secondary" component="span" sx={{ ml: 0.5 }}>Máximo</Typography> : showNumberMetricAffixes(form.max)}
        </Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
      <Divider flexItem sx={{ mb: 3 }}/>
      <TextFieldPrice
        label="Mínimo"
        variant="outlined"
        value={form.min ? form.min : ''}
        onValueChange={({ floatValue }) => setForm({ ...form, min: floatValue as number })}
        fullWidth
        onBlur={() => checkValues()}
      />
      <TextFieldPrice
        sx={{ mt: 2 }}
        label="Máximo"
        variant="outlined"
        value={form.max ? form.max : ''}
        onValueChange={({ floatValue }) => setForm({ ...form, max: floatValue as number })}
        fullWidth
        onBlur={() => checkValues()}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          endIcon={<Restore/>}
          size="small"
          onClick={() => setForm({ max: null!, min: null! })}
        >
          Redefinir
        </Button>
      </Box>
    </AccordionDetails>
  </AccordionClean>
  )
}

const LocationForm: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
      <Box sx={{
        display: 'flex',
        minWidth: { lg: '400px', xl: '600px' },
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: theme => theme.shape.borderRadius,
        boxShadow: theme => theme.shadows[4],
        backgroundColor: theme => theme.palette.background.paper,
        p: 2
      }}>
        <Typography variant="h4" align="center">Onde está o seu futuro imóvel?</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
          <TextField variant="standard" autoFocus fullWidth sx={{ my: 2 }}/>
          <IconButton type="submit" sx={{ height: 'fit-content' }}>
            <HomeSearch/>
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" fontStyle="italic" align="center">
          Digite um endereço, cidade, bairro, rua ou CEP
        </Typography>
      </Box>
    </Box>
  )
}

const EasySearch: React.FC = () => {
  const [commercialForm, setCommercialForm] = useState<string[]>([])
  const theme = useTheme()
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const [resForm, setResForm] = useState({
    bathrooms: 0,
    bedrooms: 0,
    parkingSpaces: 0
  })

  const [searchForm, setSearchForm] = useState<{
    property: 'residential' | 'commercial', transaction: 'buy' | 'rent'
  }>({
    property: 'residential',
    transaction: 'buy'
  })

  const [priceForm, setPriceForm] = useState<{max: number, min: number}>({
    min: null!,
    max: null!
  })

  useEffect(() => {
    document.title = 'Meluto'
  }, [])

  return (
    <Fade in>
      <Box>
        <Box sx={{
          position: 'absolute',
          zIndex: -1000,
          height: 'calc(100% - 64px)',
          width: '100%',
          backgroundImage: `url(${SearchBackgroundImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          borderBottomLeftRadius: smDown ? '0%' : '100%'
        }}/>
        <Box sx={{
          pt: { xs: 4, lg: 10 },
          px: 4
        }}>
          <Typography
            align="center"
            fontWeight="medium"
            variant={lgDown ? 'h5' : 'h4'}
            sx={{
              ml: { xs: '0%', md: '15%' },
              width: 'fit-content',
              backgroundColor: theme => theme.palette.background.default + '30',
              borderRadius: theme => theme.shape.borderRadius,
              px: 1,
              py: 0.5,
              mb: { xs: 0, lg: 10 }
            }}
          >
            Você procura, a gente encontra.
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sx={{ display: { xs: 'block', lg: 'none' }, my: 2 }}>
                <LocationForm/>
              </Grid>
              <Grid item xs={12} lg={4} xl={4}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: 'fit-content',
                    flexWrap: 'wrap',
                    borderRadius: theme => theme.shape.borderRadius,
                    boxShadow: theme => theme.shadows[4],
                    backgroundColor: theme => theme.palette.background.paper,
                    p: 2
                  }}>
                    <SearchBox form={searchForm} setForm={setSearchForm} sx={{ mb: 2 }}/>
                    <PriceForm form={priceForm} setForm={setPriceForm} sx={{ mb: 2 }}/>
                    {searchForm.property === 'residential' &&
                      <ResidentialForm form={resForm} setForm={setResForm}/>
                    }
                    {searchForm.property === 'commercial' &&
                      <CommercialForm form={commercialForm} setForm={setCommercialForm}/>
                    }
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
                <LocationForm/>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Fade>
  )
}

export default EasySearch
