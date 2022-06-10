import React, { FormEventHandler, useState, useEffect } from 'react'
import { AccountPlus } from 'mdi-material-ui'
import { Fade, Box, TextField, Grid, Typography, Button, Hidden, Snackbar, Alert } from '@mui/material'
import { TextFieldPassword } from 'components'
import RegisterIllustration from 'assets/illustrations/register2.svg'
import { useFormValidation, RegisterRegularForm } from 'utils/formValidation'
import { capitalize } from 'utils/handleText'
import CheckInBoxIllustration from 'assets/illustrations/register-check-inbox.svg'
import api from 'services/api'

interface RegisterMainProps {
  onSuccess: (email: string) => void
}

const RegisterMain: React.FC<RegisterMainProps> = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [errorType, setErrorType] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [error, setError] = useState(false)

  const form = { firstName, lastName, email, password, confirmPassword }
  const { validateError, handleErrorMessage } = useFormValidation<RegisterRegularForm>('registerRegular')

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const isValid = await validateError(form)
    setError(!!errorType || !isValid)
    try {
      if (isValid) {
        await api.post('users', {
          role: 'regular',
          firstName,
          lastName,
          email,
          password
        })
        setErrorType('')
        setError(false)
        onSuccess(email)
      }
    } catch (err: any) {
      if (err.response.data) {
        setErrorType(err.response.data.error)
        setError(true)
      } else if (!err.request.data) {
        setErrorMsg('Erro de conexão com banco')
        setOpenSnackbar(true)
      } else {
        setErrorMsg('Erro interno')
        setOpenSnackbar(true)
      }
    }
  }

  const onCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  return (
    <Fade in>
      <Box sx={{ pb: 8 }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={onCloseSnackbar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <Alert severity="error">
            {errorMsg}
          </Alert>
        </Snackbar>
        <Grid container justifyContent="center" sx={{ mt: { xs: 2, md: 6 }, p: 2 }}>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: { xs: 2, md: 4 } }}>
            <Typography variant="h4">
              Junte-se a nós!
            </Typography>
              <Typography
                variant="h6"
                letterSpacing="0.03em"
                fontWeight="regular"
                sx={{
                  backgroundColor: theme => theme.palette.background.paper + 'C0',
                  boxShadow: theme => theme.shadows[2],
                  width: 'fit-content',
                  borderRadius: '10px',
                  p: 1,
                  mt: 1,
                  mx: 2
                }}
              >
                Salve seus imóveis favoritos, anuncie e muito mais!
              </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
              <img src={RegisterIllustration} height="200px"/>
              <Typography variant="h4" sx={{ mt: 2 }}>Faça o seu cadastro</Typography>
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
            <form
              onSubmit={handleFormSubmit}
              style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
            >
              <Box sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '350px',
                '& > div': {
                  mt: 1.5
                },
                '& > button': {
                  mt: 4
                }
              }}>
                <TextField
                  fullWidth
                  label="Nome"
                  value={firstName}
                  onChange={e => setFirstName(capitalize(e.target.value))}
                  {...handleErrorMessage('firstName')}
                />
                <TextField
                  fullWidth
                  label="Sobrenome"
                  value={lastName}
                  onChange={e => setLastName(capitalize(e.target.value))}
                  {...handleErrorMessage('lastName')}
                />
                <TextField
                  fullWidth
                  label="E-mail"
                  value={email}
                  error={errorType === 'DuplicateEmailError'}
                  onChange={e => setEmail(e.target.value)}
                  {...handleErrorMessage('email', errorType === 'DuplicateEmailError' ? 'E-mail já em uso.' : '')}
                />
                <TextFieldPassword
                  fullWidth
                  label="Senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  {...handleErrorMessage('password', 'A senha precisa ter no mínimo 8 caracteres. Inclua ao menos uma letra maiúscula, uma minúscula, um número e um símbolo (!@#$&*).')}
                />
                <TextFieldPassword
                  fullWidth
                  label="Confirme a senha"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  {...handleErrorMessage('confirmPassword')}
                />
                <Button type="submit" variant="outlined" color="secondary" size="large" endIcon={<AccountPlus/>}>
                  Cadastrar
                </Button>
                <Typography variant="caption" color="error" sx={{ display: error ? 'flex' : 'none', mt: 1 }}>
                  Verifique o formulário.
                </Typography>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}

interface RegisterSuccessProps {
  email?: string
}

const RegisterSuccess: React.FC<RegisterSuccessProps> = ({ email }) => {
  return (
    <Fade in>
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', mt: 10 }}>
        <img src={CheckInBoxIllustration} width={300}/>
        <Typography align="center" sx={{ maxWidth: '600px', mt: 2 }} variant="h6" fontWeight="regular">
          Enviamos um link para <Typography component="span" color="primary" variant="h6" fontWeight="bold">{email}</Typography>.<br/>
          Verifique a sua caixa de entrada para concluir o cadastro.
        </Typography>
      </Box>
    </Fade>
  )
}

export const RegisterRegular: React.FC = () => {
  const [filled, setFilled] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    document.title = 'Cadastro - Pessoa Física'
  })

  const handleSuccess = (email: string) => {
    setFilled(true)
    setEmail(email)
  }

  return (
    <Fade in>
      <Box>
        {filled
          ? <RegisterSuccess email={email}/>
          : <RegisterMain onSuccess={handleSuccess}/>
        }
      </Box>
    </Fade>
  )
}
