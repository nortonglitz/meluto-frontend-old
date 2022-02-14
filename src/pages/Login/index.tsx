import React, { useEffect, useState } from 'react'
import { Grid, Fade, Box, TextField, Typography, Button, Divider, Hidden, IconButton } from '@mui/material'
import { Login as LoginIcon, EyeOutline, EyeOffOutline } from 'mdi-material-ui'
import LoginIllustration from 'assets/illustrations/login.svg'
import RegisterIllustration from 'assets/illustrations/register.svg'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [passwordIconColor, setPasswordIconColor] = useState<'disabled' | 'primary'>('disabled')

  useEffect(() => {
    document.title = 'Entrar'
  })

  return (
    <Fade in>
      <Box sx={{ mt: 10 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={5} lg={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
              <img src={LoginIllustration} width={250} alt="Login"/>
              <Typography variant="h5" align="center" sx={{ mt: 2 }}>Entre em nossa plataforma</Typography>
              <TextField fullWidth label="Usuário ou E-mail" autoFocus sx={{ mt: 2 }}/>
              <TextField
                type={showPassword ? 'text' : 'password'}
                fullWidth
                onFocus={() => setPasswordIconColor('primary')}
                onBlur={() => setPasswordIconColor('disabled')}
                label="Senha"
                sx={{ mt: 1.5 }}
                InputProps={{
                  endAdornment:
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword
                        ? <EyeOffOutline color={passwordIconColor}/>
                        : <EyeOutline color={passwordIconColor}/>
                      }
                    </IconButton>
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, width: '100%' }}>
                <Button sx={{ letterSpacing: '0.06em', textTransform: 'none' }}>Esqueceu sua senha?</Button>
                <Button variant="outlined" endIcon={<LoginIcon/>}>Entrar</Button>
              </Box>
              <Hidden mdUp>
                <Box sx={{ mt: 3, p: 3, borderTop: theme => `${theme.palette.divider} solid 1px` }}>
                  <Button variant="outlined" color="secondary">Registre-se</Button>
                </Box>
              </Hidden>
            </Box>
          </Grid>
          <Hidden mdDown>
            <Divider flexItem orientation="vertical"/>
            <Grid item xs={5} md={5} lg={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '300px' }}>
                <img src={RegisterIllustration} width={200} alt="Residencial"/>
                <Typography variant="h5" align="center" sx={{ mt: 2 }}>Sua primeira vez aqui?</Typography>
                <Button variant="outlined" color="secondary" sx={{ mt: 1 }}>Cadastre-se</Button>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Fade>
  )
}

export default Login
