import React, { useEffect, useState, FormEventHandler } from 'react'
import {
  Fade, Box, ButtonProps, Accordion, Alert, AccordionSummary,
  AccordionDetails, Typography, Button, useTheme, LinearProgress,
  TextField, IconButton, Grid, Dialog, DialogTitle,
  DialogActions, DialogContent
} from '@mui/material'
import { useFormValidation, EditAllNamesForm, EditUsernameForm } from 'utils/formValidation'
import { ChevronDown, Upload, BorderNoneVariant, Lock } from 'mdi-material-ui'
import { TextFieldPassword, TextFieldCEP } from 'components'
import { differenceInDays } from 'date-fns'
import { UserModel } from 'types/user'
import { useAuth } from 'contexts/auth'
import { editUser } from 'services/users'
import { capitalize } from 'utils/handleText'

const Empty: React.FC = () => <BorderNoneVariant color="error"/>

const Locked: React.FC = () => <Lock color="error"/>

const NotProfessional: React.FC = () => {
  return (
    <Disclaimer>
      Apenas profissionais tem acesso a esse recurso.
    </Disclaimer>
  )
}

const Disclaimer: React.FC = ({ children }) => (
  <Box
    sx={{
      borderRadius: '4px',
      backgroundColor: theme => theme.palette.surface[1],
      p: 1,
      mt: 2,
      textAlign: 'justify'
    }}>
    <Typography color="text.secondary">
      {children}
    </Typography>
  </Box>
)

const SaveButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button variant="outlined" fullWidth sx={{ mt: 2 }} {...props}>Salvar</Button>
  )
}

interface AccordionProps {
  title?: string | React.ReactNode
  desc?: string | React.ReactNode
}

const SettingsItem: React.FC<AccordionProps> = ({ title, desc, children }) => {
  return (
    <Accordion TransitionProps={{ unmountOnExit: true }} >
      <AccordionSummary sx={{ px: 2 }} expandIcon={<ChevronDown/>}>
        <Box>
          <Typography variant="overline" component="span" fontSize="0.85em" letterSpacing={0.8} lineHeight={0} color="text.secondary">{title}</Typography>
          <Typography variant="h6" fontWeight={400}>{desc}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

const UploadAvatar: React.FC<{url: string}> = ({ url }) => {
  const theme = useTheme()
  return (
    <Box sx={{ position: 'relative', width: 'fit-content', height: 'fit-content', mb: 4 }}>
      <label htmlFor="profile-image-upload">
        <input id="profile-image-upload" accept="image/*" type="file" style={{ display: 'none' }} />
        <IconButton
          size="large"
          component="span"
          sx={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            border: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.secondary.dark,
            boxShadow: theme.shadows[2],
            transition: 'all 0.3s',
            '&:hover': {
              backgroundColor: theme.palette.surface[1]
            },
            '&:hover svg': {
              color: theme.palette.secondary.main
            }
          }}>
          <Upload />
        </IconButton>
      </label>
      <img src={url} style={{
        borderRadius: '50%',
        height: '250px',
        width: '250px',
        border: `2px solid ${theme.palette.secondary.main}`,
        boxShadow: theme.shadows[4]
      }} />
    </Box>
  )
}

interface NameProps {
  firstName?: string
  lastName?: string
  updatedAt: Date
  tradingName?: string
  onSave: (values: object, field: string) => void
}

const Name: React.FC<NameProps> = ({ firstName, lastName, updatedAt, tradingName, onSave }) => {
  const daysDiff = differenceInDays(new Date(), new Date(updatedAt))
  const MIN_DAYS = 60

  const editable = daysDiff >= MIN_DAYS

  const [localTradingOrFirstName, setLocalTradingOrFirstName] = useState('')
  const [localLastName, setLocalLastName] = useState('')

  const form = {
    type: tradingName ? 'company' : 'person',
    tradingOrFirstName: localTradingOrFirstName,
    lastName: localLastName
  }
  const { validateError, handleErrorMessage } = useFormValidation<EditAllNamesForm>('editAllNames')

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const isValid = await validateError(form)
    if (!isValid) return
    if (tradingName) {
      const values = {
        tradingName: localTradingOrFirstName
      }
      onSave(values, 'tradingName')
    } else {
      const values = {
        firstName: localTradingOrFirstName,
        lastName: localLastName
      }
      onSave(values, 'name')
    }
  }

  return (
    <SettingsItem title="Nome" desc={tradingName || `${firstName} ${lastName}`}>
      <LinearProgress value={daysDiff >= MIN_DAYS ? 100 : (daysDiff / MIN_DAYS) * 100} variant="determinate" color={daysDiff > MIN_DAYS ? 'success' : 'error'}/>
      <Typography
        variant="body2"
        fontStyle="italic"
        sx={{
          mb: 2,
          mt: 1,
          color: theme => daysDiff >= MIN_DAYS ? theme.palette.success.main : theme.palette.error.main
        }}
      >
        {daysDiff >= MIN_DAYS ? 'Você pode alterar o nome.' : daysDiff > 58 ? `Falta ${MIN_DAYS - daysDiff} dia.` : `Faltam ${MIN_DAYS - daysDiff} dias.`}
      </Typography>
      <Typography sx={{ mb: 1 }}>
        Esse é o nome que aparecerá para os usuários ao visitar o seu perfil ou em cartões nos anúncios.
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={tradingName ? 12 : 6}>
            <TextField
              disabled={!editable}
              label="Novo Nome"
              value={localTradingOrFirstName}
              inputProps={{ maxLength: tradingName ? 55 : 25 }}
              onChange={e => setLocalTradingOrFirstName(capitalize(e.target.value))}
              fullWidth
              {...handleErrorMessage('tradingOrFirstName')}
            />
          </Grid>
          {!tradingName &&
            <Grid item xs={12} lg={6}>
              <TextField
                disabled={!editable}
                label="Novo Sobrenome"
                inputProps={{ maxLength: 25 }}
                value={localLastName} onChange={e => setLocalLastName(capitalize(e.target.value))}
                fullWidth
                {...handleErrorMessage('lastName')}
              />
            </Grid>
          }
        </Grid>
        <Disclaimer>
          A troca poderá ser efetuada {MIN_DAYS} dias após mudança.<br/>
          Não utilize {!tradingName && 'números, '}pontuações ou caracteres especiais.
        </Disclaimer>
        <SaveButton type="submit" onClick={handleFormSubmit} disabled={!editable}/>
      </form>
    </SettingsItem>
  )
}

