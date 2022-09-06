import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { showNumberMetricAffixes } from 'utils/handleNumber'
import { useTheme, useMediaQuery, Box, Typography, SxProps, Divider, AccordionSummary, AccordionDetails, Grid, Fade, Button, TextField, IconButton } from '@mui/material'
import { Bed, Shower, Car, ChevronDown, ArrowRight, Restore, City, HomeSearch } from 'mdi-material-ui'
import { SelectIllustrationButton, SelectTextButton, AccordionClean, TextFieldPrice, SelectGroup, SelectTextMenu } from 'components'

const bucket = process.env.REACT_APP_BUCKET_URL

type Property = 'residential' | 'commercial'
type Transaction = 'buy' | 'rent'
type NumberRange = {
  min: number | undefined
  max: number | undefined
}

interface EasySearchForm {
  property: Property
  transaction: Transaction
  residential: {
    bathrooms: number
    bedrooms: number
    parkingSpaces: number
  }
  commercial: {
    type: string[]
  }
  price: {
    rent: NumberRange
    buy: NumberRange
  }
}

interface Form {
  setForm: Dispatch<SetStateAction<EasySearchForm>>
  form: EasySearchForm
  sx?: SxProps
}

const SearchBox: React.FC<Form> = ({ form, setForm, sx }) => {
  return (
      <Box sx={{ display: 'flex', flexDirection: 'column', ...sx }}>
        <Box sx={{ display: 'flex' }}>
          <SelectIllustrationButton
            sx={{ mr: 1, p: 1 }}
            label="Residencial"
            selected={form.property === 'residential'}
            onClick={() => setForm({ ...form, property: 'residential' })}
          >
            <img src={`${bucket}/illustrations/search-residential.svg`} width={100} alt="Residencial" />
          </SelectIllustrationButton>
          <SelectIllustrationButton
            sx={{ ml: 1, p: 1 }}
            label="Comercial"
            selected={form.property === 'commercial'}
            onClick={() => setForm({ ...form, property: 'commercial' })}
          >
            <img src={`${bucket}/illustrations/search-commercial.svg`} width={100} alt="Comercial"/>
          </SelectIllustrationButton>
        </Box>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <SelectTextButton sx={{ width: '50%', mr: 1 }}
            selected={form.transaction === 'buy'}
            onClick={() => setForm({ ...form, transaction: 'buy' })}
          >
            Comprar
          </SelectTextButton>
          <SelectTextButton sx={{ width: '50%', ml: 1 }}
            selected={form.transaction === 'rent'}
            onClick={() => setForm({ ...form, transaction: 'rent' })}
          >
            Alugar
          </SelectTextButton>
        </Box>
      </Box>
  )
}

const ResidentialForm: React.FC<Form> = ({ sx, setForm, form }) => {
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
              {form.residential.bedrooms + '+'}
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
              {form.residential.bathrooms + '+'}
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
              {form.residential.parkingSpaces + '+'}
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
            setChosen={value => setForm({ ...form, residential: { ...form.residential, bedrooms: value as number } })}
            chosen={form.residential.bedrooms}
          />
        </Box>
        <Divider flexItem sx={{ my: 2 }}/>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SelectGroup
            icon={<Shower/>}
            label="Banheiros"
            options={options}
            setChosen={value => setForm({ ...form, residential: { ...form.residential, bathrooms: value as number } })}
            chosen={form.residential.bathrooms}
          />
        </Box>
        <Divider flexItem sx={{ my: 2 }}/>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <SelectGroup
            icon={<Car/>}
            label="Vagas"
            options={options}
            setChosen={value => setForm({ ...form, residential: { ...form.residential, parkingSpaces: value as number } })}
            chosen={form.residential.parkingSpaces}
          />
        </Box>
      </AccordionDetails>
    </AccordionClean>
  )
}

