import React, { FormEventHandler, useEffect, useState } from 'react'
import { Grid, Fade, Box, TextField, Typography, Button, Divider, Hidden, Snackbar, Alert, AlertColor } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TextFieldPassword } from 'components'
import { Login as LoginIcon } from 'mdi-material-ui'
import LoginIllustration from 'assets/illustrations/login.svg'
import RegisterIllustration from 'assets/illustrations/register.svg'
import { useFormValidation, LoginForm } from 'utils/formValidation'
import { useAuth } from 'contexts/auth'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [alertPopUp, setAlertPopUp] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const { signIn } = useAuth()

  const form = { userInput, password }
  const { validateError, handleErrorMessage } = useFormValidation<LoginForm>('login')

  useEffect(() => {
    document.title = 'Entrar'
  })

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    const isFormValid = await validateError(form)
    if (!isFormValid) return
    const error = await signIn(userInput, password)
    if (error) {
      switch (error.type) {
        case 'ConnectionError':
          setAlertPopUp('Erro de conexão com servidor.')
          setAlertSeverity('error')
          setOpenSnackbar(true)
          break
        case 'InternalError':
          setAlertPopUp('Erro interno.')
          setAlertSeverity('error')
          setOpenSnackbar(true)
          break
        case 'SessionBlockedError':
          setAlertPopUp('Sessão bloqueada. Acesse seu e-mail para mais informações.')
          setAlertSeverity('error')
          setOpenSnackbar(true)
          break
        case 'UnverifiedEmailError':
          setAlertPopUp('E-mail não verificado. Confira sua caixa de entrada ou spam.')
          setAlertSeverity('warning')
          setOpenSnackbar(true)
          break
        default:
          setErrorMsg('E-mail, usuário ou senha não correspondem.')
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
    <Box sx={{ mt: 10 }}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={onCloseSnackbar}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <Alert severity={alertSeverity}>
          {alertPopUp}
        </Alert>
      </Snackbar>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={5} lg={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
            <img src={LoginIllustration} width={250} alt="Login"/>
            <Typography variant="h5" align="center" sx={{ mt: 2 }}>Entre em nossa plataforma</Typography>
            <form onSubmit={handleFormSubmit}>
              <TextField
                fullWidth
                label="Usuário ou E-mail"
                onChange={e => setUserInput(e.target.value)}
                sx={{ mt: 2 }}
                error={!!errorMsg}
                {...handleErrorMessage('userInput')}
              />
              <TextFieldPassword
                fullWidth
                label="Senha"
                error={!!errorMsg}
                onChange={e => setPassword(e.target.value)}
                sx={{ mt: 1.5 }}
                {...handleErrorMessage('password', errorMsg || '')}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%' }}>
                <Button
                  color="inherit"
                  sx={{ letterSpacing: '0.06em', textTransform: 'none' }}
                  onClick={() => navigate('/recover-password')}
                >Esqueceu sua senha?</Button>
                <Button variant="outlined" type="submit" endIcon={<LoginIcon/>}>Entrar</Button>
              </Box>
            </form>
            <Hidden mdUp>
              <Box sx={{ mt: 3, p: 3, borderTop: theme => `${theme.palette.divider} solid 1px` }}>
                <Button variant="outlined" color="secondary">Registre-se</Button>
              </Box>
            </Hidden>
          </Box>
        </Grid>
        <Hidden mdDown>
          <Divider flexItem orientation="vertical"/>
          <Grid item xs={5} md={5} lg={4} sx={{ display: 'flex', mt: 10, justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
              <img src={RegisterIllustration} width={200} alt="Cadastrar"/>
              <Typography variant="h5" align="center" sx={{ mt: 2 }}>Sua primeira vez aqui?</Typography>
              <Button variant="outlined" color="secondary" sx={{ mt: 1 }} onClick={() => navigate('/register')}>Cadastre-se</Button>
            </Box>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
  </Fade>
  )
}