const Password: React.FC<{updatedAt: Date}> = ({ updatedAt }) => {
  const daysDiff = differenceInDays(new Date(), updatedAt)
  const MAX_DAYS = 60
  return (
    <SettingsItem title="Senha"
      desc={
        <Box sx={{ color: theme => daysDiff < MAX_DAYS ? theme.palette.success.main : theme.palette.error.main }}>
          {daysDiff === 0 && 'Alterada há menos de 1 dia'}
          {daysDiff === 1 && 'Alterada há 1 dia'}
          {daysDiff > 1 && `Alterada há ${daysDiff} dias`}
        </Box>
      }
    >
      <Typography>
        Sua senha será necessária para efetuar novos logins e alterações em seu cadastro.
      </Typography>
      <TextFieldPassword label="Nova Senha" fullWidth sx={{ mt: 1 }}/>
      <TextFieldPassword label="Confirme a Nova Senha" fullWidth sx={{ mt: 2 }}/>
      <Disclaimer>
        Para a segurança de sua conta, é importante que altere sua senha a cada 60 dias.
      </Disclaimer>
      <SaveButton/>
    </SettingsItem>
  )
}

const Description: React.FC<{desc?: string, available: boolean}> = ({ desc, available }) => {
  const [value, setValue] = useState(desc || '')
  return (
    <SettingsItem title="Descrição" desc={ !available ? <Locked/> : desc ? 'Preenchida' : <Empty/>}>
      {!available
        ? <NotProfessional/>
        : <>
            <Typography>
              É utilizada para que possa dar uma breve informação ao visitante de sua página sobre a empresa.
            </Typography>
            <TextField
              sx={{ mt: 1 }}
              label="Descrição"
              fullWidth multiline
              inputProps={{ maxLength: 150 }}
              rows={3}
              onChange={e => setValue(e.target.value)}
            />
            <Disclaimer>
              {value.length === 150
                ? 'Limite máximo atingido.'
                : value.length === 149
                  ? 'É possível digitar 1 caracter.'
                  : `É possível digitar ${150 - value.length} caracteres.`
                }
            </Disclaimer>
            <SaveButton/>
          </>
      }
    </SettingsItem>
  )
}

