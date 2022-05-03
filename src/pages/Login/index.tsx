import React, { FormEventHandler, useEffect, useState } from 'react'
import { Grid, Fade, Box, TextField, Typography, Button, Divider, Hidden } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { TextFieldPassword } from 'components'
import { Login as LoginIcon } from 'mdi-material-ui'
import LoginIllustration from 'assets/illustrations/login.svg'
import RegisterIllustration from 'assets/illustrations/register.svg'
import { useFormValidation, LoginForm } from 'utils/formValidation'
import { isEmail } from 'utils/formValidation/checkers'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [userInput, setUserInput] = useState('')
  const [password, setPassword] = useState('')

  const form = { userInput, password }
  const { validateError, handleErrorMessage } = useFormValidation<LoginForm>('login')

  useEffect(() => {
    document.title = 'Entrar'
  })

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const isFormValid = await validateError(form)
    if (await isEmail(userInput)) {
      console.log({
        email: userInput,
        password
      })
    } else {
      console.log({
        username: userInput,
        password
      })
    }
  }

  return (
  <Fade in>
    <Box sx={{ mt: 10 }}>
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
                {...handleErrorMessage('userInput')}
              />
              <TextFieldPassword
                fullWidth
                label="Senha"
                onChange={e => setPassword(e.target.value)}
                sx={{ mt: 1.5 }}
                {...handleErrorMessage('password')}
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