const CommercialForm: React.FC<Form> = ({ sx, setForm, form }) => {
  const options = ['Loja/Salão', 'Grande Empreendimento', 'Sala Comercial', 'Casa Comercial', 'Edifício', 'Laje Corporativa/Andar', 'Terreno/Terra', 'Depósito/Galpão']
  return (
    <AccordionClean sx={{ ...sx }}>
      <AccordionSummary expandIcon={<ChevronDown/>}>
        <City/>
        <Typography align="center" color={form.commercial.type.length > 0 ? 'text.primary' : 'text.secondary'} sx={{ flexGrow: 1 }}>
          {form.commercial.type.length > 1 ? `${form.commercial.type[0]} +${form.commercial.type.length - 1}` : form.commercial.type.length === 1 ? form.commercial.type[0] : 'Todos'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <SelectTextMenu
            sx={{ width: '250px' }}
            label="Tipos"
            multiple
            options={options}
            value={form.commercial.type}
            onChoose={(chosen) => setForm({ ...form, commercial: { type: chosen as string[] } })}
          />
        </Box>
      </AccordionDetails>
    </AccordionClean>
  )
}

const PriceForm: React.FC<Form> = ({ sx, setForm, form }) => {
  const min = form.price[form.transaction].min
  const max = form.price[form.transaction].max
  const checkValues = () => {
    if (!min || !max) {
      return
    }

    if (max < min) {
      setForm({ ...form, price: { ...form.price, [form.transaction]: { max: min, min: max } } })
    }
  }
  return (
    <AccordionClean sx={sx}>
    <AccordionSummary expandIcon={<ChevronDown/>}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
          R$ {!min || min === 0 ? <Typography color="text.secondary" component="span" sx={{ ml: 0.5 }}>Mínimo</Typography> : showNumberMetricAffixes(min)}
          <ArrowRight sx={{ mx: 1 }} fontSize="small"/>
          R$ {!max || max === 1000000000 ? <Typography color="text.secondary" component="span" sx={{ ml: 0.5 }}>Máximo</Typography> : showNumberMetricAffixes(max)}
        </Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
      <Divider flexItem sx={{ mb: 3 }}/>
      <TextFieldPrice
        label="Mínimo"
        variant="outlined"
        value={min || ''}
        onValueChange={({ floatValue }) => setForm({
          ...form,
          price: {
            ...form.price,
            [form.transaction]: {
              min: floatValue as number,
              max: form.price[form.transaction].max
            }
          }
        })}
        fullWidth
        onBlur={() => checkValues()}
      />
      <TextFieldPrice
        sx={{ mt: 2 }}
        label="Máximo"
        variant="outlined"
        value={max || ''}
        onValueChange={({ floatValue }) => setForm({
          ...form,
          price: {
            ...form.price,
            [form.transaction]: {
              min: form.price[form.transaction].min,
              max: floatValue as number
            }
          }
        })}
        fullWidth
        onBlur={() => checkValues()}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="outlined"
          endIcon={<Restore/>}
          size="small"
          onClick={() => setForm({
            ...form,
            price: {
              ...form.price,
              [form.transaction]: {
                min: undefined,
                max: undefined
              }
            }
          })}
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
          <TextField variant="standard" autoFocus fullWidth sx={{
            my: 2,
            '& input': {
              fontSize: theme => theme.typography.h5.fontSize
            }
          }}/>
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

export const EasySearch: React.FC = () => {
  const theme = useTheme()
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'))
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const [form, setForm] = useState<EasySearchForm>({
    property: 'residential',
    transaction: 'buy',
    residential: {
      bathrooms: 0,
      bedrooms: 0,
      parkingSpaces: 0
    },
    commercial: {
      type: []
    },
    price: {
      buy: {
        min: undefined,
        max: undefined
      },
      rent: {
        min: undefined,
        max: undefined
      }
    }
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
          backgroundImage: `url(${bucket}/backgrounds/easysearch.jpg)`,
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
                    <SearchBox form={form} setForm={setForm} sx={{ mb: 2 }}/>
                    <PriceForm form={form} setForm={setForm} sx={{ mb: 2 }}/>
                    {form.property === 'residential' &&
                      <ResidentialForm form={form} setForm={setForm}/>
                    }
                    {form.property === 'commercial' &&
                      <CommercialForm form={form} setForm={setForm}/>
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