interface UsernameProps {
  username: string
  updatedAt: Date
  available: boolean
  onSave: (values: object, field: string) => void
}

const Username: React.FC<UsernameProps> = ({ username, updatedAt, available, onSave }) => {
  const daysDiff = differenceInDays(new Date(), updatedAt)
  const MIN_DAYS = 60

  const editable = daysDiff >= MIN_DAYS

  const [localUsername, setLocalUsername] = useState('')
  const { validateError, handleErrorMessage } = useFormValidation<EditUsernameForm>('editUsername')

  const form = {
    username: localUsername
  }

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const isValid = await validateError(form)
    if (!isValid) return
    const values = {
      username: localUsername
    }
    onSave(values, 'username')
  }

  return (
    <SettingsItem title="Nome de Usuário"
    desc={
      <>
        <Typography fontWeight="400" color="text.secondary" component="span">https://meluto.com.br/</Typography>
        {username}
      </>
    }>
      {!available
        ? <NotProfessional/>
        : <>
            <Typography sx={{ mb: 1 }}>
              O nome de usuário é utilizado como endereço do seu perfil. Opte por um que seja de fácil compreensão e identificação.
            </Typography>
            <LinearProgress value={daysDiff >= MIN_DAYS ? 100 : (daysDiff / MIN_DAYS) * 100} variant="determinate" color={daysDiff > MIN_DAYS ? 'success' : 'error'}/>
            <Typography
              variant="body2"
              fontStyle="italic"
              sx={{
                mb: 2,
                mt: 1,
                color: theme => daysDiff >= MIN_DAYS ? theme.palette.success.main : theme.palette.error.main
              }}
            >
              {daysDiff >= MIN_DAYS ? 'Você pode alterar seu usuário.' : daysDiff > 58 ? `Falta ${MIN_DAYS - daysDiff} dia.` : `Faltam ${MIN_DAYS - daysDiff} dias.`}
            </Typography>
            <TextField
              label="Novo Nome de Usuário"
              onChange={e => setLocalUsername(e.target.value)}
              value={localUsername}
              fullWidth
              {...handleErrorMessage('username')}
            />
            <Disclaimer>
              A troca poderá ser efetuada {MIN_DAYS} dias após mudança.<br/>
              Não utilize pontuações ou caracteres especiais.
            </Disclaimer>
            <SaveButton type="submit" onClick={handleFormSubmit}/>
          </>
      }
    </SettingsItem>

  )
}

interface AddressProps {
  address?: {
    state: string // rj
    city: string // rio de janeiro
    district: string // bairro
    thoroughfare: string // rua
    number: string // número
    additionalInfo: string
    postalCode: string
    updatedAt: Date
  }
  available: boolean
}

const Address: React.FC<AddressProps> = ({
  available, address
}) => {
  return (
  <SettingsItem title="Endereço" desc={
    !available
      ? <Locked/>
      : address
        ? <Box>
            {address.thoroughfare}<br/>
            nº {address.number} - {address.additionalInfo}<br/>
            {address.district} - {address.city}/{address.state}
          </Box>
        : <Empty/>
  }>
    {!available
      ? <NotProfessional/>
      : <>
          Esse endereço estará disponível em sua página. Assim será possível encaminhar interessados ao estabelecimento.
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            <Grid item xs={12} lg={5}>
              <TextFieldCEP fullWidth/>
            </Grid>
            <Grid item xs={12} lg={10}>
              <TextField disabled fullWidth label="Cidade"/>
            </Grid>
            <Grid item xs={12} lg={2}>
              <TextField disabled fullWidth label="UF"/>
            </Grid>
            <Grid item xs={12}>
              <TextField disabled label="Logradouro" fullWidth multiline maxRows={3}/>
            </Grid>
            <Grid item xs={12} lg={4}>
              <TextField fullWidth inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} label="Número"/>
            </Grid>
            <Grid item xs={12} lg={8}>
              <TextField fullWidth label="Complemento"/>
            </Grid>
          </Grid>
          <SaveButton/>
        </>
    }
  </SettingsItem>
  )
}

interface ConfirmDialogProps {
  open: boolean
  field: string
  user: UserModel
  values: any
  setModal: (open: boolean) => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, field, values, user, setModal }) => {
  const [title, setTitle] = useState('')
  const [newValue, setNewValue] = useState('')
  const [oldValue, setOldValue] = useState('')
  const [password, setPassword] = useState('')
  const { updateUser } = useAuth()

  useEffect(() => {
    switch (field) {
      case 'name':
        setTitle('nome')
        setNewValue(values.firstName)
        setOldValue(user.names.first)
        break
      case 'tradingName':
        setTitle('nome')
        setNewValue(values.tradingName)
        setOldValue(user.names.trading)
    }
  }, [field, values])

  const handleConfirm = async () => {
    console.log(user)
    const { user: updatedUser, error } = await editUser(user._id, field, {
      ...values,
      password
    })
    if (updatedUser) {
      updateUser(updatedUser)
    }
    setPassword('')
    setModal(false)
  }

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>Confirmar alteração?</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px dashed rgba(255, 255, 255, 0.2)', borderRadius: '5px' }}>
          <Typography variant="overline" color="text.secondary">{title}</Typography>
          <Typography lineHeight={0.2} sx={{ fontSize: '1.2em', mb: 2, textDecoration: 'line-through' }}>{oldValue}</Typography>
          <Typography lineHeight={0.2} sx={{ fontSize: '1.2em', mb: 2, color: theme => theme.palette.primary.main }}>{newValue}</Typography>
          {field === 'name' &&
          <>
            <Typography variant="overline" color="text.secondary">Sobrenome</Typography>
            <Typography lineHeight={0.2} sx={{ fontSize: '1.2em', mb: 2, textDecoration: 'line-through' }}>{user.names.last}</Typography>
            <Typography lineHeight={0.2} sx={{ fontSize: '1.2em', mb: 2, color: theme => theme.palette.primary.main }}>{values.lastName}</Typography>
          </>
          }
        </Box>
        <Typography color="text.secondary" sx={{ mt: 2, mb: 1 }}>Para prosseguir digite sua senha atual.</Typography>
        <TextFieldPassword sx={{ mb: 2 }} value={password} onChange={e => setPassword(e.target.value)} label="Senha" fullWidth/>
        <DialogActions sx={{ justifyContent: 'space-around' }}>
          <Button color="inherit" onClick={() => setModal(false)}>Cancelar</Button>
          <Button color="primary" onClick={handleConfirm}>Confirmar</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
}

export const SettingsProfile: React.FC = () => {
  const { user } = useAuth()
  const [openDialog, setOpenDialog] = useState(false)
  const [values, setValues] = useState({})
  const [field, setField] = useState('')
  const available = user.role === 'professional' && user.verified.value
  const professionalNotVerified = user.role === 'professional' && !user.verified.value

  const handleSaveClick = (values: object, field: string) => {
    setOpenDialog(true)
    setValues(values)
    setField(field)
  }

  useEffect(() => {
    document.title = 'Configurações - Perfil'
  }, [])

  return (
    <>
      <Fade in>
        <Box>
          <ConfirmDialog open={openDialog} field={field} values={values} user={user} setModal={setOpenDialog}/>
          <Alert severity="warning" sx={{ display: professionalNotVerified ? 'flex' : 'none', justifyContent: 'center' }}>
            Sua conta está sendo verificada e em breve você poderá usar os recursos profissionais.
          </Alert>
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box>
                <UploadAvatar url={user.avatar}/>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
              <Name
                firstName={user.names.first}
                lastName={user.names.last}
                updatedAt={new Date(user.names.updatedAt)}
                tradingName={user.names.trading}
                onSave={(values, field) => handleSaveClick(values, field)}
              />
              <Username
                username={user.username.value}
                lastUpdate={new Date(user.username.updatedAt)}
                available={available}
              />
              <Password updatedAt={new Date(user.password.updatedAt)}/>
              <Address
                address={user.address}
                available={available}
              />
              <Description
                desc={user.description}
                available={available}
              />
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </>
  )
}
